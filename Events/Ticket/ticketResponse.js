const {ChannelType, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits} = require('discord.js')
const ticketSchema = require('../../Models/Ticket')
const TicketSetup = require('../../Models/TicketSetup')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        const {guild, member, customId, channel} = interaction

        const {ViewChannel, SendMessages, ManageChannels, ReadMessageHistory} = PermissionFlagsBits

        const ticketID = Math.floor(Math.random() * 9000) + 10000


        if (!interaction.isButton()) return;

        async function findDataByGuildID(guildID) {
            const guildData = await TicketSetup.findOne({ GuildID: guildID });
            return guildData;
          }
          
          async function findDataByGuildAndMemberID(guildID, memberID) {
            const guildAndMemberData = await ticketSchema.findOne({ GuildID: guildID, MemberID: memberID });
            return guildAndMemberData;
          }
          
          const data = await findDataByGuildID(guild.id);
          const memberData = await findDataByGuildAndMemberID(guild.id, member.id);

        // const data = await TicketSetup.findOne({GuildID: guild.id})

        if(!data)
            return
        if(!data.Buttons.includes(customId))
            return

        



        if (!guild.members.me.permissions.has(ManageChannels)){
            interaction.reply({content: "I don't have permissions for this", ephemeral: true})

        }

        else if(memberData){interaction.reply({content: "You already have a ticket in this server", ephemeral: true})}

        else{
            try{

                await guild.channels.create({
                    name: `${member.user.username}-ticket${ticketID}`,
                    type: ChannelType.GuildText,
                    parent: data.Category,
                    permissionOverwrites: [
                        {
                            id: data.Everyone,
                            deny: [ViewChannel, SendMessages, ReadMessageHistory]
    
                        },
                        {
                            id: member.id,
                            allow: [ViewChannel, SendMessages, ReadMessageHistory]
                        }
                    ]
                }).then(async (channel) =>{
                    const newTicketSchema = await ticketSchema.create({
                        GuildID: guild.id,
                        MemberID: member.id,
                        TicketID: ticketID,
                        ChannelID: channel.id,
                        Closed: false,
                        Locked: false,
                        Type: customId,
                        Claimed: false
                    });
    
                    const embed = new EmbedBuilder()
                    .setTitle(`${guild.name} - Ticket: ${customId}`)
                    .setDescription("Our team will contact you shortly, please describe your issue")
                    .setTimestamp()
                    .setFooter({text: `${ticketID}`, iconURL: member.displayAvatarURL({ dynamic: true })})
    
    
                    const button = new ActionRowBuilder().setComponents(
                        new ButtonBuilder().setCustomId('close').setLabel("Close the ticket").setStyle(ButtonStyle.Primary).setEmoji('❌'),
                        new ButtonBuilder().setCustomId('lock').setLabel("Lock the ticket").setStyle(ButtonStyle.Secondary).setEmoji('🔐'),
                        new ButtonBuilder().setCustomId('unlock').setLabel("Unlock the ticket").setStyle(ButtonStyle.Success).setEmoji('🔓'),
                        new ButtonBuilder().setCustomId('claim').setLabel("Claim").setStyle(ButtonStyle.Secondary).setEmoji('🛄'),
                    )
                    channel.send({
                        embeds: [embed],
                        components: [button]
                    })
    
                    interaction.reply({content: `Successfully created a ticket, ${channel}`, ephemeral: true})
                })
            }
            catch(err){
                return console.log(err)
            }
        }

        
        
    }
}