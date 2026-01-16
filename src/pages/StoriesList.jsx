import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { BiLoaderAlt } from "react-icons/bi";

const StoriesList = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const navigate = useNavigate();
  const cardsPerPage = 8;

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://mxpertztestapi.onrender.com/api/sciencefiction"
        );
        const data = await response.json();
        const storyWithStatus = data.map((story, index) => ({
          ...story,
          status: ["New", "In Progress", "Completed"][index % 3],
        }));
        setStories(storyWithStatus);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const filteredStories =
    selectedFilter === "All"
      ? stories
      : stories.filter((story) => story.status === selectedFilter);

  const totalPages = Math.ceil(filteredStories.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const displayedStories = filteredStories.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedFilter("All");
    setCurrentPage(1);
  };

  const getStatusColor = (status) => {
    if (status === "New") return "from-purple-500 to-blue-500";
    if (status === "In Progress") return "from-yellow-500 to-orange-500";
    if (status === "Completed") return "from-green-500 to-teal-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <BiLoaderAlt className="text-blue-500 text-6xl mx-auto mb-4 animate-spin" />
          <p className="text-white text-lg">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Science Fiction Stories
          </h1>
        </div>

        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <button
            onClick={() => handleFilterChange("All")}
            className={`px-8 py-3 rounded-full font-bold text-white transition ${
              selectedFilter === "All"
                ? "bg-linear-to-r from-blue-600 to-blue-500 shadow-lg"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterChange("New")}
            className={`px-8 py-3 rounded-full font-bold text-white transition ${
              selectedFilter === "New"
                ? "bg-linear-to-r from-purple-600 to-blue-500 shadow-lg"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            New
          </button>
          <button
            onClick={() => handleFilterChange("In Progress")}
            className={`px-8 py-3 rounded-full font-bold text-white transition ${
              selectedFilter === "In Progress"
                ? "bg-linear-to-r from-yellow-600 to-orange-500 shadow-lg"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => handleFilterChange("Completed")}
            className={`px-8 py-3 rounded-full font-bold text-white transition ${
              selectedFilter === "Completed"
                ? "bg-linear-to-r from-green-600 to-teal-500 shadow-lg"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
          >
            Completed
          </button>
          <button
            onClick={handleClearAll}
            className="px-8 py-3 rounded-full font-bold text-white bg-slate-700 hover:bg-slate-600"
          >
            Clear All
          </button>
        </div>

        {stories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No stories found</p>
          </div>
        ) : displayedStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No stories match this filter
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayedStories.map((story) => (
                <div
                  key={story._id}
                  onClick={() => navigate(`/story/${story._id}`)}
                  className="cursor-pointer"
                >
                  <div className="overflow-hidden rounded-2xl shadow-xl transition hover:shadow-2xl hover:-translate-y-2 border-4 border-purple-600/50">
                    <div className="h-48 overflow-hidden bg-slate-700">
                      <img
                        src={`https://ik.imagekit.io/dev24/${story?.Storyimage}`}
                        alt={story?.Title}
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    </div>

                    <div className="bg-linear-to-b from-slate-800 to-slate-900 p-4">
                      <h2 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {story?.Title}
                      </h2>
                      <div
                        className={`w-full px-4 py-2 rounded-full text-center bg-linear-to-r ${getStatusColor(
                          story.status
                        )} text-white font-bold text-sm shadow-lg hover:shadow-xl transition`}
                      >
                        {story.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 disabled:opacity-50 flex items-center gap-2"
                >
                  <MdNavigateBefore size={20} />
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-lg bg-slate-700 text-white font-bold hover:bg-slate-600 disabled:opacity-50 flex items-center gap-2"
                >
                  Next
                  <MdNavigateNext size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StoriesList;
