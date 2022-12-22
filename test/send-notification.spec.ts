import { SendNotification } from "../src/app/use-cases/send-notification"
import { InMemoryNotificationsRepository } from "./repositories/in-memory-notifications-repository"



describe('Send notification', () => {
    test('it should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsRepository)

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1)
        expect(notificationsRepository.notifications[0]).toEqual(notification)
    })
})