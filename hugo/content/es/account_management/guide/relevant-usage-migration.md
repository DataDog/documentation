---
title: Migración de logs indexados y RUM en las APIs de uso por hora y de resumen
  de uso
---

## Información general

El 1 de octubre de 2024 cambiarán dos endpoints de la API:
- [Obtener el uso por hora por familia de productos][1]
- [Obtener el uso en toda tu cuenta][2]

Los productos RUM y los logs indexados se ven afectados. Consulta la siguiente sección para cada endpoint de API que utilices y revisa las actualizaciones para determinar qué cambios debes realizar en tu automatización. 

## Obtener el uso por hora y familia de productos

El cambio del 1 de octubre de 2024 al endpoint [Obtener uso por hora por familia de productos][1] deja obsoletas las claves legacy y proporciona información más detallada sobre tu uso de RUM.

### RUM

Las siguientes claves legacy quedarán obsoletas:
- Familia de productos `rum_browser_sessions`:
  - `replay_session_count`
  - `session_count`
- Familia de productos `rum_mobile_sessions`:
  - `session_count`
  - `session_count_android`
  - `session_count_flutter`
  - `session_count_ios`
  - `session_count_reactnative`
  - `session_count_roku`
- Familia de productos `rum`:
  - `browser_rum_units`
  - `mobile_rum_units`
  - `rum_units`

Se añadirán las siguientes claves nuevas:
- `rum_replay_session_count`
- `rum_lite_session_count`
- `rum_browser_legacy_session_count`
- `rum_browser_replay_session_count`
- `rum_browser_lite_session_count`
- `rum_mobile_legacy_session_count_android`
- `rum_mobile_legacy_session_count_flutter`
- `rum_mobile_legacy_session_count_ios`
- `rum_mobile_legacy_session_count_reactnative`
- `rum_mobile_legacy_session_count_roku`
- `rum_mobile_lite_session_count_android`
- `rum_mobile_lite_session_count_flutter`
- `rum_mobile_lite_session_count_ios`
- `rum_mobile_lite_session_count_reactnative`
- `rum_mobile_lite_session_count_roku`

El uso de RUM en el endpoint **Obtener uso por hora por familia de productos** se mostrará bajo una familia de productos `rum` con tres claves que representan SKUs en los que se podría facturar tu uso de RUM:
- `rum`
- `rum_replay`
- `rum_lite`

Las familias de productos legacy y los tipos de uso quedarán obsoletos y se mostrarán como `null` en el endpoint **Obtener uso por hora por familia de productos**.

 #### Estructura de respuesta actual

 A continuación, se muestra un ejemplo actual de respuesta para el endpoint [Obtener uso por hora por familia de productos][1]:
 {{< code-block lang="json">}}
 {
  "data": [
     {
      "id": "abcd",
      "type": "usage_timeseries",
      "attributes": {
        "product_family": "rum",
        "org_name": "Test Org",
        "public_id": "abcd",
        "region": "us",
        "timestamp": "2024-04-01T00:00:00+00:00",
        "measurements": [
          {
            "usage_type": "browser_rum_units",
            "value": 100
          },
          {
            "usage_type": "mobile_rum_units",
            "value": null
          }
        ]
      }
    },
  ]
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_browser_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "replay_session_count",
          "value": 100
        },
        {
          "usage_type": "session_count",
          "value": 100
        }
      ]
    }
  },
  {
    "id": "abcd",
    "type": "usage_timeseries",
    "attributes": {
      "product_family": "rum_mobile_sessions",
      "org_name": "Test Org",
      "public_id": "abcd",
      "region": "us",
      "timestamp": "2024-04-01T00:00:00+00:00",
      "measurements": [
        {
          "usage_type": "session_count",
          "value": 0
        },
        {
          "usage_type": "session_count_android",
          "value": 100
        },
        {
          "usage_type": "session_count_flutter",
          "value": 0
        },
        {
          "usage_type": "session_count_ios",
          "value": 0
        },
        {
          "usage_type": "session_count_reactnative",
          "value": 0
        },
        {
          "usage_type": "session_count_roku",
          "value": 0
        }
      ]
    }
  }
}
{{< /code-block >}}

#### Próxima estructura de respuesta

Después del 1 de octubre de 2024, el endpoint [Obtener uso por hora por familia de productos][1] tendrá la siguiente estructura de ejemplo:


{{< highlight json "hl_lines=7 14 17 22 27 30 83 110" >}}
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
// Una familia de productos existente (rum) ; las familias de productos rum_browser_sessions y rum_mobile_sessions quedan obsoletas a continuación
            "product_family":"rum",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
// Tres nuevas claves que representan SKUs que se pueden facturar a tu uso de RUM
               {
                  "usage_type":"rum_total_session_count",
// SKU al que se le puede facturar tu uso. Nulo si el SKU no está activo para tu organización
                  "usage":null
               },
               {
                  "usage_type":"rum_replay_session_count",
// SKU al que se le puede facturar tu uso. Nulo si el SKU no está activo para tu organización
                  "usage":50
               },
               {
                  "usage_type":"rum_lite_session_count",
// SKU al que se le puede facturar tu uso. Nulo si el SKU no está activo para tu organización
                  "usage":50
               },
// 13 tipos posibles de uso que representan los datos de uso de RUM detallado
               {
                  "usage_type":"browser_legacy_session_count",
                  "usage":0
               },
               {
                  "usage_type":"browser_lite_session_count",
                  "usage":50
               },
               {
                  "usage_type":"browser_replay_session_count",
                  "usage":50
               },
               {
                  "usage_type":"mobile_legacy_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_legacy_session_count_roku",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_android",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_flutter",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_ios",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_reactnative",
                  "usage":0
               },
               {
                  "usage_type":"mobile_lite_session_count_roku",
                  "usage":0
               },
// Tipos de uso legacy anulados
               {
                  "usage_type":"browser_rum_units",
                  "value":null
               },
               {
                  "usage_type":"mobile_rum_units",
                  "value":null
               },
               {
                  "usage_type":"rum_units",
                  "value":null
               }
            ]
         }
      }
   ]
}









//  Una familia de productos existente activa (rum); las familias de productos rum_browser_sessions y rum_mobile_sessions son familias de productos legacy y se representan como nulos
{
   "data":[
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_browser_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"replay_session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count",
                  "value":null
               }
            ]
         }
      },
      {
         "id":"abcd",
         "type":"usage_timeseries",
         "attributes":{
            "product_family":"rum_mobile_sessions",
            "org_name":"Test Org",
            "public_id":"abcd",
            "region":"us",
            "timestamp":"2024-10-01T00:00:00+00:00",
            "measurements":[
               {
                  "usage_type":"session_count",
                  "value":null
               },
               {
                  "usage_type":"session_count_android",
                  "value":null
               },
               {
                  "usage_type":"session_count_flutter",
                  "value":null
               },
               {
                  "usage_type":"session_count_ios",
                  "value":null
               },
               {
                  "usage_type":"session_count_reactnative",
                  "value":null
               },
               {
                  "usage_type":"session_count_roku",
                  "value":null
               }
            ]
         }
      }
   ]
}
{{< /highlight >}}


## Obtener el uso en toda tu cuenta

El cambio del 1 de octubre de 2024 en el endpoint [Obtener el uso en toda tu cuenta][2] deja obsoletas las claves legacy y proporciona información más detallada sobre el uso de tu RUM y logs indexados.

### RUM

Las siguientes claves quedarán obsoletas:
- `rum_units_agg_sum`
- `browser_rum_units_agg_sum`
- `mobile_rum_units_agg_sum`
- `browser_rum_lite_session_count_agg_sum`
- `browser_replay_session_count_agg_sum`
- `browser_legacy_session_count_agg_sum`
- `mobile_rum_lite_session_count_agg_sum`
- `rum_browser_and_mobile_session_count_agg_sum`
- `browser_rum_legacy_and_lite_session_count_agg_sum`
- `rum_total_session_count_agg_sum`
- `rum_session_count_agg_sum`
- `mobile_rum_session_count_agg_sum`
- `mobile_rum_session_count_ios_agg_sum`
- `mobile_rum_session_count_android_agg_sum`
- `mobile_rum_session_count_reactnative_agg_sum`
- `mobile_rum_session_count_flutter_agg_sum`
- `mobile_rum_session_count_roku_agg_sum`
- `rum_indexed_events_count_agg_sum`

Las siguientes nuevas claves describen el uso del RUM:
- `rum_replay_session_count_agg_sum`
- `rum_lite_session_count_agg_sum`
- `rum_browser_legacy_session_count_agg_sum`
- `rum_browser_replay_session_count_agg_sum`
- `rum_browser_lite_session_count_agg_sum`
- `rum_mobile_legacy_session_count_android_agg_sum`
- `rum_mobile_legacy_session_count_flutter_agg_sum`
- `rum_mobile_legacy_session_count_ios_agg_sum`
- `rum_mobile_legacy_session_count_reactnative_agg_sum`
- `rum_mobile_legacy_session_count_roku_agg_sum`
- `rum_mobile_lite_session_count_android_agg_sum`
- `rum_mobile_lite_session_count_flutter_agg_sum`
- `rum_mobile_lite_session_count_ios_agg_sum`
- `rum_mobile_lite_session_count_reactnative_agg_sum`
- `rum_mobile_lite_session_count_roku_agg_sum`

El uso de RUM en el endpoint **Obtener uso en toda tu cuenta** incluirá tres claves que representan SKUs en los que podría facturarse tu uso de RUM:
- `rum`
- `rum_replay`
- `rum_lite`

Los SKUs que no estén activos para tu organización serán nulos. Los 13 tipos de uso proporcionarán resúmenes de uso detallados bajo el SKU de RUM.

#### Estructura de respuesta actual

A continuación, se muestra un ejemplo actual de una respuesta para el endpoint [Obtener el uso en toda tu cuenta][2]:
{{< code-block lang="json">}}
{
  "usage": {
    "rum_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_flutter_agg_sum": 0,
    "mobile_rum_session_count_ios_agg_sum": 0,
    "rum_total_session_count_agg_sum": 7618504,
    "rum_browser_and_mobile_session_count_agg_sum": 7441533,
    "mobile_rum_session_count_android_agg_sum": 0,
    "mobile_rum_session_count_reactnative_agg_sum": 0,
    "mobile_rum_session_count_roku_agg_sum": 0,
     },
    { ... // Resumen de uso por suborganización}
}
{{< /code-block >}}

#### Próxima estructura de respuesta

Después del 1 de octubre de 2024, el endpoint [Obtener uso en toda su cuenta][2] tendrá la siguiente estructura de ejemplo:

{{< highlight json "hl_lines=5 10 25" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
// Tres claves que representan SKUs en los que se puede facturar tu uso de RUM 
   "rum_total_session_count_agg_sum":null,
   "rum_replay_session_count_agg_sum":50,
   "rum_lite_session_count_agg_sum":null,

// Tipos de uso de RUM que representan datos detallados de uso de RUM
   "rum_browser_legacy_session_count_agg_sum":0,
   "rum_browser_lite_session_count_agg_sum":183911,
   "rum_browser_replay_session_count_agg_sum":5576,
   "rum_mobile_legacy_session_count_android_agg_sum":0,
   "rum_mobile_legacy_session_count_flutter_agg_sum":0,
   "rum_mobile_legacy_session_count_ios_agg_sum":0,
   "rum_mobile_legacy_session_count_reactnative_agg_sum":0,
   "rum_mobile_legacy_session_count_roku_agg_sum":0,
   "rum_mobile_lite_session_count_android_agg_sum":0,
   "rum_mobile_lite_session_count_flutter_agg_sum":0,
   "rum_mobile_lite_session_count_ios_agg_sum":0,
   "rum_mobile_lite_session_count_reactnative_agg_sum":0,
   "rum_mobile_lite_session_count_roku_agg_sum":0,

// Las claves de uso legacy son nulas
   "rum_session_count_agg_sum": null,
   "mobile_rum_session_count_flutter_agg_sum": null,
   "mobile_rum_session_count_ios_agg_sum": null,
   "rum_browser_and_mobile_session_count_agg_sum": null,
   "mobile_rum_session_count_android_agg_sum": null,
   "mobile_rum_session_count_reactnative_agg_sum": null,
   "mobile_rum_session_count_roku_agg_sum": null

"usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"cd996121d",
               "public_id":"cd996121d",
               "uuid":"28d17f18-00cc-11ea-a77b-97323eff26a7",
               "region":"us"
               ... // Resumen de uso por suborganización
            }
         ]
      }
   ]
}
{{< /highlight >}}

### Indexed Logs

Las claves que representan el uso total en todas las retenciones quedarán obsoletas y se mostrarán como `null`. Estas claves son: 
- `indexed_events_count_sum`
- `live_indexed_events_agg_sum`
- `rehydrated_indexed_events_agg_sum`

Puedes seguir calculando el uso en todos los periodos de retención sumando las claves de retención individuales.

#### Estructura de respuesta actual

A continuación, se muestra un ejemplo actual de una respuesta para el endpoint [Obtener el uso en toda tu cuenta][2]:
{{< code-block lang="json">}}
{
  "usage": {
    "rehydrated_indexed_events_agg_sum": 150,
    "live_indexed_events_agg_sum": 150,
    "logs_indexed_logs_usage_agg_sum_15_day": 100,
    "logs_indexed_logs_usage_agg_sum_3_day": 100,
    "logs_indexed_logs_usage_agg_sum_30_day": 100
  },
  "orgs": [
    {
      "name": "Sub-Org 1",
      "public_id": "abcd",
      "uuid": "abcd",
      "region": "eu",
      "usage": {
        "indexed_events_count_sum": 200,
        "live_indexed_events_sum": 100,
        "rehydrated_indexed_events_sum": 100,
        "logs_indexed_logs_usage_sum_15_day": 100,
        "logs_indexed_logs_usage_sum_30_day": 100
      }
    },
  ]
{ ... // Resumen de uso por suborganización }
}
{{< /code-block >}}

#### Próxima estructura de respuesta

A partir del 1 de octubre de 2024, el endpoint [Obtener el uso en toda tu cuenta][2] tendrá la siguiente estructura de ejemplo:

{{< highlight json "hl_lines=5-8 19-22 32-35" >}}
{
   "start_date":"2024-10",
   "end_date":"2024-10",
   "last_updated":"2024-10-01T00",
   // Se anulan los grupos intermedios obsoletos
   "indexed_events_count_agg_sum": null,
   "live_indexed_events_agg_sum": null,
   "rehydrated_indexed_events_agg_sum": null,
   "usage":[
      {
         "date":"2024-10",
         "orgs":[
            {
               "name":"Sub-Org 1",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // Se anulan los grupos intermedios obsoletos
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
            {
               "name":"Sub-Org 2",
               "id":"abcd",
               "public_id":"abcd",
               "uuid":"abcd",
               "region":"us",
   // Se anulan los grupos intermedios obsoletos
               "indexed_events_count_sum": null,
               "live_indexed_events_sum": null,
               "rehydrated_indexed_events_sum": null,
               "logs_indexed_logs_usage_sum_15_day": 100,
               "logs_indexed_logs_usage_sum_30_day": 100
            },
         ]
      }
   ]
}
{{< /highlight >}}

[1]: /es/api/latest/usage-metering/#get-hourly-usage-by-product-family
[2]: /es/api/latest/usage-metering/#get-usage-across-your-account