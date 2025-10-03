import AirOps from '@airops/airops-js'

const airops = new AirOps()

/**
 * Execute a workflow using the SDK
 * @param appId - Your workflow ID (found in the URL: app.airops.com/{workspace}/apps/{ID})
 * @param inputs - Input data for the workflow
 */
export const executeWorkflow = async (
  appId: number | string,
  inputs?: Record<string, unknown>
) => {
  try {
    const execution = await airops.apps.execute({
      appId,
      payload: {
        inputs: inputs || {},
      },
    })

    const result = await execution.result()

    console.log('Full execution result:', result) 
    return result
  } catch (error) {
    console.error('Error executing workflow:', error)
    throw error
  }
}

export default airops
