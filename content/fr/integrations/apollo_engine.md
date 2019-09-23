---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - api
  - monitoring
  - caching
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/apollo_engine/README.md'
display_name: "Apollo\_Engine"
git_integration_title: apollo_engine
guid: a0b142ff-0637-4c2f-814c-0f1a012bc65c
integration_id: apollo
integration_title: "Apollo\_Engine"
is_public: true
kind: integration
maintainer: martijnwalraven@apollographql.com
manifest_version: 1.0.0
metric_prefix: apollo.engine.
metric_to_check: apollo.engine.operations.count
name: apollo_engine
public_title: "Intégration Datadog/Apollo\_Engine"
short_description: Surveillez les performances de votre infrastructure GraphQL
support: contrib
supported_os:
  - linux
---
## Présentation

Apollo Engine est conçu pour surveiller les performances de votre infrastructure GraphQL. Si Datadog surveille déjà le reste de votre pile, vous pouvez facilement transmettre les métriques recueillies par Engine via cette intégration.

![Métriques][1]

Les métriques Datadog fournies sont les suivantes :

* `apollo.engine.operations.count` : le nombre d'opérations GraphQL exécutées. Ce nombre comprend les requêtes, les mutations et les opérations ayant généré une erreur.
* `apollo.engine.operations.error_count` : le nombre d'opérations GraphQL ayant généré une erreur. Ce nombre comprend les erreurs d'exécution GraphQL et les erreurs HTTP si Engine ne parvient pas à se connecter à votre serveur.
* `apollo.engine.operations.cache_hit_count` : le nombre de requêtes GraphQL dont le résultat a été traité depuis le cache de requêtes complètes d'Apollo Engine.
* Un histogramme des temps de réponse des opérations GraphQL, mesurés en millisecondes. En raison de la méthode d'agrégation utilisée par Engine (compartimentage logarithmique), la précision de ces valeurs est de l'ordre de +/- 5 % :
  * `apollo.engine.operations.latency.min`
  * `apollo.engine.operations.latency.median`
  * `apollo.engine.operations.latency.95percentile`
  * `apollo.engine.operations.latency.99percentile`
  * `apollo.engine.operations.latency.max`
  * `apollo.engine.operations.latency.avg`

Toutes les métriques Datadog d'Engine sont taguées avec le nom de l'opération GraphQL, au format `operation:<nom-requête>`. Les signatures de requêtes uniques avec le même nom d'opération sont fusionnées, et les requêtes sans nom d'opération sont ignorées. Toutes les métriques sont également taguées avec l'ID de service Engine, `service:<id-service>`. Ainsi, plusieurs services Apollo Engine peuvent envoyer des données au même compte Datadog.

Engine envoie les métriques à Datadog toutes les 60 secondes. Les données sont transmises avec un délai de 60 secondes pour permettre la collecte des données issues des proxies Engine, même en cas de panne réseau temporaire.
Les métriques Datadog fusionnent les statistiques provenant des différentes instances du proxy : c'est la raison pour laquelle les métriques propres à chaque host ne sont pas disponibles. Comme dans Apollo Engine, chaque opération dans un lot de requêtes est prise en compte individuellement.

## Implémentation

### Configuration

Il vous suffit de fournir la clé d'API Datadog à Engine pour configurer l'intégration Datadog/Engine. Aucune autre étape de configuration n'est requise.

1. Copiez votre clé d'API Datadog :

    <span class="hidden-api-key">${api_key}</span>

2. Accédez au [service Apollo Engine][2] pour lequel vous souhaitez activer les métriques Datadog. Accédez à la page des paramètres de ce service :

    ![Paramètres][3]

    ![LienParamètres][4]

3. Une section Intégrations doit s'afficher en bas de la page. Activez l'intégration Datadog :

    ![Paramètres][5]

4. Collez la clé d'API et cliquez sur **Done**. Vous pouvez utiliser la même clé d'API pour tous les services d'Apollo Engine, car toutes les métriques se voient attribuer un tag spécifiant l'ID de service (`service:<id-service>`).

5. Accédez à votre page Metrics Explorer sur Datadog pour commencer à consulter les métriques reçues. Les métriques sont visibles après un délai de cinq minutes.

### Utilisation

Consultez la [documentation relative à Apollo Engine][6] pour obtenir davantage d'informations sur son utilisation.

## Données collectées

### Métriques
{{< get-metrics-from-git "apollo_engine" >}}


### Événements

L'intégration Apollo Engine n'inclut actuellement aucun événement.

### Checks de service

L'intégration Apollo Engine n'inclut actuellement aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin

Consultez [notre blog][9] pour en savoir plus sur la surveillance d'infrastructure et sur toutes les autres intégrations disponibles.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/metrics.png
[2]: https://engine.apollographql.com
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-toggle.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-link.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/apollo_engine/images/settings-toggle.png
[6]: https://www.apollographql.com/docs/engine/datadog.html
[7]: https://github.com/DataDog/integrations-extras/blob/master/apollo_engine/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog


{{< get-dependencies >}}