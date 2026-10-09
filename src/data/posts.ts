export interface Post {
  type: "image" | "video";
  src: string;
  caption: string;
}

// Add your photo/video links here.
// For images: use a direct public URL (Google Drive, Imgur, Cloudinary, etc.)
// For videos: use a direct .mp4 link
export const posts: Post[] = [
  // { type: "image", src: "https://your-image-link.jpg", caption: "Haldi prep begins!" },
  // { type: "video", src: "https://your-video-link.mp4", caption: "Sangeet rehearsal" },
];
