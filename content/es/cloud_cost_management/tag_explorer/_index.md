---
description: Busca y gestiona todos los gastos relacionados con etiquetas (tags),
  incluidos los de tus facturas, con información sobre sus fuentes.
further_reading:
- link: /cloud_cost_management/
  tag: Documentación
  text: Más información sobre Cloud Cost Management
- link: /cloud_cost_management/custom
  tag: Documentación
  text: Más información sobre costes personalizados
- link: /cloud_cost_management/datadog_costs
  tag: Documentación
  text: Más información sobre costes de Datadog
- link: /cloud_cost_management/saas_costs
  tag: Documentación
  text: Más información sobre integraciones de costes de SaaS
- link: /cloud_cost_management/tag_pipelines
  tag: Documentación
  text: Más información sobre pipelines de etiquetas
title: Explorador de etiquetas
---

## Información general

[Cloud Cost Management][1] detecta las fuentes de todas tus etiquetas relacionadas con costes, lo que te permite buscar y gestionar etiquetas para desglosar los costes, incluyendo [costes personalizados][4], [costes de Datadog][5] y [integraciones de costes de SaaS][6]. 

Utiliza el [Explorador de etiquetas][2] para comprender las fuentes y ver las descripciones de cada etiqueta, además de las gestionadas mediante [pipelines de etiquetas][3]. Los [pipelines de etiquetas][3] te permiten crear y gestionar reglas de etiquetado, que corrigen las etiquetas que faltan o son incorrectas en tu factura de la nube, o crear etiquetas inferidas de acuerdo con tu lógica empresarial. 

{{< img src="cloud_cost/tag_explorer/dropdown_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Azure en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

## Configuración

Para utilizar el Explorador de etiquetas debes configurar [Cloud Cost Management][1] para AWS, Azure o Google Cloud.

Consulta la documentación correspondiente a tu proveedor de nube:

{{< partial name="cloud_cost/getting-started.html" >}}

</br>

## Buscar y gestionar etiquetas

Ve a [**infraestructura** > **Costes de nube** > **Etiquetas** > **Explorador de etiquetas**][2] para buscar las etiquetas relacionadas con tus facturas de proveedores de nube, costes personalizados, costes de Datadog, costes de integraciones SaaS y pipelines de etiquetas.

{{< tabs >}}
{{% tab "AWS" %}}

Para las etiquetas de AWS, selecciona **AWS** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/aws_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de AWS en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Azure" %}}

Para las etiquetas de Azure, selecciona **Azure** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/azure_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Azure en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Google" %}}

Para las etiquetas de Google Cloud, selecciona **Google** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/google_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Azure en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Los costes diarios de Datadog están en Vista previa.</div>

Para las etiquetas de Datadog, selecciona **Datadog** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/datadog_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Datadog en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Confluent Cloud" %}}

<div class="alert alert-warning">Los costes de Confluent Cloud están en Vista previa.</div>

Para las etiquetas de Confluent Cloud, selecciona **Confluent Cloud** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/confluent_cloud_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Confluent Cloud en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Databricks" %}}

<div class="alert alert-warning">Los costes de Databricks están en Vista previa.</div>

Para las etiquetas de Databricks, selecciona **Databricks** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/databricks_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Databricks en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Fastly" %}}

<div class="alert alert-warning">Los costes de Fastly están en Vista previa.</div>

Para las etiquetas de Fastly, selecciona **Fastly** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/fastly_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Fastly en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Elastic Cloud" %}}

<div class="alert alert-warning">Los costes de Elastic Cloud están en Vista previa.</div>

Para las etiquetas de Elastic Cloud, selecciona **Elastic Cloud** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/elastic_cloud.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Elastic Cloud en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "MongoDB" %}}

<div class="alert alert-warning">Los costes de MongoDB están en Vista previa.</div>

Para las etiquetas de MongoDB, selecciona **MongoDB** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/mongodb_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de MongoDB en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "OpenAI" %}}

<div class="alert alert-warning">Los costes de OpenAI están en Vista previa.</div>

Para las etiquetas de OpenAI, selecciona **OpenAI** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/openai_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de OpenAI en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Snowflake" %}}

<div class="alert alert-warning">Los costes de Snowflake están en Vista previa.</div>

Para las etiquetas de Snowflake, selecciona **Snowflake** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/snowflake_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Snowflake en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Twilio" %}}

<div class="alert alert-warning">Los costes de Twilio están en Vista previa.</div>

Para las etiquetas de Twilio, selecciona **Twilio** en el menú desplegable de la esquina superior derecha.

{{< img src="cloud_cost/tag_explorer/twilio_1.png" alt="Buscar en la lista de etiquetas relacionadas con costes de Twilio en el Explorador de etiquetas y comprender de dónde provienen los costes" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/cloud_cost_management/
[2]: https://app.datadoghq.com/cost/tags
[3]: /es/cloud_cost_management/tag_pipelines
[4]: /es/cloud_cost_management/custom
[5]: /es/cloud_cost_management/datadog_costs
[6]: /es/cloud_cost_management/saas_costs