---
description: Aprende cómo se obtienen, enriquecen y gestionan las etiquetas en Cloud
  Cost Management.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /cloud_cost_management/tags/tag_pipelines
  tag: Documentación
  text: Pipelines de etiquetas
- link: /cloud_cost_management/tags/tag_explorer
  tag: Documentación
  text: Explorador de etiquetas
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
title: Etiquetas
---

## Información general

Las etiquetas te ayudan a investigar y comprender tus costes de nube y SaaS en cualquier dimensión. Las etiquetas constan de claves y valores. Por ejemplo, en `aws_product:ec2`, la clave de etiqueta es `aws_product`, y el valor es `ec2`.

Cloud Cost Management enriquece automáticamente sus datos de costes con etiquetas de múltiples fuentes, para ayudarle a lograr una mejor asignación de costes y obtener una visión más profunda de quién es el propietario de los costes de infraestructura en sus entornos de nube en constante cambio. Gracias a las etiquetas, puede asignar los costes compartidos de forma equitativa, crear informes precisos y realizar un seguimiento de los costes por equipo, servicio o entorno. 

## De dónde vienen las etiquetas

En todos los proveedores de nube y SaaS, Datadog recopila etiquetas de las siguientes fuentes (incluido el enriquecimiento de datos de costes con datos de otros productos de Datadog ) y las añade a tus datos de costes:

| Fuente | Qué etiquetas se recopilan | Descripción |
|---|---|---|
| Todos los proveedores | Columnas de facturas | Por ejemplo, las columnas de AWS Cost and Usage Report (CUR), las columnas de Google Billing Export, etc. |
| Enriquecimiento de Datadog | Agent de host | Etiquetas añadidas a los metadatos del host por Datadog Agent que se ejecuta en el host |
| Enriquecimiento de Datadog | Software Catalog | Etiquetas asociadas a este servicio en APM Service Catalog |
| Enriquecimiento de Datadog | Cuadros de integración | Etiquetas añadidas al cuadro de integración de Datadog para una cuenta en la nube específica. Las etiquetas del cuadro de integración se aplican a todos los costes de esa cuenta. Requiere habilitar la integración del proveedor para cada cuenta |
| Enriquecimiento de Datadog | Data Observability | Etiquetas de Datadog Data Observability, que potencian la asignación de costes de BigQuery. Requiere habilitar la monitorización de BigQuery |
| Enriquecimiento de Datadog | Monitorización de redes en la nube | Fuente y dimensiones de destino de [Datadog Cloud Network Monitoring][12]. Requiere activar Cloud Network Monitoring en el Datadog Agent. Consulta [asignación de costes de transferencia de datos][13] para más detalles. |
| Enriquecimiento de Kubernetes | Nodo de Kubernetes | Etiquetas definidas por el usuario que se encuentran en los nodos de Kubernetes monitorizados con Datadog | 
| Enriquecimiento de Kubernetes | Pod de Kubernetes | Etiquetas definidas por el usuario que se encuentran en pods de Kubernetes monitorizados con Datadog | 
| Enriquecimiento de Kubernetes | Volumen persistente de Kubernetes | Etiquetas definidas por el usuario encontradas en Volúmenes persistentes en clústeres de Kubernetes monitorizados con Datadog |
| Enriquecimiento de Kubernetes | Reclamación de volumen persistente de Kubernetes | Etiquetas definidas por el usuario encontradas en Reclamaciones de volumen persistente en clústeres de Kubernetes monitorizados con Datadog | 
| Cloud Cost Management | Alias de costes de nube | Etiquetas derivadas de los datos de costes del proveedor para simplificar el modelo de datos de costes, como `aws_product` (un alias de `lineItem/ProductCode`). Se añaden etiquetas adicionales que existen tanto en los datos de costes como en las métricas de integración, lo que permite combinar los datos de costes y los datos de uso en reglas de asignación personalizadas, dashboards y notebooks. |
| Cloud Cost Management | Cloud Cost Allocation | Etiquetas creadas durante la [asignación de costes][11] que especifican la división de los recursos compartidos, tales como `allocated_spend_type` |
| Cloud Cost Management | FOCUS | Etiquetas independientes del proveedor conformes con [FOCUS][8], una especificación abierta que normaliza los conjuntos de datos de costes y uso de los distintos proveedores de nubes. |
| Pipelines de etiquetas | Reglas definidas por el usuario | Etiquetas creadas aplicando pipelines de etiquetas a los datos de costes |
| Reglas de asignación personalizadas | Reglas definidas por el usuario | Etiquetas creadas aplicando reglas de asignación personalizadas a los datos de costes (no se aplica a los costes de SaaS) |

Datadog también añade etiquetas específicas para cada proveedor:

| Proveedor | Qué etiquetas se recopilan | Descripción |
|---|---|---|
| AWS | Etiquetas de asignación de costes | Cualquier etiqueta definida por el usuario en etiquetas de [AWS Cost Allocation][1] que aparecen en AWS CUR |
| AWS | API de etiquetado de grupos de recursos de AWS | Etiquetas definidas por el usuario sobre un recurso en la nube en AWS, extraídas por Cloud Cost Management mediante la [API de etiquetado de grupos][10]. |
| AWS | Unidades organizativas de AWS | Etiquetas definidas por el usuario en unidades organizativas de AWS utilizando [AWS Organizations][7] |
| AWS | AWS Organizations: cuentas | Etiquetas definidas por el usuario en una cuenta de AWS utilizando [AWS Organizations][7] |
| Amazon ECS | Tarea de Amazon ECS | Etiquetas definidas por el usuario en una definición de tarea de ECS |
| Amazon ECS | Contenedor de Amazon ECS | Etiquetas definidas por el usuario en un contenedor que se ejecuta en una tarea de ECS |
| Azure | Azure Cost Export: etiquetas de recursos de usuario | Etiquetas definidas por el usuario en un recurso de nube en Azure, que se encuentran en la columna **Tags** (Etiquetas) en Azure Cost Export. No incluye etiquetas de grupos de recursos. |
| Azure | Azure Cost Export: etiquetas de recursos del sistema | Etiquetas definidas por Azure en un recurso en la nube, que se encuentran en la columna **AdditionalInfo** (Información adicional) en Azure Cost Export |
| Google Cloud | Google Billing Export: etiquetas de proyecto| Etiquetas definidas por el usuario en un proyecto en Google Cloud, que se encuentran en la columna **project.labels** (etiquetas de proyecto) de la exportación de facturación. |
| Google Cloud | Google Billing Export: etiquetas de recursos del sistema | Etiquetas generadas por el sistema en un recurso de Google Cloud, que se encuentran en la columna **system_labels** (etiquetas de sistema) de la exportación de facturación. |
| Google Cloud | Google Billing Export: etiquetas de recursos de usuario | Etiquetas definidas por el usuario en un recurso de nube en Google Cloud, que se encuentran en la columna **labels** (etiquetas) de la exportación de facturación. |
| Google Cloud | Google Billing Export: etiquetas de recursos del usuario | Etiquetas definidas por el usuario en un recurso de nube en Google Cloud, que se encuentran en la columna **tags** (etiquetas) de la exportación de facturación. La etiqueta `goog-originating-sku-description` se añade aprovechando las API de SKU de Google, para proporcionar detalles más puntuales de SKU para las partidas de compromiso. |
| Google Cloud | Pod de GKE | Etiquetas definidas por el usuario en pods funcionando en Google Kubernetes Engine | 
| Oracle Cloud | OCI Cost Export: etiquetas de recursos de usuario | Etiquetas definidas por el usuario en un recurso de nube en Oracle Cloud Infrastructure, de la columna **Tags** (Etiquetas) en la exportación de costes de OCI FOCUS. |
| Datadog | Atribución de uso de Datadog | Etiquetas definidas por el usuario para la atribución del uso en Plan y Uso de Datadog |
| Custom Costs | Etiquetas de archivos de costes | Etiquetas definidas por el usuario para cada proveedor, que se encuentran en [archivos de costes][9] cargados en Cloud Cost Management |

## Cómo se normalizan las etiquetas

Las claves y valores de las etiquetas pueden tener un aspecto ligeramente diferente en Cloud Cost Management en comparación con los proveedores u otras partes de Datadog debido a la normalización de las etiquetas. 

Cloud Cost Management normaliza las **claves** de las etiquetas de forma similar a las métricas de Datadog:
- Elimina los caracteres iniciales que no sean letras
- Todos los caracteres en minúsculas
- Sustituye los caracteres especiales y los espacios por guiones bajos simples `_`
- Elimina los guiones bajos finales
- Reducir los guiones bajos contiguos a un único guión bajo
- Se admiten claves de etiquetas de hasta 5000 caracteres, y los caracteres anteriores a la primera letra se eliminan para que las claves de etiquetas empiecen por letras (diferente de las métricas de Datadog).

Cloud Cost Management normaliza también los **valores** de las etiquetas, al tiempo que mantiene los valores de las etiquetas legibles para los informes de costes. Por ejemplo, `aws_instance_family:Machine Learning ASIC Instances` sigue siendo legible en lugar de convertirse en algo como `machine_learning_asic_instances`. La normalización sigue esta lógica:
- Convierte los espacios en blanco consecutivos en un solo espacio
- Conserva todas las letras, marcas, números, signos de puntuación y símbolos.
- Sustituye cualquier otro carácter por un guión bajo `_`
- Se admiten valores de etiqueta de hasta 5000 caracteres

Cloud Cost Recommendations utiliza [reglas de normalización de métricas estándar de Datadog][14]. Los valores de las etiquetas en las recomendaciones se convierten a minúsculas y se limitan a 200 caracteres.
Por ejemplo, una etiqueta `Team:Engineering-Services` aparecería como `team:engineering-services` en las recomendaciones, pero como `team:Engineering-Services` en los datos de costes.

## Cómo se priorizan las etiquetas

Una fila de datos de costes puede tener varios valores para la misma clave de etiqueta cuando se combinan valores de etiqueta de dos o más fuentes y no se prioriza una sobre otra.

Para resolver conflictos y mitigar esta situación, Cloud Cost Management sustituye las etiquetas existentes en lugar de añadir duplicados utilizando la fuente más específica para cada clave de etiqueta. Por ejemplo, una etiqueta de pod de Kubernetes `team:shopping` tendría prioridad y sustituiría a una etiqueta de nodo de Kubernetes `team:compute`.

Las fuentes situadas más arriba en esta lista sustituyen a los valores de las etiquetas de las fuentes situadas más abajo, si hay conflictos:
- Reglas de asignación personalizadas
- FOCUS
- Catálogo de servicios
- Contenedor de Amazon ECS
- Tarea de Amazon ECS
- Pod de Kubernetes
- Volumen persistente de Kubernetes
- Nodo de Kubernetes
- Agent de host

Otras fuentes de etiquetas (como etiquetas de organización de AWS, etiquetas de cuadro de integración y fuentes similares) pueden ser anuladas por estas fuentes. Las columnas Bill y FOCUS están reservadas y no pueden ser sustituidas por ninguna fuente. Las cadenas de etiquetas añaden nuevas etiquetas pero no anulan las existentes.

## Mejorar el etiquetado

1. **Entender qué etiquetas existen**: utiliza el [Tag Explorer][5] para descubrir qué etiquetas están ya disponibles en tus datos de costes.
2. **Identificar brechas en la asignación de costes**: en el Explorer, agrupa por cualquier etiqueta para ver el coste asignado a esa etiqueta, o sin asignar (que se muestra como `N/A`). Asegúrate de tener activada la opción "Container Allocated" (Contenedor asignado) para ver una asignación de costes que incluya las etiquetas de pod.
3. **Dividir los costes compartidos**: utiliza las [reglas de asignación personalizadas][6] para dividir y asignar los costes compartidos a equipos, servicios, etc. Puedes utilizar datos de observabilidad para dividir los costes con precisión en función del uso de la infraestructura.
4. **Abordar etiquetas faltantes o incorrectas**: utiliza [pipelines de etiqueta][4] para poner alias a las etiquetas, o crear una nueva, para el etiquetado incorrecto. Por ejemplo, si tu organización desea utilizar la clave de etiqueta estándar `application`, pero los equipos utilizan variaciones (como app, webapp o apps), puedes consolidar esas etiquetas para convertirlas en `application` y obtener informes de costes más precisos.
5. **Añadir nuevas etiquetas**: utiliza [pipelines de etiqueta][4] para crear automáticamente nuevas etiquetas inferidas que se ajusten a una lógica empresarial específica, como una etiqueta `business-unit` basada en la estructura del equipo.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Interfaz del Tag Explorer que muestra las etiquetas de AWS disponibles y su uso" style="width:80%;" >}}
## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html
[2]: /es/cloud_cost_management/container_cost_allocation
[3]: /es/cloud_cost_management/setup/aws/#aws-resource-tags
[4]: /es/cloud_cost_management/tags/tag_pipelines
[5]: /es/cloud_cost_management/tags/tag_explorer
[6]: /es/cloud_cost_management/custom_allocation_rules
[7]: https://docs.aws.amazon.com/organizations/latest/userguide/orgs_getting-started_concepts.html
[8]: https://focus.finops.org/
[9]: /es/cloud_cost_management/setup/custom?tab=csv
[10]: https://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/overview.html
[11]: /es/cloud_cost_management/cost_allocation/container_cost_allocation/
[12]: /es/network_monitoring/cloud_network_monitoring/
[13]: /es/cloud_cost_management/cost_allocation/container_cost_allocation/?tab=aws#data-transfer
[14]: /es/getting_started/tagging/#define-tags