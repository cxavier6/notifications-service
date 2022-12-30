import { CountRecipientNotification } from "@app/use-cases/count-recipient-notifications"
import { makeNotification } from "./factories/notifications-factory"
import { InMemoryNotificationsRepository } from "./repositories/in-memory-notifications-repository"



describe('Count recipient notification', () => {
    test('it should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const countRecipientNotification = new CountRecipientNotification(notificationsRepository)

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1'})
        )

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1'})
        )

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-2'})
        )

        const { count } = await countRecipientNotification.execute({
            recipientId: 'recipient-1'
        })

        expect(count).toEqual(2)
    })
})