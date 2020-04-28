import React, { Fragment } from 'react';
import { ActionCable } from 'react-actioncable-provider';

const Cable = ({ activeGameId, handleReceivedBoo }) => {
  return (
    <Fragment>
     
          <ActionCable
            key={activeGameId}  
            channel={{ channel: 'BoosChannel', game: activeGameId }}
            onReceived={handleReceivedBoo}
          />
          </Fragment>
        
     
    
  );
};

export default Cable;