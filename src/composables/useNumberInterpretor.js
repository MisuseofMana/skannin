import { bookDirectory, consumableDirectory, equipmentDirectory, fragmentDirectory } from "./useItemList";
import { monsterDirectory } from "./useMonsterList";

export const useRandomNumber = (min = 100000, max = 999999) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useInterpretNumber = (number) => {
    const bookFreq = (number % 73) <= 5
    const monsterFreq = (number % 53) <= 5
    const equipmentFreq = (number % 31) <= 3
    const consumableFreq = (number % 13) <= 3
    const fragmentFreq = (number % 2) <= 2

    const result = [ bookFreq, monsterFreq, equipmentFreq, consumableFreq, fragmentFreq ].indexOf(true)
    const whatWasFound = [bookDirectory, monsterDirectory, equipmentDirectory, consumableDirectory, fragmentDirectory]

    const directory = whatWasFound[result].value
    const payload = {
        directory,
        index: useRandomNumber(0, directory.length - 1),
    }

    return payload
}