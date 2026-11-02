---
aliases:
- /es/monitors/incident_management/analytics
- /es/service_management/incident_management/analytics/
- /es/incident_response/incident_management/analytics
description: Realice un seguimiento y analice estadísticas agregadas de gestión de
  incidentes en Dashboards y Notebooks
further_reading:
- link: /incident_response/incident_management/setup_and_configuration
  tag: Documentación
  text: Configuración de incidentes
- link: https://app.datadoghq.com/dash/integration/30523/incident-management-overview
  tag: En la aplicación
  text: Incident Management Overview Dashboard preconfigurado
- link: https://app.datadoghq.com/notebook/template/11/incident-management-overview
  tag: En la aplicación
  text: Plantilla preconfigurada de Incident Report
title: Análisis e informes
---
## Descripción general {#overview}

{{< img src="incident_response/incident_management/analytics_and_reporting/incident_analytics.mp4" alt="Desplácese por el Incident Management Overview Dashboard" video=true style="width:100%;">}}

Utilice Incident Analytics para aprender de incidentes anteriores y comprender la eficiencia y el rendimiento de su proceso de respuesta a incidentes. El análisis de incidentes le permite extraer estadísticas agregadas sobre sus incidentes a lo largo del tiempo. Puede utilizar estas estadísticas para crear informes que le ayuden a:
- Analizar si su proceso de respuesta a incidentes está mejorando con el tiempo
- Evaluar su tiempo medio de resolución
- Identificar áreas de mejora en las que debería invertir

## Datos recopilados {#data-collected}

Incident Management Analytics es una fuente de datos consultable para estadísticas agregadas de incidentes. Puede consultar estos análisis en una variedad de widgets de gráficos tanto en Dashboards como en Notebooks para analizar el historial de su respuesta a incidentes a lo largo del tiempo. Para darle un punto de partida, Datadog proporciona los siguientes recursos preconfigurados que puede clonar y personalizar:
- [Plantilla del Incident Management Overview Dashboard][3]
- [Plantilla de Notebook Incident Report][4]

### Marcas de tiempo de incidentes {#incident-timestamps}

Los incidentes tienen tres atributos de marca de tiempo que influyen en los análisis:

* Hora de declaración (`declared`): Cuando se declaró el incidente.
* Hora de detección (`detected`): Cuando se creó el recurso subyacente a partir del cual se declaró el incidente. Por ejemplo, si una alerta de seguimiento se activa a las 2 p. m. y el incidente se declara a las 2:30 p. m., la hora de detección es a las 2 p. m. Si el incidente no se declaró desde otro recurso de Datadog, `detected` es igual a `declared`.
* Tiempo de resolución (`resolved`): Cuando se resolvió el incidente más recientemente.

### Medidas {#measures}

Incident Management informa las siguientes medidas analíticas, que puede utilizar para potenciar consultas analíticas en widgets de Dashboard y Notebook:

{{< collapse-content title="Customer Impact Duration" level="h4" >}}
La duración durante la cual los clientes se vieron afectados, según los impactos definidos en el incidente.
{{< img src="incident_response/incident_management/analytics_and_reporting/Customer Impact Duration.png" alt="duración del impacto al cliente" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Status Active Duration" level="h4" >}}
La duración durante la cual el incidente estuvo en un estado "activo", según la línea de tiempo del incidente.
{{< img src="incident_response/incident_management/analytics_and_reporting/Status Active Duration.png" alt="duración de estado activo" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Status Stable Duration" level="h4" >}}
La duración durante la cual el incidente estuvo en un estado "estable", según la línea de tiempo del incidente.
{{< img src="incident_response/incident_management/analytics_and_reporting/StatusStableDuration.png" alt="duración del estado estable" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Detect" level="h4" >}}
La duración desde el impacto inicial al cliente hasta la hora de detección del incidente.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToDetect.png" alt="gráfico de tiempo de detección" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Repair" level="h4" >}}
La duración desde la hora de detección del incidente hasta el último impacto al cliente.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToRepair.png" alt="gráfico de tiempo de reparación" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Resolve" level="h4" >}}
La duración desde la hora de declaración del incidente hasta la hora en que se resolvió.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToResolve.png" alt="gráfico del tiempo de resolución" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time to Internal Response" level="h4" >}}
La duración desde el momento de detección del incidente hasta el momento de su declaración.
{{< img src="incident_response/incident_management/analytics_and_reporting/TimeToInternalResponse.png" alt="gráfico del tiempo de respuesta interna" style="width:80%;">}}
{{< /collapse-content >}}

{{< collapse-content title="Time from Detect to Resolve" level="h4" >}}
La duración desde el momento de detección del incidente hasta el momento en que se resolvió. A diferencia de Time to Resolve, que comienza en el momento de la declaración, esta medida también incluye el tiempo entre la detección y la declaración.
{{< /collapse-content >}}

Además de estos valores predeterminados, puede crear nuevas medidas agregando campos de propiedad *Number* personalizados en [Incident Settings][7].

### Anulación de marca de tiempo {#timestamp-overrides}

Es posible que los responsables de incidentes olviden declarar un incidente de Datadog antes de comenzar el proceso de respuesta. También pueden olvidar resolver un incidente en Datadog incluso después de que el proceso de respuesta al incidente haya terminado efectivamente. Estos descuidos pueden ofrecer una imagen engañosa en sus análisis de incidentes, inflando permanentemente su tiempo medio de resolución u otras medidas.

Para solucionar esto, las organizaciones pueden habilitar **anulaciones de marca de tiempo**, que permiten a los responsables de incidentes anular manualmente las marcas de tiempo registradas de un incidente. Cuando están presentes, las anulaciones afectan a las siguientes medidas analíticas:

- `Time to Detect`
- `Time to Internal Response`
- `Time to Repair`
- `Time to Resolve`
- `Time from Detect to Resolve`

Las anulaciones afectan la búsqueda, los análisis, las duraciones que se muestran en la sección **Timestamps** del incidente y las variables de duración cuando se renderizan las plantillas. No cambian el historial registrado automáticamente en la línea de tiempo del incidente. No se aplican a las medidas analíticas `Status Active Duration` o `Status Stable Duration`, las cuales se basan en la duración acumulada de los segmentos de estado en las líneas de tiempo de los incidentes.

Para habilitar las anulaciones de marca de tiempo, vaya a [**Incidents** > **Settings** > **Information**][11].

Para crear, actualizar o eliminar anulaciones de marca de tiempo, los usuarios deben tener el permiso **Incidents Write**.

## Visualice datos de incidentes en Dashboards {#visualize-incident-data-in-dashboards}

Para configurar su gráfico usando datos de Incident Management Analytics, siga estos pasos:

1. [Seleccione su visualización][5].
2. Seleccione `Incidents` en el menú desplegable de fuente de datos.
3. Seleccione una medida en el menú desplegable amarillo.
     - **Default Statistic:** Cuenta el número de incidentes.
4. Seleccione una agregación para la medida.
5. (Opcional) Seleccione un rollup para la medida.
6. (Opcional) Use la barra de búsqueda para filtrar la estadística a un subconjunto específico de incidentes.
7. (Opcional) Seleccione una faceta en el menú desplegable rosa para desglosar la medida por grupo y seleccione un número limitado de grupos para mostrar.
8. [Ponga título al gráfico][6].
9. Guarde su widget.

### Ejemplo: Duración del impacto en el cliente por interrupciones semanales agrupada por servicio {#example-weekly-outage-customer-impact-duration-grouped-by-service}

{{< img src="/incident_response/incident_management/analytics_and_reporting/analytics_graph_configuration.png" alt="Configuración del gráfico de series temporales que muestra la fuente de datos Incidents filtrada por gravedad y la duración del impacto en el cliente agrupada por servicio" style="width:90%;" >}}

Esta configuración de ejemplo muestra una agregación de sus incidentes SEV-1 o SEV-2. El gráfico muestra la medida Customer Impact Duration de esos incidentes, agrupada por servicio.

1. Widget: [Gráfico de líneas de series temporales][8]
2. Fuente de datos: `Incidents`
3. Medida: `Customer Impact Duration`
4. Agregación: `avg`
5. Rollup: `1w`
6. Filtro: `severity:("SEV-1" OR "SEV-2")`
7. Grupo: `Services`, limitar a los 5 principales

## Informe de incidentes {#incident-report}

Utilice la plantilla preconfigurada de Notebooks para crear el Incident Report o cree uno desde cero para obtener un informe resumido de los incidentes de su equipo o servicio.
1. Abra la [plantilla de Incident Report][9].
1. Haga clic en **Use Template** para editar y personalizar.
1. Puede usar las celdas Incident existentes o personalizar la consulta para mostrar los valores de cada medida.
1. Actualice las celdas de resumen con los valores relevantes y [comparta el informe][10] con el resto de su equipo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/dashboards/
[2]: /es/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /es/dashboards/querying/#select-your-visualization
[6]: /es/dashboards/querying/#create-a-title
[7]: /es/incident_response/incident_management/setup_and_configuration/property_fields
[8]: /es/dashboards/widgets/timeseries/
[9]: https://app.datadoghq.com/notebook/template/11/incident-report
[10]: /es/notebooks/#share-notebooks
[11]: https://app.datadoghq.com/incidents/settings#information
[12]: /es/incident_response/incident_management/setup_and_configuration/variables/#incident-variables