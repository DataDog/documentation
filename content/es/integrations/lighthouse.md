---
app_id: lighthouse
app_uuid: e61bdb03-995f-4f46-8b14-afd59e35453b
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: lighthouse.performance
      metadata_path: metadata.csv
      prefix: lighthouse.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10199
    source_type_name: Lighthouse
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: mustin.eric@gmail.com
  support_email: mustin.eric@gmail.com
categories:
- herramientas de desarrollo
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/lighthouse/README.md
display_on_public_website: true
draft: false
git_integration_title: lighthouse
integration_id: lighthouse
integration_title: Lighthouse
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: lighthouse
public_title: Lighthouse
short_description: Estadísticas de auditoría de Google Lighthouse
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas de desarrollo
  - Sistema operativo compatible::Linux
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Estadísticas de auditoría de Google Lighthouse
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Lighthouse
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Información general

Obtén métricas de [Google Chrome Lighthouse][1] en tiempo real para:

- Visualizar y monitorizar estadísticas de Lighthouse.
- Realizar un seguimiento y auditar las puntuaciones de accesibilidad de tus sitios web, las prácticas recomendadas, el rendimiento, las PWA y las puntuaciones de auditorías SEO.

## Configuración

El check de Lighthouse no está incluido en el paquete del [Datadog Agent][2], por lo que necesitas instalarlo.

### Instalación

Para el Agent v7.21/v6.21 y posteriores, sigue las siguientes instrucciones para instalar el check de Lighthouse en tu host. Para realizar la instalación con el Docker Agent o versiones anteriores del Agent, consulta el [uso de integraciones de la comunidad][3].

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-lighthouse==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `lighthouse.d/conf.yaml`, en la carpeta `conf.d/` de la raíz del [directorio de configuración de tu Agent][5] para comenzar a recopilar tus [métricas](#metrics) Lighthouse.
   Para ver todas las opciones de configuración disponibles, consulta el [ejemplo lighthouse.d/conf.yaml][6].

2. [Reinicia el Agent][7].

### Requisitos

1. Node.js LTS (v8.9 o posterior). 
   - Verifica si Node.js y npm están instalados:

   ```shell
   node -v
   npm -v
   ```

   - Si no lo están, [instala Node.js y npm][8].

2. [Lighthouse][9]:
   - Verifica si está instalado.

   ```shell
   # example
   root@hostname:~# npm list -g --depth=0 | grep 'lighthouse'
   |_ lighthouse@5.6.0
   ```

   - Si no lo está, instálalo (no hay resultado del comando anterior):
   ```shell
   npm install -g lighthouse
   ```


3. Google Chrome/Chromium o Puppeteer.

   - [Chromium][10]
      + Debian/Ubuntu

      ```shell
      sudo apt-get update
      sudo apt-get install -y chromium-browser
      ```

      + RHEL/CentOS

      ```shell
      sudo yum install -y epel-release
      sudo yum install -y chromium
      ```

      **Nota**: Esta integración ejecuta Chrome/Chromium en modo headless. Chrome/Chromium puede requerir kernel 4.4 o posterior en RHEL/CentOS para que el modo headless funcione correctamente.

   - [Puppeteer][11]
      + Verifica si está instalado.

      ```shell
      # example
      root@hostname:~# npm list -g --depth=0 | grep 'puppeteer'
      |_ puppeteer@1.12.2
      ```

      + Si no lo está, instálalo (no hay resultado del comando anterior):

      ```shell
      npm install -g puppeteer --unsafe-perm=true
      ```

4. Verifica si el usuario `dd-agent` puede ejecutar la CLI de Lighthouse.

   ```shell
   sudo -u dd-agent lighthouse <WEB_URL> --output json --quiet --chrome-flags='--headless'
   ```

### Validación

[Ejecuta el subcomando `status` del Agent][12] y busca `lighthouse` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "lighthouse" >}}


### Eventos

La integración de Lighthouse no incluye eventos.

### Checks de servicio

La integración de Lighthouse no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][14].

[1]: https://developers.google.com/web/tools/lighthouse
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://nodejs.org/en/download
[9]: https://github.com/GoogleChrome/lighthouse
[10]: https://www.chromium.org/
[11]: https://github.com/GoogleChrome/puppeteer
[12]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-extras/blob/master/lighthouse/datadog_checks/lighthouse/metadata.csv
[14]: https://docs.datadoghq.com/es/help/