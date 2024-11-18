import { CountryType } from './CountryList'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { addLikes } from '../store/LikeSlice'
import { addSaves } from '../store/SavedSlice'

const CountryItem: React.FC<{ item: CountryType }> = ({ item }) => {
    const dispatch: AppDispatch = useDispatch();
    const liked: CountryType[] = useSelector((state: RootState) => state.likedArray.liked);
    const saved: CountryType[] = useSelector((state: RootState) => state.savedArray.saved);

    const isLiked: boolean = liked.indexOf(item) !== -1;
    const isSaved: boolean = saved.indexOf(item) !== -1;

    return (
        <li className='max-w-[320px] w-full rounded-2xl p-4 border border-gray-200 shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white'>
    <div className='relative overflow-hidden rounded-2xl'>
        <img 
            className='h-[200px] w-full object-cover rounded-t-2xl duration-300 transform hover:scale-105' 
            src={item.img} 
            alt={'country img'} 
        />
    </div>
    <div className='mt-4 p-4 rounded-b-2xl bg-gray-50'>
        <h3 className='text-[22px] font-bold text-gray-800 flex items-center mb-2'>
            {item.name} <span className='ml-2'>{item.flag}</span>
        </h3>
        <p className='text-[16px] text-gray-600 font-medium'>
            Capital: <span className='font-normal text-gray-700'>{item.capital}</span>
        </p>
        <p className='text-[16px] text-gray-600 font-medium mt-1'>
            Population: <span className='font-normal text-gray-700'>{item.population}</span>
        </p>
        <div className='flex items-center justify-end space-x-3 mt-4'>
            <button 
                onClick={() => dispatch(addLikes(item))} 
                className={`px-4 py-2 rounded-lg text-white text-[16px] font-semibold transition bg-red-500 hover:bg-red-600 ${
                    isLiked ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                Like
            </button>
            <button 
                onClick={() => dispatch(addSaves(item))} 
                className={`px-4 py-2 rounded-lg text-white text-[16px] font-semibold transition bg-blue-500 hover:bg-blue-600 ${
                    isSaved ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                Save
            </button>
        </div>
    </div>
</li>

    )
}
export default CountryItem
