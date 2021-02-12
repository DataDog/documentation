---
title: Timeboard API doc
kind: guide
aliases:
  - /graphing/faq/timeboard-api-doc
  - /graphing/guide/timeboard-api-doc
---

<div class="alert alert-danger">
This endpoint is outdated. Use the <a href="https://docs.datadoghq.com/api/v1/dashboards/"> new Dashboard endpoint</a> instead.
</div>

The `Timeboard` endpoint allows you to programmatically create, update delete and query timeboards. [Find more about timeboards][1].

## Create a timeboard

### Signature

`POST https://api.datadoghq.com/api/v1/dash`

### Arguments

* **`title`** [*required*]:
    The name of the dashboard.
* **`description`** [*required*]:
    A description of the dashboard's content.
* **`graphs`** [*optional*, *default*=**None**]:
    A list of graph definitions. Graph definitions follow this form:
    * **`title`** [*required*]:
        The name of the graph.
    * **`definition`** [*optional*, *default*=**None**]:
        * `events` [*optional*, *default*=**None**]:
          The query for event overlay.
        * `requests` [*optional*, *default*=**None**]:
          The metric query, line type, style, conditional formats, and aggregator.
        * `viz` [*optional*, *default*=**timeseries**]:
          The type of visualization.

* **`template_variables`** [*optional*, *default*=**None**]:
    A list of template variables for using Dashboard templating. Template variable definitions follow this form:
    * **`name`** [*required*]:
        The name of the variable.
    * **`prefix`** [*optional*, *default*=**None**]:
        The tag prefix associated with the variable. Only tags with this prefix appear in the variable dropdown.
    * **`default`** [*optional*, *default*=**None**]:
        The default value for the template variable on dashboard load.

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

title = "My Timeboard"
description = "An informative timeboard."
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "Average Memory Free"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

read_only = True
api.Timeboard.create(title=title,
                     description=description,
                     graphs=graphs,
                     template_variables=template_variables,
                     read_only=read_only)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

# Create a timeboard.
title = 'My First Metrics'
description = 'And they are marvelous.'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "Average Memory Free"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.create_dashboard(title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Average Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Average Memory Free Shell",
      "description" : "A dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }],
      "read_only": "True"
}' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Update a timeboard

### Signature

`PUT https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Arguments

* **`title`** [*required*]:
    The name of the dashboard.
* **`description`** [*required*]:
    A description of the dashboard's contents.
* **`graphs`** [*required*]:
    A list of graph definitions. Graph definitions follow this form:
    * **`title`** [*required*]:
        The name of the graph.
    * **`definition`** [*required*]:
    The graph definition. Read the [Graph Guide][1] for more on graphs. Example:
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*optional*, *default*=**None**]:
    A list of template variables for using Dashboard templating. Template variable definitions follow this form:
    * **`name`** [*required*]:
     The name of the variable.

    * **`prefix`** [*optional*, *default*=**None**]:
    The tag prefix associated with the variable. Only tags with this prefix appear in the variable dropdown.

    * **`default`** [*optional*, *default*=**None**]:
    The default value for the template variable on dashboard load.

### Examples

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {'api_key': '<DATADOG_API_KEY>',
           'app_key': '<DATADOG_APPLICATION_KEY>'}

initialize(**options)

title = 'My Timeboard'
description = 'A new and improved timeboard!'
graphs = [{'definition': {'events': [],
                          'requests': [{
                            'q': 'avg:system.mem.free{*} by {host}'}],
                          'viz': 'timeseries'},
          'title': 'Average Memory Free By Host'}]
template_variables = [{'name': 'host1', 'prefix': 'host',
                       'default': 'host:my-host'}]
read_only = True

api.Timeboard.update(
    4952,
    title=title,
    description=description,
    graphs=graphs,
    template_variables=template_variables,
    read_only=read_only,
)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2551'
title = 'New and Improved Timeboard'
description = 'This has all the new hotness.'
graphs = [{
    "definition" => {
        "events" => [],
        "requests" => [{
            "q" => "avg:system.mem.free{*}"
        }],
        "viz" => "timeseries"
    },
    "title" => "Average Memory Free"
}]
template_variables = [{
    "name" => "host1",
    "prefix" => "host",
    "default" => "host:my-host"
}]

dog.update_dashboard(dash_id, title, description, graphs, template_variables)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2532

# Create a dashboard to get. Use jq (http://stedolan.github.io/jq/download/) to get the dash id.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Average Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Average Memory Free Shell",
      "description" : "A dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl  -X PUT -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Sum of Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "sum:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Sum Memory Free Shell",
      "description" : "An updated dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
}' \
"https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Delete a timeboard

Delete an existing [timeboard][1].
*This end point takes no JSON arguments.*

### Signature

`DELETE https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Arguments

*This end point takes no JSON arguments.*

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

title = "My Timeboard"
description = "An informative timeboard."
graphs = [{
    "definition": {
        "events": [],
        "requests": [
            {"q": "avg:system.mem.free{*}"}
        ],
        "viz": "timeseries"
    },
    "title": "Average Memory Free"
}]

template_variables = [{
    "name": "host1",
    "prefix": "host",
    "default": "host:my-host"
}]

newboard = api.Timeboard.create(title=title,
                                description=description,
                                graphs=graphs,
                                template_variables=template_variables)

api.Timeboard.delete(newboard['dash']['id'])
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2534'
dog.delete_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2471

# Create a dashboard to delete. Use jq (http://stedolan.github.io/jq/download/) to get the dash id.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Average Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Average Memory Free Shell",
      "description" : "A dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl -X DELETE "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Get a timeboard

Fetch an existing dashboard's definition.

### Signature

`GET https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Arguments

*This end point takes no JSON arguments.*

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

api.Timeboard.get(4953)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dash_id = '2542'
dog.get_dashboard(dash_id)
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>
dash_id=2473

# Create a dashboard to get. Use jq (http://stedolan.github.io/jq/download/) to get the dash id.
dash_id=$(curl  -X POST -H "Content-type: application/json" \
-d '{
      "graphs" : [{
          "title": "Average Memory Free",
          "definition": {
              "events": [],
              "requests": [
                  {"q": "avg:system.mem.free{*}"}
              ],
              "viz": "timeseries"
          }
      }],
      "title" : "Average Memory Free Shell",
      "description" : "A dashboard with memory info.",
      "template_variables": [{
          "name": "host1",
          "prefix": "host",
          "default": "host:my-host"
      }]
  }' \
"https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}" | jq '.dash.id')

curl "https://api.datadoghq.com/api/v1/dash/${dash_id}?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

## Get all timeboards

Fetch all of your [timeboard][1]' definitions.

### Signature

`GET https://api.datadoghq.com/api/v1/dash`

### Arguments

*This end point takes no JSON arguments.*

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

print api.Timeboard.get_all()
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

dog.get_dashboards
```

{{% /tab %}}
{{% tab "Bash" %}}

```bash
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl "https://api.datadoghq.com/api/v1/dash?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

[1]: /dashboards/timeboard/
