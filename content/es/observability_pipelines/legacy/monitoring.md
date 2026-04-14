---
disable_toc: false
title: (LEGACY) Monitorización
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Observability Pipelines no está disponible en el sitio US1-FED de Datadog.</div>
{{< /site-region >}}

## Información general

En [Observability Pipelines][1], tus pipelines están formados por componentes que recopilan, procesan y enrutan tus datos de observabilidad. El estado de tus pipelines y componentes se indica mediante estados y gráficos de estado, así como mediante gráficos de utilización de recursos y entrega de datos.

Los estados están determinados por métricas específicas basadas en umbrales y ventanas de tiempo por defecto. Los estados disponibles son los siguientes:

- `Healthy`: indica que el worker no se está quedando atrasado.
- `Warning`: indica que el worker no está rindiendo de forma óptima y corre el riesgo de retrasarse. El worker puede retrasarse debido a problemas como un destino posterior o servicio que provoque una acumulación y que no haya suficientes recursos disponibles para los workers.
- `Critical`: indica que el worker se está quedando atrás. Si el worker se está retrasando, puede correr el riesgo de perder datos; sin embargo, el worker no perderá datos involuntariamente siempre que tus pipelines estén [arquitectados][2] y configurados correctamente.

Las métricas internas, que se agrupan por estado, entrega de datos y utilización de recursos, impulsan el estado general de tu pipeline y sus componentes.

Los gráficos de estado están disponibles en las siguientes métricas:
- Eventos de caída involuntaria
- Errores
- Tiempo de retardo (sólo disponible para fuentes)
- Tasa de cambio en tiempo de retardo (sólo disponible para fuentes)
- Utilización

Los gráficos de entrega de datos están disponibles para las siguientes métricas:
- Eventos de entrada/salida por segundo
- Bytes de entrada/salida por segundo

Los gráficos de utilización de recursos están disponibles para las siguientes métricas:
- Uso de la CPU
- Uso de la memoria
- Utilización del disco (sólo disponible para destinos)

## Ver el estado de tus pipelines y componentes

1. Navega hasta [Observability Pipelines][3].
1. Haz clic en un pipeline.
1. Pasa el ratón por encima de los gráficos para ver puntos de datos específicos.

## Métricas de estado de la utilización de recursos del pipeline

| Métrica        | OK       | Advertencia    | Imprescindible  | Descripción                       |
| ------------  | :------: | :--------: | :-------: | --------------------------------- |
| Uso de la CPU     | <= 0.85  | > 0.85     | N/A       | Rastrea cuánta CPU está utilizando un proceso de worker. <br><br> Un valor de `1` indica que un proceso de worker no tiene más espacio libre en el host o en las unidades de cálculo que lo ejecutan. Esto puede conducir a posibles problemas como procesar la latencia fuera de los límites, la sobrecarga ascendente/descendente y así sucesivamente.|
| Uso de la memoria  | >= 0.15  | < 0.15     | N/A       | Rastrea la cantidad de memoria utilizada y libre en el host. El worker no está limitado por la memoria, pero un uso elevado del mismo puede indicar fugas.

## Métricas de estado del componente

| Métrica                    | Fuentes   | Transformaciones| Destinos | OK      | Advertencia  | Imprescindible  | Descripción                       |
| ------------------------  | :-------: | :-------: | :----------: | :-----: | :------: | :--------:| --------------------------------- |
| Eventos abandonados            | {{< X >}} | {{< X >}} |{{< X >}}     | ==0     | N/A      | > 0       |Se espera que siempre sea `0`. Si has configurado el worker para que deje datos intencionadamente, por ejemplo, usando la transformación `filter`, esos datos no se cuentan aquí. Por lo tanto, un solo error indica que el worker no está en un estado correcto.|
| Total de errores              |{{< X >}}  |{{< X >}}  |{{< X >}}     | ==0     | >0       | N/A       | El número total de errores encontrados por el componente. Estos errores también se emiten como [logs de diagnóstico][4], que proporcionan más información sobre logs de errores internos específicos. |
| Utilización               |           |{{< X >}}  |{{< X >}}     | <=0.95 | >0.95   | N/A       | Registra la actividad del componente.<br><br> Un valor de `0` indica un componente inactivo que está esperando una entrada. Un valor de `1` indica un componente que nunca está inactivo. Un valor superior a `0.95` indica que el componente está ocupado y probablemente sea un cuello de botella en la topología del proceso. |
| Tiempo de retraso                  |{{< X >}}  |           |              | N/A    | N/A     | N/D      | Se trata de la diferencia de tiempo bruta (en milisegundos) entre la marca de tiempo del evento y la marca de tiempo del momento en que el evento fue ingerido por el worker. Un tiempo de retraso alto o un cambio en el tiempo de retraso (ver más abajo) es un indicador de si el worker se está retrasando debido a la presión de un servicio descendente, a la falta de recursos proporcionados al worker o a un cuello de botella en el pipeline. |
| Tasa de variación del tiempo de retraso   | {{< X >}} |           |              | <=0    | >0      | >1       | Indica si hay un retraso sustancial entre el momento en que se genera el evento y el momento en que el worker recibe los datos. Si hay un retraso, entonces el worker se está retrasando en la recepción de los datos de la fuente.<br><br> Un valor de `0` indica que no hay retraso adicional entre el momento en que se generan los datos de observabilidad y el momento en que el worker recibe los datos. Un valor igual o superior a `1` indica que hay contrapresión y un cuello de botella. |
| Uso del disco                |           |           |{{< X >}}     | >=0.20 | > 0.20  | N/A     | Mide lo lleno que está un disco determinado. <br><br> Un valor de `1` indica que no se pueden almacenar datos en el disco. Un valor de `0` indica que el disco está vacío. |

[1]: /es/observability_pipelines/legacy/
[2]: /es/observability_pipelines/legacy/architecture/
[3]: https://app.datadoghq.com/observability-pipelines/legacy/
[4]: /es/observability_pipelines/legacy/troubleshooting/#investigate-diagnostic-logs