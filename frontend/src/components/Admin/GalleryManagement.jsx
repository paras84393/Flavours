import { useState } from "react";

export default function GalleryManagement() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }
    

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {

      setLoading(true);

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/gallery",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      alert("Gallery post uploaded successfully.");

      setTitle("");
      setDescription("");
      setTags("");
      setImages([]);

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">

      <h1 className="text-3xl font-bold mb-8">
        Gallery Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="font-semibold">
            Title
          </label>

          <input
            type="text"
            className="w-full border rounded p-3 mt-2"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

        </div>

        <div>

          <label className="font-semibold">
            Description
          </label>

          <textarea
            rows={5}
            className="w-full border rounded p-3 mt-2"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
          />

        </div>

        <div>

          <label className="font-semibold">
            Tags
          </label>

          <input
            type="text"
            placeholder="food, starter, spicy"
            className="w-full border rounded p-3 mt-2"
            value={tags}
            onChange={(e)=>setTags(e.target.value)}
          />

        </div>

        <div>

          <label className="font-semibold">
            Images
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            className="mt-2"
            onChange={(e)=>setImages(e.target.files)}
          />

        </div>

        <button
          className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700"
        >
          {loading ? "Uploading..." : "Upload Gallery"}
        </button>

      </form>
     
    </div>
  );
}