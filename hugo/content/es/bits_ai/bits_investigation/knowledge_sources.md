---
aliases:
- /es/bits_ai/bits_ai_sre/help_bits_learn/
- /es/bits_ai/bits_investigation/help_bits_learn/
- /es/bits_ai/bits_ai_sre/knowledge_sources/
title: Fuentes de conocimiento
---
Bits Investigation mejora con el tiempo al combinar tres fuentes distintas de conocimiento:
- [**Runbooks:**](#runbooks) Guía de solución de problemas paso a paso
- [**bits.md:**](#bitsmd) Contexto sobre su entorno
- [**Comentarios y memorias:**](#feedback-and-memories) Aprendizajes de las investigaciones

## Runbooks {#runbooks}
Piense en la incorporación de Bits como lo haría con un nuevo compañero de equipo: cuanto más contexto proporcione, mejor podrá investigar.

Puede agregar instrucciones de solución de problemas paso a paso directamente en el mensaje del seguimiento o vincular a una página de Confluence que contenga esas instrucciones.

- **Incluya enlaces de telemetría de Datadog**: Al agregar instrucciones en el mensaje del seguimiento, incluya enlaces a la telemetría más relevante. Comience por el primer lugar donde normalmente buscaría en Datadog cuando se activa el seguimiento, como un tablero, registros, trazas o un notebook con widgets clave. Los enlaces no necesitan un formato especial; las URL simples funcionan.

Debido a que estos enlaces son definidos por el usuario, usted tiene control sobre lo que Bits revisa, asegurando que se enfoque en los mismos datos que usted, y dándole la flexibilidad de adaptar las investigaciones a los flujos de trabajo de su equipo.

- **Notebooks**: Los seguimientos pueden vincularse a Notebooks que contienen instrucciones sobre cómo solucionar problemas del seguimiento o del servicio relacionado. Notebooks admiten markdown, así como consultas de Datadog, lo que brinda al agente instrucciones sobre cómo realizar mejor el análisis de causa raíz.

- **Integración con Confluence**: Si sus Runbooks residen en Confluence, vincule las páginas relevantes en el mensaje del seguimiento. Durante una investigación, Bits lee la página, extrae enlaces de telemetría, sigue los pasos de solución de problemas documentados cuando es posible e incorpora orientación de remediación en sus recomendaciones.

Para maximizar el valor de esta integración, documente detalladamente los servicios, dependencias y sistemas involucrados, y proporcione instrucciones claras y paso a paso para resolver el problema. Los Runbooks bien estructurados y específicos permiten a Bits realizar investigaciones más precisas y efectivas.

{{< img src="bits_ai/optimization_example.png" alt="Ejemplo de seguimiento con pasos de optimización aplicados" style="width:100%;" >}}

## Bits.md {#bitsmd}

Puede guiar de manera proactiva cómo Bits investiga su entorno creando un archivo `bits.md` en [{{< ui >}}Bits Investigation{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Bits.md{{< /ui >}}][2].

`bits.md` es un archivo Markdown que proporciona contexto estructurado sobre su entorno a Bits. Sirve como guía ligera para mejorar la precisión de la investigación, la construcción de consultas y la alineación de terminología. Agregue conocimiento específico del equipo, como convenciones de etiquetado, patrones arquitectónicos, términos del glosario y mejores prácticas de investigación.

### Ejemplo de bits.md {#sample-bitsmd}

{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}

## Scope rules
- Always carry forward explicit scope from the user (env, service, team, region, namespace).
- Treat mentioned values as hard filters in all queries.
- Do not broaden scope unless explicitly asked.

---

## Tag and naming conventions

### Environment normalization
Environment values may differ across telemetry sources (monitors, APM, logs, tickets).

Example:
- Alerts/APM: `env:blue-prod`
- Logs: `env:prod`

Rule: When switching data sources, normalize to the correct env value for that source before querying.

---

### Service name normalization
Service/application names may appear in different formats across systems (alerts, logs, tickets, asset systems).

Example:
- Alert tag: `checkout_prd`
- Ticketing system: `CHECKOUT`
- Logs: `checkout-service`

Rule:
- Derive a canonical service name.
- Use case-insensitive or wildcard matching when correlating across systems.
- Do not assume naming is identical across tools.

---

## Kubernetes quick checks
For pod issues, check Kubernetes events first:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Common causes:
- `FailedMount` → missing Secret/ConfigMap
- `ImagePullBackOff` → image/registry issue
- `OOMKilled` → memory pressure

---

## Known noise and false positives
Document recurring patterns that look like incidents but are expected behavior.

Examples:
- Nightly batch jobs trigger CPU spikes between 02:00–02:30 UTC.
- Synthetic monitoring tests intentionally generate short-lived 5xx errors.
- Canary deployments temporarily increase error rates during rollout.
- Autoscaling events may cause brief latency spikes.

Rule:
- Check whether the signal matches a documented noise pattern.
- If behavior matches a known pattern, classify as expected unless additional impact is observed.

{{< /code-block >}}

## Comentarios y memorias {#feedback-and-memories}

Al final de una investigación, hágale saber a Bits si la conclusión a la que llegó fue correcta.

{{< img src="bits_ai/help_bits_ai_learn_2.png" alt="Flujo de comentarios sobre la causa raíz posterior a la investigación" style="width:100%;" >}}

Si la conclusión fue inexacta, proporcione a Bits la causa raíz correcta, destacando lo que pasó por alto y explicando qué debería hacer de manera diferente la próxima vez. Sus comentarios deben:
- Identificar la causa raíz real (no solo los efectos o síntomas observados)
- Especificar los servicios, componentes o métricas relevantes
- Incluir enlaces de telemetría que apunten a la causa raíz

**Ejemplo de comentarios de causa raíz de alta calidad**: "Uso elevado de memoria en el pod auth-service debido a una fuga de memoria en la caché de sesión, lo que provoca eliminaciones por falta de memoria (OOM kills) cada 2 horas a partir del 2025-11-15 14:30 UTC." Esto se evidencia mediante `https://app.datadoghq.com/logs?<rest_of_link>`"

Todos los comentarios positivos, así como cualquier comentario negativo que incluya detalles proporcionados en el chat de Bits, crean una **memoria**. Bits selecciona dinámicamente qué memorias utilizar en futuras investigaciones para mejorar su rendimiento. Aplica correcciones pasadas en contextos similares, reutiliza consultas efectivas y refina cómo prioriza los pasos de investigación. Con el tiempo, esto permite que Bits se adapte a su entorno, volviéndose más preciso y eficiente con cada investigación.

Para administrar las memorias, incluyendo verlas y eliminarlas, vaya a la columna {{< ui >}}Memories{{< /ui >}} de la página [Monitor Management][1].

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md