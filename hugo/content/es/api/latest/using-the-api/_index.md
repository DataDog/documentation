---
title: Uso de la API
type: api
---
{{< h2-with-copy-btn >}}Uso de la API{{< /h2-with-copy-btn >}}

Utilice la API HTTP de Datadog para acceder a la plataforma de Datadog mediante programación. Puede utilizar la API para enviar datos a Datadog, crear visualizaciones de datos y administrar su cuenta.

{{< h2 >}}Enviar datos a Datadog{{< /h2 >}}

Utilice la API para comenzar a enviar datos de Integrations a Datadog. Con una configuración adicional del Agent, también puede utilizar la API para enviar datos de prueba Synthetic, Logs y trazas a Datadog.

**Integrations endpoints**

Endpoints de Integrations disponibles:

- [AWS Integration][1]
- [AWS Logs Integration][2]
- [Azure Integration][3]
- [Cloudflare Integration][37]
- [Fastly Integration][38]
- [Google Cloud Integration][4]
- [Jira Integration][39]
- [Microsoft Teams Integration][40]
- [Okta Integration][41]
- [Opsgenie Integration][42]
- [PagerDuty Integration][6]
- [Slack Integration][5]
- [Webhooks Integration][7]

**Platform endpoints**

Use estos endpoints para publicar y obtener datos hacia y desde otras partes de la plataforma Datadog: 

- Los endpoints de [métricas][8] le permiten publicar datos de [métricas][9] para que puedan graficarse en los dashboards de Datadog y consultar métricas de cualquier período de tiempo.
- Los endpoints de [eventos][10] le permiten publicar y obtener eventos hacia y desde el [Datadog event explorer][11].
- Use los endpoints de [Synthetic Monitoring][12] para crear, iniciar, detener y ver los resultados de [prueba Synthetic][13].
- Use la [Tracing Agent API][14] para enviar trazas a su Datadog Agent, que luego las reenvía a Datadog.
- Use la [Agent Observability Export API][36] para acceder a sus datos de Agent Observability para ejecutar evaluaciones externas y exportar spans para almacenamiento sin conexión.

{{< h2 >}}Visualice sus datos{{< /h2 >}}

Una vez que esté enviando datos a Datadog, puede usar la API para crear visualizaciones de datos mediante programación:

- Cree [Dashboards][15] y vea [Dashboard Lists][16]
- Administre [host tags][17]
- Cree [Embeddable Graphs][18]
- Tome una [graph snapshot][19]
- [Service Dependencies][20] - vea una lista de sus servicios de APM y sus dependencias
- Cree [Monitors][21]
- [Service Checks][22] - publique estados de verificación para su uso con monitores
- Cree y administre [Logs][23], [Logs Indexes][24] y [Logs Pipelines][25]
- Obtenga información de [Host] para su organización
- Cree y administre [Service Level Objectives][26]
- Genere señales de [Security Monitoring][27]

{{< h2 >}}Administre su cuenta{{< /h2 >}}

También puede usar Datadog API para administrar su cuenta mediante programación:

- Administre [Users][28]
- Administre [Roles][29]
- Administre su [Organization][30]
- Verifique las claves de API y de aplicación con el punto de conexión de [Authentication][31]
- Otorgue acceso a registros específicos con [Logs Restriction Queries][32]
- Administre las claves existentes con [Key Management][33]
- Obtenga el uso por hora, día y mes en múltiples facetas de Datadog con los puntos de conexión de [Usage Metering][34]
- Consulte la lista de prefijos IP pertenecientes a Datadog con [IP Ranges][35]


[1]: /es/api/v1/aws-integration/
[2]: /es/api/v1/aws-logs-integration/
[3]: /es/api/v1/azure-integration/
[4]: /es/api/v1/gcp-integration/
[5]: /es/api/v1/slack-integration/
[6]: /es/api/v1/pagerduty-integration/
[7]: /es/api/v1/webhooks-integration/
[8]: /es/api/v1/metrics/
[9]: /es/metrics/introduction/
[10]: /es/api/v1/events/
[11]: /es/events/
[12]: /es/api/v1/synthetics/
[13]: /es/synthetics/
[14]: /es/tracing/guide/send_traces_to_agent_by_api/
[15]: /es/api/v1/dashboards/
[16]: /es/api/v1/dashboard-lists/
[17]: /es/api/v1/hosts/
[18]: /es/api/v1/embeddable-graphs/
[19]: /es/api/v1/snapshots/
[20]: /es/api/v1/service-dependencies/
[21]: /es/api/v1/monitors/
[22]: /es/api/v1/service-checks/
[23]: /es/api/v1/logs/
[24]: /es/api/v1/logs-indexes/
[25]: /es/api/v1/logs-pipelines/
[26]: /es/api/v1/service-level-objectives/
[27]: /es/api/v2/security-monitoring/
[28]: /es/api/v1/users/
[29]: /es/api/v1/roles/
[30]: /es/api/v1/organizations/
[31]: /es/api/v1/authentication/
[32]: /es/api/v2/logs-restriction-queries/
[33]: /es/api/v1/key-management/
[34]: /es/api/v1/usage-metering/
[35]: /es/api/v1/ip-ranges/
[36]: /es/llm_observability/evaluations/export_api
[37]: /es/api/latest/cloudflare-integration/
[38]: /es/api/latest/fastly-integration/
[39]: /es/api/latest/jira-integration/
[40]: /es/api/latest/microsoft-teams-integration/
[41]: /es/api/latest/okta-integration/
[42]: /es/api/latest/opsgenie-integration/