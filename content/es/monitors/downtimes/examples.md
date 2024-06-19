---
aliases:
- /es/monitors/guide/suppress-alert-with-downtimes
further_reading:
- link: monitors/downtimes/
  tag: Documentación
  text: Tiempos de inactividad
- link: api/latest/downtimes/
  tag: Documentación
  text: Referencia de la API de tiempo de inactividad
kind: Documentación
title: Ejemplos
---

## Información general

Utiliza los tiempos de inactividad para eliminar las alertas innecesarias durante el mantenimiento programado, las pruebas o el escalado automático de eventos.
Utiliza la [API de tiempo de inactividad][1] para gestionar el formato avanzado de los programas de mantenimiento o para silenciar monitores dinámicamente, por ejemplo cuando se redimensionan las instancias en la nube.

Esta guía describe cómo configurar tiempos de inactividad para los siguientes casos de uso:

* [Tiempo de inactividad durante el fin de semana](#downtime-over-the-weekend)
* [Tiempo de inactividad fuera del horario laboral](#downtime-outside-of-business-hours)
* [Tiempo de inactividad en el enésimo día del mes](#recurring-downtime-on-the-nth-weekday-of-the-month)


## Requisitos previos

Dado que esta guía describe el uso de la API, necesitarás una clave de API y una clave de aplicación con privilegios de administrador. Estas claves están disponibles en tu [página de claves de API para cuentas de Datadog][2].
Sustituye todas las apariciones de `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` por tu clave de API de Datadog y tu clave de aplicación de Datadog, respectivamente.

Esta guía también asume que tienes un terminal con `CURL` y que has revisado la [página de documentación de los tiempos de inactividad][3] principal.

## Casos de uso

### Tiempo de inactividad durante el fin de semana

Si monitorizas servicios que sólo se utilizan durante la semana, como el ERP de tu empresa o el software de contabilidad, es posible que sólo quieras recibir alertas durante la semana.
Con la siguiente llamada a la API, puedes silenciar las alertas de todos los monitores con la etiqueta (tag) `env:prod` durante el fin de semana.

{{< tabs >}}
{{% tab "API " %}}

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v2/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-09-16T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```

También puedes añadir un `message` a tu tiempo de inactividad para que los demás conozcan la razón y el propósito del tiempo de inactividad que estás creando. Por ejemplo, `Muting all monitors in production environment over the weekend`.

Sustituye el valor del parámetro `<Datadog_SITE>` por el del sitio de tu cuenta Datadog. Para ello, consulta la documentación de los [sitios Datadog][1]. Sustituye los parámetros `start` y `end` para que coincidan con el cronograma deseado. Por ejemplo

* `start=$(date +%s)`
* `end=$(date -v+24H +%s)`

Y luego, en el comando cURL, utiliza: `"start": '"${start}"'`.

**Respuesta:**

```json
{
  "data": {
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "type": "downtime",
    "attributes": {
      "scope": "env:prod",
      "canceled": null,
      "schedule": {
        "current_downtime": {
          "start": "2023-09-16T22:00:00+00:00",
          "end": "2023-09-17T22:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-09-16T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["warn", "alert", "no data"],
      "monitor_identifier": { "monitor_tags": ["*"] },
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-04T13:41:06.855440+00:00",
      "modified": "2023-07-04T13:41:06.855440+00:00",
      "mute_first_recovery_notification": false,
      "message": ""
    },
    [..]
  },
  [..]
}

```

[1]: https://docs.datadoghq.com/es/getting_started/site
{{% /tab %}}
{{% tab "UI" (IU) %}}

Abre la página [Gestionar tiempos de inactividad][1] y programa un nuevo tiempo de inactividad. Selecciona `recurring`:

{{< img src="monitors/guide/downtimes_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the weekend" (Configuración de tiempos de inactividad utilizando un cronograma recurrente para silenciar alertas durante el fin de semana) style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Tiempo de inactividad fuera del horario laboral

Utilizando el mismo ejemplo, es posible que también quieras silenciar este servicio durante los días laborables, fuera del horario comercial.

{{< tabs >}}
{{% tab "API" %}}

Con la siguiente llamada a la API, puedes silenciar las alertas todos los días laborables de 20:00 a 6:00:

```shell
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-10T18:00","duration":"12h","rrule":"FREQ=DAILY;INTERVAL=1"}]}}},"_authentication_token":"b6c9ec89cdff687d29c0ee54923c52f57c9e102a"}'
```

También puedes añadir un `message` a tu tiempo de inactividad para que los demás conozcan la razón y el propósito del tiempo de inactividad que estás creando. Sustituye el parámetro `<Datadog_SITE>` por el del sitio de tu cuenta Datadog. Para ello, consulta la documentación de los [sitios Datadog][1]. Sustituye los parámetros `start` y `end` para que coincidan con el cronograma deseado.

**Respuesta:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "message": "",
      "mute_first_recovery_notification": false,
      "canceled": null,
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] },
      "modified": "2023-07-05T08:12:17.145771+00:00",
      "created": "2023-07-05T08:12:17.145771+00:00",
      "status": "scheduled",
      "display_timezone": "Europe/Berlin",
      "schedule": {
        "recurrences": [
          {
            "duration": "12h",
            "rrule": "FREQ=DAILY;INTERVAL=1",
            "start": "2023-07-10T18:00"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T04:00:00+00:00",
          "start": "2023-07-10T16:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "notify_end_types": ["canceled", "expired"]
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/es/getting_started/site
{{% /tab %}}
{{% tab "UI" (IU) %}}

Abre la página [Gestionar tiempos de inactividad][1] y programa un nuevo tiempo de inactividad. Selecciona `recurring`:

{{< img src="monitors/guide/downtime_businesshour.png" alt="Downtimes configuration using recurring schedule to mute alerts outside of business hours" (Configuración de tiempos de inactividad utilizando un cronograma recurrente para silenciar alertas fuera del horario laboral) style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Tiempo de inactividad combinado para aplicar fuera del horario comercial y durante fin de semana

Para los casos de uso en los que sólo quieras monitorizar notificaciones durante el horario laboral, silencia los monitores, tanto durante la semana como durante el fin de semana. Esto puede combinarse en un único tiempo de inactividad. Continuando con el ejemplo anterior de [tiempo de inactividad fuera del horario laboral](#downtime-outside-of-business-hours):

{{< tabs >}}
{{% tab "API" %}}

Con la siguiente llamada a la API, puedes silenciar las alertas todos los días laborables de 20:00 a 6:00 y también durante todo el fin de semana:

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-09T18:00","duration":"12h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"},{"start":"2023-07-09T00:00","duration":"24h","rrule":"FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"}]}}}'
```
También puedes añadir un `message` a tu tiempo de inactividad para que los demás conozcan la razón y el propósito del tiempo de inactividad que estás creando. Sustituye el parámetro `<DATADOG_SITE>` por el del sitio de tu cuenta Datadog. Para ello, consulta la documentación de los [sitios Datadog][1]. Sustituye los parámetros `start` y `end` para que coincidan con el cronograma deseado.

**Respuesta:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "monitor_identifier": { "monitor_tags": ["*"] },
      "created": "2023-07-05T08:36:00.917977+00:00",
      "message": "",
      "schedule": {
        "current_downtime": {
          "start": "2023-07-08T22:00:00+00:00",
          "end": "2023-07-10T04:00:00+00:00"
        },
        "timezone": "Europe/Berlin",
        "recurrences": [
          {
            "start": "2023-07-09T18:00",
            "duration": "12h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SU,MO,TU,WE,TH,FR"
          },
          {
            "start": "2023-07-09T00:00",
            "duration": "24h",
            "rrule": "FREQ=WEEKLY;INTERVAL=1;BYDAY=SA,SU"
          }
        ]
      },
      "notify_end_states": ["alert", "warn", "no data"],
      "status": "scheduled",
      "scope": "env:prod",
      "modified": "2023-07-05T08:36:00.917977+00:00",
      "mute_first_recovery_notification": false,
      "notify_end_types": ["expired", "canceled"],
      "display_timezone": "Europe/Berlin",
      "canceled": null
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/es/getting_started/site
{{% /tab %}}
{{% tab "UI" (IU) %}}

Abre la página [Gestionar tiempos de inactividad][1] y añade un nuevo tiempo de inactividad. Selecciona `recurring`:

{{< img src="monitors/guide/downtime_business_hour_weekend.png" alt="Downtimes configuration using recurring schedule to mute alerts over the outside of business hours and during the weekend" (Configuración de tiempos de inactividad utilizando un cronograma recurrente para silenciar alertas fuera del horario laboral y durante el fin de semana) style="width:100%;" >}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

### Tiempo de inactividad en el enésimo día laborable del mes

Para planificar programas de mantenimiento más avanzados, puedes utilizar reglas RRULE.

Una RRULE (o regla de recurrencia) es un nombre de propiedad de la [RFC de iCalendar][4], que es el estándar para definir recurrencias de eventos.

No son compatibles los atributos que especifican la duración de la `RRULE` (por ejemplo, `DTSTART`, `DTEND`, `DURATION`). Consulta la [RFC][4] para conocer los posibles atributos. Puedes utilizar [esta herramienta][5] para generar las RRULE y pegarlas en tu llamada a la API.

**Ejemplo**: la aplicación ERP se actualiza todos los segundos martes de cada mes para aplicar parches y correcciones entre las 8.00 y las 10.00. Para ello, los monitores tienen un alcance `app:erp`, por lo que se utiliza en el contexto de los tiempos de inactividad.

{{< tabs >}}
{{% tab "API" %}}

Los parámetros `start` y `end` deben coincidir con el inicio y el fin previstos para el primer día de la regla recurrente. Por lo que, suponiendo que el primer 2.º martes de nuestra regla sea el martes 11 de julio, la fecha de inicio tiene que ser 11 de julio a las 08:00 y es necesario establecer una duración de dos horas.

**Llamada a la API:**

```bash
curl -X POST "https://api.<DATADOG_SITE>/api/v1/downtime" \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{"data":{"type":"downtime","attributes":{"monitor_identifier":{"monitor_tags":["*"]},"scope":"env:prod","display_timezone":"Europe/Berlin","message":"","mute_first_recovery_notification":false,"notify_end_types":["expired","canceled"],"notify_end_states":["alert","warn","no data"],"schedule":{"timezone":"Europe/Berlin","recurrences":[{"start":"2023-07-11T08:00","duration":"2h","rrule":"FREQ=DAILY;INTERVAL=1;BYDAY=2TU"}]}}}'
```

Sustituye el valor del parámetro `<DATADOG_SITE>` por el del sitio de tu cuenta Datadog. Para ello, consulta la documentación de los [sitios Datadog][1]. Sustituye los parámetros `start` y `end` para que coincidan con el cronograma deseado.

**Respuesta:**

```json
{
  "data": {
    "type": "downtime",
    "id": "16d09s97-1a70-11ee-8319-dasan1997",
    "attributes": {
      "mute_first_recovery_notification": false,
      "notify_end_types": ["canceled", "expired"],
      "created": "2023-07-05T08:50:19.678427+00:00",
      "display_timezone": "Europe/Berlin",
      "modified": "2023-07-05T08:50:19.678427+00:00",
      "status": "scheduled",
      "canceled": null,
      "notify_end_states": ["warn", "alert", "no data"],
      "message": "",
      "schedule": {
        "recurrences": [
          {
            "duration": "2h",
            "start": "2023-07-11T08:00",
            "rrule": "FREQ=DAILY;INTERVAL=1;BYDAY=2TU"
          }
        ],
        "current_downtime": {
          "end": "2023-07-11T08:00:00+00:00",
          "start": "2023-07-11T06:00:00+00:00"
        },
        "timezone": "Europe/Berlin"
      },
      "scope": "env:prod",
      "monitor_identifier": { "monitor_tags": ["*"] }
    },
    [..]
  },
  [..]
}
```

[1]: https://docs.datadoghq.com/es/getting_started/site
{{% /tab %}}
{{% tab "UI" (IU) %}}

Abre la página [Gestionar tiempos de inactividad][1] y añade un nuevo tiempo de inactividad. Selecciona `recurring` y luego `Use RRULE`.

{{< img src="monitors/downtimes/downtime_guide_rrule.png" alt="Downtimes configuration using recurring RRULE schedule to mute alerts on the 2nd Tuesday of every month" (Configuración de tiempos de inactividad utilizando un cronograma recurrente con RRULE para silenciar alertas el 2.° martes de cada mes) style="width:100%;">}}

[1]: https://app.datadoghq.com/monitors#downtime
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/v2/downtimes/
[2]: https://docs.datadoghq.com/es/api/v1/authentication/
[3]: https://docs.datadoghq.com/es/monitors/downtimes/
[4]: https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html
[5]: https://icalendar.org/rrule-tool.html