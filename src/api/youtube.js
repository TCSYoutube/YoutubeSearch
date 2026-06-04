import axios from 'axios';

const BASE = 'https://www.googleapis.com/youtube/v3';

export const ytApi = (apiKey) => {
  const get = (endpoint, params) =>
    axios.get(`${BASE}/${endpoint}`, { params: { ...params, key: apiKey } }).then(r => r.data);

  return {
    search: (q, maxResults = 12) =>
      get('search', { part: 'snippet', type: 'video', q, maxResults }),

    related: (videoId, maxResults = 12) =>
      get('search', { part: 'snippet', type: 'video', relatedToVideoId: videoId, maxResults }),

    videoStats: (id) =>
      get('videos', { part: 'statistics,snippet,contentDetails', id }),

    comments: (videoId, maxResults = 20) =>
      get('commentThreads', { part: 'snippet', videoId, maxResults, order: 'relevance' }),
  };
};
