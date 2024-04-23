const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear a specific amount of messages from a target or channel.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option =>
        option.setName('amount')
        .setDescription('Amount of messages to clear.')
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('target')
        .setDescription('Select a target to clear their messages.')
        .setRequired(false)
        ).setDMPermission(false),

    async execute(interaction) {
        const {channel, options} = interaction;

        const amount = options.getInteger('amount');
        if(amount >100) return interaction.reply({embeds: [new EmbedBuilder().setDescription(':negative_squared_cross_mark: Maximum amount of messages that can be deleted is 100')], ephemeral: true});
        const target = options.getUser("target");

        const messages = await channel.messages.fetch({
            limit: amount,
        });


        const res = new EmbedBuilder()
            .setColor('#36CE36')

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++; 
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setTitle('<:role_bot:1072070682957070337> | Messages purged').setDescription(`<:Discord_moderator:1063455264197586964> | Succesfully deleted ${messages.size} messages from ${target}.`);
                interaction.reply({embeds: [res]}); // you can use ephemeral if you desire
            }).catch(() =>{});
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setTitle('<:role_bot:1072070682957070337> | Messages purged').setDescription(`<:Discord_moderator:1063455264197586964> | Succesfully deleted ${messages.size} messages from the channel.`);
                interaction.reply({embeds: [res]});
            }).catch(() =>{});
        }
    }
}