---
aliases:
- /es/bits_ai/bits_ai_sre/remediate_issues/
- /es/bits_ai/bits_investigation/remediate_issues/
- /es/bits_ai/bits_ai_sre/take_action/
- /es/bits_ai/bits_investigation/take_action/
description: Aprenda cómo Bits proporciona pasos de remediación accionables para investigaciones
  de causa raíz.
site_support_id: bits_remediation
title: Bits Remediation
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation incluye capacidades en vista previa. Haga clic en <strong>Request Access</strong> para unirse al programa de vista previa.
{{< /callout >}}

## Automatice las correcciones de código {#automate-code-fixes}

Después de que Bits le ayuda a identificar una causa raíz a partir de una investigación, también puede ayudarle a tomar medidas lo más rápido posible.

Bits Investigation se integra con [Bits Code][2] para generar correcciones de código. Bits se conecta a su proveedor de código fuente para crear, actualizar e iterar en solicitudes de extracción listas para producción, basadas en problemas existentes detectados por Datadog.

De forma predeterminada, Bits genera automáticamente correcciones de código para investigaciones con causas raíz relacionadas con el código. Para generar correcciones de código manualmente, deshabilite la generación automática de correcciones de código en [Configuración][3].

Para comenzar a usar las correcciones de código:
1. [Configure Bits Code][1]. Después de que Bits determina una causa raíz relacionada con el código, Bits genera, de forma predeterminada, una corrección de código sugerida en Next Steps.
1. Si las correcciones de código automáticas están deshabilitadas, genere manualmente una corrección de código desde Next Steps.
1. Chatee con Bits dentro de la sesión de código para actualizar la corrección de código sugerida.
1. Cree una solicitud de extracción para su revisión y fusión cuando esté listo.

Con las correcciones de código habilitadas, puede cerrar el ciclo y resolver problemas directamente desde Bits Investigation.

{{< img src="bits_ai/bits_remediation/suggested_code_fix.png" alt="Árbol de hipótesis de Bits Investigation que muestra una conclusión de causa raíz con una corrección de código sugerida y otros Next Steps." style="width:100%;" >}}

## Ejecute acciones de triaje {#run-triage-actions}

Desde el chat, puede activar acciones de triaje sin salir del flujo de trabajo de investigación.

Las acciones admitidas incluyen:
- Enviar mensajes de Slack y Microsoft Teams
- Crear incidentes en Datadog y PagerDuty
- Enviar avisos a ingenieros mediante Datadog On-Call
- Crear elementos de trabajo en Datadog Work Management
- Abrir tickets de Jira

Bits puede extraer contexto relevante de la investigación y de sus integraciones conectadas para rellenar previamente mensajes, descripciones de incidentes y metadatos de tickets. Esto reduce el esfuerzo manual, ayuda a garantizar la coherencia y acelera el tiempo de respuesta.

## Tome medidas en su infraestructura {#take-action-on-your-infrastructure}

{{< callout >}} Las acciones de un solo clic están en vista previa. {{< /callout >}}

Para problemas relacionados con la infraestructura, Bits puede recomendar una acción de remediación, como escalar una implementación, reiniciar un pod o aplicar parches a un recurso.

- **Recomendaciones manuales**: copie el comando sugerido (por ejemplo, un comando `kubectl patch`) y ejecútelo en su propia CLI.
- **Acciones de un solo clic (vista previa)**: haga clic en **Run** para permitir que Bits ejecute la acción de remediación sugerida directamente desde el contexto de la investigación.

{{< img src="bits_ai/bits_remediation/one_click_action.png" alt="Una acción de remediación sugerida con instrucciones para reiniciar una implementación y un botón Run" style="width:100%;" >}}

Las acciones de Kubernetes están admitidas en vista previa. Consulte el [Action Catalog][4] para obtener la lista completa de acciones admitidas y cómo habilitarlas en Datadog.

Para ejecutar acciones de Kubernetes de un solo clic, su organización necesita:
- Un [Private Action Runner][5] con acceso de red a su clúster de Kubernetes, vinculado a una [conexión][6] con la integración de Kubernetes.
- Un rol de usuario con permiso para ejecutar acciones y resolver la conexión de Kubernetes.

## Regule cómo Bits toma medidas de remediación {#govern-how-bits-takes-remediation-action}

{{< callout >}} Bits Guardrails se encuentra en versión preliminar.{{< /callout >}}

[Bits Guardrails][8] permite a los administradores definir qué acciones de corrección puede tomar Bits, dónde se aplican esas acciones y quién debe aprobarlas.

Las barreras de protección requieren los permisos `Guardrails Read` y `Guardrails Write`, que se pueden habilitar en [Configuración organizacional > Roles][7]. 

Para crear una barrera de protección:
1. **Elija las acciones a las que apuntar**: Seleccione una o más acciones disponibles para una integración (por ejemplo, Kubernetes) a las que la barrera de protección debe apuntar.
1. **Defina el alcance de la barrera de protección**: Especifique las etiquetas de entorno, servicio y recurso a las que se aplica la barrera de protección.
1. **Establezca el nivel de cumplimiento**: Para las acciones y el alcance seleccionados, decida cuándo puede actuar Bits.
    - **Preguntar**: Requiere la aprobación del usuario antes de que Bits ejecute acciones. Elija qué Teams, roles o personas pueden aprobar.
    - **Denegar**: Bits puede recomendar una acción, pero no puede ejecutarla.

## Validar que los problemas se hayan resuelto {#validate-that-issues-are-resolved}

Bits puede verificar si una acción de remediación se aplicó correctamente y si el problema original se resolvió. Haga clic en **Verify Resolution** para validar el estado de la acción de remediación y del problema.

[1]: /es/bits_ai/bits_code/setup/
[2]: /es/bits_ai/bits_code
[3]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[4]: /es/actions/actions_catalog/
[5]: /es/actions/private_actions/
[6]: /es/actions/connections/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: https://app.datadoghq.com/bits-ai/settings/remediation-guardrails