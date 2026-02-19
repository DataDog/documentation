---
description: Consulta y analiza los costes de la nube en tiempo real con filtros y
  visualizaciones flexibles.
further_reading:
- link: /cloud_cost_management/reporting/
  tag: Documentación
  text: Crear y guardar informes de costes
- link: /cloud_cost_management/tags/multisource_querying
  tag: Documentación
  text: Consulta de costes entre varios proveedores
- link: /monitors/types/cloud_cost/
  tag: Documentación
  text: Crear monitores de costes
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
title: Cost Explorer
---

## Información general

[Cloud Cost Explorer][1] proporciona una interfaz interactiva basada en consultas para analizar tu gasto en la nube en [AWS][2], [Azure][3], [Google Cloud][4], [Oracle][5], [proveedores de SaaS][6] y [costes de Datadog][7]. A diferencia de los informes guardados, Explorer te permite realizar análisis ad hoc con consultas, filtros y visualizaciones flexibles para investigar tendencias de costes, identificar anomalías y responder a preguntas específicas sobre tu gasto en la nube.

Utiliza el Cost Explorer para:
- Crear consultas personalizadas en varios proveedores utilizando etiquetas, servicios y filtros.
- Investigar las variaciones de los costes a lo largo del tiempo con agrupaciones y desgloses flexibles.
- Descargar datos, crear widgets de dashboards o configurar monitores de costes.

## Consultar datos de tus costes

1. Ve a [**Cloud Cost > Analyze > Explorer**][1] (Coste en la nube > Analizar > Explorer) en Datadog.
2. Construye una consulta de búsqueda utilizando el editor de consultas o los filtros desplegables:
   - Utiliza el menú desplegable **Provider** (Proveedor) para seleccionar uno o varios proveedores de nube
   - Haz clic en **+ Filter** (+ Filtro) para añadir filtros por servicios, etiquetas, regiones, equipos y otros atributos.
   - Escribe directamente en la barra de búsqueda para consultas más avanzadas

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="El compilador de consultas de Cloud Cost Explorer que muestra la selección del proveedor, los filtros de tipo de coste, la búsqueda de etiquetas, los filtros de servicio y las opciones de agrupamiento" style="width:100%;" >}}

3. Agrupa tus datos de costes haciendo clic en **Group by** (Agrupar por) y seleccionando dimensiones como:
   - Nombre del proveedor
   - Nombre del servicio
   - Etiquetas de recursos (como `team`, `env`, `project`)
   - Región
   - ID de cuenta

4. Selecciona un intervalo de tiempo mediante el selector de tiempo para analizar los costes en distintos periodos (hora, día, semana, mes o intervalo personalizado).

**Nota**: Cuando se consultan los costes de varios proveedores, las etiquetas a nivel de recurso no están disponibles. Para acceder a etiquetas específicas de recursos, filtra a un único proveedor en tu consulta.

## Panel lateral de resumen de cambios de costes 

Haz clic en cualquier fila de la tabla en la parte inferior del Explorer para abrir el **panel Resumen de cambios de costes** para ese proveedor, servicio o recurso específico. El panel destaca qué y quién puede estar provocando cambios en los costes del periodo actual en comparación con el periodo anterior.

El panel contiene cuatro secciones generales:
- Resumen de cambios en los costes
- Equipos asociados
- Cambiar detalles
- Seguir investigando

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="El panel Resumen de los cambios en los costes destaca qué o quién impulsa los cambios en los costes para el periodo actual frente al periodo anterior." style="width:100%;" >}}

En la parte superior, puedes ver el **coste total** del periodo actual y el cambio de coste en dólares y porcentajes con respecto al periodo anterior (**qué ha pasado**). 

### Investigar el cambio

Utiliza las secciones **Cambiar detalles** y **Seguir investigando** para:

- **Identificar al instante las anomalías en los costes**: las desviaciones inesperadas en los costes, calculadas con respecto a los datos históricos, se resaltan automáticamente en rojo, lo que te permite centrar tu investigación en las tendencias críticas.  

- **Análisis de los factores de cambio**: determina fácilmente la causa de un cambio en los costes, es decir, si se debe a un cambio en el **uso** (el recuento de recursos) o a un cambio en el **precio unitario** (el coste por recurso). Por ejemplo, en la siguiente captura de pantalla, el cambio en los gastos se debe a un cambio en el precio unitario más que en el uso: el recuento de recursos se mantiene estable mientras que el coste por recurso aumenta y disminuye, lo que provoca el cambio en el coste global.

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="El cambio en el gasto es impulsado por un cambio en el precio de unidad en lugar del uso, el recuento de recursos se mantiene estático mientras el costo por recurso aumenta y disminuye, generando que el cambio general del costo cambie" style="width:100%;" >}}

### Colaborar y monitorizar

- **Contactar con el equipo responsable**:
  - Revisa la sección **Equipo(s) asociado(s)** para identificar qué equipos poseen los recursos que impulsan el cambio de coste (deducido de etiquetas como `team:shopist`). Ponte en contacto con los equipos mencionados (por ejemplo, Shopist, Platform, Cloud-Networks) para conocer el contexto completo del cambio.
  - Haz clic en **Send Notebook** (Enviar notebook) para compartir el contexto completo de la investigación de costes directamente con el equipo, permitiéndoles capturar hallazgos, añadir anotaciones y seguir el subproceso de la investigación.

- **Filtrar por etiquetas**:
  - Utiliza **Etiquetas asociadas** para ver todas las etiquetas que contribuyen a la partida de gastos.
  - Haz clic en cualquier valor de la etiqueta (como `account:demo` o una `aws_account` específica) para ajustar tu búsqueda y filtrar todo el Explorer para mostrar solo los recursos con esa etiqueta.

- **Crear un monitor**:
  - Configura un monitor de Cloud Cost para recibir una alerta la próxima vez que se produzca un cambio similar. Más información sobre [Monitores de Cloud Cost][8].

## Ajustar los resultados

Haz clic en **Refine Results** (Ajustar resultados) para acceder a opciones de filtrado avanzadas que te ayudarán a centrarte en patrones de costes específicos.

   {{< img src="cloud_cost/reporting/refine-results.png" alt="El panel Ajustar resultados muestra opciones de filtrado incluido Solo cargos de uso, Solo días completos, Costo total, Cambio de dólar y Cambio de porcentaje" style="width:100%;" >}}

**Sólo días completos**
: excluye los dos últimos días de datos de costes, que pueden estar incompletos. Utiliza esta opción para un análisis histórico preciso.

**Coste total**
: filtra los datos para ver los costes dentro de un rango específico de dólares (por ejemplo, mostrar solo los recursos que cuestan más de 1000 dólares).

**Cambio de dólares**
: muestra solo los cambios de coste dentro de un rango de cambio en dólares especificado (por ejemplo, mostrar los servicios con un aumento de más de 500 dólares).

**Cambio de porcentaje**
: muestra solo los cambios de coste dentro de un rango porcentual especificado (por ejemplo, mostrar los recursos con un incremento de coste superior al 20 %).

## Cambiar las vistas de datos

El Cost Explorer muestra los datos de costes como un gráfico de series temporales con una tabla desglosada. Puedes cambiar la forma en que el gráfico muestra los datos seleccionando una de las siguientes vistas:

- **Costes ($)**: ver los costes totales en dólares a lo largo del tiempo
- **Tendencias de cambio (%)**: visualiza los cambios en los costes como aumentos o disminuciones porcentuales
- **Tendencias de cambio ($)**: ver las variaciones de costes en dólares

{{< img src="cloud_cost/reporting/change-view.png" alt="Menú desplegable que muestra tres opciones de vista: Costes en $, Tendencias de cambio en % y Tendencias de cambio en $" style="width:100%;" >}}

Cambia entre estas vistas para identificar si estás realizando un seguimiento de los costes absolutos o investigando las variaciones de los costes.

### Opciones de visualización de la tabla

Debajo del gráfico, la tabla muestra los costes desglosados por la agrupación seleccionada (como proveedor, nombre del servicio o etiquetas). Puedes personalizar la forma en que se muestran estos datos.

{{< img src="cloud_cost/reporting/table-display-options.png" alt="Opciones de visualización de tablas que muestra los modos de vista Resumen y Desglose, conmutadores de visibilidad de columnas y filtro Solo cambios principales" style="width:100%;" >}}

**Modos de visualización**
- **Resumen**: ver los costes agregados en todos los periodos de tiempo para obtener una visión general.
- **Desglose**: ver los costes desglosados por periodo (diario, semanal o mensual, en función del intervalo de tiempo seleccionado).

**Filtros**
- **Solo los cambios más importantes**: activa esta casilla para filtrar la tabla y mostrar solo los recursos o servicios con los mayores aumentos o disminuciones de costes

**Visibilidad de las columnas**

Muestra u oculta columnas en la tabla para centrarte en las métricas que importan:
- **Total**: costes totales agregados para cada recurso o servicio
- **Tendencias de los cambios en dólares**: evolución de los costes en dólares a lo largo del tiempo
- **Tendencias de los cambios**: evolución porcentual de los costes a lo largo del tiempo

## Exportar y compartir

Tras analizar los costes en el Explorer, puedes:

### Exportar a csv
Descargar tus datos de costes para analizarlos fuera de línea, elaborar informes o compartirlos con las partes interesadas. Haz clic en el botón **Export** (Exportar) y selecciona **Download as CSV** (Descargar como CSV).

### Crear un widget de dashboard
Guarda tu consulta actual como un widget de dashboard para monitorizar costes junto con otras métricas:
1. Haz clic en **Export** y selecciona **Export to Dashboard** (Exportar a dashboard).
2. Elige un dashboard existente o crea uno.
3. Personaliza el título y la configuración del widget.

### Crear un monitor de costes
Configura alertas basadas en tu consulta actual para recibir notificaciones cuando los costes superen los umbrales o cambien inesperadamente:
1. Haz clic en **Export** (Exportar) y selecciona **Create Monitor** (Crear monitor).
2. Configura las condiciones de alerta (por ejemplo, cuando los costes superen los 10 000 dólares o aumenten un 20 %).
3. Establece canales de notificación (correo electrónico, Slack, PagerDuty).

Más información sobre [Monitores de Cloud Cost][8].

### Compartir tu consulta
Copia la URL desde tu navegador para compartir tu consulta de costes actual con los miembros de tu equipo. La URL incluye todos los filtros, agrupaciones y ajustes de intervalo de tiempo.

## Referencias adicionales

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