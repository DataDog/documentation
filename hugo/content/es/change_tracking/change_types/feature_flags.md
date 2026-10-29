---
aliases:
- /es/change_tracking/feature_flags/
description: Aprenda a hacer un seguimiento de los cambios en las Feature Flags en
  Datadog, correlacionarlos y corregirlos para identificar y resolver los problemas
  causados por las actualizaciones de las Feature Flags.
further_reading:
- link: /change_tracking/
  tag: Documentación
  text: Seguimiento de cambios
- link: /feature_flags/
  tag: Documentación
  text: Datadog Feature Flags
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: Documentación
  text: LaunchDarkly
title: Hacer un seguimiento de los cambios en Feature Flag
---
## Descripción general {#overview}

El seguimiento de Feature Flag en Datadog le ayuda a correlacionar los cambios en Feature Flag con los problemas de rendimiento del sistema, lo que acelera la resolución de incidentes. Al hacer un seguimiento de cuándo se activan, actualizan o despliegan las Feature Flags, puede identificar si un cambio en una Feature Flag causó una degradación del rendimiento o una interrupción.

Con el seguimiento de Feature Flag, puede:
- Visualizar los cambios en las flags directamente en sus paneles, seguimientos y páginas de servicio
- Identificar automáticamente qué servicios se ven afectados por un cambio en una flag
- Revertir las flags problemáticas directamente desde Datadog

{{< img src="/change_tracking/monitor.png" alt="El gráfico del seguimiento muestra el pico de errores correlacionado con el cambio en la flag." style="width:100%;" >}}

## Hacer un seguimiento de las Feature Flags {#track-feature-flags}

Datadog permite hacer un seguimiento automático de las [Datadog Feature Flags][8], de las Feature Flags de [LaunchDarkly][1] mediante la integración de LaunchDarkly y de las Feature Flags de otros proveedores mediante la [Events API][3].

### Datadog Feature Flags {#datadog-feature-flags}

El seguimiento de cambios de las [Datadog Feature Flags][8] se habilita automáticamente. No se requiere configuración adicional. Cuando actualiza la segmentación, el despliegue o el estado de una Feature Flag en un entorno, Datadog emite un evento de seguimiento de cambios que aparece en las líneas de tiempo de Change Tracking de sus servicios.

Cada evento incluye:

- La clave y el nombre de la Feature Flag
- El entorno donde ocurrió el cambio (y si es un entorno de producción)
- El usuario que realizó el cambio
- Los valores anteriores y nuevos, incluyendo las reglas de segmentación y las variantes
- Un enlace a la Feature Flag en Datadog

Para asociar un cambio en una Datadog Feature Flag con un servicio, [instrumente su código de evaluación de Feature Flags][4] con la biblioteca de trazas de Datadog. Datadog utiliza las trazas de APM resultantes para detectar automáticamente qué servicios evalúan la Feature Flag. Consulte [Detectar automáticamente los servicios afectados](#automatically-detect-affected-services) para obtener más detalles.

### Feature Flags de LaunchDarkly {#launchdarkly-flags}

Para hacer un seguimiento de las Feature Flags de LaunchDarkly en la línea de tiempo de Change Tracking de sus servicios:

1. Habilite la [integración de Datadog][1] en LaunchDarkly.
1. Vaya a {{< ui >}}Flags{{< /ui >}} > `<your-feature-flag-name>` en LaunchDarkly.
1. En {{< ui >}}Datadog tags{{< /ui >}}, agregue una etiqueta con la clave `service` y el valor `<your-service-name>`, que coincida exactamente con el nombre de su servicio de Datadog.
1. Haga clic en {{< ui >}}Save changes{{< /ui >}}.

Por ejemplo, para vincular una Feature Flag al servicio `payments_api` utilizado en los ejemplos a continuación, establezca el valor de la etiqueta en `payments_api`. Después de enviar el evento, puede ir a [Catalog][7], seleccionar el servicio `payments_api` y ver el evento de la Feature Flag `fallback_payments_test` en la línea de tiempo de Change Tracking.

### Feature Flags personalizadas {#custom-feature-flags}

Envíe eventos de Feature Flags desde cualquier proveedor mediante la [Events API][3]. Cree un evento de categoría `change` e incluya una etiqueta de servicio para vincular el evento a su servicio.

#### Etiquetas recomendadas {#recommended-tags}

Al enviar eventos personalizados de cambios en las Feature Flags, incluya los siguientes campos para permitir un filtrado preciso y una correlación entre productos dentro de Datadog:

- `impacted_resources` (con tipo `service`): Agregue el nombre del servicio relevante al arreglo `impacted_resources` para asociar el cambio en la Feature Flag con el servicio afectado.
- `env` etiqueta: Especifique el entorno donde ocurrió el cambio (por ejemplo, producción, staging o desarrollo).

Si estas etiquetas no pueden agregarse al momento de la creación del evento, consulte la siguiente sección para obtener orientación sobre el enriquecimiento automático.

Ejemplo de solicitud:

```json
{
  "data": {
    "attributes": {
      "aggregation_key": "string",
      "attributes": {
        "author": {
          "name": "datadog@datadog.com",
          "type": "user"
        },
        "change_metadata": {
          "dd": {
            "team": "datadog_team",
            "user_email": "datadog@datadog.com",
            "user_id": "datadog_user_id",
            "user_name": "datadog_username"
          },
          "resource_link": "datadog.com/feature/fallback_payments_test"
        },
        "changed_resource": {
          "name": "fallback_payments_test",
          "type": "feature_flag"
        },
        "impacted_resources": [
          {
            "name": "payments_api",
            "type": "service"
          }
        ],
        "new_value": {
          "enabled": true,
          "percentage": "50%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        },
        "prev_value": {
          "enabled": true,
          "percentage": "10%",
          "rule": {
            "datacenter": "devcycle.us1.prod"
          }
        }
      },
      "category": "change",
      "message": "payment_processed feature flag has been enabled",
      "tags": [
        "env:test"
      ],
      "timestamp": "string",
      "title": "payment_processed feature flag updated"
    },
    "type": "event"
  }
}
```

## Detectar automáticamente los servicios afectados {#automatically-detect-affected-services}

Además de hacer un seguimiento de los cambios de configuración de las Feature Flags mediante la integración de LaunchDarkly o la Events API, Datadog puede detectar automáticamente qué servicios evalúan una Feature Flag mediante trazas o métricas de APM. Esto proporciona visibilidad en tiempo real del uso de las Feature Flags en todo su sistema, especialmente cuando varios servicios evalúan la misma Feature Flag.

### Enriquecimiento basado en trazas {#trace-based-enrichment}
El enriquecimiento basado en trazas utiliza trazas de APM para asociar automáticamente los cambios en las Feature Flags con los servicios de Datadog relevantes. La siguiente sección detalla cómo implementarlo en su base de código.

#### Configuración {#setup}

Para detectar automáticamente los servicios que utilizan una Feature Flag, instrumente su código de evaluación de Feature Flags con el SDK de Datadog. Esto permite a Datadog detectar automáticamente todos los servicios que evalúan una Feature Flag específica, incluso si no estaban etiquetados originalmente.

1. [Instrumente su código de evaluación de Feature Flags][4] utilizando el SDK de Datadog.
1. Cree un tramo personalizado con el nombre de operación `experiments.IsEnabled` para realizar un seguimiento de las evaluaciones de Feature Flags.
3. Etiquete el tramo con `experiment_id:<flag-id>`, donde `<flag-id>` coincide con el ID de la Feature Flag.

Por ejemplo:

```python
# Trace feature flag evaluation to enable auto-detection
with tracer.trace("experiments.IsEnabled") as span:
    span.set_tag("experiment_id", "fallback_payments_test") # adds the flag name as a span tag
    # Your existing feature flag evaluation code
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # adds the evaluated flag value as a span tag
```

### Enriquecimiento basado en métricas {#metrics-based-enrichment}

El enriquecimiento basado en métricas utiliza métricas de Datadog para enriquecer los cambios de sus Feature Flags con contexto de servicio. La siguiente sección explica cómo implementarlo en su base de código.

#### Configuración {#setup-1}

Envíe la métrica `dd.dynamic_config.is_experiment_enabled` con el estado de su experimento.

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Any metric type is supported
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 if enabled, 0 if disabled
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Corrija los cambios en las Feature Flags con Workflow Automation {#remediate-feature-flag-changes-with-workflow-automation}

Cuando identifique que un cambio en una Feature Flag causó un problema, puede cambiar su estado inmediatamente sin salir de Datadog. Esta función utiliza [Workflow Automation][2] para cambiar el estado de las Feature Flags de LaunchDarkly directamente desde las líneas de tiempo de Change Tracking.

<div class="alert alert-info">Esta función requiere Workflow Automation. Consulte <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">los precios de Workflow Automation</a>.</div>

### Configuración {#setup-2}

Para configurar los cambios de estado de las Feature Flags mediante Workflow Automation:

1. Vaya a [**Actions > Action Catalog > Connections**][6].
1. Haga clic en **New Connection**.
1. Elija {{< ui >}}LaunchDarkly{{< /ui >}}.
1. Complete la información requerida y luego haga clic en {{< ui >}}Next, Confirm Access{{< /ui >}}.
1. Establezca los permisos de acceso para la conexión.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

### Use los cambios de estado de las Feature Flags {#use-feature-flag-toggles}

Para activar o desactivar Feature Flags desde Datadog:

1. Haga clic en un cambio en una Feature Flag de LaunchDarkly en la línea de tiempo de Change Tracking.
1. Haga clic en el botón {{< ui >}}Toggle Feature Flag{{< /ui >}}.
1. Haga clic en {{< ui >}}Run Action{{< /ui >}} para ejecutar el flujo de trabajo y activar o desactivar la Feature Flag.

{{< img src="/change_tracking/toggle.png" alt="El panel de detalles de un evento de Feature Flag de LaunchDarkly, que muestra el botón \"Toggle Feature Flag\"." style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /es/api/latest/events/
[4]: /es/tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software
[8]: /es/feature_flags/