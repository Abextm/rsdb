itemlist
========
Basic info about all items in the oldschool runescape.

ItemList
--------
|                                   | Type            | Description                    |
|-----------------------------------|-----------------|--------------------------------|
| `ItemList`                        | Global          | Global singleton               |
| `ItemList.GetName(Name)`          | Item            | Returns Item by its EXACT name |
| `ItemList.GetID(ID)`              | Item            | Returns Item by ID             |
| `ItemList.Get(ID or Name)`        | Item            | Gets Item by name or ID        |
| `ItemList.Each(fn(Item))`         | no return       | Iterates over all items        |
| `ItemList.Type`                   | Item            | Prototype for `Item`s          |
| `ItemList.AddGetter({key:fn(id)})`| no return       | Adds a getter to `Item`s proto |

Item
----
|            | Type   | Description                |
|------------|--------|----------------------------|
|`.Name`     | String | The name of the item       |
|`.Members`  | Boolean| Is the item Member Only    |
|`.Store`    | Number | The Store cost of an item  |
|`.HighAlch` | Number | The High-Alch of an item   |
|`.LowAlch`  | Number | The Lew-Alch of an item    |
|`.ID`       | ID     | The ID                     |
|`.Icon`     | URL    | The URL of the icon        |
|`.Note`     | Item   | The item's note            |
|`.NoteID`   | ID     | The ID of the item's note  |
|`.NoteIcon` | URL    | The URL of the note's icon |
|`.IsNote'   | Boolean| Is the item noted          |

RawItem
-------
opaque
