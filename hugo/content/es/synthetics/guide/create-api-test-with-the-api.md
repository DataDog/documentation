---
further_reading:
- link: /api/latest/synthetics/
  tag: API
  text: API Synthetics
- link: /synthetics/
  tag: Documentación
  text: Más información sobre la monitorización Synthetic
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Crear y gestionar tests de API Synthetic con Terraform
title: Crear un test de API con la API
---

## Información general

Esta guía contiene ejemplos de archivos de configuración y enlaces a recursos [Terraform][2] que puedes utilizar para crear tests de API, así como recursos sintéticos asociados, como variables globales.

   - Si utilizas la API, consulta los [ejemplos de configuración de JSON](#json-configuration) 
   - Si utilizas el cliente Python, consulta el [ejemplo de cliente Python](#python-client)
   - Si utilizas Terraform, consulta el [ejemplo de Terraform](#terraform)

Para obtener más información, consulta [Crear un test de API][1] en la documentación de la API.

## Configuración de JSON

### Test HTTP

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "http",
    "config": {
        "request": {
            "url": "https://example.com",
            "method": "GET"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "statusCode",
                "target": 200
            },
            {
                "operator": "is",
                "property": "content-type",
                "type": "header",
                "target": "text/html; charset=UTF-8"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test SSL

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "ssl",
    "config": {
        "request": {
            "host": "example.com",
            "port": 443
        },
        "assertions": [
            {
                "operator": "isInMoreThan",
                "type": "certificate",
                "target": 10
            },
            {
                "operator": "moreThanOrEqual",
                "type": "tlsVersion",
                "target": "1.3"
            },
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test DNS

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "dns",
    "config": {
        "request": {
            "host": "example.com"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "property": "A",
                "type": "recordSome",
                "target": "93.184.216.34"
            },
            {
                "operator": "is",
                "property": "NS",
                "type": "recordSome",
                "target": "a.iana-servers.net"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test WebSocket

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:prod"
    ],
    "locations": [
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "websocket",
    "config": {
        "request": {
            "url": "ws://example.com:8081",
            "message": "websocket message"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "receivedMessage",
                "target": "connected!"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test TCP

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "azure:eastus",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "tcp",
    "config": {
        "request": {
            "host": "example.com",
            "port": 443
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test UDP

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:prod"
    ],
    "locations": [
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "udp",
    "config": {
        "request": {
            "host": "example.com",
            "message": "UDP message",
            "port": 31337
        },
        "assertions": [
            {
                "operator": "lessThan",
                "type": "responseTime",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "receivedMessage",
                "target": "UDP message response"
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

### Test ICMP

{{< code-block lang="json" disable_copy="false" collapsible="true" >}}
{
    "status": "live",
    "tags": [
        "env:production"
    ],
    "locations": [
        "aws:us-west-2",
        "aws:eu-west-3"
    ],
    "message": "<NOTIFICATION MESSAGE>",
    "name": "<TEST NAME>",
    "type": "api",
    "subtype": "icmp",
    "config": {
        "request": {
            "numberOfPackets": 4,
            "host": "example.com"
        },
        "assertions": [
            {
                "operator": "lessThan",
                "property": "avg",
                "type": "latency",
                "target": 1000
            },
            {
                "operator": "is",
                "type": "packetLossPercentage",
                "target": 0
            },
            {
                "operator": "moreThanOrEqual",
                "type": "packetsReceived",
                "target": 1
            }
        ]
    },
    "options": {
        "monitor_options": {
            "notify_audit": false,
            "locked": false,
            "include_tags": true,
            "new_host_delay": 300,
            "notify_no_data": false,
            "renotify_interval": 0
        },
        "tick_every": 60,
        "min_failure_duration": 0,
        "min_location_failed": 1
    }
}
{{< /code-block >}}

## Cliente Python

### Test HTTP

{{< code-block lang="python" disable_copy="false" collapsible="true" >}}
import os
from dateutil.parser import parse as dateutil_parser
from datadog_api_client.v1 import ApiClient, ApiException, Configuration
from datadog_api_client.v1.api import synthetics_api
from datadog_api_client.v1.models import *
from pprint import pprint

// Consultar configuración.py para ver una lista de todos los parámetros de onfiguración compatibles
configuration = Configuration(
    host = "https://api.datadoghq.com",
    api_key= {"apiKeyAuth": "<YOUR_API_KEY>","appKeyAuth": "<YOUR_APPLICATION_KEY>"}
)

// Ingresar un contexto con una instancia de cliente API donde la configuración de ApiClient esté configurada como api_client:
    // Crear una instancia de la clase API
    api_instance = synthetics_api.SyntheticsApi(api_client)
    body = SyntheticsAPITest(
        config=SyntheticsAPITestConfig(
            assertions=[
                SyntheticsAssertion(
                    operator="lessThan",
                    type="responseTime",
                    target=1000
                ),
            ],
            request=SyntheticsTestRequest(
                body="body_example",
                headers=SyntheticsTestHeaders(
                    **{"User-Agent": "value"}),
                method=HTTPMethod("GET"),
                no_saving_response_body=True,
                query={},
                timeout=60.0,
                url="https://httpbin.org/get",
            ),
        ),
        locations=[
            "aws:eu-west-2",
        ],
        message="message_example",
        name="name_example",
        options=SyntheticsTestOptions(
            follow_redirects=True,
            min_failure_duration=1,
            min_location_failed=1,
            #monitor_name="monitor_name_example",
            monitor_options=SyntheticsTestOptionsMonitorOptions(
                renotify_interval=0,
            ),
            monitor_priority=1,
            tick_every=30
        ),
        status=SyntheticsTestPauseStatus("live"),
        subtype=SyntheticsTestDetailsSubType("http"),
        tags=[
            "python-client",
        ],
        type=SyntheticsAPITestType("api"),
    )  # SyntheticsAPITest | Detalles del test a crear.

    // ejemplo de transferencia sólo de los valores requeridos que no tienen valores predeterminados definidos
    try:
        // Crear un test de API
        api_response = api_instance.create_synthetics_api_test(body)
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling SyntheticsApi->create_synthetics_api_test: %s\n" % e)
{{< /code-block >}}

## Terraform

### Tests de API

El [recurso de test Synthetic][7], con `type` configurado como `api`, se puede utilizar para crear y gestionar tus tests de API a través de Terraform. 

### Localizaciones privadas

Si necesitas ejecutar tests de Synthetic desde localizaciones personalizadas o protegidas, puedes utilizar el [recurso de localización privada][3] para crear y gestionar localizaciones privadas desde las que ejecutar tus tests. Para obtener más información, consulta la página de [localizaciones privadas][4].

### Variables globales y locales

Utiliza el [recurso de variable global de Synthetics][5] para crear y gestionar variables globales de Synthetics, que son variables que pueden compartirse de forma segura entre tests. También puedes crear [variables locales con funciones integradas][8] específicas para cada test al definir el esquema anidado [config_variable][9] con `type = "text"` en tus recursos de test de Synthetic.

### Límite de concurrencia

El [recurso de límite de concurrencia Synthetics][6] permite limitar el número de tests Synthetic que se ejecutan en paralelo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/synthetics/#create-an-api-test
[2]: https://www.terraform.io/
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_private_location
[4]: /es/synthetics/private_locations
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_global_variable
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_concurrency_cap
[7]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[8]: https://docs.datadoghq.com/es/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test#nested-schema-for-config_variable