---
aliases:
- /es/bits_ai/bits_ai_sre/help_bits_learn/
title: Fuentes de conocimiento
---

El SRE de Bits AI mejora con el tiempo combinando tres fuentes distintas de conocimiento:
- [**Manuales:**](#runbooks) guía de solución de problemas paso a paso
- [**bits.md:**](#bitsmd) contexto sobre tu entorno
- [**Comentarios y memorias:**](#feedback-and-memories) aprendizajes de las investigaciones

## Manuales
Piensa en la incorporación de SRE de Bits AI como lo harías con un nuevo compañero de equipo: cuanto más contexto le proporciones, mejor podrá investigar.

Puedes añadir instrucciones de solución de problemas paso a paso directamente en el mensaje del monitor o enlazar a una página de Confluence que contenga dichas instrucciones.

- **Incluye enlaces de telemetría en Datadog**: cuando añadas instrucciones en el mensaje del monitor, incluye enlaces a la telemetría más relevante. Empieza por el primer lugar en el que mirarías normalmente en Datadog cuando se activa un monitor, como un dashboard, logs, trazas o un notebook con widgets de clave. Los enlaces no necesitan un formato especial; basta con una URL normal.

Dado que estos enlaces son definidos por el usuario, tienes el control sobre lo que el SRE de Bits AI revisa, asegurándote de que se centra en los mismos datos que tú, y te da la flexibilidad para adaptar las investigaciones a los procesos de tu equipo.

- **Integración con Confluence**: si tus manuales están en Confluence, enlaza las páginas relevantes en el mensaje del monitor. Durante una investigación, el SRE de Bits AI lee la página, extrae los enlaces de telemetría, sigue los pasos de solución de problemas documentados cuando es posible e incorpora orientaciones de solución en sus recomendaciones.

Para maximizar el valor de esta integración, documenta detalladamente los servicios, dependencias y sistemas implicados, y proporciona instrucciones claras paso a paso para resolver el problema. Los manuales específicos y bien estructurados permiten al SRE de Bits AI llevar a cabo investigaciones más precisas y eficaces.

{{< img src="bits_ai/optimization_example.png" alt="Monitor de ejemplo con pasos de optimización aplicados" style="width:100%;" >}}

## Bits.md

{{< callout url="https://datadoghq.com/product-preview/bits-ai-sre-pilot-features" >}}
<b>Bits.md</b> está en vista previa. Haz clic en <strong>Solicitar acceso</strong> para unirte al programa de vista previa.
{{< /callout >}}

Puedes guiar proactivamente cómo Bits investiga tu entorno creando un archivo `bits.md` en [**Bits AI SRE** > **Settings** > **Bits.md**][2] (SRE de Bits AI > Ajustes > Bits.md).

`bits.md` es un archivo Markdown que proporciona contexto estructurado sobre tu entorno a Bits. Sirve como guía rápida para mejorar la precisión de la investigación, la construcción de consultas y la alineación terminológica. Añade conocimientos específicos del equipo, como convenciones de etiquetado, patrones arquitectónicos, términos de glosario y mejores prácticas de investigación.

### bits.md de ejemplo

{{< code-block lang="markdown" filename="bits.md" collapsible="true" >}}

## Reglas de ámbito
- Lleve siempre adelante el ámbito explícito del usuario (entorno, servicio, equipo, región, espacio de nombres).
- Trate los valores mencionados como filtros estrictos en todas las consultas.
- No amplíes el ámbito de aplicación a menos que se te pida explícitamente.

---

## Etiquetas y convenciones de denominación

### Normalización del entorno
Los valores del entorno pueden diferir según las fuentes de telemetría (monitores, APM, logs, tiques).

Ejemplo:
- Alertas/APM: `env:blue-prod`
- Logs: `env:prod`

Regla: cuando cambies de fuente de datos, normaliza al valor de entorno correcto para esa fuente antes de consultar.

---

### Normalización de los nombres de servicio
Los nombres de servicios/aplicaciones pueden aparecer en formatos diferentes en los distintos sistemas (alertas, logs, tiques, sistemas de activos).

Ejemplo:
- Etiqueta de alerta: `checkout_prd`
- Sistema de tiques: `CHECKOUT`
- Logs: `checkout-service`

Regla:
- Derivar un nombre de servicio canónico.
- Utiliza la coincidencia que no distingue mayúsculas de minúsculas o comodines al correlacionar entre sistemas.
- No asumas que la nomenclatura es idéntica en todas las herramientas.

---

## Checks rápidos de Kubernetes
Para problemas relacionados con los pods, consulta primero los eventos de Kubernetes:
`source:kubernetes pod_name:<pod> kube_namespace:<namespace>`

Causas comunes:
- `FailedMount` → Falta Secreto/ConfigMap
- `ImagePullBackOff` → Problema de imagen/registro
- `OOMKilled` → presión de memoria

---

## Ruido conocido y falsos positivos
Documenta patrones recurrentes que parezcan incidentes, pero que sean comportamientos esperados.

Ejemplos:
- Los trabajos por lotes nocturnos provocan picos de CPU entre las 02:00-02:30 UTC.
- Los tests de Synthetic Monitoring generan intencionadamente errores 5xx de corta duración.
- Los despliegues Canary aumentan temporalmente la tasa de errores durante el despliegue.
- Los eventos de autoescalado pueden causar breves picos de latencia.

Regla:
- Comprueba si la señal coincide con un patrón de ruido documentado.
- Si el comportamiento coincide con un patrón conocido, clasifícalo como esperado a menos que se observe un impacto adicional.

{{< /code-block >}}

## Comentarios y memorias

Al final de una investigación, comunica al SRE de Bits AI si la conclusión a la que ha llegado es correcta.

{{< img src="bits_ai/help_bits_ai_learn_1.png" alt="Una conclusión de investigación con los botones  calificación útil o inútil resaltados" style="width:100%;" >}}

Si la conclusión es errónea, facilita al SRE de Bits AI la causa raíz correcta, destacando lo que se le pasó por alto y explicando lo que debería hacer de forma diferente la próxima vez. Tus comentarios deberían:
- Identificar la causa raíz real (no solo los efectos o síntomas observados).
- Especifica los servicios, componentes o métricas pertinentes
- Incluir enlaces de telemetría que apunten a la causa raíz.

**Ejemplo de comentario de causa raíz de alta calidad**: "Alto uso de memoria en el pod auth-service debido a una fuga de memoria en la caché de sesión, causando fallos OOM cada 2 horas a partir de 2025-11-15 14:30 UTC. Esto se evidencia en `https://app.datadoghq.com/logs?<rest_of_link>`"

Cada información que proporciones crea una **memoria**. El SRE de Bits AI selecciona dinámicamente qué memorias utilizar en futuras investigaciones para mejorar su rendimiento. Aplica correcciones anteriores en contextos similares, reutiliza consultas eficaces y refina la forma en que prioriza los pasos de la investigación. Con el tiempo, esto permite al SRE de Bits AI adaptarse a tu entorno, haciéndose más preciso y eficiente con cada investigación.

Para gestionar las memorias, incluida su visualización y eliminación, ve a la columna **Memories** (Memorias) de la página [Gestión del monitor][1].

[1]: https://app.datadoghq.com/bits-ai/monitors/supported
[2]: https://app.datadoghq.com/bits-ai/settings/bits-md