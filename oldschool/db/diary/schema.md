diary
=====
Achievement diary data

Diary
--------
|                       | Type    | Description                    |
|-----------------------|---------|--------------------------------|
|`.List`                | []string| List of all the diarys         |
|`.Difficulties`        | []string| List of the difficulties       |
|`.Karamja`             | Diary   | The Karamja diary              |
|`.Ardougne`            | Diary   | The Ardougne diary             |
|`.Fremennik`           | Diary   | The Fremennik diary            |
|`.Falador`             | Diary   | The Falador diary              |
|`.Desert`              | Diary   | The Desert diary               |
|`.LumbridgeAndDraynor` | Diary   | The Lumbridge & Draynor diary  |
|`.Morytania`           | Diary   | The Morytania diary            |
|`.Kandarin`            | Diary   | The Kandarin diary             |
|`.Varrock`             | Diary   | The Varrock diary              |
|`.Wilderness`          | Diary   | The Wilderness diary           |
|`.WesternProvinces`    | Diary   | The Western Provinces diary    |

Diary
-----
|          | Type       | Description  |
|----------|------------|--------------|
|`.Name`   | string     | Display name |
|`.Easy`   | Difficulty | Easy tasks   |
|`.Medium` | Difficulty | Medium tasks |
|`.Hard`   | Difficulty | Hard tasks   |
|`.Elite`  | Difficulty | Elite tasks  |

Difficulty
----------
|              | Type     | Description          |
|--------------|----------|----------------------|
|`.Name`       | string   | Display name         |
|`.RewardItem` | ItemID   | The reward equipment |
|`.Rewards`    | []string | The other rewards    |
|`.Tasks`      | []Task   | The tasks to unlock  |


Task
----
|          | Type              | Description                   |
|----------|-------------------|-------------------------------|
|`.Task`   | string            | What to do for this task      |
|`.Skills` | map[string]string | The skills to do this task    |
|`.Quests` | []string          | Quests needed to do this task |
|`.Items`  | []ItemID          | Items needed to complete      |
