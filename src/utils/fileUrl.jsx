export const resolveFileUrl = (path) => {
  if (!path) return null;

  return `${import.meta.env.VITE_FILE_PATH_URL}${path}`;
};
