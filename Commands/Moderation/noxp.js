const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const Schema = require('../../Models/Mute')
module.exports = {
    data: new SlashCommandBuilder()
        .setName("noxp")
        .setDescription("Stop a member from gaining any xp.")
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option.setName("target")
                .setDescription("Select the user you wish to mute.")
                .setRequired(true)
        ).setDMPermission(false),

    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getMember("target");
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) return interaction.reply({content: 'Error please setup the muting system', ephemeral: true});
                let Role = data.Role;
  
                const role = await interaction.guild.roles.cache.get(Role); // verified role id
                await user.roles.add(role)
                await interaction.reply({
                  embeds: [new EmbedBuilder().setTitle("**<:role_bot:1072070682957070337> | No XP Role Added**")
                  .setDescription(`<:Discord_moderator:1063455264197586964> | ${user} Won't gain xp anymore.`)
                  .setColor('#36CE36')
                  .setTimestamp()],
                  ephemeral: true,
                })
              })


    }
}