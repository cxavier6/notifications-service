import { Notification } from "src/app/entities/notification"
import { Content } from "../src/app/entities/content"

describe('Notification', () => {
    test('it should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação'),
            category: 'social',
            recipientId: 'example-recipient-id'
        })
        expect(notification).toBeTruthy()
    })
})

