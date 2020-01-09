let accessToken = null;
let clientID= "00dbe5912b1147b68f32cf7d40798be9";
let redirectURI= "http://localhost:3000/";

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }else {
            const access_token = window.location.href.match(/access_token=([^&]*)/);
            const expire_in = window.location.href.match(/expires_in=([^&]*)/);
            if(access_token && expire_in){
                accessToken = access_token[1];
                const expiresIn = expire_in[1];
                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            }else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
                return accessToken;
        }
    },
    
    search(term){
        const accessToken = this.getAccessToken();
        return(
            fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(jsonResponse => {
                if (!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    }));
                }
            })    
        )
    },

    savePLaylist(playlistName, trackURIs){
        if(!playlistName || !trackURIs)
            return;
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`}
        let clientID = null;

        return fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
            })
        .then(response => response.json()).then(jsonResponse => {
            clientID = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists`, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({
                name: playlistName
              })
            })
        })
        .then(response => response.json()).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${clientID}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
            })
    }
}

export default Spotify
