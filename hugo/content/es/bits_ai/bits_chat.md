---
aliases:
- /es/bits_ai/getting_started/
- /es/bits_ai/chat_with_bits_ai
- /es/bits_ai/bits_assistant/
- /es/tracing/guide/latency_investigator/
description: Utilice Bits Chat en Datadog para explorar y actuar sobre sus datos de
  observabilidad mediante lenguaje natural.
further_reading:
- link: bits_ai/
  tag: Documentación
  text: Descripción general de Bits AI
- link: /incident_response/incident_management/investigate/incident_ai
  tag: Documentación
  text: Coordine incidentes con Incident AI.
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentación
  text: Cloud Cost Skill en Bits Chat
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: Créditos de AI
- link: https://www.datadoghq.com/blog/datadog-mcp-apps/
  tag: Blog
  text: 'Datadog MCP Apps: experiencias interactivas en flujos de trabajo de AI'
- link: https://www.datadoghq.com/blog/introducing-bits-chat/
  tag: Blog
  text: Busque y actúe en todo Datadog para resolver problemas más rápido con Bits
    Chat.
- link: https://www.datadoghq.com/blog/cloud-cost-skill-bits-chat/
  tag: Blog
  text: Responda cualquier pregunta sobre costos más rápido con la habilidad Cloud
    Cost en Bits Chat.
title: Bits Chat
---
## Descripción general {#overview}
Bits Chat le ayuda a buscar y actuar en todo Datadog mediante lenguaje natural. Bits Chat está disponible en toda la aplicación web, la aplicación móvil y Slack.

Haga preguntas a Bits Chat sobre estas categorías:

### Investigue problemas y remedia {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explore y analice telemetría {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Aprenda conceptos de Datadog y cómo hacer {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Configure y optimice la observabilidad {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interfaz de Bits Chat de página completa con tareas sugeridas" style="width:100%;">}}

### Permisos{#permissions}

#### Acceso a Bits Chat {#access-to-bits-chat}

Para usar Bits Chat, su rol debe tener el permiso **Acceso a Bits Chat**. Este permiso está habilitado de forma predeterminada para los tres roles estándar de Datadog: Datadog Admin, Datadog Standard y Datadog Read Only.

Para administrar este permiso para roles personalizados, vaya a **Configuración de la organización** > **Roles**, seleccione un rol y active **Acceso a Bits Chat** en **Permisos generales**.

#### Acceso a datos a través de Bits Chat {#data-access-through-bits-chat}

Bits Chat utiliza su rol de Datadog para obtener datos, por lo que solo puede acceder a los recursos que usted tiene permiso para visualizar o modificar. Por ejemplo, si su rol restringe el acceso a un conjunto específico de índices de logs, Bits Chat solo puede consultar logs de esos índices. De manera similar, si usted no tiene permiso para editar un tablero, Bits Chat no puede editar ese tablero en su nombre.

### Habilidades {#skills}
Bits Chat cuenta con una gama de habilidades especializadas para tareas en todo Datadog. Las habilidades más utilizadas se describen a continuación.

#### Dashboards {#dashboards}
Cree [Dashboards][5] y widgets a partir de descripciones en lenguaje natural.

Ejemplos de prompts:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Notebooks {#notebooks}
Cree [Notebooks][6] de investigación y mejore los existentes con resúmenes y análisis.

Ejemplos de prompts:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### Análisis de trazas {#trace-analysis}
Investigue una [traza][3] individual para diagnosticar qué falló, dónde y por qué.

Ejemplos de prompts:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### Investigaciones de latencia {#latency-investigations}
Investigue la latencia en un servicio para identificar los recursos que actúan como cuello de botella y qué cambió en sus trazas lentas.

Ejemplos de prompts:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
Investigue los cambios en [Cloud Cost][4] e identifique a los equipos o recursos responsables. Consulte [Cloud Cost Skill in Bits Chat][9].

Ejemplos de prompts:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
Genere y ejecute consultas de [DDSQL][7] en los [datos de telemetría][8] de Datadog mediante lenguaje natural.

Ejemplos de prompts:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Reports {#reports}

La página de Reports de Bits Chat proporciona visibilidad sobre cómo su organización utiliza Bits Chat. Vaya a [**Bits AI** > **Chat** > **Reports**][10] para visualizar lo siguiente:

- **Usuarios principales**: vea qué miembros del equipo utilizan más Bits Chat, clasificados por número de conversaciones.
- **Tendencias de uso**: realice un seguimiento del volumen de conversaciones a lo largo del tiempo para comprender la adopción e identificar patrones de uso.
- **Distribución de intención de conversaciones**: vea cómo se desglosan las conversaciones por categoría de intención, como investigar problemas, explorar telemetría, aprender conceptos de Datadog y configurar la observabilidad.

Utilice estos conocimientos para comprender los patrones de adopción, identificar a los usuarios avanzados para compartir las mejores prácticas y evaluar qué casos de uso ofrecen el mayor valor para su organización.

### Aplicación web {#web-application}
Existen varias formas de abrir Bits Chat en la aplicación web de Datadog:
- Vaya a [Bits Chat][11].
- En la parte superior derecha de la barra de navegación, haga clic en {{< ui >}}Ask Bits{{< /ui >}}.
- En un producto de Datadog integrado con Bits Chat, haga clic en {{< ui >}}Ask Bits{{< /ui >}} o {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (el icono de estrellas centelleantes).
- Presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.
- En el panel de navegación izquierdo, haga clic en {{< ui >}}Bits AI{{< /ui >}}.

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Panel de Bits Chat abierto junto a la lista de Dashboards" style="width:40%;">}}

### Aplicación móvil {#mobile-application}

Haga preguntas a Bits sobre su sistema o incidente activo. Bits tiene contexto sobre la documentación pública, la telemetría y la propiedad de Datadog.

1. [Descargue la aplicación móvil e inicie sesión][2].
2. En la pantalla de inicio, toque {{< ui >}}Bits Chat{{< /ui >}}.
3. Comience a chatear con Bits Chat por voz o texto.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vista del dashboard de inicio de la aplicación móvil con Bits AI" style="width:40%;" >}}

### Slack {#slack}
1. [Conecte su cuenta de Datadog a su espacio de trabajo de Slack][1].
1. En Slack, use el comando `/dd connect` para mostrar una lista de cuentas a las que conectarse.
1. En el menú desplegable, elija el nombre de su cuenta de Datadog.
1. Autorice los permisos adicionales que necesita Bits AI.

Una vez completada la configuración, puede enviar consultas a `@Datadog` en lenguaje natural: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Resultado de una consulta de ejemplo de dependencia de servicio en Slack" style="width:60%;">}}

## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/slack/?tab=applicationforslack
[2]: /es/mobile/#installing
[3]: /es/tracing/trace_explorer/
[4]: /es/cloud_cost_management/
[5]: /es/dashboards/
[6]: /es/notebooks/
[7]: /es/ddsql_editor/
[8]: /es/ddsql_reference/data_directory/
[9]: /es/cloud_cost_management/cloud_cost_skill/
[10]: https://app.datadoghq.com/ask/usage
[11]: https://app.datadoghq.com/ask