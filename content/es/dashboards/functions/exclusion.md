---
aliases:
- /es/graphing/functions/exclusion/
title: Exclusión
---

## Excluir valor nulo

| Función         | Descripción                                                    | Ejemplo                                        |
| ---------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `exclude_null()` | Elimina los grupos con valores de etiqueta N/A de tu gráfica o lista principal. | `exclude_null(avg:system.load.1{*} by {host})` |

Por ejemplo, supongamos que tienes una métrica con dos etiquetas: `account` y `region`. `account` tiene tres valores posibles (`prod`, `build` y `N/A`), mientras que `region` tiene cuatro valores posibles (`us-east-1`, `us-west-1`, `eu-central-1` y `N/A`).

Cuando grafiques este métrica como una serie temporal, tendrás 3 x 4 = 12 líneas en tu gráfica. La aplicación de `exclude_null()` elimina las líneas con combinaciones de etiqueta que contengan _cualquier_ valor N/A, dejándote con 2 x 3 = 6 grupos.

## Sujeción

| Función      | Descripción                                                          | Ejemplo                                |
| ------------- | -------------------------------------------------------------------- | -------------------------------------- |
| `clamp_min()` | Establece cualquier valor de métrica _por debajo_ de un valor de umbral para que sea igual a ese valor. | `clamp_min(avg:system.load.1{*}, 100)` |
| `clamp_max()` | Establece cualquier valor de métrica _por encima_ de un valor de umbral para que sea igual a ese valor.  | `clamp_max(avg:system.load.1{*}, 100)` |

Añade un valor de umbral. `clamp_min()` establece todos los puntos de datos por debajo del umbral para que sean iguales a ese valor, mientras que `clamp_max()` limita los puntos de datos por encima del umbral.

## Corte

| Función       | Descripción                                     | Ejemplo                                 |
| -------------- | ----------------------------------------------- | --------------------------------------- |
| `cutoff_min()` | Reemplaza los valores de métrica _por debajo_ de un valor de umbral por NaN. | `cutoff_min(avg:system.load.1{*}, 100)` |
| `cutoff_max()` | Reemplaza los valores de métrica _por encima_ de un valor de umbral por NaN.  | `cutoff_max(avg:system.load.1{*}, 100)` |

Añade un valor de umbral. `cutoff_min()` reemplaza todos los valores de métrica inferiores a este valor de umbral por `NaN`, mientras que `cutoff_max()` reemplaza todos los valores de métrica superiores a este valor de umbral por `NaN`. Las funciones de corte no reemplazan los valores que son **iguales a** el valor de umbral.

**Consejo**: Tanto para las funciones de sujeción como de corte, puede ser útil ver el valor de umbral que has elegido. Puedes [establecer un marcador horizontal][1] en Dashboards para indicar este valor.

## Otras funciones

{{< whatsnext desc="Consulta las demás funciones disponibles:" >}}
{{< nextlink href="/dashboards/functions/arithmetic" >}}Aritmética: realiza operaciones aritméticas en la métrica. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/algorithms" >}}Algorítmica: implementa la detección de anomalías o outliers en la métrica.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/count" >}}Conteo: cuenta el valor distinto de cero o no nulo de la métrica. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/interpolation" >}}Interpolación: rellena o establece valores predeterminados para la métrica.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rank" >}}Clasificación: solo selecciona un subconjunto de métricas. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rate" >}}Tasa: calcula una derivada personalizada sobre la métrica.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/regression" >}}Regresión: aplica una función de machine learning a la métrica.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/rollup" >}}Rollup: controla la cantidad de puntos de datos sin procesar utilizados en la métrica. {{< /nextlink >}}
{{< nextlink href="/dashboards/functions/smoothing" >}}Suavizado: suaviza las variaciones métricas.{{< /nextlink >}}
{{< nextlink href="/dashboards/functions/timeshift" >}}Cambio de tiempo: cambia el punto de datos de la métrica a lo largo de la línea de tiempo. {{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://www.datadoghq.com/blog/customize-graphs-dashboards-graph-markers/