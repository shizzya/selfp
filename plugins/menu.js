import { readdir } from 'fs/promises';
import path from 'path';
import os from 'os';
import moment from 'moment-timezone';

export const execute = async (Matrix, mek, { pushName, from, prefix }) => {
    const plugins = [];
    const pluginsDir = path.resolve('./plugins');
    const sessionsDir = path.resolve('./sessions');
    const restoreSessionsDir = path.resolve('./restored_sessions');
    const botName = "ᴇᴛʜɪx-ᴍᴅ-ᴠ3";
    const freeRam = formatBytes(os.freemem());
    const totalRam = formatBytes(os.totalmem());
    const platform = 'Heroku';
    const owner = '919142294671';
    const ownerName = 'єтнιχ';

    const currentTime = moment().tz("Asia/Kolkata").format("HH");
    const wish = currentTime < 12 ? "😁 Good morning" : currentTime < 18 ? "😊 Good afternoon" : "😴 Good Night";

    try {
        const pluginFiles = await readdir(pluginsDir);
        const pluginCount = pluginFiles.filter(file => file.endsWith('.js')).length;
        const sessionFolders = await readdir(sessionsDir);
        const restoreSessionFolders = await readdir(restoreSessionsDir);
        const activeSessionsCount = sessionFolders.length + restoreSessionFolders.length;

        for (const file of pluginFiles) {
            if (file.endsWith('.js')) {
                const pluginModule = await import(path.join(pluginsDir, file));
                const commands = Array.isArray(pluginModule.command) ? pluginModule.command : [pluginModule.command];
                const description = pluginModule.description || '';
                const usage = pluginModule.usage || '';
                const category = pluginModule.category || 'General';

                for (const command of commands) {
                    if (command) {
                        plugins.push({ command, description, usage, category });
                    }
                }
            }
        }

        const uptimeFormatted = formatUptime(process.uptime() * 1000);

        let menuMessage = `${wish}, *${pushName}*!\n🌟𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 𝙴𝚃𝙷𝙸𝚇-𝙼𝙳-𝚅3🌟.\n`;
        menuMessage += `╭─────────────━┈⊷\n`;
        menuMessage += `│◦ ʙᴏᴛ ɴᴀᴍᴇ : *${botName}*\n`;
        menuMessage += `│◦ ᴏᴡɴᴇʀ ɴᴀᴍᴇ : *${ownerName}*\n`;
        menuMessage += `│◦ ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ : *${owner}*\n`;
        menuMessage += `│◦ ᴜᴘᴛɪᴍᴇ : *${uptimeFormatted}*\n`;
        menuMessage += `│◦ ʀᴀᴍ : *${freeRam} / ${totalRam}*\n`;
        menuMessage += `│◦ ᴘʟᴀᴛғᴏʀᴍ : *${platform}*\n`;
        menuMessage += `│◦ ᴛᴏᴛᴀʟ ᴘʟᴜɢɪɴs : *${pluginCount}*\n`;
        menuMessage += `│◦ ᴀᴄᴛɪᴠᴇ sᴇssɪᴏɴs : *${activeSessionsCount}*\n`;
        menuMessage += `│◦ ᴘʀᴇғɪx : *[${prefix}]*\n`;
        menuMessage += `╰─────────────━┈⊷\n\n`;

        const categories = {};
        for (const { command, description, usage, category } of plugins) {
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push({ command, description, usage });
        }

        const categoryOrder = ['Downloader', 'AI', 'Converter', 'Main', 'General', 'Owner'];
        for (const category of categoryOrder) {
            if (categories[category]) {
                menuMessage += `╭━━━━━━━━━━━━━━━⪼\n`;
                menuMessage += `*\`➤❖${category.toUpperCase()} ᴍᴇɴᴜ❖\`*\n`;
                menuMessage += `╰━━━━━━━━━━━━━━━⪼\n\n`;
                for (const { command, description, usage } of categories[category]) {
                    menuMessage += `*◦ 📟ᴄᴏᴍᴍᴀɴᴅ:* ${command}\n`;
                    menuMessage += `*◦ 📂ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:* ${description}\n`;
                    menuMessage += `*◦ 💾ᴜsᴀɢᴇ:* ${
                        typeof usage === 'function'
                            ? usage(prefix)
                            : `${prefix}${command} ${usage ? usage : ''}`
                    }\n\n`;
                }
            }
        }

        menuMessage += `> *\`© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴇᴛʜɪx-ᴍᴅ\`*`;

        await Matrix.sendMessage(mek.key.remoteJid, { 
            image: { url: 'https://files.catbox.moe/hg0xgo.jpg' },
            caption: menuMessage,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `${wish}, ${pushName}`,
                    body: `${botName}`,
                    thumbnailUrl: "https://files.catbox.moe/hg0xgo.jpg",
                    mediaType: 2,
                    mediaUrl: "https://whatsapp.com/channel/0029VaWJMi3GehEE9e1YsI1S"
                }
            },
        }, { quoted: mek });
    } catch (err) {
        console.error('Error loading plugins:', err);
    }
};

function formatUptime(ms) {
    let seconds = Math.floor(ms / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const command = ['menu'];
export const description = 'Get the list of all available commands and their descriptions.';
export const category = 'Main';
