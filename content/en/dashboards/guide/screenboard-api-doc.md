---
title: Screenboard API
kind: guide
aliases:
  - /graphing/faq/screenboard-api-doc
  - /graphing/guide/screenboard-api-doc
---

<div class="alert alert-danger">
This endpoint is outdated. Use the <a href="https://docs.datadoghq.com/api/v1/dashboards/">new Dashboard endpoint</a> instead.
</div>

The `Screenboard` endpoint allows you to programmatically create, update, delete, and query screenboards.

## Create a screenboard

### Signature

`POST https://api.datadoghq.com/api/v1/screen`

### Arguments

* **`board_title`** [*required*]:
    The name of the dashboard.
* **`description`** [*optional*, *default*=**None**]:
    A description of the dashboard's content.
* **`widgets`** [*required*]:
    A list of widget definitions. To get a widget definition, use the *JSON tab* in the widget configuration UI.
* **`template_variables`** [*optional*, *default*=**None**]:
    A list of template variables for using Dashboard templating.
* **`read_only`** [*optional*, *default*=**False**]:
    The read-only status of the screenboard.

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

board_title = "My Screenboard"
description = "An informative screenboard."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

api.Screenboard.create(board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key='<DATADOG_API_KEY>'
app_key='<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [
        {
          "type" => "image",
          "height" => 20,
          "width" => 32,
          "y" => 7,
          "x" => 32,
          "url" => "https://path/to/image.jpg"
        }
    ]
}

result = dog.create_screenboard(board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Update a screenboard

### Signature

`PUT https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Arguments

* **`board_title`** [*required*]:
    The name of the dashboard.
* **`description`** [*optional*, *default*=**None**]:
    A description of the dashboard's content.
* **`widgets`** [*required*]:
    A list of widget definitions. To get a widget definition, use the *JSON tab* in the widget configuration UI.
* **`template_variables`** [*optional*, *default*=**None**]:
    A list of template variables for using Dashboard templating.
* **`width`** [*optional*, *default*=**None**]:
    Screenboard width in pixels
* **`height`** [*optional*, *default*=**None**]:
    Screenboard height in pixels.
* **`read_only`** [*optional*, *default*=**False**]:
    The read-only status of the screenboard.

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)
board_id = 2551
board_title = "My Screenboard"
description = "An informative screenboard."
width = 1024
widgets = [{
    "type": "image",
    "height": 20,
    "width": 32,
    "y": 7,
    "x": 32,
    "url": "https://path/to/image.jpg"
}]
template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

api.Screenboard.update(board_id,
                       board_title=board_title,
                       description=description,
                       widgets=widgets,
                       template_variables=template_variables,
                       width=width)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = 7953
board = {
    "width" => 1024,
    "height" => 768,
    "board_title" => "dogapi test",
    "widgets" => [{
        "type" => "image",
        "height" => 20,
        "width" => 32,
        "y" => 7,
        "x" => 32,
        "url" => "https://path/to/image.jpg"
    }]
}

result = dog.update_screenboard(board_id, board)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X PUT -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"

```

{{% /tab %}}
{{< /tabs >}}

## Delete a screenboard

Delete an existing screenboard.
*This endpoint takes no JSON arguments.*

### Signature

`DELETE https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Arguments

*This endpoint takes no JSON arguments.*

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.delete(811)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '2534'
result = dog.delete_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=2471

# Create a screenboard to delete
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X DELETE \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Get a screenboard

Fetch an existing screenboard definition.

### Signature

`GET https://api.datadoghq.com/api/v1/screen/<SCREEENBOARD_ID>`

### Arguments

*This endpoint takes no JSON arguments.*

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.get(811)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

board_id = '6334'
result = dog.get_screenboard(board_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
board_id=6334

# Create a screenboard to get
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
  }' \
"https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}" | jq '.id')

curl -X GET \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}

## Get all screenboards

Fetch all of your screenboards' definitions.

### Signature

`GET https://api.datadoghq.com/api/v1/screen`

### Arguments

*This endpoint takes no JSON arguments.*

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

initialize(**options)

api.Screenboard.get_all()

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_all_screenboards()
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -X GET "https://api.datadoghq.com/api/v1/screen?api_key=${DD_CLIENT_API_KEY}&application_key=${DD_CLIENT_APP_KEY}"
```

{{% /tab %}}
{{< /tabs >}}
