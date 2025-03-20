import { Card } from "@/components/ui/card";

export const EventSkeleton = () => {
  return (
    <div className="max-w-[1100px] mx-auto p-6">
      <div className="mb-4 text-center animate-pulse">
        <div className="h-8 w-48 mx-auto rounded bg-gray-200"></div>
      </div>
      <div className="mb-8 flex justify-center animate-pulse">
        <div className="h-10 w-32 rounded bg-gray-200"></div>
      </div>

      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 animate-pulse">
            <div className="h-6 w-3/4 rounded bg-gray-200 mb-4"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
            <div className="h-px bg-gray-200 my-4"></div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-200"></div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
