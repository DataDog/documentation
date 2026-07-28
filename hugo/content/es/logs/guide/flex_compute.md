---
description: Aprenda a monitorizar y a optimizar el uso de los recursos informáticos
  de Flex Logs mediante métricas y visualizaciones del rendimiento de las consultas.
further_reading:
- link: /logs/log_configuration/flex_logs/
  tag: Documentación
  text: Flex Logs
- link: /logs/explorer/
  tag: Documentación
  text: Log Explorer
title: Monitorizar el uso de Flex Compute
---

## Información general

Monitoriza el uso de Flex compute a través de varios gráficos en la page (página) [Flex Logs Controls][1]. Toma decisiones informadas utilizando datos sobre las compensaciones entre costos y rendimiento y equilibra el éxito operativo con la eficiencia financiera.

{{< img src="/logs/guide/flex_compute/flex_compute_graphs_1.png" alt="Dashboard las métricas de rendimiento de consultas y de tamaño de proceso, incluidas las ralentizaciones de la consulta, las sources (fuentes) principales de las ralentizaciones y el uso del proceso en el tiempo" style="width:100%;" >}}

## Monitorización del rendimiento de la consulta

El proceso flexible está limitada por dos factores:
- El número de consultas simultáneas
- El número máximo de logs que pueden escanearse por consulta

Las ralentizaciones de las consultas se producen cuando se alcanza el límite de consultas simultáneas y una consulta vuelve a intentar encontrar un espacio disponible en el que ejecutarse. Si no se encuentra un espacio disponible, la consulta no se ejecutará. Datadog muestra un mensaje de error que te aconseja reintentar la consulta en otro momento.

### Métricas disponibles

- **Utilización de consultas simultáneas:** Muestra el número de consultas que se están ejecutando al mismo tiempo y el espacio disponible. Si el uso alcanza la capacidad máxima, las consultas adicionales se alternan hasta que haya un espacio disponible.
- **Ralentizaciones por día de la semana:** Proporciona una información general del porcentaje de ralentizaciones de consultas por día, lo que ayuda a identificar patrones en la demanda de proceso.
- **Principales sources (fuentes) de ralentización:** Desglosa si los retrasos proceden de Log Explorer, de los dashboards o de las consultas a la API, lo que facilita la optimización de las áreas objetivo.
- **Exploraciones en profundidad:** Haz clic en un dashboard o en un usuario para abrir directamente el dashboard o el historial de consultas de Flex del usuario en [Audit Trail][2]. **Nota**: Solo se auditan las consultas de la Lista de logs. Esto no incluye las consultas utilizadas para visualizaciones, como las series temporales o la top list (lista principal).

## Recomendaciones de optimización

Utiliza esta información para optimizar tu uso.

1. **Dirígete a los usuarios de outlier (valor atípico) para:**
   - Analizar sus necesidades de consulta
   - Comprender si hay logs que consulten con frecuencia y que deberían almacenarse en indexación estándar en su lugar.
1. **Mejorar los dashboards que experimentan ralentizaciones:**
   - Pausa de la actualización automática de los dashboards
      {{< img src="/logs/guide/flex_compute/pause_dashboard.png" alt="Interfaz de dashboard que muestra el botón de pausa de la actualización automática para detener las actualizaciones automáticas del dashboard" style="width:90%;" >}}
   - Evaluar si los logs utilizados para alimentar los widgets pueden convertirse en métricas para reducir el uso intensivo del proceso de Flex. Por ejemplo, si los widgets del dashboard solo tienen en cuenta unos pocos casos de "error" o "éxito", pero los propios logs contienen una baja densidad de información, considera la posibilidad de convertir estos logs en una métrica
   - Organizar los widgets del dashboard en grupos y mantenerlos contraídos hasta que se necesiten. Los widgets de un grupo contraído no se cargan al abrir el dashboard.
1. **Considera la posibilidad de actualizar el tamaño del proceso de Flex** para aumentar el límite de consultas simultáneas si observas una ralentización sostenida de las consultas.
1. **Accede al índice** que estás consultando. Si el logs que estás consultando pertenecen a un índice específico, alcanzar a ese índice puede acelerar tu búsqueda.

Para obtener más información sobre los tamaños de proceso, consulta la documentación [Flex Logs][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/flex-logs-controls
[2]: /es/account_management/audit_trail/#explore-audit-events
[3]: /es/logs/log_configuration/flex_logs/