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
- Evaluar tu tiempo medio de resolución
- Identificar las áreas de mejora en las que debes invertir

## Datos recopilados

Incident Management Analytics es una fuente de datos consultable de las estadísticas agregadas de incidentes. Puedes consultar estos análisis en una variedad de widgets de gráficos, tanto en dashboards como en notebooks, para analizar tu historial de respuestas a incidentes a lo largo del tiempo. Para darte un punto de partida, Datadog proporciona los siguientes recursos predefinidos que puedes clonar y personalizar:
- [Plantilla del dashboard con información general de la Gestión de incidentes][3] 
- [Plantilla de Informes de incidentes para notebooks][4]

### Marcas de tiempo del incidente

Los incidentes llevan tres atributos de marca de tiempo que influyen en los análisis:

* Hora de la declaración (`declared`): cuando se declaró el incidente.
* Hora de detección (`detected`): cuándo se creó el recurso subyacente a partir del cual se declaró el incidente. Por ejemplo, si una alerta de monitor se dispara a las 14.00 horas y el incidente se declara a las 14.30 horas, la hora detectada es las 14.00 horas. Si el incidente no se declaró a partir de otro recurso de Datadog, `detected` es la misma hora que `declared`.
* Hora de resolución (`resolved`): cuándo se resolvió el incidente más recientemente.

### Medidas

Incident Management informa de las siguientes medidas analíticas, que puedes utilizar para potenciar las consultas analíticas en los widgets de dashboard y notebook:

- `Customer Impact Duration`: la duración durante la cual los clientes se han visto afectados, en función de los impactos definidos en el incidente.
- `Status Active Duration`: la duración del estado "activo" del incidente, según la cronología del incidente.
- `Status Stable Duration`: duración del estado "estable" del incidente, según la cronología del incidente.
- `Time to Detect`: duración desde el primer impacto en el cliente hasta la hora de detección del incidente.
- `Time to Repair`: la duración desde la hora de detección del incidente hasta el último impacto en el cliente.
- `Time to Resolve`: La duración desde el momento de la declaración del incidente hasta el momento en que se resolvió.

Además de estos valores predeterminados, puedes crear nuevas medidas al añadir campos de propiedad *Número* personalizados en tu [Configuración de incidencias][7]. 

### Anulación de la marca de tiempo

Los respondedores del incidente pueden olvidar declarar un incidente de Datadog antes de iniciar el proceso de respuesta. También pueden olvidarse de resolver un incidente en Datadog incluso después de que el proceso de respuesta del incidente haya finalizado. Estos descuidos pueden dar una imagen engañosa en los análisis de incidentes, inflando permanentemente el tiempo medio de resolución u otras medidas.

Para solucionar este problema, las organizaciones pueden habilitar **anulaciones de marcas de tiempo**, que permiten a los responsables del incidente anular manualmente las marcas de tiempo registradas en el incidente. Cuando están presentes, las anulaciones afectan a las siguientes medidas analíticas:

- `Time to Detect`
- `Time to Repair`
- `Time to Resolve`

Las anulaciones solo influyen en la búsqueda y los análisis. No modifican el historial registrado automáticamente en la línea de tiempo del incidente. No se aplican a las medidas analíticas `Status Active Duration` o `Status Stable Duration`, que se basan en la duración acumulada de los segmentos de estado en las líneas de tiempo del incidente.

Para activar la anulación de la marca de tiempo, ve a [**Service Management** > **Incidents** > **Settings** > **Information**][11] (Gestión del servicio > Incidentes > Configuración > Información).

Para crear, actualizar o eliminar anulaciones de marcas de tiempo, los usuarios deben tener el permiso **Incidents Write**.

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
[11]: https://app.datadoghq.com/incidents/settings#information