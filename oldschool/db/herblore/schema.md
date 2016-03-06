herblore
========
Potion recipies, etc

Herblore
--------
|              | Type     | Description                      |
|--------------|----------|----------------------------------|
|`.CleanHerbs` | ItemID[] | All of the Clean herbs           |
|`.GrimyHerbs` | ItemID[] | All of the Grimy herbs           |
|`.Unfinished` | ItemID[] | All of the Unfinished pots       |
|`.Potions`    | ItemID[] | All of the potions from Herblore |
|`.Type`       | PotRec   | The `PotRec` Type                |


Item
----
|                | Type   | Available | Description           |
|----------------|--------|-----------|-----------------------|
|`.PotionRecipe` | PotRec | Potion*   | Recipie to make this  |
|`.CleanHerb`    | Item   | GrimyHerb | The cleaned version   |
|`.CleanExp`     | Number | GrimyHerb | Exp given to clean    |
|`.CleanLevel`   | Number | GrimyHerb | Level needed to clean |
|`.GrimyHerb`    | Item   | CleanHerb | Grimy version of this |
|`.UnfPot`       | Item   | AnyHerb   | Unfinished potion     |
|`.Herb`         | Item   | UnfPotion | Herb to make pot      |

PotRec
------
|              | Type   | Description                                         |
|--------------|--------|-----------------------------------------------------|
|`.Level`      | Number | Level needed to make                                |
|`.Exp`        | Number | Exp given to make                                   |
|`.Primary`    | Item   | The Base for the potion (Guam potion(unf))          |
|`.Secondarys` | Item[] | All other ingredients                               |

* Only on potions that have a recipe, this excludes decating