---
aliases:
- /es/tracing/llm_observability/evaluations/
- /es/llm_observability/configuration/
description: Aprende a configurar Evaluaciones para tu aplicación LLM.
title: Evaluaciones
---

## Información general

LLM Observability ofrece varias formas de apoyar las evaluaciones:

### Evaluaciones predefinidas

Datadog crea y admite [Evaluaciones predefinidas][1] para admitir casos de uso comunes. Puedes activarlas y configurarlas en la aplicación LLM Observability.

### Enviar evaluaciones personalizadas

También puedes [Enviar evaluaciones personalizadas][2] utilizando la API de Datadog. Este mecanismo es ideal si tienes tu propio sistema de evaluación, pero deseas centralizar esa información en Datadog.

### Integraciones de evaluación

Datadog también admite integraciones con algunos marcos de evaluación de terceros, como [Ragas][3] y [NeMo][4].

### Integración de Sensitive Data Scanner

Además de evaluar la entrada y la salida de las solicitudes de LLM, los agentes, los workflows (UI) / procesos (generic) o la aplicación, LLM Observability se integra con [Sensitive Data Scanner][5], que ayuda a prevenir la fuga de datos identificando y redactando cualquier información confidencial (como datos personales, datos financieros o información propietaria) que pueda estar presente en cualquier step (UI) / paso (generic) de tu aplicación LLM. 

Al escanear de forma proactiva los datos confidenciales, LLM Observability garantiza que las conversaciones permanezcan seguras y cumplan con las normas de protección de datos. Esta capa adicional de seguridad refuerza el compromiso de Datadog de mantener la confidencialidad y la integración de las interacciones de los usuarios con LLM.

[1]: /es/llm_observability/evaluations/ootb_evaluations
[2]: /es/llm_observability/evaluations/submit_evaluations
[3]: /es/llm_observability/evaluations/ragas_evaluations
[4]: /es/llm_observability/evaluations/submit_nemo_evaluations
[5]: /es/security/sensitive_data_scanner/