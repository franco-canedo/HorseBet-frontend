const gamesNewsFeed = (state = [], action) => {
    switch (action.type) {
        case 'SET_NEWS_FEED':
            return [...action.payload];
        default:
            return state;
    }
}

export default gamesNewsFeed;