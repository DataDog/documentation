---
aliases:
- /es/incident_response/case_management/ai/custom_agents/
description: Aprenda a usar agentes personalizados creados con Bits Agent Builder
  para automatizar flujos de trabajo de Work Management en Datadog.
further_reading:
- link: /actions/agents/
  tag: Documentación
  text: Bits Agent Builder
- link: /actions/actions_catalog/
  tag: Documentación
  text: Action Catalog
title: Agentes de IA de Datadog
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">Las funciones de IA para Work Management no son compatibles con su <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">La integración de Work Management con agentes personalizados está en versión preliminar.</div>

## Descripción general {#overview}

Work Management se integra con [Bits Agent Builder][1], lo que le permite pasar de la creación, clasificación y resolución manual de elementos de trabajo a la automatizada. Asigne elementos de trabajo a agentes personalizados para respaldar sus diferentes flujos de trabajo.

## Crear agentes personalizados {#create-custom-agents}

Use [Bits Agent Builder][1] para crear agentes personalizados que puedan clasificar y resolver elementos de trabajo. Los agentes pueden realizar cualquier acción del [Action Catalog][2], incluida la creación, actualización y resolución de elementos de trabajo. Estos son ejemplos de agentes que puede crear para usar en Work Management:

- **Clasificador de problemas**: Enriquece los elementos de trabajo entrantes con estructura y contexto para que una persona pueda actuar sin preparación manual.
- **Agregador de señales de seguridad**: Agrupa señales de seguridad relacionadas en un elemento de trabajo de investigación unificado para evitar el análisis aislado.
- **Implementador de funciones**: Lleva una especificación de solicitud de función a un borrador de PR para ayudarle a enviar mejoras más rápido.
- **Automatizador de solicitudes de acceso de TI**: Revisa los detalles del elemento de trabajo, solicita cualquier detalle faltante al remitente y solicita automáticamente las aprobaciones requeridas a los administradores.
- **Primer respondedor de soporte**: Redacta una respuesta inicial e inicia el proceso de investigación para tickets de soporte para ayudar a reducir el tiempo medio de resolución (MTTR).

## Uso de agentes personalizados en Work Management {#using-custom-agents-in-work-management}

Asigne elementos de trabajo a agentes de Bits Agent Builder de forma manual o automática usando el campo **Agent Assignee** en los elementos de trabajo.

### Asignación manual {#manual-assignment}

En un elemento de trabajo, seleccione un agente del menú desplegable del campo **Agent Assignee**.

### Asignación automatizada {#automated-assignment}

Utilice [work item automation rules][3] para asignar elementos de trabajo a los agentes automáticamente:

1. Navegue a **[Work Management > Settings][4]**.
1. Seleccione el proyecto para el cual desea crear reglas de automatización.
1. Seleccione **Automation Rules**.
1. Haga clic en **New Rule**.
1. Defina un activador para cuándo debe ejecutarse la regla.
1. Seleccione **Assign Agent** y elija el agente personalizado al cual asignar los elementos de trabajo coincidentes.
1. Habilite y nombre su regla.

**Nota**: Los agentes se ejecutan utilizando los permisos del usuario que asignó el agente al elemento de trabajo.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/agents/
[2]: /es/actions/actions_catalog/
[3]: /es/incident_response/work_management/automation_rules/
[4]: https://app.datadoghq.com/work/settings