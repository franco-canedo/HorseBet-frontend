import React, { Component } from "react";

class CenterComponentProfile extends Component {

    

    renderRecentGames = () => {
        const winners = (gameWinners) => {
            console.log(gameWinners)
            // let obj = threeGames[game].game_winners;
            for (const winner in gameWinners) {
             return <p>winner:{gameWinners[winner].user.username}</p>
            }
        }
        let threeGames = this.props.user.games
        for (const game in threeGames) {
            console.log(threeGames[game].game_winners)
            return <div>
                <p>id: {threeGames[game].id}</p>
                {winners(threeGames[game].game_winners)}
                <p>Jackpot: ${threeGames[game].jackpot}</p>
                <p>Minimum bet: ${threeGames[game].minimum_bet}</p>
            </div>
        }
    }

    render() {
        let array = this.props.user.games;
        let gamesPlayed = 0
        for (const game in array) {
            gamesPlayed = gamesPlayed + 1;
        }

        let array2 = this.props.user.game_winners;
        let wins = 0
        for (const game in array2) {
            wins = wins + 1;
        }

        
        return (
            <div className="CenterComponentProfile">
                <div className="UserInfoDivs">
                    <h2>Manage Funds:</h2>
                    <h3>You have: ${this.props.user.deposit}</h3>
                    <button>Deposit</button>
                    <button>Withdraw</button>
                </div>

                <div className="UserInfoDivs">
                    <h2>Stats:</h2>
                    <p>Games Played:{gamesPlayed}</p>
                    <p>Number of wins:{wins}</p> */}
                    <p>Total Winnings: $</p>
                    <p>Average jackpot: $</p> 
                    {/* {this.props.user.games && this.props.user.games} */}


                </div>

                <div className="UserInfoDivs">
                    <h2>Profile Info:</h2>
                    <p>{this.props.user.username}</p>
                    <p>{this.props.user.bio}</p>

                    <button>Edit</button>
                    <h4>Recent Games:</h4>
                    {this.renderRecentGames()}

                </div>


            </div>
        );
    }
}

export default CenterComponentProfile;