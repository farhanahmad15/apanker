const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
  } = require("discord.js");
  const ms = require("ms");
  const warnSchema = require("../../Models/Warns");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("warns")
      .setDescription("Warn related commands")
      .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
      .addSubcommand(command => command.setName('check').setDescription("Check a server member's warn(s)").addUserOption(option => option.setName('member').setDescription('The user you want to view the warns of').setRequired(true)))
      .addSubcommand(command => command.setName('remove').setDescription('Remove a memebers warns').addUserOption(option => option.setName('user').setDescription('The user you want to remove the warns of').setRequired(true)).addIntegerOption(option => option.setName('amount').setDescription('The amount of warns to remove').setRequired(true)))
      

      .setDMPermission(false),
  
    async execute(interaction) {
      const sub = interaction.options.getSubcommand()

      switch (sub) {
        case 'check':{
          const user = interaction.options.getUser('member')
          let Data = await warnSchema.findOne({ guildId: interaction.guild.id, userId: user.id })
          if(!Data) return interaction.reply({content: 'User has no warns', ephemeral: true})
          const fields = Data.reason.map((message, index) => ({
            name: `Warn ${Number(index)+1}, Reason: `,
            value: message,
          }));
          const embed = new EmbedBuilder()
          .setTitle(`${user.username}'s Warns`)
          .setDescription(`Total Warns: ${Data.warns}`)
          .setColor('#36CE36')
          .addFields(fields)
          await interaction.reply({embeds: [embed]})
        }
          
          break;

        case 'remove':{
          const target = interaction.options.getMember('user')
          const amount = interaction.options.getInteger('amount')
          
            let Data = await warnSchema
            .findOne({ guildId: interaction.guild.id, userId: target.id })
            .catch(() => {
              console.log("Error");
            });
            
            if (amount >= Data.warns){
                Data.warns = 0
                Data.reason = []
                await Data.save()
            }
            else{
                Data.warns = Data.warns-amount
                Data.reason.splice(0, amount)
                await Data.save()
            }
        await interaction.reply({content: `Removed. User now has ${Data.warns} warns`, ephemeral: true})

        }

        break
      
        
      }


      
    },
  };
  