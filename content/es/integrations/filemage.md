---
app_id: filemage
app_uuid: e8ffcc16-9430-4d73-8e01-4e135a872384
assets:
  dashboards:
    Filemage Overview Dashboard: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: filemage.ftp.get
      metadata_path: metadata.csv
      prefix: filemage.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10319
    source_type_name: filemage
  logs:
    source: filemage
author:
  homepage: https://dopensource.com/
  name: Comunidad
  sales_email: info@dopensource.com
  support_email: tmoore@dopensource.com
categories:
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/filemage/README.md
display_on_public_website: true
draft: false
git_integration_title: filemage
integration_id: filemage
integration_title: FileMage
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: filemage
public_title: FileMage
short_description: Monitoring Agent para servicios de FileMage
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoring Agent para servicios de FileMage
  media:
  - caption: Logotipo de carrusel
    image_url: images/carousel-logo.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: FileMage
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [FileMage][1].

## Configuración

### Instalación del paquete

Para el Datadog Agent v7.21 o v6.21 y posteriores, sigue estas instrucciones para instalar la integración de Filemage en tu host.  
Consulta [Utilizar integraciones comunitarias][2] para instalarlo con el Docker Agent o versiones anteriores del Datadog Agent .  

1. Ejecuta el siguiente comando para instalar la integración del Agent:

```shell
datadog-agent integration install -t datadog-filemage==1.0.0
```

2. Configura tu integración similar a una [integración][3] basada en el Agent.

### Configuración

1. Edita el archivo `filemage.d/conf.yaml.example` en la carpeta `conf.d/` en la raíz de tu [directorio de la configuración del Agent][4] para empezar a recopilar tus [métricas](#metrics) de FileMaage.
   Una vez finalizado, guarda el archivo modificado como `filemage.d/conf.yaml`. 
   Consulta el [ejemplo de filemage conf.yaml][5] para ver todas las opciones disponibles de la configuración.

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando `status` del Agent][7] y busca `filemage` en la sección Ejecutar checks.


```text
...

  Running Checks
  ==============

    ...

    filemage (1.0.0)
    ----------------
      Instance ID: filemage:ac55127bf7bd70b9 [OK]
      Configuration Source: file:/etc/datadog-agent/conf.d/filemage.d/conf.yaml
      Total Runs: 1,298
      Metric Samples: Last Run: 0, Total: 0
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 2, Total: 2,594
      Average Execution Time : 41ms
      Last Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
      Last Successful Execution Date : 2022-11-23 15:59:22 EST / 2022-11-23 20:59:22 UTC (1669237162000)
```


## Datos recopilados

Esta integración rastrea el número de veces que se ejecuta cada comando de FTP.

### Métricas
{{< get-metrics-from-git "filemage" >}}


### Eventos

La integración de FileMage no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [dOpenSource][10].


[1]: https://www.filemage.io/
[2]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[3]: https://docs.datadoghq.com/es/getting_started/integrations/
[4]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-extras/blob/master/filemage/datadog_checks/filemage/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/filemage/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/filemage/assets/service_checks.json
[10]: https://dopensource.com/