---
app_id: kernelcare
app_uuid: 7bfd2b8a-d461-4890-aeba-f1e9eab617c7
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: kernelcare.uptodate
      metadata_path: metadata.csv
      prefix: kernelcare.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10109
    source_type_name: Kernelcare
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: CloudLinux
  sales_email: schvaliuk@cloudlinux.com
  support_email: schvaliuk@cloudlinux.com
categories:
- sistema operativo y sistema
- seguridad
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/kernelcare/README.md
display_on_public_website: true
draft: false
git_integration_title: kernelcare
integration_id: kernelcare
integration_title: Kernelcare
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: kernelcare
public_title: Kernelcare
short_description: Monitoriza las métricas de actividad y estado del servidor de kernelcare.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::OS & System
  - Category::Security
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza las métricas de actividad y estado del servidor de kernelcare.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Kernelcare
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

[KernelCare][1] es un sistema para parchear en vivo que aplica automáticamente parches de seguridad a las vulnerabilidades del kernel de Linux, sin reinicios. Se utiliza en más de 500 000 servidores y se ha utilizado para parchear servidores en funcionamiento durante más de 6 años para Dell, Zoom y otras empresas. Funciona con las principales distribuciones de Linux, como RHEL, CentOS, Amazon Linux, y Ubuntu, e interopera con los escáneres de vulnerabilidades habituales, las herramientas de monitorización en la nube y las soluciones de gestión de parches.

Esta integración te permite reenviar métricas de Kernelcare a través del Datadog Agent.

## Configuración

El check de Kernelcare no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Instalación

Para Agent v7.21+/v6.21+, sigue las siguientes instrucciones para instalar el check de Kernelcare en tu host. Consulta [Usar integraciones de la comunidad][3] para instalar con el Docker Agent o versiones anteriores del Agent.

1. Ejecuta el siguiente comando para instalar la integración del Agent:

   ```shell
   datadog-agent integration install -t datadog-kernelcare==<INTEGRATION_VERSION>
   ```

2. Configura tu integración como si fuese una [integración][4] de base.

### Configuración

1. Edita el archivo `kernelcare.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de la configuración de directorio de tu Agent para empezar a recopilar tus datos de rendimiento de kernelcare. Consulta el [ejemplo kernelcare.d/conf.yaml][5] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][6].

### Validación

Ejecuta el [subcomando de estado del Agent][7] y busca `kernelcare` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "kernelcare" >}}


### Eventos

La integración de Kernelcare no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "kernelcare" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.kernelcare.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/es/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/datadog_checks/kernelcare/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/kernelcare/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/