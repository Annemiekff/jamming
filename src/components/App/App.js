import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        id: 1,
        name: 'Brabant',
        artist: 'Guus Meeuwis',
        album: 'Guus Meeuwis',
      },
      {
        id: 2,
        name: 'Candy',
        artist: 'Robby Williams',
        album: 'Take the Crown',
      },
      {
        id: 3,
        name: 'Les Lacs du Connemara',
        artist: 'Michel Sardou',
        album: 'Les Lacs du Connemara',
      }
      ],
      playlistName: 'List 1',
      playlistTracks: [{
        id: 4,
        name: 'Februari Song',
        artist: 'Josh Groban',
        album: 'Awake'
      },
      {
        id: 5,
        name: "You are loved (Don't give up)",
        artist: 'Josh Groban',
        album: 'Awake'
      },
      {
        id: 6,
        name: 'Weeping',
        artist: 'Josh Groban',
        album: 'Awake'
      },
      ]
    }; //ends state
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this)
  } // ends constructor

  addTrack(track) {
    if (this.state.playlistTracks.findIndex(saved => saved.id === track.id) === -1) {
      this.state.playlistTracks.push(track);
      this.setState({ playlistTracks: this.state.playlistTracks });
    }
  }

  removeTrack(track) {
    this.setState({ playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
    });
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name})
  }                                    

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div class="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.props.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.props.removeTrack} />
          </div>
        </div>
      </div>
    )
  }
}

export default App;
