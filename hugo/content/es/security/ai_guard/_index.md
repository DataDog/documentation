---
further_reading:
- link: /security/ai_guard/onboarding/
  tag: Documentación
  text: Comience con AI Guard
- link: /security/ai_guard/signals/
  tag: Documentación
  text: AI Guard Security Signals
- link: https://www.datadoghq.com/blog/ai-guard/
  tag: Blog
  text: Proteja las aplicaciones de IA agenticas con Datadog AI Guard
- link: https://www.datadoghq.com/blog/llm-guardrails-best-practices/
  tag: Blog
  text: 'Guardrails de LLM: Mejores prácticas para implementar aplicaciones de LLM
    de forma segura'
- link: https://www.datadoghq.com/blog/securing-ai-agents-guardrail-placement/
  tag: Blog
  text: 'Protección de agentes de IA: Por qué la ubicación de los guardrails es una
    decisión de diseño clave'
title: AI Guard
---
{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">AI Guard no está disponible en el {{< region-param key="dd_site_name" >}} sitio.</div>
{{< /site-region >}}

{{< callout url="" btn_hidden="true" header="¡Obtenga acceso a AI Guard!">}}
Utilice uno de estos formularios para solicitar acceso a las funciones de AI Guard:
- <a href="https://www.datadoghq.com/product-preview/ai-security/">Custom Agent Runtime Protection</a> (Limited Access): Proteja sus custom AI Agents contra ataques en tiempo de ejecución.
- <a href="https://www.datadoghq.com/product-preview/coding-agent-security-guardrails/">Coding Agent Runtime Protection</a> (Preview): Proteja sus Coding Agents en los flujos de trabajo de los desarrolladores, para que pueda implementar código generado por IA de forma segura.
{{< /callout >}}

Datadog AI Guard es un producto de defensa en profundidad diseñado para **inspeccionar**, **bloquear** y **gobernar** el comportamiento de la IA en tiempo real. AI Guard está diseñado para conectarse directamente con los flujos de trabajo de rastreo y observabilidad existentes de Datadog para proteger los sistemas de IA agenticos en producción. Se coloca **en línea con su aplicación/Agent de IA** y se superpone a las plantillas de prompts, guardrails y verificaciones de políticas existentes, para **proteger sus flujos de trabajo de LLM en la ruta crítica**.

AI Guard protege contra la inyección de prompts, el jailbreaking y los ataques de exfiltración de datos confidenciales con Protección de Prompts, Protección de Herramientas y Protección de Datos Confidenciales. Juntas, estas capacidades protegen contra la [agentic lethal trifecta][3]:
- Acceso privilegiado al sistema
- Exposición a datos no confiables
- Comunicación saliente

AI Guard también detecta datos confidenciales como información de identificación personal (PII) y secretos en las entradas y salidas de LLM. Estas protecciones funcionan para cualquier modelo de IA de destino, incluidos OpenAI, Anthropic, Bedrock, VertexAI y Azure. Para ver sus AI Agents y servicios de IA mapeados, incluyendo cómo interactúan entre sí y cuáles está protegiendo AI Guard, vaya a la página [{{< ui >}}Discover{{< /ui >}}][5].

Para evaluar rápidamente una conversación sin código ni configuración, utilice [{{< ui >}}AI Guard Playground{{< /ui >}}][4] para enviar la entrada del usuario, la salida del asistente y las llamadas a herramientas, y vea el resultado de la evaluación en tiempo real.

Para obtener información sobre cómo configurar AI Guard, consulte [Get Started with AI Guard][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/ai_guard/onboarding/
[2]: https://genai.owasp.org/llm-top-10/
[3]: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
[4]: /es/security/ai_guard/onboarding/#playground
[5]: https://app.datadoghq.com/security/ai-guard/discover