import { Notifications, Permissions } from "expo";

const { askAsync, NOTIFICATIONS } = Permissions;

const { cancelAllScheduledNotificationsAsync, scheduleLocalNotificationAsync } = Notifications;

import { getReminderStatus, setReminderStatus } from "./api";

export const unscheduleReminder = () =>
  cancelAllScheduledNotificationsAsync()
    .then(setReminderStatus(false));

export function scheduleReminder() {
  getReminderStatus().then(isScheduled => {
    console.log("isScheduled?????", isScheduled);
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

              console.log(" HO SCEDULATO")
            }
          }
        )

    }


  });
}

/*

getReminderStatus.then(isScheduled => {
  console.warn("not", isScheduled);
  setReminderStatus("YOOO")

});
*/


  /*
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === "granted") {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: "day",
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}*/
