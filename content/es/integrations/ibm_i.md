---
app_id: ibm-i
app_uuid: 30045928-4be2-4efd-9a08-160e904494a1
assets:
  dashboards:
    IBM i Overview: assets/dashboards/ibm_i_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ibm_i.system.cpu_usage
      metadata_path: metadata.csv
      prefix: ibm_i.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10219
    source_type_name: IBM i
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_i/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_i
integration_id: ibm-i
integration_title: IBM i
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: ibm_i
public_title: IBM i
short_description: Monitoriza sistemas IBM i de forma remota, incluyendo tareas, colas
  de tareas, ASP y más.
supported_os:
- Linux
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Categoría::Sistema operativo y sistema
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza sistemas IBM i de forma remota, incluyendo tareas, colas
    de tareas, ASP y más.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: IBM i
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [IBM i][1] de forma remota a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

**Nota**: Este check no está disponible en Windows, ya que utiliza la llamada al sistema `fcntl()`, que es específica de sistemas operativos tipo Unix.

### Instalación

El check de IBM i está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

#### Controlador ODBC

El check de IBM i utiliza el controlador ODBC de IBM i para conectarse de forma remota al host IBM i.

Descarga el controlador desde la página [IBM i Acceso - Soluciones de clientes][4]. Haz clic en `Downloads for IBM i Access Client Solutions` e inicia sesión para acceder a la página de descargas.

Elige el paquete `ACS App Pkg` para tu plataforma, como `ACS Linux App Pkg` para hosts Linux. Descarga el paquete y sigue las instrucciones de instalación para instalar el controlador.

### Configuración

El check de IBM i consulta un sistema IBM i de forma remota, desde un host que ejecuta el Datadog Agent. Para comunicarte con el sistema IBM i, debes configurar el controlador ODBC de IBM i en el host que ejecuta el Datadog Agent.

#### Controlador ODBC

Una vez instalado el controlador ODBC, busca los archivos de configuración de ODBC: `odbc.ini` y `odbcinst.ini`. Las localizaciones pueden variar en función de tu sistema. En Linux, pueden estar en el directorio `/etc` o en el directorio `/etc/unixODBC`.

Copia estos archivos de configuración en elentorno del Agent integrado, como `/opt/datadog-agent/embedded/etc/` en hosts Linux.

El archivo `odbcinst.ini` define los controladores ODBC disponibles para el Agent. Cada sección define un controlador. Por ejemplo, la siguiente sección define un controlador denominado `IBM i Access ODBC Driver 64-bit`:
```
[IBM i Access ODBC Driver 64-bit]
Description=IBM i Access for Linux 64-bit ODBC Driver
Driver=/opt/ibm/iaccess/lib64/libcwbodbc.so
Setup=/opt/ibm/iaccess/lib64/libcwbodbcs.so
Threading=0
DontDLClose=1
UsageCount=1
```

El nombre del controlador ODBC de IBM i es necesario para configurar el check de IBM i.

#### Check de IBM i

1. Edita el archivo `ibm_i.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de IBM i. Consulta el [ibm_i.d/conf.yaml de ejemplo][5] para conocer todas las opciones de configuración disponibles.
   Utiliza el nombre del controlador del archivo `obdcinst.ini`.

2. [Reinicia el Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `ibm_i` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ibm-i" >}}


### Eventos

El check de IBM i no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

[1]: https://www.ibm.com/it-infrastructure/power/os/ibm-i
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://www.ibm.com/support/pages/ibm-i-access-client-solutions
[5]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/