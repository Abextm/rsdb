itemlist
========
`require("itemlist")`
Basic info about all items in the oldschool runescape.

ItemList
--------
|                            | Type            | Description                    |
|----------------------------|-----------------|--------------------------------|
| `ItemList`                 | Global          | Global singleton               |
| `ItemList.GetName(Name)`   | Item            | Map of IDs to RawItems         |
| `ItemList.GetID(ID)`       | Item            | Returns Item by ID             |
| `ItemList.Get(ID or Name)` | Item            | Returns Item by its EXACT name |
| `ItemList.Each(fn(Item))`  | no return       | Iterates over all items        |

Item
----
|            | Type   | Description                |
|------------|--------|----------------------------|
|`.Name`     | String | The name of the item       |
|`.Store`    | Number | The Store cost of an item  |
|`.HighAlch` | Number | The High-Alch of an item   |
|`.LowAlch`  | Number | The Lew-Alch of an item    |
|`.ID`       | ID     | The ID                     |
|`.Icon`     | URL    | The URL of the icon        |
|`.Note`     | ID     | The ID of the item's note  |
|`.NoteIcon` | URL    | The URL of the note's icon |

RawItem
-------
opaque