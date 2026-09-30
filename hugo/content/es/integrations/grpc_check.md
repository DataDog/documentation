---
app_id: grpc-check
app_uuid: f0317cd5-e4b9-4147-998e-25c69fad94ed
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - grpc_check.healthy
      - grpc_check.unhealthy
      metadata_path: metadata.csv
      prefix: grpc_check.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10296
    source_type_name: gRPC check
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: help@datadoghq.com
  support_email: keisuke.umegaki.630@gmail.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/grpc_check/README.md
display_on_public_website: true
draft: false
git_integration_title: grpc_check
integration_id: grpc-check
integration_title: Mantenimiento de gRPC
integration_version: 1.0.2
is_public: true
manifest_version: 2.0.0
name: grpc_check
public_title: Mantenimiento de gRPC
short_description: Monitorización de servidores de gRPC basados en el protocolo de
  check de mantenimiento de gRPC
supported_os:
- linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitorización de servidores de gRPC basados en el protocolo de check
    de mantenimiento de gRPC
  media: []
  overview: README.md#Overview
  support: README.md#Troubleshooting
  title: Mantenimiento de gRPC
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza los endpoints que implementan el [protocolo de check de mantenimiento de gRPC][1] a través del Datadog Agent .

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos de contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

#### Host

Para instalar el check de grpc_check en tu host:

```bash
sudo -u dd-agent datadog-agent integration install -t datadog-grpc-check==1.0.2
```

#### Dockerfile

Crea la imagen del Agent con este Dockerfile.

```Dockerfile
FROM datadog/agent:7
RUN agent integration install -r -t datadog-grpc-check==1.0.2 \
  && /opt/datadog-agent/embedded/bin/pip3 install grpcio grpcio-health-checking
```

### Configuración

1. Edita el archivo `grpc_check.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de grpc_check. Consulta el [ejemplo de grpc_check.d/conf.yaml][3] para todas las opciones disponibles de configuración.

2. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `grpc_check` en la sección checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "grpc-check" >}}


### Eventos

La integración de grpc_check no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "grpc-check" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

[1]: https://github.com/grpc/grpc/blob/master/doc/health-checking.md
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/datadog_checks/grpc_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/metadata.csv
[7]: https://github.com/DataDog/integrations-extras/blob/master/grpc_check/assets/service_checks.json
[8]: https://app.datadoghq.com/help@datadoghq.com