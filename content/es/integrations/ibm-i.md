---
aliases:
- /es/integrations/ibm_i
app_id: ibm-i
categories:
- sistema operativo y sistema
custom_kind: integración
description: Monitoriza sistemas IBM i de forma remota, incluyendo tareas, colas de
  tareas, ASP y más.
integration_version: 4.1.0
media: []
supported_os:
- linux
- macos
title: IBM i
---
## Información general

Con este check se monitoriza [IBM i](https://www.ibm.com/it-infrastructure/power/os/ibm-i) de forma remota con el Datadog Agent .

## Configuración

Sigue las instrucciones siguientes para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

**Nota**: Este check no está disponible en Windows, ya que utiliza la llamada al sistema `fcntl()`, que es específica de sistemas operativos tipo Unix.

### Instalación

El check de IBM i está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).
No es necesaria ninguna instalación adicional en su servidor.

#### Controlador ODBC

El check de IBM i utiliza el controlador ODBC de IBM i para conectarse remotamente al host de IBM i.

Descarga el controlador desde la page (página) [IBM i Access - Soluciones para el cliente](https://www.ibm.com/support/pages/ibm-i-access-client-solutions). Haz clic en `Downloads for IBM i Access Client Solutions` e inicia sesión para acceder a la page (página) de descargas.

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

1. Edita el archivo `ibm_i.d/conf.yaml`, en la carpeta `conf.d/` de la raíz de tu directorio de configuración del Agent para empezar a recopilar tus datos de rendimiento de IBM i. Consulta el [ejemplo de ibm_i.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_i/datadog_checks/ibm_i/data/conf.yaml.example) para ver todas las opciones de configuración disponibles.
   Utiliza el nombre del controlador del archivo `obdcinst.ini`.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ibm_i` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ibm_i.asp.io_requests_per_s** <br>(gauge) | El número medio de solicitudes de E/S para operaciones de lectura y escritura que se producen por segundo<br>_Mostrado como unidad_. |
| **ibm_i.asp.percent_busy** <br>(gauge) | El porcentaje de tiempo que la unidad de disco está en uso<br>_Mostrado como porcentaje_ |
| **ibm_i.asp.percent_used** <br>(gauge) | El porcentaje consumido de la unidad de disco<br>_Mostrado como porcentaje_. |
| **ibm_i.asp.unit_space_available** <br>(gauge) | El espacio en la unidad disponible para el uso<br>_Mostrado como byte_ |
| **ibm_i.asp.unit_storage_capacity** <br>(gauge) | La capacidad de almacenamiento de la unidad<br>_Mostrado como byte_ |
| **ibm_i.job.active_duration** <br>(gauge) | La cantidad de tiempo que un job (generic) ha estado activo<br>_Mostrado como segundo_ |
| **ibm_i.job.cpu_usage** <br>(gauge) | El uso de la CPU por un job (generic)|
| **ibm_i.job.cpu_usage.pct** <br>(gauge) | El uso de la CPU por un job (generic) como un porcentaje<br>_Mostrado como porcentaje_ |
| **ibm_i.job.jobq_duration** <br>(gauge) | La cantidad de tiempo que un job (generic) ha estado en el estado JOBQ<br>_Mostrado como segundo_ |
| **ibm_i.job.status** <br>(gauge) | Si un job (generic) actualmente está activo o no.|
| **ibm_i.job.temp_storage** <br>(gauge) | La cantidad de almacenamiento temporal que se asigna actualmente a un job (generic)<br> _Mostrado como mebibyte_ |
| **ibm_i.job_queue.held_size** <br>(gauge) | El número de jobs (generic) en estado \*HELD en una cola de jobs (generic)<br> _Mostrado como unidad_. |
| **ibm_i.job_queue.released_size** <br>(gauge) | El número de jobs (generic) en estado \*RELEASED en una cola de jobs (generic)<br> _Mostrado como unidad_. |
| **ibm_i.job_queue.scheduled_size** <br>(gauge) | El número de jobs (generic) en estado \*SCHEDULED en una cola de jobs (generic)<br> _Mostrado como unidad_. |
| **ibm_i.job_queue.size** <br>(gauge) | El número de jobs (generic) en una cola de jobs (generic)<br> _Mostrado como unidad_. |
| **ibm_i.message_queue.critical_size** <br>(gauge) | El número de mensajes críticos en una cola de mensajes del sistema<br>_Mostrado como unidad_. |
| **ibm_i.message_queue.size** <br>(gauge) | El número de mensajes en una cola de mensajes del sistema<br>_Mostrado como unidad_. |
| **ibm_i.pool.defined_size** <br>(gauge) | El tamaño de un pool tal y como se define en el pool compartido, la descripción del subsistema o el valor del sistema QMCHPOOL<br>_Mostrado como mebibyte_ |
| **ibm_i.pool.reserved_size** <br>(gauge) | La cantidad de almacenamiento en un pool reservado para el uso del sistema<br>_Mostrado como mebibyte_ |
| **ibm_i.pool.size** <br>(gauge) | La cantidad de almacenamiento principal en un pool<br>_Mostrado como mebibyte_ |
| **ibm_i.subsystem.active** <br>(gauge) | Si un subsistema está activo actualmente|
| **ibm_i.subsystem.active_jobs** <br>(gauge) | El número de jobs (generic) activos actualmente en un subsistema<br>_Mostrado como unidad_ |
| **ibm_i.system.configured_cpus** <br>(gauge) | El número total de CPU configuradas para la partición.<br>_Mostrado como unidad_ |
| **ibm_i.system.cpu_usage** <br>(gauge) | La utilización media de la CPU para todos los procesadores activos.<br>_Mostrado como porcentaje_ |
| **ibm_i.system.current_cpu_capacity** <br>(gauge) | Las unidades de procesamiento que se están utilizando en la partición.|
| **ibm_i.system.normalized_cpu_usage** <br>(gauge) | El porcentaje normalizado de utilización de la CPU para las unidades de procesamiento en uso.<br>_Mostrado como porcentaje_ |
| **ibm_i.system.shared_cpu_usage** <br>(gauge) | El porcentaje de la capacidad total de la agrupación de procesadores compartidos utilizada por todas las particiones que utilizan la agrupación.<br>_Mostrado como porcentaje_ |

### Checks de servicio

**ibm_i.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia IBM i monitorizada; en caso contrario, devuelve `OK`.

_Estados: ok, crítico_

### Eventos

El check de IBM i no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).