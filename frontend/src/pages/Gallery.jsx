import React, { useEffect, useState } from "react";
import { getGallery } from "../services/api";

export default function Gallery() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await getGallery();

        console.log("Gallery Response:", response);

        // Backend returns
        // {
        //   success:true,
        //   data:[...]
        // }

        setPosts(response.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
          Loading Gallery...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-bold text-center mb-2">
          Visual Flavors
        </h1>

        <p className="text-center text-gray-600 mb-12">
          A glimpse into our kitchen, our dishes, and the essence of Lal Chutney
        </p>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500 text-xl">
            No Gallery Posts Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                {/* Images */}

                {post.images?.length > 0 ? (
                  <img
                    src={`http://localhost:5000${post.images[0].url}`}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-200">
                    No Image
                  </div>
                )}

                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mt-3">
                    {post.description}
                  </p>

                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      console.log(response.data[0]);
                      console.log(response.data[0].images);

                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}

                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}