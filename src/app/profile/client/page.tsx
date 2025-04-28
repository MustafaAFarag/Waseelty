import BaseLayout from "@/components/layout/BaseLayout";

export default function ClientProfilePage() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold mb-2">John Doe</h1>
                <p className="text-gray-600 mb-4">Client Profile</p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Contact Client
                </button>
              </div>
            </div>
          </div>

          {/* Posted Projects Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Posted Projects</h2>
            <p>List of projects posted by this client will appear here</p>
          </div>

          {/* Reviews Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Reviews from Freelancers
            </h2>
            <p>Reviews and ratings from freelancers will appear here</p>
          </div>

          {/* Client Stats */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Client Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded p-4 text-center">
                <div className="text-2xl font-bold">5</div>
                <div className="text-gray-600">Projects Posted</div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-gray-600">Completed Projects</div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
