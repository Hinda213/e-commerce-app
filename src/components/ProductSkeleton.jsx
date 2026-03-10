

export default function ProductSkeleton(){
    return(
        <div className="bg-whitee dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md p-4 animate-pulse">
            {/* image placeholder*/}
            <div className="h-28 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>

            {/*title placeholder*/}
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

            {/* category placeholder*/}
            <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"></div>

            {/* button placeholder*/}
            <div className="h-9 bg-gray-300 dark:bg-gray-700 rounded"></div>


        </div>
    )
}