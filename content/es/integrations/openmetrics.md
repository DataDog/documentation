---
app_id: openmetrics
app_uuid: 302b841e-8270-4ecd-948e-f16317a316bc
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10045
    source_type_name: OpenMetrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- métricas
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md
display_on_public_website: true
draft: false
git_integration_title: openmetrics
integration_id: openmetrics
integration_title: OpenMetrics
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: openmetrics
public_title: OpenMetrics
short_description: OpenMetrics es un estándar abierto para exponer datos de métricas
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Metrics
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: OpenMetrics es un estándar abierto para exponer datos de métricas
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/agent/openmetrics/
  - resource_type: documentación
    url: https://docs.datadoghq.com/developers/openmetrics/
  support: README.md#Support
  title: OpenMetrics
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Extrae métricas personalizadas de cualquier endpoint de OpenMetrics o Prometheus.

<div class="alert alert-warning">Todas las métricas recuperadas por esta integración se consideran <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">métricas personalizadas</a>.</div>

La integración es compatible tanto con el [formato de exposición de Prometheus][1] como con la [especificación de OpenMetrics][2].

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

Esta integración basada en OpenMetrics tiene un modo más reciente (que se habilita al configurar `openmetrics_endpoint` de modo que apunte hacia el endpoint de destino) y un modo heredado (que se habilita al configurar `prometheus_url` en su lugar). Para obtener todas las características más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Control de versiones más reciente y heredado para las integraciones basadas en OpenMetrics][4].

### Instalación

El check de OpenMetrics viene empaquetado con [Datadog Agent v6.6.0 o posterior][5].

### Configuración

Edita el archivo `conf.d/openmetrics.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent][6]. Consulta el [openmetrics.d/conf.yaml de ejemplo][7] para todas las opciones disponibles de configuración. Este es el ejemplo más reciente del check de OpenMetrics a partir de la versión 7.32.0 de Datadog Agent. Si previamente implementaste esta integración, consulta el [ejemplo de legacy][8].

Para cada instancia, se requieren los siguientes parámetros:

| Parámetro        | Descripción                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | La URL donde se expone tus métricas de aplicación en formato Prometheus u OpenMetrics (debe ser única).                                                                                                                         |
| `namespace`      | El espacio de nombres se añade a todas las métricas.                                                                                                                                                                                                                                 |
| `metrics`        | Una lista de métricas para recuperar como métricas personalizadas. Añade cada métrica a la lista como `metric_name` o `metric_name: renamed` para renombrarla. Las métricas se interpretan como expresiones regulares. Utiliza `".*"` como comodín (`metric.*`) para recuperar todas las métricas que coincidan. **Nota**: Las expresiones regulares pueden enviar muchas métricas personalizadas. |

A partir del Datadog Agent v7.32.0, de acuerdo con el [estándar de especificación de OpenMetrics][2], los nombres de contador que terminan en `_total` deben especificarse sin el sufijo `_total`. Por ejemplo, para recopilar `promhttp_metric_handler_requests_total`, especifica el nombre de métrica `promhttp_metric_handler_requests`. Esto envía a Datadog el nombre de métrica con `.count`, `promhttp_metric_handler_requests.count`.

Este check tiene un límite de 2000 métricas por instancia. El número de métricas devueltas se indica al ejecutar el [comando de estado][9] del Datadog Agent. Puedes especificar las métricas que te interesan editando la configuración. Para saber cómo personalizar las métricas a recopilar, consulta [Recopilación de métricas de Prometheus y OpenMetrics][10].

Si necesitas monitorizar más métricas, ponte en contacto con el [soporte de Datadog][11].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `openmetrics` en la sección Checks.

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

Si observas errores en el parseo al seleccionar el endpoint de OpenMetrics con esta nueva versión, puedes forzar el uso del formato menos estricto de Prometheus, al configurar manualmente el encabezado `Accept` que la integración envía a `text/plain` mediante la opción `headers` en el [archivo de configuración][12]. Por ejemplo: 

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

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

## Referencias adicionales

- [Configuración del check de OpenMetrics][13]
- [Escribir un check de OpenMetrics personalizado][14]

[1]: https://prometheus.io/docs/instrumenting/exposition_formats/#text-based-format
[2]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[3]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[4]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[5]: https://docs.datadoghq.com/es/getting_started/integrations/prometheus/?tab=docker#configuration
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://docs.datadoghq.com/es/getting_started/integrations/prometheus/
[11]: https://docs.datadoghq.com/es/help/
[12]: https://github.com/DataDog/integrations-core/blob/7.46.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L537-L546
[13]: https://docs.datadoghq.com/es/agent/openmetrics/
[14]: https://docs.datadoghq.com/es/developers/openmetrics/