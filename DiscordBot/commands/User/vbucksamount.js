const { MessageEmbed } = require("discord.js");
const Profiles = require('../../../model/profiles.js');
const Users = require('../../../model/user.js');

module.exports = {
    commandInfo: {
        name: "vbucksamount",
        description: "Displays your current V-Bucks balance.",
    },
    execute: async (interaction) => {

    await interaction.deferReply({ ephemeral: true })

    const currentuser = await Users.findOne({ discordId: interaction.user.id });
    const vbucksamount = await Profiles.findOne({ accountId: currentuser?.accountId });
    const currency = vbucksamount?.profiles.common_core.items["Currency:MtxPurchased"].quantity;
    if (!currentuser) 
    {
        return interaction.editReply({ content: "You are not registered!", ephemeral: true });
    }
    const embed = new MessageEmbed()
        .setTitle("V-Bucks Count:")
        .setDescription(`You currently have **` + currency + " V-Bucks** in your Account!")
        .setTimestamp()
        .setThumbnail('https://cdn.discordapp.com/attachments/1248740944648605747/1249460527688585236/vbucks-removebg-preview.png?ex=6667624b&is=666610cb&hm=27c9fb9569124ab504f53d6a1cf758a1cfacc6a13f9165a61ce4d758ad3e5f0d&')
        .setFooter({
            text: "Reload Backend",
            iconURL: "https://cdn.discordapp.com/attachments/1252374830225948672/1263993256136675378/IMG_1736.png?ex=669c40f4&is=669aef74&hm=5ded3e4588c05a56f271e0a07f7631317a3ebd72eae7497c4de5ee712a4db6dd&"
        })
        .setColor("WHITE")
    await interaction.editReply({ embeds: [embed], ephemeral: true });
}
}