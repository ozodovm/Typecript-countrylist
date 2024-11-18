import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CountryType } from "./CountryList";
import { ChangeEvent, useContext, useEffect } from "react";
import { Context } from "../context/Context";
import { Public, Favorite, Bookmark, Search } from "@mui/icons-material"

const Header = () => {
  const { setCountries, countries, refresh, setRefresh, setLoading } = useContext(Context)
  const liked: CountryType[] = useSelector((state: RootState) => state.likedArray.liked);
  const saved: CountryType[] = useSelector((state: RootState) => state.savedArray.saved);

  // search input change event
  function handleChangeSearch(e: ChangeEvent<HTMLInputElement>): void {
    const value: string = e.target.value.toLowerCase();
    if (value === "") {
      setRefresh(!refresh);
      return;
    } else {
      setLoading(true);
      setTimeout(() => {
        setCountries(countries.filter((item: CountryType) => item.name.toLowerCase().includes(value)))
        setLoading(false);
      }, 800)
    }
  }

  useEffect(() => {
    if (!saved.length && !liked.length) {
      setRefresh(!refresh);
    }
  }, [saved, liked]);

  function handleClickedLikes(): void {
    if (liked.length) {
      setCountries(liked)
    }
    else {
      setRefresh(!refresh);
      alert("No countries have been liked");
    }
  }

  function handleSavesCLicked(): void {
    if (saved.length) {
      setCountries(saved)
    }
    else {
      setRefresh(!refresh);
      alert("No countries have been saved");
    }
  }

  return (
   <header className="p-6 flex items-center justify-between bg-white shadow-lg rounded-b-2xl">
    <h2 className="lg:text-[32px] text-[26px] font-bold text-gray-800 tracking-wide flex items-center space-x-2">
      <Public fontSize="large" className="text-blue-500" />
      <span>Countries</span>
    </h2>
      <div className="flex items-center space-x-4">
        <div className="relative w-full max-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            onChange={handleChangeSearch}
            autoComplete="off"
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none text-[16px] placeholder-gray-500"
            placeholder="Search countries..."
            type="text"
            name="search"
            id="search"
          />
        </div>

        {/* Likes Button */}
        <button
          onClick={handleClickedLikes}
          className="relative rounded-full w-[50px] h-[50px] flex items-center justify-center bg-red-100 text-red-600 shadow-md hover:bg-red-200 transition duration-300"
        >
          <Favorite fontSize="medium" />
          <span className="absolute top-0 right-0 w-[20px] h-[20px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {liked.length}
          </span>
        </button>

        {/* Saves Button */}
        <button
          onClick={handleSavesCLicked}
          className="relative rounded-full w-[50px] h-[50px] flex items-center justify-center bg-blue-100 text-blue-600 shadow-md hover:bg-blue-200 transition duration-300"
        >
          <Bookmark fontSize="medium" />
          <span className="absolute top-0 right-0 left-0 bottom-0 w-[20px] h-[20px] bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {saved.length}
          </span>
        </button>
      </div>
</header>
  
  )
}

export default Header
