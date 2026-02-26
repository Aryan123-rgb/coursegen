import { google } from 'googleapis';

export async function searchYoutubeVideo(query: string) {
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY,
  });

  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 1,
      relevanceLanguage: 'en',
    });

    const video = response.data.items?.[0];
    
    if (!video) return null;

    return {
      videoId: video.id?.videoId,
      title: video.snippet?.title,
      description: video.snippet?.description,
      thumbnail: video.snippet?.thumbnails?.high?.url,
    };
  } catch (error) {
    console.error("Error searching YouTube:", error);
    return null;
  }
}
