---
further_reading:
- link: logs/log_collection
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process
  tag: Documentation
  text: Recueillir vos processus
- link: tracing
  tag: Documentation
  text: Recueillir vos traces
- link: extend/prometheus
  tag: Documentation
  text: Écrivez votre propre check personnalisé pour Prometheus
title: Collecte de métriques Prometheus et OpenMetrics à partir d'un host
---
Collectez les métriques Prometheus et OpenMetrics exposées par votre application s'exécutant sur vos hôtes à l'aide du Datadog Agent et des intégrations [Datadog-OpenMetrics][1] ou [Datadog-Prometheus][2].

## Présentation {#overview}

À partir de la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper des endpoints Prometheus. Datadog recommande d'utiliser le check OpenMetrics, car il est plus efficace et prend entièrement en charge le format texte Prometheus. Pour une utilisation plus avancée de l'interface `OpenMetricsCheck`, notamment pour écrire un check personnalisé, consultez la section [Developer Tools][5]. Utilisez le check Prometheus uniquement lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page explique l'utilisation de base de ces checks, vous permettant d'importer dans Datadog toutes vos métriques exposées au format Prometheus.

## Configuration {#setup}

### Installation {#installation}

[Installez le Datadog Agent pour votre système d'exploitation][6]. Les checks OpenMetrics et Prometheus sont inclus dans le package [Datadog Agent][7], vous n'avez donc rien d'autre à installer sur vos containers ou vos hôtes.

### Configuration {#configuration}

Pour collecter vos métriques exposées :

1. Modifiez le fichier `openmetrics.d/conf.yaml` dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][8]. Consultez l'[exemple openmetrics.d/conf.yaml][9] pour connaître toutes les options de configuration disponibles. Voici la configuration minimale requise pour activer l'intégration :

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     With the following configuration placeholder values:

    | Placeholder             | Description                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Port to connect to in order to access the Prometheus endpoint.                                                                                                                                                         |
    | `<ENDPOINT>`            | URL for the metrics served by the container, in Prometheus format.                                                                                                                                                     |
    | `<NAMESPACE>`           | Set namespace to be prefixed to every metric when viewed in Datadog.                                                                                                                                                   |
    | `<METRIC_TO_FETCH>`     | Prometheus metrics key to be fetched from the Prometheus endpoint.                                                                                                                                                     |
    | `<DATADOG_METRIC_NAME>` | Optional parameter which, if set, transforms the `<METRIC_TO_FETCH>` metric key to `<DATADOG_METRIC_NAME>` in Datadog. <br>If you choose not to use this option, pass a list of strings rather than `key:value` pairs. |

2. [Redémarrez l'Agent][10] pour commencer à collecter vos métriques.

### Paramètres disponibles {#parameters-available}

Vous trouverez ci-dessous la liste complète des paramètres pouvant être utilisés pour votre `instances` :

| Nom                                     | Type                                    | Nécessité | Valeur par défaut | Description                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openmetrics_endpoint`                        | chaîne                                  | requise  | aucune         | L'URL exposant les métriques au format OpenMetrics.                                                                           |
| `namespace`                             | chaîne                                  | requise  | aucune         | L'espace de nommage à ajouter avant tous les espaces de nommage des métriques. Vos métriques sont collectées sous la forme `namespace.metric_name`.                                                                                                                                          |
| `metrics`                               | liste de chaînes ou d'éléments `key:value` | requis    | aucun         | Liste de paires `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` pour les métriques à récupérer depuis l'endpoint Prometheus.<br> `<NEW_METRIC_NAME>` est facultatif. Il transforme le nom dans Datadog s'il est défini. Cette liste doit contenir au moins une métrique.                            |
| `raw_metric_prefix`             | chaîne                                  | facultatif  | aucun         | Un préfixe qui est supprimé de tous les noms de métriques exposés, s'il est présent.                                                                                                                 |
| `health_service_check`                  | booléen                                 | facultatif  | true          | Envoyez un service check indiquant l'état de l'endpoint Prometheus. Le service check est nommé `<NAMESPACE>.prometheus.health`.                                                                                                                                         |
| `label_to_hostname`                     | chaîne                                  | facultatif  | aucun          | Remplacez le nom d'hôte par la valeur d'une étiquette.                                                                                                                                                                                                                   |
| `label_joins`                           | objet                                  | facultatif  | aucun          | La jointure d'étiquettes vous permet de cibler une métrique et de récupérer son étiquette en utilisant un mappage 1:1.                                                                                                                                                                               |
| `labels_mapper`                         | liste d'éléments clé:valeur               | facultatif  | aucun          | Le mappeur d'étiquettes vous permet de renommer certaines étiquettes. Format : `<LABEL_TO_RENAME>: <NEW_LABEL_NAME>`.                                                                                                                                                                    |
| `type_overrides`                        | liste d'éléments clé:valeur               | facultatif  | aucun          | Le remplacement de type permet de remplacer un type dans la charge utile Prometheus ou de typer une métrique non typée (elle est ignorée par défaut).<br> Les `<METRIC_TYPE>` pris en charge sont `gauge`, `monotonic_count`, `histogram` et `summary`.                                             |
| `tags`                                  | liste d'éléments clé:valeur               | facultatif  | aucun          | Liste des tags à joindre à chaque métrique, événement et service check émis par cette intégration.<br> [En savoir plus sur le tagging][5].                                                                                                                                     |
| `send_distribution_buckets`             | booléen                                 | facultatif  | false         | Définissez `send_distribution_buckets` sur `true` pour envoyer et convertir les histogrammes OpenMetrics en [métriques de distribution][15]. <br>`collect_histogram_buckets` doit être défini sur `true` (valeur par défaut).<br> **Remarque** : pour OpenMetrics v2, utilisez `collect_counters_with_distributions` à la place.                                                                              |
| `send_distribution_counts_as_monotonic` | booléen                                 | facultatif  | false         | Définissez `send_distribution_counts_as_monotonic` sur `true` pour envoyer les comptes d'histogramme/résumé OpenMetrics en tant que comptes monotones.                                                                                                                                              |
| `collect_histogram_buckets`               | booléen                                 | facultatif  | true          | Définissez `collect_histogram_buckets` sur `true` pour envoyer le compartiment d'histogrammes.                                                                                                                                                                                               |
| `send_monotonic_counter`                | booléen                                 | facultatif  | true          | Pour envoyer les comptes en tant que comptes monotones, consultez le [problème pertinent sur GitHub][9].                                                                                                                                                                                             |
| `exclude_labels`                        | liste de chaînes                        | facultatif  | aucun         | Liste des étiquettes à exclure.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | chaîne                                  | facultatif  | aucun         | Si votre endpoint Prometheus est sécurisé, voici les paramètres pour le configurer :<br> il peut s'agir soit du seul chemin d'accès au certificat, auquel cas vous devez spécifier la clé privée, soit du chemin d'accès à un fichier contenant à la fois le certificat et la clé privée. |
| `ssl_private_key`                       | chaîne                                  | facultatif  | aucun         | Nécessaire si le certificat n'inclut pas la clé privée.<br> **AVERTISSEMENT** : la clé privée de votre certificat local doit être non chiffrée.                                                                                                                          |
| `ssl_ca_cert`                           | chaîne                                  | facultatif  | aucun         | Le chemin d'accès à l'autorité de certification de confiance utilisée pour générer des certificats personnalisés.                                                                                                                                                                                                  |
| `timeout`                               | entier                                  | facultatif  | 10            | Définissez un délai d'attente en secondes pour la requête Prometheus/OpenMetrics.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | entier                                  | facultatif  | 2000          | Le check se limite par défaut à 2000 métriques. Augmentez cette limite si nécessaire.                                                                                                                                                                                   |
| `bearer_token_auth`                     | booléen                                 | facultatif  | false         | Définissez `bearer_token_auth` sur `true` pour ajouter un en-tête d'authentification par bearer token. **Remarque** : Si `bearer_token_path` n'est pas défini, `/var/run/secrets/kubernetes.io/serviceaccount/token` est utilisé comme chemin par défaut.                                                       |
| `bearer_token_path`                     | chaîne                                  | facultatif  | aucun          | Le chemin d'accès à un fichier contenant un jeton porteur de compte de service Kubernetes (assurez-vous que le fichier existe et est correctement monté). **Remarque** : définissez `bearer_token_auth` sur `true` pour activer l'ajout du jeton aux en-têtes HTTP pour l'authentification.                                          |
| `collect_counters_with_distributions`   | booléen                                 | facultatif  | false         | Indique s'il faut également collecter les métriques de compteur d'observation se terminant par `.sum` et `.count` lors de l'envoi de compartiments d'histogramme en tant que métriques de distribution Datadog. Cela active implicitement l'option `histogram_buckets_as_distributions`. |

**Remarque** : tous les paramètres, à l'exception de `send_distribution_buckets` et `send_distribution_counts_as_monotonic`, sont pris en charge à la fois par le check OpenMetrics et le check Prometheus.

## Mise en route {#getting-started}

### Collecte simple de métriques {#simple-metric-collection}

Pour commencer à collecter les métriques exposées par Prometheus, suivez ces étapes :

1. Suivez la documentation [Prometheus Getting Started][11] pour démarrer une version locale de Prometheus qui se surveille elle-même.

2. [Installez le Datadog Agent pour votre plateforme][6].

3. Modifiez le fichier `openmetrics.d/conf.yaml` dans le dossier `conf.d/` à la racine de votre [répertoire de configuration de l'Agent][8] avec le contenu suivant :

    ```yaml
    init_config:

    instances:
        - openmetrics_endpoint: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Redémarrez l'Agent][12].

5. Accédez à votre page [Metrics Catalog][13] pour voir les métriques collectées : `prometheus_target_interval_length_seconds*`

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Métrique Prometheus collectée">}}

## De l'intégration personnalisée à l'intégration officielle {#from-custom-to-official-integration}

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques personnalisées. Si vous surveillez un logiciel prêt à l'emploi et pensez qu'il mérite une intégration officielle, n'hésitez pas à [contribuer][5] !

Les Integrations officielles disposent de leurs propres répertoires dédiés. Le check générique dispose d'un mécanisme d'instance par défaut permettant de coder en dur la configuration par défaut et les métadonnées des métriques. Par exemple, consultez l'intégration [kube-proxy][14].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/extend/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /fr/getting_started/tagging/
[8]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/catalog
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /fr/metrics/distributions/