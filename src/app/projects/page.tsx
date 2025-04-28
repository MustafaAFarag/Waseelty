import BaseLayout from "@/components/layout/BaseLayout";

export default function ProjectsPage() {
  return (
    <BaseLayout>
      <div className="container mx-auto p-8">
        <div className="grid gap-8">
          {/* Project Header */}
          <div className="border rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              Website Redesign Project
            </h1>
            <div className="flex gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded">
                Web Design
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded">
                $1000-2000
              </span>
            </div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Submit Proposal
            </button>
          </div>

          {/* Project Details */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <p>
              This is a sample project description. The actual project details
              will be added here.
            </p>
          </div>

          {/* AI Recommendations */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
            <p>Similar projects and suggestions will appear here</p>
          </div>

          {/* Required Skills */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Required Skills</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-gray-100 rounded">HTML</span>
              <span className="px-3 py-1 bg-gray-100 rounded">CSS</span>
              <span className="px-3 py-1 bg-gray-100 rounded">JavaScript</span>
              <span className="px-3 py-1 bg-gray-100 rounded">
                UI/UX Design
              </span>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
