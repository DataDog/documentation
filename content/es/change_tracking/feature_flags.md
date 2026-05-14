---
description: Aprende a realizar un seguimiento, a correlacionar y a corregir cambios
  de indicadores de funciones en Datadog para identificar y resolver los incidentes
  causados por actualizaciones de los indicadores.
further_reading:
- link: /change_tracking/
  tag: Documentación
  text: Rastreo de cambios
- link: /integrations/launchdarkly/#feature-flag-tracking-integration/
  tag: Documentación
  text: LaunchDarkly
title: Seguimiento de cambios de indicadores de funciones
---

## Información general

El seguimiento de indicadores de funciones en Datadog te ayuda a correlacionar cambios de indicadores con problemas de rendimiento del sistema para acelerar la resolución de incidentes. Al hacer un seguimiento de cuándo se activan, actualizan o despliegan los indicadores, puedes identificar si el cambio de un indicador ha llevado a una degradación del rendimiento o a una interrupción.

Con el seguimiento de indicadores de funciones, puedes:
- Visualizar cambios de indicadores directamente en tus dashboards, monitores y páginas de servicio
- Identificar de forma automática los servicios afectados por un cambio de indicador
- Revertir indicadores problemáticos directamente desde Datadog

{{< img src="/change_tracking/monitor.png" alt="El gráfico del monitor muestra el pico de errores correlacionado con el cambio de indicador." style="width:100%;" >}}

## Seguimiento de indicadores de funciones

Datadog admite el seguimiento de indicadores de LaunchDarkly a través de la [integración de LaunchDarkly][1] o el seguimiento de indicadores de funciones de otros proveedores de indicadores de funciones mediante la [API de eventos][3].

### Indicadores de LaunchDarkly

Para realizar un seguimiento de los indicadores de funciones de LaunchDarkly en la línea de tiempo del Seguimiento de cambios:

1. Activa la [integración Datadog][1] en LaunchDarkly.
1. Ve a **Flags** > `<your-feature-flag-name>` (Indicadores > [nombre de tu indicador de función]) en LaunchDarkly.
1. En **Datadog Tags** (Etiquetas de Datadog), añade una etiqueta (tag) con clave `service` y valor `<your-service-name>`, que coincida exactamente con el nombre de tu servicio Datadog.
1. Haz clic en **Guardar cambios**.

Por ejemplo, para vincular un indicador al servicio `payments_api` utilizado en los ejemplos siguientes, debes definir el valor de la etiqueta en `payments_api`. Después de enviar el evento, puedes ir al [Software Catalog][7], seleccionar el servicio `payments_api` y ver el evento del indicador de función `fallback_payments_test` en la línea de tiempo del Seguimiento de cambios.

### Indicadores de funciones personalizados

Envía eventos de indicadores de funciones desde cualquier proveedor mediante la [API de eventos][3]. Crea un evento de categoría `change` e incluye una etiqueta de servicio para vincular el evento a tu servicio.

#### Etiquetas recomendadas

Cuando envíes eventos de cambios de indicadores de funciones personalizados, incluye los siguientes campos para permitir un filtrado preciso y una correlación entre productos en Datadog:

- **impacted_resources** (con tipo `service`): Añade el nombre del servicio correspondiente a la matriz `impacted_resources` para asociar el cambio de indicador de función con el servicio afectado.
- **env tag**: Especifica el entorno en el que se ha producido el cambio (por ejemplo, producción, staging o desarrollo).

Si estas etiquetas no se pueden añadir en el momento de crear el evento, consulta la siguiente sección para obtener orientación sobre el enriquecimiento automático.

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

## Detectar automáticamente los servicios afectados

Además de realizar un seguimiento de los cambios en la configuración de los indicadores de funciones mediante la integración de LaunchDarkly o la API de eventos, Datadog puede detectar automáticamente qué servicios evalúan un indicador utilizando trazas (traces) o métricas de APM. Esto proporciona visibilidad en tiempo real del uso de indicadores en todo el sistema, especialmente cuando el mismo indicador es evaluado por varios servicios.

### Enriquecimiento basado en trazas
El enriquecimiento basado en trazas utiliza trazas de APM para asociar automáticamente cambios de indicadores de funciones con servicios Datadog relevantes. En la siguiente sección se explica en detalle cómo implementarlo en tu código base.

#### Instalación

Para detectar automáticamente los servicios que utilizan un indicador de función, instrumenta tu código de evaluación de indicadores de funciones con la biblioteca de rastreo APM. Esto permite a Datadog detectar automáticamente todos los servicios que evalúan un indicador específico, incluso si no fueron etiquetados originalmente.

1. [Instrumenta tu código de evaluación de indicadores de funciones][4] utilizando la biblioteca de rastreo Datadog.
1. Crea un tramo personalizado con el nombre de operación `experiments.IsEnabled` para realizar un seguimiento de las evaluaciones de indicadores de funciones.
3. Etiqueta tu tramo con `experiment_id:<flag-id>`, donde `<flag-id>` coincide con el ID del indicador de funciones.

Por ejemplo:

```python
# Rastreo de la evaluación de indicadores de funciones para activar la detección automática
con tracer.trace("experiments.IsEnabled") como tramo:
    span.set_tag("experiment_id", "fallback_payments_test") # añade el nombre del indicador como etiqueta de tramo
    # Código de tu evaluación de indicadores de funciones existente
    flag_value = evaluate_flag("fallback_payments_test")
    span.set_tag("experiment_value", flag_value) # añade el valor del indicador como etiqueta de tramo
```

### Enriquecimiento basado en métricas

El enriquecimiento basado en métricas utiliza métricas de Datadog para enriquecer cambios de indicadores de funciones con el contexto del servicio. En la siguiente sección se explica en detalle cómo implementarlo en tu código base.

#### Instalación

Envía la métrica `dd.dynamic_config.is_experiment_enabled` con el estado de tu experimento.

```python
from datadog import initialize, statsd

initialize(statsd_host='localhost', statsd_port=8125)

# Se admiten todos los tipos de métricas
statsd.gauge(
    'dd.dynamic_config.is_experiment_enabled',
    1,  # 1 si está activo, 0 si está inactivo
    tags=[
        'experiment.id:fallback_payments_test',
        'service:payments_api'
    ]
)
```

## Corregir cambios de indicadores de funciones con Workflow Automation

Cuando identificas que un cambio de un indicador de función ha causado un problema, puedes cambiar inmediatamente su estado sin salir de Datadog. Esta función utiliza [Workflow Automation][2] para cambiar los indicadores de LaunchDarkly directamente desde las líneas de tiempo del Seguimiento de cambios.

<div class="alert alert-info">Esta función requiere Workflow Automation. Consulta <a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">los precios de Workflow Automation</a>.</div>

### Instalación

Para configurar interruptores de indicadores de funciones mediante Workflow Automation:

1. Ve a [**Actions > Action Catalog > Connections** (Acciones > Catálogo de acciones > Conexiones)][6].
1. Haz clic en **New Connection** (Nueva conexión).
1. Elige *LaunchDarkly*.
1. Rellena la información solicitada y luego haz clic en **Next, Confirm Access** (Siguiente, confirmar acceso).
1. Define permisos de acceso para la conexión.
1. Haz clic en **Create** (Crear).

### Uso de los interruptores de indicadores de funciones

Para activar o desactivar indicadores de funciones desde Datadog:

1. Haz clic en un cambio de indicador de función de LaunchDarkly en la línea de tiempo del Seguimiento de cambios.
1. Haz clic en el botón **Toggle Feature Flag** (Activar indicador de función).
1. Haz clic en **Run Action** (Ejecutar acción) para ejecutar el flujo de trabajo y activar o desactivar el indicador de función.

{{< img src="/change_tracking/toggle.png" alt="Panel con detalles de un evento de indicador de función LaunchDarkly que muestra el botón 'Toggle Feature Flag' (Activar indicador de función." style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/launchdarkly/#setup
[2]: https://app.datadoghq.com/actions/connections
[3]: /es/api/latest/events/
[4]: /es/tracing/trace_collection/
[5]: https://app.datadoghq.com/apm/settings
[6]: https://app.datadoghq.com/actions/connections
[7]: https://app.datadoghq.com/software