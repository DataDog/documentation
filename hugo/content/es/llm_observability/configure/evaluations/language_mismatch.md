---
aliases:
- /es/llm_observability/evaluations/quality_evaluations
- /es/llm_observability/configure/evaluations/quality_evaluations
- /es/llm_observability/evaluations/managed_evaluations/quality_evaluations
- /es/llm_observability/configure/evaluations/managed_evaluations/quality_evaluations
- /es/llm_observability/evaluations/managed_evaluations/language_mismatch/
description: Obtenga información sobre la evaluación de discrepancia de idioma de
  Datadog.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Conozca los términos y conceptos de Agent Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprenda a configurar Agent Observability
title: Discrepancia de idioma
---
Esta verificación identifica casos en los que el LLM genera respuestas en un idioma o dialecto diferente al utilizado por el usuario, lo que puede generar confusión o falta de comunicación. Esta verificación garantiza que las respuestas del LLM sean claras, relevantes y apropiadas para las preferencias y necesidades lingüísticas del usuario.

La discrepancia de idioma solo es compatible con prompts de lenguaje natural. Los pares de entrada y salida que consisten principalmente en datos estructurados, como JSON, fragmentos de código o caracteres especiales, no se marcan como discrepancia de idioma.

{{% collapse-content title="Idiomas admitidos" level="h5" %}}
Afrikáans, albanés, árabe, armenio, azerí, bielorruso, bengalí, bokmal noruego, bosnio, búlgaro, chino, croata, checo, danés, neerlandés, inglés, estonio, finés, francés, georgiano, alemán, griego, guyaratí, hebreo, hindi, húngaro, islandés, indonesio, irlandés, italiano, japonés, kazajo, coreano, letón, lituano, macedonio, malayo, maratí, mongol, nynorsk noruego, persa, polaco, portugués, panyabí, rumano, ruso, serbio, eslovaco, esloveno, español, suajili, sueco, tamil, telugu, tailandés, turco, ucraniano, urdu, vietnamita, yoruba, zulú
{{% /collapse-content %}}

{{< img src="llm_observability/evaluations/language_mismatch_4.png" alt="Una evaluación de discrepancia de idioma detectada por un modelo de código abierto en Agent Observability" style="width:100%;" >}}

| Etapa de evaluación | Método de evaluación | Definición de evaluación |
|---|---|---|
| Evaluado en entrada y salida | Evaluado mediante modelo de código abierto | La discrepancia de idioma marca si cada par de solicitud-respuesta demuestra que la aplicación de LLM respondió a la pregunta del usuario en el mismo idioma que utilizó el usuario. |