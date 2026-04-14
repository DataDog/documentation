---
app_id: microsoft-sysmon
app_uuid: 76dd5a2d-68d8-4acf-b066-ba00c1524694
assets:
  dashboards:
    Microsoft Sysmon - Overview: assets/dashboards/microsoft_sysmon_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    source_type_id: 42258945
    source_type_name: Microsoft Sysmon
  logs:
    source: microsoft-sysmon
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
- https://github.com/DataDog/integrations-core/blob/master/microsoft_sysmon/README.md
display_on_public_website: true
draft: false
git_integration_title: microsoft_sysmon
integration_id: microsoft-sysmon
integration_title: Microsoft Sysmon
integration_version: 1.0.0
is_public: true
manifest_version: 2.0.0
name: microsoft_sysmon
public_title: Microsoft Sysmon
short_description: Obtén información sobre eventos de actividad del sistema en Windows.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Windows
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Oferta::Integración
  - Tipo de datos enviados::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre eventos de actividad del sistema en Windows.
  media:
  - caption: Microsoft Sysmon - Información general 1
    image_url: images/microsoft_sysmon_overview_1.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 2
    image_url: images/microsoft_sysmon_overview_2.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 3
    image_url: images/microsoft_sysmon_overview_3.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 4
    image_url: images/microsoft_sysmon_overview_4.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 5
    image_url: images/microsoft_sysmon_overview_5.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 6
    image_url: images/microsoft_sysmon_overview_6.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 7
    image_url: images/microsoft_sysmon_overview_7.png
    media_type: imagen
  - caption: Microsoft Sysmon - Información general 8
    image_url: images/microsoft_sysmon_overview_8.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Sysmon
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

[Microsoft Sysmon][1] es un servicio de sistema y un controlador de dispositivos de Windows que proporciona una generación de logs detallada de la actividad del sistema, incluida la creación de procesos, las conexiones de red, las modificaciones de archivos y los cambios en el registro.

Esta integración enriquece e ingiere [logs de eventos Sysmon][2]. Utiliza el dashboard predefinido para obtener una vista clara de los eventos de Sysmon y ayudar a los equipos de seguridad a monitorizar la actividad del sistema.

## Configuración

### Instalación

Para instalar la integración de Microsoft Sysmon, ejecuta el siguiente comando de instalación del Agent y los pasos que se indican a continuación. Para obtener más información, consulta la documentación [Gestión de integraciones][3].

**Nota**: Este paso no es necesario para versiones >= 7.66.0. del Agent.

Ejecuta powershell.exe como administrador y ejecuta el siguiente comando:
  ```powershell
  & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" integration install datadog-microsoft_sysmon==1.0.0
  ```

### Configuración

#### Configurar la recopilación de logs

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Habilítalo en el archivo `datadog.yaml` con:

    ```yaml
      logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `microsoft_sysmon.d/conf.yaml` para empezar a recopilar logs de Microsoft Sysmon:

    ```yaml
      logs:
      - type: windows_event
        channel_path: "Microsoft-Windows-Sysmon/Operational"
        source: microsoft-sysmon
        service: microsoft-sysmon
        sourcecategory: windowsevent
    ```

3. [Reinicia el Agent][4].

#### Configurar Sysmon

Sigue estos pasos para instalar Sysmon:
1. Descarga el archivo zip desde la [página de descargas de Sysmon][1]. Extrae el contenido del archivo zip.
2. Crea un archivo XML para configurar Sysmon. Por ejemplo, si quieres monitorizar procesos creados por aplicaciones desde carpetas AppData, el archivo de configuración tendrá el aspecto que se muestra a continuación. Puedes añadir más filtros de eventos bajo la etiqueta (tag) `EventFiltering` XML para otros eventos de la misma manera.

  ```xml
    <Sysmon schemaversion="4.90">
        <EventFiltering>
          <ProcessCreate onmatch="include">
              <Image condition="contains">C:\Users\*\AppData\Local\Temp\</Image>
              <Image condition="contains">C:\Users\*\AppData\Roaming\</Image>
          </ProcessCreate>
        </EventFiltering>
    </Sysmon>
  ```

3. Ejecuta el comando como administrador desde la carpeta extraída:

  ```powershell
    .\Sysmon -i [<configfile>]
  ```

**Nota:** Sysmon es altamente configurable utilizando el archivo de configuración (XML) que te permite:
- Controlar qué eventos monitorizar
- Filtrar eventos en función de procesos, rutas, etc.

Habilitar demasiados tipos de eventos puede provocar una ingesta excesiva de datos. Solo los eventos de seguridad críticos deben ser habilitados en función del modelo de amenaza y las necesidades de monitorización.
Estos eventos deben habilitarse de forma selectiva para directorios, procesos y usuarios críticos del sistema a fin de evitar el ruido innecesario de los logs.

Para obtener más información sobre la configuración, consulta la [documentación de Sysmon][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `microsoft_sysmon` en la sección Checks.

## Datos recopilados

### Logs

La integración de Microsoft Sysmon recopila los siguientes [logs de eventos Sysmon][2]:
- Logs de actividad de procesos
- Logs de actividad de redes
- Logs de actividad de archivos
- Logs de actividad de registros
- Logs de actividad de WMI
- Logs de actividad de servicios Sysmon
- Logs de actividad de canalizaciones y portapapeles nombrados

### Métricas

La integración Microsoft Sysmon no incluye métricas.

### Eventos

La integración Microsoft Sysmon no incluye eventos.

### Checks de servicio

La integración Microsoft Sysmon no incluye checks de servicios.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

[1]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon
[2]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#events
[3]: https://docs.datadoghq.com/es/agent/guide/integration-management/?tab=windowspowershell#install
[4]: https://docs.datadoghq.com/es/agent/configuration/agent-commands/#restart-the-agent
[5]: https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon#configuration-files
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/