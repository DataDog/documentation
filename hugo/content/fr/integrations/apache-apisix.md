---
app_id: apache-apisix
app_uuid: b842d639-caf6-4b3a-8115-52458b9a0753
assets:
  dashboards:
    Apache APISIX Dashboard: assets/dashboards/apache-apisix_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - apisix.request.counter
      - apisix.request.latency
      - apisix.upstream.latency
      - apisix.apisix.latency
      - apisix.ingress.size
      - apisix.egress.size
      metadata_path: metadata.csv
      prefix: apisix.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10244
    source_type_name: Apache APISIX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Communauté
  sales_email: dev@apisix.apache.org
  support_email: dev@apisix.apache.org
categories:
- cloud
- metrics
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/README.md
display_on_public_website: true
draft: false
git_integration_title: apache-apisix
integration_id: apache-apisix
integration_title: Apache APISIX
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: apache-apisix
public_title: Apache APISIX
short_description: Intégration Datadog/APISIX
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Cloud
  - Category::Metrics
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Intégration Datadog/APISIX
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Apache APISIX
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## Présentation

Apache APISIX est une passerelle API dynamique, haute performance et en temps réel dotée de fonctionnalités de gestion avancée du trafic (équilibrage de charge, source dynamique en amont, version Canary, disjoncteur, authentification, observabilité, etc.). Apache APISIX vous permet par exemple de gérer le trafic nord-sud habituel, ainsi que le trafic est-ouest entre les services. Cette technologie peut également être utilisée en tant que contrôleur Ingress Kubernetes.

Le [plug-in Datadog/APISIX][1] transmet ses métriques custom au serveur DogStatsD et est fourni avec l'Agent Datadog via la connexion UDP. DogStatsD est une implémentation du protocole StatsD. Ce composant recueille les métriques custom pour l'Agent [Apache APISIX][2], les agrège au sein d'un unique point de données, puis envoie ce point au serveur Datadog configuré.

## Formule et utilisation

### Liste des infrastructures

Suivez les instructions de configuration ci-dessous.

### Dépannage de la solution Browser

1. Si vous utilisez déjà Datadog et que vous avez installé l'Agent Datadog, assurez-vous que votre pare-feu autorise le port 8125/UDP. Vérifiez par exemple que l'Agent Apache APISIX parvient à atteindre le port 8125 de l'Agent Datadog. Si c'est bien le cas, passez directement à l'étape 3.

> Pour en savoir plus sur l'installation de l'Agent Datadog, consultez la [documentation relative à l'Agent][3].

2. Si vous débutez sur la plateforme Datadog :

   1. Commencez par créer un compte. Pour ce faire, rendez-vous sur le [site Web de Datadog][4], puis cliquez sur le bouton Get Started Free.
   2. Générez une clé d'API.
      ![Générer une clé d'API][5]

3. Le plug-in Datadog/APISIX requiert uniquement le composant DogStatsD de `datadog/agent` : en effet, le plug-in envoie de façon asynchrone des métriques au serveur DogStatsD, en respectant le protocole StatsD via le socket UDP standard. Pour cette raison, APISIX recommande d'utiliser l'image `datadog/dogstatsd` autonome au lieu de la version complète de l'Agent. Cette image est extrêmement légère (seulement 11 Mo, contre 2,8 Go pour l'image `datadog/agent`).

Pour exécuter l'image en tant que conteneur, procédez comme suit :

```shell
# récupérer la dernière image
$ docker pull datadog/dogstatsd:latest
# exécuter un conteneur détaché
$ docker run -d --name dogstatsd-agent -e DD_API_KEY=<Clé API obtenue à l'étape 2> -p 8125:8125/udp  datadog/dogstatsd
```

Si vous utilisez Kubernetes dans votre environnement de production, vous pouvez déployer `dogstatsd` en tant que `Daemonset` ou `Multi-Container Pod` en même temps que l'Agent Apache APISIX.

4. L'exemple suivant présente la marche à suivre pour activer le plug-in Datadog pour une certaine route, en partant du principe que l'Agent `dogstatsd` est déjà en cours d'exécution.

```shell
# activer le plug-in pour une route spécifique
$ curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "plugins": {
    "datadog": {}
  },
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  },
  "uri": "/hello"
}'
```

Toutes les requêtes transmises à l'URI d'endpoint `/hello` génèrent alors les métriques indiquées ci-dessus, et les transmettent au serveur DogStatsD local de l'Agent Datadog.

5. Pour désactiver le plug-in, supprimez la configuration JSON correspondante dans la configuration du plug-in. Cela désactive `datadog`. Les plug-ins APISIX sont rechargés à chaud, vous n'avez donc pas besoin de redémarrer APISIX.

```shell
# désactiver le plug-in pour une route
curl http://127.0.0.1:9080/apisix/admin/routes/1 -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{
  "uri": "/hello",
  "plugins": {},
  "upstream": {
    "type": "roundrobin",
    "nodes": {
      "127.0.0.1:1980": 1
    }
  }
}'
```

5. Consultez la [documentation APISIX sur le plug-in Datadog][1] (en anglais) pour obtenir des options de configuration supplémentaires.

### Validation

[Lancez la sous-commande status de l'Agent][6] et cherchez `apisix` dans la section Checks.

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "apache-apisix" >}}


### Aide

Le check Apache APISIX n'inclut aucun événement.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

- [Surveillance cloud avec Datadog dans Apache APISIX][9]

[1]: https://apisix.apache.org/docs/apisix/plugins/datadog
[2]: https://apisix.apache.org/
[3]: https://docs.datadoghq.com/fr/agent/
[4]: https://www.datadoghq.com/
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apache-apisix/images/screenshot_1.png
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/apache-apisix/metadata.csv
[8]: https://docs.datadoghq.com/fr/help/
[9]: https://apisix.apache.org/blog/2021/11/12/apisix-datadog