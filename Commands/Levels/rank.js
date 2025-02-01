const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const Levels = require("discord.js-leveling");
const { Profile } = require("discord-arts");
const { Red, Blue, Green, Yellow } = require("../../colors");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Get info about someone's rank")
    .setDMPermission(false)
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user.")
    ),
  async execute(interaction) {
    const { options, guildId, user } = interaction;

    const interactionUser = options.getUser("user") || user;
    const member = options.getMember("user") || user;
    const statmember = options.getMember("user") || interaction.member;

    if (options.getUser("user") && options.getUser("user").bot)
      return interaction.reply({
        content: "Bots aren't ranked dummy.",
        ephemeral: true,
      });
    await interaction.deferReply();

    const levelUser = await Levels.fetch(member.id, guildId);
    const embed = new EmbedBuilder();
    const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

    const leaderboard = await Levels.computeLeaderboard(
      interaction.client,
      rawLeaderboard,
      true
    );
    let position;
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].userID === interaction.user.id) {
        position = i + 1;
        break;
      }
    }

    const nextXpAmount = await Levels.xpFor(levelUser.level + 1);
    const XPNeededForNextLevel = nextXpAmount - levelUser.xp;
    const XPForThisLevel = (await levelUser.xp) - Levels.xpFor(levelUser.level);

    if (!levelUser) return interaction.followUp({
        content: "This user isn't ranked yet.",
        ephemeral: true,
      });
    const avatar = await member.displayAvatarURL();
      console.log(member.id)

    const buffer = await Profile(member.id, {
      presenceStatus: `${
        statmember && statmember.presence
          ? statmember.presence.status || statmember.presence.activity?.type
          : "offline"
      }`,
      badgesFrame: true,
      moreBackgroundBlur: true,
      backgroundBrightness: 100,
      rankData: {
        currentXp: XPForThisLevel,
        requiredXp: nextXpAmount,
        rank: position,
        level: levelUser.level + 1,
        barColor: "#fcdce1",
        levelColor: "#ada8c6",
        autoColorRank: true,
      },
    });

    try {
      await interaction.followUp({ files: [buffer] });
    } catch (e) {
      interaction.followUp({
        content: `Something went wrong please try again later`,
        ephemeral: true,
      });
      console.log('something went wrong' , e)
    }
  },
};
