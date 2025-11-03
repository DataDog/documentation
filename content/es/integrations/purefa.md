---
app_id: purefa
app_uuid: a2d8f393-62cd-4ece-bfab-e30797698b12
assets:
  dashboards:
    purefa_overview: assets/dashboards/purefa_overview.json
    purefa_overview_legacy: assets/dashboards/purefa_overview_legacy.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefa.info
      metadata_path: metadata.csv
      prefix: purefa.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10256
    source_type_name: PureFA
author:
  homepage: https://purestorage.com
  name: Pure Storage
  sales_email: sales@purestorage.com
  support_email: pure-observability@purestorage.com
categories:
- almacenes de datos
- sistema operativo y sistema
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/purefa/README.md
display_on_public_website: true
draft: false
git_integration_title: purefa
integration_id: purefa
integration_title: FlashArray Pure Storage
integration_version: 1.2.0
is_public: true
manifest_version: 2.0.0
name: purefa
public_title: FlashArray Pure Storage
short_description: Monitorización del rendimiento y el uso de FlashArrays Pure Storage
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenes de datos
  - Categoría::Sistema operativo y sistema
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  configuration: README.md#Configuración
  description: Monitorización del rendimiento y el uso de FlashArrays Pure Storage
  media:
  - caption: Dashboard de FlashArray Pure Storage - Información general (arriba)
    image_url: images/FA-overview-1.png
    media_type: imagen
  - caption: Dashboard de FlashArray Pure Storage - Información general (arriba)
    image_url: images/FA-overview-2.png
    media_type: imagen
  - caption: Dashboard de FlashArray Pure Storage - Información general (abajo)
    image_url: images/FA-overview-3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: FlashArray Pure Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza el [FlashArray Pure Storage][1] a través del [Datadog Agent][2] y el [exportador OpenMetrics Pure Storage][3]. 

La integración puede proporcionar datos de rendimiento a nivel de matriz, host, volumen y pod, así como información muy clara sobre capacidad y configuración.

Puedes monitorizar múltiples FlashArrays y agregarlos en un único dashboard o agruparlos según el entorno definido por el cliente.

**Esta integración requiere lo siguiente**:

 - Agent v7.26.x o posterior para utilizar OpenMetrics BaseCheckV2
 - Python 3
 - El exportador OpenMetrics Pure Storage se instala y ejecuta en un entorno contenedorizado. Para obtener instrucciones de instalación, consulta el [repositorio de GitHub][3].

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las plantillas de integración de Autodiscovery para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

1. [Descarga e inicia el Datadog Agent][2].
2. Instala manualmente la integración Pure FlashArray. Para obtener más detalles en función de tu entorno, consulta [Uso de integraciones de la comunidad][4].


#### Host

Para configurar este check para un Agent que se ejecuta en un host, ejecuta `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==<INTEGRATION_VERSION>`.

Nota: `<INTEGRATION_VERSION>` se puede encontrar dentro del [CHANGELOG.md][5] de integraciones adicionales de Datadog. 
  * Por ejemplo `sudo -u dd-agent -- datadog-agent integration install -t datadog-purefa==1.2.0`

### Configuración

1. Crea un usuario local en tu FlashArray con el rol de sólo lectura y genera un token de API para este usuario.
   ![Generación de una clave de API][6] 
2. Añade el siguiente bloque de configuración al archivo `purefa.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de PureFA. Para conocer todas las opciones de configuración disponibles, consulta el [purefa.d/conf.yaml de ejemplo][7].

**Nota**: La creación de tu archivo de configuración requiere el endpoint `/array` como mínimo absoluto.

```yaml
init_config:
   timeout: 60

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/volumes?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/hosts?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/pods?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/directories?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fa_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120
```

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `purefa` en la sección Checks.



### Actualización a nuevas versiones de esta integración

#### A partir del check del Agent PureFA v1.0.x a v1.1.x

La versión 1.1.x admite tanto el [exportador OpenMetrics Pure Storage][3] y el [exportador Prometheus Pure Storage][10] obsoleto.

El dashboard para el [exportador Prometheus Pure Storage][10] obsoleto ha sido renombrado `Pure FlashArray - Overview (Legacy Exporter)`.

En [metrics.py][11] se muestra un listado de métricas, tanto compartidas como exclusivas, de los distintos exportadores. Al migrar del [exportador Prometheus Pure Storage][10] al [exportador OpenMetrics Pure Storage][3], es posible que tengas que actualizar tus dashboards o tus alertas para que coincidan con los nuevos nombres de métricas. Si tienes alguna pregunta, ponte en contacto con Pure Storage con la información de la pestaña de asistencia.

Al migrar del [exportador Prometheus Pure Storage][10] al [exportador OpenMetrics Pure Storage][3], los endpoints ya no tendrán `/flasharray` en el URI del endpoint.

En futuras versiones del check del Agent PureFA, se eliminarán los nombres de métricas del exportador Prometheus Pure Storage.

### Resolución de problemas

#### Las matrices no se muestran en el dashboard

Los dashboards incluidos en esta integración utilizan las etiquetas (tags) `env` y `fa_array_name`. Asegúrate de configurarlas para cada instancia. `host` también debe configurarse para los endpoints `/array` y `/pods` en `purefa.d/conf.yaml`.

```yaml
- tags:
   - env:<env>
   - fa_array_name:<full_fqdn>
   - host:<full_fqdn>
```

#### Aumento del intervalo de recopilación

El check de FlashArray Pure Storage configura `min_collection_interval` como `120` por defecto y el valor mínimo recomendado es `20`. Si es necesario:, puedes aumentar/disminuir `min_collection_interval` en el archivo `purefa.d/conf.yaml`:

```yaml
min_collection_interval: 120
```


## Datos recopilados

### Métricas
{{< get-metrics-from-git "purefa" >}}


### Eventos

La integración PureFA no incluye eventos.

### Checks de servicio

Para ver una lista de los checks de servicio proporcionados por esta integración, consulta [service_checks.json][13].

## Agent

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Pure Storage utilizando los siguientes métodos:
* Correo electrónico: pure-observability@purestorage.com
* Slack: [Código Storage Code//Canal de observabilidad][14].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fa-openmetrics-exporter
[4]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/purefa/CHANGELOG.md
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/purefa/images/API.png
[7]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/PureStorage-OpenConnect/pure-exporter
[11]: https://github.com/datadog/integrations-extras/blob/master/purefa/datadog_checks/purefa/metrics.py
[12]: https://github.com/DataDog/integrations-extras/blob/master/purefa/metadata.csv
[13]: https://github.com/DataDog/integrations-extras/blob/master/purefa/assets/service_checks.json
[14]: https://code-purestorage.slack.com/messages/C0357KLR1EU