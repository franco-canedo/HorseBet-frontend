import React, { Fragment } from 'react';
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ activeGameId, handleReceivedBoo, handleReceivedHype, handleReceivedUserHorse, handleReceivedGameUser }) => {
  return (
    <Fragment>

      <ActionCableConsumer
        key={activeGameId}
        channel={{ channel: 'BoosChannel', game: activeGameId }}
        onReceived={handleReceivedBoo}
      />
      <ActionCableConsumer
        // key={activeGameId}  
        channel={{ channel: 'HypesChannel', game: activeGameId }}
        onReceived={handleReceivedHype}
      />

      <ActionCableConsumer
        // key={activeGameId}  
        channel={{ channel: 'UserHorsesChannel', game: activeGameId }}
        onReceived={handleReceivedUserHorse}
      />

      


    </Fragment>



  );
};

export default Cable;