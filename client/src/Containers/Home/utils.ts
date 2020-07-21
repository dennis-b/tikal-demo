export const calcMapWeight = ({ availableDays = [], reviews = {} }: { availableDays: any, reviews: any }) => {
    const availableCnt = availableDays.filter((availableDay: any) => availableDay).length
    return availableCnt + reviews.count;
}
