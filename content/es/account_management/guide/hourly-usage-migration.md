---
further_reading:
- link: /account_management/plan_and_usage/
  tag: Documentación
  text: Planificación y ajustes de uso
title: Migrar de la versión 1 de las APIs de uso por hora a la versión 2
---

## Resumen
Los usuarios de la versión 1 de las APIs deberían reconocer conceptos similares en la versión 2 de la API de uso por hora,
aunque representados de forma algo diferente.

Las diferencias más destacables entre estas versiones de la API son que la versión 2:
* Consolida todos los productos en un único endpoint
* Sigue el estándar JSON:API
* Está paginada
* Puede mostrar datos de varias organizaciones y regiones por solicitud

Cada diferencia se aborda con mayor detalle en las siguientes secciones.

## Gamas de productos consolidadas
La versión 2 de la API introduce los conceptos de gama de productos y tipo de uso. Las gamas de productos son
agrupaciones de uno o varios tipos de uso. Los tipos de uso son mediciones del uso de una organización
y un periodo de tiempo concretos. El conjunto inicial de gamas de productos se corresponde en su mayor parte con la versión 1 de las APIs,
con la asignación completa indicada a continuación. Además, existe una gama de productos `all` especial que recopila
el uso del resto de gamas de productos.

Las gamas y los tipos de uso:
- **all** (todos)
    * _Contiene todas las demás gamas de productos_
- **analyzed_logs** (logs analizados)
    * `analyzed_logs`
- **application_security** (seguridad de la aplicación)
    * `app_sec_host_count`
- **audit_trail** (traza de auditoría)
    * `enabled`
- **serverless**
    * `func_count`
    * `invocations_sum`
- **ci_app** (app CI)
    * `ci_pipeline_indexed_spans`
    * `ci_test_indexed_spans`
    * `ci_visibility_pipeline_committers`
    * `ci_visibility_test_committers`
- **cloud_cost_management** (gestión de costes en la nube)
    * `host_count`
- **csm_container_enterprise**
    * `cws_count`
    * `compliance_count`
    * `total_count`
- **csm_host_enterprise**
    * `total_host_count`
    * `compliance_hosts`
    * `cws_hosts`
    * `aas_host_count`
    * `azure_host_count`
    * `aws_host_count`
    * `gcp_host_count`
- **cspm**
    * `aas_host_count`
    * `azure_host_count`
    * `compliance_host_count`
    * `container_count`
    * `host_count`
- **cws**
    * `cws_container_count`
    * `cws_host_count`
- **dbm**
    * `dbm_host_count`
    * `dbm_queries_count`
- **fargate**
    * `avg_profiled_fargate_tasks`
    * `tasks_count`
- **infra_hosts**
    * `agent_host_count`
    * `alibaba_host_count`
    * `apm_azure_app_service_host_count`
    * `apm_host_count`
    * `aws_host_count`
    * `azure_host_count`
    * `container_count`
    * `gcp_host_count`
    * `heroku_host_count`
    * `host_count`
    * `infra_azure_app_service`
    * `opentelemetry_host_count`
    * `vsphere_host_count`
- **incident_management**
    * `monthly_active_users`
- **indexed_logs**
    * `logs_indexed_events_3_day_count`
    * `logs_live_indexed_events_3_day_count`
    * `logs_rehydrated_indexed_events_3_day_count`
    * `logs_indexed_events_7_day_count`
    * `logs_live_indexed_events_7_day_count`
    * `logs_rehydrated_indexed_events_7_day_count`
    * `logs_indexed_events_15_day_count`
    * `logs_live_indexed_events_15_day_count`
    * `logs_rehydrated_indexed_events_15_day_count`
    * `logs_indexed_events_30_day_count`
    * `logs_live_indexed_events_30_day_count`
    * `logs_rehydrated_indexed_events_30_day_count`
    * `logs_indexed_events_45_day_count`
    * `logs_live_indexed_events_45_day_count`
    * `logs_rehydrated_indexed_events_45_day_count`
    * `logs_indexed_events_60_day_count`
    * `logs_live_indexed_events_60_day_count`
    * `logs_rehydrated_indexed_events_60_day_count`
    * `logs_indexed_events_90_day_count`
    * `logs_live_indexed_events_90_day_count`
    * `logs_rehydrated_indexed_events_90_day_count`
    * `logs_indexed_events_180_day_count`
    * `logs_live_indexed_events_180_day_count`
    * `logs_rehydrated_indexed_events_180_day_count`
    * `logs_indexed_events_360_day_count`
    * `logs_live_indexed_events_360_day_count`
    * `logs_rehydrated_indexed_events_360_day_count`
    * `logs_indexed_events_custom_day_count`
    * `logs_live_indexed_events_custom_day_count`
    * `logs_rehydrated_indexed_events_custom_day_count`
- **indexed_spans**
    * `indexed_events_count`
    * `ingested_spans`
    * `ingested_events_bytes`
- **iot**
    * `iot_device_count`
- **lambda_traced_invocations**
    * `lambda_traced_invocations_count`
- **logs**
    * `billable_ingested_bytes`
    * `indexed_events_count`
    * `ingested_events_bytes`
    * `logs_forwarding_events_bytes`
    * `logs_live_indexed_count`
    * `logs_live_ingested_bytes`
    * `logs_rehydrated_indexed_count`
    * `logs_rehydrated_ingested_bytes`
- **network_flows**
    * `indexed_events_count`
- **network_hosts**
    * `host_count`
- **observability_pipelines**
    * `observability_pipelines_bytes_processed`
- **online_archive**
    * `online_archive_events_count`
- **profiling**
    * `avg_container_agent_count`
    * `host_count`
- **rum**
    * `browser_rum_units`
    * `mobile_rum_units`
    * `rum_units`
- **rum_browser_sessions**
    * `replay_session_count`
    * `session_count`
- **rum_mobile_sessions**
    * `session_count`
    * `session_count_android`
    * `session_count_ios`
    * `session_count_reactnative`
    * `session_count_flutter`
- **sds**
    * `logs_scanned_bytes`
    * `total_scanned_bytes`
- **snmp**
    * `snmp_devices`
- **synthetics_api**
    * `check_calls_count`
- **synthetics_browser**
    * `browser_check_calls_count`
- **synthetics_mobile**
    * `test_runs`
- **timeseries**
    * `num_custom_input_timeseries`
    * `num_custom_output_timeseries`
    * `num_custom_timeseries`


Esta lista muestra cómo se asignan las gamas y los tipos de uso anteriores a los endpoints de uso por hora de la versión 1. El tipo de uso y el punto de datos son lo mismo, excepto cuando se especifique expresamente lo contrario:

ENDPOINT | GAMA DE PRODUCTOS
`<base_url>/api/v1/usage/hosts` | infra_hosts
: `agent_host_count`
: `alibaba_host_count`
: `apm_azure_app_service_host_count`
: `apm_host_count`
: `aws_host_count`
: `azure_host_count`
: `container_count`
: `gcp_host_count`
: `heroku_host_count`
: `host_count`
: `infra_azure_app_service`
: `opentelemetry_host_count`
: `vsphere_host_count`

`<base_url>/api/v1/usage/logs` | logs
: `billable_ingested_bytes`
: `indexed_events_count`
: `ingested_events_bytes`
: `logs_live_indexed_count`
: `logs_live_ingested_bytes`
: `logs_rehydrated_indexed_count`
: `logs_rehydrated_ingested_bytes`

`<base_url>/api/v1/usage/timeseries` | timeseries
: `num_custom_input_timeseries`
: `num_custom_output_timeseries`
: `num_custom_timeseries`

`<base_url>/api/v1/usage/indexed-spans` | indexed_spans
: `indexed_events_count`

`<base_url>/api/v1/usage/synthetics`
: Obsoleto. Consulta synthetics_api (API Synthetics) y synthetics_browser (navegador Synthetics) para el uso de Synthetics

`<base_url>/api/v1/usage/synthetics_api` | synthetics_api
: `check_calls_count`

`<base_url>/api/v1/usage/synthetics_browser` | synthetics_browser
: `browser_check_calls_count`

`<base_url>/api/v1/usage/fargate` | fargate
: `avg_profiled_fargate_tasks`
: `tasks_count`

`<base_url>/api/v1/usage/aws_lambda` | serverless
: `func_count`
: `invocations_sum`

`<base_url>/api/v1/usage/rum_sessions?type=browser` | rum_browser_sessions
: `replay_session_count`
: `session_count`

`<base_url>/api/v1/usage/rum_sessions?type=mobile` | rum_mobile_sessions
: `session_count`
: `session_count_android`
: `session_count_ios`
: `session_count_reactnative`

`<base_url>/api/v1/usage/network_hosts` | network_hosts
: `host_count`

`<base_url>/api/v1/usage/network_flows` | network_flows
: `indexed_events_count`

`<base_url>/api/v1/usage/logs-by-retention` | indexed_logs
: **Nota:** En el caso de esta URL, el tipo de uso y el punto de datos son distintos, porque el valor de retención está incluido en el tipo de uso.
: **Tipo de uso:** `logs_indexed_events_<retention>_count` **Punto de datos:** `indexed_events_count`
: **Tipo de uso:** `logs_live_indexed_events_<retention>_count` **Punto de datos:** `live_indexed_events_count`
: **Tipo de uso:** `logs_rehydrated_indexed_events_<retention>_count` **Punto de datos:** `rehydrated_indexed_events_count`
: **Tipo de uso:** En `usage_type`, sustituye `<retention>` con uno de los siguientes parámetros: `3_day`, `7_day`, `15_day`, `30_day`, `45_day`, `60_day`, `90_day`, `180_day`, `365_day`, `custom` **Punto de datos:** `retention`

`<base_url>/api/v1/usage/analyzed_logs` | analyzed_logs
: `analyzed_logs`

`<base_url>/api/v1/usage/snmp` | snmp
: `snmp_devices`

`<base_url>/api/v1/usage/profiling` | profiling
: `host_count`

`<base_url>/api/v1/usage/ingested-spans` | ingested_spans
: `ingested_events_bytes` 

`<base_url>/api/v1/usage/incident-management` | incident_management
: `monthly_active_users`

`<base_url>/api/v1/usage/iot` | iot
: `iot_device_count`

`<base_url>/api/v1/usage/cspm` | cspm
: `aas_host_count`
: `azure_host_count`
: `compliance_host_count`
: `container_count`
: `host_count`

`<base_url>/api/v1/usage/audit_logs` | audit_logs
: `lines_indexed`

`<base_url>/api/v1/usage/cws` | cws
: `cws_container_count`
: `cws_host_count`

`<base_url>/api/v1/usage/dbm` | dbm
: `dbm_host_count`
: `dbm_queries_count`

`<base_url>/api/v1/usage/sds` | sds
: `logs_scanned_bytes`
: `total_scanned_bytes`

`<base_url>/api/v1/usage/rum` | rum
: `browser_rum_units`
: `mobile_rum_units`
: `rum_units`

`<base_url>/api/v1/usage/ci-app` | ci_app
: `ci_pipeline_indexed_spans`
: `ci_test_indexed_spans`
: `ci_visibility_pipeline_committers`
: `ci_visibility_test_committers`

`<base_url>/api/v1/usage/online-archive` | online_archive
: `online_archive_events_count`

`<base_url>/api/v2/usage/lambda_traced_invocations` | lambda_traced_invocations
: `lambda_traced_invocations_count`

`<base_url>/api/v2/usage/application_security` | application_security
: `app_sec_host_count`

`<base_url>/api/v2/usage/observability_pipelines` | observability_pipelines
: `observability_pipelines_bytes_processed`

## Formato compatible con la especificación JSON:API

Los cuerpos de las respuestas y los nombres de los parámetros se ajustan a la [especificación JSON:API][1]. Todos los datos
disponibles en la versión 1 de las APIs siguen estando disponibles. Consulta el siguiente ejemplo de asignación de la API de hosts de la versión 1
a la API de uso por hora de la versión 2.

### API v1: [Ver el uso por hora de los hosts y contenedores][2]

#### Solicitud

`https://api.datadoghq.com/api/v1/usage/hosts?start_hr=2022-06-01T00&end_hr=2022-06-01T01`

##### Notas

* El producto es un elemento de la ruta `hosts`.
* Los períodos de tiempo se controlan mediante los parámetros `start_hr` y `end_hr`.

#### Respuesta

```json
{
  "usage": [
    {
      "agent_host_count": 1,
      "alibaba_host_count": 2,
      "apm_azure_app_service_host_count": 3,
      "apm_host_count": 4,
      "aws_host_count": 5,
      "azure_host_count": 6,
      "container_count": 7,
      "gcp_host_count": 8,
      "heroku_host_count": 9,
      "host_count": 10,
      "infra_azure_app_service": 11,
      "opentelemetry_host_count": 12,
      "vsphere_host_count": 13,
      "hour": "2022-06-01T00",
      "org_name": "Customer Inc",
      "public_id": "abc123"
    }
  ]
}
```

##### Notas

* El uso dado a cada hora se representa como un objeto en la matriz de uso.
* Los tipos de uso son claves en el objeto, y el uso registrado de esos tipos de uso son los valores correspondientes.
* La hora, el nombre de la organización y el ID público también son campos en el objeto.

### API v2: ver el uso por hora por gama de productos

#### Solicitud

`https://api.datadoghq.com/api/v2/usage/hourly_usage?filter[timestamp][start]=2022-06-01T00&filter[timestamp][end]=2022-06-01T01&filter[product_families]=infra_hosts`

##### Notas

* El producto se incluye como un parámetro de consulta `filter[product_families]=infra_hosts`.
* Los períodos de tiempo se controlan mediante los parámetros `filter[timestamp][start]` y `filter[timestamp][end]`.

#### Respuesta

```json
{
  "data": [
    {
      "attributes": {
        "org_name": "Customer Inc",
        "public_id": "abc123",
        "timestamp": "2022-06-01T00:00:00+00:00",
        "region": "us",
        "measurements": [
          {
            "usage_type": "agent_host_count",
            "value": 1
          },
          {
            "usage_type": "alibaba_host_count",
            "value": 2
          },
          {
            "usage_type": "apm_azure_app_service_host_count",
            "value": 3
          },
          {
            "usage_type": "apm_host_count",
            "value": 4
          },
          {
            "usage_type": "aws_host_count",
            "value": 5
          },
          {
            "usage_type": "azure_host_count",
            "value": 6
          },
          {
            "usage_type": "container_count",
            "value": 7
          },
          {
            "usage_type": "gcp_host_count",
            "value": 8
          },
          {
            "usage_type": "heroku_host_count",
            "value": 9
          },
          {
            "usage_type": "host_count",
            "value": 10
          },
          {
            "usage_type": "infra_azure_app_service",
            "value": 11
          },
          {
            "usage_type": "opentelemetry_host_count",
            "value": 12
          },
          {
            "usage_type": "vsphere_host_count",
            "value": 13
          }
        ],
        "product_family": "infra_hosts"
      },
      "type": "usage_timeseries",
      "id": "ec3e0318b98d15c2ae8125e8bda0ff487cd08d80b120fb340c9322ee16f28629"
    }
  ]
}
```

#### Notas

* Los objetos de la matriz de datos representan el uso por hora de cada producto y cada organización.
    * Las APIs v1 no eran compatibles con varios productos o varias organizaciones por solicitud.
* Las mediciones de uso se representan en la matriz `measurements` anidada.
* Los objetos de medición de uso tienen los campos  `usage_type` y `value`.
* `hour`, `org_name` y `public_id` también son campos en el objeto `attributes`.

## Paginación

La API v2 de uso por hora está paginada. Las respuestas tienen un límite de 500 páginas, donde cada página contiene los datos de uso de una
gama de productos, para una hora y una organización. La paginación permite que la API sea compatible con otras funciones, por ejemplo, varios
productos por solicitud, varias organizaciones por solicitud y rangos de tiempo ilimitados.

Si un resultado tiene más páginas, el ID de registro de la página siguiente se muestra en el campo
`meta.pagination.next_record_id`. Luego, los clientes deberán incluir ese ID en el parámetro `pagination[next_record_id]`. Si el
el campo `meta.pagination.next_record_id` no está definido, no hay más páginas que consultar.

### Ejemplo de código
```
response := GetHourlyUsage(start_time, end_time, product_families)
cursor := response.metadata.pagination.next_record_id
WHILE cursor != null BEGIN
sleep(5 seconds)  # Avoid running into rate limit
response := GetHourlyUsage(start_time, end_time, product_families, next_record_id=cursor)
cursor := response.metadata.pagination.next_record_id
END
```

## Respuestas de varias organizaciones

La API v2 permite recuperar los datos de uso de todas tus organizaciones secundarias de todas las regiones en una solicitud. Utiliza el
parámetro `filter[include_descendants]` para solicitar datos de organizaciones secundarias.

### Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://jsonapi.org/format/
[2]: /es/api/latest/usage-metering/#get-hourly-usage-for-hosts-and-containers