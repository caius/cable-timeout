class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    logger.info "Notifications channel got subscription"
    # stream_from "some_channel"
    stream_from "notifications_global"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logger.info "Notifications channel got unsubscription"
  end
end
