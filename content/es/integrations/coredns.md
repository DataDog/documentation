---
app_id: coredns
app_uuid: b613759e-89ca-4d98-a2c1-4d465c42e413
assets:
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
    CoreDNS [V2]: assets/dashboards/coredns_v2.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - coredns.request_count
      - coredns.request_count.count
      - coredns.build_info
      metadata_path: metadata.csv
      prefix: coredns.
    process_signatures:
    - coredns
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10038
    source_type_name: CoreDNS
  monitors:
    Cache hits count is low: assets/monitors/coredns_cache_hits_low.json
    Request duration is high: assets/monitors/coredns_request_duration_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- contenedores
- Kubernetes
- recopilación de logs
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/coredns/README.md
display_on_public_website: true
draft: false
git_integration_title: coredns
integration_id: coredns
integration_title: CoreDNS
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: coredns
public_title: CoreDNS
short_description: CoreDNS recopila métricas de DNS en Kubernetes.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Contenedores
  - Categoría::Kubernetes
  - Categoría::Recopilación de logs
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: CoreDNS recopila métricas de DNS en Kubernetes.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/coredns-metrics/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/coredns-monitoring-tools/
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/
  support: README.md#Soporte
  title: CoreDNS
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Obtén métricas de CoreDNS en tiempo real para visualizar y monitorizar fallos DNS y aciertos o fallos de caché.

## Configuración


A partir de la versión 1.11.0, esta integración basada en OpenMetrics cuenta con un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo heredado (que se activa configurando `prometheus_url`). Para obtener todas las funciones más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics][1].

El último modo del check de CoreDNS requiere Python 3, envía métricas de `.bucket` y también envía muestras del histograma `.sum` y `.count` como tipo de recuento monotónico. Antes, estas métricas se enviaban como tipo `gauge` en el modo heredado. Para ver la lista de métricas disponibles en cada modo, consulta el [archivo`metadata.csv`][2]. 

Para los hosts que no puedan utilizar Python 3, o si previamente has implementado este modo de integración, consulta el [ejemplo de configuración][3] del modo `legacy`. Para los usuarios de Autodiscovery que dependen del archivo `coredns.d/auto_conf.yaml`, este habilita por defecto la opción `prometheus_url` del modo `legacy` del check. Consulta el [coredns.d/auto_conf.yaml de ejemplo][4], para ver las opciones de configuración por defecto, y el [coredns.d/conf.yaml.example de ejemplo][5], para ver todas las opciones de configuración disponibles.

### Instalación

El check de CoreDNS está incluido en el paquete del [Datadog Agent][6], por lo que no necesitas instalar nada más en tus servidores.

### Configuración
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto del modo heredado. 
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

#### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Docker][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<SERVICE_NAME>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Para Configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [plantillas de integraciones Autodiscovery][1] como anotaciones de pod en tu contenedor de aplicación. Las plantillas también se pueden configurar con [un archivo, un configmap o un almacén de clave-valor][2].

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.checks: |
      {
        "coredns": {
          "init_config": {},
          "instances": [
            {
              "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
        }
      }
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
          "instances": [
            {
              "prometheus_url": "http://%%host%%:9153/metrics", 
              "tags": ["dns-pod:%%host%%"]
            }
          ]
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto del modo heredado. 
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

#### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][3].

Luego, configura las [integraciones de logs][4] como anotaciones de pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de clave-valor][5].

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<SERVICE_NAME>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/es/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [plantillas de integraciones de Autodiscovery][1] como etiquetas (labels) Docker en el contenedor de tu aplicación:

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

Para activar el modo heredado de este check basado en OpenMetrics, sustituye `openmetrics_endpoint` por `prometheus_url`:

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**Notas**:

- El archivo `coredns.d/auto_conf.yaml` enviado activa la opción `prometheus_url` por defecto del modo heredado. 
- La etiqueta (tag) `dns-pod` realiza un seguimiento de la IP del pod DNS de destino. Las otras etiquetas (tags) están relacionadas con el Datadog Agent que sondea la información utilizando la detección de servicios.
- Las anotaciones de detección de servicios deben realizarse en el pod. En caso de despliegue, añade las anotaciones a los metadatos de las especificaciones de la plantilla. No las añadas en el nivel de especificación externo.

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de ECS][2].

Luego, configura [integraciones de logs][3] como etiquetas Docker:

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/es/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/es/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/es/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de `status` del Agent][7] y busca `coredns` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "coredns" >}}


### Eventos

El check de CoreDNS no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "coredns" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Métricas clave para la monitorización CoreDNS][9]
- [Herramientas para la recopilación de métricas y logs de CoreDNS][10]
- [Monitorización de CoreDNS con Datadog][11]



[1]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[2]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[3]: https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: http://docs.datadoghq.com/help
[9]: https://www.datadoghq.com/blog/coredns-metrics/
[10]: https://www.datadoghq.com/blog/coredns-monitoring-tools/
[11]: https://www.datadoghq.com/blog/monitoring-coredns-with-datadog/