---
app_id: ibm-ace
app_uuid: 81e0df5f-8778-4558-88c3-884dcab5ce89
assets:
  dashboards:
    IBM ACE Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_ace.messages.current
      metadata_path: metadata.csv
      prefix: ibm_ace.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10262
    source_type_name: IBM ACE
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_ace/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_ace
integration_id: ibm-ace
integration_title: IBM ACE
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_ace
public_title: IBM ACE
short_description: Monitoriza estadísticas de recursos y flujos de mensajes de IBM
  ACE.
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
  description: Monitoriza estadísticas de recursos y flujos de mensajes de IBM ACE.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: IBM ACE
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [IBM ACE][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos contenedorizados, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### IBM MQ

Se necesita un servidor [IBM MQ][3] para consumir mensajes de métrica de IBM ACE.

<div class="alert alert-danger">
Para Linux, asegúrate de establecer la variable de entorno LD_LIBRARY_PATH como se describe en la <a href="https://docs.datadoghq.com/integrations/ibm_mq/">configuración de IBM MQ</a> antes de continuar.
</div>

### IBM ACE

1. Asegúrate de que está instalada al menos la versión 12.0.2.0.
2. Aplica un archivo de [política MQEndpoint][4] cuyo nombre sea `<MQ_POLICY_NAME>.policyxml` y que tenga el siguiente aspecto:
    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <policies>
        <policy policyType="MQEndpoint" policyName="<MQ_POLICY_NAME>" policyTemplate="MQEndpoint">
            <connection>CLIENT</connection>
            <destinationQueueManagerName>...</destinationQueueManagerName>
            <queueManagerHostname>...</queueManagerHostname>
            <listenerPortNumber>1414</listenerPortNumber>
            <channelName>...</channelName>
            <securityIdentity><MQ_SECURITY_IDENTITY></securityIdentity>
        </policy>
    </policies>
    ```
3. [Establece][5] las credenciales ejecutando: `mqsisetdbparms -n mq::<MQ_SECURITY_IDENTITY> -u <user> -p <password>`
4. Actualiza tu archivo `server.conf.yaml` con la siguiente configuración:
    ```yaml
    remoteDefaultQueueManager: '{DefaultPolicies}:<MQ_POLICY_NAME>'
    Events:
      OperationalEvents:
        MQ:
          enabled: true
      BusinessEvents:
        MQ:
          enabled: true
          outputFormat: json
    Statistics:
      Resource:
        reportingOn: true
      Snapshot:
        publicationOn: active
        outputFormat: json
        accountingOrigin: basic
        nodeDataLevel: advanced
        threadDataLevel: basic
    Monitoring:
      MessageFlow:
        publicationOn: active
        eventFormat: MonitoringEventV2
    AdminLog:
      enabled: true
      fileLog: true
      consoleLog: true
      consoleLogFormat: ibmjson
    ```
5. Reinicia IBM ACE.

### Instalación

El check de IBM ACE está incluido en el paquete del [Datadog Agent][6].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `ibm_ace.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent para comenzar a recopilar tus datos de rendimiento ibm_ace. Consulta el [ibm_ace.d/conf.yaml de ejemplo][7] para ver todas las opciones disponibles de configuración.

2. [Reinicia el Agent][8].

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `ibm_ace` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ibm-ace" >}}


### Eventos

La integración de IBM ACE no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "ibm-ace" >}}


### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Para empezar a recopilar tus logs de IBM ACE, añade este bloque de configuración a tu archivo `ibm_ace.d/conf.yaml`:

    ```yaml
    logs:
      - type: file
        path: /home/aceuser/ace-server/log/integration_server.txt
        source: ibm_ace
    ```

    Cambia el valor del parámetro `path` en función de tu entorno. Consulta el [archivo de ejemplo `ibm_ace.d/conf.yaml`][7] para ver todas las opciones disponibles de configuración.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][12].


[1]: https://www.ibm.com/docs/en/app-connect/12.0?topic=overview-app-connect-enterprise-introduction
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://www.ibm.com/products/mq
[4]: https://www.ibm.com/docs/en/app-connect/12.0?topic=properties-mqendpoint-policy
[5]: https://www.ibm.com/docs/en/app-connect/12.0?topic=mq-connecting-secured-queue-manager
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/datadog_checks/ibm_ace/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/ibm_ace/assets/service_checks.json
[12]: https://docs.datadoghq.com/es/help/