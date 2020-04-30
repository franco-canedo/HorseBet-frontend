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

const booReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            console.log(action.payload)
            const { boo } = action.payload;
            const horse = state.find(h => h.id === boo.horse_id);
            const index = state.indexOf(horse)
            horse.speed = horse.speed + 5;

            const array = [...state]
            array[index] = horse;
            return array
        default:
            return state;
    }
}

export default booReducer;