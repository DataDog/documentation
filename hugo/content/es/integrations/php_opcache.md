---
app_id: PHP-opcache
app_uuid: 392e54ac-60d4-4225-ab5a-d75245e0ea06
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_opcache.memory_usage.used_memory
      metadata_path: metadata.csv
      prefix: php_opcache.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10141
    source_type_name: OPcache de PHP
  monitors:
    OPcache is full: assets/monitors/php-opcache_expunges.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md
display_on_public_website: true
draft: false
git_integration_title: php_opcache
integration_id: PHP-opcache
integration_title: OPcache de PHP
integration_version: 0.0.1
is_public: true
manifest_version: 2.0.0
name: php_opcache
public_title: OPcache de PHP
short_description: Monitoriza el sistema de caché de código de bytes OPcache de PHP.
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el sistema de caché de código de bytes OPcache de PHP.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: OPcache de PHP
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [OPcache de PHP][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

Para instalar el check `php_opcache` en tu host:


1. Instala el [kit de herramientas para desarrolladores][3].
 en cualquier máquina.

2. Ejecuta `ddev -e release build php_opcache` para compilar el paquete.

3. [Descarga el Datadog Agent][4].

4. Sube el artefacto de compilación a cualquier host con un Agent y
 ejecuta `datadog-agent integration install -w
 path/to/php_opcache/dist/<ARTIFACT_NAME>.whl`.

#### OPcache

OPcache no expone métricas de forma predeterminada, por lo que esta integración incluye un exportador de métricas, ubicado aquí:

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
Puedes descargar el exportador desde el repositorio [integraciones-extras][5] de Datadog.

Cuando [configures](#configuration) tu Agent, haz referencia al exportador directamente por este nombre de archivo o configura un alias para él en tu servidor web. Por ejemplo, si utilizas Apache, el alias en el archivo de configuración del servidor web sería el siguiente:

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### Configuración

1. Edita el archivo `php_opcache.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar los datos de rendimiento de `php_opcache`. Consulta el [archivo `php_opcache.d/conf.yaml` de ejemplo][6] para conocer todas las opciones de configuración disponibles.
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [Reinicia el Agent][7].

### Validación

[Ejecuta el subcomando de estado del Agent][8] y busca `php_opcache` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "php-opcache" >}}


### Eventos

La integración OPcache de PHP no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "php-opcache" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].


[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/es/developers/integrations/python/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/