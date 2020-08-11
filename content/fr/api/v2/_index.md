---
title: Références sur les API V2
type: api
---
{{< h2 >}}Références sur les API V2{{< /h2 >}}

Utilisez l'API HTTP Datadog pour accéder automatiquement à la plateforme Datadog. L'API Datadog utilise des URL axées sur les ressources ainsi que des codes de statut afin d'indiquer la réussite ou l'échec des requêtes. Elle renvoie également un objet JSON pour toutes les requêtes.

**Pour prendre en main l'API HTTP Datadog, suivez le processus ci-dessous afin d'identifier les endpoints dont vous avez besoin. Consultez également la section [Utiliser Postman avec les API Datadog][1].**


**Remarque** : les exemples de code cURL supposent que vous utilisiez les coreutils GNU et BASH. Sous macOS, vous pouvez installer coreutils via le [gestionnaire de paquets Homebrew][2] : `brew install coreutils`.

{{< img src="api/api-flow.png" alt="Processus Datadog" responsive="true" style="width:100%;">}}
{{< h2 >}}Installer l'Agent Datadog{{< /h2 >}}

Avant de pouvoir utiliser l'API pour envoyer ou consulter des données, vous devez [installer l'Agent Datadog][3]. L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques de vos hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance.

{{< h2 >}}Envoyer des données à Datadog{{< /h2 >}}

Une fois l'Agent Datadog configuré, utilisez l'API pour commencer à envoyer les données des intégrations à Datadog. Les options de configuration supplémentaire de l'Agent vous offrent également la possibilité d'utiliser l'API pour envoyer des données Synthetics, des logs et des traces à Datadog.

**Endpoints d'intégration**

Endpoints d'intégration disponibles :

- [Intégration AWS][4]
- [Intégration Logs AWS][5]
- [Intégration Azure][6]
- [Intégration GCP][7]
- [Intégration Slack][8]
- [Intégration PagerDuty][9]
- [Intégration Webhooks][10]

**Endpoints de plateforme**

Utilisez ces endpoints pour envoyer et récupérer des données dans Datadog :

- Les endpoints de [métriques][11] vous permettent d'envoyer des données de [métriques][12] afin de les représenter graphiquement sur les dashboards de Datadog et de les interroger sur l'intervalle de votre choix.
- Les endpoints d'[événements][13] vous permettent d'envoyer des événements au [flux d'événements Datadog][14] et d'y récupérer des événements.
- Utilisez les endpoints [Synthetics][15] pour créer, lancer et interrompre des [tests Synthetics][16], ou visualiser leurs résultats.
- Utilisez l'[API de tracing de l'Agent][17] pour envoyer des traces à l'Agent Datadog afin de les transmettre par la suite à Datadog.

{{< h2 >}}Visualiser vos données{{< /h2 >}}

Lorsque vous envoyez des données à Datadog, vous pouvez utiliser l'API pour créer automatiquement des représentations visuelles de ces données :

- Créez des [dashboards][18] et consultez les [listes de dashboards][19].
- Gérez [les tags de host][20].
- Créez des [graphiques intégrables][21].
- Prenez un [snapshot de graphique][22].
- [Dépendances de service][23] : consultez la liste de vos services APM et de leurs dépendances.
- Créez des [monitors][24].
- [Checks de service][25] : envoyez des statuts de check afin de les utiliser avec des monitors.
- Créez et gérez des [logs][26], des [index de logs][27] et des [pipelines de logs][28].
- Récupérez des informations sur des [hosts][20] pour votre organisation.
- Créez et gérez des [Service Level Objectives][29].
- Générez des signaux [Security Monitoring][30].

{{< h2 >}}Gérer votre compte{{< /h2 >}}

Vous pouvez également utiliser l'API Datadog pour gérer automatiquement votre compte :

- Gérez des [utilisateurs][31].
- Gérez des [rôles][32].
- Gérez votre [organisation][33].
- Vérifiez les clés d'API et d'application avec l'endpoint d'[authentification][34].
- Autorisez l'accès à des logs spécifiques avec les [requêtes de restriction de logs][35].
- Gérez des clés existantes avec la fonctionnalité de [gestion de clés][36].
- Récupérez des informations sur l'utilisation horaire, journalière et mensuelle de nombreuses facettes de Datadog grâce aux endpoints dédiés à la [mesure de l'utilisation][37].
- Consultez la liste des préfixes d'adresse IP appartenant à Datadog avec les [plages d'IP][38].

{{< h2 >}}Limites de débit{{< /h2 >}}

Certains endpoints d'API possèdent une limite de débit. Lorsque vous dépassez un certain nombre de requêtes dans un intervalle donné, une erreur est renvoyée.

Pour les endpoints d'API à débit limité, les en-têtes sont renvoyés afin que vous puissiez vérifier où vous vous situez par rapport à votre limite. Si vous dépassez votre limite, consultez ces en-têtes afin de déterminer à quel moment vous pourrez renvoyer ces données.

Pour revoir à la hausse les limites de débit par défaut, [contactez l'assistance Datadog][39].

Quelques précisions concernant la politique de limitation de débit des API :

- Datadog **n'applique pas de limite de débit** lors de l'envoi de points de données/métriques (consultez la [section relative aux métriques][11] pour en savoir plus sur le traitement du débit d'envoi des métriques). Les limites appliquées dépendent de la quantité de [métriques custom][40] prévue dans votre contrat.
- La limite de débit pour la **récupération** de métriques est de `100` par heure et par organisation.
- La limite de débit pour l'envoi d'événements est fixée à `1000` par agrégat, par jour et par organisation. Un agrégat désigne un groupe d'événements similaires.
- La limite de débit pour les appels de l'[API permettant d'interroger une série temporelle][41] est de `600` par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant d'interroger des logs][42] est de `300` par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant de représenté un snapshot][22] est de `60` par heure et par organisation. Cette limite peut être augmentée sur demande.
- La limite de débit pour les appels de l'[API permettant de configurer des logs][27] est de `6000` par minute et par organisation. Cette limite peut être augmentée sur demande.

| En-têtes de limites de débit      | Description                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | Nombre de requêtes autorisées sur une période donnée             |
| `X-RateLimit-Period`    | Durée en secondes pour les réinitialisations (alignées sur le calendrier) |
| `X-RateLimit-Remaining` | Nombre de requêtes autorisées restantes pour la période en cours  |
| `X-RateLimit-Reset`     | Délai en secondes avant la prochaine réinitialisation                        |

[1]: /fr/getting_started/api
[2]: https://brew.sh
[3]: /fr/getting_started/agent/
[4]: /fr/api/v1/aws-integration/
[5]: /fr/api/v1/aws-logs-integration/
[6]: /fr/api/v1/azure-integration/
[7]: /fr/api/v1/gcp-integration/
[8]: /fr/api/v1/slack-integration/
[9]: /fr/api/v1/pagerduty-integration/
[10]: /fr/api/v1/webhooks-integration/
[11]: /fr/api/v1/metrics/
[12]: /fr/metrics/introduction/
[13]: /fr/api/v1/events/
[14]: /fr/events/
[15]: /fr/api/v1/synthetics/
[16]: /fr/synthetics/
[17]: /fr/api/v1/tracing/
[18]: /fr/api/v1/dashboards/
[19]: /fr/api/v1/dashboard-lists/
[20]: /fr/api/v1/hosts/
[21]: /fr/api/v1/embeddable-graphs/
[22]: /fr/api/v1/snapshots/
[23]: /fr/api/v1/service-dependencies/
[24]: /fr/api/v1/monitors/
[25]: /fr/api/v1/service-checks/
[26]: /fr/api/v1/logs/
[27]: /fr/api/v1/logs-indexes/
[28]: /fr/api/v1/logs-pipelines/
[29]: /fr/api/v1/service-level-objectives/
[30]: /fr/api/v2/security-monitoring/
[31]: /fr/api/v1/users/
[32]: /fr/api/v1/roles/
[33]: /fr/api/v1/organizations/
[34]: /fr/api/v1/authentication/
[35]: /fr/api/v2/logs-restriction-queries/
[36]: /fr/api/v1/key-management/
[37]: /fr/api/v1/usage-metering/
[38]: /fr/api/v1/ip-ranges/
[39]: /fr/help/
[40]: /fr/developers/metrics/custom_metrics/
[41]: /fr/api/v1/metrics/#query-timeseries-points
[42]: /fr/api/v1/logs/#get-a-list-of-logs