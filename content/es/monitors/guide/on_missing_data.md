---
description: Migra de las configuraciones heredadas Sin datos a las opciones Datos
  perdidos para una mejor gestión de los datos perdidos en los monitores de métricas.
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: Documentación de la API de monitores
title: Migración a la configuración de On Missing Data
---

## Información general

Los monitores de métricas ofrecen opciones mejoradas para gestionar los datos faltantes, lo que permite diferenciar entre los datos faltantes como un modo de fallo y un buen estado de mantenimiento. 

Estas opciones coinciden con lo que está disponible en otros tipos de monitores como logs, eventos, CI, base de datos, rastreo de errores y más.

## Ventajas de utilizar las opciones de On Missing Data

Cuando se mide el número de eventos incorrectos, como errores, los monitores deben reflejar un "OK" cuando no se detectan datos. Con las configuraciones legacy No Data, los monitores informarían No Data. Las opciones de configuración de On Missing Data permiten a los monitores reflejar los estados de mantenimiento con mayor precisión y mejora así la claridad.

## Monitores gestionados a través de la interfaz de usuario

Si gestionas tus monitores desde la interfaz de usuario, la configuración se actualizará automáticamente la próxima vez que los edites. Para actualizar antes la configuración de On Missing Data, consulta las siguientes secciones sobre ajustes a través de la API.

## Monitores gestionados a través de la API o Terraform

Si gestionas tus monitores con la API o Terraform, sustituye `notify_no_data` y `no_data_timeframe` con `on_missing_data`. El parámetro `no_data_timeframe` no es necesario, ya que `on_missing_data` utiliza el mismo período de tiempo que la ventana de tiempo.  

### Parámetros de la API

El parámetro anterior No Data, `notify_no_data`, sigue estando disponible en los monitores existentes y no se actualizan automáticamente a las nuevas funciones de `on_missing_data`.

| Parámetro                               | Descripción de la interfaz de usuario                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | Si faltan datos Mostrar NO DATA y notificar a<br>(Anteriormente, "Notificar si faltan datos")                       |
| `"on_missing_data": "show_no_data"`     | Si faltan datos Mostrar NO DATA<br>(Anteriormente, "No notificar si faltan datos")                           |
| `"on_missing_data": "resolve"`          | Si faltan datos Mostrar OK                                                                       |
| `"on_missing_data": "default"` si se utiliza la agregación por suma o por cuenta | Si faltan datos Evaluar como 0 (u otro valor predeterminado)                                  |
| `"on_missing_data": "default"` si se utilizan todos los demás tipos de agregación | Si faltan datos Mostrar el último estado conocido |

Para conocer todos los campos disponibles, consulta la [Documentación de la API][1].

He aquí un ejemplo del antes y el después de un monitor de JSON con esos campos:

**Antes**  
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
        "thresholds": { "critical": 90 },  
        "notify_audit": false,  
        "include_tags": false,  
        "notify_no_data": true,  
        "no_data_timeframe": 10  
    }  
}
{{< /highlight >}}


**Después**  
{{< highlight yaml "hl_lines=11" >}}{
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## Monitores de SLO

Los SLOs tratan el tiempo de actividad y caída del sistema de acuerdo con esta asignación:

| Configuración de On Missing Data | Estado del monitor                 | Tratamiento de SLO               |
|-------------------------------|--------------------------------|-----------------------------|
| Mostrar OK                       | OK                             | Tiempo de actividad                      |
| Mostrar No Data                  | Sin datos                        | Tiempo de actividad                      |
| Mostrar No Data y notificar       | Sin datos                        | Caída del sistema                    |
| Mostrar el último estado conocido        | Sea cual fuere el último estado   | Si es OK, tiempo de actividad<br>si es alerta, caída del sistema |
| Evaluar como cero              | Depende de la configuración del umbral | Si es OK, tiempo de actividad<br>si es alerta, caída del sistema |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/monitors/