---
description: Aprende a utilizar Multisource Querying para consultar los costes de
  diferentes proveedores en Cloud Cost Management.
further_reading:
- link: https://www.datadoghq.com/blog/focus-cost-data/
  tag: Blog
  text: Monitorizar tus costes multinube con Cloud Cost Management y FOCUS
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /cloud_cost_management/container_cost_allocation
  tag: Documentación
  text: Más información sobre Container Cost Allocation
is_beta: true
title: Multisource Querying
---

## Información general

Una vez que empieces a ingerir tus costes de [AWS][1], [Azure][2], [Google Cloud][3], [SaaS][4] o [Datadog ][5] en [Cloud Cost Management][6], podrás consultar los costes de todos los proveedores de forma flexible. Multisource Querying te permite consultar los costes de varios proveedores utilizando etiquetas (tags) de forma constante y estandarizada, en lugar de crear varias consultas para cada proveedor.

Utiliza Multisource Querying para crear vistas de costes, comprender el coste total de propiedad del servicio y recibir alertas sobre cambios y tendencias de costes en la [página **Explorer**][6], en [dashboards][7], en [notebooks][8] y en [costes de monitores][9].

## Configuración

Para utilizar Multisource Querying, asegúrate de haber configurado [Cloud Cost Management][10] y de estar ingiriendo costes de forma activa en Datadog. Se admiten varias divisas y los costes se convierten automáticamente a USD y se muestran en USD.

## Consultar datos de tus costes

Puedes seleccionar varios proveedores en el campo **Provider** (Proveedor) de la página [**Explorer**][6].

{{< img src="cloud_cost/multisource_querying/provider.png" alt="El campo de Proveedor debajo de la consulta de búsqueda en la página de Cloud Cost Explorer" style="width:40%;" >}}

Los filtros desplegables como **Proveedor** y **Equipo** mantienen la flexibilidad y agilizan el proceso de crear una consulta de búsqueda para que puedas refinar los datos de tus costes. Para añadir un filtro, haz clic en **+ Filter** (+ Filtro).

{{< img src="cloud_cost/multisource_querying/filters_2.png" alt="Una consulta de búsqueda que utiliza el filtro Equipo y agrupa informes por servicio en la página Cloud Cost Explorer" style="width:100%;" >}}

Haz clic en **Refine Results** (Refinar resultados) para acceder a las siguientes opciones y filtrar los datos de tus costes.

Sólo gastos de uso
: Examina los costes afectados por los equipos de ingeniería, excluyendo créditos, tasas e impuestos.

Sólo días completos
: Excluye los dos últimos días de datos de costes, que están incompletos.

Coste total
: Filtra los datos para ver los costes dentro de un intervalo de costes específico.

Cambio de dólar
: Muestra sólo los cambios de costes dentro de un rango de cambio de dólar especificado.

Cambio porcentual
: Muestra sólo los cambios de costes dentro de un rango de cambio porcentual especificado.

{{< img src="cloud_cost/multisource_querying/refine_results_1.png" alt="Opciones adicionales para ajustar tus datos de costo en la página Cloud Cost Explorer" style="width:100%;" >}}

## Visualizar los datos de tus costes

Con Multisource Querying, puedes crear visualizaciones utilizando los datos de costes de todos los proveedores en tus [dashboards][11].

{{< img src="cloud_cost/multisource_querying/cost_overview.png" alt="Dashboard en Datadog que muestra datos de Cloud Cost Management de varios proveedores, como Snowflake, Azure, Google Cloud, AWS y más" style="width:100%;" >}}

## Datos recopilados

### Métrica de costes

Multisource Querying utiliza la métrica `all.cost`, que combina todas las métricas de costes individuales de nube y SaaS en una vista unificada en la página **Analytics**.

**Nota:** La métrica `all.cost` no incluye etiquetas de nivel de recurso. Para ver los costes por recurso, utiliza las métricas de coste específicas de cada proveedor (como `aws.cost.amortized`). Cuando se filtra a un proveedor específico en la consulta de búsqueda, Datadog cambia automáticamente a la métrica específica del proveedor correspondiente, lo que permite realizar una consulta más detallada de los datos de costes.

### Etiquetas predefinidas

Cloud Cost Management recopila etiquetas para las integraciones AWS, Azure y Google Cloud. Esta tabla proporciona una lista no exhaustiva de etiquetas compartidas por cada integración.

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `allocated_resource` | Tipo de recurso utilizado por una carga de trabajo de contenedor (como `cpu` o `mem`). |
| `allocated_spend_type` | Los costes por contenedor se dividen en tres tipos de gastos: recursos utilizados por una carga de trabajo (`usage`); recursos reservados por una carga de trabajo, pero no utilizados (`workload_idle`); y recursos no reservados ni utilizados por ninguna carga de trabajo (`cluster_idle`). |
| `ecs_cluster_name` | Nombre del clúster ECS que aloja una carga de trabajo. |
| `kube_cluster_name` | Nombre del clúster Kubernetes que aloja una carga de trabajo. |
| `orchestrator` | Orquestador del contenedor (como `kubernetes` o `ecs`). |

### Enriquecimiento de etiquetas

Cloud Cost Management enriquece todos los datos de costes de los proveedores con etiquetas que adhieren a la [especificación FinOps FOCUS][12]. FOCUSTM es una especificación técnica que normaliza los datos de costes y la facturación por uso entre proveedores de nube.

Las etiquetas de FOCUS te permiten consultar conceptos similares entre proveedores. Por ejemplo, si quieres ver el coste por cuenta en AWS y Azure, no es necesario crear dos consultas (una para los costes de AWS agrupados por `aws_member_account_name` y otra para los costes de Azure agrupados por `subscriptionname`). Puedes utilizar una consulta de búsqueda que filtre los costes de AWS y Azure agrupados por `subaccountname`.

Cloud Cost Management añade versiones en minúsculas de los ID de columnas de especificaciones a todas las métricas de costes.

Las siguientes etiquetas de FOCUS están disponibles en Cloud Cost Management:

| Nombre de la etiqueta | Descripción de la etiqueta |
|---|---|
| `providername` | Nombre de la entidad que puso a la venta recursos o servicios. |
| `servicename` | Oferta que se puede adquirir a un proveedor (por ejemplo, máquina virtual en la nube, base de datos SaaS, servicios profesionales de un integrador de sistemas). |
| `billingaccountid` | Identificador asignado a una cuenta de facturación por el proveedor. |
| `billingaccountname` | Nombre para mostrar, asignado a una cuenta de facturación. |
| `billingcurrency` | La divisa en la que se pagó una factura de nube. |
| `subaccountid` | Identificador asignado a una agrupación de recursos o servicios, utilizado a menudo para gestionar el acceso o los costes. |
| `subaccountname` | Nombre asignado a una agrupación de recursos o servicios, utilizado a menudo para gestionar el acceso o los costes. |
| `regionname` | Nombre de una zona geográfica aislada en la que se suministra un recurso o se proporciona un servicio. |
| `availabilityzone` | Identificador asignado por el proveedor a un área físicamente separada y aislada dentro de una región que proporciona alta disponibilidad y tolerancia a fallos. |
| `pricingunit` | Unidad de medida especificada por el proveedor para determinar los precios unitarios, que indica cómo valora el proveedor el uso medido y las cantidades de compras tras aplicar reglas de precios como la tarificación por bloques. |

La métrica `all.cost` tiene [costes de contenedor asignados][13] para costes de AWS, Azure y Google Cloud, por lo que se pueden realizar consultas por las [etiquetas de contenedor relevantes][14].

<div class="alert alert-warning">Si tu organización utiliza cualquiera de estas etiquetas de FOCUS, Datadog recomienda actualizar tu clave de etiquetas en la infraestructura subyacente para que los valores de las etiquetas no se superpongan a los valores de las etiquetas de FOCUS en Cloud Cost Management.</div>

## Conversión de divisas
Cloud Cost Management recupera la divisa de facturación de la factura de cada proveedor de nube. Cuando procesas costes de múltiples proveedores en diferentes divisas, los cargos por costes se convierten a USD. Esta conversión se realiza al tipo de cambio medio mensual, que se actualiza diariamente. Esto garantiza que Cloud Cost Management pueda representar de forma coherente y precisa todos los datos de costes, independientemente de su divisa original. Para ver tu coste en la divisa original de facturación, filtra a un único proveedor.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/setup/aws
[2]: /es/cloud_cost_management/setup/azure
[3]: /es/cloud_cost_management/setup/google_cloud
[4]: /es/cloud_cost_management/setup/saas_costs
[5]: /es/cloud_cost_management/datadog_costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /es/dashboards
[8]: /es/notebooks
[9]: /es/cloud_cost_management/monitors
[10]: /es/cloud_cost_management
[11]: https://app.datadoghq.com/dashboard/lists
[12]: https://focus.finops.org/#obtain
[13]: /es/cloud_cost_management/container_cost_allocation
[14]: /es/cloud_cost_management/container_cost_allocation/?tab=aws#applying-tags