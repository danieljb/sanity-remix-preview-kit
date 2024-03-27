# Welcome to Sanity + Remix + Preview Kit!

This is a reproduction of an issue where a live query ignores the `pt::text` function used in a GROQ query.

The setup is in preview by default. Run the server:

```shell
pnpm i
pnpm run dev
```

Loading the index route will show initialData like this:

```json
  "initialData": {
    "title": "Test entry",
    "content": "Hello world!\n\nLorem ipsum dolor",
    "isDraft": true,
  }
```

After the live query runs the `content` value will be:

```json
  "content": [
    {
      "_key": "4a5461396131",
      "_type": "block",
      "children": [
        {
          "_key": "3caa95456b4a",
          "_type": "span",
          "marks": [],
          "text": "Hello "
        },
        {
          "_key": "9ecd9e18b7c6",
          "_type": "span",
          "marks": [
            "strong"
          ],
          "text": "world!"
        }
      ],
      "markDefs": [],
      "style": "h1"
    },
    {
      "_key": "a26cd8072ba5",
      "_type": "block",
      "children": [
        {
          "_key": "a5665161a8b2",
          "_type": "span",
          "marks": [],
          "text": "Lorem ipsum dolor"
        }
      ],
      "markDefs": [],
      "style": "normal"
    }
  ]
```

## Schema

The schema used is:

```javascript
  {
    types: [
      {
        type: "document",
        name: "post",
        title: "Post",
        fields: [
          {
            type: "string",
            name: "title",
            title: "Title",
          },
          {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
          },
        ],
      },
    ],
  }
```

## Query

The query used is:

```
  *[_type == "post"][0] {
    title,
    "content": pt::text(content),
    "isDraft": defined(_originalId) && _originalId in path("drafts.**"),
  }
```
