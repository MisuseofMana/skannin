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