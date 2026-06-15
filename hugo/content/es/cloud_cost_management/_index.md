---
aliases:
- /es/infrastructure/cloud_cost_management
- /es/integrations/cloudability
cascade:
  algolia:
    rank: 70
    subcategory: Cloud Cost Management
    tags:
    - coste de la nube
    - integraciones en la nube
    - cloud cost management
    - coste de la nube aws
    - coste de la nube azure
    - coste de la nube google cloud
    - coste de la nube gcp
    - datos recopilados aws
    - datos recopilados azure
    - datos recopilados google cloud
further_reading:
- link: https://www.datadoghq.com/blog/control-your-cloud-spend-with-datadog-cloud-cost-management/
  tag: Blog
  text: Obtener visibilidad y control de tus gastos en la nube con Datadog Cloud Cost
    Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-container-support/
  tag: Blog
  text: Comprender tus gastos de Kubernetes y ECS con Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permitir a los ingenieros hacerse cargo de los costes de Google Cloud con
    Datadog
- link: https://www.datadoghq.com/blog/total-cost-of-service-ownership-ccm/
  tag: Blog
  text: Analizar de forma rápida y exhaustiva los costes de la nube y de SaaS de tus
    servicios
- link: /monitors/types/cloud_cost/
  tag: Documentación
  text: Crear un monitor de costes de la nube
- link: /cloud_cost_management/tag_pipelines/
  tag: Documentación
  text: Más información sobre Tag Pipelines
- link: /cloud_cost_management/tag_pipelines
  tag: Documentación
  text: Estandarizar etiquetas en Cloud Cost Management con Tag Pipelines
- link: https://www.datadoghq.com/blog/cloud-costs-study-learnings/
  tag: Blog
  text: Principales aprendizajes del estudio sobre el estado de los costes de la nube
title: Cloud Cost Management
---

{{< learning-center-callout header="Unirse a una sesión de un seminario web de habilitación" hide_image="true" btn_title="Inscribirse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Cloud+Cost+Management">}}
Explora los costes de tu proveedor de nube y correlaciónalos con datos telemétricos en tiempo real. Obtén información práctica y alertas sobre la procedencia de tus costes de nube, cómo están cambiando y dónde encontrar posibles optimizaciones.
{{< /learning-center-callout >}}

## Información general

Cloud Cost Management proporciona información a los equipos de ingeniería y finanzas para que comprendan cómo afectan los cambios de infraestructura a los costes, asignen gastos en toda la organización e identifiquen ineficiencias.

{{< img src="cloud_cost/overview_2.png" alt="Obtener información de costes y uso de tu proveedor de nube en la página de Datadog Información general de costes de la nube" style="width:100%;" >}}

Datadog ingiere tus datos de costes de la nube y los transforma en métricas que puedes utilizar en una consulta de búsqueda en la página [**Analytics**][1]. Si los costes aumentan, puedes correlacionar el aumento con las métricas de uso para determinar la causa raíz.

## Configuración

{{< whatsnext desc="Para empezar a gestionar tus costes en la nube con Cloud Cost Management, consulta la siguiente documentación.">}}
  {{< nextlink href="/cloud_cost_management/aws">}}<u>AWS</u>: Configura Cloud Cost Management para tu factura de AWS.{{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/azure">}}<u>Azure</u>: Configura Cloud Cost Management para tu factura de Azure. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/google_cloud">}}<u>Google Cloud</u>: Configura Cloud Cost Management para tu factura de Google Cloud. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/saas_costs">}}<u>Integraciones de costes SaaS</u>: Envía datos de costes desde un proveedor de costes SaaS compatible a Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/custom">}}<u>Costes personalizados</u>: Carga cualquier fuente de datos de costes en Datadog. {{< /nextlink >}}
  {{< nextlink href="/cloud_cost_management/datadog_costs">}}<u>Costes de Datadog</u>: Visualiza métricas de gastos y uso diarios de Datadog. {{< /nextlink >}}
 {{< /whatsnext >}}

## Uso de los datos de costes de la nube

Visualiza las métricas de gastos de infraestructura junto a las métricas de uso asociadas con un periodo de conservación de 15 meses para detectar posibles ineficiencias y oportunidades de ahorro.

Al crear un dashboard, selecciona **Costes de la nube** como fuente de datos para tu consulta de búsqueda.

{{< img src="cloud_cost/cloud_cost_data_source.png" alt="Costes de la nube disponibles como fuente de datos durante la creación del widget de dashboard" style="width:100%;" >}}

Opcionalmente, puedes exportar mediante programación un gráfico de series temporales de tus datos de costes de nube utilizando la [API de métricas][2].

## Uso de los datos de costes diarios de Datadog 

Visualiza las métricas de gastos de Datadog junto a las métricas de uso asociadas con un periodo de conservación de 15 meses para detectar posibles ineficiencias y oportunidades de ahorro.

Al crear un dashboard, selecciona **Costes de la nube** como fuente de datos para tu consulta de búsqueda.

{{< img src="cloud_cost/datadog_costs/dashboard.png" alt="Costes de Datadog como opción de fuente de datos de Costes de nube en un dashboard" style="width:100%;" >}}

Opcionalmente, puedes exportar mediante programación un gráfico de series temporales de tus datos de costes de Datadog utilizando la [API de métricas][2].

## Crear reglas de etiquetado

Utiliza [Tag Pipelines][5] para garantizar un seguimiento exhaustivo de los costes mediante la estandarización de etiquetas (tags) en todos los recursos de la nube. Esto evita que se pase por alto cualquier dato de costes.

{{< img src="cloud_cost/tags_addnew.png" alt="Crear una regla de etiquetado en Tag Pipelines para asegurarse de que los recursos en la nube utilicen etiquetas (tags) estándar" style="width:60%;" >}}

Puede crear reglas de etiquetado para corregir etiquetas omitidas o incorrectas y añadir etiquetas inferidas que se ajusten a la lógica empresarial de tu organización.

## Crear un monitor de costes

Gestiona y optimiza de forma proactiva tus gastos en la nube creando un [monitor de costes en la nube][3]. Puedes elegir **Cambios en costes** o **Umbral de costes** para monitorizar tus gastos en la nube.

{{< img src="cloud_cost/monitor.png" alt="Crear un monitor de costes en la nube para generar alertas cuando hay cambios en los costes" style="width:100%;" >}}

## Asignar costes

Utiliza [métricas de asignación de costes de contenedor][4] para detectar costes asociados a clústeres y cargas de trabajo en Kubernetes, AWS ECS, Azure y Google Cloud. Obtén una visibilidad de los costes a nivel de pod, identifica los costes de recursos ociosos y analiza los costes por tipo de recurso.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analytics
[2]: /es/api/latest/metrics/#query-timeseries-data-across-multiple-products
[3]: /es/monitors/types/cloud_cost/
[4]: /es/cloud_cost_management/container_cost_allocation
[5]: /es/cloud_cost_management/tag_pipelines