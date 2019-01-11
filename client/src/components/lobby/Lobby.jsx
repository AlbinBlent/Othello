import React from "react";
import io from "socket.io-client";

export default class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: this.props.location.state.name,
      players: []
    };
    const options = { query: "name=" + JSON.stringify(this.state.player) };
    const socket = io("http://localhost:3001/", options);
    socket.on("currentPlayers", players => {
      this.setState({ players: players });
    });
    socket.on("newPlayer", player => {
      const players = this.state.players.slice();
      players.push(player);
      this.setState({ players: players });
    });
  }

  renderPlayers(players) {
    console.log(players);
    const playerList = [];
    players.forEach(player => {
      playerList.push(<li>{player.name}</li>);
    });
    return playerList;
  }

  render() {
    const { players, player } = this.state;
    return (
      <div>
        <h2>Players in lobby:</h2>
        <ul>{this.renderPlayers(players)}</ul>
        <h1>{"You: " + player}</h1>
      </div>
    );
  }
}
