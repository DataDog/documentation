---
aliases:
  - /fr/integrations/apollo_engine
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - caching
creates_events: false
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md
display_name: "Apollo\_Engine"
draft: false
git_integration_title: apollo
guid: a0b142ff-0637-4c2f-814c-0f1a012bc65c
integration_id: apollo
integration_title: Apollo
integration_version: ''
is_public: true
custom_kind: integration
maintainer: sachin@apollographql.com
manifest_version: 1.0.0
metric_prefix: apollo.
metric_to_check:
  - apollo.operations.count
  - apollo.engine.operations.count
name: apollo
public_title: Intégration Datadog/Apollo
short_description: Surveillez les performances de votre infrastructure GraphQL
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration Apollo/Datadog vous permet de transmettre les métriques de performance Studio à votre compte Datadog. Vous pouvez également exploiter l'API dédiée aux fonctions avancées pour créer des graphiques et des alertes concernant les métriques GraphQL.

![Métriques][1]

Studio transfère les métriques suivantes à Datadog :

- `apollo.operations.count` : le nombre d'opérations GraphQL exécutées. Ce nombre comprend les requêtes, les mutations et les opérations ayant généré une erreur.
- `apollo.operations.error_count` : le nombre d'opérations GraphQL ayant généré une erreur. Ce nombre comprend les erreurs d'exécution GraphQL et les erreurs HTTP survenues lorsque Studio ne parvient pas à se connecter à votre serveur.
- `apollo.operations.cache_hit_count` : le nombre de requêtes GraphQL dont le résultat a été traité depuis le cache de requêtes complètes d'Apollo Server.
- Un histogramme des temps de réponse des opérations GraphQL, mesurés en millisecondes. En raison de la méthode d'agrégation utilisée par Studio (compartimentage logarithmique), la précision de ces valeurs est de l'ordre de +/- 5 % :

  - `apollo.operations.latency.min`
  - `apollo.operations.latency.median`
  - `apollo.operations.latency.95percentile`
  - `apollo.operations.latency.99percentile`
  - `apollo.operations.latency.max`
  - `apollo.operations.latency.avg`

Ces métriques sont agrégées selon des intervalles de 60 secondes et taguées avec le nom de l'opération GraphQL, au format `operation:<nom-requête>`. Les signatures de requêtes uniques avec le même nom d'opération sont fusionnées, et les requêtes sans nom d'opération sont ignorées. 

Ces métriques sont également taguées avec l'ID de graphique Studio, `graph:<id-graphique>`, et le nom de la variante associée, `variant:<nom-variante>`. Ainsi, plusieurs graphiques Studio peuvent envoyer des données au même compte Datadog. Si vous n'avez pas défini de nom de variante, la valeur `current` est utilisée.

(Si l'intégration a été configurée avant octobre 2020, les noms des métriques commencent par `apollo.engine.operations` au lieu de `apollo.operations` et utilisent un tag `service` au lieu de `graph`. Vous pouvez migrer vers les nouveaux noms de métriques en accédant à la page Integrations de votre graphique dans Apollo Studio.)

## Configuration

### Configuration

Il vous suffit de fournir la clé et la région d'API Datadog à Studio pour configurer l'intégration Apollo/Datadog. Aucune autre étape de configuration n'est requise.

1. Accédez à la [page Integrations de Datadog][2] et cliquez sur le carré Apollo. Accédez ensuite à l'onglet **Configuration** puis cliquez sur **Install Integration** au bas de la page.

2. Accédez à la [page API de Datadog][3] et créez une clé d'API.

3. Identifiez votre région pour l'API Datadog en regardant la barre d'adresse de votre navigateur :
- Si le nom de domaine correspond à `app.datadoghq.com`, alors votre région est `US`.
- Si le nom de domaine correspond à `app.datadoghq.eu`, alors votre région est `EU`.

4. Dans [Studio][4], accédez à la page des intégrations de votre graphique :

   ![Page des intégrations][5]

5. Dans la section Datadog Forwarding, cliquez sur **Configure**. Renseignez votre clé d'API et votre région, puis cliquez sur **Enable**. Étant donné que toutes les métriques transférées reçoivent l'ID de graphique en tant que tag (`graph:<id-graphique>`), vous pouvez utiliser la même clé d'API pour tous vos graphiques.

   ![Activation des intégrations][6]

6. Accédez à la page Metrics Explorer sur Datadog pour commencer à visualiser vos métriques. Elles apparaissent dans un délai de cinq minutes.

### Utilisation

Consultez la [documentation sur les intégrations Apollo][7] (en anglais) pour en savoir plus sur leur utilisation.

## Données collectées

### Métriques
{{< get-metrics-from-git "apollo" >}}


### Événements

L'intégration Apollo n'inclut aucun événement pour le moment.

### Checks de service

L'intégration Apollo n'inclut aucun check de service pour le moment.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings#integrations
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://www.apollographql.com/docs/studio/org/graphs/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/studio/datadog-integration/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/