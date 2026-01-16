import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BiLoaderAlt } from "react-icons/bi";

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchStory = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://mxpertztestapi.onrender.com/api/sciencefiction/${id}`
        );
        const data = await response.json();
        setStory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <BiLoaderAlt className="text-blue-500 text-6xl " />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <p className="text-white">Story not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <h1 className="text-4xl text-center font-bold p-4 text-purple-600 shadow-lg">
        The Lost City Of <span className="text-gray-200"> Future Earth</span>
      </h1>
      <div className=" my-6 flex item-center justify-center gap-4">
        <button className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700  shadow-lg ">
          Word Explore
        </button>
        <button className="px-6 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-gray-700  shadow-lg ">
          Story Adventure
        </button>
        <button className="px-6 py-2 rounded-full bg-gray-600 text-white font-semibold hover:bg-gary-700  shadow-lg ">
          Brain Quest
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-white mb-8">{story?.Title}</h1>
        <img
          src={`https://ik.imagekit.io/dev24/${story?.Storyimage}`}
          alt={story?.Title}
          className="rounded-lg w-full h-64 object-cover"
        />
        <p className="text-slate-400 text-sm mt-4">{story?.Paragraph}</p>
      </div>
      <button
        onClick={() => navigate("/")}
        className="text-blue-400 hover:text-blue-300 font-bold p-4"
      >
        ← Back
      </button>
    </div>
  );
};

export default StoryDetail;
