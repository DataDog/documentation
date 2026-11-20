---
aliases:
- /es/security/workload_protection/detect_and_monitor/finding_rules
description: Cree y administre las reglas de backend que evalúan su postura de seguridad
  en tiempo de ejecución y generan hallazgos de Workload Protection.
disable_toc: false
further_reading:
- link: /security/workload_protection/investigate_and_triage/security_findings
  tag: Documentación
  text: Investigue y clasifique los hallazgos
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: Documentación
  text: Guía SECL
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: Documentación
  text: Reglas de detección
title: Reglas de hallazgos
---
Las reglas de hallazgos describen la lógica de backend utilizada para evaluar su postura de seguridad en tiempo de ejecución mediante el análisis de eventos de Agent. Cuando una regla de hallazgo coincide, Workload Protection genera un [finding][2] para el recurso afectado.

A diferencia de las [detection rules][3], que detectan amenazas de seguridad reales en tiempo de ejecución, las reglas de hallazgos rastrean malas prácticas y configuraciones incorrectas en curso. Un hallazgo representa un recurso (un servidor o contenedor) que está fallando activamente en una política de seguridad, no una sola actividad sospechosa.

Las reglas de hallazgos utilizan eventos de Agent existentes para mostrar recomendaciones de seguridad prácticas, como el uso del administrador de paquetes en contenedores, patrones de acceso a IMDS o configuraciones de privilegios innecesarias. Esto le ayuda a abordar riesgos del mundo real que no son amenazas directas, pero que representan prácticas riesgosas en entornos de producción.

## Reglas de hallazgos OOTB {#ootb-finding-rules}

Workload Protection incluye reglas de hallazgos listas para usar (OOTB) mantenidas por Datadog. Estas reglas muestran continuamente malas prácticas y configuraciones riesgosas en las cargas de trabajo de producción. Datadog desarrolla nuevas reglas predeterminadas de forma continua, y las nuevas reglas se importan automáticamente a su cuenta. Para ver la lista completa, consulte [la lista de reglas OOTB][8].

Explore y revise las reglas de hallazgos implementadas en su organización en la lista de [finding rules][6] de Workload Protection en Datadog. Cada regla incluye una descripción del riesgo de seguridad, los tipos de recursos a los que se aplica y una guía de corrección.

Para reducir el ruido de las configuraciones esperadas, utilice una automatización de hallazgos para silenciar una regla sin deshabilitarla. Consulte [Findings automation][7].

## Cree una regla de hallazgo personalizada {#create-a-custom-finding-rule}

Las reglas de hallazgo personalizadas siguen el mismo proceso de creación que las [reglas de detección][3], con una diferencia clave: se dirigen a un tipo de recurso específico (servidor o contenedor) en lugar de detectar un evento en un momento determinado.

Para crear una regla de hallazgo personalizada, vaya a la página de [reglas de hallazgo][6] de Workload Protection y haga clic en {{< ui >}}New Rule{{< /ui >}}.

El editor de reglas lo guía a través de cinco pasos.

### Paso 1: Seleccione un tipo de recurso y defina la consulta de búsqueda {#step-1-select-a-resource-type-and-define-search-query}

Seleccione el tipo de recurso que evalúa la regla de hallazgo:

- {{< ui >}}Host{{< /ui >}}: La regla se aplica a los servidores. Workload Protection antepone automáticamente `-@container.id:*` a su consulta para excluir eventos de contenedor.
- {{< ui >}}Container{{< /ui >}}: La regla se aplica a los contenedores. Workload Protection antepone automáticamente `@container.id:*` a su consulta para incluir solo eventos de contenedor.

{{< img src="security/workload_protection/detect_and_monitor/finding_rules_editor.png" alt="Editor de reglas de hallazgo que muestra el selector de tipo de recurso Servidor y Contenedor y la vista previa de la consulta de búsqueda" width="100%">}}

Defina la consulta que selecciona qué [Agent events][1] evalúa la regla. La consulta de búsqueda determina qué eventos se consideran al decidir si un recurso no cumple con la regla.

Usted puede:

- Filtre por **campos específicos** en los eventos de Agent para refinar la consulta y hacer que el hallazgo sea más preciso. Por ejemplo, filtre por `@process.executable.path`, `@file.path` o `@agent.rule_id`. Al igual que las [reglas de detección][3], las reglas de hallazgo pueden consultar cualquier campo del esquema de eventos del backend, lo que incluye todos los campos de Agent events además de enriquecimientos adicionales como contexto de infraestructura, ascendencia de procesos e inteligencia de amenazas. Consulte la [sintaxis de backend de Linux][9] y la [sintaxis de backend de Windows][10] para obtener el conjunto completo de campos disponibles.
- Combine múltiples condiciones para definir el contexto de la regla a un subconjunto de su infraestructura o cargas de trabajo.

Utilice el [Agent Events Explorer][5] para probar su consulta y validar qué eventos coinciden antes de publicar la regla.

### Paso 2: Defina la gravedad del hallazgo {#step-2-define-finding-severity}

Defina la gravedad que tiene un hallazgo cuando se activa la regla.

### Paso 3: Describa el hallazgo {#step-3-describe-the-finding}

Configure el **nombre**, la **descripción** y la **guía de corrección** que aparecen cuando se genera un hallazgo.

1. Ingrese un {{< ui >}}Rule name{{< /ui >}}. El nombre aparece en la lista de reglas de hallazgo y se convierte en el título del hallazgo generado.
2. En la sección {{< ui >}}Rule message{{< /ui >}}, use Markdown para describir qué significa el hallazgo y cómo abordarlo. Incluya un encabezado `## Remediation` en el cuerpo del mensaje; Workload Protection utiliza esta sección para mostrar los pasos de corrección directamente en el panel lateral del hallazgo.
3. Use el menú desplegable {{< ui >}}Tag resulting findings{{< /ui >}} para agregar etiquetas a los hallazgos generados. Por ejemplo, `security:posture` o `compliance:pci`.

**Nota**: El encabezado `## Remediation` es obligatorio para que los pasos de corrección se muestren correctamente en el panel lateral del hallazgo.

[1]: /es/security/workload_protection/investigate_and_triage/agent_events
[2]: /es/security/workload_protection/investigate_and_triage/security_findings
[3]: /es/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: https://app.datadoghq.com/security/configuration/findings-automation
[5]: https://app.datadoghq.com/security/agent-events
[6]: https://app.datadoghq.com/security/workload-protection/finding-rules
[7]: /es/security/automation_pipelines/mute
[8]: /es/security/default_rules/#workload-activity
[9]: /es/security/workload_protection/backend_linux
[10]: /es/security/workload_protection/backend_windows