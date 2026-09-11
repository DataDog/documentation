This processor parses Extensible Markup Language (XML) so the data can be processed and sent to different destinations. XML is a log format used to store and transport structured data. It is organized in a tree-like structure to represent nested information and uses tags and attributes to define the data. For example, this is XML data using only tags (`<recipe>`,`<type>`, and `<name>`) and no attributes:

```xml
<recipe>
    <type>pasta</type>
    <name>Carbonara</name>
</recipe>
```

This is an XML example where the tag `recipe` has the attribute `type`:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

The following image shows a Windows Event 4625 log in XML, next to the same log parsed and output in JSON. By parsing the XML log, the size of the log event was reduced by approximately 30%.

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/processors/xml-side-by-side.png" alt="The XML log and the resulting parsed log in JSON" width="80%">
</figure>

To set up this processor:

1. Define a filter query. Only logs that match the specified filter query are processed. All logs, regardless of whether they match the filter query, are sent to the next step in the pipeline.
1. Enter the path to the log field on which you want to parse XML. Use the path notation `<OUTER_FIELD>.<INNER_FIELD>` to match subfields. See the [Path notation example](#path-notation-example-parse-xml) below.
1. Optionally, in the `Enter text key` field, input the key name to use for the text node when XML attributes are appended. See the [text key example](#text-key-example). If the field is left empty, `value` is used as the key name.
1. Optionally, select `Always use text key` if you want to store text inside an object using the text key even when no attributes exist.
1. Optionally, toggle `Include XML attributes` on if you want to include XML attributes. You can then choose to add the attribute prefix you want to use. See [attribute prefix example](#attribute-prefix-example). If the field is left empty, the original attribute key is used.
1. Optionally, select if you want to convert data types into numbers, Booleans, or nulls.
    - If **Numbers** is selected, numbers are parsed as integers and floats.
    - If **Booleans** is selected, `true` and `false` are parsed as Booleans.
    - If **Nulls** is selected, the string `null` is parsed as null.

##### Path notation example {#path-notation-example-parse-xml}

For the following message structure:

```json
{
    "outer_key": {
        "inner_key": "inner_value",
        "a": {
            "double_inner_key": "double_inner_value",
            "b": "b value"
        },
        "c": "c value"
    },
    "d": "d value"
}
```

- Use `outer_key.inner_key` to refer to the key with the value `inner_value`.
- Use `outer_key.inner_key.double_inner_key` to refer to the key with the value `double_inner_value`.

##### Always use text key example

If **Always use text key** is selected, the text key is the default (`value`), and you have the following XML:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

The XML is converted to:

```json
{
    "recipe": {
        "type": "pasta",
        "value": "Carbonara"
        }
}
```

##### Text key example

If the key is `text` and you have the following XML:

```xml
<recipe>
    <recipe type="pasta">
    <name>Carbonara</name>
</recipe>
```

The XML is converted to:

```json
{
    "recipe": {
        "type": "pasta",
        "text": "Carbonara"
        }
}
```

##### Attribute prefix example

If you enable **Include XML attributes**, the attribute is added as a prefix to each XML attribute. For example, if the attribute prefix is `@` and you have the following XML:

```xml
<recipe type="pasta">Carbonara</recipe>
```

Then it is converted to the JSON:

```json
{
    "recipe": {
        "@type": "pasta",
        "<text key>": "Carbonara"
        }
}
```
