import { CancelNotification } from "@app/use-cases/cancel-notification"
import { NotificationNotFound } from "@app/use-cases/errors/notification-not-found"
import { makeNotification } from "./factories/notifications-factory"
import { InMemoryNotificationsRepository } from "./repositories/in-memory-notifications-repository"



describe('Cancel notification', () => {
    test('it should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        const notification = makeNotification()

        await notificationsRepository.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id,
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    test('it should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})