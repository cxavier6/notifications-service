import { Content } from "../src/app/entities/content"

test('it should be able to create a notification content', () => {
    const content = new Content ('Você recebeu uma solicitação')
    expect(content).toBeTruthy()
})