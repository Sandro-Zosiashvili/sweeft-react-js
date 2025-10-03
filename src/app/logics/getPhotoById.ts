import axios from 'axios';

export const getPhotoById = async  (id: string) => {
    try {
        const response = await  axios.get(`https://api.unsplash.com/photos/${id}`, {
            headers: {
                Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
            }
        });
        const {downloads, views, likes} = response.data;
        return {downloads, views, likes};
    } catch (error) {
        console.error('Error fetching photo stats:', error);
        return null;
    }
};


