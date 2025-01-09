---
title: API Dashboard Lists (v1)
aliases:
  - /fr/graphing/faq/dashboard-lists-api-doc
  - /fr/graphing/guide/dashboard-lists-api-v1-doc
---
Interagissez avec vos listes de dashboards via l'API pour faciliter l'organisation, la recherche et le partage de tous vos dashboards avec votre équipe et votre organisation.

- [Récupérer les éléments d'une liste de dashboards](#recuperer-les-elements-d-une-liste-de-dashboards)
- [Ajouter des éléments à une liste de dashboards](#ajouter-des-elements-a-une-liste-de-dashboards)
- [Mettre à jour les éléments d'une liste de dashboards](#mettre-a-jour-les-elements-d-une-liste-de-dashboards)
- [Supprimer des éléments d'une liste de dashboards](#supprimer-des-elements-d-une-liste-de-dashboards)

## Récupérer les éléments d'une liste de dashboards

<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt la <a href="https://docs.datadoghq.com/api#recuperer-les-elements-d-une-liste-de-dashboards">version 2 de cet endpoint</a>.
</div>

### Signature

`GET https://api.datadoghq.com/api/v1/dashboard/lists/manual/<ID_LISTE>/dashboards`

### Exemples

#### Exemple de requête

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

api.DashboardList.get_items(4741)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_items_of_dashboard_list(4741)
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

list_id=4741

curl -X GET \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

#### Exemple de réponse

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'total': 5,
    'dashboards': [
        {
            'is_shared': False,
            'author': {
                'handle': None,
                'name': None
            },
            'url': '/screen/integration/66/aws-dynamodb',
            'title': 'AWS DynamoDB',
            'modified': None,
            'created': None,
            'is_favorite': True,
            'is_read_only': True,
            'type': 'integration_screenboard',
            'id': 66,
            'icon': '/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png'
        },
        {
            'is_shared': False,
            'author': {
                'handle': None,
                'name': None
            },
            'url': '/dash/integration/17/postgres---metrics',
            'title': 'Postgres - Métriques',
            'modified': None,
            'created': None,
            'is_favorite': True,
            'is_read_only': True,
            'type': 'integration_timeboard',
            'id': 17,
            'icon': '/static/v/34.254868/images/saas_logos/small/postgres.png'
        },
        {
            'new_id': 'qts-q2k-yq6',
            'popularity': 0,
            'is_shared': False,
            'author': {
                'handle': 'test1@datadoghq.com',
                'name': 'Nom d'auteur'
            },
            'url': '/dash/75619/trace-api',
            'title': 'API de trace',
            'modified': '2018-03-16T13:39:39.517133+00:00',
            'created': '2015-10-21T13:22:48.633391+00:00',
            'is_favorite': False,
            'is_read_only': False,
            'type': 'custom_timeboard',
            'id': 75619,
            'icon': None
        },
        {
            'new_id': 'rys-xwq-geh',
            'popularity': 0,
            'is_shared': False,
            'author': {
                'handle': 'test2@datadoghq.com',
                'name': 'Autre nom d'auteur'
            },
            'url': '/screen/63572/agent-stats',
            'title': 'Statistiques d'Agent',
            'modified': '2018-03-16T12:54:25.968134+00:00',
            'created': '2014-06-18T18:19:00.974763+00:00',
            'is_favorite': False,
            'is_read_only': False,
            'type': 'custom_screenboard',
            'id': 63572
            'icon': None
        },
        {
            'popularity': 0,
            'is_shared': False,
            'author': {
                'handle': None,
                'name': None
            },
            'url': '/dash/host/3245468',
            'title': 'agent-gui',
            'modified': None,
            'created': None,
            'is_favorite': False,
            'is_read_only': True,
            'type': 'host_timeboard',
            'id': 3245468,
            'icon': None
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
                "title" => "AWS DynamoDB",
                "is_favorite" => true,
                "id" => 66,
                "icon" => "/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png",
                "is_shared" => false,
                "author" => {
                    "handle" => nil,
                    "name" => nil
                },
                "url" => "/screen/integration/66/aws-dynamodb",
                "created" => nil,
                "modified" => nil,
                "is_read_only" => true,
                "type" => "integration_screenboard"
            },
            {
                "title" => "Postgres - Métriques",
                "is_favorite" => true,
                "id" => 17,
                "icon" => "/static/v/34.254868/images/saas_logos/small/postgres.png",
                "is_shared" => false,
                "author" => {
                    "handle" => nil,
                    "name" => nil
                },
                "url" => "/dash/integration/17/postgres---metrics",
                "created" => nil,
                "modified" => nil,
                "is_read_only" => true,
                "type" => "integration_timeboard"
            },
            {
                "new_id" => "qts-q2k-yq6",
                "popularity" => 0,
                "title" => "API de trace",
                "is_favorite" => false,
                "id" => 75619,
                "icon" => nil,
                "is_shared" => false,
                "author" => {
                    "handle" => "test1@datadoghq.com",
                    "name" => "Nom d'auteur"
                },
                "url" => "/dash/75619/trace-api",
                "created" => "2015-10-21T13:22:48.633391+00:00",
                "modified" => "2018-03-16T13:39:39.517133+00:00",
                "is_read_only" => false,
                "type" => "custom_timeboard"
            },
            {
                "new_id" => "rys-xwq-geh",
                "popularity" => 0,
                "title" => "Statistiques d'Agent",
                "is_favorite" => false,
                "id" => 63572,
                "icon" => nil,
                "is_shared" => false,
                "author" => {
                    "handle" => "test2@datadoghq.com",
                    "name" => "Autre nom d'auteur"
                },
                "url" => "/screen/63572/agent-stats",
                "created" => "2014-06-18T18:19:00.974763+00:00",
                "modified" => "2018-03-16T12:54:25.968134+00:00",
                "is_read_only" => false,
                "type" => "custom_screenboard"
            },
            {
                "popularity" => 0,
                "title" => "agent-gui",
                "is_favorite" => false,
                "id" => 3245468,
                "icon" => nil,
                "is_shared" => false,
                "author" => {
                    "handle" => nil,
                    "name" => nil
                },
                "url" => "/dash/host/3245468",
                "created" => nil,
                "modified" => nil,
                "is_read_only" => true,
                "type" => "host_timeboard"
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
            "is_shared": False,
            "author": {
                "handle": None,
                "name": None
            },
            "url": "/screen/integration/66/aws-dynamodb",
            "title": "AWS DynamoDB",
            "modified": None,
            "created": None,
            "is_favorite": True,
            "is_read_only": True,
            "type": "integration_screenboard",
            "id": 66,
            "icon": "/static/v/34.254868/images/saas_logos/small/amazon_dynamodb.png"
        },
        {
            "is_shared": False,
            "author": {
                "handle": None,
                "name": None
            },
            "url": "/dash/integration/17/postgres---metrics",
            "title": "Postgres - Métriques",
            "modified": None,
            "created": None,
            "is_favorite": True,
            "is_read_only": True,
            "type": "integration_timeboard",
            "id": 17,
            "icon": "/static/v/34.254868/images/saas_logos/small/postgres.png"
        },
        {
            "new_id": "qts-q2k-yq6",
            "popularity": 0,
            "is_shared": False,
            "author": {
                "handle": "test1@datadoghq.com",
                "name": "Nom d'auteur"
            },
            "url": "/dash/75619/trace-api",
            "title": "API de trace",
            "modified": "2018-03-16T13:39:39.517133+00:00",
            "created": "2015-10-21T13:22:48.633391+00:00",
            "is_favorite": False,
            "is_read_only": False,
            "type": "custom_timeboard",
            "id": 75619,
            "icon": None
        },
        {
            "new_id": "rys-xwq-geh",
            "popularity": 0,
            "is_shared": False,
            "author": {
                "handle": "test2@datadoghq.com",
                "name": "Autre nom d'auteur"
            },
            "url": "/screen/63572/agent-stats",
            "title": "Statistiques d'Agent",
            "modified": "2018-03-16T12:54:25.968134+00:00",
            "created": "2014-06-18T18:19:00.974763+00:00",
            "is_favorite": False,
            "is_read_only": False,
            "type": "custom_screenboard",
            "id": 63572,
            "icon": None
        },
        {
            "popularity": 0,
            "is_shared": False,
            "author": {
                "handle": None,
                "name": None
            },
            "url": "/dash/host/3245468",
            "title": "agent-gui",
            "modified": None,
            "created": None,
            "is_favorite": False,
            "is_read_only": True,
            "type": "host_timeboard",
            "id": 3245468,
            "icon": None
        }
    ]
}

```

{{% /tab %}}
{{< /tabs >}}

## Ajouter des éléments à une liste de dashboards

<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt la <a href="https://docs.datadoghq.com/api#ajouter-des-elements-a-une-liste-de-dashboards">version 2 de cet endpoint</a>.
</div>

### Signature

`POST https://api.datadoghq.com/api/v1/dashboard/lists/manual/<ID_LISTE>/dashboards`

### Arguments

*   **`dashboards`** [*obligatoire*] :
    La liste des dashboards à ajouter à la liste.
    Les définitions de dashboard respectent le format suivant :
    *   **`type`** [*obligatoire*] :
        Le type du dashboard.
        Le type doit être correspondre à l'une des valeurs suivantes :

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*obligatoire*] :
        L'ID du dashboard.

### Exemples

#### Exemple de requête

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

list_id = 4741
dashboards = [
    {
        'type': 'custom_screenboard',
        'id': 1414
    },
    {
        'type': 'custom_timeboard',
        'id': 5858
    },
    {
        'type': 'integration_screenboard',
        'id': 67
    },
    {
        'type': 'integration_timeboard',
        'id': 5
    },
    {
        'type': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.add_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "type" => "custom_screenboard",
        "id" => 1414
    },
    {
        "type" => "custom_timeboard",
        "id" => 5858
    },
    {
        "type" => "integration_screenboard",
        "id" => 67
    },
    {
        "type" => "integration_timeboard",
        "id" => 5
    },
    {
        "type" => "host_timeboard",
        "id" => 123456789
    }
]

result = dog.add_items_of_dashboard_list(list_id, dashboards)
```

{{% /tab %}}
{{% tab "Curl" %}}

```sh
api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

list_id=4741

curl -X ADD -H "Content-type: application/json" \
-d '{
        "dashboards": [
            {
                "type": "custom_screenboard",
                "id": 1414
            },
            {
                "type": "custom_timeboard",
                "id": 5858
            },
            {
                "type": "integration_screenboard",
                "id": 67
            },
            {
                "type": "integration_timeboard",
                "id": 5
            },
            {
                "type": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
```

{{% /tab %}}
{{< /tabs >}}

#### Exemple de réponse

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'added_dashboards_to_list': [
        {
            'type': 'custom_timeboard',
            'id': 5858
        },
        {
            'type': 'custom_screenboard',
            'id': 1414
        },
        {
            'type': 'integration_timeboard',
            'id': 5
        },
        {
            'type': 'integration_screenboard',
            'id': 67
        },
        {
            'type': 'host_timeboard',
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
                "type" => "custom_timeboard",
                "id" => 5858
            },
            {
                "type" => "custom_screenboard",
                "id" => 1414
            },
            {
                "type" => "integration_timeboard",
                "id" => 5
            },
            {
                "type" => "integration_screenboard",
                "id" => 67
            },
            {
                "type" => "host_timeboard",
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
            "type": "custom_timeboard",
            "id": 5858
        },
        {
            "type": "custom_screenboard",
            "id": 1414
        },
        {
            "type": "integration_timeboard",
            "id": 5
        },
        {
            "type": "integration_screenboard",
            "id": 67
        },
        {
            "type": "host_timeboard",
            "id": 123456789
        }
    ]
}

```

{{% /tab %}}
{{< /tabs >}}

## Mettre à jour les éléments d'une liste de dashboards

<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt la<a href="https://docs.datadoghq.com/api#mettre-a-jour-les-elements-d-une-liste-de-dashboards">version 2 de cet endpoint</a>.
</div>

### Signature

`PUT https://api.datadoghq.com/api/v1/dashboard/lists/manual/<ID_LISTE>/dashboards`

### Arguments

*   **`dashboards`** [*obligatoire*] :
    La nouvelle liste de dashboards.
    Les définitions de dashboard respectent le format suivant :
    *   **`type`** [*obligatoire*] :
        Le type du dashboard.
        Le type doit être correspondre à l'une des valeurs suivantes :

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*obligatoire*] :
        L'ID du dashboard.

### Exemples

#### Exemple de requête

{{< tabs >}}
{{% tab "Python" %}}

``` python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

list_id = 4741
dashboards = [
    {
        'type': 'custom_screenboard',
        'id': 1414
    },
    {
        'type': 'custom_timeboard',
        'id': 5858
    },
    {
        'type': 'integration_screenboard',
        'id': 67
    },
    {
        'type': 'integration_timeboard',
        'id': 5
    },
    {
        'type': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.update_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

``` ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "type" => "custom_screenboard",
        "id" => 1414
    },
    {
        "type" => "custom_timeboard",
        "id" => 5858
    },
    {
        "type" => "integration_screenboard",
        "id" => 67
    },
    {
        "type" => "integration_timeboard",
        "id" => 5
    },
    {
        "type" => "host_timeboard",
        "id" => 123456789
    }
]

result = dog.update_items_of_dashboard_list(list_id, dashboards)

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh

api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

list_id=4741

curl -X UPDATE -H "Content-type: application/json" \
-d '{
        "dashboards": [
            {
                "type": "custom_screenboard",
                "id": 1414
            },
            {
                "type": "custom_timeboard",
                "id": 5858
            },
            {
                "type": "integration_screenboard",
                "id": 67
            },
            {
                "type": "integration_timeboard",
                "id": 5
            },
            {
                "type": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

```

{{% /tab %}}
{{< /tabs >}}

##### Exemple de réponse

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'dashboards': [
        {
            'type': 'custom_timeboard',
            'id': 5858
        },
        {
            'type': 'custom_screenboard',
            'id': 1414
        },
        {
            'type': 'integration_timeboard',
            'id': 5
        },
        {
            'type': 'integration_screenboard',
            'id': 67
        },
        {
            'type': 'host_timeboard',
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
                "type" => "custom_timeboard",
                "id" => 5858
            },
            {
                "type" => "custom_screenboard",
                "id" => 1414
            },
            {
                "type" => "integration_timeboard",
                "id" => 5
            },
            {
                "type" => "integration_screenboard",
                "id" => 67
            },
            {
                "type" => "host_timeboard",
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
            "type": "custom_timeboard",
            "id": 5858
        },
        {
            "type": "custom_screenboard",
            "id": 1414
        },
        {
            "type": "integration_timeboard",
            "id": 5
        },
        {
            "type": "integration_screenboard",
            "id": 67
        },
        {
            "type": "host_timeboard",
            "id": 123456789
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Supprimer des éléments d'une liste de dashboards

<div class="alert alert-danger">
Cet endpoint est obsolète. Utilisez plutôt la <a href="https://docs.datadoghq.com/api#supprimer-des-elements-d-une-liste-de-dashboards">version 2 de cet endpoint</a>.
</div>

### Signature

`DELETE https://api.datadoghq.com/api/v1/dashboard/lists/manual/<ID_LISTE>/dashboards`

### Arguments

*   **`dashboards`** [*obligatoire*] :
    La liste des dashboards à supprimer de la liste.
    Les définitions de dashboard respectent le format suivant :
    *   **`type`** [*obligatoire*] :
        Le type du dashboard.
        Le type doit être correspondre à l'une des valeurs suivantes :

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*obligatoire*] :
        L'ID du dashboard.

### Exemples

#### Exemple de requête

{{< tabs >}}
{{% tab "Python" %}}

``` python
from datadog import initialize, api

options = {
    'api_key': '<CLÉ_API_DATADOG>',
    'app_key': '<CLÉ_APPLICATION_DATADOG>'
}

initialize(**options)

list_id = 4741
dashboards = [
    {
        'type': 'custom_screenboard',
        'id': 1414
    },
    {
        'type': 'custom_timeboard',
        'id': 5858
    },
    {
        'type': 'integration_screenboard',
        'id': 67
    },
    {
        'type': 'integration_timeboard',
        'id': 5
    },
    {
        'type': 'host_timeboard',
        'id': 123456789
    }
]

api.DashboardList.delete_items(list_id, dashboards=dashboards)

```

{{% /tab %}}
{{% tab "Ruby" %}}

``` ruby
require 'rubygems'
require 'dogapi'

api_key = '<CLÉ_API_DATADOG>'
app_key = '<CLÉ_APPLICATION_DATADOG>'

dog = Dogapi::Client.new(api_key, app_key)

list_id = 4741
dashboards = [
    {
        "type" => "custom_screenboard",
        "id" => 1414
    },
    {
        "type" => "custom_timeboard",
        "id" => 5858
    },
    {
        "type" => "integration_screenboard",
        "id" => 67
    },
    {
        "type" => "integration_timeboard",
        "id" => 5
    },
    {
        "type" => "host_timeboard",
        "id" => 123456789
    }
]

result = dog.delete_items_from_dashboard_list(list_id, dashboards)

```

{{% /tab %}}
{{% tab "Curl" %}}

```sh

api_key=<CLÉ_API_DATADOG>
app_key=<CLÉ_APPLICATION_DATADOG>

list_id=4741

curl -X DELETE -H "Content-type: application/json" \
-d '{
        "dashboards": [
            {
                "type": "custom_screenboard",
                "id": 1414
            },
            {
                "type": "custom_timeboard",
                "id": 5858
            },
            {
                "type": "integration_screenboard",
                "id": 67
            },
            {
                "type": "integration_timeboard",
                "id": 5
            },
            {
                "type": "host_timeboard",
                "id": 123456789
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"

```

{{% /tab %}}
{{< /tabs >}}

#### Exemple de réponse

{{< tabs >}}
{{% tab "Python" %}}

```python
{
    'deleted_dashboards_from_list': [
        {
            'type': 'custom_timeboard',
            'id': 5858
        },
        {
            'type': 'custom_screenboard',
            'id': 1414
        },
        {
            'type': 'integration_timeboard',
            'id': 5
        },
        {
            'type': 'integration_screenboard',
            'id': 67
        },
        {
            'type': 'host_timeboard',
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
                "type" => "custom_timeboard",
                "id" => 5858
            },
            {
                "type" => "custom_screenboard",
                "id" => 1414
            },
            {
                "type" => "integration_timeboard",
                "id" => 5
            },
            {
                "type" => "integration_screenboard",
                "id" => 67
            },
            {
                "type" => "host_timeboard",
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
            "type": "custom_timeboard",
            "id": 5858
        },
        {
            "type": "custom_screenboard",
            "id": 1414
        },
        {
            "type": "integration_timeboard",
            "id": 5
        },
        {
            "type": "integration_screenboard",
            "id": 67
        },
        {
            "type": "host_timeboard",
            "id": 123456789
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}