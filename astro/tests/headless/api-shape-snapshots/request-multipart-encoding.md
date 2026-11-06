<!-- request-multipart-encoding: /api/latest/rendering-shapes/upload-source-maps/ -->

### Request

#### Body Data (required)

{% tabs %}
{% tab label="Model" %}
| Parent field | Field                      | Type   | Description                                                                        |
| ------------ | -------------------------- | ------ | ---------------------------------------------------------------------------------- |
|              | event [*required*]         | object | Metadata for a JavaScript source map upload, sent as a JSON-encoded `event` field. |
| event        | minified_url [*required*]  | string | URL of the minified JavaScript file (1-2048 characters).                           |
| event        | service [*required*]       | string | Service name (1-200 characters).                                                   |
| event        | type [*required*]          | string | Must be `js_sourcemap`.                                                            |
| event        | version [*required*]       | string | Version of the service (1-200 characters).                                         |
|              | minified_file [*required*] | binary | The minified JavaScript file.                                                      |
|              | source_map [*required*]    | binary | The source map file.                                                               |
{% /tab %}

{% tab label="Example" %}
```bash
-F 'event={"minified_url":"https://example.com/static/js/main.min.js","service":"my-web-app","type":"js_sourcemap","version":"1.2.3"};type=application/json'
-F 'minified_file=@main.min.js'
-F 'source_map=@main.min.js.map'
```
{% /tab %}
{% /tabs %}
