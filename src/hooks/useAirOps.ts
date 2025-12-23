import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import {
  getAirOpsInstance,
  initializeAirOps,
  getAirOpsConfigFromEnv,
  getAirOpsAppConfigFromEnv,
} from '@/lib/airops';
import type { WorkflowItem, WorkflowsResponse } from '@/types/workflows';

export function useAirOps() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initError, setInitError] = useState<Error | null>(null);
  const [workflowsData, setWorkflowsData] = useState<WorkflowItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const hasFetchedRef = useRef(false);

  // Initialize AirOps SDK on mount
  useEffect(() => {
    try {
      const config = getAirOpsConfigFromEnv();
      initializeAirOps(config);
      setIsInitialized(true);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to initialize AirOps SDK');
      console.error('Failed to initialize AirOps SDK:', error);
      setInitError(error);
    }
  }, []);

  const airops = useMemo(() => {
    if (!isInitialized) {
      return null;
    }
    try {
      return getAirOpsInstance();
    } catch (error) {
      console.warn('AirOps SDK not available:', error);
      return null;
    }
  }, [isInitialized]);

  const executeWorkflow = useCallback(
    async (params: {
      appId: string;
      version: number;
      payload: {
        inputs: {
          [key: string]: number;
        };
      };
    }) => {
      if (!airops) {
        throw new Error('AirOps SDK not initialized');
      }

      return await airops.apps.execute(params);
    },
    [airops]
  );

  const addTag = useCallback(
    (id: string) => {
      // Add a new tag to the workflow in memory only (no backend persistence)
      setWorkflowsData((prev) =>
        prev.map((workflow) =>
          workflow.id === id
            ? {
                ...workflow,
                tags: [
                  ...workflow.tags,
                  {
                    name: 'new',
                    color: 'green',
                  },
                ],
              }
            : workflow
        )
      );
    },
    [setWorkflowsData]
  );

  const fetchWorkflows = useCallback(async () => {
    if (!airops || hasFetchedRef.current) {
      return;
    }

    hasFetchedRef.current = true;
    setLoading(true);
    setFetchError(null);

    try {
      const appConfig = getAirOpsAppConfigFromEnv();
      const results = await (airops.apps.getResults as any)({
        appId: appConfig.appId,
        executionId: appConfig.executionId, // Fetching for some specific execution to avoid running the workflow in each render (which would be expensive maybe in tokes for just testing the Front and also because it was faster, each workflow was taking like 30 seconds)
      });

      const resultAny = results as unknown;
      const workflowsResponse =
        (resultAny as { output?: WorkflowsResponse })?.output ||
        (resultAny as { data?: WorkflowsResponse })?.data ||
        (resultAny as WorkflowsResponse);
      const workflows = workflowsResponse?.data || [];
      setWorkflowsData(workflows);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch workflows');
      setFetchError(error);
      hasFetchedRef.current = false; // Allow retry on error
    } finally {
      setLoading(false);
    }
  }, [airops]);

  // Automatically fetch workflows when initialized
  useEffect(() => {
    if (isInitialized && airops) {
      fetchWorkflows();
    }
  }, [isInitialized, airops, fetchWorkflows]);

  const deleteWorkflow = useCallback((id: string) => {
    setWorkflowsData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    executeWorkflow,
    workflowsData,
    loading,
    error: fetchError,
    isInitialized: airops !== null,
    initError,
    deleteWorkflow,
    addTag,
  };
}

