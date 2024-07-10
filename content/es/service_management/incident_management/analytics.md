---
aliases:
- /es/monitors/incident_management/analytics
description: Seguimiento y análisis de las estadísticas agregadas de gestión de incidencias
  en dashboards y notebooks
title: Análisis de la gestión de incidencias
---

## Información general

{{< img src="service_management/incidents/incident_analytics.mp4" alt="Análisis de gestión de incidencias" video=true style="width:80%;">}}

El análisis de gestión de incidencias es una fuente de datos consultable de estadísticas agregadas de incidencias. Puedes consultar estos análisis en una variedad de widgets de gráficos en [dashboards][1] y [notebooks][2] para analizar tu historial de respuesta a incidencias a lo largo del tiempo. Como punto de partida, Datadog te brinda una [plantilla de dashboard][3] y una [plantilla de notebook][4] de descripción general de la gestión de incidencias que puedes clonar y personalizar según sea necesario.

Los siguientes widgets son compatible con el análisis de gestión de incidencias:

* Series temporales
* Lista de principales
* Valor de la consulta 

### Medidas

Datadog ofrece las siguientes medidas agregadas listas para usar para la creación de consultas analíticas:

1. Recuento (*)
2. Duración del impacto en el cliente
3. Duración del estado activo (cantidad de tiempo que la incidencia estuvo en estado `Active`)
4. Duración del estado estable (cantidad de tiempo que la incidencia estuvo en estado `Stable`)
5. Tiempo de reparación (hora de finalización del impacto en el cliente-hora de creación de la incidencia)
6. Tiempo de resolución (hora de resolución-hora de creación)

Además de estos valores predeterminados, puedes crear nuevas medidas al añadir campos de propiedad *Número* personalizados en tu [Configuración de incidencias][7]. 

### Configuración de gráficos

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

**Ejemplo:** Duración semanal del impacto en el cliente de la interrupción por servicio

1. Widget: gráfico lineal de series temporales
2. Fuente de datos: `Incidents`
3. Medida: `Customer Impact Duration`
4. Agregación: `avg`
5. Rollup: `1w`
6. Filtro: `severity:("SEV-1" OR "SEV-2")`
7. Grupo: `Services`, limitado a los primeros 5

{{< img src="service_management/incidents/incident_analytics_query_example.jpeg" alt="Ejemplo de consulta al análisis de incidencias" style="width:80%;">}}

[1]: /es/dashboards/
[2]: /es/notebooks/
[3]: https://app.datadoghq.com/dash/integration/30523/incident-management-overview?from_ts=1632093826308&to_ts=1634685826308&live=true
[4]: https://app.datadoghq.com/notebook/template/11/incident-management-overview
[5]: /es/dashboards/querying/#select-your-visualization
[6]: /es/dashboards/querying/#create-a-title
[7]: /es/service_management/incident_management/incident_settings#property-fields