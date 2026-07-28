---
app_id: openmetrics
categories:
- métricas
custom_kind: integración
description: OpenMetrics es un estándar abierto para exponer datos de métricas
further_reading:
- link: https://docs.datadoghq.com/agent/openmetrics/
  tag: documentación
  text: Documentación sobre OpenMetrics
- link: https://docs.datadoghq.com/developers/openmetrics/
  tag: documentación
  text: Documentación sobre OpenMetrics
integration_version: 7.0.0
media: []
supported_os:
- linux
- windows
- macos
title: OpenMetrics
---
## Información general

Extrae métricas personalizadas de cualquier endpoint de OpenMetrics o Prometheus.

<div class="alert alert-warning">Todas las métricas recuperadas por esta integración se consideran <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">métricas personalizadas</a>.</div>

La integración es compatible tanto con el [formato de exposición de Prometheus](https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format) como con la [especificación de OpenMetrics](https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes).

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

Esta integración tiene un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo heredado (que se activa configurando `prometheus_url` en su lugar). Para obtener todas las características más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Última versión y versión heredada para integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

### Instalación

El check de OpenMetrics se incluye en el paquete del [Datadog Agent v6.6.0 o posterior](https://docs.datadoghq.com/getting_started/integrations/prometheus/?tab=docker#configuration).

### Configuración

Edita el archivo `conf.d/openmetrics.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Ve el [openmetrics.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example) para todas las opciones de configuración disponibles. Este es el último ejemplo de check de OpenMetrics a partir del Datadog Agent versión 7.32.0. Si anteriormente implementaste esta integración, consulta el [ejemplo heredado](https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example).

Para cada instancia, se requieren los siguientes parámetros:

| Parámetro        | Descripción                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | La URL donde se expone tus métricas de aplicación en formato Prometheus u OpenMetrics (debe ser única).                                                                                                                         |
| `namespace`      | El espacio de nombres se añade a todas las métricas.                                                                                                                                                                                                                                 |
| `metrics`        | Una lista de métricas para recuperar como métricas personalizadas. Añade cada métrica a la lista como `metric_name` o `metric_name: renamed` para renombrarla. Las métricas se interpretan como expresiones regulares. Utiliza `".*"` como comodín (`metric.*`) para recuperar todas las métricas que coincidan. **Nota**: Las expresiones regulares pueden enviar muchas métricas personalizadas. |

A partir del Datadog Agent v7.32.0, de conformidad con el [estándar de especificación de OpenMetrics](https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes), los nombres de contador que terminan en `_total` deben especificarse sin el sufijo `_total`. Por ejemplo, para recopilar `promhttp_metric_handler_requests_total`, especifica el nombre de la métrica `promhttp_metric_handler_requests`. Esto envía a Datadog el nombre de la métrica con el sufijo `.count`, `promhttp_metric_handler_requests.count`.

Este check tiene un límite de 2000 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado] del Datadog Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information). Puedes especificar las métricas que te interesan editando la configuración. Para saber cómo personalizar las métricas a recopilar, consulta [Recopilación de métricas de Prometheus y OpenMetrics](https://docs.datadoghq.com/getting_started/integrations/prometheus/).

Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `openmetrics` en la sección Checks.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por el check de OpenMetrics se reenvían a Datadog como métricas personalizadas.

### Eventos

El check de OpenMetrics no incluye ningún evento.

### Checks de servicio

El check de OpenMetrics no incluye ningún check de servicio.

## Solucionar problemas

### Facturación alta de métricas personalizadas 

Las configuraciones de OpenMetrics con valores comodín genéricos para la opción `metrics` tienen un impacto significativo en la facturación de métricas personalizadas.

Datadog recomienda utilizar nombres específicos de métrica o coincidencias parciales de nombres de métrica para una recopilación más precisa.

### Métricas sin tipo faltantes

Por defecto, la integración omite métricas que no tienen tipo en una exposición de Prometheus. Si deseas recopilar métricas sin tipo, debes especificar explícitamente su tipo en la asignación `metrics`, por ejemplo:

```yaml
  metrics:
    - "<NAME_OF_METRIC_WITHOUT_TYPE>":
        "type": "gauge"
```

Recuerda que los nombres de métrica pueden especificarse como expresiones regulares, lo que permite especificar el tipo para un conjunto de métricas sin enumerarlas todas individualmente.

### Errores en el parseo de la carga útil de OpenMetrics con Agent 7.46

La versión de esta integración incluida en la versión 7.46 del Agent da preferencia por defecto al formato de OpenMetrics cuando solicita métricas al endpoint de métricas. Lo hace estableciendo el encabezado `Accept` en `application/openmetrics-text;version=1.0.0,application/openmetrics-text;version=0.0.1;q=0.75,text/plain;version=0.0.4;q=0.5,*/*;q=0.1`. Esto se hizo en combinación con la determinación dinámica de qué seleccionador utilizar en función del `Content-Type` que recibe del servidor, para reducir la necesidad de configuración manual.

Las versiones anteriores utilizaban por defecto `text/plain`, lo que normalmente hace que el servidor devuelva métricas en el formato de exposición de Prometheus. Esto significa que la actualización a esta versión de integración puede provocar el cambio del formato de Prometheus al formato de OpenMetrics.

Aunque el comportamiento debería seguir siendo el mismo en la mayoría de las circunstancias, algunas aplicaciones devuelven métricas en un formato que no es totalmente compatible con OpenMetrics, a pesar de configurar `Content-Type` para indicar el uso del formato estándar de OpenMetrics. Esto puede hacer que nuestra integración informe de errores durante el parseo de la carga útil de métricas.

Si observas errores de parseo al escanear el endpoint de OpenMetrics con esta nueva versión, puedes forzar el uso del formato menos estricto de Prometheus configurando manualmente el encabezado `Accept` que la integración envía a `text/plain` mediante la opción `headers` del [archivo de configuración](https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546). Por ejemplo:

```yaml
## All options defined here are available to all instances.
#
init_config:
  ...
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    ...
    headers:
      Accept: text/plain
```

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Configuración de un check de OpenMetrics](https://docs.datadoghq.com/agent/openmetrics/)
- [Escribir un check personalizado de OpenMetrics](https://docs.datadoghq.com/developers/openmetrics/)