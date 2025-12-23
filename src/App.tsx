import { Sidebar } from '@/components/Sidebar';
import { WorkflowsPage } from '@/components/WorkflowsPage';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1">
          <WorkflowsPage />
        </main>
      </div>
    </div>
  );
}

export default App;
