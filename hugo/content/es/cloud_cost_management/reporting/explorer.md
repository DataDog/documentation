---
description: Consulte y analice los costos de la nube en tiempo real con filtros y
  visualizaciones flexibles.
further_reading:
- link: /cloud_cost_management/reporting/
  tag: Documentación
  text: Cree y guarde informes de costos
- link: /cloud_cost_management/tags/multisource_querying
  tag: Documentación
  text: Consulte los costos en múltiples proveedores
- link: /monitors/types/cloud_cost/
  tag: Documentación
  text: Cree monitores de costos
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
title: Cost Explorer
---
## Descripción general {#overview}

El [Cloud Cost Explorer][1] proporciona una interfaz interactiva basada en consultas para analizar su gasto en la nube en [AWS][2], [Azure][3], [Google Cloud][4], [Oracle][5], [proveedores SaaS][6] y [costos de Datadog][7]. A diferencia de los informes guardados, el explorador le permite realizar análisis ad-hoc con consultas, filtros y visualizaciones flexibles para investigar tendencias de costos, identificar anomalías y responder preguntas específicas sobre su gasto en la nube.

Use el Cost Explorer para:
- Cree consultas personalizadas en múltiples proveedores usando etiquetas, servicios y filtros
- Investigue los cambios de costos a lo largo del tiempo con agrupaciones y desgloses flexibles
- Descargue datos, cree widgets de Dashboard o configure monitores de costos

## Consulte sus datos de costos {#query-your-cost-data}

1. Navegue a [**Cloud Cost > Analyze > Explorer**][1] en Datadog.
2. Cree una consulta de búsqueda usando el editor de consultas o los filtros desplegables:
   - Use el menú desplegable {{< ui >}}Provider{{< /ui >}} para seleccionar uno o más proveedores de nube
   - Haga clic en {{< ui >}}\+ Filter{{< /ui >}} para agregar filtros para servicios, etiquetas, regiones, equipos y otros atributos
   - Escriba directamente en la barra de búsqueda para consultas más avanzadas

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="El generador de consultas de Cloud Cost Explorer que muestra la selección de proveedor, filtros de tipo de costo, búsqueda de etiquetas, filtros de servicio y opciones de agrupación." style="width:100%;" >}}

3. Agrupe sus datos de costos haciendo clic en {{< ui >}}Group by{{< /ui >}} y seleccionando dimensiones como:
   - Nombre del proveedor
   - Nombre del servicio
   - Etiquetas de recursos (como `team`, `env`, `project`)
   - Región
   - ID de cuenta

4. Seleccione un rango de tiempo usando el selector de tiempo para analizar los costos durante diferentes períodos (hora, día, semana, mes o rango personalizado).

**Nota**: Al consultar costos entre múltiples proveedores, las etiquetas a nivel de recurso no están disponibles. Para acceder a etiquetas específicas de recursos, filtre por un solo proveedor en su consulta.

## Panel lateral de Resumen de cambios en los costos {#cost-change-summary-side-panel}

Haga clic en cualquier fila de la tabla en la parte inferior del Explorador para abrir el {{< ui >}}Cost Change Summary panel{{< /ui >}} para ese proveedor, servicio o recurso específico. El panel destaca qué y quién podría estar impulsando los cambios en los costos para el período actual en comparación con el período anterior.

El panel contiene cuatro secciones generales:
- Resumen de cambios en los costos
- Equipos asociados
- Detalles del cambio
- Investigue más a fondo

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="El panel de Resumen de cambios en los costos destaca qué y quién podría estar impulsando los cambios en los costos para el período actual en comparación con el período anterior." style="width:100%;" >}}

En la parte superior, puede ver el **costo total** para el período actual y el cambio de costo en dólares y porcentaje en comparación con el período anterior (**qué sucedió**). 

### Investigue el cambio {#investigate-the-change}

Utilice las secciones {{< ui >}}Change Details{{< /ui >}} y {{< ui >}}Investigate Further{{< /ui >}} para:

- **Identifique anomalías de costos al instante**: Las desviaciones inesperadas en los costos, calculadas con base en datos históricos, se resaltan automáticamente en rojo, lo que le permite centrar su investigación en tendencias críticas.  
     
- **Analice los impulsores del cambio**: determine fácilmente la causa de un cambio en el costo, ya sea que se deba a un cambio en el **uso** (la cantidad de recursos) o a un cambio en el **precio unitario** (el costo por recurso). Por ejemplo, en la captura de pantalla a continuación, el cambio en el gasto es impulsado por un cambio en el precio unitario en lugar del uso; la cantidad de recursos se mantiene estable mientras que el costo por recurso sube y baja, lo que provoca el cambio general en el costo.

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="El cambio en el gasto es impulsado por un cambio en el precio unitario en lugar del uso; la cantidad de recursos se mantiene estable mientras que el costo por recurso sube y baja, lo que provoca el cambio general en el costo" style="width:100%;" >}}

### Colabore y haga un seguimiento {#collaborate-and-monitor}

- **Comuníquese con el equipo responsable**:
  - Revise la sección {{< ui >}}Associated Team(s){{< /ui >}} para identificar qué equipos poseen los recursos que impulsan el cambio en el costo (inferido a partir de etiquetas como `team:shopist`). Haga un seguimiento con los equipos enumerados (por ejemplo, Shopist, Platform, Cloud-Networks) para obtener el contexto completo del cambio.
  - Haga clic en {{< ui >}}Send Notebook{{< /ui >}} para compartir el contexto completo de la investigación de costos directamente con el equipo, permitiéndoles capturar hallazgos, agregar anotaciones y realizar un seguimiento del hilo de la investigación.

- **Filtrar por etiquetas**:
  - Use {{< ui >}}Associated Tags{{< /ui >}} para ver todas las etiquetas que contribuyen a la partida de costo.
  - Haga clic en cualquier valor de etiqueta (como `account:demo` o una `aws_account` específica) para refinar su búsqueda y filtrar todo el Explorador para mostrar solo los recursos con esa etiqueta.

- **Cree un Cloud Cost Monitor**:
  - Configure un Cloud Cost Monitor para recibir alertas la próxima vez que ocurra un cambio similar. Obtenga más información sobre [Cloud Cost Monitors][8].

## Refinar sus resultados {#refine-your-results}

Haga clic en {{< ui >}}Refine Results{{< /ui >}} para acceder a opciones de filtrado avanzadas que le ayudan a enfocarse en patrones de costos específicos.

   {{< img src="cloud_cost/reporting/refine-results.png" alt="El panel Refinar resultados muestra opciones de filtrado que incluyen Solo cargos por uso, Solo días completos, Costo total, Cambio en dólares y Cambio porcentual" style="width:100%;" >}}

{{< ui >}}Complete Days Only{{< /ui >}}
: Excluya los últimos dos días de datos de costos, que pueden estar incompletos. Utilice esta opción para un análisis histórico preciso.

{{< ui >}}Total Cost{{< /ui >}}
: Filtre los datos para visualizar los costos dentro de un rango de dólares específico (por ejemplo, mostrar solo los recursos que cuestan más de $1,000).

{{< ui >}}Dollar Change{{< /ui >}}
: Muestre solo los cambios de costos dentro de un rango de cambio de dólares especificado (por ejemplo, mostrar servicios con un aumento de $500+).

{{< ui >}}Percent Change{{< /ui >}}
: Muestre solo los cambios de costos dentro de un rango de porcentaje especificado (por ejemplo, mostrar recursos con un aumento de costos del 20%+).

## Cambie las vistas de datos {#change-data-views}

El Explorador de costos muestra sus datos de costos como un gráfico de series temporales con un desglose en tabla. Puede cambiar la forma en que el gráfico muestra los datos seleccionando entre las siguientes vistas:

- {{< ui >}}Costs ($){{< /ui >}}: Visualizar los costos totales en dólares a lo largo del tiempo
- {{< ui >}}Change trends (%){{< /ui >}}: Visualizar los cambios de costos como aumentos o disminuciones porcentuales
- {{< ui >}}Change trends ($){{< /ui >}}: Visualizar los cambios de costos en montos en dólares

{{< img src="cloud_cost/reporting/change-view.png" alt="Menú desplegable que muestra tres opciones de vista: Costos en $, Tendencias de cambio en % y Tendencias de cambio en $" style="width:100%;" >}}

Cambie entre estas vistas para identificar si está realizando un seguimiento de los costos absolutos o investigando las variaciones de costos.

### Opciones de visualización de tabla{#table-display-options}

Debajo del gráfico, la tabla muestra los costos desglosados por la agrupación seleccionada (como proveedor, nombre del servicio o etiquetas). Puede personalizar cómo se muestran estos datos.

{{< img src="cloud_cost/reporting/table-display-options.png" alt="Opciones de visualización de tabla que muestran los modos de vista Resumen y Desglose, selectores de visibilidad de columnas y el filtro Solo cambios principales" style="width:100%;" >}}

**Modos de vista**
- {{< ui >}}Summary{{< /ui >}}: Visualizar los costos agregados en todos los períodos de tiempo para obtener una descripción general de alto nivel
- {{< ui >}}Breakdown{{< /ui >}}: Vea los costos desglosados por período de tiempo (diario, semanal o mensual, según el rango de tiempo seleccionado)

**Filtros**
- {{< ui >}}Top changes only{{< /ui >}}: Marque esta casilla para filtrar la tabla y mostrar solo los recursos o servicios con los mayores aumentos o disminuciones de costos

**Visibilidad de columnas**

Muestre u oculte columnas en la tabla para enfocarse en las métricas que importan:
- {{< ui >}}Total{{< /ui >}}: Costos totales agregados para cada recurso o servicio
- {{< ui >}}Dollar change trends{{< /ui >}}: Cambios en los costos en montos en dólares a lo largo del tiempo
- {{< ui >}}Change trends{{< /ui >}}: Cambios en los costos basados en porcentajes a lo largo del tiempo

## Exportar y compartir {#export-and-share}

Después de analizar los costos en el explorador, puede:

### Exportar a csv {#export-to-csv}
Descargue sus datos de costos para análisis sin conexión, informes o para compartirlos con las partes interesadas. Haga clic en el botón {{< ui >}}Export{{< /ui >}} y seleccione {{< ui >}}Download as CSV{{< /ui >}}.

### Cree un widget de Dashboard {#create-a-dashboard-widget}
Guarde su consulta actual como un widget de Dashboard para hacer un seguimiento de los costos junto con otras métricas:
1. Haga clic en {{< ui >}}Export{{< /ui >}} y seleccione {{< ui >}}Export to Dashboard{{< /ui >}}.
2. Elija un dashboard existente o cree uno.
3. Personalice el título y la configuración del widget.

### Cree un monitor de costos {#create-a-cost-monitor}
Configure alertas basadas en su consulta actual para recibir notificaciones cuando los costos excedan los umbrales o cambien inesperadamente:
1. Haga clic en {{< ui >}}Export{{< /ui >}} y seleccione {{< ui >}}Create Monitor{{< /ui >}}.
2. Configure las condiciones de alerta (por ejemplo, cuando los costos superen los $10,000 o aumenten un 20%).
3. Establezca los canales de notificación (correo electrónico, Slack, PagerDuty).

Obtenga más información sobre [Cloud Cost Monitors][8].

### Comparta su consulta {#share-your-query}
Copie la URL de su navegador para compartir su consulta de costos actual con los miembros del equipo. La URL incluye todos los filtros, agrupaciones y configuraciones de rango de tiempo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/explorer
[2]: /es/cloud_cost_management/aws/
[3]: /es/cloud_cost_management/azure/
[4]: /es/cloud_cost_management/google_cloud/
[5]: /es/cloud_cost_management/oracle/
[6]: /es/cloud_cost_management/saas_costs/
[7]: /es/cloud_cost_management/datadog_costs/
[8]: /es/monitors/types/cloud_cost/
[9]: /es/cloud_cost_management/reporting/