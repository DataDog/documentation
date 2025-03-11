---
aliases:
- /es/monitors/incident_management/analytics
description: Seguimiento y análisis de las estadísticas agregadas de gestión de incidencias
  en dashboards y notebooks
further_reading:
- link: /service_management/incident_management/incident_settings
  tag: Documentación
  text: Configuración de incidencias
- link: https://app.datadoghq.com/dash/integration/30523/incident-management-overview
  tag: En la aplicación
  text: Dashboard con información general de la Gestión de incidentes predefinida
- link: https://app.datadoghq.com/notebook/template/11/incident-management-overview
  tag: En la aplicación
  text: Plantilla de Informes de incidentes predefinida
title: Análisis de la gestión de incidencias
---

## Información general

{{< img src="service_management/incidents/analytics/incident_analytics.mp4" alt="Desplazarse por el dashboard con información general de la Gestión de incidentes" video=true style="width:100%;">}}

Utiliza Incident Analytics para aprender de incidentes anteriores y comprender la eficacia y el rendimiento de tu proceso de respuesta a incidentes. El Análisis de incidentes te permite extraer estadísticas agregadas de tus incidentes a lo largo del tiempo. Puedes utilizar estas estadísticas para crear informes que te ayuden a:
- Analizar si tu proceso de respuesta a incidentes está mejorando con el tiempo
- Evaluar tu plazo medio de resolución
- Identificar las áreas de mejora en las que debes invertir

## Datos recopilados

Incident Management Analytics es una fuente de datos consultable de las estadísticas agregadas de incidentes. Puedes consultar estos análisis en una variedad de widgets de gráficos, tanto en dashboards como en notebooks, para analizar tu historial de respuestas a incidentes a lo largo del tiempo. Para darte un punto de partida, Datadog proporciona los siguientes recursos predefinidos que puedes clonar y personalizar:
- [Plantilla del dashboard con información general de la Gestión de incidentes][3] 
- [Plantilla de Informes de incidentes para notebooks][4]

### Medidas

La Gestión de Incidentes recopila las siguientes medidas analíticas para generar consultas analíticas:

- Recuento de incidencias
- Duración del impacto en el cliente
- Duración del estado activo
- Duración del estado estable
- Tiempo de detección (hora detectada: hora de inicio del impacto en el cliente)
- Tiempo de reparación (hora detectada: hora finalización del impacto en el cliente)
- Tiempo de resolución (hora declarada: hora de resolución)
- Número de usuarios afectados
- Reconocimiento

Además de estos valores predeterminados, puedes crear nuevas medidas al añadir campos de propiedad *Número* personalizados en tu [Configuración de incidencias][7]. 

**Nota:** Si sobreescribes una marca de tiempo, el valor de reemplazo se utilizará para calcular el Tiempo de detección, el Tiempo de reparación y el Tiempo de resolución.

## Visualizar datos de los incidentes en dashboards

Para configurar tu gráfico con los datos del análisis de gestión de incidencias, sigue estos pasos:

1. [Selecciona tu visualización][5].
2. Selecciona `Incidents` en el menú desplegable de la fuente de datos.
3. Selecciona una medida en el menú desplegable amarillo.
     - **Estadística por defecto:** cuenta el número de incidencias.
4. Selecciona una agregación para la medida.
5. (Opcional) Selecciona un rollup para la medida.
6. (Opcional) Utiliza la barra Buscar para filtrar la estadística hasta un subconjunto específico de incidencias.
7. (Opcional) Selecciona una faceta en el menú desplegable rosa para desglosar la medida por grupos y seleccionar un número limitado de grupos para mostrar.
8. [Pon un título al gráfico][6].
9. Guarda tu widget.

### Ejemplo: duración del impacto en el cliente de los cortes semanales, agrupada por servicio

{{< img src="/service_management/incidents/analytics/analytics_graph_configuration.png" alt="Configuración de un gráfico de series temporales que muestra la fuente de los datos de incidentes, filtrada por gravedad, donde se ve la duración del impacto en el cliente, agrupada por servicio" style="width:90%;" >}}

Este ejemplo de configuración te muestra una agregación de tus incidentes SEV-1 o SEV-2. El gráfico muestra la duración del impacto en el cliente de esos incidentes, agrupada por servicio. 

1. Widget: [Gráfico de líneas de series temporales][8]
2. Fuente de datos: `Incidents`
3. Medida: `Customer Impact Duration`
4. Agregación: `avg`
5. Rollup: `1w`
6. Filtro: `severity:("SEV-1" OR "SEV-2")`
7. Grupo: `Services`, limitado a los primeros 5

## Informe de incidentes

Utiliza la plantilla de notebook predefinida para crear el informe de incidentes o crear uno desde cero, para obtener un informe resumido de los incidentes de un equipo o servicio.
1. Abre la [plantilla de informe de incidentes][9].
1. Haz clic en **Use Template** (Utilizar plantilla) para editar y personalizar.
1. Puedes utilizar las celdas de incidentes existentes o personalizar la consulta para mostrar los valores de cada medición.
1. Actualiza las celdas de resumen con los valores pertinentes y [comparte el informe][10] con el resto de tu equipo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/
[2]: /es/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /es/dashboards/querying/#select-your-visualization
[6]: /es/dashboards/querying/#create-a-title
[7]: /es/service_management/incident_management/incident_settings#property-fields
[8]: /es/dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /es/notebooks/#share-notebooks