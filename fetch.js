const body = {
    game_id: 27,
    horse_id: 33,
    user_id: 5

}

const configObj = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    body: JSON.stringify(body)
}
fetch(`http://localhost:3000/winner`, configObj)