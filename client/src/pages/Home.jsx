import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import FormField from "../components/FormField";
import RenderCard from "../components/RenderCard";
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  const fetchPost = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        setAllPost(data.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1
          className="font-extrabold text-[#222328]
       text-[32px]"
        >
          The Community Showcase
        </h1>
        <p
          className="mt-2 text-[#666e75] text-[16px] 
       max-w-[500px]"
        >
          Browse through a collection of amazing and imagnative images created
          by DALL-E
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing results for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard data={searchedResults} title="No Search results found" />
              ) : (
                <RenderCard data={allPosts} title="No Post Found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
