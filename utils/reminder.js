import { Notifications, Permissions } from "expo";

const { askAsync, NOTIFICATIONS } = Permissions;

const { cancelAllScheduledNotificationsAsync, scheduleLocalNotificationAsync } = Notifications;

import { getReminderStatus, setReminderStatus } from "./api";

export const unscheduleReminder = () =>
  cancelAllScheduledNotificationsAsync()
    .then(setReminderStatus(false));

export function scheduleReminder() {
  getReminderStatus().then(isScheduled => {

    if (! isScheduled) {
      askAsync(NOTIFICATIONS).then(
          ({ status }) => {
            if (status === "granted") {
              cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date()

              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(21)
              tomorrow.setMinutes(30);

              const localNotification = {
                title: "Your cards miss you",
                body: "It's time to study with your flashcards!",
                ios: {
                  sound: true,
                },
                android: {
                  priority: "high"
                }
              };

              const schedulingOptions = {
                time: tomorrow,
                repeat: "day",
              };

              scheduleLocalNotificationAsync(
                localNotification,
                schedulingOptions
              ).then(_=> setReminderStatus(true));
            }
          }
        )

    }


  });
}
