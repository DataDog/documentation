---
description: Utilice sintaxis de marco de tiempo personalizadas que incluyan fechas
  fijas, fechas relativas y períodos alineados con el calendario en los Dashboards
  de Datadog.
title: Marcos de tiempo personalizados
---
## Descripción general {#overview}

<div class="alert alert-info">Las consultas se ejecutan en UTC, pero el marco de tiempo de la consulta se selecciona de acuerdo con la <strong>zona horaria de su navegador</strong>. Alternar entre mostrar la zona horaria predeterminada o UTC desde la acción de configuración del Dashboard. Para más información, consulte la <a href="/dashboards/configure/#configuration-actions">Documentación de configuración del Dashboard</a>.</div>

Muchas vistas en Datadog pueden estar limitadas a un marco de tiempo específico. Los controles de tiempo incluyen una lista de marcos de tiempo comunes y un selector de calendario para una selección rápida.

Los marcos de tiempo pueden ser:

- **Deslizante**: Tanto el inicio como el final avanzan a medida que pasa el tiempo (por ejemplo, `5h` siempre muestra las últimas 5 horas).
- **Creciente**: Un inicio fijo con el final siguiendo "ahora" (por ejemplo, `since Jun 1` muestra todo desde el 1 de junio hasta el momento actual).
- **Fijo**: Tanto el inicio como el final están congelados en puntos específicos en el tiempo (por ejemplo, `Jan 1 - Jan 2`).

Para incrementar por mes, día, año, hora o minuto, resalte una porción del marco de tiempo y use las teclas `[↑]` y `[↓]`:

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt="Incrementar tiempo con las teclas de flecha" video="true" width="500" >}}

## Sintaxis admitidas {#supported-syntaxes}

### Fechas fijas {#fixed-dates}

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt="Escriba un marco de tiempo fijo personalizado" video="true" width="500" >}}

| Formato                       | Ejemplos                                         |
| ---------------------------- | ------------------------------------------------ |
| `{MMM/MMMM} D`               | 1 de enero<br>Enero 1                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{YY/YYYY}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{YY/YYYY}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | 1 de enero, 1:00 pm<br>1 de enero, 1:00 pm             |
| `{MMM/MMMM} D, YYYY, h:mm a` | 1 de enero de 2019, 1:00 pm<br>1 de enero de 2019, 1:00 pm |
| `h:mm a`                     | 1:00 pm                                          |
| Marca de tiempo en segundos Unix       | 1577883600                                       |
| Marca de tiempo en milisegundos Unix  | 1577883600000                                    |

Cualquier fecha fija puede ser ingresada como parte de un rango. Por ejemplo:

- `1577883600 - 1578009540`
- `Jan 1 - Jan 2`
- `6:00 am - 1:00 pm`

### Fechas relativas {#relative-dates}

Las fechas relativas se actualizan con el tiempo; se calculan a partir del tiempo actual.

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt="Escriba un marco de tiempo relativo personalizado" video="true" width="500" >}}

| Formato                                             | Descripción                                                                                                                                                                                                                                                                                          |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `N{unit}` | Muestra una ventana deslizante de las últimas N unidades. Las unidades aceptadas se enumeran a continuación. Tanto el inicio como el final avanzan con el tiempo. Por ejemplo, **3 meses** (los últimos 3 meses). Para crear una ventana creciente donde el final se mantenga en "ahora", utilice la sintaxis `to now` (por ejemplo, `10am to now`). Para más información, consulte [Marcos de tiempo crecientes](#growing-time-frames). |

Las siguientes cadenas son aceptadas para cualquier `{unit}` en una fecha relativa:

- Minutos: `m`, `min`, `mins`, `minute`, `minutes`
- Horas: `h`, `hr`, `hrs`, `hour`, `hours`
- Días: `d`, `day`, `days`
- Semanas: `w`, `week`, `weeks`
- Meses: `mo`, `mos`, `mon`, `mons`, `month`, `months`

### Marcos de tiempo crecientes {#growing-time-frames}

Los marcos de tiempo crecientes tienen un inicio fijo y se extienden automáticamente hasta el tiempo actual ("ahora"). Son útiles cuando desea ver toda la actividad desde un punto específico en el tiempo.

{{< img src="dashboards/guide/custom_time_frames/custom_growing_time_frame.mp4" alt="Escriba un marco de tiempo creciente personalizado." video="true" width="500" >}}

| Formato          | Descripción                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| `{date} to now` | Una ventana creciente desde `{date}` hasta ahora. Por ejemplo, **1 de enero hasta ahora**.                                    |
| `{date} - now`  | Equivalente a `{date} to now`. Por ejemplo, **1 de enero - ahora**.                                                |
| `since {date}`  | Equivalente a `{date} to now`. Por ejemplo, **desde el 1 de junio**, **desde 5h**, **desde 1549116000**.            |
| `from {date}`   | Equivalente a `{date} to now`. Por ejemplo, **desde el 1 de junio**, **desde 5h**.                                    |

El `{date}` en ambos formatos acepta cualquiera de los siguientes:

- Abreviaturas relativas (por ejemplo, `5h`, `2d`, `3w`)
- Fechas fijas (por ejemplo, `Jun 1`, `Feb 2 2pm`, `1/15/2024`)
- Tiempos Unix en segundos o milisegundos (por ejemplo, `1549116000`, `1549116000000`)

### Fechas alineadas al calendario {#calendar-aligned-dates}

Las fechas alineadas al calendario se ajustan a los límites del calendario (como la medianoche, el inicio de la semana y el inicio del mes) y se actualizan en consecuencia a medida que pasa el tiempo.

| Formato            | Descripción                                                                           |
| ----------------- | ------------------------------------------------------------------------------------- |
| `today`           | El día calendario actual hasta el presente                                                |
| `yesterday`       | El día calendario completo anterior                                                        |
| `week to date`    | La semana actual desde las 12 AM del lunes hasta el presente                                       |
| `month to date`   | El mes actual desde el 1 hasta el presente                                          |
| `year to date`    | El año actual desde el 1 de enero hasta el presente                                         |
| `this {unit}`     | La unidad de calendario actual hasta el presente. Por ejemplo, **este mes**, **este año**   |
| `last {unit}`     | La unidad de calendario completa anterior. Por ejemplo, **el mes pasado**, **el año pasado**           |
| `previous {unit}` | Equivalente a `last {unit}`. Por ejemplo, **la semana pasada**, **el mes pasado**       |
| `N {units} ago`   | La unidad de calendario completa N períodos atrás. Por ejemplo, **hace 2 semanas**, **hace 3 meses** |

## URLs {#urls}

Puede manipular consultas de tiempo en la URL de un Dashboard.

Considere la siguiente URL del Dashboard:

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

- El parámetro `from_ts` es la marca de tiempo en milisegundos Unix del tiempo de inicio de la consulta. Por ejemplo, `1683518770980`.
- El parámetro `to_ts` es la marca de tiempo en milisegundos Unix del tiempo de finalización de la consulta. Por ejemplo, `1683605233205`.
- `live=true` indica que las especificaciones de tiempo relativo se mantienen cuando una consulta se guarda o se comparte. También puede usar `live=false`.