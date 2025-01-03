const start = new Date();
export const execute = async (Matrix, mek) => {
    const pingMsg = await Matrix.sendMessage(mek.key.remoteJid, {
        text: '*pinging...*'
    }, { quoted : mek });
    await Matrix.sendMessage(mek.key.remoteJid, { react: { text: `📣`, key: mek.key }})
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;
    await Matrix.relayMessage(mek.key.remoteJid, {
        protocolMessage: {
            key: pingMsg.key,
            type: 14,
            editedMessage: {
                conversation: `*ѕρєє∂ тєѕт🪽:* ${responseTime.toFixed(2)} мѕ`
            }
        }
    }, {});
};

export const command = ['ping'];
export const description = 'Check the server\'s upload and download speed.';
export const category = 'Main';