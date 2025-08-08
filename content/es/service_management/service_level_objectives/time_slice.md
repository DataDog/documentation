---
further_reading:
- link: service_management/service_level_objectives/
  tag: Documentación
  text: Información general de Objetivos de nivel de servicio (SLOs)
- link: https://www.datadoghq.com/blog/define-and-manage-slos/
  tag: Blog
  text: Mejores prácticas para gestionar tus SLOs con Datadog
title: SLOs de fracción de tiempo
---

{{< jqmath-vanilla >}}

## Información general

Los SLOs de fracción de tiempo te permiten medir la fiabilidad utilizando una definición personalizada del tiempo de actividad. El tiempo de actividad se define como una condición en una serie temporal de métrica. Por ejemplo, puedes crear un SLO de latencia definiendo el tiempo de actividad como siempre que la latencia p95 sea inferior a 1 segundo.

Los SLOs de tiempo son una alternativa conveniente a los SLOs basados en monitor. Puedes crear un SLO de tiempo de actividad sin pasar por monitor, por lo que no tienes que crear y mantener tanto un monitor como un SLO. 

## Creación de un SLO de fracción de tiempo

Puedes crear un SLO de fracción de tiempo de las siguientes maneras:
- [Create an SLO from the create page (crear un SLO desde la página de creación)](#create-an-slo-from-the-create-page)
- [Export an existing Monitor-based SLO (exportar un SLO existente basado en monitor)](#export-an-existing-monitor-slo)
- [Import from a monitor (importar desde un monitor)](#import-from-a-monitor)

### Crear un SLO desde la página de creación

{{< img src="service_management/service_level_objectives/time_slice/time-slice-creation.png" alt="opciones de configuración para crear un SLO de fracción de tiempo" style="width:90%;" >}}

1. Navega hasta [**Service Management (Gestión de servicios) > SLOs**][1].
2. Haz clic en **+ New SLO** (+ Nuevo SLO) para abrir la página Crear SLO.
3. Selecciona **By Time Slices** (Por fracciones de tiempo) para definir tu medición SLO. 
4. Define tu condición de tiempo de actividad eligiendo una consulta métrica, un comparador y un umbral. Por ejemplo, para definir el tiempo de actividad como siempre que la latencia p95 sea inferior a 1 s. Como alternativa, puedes [import the uptime from a monitor (importar el tiempo de actividad de un monitor)](#import-from-a-monitor).
5. Configurar tu SLO para utilizar cortes de tiempo de 1 o 5 minutos para calcular el tiempo de actividad.
6. Elige el plazo y el objetivo.
7. Nombra y etiqueta tu SLO.
8. Haz clic en **Crear**.

### Exportar un SLO existente monitor 

<div class="alert alert-info">Solo se pueden exportar los SLOs basados en monitor de métricas. Los SLOs basados en monitores no métricos o en múltiples monitores no pueden exportarse.</div>

Crea un SLO de fracción de tiempo exportando un SLO existente basado en monitor. Desde un SLO de monitor, haz clic en **Export to Time Slice SLO** (Exportar a SLO de fracción de tiempo).

{{< img src="service_management/service_level_objectives/time_slice/monitor-time-slice-export.png" alt="En el panel lateral de detalles de un SLO basado en monitor, el botón para Exportar a una fracción de tiempo está resaltado" style="width:90%;" >}}

### Importar desde un monitor

<div class="alert alert-info">Solo los SLOs de monitor de métricas aparecen en la selección de monitor para la importación. </div>

En la página **Create or Edit SLO** (Crear o editar SLO), en **Define your SLI** (Definir tu SLI), haz clic en **Import from Monitor** (Importar desde monitor) y selecciona en el desplegable o buscar en el selector de monitor.

**Nota**: Los SLOs de fracción de tiempo no admiten períodos móviles. Los períodos móviles no se transfieren de una consulta de monitor a una consulta de fracción de tiempo. 

{{< img src="service_management/service_level_objectives/time_slice/import_from_monitor.png" alt="Opción resaltada para Importar desde el monitor en la sección Definir tu SLI de una configuración SLO." style="width:90%;" >}}

## Cálculos del tiempo de actividad

Para calcular el porcentaje de tiempo de actividad de un SLO de fracción de tiempo, Datadog corta la serie temporal en intervalos de igual duración, llamados "slices" (fracciones). La duración del intervalo es configurable con opciones de 1 o 5 minutos: 

{{< img src="service_management/service_level_objectives/time_slice/time-slice-granularity.png" alt="Panel detallado de SLO de fracción de tiempo de tiempo de actividad de latencia de aplicaciones con grupos" style="width:100%;" >}}

La agregación espacial y temporal viene determinada por la consulta métrica. Para más información sobre la agregación temporal y espacial, consulta la documentación [metrics (métricas)][2]. 

Para cada fracción, hay un único valor para la serie temporal, y la condición de tiempo de actividad (como `valor < 1`) se evalúa para cada fracción. Si se cumple la condición, se considera que la fracción está activa:

{{< img src="service_management/service_level_objectives/time_slice/time-slice-good.png" alt="Panel detallado de SLO de fracción de tiempo que muestra la latencia de la aplicación con una infracción del tiempo de actividad" style="width:50%;" >}}

En caso contrario, se considera caída del sistema:

{{< img src="service_management/service_level_objectives/time_slice/time-slice-bad.png" alt="Panel detallado de SLO de fracción de tiempo que muestra la latencia de la aplicación con una infracción del tiempo de actividad" style="width:50%;" >}}

En el ejemplo siguiente, hay un SLO de fracción de tiempo configurado con intervalos de tiempo de 5 minutos, y exactamente un punto de la serie de tiempo infringe la condición de tiempo de actividad. En este caso, la condición es que la latencia p95 sea menor o igual a 2,5 segundos. Dado que el período total mostrado es de 12 horas (720 minutos), y 715 minutos se consideran tiempo de actividad (720 min de tiempo total - 5 min caída del sistema), el porcentaje de tiempo de actividad es 715/720 * 100 = 99,305%.

{{< img src="service_management/service_level_objectives/time_slice/uptime_latency.png" alt="Panel detallado de SLO de fracción de tiempo que muestra la latencia de la aplicación con una infracción del tiempo de actividad" style="width:100%;" >}}

### Grupos y tiempo de actividad general

Los SLOs de fracción de tiempo te permiten realizar un seguimiento del tiempo de actividad para grupos individuales, donde los grupos se definen en la parte "group by" (agrupar por) de la consulta métrica. 

Cuando hay grupos, el tiempo de actividad se calcula para cada grupo individual. Sin embargo, el tiempo de actividad general funciona de forma diferente. Para que coincida con la funcionalidad existente de monitor SLO, los SLOs de fracción de tiempo utilizan la misma definición de tiempo de actividad general. Cuando **todos** los grupos tienen tiempo de actividad, se considera tiempo de actividad general. Por el contrario, si **algún** grupo tiene caída del sistema, se considera caída del sistema del tiempo de actividad general. El tiempo de actividad general es siempre menor que el tiempo de actividad de cualquier grupo individual.

{{< img src="service_management/service_level_objectives/time_slice/uptime_latency_groups.png" alt="Panel detallado de SLO de fracción de tiempo de tiempo de actividad de latencia de aplicaciones con grupos" style="width:100%;" >}}

En el ejemplo anterior, el entorno "prod" tiene 5 minutos de caída del sistema en un período de 12 horas (720 minutos), lo que resulta en aproximadamente 715/720 * 100 = 99,305% de tiempo de actividad. El entorno "dev" también tuvo 5 minutos de caída del sistema, lo que resulta en el mismo tiempo de actividad. Esto significa que en total la caída del sistema, cuando el centro de datos prod o dev tuvo una caída del sistema, fue de 10 minutos (ya que no hay solapamiento), lo que resulta en aproximadamente (720-10)/720 * 100 = 98,611% de tiempo de actividad.

### Correcciones

Los SLOs de fracción de tiempo cuentan los períodos de corrección como tiempo de actividad en todos los cálculos. Dado que el tiempo total permanece constante, el presupuesto de errores también es siempre una cantidad fija de tiempo. Esto supone una simplificación y una mejora significativas con respecto a cómo se gestionan las correcciones en los SLOs basados en monitor.

Para los SLOs basados en monitor, las correcciones son períodos que se eliminan del cálculo. Si se añade una corrección de un día a un SLO de 7 días, 1 hora de caída del sistema equivale a un 0,7% en lugar de un 0,6%:

$$ 60/8640 *100 = ~0.7% $$

Los efectos sobre el presupuesto de errores pueden ser inusuales. Eliminar el tiempo de un SLO en tiempo de actividad provoca una dilatación del tiempo, en la que cada minuto de tiempo de inactividad representa una fracción mayor del tiempo total.

### Datos faltantes 

En los SLOs de fracción de tiempo, los datos que faltan siempre se tratan como tiempo de actividad y aparecen en gris en la visualización de la línea de tiempo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/manage
[2]: /es/metrics/#time-and-space-aggregation