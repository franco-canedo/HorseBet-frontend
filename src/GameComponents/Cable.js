import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ activeGameId, handleReceivedBoo, handleReceivedHype, handleReceivedUserHorse }) => {
  return (
    <Fragment>

      <ActionCable
        key={activeGameId}
        channel={{ channel: 'BoosChannel', game: activeGameId }}
        onReceived={handleReceivedBoo}
      />
      <ActionCable
        // key={activeGameId}  
        channel={{ channel: 'HypesChannel', game: activeGameId }}
        onReceived={handleReceivedHype}
      />

      <ActionCable
        // key={activeGameId}  
        channel={{ channel: 'UserHorsesChannel', game: activeGameId }}
        onReceived={handleReceivedUserHorse}
      />
    </Fragment>



  );
};

export default Cable;