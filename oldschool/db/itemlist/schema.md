itemlist
========
Basic info about all items in the oldschool runescape.

ItemList
--------
|                                   | Type            | Description                    |
|-----------------------------------|-----------------|--------------------------------|
| `ItemList`                        | Global          | Global singleton               |
| `ItemList.GetName(Name,Count)`    | Item            | Returns Item by its EXACT name |
| `ItemList.GetID(ID,Count)`        | Item            | Returns Item by ID             |
| `ItemList.Get(ID or Name,Count)`  | Item            | Gets Item by name or ID        |
| `ItemList.Each(fn(Item))`         | no return       | Iterates over all items        |
| `ItemList.Type`                   | Item            | The Type for Item              |
| `ItemList.AddGetter({key:fn(id)})`| no return       | Adds a getter to `Item`s proto |

Count is always optional.

Item
----
|            | Type   | Description                     |
|------------|--------|---------------------------------|
|`.Name`     | String | The name of the item            |
|`.Members`  | Boolean| Is the item Member Only         |
|`.Store`    | Number | The Store cost of the item(s)   |
|`.OStore`   | Number | The Store cost of a single item |
|`.HighAlch` | Number | The High-Alch of the item (s)   |
|`.LowAlch`  | Number | The Lew-Alch of the item(s)     |
|`.ID`       | ID     | The ID                          |
|`.Icon`     | URL    | The URL of the icon             |
|`.Note`     | Item   | The item's note                 |
|`.NoteID`   | ID     | The ID of the item's note       |
|`.NoteIcon` | URL    | The URL of the note's icon      |
|`.IsNote`   | Boolean| Is the item noted               |
|`.Count`    | Number | The count of the item           |
|`.Valid`    | Boolean| Does this ID exist?             |
