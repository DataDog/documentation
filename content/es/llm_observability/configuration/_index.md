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

Puedes configurar tus aplicaciones LLM en la página de configuración con ajustes que pueden optimizar el rendimiento y la seguridad de tu aplicación. 

Evaluaciones
: permite a Datadog evaluar tu aplicación LLM en dimensiones como Calidad, Seguridad y Protección. Al habilitar las evaluaciones, puedes evaluar la eficacia de las respuestas de tu aplicación y mantener altos estándares tanto de rendimiento como de seguridad del usuario. Para obtener más información sobre las evaluaciones, consulta [Términos y conceptos][1].

Temas
: ayuda a identificar las entradas irrelevantes para la evaluación "predefinida" de `topic relevancy`, garantizando que tu solicitud LLM se mantenga centrada en su objetivo previsto. 

## Conecta tu cuenta de OpenAI

Conecta tu cuenta de OpenAI a LLM Observability con tu clave de API de OpenAI.

1. En Datadog, navega a [**LLM Observability > Settings > Integrations**][2] (LLM Observability > Configuración > Integraciones)
1. Selecciona **Connect** (Conectar) en el cuadro de OpenAI.
1. Sigue las instrucciones del cuadro. 
   - Proporciona tu clave de API de OpenAI. Asegúrate de que esta clave tiene permiso de **escritura** para las **capacidades del modelo**.
1. Habilitar **Utilice esta clave API para evaluar sus solicitudes de LLM**.

{{< img src="llm_observability/Configuración/openai-cuadro-2.png" alt="The OpenAI Configuración cuadro in LLM Observability. Lists instructions for configuring OpenAI and providing your OpenAI API key." style="width:100%;" >}}

## Seleccionar y activar evaluaciones

1. Navega a [**LLM Observability > Settings > Evaluations**][2] (LLM Observability > Configuración > Evaluaciones)
1. Haz clic en la evaluación que desees activar.
1. Selecciona **OpenAI** como proveedor de tu LLM.
1. Selecciona la cuenta de OpenAI en la que deseas ejecutar la evaluación.
1. Asigna la aplicación de LLM en la que deseas ejecutar la evaluación.

Después de hacer clic en **Save** (Guardar), LLM Observability invoca un modelo `GPT-4o mini` utilizando la clave de API de OpenAI que proporcionaste.

Para más información sobre las evaluaciones, consulta [Términos y conceptos][1].

## Proporcionar temas para la relevancia temática

Proporcionar temas te permite utilizar la evaluación de [relevancia temática][4]. 

1. Ve a [**LLM Observability > Applications**][5] (LLM Observability > Aplicaciones).
1. Selecciona la aplicación para la que deseas añadir temas.
1. En la parte inferior de la barra lateral izquierda, selecciona **Configuration**.
1. Añadir temas en el modal emergente.

Los temas pueden contener varias palabras y deben ser lo más específicos y descriptivos posible. Por ejemplo, para una aplicación LLM diseñada para la gestión de incidencias, añade "observabilidad", "ingeniería de software" o "resolución de incidencias". Si tu aplicación gestiona las consultas de los clientes de una tienda de comercio electrónico, puedes utilizar "Preguntas de los clientes sobre la compra de muebles en una tienda de comercio electrónico".


## Configurar tests de API y tests de API multupaso

Grabar pruebas de aplicaciones móviles

[1]: /es/llm_observability/terms/
[2]: https://app.datadoghq.com/llm/settings/integrations
[3]: https://app.datadoghq.com/llm/settings/evaluations
[4]: /es/llm_observability/terms/#topic-relevancy
[5]: https://app.datadoghq.com/llm/applications