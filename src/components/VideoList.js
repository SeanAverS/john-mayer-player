import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";

const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const apiKey = "AIzaSyBVIOEDjrULYj_7yyTKCsUZswI6zyvlaVE";

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const params = {
          key: apiKey,
          part: "snippet",
          q: "John Mayer 2019 Live",
          type: "video",
          maxResults: 10,
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

        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
        if (error.response) {
          console.log("Error Response Data:", error.response.data);
        }
      }
    };

    fetchVideos();
  }, [apiKey]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      {videos.map((video) => (
        <YouTube
          key={video.id.videoId}
          videoId={video.id.videoId}
          opts={opts}
        />
      ))}
    </div>
  );
};

export default VideoList;
