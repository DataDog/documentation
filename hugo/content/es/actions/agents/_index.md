---
description: Cree e implemente agentes de IA personalizados que automaticen tareas
  operativas utilizando las herramientas e integraciones de Datadog.
further_reading:
- link: /actions/actions_catalog/
  tag: Documentación
  text: Action Catalog
- link: /actions/workflows/
  tag: Documentación
  text: Workflow Automation
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: AI Credits
- link: /incident_response/case_management/ai/custom_agents/
  tag: Documentación
  text: Integración de gestión de trabajo con Bits Agent Builder
- link: https://www.datadoghq.com/knowledge-center/aiops/ai-agents/
  tag: Knowledge Center
  text: ¿Qué son los agentes de IA y cómo funcionan?
- link: https://www.datadoghq.com/blog/bits-agent-builder/
  tag: Blog
  text: 'Presentamos Bits Agent Builder: cree flujos de trabajo agénticos para la
    respuesta y remediación de alertas'
title: Bits Agent Builder
---
## Descripción general {#overview}

Bits Agent Builder le permite crear agentes de IA personalizados que utilizan las herramientas e integraciones de Datadog para automatizar tareas operativas. Los agentes pueden buscar registros, consultar métricas, crear elementos de trabajo, enviar mensajes o realizar cualquier acción del [Action Catalog][7].

Utilice agentes para manejar trabajo que es demasiado complejo para la automatización estática pero demasiado repetitivo para los humanos. Por ejemplo, clasificar errores, responder a incidentes, analizar tendencias y escalar problemas.

<div class="alert alert-info">Bits Agent Builder consume <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

{{< img src="/actions/agents/agent-builder-interface.png" alt="El editor de Bits Agent Builder que muestra las instrucciones, el modelo, las herramientas y la configuración de automatización" style="width:100%;" >}}

## Crear un agente {#create-an-agent}

Desde la [página de Bits Agent Builder][1], haga clic en **New Agent**. Desde allí, puede crear un agente de tres maneras:

- **Crear con IA**: Describa lo que desea que haga el agente en lenguaje sencillo. Bits Agent Builder genera las instrucciones, selecciona las herramientas relevantes y configura el agente para usted.
- **Partir de un blueprint**: Elija un Blueprint preconstruido para casos de uso comunes como clasificación de errores, respuesta a incidentes, análisis de seguridad o asistencia de DevOps. Blueprints vienen preconfigurados con instrucciones, herramientas y automatizaciones, y son personalizables.
- **Comenzar desde cero**: Configure el agente manualmente: escriba instrucciones, elija un modelo y agregue herramientas.

{{< img src="/actions/agents/empty-state.png" alt="La interfaz del nuevo agente de Bits Agent Builder que muestra un campo de texto y opciones de Blueprints" style="width:100%;" >}}

## Configure su agente{#configure-your-agent}

### Instrucciones{#instructions}

Las instrucciones le dicen al agente qué hacer cuando se ejecuta. Escríbalas en lenguaje natural: describa el objetivo, el proceso y cualquier restricción. Edite las instrucciones directamente o refínelas a través de la interfaz de chat.

Escriba instrucciones que sean específicas y orientadas a resultados. Por ejemplo:

```
You are an Incident Responder AI assistant specialized in managing
and coordinating incident response activities.

Your role involves:
- Guiding incident response procedures and best practices
- Helping assess incident severity and impact
- Coordinating communication between teams and stakeholders
- Managing incident lifecycle from detection to resolution
- Facilitating post-incident reviews and improvements

During incident response:
1. Use search_datadog_logs to pull recent error logs for the affected service
2. Help classify incident severity (P0/P1/P2/etc.)
3. Guide through incident response runbooks and procedures
4. Assist with stakeholder communication and updates
5. Track action items and follow-up tasks
6. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### Modelo{#model}

Seleccione qué LLM impulsa el razonamiento del agente. Los modelos varían en capacidad, velocidad y costo; elija según la carga de trabajo de su agente. Puede comparar modelos usando la [herramienta de comparación de OpenAI][6] y la [comparación de modelos de Anthropic][5].

### Herramientas{#tools}

Las herramientas definen qué acciones puede realizar el agente. Agregue herramientas desde el [Action Catalog][7]. El agente solo puede usar las herramientas que se han agregado a su configuración.

Haga clic en cualquier herramienta agregada para codificar sus parámetros de forma fija. Por ejemplo, bloquee una herramienta de Slack a un canal específico o una consulta de registros a un servicio específico.

El [Datadog MCP Server][8] está habilitado de forma predeterminada. Puede conectarse a cualquier API usando [acciones HTTP personalizadas][12].

### Automatizaciones {#automations}

Configure su agente para que se ejecute automáticamente con un [horario][13], o actívelo desde un [monitor][14], [incidente][15] o [señal de seguridad][16] de Datadog. Estas automatizaciones usan [Workflow Automation][9].

## Pruebe su agente {#test-your-agent}

Use la interfaz de chat integrada para probar su agente. Envíe mensajes, revise el razonamiento del agente y verifique que realice las acciones correctas. El historial de chat se conserva entre sesiones.

## Orquestación de agentes {#agent-orchestration}

Use agentes en [Workflow Automation][9] y [App Builder][10] a través de la acción **Run Agent**. Esto le permite integrar el razonamiento de IA en cualquier flujo de trabajo:

{{< img src="/actions/agents/run-agent-step.png" alt="La configuración del paso Run Agent en un flujo de trabajo, que muestra la selección del agente, las instrucciones de ejecución, el ID de conversación y los campos de esquema de salida." style="width:100%;" >}}

1. Abra o cree un flujo de trabajo en [Workflow Automation][9], o abra o cree una aplicación en [App Builder][10].
1. Agregue el paso **Run Agent** desde el catálogo de acciones.
1. Seleccione qué agente ejecutar.
1. Escriba las **Run Instructions**—el prompt que recibe el agente cada vez que se ejecuta. Use variables como `{{Source.form}}` para pasar datos del activador.

El paso **Run Agent** también admite los siguientes campos opcionales:

- **Esquema de salida**: defina un esquema JSON para la respuesta del agente. Cuando se configura, el agente estructura su salida para que coincida con el esquema para su uso en pasos posteriores. Por ejemplo, puede definir un esquema con un campo `requestType`, y luego ramificar en `Run Agent.finalResponse.requestType` en un paso de condición If.

  {{< img src="/actions/agents/output-schema-example.png" alt="Un flujo de trabajo que utiliza un esquema de salida para ramificar en campos de respuesta del agente" style="width:100%;" >}}

- **ID de conversación**: De forma predeterminada, cada invocación de Run Agent es una ejecución independiente de un solo turno. Pasar un ID de conversación permite que el agente conserve el contexto a través de múltiples ejecuciones de flujo de trabajo. Las sesiones de múltiples turnos están sujetas a los mismos límites de ventana de contexto que la interfaz de chat.

El agente se ejecuta con sus herramientas e instrucciones configuradas, y luego devuelve su salida al flujo de trabajo. Puede combinar la automatización basada en reglas con el razonamiento de IA en un solo flujo de trabajo.

### Asignar agentes automáticamente a elementos de trabajo {#automatically-assign-agents-to-work-items}

[Work Management][17] es la herramienta de tickets integrada de Datadog para realizar el seguimiento del trabajo humano y de agentes. Puede crear agentes personalizados para ayudar a clasificar y resolver su trabajo, y asignar automáticamente estos agentes a elementos de trabajo.

## Solución de problemas {#troubleshooting}

**Agent no utiliza una herramienta**: Verifique que la herramienta se haya agregado a la configuración del agente. Los agentes solo pueden utilizar las herramientas que se agregan explícitamente.

**La automatización no se está ejecutando**: Verifique que la automatización esté publicada y que el paso Run Agent esté completamente configurado.

**Límite de longitud de la conversación**: Las conversaciones largas pueden alcanzar el límite de longitud del contexto. Si esto sucede, inicie una nueva conversación. 

**Cambios de configuración inesperados**: Utilice [Audit Trail][11] filtrado por el ID de su agente para revisar el historial de cambios.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison
[6]: https://developers.openai.com/api/docs/models
[7]: /es/actions/actions_catalog/
[8]: /es/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /es/account_management/audit_trail/
[12]: /es/actions/actions_catalog/http-action/
[13]: /es/actions/workflows/trigger/#scheduled-triggers
[14]: /es/actions/workflows/trigger/#monitor-triggers
[15]: /es/actions/workflows/trigger/#incident-triggers
[16]: /es/actions/workflows/trigger/#security-triggers
[17]: /es/incident_response/work_management/ai/custom_agents/