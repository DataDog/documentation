---
aliases:
- /es/graphing/faq/dashboard-lists-api-doc
- /es/graphing/guide/dashboard-lists-api-v1-doc
title: API de listas de dashboard (v1)
---

Interactúa con tus listas de dashboard a través de la API para que sea más fácil organizar, encontrar y compartir todos tus dashboards con tu equipo y organización.

- [Get items of a dashboard list (obtener elementos de una lista de dashboard)](#get-items-of-a-dashboard-list)
- [Add items to a dashboard list (añadir elementos a una lista de dashboard)](#add-items-to-a-dashboard-list)
- [Update items of a dashboard list (actualizar elementos de una lista de dashboard](#update-items-of-a-dashboard-list)
- [Delete items from a dashboard list (eliminar elementos de una lista de dashboard)](#delete-items-from-a-dashboard-list)

## Obtener elementos de una lista de dashboard

<div class="alert alert-danger">
Este endpoint está obsoleto. Utiliza en su lugar el endpoint <a href="https://docs.datadoghq.com/api#get-items-of-a-dashboard-list">obtener elementos de una lista de cuadros de mando v2.</a>.
</div>

### Firma

`OBTENER dashboards https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/`

### Ejemplos

#### Solicitud de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar la importación datadog, api

opciones= {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar(**opciones)

api.DashboardList.get_items(4741)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```Ruby
requerir "rubygems
requerir "dogapi

api_key = '<Datadog_API_KEY>'
app_key = '<Datadog_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

resultado = dog.get_items_of_dashboard_list(4741)
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

list_id=4741

curl -X GET \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

#### Respuesta de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'total': 5,
    'dashboards': [
        {
            'is_shared': Falso,
            'autor': {
                'identificador': Ninguno,
                'nombre': Ninguno
            },
            'url': '/screen/integration/66/aws-dynamodb',
            'título': 'Amazon DynamoDB',
            'modificado': Ninguno,
            'creado': Ninguno,
            'is_favorite': Verdadero,
            'is_read_only': Verdadero,
            'tipo': 'integration_screenboard',
            'id': 66,
            'icono': '/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png'
        },
        {
            'is_shared': Falso,
            'autor': {
                'identificador': Ninguno,
                'nombre': Ninguno
            },
            'url': '/dash/integration/17/postgres---metrics',
            'título': 'Postgres - Metrics',
            'modificado': Ninguno,
            'creado': Ninguno,
            'is_favorite': Verdadero,
            'is_read_only': Verdadero,
            'tipo': 'integration_timeboard',
            'id': 17,
            'icono': '/static/v/34.254868/images/saas_logos/small/postgres.png'
        },
        {
            'new_id': 'qts-q2k-yq6',
            'popularidad': 0,
            'is_shared': Falso,
            'autor': {
                'identificador': 'test1@datadoghq.com',
                'nombre': 'Nombre del autor'
            },
            'url': '/dash/75619/trace-api',
            'título': 'Rastrear API',
            'modified': '2018-03-16T13:39:39.517133+00:00',
            'created': '2015-10-21T13:22:48.633391+00:00',
            'is_favorite': Falso,
            'is_read_only': Falso,
            'tipo': 'custom_timeboard',
            'id': 75619,
            'icono': Ninguno
        },
        {
            'new_id': 'rys-xwq-geh',
            'popularidad': 0,
            'is_shared': Falso,
            'autor': {
                'identificador': 'test2@datadoghq.com',
                'nombre': 'Otro nombre de autor'
            },
            'url': '/screen/63572/agent-stats',
            'título': 'Estado de agente',
            'modificado': '2018-03-16T12:54:25.968134+00:00',
            'creado': '2014-06-18T18:19:00.974763+00:00',
            'is_favorite': Falso,
            'is_read_only': Falso,
            'tipo': 'custom_screenboard',
            'id': 63572
            'icono': Ninguno
        },
        {
            'popularidad': 0,
            'is_shared': Falso,
            'autor': {
                'identificador': Ninguno,
                'nombre': Ninguno
            },
            'url': '/dash/host/3245468',
            'título': 'agent-gui',
            'modificado': Ninguno,
            'creado': Ninguno,
            'is_favorite': Falso,
            'is_read_only': Verdadero,
            'tipo': 'host_timeboard',
            'id': 3245468,
            'icono': Ninguno
        }
    ]
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
[
    "200",
    {
        "total" => 5,
        "dashboards" => [
            {
                "título" => "Amazon DynamoDB",
                "is_favorite" => verdadero,
                "id" => 66,
                "icono" => "/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png",
                "is_shared" => falso,
                "autor" => {
                    "identificador" => nil,
                    "nombre" => nil
                },
                "url" => "/screen/integration/66/aws-dynamodb",
                "creado" => nil,
                "modificado" => nil,
                "is_read_only" => verdadero,
                "tipo" => "integration_screenboard"
            },
            {
                "título" => "Postgres - Métricas",
                "is_favorite" => verdadero,
                "id" => 17,
                "icono" => "/static/v/34.254868/images/saas_logos/small/postgres.png",
                "is_shared" => falso,
                "autor" => {
                    "identificador" => nil,
                    "nombre" => nil
                },
                "url" => "/dash/integration/17/postgres---metrics",
                "creado" => nil,
                "modificado" => nil,
                "is_read_only" => verdadero,
                "tipo" => "integration_timeboard"
            },
            {
                "new_id" => "qts-q2k-yq6",
                "popularidad" => 0,
                "title" => "Rastrear API",
                "is_favorite" => falso,
                "id" => 75619,
                "icono" => nil,
                "is_shared" => falso,
                "autor" => {
                    "identificador" => "test1@datadoghq.com",
                    "nombre" => "Nombre del autor"
                },
                "url" => "/dash/75619/trace-api",
                "creado" => "2015-10-21T13:22:48.633391+00:00",
                "modificado" => "2018-03-16T13:39:39.517133+00:00",
                "is_read_only" => falso,
                "tipo" => "custom_timeboard"
            },
            {
                "new_id" => "rys-xwq-geh",
                "popularidad" => 0,
                "título" => "Estadísticas de Agent",
                "is_favorite" => falso,
                "id" => 63572,
                "icono" => nil,
                "is_shared" => falso,
                "autor" => {
                    "identificador" => "test2@datadoghq.com",
                    "nombre" => "Otro nombre de autor"
                },
                "url" => "/screen/63572/agent-stats",
                "creado" => "2014-06-18T18:19:00.974763+00:00",
                "modificado" => "2018-03-16T12:54:25.968134+00:00",
                "is_read_only" => falso,
                "tipo" => "custom_screenboard"
            },
            {
                "popularidad" => 0,
                "título" => "agent-gui",
                "is_favorite" => falso,
                "id" => 3245468,
                "icono" => nil,
                "is_shared" => falso,
                "autor" => {
                    "identificador" => nil,
                    "nombre" => nil
                },
                "url" => "/dash/host/3245468",
                "creado" => nil,
                "modificado" => nil,
                "is_read_only" => verdadero,
                "tipo" => "host_timeboard"
            }
        ]
    }
]

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
{
    "total": 5,
    "dashboards": [
        {
            "is_shared": Falso,
            "autor": {
                "identificador": Ninguno,
                "nombre": Ninguno
            },
            "url": "/screen/integration/66/aws-dynamodb",
            "título": "Amazon DynamoDB",
            "modificado": Ninguno,
            "creado": Ninguno,
            "is_favorite": Verdadero,
            "is_read_only": Verdadero,
            "tipo": "integration_screenboard",
            "id": 66,
            "icono": "/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png"
        },
        {
            "is_shared": Falso,
            "autor": {
                "identificador": Ninguno,
                "nombre": Ninguno
            },
            "url": "/dash/integration/17/postgres---metrics",
            "título": "Postgres - Métricas",
            "modificado": Ninguno,
            "creado": Ninguno,
            "is_favorite": True,
            "is_read_only": True,
            "tipo": "integration_timeboard",
            "id": 17,
            "icono": "/static/v/34.254868/images/saas_logos/small/postgres.png"
        },
        {
            "new_id": "qts-q2k-yq6",
            "popularidad": 0,
            "is_shared": Falso,
            "autor": {
                "identificador": "test1@datadoghq.com",
                "nombre": "Nombre de autor"
            },
            "url": "/dash/75619/trace-api",
            "título": "Rastrear API",
            "modificado": "2018-03-16T13:39:39.517133+00:00",
            "creado": "2015-10-21T13:22:48.633391+00:00",
            "is_favorite": Falso,
            "is_read_only": Falso,
            "tipo": "custom_timeboard",
            "id": 75619,
            "icono": Ninguno
        },
        {
            "new_id": "rys-xwq-geh",
            "popularidad": 0,
            "is_shared": Falso,
            "autor": {
                "identificador": "test2@datadoghq.com",
                "nombre": "Otro nombre de autor"
            },
            "url": "/screen/63572/agent-stats",
            "título": "Estadísticas de Agent",
            "modificado": "2018-03-16T12:54:25.968134+00:00",
            "creado": "2014-06-18T18:19:00.974763+00:00",
            "is_favorite": Falso,
            "is_read_only": Falso,
            "tipo": "custom_screenboard",
            "id": 63572,
            "icono": Ninguno
        },
        {
            "popularidad": 0,
            "is_shared": Falso,
            "autor": {
                "identificador": Ninguno,
                "nombre": Ninguno
            },
            "url": "/dash/host/3245468",
            "título": "agent-gui",
            "modificado": Ninguno,
            "creado": Ninguno,
            "is_favorite": False,
            "is_read_only": Verdadero,
            "tipo": "host_timeboard",
            "id": 3245468,
            "icono": Ninguno
        }
    ]
}

```

{{% /tab %}}
{{< /tabs >}}

## Añadir elementos a la lista de dashboard

<div class="alert alert-danger">
Este endpoint está obsoleto. Utiliza en su lugar el endpoint <a href="https://docs.datadoghq.com/api#add-items-to-a-dashboard-lista">añadir elementos a una lista del cuadro de mandos v2</a>.
</div>

### Firma

`dashboards https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/POSTERIORES`

### Argumentos

*   **`dashboards`** [*required* (requerido)]:
    Una lista de dashboards para añadir a la lista.
    Las definiciones de dashboard siguen esta forma:
    *   **`type`** (tipo) [*required* (requerido)]:
        El tipo del dashboard.
        El tipo debe ser uno de los siguientes:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required* (requerido)]:
        El id del dashboard.

### Ejemplos

#### Solicitud de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
desde inicializar la importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar(**opciones)

list_id = 4741
dashboards = [
    {
        'tipo': 'custom_screenboard',
        'id': 1414
    },
    {
        'tipo': 'custom_timeboard',
        'id': 5858
    },
    {
        'tipo': 'integration_screenboard',
        'id': 67
    },
    {
        'tipo': 'integration_timeboard',
        'id': 5
    },
    {
        'tipo': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.add_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "tipo" => "custom_screenboard",
        "id" => 1414
    },
    {
        "tipo" => "custom_timeboard",
        "id" => 5858
    },
    {
        "tipo" => "integration_screenboard",
        "id" => 67
    },
    {
        "tipo" => "integration_timeboard",
        "id" => 5
    },
    {
        "tipo" => "host_timeboard",
        "id" => 123456789
    }
]

resultado = dog.add_items_of_dashboard_list(list_id, dashboards)
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

list_id=4741

curl -X ADD -H "Tipo de contenido: aplicación/json" \
-d '{
        "dashboards": [
            {
                "tipo": "custom_screenboard",
                "id": 1414
            },
            {
                "tipo": "custom_timeboard",
                "id": 5858
            },
            {
                "tipo": "integration_screenboard",
                "id": 67
            },
            {
                "tipo": "integration_timeboard",
                "id": 5
            },
            {
                "tipo": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

#### Respuesta de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'added_dashboards_to_list': [
        {
            'tipo': 'custom_timeboard',
            'id': 5858
        },
        {
            'tipo': 'custom_screenboard',
            'id': 1414
        },
        {
            'tipo': 'integration_timeboard',
            'id': 5
        },
        {
            'tipo': 'integration_screenboard',
            'id': 67
        },
        {
            'tipo': 'host_timeboard',
            'id': 123456789
        }
    ]
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
[
    "200",
    {
        "dashboards" => [
            {
                "tipo" => "custom_timeboard",
                "id" => 5858
            },
            {
                "tipo" => "custom_screenboard",
                "id" => 1414
            },
            {
                "tipo" => "integration_timeboard",
                "id" => 5
            },
            {
                "tipo" => "integration_screenboard",
                "id" => 67
            },
            {
                "tipo" => "host_timeboard",
                "id" => 123456789
            }
        ]
    }
]

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
{
    "deleted_dashboards_from_list": [
        {
            "tipo": "custom_timeboard",
            "id": 5858
        },
        {
            "tipo": "custom_screenboard",
            "id": 1414
        },
        {
            "tipo": "integration_timeboard",
            "id": 5
        },
        {
            "tipo": "integration_screenboard",
            "id": 67
        },
        {
            "tipo": "host_timeboard",
            "id": 123456789
        }
    ]
}

```

{{% /tab %}}
{{< /tabs >}}

## Modificar elementos de una lista de dashboards

<div class="alert alert-danger">
Este endpoint está obsoleto. Utiliza en su lugar el endpoint <a href="https://docs.datadoghq.com/api#update-items-of-a-dashboard-lista">actualizar elementos de una lista de cuadros de mando v2</a>.
</div>

### Firma

`PONER dashboards https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/`

### Argumentos

*   **`dashboards`** [*required* (requerido)]:
    La nueva lista de dashboards para la lista de dashboard.
    Definiciones de dashboard siguen este formulario:
    *   **`type`** (tipo) [*required* (requerido)]:
        El tipo del dashboard.
        El tipo debe ser uno de los siguientes:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required* (requerido)]:
        El id del dashboard.

### Ejemplos

#### Solicitud de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

``` python
desde inicializar importación datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar (**options [opciones])

list_id = 4741
dashboards = [
    {
        'tipo': 'custom_screenboard',
        'id': 1414
    },
    {
        'tipo': 'custom_timeboard',
        'id': 5858
    },
    {
        'tipo': 'integration_screenboard',
        'id': 67
    },
    {
        'tipo': 'integration_timeboard',
        'id': 5
    },
    {
        'tipo': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.update_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

``` ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "tipo" => "custom_screenboard",
        "id" => 1414
    },
    {
        "tipo" => "custom_timeboard",
        "id" => 5858
    },
    {
        "tipo" => "integration_screenboard",
        "id" => 67
    },
    {
        "tipo" => "integration_timeboard",
        "id" => 5
    },
    {
        "tipo" => "host_timeboard",
        "id" => 123456789
    }
]

resultado = dog.update_items_of_dashboard_list(list_id, dashboards)

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh

api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

list_id=4741

curl -X UPDATE -H "Tipo de contenido: aplicación/json" \
-d '{
        "dashboards": [
            {
                "tipo": "custom_screenboard",
                "id": 1414
            },
            {
                "tipo": "custom_timeboard",
                "id": 5858
            },
            {
                "tipo": "integration_screenboard",
                "id": 67
            },
            {
                "tipo": "integration_timeboard",
                "id": 5
            },
            {
                "tipo": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

```

{{% /tab %}}
{{< /tabs >}}

##### Respuesta de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'dashboards': [
        {
            'tipo': 'custom_timeboard',
            'id': 5858
        },
        {
            'tipo': 'custom_screenboard',
            'id': 1414
        },
        {
            'tipo': 'integration_timeboard',
            'id': 5
        },
        {
            'tipo': 'integration_screenboard',
            'id': 67
        },
        {
            'tipo': 'host_timeboard',
            'id': 123456789
        }
    ]
}

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
[
    "200",
    {
        "dashboards" => [
            {
                "tipo" => "custom_timeboard",
                "id" => 5858
            },
            {
                "tipo" => "custom_screenboard",
                "id" => 1414
            },
            {
                "tipo" => "integration_timeboard",
                "id" => 5
            },
            {
                "tipo" => "integration_screenboard",
                "id" => 67
            },
            {
                "tipo" => "host_timeboard",
                "id" => 123456789
            }
        ]
    }
]
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
{
    "deleted_dashboards_from_list": [
        {
            "tipo": "custom_timeboard",
            "id": 5858
        },
        {
            "tipo": "custom_screenboard",
            "id": 1414
        },
        {
            "tipo": "integration_timeboard",
            "id": 5
        },
        {
            "tipo": "integration_screenboard",
            "id": 67
        },
        {
            "tipo": "host_timeboard",
            "id": 123456789
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Eliminar elementos de una lista de dashboards

<div class="alert alert-danger">
Este endpoint está obsoleto. Utiliza en su lugar el endpoint <a href="https://docs.datadoghq.com/api#delete-items-from-a-dashboard-lista">de eliminación de elementos de una lista dashboard v2</a>.
</div>

### Firma

`ELIMINAR dashboards https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/`

### Argumentos

*   **`dashboards`** [*required* (requeridos)]:
    Una lista de dashboards para eliminar de la lista.
    Definiciones de dashboard siguen esta forma:
    *   **`type`** (tipo) [*required* (requerido)]:
        El tipo del dashboard.
        El tipo debe ser uno de los siguientes:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required* (requerido)]:
        El id del dashboard.

### Ejemplos

#### Solicitud de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

``` python
desde inicializar importaciones datadog, api

opciones = {
    'api_key': '<DATADOG_API_KEY>',
    'app_key': '<DATADOG_APPLICATION_KEY>'
}

inicializar (**options [opciones])

list_id = 4741
dashboards = [
    {
        'tipo': 'custom_screenboard',
        'id': 1414
    },
    {
        'tipo': 'custom_timeboard',
        'id': 5858
    },
    {
        'tipo': 'integration_screenboard',
        'id': 67
    },
    {
        'tipo': 'integration_timeboard',
        'id': 5
    },
    {
        'tipo': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.delete_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

``` ruby
requerir 'rubygems'
requerir 'dogapi'

api_key = '<DATADOG_API_KEY>'
app_key = '<DATADOG_APPLICATION_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "tipo" => "custom_screenboard",
        "id" => 1414
    },
    {
        "tipo" => "custom_timeboard",
        "id" => 5858
    },
    {
        "tipo" => "integration_screenboard",
        "id" => 67
    },
    {
        "tipo" => "integration_timeboard",
        "id" => 5
    },
    {
        "tipo" => "host_timeboard",
        "id" => 123456789
    }
]

resultado = dog.delete_items_from_dashboard_list(list_id, dashboards)

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh

api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

list_id=4741

curl -X DELETE -H "Tipo de contenido: aplicación/json" \
-d '{
        "dashboards": [
            {
                "tipo": "custom_screenboard",
                "id": 1414
            },
            {
                "tipo": "custom_timeboard",
                "id": 5858
            },
            {
                "tipo": "integration_screenboard",
                "id": 67
            },
            {
                "tipo": "integration_timeboard",
                "id": 5
            },
            {
                "tipo": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

```

{{% /tab %}}
{{< /tabs >}}

#### Respuesta de ejemplo

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'deleted_dashboards_from_list': [
        {
            'tipo': 'custom_timeboard',
            'id': 5858
        },
        {
            'tipo': 'custom_screenboard',
            'id': 1414
        },
        {
            'tipo': 'integration_timeboard',
            'id': 5
        },
        {
            'tipo': 'integration_screenboard',
            'id': 67
        },
        {
            'tipo': 'host_timeboard',
            'id': 123456789
        }
    ]
}

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
[
    "200",
    {
        "deleted_dashboards_from_list" => [
            {
                "tipo" => "custom_timeboard",
                "id" => 5858
            },
            {
                "tipo" => "custom_screenboard",
                "id" => 1414
            },
            {
                "tipo" => "integration_timeboard",
                "id" => 5
            },
            {
                "tipo" => "integration_screenboard",
                "id" => 67
            },
            {
                "tipo" => "host_timeboard",
                "id" => 123456789
            }
        ]
    }
]
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
{
    "deleted_dashboards_from_list": [
        {
            "tipo": "custom_timeboard",
            "id": 5858
        },
        {
            "tipo": "custom_screenboard",
            "id": 1414
        },
        {
            "tipo": "integration_timeboard",
            "id": 5
        },
        {
            "tipo": "integration_screenboard",
            "id": 67
        },
        {
            "tipo": "host_timeboard",
            "id": 123456789
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}