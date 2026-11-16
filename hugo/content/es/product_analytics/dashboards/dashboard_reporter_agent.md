---
algolia:
  tags:
  - dashboard reporter
  - agentic reporting
  - scheduled report
  - product analytics agent
description: Reciba informes programados generados por IA sobre sus Dashboards de
  Product Analytics en Slack, Microsoft Teams o por correo electrónico.
disable_toc: false
further_reading:
- link: /product_analytics/dashboards/
  tag: Documentación
  text: Dashboards de Product Analytics
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
{{< callout url="https://www.datadoghq.com/product-preview/product-analytics-dashboard-reporter-agent/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Dashboard Reporter Agent está en versión preliminar. Complete el formulario para solicitar acceso.
{{< /callout >}}

## Descripción general {#overview}

El Dashboard Reporter Agent hace un seguimiento de los Dashboards de Product Analytics que usted elija y envía a su equipo un informe programado en Slack, Microsoft Teams o por correo electrónico. Cada informe resume qué cambió, qué necesita atención y qué hacer a continuación, para que no tenga que abrir cada Dashboard para verificar. A medida que usted lanza más funciones, un agente puede hacer un seguimiento de muchos Dashboards, incluidos los Dashboards de lanzamientos anteriores que ya no reciben atención regular.

Los agentes de Dashboard Reporter están creados en [Bits Agent Builder][1].

<div class="alert alert-info">Los agentes de Dashboard Reporter consumen <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

Los informes son resúmenes de texto entregados según un horario. Para recibir notificaciones cuando una métrica cruce un umbral, usa la función de [seguimiento][2].

## Casos de uso {#use-cases}

Use el Dashboard Reporter Agent para:

- **Hacer un seguimiento de muchas funciones a la vez**: Un agente puede cubrir muchos Dashboards.
- **Mantener los lanzamientos visibles**: Suscriba un Dashboard de lanzamiento para que se siga revisando cuando disminuya la atención que recibe el lanzamiento.
- **Compartir una actualización semanal sobre el estado del producto**: Publique un informe semanal en el canal de su equipo para que todos vean las mismas señales.
- **Informar a la dirección**: Envíe métricas clave y el estado general del producto sin crear una presentación.
- **Detectar regresiones a tiempo**: Un informe diario muestra caídas y picos de errores poco después de que comiencen.

## Cómo el agente crea un informe {#how-the-agent-builds-a-report}

- **Cobertura completa**: El agente revisa cada gráfico de los Dashboards suscritos, no solo los gráficos de la parte superior de la página.
- **Comparación periodo a periodo**: Cada informe compara el periodo actual con el anterior. Un informe diario cubre las últimas 24 horas, un informe semanal cubre los últimos 7 días y un informe mensual cubre el último mes.
- **Métricas clave primero**: Las métricas clave aparecen en la parte superior de cada informe, para que su equipo pueda hacer un seguimiento del progreso de un período a otro.
- **Priorizado por gravedad**: El agente enumera los problemas de mayor a menor gravedad para que usted pueda concentrarse en los elementos más importantes.
- **Solo cambios significativos**: Si no hubo cambios significativos, el informe lo indica en lugar de enumerar cambios menores.
- **Fuentes vinculadas**: Cada métrica y problema en el informe se vincula a su gráfico subyacente.

El agente lee los datos del Dashboard con los permisos del usuario que creó el agente. Si ese usuario pierde el acceso a un Dashboard, ese Dashboard ya no se incluye en el informe.

## Requisitos previos {#prerequisites}

- Acceso a Product Analytics y a los Dashboards de los que desea hacer un seguimiento.
- Para enviar informes a Slack, la [integración de Datadog Slack][3] debe estar instalada en su organización.
- Para enviar informes a Microsoft Teams, la [integración de Microsoft Teams][4] debe estar instalada en su organización.

## Crear un agente de Dashboard Reporter {#create-a-dashboard-reporter-agent}

Puede comenzar desde un Dashboard o desde la página Agents en Product Analytics.

{{< tabs >}}
{{% tab "Desde un Dashboard" %}}

1. Abra el Dashboard de Product Analytics del que desea hacer un seguimiento.
2. Haga clic en {{< ui >}}Set Up Report{{< /ui >}}. Si el Dashboard ya está incluido en los informes de otros agentes, estos se enumeran aquí.

   {{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-dashboard.png" alt="Un encabezado de un Dashboard de Product Analytics con el botón Set Up Report resaltado." style="width:100%;" >}}

**Nota**: Si más de un agente hace un seguimiento del mismo Dashboard, sus informes pueden diferir, porque cada agente redacta su informe de forma independiente.

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
2. Seleccione uno o más Dashboards de los que quiera hacer un seguimiento. Puede agregar más Dashboards más adelante.
3. Seleccione un formato de informe predefinido, como Team Update o Leadership Update, o escriba el suyo propio. Para un formato personalizado, describa las preguntas que el informe debe responder en cada ejecución y cualquier requisito de formato.
4. Seleccione un canal de Slack, un canal de Microsoft Teams o una dirección de correo electrónico para recibir los informes.
5. Elija la frecuencia con la que se ejecuta el agente (diaria, semanal o mensual), la hora a la que envía el informe y la zona horaria.
6. Haga clic en {{< ui >}}Create{{< /ui >}}.

## Leer informes {#read-reports}

Los informes llegan al destino que configuró. Cada ejecución también se guarda en la página del agente, por lo que puede revisar informes anteriores.

### Hacer preguntas de seguimiento sobre un informe {#ask-follow-up-questions-about-a-report}

Puede abrir un informe en Datadog y hacerle preguntas de seguimiento al agente. Por ejemplo, pregunte qué segmento impulsó un cambio o qué más cambió al mismo tiempo.

1. Abra el informe:
   - **Desde el mensaje del informe**: En el mensaje de Slack, Microsoft Teams o correo electrónico, haga clic en {{< ui >}}Chat with this report{{< /ui >}}.
   - **Desde Datadog**: Vaya a la página Agents y seleccione el agente.
2. Ingrese su pregunta en el cuadro de mensaje y presione <kbd>Enter</kbd>.

### Pregunte a Bits AI en Slack {#ask-bits-ai-in-slack}

Si sus informes se envían a Slack y la integración de Datadog con Slack tiene habilitado Bits AI, puede preguntar a Bits Chat sobre un informe sin salir de Slack. Mencione a `@Datadog` con su pregunta, por ejemplo, `@Datadog Why did checkout conversion drop this week?` Para la configuración, consulte [Usar Bits Chat en Slack][5].


## Administrar agentes de Dashboard Reporter {#manage-dashboard-reporter-agents}

Para visualizar sus agentes, vaya a [**Product Analytics > Agents**][6].

### Editar un agente {#edit-an-agent}

Puede cambiar los Dashboards, el formato de informe, el destino o la frecuencia de un agente.

1. Desde la página Agents, haga clic en el agente.
2. Realice sus cambios de una de las siguientes maneras:
   - **Pregunte al agente**: Describa el cambio en el chat. Por ejemplo: `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **Edite las instrucciones**: Para cambiar los Dashboards, el formato de informe o el destino, haga clic en el panel {{< ui >}}Instructions{{< /ui >}} y edítelo en Markdown. Para cambiar la frecuencia, expanda el panel {{< ui >}}Automation{{< /ui >}}.

### Pausar o reanudar un agente {#pause-or-resume-an-agent}

Pause un agente para detener los informes temporalmente, por ejemplo, durante un período de inactividad o mientras se reconstruye un Dashboard. Un agente pausado conserva su configuración.

- **Para pausar un agente**: En la página Agents, coloque el cursor sobre el agente y haga clic en {{< ui >}}Pause{{< /ui >}}. En la ventana de confirmación, haga clic en {{< ui >}}Pause{{< /ui >}} nuevamente.
- **Para reanudar un agente**: En la página Agents, coloque el cursor sobre el agente y haga clic en {{< ui >}}Resume{{< /ui >}}. En la ventana de confirmación, haga clic en {{< ui >}}Resume{{< /ui >}}.

### Eliminar un agente {#delete-an-agent}

Para detener los informes temporalmente, [pause el agente](#pause-or-resume-an-agent) en su lugar.

<div class="alert alert-warning">Eliminar un agente es permanente. El agente deja de enviar informes, su flujo de trabajo subyacente en <a href="/actions/workflows/">Workflow Automation</a> también se elimina y no puede restaurar ninguno de los dos.</div>

Para eliminar un agente, vaya a la página Agents, coloque el cursor sobre el agente y haga clic en {{< ui >}}Delete{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/actions/agents/
[2]: /es/monitors/
[3]: /es/integrations/slack/?tab=datadogforslack
[4]: /es/integrations/microsoft_teams/
[5]: /es/bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents