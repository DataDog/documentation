---
"app_id": "istio"
"app_uuid": "de5b5443-5038-46cf-a052-0484348776d6"
"assets":
  "dashboards":
    "Istio Overview": "assets/dashboards/overview.json"
    "Istio Overview 1.5": "assets/dashboards/istio_1_5_overview.json"
    "Istio Overview 1.5 (OpenMetrics)": "assets/dashboards/istio_1_5_openmetrics_overview.json"
    "Istio base dashboard": "assets/dashboards/istio_overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check":
      - "istio.mixer.process.cpu_seconds_total"
      - "istio.mesh.request.count"
      - "istio.galley.endpoint_no_pod"
      "metadata_path": "metadata.csv"
      "prefix": "istio."
    "process_signatures":
    - "pilot-agent proxy router"
    - "envoy envoy-rev0.json"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10017"
    "source_type_name": "Istio"
  "monitors":
    "Istio Proxy Requests Error Percentage": "assets/monitors/request_error_rate.json"
    "Istio xDS Push Error Rate": "assets/monitors/xds_push_error_rate.json"
    "Number of failed Istio sidecar injection is high": "assets/monitors/failed_sidecar_injection.json"
  "saved_views":
    "Istio Error Overview": "assets/saved_views/istio_error_overview.json"
    "Istio Overview": "assets/saved_views/istio_overview.json"
    "Istio Pilot Error Logs": "assets/saved_views/istio_pilot_errors.json"
    "Istio Pilot Logs": "assets/saved_views/istio_pilot_logs.json"
    "Istio Proxyv2 Error Logs": "assets/saved_views/istio_proxyv2_errors.json"
    "Istio Proxyv2 Logs": "assets/saved_views/istio_proxyv2_logs.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "log collection"
- "network"
- "tracing"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/istio/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "istio"
"integration_id": "istio"
"integration_title": "Istio"
"integration_version": "8.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "istio"
"public_title": "Istio"
"short_description": "Recopila métricas de esquemas de rendimiento, rendimiento de consultas, métricas personalizadas y mucho más."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Recopilación de logs"
  - "Category::Red"
  - "Category::Rastreo"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  - "Submitted Data Type::Métricas"
  - "Submitted Data Type::Logs"
  - "Submitted Data Type::Trazas (traces)"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Recopila métricas de esquema de rendimiento, rendimiento de consultas, métricas personalizadas y mucho más."
  "media": []
  "overview": "README.md#Información general"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-istio-with-datadog"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/istio-metrics/"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/istio-datadog/"
  "support": "README.md#Soporte"
  "title": "Istio"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Datadog monitoriza todos los aspectos de tu entorno Istio, de modo que puedes hacer lo siguiente:
- Evaluar el estado de Envoy y el plano de control de Istio con [logs](#log-collection).
- Desglosar el rendimiento de tu malla de servicios con [métricas de solicitudes, ancho de banda y consumo de recursos](#metrics).
- Asigna la comunicación de red entre contenedores, pods y servicios en la malla con [Cloud Network Monitoring][1].
- Profundizar en las trazas distribuidas de aplicaciones que realizan transacciones a través de la malla con [APM][2].

Para obtener más información sobre la monitorización de tu entorno Istio con Datadog, [consulta la entrada del blog de monitor][3].

## Configuración

Para obtener instrucciones generales sobre la configuración de integraciones en entornos en contenedores, consulta [Configurar integraciones con Autodiscovery en Kubernetes][4] o [Configurar integraciones con Autodiscovery en Docker][5].

Esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics: true`) y un modo legacy (`use_openmetrics: false`). Para obtener todas las características más actualizadas, Datadog recomienda habilitar el modo más reciente. Para obtener más información, consulta [Control de versiones más reciente y legacy para las integraciones basadas en OpenMetrics][6].

Si tienes varias instancias de Datadog que recopilan métricas de Istio, asegúrate de utilizar el mismo modo para todas ellas. De lo contrario, los datos de las métricas pueden fluctuar en el sitio de Datadog.

Las métricas marcadas como `[OpenMetrics V1]`, `[OpenMetrics V2]` u `[OpenMetrics V1 and V2]` solo están disponibles con el uso del modo correspondiente de la integración Istio. Las métricas marcadas como `Istio v1.5+` se recopilan mediante la versión 1.5 de Istio o posteriores.

### Instalación

Istio está incluido en el Datadog Agent. [Instala el Datadog Agent][7] en tus servidores de Istio o en tu clúster y apúntalo hacia Istio.

#### Envoy

Si quieres monitorizar los proxies de Envoy en Istio, configura la [integración de Envoy][8].

### Configuración

#### Recopilación de métricas
Para monitorizar Istio v1.5 o posterior hay dos componentes clave que coinciden con la [arquitectura Istio][9] para métricas con formato Prometheus:

- **Plano de datos**: Contenedores sidecar del `istio-proxy`.
- **Plano de control**: Servicio `istiod` que gestiona los proxies.

Ambos se ejecutan como checks del Agent de `istio`, pero tienen responsabilidades diferentes y se configuran por separado.

##### Configuración del plano de datos

El archivo por defecto [`istio.d/auto_conf.yaml`][10] inicializa automáticamente la monitorización para cada uno de los contenedores sidecar `istio-proxy`. El Agent inicializa este check para cada contenedor sidecar que detecta automáticamente. Esta configuración permite la notificación de métricas `istio.mesh.*` para los datos expuestos por cada uno de estos contenedores sidecar.

Para personalizar la parte del plano de datos de la integración, crea un archivo de configuración Istio personalizado `istio.yaml`. Para ver opciones para la creación de este archivo, consulta [Configurar integraciones en Kubernetes][4] o [Configurar integraciones con Autodiscovery en Docker][5].

Este archivo debe contener:

```yaml
ad_identifiers:
  - proxyv2
  - proxyv2-rhel8

init_config:

instances:
  - use_openmetrics: true
    send_histograms_buckets: false
    istio_mesh_endpoint: http://%%host%%:15020/stats/prometheus
    tag_by_endpoint: false
```

Personaliza este archivo con cualquier configuración adicional. Para ver todas las opciones de configuración disponibles, consulta el [istio.d/conf.yaml de ejemplo][11].

##### Configuración del plano de control
Para monitorizar el plano de control de Istio y notificar las métricas `mixer`, `galley`, `pilot` y `citadel`, debes configurar el Agent para monitorizar el despliegue de `istiod`. En Istio v1.5 o posterior, aplica las siguientes anotaciones de pod para el despliegue de `istiod` en el espacio de nombres `istio-system`:

```yaml
ad.datadoghq.com/discovery.checks: |
  {
    "istio": {
      "instances": [
        {
          "istiod_endpoint": "http://%%host%%:15014/metrics",
          "use_openmetrics": "true"
        }
      ]
    }
  }
```
**Nota**: La sintaxis de Autodiscovery Annotations v2 es compatible con el Agent v7.36 o posterior.

Esta anotación especifica el contenedor `discovery` para que coincida con el nombre por defecto del contenedor Istio en este pod. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.checks` por el nombre (`.spec.containers[i].name`) de tu contenedor Istio, si el tuyo difiere.

El método para aplicar estas anotaciones varía en función de la [estrategia de despliegue de Istio (Istioctl, Helm, Operator)][12] utilizada. Consulta la documentación de Istio para conocer el método adecuado para aplicar estas anotaciones de pod. Para ver todas las opciones de configuración disponibles, consulta el [istio.d/conf.yaml de ejemplo][11].

#### Desactivar la inyección de sidecars para pods del Datadog Agent

Si estás instalando el [Datadog Agent en un contenedor][13], Datadog recomienda que primero desactives la inyección de sidecars de Istio.

_Versiones de Istio iguales o superiores a la v1.10:_

Añade la **etiqueta** (label) `sidecar.istio.io/inject: "false"` al DaemonSet `datadog-agent`:

```yaml
# (...)
spec:
  template:
    metadata:
      labels:
        sidecar.istio.io/inject: "false"
    # (...)
```

Esto también puede hacerse con el comando `kubectl patch`.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"labels":{"sidecar.istio.io/inject":"false"}}}}}'
```

_Versiones de Istio iguales o anteriores a la v1.9:_

Añade la **anotación** `sidecar.istio.io/inject: "false"` al DaemonSet `datadog-agent`:

```yaml
# (...)
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    # (...)
```

Utilizando el comando `kubectl patch`:

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

En primer lugar, habilita el Datadog Agent para realizar la recopilación de logs en Kubernetes. Consulta [Recopilación de logs de Kubernetes][14].

#### Logs de Istio

Para recopilar logs de Istio de tu plano de control (`istiod`), aplica las siguientes anotaciones de pod para el despliegue de `istiod` en el espacio de nombres `istio-system`:

```yaml
ad.datadoghq.com/discovery.logs: |
  [
    {
      "source": "istio",
      "service": "<SERVICE_NAME>"
    }
  ]
```

Esta anotación especifica el contenedor `discovery` para que coincida con el nombre de contenedor por defecto del contenedor Istio en este pod. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` por el nombre (`.spec.containers[i].name`) de tu contenedor Istio, si el tuyo difiere.

Sustituye `<SERVICE_NAME>` por el nombre de servicio Istio que elijas.

#### Logs de acceso a Envoy

Para recopilar logs de acceso a Envoy de tu plano de datos (`istio-proxy`):

1. Habilita la [generación de logs de acceso a Envoy en Istio][15]
2. Aplica la siguiente anotación al pod en el que se inyectó el contenedor `istio-proxy`

```yaml
ad.datadoghq.com/istio-proxy.logs: |
  [
    {
      "source": "envoy",
      "service": "<SERVICE_NAME>"
    }
  ]
```

Esta anotación especifica el contenedor `istio-proxy` para que coincida con el nombre de contenedor por defecto del contenedor sidecar de Istio inyectado. Sustituye esta anotación `ad.datadoghq.com/<CONTAINER_NAME>.logs` por el nombre (`.spec.containers[i].name`) de tu contenedor sidecar de Istio, si el tuyo difiere.

Sustituye `<SERVICE_NAME>` por el nombre de servicio de proxy de Istio que elijas.

### Validación

[Ejecuta el subcomando `info` del Agent][16] y busca `istio` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "istio" >}}


### Eventos

El check de Istio no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "istio" >}}


## Solucionar problemas

### Error de longitud de fragmento no válida
Si ves el siguiente error en el modo legacy de la integración Istio (versión `3.13.0` o anterior de la integración Istio):

```python
  Error: ("Connection broken: InvalidChunkLength(got length b'', 0 bytes read)",
  InvalidChunkLength(got length b'', 0 bytes read))
```

Puedes utilizar el modo más reciente de la integración Istio basada en OpenMetrics para solucionar este error.

Debes actualizar como mínimo al Agent `7.31.0` y a Python 3. Consulta la sección [Configuración](#configuration) para habilitar OpenMetrics.

### Uso de la integración genérica OpenMetrics en un despliegue de Istio

Si la inyección de sidecar proxy de Istio está habilitada, la monitorización de otras métricas de Prometheus utilizando la [integración OpenMetrics][19] con el mismo endpoint de métricas que `istio_mesh_endpoint` puede resultar en un uso elevado de métricas personalizadas y en una recopilación duplicada de métricas.

Para asegurarte de que tu configuración de OpenMetrics no recopile métricas de forma redundante, puedes:

1. Utilizar una coincidencia de métricas específica en la opción de configuración de `metrics` o
2. Si utilizas el valor comodín `*` para `metrics`, considera la posibilidad de utilizar las siguientes opciones de la integración OpenMetrics para excluir métricas ya compatibles con las integraciones Istio y Envoy.

#### Configuración del modo más reciente de OpenMetrics con recopilación de métricas genéricas

Asegúrate de excluir las métricas de Istio y Envoy de tu configuración para evitar recibir una facturación elevada por métricas personalizadas. Utiliza `exclude_metrics` si el`openmetrics_endpoint` está habilitado.

```yaml
## Every instance is scheduled independent of the others.
#
instances:
  - openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
    metrics:
    - '.*'
    exclude_metrics:
      - istio_.*
      - envoy_.*

```

#### Configuración del modo legacy de OpenMetrics con recopilación de métricas genéricas

Asegúrate de excluir las métricas de Istio y Envoy de tu configuración para evitar recibir una facturación elevada por métricas personalizadas. Utiliza `ignore_metrics` si la `prometheus_url` está habilitada.

```yaml
instances:
  - prometheus_url: <PROMETHEUS_URL>
    metrics:
      - '*'
    ignore_metrics:
      - istio_*
      - envoy_*
```

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][20].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitorización de tu malla de servicios Istio con Datadog][21]
- [Más información sobre cómo Datadog recopila claves métricas para la monitorización de Istio][22]
- [Monitorizarización de Istio con Datadog][3]

[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/containers/kubernetes/integrations/
[5]: https://docs.datadoghq.com/containers/docker/integrations/
[6]: https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: https://github.com/DataDog/integrations-core/tree/master/envoy#istio
[9]: https://istio.io/latest/docs/ops/deployment/architecture/
[10]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[11]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[12]: https://istio.io/latest/docs/setup/install/
[13]: https://docs.datadoghq.com/agent/kubernetes/
[14]: https://docs.datadoghq.com/agent/kubernetes/log/
[15]: https://istio.io/latest/docs/tasks/observability/logs/access-log/
[16]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[17]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[18]: https://github.com/DataDog/integrations-core/blob/master/istio/assets/service_checks.json
[19]: https://docs.datadoghq.com/integrations/openmetrics/
[20]: https://docs.datadoghq.com/help/
[21]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[22]: https://www.datadoghq.com/blog/istio-metrics/

