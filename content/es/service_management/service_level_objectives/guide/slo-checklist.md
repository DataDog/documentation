---
aliases:
- /es/monitors/guide/slo-checklist/
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Sigue el estado y el presupuesto de errores de tus SLOs con Datadog
- link: https://learn.datadoghq.com/courses/intro-to-slo
  tag: Centro de aprendizaje
  text: Introducción a Objetivos de nivel de servicio (SLOs)
- link: /service_management/service_level_objectives/guide/slo_types_comparison/
  tag: Documentación
  text: Comparación de tipos de SLOs en Datadog
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para gestionar tus SLOs con Datadog
title: Lista de verificación SLO
---


## Para empezar

1. Ve a la [página de gestión de SLOs][1].

2. Empieza a pensar desde la perspectiva de tu usuario:

    * ¿Cómo interactúan los usuarios con la aplicación?
    * ¿Cuál es su recorrido por la aplicación?
    * ¿Con qué partes de tu infraestructura interactúan estos viajes?
    * ¿Qué esperan de tus sistemas y qué esperan conseguir?

## Selecciona el SLI correspondiente

### PASO 1

#### Respuesta/Solicitud

|  Tipo de SLI |  Descripción                                                   |
| ------------ | -------------------------------------------------------------- |
| Disponibilidad | ¿El servidor pudo responder a la solicitud con éxito?          |
| Latencia      | ¿Cuánto tardó el servidor en responder a la solicitud? |
| Rendimiento   | ¿Cuántas solicitudes se pueden gestionar?                              |

#### Almacenamiento

|  Tipo de SLI |  Descripción                                 |
| ------------ | -------------------------------------------- |
| Disponibilidad | ¿Se puede acceder a los datos a petición?          |
| Latencia      | ¿Cuánto tiempo se tarda en leer o escribir datos? |
| Durabilidad   | ¿Seguirán estando ahí los datos cuando se necesiten?   |

#### Tuberías

| Tipo de SLI |   Descripción                                                      |
| ----------- | ------------------------------------------------------------------ |
| Corrección | ¿Se han devuelto los datos correctos?                                       |
| Frescura   | ¿Cuánto tardan en aparecer nuevos datos o resultados procesados? |

### PASO 2

#### Prácticas recomendadas para elegir un tipo de SLO

- Siempre que sea posible, utiliza SLOs basados en métricas. La práctica recomendada consiste en contar con SLOs en los que el presupuesto de errores refleje el número de eventos incorrectos que te quedan antes de incumplir tu SLO. Tus cálculos de SLOs también se evaluarán por volumen, en función del número de eventos.
- En cambio, si quieres un SLO que realice un seguimiento del tiempo de actividad y utilice un cálculo de SLI basado en el tiempo, utiliza los SLOs de fracción de tiempo. A diferencia de los SLOs basados en monitores, los SLOs de fracción de tiempo no requieren que mantengas un monitor subyacente para tu SLO.
- Por último, considera los SLOs basados en monitores para los casos de uso que no están cubiertos por los SLOs de fracción de tiempo, que incluyen SLOs basados en monitores que no tienen en cuenta las métricas o en varios monitores.

Para ver una comparación detallada de los tipos de SLOs, consulta la guía [Comparación de tipos de SLOs][8].

**¿Necesitas un cálculo de SLI basado en el tiempo o en el recuento?

Los siguientes tipos de SLOs están disponibles en Datadog: 

**SLOs basados en métricas**

_Ejemplo: el 99% de las solicitudes deben completarse en menos de 250 ms en un período de 30 días.

- Cálculo de SLI basado en el recuento
- El SLI se calcula como la suma de los eventos buenos dividida por la suma del total de eventos

**SLOs basados en monitores**

_Ejemplo: la latencia de todas las solicitudes de los usuarios debe ser inferior a 250 ms el 99% del tiempo en cualquier
ventana de 30 días._

- Cálculo de SLI basado en el tiempo
- SLI calculados en función del tiempo de actividad del monitor subyacente
- Puedes seleccionar un solo monitor, varios monitores (hasta 20) o un solo monitor de alerta múltiple con grupos.

Si necesitas crear un nuevo monitor, ve a la página [Crear monitor][2].

**SLOs de fracción de tiempo**

_Ejemplo: la latencia de todas las solicitudes de los usuarios debe ser inferior a 250 ms el 99% del tiempo en cualquier
ventana de 30 días._

- Cálculo de SLI basado en el tiempo
- SLI calculados a partir de tu definición personalizada del tiempo de actividad mediante una consulta de métrica

## Implementar tus SLI

1. [Métricas personalizadas][3] (por ejemplo, contadores)
2. [Métricas de integración][4] (por ejemplo, balanceador de carga, solicitudes http)
3. [Datadog APM][5] (por ejemplo, errores, latencia en servicios y recursos)
4. [Logs de Datadog][6] (por ejemplo, métricas generadas a partir de logs para un recuento de ocurrencia particular)

## Establece tu objetivo y la ventana de tiempo

1. Selecciona tu objetivo: `99%`, `99.5%`, `99.9%`, `99.95%` o cualquier otro valor de destino que tenga sentido para tus requisitos.
2. Selecciona el intervalo de tiempo: durante los últimos `7`, `30` o `90 days`

## Nombrar, describir y etiquetar tus SLOs

1. Nombra tu SLO.
2. Añada una descripción: describa en qué consiste el seguimiento de la SLO y por qué es importante para la experiencia del usuario final. También puede añadir enlaces a dashboards como referencia.
3. Añadir etiquetas (tags): el etiquetado por `equipo` y `servicio` es una práctica habitual.

## Ver y buscar

[Utiliza etiquetas para buscar tus SLOs desde la vista de lista de SLOs][7].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: https://app.datadoghq.com/monitors/create/metric
[3]: /es/metrics
[4]: /es/integrations
[5]: /es/tracing/trace_pipeline/generate_metrics/
[6]: /es/logs/logs_to_metrics/
[7]: /es/service_management/service_level_objectives/#searching-and-viewing-slos
[8]: /es/service_management/service_level_objectives/guide/slo_types_comparison