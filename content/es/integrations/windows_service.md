---
app_id: windows-service
app_uuid: 1d895e93-d6f1-49f9-82bc-a03df7ff215c
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 112
    source_type_name: Servicio de Windows
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_service/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_service
integration_id: windows-service
integration_title: Servicios de Windows
integration_version: 6.2.0
is_public: true
manifest_version: 2.0.0
name: windows_service
public_title: Servicios de Windows
short_description: Monitoriza el estado de tus servicios de Windows.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::Sistema operativo y sistema
  - Category::Windows
  - Offering::Integración
  configuration: README.md#Configuración
  description: Monitoriza el estado de tus servicios de Windows.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-windows-server-2012
  - resource_type: blog
    url: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
  - resource_type: blog
    url: https://www.datadoghq.com/blog/windows-server-monitoring
  support: README.md#Soporte
  title: Servicios de Windows
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza el estado de cualquier Servicio de Windows y envía un check del servicio a Datadog.

## Configuración

### Instalación

El check de servicio de Windows está instalado por defecto con el [Agent][1], pero no está configurado. Consulta la siguiente sección para configurar el check.

### Configuración

La configuración se encuentra en el archivo `windows_service.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2]. Consulta el [windows_service.d/conf.yaml de ejemplo][3] para todas las opciones de configuración disponibles. Cuando termines de editar el archivo de configuración, [reinicia el Agent][4] para cargar la nueva configuración.

El check puede monitorizar todos los servicios en el sistema o monitorizar de forma selectiva unos pocos servicios por nombre. A partir del Agent v7.41, el check puede seleccionar qué servicios monitorizar en función de su tipo de inicio.

Este ejemplo de configuración sólo monitoriza los servicios `Dnscache` y `wmiApSrv`:
```yaml
instances:
  - services:
    - dnscache
    - wmiapsrv
```

Este ejemplo utiliza la palabra clave `ALL` para monitorizar todo los servicios en el host. Si se utiliza la palabra clave `ALL`, se ignoran los demás patrones de la instancia.
```yaml
instances:
  - services:
    - ALL
```

El check utiliza [expresiones regulares Python][5] que no distinguen entre mayúsculas y minúsculas para emparejar nombres de servicios. Si un nombre de servicio incluye caracteres especiales, debes escapar los caracteres especiales con un `\`. Por ejemplo, `MSSQL$CRMAWS` se convierte en `MSSQL\$CRMAWS` y `Web Server (prod)` se convierte en `Web Server \(prod\)`. El patrón de nombres de servicios coincide con todos los nombres de servicios que empiezan con el patrón. Para obtener una coincidencia exacta, utiliza la expresión regular `^service$`.

Indica los nombres de los servicios tal y como aparecen en el campo del nombre del servicio, **NO** en el campo del nombre que se va a mostrar. Por ejemplo, configura el nombre del servicio `datadogagent` **NO** el nombre que se va a mostrar `Datadog Agent`.

<p align="center">
<img alt="Datadog Agent service properties" src="https://raw.githubusercontent.com/DataDog/integrations-core/master/windows_service/images/service-properties.png"/>
</p>

A partir del Agent v7.41, el check puede seleccionar qué servicios monitorizar en función de su tipo de inicio.
Por ejemplo, para monitorizar sólo los servicios que tienen un tipo de inicio `automatic` o `automatic_delayed_start`.
```yaml
instances:
  - services:
    - startup_type: automatic
    - startup_type: automatic_delayed_start
```

Los valores posibles para `startup_type` son:
- `disabled`
- `manual`
- `automatic`
- `automatic_delayed_start`

A partir del Agent v7.50, el check puede seleccionar qué servicios monitorizar en función de si tienen un [activador de servicio asignado][6].
A continuación se muestran algunos ejemplos de posibles configuraciones.
```yaml
# Matches all services that do not have a trigger
services:
  - trigger_start: false

# Matches all services with an automatic startup type and excludes services with triggers
services:
  - startup_type: automatic
    trigger_start: false

# Only matches EventLog service when its startup type is automatic and has triggers
services:
  - name: EventLog
    startup_type: automatic
    trigger_start: true
```

#### Etiquetas (Tags)

El check etiqueta automáticamente cada check de servicio con el nombre del servicio de Windows en la etiqueta `windows_service:<SERVICE>`. El nombre `<SERVICE>` en la etiqueta utiliza minúsculas y los caracteres especiales se sustituyen por guiones bajos. Para obtener más información, consulta [Empezando con etiquetas][7].

**NOTA:** El check también etiqueta automáticamente cada check de servicio con el nombre del servicio de Windows en la etiqueta `service:<SERVICE>`. **Este comportamiento está obsoleto**. En una futura versión del Agent, el check dejará de asignar automáticamente esta etiqueta. Para que el check deje de asignar automáticamente esta etiqueta y desactivar el aviso de obsolescencia asociado, activa la opción `disable_legacy_service_tag`. Para obtener información sobre cómo asignar la etiqueta `service` a un servicio, consulta [Asignación de etiquetas][8].

A partir del Agent v7.40, el check puede añadir una etiqueta `windows_service_startup_type:<STARTUP_TYPE>` a cada check de servicio para indicar el tipo de inicio de servicio. Configura la opción `windows_service_startup_type_tag` para incluir esta etiqueta con cada check de servicio.

A partir del Agent v7.55, el check puede añadir una etiqueta `display_name:<DISPLAY_NAME>` a cada check de servicio para indicar el nombre de servicio que se va a mostrar. Configura la opción `collect_display_name_as_tag` como `true` para incluir esta etiqueta con cada check de servicio.

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `windows_service` en la sección **Checks**.

## Datos recopilados

### Métricas

El check del Servicio de Windows no incluye métricas.

### Eventos

El check del Servicio de Windows no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "windows_service" >}}


## Solucionar problemas

¿Necesitas ayuda? Contacta con el [equipo de asistencia de Datadog][11].

### Permisos de servicio
Si un servicio está presente y coincide con la configuración, pero el Datadog Agent no informa un check de servicio del servicio, el Datadog Agent podría tener permisos insuficientes. Por ejemplo, por defecto el Datadog Agent no tiene acceso al servicio NTDS Active Directory Domain Services. Para comprobarlo, ejecuta el check desde un shell PowerShell **elevado (ejecutado como administrador)**.

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" check windows_service
```
Si el servicio está presente en el resultado, el problema son los permisos. Para conceder el permiso al Datadog Agent, [concede acceso `Read` en el servicio][12] al [usuario del Datadog Agent][13]. Recomendamos [conceder `Read` acceso con la Política de grupo][14] para asegurarte de que los permisos se conserven a través de las actualizaciones de Windows.

## Referencias adicionales

- [Monitorización de Windows Server 2012][15]
- [Recopilación de métricas de Windows Server 2012][16]
- [Monitorización de Windows Server 2012 con Datadog][17]

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/windows_service/datadog_checks/windows_service/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.python.org/3/howto/regex.html#regex-howto
[6]: https://learn.microsoft.com/en-us/windows/win32/services/service-trigger-events
[7]: https://docs.datadoghq.com/es/getting_started/tagging/
[8]: https://docs.datadoghq.com/es/getting_started/tagging/assigning_tags/
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/windows_service/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/
[12]: https://learn.microsoft.com/en-us/troubleshoot/windows-server/windows-security/grant-users-rights-manage-services
[13]: https://docs.datadoghq.com/es/agent/guide/windows-agent-ddagent-user/
[14]: https://learn.microsoft.com/en-US/troubleshoot/windows-server/group-policy/configure-group-policies-set-security
[15]: https://www.datadoghq.com/blog/monitoring-windows-server-2012
[16]: https://www.datadoghq.com/blog/collect-windows-server-2012-metrics
[17]: https://www.datadoghq.com/blog/windows-server-monitoring