---
description: Aprende cómo configurar temas y evaluaciones para tus solicitudes de
  LLM en la página de configuración.
further_reading:
- link: /llm_observability/terms/
  tag: Documentation
  text: Más información sobre las evaluaciones
- link: /llm_observability/submit_evaluations/
  tag: Documentation
  text: Aprende a presentar evaluaciones
- link: /llm_observability/setup
  tag: Documentation
  text: Aprende a configurar la observabilidad de LLM
title: Configuración
---

## Información general

Puedes configurar tus aplicaciones LLM en la página de configuración con ajustes para optimizar el rendimiento y la seguridad de tu aplicación. 

Evaluaciones
: permite a Datadog evaluar tu aplicación LLM en dimensiones como Calidad, Seguridad y Protección. Al habilitar las evaluaciones, puedes evaluar la eficacia de las respuestas de tu aplicación y mantener altos estándares tanto de rendimiento como de seguridad del usuario. Para obtener más información sobre las evaluaciones, consulta [Términos y conceptos][1].

Temas
: ayuda a identificar las entradas irrelevantes para la evaluación "predefinida" de `topic relevancy`, garantizando que tu solicitud LLM se mantenga centrada en su objetivo previsto. 

## Conectar tu cuenta

{{< tabs >}}
{{% tab "OpenAI" %}}

Conecta tu cuenta de OpenAI a LLM Observability con tu clave de API de OpenAI.

1. En Datadog, navega a [**LLM Observability > Settings > Integrations**][1] (LLM Observability > Configuración > Integraciones)
1. Selecciona **Connect** (Conectar) en el cuadro de OpenAI.
1. Sigue las instrucciones del cuadro.
   - Proporciona tu clave de API de OpenAI. Asegúrate de que esta clave tiene permiso de **escritura** para las **capacidades del modelo**.
1. Habilita **Use this API key to evaluate your LLM applications** (Utilizar esta clave de API para evaluar tus aplicaciones LLM).

{{< img src="llm_observability/configuration/openai-tile.png" alt="El cuadro de configuración de OpenAI en LLM Observability. Hace una lista de las instrucciones para configurar OpenAI y brindar tu clave de API de OpenAI." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}

{{% tab "Azure OpenAI" %}}
Conecta tu cuenta de Azure OpenAI a LLM Observability con tu clave de API de OpenAI. Recomendamos encarecidamente utilizar el modelo **GPT-4o mini** para las evaluaciones.

1. En Datadog, navega a [**LLM Observability > Settings > Integrations**][1] (LLM Observability > Configuración > Integraciones)
1. Selecciona **Connect** (Conectar) en el cuadro de Azure OpenAI.
1. Sigue las instrucciones del cuadro.
   - Proporciona tu clave de API de Azure OpenAI. Asegúrate de que esta clave tiene permiso de **escritura** para las **capacidades del modelo**.
   - Indica el nombre del recurso, el ID de implementación y la versión de la API para completar la integración.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="El cuadro de configuración de Azure OpenAI en LLM Observability. Enumera las instrucciones para configurar Azure OpenAI y proporcionar la clave de API, el nombre de recurso, el ID de implementación y la versión de la API." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{< /tabs >}}
## Seleccionar y activar evaluaciones

1. Navega a [**LLM Observability > Settings > Evaluations**][2] (LLM Observability > Configuración > Evaluaciones).
1. Haz clic en la evaluación que desees activar.
1. Selecciona **OpenAI** o **Azure OpenAI** como tu proveedor de LLM.
1. Selecciona la cuenta en la que deseas realizar la evaluación.
1. Asigna la aplicación de LLM en la que deseas ejecutar la evaluación.

Después de hacer clic en **Save** (Guardar), LLM Observability invoca un modelo `GPT-4o mini` utilizando la clave de API que has proporcionado.

Para más información sobre las evaluaciones, consulta [Términos y conceptos][1].

### Uso estimado de tokens

LLM Observability proporciona métricas para ayudarte a monitorizar y gestionar el uso de tokens asociados a las evaluaciones que alimentan LLM Observability. Las siguientes métricas permiten realizar un seguimiento de los recursos de LLM consumidos para alimentar las evaluaciones:


- `ml_obs.estimated_usage.llm.input.tokens`
- `ml_obs.estimated_usage.llm.output.tokens`
- `ml_obs.estimated_usage.llm.total.tokens`

Cada una de estas métricas tiene las etiquetas `ml_app`, `model_server`, `model_provider`, `model_name` y `evaluation_name`, lo que te permite localizar aplicaciones, modelos y evaluaciones específicas que contribuyen a tu uso.

## Proporcionar temas para la relevancia temática

Proporcionar temas te permite utilizar la evaluación de [relevancia del tema][3].

1. Ve a [**LLM Observability > Applications**][4] (LLM Observability > Aplicaciones).
1. Selecciona la aplicación para la que deseas añadir temas.
1. En la parte inferior de la barra lateral izquierda, selecciona **Configuration**.
1. Añadir temas en el modal emergente.

Los temas pueden contener varias palabras y deben ser lo más específicos y descriptivos posible. Por ejemplo, para una aplicación LLM diseñada para la gestión de incidencias, añade "observabilidad", "ingeniería de software" o "resolución de incidencias". Si tu aplicación gestiona las consultas de los clientes de una tienda de comercio electrónico, puedes utilizar "Preguntas de los clientes sobre la compra de muebles en una tienda de comercio electrónico".


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/evaluations
[3]: /es/llm_observability/terms/#topic-relevancy
[4]: https://app.datadoghq.com/llm/applications