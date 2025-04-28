import BaseLayout from "@/components/layout/BaseLayout";

export default function ClientDashboard() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Client Dashboard</h1>

        <div className="grid gap-6">
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">Post a Project</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Create New Project
            </button>
          </div>

          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">Matched Freelancers</h2>
            <p>AI-suggested freelancers will appear here</p>
          </div>

          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">Active Projects</h2>
            <p>Your active projects and conversations will appear here</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
