---
title: Marco temporal personalizadas
---

## Información general

<div class="alert alert-info">Las consultas se realizan en zona horaria UTC, pero el marco temporal de la consulta se selecciona según <strong>la zona horaria de tu navegador</strong>. Alterna entre mostrar la zona horaria por defecto o UTC desde la acción configurar dashboard. Para más información, consulta la <a href="/dashboards/configure/#configuration-actions">documentación de configuración de dashboard</a>.</div>

Muchas de las vistas de Datadog pueden ajustarse a un marco temporal específico. Los controles de tiempo incluyen una lista de marcos de tiempo comunes y un selector de calendario para una selección rápida.

Para incrementar por mes, día, año, hora o minuto, resalta una parte del marco temporal y utiliza las teclas `[↑]` y `[↓]`:

{{< img src="dashboards/guide/custom_time_frames/increment_with_arrow_keys.mp4" alt=vídeo "Incrementar el tiempo con teclas de flechas"="true" width="500" >}}

## Sintaxis admitidas

### Fechas fijas

{{< img src="dashboards/guide/custom_time_frames/custom_fixed_time_frame.mp4" alt=vídeo "Tipo de marco de tiempo fijo personalizado"="true" width="500" >}}

| Formato                       | Ejemplos                                         |
|------------------------------|--------------------------------------------------|
| `{MMM/MMMM} D`               | 1 de enero<br>1 de enero                               |
| `M/D`                        | 1&#8203;/&#8203;1                                |
| `M-D`                        | 1-1                                              |
| `M/D/{AA/AAAA}`              | 1/1/19<br>1/1/2019                               |
| `M-D-{AA/AAAA}`              | 1-1-19<br>1-1-2019                               |
| `{MMM/MMMM} D, h:mm a`       | 1 de enero, 13:00 h<br>1 de enero, 13:00 h             |
| `{MMM/MMMM} D, AAAA, h:mm a` | 1 de enero de 2019, 13:00 h<br>1 de enero de 2019, 13:00 h |
| `h:mm a`                     | 13:00 h                                          |
| Marca de tiempo en segundos Unix       | 1577883600                                       |
| Marca de tiempo en milisegundos Unix  | 1577883600000                                    |

Cualquier fecha fija puede introducirse como parte de un intervalo. Por ejemplo:
  * `1577883600 - 1578009540`
  * `1 de enero - 2 de enero`
  * `6:00 h - 13:00 h`

### Fechas relativas

Las fechas relativas **no** se actualizan con el tiempo; se calculan cuando se introducen.

{{< img src="dashboards/guide/custom_time_frames/custom_relative_time_frame.mp4" alt=vídeo "Tipo de marco de tiempo relativo personalizado"="true" width="500" >}}

| Formato                                             | Descripción                                                         |
|----------------------------------------------------|---------------------------------------------------------------------|
| `N{unidad}`<br> Consulta la lista de unidades aceptadas a continuación | Muestra las últimas N unidades. Por ejemplo, **3 mo** (3 m) (los últimos 3 meses)|
| `hoy`                                            | Muestra el día del calendario actual hasta el presente                     |
| `ayer`                                        | Muestra el día del calendario anterior completo                             |
| `este mes`                                       | Muestra el mes del calendario en curso hasta el presente                   |
| `mes pasado`                                       | Muestra el mes del calendario anterior completo                           |
| `este año`                                        | Muestra el año del calendario en curso hasta el presente                    |
| `año pasado`                                        | Muestra el año del calendario anterior completo                            |

Se aceptan las siguientes cadenas para cualquier `{unidad}` en una fecha relativa:
  * Actas: `m`, `min`, `mins`, `minuto`, `minutos`
  * Horas: `h`, `hr`, `hrs`, `hora`, `horas`
  * Días: `d`, `día`, `días`
  * Semanas: `s`, `semana`, `semanas`
  * Meses: `m`, `me`, `ms`, `mss`, `mes`, `meses`

### Fechas alineadas con el calendario

Las fechas alineadas con el calendario se actualizan para reflejar el día actual.

| Formato         | Descripción                                      |
|----------------|--------------------------------------------------|
| `última semana` | Muestra la semana desde las 12 del mediodía del lunes hasta el presente |
| `último mes`| Muestra el día 1 del mes hasta la actualidad      |

## URL

Puedes manipular consultas de tiempo en la URL de un dashboard.

Considera la siguiente URL del dashboard:

```
https://app.datadoghq.com/dash/host/<DASHBOARD_ID>?from_ts=<QUERY_START>&to_ts=<QUERY_END>&live=true
```

* El parámetro `from_ts` es la marca de tiempo en milisegundos Unix de la hora de inicio de la consulta. Por ejemplo, `1683518770980`.
* El parámetro `to_ts` es la marca de tiempo en milisegundos Unix de la hora de finalización de la consulta. Por ejemplo, `1683605233205`.
* `live=true` indica que las especificaciones de tiempo relativo se conservan cuando se guarda o comparte una consulta. También puedes utilizar `live=false`.