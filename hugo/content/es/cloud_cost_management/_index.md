---
aliases:
- /es/infrastructure/cloud_cost_management
- /es/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - cloud cost
    - cloud integrations
    - cloud cost management
    - cloud cost aws
    - cloud cost azure
    - cloud cost google cloud
    - cloud cost gcp
    - data collected aws
    - data collected azure
    - data collected google cloud
further_reading:
- link: /monitors/types/cloud_cost/
  tag: Documentación
  text: Cree un monitor de costos de Cloud Cost
- link: /cloud_cost_management/tags/
  tag: Documentación
  text: Obtenga información sobre las etiquetas en Cloud Cost Management
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentación
  text: Utilice la Cloud Cost Skill en Bits Chat
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Obtenga visibilidad y control de su gasto en la nube con Datadog Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsar el ROI de la IA: cómo Datadog conecta el costo, el rendimiento y
    la infraestructura para que usted pueda escalar de manera responsable'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Comprenda su gasto en Kubernetes y ECS con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Faculte a los ingenieros para que se hagan cargo de los costos de Google Cloud
    con Datadog
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analice de forma rápida y exhaustiva los costos de la nube y SaaS detrás de
    sus servicios
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Aprendizajes clave del estudio State of Cloud Costs
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: Blog
  text: Haga un seguimiento de la economía unitaria con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica de FinOps exitosa en Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: Blog
  text: Cómo ahorramos $1.5 millones al año con Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: Blog
  text: Administre y optimice sus costos de OCI con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Cómo Cambia Health Solutions ahorró $30,000 mensuales con Cloud Cost Management
    y el Datadog Resource Catalog
- link: https://www.datadoghq.com/blog/flexible-sheets-cloud-cost-management/
  tag: Blog
  text: Analice Cloud Cost con Sheets flexibles en Datadog Sheets
title: Cloud Cost Management
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explore los costos de su proveedor de nube y correlacione estos con datos de telemetría en tiempo real Obtenga información útil y alertas sobre el origen de sus costos en la nube, cómo están cambiando y dónde encontrar posibles optimizaciones.
{{< /learning-center-callout >}}

## Descripción general {#overview}

Cloud Cost Management proporciona información para que los equipos de ingeniería y finanzas comprendan cómo los cambios en la infraestructura afectan los costos, asignen el gasto en toda su organización e identifiquen ineficiencias.

{{< img src="cloud_cost/summary.png" alt="Obtenga información sobre todos los costos y el uso de su proveedor de nube en la página Cloud Costs Summary en Datadog" style="width:100%;" >}}

Datadog ingiere sus datos de costos en la nube y los transforma en métricas que puede usar en una consulta de búsqueda en la página [**Explorer**][1]. Si los costos aumentan, puede correlacionar el incremento con las métricas de uso para determinar la causa raíz.

## Configuración {#setup}

{{< whatsnext desc="Para comenzar a administrar sus costos en la nube con Cloud Cost Management, consulte la siguiente documentación.">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u>: Configure Cloud Cost Management para su factura de AWS.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u>: Configure Cloud Cost Management para su factura de Azure. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u>: Configure Cloud Cost Management para su factura de Google Cloud. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u>: Configure Cloud Cost Management para su factura de Oracle. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>Costos de SaaS e IA</u>: Envíe datos de costos desde un proveedor de costos SaaS compatible a Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Costos personalizados</u>: Cargue cualquier fuente de datos de costos a Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Costos de Datadog</u>: Visualice el gasto diario y las métricas de utilización de Datadog. {{< /nextlink >}}
 {{< /whatsnext >}}

## Utilice datos de Cloud Cost {#use-cloud-cost-data}

Visualice el gasto en infraestructura junto con las métricas de utilización relacionadas con un período de retención de 15 meses para detectar posibles ineficiencias y oportunidades de ahorro.

Al crear un tablero, seleccione {{< ui >}}Cloud Cost{{< /ui >}} como fuente de datos para su consulta de búsqueda.

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost disponible como fuente de datos en la creación de widgets de tablero" style="width:80%;" >}}

Opcionalmente, puede exportar mediante programación un gráfico de series temporales de sus datos de Cloud Cost utilizando la [Metrics API][2].

## Utilice datos de costos diarios de Datadog {#use-daily-datadog-cost-data}

Visualice el gasto diario de Datadog junto con las métricas de utilización relacionadas con un período de retención de 15 meses para detectar posibles ineficiencias y oportunidades de ahorro. Obtenga más información sobre [Datadog Costs][8].

Al crear un tablero, seleccione {{< ui >}}Cloud Cost{{< /ui >}} como fuente de datos y luego elija {{< ui >}}Datadog{{< /ui >}} entre los tipos de costos disponibles.

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Costos de Datadog como opción para la fuente de datos de Cloud Cost en un tablero" style="width:80%;" >}}

Opcionalmente, puede exportar mediante programación un gráfico de series temporales de sus datos de costos de Datadog utilizando la [Metrics API][2].

## Etiquetado y asignación de costos {#tagging-and-cost-allocation}

Aprenda cómo se recopilan, enriquecen y administran las etiquetas en Cloud Cost Management leyendo la [documentación de etiquetas][5]

Puede crear reglas de etiquetas para corregir etiquetas faltantes o incorrectas, y agregar etiquetas inferidas que se alineen con la lógica de negocio de su organización.

## Cree un monitor de costos {#create-a-cost-monitor}

Gestione y optimice de forma proactiva su gasto en la nube creando un [Cloud Cost Monitor][3]. Elija entre los tipos de monitor {{< ui >}}Cost Changes{{< /ui >}}, {{< ui >}}Cost Anomalies{{< /ui >}}, {{< ui >}}Cost Threshold{{< /ui >}}, {{< ui >}}Cost Forecast{{< /ui >}} o {{< ui >}}Budget{{< /ui >}}. Consulte [Cloud Cost Monitors][3] para obtener detalles sobre cada tipo.

{{< img src="cloud_cost/monitor-2.png" alt="Cree un monitor de costos de Cloud Cost que alerte sobre cambios en los costos" style="width:100%;" >}}

## Asigne costos {#allocate-costs}

Utilice [Container Cost Allocation metrics][4] para descubrir los costos asociados con clústeres y cargas de trabajo en Kubernetes, Amazon ECS, Azure y Google Cloud. Puede obtener visibilidad de los costos a nivel de pod, identificar los costos de recursos inactivos y analizar los costos por tipo de recurso.

## Permisos {#permissions}

Cloud Cost Management utiliza los siguientes permisos para controlar el acceso a los datos de costos y a la mayoría de las configuraciones de CCM:
- `cloud_cost_management_read`
- `cloud_cost_management_write`

Para obtener un desglose detallado de los requisitos por página, consulte [Permissions][9].

## Revise el historial de datos {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Visualice su historial de datos de Cloud Cost en la configuración de Cloud Cost." style="width:100%;" >}}

Haga un seguimiento de la actualización y el estado de procesamiento de sus datos de costos en la nube en la página {{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}}.

- {{< ui >}}Last Bill Received{{< /ui >}}: Cuándo recibió Datadog por última vez los datos de facturación de su proveedor de nube o SaaS Esta marca de tiempo no indica la fecha de uso o costo más reciente en esos datos.
- {{< ui >}}Last Processed{{< /ui >}}: Cuándo procesó Datadog por última vez los datos de facturación de su proveedor de nube, incluyendo:
  - Reglas de canalización de etiquetas (procesa retroactivamente hasta 3 meses de datos históricos de forma predeterminada)
  - Reglas de asignación de costos (procesa retroactivamente hasta 1 mes de datos históricos de forma predeterminada)

Utilice esta página para solucionar problemas de retrasos en los datos o confirmar que los cambios recientes en las canalizaciones de etiquetas y la asignación de costos han surtido efecto.

Los datos de costos en la nube solo pueden ser tan recientes como los datos proporcionados por su proveedor. Si faltan costos para una fecha esperada, compare la factura o exportación de su proveedor con CCM. Comuníquese con su proveedor si la fuente no contiene costos para la fecha esperada. Comuníquese con [Datadog Support][11] si la fuente contiene esos costos pero CCM no.

## Utilice IA para el análisis de costos {#use-ai-for-cost-analysis}

Utilice la [Cloud Cost Skill in Bits Chat][10] para investigar cambios en los costos, identificar posibles propietarios, comparar el gasto con los presupuestos, correlacionar los costos con las métricas de observabilidad y crear cuadernos de transferencia para los equipos de ingeniería.

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Resumen de investigación de Bits Chat que muestra un análisis inicial." style="width:60%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/explorer
[2]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /es/monitors/types/cloud_cost/
[4]: /es/cloud_cost_management/container_cost_allocation
[5]: /es/cloud_cost_management/tags/
[6]: /es/account_management/rbac/data_access/
[7]: https://www.datadoghq.com/product-preview/data-access-control/
[8]: /es/cloud_cost_management/datadog_costs
[9]: /es/cloud_cost_management/setup/permissions
[10]: /es/cloud_cost_management/cloud_cost_skill/
[11]: /es/help/