import BaseLayout from "@/components/layout/BaseLayout";

export default function FreelancerProfilePage() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-8">
        <div className="grid gap-8">
          {/* Profile Header */}
          <div className="border rounded-lg p-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold mb-2">Jane Smith</h1>
                <p className="text-gray-600 mb-4">Senior Web Developer</p>
                <div className="flex gap-4">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    Contact
                  </button>
                  <button className="px-4 py-2 border rounded">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Skills</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                React
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                Next.js
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                TypeScript
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                Node.js
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                UI/UX Design
              </span>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Portfolio items will be added here */}
              <div className="aspect-video bg-gray-100 rounded"></div>
              <div className="aspect-video bg-gray-100 rounded"></div>
              <div className="aspect-video bg-gray-100 rounded"></div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Client Reviews</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                ★★★★★
                <span className="text-black">5.0 (15 reviews)</span>
              </div>
              <p>Client reviews will appear here</p>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
