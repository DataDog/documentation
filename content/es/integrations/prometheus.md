---
app_id: prometheus
app_uuid: b978d452-7008-49d0-bb87-62d8639b2205
assets:
  integration:
    auto_install: verdadero
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10013
    source_type_name: Prometheus
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- event management
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/prometheus/README.md
display_on_public_website: verdadero
draft: false
git_integration_title: prometheus
integration_id: prometheus
integration_title: Prometheus (heredado)
integration_version: 5.0.0
is_public: verdadero
manifest_version: 2.0.0
name: prometheus
public_title: Prometheus (heredado)
short_description: Prometheus es un sistema de monitorización de código abierto de
  datos de métricas de series temporales
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Category::Métricas
  - Category::Gestión de eventos
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Prometheus es un sistema de monitorización de código abierto de datos
    de métricas de series temporales
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-prometheus-metrics
  - resource_type: documentación
    url: https://docs.datadoghq.com/agent/prometheus/
  - resource_type: documentación
    url: https://docs.datadoghq.com/developers/prometheus/
  support: README.md#Soporte
  title: Prometheus (heredado)
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Conéctate a Prometheus para:
- Extraer métricas personalizadas de los endpoints de Prometheus
- Ver las alertas del AlertManager de Prometheus en tu flujo (stream) de eventos de Datadog

**Nota**: Datadog recomienda utilizar el [check de OpenMetrics][1], ya que es más eficiente y es enteramente compatible con el formato de texto de Prometheus. Utiliza el check de Prometheus sólo cuando el endpoint de las métricas no es compatible con un formato de texto.

<div class="alert alert-danger">
Todas las métricas recuperadas por esta integración se consideran <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">métricas personalizadas</a>.
</div>

**Para aprender a configurar un check de Prometheus, consulta [Empezando con la recopilación de métricas de Prometheus][2].**

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Prometheus viene en el paquete del [Datadog Agent ][4] a partir de la versión 6.1.0.

### Configuración

Edita el archivo `prometheus.d/conf.yaml` para recuperar métricas desde aplicaciones que exponen endpoints de OpenMetrics / Prometheus.

Cada instancia se compone como mínimo de:

| Parámetro          | Descripción                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url` | Una URL que apunta a la ruta de la métrica (**Nota**: Debe ser única)                                                    |
| `namespace`      | Este espacio de nombres se antepone a todas las métricas (para evitar la colisión de nombres de métricas)                                        |
| `metrics`        | La lista de las métricas que se van a recuperar como métricas personalizadas con el formato `- <METRIC_NAME>` o `- <METRIC_NAME>: <RENAME_METRIC>` |

Al listar las métricas, es posible utilizar el comodín `*` de la siguiente manera `- <METRIC_NAME>*` para recuperar todas las métricas coincidentes. **Nota:** Utiliza los comodines con precaución, ya que es posible que envíe muchas métricas personalizadas.

En el [prometheus.d/conf.yaml de ejemplo][5] se documentan configuraciones más avanzadas (ssl, unión de etiquetas (tags), etiquetas personalizadas,...).

Debido a la naturaleza de esta integración, es posible enviar un elevado número de métricas personalizadas a Datadog. Los usuarios pueden controlar el número máximo de métricas enviadas por errores de configuración o cambios en entradas. El check tiene un límite por defecto de 2000 métricas. Si es necesario, este límite puede aumentarse configurando la opción `max_returned_metrics` en el archivo `prometheus.d/conf.yaml`.

Si `send_monotonic_counter: True`, el Agent envía los deltas de los valores en cuestión y el tipo en la aplicación se configura para el conteo (este es el comportamiento por defecto). Si `send_monotonic_counter: False`, el Agent envía el valor sin procesar, monotónicamente creciente, y el tipo en la aplicación se establece en "gauge".

### Validación

[Ejecuta el subcomando `status` del Agent][6] y busca `prometheus` en la sección Checks.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por el check de Prometheus se envían a Datadog como métricas personalizadas.

Nota: Los datos de los buckets para una determinada métrica de histograma de Prometheus `<HISTOGRAM_METRIC_NAME>` se almacenan en la métrica `<HISTOGRAM_METRIC_NAME>.count` en Datadog, con las etiquetas `upper_bound` que incluyen el nombre de los buckets. Para acceder al bucket `+Inf`, utiliza `upper_bound:none`.

### Eventos

Las alertas del AlertManager de Prometheus se envían automáticamente a tu flujo de eventos de Datadog siguiendo la configuración del webhook.

### Checks de servicio

El check de Prometheus no incluye checks de servicio.

## AlertManager de Prometheus
Envía alertas del AlertManager de Prometheus dentro del flujo de eventos. De forma nativa, el AlertManager envía todas las alertas simultáneamente al webhook configurado. Para ver las alertas en Datadog, debes configurar tu instancia de AlertManager para enviar las alertas de una en una. Puedes añadir un parámetro "group-by" (agrupar por) en `route` para agrupar las alertas por el nombre real de la regla de alerta.

### Configuración
1. Edita el archivo de configuración del AlertManager, `alertmanager.yml`, para incluir lo siguiente:
```
receivers:
- name: datadog
  configuraciones_webhooks: 
  - enviar_resuelto: verdadero
    url: https://app.datadoghq.com/intake/webhook/prometheus?api_key=<DATADOG_API_KEY>
route:
  agrupar_por: ['nombredealerta']
  espera_grupo: 10s
  intervalo_grupo: 5m
  receiver: datadog
  repetir_intervalo: 3h
```

**Nota**: Este endpoint sólo acepta un evento en la carga útil a la vez.

2. Reinicia los servicios de Prometheus y AlertManager.
```
sudo systemctl restart prometheus.service alertmanager.service
```

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].

## Referencias adicionales

- [Presentación de la compatibilidad de Prometheus con el Datadog Agent v6][8]
- [Configuración de un check de Prometheus][9]
- [Escritura de un check personalizado de Prometheus][10]

[1]: https://docs.datadoghq.com/es/integrations/openmetrics/
[2]: https://docs.datadoghq.com/es/getting_started/integrations/prometheus/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/prometheus?tab=docker#configuration
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-core/blob/master/prometheus/datadog_checks/prometheus/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/
[8]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[9]: https://docs.datadoghq.com/es/agent/prometheus/
[10]: https://docs.datadoghq.com/es/developers/prometheus/