import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ games, handleReceivedBoo }) => {
  return (
    <Fragment>
      {games.map(game => {
        return (
          <ActionCable
            key={game.id}  
            channel={{ channel: 'BoosChannel', game: game.id }}
            onReceived={handleReceivedBoo}
          />
        );
      })}
    </Fragment>
  );
};

export default Cable;