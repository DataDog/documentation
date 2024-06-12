---
assets:
  configuration: {}
  dashboards:
    Tyk Analytics Canvas: assets/dashboards/tyk_analytics_canvas.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- alerting
- automation
- aws
- cloud
- configuration & deployment
- web
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tyk/README.md
description: Intégration Datadog/Tyk avec DogStatsD
display_name: Tyk
draft: false
git_integration_title: tyk
guid: 7ba25c8a-ca29-4892-bdf6-750e1049d30a
integration_id: tyk
integration_title: Tyk
integration_version: ''
is_public: true
custom_kind: integration
maintainer: yaara@tyk.io
manifest_version: 1.0.0
metric_prefix: tyk.
metric_to_check:
- tyk.request_time.95percentile
- tyk.request_time.count
- tyk.request_time.avg
- tyk.request_time.max
- tyk.request_time.median
name: tyk
public_title: Intégration Datadog/Tyk
short_description: Surveillez des requêtes grâce à des statistiques de durée réparties
  par code de réponse, API, chemin, OAuth, etc.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Datadog peut recueillir et afficher les erreurs, le temps de réponse, la durée ainsi que la latence et surveiller les performances du trafic d'API dans [Tyk][1] pour identifier des problèmes concernant vos API ou vos consommateurs.

Tyk inclut par défaut une intégration Datadog qui recueille des métriques à partir de la [passerelle API Tyk][2].

La passerelle API Tyk enregistre des données sur tout le trafic qu'elle traite, les envoie à Datadog et conçoit des dashboards basés sur ces données.

### Fonctionnement

La [pompe Tyk][3] écrit des métriques d'application custom et les envoie à Datadog via [DogStatsD][4], le service d'agrégation de métriques inclus avec l'Agent Datadog. DogStatsD implémente le protocole StatsD qui ajoute quelques extensions spécifiques à Datadog, notamment le type de métrique histogram utilisé par `Tyk-gateway`.

`Tyk-gateway` utilise `Tyk-pump` pour envoyer les analyses effectuées à Datadog.

Lors de l'exécution de l'Agent Datadog, DogStatsD récupère en temps réel la métrique `request_time` à partir de `Tyk-pump` pour chaque requête. Vous pouvez ainsi mieux comprendre votre utilisation des API et agréger plusieurs paramètres, comme la date, la version, le code renvoyé ou la méthode, pour gagner en flexibilité.

La métrique custom utilisée par Tyk correspond au type [DD_HISTOGRAM_AGGREGATES][5].

## Configuration

L'intégration Tyk est incluse avec le package `tyk-pump` : vous devez donc uniquement définir une configuration dans `pump.conf`. Vous n'avez rien d'autre à installer sur votre plateforme Tyl.

### Installation

#### Installation

Pour cette intégration, vous devez avoir installé au préalable Tyk. Vous pouvez installer le logiciel [Tyk autogéré][6] ou [open source][7]. `tyk-pump` est inclus avec ces deux installations.

#### Installer l'Agent Datadog

Installez l'[Agent Datadog][8] dans votre environnement.

Exécutez l'[Agent][9] Datadog dans votre cluster Kubernetes, sous la forme d'un conteneur Docker sur votre Mac, ou à l'aide de toute autre approche permettant à `Tyk pump` d'accéder à l'Agent.

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][10] pour obtenir plus d'informations pour les environnements conteneurisés. Pour vérifier que vos modifications ont été appliquées, [exécutez la sous-commande status de l'Agent][11].


### Procédure à suivre

#### Tyk-pump
Pour configurer une pompe Datadog, suivez les instructions de la [section DogStatsD][12] du fichier README de la pompe (en anglais).

Voici un exemple de configuration de pompe Datadog dans `pump.conf` :

``` json
pump.conf:
...
   "dogstatsd": {
      "type": "dogstatsd",
      "meta": {
        "address": "dd-agent:8126",
        "namespace": "tyk",
        "async_uds": true,
        "async_uds_write_timeout_seconds": 2,
        "buffered": true,
        "buffered_max_messages": 32,
        "sample_rate": 0.9999999999,
        "tags": [
          "method",
          "response_code",
          "api_version",
          "api_name",
          "api_id",
          "org_id",
          "tracked",
          "path",
          "oauth_id"
        ]
      }
    },
```

Cet [exemple][13] provient de [Tyk-demo][14], un projet open source qui permet de lancer en une seule commande l'intégralité de la plateforme Tyk et propose plusieurs exemples clés en main, notamment pour Datadog. Pour exécuter cette intégration, utilisez la commande `up.sh analytics-datadog`.

#### Configurer l'Agent Datadog

L'intégration Tyk repose sur [DogStatsD][15], le service d'agrégation de métriques fourni avec l'Agent Datadog. DogStatsD implémente le protocole `StatsD` et ajoute quelques extensions spécifiques à Datadog. Tyk utilise le type de métrique `Histogram`.

Configurez les variables d'environnement Datadog et DogStatsD suivantes dans votre environnement :

| Variable d'environnement Datadog | Valeur | Description |
|---------------------------|-------------|------|
| DD_API_KEY | {votre-clé-api-datadog} | Permet à l'Agent Datadog de se connecter au portail Datadog. Votre clé d'API est indiquée dans les [paramètres de votre compte][16]. |
| DD_ENV |    tyk-demo-env   |   Définit le nom de l'environnement. |
| DD_DOGSTATSD_TAGS | "env:tyk-demo" |  Les tags supplémentaires à ajouter à l'ensemble des métriques, événements et checks de service reçus par ce serveur DogStatsD. |
| DD_LOGS_ENABLED | true | Active la collecte de logs pour l'Agent Datadog. |
| DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL | true | Recueille des logs à partir des conteneurs. |
| DD_DOGSTATSD_SOCKET | /var/run/docker.sock | Le chemin vers le socket Unix à écouter. Docker Compose monte ce chemin. |
| DD_DOGSTATSD_ORIGIN_DETECTION | true | Active la détection de conteneurs et le tagging pour les métriques de socket Unix. |
| DD_DOGSTATSD_NON_LOCAL_TRAFFIC | true | Effectue une écoute des paquets DogStatsD issus d'autres conteneurs. Requis pour envoyer des métriques custom. |
| DD_AGENT_HOST | dd-agent | Le nom du host de l'Agent dans Docker. |
| DD_AC_EXCLUDE | redis | Exclut les checks redis Datadog (facultatif). |
| DD_CONTAINER_EXCLUDE | true | Exclut les checks Docker pour l'Agent Datadog. |

Une fois les variables d'environnement ci-dessus définies, configurez l'Agent afin d'utiliser [DogStatsD][17].

[Redémarrez l'Agent][18] une fois la configuration terminée.

### Validation

Créez un dashboard ou importez l'[échantillon][19] et ajoutez un widget. Dans la section **Graph your data**, sous le champ **metric**, commencez à saisir l'espace de nommage que vous avez choisi pour la pompe dans la configuration `pump.conf` sous `dogstatsd.namespace`.

Dans l'exemple ci-dessus, il s'agit de `tyk`. Commencez à saisir du texte pour afficher toutes les métriques disponibles.

## Données collectées

### Métriques
{{< get-metrics-from-git "tyk" >}}


### Dashboards

Datadog vous permet de créer des dashboards qui représentent des statistiques à propos de vos services API et de leur utilisation.

Voici un exemple de dashboard :

![Exemple de dashboard analytique Tyk][21]

**Remarque : vous pouvez [importer][19] ce dashboard et l'utiliser comme exemple ou référence pour votre propre dashboard.**

### Événements

L'intégration Tyk n'inclut aucun événement.

### Checks de service

L'intégration Tyk n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][22].

[1]: https://tyk.io/
[2]: https://github.com/TykTechnologies/tyk
[3]: https://tyk.io/docs/tyk-pump/
[4]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent#pagetitle
[5]: https://docs.datadoghq.com/fr/agent/docker/?tab=standard#dogstatsd-custom-metrics
[6]: https://tyk.io/docs/tyk-self-managed/install/
[7]: https://tyk.io/docs/apim/open-source/installation/
[8]: https://app.datadoghq.com/account/settings#agent
[9]: https://docs.datadoghq.com/fr/agent/
[10]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[12]: https://github.com/TykTechnologies/tyk-pump#dogstatsd
[13]: https://github.com/TykTechnologies/tyk-demo/blob/master/deployments/analytics-datadog/volumes/tyk-pump/pump-datadog.conf
[14]: https://github.com/TykTechnologies/tyk-demo/tree/master/deployments/analytics-datadog
[15]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent#setup
[16]: https://app.datadoghq.com/organization-settings/api-keys
[17]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent#how-it-works
[18]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[19]: https://github.com/DataDog/integrations-extras/blob/master/tyk/assets/dashboards/tyk_analytics_canvas.json
[20]: https://github.com/DataDog/integrations-extras/blob/master/tyk/metadata.csv
[21]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/tyk/images/datadog-tyk-analytics-dashboard.jpg
[22]: https://docs.datadoghq.com/fr/help/