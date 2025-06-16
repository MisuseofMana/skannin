export const sortByQuantity = (arrayToSort) => {
    return arrayToSort.sort((a,b) => {
        if (a.quantity > b.quantity) {
          return -1
        }
        else if (a.quantity < b.quantity) {
          return 1
        }
        else return 0
    })
}

export const sortMonsterByHP = (arrayToSort) => {
  return arrayToSort.sort((a,b) => {
      if (a.stats.hp > b.stats.hp) {
        return -1
      }
      else if (a.stats.hp < b.stats.hp) {
        return 1
      }
      else return 0
  })
}

export const shuffle = (arrayToShuffle) => {
  const copy = [...arrayToShuffle]

    // Shuffle the copy using Fisher-Yates algorithm
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy
}