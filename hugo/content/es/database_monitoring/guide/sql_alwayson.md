---
further_reading:
- link: /database_monitoring/
  tag: Documentación
  text: Monitorización de bases de datos
- link: /database_monitoring/setup_sql_server/
  tag: Documentación
  text: Configurar servidor SQL
- link: /database_monitoring/troubleshooting/
  tag: Documentación
  text: Solucionar problemas relacionados con la monitorización de base de datos
title: Exploración de los grupos de disponibilidad AlwaysOn de SQL Server
---

La vista de Clústeres AlwaysOn de la monitorización de base de datos te permite detectar problemas de sincronización de datos, comprender el comportamiento de los grupos de disponibilidad e identificar cuellos de botella de clúster en los grupos de disponibilidad de SQL Server.

Para acceder a la vista de Clústeres AlwaysOn, ve a la pestaña **APM** > **Database Monitoring** > **Databases** (APM > Monitorización de base de datos > Bases de datos) y selecciona **AlwaysOn Clusters** (Clústeres AlwaysOn).

## Determinar el estado de tus nodos

Utiliza la vista de Clústeres AlwaysOn para evaluar el estado de tus grupos de disponibilidad de SQL Server. Cuando se selecciona, la página muestra una visualización codificada por colores basada en el estado actual de los nodos primarios (P) y secundarios (S) de cada grupo de disponibilidad.

Para identificar los grupos que están experimentando problemas, utiliza los filtros de estado para mostrar los grupos con nodos que están en estado **Reverting**, **Not Synchronizing* (Revertiendo, No sincronizado), etc. También puedes utilizar los gráficos de series temporales para detectar actividad de rendimiento inusual en tus clústeres en función de las métricas de log, redo y tiempo de retardo secundario.

{{< img src="database_monitoring/dbm_alwayson.png" alt="Ver grupos AlwaysOn en SQL Server" style="width:100%;">}}

## Analizar las métricas históricas

Para evaluar cómo han fluctuado los estados de sincronización de los nodos a lo largo del tiempo, selecciona un grupo de disponibilidad para abrir el panel lateral de detalles. El gráfico **Historical Synchronization States** (Estados de sincronización históricos) de la parte superior del panel muestra el estado de cada nodo a lo largo del marco temporal seleccionado.

Consulta información adicional sobre los nodos secundarios y sus bases de datos asociadas en la pestaña **Secondary Nodes** (Nodos secundarios). También puedes utilizar los gráficos de series temporales en la pestaña **Metrics** (Métricas) para detectar comportamientos anómalos en nodos individuales y bases de datos según la vista send, redo y métricas de retardo.

{{< img src="database_monitoring/dbm_alwayson_history.png" alt="Ver grupos AlwaysOn en SQL Server" style="width:80%;">}}

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}