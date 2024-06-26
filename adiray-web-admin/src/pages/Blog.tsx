import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import AOS from 'aos';

type BlogPost = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

const inputClasses = 'pl-10 pr-4 py-3 shadow-md text-md rounded-lg';
const hrClasses = 'flex-1 border-zinc-300';

const Blog: React.FC = () => {
  const shouldAnimate = window.innerWidth <= 768;
  AOS.init({
    duration: 800,
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get<BlogPost[]>('http://localhost:8080/api/posts/')
      .then((response: AxiosResponse<BlogPost[]>) => {
        setBlogPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blog posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogPosts.length) {
    return <div>No posts found</div>;
  }

  const extractFirst20Words = (text: string): string => {
    const words = text.split(' ');
    const first20Words = words.slice(0, 40);
    return first20Words.join(' ');
  };

  const filteredPosts = blogPosts.filter(post => {
    return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           post.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="relative w-full flex justify-center shadow-md">
      <div className="p-8 px-[10vw] z-[5] max-w-[1300px] flex flex-col justify-center  ">
        <div className="mb-6 md:flex justify-between items-center">
          <h1 data-aos={shouldAnimate ? 'slide-right' : ''} className="text-[clamp(35px,3.5vw,5rem)] font-Mont font-bold">
            Latest <span className="text-blue-900">Updates</span>
          </h1>
          <div data-aos={shouldAnimate ? 'slide-left' : ''} className="flex items-center gap-2 mt-2">
            <hr className={hrClasses} />
            <div className="relative flex items-center ">
              <input type="text" placeholder="Search..." className={inputClasses} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <svg
                className="w-4 h-4 absolute left-3  flex items-center "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            {/* Add Create Blog Button */}
            <Link to="/admin/posts/" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Create Blog</Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {filteredPosts.map((post: BlogPost) => (
            <div key={post._id} className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0  md:w-1/3">
                <Link to={`/admin/blogposts/${post._id}`}>
                  <img src={post.imageUrl } alt={post.title} className="rounded-lg object-cover w-full " />
                </Link>
              </div>
              <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-black mb-2">
                  <Link to={`/admin/blogposts/${post._id}`} className="hover:text-blue-900">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-700">{extractFirst20Words(post.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
