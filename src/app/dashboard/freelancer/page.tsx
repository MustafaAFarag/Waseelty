import BaseLayout from "@/components/layout/BaseLayout";

export default function FreelancerDashboard() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8">Freelancer Dashboard</h1>

        <div className="grid gap-6">
          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">Available Jobs</h2>
            <p>Latest jobs matching your skills will appear here</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded mt-4">
              Browse All Jobs
            </button>
          </div>

          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">AI Job Suggestions</h2>
            <p>
              Personalized job recommendations based on your skills will appear
              here
            </p>
          </div>

          <div className="border p-6 rounded-lg">
            <h2 className="text-xl mb-4">Active Proposals</h2>
            <p>Track your proposals and offers here</p>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
