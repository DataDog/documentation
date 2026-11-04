---
description: Configure las fuentes de detección de IA y los ajustes de AI Impact para
  que Datadog pueda clasificar las solicitudes de extracción como asistidas por IA.
further_reading:
- link: /delivery_performance/ai_impact/
  tag: Documentación
  text: Obtenga más información sobre AI Impact
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentación
  text: Configure DORA Metrics.
- link: /ai_agents_console/setup/
  tag: Documentación
  text: Configure Agent Console para agentes de codificación
title: Configure AI Impact
---
{{< callout url="#" btn_hidden="true" header="¡Únase a la vista previa!" >}}
AI Impact está disponible para todos los clientes de Datadog en vista previa.
{{< /callout >}}

[AI Impact][1] clasifica cada solicitud de extracción como {{< ui >}}AI-assisted{{< /ui >}} o {{< ui >}}non-AI{{< /ui >}} según las fuentes que detecta para sus herramientas de codificación de IA. Una fuente es una señal de que una herramienta de codificación de IA contribuyó a una confirmación o solicitud de extracción. 

Configure sus herramientas de codificación de IA y sus fuentes en [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}AI Impact{{< /ui >}}][2]. Datadog le indica la fuente recomendada para obtener la clasificación más precisa para cada asistente de codificación, y las reglas de mapeo preestablecidas ayudan a detectar la actividad de agentes de revisión comunes y agentes autónomos.

## Requisitos previos {#prerequisites}

AI Impact requiere configurar [DORA Metrics][3] con datos de despliegue, confirmación y solicitud de extracción.

No se requiere una configuración específica de IA para ver los datos iniciales, como las confirmaciones coescritas por IA y cierta actividad atribuida a revisiones de IA y agentes autónomos. Para una medición más completa, configure sus herramientas de codificación de IA y sus fuentes como se describe a continuación.

## Cómo funciona la detección de IA {#how-ai-detection-works}

Datadog clasifica la actividad de IA de los siguientes tipos de herramientas de IA:

| Herramientas de IA | Cómo funciona la detección |
|---|---|
| [Asistentes de codificación](#set-up-coding-assistants) | Detectados por patrones de coautoría, integraciones configuradas, etiquetas de solicitud de extracción u otros datos que indiquen contribuciones de una herramienta de IA. La atribución de IA puede ser [directa o inferida](#ai-attribution-modes-for-coding-assistants), dependiendo de la fuente de la herramienta. |
| [Agentes de revisión](#set-up-review-agents) | Detectados mediante reglas de mapeo para comentarios de solicitudes de extracción y reacciones de GitHub. Un agente de revisión se atribuye a una solicitud de extracción cuando una regla hace coincidir a un autor de revisión con un agente nombrado. |
| [Agentes autónomos](#set-up-autonomous-agents) | Detectados mediante reglas de mapeo para inicios de sesión de autor, correos electrónicos de autor o trailers de confirmación. Se atribuye un agente autónomo a una solicitud de extracción cuando crea la primera confirmación en la PR. |

### Modos de atribución de IA para asistentes de codificación {#ai-attribution-modes-for-coding-assistants}

AI Impact clasifica cada solicitud de extracción como asistida por IA o no asistida por IA, y cada métrica se basa en esa clasificación. Una PR es asistida por IA cuando al menos una de sus confirmaciones es asistida por IA.

Cada fuente emite señales que proporcionan **atribución directa**, atribución **inferida de la actividad del usuario**, o ambas.

| | Atribución directa | Inferida de la actividad del usuario |
|---|---|---|
| Una confirmación es asistida por IA cuando | La herramienta informa la contribución de la IA a esa confirmación específica, por ejemplo, la integración de Cursor que informa líneas generadas por IA | El autor de la confirmación creó líneas de código con la herramienta de IA el día en que se creó la confirmación |
| La evidencia está vinculada a | La confirmación | El autor y el día calendario |
| Lo que le dicen las métricas | Cómo funciona el código asistido por IA en comparación con el código escrito sin IA, y cómo se comparan los usuarios de una herramienta con los usuarios de otra | Cómo se desempeñan los desarrolladores que trabajan con IA frente a los que trabajan sin ella, y cómo se comparan los usuarios de una herramienta con los usuarios de otra |

La atribución directa es más precisa, porque la señal está adjunta al cambio mismo. La atribución inferida cubre las herramientas que informan el uso sin detalles por confirmación, y clasifica cada confirmación que un autor activo realizó ese día como asistida por IA. Un usuario está activo solo en los días en que la herramienta informa líneas de código creadas por ese usuario.

De forma predeterminada, el [panel de control de AI Impact][1] muestra métricas utilizando el modo de atribución más preciso que todas las [herramientas integradas](#supported-ai-coding-assistants-and-sources) tienen en común, para que las métricas sean comparables entre herramientas sobre una base equitativa. Por ejemplo, si solo está utilizando Cursor, las métricas utilizan la atribución directa porque ese es el método más preciso disponible. Si está utilizando tanto Cursor como Claude Code, las métricas se infieren de la actividad del usuario porque la atribución directa no está disponible para Claude Code.

Para seleccionar qué modo de atribución utilizan sus métricas en el [panel de control de AI Impact][1], configure el {{< ui >}}Default AI attribution UI filter{{< /ui >}} en la configuración de AI Impact. La configuración afecta solo cómo se muestran los datos en la interfaz de usuario de AI Impact, no lo que Datadog ingiere. Ambos modos continúan recopilando datos independientemente del modo que seleccione.

## Configurar asistentes de codificación {#set-up-coding-assistants}

[{{< ui >}}AI Impact Settings{{< /ui >}}][2] muestran qué asistentes de codificación y fuentes detecta Datadog. Algunos asistentes de codificación se detectan automáticamente cuando se añaden a sí mismos como [coautor](#co-author-signatures) en las confirmaciones que generan. Para capturar de forma más completa la actividad de un asistente de programación de IA, configure una fuente para él.

### Asistentes de programación de IA y fuentes compatibles {#supported-ai-coding-assistants-and-sources}

Cada asistente de programación compatible tiene una fuente recomendada por contexto, que se enumera en la siguiente tabla. La fuente recomendada es la más precisa que la mayoría de los usuarios pueden configurar sin trabajo manual por solicitud de extracción (pull request), y los datos se ingieren automáticamente después de la configuración.

| Asistente de programación | Fuente recomendada | Modo de atribución |
|------------------|--------|-------------|
| Claude Code (API o plataforma) | [Integración de uso y costos de Anthropic][4] | Inferido |
| Claude Code (plan Enterprise) | [Integración de análisis de usuario de Claude Enterprise][5] | Inferido |
| Claude Code (plan Teams) | [OpenTelemetry](#opentelemetry) | Inferido |
| Claude Code (Amazon Bedrock o Google Vertex AI) | [OpenTelemetry](#opentelemetry) | Inferido |
| Codex | [Integración con OpenAI Codex][6] | Inferido |
| Cursor | [Integración con Cursor][7] | Directo |
| GitHub Copilot | [Integración con GitHub Copilot][8] | Inferido |

Para realizar un seguimiento de otros asistentes de programación o utilizar una fuente diferente para un asistente de programación compatible, las siguientes fuentes están disponibles para todos los asistentes de programación:

- [Etiquetas de PR](#pr-label-detection): (Atribución directa) Los PR con una etiqueta designada se marcan como asistidos por IA.
- [API pública](#datadog-public-api): (Inferido a partir de la actividad del usuario) Envíe sus propios datos de eventos a través de la [API pública de Datadog][11], y Datadog inferirá la atribución de IA a partir de ellos.

### Configurar una fuente para un asistente de codificación {#configure-a-source-for-a-coding-assistant}

1. En [{{< ui >}}AI Impact Settings{{< /ui >}}][2], abra la pestaña {{< ui >}}Coding assistants{{< /ui >}}. La pestaña enumera las herramientas de IA detectadas automáticamente mediante la detección de coautores, así como cualquier otro asistente de codificación configurado.
1. Si el asistente de codificación que desea rastrear ya aparece en la lista, selecciónelo para configurar una fuente. De lo contrario, haga clic en {{< ui >}}Add a coding assistant{{< /ui >}} y seleccione el asistente de codificación.
1. Para Claude Code, seleccione el plan que utiliza o la puerta de enlace a través de la cual se enruta. La [fuente recomendada](#supported-ai-coding-assistants-and-sources) difiere para cada uno.
1. Siga la guía de la interfaz de usuario para configurar la fuente. Expanda las siguientes secciones para obtener detalles sobre cada tipo de fuente:

{{% collapse-content title="Integraciones de Datadog" level="h4" id="datadog-integrations" %}}
En muchos casos, la fuente recomendada es una integración de Datadog para la herramienta de codificación, la cual informa el uso de IA directamente a Datadog. De estas, solo la integración de Cursor informa la contribución de IA directamente por commit. Las otras integraciones informan la actividad del usuario, la cual Datadog utiliza para inferir la asistencia de IA para los commits que un autor activo creó ese día.

Al configurar un asistente de codificación en {{< ui >}}AI Impact Settings{{< /ui >}}, haga clic en el botón correspondiente en la sección {{< ui >}}Integration{{< /ui >}} para abrir el mosaico de integración en Datadog y completar la configuración.
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" id="opentelemetry" %}}
Utilice OpenTelemetry para informar datos de uso de IA desde ciertas implementaciones de asistentes de codificación, como el plan Teams de Claude Code. Se requiere configuración adicional para Claude Code que se ejecuta a través de una puerta de enlace externa como Amazon Bedrock o Google Vertex AI.

1. Configure Claude Code para enviar datos de OpenTelemetry a Datadog, siguiendo [Opción 2: OpenTelemetry (OTLP)][9] o [Opción 3: Reenviar datos a través del Datadog Agent][10].
1. Amazon Bedrock o Google Vertex AI: Establezca un atributo de recurso por usuario en su archivo de configuración de Claude Code, por ejemplo `~/.claude/settings.json`:

   ```json
   "OTEL_RESOURCE_ATTRIBUTES": "user.email=user@company.com"
   ```

   AI Impact necesita `user.email` para vincular la actividad a un desarrollador individual e inferir la asistencia de IA para los commits de ese desarrollador.
1. Reinicie Claude Code.

Debido a que `user.email` difiere para cada desarrollador, no puede enviarse en un solo archivo de configuración compartido. Distribuya el archivo de configuración con un sistema de Administración de Dispositivos Móviles (MDM) o un script de aprovisionamiento que escriba el valor al iniciar sesión.
{{% /collapse-content %}}

{{% collapse-content title="Detección de etiquetas de PR" level="h4" id="pr-label-detection" %}}
Las etiquetas de pull request brindan atribución directa para cualquier asistente de codificación, incluidos los asistentes sin integración con Datadog. Datadog marca cada commit en una solicitud de extracción etiquetada como asistida por IA.

1. Al configurar un asistente de codificación en {{< ui >}}AI Impact Settings{{< /ui >}}, haga clic en {{< ui >}}Set Up{{< /ui >}} en la sección {{< ui >}}PR Labels{{< /ui >}}.
1. Ingrese una o más etiquetas que su equipo utilice para identificar las solicitudes de extracción asistidas por IA y haga clic en {{< ui >}}Save{{< /ui >}}.

Cada regla se aplica a toda la solicitud de extracción, por lo que si algún commit fue escrito sin asistencia de IA, se clasifica como asistido por IA. La detección de etiquetas depende de un etiquetado consistente por parte de su equipo, lo cual puede ser difícil de mantener en una organización grande. Úselo para un asistente de codificación sin integración con Datadog, o para un solo equipo que pueda mantener la práctica.
{{% /collapse-content %}} 

{{% collapse-content title="API pública de Datadog" level="h4" id="datadog-public-api" %}}
Utilice la [API pública de Datadog][11] para enviar sus propios datos de uso de IA a Datadog cuando su organización dirija las herramientas de codificación de IA a través de una puerta de enlace interna. La API también es una opción para realizar el seguimiento de un asistente de codificación que no tiene integración con Datadog. Datadog infiere la asistencia de IA a partir de la actividad del usuario que usted reporta.
{{% /collapse-content %}}

{{% collapse-content title="Firmas de coautor" level="h4" id="co-author-signatures" %}}
Algunos asistentes de codificación se añaden a sí mismos como coautores en los commits que generan. Datadog detecta estas firmas de coautor automáticamente; no se requiere configuración adicional. Debido a que la firma está adjunta al commit, la detección de coautor proporciona una atribución directa.

La detección de coautor puede subestimar la actividad de IA, ya que no todos los asistentes de codificación se añaden como coautores, y un rebase o squash puede eliminar la firma de coautor. Para medir un asistente de codificación de manera más completa, configure otra fuente para él.
{{% /collapse-content %}}

## Configure agentes de revisión {#set-up-review-agents}

Los agentes de revisión revisan las solicitudes de extracción en lugar de escribir el código en ellas. Datadog detecta agentes de revisión a partir de comentarios en solicitudes de extracción y reacciones de GitHub, y asigna un agente de revisión a una solicitud de extracción cuando una regla de asignación hace coincidir al autor de la revisión con un agente nombrado.

Para realizar un seguimiento de un agente de revisión con una regla de asignación:

1. Abra la pestaña {{< ui >}}Review agents{{< /ui >}} en la configuración de AI Impact.
1. Haga clic en {{< ui >}}Add Review Agent{{< /ui >}}.
1. Ingrese un {{< ui >}}Agent name{{< /ui >}} para identificar al agente de revisión en la interfaz de usuario.
1. Defina una o más reglas que coincidan con el inicio de sesión del autor del agente asociado con comentarios de revisión o reacciones en solicitudes de extracción.

## Configure agentes autónomos {#set-up-autonomous-agents}

Los agentes autónomos abren solicitudes de extracción por su cuenta en lugar de ayudar a un desarrollador en un editor. Datadog detecta la mayoría de los agentes autónomos automáticamente a partir de patrones de agentes conocidos. También puede definir reglas de asignación para identificar agentes que Datadog no detecta automáticamente.

Para realizar un seguimiento de un agente con una regla de asignación:

1. Abra la pestaña {{< ui >}}Autonomous agents{{< /ui >}} en la configuración de AI Impact.
1. Haga clic en {{< ui >}}Add Autonomous Agent{{< /ui >}}.
1. Ingrese un {{< ui >}}Agent name{{< /ui >}} para identificar al agente autónomo en la interfaz de usuario.
1. Defina una o más reglas que identifiquen las solicitudes de extracción del agente.

### Identifique bots de automatización {#identify-automation-bots}

Los bots de automatización, como los actualizadores de dependencias y los bots de lanzamiento, no son agentes de IA y su actividad no es relevante para AI Impact. Identificar un bot evita que su actividad afecte sus métricas de AI Impact.

Para detectar commits y solicitudes de extracción creadas por bots de automatización, habilite la detección automática de bots (para GitHub) y defina reglas de asignación personalizadas en [Delivery Performance general settings][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora/ai-impact
[2]: https://app.datadoghq.com/ci/settings/dora/integrations
[3]: /es/delivery_performance/dora_metrics/setup/
[4]: /es/integrations/anthropic-usage-and-costs/
[5]: /es/integrations/claude-enterprise-user-analytics/
[6]: /es/integrations/openai-codex/
[7]: /es/integrations/cursor/?tab=cursorintegrationindatadog#overview
[8]: /es/integrations/github-copilot/
[9]: /es/ai_agents_console/setup/#option-2-opentelemetry-otlp
[10]: /es/ai_agents_console/setup/#option-3-forward-data-through-the-datadog-agent
[11]: /es/api/latest/dora-metrics/send-ai-tool-user-activity/
[12]: https://app.datadoghq.com/ci/settings/dora