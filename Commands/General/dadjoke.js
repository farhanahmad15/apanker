const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dadjoke")
    .setDescription("Get a random dad joke")
    .setDMPermission(false),

  async execute(interaction) {
    var arr = [
        "Why did the scarecrow win an award? Because he was outstanding in his field.",
        "Why don't skeletons fight each other? They don't have the guts.",
        "Why did the bicycle fall over? Because it was two-tired.",
        "Why did the tomato turn red? Because it saw the salad dressing!",
        "Why did the coffee file a police report? It got mugged!",
        "Why did the cookie go to the doctor? Because it was feeling crumbly!",
        "Why do chicken coops only have two doors? Because if they had four, they'd be a chicken sedan!",
        "What do you call fake spaghetti? An impasta.",
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why did the math book look so sad? Because it had too many problems.",
        "Why did the belt go to jail? It held up some pants!",
        "Why was the math book sad? Because it had too many problems.",
        "What do you call a boomerang that doesn't come back? A stick.",
        "Why did the tomato turn green? Because it was green tomato sauce.",
        "Why did the golfer wear two pairs of pants? In case he got a hole in one!",
        "Why did the chicken cross the playground? To get to the other slide!",
        "Why did the musician throw away his keyboard? Because he couldn't find the right notes.",
        "Why did the toilet paper roll down the hill? To get to the bottom.",
        "Why did the fish blush? Because it saw the ocean's bottom.",
        "What did the grape say when it got stepped on? Nothing, it just let out a little wine.",
        "Why was the computer cold? Because it left its Windows open.",
        "What do you call a fake noodle? An impasta.",
        "Why did the teddy bear say no to dessert? Because it was stuffed.",
        "Why did the scarecrow win an award? Because he was outstanding in his field.",
        "Why did the chicken cross the road? To get to the other side!",
        "Why did the crab never share? Because it was shellfish.",
        "Why did the cookie go to the doctor? Because it felt crummy.",
        "Why don't oysters give to charity? Because they're shellfish.",
        "Why did the tomato blush? Because it saw the salad dressing.",
        "Why did the octopus beat the shark in a fight? Because it was well-armed.",
        "Why do cows have hooves instead of feet? Because they lactose.",
        "Why was the math book sad? Because it had too many problems.",
        "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bay-gulls!",
        "Why did the bicycle fall over? Because it was two-tired.",
        "Why did the grape stop in the middle of the road? Because he ran out of juice.",
        "Why did the tomato turn red? Because it saw the salad dressing.",
        "Why don't scientists trust atoms? Because they make up everything!",
        "Why don't oysters give to charity? Because they're shellfish.",
        "Why do seagulls fly over the sea? Because if they flew over the bay, they'd be bay-gulls!",
        "Why was the broom late? It swept in.",
        "Why did the tomato turn green? Because it was a green tomato sauce.",
        "Why did the picture go to jail? Because it was framed.",
    ];
    
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setDescription(
            `${arr[Math.floor(Math.random() * arr.length)]}`
          ),
      ],
    });
  },
};
