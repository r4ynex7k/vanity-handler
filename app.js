const { Client } = require("discord.js");
const client = new Client();
const request = require("request");
const cfg = require("./config.json");

client.on("ready", () => {
    console.log ("bot aktif")
    client.user.setActivity("lalalallaalalllalallallalalalllallllallalalalalalalalalaalalallalallalalalalalalalalallalala", { type: "STREAMING" });
});

client.on("GUILD_UPDATE", async (oldGuild, newGuild) => {
    newGuild.fetchAuditLogs().then(async (log) => {
        if (log.entries.first().action === "GUILD_UPDATE") {
            let id = log.entries.first().executor.id;
            let uye = newGuild.members.cache.get(id);
            const bot = newGuild.members.cache.get(client.user.id);
            if (bot.roles.highest.rawPosition <= uye.roles.highest.rawPosition) return;
            if (oldGuild.vanityURLCode !== newGuild.vanityURLCode) {
                request({
                    method: "PATCH",
                    url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
                    headers: { Authorization: `Bot ${cfg.token}`},
                    json: { code: `${oldGuild.vanityURLCode}`}
                });
                uye.ban({ reason: "raynex vanity handler", days: 7 });
            } else { };
        } else { };
    });
});

client.login(cfg.token);
