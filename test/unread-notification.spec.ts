import { NotificationNotFound } from "@app/use-cases/errors/notification-not-found"
import { UnreadNotification } from "@app/use-cases/unread-notification"
import { makeNotification } from "./factories/notifications-factory"
import { InMemoryNotificationsRepository } from "./repositories/in-memory-notifications-repository"



describe('Unread notification', () => {
    test('it should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        const notification = makeNotification({
            readAt: new Date(),
        })

        await notificationsRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id,
        })

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    test('it should not be able to unread a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})