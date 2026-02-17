---
aliases:
- /es/monitors/monitor_uptime_widget/
- /es/monitors/slo_widget/
- /es/graphing/widgets/slo/
- /es/dashboards/faq/how-can-i-graph-host-uptime-percentage/
description: Haz un seguimiento de tus SLOs
further_reading:
- link: https://www.datadoghq.com/blog/slo-monitoring-tracking/
  tag: Blog
  text: Sigue el estado de todos tus SLOs en Datadog.
- link: /dashboards/guide/slo_graph_query
  tag: Documentación
  text: Consultas de SLO basadas en métricas de contexto
title: Widget de SLO
widget_type: slo
---

Los SLOs (objetivos de nivel de servicio) son un objetivo acordado que debe alcanzarse para cada actividad, función, y proceso para ofrecer la mejor oportunidad de éxito al cliente. Los SLOs representan el rendimiento o el estado de un servicio. El widget de SLO visualiza el estado, el presupuesto y el presupuesto para errores restante de los SLOs existentes. Muestra todos los grupos subyacentes del SLO y te permite ordenar los grupos por cualquiera de los intervalos de tiempo en el widget. Utiliza este widget para crear dashboards significativos con la información más crítica del SLO:
- **Ver todos los grupos de SLO directamente en el widget**: esto es útil para los SLOs que contienen muchos grupos, ya que el widget proporciona información clave relacionada con los grupos de SLO.
- **Establece el orden de clasificación que prefieras para los grupos de SLO en widget**: para todos los tipos de SLO, ordena los grupos según cualquiera de los intervalos de tiempo disponibles en el widget. Identifica rápidamente los grupos de SLO con mejor y peor rendimiento para diferentes períodos.
- **Identifica fácilmente los períodos en los que faltan datos en un SLO**: para todos los tipos de SLO, el widget de SLO muestra los períodos con datos faltantes como "-". El "-" se muestra para cualquier intervalo temporal en el que falten datos en todo el intervalo.

## Configuración

Utiliza el widget de SLO para visualizar un [Objetivo de nivel de servicio (SLO)][1] en un dashboard.

{{< img src="/dashboards/widgets/slo/slo-summary-widget-new.png" alt="Editor de gráfico del widget de resumen de SLO basado en métricas" >}}

### Configuración

1. Selecciona un SLO en el menú desplegable. 
2. **Para los SLOs basados en métricas y en intervalos de tiempo**: puedes filtrar tu consulta con etiquetas (tags) y aprovechar [variables de plantilla][2] para armar un contexto de forma dinámica de tus resultados:
    - Aprovecha las variables de plantilla utilizando el campo *filtrar por* para delimitar los estados de SLOs que muestra el widget. Por ejemplo, `filter by $env` delimita tu consulta de SLO al valor que eliges en el dashboard para la variable de plantilla *env*.
    - Añade contexto adicional y situación a tus consultas de métrica de SLO, incluso si las etiquetas no estaban incluidas en la configuración de SLO original. Por ejemplo, si la consulta de SLO original es `sum:trace.flask.request.hits{*} by {resource_name}.as_count()` y filtras por `env:prod` en el widget, tus datos se limitarán solo a los de tu entorno `prod`.
3. Configura hasta tres intervalos de tiempo diferentes.
4. Selecciona tus preferencias de visualización.

### Opciones

#### Ajustar los intervalos de tiempo

Selecciona hasta tres intervalos de tiempo diferentes entre los siguientes:
- **Intervalo de tiempo dinámico**: 7, 30 ó 90 días
- **Intervalos de tiempo calendario**: semana hasta la fecha, semana anterior, mes hasta la fecha o mes anterior
- **Tiempo global**: esta opción te permite visualizar el estado y el presupuesto para errores de tus SLOs en períodos arbitrarios. Puedes ver hasta 3 meses de información histórica para los SLOs basados en monitores. Para los SLOs basados en fragmentos de tiempo y métricas, la vista histórica admitida coincide con la duración de retención de métricas de tu cuenta (por defecto, es de 15 meses).

#### Mostrar preferencias

Selecciona si deseas mostrar u ocultar el presupuesto para errores restante activando la opción `Show error budget`.

Si estás visualizando un SLO con múltiples grupos o un SLO basado en monitores con múltiples monitores, selecciona tu `View mode`:

- Para SLOs con grupos (SLO con grupos basados en métricas o fragmentos de tiempo, o SLOs con un monitor único dividido en grupos), existen los siguientes tres modos de visualización:
  - `Overall`: muestra los porcentajes y objetivos generales del estado de SLO
  - `Groups`: muestra una tabla con los porcentajes de estado de cada grupo
  - `Both`: muestra tanto los porcentajes y objetivos globales de estado de SLO como la tabla de porcentajes de estado de cada grupo.

- Para los SLO basados en monitores configurados con múltiples monitores, existen los siguientes tres modos de visualización:
  - `Overall`: muestra los porcentajes y objetivos generales del estado de SLO
  - `monitors`: muestra una tabla con los porcentajes de estado de cada monitor
  - `Both`: muestra tanto los porcentajes y objetivos globales del estado de SLO como la tabla de porcentajes de estado para cada monitor

Cuando configures `View mode` en `Groups`, `Monitors` o `Both`:
- Por defecto, los grupos se ordenan por estado ascendente en el intervalo de tiempo más pequeño. Después de añadir el widget a un dashboard, tienes la posibilidad de ordenar por estado para cualquiera de los intervalos de tiempo configurados a través de la interfaz de usuario del widget.
- El widget muestra lo siguiente:
  + Para los SLOs basados en métricas y de fracción de tiempo, se muestran *todos* los grupos subyacentes del SLO. 
  + Para los SLOs basados en monitores con múltiples monitores, se muestran todos los monitores subyacentes en el SLO.
  + Para los SLOs individuales basados en monitores con grupos, se muestran hasta 20 grupos, si se seleccionaron grupos específicos en el SLO. Si no se seleccionaron grupos específicos para el SLO, se muestran *todos* los grupos subyacentes del SLO.

**Nota:** Para los SLOs basados en monitor con grupos, se pueden mostrar todos los grupos para cualquier SLO que contenga hasta 5000 grupos. Para los SLOs que contengan más de 5000 grupos, el SLO se calcula en función de todos los grupos, pero no se muestra ningún grupo en la interfaz de usuario.

## API

Este widget se puede utilizar con la **[API de dashboards][3]**. Consulta la siguiente tabla para obtener la [definición del esquema JSON del widget][4]:

{{< dashboards-widgets-api >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/service_level_objectives/
[2]: /es/dashboards/template_variables/
[3]: /es/api/latest/dashboards/
[4]: /es/dashboards/graphing_json/widget_json/