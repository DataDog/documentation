---
title: Dashboard Lists API doc (v1)
kind: guide
aliases:
  - /graphing/faq/dashboard-lists-api-doc
---

<div class="alert alert-danger">
This endpoint is outdated. Use the <a href="https://docs.datadoghq.com/api/?lang=python#dashboard-lists">new Dashboard List endpoint version</a> instead.
</div>

Interact with your dashboard lists through the API to make it easier to organize, find, and share all of your dashboards with your team and organization.

## Get Items of a Dashboard List

### Signature

`GET https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/dashboards`

### Examples

{{< tabs >}}
{{% tab "Python" %}}

##### Example Request

```python
from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)

api.DashboardList.get_items(4741)

```

##### Example Response

```python
{
    'total': 2,
    'dashboards': [
        {
            'new_id': 99,
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
            'new_id': 71,
            'is_shared': False,
            'author': {
                'handle': None,
                'name': None
            },
            'url': '/dash/integration/17/postgres---metrics',
            'title': 'Postgres - Metrics',
            'modified': None,
            'created': None,
            'is_favorite': True,
            'is_read_only': True,
            'type': 'integration_timeboard',
            'id': 17,
            'icon': '/static/v/34.254868/images/saas_logos/small/postgres.png'
        }
    ]
}
```

{{% /tab %}}
{{% tab "Ruby" %}}

##### Example Request

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

dog = Dogapi::Client.new(api_key, app_key)

result = dog.get_items_of_dashboard_list(4741)
```

##### Example Response

```ruby
[
    "200",
    {
        "total" => 2,
        "dashboards" => [
            {
                "new_id" => 99,
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
                "new_id" => 71,
                "title" => "Postgres - Metrics",
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
            }
        ]
    }
]

```


{{% /tab %}}
{{% tab "Curl" %}}

##### Example Request

```sh
api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

list_id=4741

curl -X GET \
"https://api.datadoghq.com/api/v1/dashboard/lists/manual/${list_id}/dashboards?api_key=${api_key}&application_key=${app_key}"
```

##### Example Response

```sh
{
    "total": 2,
    "dashboards": [
        {
            "new_id": 99,
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
            "new_id": 71,
            "is_shared": False,
            "author": {
                "handle": None,
                "name": None
            },
            "url": "/dash/integration/17/postgres---metrics",
            "title": "Postgres - Metrics",
            "modified": None,
            "created": None,
            "is_favorite": True,
            "is_read_only": True,
            "type": "integration_timeboard",
            "id": 17,
            "icon": "/static/v/34.254868/images/saas_logos/small/postgres.png"
        }
    ]
}

```

{{% /tab %}}
{{< /tabs >}}


## Add Items of a Dashboard List

### Signature

`POST https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/dashboards`

### Arguments

*   **`dashboards`** [*required*]:
    A list of dashboards to add to the list.
    Dashboard definitions follow this form:
    *   **`type`** [*required*]:
        The type of the dashboard.
        The type must be one of:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required*]:
        The id of the dashboard.

{{< tabs >}}
{{% tab "Python" %}}

##### Example Request

```python
from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
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

##### Example Response

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

##### Example Request

```ruby
require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

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

##### Example Response

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

##### Example Request

```sh
api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

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

##### Example Response

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


## Update Items of a Dashboard List

### Signature

`PUT https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/dashboards`

### Arguments

*   **`dashboards`** [*required*]:
    The new list of dashboards for the dashboard list.
    Dashboard definitions follow this form:
    *   **`type`** [*required*]:
        The type of the dashboard.
        The type must be one of:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required*]:
        The id of the dashboard.

{{< tabs >}}
{{% tab "Python" %}}

##### Example Request

``` python
from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
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

##### Example Response

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

#### Example Request

``` ruby
require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

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

#### Example Response

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

#### Example Request

```sh

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

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
#### Example Response

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


## Delete Items of a Dashboard List

### Signature

`DELETE https://api.datadoghq.com/api/v1/dashboard/lists/manual/<LIST_ID>/dashboards`

### Arguments

*   **`dashboards`** [*required*]:
    A list of dashboards to remove from the list.
    Dashboard definitions follow this form:
    *   **`type`** [*required*]:
        The type of the dashboard.
        The type must be one of:

        * `"custom_timeboard"`
        * `"custom_screenboard"`
        * `"integration_screenboard"`
        * `"integration_timeboard"`
        * `"host_timeboard"`
    *   **`id`** [*required*]:
        The id of the dashboard.

{{< tabs >}}
{{% tab "Python" %}}

##### Example Request

``` python
from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
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

##### Example Response

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

#### Example Request

``` ruby
require 'rubygems'
require 'dogapi'

api_key = '<YOUR_API_KEY>'
app_key = '<YOUR_APP_KEY>'

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

#### Example Response

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

#### Example Request

```sh

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

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
#### Example Response

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
