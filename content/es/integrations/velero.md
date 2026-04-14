---
app_id: velero
app_uuid: e4199d9b-74fe-4af2-9afb-bbcde0f729f6
assets:
  dashboards:
    Velero Overview: assets/dashboards/velero_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: velero.backup.attempt.count
      metadata_path: metadata.csv
      prefix: velero.
    process_signatures:
    - velero
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 38596867
    source_type_name: Velero
  monitors:
    Backup Failures: assets/monitors/backup_failures.json
    Backup Staleness: assets/monitors/backup_staleness.json
    Restore Failures: assets/monitors/restore_failures.json
  saved_views:
    Velero Error Logs Overview: assets/saved_views/error_logs_overview.json
    Velero Logs Overview: assets/saved_views/logs_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- nube
- Kubernetes
- suministro
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/velero/README.md
display_on_public_website: true
draft: false
git_integration_title: velero
integration_id: velero
integration_title: Velero
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: velero
public_title: Velero
short_description: Monitoriza el rendimiento y el uso de tus despliegues Velero.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Kubernetes
  - Categoría::Suministro
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Monitoriza el rendimiento y el uso de tus despliegues Velero.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Velero
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [Velero][1] a través del Datadog Agent. Recopila datos sobre las operaciones de copia de seguridad, recuperación y snapshot de Velero. Esto permite a los usuarios obtener información sobre la salud, el rendimiento y la fiabilidad de sus procesos de recuperación de desastres.

## Configuración

### Instalación

El check de Velero está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

#### Métricas

{{< tabs >}}
{{% tab "Host" %}}

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host.

1. Edita el archivo `velero.d/conf.yaml` que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para empezar a recopilar tus datos de rendimiento de Velero. Para conocer todas las opciones de configuración disponibles, consulta el [velero.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/velero/datadog_checks/velero/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Kubernetes" %}}

Consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la configuración de esta integración en un entorno contenedorizado.

Ten en cuenta que es necesario consultar dos tipos de pods para recopilar todas las métricas: `velero` y `node-agent`
Por lo tanto, asegúrate de actualizar las anotaciones del despliegue de `velero`, así como el daemonset `node-agent`.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Logs

La integración Velero puede recopilar logs de los pods Velero.

{{< tabs >}}
{{% tab "Host" %}}

Para recopilar logs de los contenedores Velero en un host:

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `velero.d/conf.yaml`. Por ejemplo:

   ```yaml
   logs:
     - type: docker
       source: velero
       service: velero
   ```

{{% /tab %}}
{{% tab "Kubernetes" %}}

Para recopilar logs de un despliegue de Velero Kubernetes:

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][1].

2. Configura las integraciones de logs como anotaciones de pod. Esto también se puede configurar con un archivo, un ConfigMap o un almacén de clave-valor. Para obtener más información, consulta la sección [Recopilación de logs de Kubernetes][2].

[1]: https://docs.datadoghq.com/es/agent/kubernetes/log/#setup
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/#configuration
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `velero` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "velero" >}}


### Eventos

La integración Velero no incluye eventos.

### Checks de servicio

La integración Velero no incluye checks de servicios.

## Solucionar problemas

Asegúrate de que tu servidor Velero expone métricas comprobando que la función está habilitada en la configuración del despliegue:

```yaml
# Settings for Velero's prometheus metrics. Enabled by default.
metrics:
  enabled: true
  scrapeInterval: 30s
  scrapeTimeout: 10s
```

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][4].



[1]: https://velero.io
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/