---
description: Consulta las recomendaciones para abordar de forma proactiva los problemas
  de tu sistema
further_reading:
- link: https://www.datadoghq.com/blog/database-monitoring-index-recommendations/
  tag: Blog
  text: Información detallada sobre las recomendaciones de índices de Monitorización
    de bases de datos
title: Recomendaciones
---

Las recomendaciones de la Monitorización de base de datos (DBM) destacan las posibles optimizaciones y áreas problemáticas en toda tu flota de bases de datos.

{{< img src="database_monitoring/recommendations-page.png" alt="Página Recomendaciones en Datadog" style="width:90%;" >}}

## Cómo funciona

Datadog analiza métricas y los datos de muestra de DBM para identificar los problemas de mayor prioridad de tus sistemas. Se calcula un indicador de gravedad para cada recomendación, destacando las áreas de mayor impacto en las que hay que centrarse. Las recomendaciones de alta gravedad pueden indicar problemas inmediatos o inminentes, mientras que las recomendaciones de menor gravedad pueden abordarse de forma asíncrona para mantener de forma proactiva el estado de la base de datos.

## Tipos de recomendación admitidos

| Tipo de recomendación     | Descripción                                                                                                                                            | MongoDB                     | MySQL                       | Oracle                      | PostgreSQL                  | SQL Server                  |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|-----------------------------|
| **Función en filtro**  | La consulta llama a una función en las columnas que se filtran, lo que lleva a costosos escaneos secuenciales que no pueden aprovechar los índices típicos basados en columnas. |                             |                             |                             | <i class='icon-check-bold'> |                             |
| **Bloqueador de alto impacto** | La consulta está causando una cantidad significativa de tiempo de espera para consultas bloqueadas.                                                                         |                             |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Alto número de filas**      | La consulta devuelve un gran número de filas en su conjunto de resultados.                                                                                            |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Consulta de larga duración**  | La consulta tiene duraciones que han superado un umbral de 30 segundos.                                                                                  |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Poco espacio en disco**      | La instancia de base de datos se está quedando sin espacio en disco. <br><br>**Nota**: Solo disponible en Amazon RDS.                                                    |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Índice faltante**       | El plan de ejecución de la consulta realiza escaneos secuenciales costosos. Cuando se detecta, Datadog recomienda utilizar un índice para agilizar la consulta.                | <i class='icon-check-bold'> | <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |
| **Índice no utilizado**        | El índice no se ha utilizado recientemente en ningún plan de ejecución.                                                                                           | <i class='icon-check-bold'> |  <i class='icon-check-bold'> |                             | <i class='icon-check-bold'> | <i class='icon-check-bold'> |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}