import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const apiKey = "AIzaSyBVIOEDjrULYj_7yyTKCsUZswI6zyvlaVE";

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/videos",
          {
            params: {
              key: apiKey,
              part: "snippet,contentDetails,statistics",
              id: encodeURIComponent(id),
            },
          }
        );
        setVideo(response.data.items[0]);
      } catch (error) {
        console.error("Error fetching related videos:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log("Error Response Data:", error.response.data.error);
        }
      }
    };

    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              key: apiKey,
              part: "snippet",
              q: encodeURIComponent(id),
              type: "video",
              maxResults: 3,
            },
          }
        );
        setRelatedVideos(response.data.items);
        console.log(setRelatedVideos(response.data.items));
      } catch (error) {
        console.error("Error fetching related videos:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          console.log("Error Response Data:", error.response.data.error);
        }
      }
    };

    fetchVideo();
    fetchRelatedVideos();
  }, [id, apiKey]);

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      {video && (
        <div>
          <YouTube videoId={video.id} opts={opts} />
          <h2>{video.snippet.title}</h2>
          <p>{video.snippet.description}</p>
        </div>
      )}
      <div>
        <h3>Related Videos</h3>
        {relatedVideos.map((video) => (
          <div key={video.id.videoId}>
            <Link to={`/video/${encodeURIComponent(video.id.videoId)}`}>
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title}
              />
              <p>{video.snippet.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetail;