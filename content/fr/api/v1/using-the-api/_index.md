---
title: Utiliser l'API
type: api
---
{{< h2 >}}Utiliser l'API{{< /h2 >}}

Utilisez l'API HTTP de Datadog pour accéder automatiquement à la plateforme Datadog. Vous pouvez utiliser l'API pour envoyer des données à Datadog, créer des représentations visuelles de données et gérer votre compte.

{{< h2 >}}Envoyer des données à Datadog{{< /h2 >}}

Utilisez l'API pour commencer à envoyer les données des intégrations à Datadog. Les options de configuration supplémentaire de l'Agent vous offrent également la possibilité d'utiliser l'API pour envoyer des données de test Synthetic, des logs et des traces à Datadog.

**Endpoints d'intégration**

Endpoints d'intégration disponibles :

- [Intégration AWS][1]
- [Intégration de logs AWS][2]
- [Intégration Azure][3]
- [Intégration GCP][4]
- [Intégration Slack][5]
- [Intégration PagerDuty][6]
- [Intégration Webhooks][7]

**Endpoints de plateforme**

Utilisez ces endpoints pour envoyer et récupérer des données dans Datadog :

- Les endpoints de [métriques][8] vous permettent d'envoyer des données de [métriques][9] afin de les représenter graphiquement sur les dashboards de Datadog et de les interroger sur l'intervalle de votre choix.
- Les endpoints d'[événements][10] vous permettent d'envoyer et de récupérer des événements dans le [flux d'événements Datadog][11].
- Utilisez les endpoints de [surveillance Synthetic][12] pour créer, lancer et interrompre des [tests Synthetic][13], ou visualiser leurs résultats.
- Utilisez l'[API de tracing de l'Agent][14] pour envoyer des traces à l'Agent Datadog afin de les transmettre par la suite à Datadog.

{{< h2 >}}Visualiser vos données{{< /h2 >}}

Lorsque vous envoyez des données à Datadog, vous pouvez utiliser l'API pour créer automatiquement des représentations visuelles de ces données :

- Créez des [dashboards][15] et consultez les [listes de dashboards][16].
- Gérez [les tags de host][17].
- Créez des [graphiques intégrables][18].
- Prenez un [snapshot de graphique][19].
- [Dépendances de service][20] : consultez la liste de vos services APM et de leurs dépendances.
- Créez des [monitors][21].
- [Checks de service][22] : envoyez des statuts de check afin de les utiliser avec des monitors.
- Créez et gérez des [logs][23], des [index de logs][24] et des [pipelines de logs][25].
- Récupérez des informations sur des [hosts][17] pour votre organisation.
- Créez et gérez des [Service Level Objectives][26].
- Générez des signaux [Security Monitoring][27].

{{< h2 >}}Gérer votre compte{{< /h2 >}}

Vous pouvez également utiliser l'API Datadog pour gérer automatiquement votre compte :

- Gérez des [utilisateurs][28].
- Gérez des [rôles][29].
- Gérez votre [organisation][30].
- Vérifiez les clés d'API et d'application avec l'endpoint d'[authentification][31].
- Autorisez l'accès à des logs spécifiques avec les [requêtes de restriction de logs][32].
- Gérez vos clés existantes avec la fonctionnalité [Gestion des clés][33].
- Récupérez des informations sur l'utilisation horaire, journalière et mensuelle de nombreuses facettes de Datadog grâce aux endpoints dédiés à la [mesure de l'utilisation][34].
- Consultez la liste des préfixes d'adresse IP appartenant à Datadog avec les [plages d'IP][35].


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
[14]: /fr/api/v1/tracing/
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