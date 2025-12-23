import { Sidebar } from '@/components/Sidebar';
import { WorkflowsPage } from '@/components/WorkflowsPage';

function App() {
  return (
    <div id="mariano" className="h-full overflow-hidden flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 min-h-0 overflow-hidden">
          <WorkflowsPage />
        </main>
      </div>
    </div>
  );
}

export default App;
