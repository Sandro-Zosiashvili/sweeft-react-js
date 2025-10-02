import axios from 'axios';
import {isThenable} from "next/dist/shared/lib/is-thenable";

export const GetPhotoStats = async (id: string) => {
    try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            }
        });
        // if (!response) throw new Error('Invalid response');

        const {downloads, views, likes} = response.data;

        console.log('Downloads:', downloads);
        console.log('Views:', views);
        console.log("likes:", likes)

        return {downloads, views, likes};
    } catch (error) {
        console.error('Error fetching photo stats:', error);
        return null;
    }
};


