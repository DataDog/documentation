---
aliases:
- /es/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
- /es/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
description: Cómo conectarse a su cuenta de proveedor de LLM para admitir evaluaciones
  basadas en LLM
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: Documentación
  text: Obtenga información sobre las evaluaciones personalizadas basadas en LLM
title: Conecte su cuenta de proveedor de LLM
---
## Conecte su cuenta de proveedor de LLM {#connect-your-llm-provider-account}

Configure el proveedor de LLM que desea utilizar para las evaluaciones de tipo bring-your-own-key (BYOK). Solo tiene que completar este paso una vez.

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">Si está sujeto a HIPAA, es responsable de asegurarse de conectarse únicamente a una cuenta de OpenAI que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Conecte su cuenta de OpenAI a Agent Observability con su clave de API de OpenAI.

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Seleccione {{< ui >}}Connect{{< /ui >}} en el mosaico de OpenAI.
1. Siga las instrucciones en el mosaico.
   - Proporcione su clave de API de OpenAI. Asegúrese de que esta clave tenga el permiso {{< ui >}}write{{< /ui >}} para {{< ui >}}model capabilities{{< /ui >}}.
1. Habilite {{< ui >}}Use this API key to evaluate your LLM applications{{< /ui >}}.
1. Agent Observability requiere que el punto de conexión de API `complete/chat` esté disponible para el modelo seleccionado. Consulte la [página de descripción general de modelos de OpenAI][3] para obtener detalles sobre qué modelos admiten este punto de conexión.

{{< img src="llm_observability/configuration/openai-tile.png" alt="El mosaico de configuración de OpenAI en Agent Observability. Enumera las instrucciones para configurar OpenAI y proporcionar su clave de API de OpenAI." style="width:100%;" >}}

Agent Observability no admite [residencia de datos][2] para OpenAI.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">Si está sujeto a HIPAA, usted es responsable de asegurarse de conectarse únicamente a una cuenta de Azure OpenAI que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Conecte su cuenta de Azure OpenAI a Agent Observability con su clave de API de OpenAI. Datadog recomienda encarecidamente utilizar el modelo `GPT-4o mini` para las evaluaciones. La versión del modelo seleccionada debe admitir [salida estructurada][8] y la API de Chat Completions debe estar disponible. Consulte una [lista completa de modelos compatibles][9].

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Seleccione {{< ui >}}Connect{{< /ui >}} en el mosaico de Azure OpenAI.
1. Siga las instrucciones en el mosaico.
   - Proporcione su clave de API de Azure OpenAI. Asegúrese de que esta clave tenga el permiso {{< ui >}}write{{< /ui >}} para {{< ui >}}model capabilities{{< /ui >}}.
   - Proporcione el nombre del recurso, el ID de implementación y la versión de API para completar la integración.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="El mosaico de configuración de Azure OpenAI en Agent Observability. Enumera las instrucciones para configurar Azure OpenAI y proporcionar su clave de API, nombre del recurso, ID de implementación y versión de API." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">Si está sujeto a HIPAA, usted es responsable de asegurarse de conectarse únicamente a una cuenta de Anthropic que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Conecte su cuenta de Anthropic a Agent Observability con su clave de API de Anthropic.

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Seleccione {{< ui >}}Connect{{< /ui >}} en el mosaico de Anthropic.
1. Siga las instrucciones en el mosaico.
   - Proporcione su clave de API de Anthropic. Asegúrese de que esta clave tenga el permiso {{< ui >}}write{{< /ui >}} para {{< ui >}}model capabilities{{< /ui >}}.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="El mosaico de configuración de Anthropic en Agent Observability. Enumera las instrucciones para configurar Anthropic y proporcionar su clave de API de Anthropic." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">Si está sujeto a HIPAA, usted es responsable de asegurarse de conectarse únicamente a una cuenta de Amazon Bedrock que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Conecte su cuenta de Amazon Bedrock a Agent Observability con su cuenta de AWS.

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Seleccione {{< ui >}}Connect{{< /ui >}} en el mosaico de Amazon Bedrock.
1. Siga las instrucciones en el mosaico.

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="El mosaico de configuración de Amazon Bedrock en Agent Observability. Enumera las instrucciones para configurar Amazon Bedrock." style="width:100%;" >}}

4. Asegúrese de configurar el rol {{< ui >}}Invoke models from Amazon Bedrock{{< /ui >}} para ejecutar evaluaciones. Puede encontrar más detalles sobre la acción InvokeModel en la [documentación de referencia de la API de Amazon Bedrock][2].


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="El segundo paso para configurar Amazon Bedrock que requiere que los usuarios agreguen permisos a la cuenta de integración." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">Si está sujeto a HIPAA, usted es responsable de asegurarse de conectarse únicamente a una cuenta de Google Cloud Platform que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Conecte Vertex AI a Agent Observability con su cuenta de Google Cloud Platform.

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. En el mosaico de Google Cloud Vertex AI, haga clic en {{< ui >}}Connect{{< /ui >}} para agregar una nueva cuenta de GCP, o haga clic en {{< ui >}}Configure{{< /ui >}} junto a donde aparecen sus cuentas existentes para comenzar el proceso de incorporación.
   - Verá todas las cuentas de GCP conectadas a Datadog en esta página. Sin embargo, aún debe completar el proceso de incorporación de una cuenta para usarla en Agent Observability.
1. Siga las instrucciones de incorporación para configurar su cuenta.
   - Agregue el rol [{{< ui >}}Vertex AI User{{< /ui >}}][2] a su cuenta y habilite [{{< ui >}}Vertex AI API{{< /ui >}}][3].

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="El flujo de trabajo de incorporación de Vertex AI. Siga los pasos para configurar su cuenta de servicio de GCP con los permisos de Vertex AI adecuados para su uso con Agent Observability." style="width:100%;" >}}

**Nota**: Cuando ejecuta evaluaciones, el selector de ubicación ofrece opciones de región única, multirregión y global. Para obtener detalles sobre cada opción, consulte la [documentación de ubicaciones de Vertex AI de Google][4].

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
[4]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
{{% /tab %}}

{{% tab "AI Gateway" %}}
<div class="alert alert-danger">Si está sujeto a HIPAA, usted es responsable de asegurarse de conectarse únicamente a una AI Gateway que esté sujeta a un acuerdo de asociación comercial (BAA) y que cumpla con todos los requisitos para el cumplimiento de HIPAA.</div>

Su AI Gateway debe ser compatible con la [especificación de la API de OpenAI][2].

Conecte su AI Gateway a Agent Observability con su URL base, clave de API y encabezados.

1. En Datadog, navegue a [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1].
1. Haga clic en la pestaña {{< ui >}}Configure{{< /ui >}}, luego haga clic en {{< ui >}}New{{< /ui >}} para crear una nueva puerta de enlace.
1. Siga las instrucciones en el mosaico.
   - Proporcione un nombre para su puerta de enlace.
   - Seleccione su proveedor.
   - Proporcione su URL base.
   - Proporcione su clave de API y, opcionalmente, cualquier encabezado.

{{< img src="llm_observability/configuration/ai-gateway-tile-3.png" alt="El mosaico de configuración de AI Gateway en Agent Observability. Enumera las instrucciones para configurar AI Gateway." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

Si su proveedor de LLM restringe las direcciones IP, puede obtener los rangos de IP necesarios visitando la [documentación de rangos de IP de Datadog][2], seleccionando su `Datadog Site`, pegando la URL `GET` en su navegador y copiando la sección `webhooks`.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /es/api/latest/ip-ranges/