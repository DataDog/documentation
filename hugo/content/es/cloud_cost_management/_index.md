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
  text: Crea un monitor de costos en Cloud Cost Management
- link: /cloud_cost_management/tags/
  tag: Documentación
  text: Aprende sobre etiquetas en Cloud Cost Management
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentación
  text: Utilice Cloud Cost skill en Bits Chat
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Obtenga visibilidad y control de sus gastos en la nube con Cloud Cost Management
    de Datadog
- link: https://www.datadoghq.com/blog/manage-ai-cost-and-performance-with-datadog/
  tag: Blog
  text: 'Impulsando el ROI de IA: Cómo Datadog conecta costos, rendimiento e infraestructura
    para que pueda escalar de manera responsable'
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Comprenda sus gastos en Kubernetes y ECS con Cloud Cost Management de Datadog
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Empodere a los ingenieros para que asuman la responsabilidad de los costos
    de Google Cloud con Datadog
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analice de forma rápida y exhaustiva los costos de la nube y SaaS detrás de
    sus servicios
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Aprendizajes clave del estudio sobre el estado de los costos en la nube
- link: https://www.datadoghq.com/blog/unit-economics-ccm/
  tag: Blog
  text: Monitoree la economía unitaria con Cloud Cost Management de Datadog
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Cómo hemos creado una práctica exitosa de FinOps en Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-management-saved-millions/
  tag: Blog
  text: Cómo ahorramos $1.5 millones al año con Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci/
  tag: Blog
  text: Gestione y optimice sus costos de OCI con Cloud Cost Management de Datadog
- link: https://www.datadoghq.com/blog/cambia-health-cost-optimization
  tag: Blog
  text: Cómo Cambia Health Solutions ahorró $30,000 mensuales con Cloud Cost Management
    y el Resource Catalog de Datadog
title: Cloud Cost Management
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrese" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
  Explore los costos de su proveedor de nube y corrélalos con datos de telemetría en tiempo real Obtenga información útil y alertas sobre de dónde provienen sus costos en la nube, cómo están cambiando y dónde encontrar posibles optimizaciones
{{< /learning-center-callout >}}

## Resumen {#overview}

Cloud Cost Management proporciona información para los equipos de ingeniería y finanzas para entender cómo los cambios en la infraestructura impactan los costos, asignar gastos en toda su organización e identificar ineficiencias

{{< img src="cloud_cost/summary.png" alt="Obtenga información sobre todos los costos y el uso de su proveedor de nube en la página Cost Summary en Datadog" style="width:100%;" >}}

Datadog ingiere sus datos de costos en la nube y los transforma en métricas que puede usar en una consulta de búsqueda en la página [**Explorer**][1] Si los costos aumentan, puede correlacionar el incremento con las métricas de uso para determinar la causa raíz

## Configuración {#setup}

{{< whatsnext desc="Para comenzar a gestionar sus costos en la nube con Cloud Cost Management, consulte la siguiente documentación">}}
  {{< nextlink href="/cloud_cost_management/setup/aws">}}<u>AWS</u>: Configure Cloud Cost Management para su factura de AWS{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/azure">}}<u>Azure</u>: Configure Cloud Cost Management para su factura de Azure {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/google_cloud">}}<u>Google Cloud</u>: Configure Cloud Cost Management para su factura de Google Cloud {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/oracle">}}<u>Oracle</u>: Configure Cloud Cost Management para su factura de Oracle {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/saas_costs">}}<u>SaaS and AI Costs</u>: Envíe datos de costos desde un proveedor de costos de SaaS compatible a Datadog {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/setup/custom">}}<u>Custom Costs</u>: Suba cualquier fuente de datos de costos a Datadog {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Datadog Costs</u>: Visualice el gasto diario de Datadog y las métricas de utilización {{< /nextlink >}}
 {{< /whatsnext >}}

## Utilice datos de costos en la nube {#use-cloud-cost-data}

Visualice el gasto en infraestructura junto con métricas de utilización relacionadas, con un período de retención de 15 meses para detectar posibles ineficiencias y oportunidades de ahorro

Al crear un tablero, seleccione {{< ui >}}Cloud Cost{{< /ui >}} como la fuente de datos para su consulta de búsqueda

{{< img src="cloud_cost/cloud_cost_data_source-1.png" alt="Cloud Cost disponible como fuente de datos en la creación de widgets de tablero" style="width:80%;" >}}

Opcionalmente, puede exportar programáticamente un gráfico de series temporales de sus datos de costos en la nube utilizando la [Metrics API][2]

## Utilice los datos de costos de Datadog diariamente {#use-daily-datadog-cost-data}

Visualice el gasto diario de Datadog junto con métricas de utilización relacionadas, con un período de retención de 15 meses para identificar posibles ineficiencias y oportunidades de ahorro Aprenda más sobre [Datadog Costs][8]

Al crear un tablero, seleccione {{< ui >}}Cloud Cost{{< /ui >}} como la fuente de datos y luego elija {{< ui >}}Datadog{{< /ui >}} de los tipos de costos disponibles

{{< img src="cloud_cost/datadog_costs/dashboard-updated.png" alt="Datadog Costs como una opción para la fuente de datos de Cloud Cost en un tablero" style="width:80%;" >}}

Opcionalmente, puede exportar programáticamente un gráfico de series temporales de sus datos de costos de Datadog utilizando la [Metrics API][2]

## Etiquetado y asignación de costos {#tagging-and-cost-allocation}

Aprende cómo se obtienen, enriquecen y gestionan las etiquetas en la Gestión de Costos en la Nube leyendo la [documentación de Etiquetas][5].

Puede crear reglas de etiquetas para corregir etiquetas faltantes o incorrectas, y agregar etiquetas inferidas que se alineen con la lógica empresarial de su organización

## Cree un monitor de costos {#create-a-cost-monitor}

Gestione y optimice proactivamente su gasto en la nube creando un [Cloud Cost Monitor][3] Puede elegir {{< ui >}}Cost Changes{{< /ui >}} o {{< ui >}}Cost Threshold{{< /ui >}} para monitorear sus gastos en la nube

{{< img src="cloud_cost/monitor.png" alt="Cree un Cloud Cost Monitor que alerte sobre cambios en los costos" style="width:100%;" >}}

## Asigne costos {#allocate-costs}

Utilice [Container Cost Allocation metrics][4] para descubrir costos asociados con clústeres y cargas de trabajo en Kubernetes, Amazon ECS, Azure y Google Cloud Puede obtener visibilidad sobre los costos a nivel de pod, identificar costos de recursos inactivos y analizar costos por tipo de recurso

## Permisos {#permissions}

Cloud Cost Management utiliza los siguientes permisos para controlar el acceso a los datos de costos y la mayoría de las configuraciones de CCM:
- `cloud_cost_management_read`
- `cloud_cost_management_write`

Para un desglose detallado de los requisitos por página, consulte [Permisos][9].

## Revise el historial de datos {#review-data-history}

{{< img src="cloud_cost/ccm-data-history.png" alt="Vea su historial de datos de Cloud Cost en Cloud Cost settings" style="width:100%;" >}}

Monitoree la frescura y el estado de procesamiento de sus datos de costos en la página {{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Data History{{< /ui >}}.

- {{< ui >}}Last Bill Received{{< /ui >}}: Cuando su proveedor de nube o SaaS generó los datos de facturación visibles en CCM.
- {{< ui >}}Last Processed{{< /ui >}}: Cuando Datadog procesó por última vez los datos de facturación de su proveedor de nube, incluyendo:
  - Reglas de canalización de etiquetas (procesa retroactivamente hasta 3 meses de datos históricos por defecto)
  - Reglas de asignación de costos (procesa retroactivamente hasta 1 mes de datos históricos por defecto)

Utilice esta página para solucionar retrasos en los datos o confirmar que las recientes canalizaciones de etiquetas y cambios en la asignación de costos han tenido efecto.

## Utilice IA para el análisis de costos {#use-ai-for-cost-analysis}

Utilice el [Cloud Cost Skill en Bits Chat][10] para investigar cambios en los costos, identificar propietarios probables, comparar gastos con presupuestos, correlacionar costos con métricas de observabilidad y crear notebooks para equipos de ingeniería.

{{< img src="cloud_cost/cc_skill_cost_summary.png" alt="Resumen de investigación de Bits Chat que muestra un análisis inicial." style="width:60%;" >}}

## Lectura adicional {#further-reading}

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