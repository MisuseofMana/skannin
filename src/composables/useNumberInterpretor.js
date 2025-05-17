export const useRandomNumber = () => {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useInterpretNumber = (number) => {
    console.log('mod by primes')

    const bookFreq = (number % 73) <= 2
    const monsterFreq = (number % 53) <= 2
    const equipmentFreq = (number % 31) <= 2
    const consumableFreq = (number % 13) <= 2
    const dustFreq = (number % 2) <= 2

    const results = [ bookFreq, monsterFreq, equipmentFreq, consumableFreq, dustFreq ]

    console.log(results)
}