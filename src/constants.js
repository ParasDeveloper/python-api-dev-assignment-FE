export const columnOptions = [
    { value: 'video_id', label: 'VIDEO ID' },
    { value: 'title', label: 'VIDEO TITLE'},
    { value: 'channel_title', label: 'CHANNEL TITLE' },
    { value: 'views', label: 'VIEWS' },
    { value: 'publish_time', label: 'PUBLISHED ON' },
    { value: 'trending_date', label: 'TRENDING DATE' },
    { value: 'likes', label: 'LIKES' },
    { value: 'comment_count', label: 'COMMENT COUNT' }
  ];

  export const column = {
    video_id: "video id",
    title: "Video title",
    channel_title: "Channel Title",
    views: "Views",
    publish_time: "Published on",
    trending_date: "Trending date",
    likes: "Likes",
    comment_count: "Comment count",
  };

  export const URL = 'http://127.0.0.1:8000/'

  export const NO_DATA_TOAST = {
    title: `No data available`,
    status: "error",
    isClosable: true,
  }

  export const SERVER_ERROR_TOAST = {
    title: `Failed to load Data`,
    status: "error",
    isClosable: true,
  }

  export const API_STATUS={
    ERROR:"error"
  }