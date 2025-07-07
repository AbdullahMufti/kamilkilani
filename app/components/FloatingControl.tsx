import { KamilK } from "@/data/data";

const FloatingControls = ({
  storyIndex,
  fontSize,
  decreaseFontSize,
  increaseFontSize,
  goToPrevious,
  goToNext,
}: {
  storyIndex: number;
  fontSize: number;
  decreaseFontSize: () => void;
  increaseFontSize: () => void;
  goToPrevious: () => void;
  goToNext: () => void;
}) => {
  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg  shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Previous Story Button */}
      {storyIndex !== undefined && storyIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="القصة السابقة"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="text-sm font-medium">السابق</span>
        </button>
      )}

      {/* Font Size Controls */}
      {fontSize && (
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={decreaseFontSize}
            className="rounded-full flex items-center justify-center text-sm font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
            title="تصغير الخط"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 dark:text-gray-300"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
              <line x1="8" x2="14" y1="11" y2="11" />
            </svg>
          </button>
          <span className="text-lg font-medium px-2 min-w-[2rem] text-center text-gray-800 dark:text-white">
            {fontSize}
          </span>
          <button
            onClick={increaseFontSize}
            className="rounded-full flex items-center justify-center text-sm font-bold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
            title="تكبير الخط"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 dark:text-gray-300"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" x2="16.65" y1="21" y2="16.65" />
              <line x1="11" x2="11" y1="8" y2="14" />
              <line x1="8" x2="14" y1="11" y2="11" />
            </svg>
          </button>
        </div>
      )}

      {/* Next Story Button */}
      {storyIndex !== undefined && storyIndex < KamilK.length - 1 && (
        <button
          onClick={goToNext}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          title="القصة التالية"
        >
          <span className="text-sm font-medium">التالي</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FloatingControls;
