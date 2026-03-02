export default function NotFound({ title = "404 - Page Not Found", message = "Oops! The page you're looking for doesn't exist." }) {
  return (
    <div className="w-150 p-10 mx-auto bg-amber-50 dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400">{message}</p>
    </div>
  );
}