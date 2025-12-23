import AirOps from '@airops/airops-js';
export interface AirOpsConfig {
  userId: string;
  workspaceId: string;
  hashedUserId: string;
}

/**
 * Get AirOps configuration from environment variables
 */
export function getAirOpsConfigFromEnv(): AirOpsConfig {
  const userId = import.meta.env.VITE_AIROPS_USER_ID;
  const workspaceId = import.meta.env.VITE_AIROPS_WORKSPACE_ID;
  const hashedUserId = import.meta.env.VITE_AIROPS_HASHED_USER_ID;

  if (!userId || !workspaceId || !hashedUserId) {
    throw new Error(
      'Missing AirOps configuration. Please set VITE_AIROPS_USER_ID, VITE_AIROPS_WORKSPACE_ID, and VITE_AIROPS_HASHED_USER_ID in your .env file.'
    );
  }

  return {
    userId,
    workspaceId,
    hashedUserId,
  };
}

/**
 * Get AirOps app configuration from environment variables
 */
export interface AirOpsAppConfig {
  appId: string;
  executionId: string;
}

export function getAirOpsAppConfigFromEnv(): AirOpsAppConfig {
  const appId = import.meta.env.VITE_AIROPS_APP_ID;
  const executionId = import.meta.env.VITE_AIROPS_EXECUTION_ID;

  if (!appId || !executionId) {
    throw new Error(
      'Missing AirOps app configuration. Please set VITE_AIROPS_APP_ID and VITE_AIROPS_EXECUTION_ID in your .env file.'
    );
  }

  return {
    appId,
    executionId,
  };
}

/**
 * Initialize the AirOps SDK with the provided configuration
 */
export function initializeAirOps(config: AirOpsConfig) {
  // AirOps SDK expects workspaceId as number, but we receive it as string from env
  const workspaceId = config.workspaceId;
  const instance = AirOps.identify({
    userId: config.userId,
    workspaceId: workspaceId as any, // SDK types may be incorrect, using assertion
    hashedUserId: config.hashedUserId,
  });
  setAirOpsInstance(instance);
  return instance;
}

/**
 * Default AirOps instance (will be initialized when config is provided)
 */
let airopsInstance: ReturnType<typeof AirOps.identify> | null = null;

/**
 * Get the AirOps instance
 * Throws an error if not initialized
 */
export function getAirOpsInstance() {
  if (!airopsInstance) {
    throw new Error('AirOps SDK not initialized. Call initializeAirOps() first.');
  }
  return airopsInstance;
}

/**
 * Set the AirOps instance (used internally)
 */
export function setAirOpsInstance(instance: ReturnType<typeof AirOps.identify>) {
  airopsInstance = instance;
}

