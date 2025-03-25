---
title: Uso de la API
type: api
---

{{< h2 >}}Uso de la API{{< /h2 >}}

Utiliza la API HTTP de Datadog para acceder a la plataforma de Datadog mediante programación. Puedes utilizar la API para enviar datos a Datadog, crear visualizaciones de datos y gestionar tu cuenta.

{{< h2 >}}Envío de datos a Datadog{{< /h2 >}}

Utiliza la API para empezar a enviar datos de integraciones a Datadog. Con alguna configuración adicional del Agent, también puedes utilizar la API para enviar datos de test de Synthetic, logs y trazas (traces) a Datadog.

**Endpoints de integraciones**

Endpoints disponibles en integraciones:

- [Integración de AWS][1]
- [Integración de logs de AWS][2]
- [Integración de Azure][3]
- [Integración de Google Cloud][4]
- [Integración de Slack][5]
- [Integración de PagerDuty][6]
- [Integración de webhooks][7]

**Endpoints de la plataforma**

Utiliza estos endpoints para enviar y recibir datos de otras partes de la plataforma de Datadog: 

- Las [métricas][8] de endpoints permiten publicar datos de [métricas][9] para que puedan representarse gráficamente en dashboards de Datadog y consultar métricas desde cualquier periodo.
- Los [eventos][10] de endpoints te permiten enviar y recibir eventos desde y hacia [el Datadog Event Explorer][11].
- Utilice los endpoints de la [Monitorización de Synthetic][12] para crear, iniciar, detener y ver los resultados de [tests de Synthetic][13].
- Utiliza la [API de rastreo del Agent][14] para enviar trazas (traces) a tu Datadog Agent, que a su vez los reenvía a Datadog.

{{< h2 >}}Visualizar tus datos{{< /h2 >}}

Una vez que envíes datos a Datadog, puedes utilizar la API para crear visualizaciones de datos mediante programación:

- Crear [Dashboards][15] y ver [Listas de dashboard][16]
- Gestionar [etiquetas de host][17]
- Crear [Gráficos incrustables][18]
- Tomar [snapshot de gráfico][19]
- [Dependencias de servicio][20]: ver un lista de tus servicios de APM y sus dependencias
- Crear [Monitores][21]
- [Checks de servicio][22]: publicar estados de check para su uso con monitores
- Crear y gestionar [logs][23], [índices][24] y [pipelines de logs][25]
- Obtén información de [host][17] sobre tu organización
- Crear y gestionar [Objetivos de nivel de servicio (SLOs)][26]
- Generar señales de [Security Monitoring][27]

{{< h2 >}}Gestionar tu cuenta{{< /h2 >}}

También puedes utilizar la API de Datadog para gestionar tu cuenta mediante programación:

- Gestionar [Usuarios][28]
- Gestionar [Roles][29]
- Gestionar tu [Organización][30]
- Verificar las claves de la API y de la aplicación con el endpoint [Autenticación][31]
- Conceder acceso específico a logs con las [Consultas de restricción de logs][32]
- Gestionar las claves existentes con [Gestión de claves][33]
- Obtener el uso horario, diario y mensual en múltiples facetas de Datadog con los endpoints de [Medición de uso][34]
- Consulta la lista de prefijos de IP pertenecientes a Datadog con [Rangos de IP][35]


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