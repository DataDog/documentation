---
aliases:
- /es/bits_ai/getting_started/
- /es/bits_ai/chat_with_bits_ai
- /es/bits_ai/bits_assistant/
- /es/tracing/guide/latency_investigator/
description: Utilice Bits Chat en Datadog para explorar y actuar sobre sus datos de
  observabilidad utilizando lenguaje natural.
further_reading:
- link: bits_ai/
  tag: Documentación
  text: Resumen de Bits AI
- link: /incident_response/incident_management/investigate/incident_ai
  tag: Documentación
  text: Coordine incidentes con Incident AI
- link: /cloud_cost_management/cloud_cost_skill/
  tag: Documentación
  text: Habilidad de costo en la nube en Bits Chat
- link: /account_management/billing/ai_credits/
  tag: Documentación
  text: Créditos de IA
title: Bits Chat
---
## Resumen {#overview}
Bits Chat le ayuda a buscar y actuar en Datadog utilizando lenguaje natural. Bits Chat está disponible en la aplicación web, la aplicación móvil y Slack.

Haz preguntas a Bits Chat en estas categorías:

### Investigue problemas y remedie {#investigate-issues-and-remediate}
- `Summarize high severity incidents that have occurred in the last day`
- `What's causing 400 errors on the checkout endpoint in the last hour?`
- `Why is the error rate spiking on the web-store service?`
- `What is the root cause of this error? How did it propagate and what is the impact on users?`
- `What could cause 500 errors on this API endpoint?`

### Explora y analiza telemetría {#explore-and-analyze-telemetry}
- `Which services have the most errors right now?`
- `Summarize the key findings from the Kubernetes overview dashboard`
- `What's the success rate for my top API endpoints over the past week?`
- `Show me error rates for the checkout service over the last 24 hours`
- `Are there any incidents related to Kafka lag?`

### Aprenda conceptos de Datadog y cómo {#learn-datadog-concepts-and-how-to}
- `How do I configure log collection for the Datadog Agent?`
- `What is the difference between a metric monitor and an anomaly monitor?`
- `What permission do I need to create a new connection?`
- `Can I set the timepicker on a notebook to read-only?`

### Configura y optimiza la observabilidad {#set-up-and-optimize-observability}
- `Do we already have monitors for high latency on the payments service?`
- `Build me a dashboard to show latency, errors, and request rates for my service`
- `How can I put a team tag on this monitor?`
- `Add a timeseries widget for request count over time to this notebook`

{{< img src="bits_ai/getting_started/bits_assistant_full_page.png" alt="Interfaz de Bits Chat de página completa con tareas sugeridas" style="width:100%;">}}

### Permisos {#permissions}

#### Acceso a Bits Chat {#access-to-bits-chat}

Para usar Bits Chat, su rol debe tener el permiso de **Bits Chat Access**. Este permiso está habilitado por defecto para los tres roles estándar de Datadog: Datadog Admin, Datadog Standard y Datadog Read Only.

Para gestionar este permiso para roles personalizados, vaya a **Organization Settings** > **Roles**, seleccione un rol y active **Bits Chat Access** en **General Permissions**.

#### Acceso a datos a través de Bits Chat {#data-access-through-bits-chat}

Bits Chat utiliza su rol de Datadog para obtener datos, por lo que solo puede acceder a los recursos que tiene permiso para ver o modificar. Por ejemplo, si su rol restringe el acceso a un conjunto específico de índices de registros, Bits Chat solo puede consultar registros de esos índices. De manera similar, si no tiene permiso para editar un tablero, Bits Chat no puede editar ese tablero en su nombre.

### Habilidades {#skills}
Bits Chat tiene una variedad de habilidades especializadas para tareas en Datadog. Las habilidades más comúnmente utilizadas se describen a continuación.

#### Tableros {#dashboards}
Crea [tableros][5] y widgets a partir de descripciones en lenguaje natural.

Ejemplos de solicitudes:
- `Show me a dashboard of high-impact alerts from the past week and which services they affected`
- `Add a widget about CPU usage in the payments service`

#### Notebooks {#notebooks}
Cree [notebooks][6] de investigación y mejore los existentes con resúmenes y análisis.

Ejemplos de solicitudes:
- `Create an investigation for the recent spike of errors in the checkout service`
- `Add an executive summary for this cost spike report`

#### APM {#apm}

##### Análisis de trazas {#trace-analysis}
Investigue una [traza][3] individual para diagnosticar qué falló, dónde y por qué.

Ejemplos de solicitudes:
- `Why did this request fail?`
- `Summarize this trace and identify the root cause of the error`

##### Investigaciones de latencia {#latency-investigations}
Investigue la latencia en un servicio para identificar los recursos que generan cuellos de botella y qué cambió en sus trazas lentas.

Ejemplos de solicitudes:
- `What caused the latency spike for this service?`
- `What's the latency bottleneck for this service?`

#### Cloud Cost Management {#cloud-cost-management}
Investigue los cambios en [Cloud Cost][4] e identifique los equipos o recursos responsables. Consulte [Cloud Cost Skill in Bits Chat][9].

Ejemplos de solicitudes:
- `Investigate why EC2 costs changed between January and February`
- `Which teams are responsible for the highest S3 storage costs this month?`

#### DDSQL {#ddsql}
Genere y ejecute consultas de [DDSQL][7] contra los [datos de telemetría][8] de Datadog utilizando lenguaje natural.

Ejemplos de solicitudes:
- `Write a DDSQL query that shows the top 10 services by error count in the last hour`
- `Query average request latency for the payments service broken down by status code`
- `Show me a DDSQL query for the number of RUM sessions by country over the past day`

### Informes {#reports}

La página de Informes de Bits Chat proporciona visibilidad sobre cómo su organización utiliza Bits Chat. Vaya a [**Bits AI** > **Chat** > **Reports**][10] para ver:

- **Usuarios principales**: Consulte qué miembros del equipo utilizan Bits Chat más, clasificados por cantidad de conversaciones.
- **Tendencias de uso**: Rastree el volumen de conversaciones a lo largo del tiempo para entender la adopción e identificar patrones de uso.
- **Distribución de la intención de conversación**: Observa cómo se desglosan las conversaciones por categoría de intención, como investigar problemas, explorar telemetría, aprender conceptos de Datadog y configurar la observabilidad.

Utilice estos conocimientos para entender los patrones de adopción, identificar usuarios avanzados para compartir mejores prácticas y evaluar qué casos de uso brindan más valor a su organización.

### Aplicación web {#web-application}
Existen múltiples formas de abrir Bits Chat en la aplicación web de Datadog:
- En la parte superior derecha de la barra de navegación, haga clic en {{< ui >}}Ask Bits{{< /ui >}}
- En un producto de Datadog integrado con Bits Chat, haga clic en {{< ui >}}Ask Bits{{< /ui >}} o {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (el ícono de las estrellas titilantes)
- Presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>
- En el panel de navegación del lado izquierdo, haga clic en {{< ui >}}Bits AI{{< /ui >}}

{{< img src="bits_ai/getting_started/bits_assistant_side_panel.png" alt="Panel de Bits Chat abierto junto a la lista de Dashboards" style="width:40%;">}}

### Aplicación móvil {#mobile-application}

Haga preguntas a Bits sobre su sistema o incidente activo. Bits tiene contexto sobre la documentación pública de Datadog, telemetría y propiedad.

1. [Descargue la aplicación móvil e inicie sesión][2].
2. En la pantalla de inicio, toque {{< ui >}}Bits Assistant{{< /ui >}}.
3. Comience a chatear con Bits Chat por voz o texto.
{{< img src="bits_ai/getting_started/bits_ai_mobile_app_2026.png" alt="Vista del dashboard Home de la aplicación móvil con Bits AI." style="width:40%;" >}}

### Slack {#slack}
1. [Conecte su cuenta de Datadog a su espacio de trabajo de Slack][1].
1. En Slack, utilice el comando `/dd connect` para mostrar una lista de cuentas a las que conectarse.
1. En el menú desplegable, elija el nombre de su cuenta de Datadog.
1. Autorice permisos adicionales necesarios para Bits AI.

Después de completar la configuración, puede enviar consultas a `@Datadog` en lenguaje natural: `@Datadog Are there any issues with example-service's dependencies?`

{{< img src="bits_ai/getting_started/example-slack-query.png" alt="Salida de un ejemplo de consulta de dependencias de servicio en Slack" style="width:60%;">}}

## Lectura adicional {#further-reading}
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