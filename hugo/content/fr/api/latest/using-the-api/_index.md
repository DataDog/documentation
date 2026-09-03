---
title: Utiliser l'API
type: api
---
{{< h2-with-copy-btn >}}Utiliser l'API{{< /h2-with-copy-btn >}}

Utilisez l'API HTTP de Datadog pour accéder à la plateforme Datadog par programmation. Vous pouvez utiliser l'API pour envoyer des données à Datadog, créer des visualisations de données et gérer votre compte.

{{< h2 >}}Envoyer des données à Datadog :{{< /h2 >}}

Utilisez l'API pour commencer à envoyer des données d'intégrations à Datadog. Avec une configuration supplémentaire de l'Agent, vous pouvez également utiliser l'API pour envoyer des données de test Synthetic, des Logs et des Traces à Datadog.

**Endpoints des intégrations**

Endpoints d'intégrations disponibles :

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

**Endpoints de la plateforme**

Utilisez ces endpoints pour envoyer et récupérer des données dans Datadog : 

- Les endpoints [metrics][8] vous permettent de publier des données de [metrics][9] afin qu'elles puissent être représentées graphiquement sur les tableaux de bord Datadog et d'interroger des métriques pour n'importe quelle période.
- Les endpoints [events][10] vous permettent de publier et de récupérer des événements vers et depuis l'[Datadog event explorer][11].
- Utilisez les endpoints [Synthetic Monitoring][12] pour créer, démarrer, arrêter et consulter les résultats des [tests Synthetic][13].
- Utilisez l'[API Tracing Agent][14] pour envoyer des traces à votre Datadog Agent, qui les transmet ensuite à Datadog.
- Utilisez l'[API Agent Observability Export][36] pour accéder à vos données d'Agent Observability afin d'exécuter des évaluations externes et d'exporter des spans pour un stockage hors ligne.

{{< h2 >}}Visualisez vos données :{{< /h2 >}}

Lorsque vous envoyez des données à Datadog, vous pouvez utiliser l'API pour créer automatiquement des représentations visuelles de ces données :

- Créez des [Dashboards][15] et affichez des [Dashboard Lists][16]
- Gérez les [host tags][17]
- Créez des [Embeddable Graphs][18]
- Prenez un [graph snapshot][19]
- [Service Dependencies][20] - consultez une liste de vos services APM et leurs dépendances
- Créez des [Monitors][21]
- [Service Checks][22] - publiez des statuts de vérification à utiliser avec les monitors
- Créez et gérez des [Logs], des [Logs Indexes] et des [Logs Pipelines][25]
- Obtenez des informations sur les [Host] de votre organisation
- Créez et gérez des [Service Level Objectives][26]
- Générez des signaux de [Security Monitoring][27]

{{< h2 >}}Gérez votre compte :{{< /h2 >}}

Vous pouvez également utiliser la Datadog API pour gérer automatiquement votre compte :

- Gérez les [Users][28]
- Gérez les [Roles][29]
- Gérez votre [Organization][30]
- Vérifiez les clés d'API et d'application avec l'endpoint [Authentication][31]
- Accordez un accès spécifique aux [Logs] avec [Logs Restriction Queries][32]
- Gérez les clés existantes avec [Key Management][33]
- Obtenez l’utilisation horaire, quotidienne et mensuelle sur plusieurs facettes de Datadog avec les endpoints [Usage Metering][34]
- Consultez la liste des préfixes IP appartenant à Datadog avec [IP Ranges][35]


[1]: /fr/api/v1/aws-integration/
[2]: /fr/api/v1/aws-logs-integration/
[3]: /fr/api/v1/azure-integration/
[4]: /fr/api/v1/gcp-integration/
[5]: /fr/api/v1/slack-integration/
[6]: /fr/api/v1/pagerduty-integration/
[7]: /fr/api/v1/webhooks-integration/
[8]: /fr/api/v1/metrics/
[9]: /fr/metrics/introduction/
[10]: /fr/api/v1/events/
[11]: /fr/events/
[12]: /fr/api/v1/synthetics/
[13]: /fr/synthetics/
[14]: /fr/tracing/guide/send_traces_to_agent_by_api/
[15]: /fr/api/v1/dashboards/
[16]: /fr/api/v1/dashboard-lists/
[17]: /fr/api/v1/hosts/
[18]: /fr/api/v1/embeddable-graphs/
[19]: /fr/api/v1/snapshots/
[20]: /fr/api/v1/service-dependencies/
[21]: /fr/api/v1/monitors/
[22]: /fr/api/v1/service-checks/
[23]: /fr/api/v1/logs/
[24]: /fr/api/v1/logs-indexes/
[25]: /fr/api/v1/logs-pipelines/
[26]: /fr/api/v1/service-level-objectives/
[27]: /fr/api/v2/security-monitoring/
[28]: /fr/api/v1/users/
[29]: /fr/api/v1/roles/
[30]: /fr/api/v1/organizations/
[31]: /fr/api/v1/authentication/
[32]: /fr/api/v2/logs-restriction-queries/
[33]: /fr/api/v1/key-management/
[34]: /fr/api/v1/usage-metering/
[35]: /fr/api/v1/ip-ranges/
[36]: /fr/llm_observability/evaluations/export_api
[37]: /fr/api/latest/cloudflare-integration/
[38]: /fr/api/latest/fastly-integration/
[39]: /fr/api/latest/jira-integration/
[40]: /fr/api/latest/microsoft-teams-integration/
[41]: /fr/api/latest/okta-integration/
[42]: /fr/api/latest/opsgenie-integration/