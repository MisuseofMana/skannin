import { DiscoverableTypes as DT } from "./useDiscoverableTypes"

export const useGetImage = ({type = 'placeholder', name = 'placeholder', classification = 'placeholder', path = "placeholder"}) => {
    if (classification === DT.MONSTER) {
        return new URL(`../assets/monster/${type}/${name}.png`, import.meta.url).href
    }
    else {
        return new URL(`../assets/items/${classification}/${path}.png`, import.meta.url).href
    }
}