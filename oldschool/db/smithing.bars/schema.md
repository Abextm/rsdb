prices
========
Pricing info for all tradable items
Adds new properties to Item from Itemlist

Item
----
|            | Type    | Description                   |
|------------|---------|-------------------------------|
|`.Ores`     | ItemID[]| Ores to smelt, excluding coal |
|`.Coal`     | Number  | How much coal is required     |
|`.BFCoal`   | Number  | Coal needing in BlastFurnace  |
|`.BarLevel` | Number  | Level needed to smelt         |
|`.BarExp`   | Number  | How much exp on smelt         |
|`.ItemRun`  | Number[]| Item*Run to smelt a bar       |

Smithing.Bars
-------------
Array of Item's with Bar data