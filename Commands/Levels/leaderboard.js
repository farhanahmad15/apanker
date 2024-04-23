const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Get the leaderboard from the rank system.")
        .setDMPermission(false)
        ,
    async execute(interaction, client) {

        const { guildId } = interaction;

        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

        if (rawLeaderboard.length < 1) return interaction.reply("Nobody's in the leaderboard yet.");

        const embed = new EmbedBuilder();

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `**${e.position}.** ${e.username}\n**Level:** ${e.level+1}\n**XP:** ${e.xp.toLocaleString()}`);

        embed.setTitle("Leaderboard").setDescription(lb.join("\n\n")).setTimestamp();

        return interaction.reply({ embeds: [embed] });

    }, // the level table in the database is automatically created
};