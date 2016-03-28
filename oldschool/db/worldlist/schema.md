worldlist
========
List of all worlds and their statistics

WorldList
----
|            | Type     | Description               |
|------------|----------|---------------------------|
|`.Worlds`   | []Number | List of World IDs         |
|`.Get(id)`  | World    | Get World by ID or Number |


World
------
|                    | Type    | Description                   | Example                   |
|--------------------|---------|-------------------------------|---------------------------|
| `.ID`              | Number  | World ID                      | 58                        |
| `.Number`          | Number  | World Number                  | 358                       |
| `.Host`            | String  | Hostname                      | oldschool58.runescape.com |
| `.Description`     | String  | Description                   | Blast Furnace             |
| `.LocationCode`    | Number  | Jagex's Location ID           | 0                         |
| `.Location`        | String  | Location of server            | United Kingdom            |
| `.LocationCC`      | String  | Country code of server        | gb                        |
| `.LocationHTML`    | String  | String to show country's flag |                           |
| `.Players`         | Number  | Amount of connected Players   | 894                       |
| `.SkillTotal`      | Number  | Minimum level requirement     |                           |
| `.Flags`           | Number  | 32bit bitfield Jagex Data     | 1                         |
| `.ExtraFlags`      | Number  | Undecoded flags               | 0                         |
| `.Members`         | Boolean | Is a PayToPlay world          | true                      |
| `.NormalPvP`       | Boolean | Normal PvP World              | false                     |
| `.HighRiskPvP`     | Boolean | HighRisk PvP world            | false                     |
| `.BountyHunter`    | Boolean | Is a BountyHunter world       | false                     |
| `.Deadman`         | Boolean | Is a Deadman world            | false                     |
| `.DeadmanSeasonal` | Boolean | Is a Seasonal Deadman world   | false                     |
| `.SkillTotal2000`  | Boolean | Requires 2000 total level     | false                     |
| `.SkillTotal1750`  | Boolean | Requires 1750 total level     | false                     |
| `.SkillTotal1500`  | Boolean | Requires 1500 total level     | false                     |
| `.SkillTotal1250`  | Boolean | Requires 1250 total level     | false                     |
