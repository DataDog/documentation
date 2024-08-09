---
title: Alertas de Watchdog
---

## Información general

Watchdog busca proactivamente anomalías en tus sistemas y aplicaciones. Cada anomalía se muestra en el [explorador de alertas de Watchdog][1] con más información sobre lo ocurrido, el posible impacto en otros sistemas y la causa original.

{{< img src="watchdog/watchdog.png" alt="Página de alertas de Watchdog con una alerta pendiente sobre anomalías en logs por logs con errores, una alerta resuelta sobre anomalías en logs por logs con errores y una alerta resuelta sobre tasas de error a través del análisis de la causa original" >}}

## Detalles de las alertas de Watchdog

Una ficha de información general de las alertas contiene las siguientes secciones:

{{< img src="watchdog/alerts/alerts_overview.png" alt="Captura de pantalla de una ficha de alerta de Watchdog que muestra una tasa de error elevada del endpoint send-sms en sms-service" style="width:100%;">}}

1. **Status** (Estado): La anomalía puede ser `ongoing`, `resolved` o `expired`. (Una anomalía es `expired` si ha estado pendiente durante más de 48 horas).
3. **Timeline** (Línea de tiempo): Describe el periodo de tiempo en el que se produce la anomalía.
4. **Message** (Mensaje): Describe la anomalía.
5. **Graph** (Gráfico): Representa visualmente la anomalía.
6. **Tags* (Etiquetas): Muestra el alcance de la anomalía.
7. [**Impact** (Impacto)][4] (si está disponible): Describe a qué usuarios, vistas o servicios afecta la anomalía.

Al hacer clic en cualquier parte de la ficha de información general de las alertas, se abre el panel de detalles de las alertas.

Además de repetir la información de la ficha de información general de las alertas, la pestaña **Overview** (Información general) puede contener uno o varios de los siguientes campos:

* **Expected Bounds** (Límites esperados): Haz clic en la casilla de verificación **Show expected bounds** (Mostrar límites esperados). El gráfico cambia de color para diferenciar entre comportamiento esperado y anómalo.
* **Suggested Next Steps** (Siguientes pasos sugeridos): Describe los pasos para la investigación y la clasificación del comportamiento anómalo.
* **Monitors** (Monitores): Enumera los monitores asociados a tu alerta. Cada monitor mostrado tiene incluidas en su alcance la métrica de la alerta actual y sus etiquetas asociadas.

Además, Watchdog te sugiere uno o más monitores que puedes crear para recibir notificaciones si la anomalía vuelve a ocurrir. Estos monitores aún no existen, por lo que la tabla muestra su estado como `suggested`. Haz clic en **Enable Monitor** (Habilitar monitor) para habilitar el monitor sugerido para tu organización. Aparecerán una serie de iconos que te permitirán abrir, editar, clonar, silenciar o eliminar el nuevo monitor.

## Explorador de alertas de Watchdog

Puedes utilizar el intervalo de tiempo, la barra de búsqueda o las facetas para filtrar tu fuente de alertas de Watchdog.

* **Time range** (Intervalo de tiempo): Utiliza el selector de intervalo de tiempo situado en la parte superior derecha para ver las alertas detectadas en un intervalo de tiempo específico. Puedes ver cualquier alerta que se haya producido en los últimos 6 meses.
* **Search bar** (Barra de búsqueda): Escribe texto en la casilla de búsqueda **Filter alerts** (Filtrar alertas) para buscar alertas por título.
* **Facets** (Facetas): La parte izquierda de la fuente de alertas de Watchdog contiene las siguientes facetas de búsqueda. Marca las casillas correspondientes para filtrar tus alertas por faceta.

Facetas disponibles: 

| Grupo de todas las alertas    | Descripción                                                                     |
|---------------------|---------------------------------------------------------------------------------|
| Categoría de la alerta      | Mostrar todas las alertas de `apm`, `infrastructure` o `logs`.                          |
| Tipo de alerta          | Selecciona alertas mediante métricas de APM o integraciones de la infraestructura.            |
| Estado de la alerta        | Selecciona las alertas en función de su estado (`ongoing`, `resolved` o `expired`).     |
| Etiqueta principal de APM     | [Etiqueta principal de APM definida][6] desde la cual mostrar alertas.                        |
| Entorno         | Entorno desde el cual mostrar alertas. Consulta el [etiquetado unificado de servicios][5] para obtener más información sobre la etiqueta `env`.|
| Servicio             | Servicio desde el cual mostrar alertas. Consulta el [etiquetado unificado de servicios][5] para obtener más información sobre la etiqueta `service`.
|
| Usuario final afectado   | (Requiere RUM). Si Watchdog ha encontrado usuarios finales afectados. Consulta [Análisis de los impactos][4] para obtener más información. |
| Causa original          | (Requiere APM). Si Watchdog ha encontrado la causa original de la anomalía o del fallo crítico. Consulta [Análisis de causas originales][9] para obtener más información. |
| Equipo                | Equipo propietario de los servicios afectados. Enriquecido a partir del [catálogo de servicios][7].  |
| Tipos de anomalías en logs    | Muestra únicamente anomalías en logs de este tipo. Los tipos compatibles son los nuevos patrones de logs y los incrementos en patrones de logs existentes.|
| Origen del log          | Muestra únicamente las alertas que contienen logs procedentes de este origen.                           |
| Estado del log          | Muestra únicamente las alertas que contienen logs con este estado de log.                         |

## Cobertura de las alertas de Watchdog

Las alertas de Watchdog cubren varias aplicaciones y métricas de infraestructura:

{{< tabs >}}
{{% tab "Log Management" %}}

Los logs consumidos se analizan a nivel del consumo, donde Watchdog realiza agregados sobre los patrones detectados, así como etiquetas `environment`, `service`, `source` y `status`.
Estos logs agregados se analizan en busca de comportamientos anómalos, como los siguientes:

* Una aparición de logs con un estado de advertencia o de error.
* Un aumento repentino de logs con un estado de advertencia o de error.

Todas las anomalías en logs se muestran como [informaciones][3] en el explorador de logs, y coinciden con el contexto de búsqueda y con cualquier restricción aplicada a tu rol.
Las anomalías en logs que Watchdog considera particularmente `severe` se muestran en el [explorador de alertas de Watchdog][1] y pueden ser alertadas configurando un [monitor de logs de Watchdog][2].
Una anomalía `severe` se define de la siguiente forma:

* Contiene logs con errores.
* Tiene una duración mínima de 10 minutos (para evitar errores transitorios).
* Presenta un incremento significativo (para evitar pequeños incrementos).
* Tiene una baja puntuación de `noise` (para evitar tener muchas alertas para un determinado servicio). La puntuación de `noise` se calcula a nivel del servicio de la siguiente forma:
    * Observando el número de patrones de error (cuanto más alto, más ruidoso).
    * Calculando la cercanía entre los patrones (cuanto más cerca, más ruidosos).

#### Historial de datos requerido

Watchdog requiere algunos datos para establecer una referencia para el comportamiento esperado. En el caso de las anomalías en logs, el historial mínimo es de 24 horas. 
Watchdog empieza a encontrar anomalías una vez que dispone del historial mínimo requerido y mejora a medida que crece el historial. Los mejores resultados se obtienen con seis semanas de historial. 

#### Desactivación de la detección de anomalías en logs

Para desactivar la detección de anomalías en logs, ve a la página del [pipeline de Log Management][4] y haz clic en el botón conmutador Log Anomalies (Anomalías en logs).

[1]: https://app.datadoghq.com/watchdog
[2]: /es/monitors/types/watchdog/
[3]: /es/watchdog/insights?tab=logmanagement#explore-insights
[4]: https://app.datadoghq.com/logs/pipelines
{{% /tab %}}
{{% tab "APM" %}}

Watchdog escanea todos los servicios y recursos para buscar anomalías en las siguientes métricas:

  * Tasa de error
  * Latencia
  * Aciertos (tasa de solicitudes)

Watchdog filtra los endpoints o los servicios poco utilizados para reducir el ruido y evitar anomalías en pequeñas cantidades de tráfico. Además, si se detecta una anomalía en la tasa de aciertos, que no tiene impacto en la latencia o en la tasa de errores, se ignora la anomalía. 

#### Historial de datos requerido

Watchdog requiere algunos datos para establecer una referencia para el comportamiento esperado. En el caso de las anomalías de métricas, el historial mínimo es de dos semanas. 
Watchdog empieza a encontrar anomalías una vez que dispone del historial mínimo requerido y mejora a medida que crece el historial. Los mejores resultados se obtienen con seis semanas de historial.

{{% /tab %}}
{{% tab "Infrastructure" %}}

Watchdog consulta las métricas de infraestructura de la siguiente integraciones:

  * [Sistema][1], para el uso de memoria a nivel de host (fugas de memoria) y la tasa de retransmisión de TCP.
  * [Redis][2]
  * [PostgreSQL][3]
  * [NGINX][4]
  * [Docker][13]
  * [Kubernetes][14]
  * [Amazon Web Services][5]:
    * [S3][6]
    * [ELB/ALB/NLB][7]
    * [CloudFront][8]
    * [DynamoDB][9]
    * [RDS][10]
    * [ECS][11]
    * [Lambda][12]

#### Historial de datos requerido

Watchdog requiere algunos datos para establecer una referencia del comportamiento esperado. En el caso de las anomalías de métricas, el historial mínimo es de dos semanas. 
Watchdog empieza a encontrar anomalías una vez que dispone del historial mínimo requerido y mejora a medida que crece el historial. Los mejores resultados se obtienen con seis semanas de historial.

[1]: /es/integrations/system/
[2]: /es/integrations/redisdb/
[3]: /es/integrations/postgres/
[4]: /es/integrations/nginx/
[5]: /es/integrations/amazon_web_services/
[6]: /es/integrations/amazon_s3/
[7]: /es/integrations/amazon_elb/
[8]: /es/integrations/amazon_cloudfront/
[9]: /es/integrations/amazon_dynamodb/
[10]: /es/integrations/amazon_rds/
[11]: /es/containers/amazon_ecs/?tab=awscli
[12]: /es/serverless/
[13]: /es/containers/docker/?tab=standard
[14]: /es/containers/kubernetes/installation/?tab=operator
{{% /tab %}}
{{< /tabs >}}

### Detección personalizada de anomalías

Watchdog utiliza los mismos algoritmos estacionales que los monitores de energía y los dashboards. Para buscar anomalías en otras métricas o para personalizar la sensibilidad, están disponibles los siguientes algoritmos:

* [Monitores de anomalías][10]
* [Monitores de predicción][11]
* [Monitores de outliers][12]

## Dónde encontrar las alertas de Watchdog

Las alertas de Watchdog aparecen en los siguientes lugares de Datadog:

* El [explorador de alertas de Watchdog][1]
* En cualquier [página de servicios de APM][3] individual
* En el [catálogo de servicios][7]
* En el [panel de Watchdog Insights][8], disponible en todos los exploradores 

### En los prismáticos de Watchdog en las páginas APM 

Cuando Watchdog detecta una irregularidad en una métrica de APM, el icono rosa de los prismáticos de Watchdog aparece junto al servicio afectado en el [catálogo de servicios de APM][7].

{{< img src="watchdog/service_list.png" alt="Captura de pantalla del catálogo de servicios que muestra 5 servicios. Un icono de prismáticos rosa sigue al nombre del servicio de almacenes web." style="width:75%;" >}}

Puedes ver más detalles sobre las anomalías de una métrica navegando hasta la parte superior de una [página de servicios][3] con el carrusel [Watchdog Insights][8].

También puedes encontrar el icono de Watchdog en los gráficos de métricas.

{{< img src="watchdog/latency_graph.png" alt="Gráfico que muestra la latencia del servicio en segundos en el eje Y y la hora del día en el eje X. Todo el gráfico aparece resaltado en rosa y las palabras May 2: 13:31 Ongoing (2 de mayo: 13:31 en curso) aparecen en la parte superior" style="width:75%;" >}}

Haz clic en el icono de los prismáticos para ver una ficha de alerta de Watchdog con más detalles.

## Gestionar alertas archivadas

Para archivar una alerta de Watchdog, abre el panel lateral y haz clic en el icono de la carpeta en la esquina superior derecha. Al archivarla se oculta la alerta del explorador, así como de otros lugares de Datadog, como por ejemplo la página de inicio. Si se archiva una alerta, el icono rosa de los prismáticos de Watchdog no aparece junto al servicio o al recurso correspondiente.

Para ver las alertas archivadas, selecciona la opción **Show _N_ archived alerts** (Mostrar _N_ alertas archivadas) de la casilla de verificación, en la parte superior izquierda del [explorador de alertas de Watchdog][1]. Esta opción sólo está disponible si hay al menos una alerta archivada. Puedes ver quién ha archivado cada alerta y cuándo lo ha hecho, y también puedes restaurar las alertas archivadas en tu fuente.

**Nota**: El archivado no impide que Watchdog etiquete futuros problemas relacionados con el servicio o el recurso.

[1]: /es/watchdog
[3]: /es/tracing/services/service_page/
[4]: /es/watchdog/impact_analysis/
[5]: /es/getting_started/tagging/unified_service_tagging/
[6]: /es/tracing/guide/setting_primary_tags_to_scope/
[7]: /es/tracing/service_catalog/
[8]: /es/watchdog/insights?tab=logmanagement#explore-insights
[9]: /es/watchdog/rca/
[10]: /es/monitors/types/anomaly/
[11]: /es/monitors/types/forecasts/?tab=linear
[12]: /es/monitors/types/outlier/?tab=dbscan