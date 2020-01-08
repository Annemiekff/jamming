import React from 'react';

class Track extends React.Component {
    // renderAction(){
    //     if (isRemoval === true){
    //         return <button className="Track-action"> - </button>
    //     }
    //     else return <button className="Track-action"> + </button>
    // }

    render() {
        return(
            <div className="Track">
            <div className="Track-information">
              <h3>{/*<!-- track name will go here -->*/}</h3>
              <p>{/* <!-- track artist will go here--> | <!-- track album will go here -->*/}</p>
            </div>
            {/*renderAction()}*/}
          </div> 
        )
    };
};

export default Track;