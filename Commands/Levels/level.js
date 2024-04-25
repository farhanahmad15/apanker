const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("level")
        .setDescription("Adjust a user's levels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)

        .addSubcommand(subcommand =>
            subcommand.setName("add")
                .setDescription("Add levels to a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("remove")
                .setDescription("Remove levels from a user.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand.setName("set")
                .setDescription("Set a user's levels.")
                .addUserOption(option =>
                    option.setName("target")
                        .setDescription("Select a user.")
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option.setName("amount")
                        .setDescription("Amount of levels.")
                        .setMinValue(0)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId } = interaction;

        const sub = options.getSubcommand();
        const target = options.getUser("target");
        const amount = options.getInteger("amount");
        const embed = new EmbedBuilder();

        try {
            switch (sub) {
                case "add":
                    await Levels.appendLevel(target.id, guildId, amount-1);
                    embed.setDescription(`Added ${amount} level(s) to ${target}.`).setColor("#36CE36").setTimestamp();
                    break;
                case "remove":
                    await Levels.subtractLevel(target.id, guildId, amount-1);
                    embed.setDescription(`Removed ${amount} level(s) from ${target}.`).setColor("#CE3636").setTimestamp();
                    break;
                case "set":
                    await Levels.setLevel(target.id, guildId, amount-1);
                    embed.setDescription(`Set ${target}'s level(s) to ${amount}.`).setColor("#0099FF").setTimestamp();
                    break;
            }
        } catch (err) {
            console.log(err);
        }

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}