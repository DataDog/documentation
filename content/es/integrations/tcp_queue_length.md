---
app_id: tcp-queue-length
app_uuid: 2c48a360-9fbb-4cd6-9316-0e9afd9926c8
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: tcp_queue.read_buffer_max_usage_pct
      metadata_path: metadata.csv
      prefix: tcp_queue.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10295
    source_type_name: TCP Queue Length
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas para desarrolladores
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/README.md
display_on_public_website: true
draft: false
git_integration_title: tcp_queue_length
integration_id: tcp-queue-length
integration_title: TCP Queue Length
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: tcp_queue_length
public_title: TCP Queue Length
short_description: Realiza un seguimiento del tamaño de los buffers TCP con Datadog.
supported_os:
- Linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas para desarrolladores
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento del tamaño de los buffers TCP con Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: TCP Queue Length
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el uso de las colas de recepción y envío TCP de Linux. Puede detectar si una cola de recepción o envío TCP está llena en contenedores individuales.

## Configuración

### Instalación

`tcp_queue_length` es un check núcleo del Agent 6/7 que se basa en una parte eBPF implementada en `system-probe`. Se requiere una versión del Agent 7.24.1/6.24.1 o posterior.

El programa eBPF utilizado por `system-probe` se compila en el tiempo de ejecución y requiere que tengas acceso a las cabeceras de kernel adecuadas.

En distribuciones de tipo Debian, instala las cabeceras de kernel de la siguiente manera:
```sh
apt install -y linux-headers-$(uname -r)
```

En distribuciones de tipo RHEL, instala las cabeceras de kernel de la siguiente manera:
```sh
yum install -y kernel-headers-$(uname -r)
yum install -y kernel-devel-$(uname -r)
```

**Nota**: Las versiones de Windows y CentOS/RHEL anteriores a la v8 no son compatibles.

### Configuración

La activación de la integración `tcp_queue_length` requiere que tanto `system-probe` como el Agent núcleo tengan activada la opción de configuración.

Dentro del archivo de configuración `system-probe.yaml`, deben configurarse los siguientes parámetros:
```yaml
system_probe_config:
  enable_tcp_queue_length: true
```

1. Edita el archivo `tcp_queue_length.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
   directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de tcp_queue_length.
   Para conocer todas las opciones de configuración disponibles, consulta el [tcp_queue_length.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].


### Configuración con Helm

Con el [Datadog Helm chart][3], el `system-probe` debe activarse configurando `datadog.systemProbe.enabled` como `true` en el archivo `values.yaml`.
A continuación, el check puede activarse configurando el parámetro `datadog.systemProbe.enableTCPQueueLength`.

### Configuración con el Operator (v1.0.0 o posterior)

Configura el parámetro `features.tcpQueueLength.enabled` en el manifiesto del Datadog Agent:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
```

**Nota**: Cuando utilices COS (Contenedor Optimized OS), anula el volumen `src` en el Agent del nodo:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    tcpQueueLength:
      enabled: true
  override:
    nodeAgent:
      volumes: 
      - emptyDir: {}
        name: src
```

### Validación

[Ejecuta el subcomando `status` del Agent][2] y busca `tcp_queue_length` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tcp-queue-length" >}}


### Checks de servicio

El check de TCP Queue Length no incluye checks de servicio.

### Eventos

El check de TCP Queue Length no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/tcp_queue_length.d/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://github.com/DataDog/helm-charts
[4]: https://github.com/DataDog/integrations-core/blob/master/tcp_queue_length/metadata.csv
[5]: https://docs.datadoghq.com/es/help/