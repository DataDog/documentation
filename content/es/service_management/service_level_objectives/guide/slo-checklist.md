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
title: Lista de verificación SLO
---

<div class="alert alert-info">
Haz clic en <a href="https://www.datadoghq.com/pdf/SLOChecklist_200619.pdf">aquí</a> para encontrar una versión PDF de esta página.
</div>

## Primeros pasos

1. Navega hasta la [SLO Manage page (página de gestión de SLO)][1].

2. Empieza a pensar desde la perspectiva de tu usuario:

    * ¿Cómo interactúan los usuarios con la aplicación?
    * ¿Cuál es su recorrido por la aplicación?
    * ¿Con qué partes de tu infraestructura interactúan estos viajes?
    * ¿Qué esperan de tus sistemas y qué esperan conseguir?

## Selecciona el SLI correspondiente

### PASO 1

#### Respuesta/Solicitud

|              |                                                                |
| ------------ | -------------------------------------------------------------- |
| Disponibilidad | ¿El servidor pudo responder a la solicitud con éxito?          |
| Latencia      | ¿Cuánto tardó el servidor en responder a la solicitud? |
| Rendimiento   | ¿Cuántas solicitudes se pueden gestionar?                              |

#### Almacenamiento

|              |                                              |
| ------------ | -------------------------------------------- |
| Disponibilidad | ¿Se puede acceder a los datos a petición?          |
| Latencia      | ¿Cuánto tiempo se tarda en leer o escribir datos? |
| Durabilidad   | ¿Seguirán estando ahí los datos cuando se necesiten?   |

#### Tuberías

|             |                                                                    |
| ----------- | ------------------------------------------------------------------ |
| Corrección | ¿Se han devuelto los datos correctos?                                       |
| Frescura   | ¿Cuánto tardan en aparecer nuevos datos o resultados procesados? |

### PASO 2

**Do you require a time-based or count-based SLI?** (¿Necesitas un SLI basado en el tiempo o en el recuento?)

**Time-based SLIs use Datadog monitors** (Los SLI basados en el tiempo utilizan monitores Datadog):

_Ejemplo: la latencia de todas las solicitudes de los usuarios debe ser inferior a 250 ms el 99% del tiempo en cualquier
ventana de 30 días._

1. Selecciona un único monitor,
2. Selecciona varios monitores (hasta 20), o
3. Selecciona un solo monitor de alerta múltiple y elige grupos de monitor específicos (hasta 20) para incluirlos en
   el cálculo del SLO

Si necesitas crear un nuevo monitor, ve a la página [Monitor create (crear monitor)][2].

**Count-based SLIs use metrics in your Datadog account and do not require a monitor** (Los SLI basados en recuento utilizan métricas en su cuenta Datadog y no requieren un monitor):

_Ejemplo: el 99% de las solicitudes deben completarse en menos de 250 ms en un período de 30 días.

## Implantación de los SLI

1. [Custom metrics (métricas personalizadas)][3] (por ejemplo, contadores)
2. [Integration metrics (métricas de integración) ][4] (por ejemplo, equilibrador de carga, peticiones http)
3. [Datadog APM (APM de Datadog)][5] (por ejemplo, errores, latencia en servicios y recursos)
4. [Datadog logs (logs de Datadog)][6] (por ejemplo, métricas generadas a partir de logs para un recuento de ocurrencia particular)

## Establece tu objetivo y la ventana de tiempo

1. Seleccione su objetivo: `99%`, `99.5%`, `99.9%`, `99.95%`, o el que mejor se adapte a sus necesidades.
2. Seleccione la ventana temporal: durante los últimos `7`, `30`, o `90 días`

## Nombra, describe y etiquetar tus SLOs

1. Nombra tu SLO.
2. Añada una descripción: describa en qué consiste el seguimiento de la SLO y por qué es importante para la experiencia del usuario final. También puede añadir enlaces a dashboards como referencia.
3. Añadir etiquetas (tags): etiquetado por `equipo` y `servicio` es una práctica habitual.

## Ver y buscar

[Use tags to search for your SLOs from the SLO list view (utiliza etiquetas para buscar tus SLOs desde la vista de lista de SLO][7].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: https://app.datadoghq.com/monitors#create/metric
[3]: /es/metrics
[4]: /es/integrations
[5]: /es/tracing/trace_pipeline/generate_metrics/
[6]: /es/logs/logs_to_metrics/
[7]: /es/service_management/service_level_objectives/#searching-and-viewing-slos