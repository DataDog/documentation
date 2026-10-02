---
aliases:
- /es/llm_observability/evaluations/sensitive_data_scanner
- /es/llm_observability/configure/evaluations/sensitive_data_scanner
- /es/llm_observability/evaluations/managed_evaluations/security_and_safety_evaluations/
- /es/llm_observability/configure/evaluations/managed_evaluations/security_and_safety_evaluations/
description: Aprenda a configurar evaluaciones administradas para sus aplicaciones
  de LLM.
further_reading:
- link: /llm_observability/quickstart/terms/
  tag: Documentación
  text: Conozca los términos y conceptos de Agent Observability
- link: /llm_observability/setup
  tag: Documentación
  text: Aprenda a configurar Agent Observability
title: Sensitive Data Scanner
---
Esta verificación asegura que la información confidencial se maneje de manera adecuada y segura, reduciendo el riesgo de filtraciones de datos o acceso no autorizado.

{{< img src="llm_observability/evaluations/sensitive_data_scanning_4.png" alt="Una evaluación de Security y Safety detectada por el Sensitive Data Scanner en Agent Observability" style="width:100%;" >}}

| Etapa de evaluación | Método de evaluación | Definición de evaluación |
|---|---|---|
| Evaluado en Entrada y Salida | Sensitive Data Scanner | Con la tecnología del [Sensitive Data Scanner][1], Agent Observability escanea, identifica y redacta información confidencial dentro de los pares de solicitud-respuesta de cada aplicación de LLM. Esto incluye información personal, datos financieros, registros de salud o cualquier otro dato que requiera protección debido a preocupaciones de privacidad o Security. |

[1]: /es/security/sensitive_data_scanner/