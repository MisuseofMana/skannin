import { DiscoverableTypes as DT } from "./useDiscoverableTypes"

export const useGetImage = ({type = 'placeholder', name = 'placeholder', classification = 'placeholder', path = "placeholder"}) => {
    if (classification === DT.MONSTER) {
        return new URL(`../assets/monster/${type}/${name}.png`, import.meta.url).href
    }
    else {
        return new URL(`../assets/items/${classification}/${path}.png`, import.meta.url).href
    }
}

export const useRPSImage = (imageName) => {
    return new URL(`../assets/bloodsport/${imageName}.png`, import.meta.url).href
}

export const useEventImage = ({folderName = 'intro', fileName}) => {
    return new URL(`../assets/${folderName}/${fileName}.png`, import.meta.url).href
}