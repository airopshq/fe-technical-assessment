import { useEffect } from 'react'
import { executeWorkflow } from './api/airops'

function App() {
  useEffect(() => {
    const runWorkflow = async () => {
      try {
        const appId =
          import.meta.env.VITE_AIROPS_WORKFLOW_ID ||
          '1ddcb2d2-c3f7-4a7e-8210-67637da7d947'

        const executionResult = await executeWorkflow(appId, {})
        console.log('Workflow executed successfully:', executionResult)
        console.log('Workflow output:', executionResult.output)
      } catch (err) {
        console.error('Error executing workflow:', err)
      }
    }

    runWorkflow()
  }, [])

  return <div className="text-lg">Technical assessment</div>
}

export default App
