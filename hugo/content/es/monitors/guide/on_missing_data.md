---
description: Migre de las configuraciones heredadas No Data a las opciones On Missing
  Data para un mejor manejo de datos faltantes en metric monitors.
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: Documentación de la API de monitors.
title: Migración a la configuración On Missing Data
---
## Descripción general {#overview}

Los metric monitors ofrecen opciones mejoradas para el manejo de datos faltantes, lo que le permite diferenciar entre los datos faltantes como un modo de falla y un estado saludable. 

Estas opciones se alinean con lo que está disponible en otros tipos de monitors como Logs, Events, CI, Database, Error Tracking y más.

## Beneficios de usar las opciones On Missing Data {#benefits-of-using-on-missing-data-options}

Al medir la cantidad de eventos incorrectos, como errores, los monitors deben reflejar un estado "OK" cuando no se detectan datos. Con las configuraciones heredadas No Data, los monitors informaban No Data. Las opciones de configuración On Missing Data permiten que los monitors reflejen los estados de salud con mayor precisión, mejorando la claridad.

## Monitors gestionados a través de la interfaz de usuario {#monitors-managed-through-the-ui}

Si gestiona sus monitors desde la interfaz de usuario, la configuración se actualiza automáticamente la próxima vez que los edite. Para actualizar la configuración On Missing Data antes, consulte las siguientes secciones sobre cómo realizar ajustes a través de la API.

## Monitors gestionados a través de la API o Terraform {#monitors-managed-through-the-api-or-terraform}

Si gestiona sus monitors con la API o Terraform, reemplace `notify_no_data` y `no_data_timeframe` con `on_missing_data`. El parámetro `no_data_timeframe` no es necesario ya que `on_missing_data` utiliza el mismo marco de tiempo que la ventana de tiempo.  

### Parámetros de la API {#api-parameters}

El parámetro anterior No Data, `notify_no_data`, sigue estando disponible en los monitors existentes y no se actualiza automáticamente a las nuevas funciones `on_missing_data`.

| Parámetro                               | Descripción en la interfaz de usuario                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | Si faltan datos {{< ui >}}Show NO DATA and notify{{< /ui >}}<br>(Anteriormente, "{{< ui >}}Notify if data is missing{{< /ui >}}")                       |
| `"on_missing_data": "show_no_data"`     | Si faltan datos {{< ui >}}Show NO DATA{{< /ui >}}<br>(Anteriormente, "{{< ui >}}Do not notify if data is missing{{< /ui >}}")                           |
| `"on_missing_data": "resolve"`          | Si faltan datos {{< ui >}}Show OK{{< /ui >}}                                                                       |
| `"on_missing_data": "default"` si se utiliza la agregación de suma o recuento | Si faltan datos {{< ui >}}Evaluate as 0{{< /ui >}} (u otro valor predeterminado)                                  |
| `"on_missing_data": "default"` si se utilizan todos los demás tipos de agregación | Si faltan datos {{< ui >}}Show last known status{{< /ui >}} |

Para ver todos los campos disponibles, consulte la [Documentación de la API][1].

Aquí hay un ejemplo de antes y después de un JSON monitor con esos campos:

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

## SLO basados en monitors {#monitor-based-slos}

Los SLO tratan el uptime y el tiempo de inactividad de acuerdo con este mapeo:

| On Missing Data Configuration | Monitor Status                 | SLO Treatment               |
|-------------------------------|--------------------------------|-----------------------------|
| {{< ui >}}Show OK{{< /ui >}}                       | OK                             | Uptime                      |
| {{< ui >}}Show No Data{{< /ui >}}                  | No Data                        | Uptime                      |
| {{< ui >}}Show No Data and Notify{{< /ui >}}       | No Data                        | Downtime                    |
| {{< ui >}}Show last known status{{< /ui >}}        | Cualquiera que haya sido el último estado   | If OK, Uptime<br>If Alert, Downtime |
| {{< ui >}}Evaluate as zero{{< /ui >}}              | Depende de la configuración del umbral | If OK, Uptime<br>If Alert, Downtime |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/api/latest/monitors/