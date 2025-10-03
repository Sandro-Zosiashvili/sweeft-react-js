import {UnsplashPhoto} from "@/app/logics/type";


export const createBalancedColumns = (photos: UnsplashPhoto[], columnCount: number = 3) => {
    const columns: UnsplashPhoto[][] = Array.from({ length: columnCount }, () => []);
    const columnHeights: number[] = Array(columnCount).fill(0);

    photos.forEach(photo => {
        // ვამოწმებთ null-ს და ვიყენებთ default მნიშვნელობებს
        const width = photo.width ? parseInt(photo.width) : 400;
        const height = photo.height ? parseInt(photo.height) : 300;

        const aspectRatio = height / width;

        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        columns[shortestColumnIndex].push(photo);
        columnHeights[shortestColumnIndex] += aspectRatio;
    });

    return columns;
};