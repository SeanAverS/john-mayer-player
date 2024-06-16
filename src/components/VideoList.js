import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const apiKey = "AIzaSyBVIOEDjrULYj_7yyTKCsUZswI6zyvlaVE";

  useEffect(() => {
    const cachedVideos = localStorage.getItem("videos");
    if (cachedVideos) {
      setVideos(JSON.parse(cachedVideos));
    } else {
      const fetchVideos = async () => {
        try {
          const params = {
            key: apiKey,
            part: "snippet",
            q: "John Mayer 2019 Live",
            type: "video",
            maxResults: 3,
          };
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/search",
            { params }
          );

          console.log(
            "Request URL:",
            `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams(
              params
            ).toString()}`
          );

          localStorage.setItem("videos", JSON.stringify(response.data.items));

          setVideos(response.data.items);
        } catch (error) {
          console.error("Error fetching videos:", error);
          if (error.response) {
            console.log("Error Response Data:", error.response.data);
          }
        }
      };

      fetchVideos();
    }
  }, [apiKey]);

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div key={video.id.videoId} className="video-container">
          <Link
            to={`/video/${encodeURIComponent(video.id.videoId)}`}
            className="video-link"
          >
            <img
              src={video.snippet.thumbnails.high.url}
              alt={video.snippet.title}
              className="video-thumbnails"
            />
            <p className="video-title">{video.snippet.title}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
