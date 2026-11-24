---
algolia:
  tags:
  - dashboard reporter
  - agentic reporting
  - scheduled report
  - product analytics agent
description: Reciba informes programados generados por IA sobre sus paneles de Product
  Analytics en Slack, Microsoft Teams o por correo electrónico.
disable_toc: false
further_reading:
- link: /product_analytics/dashboards/
  tag: Documentación
  text: Paneles de Product Analytics
- link: /actions/agents/
  tag: Documentación
  text: Bits Agent Builder
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: AI Credits
- link: /bits_ai/bits_chat/usage/#slack
  tag: Documentación
  text: Use Bits Chat en Slack
- link: /monitors/
  tag: Documentación
  text: Seguimientos
title: Dashboard Reporter Agent
---
## Descripción general {#overview}

El Dashboard Reporter Agent monitorea los paneles de Product Analytics que elija y envía a su equipo un informe programado en Slack, Microsoft Teams o por correo electrónico. Cada informe resume qué cambió, qué necesita atención y qué hacer a continuación, para que no tenga que abrir cada panel para comprobarlo. A medida que lanza más funciones, un agente puede monitorear muchos paneles, incluidos los paneles de lanzamientos anteriores que ya no reciben atención regular.

Los agentes Dashboard Reporter Agent están creados en [Bits Agent Builder][1].

<div class="alert alert-info">Los agentes Dashboard Reporter Agent consumen <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

Los informes son resúmenes de texto entregados según un horario. Para recibir notificaciones cuando una métrica supere un umbral, use un [monitor][2].

## Casos de uso {#use-cases}

Use el Dashboard Reporter Agent para:

- **Monitorear muchas funciones a la vez**: Un agente puede cubrir muchos paneles.
- **Mantener los lanzamientos visibles**: Suscriba un panel de lanzamiento para que se siga revisando cuando disminuya la atención que recibe el lanzamiento.
- **Compartir una actualización semanal sobre el estado del producto**: Publique un informe semanal en el canal de su equipo para que todos vean las mismas señales.
- **Informar al liderazgo**: Envíe métricas clave y el estado general del producto sin crear una presentación.
- **Detectar regresiones a tiempo**: Un informe diario muestra caídas y picos de errores poco después de que comienzan.

## Cómo el agente crea un informe {#how-the-agent-builds-a-report}

- **Cobertura completa**: El agente revisa cada gráfico de los paneles suscritos, no solo los gráficos de la parte superior de la página.
- **Comparación periodo a periodo**: Cada informe compara el periodo actual con el anterior. Un informe diario cubre las últimas 24 horas, un informe semanal cubre los últimos 7 días y un informe mensual cubre el último mes.
- **Métricas clave primero**: Las métricas clave aparecen en la parte superior de cada informe, para que su equipo pueda seguir el progreso de un período al siguiente.
- **Priorizados por gravedad**: El agente enumera los problemas de mayor a menor gravedad para que pueda concentrarse en los más importantes.
- **Solo cambios significativos**: Si no ha cambiado nada significativo, el informe lo indica en lugar de enumerar cambios menores.
- **Fuentes vinculadas**: Cada métrica y problema en el informe se vincula a su gráfico subyacente.

El agente lee los datos del panel con los permisos del usuario que creó el agente. Si ese usuario pierde el acceso a un panel, el panel ya no se incluye en el informe.

## Requisitos previos {#prerequisites}

- Acceso a Product Analytics y a los paneles que desea monitorear.
- Para enviar informes a Slack, la [integración de Datadog con Slack][3] debe estar instalada en su organización.
- Para enviar informes a Microsoft Teams, la [integración de Microsoft Teams][4] debe estar instalada en su organización.

## Crear un agente Dashboard Reporter {#create-a-dashboard-reporter-agent}

Puede comenzar desde un panel o desde la página Agents en Product Analytics.

{{< tabs >}}
{{% tab "Desde un panel" %}}

1. Abra el panel de Product Analytics que desea monitorear.
2. Haga clic en {{< ui >}}Set Up Report{{< /ui >}}. Si el panel ya está incluido en los informes de otros agentes, estos se enumeran aquí.

   {{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-dashboard.png" alt="Un encabezado de panel de Product Analytics con el botón Set Up Report resaltado." style="width:100%;" >}}

**Nota**: Si más de un agente monitorea el mismo panel, sus informes pueden diferir, porque cada agente redacta su informe de forma independiente.

{{% /tab %}}
{{% tab "Desde la página Agents" %}}

1. En Datadog, vaya a [**Product Analytics > Agents**][1].
2. Haga clic en {{< ui >}}\+ New Agent{{< /ui >}}.
3. Seleccione la plantilla {{< ui >}}Dashboard Reporter{{< /ui >}}.

{{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-agents.png" alt="La página del nuevo agente con la plantilla Dashboard Reporter resaltada en Start from blueprint." style="width:60%;" >}}

[1]: https://app.datadoghq.com/product-analytics/agents
{{% /tab %}}
{{< /tabs >}}

### Configure el agente {#configure-the-agent}

1. Ingrese un nombre que les indique a los lectores qué cubre el informe, como "Checkout Weekly Health". El nombre aparece en el título de cada informe.
2. Seleccione uno o más paneles para monitorear. Puede agregar más paneles más adelante.
3. Seleccione un formato de informe predefinido, como Team Update o Leadership Update, o escriba el suyo propio. Para un formato personalizado, describa las preguntas que el informe debe responder en cada ejecución y cualquier requisito de formato.
4. Seleccione un canal de Slack, un canal de Microsoft Teams o una dirección de correo electrónico para recibir los informes.
5. Elija la frecuencia con la que se ejecuta el agente (diaria, semanal o mensual), la hora a la que envía el informe y la zona horaria.
6. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Leer informes {#read-reports}

Los informes llegan al destino que configuró. Cada ejecución también se guarda en la página del agente, por lo que puede revisar informes anteriores.

### Haga preguntas de seguimiento sobre un informe {#ask-follow-up-questions-about-a-report}

Puede abrir un informe en Datadog y hacerle preguntas de seguimiento al agente. Por ejemplo, pregunte qué segmento impulsó un cambio o qué más cambió al mismo tiempo.

1. Abra el informe:
   - **Desde el mensaje del informe**: En el mensaje de Slack, Microsoft Teams o correo electrónico, haga clic en {{< ui >}}Chat with this report{{< /ui >}}.
   - **Desde Datadog**: Vaya a la página Agents y seleccione el agente.
2. Ingrese su pregunta en el cuadro de mensaje y presione <kbd>Enter</kbd>.

### Pregunte a Bits AI en Slack {#ask-bits-ai-in-slack}

Si sus informes se envían a Slack y la integración de Slack de Datadog tiene habilitado Bits AI, puede preguntarle a Bits Chat sobre un informe sin salir de Slack. Mencione a `@Datadog` con su pregunta, por ejemplo, `@Datadog Why did checkout conversion drop this week?` Para la configuración, consulte [Use Bits Chat en Slack][5].


## Administrar agentes de Dashboard Reporter {#manage-dashboard-reporter-agents}

Para ver sus agentes, vaya a [**Product Analytics > Agents**][6].

### Editar un agente {#edit-an-agent}

Puede cambiar los paneles, el formato de informe, el destino o la frecuencia de un agente.

1. Desde la página Agents, haga clic en el agente.
2. Realice sus cambios de una de las siguientes maneras:
   - **Pregunte al agente**: Describa el cambio en el chat. Por ejemplo: `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **Edite la configuración**: En la página Agents, o desde un panel suscrito, pase el cursor sobre el agente y haga clic en {{< ui >}}Edit{{< /ui >}}. Puede modificar los paneles suscritos, el formato de informe, la frecuencia o el destino.

### Pausar o reanudar un agente {#pause-or-resume-an-agent}

Pause un agente para detener los informes temporalmente, por ejemplo, durante un período de inactividad o mientras se reconstruye un panel. Un agente pausado conserva su configuración.

- **Para pausar un agente**: En la página Agents, pase el cursor sobre el agente y haga clic en {{< ui >}}Pause{{< /ui >}}. En la ventana de confirmación, haga clic en {{< ui >}}Pause{{< /ui >}} de nuevo.
- **Para reanudar un agente**: En la página Agents, coloque el cursor sobre el agente y haga clic en {{< ui >}}Resume{{< /ui >}}. En la ventana de confirmación, haga clic en {{< ui >}}Resume{{< /ui >}}.

### Eliminar un agente {#delete-an-agent}

Para detener los informes temporalmente, [pause el agente](#pause-or-resume-an-agent) en su lugar.

<div class="alert alert-warning">Eliminar un agente es permanente. El agente deja de enviar informes, su flujo de trabajo subyacente en <a href="/actions/workflows/">Workflow Automation</a> también se elimina, y no puede restaurar ninguno de los dos.</div>

Para eliminar un Agent, vaya a la página Agents, coloque el cursor sobre el Agent y haga clic en {{< ui >}}Delete{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/agents/
[2]: /es/monitors/
[3]: /es/integrations/slack/?tab=datadogforslack
[4]: /es/integrations/microsoft_teams/
[5]: /es/bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents