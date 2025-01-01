const Skeleton = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="w-full h-96 bg-gray-300 rounded"></div>
            <div className="flex items-center space-x-4 mt-4">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="mt-4 space-y-2">
                <div className="h-2 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
    )
}

export default Skeleton