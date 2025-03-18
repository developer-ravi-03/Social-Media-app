import { Link } from "react-router-dom";
import { FaPen, FaVideo } from "react-icons/fa";

const PostInput = ({ user }) => {
  return (
    <>
      {user && (
        <>
          <div className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between w-full gap-4">
            {/* Profile Section */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <img
                src={user.profilePic.url}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="text-gray-500">
                &quot;Express yourself, the world is listening!&quot;
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {/* Create Post Button */}
              <Link
                to="/add-post"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium flex items-center gap-2 transition duration-300"
              >
                <FaPen />
                <span>Create Post</span>
              </Link>

              {/* Create Reel Button */}
              <Link
                to="/add-reel"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md text-sm font-medium flex items-center gap-2 transition duration-300"
              >
                <FaVideo />
                <span>Create Reel</span>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PostInput;
