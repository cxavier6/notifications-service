import { NotificationNotFound } from "@app/use-cases/errors/notification-not-found"
import { ReadNotification } from "@app/use-cases/read-notification"
import { makeNotification } from "./factories/notifications-factory"
import { InMemoryNotificationsRepository } from "./repositories/in-memory-notifications-repository"



describe('Read notification', () => {
    test('it should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        const notification = makeNotification()

        await notificationsRepository.create(notification)

        await readNotification.execute({
            notificationId: notification.id,
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    test('it should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})