---
app_id: purefb
app_uuid: 50ae3c61-a87d-44ee-9917-df981184ff8a
assets:
  dashboards:
    purefb_overview: assets/dashboards/purefb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: purefb.info
      metadata_path: metadata.csv
      prefix: purefb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10269
    source_type_name: PureFB
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
- https://github.com/DataDog/integrations-extras/blob/master/purefb/README.md
display_on_public_website: true
draft: false
git_integration_title: purefb
integration_id: purefb
integration_title: FlashBlade Pure Storage
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: purefb
public_title: FlashBlade Pure Storage
short_description: Monitorización del rendimiento y el uso de FlashBlade Pure Storage
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
  description: Monitorización del rendimiento y el uso de FlashBlade Pure Storage
  media:
  - caption: Dashboard de FlashBlade Pure Storage - Información general (arriba)
    image_url: images/FB-overview-1.png
    media_type: imagen
  - caption: Dashboard de FlashBlade Pure Storage - Información general (medio)
    image_url: images/FB-overview-2.png
    media_type: imagen
  - caption: Dashboard de FlashBlade Pure Storage - Información general (abajo)
    image_url: images/FB-overview-3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: FlashBlade Pure Storage
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza el [FlashBlade Pure Storage][1] a través del [Datadog Agent][2] y el [exportador OpenMetrics FlashBlade Pure Storage][3]. 

La integración puede proporcionar datos de rendimiento a nivel de matriz, cliente, partición y nivel de bucket, así como información muy clara sobre capacidad y configuración.

Puedes monitorizar múltiples FlashBlades y agregarlos en un único dashboard o agruparlos según el entorno definido por el cliente.

**Esta integración requiere lo siguiente**:

 - FlashBlade Purity 4.1.x o posterior
 - Datadog Agent v7.26.x o posterior para utilizar OpenMetrics BaseCheckV2
 - Python 3
 - El exportador OpenMetrics FlashBlade Pure Storage v1.0.11 o posterior se instala y ejecuta en un entorno contenedorizado. Para obtener instrucciones de instalación, consulta el [repositorio de GitHub][3].

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][4] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

1. [Descarga e inicia el Datadog Agent][2].
2. Instala manualmente la integración Pure FlashBlade. Para obtener más detalles en función de tu entorno, consulta [Uso de integraciones de la comunidad][5].


#### Host

Para configurar este check para un Agent que se ejecuta en un host, ejecuta `datadog-agent integration install -t datadog-purefb==2.0.0`.


### Configuración

1. Crea un usuario local en tu FlashBlade con el rol de sólo lectura y genera un token de API para este usuario.

2. Añade el siguiente bloque de configuración al archivo `purefb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de PureFB. Para conocer todas las opciones de configuración disponibles, consulta el [purefb.d/conf.yaml de ejemplo][6].

**Nota**: La creación de tu archivo de configuración requiere el endpoint `/array` como mínimo absoluto.

```yaml
init_config:
   timeout: 120

instances:

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/array?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 120

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/clients?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

  - openmetrics_endpoint: http://<exporter_ip_or_fqdn>:<port>/metrics/usage?endpoint=<array_ip_or_fqdn>
    tags:
       - env:<env>
       - fb_array_name:<full_fqdn>
       - host:<full_fqdn>
    headers:
       Authorization: Bearer <api_token>
    min_collection_interval: 600

```

2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `purefb` en la sección Checks.

### Resolución de problemas

#### Las matrices no se muestran en el dashboard

Los dashboards incluidos en esta integración utilizan las etiquetas (tags) `env` , `host` y `fb_array_name`. Asegúrate de que están configurados por cada instancia.

```yaml
 tags:
    - env:<env>
    - fb_array_name:<full_fqdn>
    - host:<full_fqdn>
```

#### Aumento del intervalo de recopilación

Para el endpoint `/array`, el check de FlashBlade Pure Storage configura `min_collection_interval` como `120` por defecto y el valor mínimo recomendado es `15`. Si es necesario:, puedes aumentar o disminuir `min_collection_interval` en el archivo `purefb.d/conf.yaml`:

```yaml
min_collection_interval: 120
```

Para los endpoints `/clients` y `/usage`, el check de FlashBlade Pure Storage configura `min_collection_interval` como `600` por defecto y el valor mínimo recomendado es `120`. Si es necesario, puedes aumentar o disminuir `min_collection_interval` en el archivo `purefb.d/conf.yaml`:

```yaml
min_collection_interval: 600
```


## Datos recopilados

### Métricas
{{< get-metrics-from-git "purefb" >}}


### Eventos

La integración PureFB no incluye eventos.

### Checks de servicio

Para ver una lista de los checks de servicio proporcionados por esta integración, consulta [service_checks.json][10].

## Agent

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Pure Storage utilizando los siguientes métodos:
* Correo electrónico: pure-observability@purestorage.com
* Slack: [Código Pure Storage//Canal de observabilidad][11].

[1]: https://www.purestorage.com/products.html
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/PureStorage-OpenConnect/pure-fb-openmetrics-exporter
[4]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/community-integrations-installation-with-docker-agent
[6]: https://github.com/DataDog/integrations-extras/blob/master/purefb/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/purefb/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/purefb/assets/service_checks.json
[11]: https://code-purestorage.slack.com/messages/C0357KLR1EU