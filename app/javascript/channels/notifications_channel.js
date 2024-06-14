import consumer from "channels/consumer";

consumer.subscriptions.create("NotificationsChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to the notifications channel");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
    console.log("Disconnected from the notifications channel");
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    this.appendLine(data);
  },

  appendLine(data) {
    const html = this.createLine(data);
    const element = document.querySelector("#notifications");
    element.insertAdjacentHTML("beforeend", html);
  },

  createLine(data) {
    return `
      <ul>${data["message"]}</ul>
    `;
  },
});
