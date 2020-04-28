import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ activeGameId, handleReceivedBoo, handleReceivedHype }) => {
  return (
    <Fragment>
     
          <ActionCable
            key={activeGameId}  
            channel={{ channel: 'BoosChannel', game: activeGameId }}
            onReceived={handleReceivedBoo}
          />
          <ActionCable
            key={activeGameId}  
            channel={{ channel: 'HypesChannel', game: activeGameId }}
            onReceived={handleReceivedHype}
          />
          </Fragment>
        
     
    
  );
};

export default Cable;