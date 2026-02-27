import { google } from 'googleapis';
import { env } from '@/env';

export async function searchYoutubeVideo(query: string) {
  const youtube = google.youtube({
    version: 'v3',
    auth: env.GOOGLE_API_KEY,
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

/**
 * Search YouTube for the top N relevant video IDs.
 */
export async function searchYoutubeVideos(
  query: string,
  maxResults = 2
): Promise<string[]> {
  const youtube = google.youtube({
    version: "v3",
    auth: env.GOOGLE_API_KEY,
  });

  try {
    const response = await youtube.search.list({
      part: ["id"],
      q: query,
      type: ["video"],
      maxResults,
      relevanceLanguage: "en",
    });

    return (
      response.data.items
        ?.map((item) => item.id?.videoId)
        .filter((id): id is string => !!id) ?? []
    );
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    return [];
  }
}
