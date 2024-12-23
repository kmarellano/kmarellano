export function ExpertiseSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4">
        <h2 className="text-2xl font-bold text-center mb-12">
          My Expertise Area
        </h2>
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">UI/UX Design</span>
              <span>95%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full w-[95%] bg-[#FF7A41] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Web Development</span>
              <span>85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full w-[85%] bg-[#FF7A41] rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Digital Marketing</span>
              <span>90%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div className="h-full w-[90%] bg-[#FF7A41] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
