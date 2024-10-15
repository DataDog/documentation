---
aliases:
- /es/graphing/faq/timeboard-api-doc
- /es/graphing/guide/timeboard-api-doc
title: API de timeboard
---

<div class="alert alert-danger">
Este endpoint está obsoleto. En su lugar, utiliza el <a href="https://docs.datadoghq.com/api/v1/dashboards/">nuevo endpoint del dashboard </a>.
</div>

El endpoint `timeboard` permite crear, actualizar, eliminar y consultar timeboards mediante programación.

## Crear un timeboard

### Firma

`POST https://api.datadoghq.com/api/v1/dash`

### Argumentos

* **`title`** [*required*]:
    Nombre del dashboard.
* **`description`** [*required*]:
    Descripción del contenido del dashboard.
* **`graphs`** [*optional*, *default*=**None**]:
    Lista de definiciones de gráficos. Las definiciones de gráficos siguen el siguiente formato:
    * **`title`** [*required*]:
        Nombre del gráfico.
    * **`definition`** [*optional*, *default*=**None**]:
        * `events` [*optional*, *default*=**None**]:
          Consulta para la superposición de eventos.
        * `requests` [*optional*, *default*=**None**]:
          Consulta de métricas, tipo de línea, estilo, formatos condicionales y Aggregator.
        * `viz` [*optional*, *default*=**timeseries**]:
          Tipo de visualización.

* **`template_variables`** [*optional*, *default*=**None**]:
    Lista de Variables de plantilla para el uso de plantillas de dashboards. Las definiciones de variables de plantilla siguen el siguiente formato:
    * **`name`** [*required*]:
        Nombre de la variable.
    * **`prefix`** [*optional*, *default*=**None**]:
        Prefijo de etiqueta (tag) asociado a la variable. Sólo las etiquetas con este prefijo aparecen en el menú desplegable de variables.
    * **`default`** [*optional*, *default*=**None**]:
        Valor por defecto de la variable de plantilla al cargar el dashboard.

### Ejemplos

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

## Actualizar un timeboard

### Firma

`PUT https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Argumentos

* **`title`** [*required*]:
    Nombre del dashboard.
* **`description`** [*required*]:
    Descripción de los contenidos del dashboard.
* **`graphs`** [*required*]:
    Lista de definiciones de gráficos. Las definiciones de gráficos siguen el siguiente formato:
    * **`title`** [*required*]:
        Nombre del gráfico.
    * **`definition`** [*required*]:
    Definición del gráfico. Ejemplo:
    `{"requests": [{"q": "system.cpu.idle{*} by {host}"}`

* **`template_variables`** [*optional*, *default*=**None**]:
    Lista de variables de plantilla para el uso de plantillas de dashboard. Las definiciones de variables de plantilla siguen el siguiente formato:
    * **`name`** [*required*]:
     Nombre de la variable.

    * **`prefix`** [*optional*, *default*=**None**]:
    Prefijo de etiqueta asociado a la variable. Sólo las etiquetas con este prefijo aparecen en el menú desplegable de variables.

    * **`default`** [*optional*, *default*=**None**]:
    Valor por defecto de la variable de plantilla al cargar un dashboard.

### Ejemplos

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

## Eliminar un timeboard

Eliminar un timeboard existente .
*Este endpoint no acepta argumentos JSON.*

### Firma

`DELETE https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Argumentos

*Este endpoint no acepta argumentos JSON.*

### Ejemplos

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

## Obtener un timeboard

Recupera una definición existente de dashboard.

### Firma

`GET https://api.datadoghq.com/api/v1/dash/<TIMEBOARD_ID>`

### Argumentos

*Este endpoint no acepta argumentos JSON.*

### Ejemplos

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

## Obtener todos los timeboards

Recupera todas tus definiciones de timeboard.

### Firma

`GET https://api.datadoghq.com/api/v1/dash`

### Argumentos

*Este endpoint no acepta argumentos JSON.*

### Ejemplos

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