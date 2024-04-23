const {ContextMenuCommandBuilder, ApplicationCommandType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')
module.exports = {
    data: new ContextMenuCommandBuilder()
	.setName('Change Nickname')
	.setType(ApplicationCommandType.User)
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    ,
    async execute(interaction, client){
        
        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

    const name ='Moderated Nickname ' + makeid(6);
    const user = interaction.targetMember

    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('nick')
            .setLabel('Set custom Nick Name!')
            .setStyle(ButtonStyle.Success),
    );

    if (
        interaction.member.roles.highest.position <= user.roles.highest.position
      ) return interaction.reply({
        content:
          "Member you are trying to change the nickname has higher or equal roles as you",
        ephemeral: true,
      });

     


      else {
        user
          .setNickname(name)
          .then(
            interaction.reply({
              content: `User nickname changed to: **${name}**`,
              ephemeral: true, 
              components: [row]
            })
          );
      }

      client.on(Events.InteractionCreate, async (interaction) => {
        if (interaction.isButton()) {
          if (interaction.customId === "nick") {
            const modal = new ModalBuilder()
              .setCustomId("mymodal")
              .setTitle("Nickname")
              .addComponents(
                new ActionRowBuilder().addComponents(
                  new TextInputBuilder()
                    .setCustomId("hobbiesInput")
                    .setLabel("What shall the nickname be?")
                    .setStyle(TextInputStyle.Short)
                )
              );
            interaction.showModal(modal);
          }
        }
        else if(interaction.isModalSubmit()){
            const nwname = interaction.fields.getTextInputValue('hobbiesInput')
            user
          .setNickname(nwname)
          .then(
            interaction.reply({
              embeds:[new EmbedBuilder().setTitle('<:role_bot:1072070682957070337> | Changed Nickname')] ,
              ephemeral: true, 
              
            }).catch(() => {interaction.followUp({
                content: `<:Discord_moderator:1063455264197586964> | User nickname changed to: **${nwname}**`,
                ephemeral: true, 
                
              })})
          )

        }
      });

    }
}