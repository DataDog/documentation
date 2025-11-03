---
app_id: ping-federate
app_uuid: 1deb5e7c-e9a9-4566-8d78-12c92d1baff9
assets:
  dashboards:
    PingFederate - Admin: assets/dashboards/ping_federate_admin.json
    PingFederate - Audit: assets/dashboards/ping_federate_audit.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20005886
    source_type_name: PingFederate
  logs:
    source: ping-federate
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ping_federate/README.md
display_on_public_website: true
draft: false
git_integration_title: ping_federate
integration_id: ping-federate
integration_title: PingFederate
integration_version: 2.0.0
is_public: true
manifest_version: 2.0.0
name: ping_federate
public_title: PingFederate
short_description: Obtén información de los logs de PingFederate
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtén información de los logs de PingFederate
  media:
  - caption: 'PingFederate: auditoría'
    image_url: images/ping_federate_audit.png
    media_type: imagen
  - caption: 'PingFederate: administración'
    image_url: images/ping_federate_admin.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: PingFederate
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[PingFederate][1] es un servidor de federación de identidades de nivel empresarial que proporciona un inicio de sesión único (SSO) seguro, autenticación multifactor (MFA) y gestión de identidades federadas a través de varias aplicaciones y servicios.


Esta integración proporciona enriquecimiento y visualización para logs de administración y auditoría. Ayuda a visualizar información detallada sobre los análisis de logs de administración y auditoría utilizando dashboards predefinidos.

## Configuración

### Instalación

Para instalar la integración de PingFederate, ejecuta el siguiente comando de instalación del Agent y los pasos a continuación. Para más información, consulta la documentación [Gestión de integraciones][2].

**Nota**: Este paso no es necesario para el Agent versión >= 7.57.0.

Comando de Linux
  ```shell
  sudo -u dd-agent -- datadog-agent integration install datadog-ping_federate==1.0.0
  ```


### Configuración

### Recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

    ```yaml
      logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `ping_federate.d/conf.yaml` para empezar a recopilar tus logs de PingFederate:

    ```yaml
      logs:
        - type: file
          path:  <pf_install>/pingfederate/log/admin.log
          source: ping-federate
          service: admin

        - type: file
          path:  <pf_install>/pingfederate/log/audit.log
          source: ping-federate
          service: audit
    ```

    **NOTA**: Asegúrate de abordar los siguientes puntos.

    1. Cambia el `<pf_install>` a la localización de tu instalación de PingFederate.

    2. La ruta predeterminada de salida de PingFederate sería `/pingfederate/log` y `filenames` sería `admin.log` y `audit.log`. Si has cambiado la ruta predeterminada y el nombre de archivo, actualiza el parámetro `path` en `conf.yaml` en consecuencia.


3. [Reinicia el Agent][3].
### Validación

[Ejecuta el subcomando de estado del Agent][4] y busca `ping-federate` en la sección Checks.

## Datos recopilados

### Logs

La integración de Ping Federate recopila los siguientes tipos de logs.

| Formato     | Tipos de evento    |
| ---------  | -------------- |
| CEF | administración, auditoría|

### Formatos compatibles de log

#### Admin
Formato por defecto de log:

```
<pattern>%d | %X{user} | %X{roles} | %X{ip} | %X{component} | %X{event} | %X{eventdetailid} | %m%n</pattern>
```

#### Auditoría
Formato por defecto de log:

```
<pattern>%d| %X{trackingid}| %X{event}| %X{subject}| %X{ip} | %X{app}| %X{connectionid}| %X{protocol}| %X{host}| %X{role}| %X{status}| %X{adapterid}| %X{description}| %X{responsetime} %n</pattern>
```

Formato de log de campo adicional: 

```
<pattern>%d| %X{trackingid}| %X{event}| %X{subject}| %X{ip} | %X{app}| %X{connectionid}| %X{protocol}| %X{host}| %X{role}| %X{status}| %X{adapterid}| %X{description}| %X{responsetime}| %X{attrackingid}| %X{attributes}| %X{granttype}| %X{initiator}| %X{inmessagetype}| %X{inresponseto}| %X{localuserid}| %X{requestid}| %X{requeststarttime}| %X{responseid}| %X{stspluginid}| %X{targetsessionid}| %X{authenticationsourceid}| %X{validatorid}| %X{virtualserverid}| %X{connectionname}| %X{httprequestid}%n</pattern>
```


**Nota**: Los campos adicionales sólo se admiten si están configurados en la secuencia anterior. Además, si algún campo no está configurado, la integración no admitirá los campos adicionales.

### Métricas

Ping Federate no incluye ninguna métrica.

### Eventos

La integración de Ping Federate no incluye ningún evento.

### Checks de servicio

La integración de Ping Federate no incluye ningún check de servicio.

## Solucionar problemas

Si ves un error de **Permission denied** (Permiso denegado) durante la monitorización de los archivos de log, debes dar al usuario el permiso de lectura `dd-agent` sobre ellos.

  ```shell
  sudo chown -R dd-agent:dd-agent <pf_install>/pingfederate/log/admin.log
  sudo chown -R dd-agent:dd-agent <pf_install>/pingfederate/log/audit.log
  ```
## Compatibilidad

Si necesitas más ayuda, ponte en contacto con el [soporte de Datadog][5].

[1]: https://docs.pingidentity.com/r/en-us/pingfederate-112/pf_pingfederate_landing_page
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=linux#install
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/es/help/