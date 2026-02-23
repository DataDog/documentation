---
description: Utiliza APM Investigator para analizar problemas de rendimiento e investigar
  patrones de latencia en tus servicios distribuidos.
further_reading:
- link: /tracing/
  tag: Documentación
  text: Datadog APM
private: true
title: APM Investigador
---

{{< callout url="https://www.datadoghq.com/product-preview/apm-investigator/" header="Solicita acceso a la vista previa." >}}
APM Investigator está en vista previa. Para solicitar acceso, completa este formulario.
{{< /callout >}}

## Información general

APM Investigator te ayuda a diagnosticar y resolver los problemas de latencia de las aplicaciones mediante un proceso guiado paso a paso. Consolida las herramientas de análisis en una única interfaz para que puedas identificar las causas raíz y tomar acción.

{{< img src="tracing/guide/apm_investigator/apm_investigator.png" alt="Interfaz de usuario de APM Investigator" style="width:90%;">}}

## Capacidades clave

El APM Investigator te ayuda a:

- **Investigar grupos de solicitudes lentas**: selecciona solicitudes problemáticas directamente desde el gráfico de dispersión de latencia.
- **Identificar la fuente de latencia**: determina si la latencia se origina en tu servicio, en una dependencia descendente, en bases de datos o en APIs de terceros.
- **Reduzcir el alcance**: aísla los problemas en centros de datos, clústeres o segmentos de usuarios específicos con [Análisis de etiquetas][1].
- **Encontrar las causas raíz**: detecta despliegues defectuosos, lentitud de las bases de datos, fallos en los servicios de terceros, problemas de infraestructura y problemas a nivel de servicio.

## Iniciar una investigación

Inicia una investigación desde una página de servicio de APM o una página de recurso.

1. Ve a un servicio que presente problemas de latencia.
2. Encuentra el gráfico de **Latencia** que muestra la anomalía.
3. Pasa el ratón por encima del gráfico y haz clic en **Investigate** (Investigar). Se abrirá el panel lateral de investigación.


{{< img src="tracing/guide/apm_investigator/apm_investigator_entrypoint.png" alt="Punto de entrada de APM Investigator" style="width:90%;">}}

## Proceso de investigación

### Definir el contexto: selecciona tramos lentos y normales

Para activar el análisis de latencia, selecciona dos zonas en el gráfico de puntos:

- **Lento**: tramos problemáticos y lentos
- **Normal**: línea de base, tramos en buen estado

<div class="alert alert-info">Las anomalías de latencia detectadas por Watchdog se preseleccionan.</div>

{{< img src="tracing/guide/apm_investigator/latency_selection.png" alt="Selección de tramos lentos en el gráfico de puntos" style="width:90%;">}}

Esta comparación entre los tramos lentos y normales impulsa todos los análisis posteriores.

### Paso 1: Identificar el cuello de botella de la latencia

El investigador identifica si la latencia se origina en tu servicio o en sus dependencias descendentes (servicios, bases de datos, APIs de terceros).

**Enfoque de análisis**:
El investigador compara los datos de traza tanto de los periodos lentos seleccionados como de los normales. Para encontrar el servicio responsable del aumento de latencia, compara:

**Tiempo de ejecución**: compara el "tiempo de ejecución" de cada servicio, definido como el tiempo empleado en su propio procesamiento, excluyendo las esperas de las dependencias posteriores, en los dos conjuntos de datos. El servicio con el mayor aumento absoluto de latencia es el principal objetivo.
- **Patrones de llamadas entre servicios**: analiza los cambios en el número de solicitudes entre servicios. Por ejemplo, si el servicio Y aumenta significativamente sus llamadas al servicio X, el investigador podría identificar a Y como el cuello de botella.

Basándose en este análisis exhaustivo, el investigador recomienda un servicio como probable cuello de botella de latencia. Amplía la sección del cuello de botella de latencia para ver detalles sobre la comparación entre trazas lentas y normales. Una tabla muestra los cambios en el tiempo propio y en el número de solicitudes entrantes por servicio.

El siguiente ejemplo muestra dos gráficas de llamas una al lado de la otra que comparan trazas lentas con trazas en mejor estado con más detalle. Utiliza las flechas para desplazarte por las trazas de ejemplo y haz clic en **View** (Ver) para abrir la traza en una vista de página completa.

{{< img src="tracing/guide/apm_investigator/latency_bottleneck.png" alt="Sección de cuello de botella de latencia" style="width:100%;">}}

Para investigar los cambios recientes en un servicio, haz clic en el icono `+` que aparece al pasar el ratón por encima de una fila para añadirla como contexto de tu investigación.

### Paso 2: Correlación con los cambios recientes

A continuación, el investigador te ayuda a determinar si los despliegues recientes en el servicio o el servicio con cuello de botella de latencia han provocado el aumento de latencia.

La sección **Cambios recientes** muestra lo siguiente:
- Despliegues que se produjeron cerca de la línea de tiempo del pico de latencia en un widget de [seguimiento de cambios][2]
- Un gráfico de latencia desglosado por versiones

{{< img src="tracing/guide/apm_investigator/recent_changes.png" alt="Cambios recientes" style="width:80%;">}}

**Enfoque de análisis**:
El APM Investigator analiza estos datos en segundo plano para marcar si esta sección es relevante para examinar (si se produjo un despliegue alrededor del momento del aumento de latencia que estás investigando).

### Paso 3: Encontrar patrones comunes con el análisis de etiquetas

El investigador también utiliza el [Análisis de etiquetas][1] para ayudarte a descubrir atributos compartidos que distinguen las trazas lentas de las de buen estado. El análisis de etiquetas destaca las dimensiones con diferencias de distribución significativas entre los conjuntos de datos lentos y normales.

{{< img src="tracing/guide/apm_investigator/tag_analysis.png" alt="Patrones comunes en trazas lentas" style="width:80%;">}}

La sección incluye:
- Distribuciones de etiquetas comparando los conjuntos de datos lentos y normales en todas las dimensiones de tramo.
- Destaca las dimensiones más discriminantes que pueden ayudarte a entender el problema de latencia, como `org_id`, `kubernetes_cluster` o `datacenter.name`.

El APM Investigator solo saca a la superficie esta sección cuando las dimensiones muestran una diferenciación significativa que merece la pena examinar.

### Impacto en el usuario final

Encima del gráfico de puntos, puedes encontrar una vista previa de cuántos usuarios finales, cuentas y páginas de aplicaciones (por ejemplo, `/checkout`) están afectados por el problema. Esta información se recopila si has activado la conexión entre [RUM y trazas][3].

{{< img src="tracing/guide/apm_investigator/end_user_impact.png" alt="Impacto en el usuario final" style="width:80%;">}}

### Root cause (Causa raíz)

El investigador consolida las conclusiones de todos los pasos del análisis (cuello de botella de latencia, cambios recientes y análisis de etiquetas) para generar una hipótesis de causa raíz. Por ejemplo, "un despliegue de este servicio descendente introdujo el aumento de latencia".

APM Investigator ayuda a reducir el **Tiempo medio de resolución (MTTR)** acelerando el diagnóstico y la respuesta a los problemas mediante el análisis automatizado de datos de cambios y trazas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/trace_explorer/tag_analysis
[2]: /es/change_tracking/
[3]: /es/tracing/other_telemetry/rum/