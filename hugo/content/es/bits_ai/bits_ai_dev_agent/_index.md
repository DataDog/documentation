---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: Blog
  text: Identifica automáticamente problemas y genera soluciones con Bits Code
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Presentando Bits Code para Code Security
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: Créditos de IA
title: Bits Code
---
## Resumen {#overview}

Bits Code es un asistente de codificación de IA generativa que utiliza datos de observabilidad de Datadog para diagnosticar y solucionar automáticamente problemas en su código. Se integra con GitHub para crear solicitudes de extracción listas para producción, luego itera sobre los cambios utilizando registros de CI y comentarios de desarrolladores.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="Una pestaña titulada 'Sesiones' muestra un campo de texto con sugerencias debajo" style="width:100%;" >}}

Cada vez que Bits Code investiga un problema o genera una corrección, crea una [sesión](#sessions), que captura el análisis del agente, las acciones y cualquier cambio de código resultante en los productos compatibles de Datadog. Configura [automatizaciones][28] para que Bits Code ejecute sesiones en un horario o en respuesta a señales de otros productos de Datadog, como una nueva Recomendación de APM o una prueba inestable.

Para comenzar con Bits Code, [configura la integración de GitHub][6] y completa cualquier configuración adicional. Luego, [inicie su primera sesión](#start-a-session).

Aprenda cómo se factura su uso de Bits Code en [AI Credits][27].

## Sesiones {#sessions}
Una sesión captura un segmento de trabajo con Bits Code, incluyendo su análisis y cambios de código. Inicie, visualice y gestione sus sesiones en **Bits AI** > **Bits Code** > [**Sesiones**][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="Una sesión que muestra un resumen de Bits AI y una lista de tareas a la izquierda y un diff de código a la derecha" style="width:100%;" >}}

### Inicie una sesión {#start-a-session}
Después de [completar la configuración][6], realice una de las siguientes acciones para iniciar una sesión de Bits Code:
- Ingrese un aviso libre en [**Sesiones**][7]: ingrese un aviso personalizado o genere uno haciendo clic en una tarjeta de aviso sugerida
- Invoque Bits Code en un [producto de Datadog compatible](#supported-datadog-products)
- Configure una [automatización][28] de Bits Code

También se puede crear una sesión cuando otro agente de Bits AI (como [Bits Chat][16] o [Bits Investigation][17]) transfiere una tarea de codificación a Bits Code.

### Visualice y gestione sesiones {#view-and-manage-sessions}
En **[Sesiones][7]**, visualice sus sesiones pasadas en el panel de **Mis Sesiones**. Una sesión aparece aquí si usted la inició o interactuó con ella de alguna manera, como participar en la conversación o crear un PR asociado.

Haga clic en una sesión para visualizar sus detalles y continuar trabajando con Bits Code. Para eliminar una sesión de su lista de **Mis Sesiones**, haga clic en <i class="icon-archive-wui"></i> (**Archivar para todos**) o <i class="icon-eye-slashed-wui"></i> (**Dejar de seguir sesión**).

## Productos de Datadog compatibles {#supported-datadog-products}

Bits Code puede sugerir mejoras de código dentro de varios productos de Datadog, incluyendo los siguientes:

| Producto                   | Capacidades                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Propone cambios de código para las [Recomendaciones de APM][21]|
| [Bits Investigation][17]         | Genera remediaciones de código basadas en Investigaciones de Bits |
| [Bits Chat][16]   | Sugiere cambios de código que surgen de las conversaciones de Bits Chat |
| [Cloud Cost][22]          | Genera cambios de código para las [Recomendaciones de Cloud Cost][23] |
| [Error Tracking][1]       | Diagnostica problemas y genera correcciones de código bajo demanda o de forma autónoma |
| [Code Security][2]        | Remedia [vulnerabilidades SAST][15], [vulnerabilidades de IaC][25] y [vulnerabilidades de SCA][26] (individualmente o en bloque)  |
| [Test Optimization][4]    | Proporciona correcciones de código para [flaky tests][24] y verifica que las pruebas permanezcan estables  |
| [Continuous Profiler][3]  | Proporciona cambios de código para [Automated Analysis][10] insights   |
| [Containers][12]          | Proporciona cambios de código para [Kubernetes Remediations][13]  |

## Capacidades clave {#key-capabilities}

### Correcciones de código y optimizaciones presentadas por los productos de Datadog {#code-fixes-and-optimizations-surfaced-by-datadog-products}

A través de [productos de Datadog compatibles](#supported-datadog-products), utilice Bits Code para implementar optimizaciones y correcciones—por ejemplo, [Cloud Cost Recommendations][23], problemas de [Error Tracking][1] y [vulnerabilidades SAST][15]. En ciertos productos, [Bits Chat][16] explora e investiga problemas, luego entrega sus hallazgos a Bits Code para implementar un cambio de código.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="Un botón etiquetado con el texto \"Fix with Bits.\"" style="width:25%" >}}

Puede solicitar manualmente a Bits Code que implemente cambios para un hallazgo determinado, o configure una [automatización][28] para que lo haga de manera autónoma. 

### Tareas generales de codificación {#general-coding-tasks}

Utilice el campo de solicitud libre en [**Sesiones**][7] para trabajar con Bits Code en tareas generales de codificación.

### Automations {#automations}

[Automations][28] ejecutan sesiones de Bits Code automáticamente, según un horario o en respuesta a señales de productos de Datadog como Error Tracking, APM o Code Security. Una vez completada una sesión, Bits Code entrega los resultados como una solicitud de extracción, un PR borrador o una notificación de Slack.

Puede construir [Automations] a partir de disparadores (un hallazgo de producto, una solicitud personalizada, un horario o una combinación) y configure una o más salidas. Las plantillas proporcionadas por Datadog también están disponibles para ayudarte a comenzar. Cree y gestione [Automations] en **Bits AI** > **Bits Code** > [**Automations**][29].

### Colaboración en solicitudes de extracción {#pull-request-collaboration}

Bits Code se integra con GitHub para:
- Crear solicitudes de extracción, generando títulos y descripciones basados en la plantilla de solicitud de extracción de su repositorio
- Itere en las solicitudes de extracción en respuesta a los comentarios; mencione `@Datadog` en un comentario para solicitar a Bits actualizaciones.
- Monitoree los registros de CI y corrija fallas.

Bits Code nunca fusiona automáticamente las solicitudes de extracción. Vea todas las solicitudes de extracción en las que está trabajando Bits Code en **Bits AI** > **Bits Code** > **[Sesiones][7]**.

## Limitaciones {#limitations}

- Bits Code es un producto de IA, lo que significa que puede cometer errores. Utilice las mejores prácticas al revisar y probar el código generado por el agente.  
- Bits Code no soporta investigaciones en múltiples repositorios.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking
[2]: /es/security/code_security
[3]: /es/profiler/
[4]: /es/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /es/bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code
[8]: /es/bits_ai/bits_ai_sre/
[10]: /es/profiler/automated_analysis/
[12]: /es/containers/
[13]: /es/containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /es/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /es/bits_ai/bits_chat/
[17]: /es/bits_ai/bits_ai_sre/
[20]: /es/tracing/
[21]: /es/tracing/recommendations/
[22]: /es/cloud_cost_management/
[23]: /es/cloud_cost_management/recommendations
[24]: /es/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /es/security/code_security/iac_security/
[26]: /es/security/code_security/software_composition_analysis/
[27]: /es/account_management/billing/ai_credits/
[28]: /es/bits_ai/bits_ai_dev_agent/automations/
[29]: https://app.datadoghq.com/code/automations