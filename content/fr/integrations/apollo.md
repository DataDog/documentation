---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - monitoring
  - caching
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/apollo/README.md'
display_name: Apollo
git_integration_title: apollo
guid: a0b142ff-0637-4c2f-814c-0f1a012bc65c
integration_id: apollo
integration_title: Apollo
is_public: true
kind: integration
maintainer: sachin@apollographql.com
manifest_version: 1.1.0
metric_prefix: apollo.engine.
metric_to_check: apollo.engine.operations.count
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

L'intégration Apollo/Datadog vous permet de transmettre les métriques de performance disponibles dans le Graph Manager à Datadog. Il s'agit donc d'un outil particulièrement pratique pour les équipes effectuant leur surveillance sur Datadog. Vous pouvez également exploiter l'API dédiée aux fonctions avancées pour créer des graphiques et des alertes sophistiqués concernant les métriques GraphQL.

![Métriques][1]

Voici les différentes métriques Datadog transmises par Graph Manager :

* `apollo.engine.operations.count` : le nombre d'opérations GraphQL exécutées. Ce nombre comprend les requêtes, les mutations et les opérations ayant généré une erreur.
* `apollo.engine.operations.error_count` : le nombre d'opérations GraphQL ayant généré une erreur. Ce nombre comprend les erreurs d'exécution GraphQL et les erreurs HTTP survenues lorsque Graph Manager ne parvient pas à se connecter à votre serveur.
* `apollo.engine.operations.cache_hit_count` : le nombre de requêtes GraphQL dont le résultat a été traité depuis le cache de requêtes complètes d'Apollo Server.
* Un histogramme des temps de réponse des opérations GraphQL, mesurés en millisecondes. En raison de la méthode d'agrégation utilisée par Graph Manager (compartimentage logarithmique), la précision de ces valeurs est de l'ordre de +/- 5 % :
  * `apollo.engine.operations.latency.min`
  * `apollo.engine.operations.latency.median`
  * `apollo.engine.operations.latency.95percentile`
  * `apollo.engine.operations.latency.99percentile`
  * `apollo.engine.operations.latency.max`
  * `apollo.engine.operations.latency.avg`

Toutes les métriques transférées à Datadog sont agrégées dans des intervalles de 60 secondes et taguées avec le nom de l'opération GraphQL, au format `operation:<nom-requête>`. Les signatures de requêtes uniques avec le même nom d'opération sont fusionnées, et les requêtes sans nom d'opération sont ignorées. 

Toutes les métriques sont également taguées avec l'ID de graphique Graph Manager, `service:<id-graphique>`, et le nom de la variante, `variant:<nom-variante>`. Ainsi, plusieurs graphiques Graph Manager peuvent envoyer des données au même compte Datadog. Si vous n'avez pas défini de nom de variante, la valeur « current » est utilisée.

Si vous transmettez des métriques à Graph Manager grâce au proxy Engine, Datadog fusionnera vos statistiques sur plusieurs instances du proxy (les métriques par hôte ne sont pas disponibles). Comme dans l'IU de Graph Manager, chaque opération dans un lot de requêtes est prise en compte individuellement.

## Configuration

### Configuration

Il vous suffit de fournir la clé d'API Datadog à Graph Manager pour configurer l'intégration Apollo/Datadog. Aucune autre étape de configuration n'est requise.

1. Accédez à la [page Integrations de Datadog][2] et cliquez sur le carré Apollo. Accédez ensuite à l'onglet **Configuration**, faites défiler l'écran vers le bas, puis choisissez **Install Integration**.

2. Accédez à la [page API de Datadog][3] et créez une clé d'API.

3. Dans [Graph Manager][4], accédez à la page des intégrations pour votre graphique.

    ![Page des intégrations][5]

4. Activez l'intégration Datadog. Collez la clé d'API et cliquez sur **Save**. Vous pouvez utiliser la même clé d'API pour tous vos graphiques, car toutes les métriques se voient attribuer un tag spécifiant l'ID du graphique (`service:<id-graph>`).

    ![Activation des intégrations][6]

5. Accédez à la page Metrics Explorer sur Datadog pour commencer à consulter les métriques transmises. Les métriques apparaissent dans un délai de cinq minutes.

### Utilisation

Consultez la [documentation relative aux intégrations Apollo][7] pour obtenir davantage d'informations sur son utilisation.

## Données collectées

### Métriques
{{< get-metrics-from-git "apollo" >}}


### Événements

L'intégration Apollo n'inclut actuellement aucun événement.

### Checks de service

L'intégration Apollo n'inclut actuellement aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

Consultez [notre blog][10] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations disponibles.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/metrics.png
[2]: https://app.datadoghq.com/account/settings
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://www.apollographql.com/docs/graph-manager/#viewing-graph-information
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-link.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo/images/settings-toggle.png
[7]: https://www.apollographql.com/docs/graph-manager/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/apollo/metadata.csv
[9]: https://docs.datadoghq.com/fr/help
[10]: https://www.datadoghq.com/blog


{{< get-dependencies >}}