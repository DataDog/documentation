---
app_id: resin
app_uuid: ff99886d-87b7-407a-aa90-7bea5ca27564
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: resin.thread_pool.thread_count
      metadata_path: metadata.csv
      prefix: resin.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10203
    source_type_name: Resin
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Comunidad
  sales_email: brent@bmontague.com
  support_email: brent@bmontague.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resin/README.md
display_on_public_website: true
draft: false
git_integration_title: resin
integration_id: resin
integration_title: Resin
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: resin
public_title: Resin
short_description: Rastrea la configuración del grupo de subprocesos y del grupo de
  conexiones con resin
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea la configuración del grupo de subprocesos y del grupo de conexiones
    con resin
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Resin
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Este check monitoriza [Resin][1] a través del Datadog Agent.

## Configuración

### Instalación

El check de Resin no está incluido en el paquete del [Datadog Agent][2], por lo que es necesario instalarlo.

### Configuración

1. Configura el [servidor por defecto de resin][3] para habilitar JMX añadiendo los siguientes argumentos de JVM:

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. Edita el archivo `resin.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para empezar a recopilar los datos de rendimiento de resin. Consulta el [resin.d/conf.yaml de ejemplo][2] para conocer todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `resin` en la sección Checks.

### Recopilación de logs

Habilita la recopilación de logs para Datadog Agent en `/etc/datadog-agent/datadog.yaml` en plataformas Linux. En otras plataformas, consulta la [guía de archivos de configuración del Agent][6] para la localización de tu archivo de configuración:

```yaml
logs_enabled: true
```

- Habilita este bloque de configuración en tu archivo `resin.d/conf.yaml` para empezar a recopilar logs:
    ```yaml
    logs:
      - type: file
        path: /var/opt/resin/log/*.log
        source: resin
    ```

## Datos recopilados

### Métricas
{{< get-metrics-from-git "resin" >}}


### Eventos

Resin no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "resin" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-extras/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/