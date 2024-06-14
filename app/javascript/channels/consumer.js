// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `bin/rails generate channel` command.

import { createConsumer, Connection, logger } from "@rails/actioncable";

const metaRailsEnv = document.querySelector('meta[name="rails_env"]');
if (metaRailsEnv) {
  // We're running in development or test, we want quicker (re)connections from ActionCable
  console.log("Swizzling ActionCable Connection for faster reconnections in dev/test. See consumer.js for more info.");
  const originalConnectionMessageHandler = Connection.prototype.events.message;
  Connection.prototype.events.message = function (event) {
    if (!this.isProtocolSupported()) {
      return;
    }
    const { reason, reconnect, type } = JSON.parse(event.data);
    if (type == "disconnect" && reconnect === true) {
      logger.log(`Disconnect intercepted for reconnection. Reason: ${reason}`);
      // This fires after 500ms, rather than waiting for two heartbeats to miss and ConnectionMonitor to
      // reconnect a stale connection after 6+ seconds.
      return this.reopen();
    } else {
      return originalConnectionMessageHandler.call(this, event);
    }
  };
}

export default createConsumer();
