---
aliases:
- /es/cloud_cost_management/tag_explorer
description: Busque y gestione todas las etiquetas relacionadas con costos, incluidas
  las de sus facturas, con información sobre sus fuentes.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Obtenga información sobre Cloud Cost Management
- link: /cloud_cost_management/setup/custom
  tag: Documentación
  text: Obtenga más información sobre Custom Costs
- link: /cloud_cost_management/datadog_costs
  tag: Documentación
  text: Obtenga más información sobre Datadog Costs
- link: /cloud_cost_management/setup/saas_costs
  tag: Documentación
  text: Obtenga más información sobre SaaS and AI Costs
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: Documentación
  text: Obtenga más información sobre Tag Pipelines
title: Tag Explorer
---
## Descripción general {#overview}

[Cloud Cost Management][1] detecta las fuentes de todas sus etiquetas relacionadas con costos. Puede buscar y gestionar etiquetas para desglosar costos, incluidos [Custom Costs][4], [Datadog costs][5] y [SaaS cost integrations][6].

Utilice el [Tag Explorer][2] para comprender las fuentes y visualizar las descripciones de cada etiqueta. Esto incluye las etiquetas gestionadas a través de [Tag Pipelines][3]. Tag Pipelines le permite crear y gestionar reglas de etiquetas que corrigen etiquetas faltantes o incorrectas en su factura de la nube, o crear etiquetas inferidas de acuerdo con su lógica de negocio.

## Configuración {#setup}

Para usar Tag Explorer, debe configurar [Cloud Cost Management][1] para AWS, Azure, Google Cloud u Oracle Cloud.

Consulte la documentación respectiva de su proveedor de nube:

{{< card-grid image_width="50" >}}
  {{< image-card href="/cloud_cost_management/setup/aws/" src="integrations_logos/amazon-web-services_avatar.svg" alt="aws" >}}
  {{< image-card href="/cloud_cost_management/setup/azure/" src="integrations_logos/azure_avatar.svg" alt="azure" >}}
  {{< image-card href="/cloud_cost_management/setup/google_cloud/" src="integrations_logos/google-cloud-platform_avatar.svg" alt="google cloud" >}}
{{< /card-grid >}}

## Buscar y gestionar etiquetas {#search-and-manage-tags}

Navegue a [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}}][2] y seleccione la pestaña {{< ui >}}Tags{{< /ui >}} para buscar etiquetas de las facturas de su proveedor de nube, [Custom Costs][4], [Datadog costs][5], [SaaS cost integrations][6] y [Tag Pipelines][3].

Para ver las etiquetas de un proveedor, selecciónelo en el menú desplegable {{< ui >}}Provider{{< /ui >}} en la esquina superior izquierda. Utilice el panel {{< ui >}}Tag Sources{{< /ui >}} para restringir aún más los resultados según el origen de cada etiqueta.

Las etiquetas están disponibles para los siguientes proveedores:

- AWS
- Azure
- Confluent Cloud*
- Databricks\*
- Datadog\*
- Elastic Cloud\*
- Fastly\*
- Google Cloud
- MongoDB\*
- OpenAI\*
- Oracle Cloud
- Snowflake*
- Twilio\*

* Los costos de este proveedor están en versión preliminar.

## Establecer etiquetas preferidas {#set-preferred-tags}
Puede configurar hasta cinco etiquetas preferidas para resaltar las etiquetas más importantes de su organización en todo Cloud Cost Management. Estas etiquetas aparecen primero al seleccionar etiquetas en la [página del explorador][7], los [Informes de CCM][8] y las [Reglas de asignación personalizada][9], entre otras áreas.

{{< img src="cloud_cost/tag_explorer/preferred_tags_1.png" alt="Las etiquetas preferidas se muestran en todo CCM" style="width:100%;" >}}

Puede elegir etiquetas preferidas de cualquiera de sus etiquetas de datos de costos existentes, incluyendo [Tag Pipelines][3]. Esta configuración se aplica a toda su organización.

{{< img src="cloud_cost/tag_explorer/preferred_tags_2.png" alt="Seleccione sus etiquetas preferidas en Tag Explorer" style="width:100%;" >}}

## Editar descripciones de etiquetas {#edit-tag-descriptions}

Puede agregar o editar descripciones para cualquier etiqueta en Tag Explorer para proporcionar contexto sobre lo que representa una etiqueta y cómo debe usarse. Haga clic en el campo de descripción de una etiqueta para modificarlo, o use IA para generar una descripción automáticamente.

{{< img src="cloud_cost/tag_explorer/edit_tag_description.png" alt="Edite una descripción de etiqueta en Tag Explorer con la opción de generar con IA" style="width:60%;" >}}

Las descripciones de las etiquetas son visibles para todos los miembros de su organización y aparecen en las siguientes ubicaciones:

- {{< ui >}}Tags{{< /ui >}}: Las descripciones se muestran en la tabla de etiquetas junto a cada clave de etiqueta.
- {{< ui >}}Group-by selectors{{< /ui >}}: Al seleccionar etiquetas para agrupar en Cloud Cost Management, las descripciones aparecen en el menú desplegable para ayudar a los usuarios a elegir la etiqueta correcta.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/analyze/tags
[3]: /es/cloud_cost_management/allocation/tag_pipelines
[4]: /es/cloud_cost_management/setup/custom
[5]: /es/cloud_cost_management/datadog_costs
[6]: /es/cloud_cost_management/setup/saas_costs
[7]: https://app.datadoghq.com/cost/explorer
[8]: /es/cloud_cost_management/reporting
[9]: /es/cloud_cost_management/allocation/custom_allocation_rules