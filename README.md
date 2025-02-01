# <div align="center">Apanker</div>

## <div align="center">State-of-the-Art Multipurpose Discord Bot</div>

Apanker is a powerful and versatile Discord bot built using **discord.js v14**. It provides advanced moderation, entertainment, and utility features to enhance your Discord server experience.

## Quick Links
- [Commands](#commands-table)
- [Installation Guide](#installation)
- [Adding to Your Discord Server](#setup-on-your-discord-server)
- [Contributing](#contributing)

*If you find this bot useful, do consider giving the repository a star ⭐!*


## Commands Table

### General Commands
| Command  | Description |
|----------|------------|
| `/afk` | Sets your status as AFK, so that it notifies others users when they ping you |
| `/apologize` | Sends an apology message to specified user|
| `/avatar` | Displays the avatar of a user |
| `/dadjoke*` | Tells a random dad joke |
| `/dice` | Rolls a dice |
| `/suggest` | Suggests an improvement for the server (sent for review first, Admins can accept or deny it) |
| `/thank` | Sends a thank-you message to specified user|
| `/update` | (HOST ONLY) Updates the bot’s presence |

### Informational Commands
| Command  | Description |
|----------|------------|
| `/about` | Provides information about the bot |
| `/help` | Displays a list of available commands |
| `/poll` | (ADMIN ONLY) Creates a poll |
| `/userinfo` | Shows information about a user |
| Right-click `userinfo` | Right-click version of the above command |

### Leveling and Ranking Commands
| Command  | Description |
|----------|------------|
| `/howmuchxp` | Shows required XP for certain level |
| `/leaderboard` | Displays the server’s leveling leaderboard |
| `/level` | (ADMIN ONLY) Sets a user's level |
| `/rank` | Displays a user's rank |
| `/xp` | (ADMIN ONLY) Sets a user's XP |

### Moderation Commands (Require Permissions)
| Command  | Description |
|----------|------------|
| `/ban` | Bans a user from the server |
| `/nick` | Changes a user's nickname |
| Right-click `change nickname` | Right-click to change a user’s nickname |
| `/kick` | Kicks a user |
| `/mute` | Mutes a user |
| `/noxp` | Prevents a user from gaining XP |
| `/rename-channel` | Renames a channel |
| `/sendembed` | Sends an embedded message |
| `/slowmode` | Enables slow mode in a channel |
| `/unban` | Unbans a user |
| `/unmute` | Unmutes a user |
| `/warn` | Issues a warning to a user |
| `/warns` | Displays a user’s warnings |

### Music Commands
| Command  | Description |
|----------|------------|
| `/music play` | Plays a song using a query or URL |
| `/music volume` | Adjusts the song volume (1-100%) |
| `/music options queue` | Displays the current queue |
| `/music options skip` | Skips the current song |
| `/music options pause` | Pauses the current song |
| `/music options resume` | Resumes a paused song |
| `/music options stop` | Stops the queue |


### Setup Commands (ADMIN ONLY)
| Command  | Description |
|----------|------------|
| `/setup welcome` | Configures the welcome message and channel |
| `/setup verify` | Sets up reaction-based verification for roles |
| `/setup suggestion` | Configures the suggestion system |
| `/setup leveling` | Enables the leveling system |
| `/setup mute` | Defines the mute role |
| `/setup ticket` | Sets up the ticket system (handlers, category, transcript channel, and buttons) |

### Ticketing Commands
| Command  | Description |
|----------|------------|
| `/ticket` | (ADMIN ONLY) Ticket management actions |
| `/ticket add` | Adds a user to an existing ticket |
| `/ticket remove` | Removes a user from an existing ticket |

**-Needs Improvement*

## Installation
### Prerequisites
- Node.js v16+
- `discord.js` v14

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/farhanahmad15/apanker.git
   cd apanker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Rename the `.env.example` to `.env` and fill the required variables. The bot will automatically create required tables in the databse:

4. Run the bot:
   ```bash
   node index.js
   ```

## Setup on Your Discord Server
1. Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
2. Copy the bot token and add it to the `.env` file
3. Generate an invite link with Administration permissions:
4. Invite the bot to your server and start using commands!

## Contributing
We welcome contributions! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit them
4. Push the changes (`git push origin feature-branch`)
5. Open a Pull Request

## License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)**. This means:
- You are free to use, modify, and share the code **for non-commercial purposes**.
- Commercial use is **strictly prohibited** without permission.

For more details, see the [LICENSE](LICENSE) file.

---

