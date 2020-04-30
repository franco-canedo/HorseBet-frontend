const initialState = [
    {
        id: 0,
        speed: 10
    },
    {
        id: 0,
        speed: 10
    },
    {
        id: 0,
        speed: 10
    },
    {
        id: 0,
        speed: 10
    }
]

const horses = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_HORSES':
            return [...action.payload]
        case 'INCREMENT':
            console.log(action.payload)
            const { boo } = action.payload;
            const horse = state.find(h => h.id === boo.horse_id);
            const index = state.indexOf(horse)
            horse.speed = horse.speed + 5;

            const array = [...state]
            array[index] = horse;
            return [...array]
        case 'DECREMENT':
            const { hype } = action.payload;
            const horse2 = state.find(h => h.id === hype.horse_id);
            const index2 = state.indexOf(horse2)
            horse2.speed = horse2.speed - 5;
            const array2 = [...state]
            array2[index2] = horse2;
            return [...array2]
        default:
            return state;
    }
}

export default horses;