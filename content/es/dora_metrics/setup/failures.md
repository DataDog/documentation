---
aliases:
- /es/continuous_integration/dora_metrics/setup/incidents
- /es/dora_metrics/setup/incidents
- /es/dora_metrics/failures/incident_api
- /es/dora_metrics/failures/pagerduty
- /es/dora_metrics/failures/
description: Aprende a enviar eventos de incidentes para métricas de DORA.
further_reading:
- link: /continuous_integration/dora_metrics/setup/deployments
  tag: Documentación
  text: Más información sobre la configuración de datos de despliegues en métricas
    de DORA
- link: /tracing/software_catalog
  tag: Documentación
  text: Más información sobre el Catálogo de software
- link: https://github.com/DataDog/datadog-ci
  tag: Código fuente
  text: Más información sobre la herramienta CLI datadog-ci
- link: /continuous_delivery/deployments
  tag: Documentación
  text: Más información sobre la visibilidad de despliegues
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Comprueba las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
is_beta: true
title: Configurar datos de incidentes para métricas de DORA
---

<div class="alert alert-danger">Las métricas de DORA están en vista previa.</div>

## Información general

Los eventos de despliegues fallidos, actualmente interpretados mediante eventos de incidentes, se utilizan para calcular el [porcentaje de despliegues fallidos](#calculating-change-failure-rate) y el [tiempo medio de recuperación (MTTR)](#calculating-mean-time-to-restore). 

## Selección y configuración de una fuente de datos de incidentes

{{< tabs >}}
{{% tab "PagerDuty" %}}
[PagerDuty][104] es una plataforma de gestión de incidentes que dota a los equipos de TI de una visibilidad inmediata de los incidentes, permitiendo respuestas proactivas y eficaces para mantener la estabilidad operativa y la resiliencia.

Para integrar tu cuenta de PagerDuty con métricas de DORA: 

1. Ve a **Integrations > Developer Tools** (Integraciones > Herramientas de desarrollo) en PagerDuty y haz clic en **Generic Webhooks (v3)** (Webhooks genéricos (v3)). 

1. Haz clic en **+ New Webhook** (+ Nuevo webhook) e introduce los siguientes datos:

     <table>
      <thead>
        <tr>
          <th>Variable</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Webhook URL</td>
          <td>Add <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>Scope Type</td>
          <td>Select <strong>Account</strong> to send incidents for all PagerDuty services in your account. Alternatively, you can send incidents for specific services or teams by selecting a different scope type.</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>A description helps distinguish the webhook. Add something like <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>Event Subscription</td>
          <td>Select the following events:<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>Custom Headers</td>
          <td>Click <strong>Add custom header</strong>, enter <code>DD-API-KEY</code> as the name, and input your <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API key</a> as the value.<br><br>Optionally, you can add an environment to all of the PagerDuty incidents sent from the webhook by creating an additional custom header with the name <code>dd_env</code> and the desired environment as the value.</td>
        </tr>
      </tbody>
    </table>

1. Para guardar el webhook, haz clic en **Add Webhook** (Añadir webhook).

La gravedad del incidente en el producto métricas de DORA se basa en la [prioridad del incidente][106] en PagerDuty.

**Nota:** Al crear el webhook, se crea un nuevo secreto que se utiliza para firmar todas las cargas útiles del webhook. Este secreto no es necesario para que funcione la integración, ya que la autenticación se realiza mediante la clave de la API.

### Asignación de servicios PagerDuty a servicios Datadog

Cuando se recibe un evento de incidente de un [servicio PagerDuty][101] específico, Datadog intenta recuperar el servicio Datadog y el equipo relacionado desde cualquier [monitor de Datadog][107] que lo active y desde el [Catálogo de software][102].

El algoritmo de concordancia funciona en los siguientes pasos:

1. Si el evento de incidente de PagerDuty [se activó desde un monitor de Datadog][107]:
   - Si el monitor está en [modo de alerta múltiple][109], las métricas y los eventos de incidentes se emiten con los `env`, `service` y `team` del grupo alertado.
   - Si el monitor tiene [etiquetas (tags)][110] de `env`, `service` o `team`:
     - `env`: Si el monitor tiene una etiqueta única `env`, las métricas y los eventos de incidentes se emiten con el entorno.
     - `service`: Si el monitor tiene una o más etiquetas `service`, las métricas y los eventos de incidentes se emiten con los servicios proporcionados.
     - `team`: Si el monitor tiene una etiqueta única `team`, las métricas y los eventos de incidentes se emiten con el equipo.

2. Si la URL de servicio del incidente coincide con la URL de servicio de PagerDuty para cualquier servicio del Catálogo de software:
   - Si un único servicio Datadog coincide, las métricas y los eventos de incidentes se emiten con el servicio y el equipo.
   - Si varios servicios Datadog coinciden, las métricas y los eventos de incidentes se emiten con el equipo.

   Para obtener más información sobre la configuración de la URL de servicio de PagerDuty para un servicio Datadog, consulta [Uso de integraciones con el Catálogo de software][103].

3. Si el nombre de servicio de PagerDuty del incidente coincide con un nombre de servicio del Catálogo de software, las métricas y los eventos de incidentes se emiten con el servicio y el equipo.
4. Si el nombre de equipo de PagerDuty del incidente coincide con un nombre de equipo del Catálogo de software, las métricas y los eventos de incidentes se emiten con el equipo.
5. Si el nombre de servicio de PagerDuty del incidente coincide con un nombre de equipo del Catálogo de software, las métricas y los eventos de incidentes se emiten con el equipo.
6. Si no hubo coincidencias hasta este momento, las métricas y los eventos de incidentes se emiten con el servicio de PagerDuty y el equipo de PagerDuty proporcionados en el incidente.

[101]: https://support.pagerduty.com/docs/services-and-integrations
[102]: /es/software_catalog/
[103]: /es/software_catalog/integrations/#pagerduty-integration
[104]: /es/integrations/pagerduty/
[105]: https://app.datadoghq.com/organization-settings/api-keys
[106]: https://support.pagerduty.com/main/docs/incident-priority
[107]: /es/integrations/pagerduty/#troubleshooting
[109]: /es/monitors/configuration/#multi-alert
[110]: /es/monitors/manage/#monitor-tags

{{% /tab %}}
{{% tab "API" %}}

Para enviar tus propios eventos de incidentes, utiliza la [API de métricas de DORA][13]. Los eventos de incidentes se utilizan para calcular el porcentaje de despliegues fallidos y el tiempo medio de recuperación.

Incluye el atributo `finished_at` en un evento de incidente para marcar que el incidente está resuelto. Puedes enviar eventos al inicio del incidente y después de la resolución del incidente. Los eventos incidentes coinciden con los atributos `env`, `service` y `started_at`.

Se requieren los siguientes atributos:

- `services` o `team` (al menos uno debe estar presente)
- `started_at`

Puedes añadir opcionalmente los siguientes atributos a los eventos de incidentes:

- `finished_at` para *incidentes resueltos*. Este atributo es necesario para calcular el tiempo de recuperación del servicio.
- `id` para identificar incidentes cuando se crean y resuelven. Este atributo es generado por el usuario; si no se proporciona, el endpoint devuelve un UUID generado por Datadog.
- `name` para describir el incidente.
- `severity`
- `env` para filtrar tus métricas de DORA por entorno en la página de [**métricas de DORA**][14].
- `repository_url`
- `commit_sha`

Para ver la especificación completa y ejemplos de código adicionales, consulta la [documentación de referencia de la API de métricas de DORA][13].

### Ejemplo (cURL) de API

Para la siguiente configuración, sustituye `<DD_SITE>` por {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/incident" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High"
      }
    }
  }
EOF
```

[13]: /es/api/latest/dora-metrics/#send-an-incident-event-for-dora-metrics
[14]: https://app.datadoghq.com/ci/dora

{{% /tab %}}
{{< /tabs >}}

## Cálculo del porcentaje de despliegues fallidos
El porcentaje de despliegues fallidos requiere tanto [datos de despliegue][7] como [datos de incidentes](#selecting-an-incident-data-source).

El porcentaje de despliegues fallidos se calcula como el porcentaje de eventos de incidentes sobre el número total de despliegues. Datadog divide `dora.incidents.count` sobre `dora.deployments.count` para los mismos servicios o equipos asociados tanto a un fallo como a un evento de despliegue. 

## Cálculo del tiempo de recuperación
El tiempo de recuperación se calcula como la distribución de la duración de eventos de *incidentes resueltos*.

Las métricas de DORA generan la métrica `dora.time_to_restore` registrando las horas de inicio y fin de cada evento de incidente. Calcula el tiempo medio de recuperación (MTTR) como la media de estos puntos de datos `dora.time_to_restore` en un periodo de tiempo seleccionado. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /es/tracing/software_catalog
[4]: /es/tracing/software_catalog/setup
[5]: /es/tracing/software_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /es/dora_metrics/setup/deployments