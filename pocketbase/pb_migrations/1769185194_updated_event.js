/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "date2862495610",
    "max": "",
    "min": "",
    "name": "date",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file299050915",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [
      "image/jpeg",
      "image/webp"
    ],
    "name": "imgFile",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "1024x1024",
      "1024x680"
    ],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3054695694",
    "max": 0,
    "min": 0,
    "name": "imgAlt",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "select794262873",
    "maxSelect": 1,
    "name": "lieu",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Conservatoire",
      "Maison du peuple"
    ]
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select105650625",
    "maxSelect": 1,
    "name": "category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Danse",
      "Musique",
      "Théâtre"
    ]
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1591429585",
    "max": 200,
    "min": 0,
    "name": "excerpt",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1843675174",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4041782348")

  // remove field
  collection.fields.removeById("date2862495610")

  // remove field
  collection.fields.removeById("file299050915")

  // remove field
  collection.fields.removeById("text3054695694")

  // remove field
  collection.fields.removeById("select794262873")

  // remove field
  collection.fields.removeById("select105650625")

  // remove field
  collection.fields.removeById("text1591429585")

  // remove field
  collection.fields.removeById("editor1843675174")

  return app.save(collection)
})
