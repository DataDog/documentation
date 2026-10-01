---
aliases:
- /es/bits_ai/bits_ai_dev_agent/
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: Blog
  text: Identifique problemas automáticamente y genere correcciones con Bits Code
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: Blog
  text: Presentamos Bits Code para Code Security
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: AI Credits
title: Bits Code
---
## Descripción general {#overview}

Bits Code es un asistente de codificación de IA generativa que utiliza datos de observabilidad de Datadog para diagnosticar y corregir automáticamente problemas en su código. Se integra con [proveedores de código fuente](#supported-source-code-providers) para crear solicitudes de extracción o fusión listas para producción, luego itera sobre los cambios utilizando registros de CI y comentarios de los desarrolladores.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="Una pestaña titulada 'Sesiones' muestra un campo de texto con sugerencias debajo" style="width:100%;" >}}

Cada vez que Bits Code investiga un problema o genera una corrección, crea una [sesión](#sessions), que captura el análisis del agente, las acciones y cualquier cambio de código resultante en los productos de Datadog compatibles. Configure [automatizaciones][28] para que Bits Code ejecute sesiones según un horario programado o en respuesta a señales de otros productos de Datadog, como una nueva Recomendación de APM o una prueba inestable.

Para comenzar con Bits Code, [configure una integración de código fuente][6] y complete cualquier configuración adicional. Luego, [inicie su primera sesión](#start-a-session).

Obtenga información sobre cómo se factura su uso de Bits Code en [AI Credits][27].

## Sessions {#sessions}
Una sesión captura un segmento de trabajo con Bits Code, incluyendo su análisis y los cambios de código. Inicie, visualice y administre sus sesiones en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7].

{{< img src="bits_ai/dev_agent/code_fix.png" alt="Una sesión que muestra un resumen de Bits AI y una lista de tareas a la izquierda y una diferencia de código a la derecha" style="width:100%;" >}}

### Iniciar una sesión {#start-a-session}
Después de [completar la configuración][6], haga una de las siguientes acciones para iniciar una sesión de Bits Code:
- Ingrese un mensaje de formato libre en [{{< ui >}}Sessions{{< /ui >}}][7]: ingrese un mensaje personalizado o genere uno haciendo clic en una tarjeta de mensaje sugerida
- Invoque Bits Code en un [producto de Datadog compatible](#supported-datadog-products)
- Configure una [automatización][28] de Bits Code

También se puede crear una sesión cuando otro agente de Bits AI (como [Bits Chat][16] o [Bits Investigation][17]) transfiere una tarea de codificación a Bits Code.

### Visibilidad de la sesión {#session-visibility}

Las sesiones de Bits Code se comparten de forma predeterminada en toda su organización de Datadog. Cualquier persona de su organización puede abrir una sesión para revisar su análisis, acciones y cambios de código, o seguir trabajando con Bits Code en ella. Esto facilita compartir el contexto y retomar el trabajo en curso de un compañero de equipo.

### Visualizar y administrar sesiones {#view-and-manage-sessions}
En [{{< ui >}}Sessions{{< /ui >}}][7], el panel {{< ui >}}My Sessions{{< /ui >}} muestra las sesiones en las que usted participa. Una sesión aparece aquí si usted la inició o interactuó con ella de alguna manera, como al participar en la conversación o al crear un PR o MR asociado. {{< ui >}}My Sessions{{< /ui >}} es una vista personalizada, no un límite de privacidad; es decir, otros miembros de su organización aún pueden acceder a estas sesiones.

Haga clic en una sesión para visualizar sus detalles y continuar trabajando con Bits Code. Para eliminar una sesión de su {{< ui >}}My Sessions{{< /ui >}} lista, haga clic en una de las siguientes opciones:
- <i class="icon-eye-slashed-wui"></i> ({{< ui >}}Unwatch session{{< /ui >}}): elimina la sesión solo de su propia lista de {{< ui >}}My Sessions{{< /ui >}}. Los demás usuarios no se verán afectados.
- <i class="icon-archive-wui"></i> ({{< ui >}}Archive for everyone{{< /ui >}}): archiva la sesión para todos los usuarios de su organización.

## Proveedores de código de fuente compatible {#supported-source-code-providers}
Bits Code es compatible con los siguientes proveedores de código fuente:
- **GitHub**: GitHub.com, [GitHub Enterprise Cloud][30], [GitHub Enterprise Cloud with data residency][31] y [GitHub Enterprise Server][38].
- **GitLab**: [GitLab.com y GitLab Self-Managed][20].
- **Azure DevOps Cloud**: [dev.azure.com y *.visualstudio.com][39].

Los siguientes planes no son compatibles:
- **Azure DevOps Server**: Las instancias locales no son compatibles con Bits Code ni con Datadog [Source Code Integration][37].
- **Bitbucket**: Ni Bitbucket.org, ni Bitbucket Data Center, ni Bitbucket Data Server (On-Prem) son compatibles con Bits Code. Datadog [Source Code Integration][37] no es compatible con implementaciones On-Prem de Bitbucket.

## Productos Datadog compatibles{#supported-datadog-products}

Bits Code puede sugerir mejoras de código dentro de varios productos de Datadog, incluidos los siguientes:

| Product                   | Capabilities                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | Propone cambios de código para las [APM Recommendations][21] relevantes|
| [Bits Investigation][17]         | Genera correcciones de código basadas en Bits Investigations |
| [Bits Chat][16]   | Sugiere cambios de código derivados de las conversaciones en Bits Chat |
| [Cloud Cost][22]          | Genera cambios de código para [Cloud Cost Recommendations][23] |
| [Cloud Security][34]      | Corrige [hallazgos de configuración incorrecta][35] en la IaC que define el recurso afectado |
| [Error Tracking][1]       | Diagnostica problemas y genera correcciones de código bajo demanda o de forma autónoma |
| [Code Security][2]        | Corrige [vulnerabilidades SAST][15], [vulnerabilidades de IaC][25] y [vulnerabilidades SCA][26] (de forma individual o masiva)  |
| [Test Optimization][4]    | Proporciona correcciones de código para [pruebas inestables][24] y verifica que las pruebas permanezcan estables  |
| [Continuous Profiler][3]  | Proporciona cambios de código para los insights de [Automated Analysis][10]   |
| [Containers][12]          | Proporciona cambios de código para [Kubernetes Remediations][13]  |
| [Sensitive Data Scanner][36] | Genera correcciones de código para los registros que causan fugas de datos confidenciales |

## Capacidades clave {#key-capabilities}

### Correcciones y optimizaciones de código presentadas por los productos de Datadog {#code-fixes-and-optimizations-surfaced-by-datadog-products}

En los [productos de Datadog compatibles](#supported-datadog-products), utilice Bits Code para implementar optimizaciones y correcciones; por ejemplo, [Cloud Cost Recommendations][23], inconvenientes [Error Tracking][1] y [SAST vulnerabilities][15]. En ciertos productos, [Bits Chat][16] explora e investiga problemas, y luego transfiere sus hallazgos a Bits Code para implementar un cambio de código.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="Un botón etiquetado con el texto 'Fix with Bits.'" style="width:25%" >}}

Puede solicitar manualmente a Bits Code que implemente cambios para un hallazgo determinado, o configurar una [automatización][28] para que lo haga de forma autónoma. 

### Tareas de programación generales {#general-coding-tasks}

Utilice el campo de solicitud de formato libre en [{{< ui >}}Sessions{{< /ui >}}][7] para trabajar con Bits Code en tareas generales de codificación.

### Automatizaciones {#automations}

Las [automatizaciones][28] ejecutan sesiones de Bits Code automáticamente, según un horario o en respuesta a señales de productos de Datadog como Error Tracking, APM o Code Security. Después de que se completa una sesión, Bits Code entrega los resultados como una solicitud de extracción o fusión (opcionalmente en modo borrador) o una notificación de Slack.

Puede crear automatizaciones a partir de activadores (un hallazgo del producto, una solicitud personalizada, un horario o una combinación) y configurar una o más salidas. También hay plantillas de Datadog disponibles para ayudarle a comenzar. Cree y administre Automations en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][29].

### Instrucciones y habilidades del agente personalizadas {#custom-agent-skills-and-instructions}

Bits Code puede usar habilidades personalizadas definidas en su repositorio. Detecta habilidades con el formato `<skill-name>/SKILL.md` en los directorios `.claude/skills/`, `.codex/skills/` y `.gemini/skills/`. Las habilidades deben contener claves de frontmatter YAML `name` y `description`.

Bits Code invoca automáticamente las habilidades apropiadas según sus valores `name` y `description`, y usted puede fomentar su uso mencionando las habilidades en su [archivo de instrucciones personalizadas][33]. También puede solicitar a Bits Code que utilice una habilidad determinada directamente.

Bits Code también [incorpora instrucciones personalizadas][33] definidas en su repositorio y en la configuración de Bits Code.

### Colaboración en solicitudes de extracción o fusión{#pull-or-merge-request-collaboration}

Bits Code se integra con [proveedores de código fuente](#supported-source-code-providers) para:
- Cree solicitudes de extracción o de fusión, generando títulos y descripciones basados en la plantilla de solicitudes de extracción o de fusión de su repositorio
- Itere en las solicitudes de extracción en respuesta a comentarios (solo GitHub); mencione a `@Datadog` en un comentario para solicitar actualizaciones a Bits
- Haga un seguimiento de los registros de CI y del estado de las solicitudes de extracción o de fusión para corregir fallas y bloqueos de fusión

Bits Code nunca fusiona automáticamente PRs o MRs. Vea todas las PRs o MRs en las que Bits Code está trabajando en {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7].

## Limitaciones {#limitations}

- Bits Code es un producto de IA, lo que significa que puede cometer errores. Utilice las mejores prácticas al revisar y probar el código generado por el agente.  
- Bits Code no admite investigaciones en múltiples repositorios.
- Al usar GitLab, no se admite mencionar a `@Datadog` en un comentario para solicitar actualizaciones a Bits.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking
[2]: /es/security/code_security
[3]: /es/profiler/
[4]: /es/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /es/bits_ai/bits_code/setup/
[7]: https://app.datadoghq.com/code
[8]: /es/bits_ai/bits_investigation/
[10]: /es/profiler/automated_analysis/
[12]: /es/containers/
[13]: /es/containers/bits_ai_kubernetes_remediation
[15]: /es/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /es/bits_ai/bits_chat/
[17]: /es/bits_ai/bits_investigation/
[20]: /es/tracing/
[21]: /es/tracing/recommendations/
[22]: /es/cloud_cost_management/
[23]: /es/cloud_cost_management/recommendations
[24]: /es/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /es/security/code_security/iac_security/
[26]: /es/security/code_security/software_composition_analysis/
[27]: /es/account_management/billing/ai_credits/
[28]: /es/bits_ai/bits_code/automations/
[29]: https://app.datadoghq.com/code/automations
[34]: /es/security/cloud_security_management/
[35]: /es/security/cloud_security_management/review_remediate/remediate_with_ai/
[36]: /es/security/sensitive_data_scanner/
[30]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
[31]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud#about-data-residency
[32]: https://docs.gitlab.com/subscriptions/gitlab_dedicated/
[33]: /es/bits_ai/bits_code/setup/#configure-custom-instructions
[37]: /es/source_code/source-code-management#source-code-management-providers
[38]: https://docs.github.com/en/enterprise-server@3.17/admin/overview/about-github-enterprise-server
[39]: https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops