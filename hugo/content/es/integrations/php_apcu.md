---
app_id: PHP-apcu
app_uuid: ec09379e-851f-4ecc-be78-de5297087994
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: php_apcu.cache.mem_size
      metadata_path: metadata.csv
      prefix: php_apcu.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10139
    source_type_name: PHP APCu
  monitors:
    Cache is Full: assets/monitors/php-apcu_expunges.json
    Cache usage is high: assets/monitors/php-apcu_high_usage.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: noname@withgod.jp
  support_email: noname@withgod.jp
categories:
- almacenamiento en caché
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md
display_on_public_website: true
draft: false
git_integration_title: php_apcu
integration_id: PHP-apcu
integration_title: PHP APCu
integration_version: 0.0.2
is_public: true
manifest_version: 2.0.0
name: php_apcu
public_title: PHP APCu
short_description: Monitoriza el almacenamiento en caché de datos de memoria de PHP
  APCu.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el almacenamiento en caché de datos de memoria de PHP APCu.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: PHP APCu
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [PHP APCu][1] a través del Datadog Agent.

## Configuración

El check de PHP APCu no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para el Agent v7.21/v6.21 o posteriores, sigue las instrucciones a continuación para instalar el check de PHP APCu en tu host. Para instalarlo con el Agent Docker o versiones anteriores del Agent, consulta [Uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

#### APCu

PHP APCu no expone métricas de forma predeterminada, por lo que esta integración incluye un exportador de métricas, ubicado aquí:

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```

Cuando [configures](#configuration) tu Agent, haz referencia al exportador directamente por este nombre de archivo o configura un alias para él en tu servidor web. Por ejemplo, si utilizas Apache, el alias en el archivo de configuración del servidor web sería el siguiente:

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### Configuración

1. Edita el archivo `php_apcu.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de `php_apcu`. Para conocer todas las opciones de configuración disponibles, consulta el [`php_apcu.d/conf.yaml` de ejemplo][5].
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `php_apcu` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "php_apcu" >}}


### Eventos

La integración PHP APCu no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "php_apcu" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/