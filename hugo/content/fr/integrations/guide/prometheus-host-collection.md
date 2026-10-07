---
title: Collecte de métriques Prometheus et OpenMetrics à partir d'un host
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
  - link: developers/prometheus
    tag: Documentation
    text: Écrire votre propre check Prometheus custom
---
Recueillez vos métriques Prometheus et OpenMetrics exposées à partir de votre application exécutée sur vos hosts à l'aide de l'Agent Datadog et de l'intégration [Datadog/OpenMetrics][1] ou [Datadog/Prometheus][2].

## Présentation

Depuis la version 6.5.0, l'Agent inclut des checks [OpenMetrics][3] et [Prometheus][4] capables de scraper les endpoints Prometheus. Nous vous conseillons d'utiliser le check OpenMetrics du fait de son efficacité accrue et de sa prise en charge complète du format texte Prometheus. Pour en savoir plus sur l'utilisation avancée de l'interface `OpenMetricsCheck` et le développement d'un check custom, consultez la section [Outils de développement][5]. N'utilisez le check Prometheus que lorsque l'endpoint de métriques ne prend pas en charge un format texte.

Cette page décrit les principes d'utilisation de base de ces checks. Ils vous permettent d'importer toutes vos métriques Prometheus exposées dans Datadog.

## Configuration

### Installation

[Installez l'Agent Datadog sur votre système d'exploitation][6]. Les checks Prometheus et OpenMetrics sont inclus dans le paquet de l'[Agent Datadog][7] : vous n'avez donc rien d'autre à installer sur vos conteneurs ou vos hosts.

### Configuration

Pour recueillir vos métriques exposées :

1. Modifiez le fichier `openmetrics.d/conf.yaml` dans le dossier`conf.d/` à la racine du [répertoire de configuration de votre Agent][8]. Consultez le [fichier d'exemple openmetrics.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles. Voici la configuration minimale requise pour activer l'intégration :

    ```yaml
    init_config:

    instances:
        - prometheus_url: 'localhost:<PORT>/<ENDPOINT>'
          namespace: '<NAMESPACE>'
          metrics:
              - '<METRIC_TO_FETCH>': '<DATADOG_METRIC_NAME>'
    ```

     Les placeholders à configurer sont les suivants :

    | Placeholder             | Description                                                                                                                                                                                                            |
    | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `<PORT>`                | Le port auquel se connecter afin d'accéder à l'endpoint Prometheus.                                                                                                                                                       |
    | `<ENDPOINT>`            | L'URL pour les métriques fournies par le conteneur, au format Prometheus.                                                                                                                                                     |
    | `<NAMESPACE>`           | L'espace de nommage spécifié ici sera ajouté comme préfixe à chaque métrique lors de son affichage dans Datadog.                                                                                                                                                    |
    | `<METRIC_TO_FETCH>`     | La clé de métrique Prometheus à récupérer à partir de l'endpoint Prometheus.                                                                                                                                                    |
    | `<DATADOG_METRIC_NAME>` | Lorsque ce paramètre facultatif est défini, la clé de métrique `<METRIC_TO_FETCH>` est remplacée par `<DATADOG_METRIC_NAME>` dans Datadog. <br>Si vous choisissez de ne pas utiliser cette option, passez une liste de chaînes plutôt que des paires `key:value`. |

2. [Redémarrez l'Agent][10] pour commencer à recueillir vos métriques.

### Paramètres disponibles

Voici la liste complète des paramètres disponibles pour vos `instances` :

| Nom                                    | Type                                    | Nécessité | Valeur par défaut | Description                                                                                                                                                                                                                                                          |
| --------------------------------------- | --------------------------------------- | --------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prometheus_url`                        | chaîne                                  | obligatoire  | aucune          | L'URL sur laquelle les métriques de votre application sont exposées par Prometheus/OpenMetrics.                                                                                                                                                                                        |
| `namespace`                             | chaîne                                  | obligatoire  | aucune          | L'espace de nommage à ajouter avant tous les espaces de nommage des métriques. Vos métriques sont recueillies en respectant le format suivant : `espacedenommage.nom_métrique`.                                                                                                                                          |
| `metrics`                               | liste de chaînes ou d'éléments `key:value` | obligatoire  | aucune          | Une liste de paires `<METRIC_TO_FETCH>: <NEW_METRIC_NAME>` pour les métriques à récupérer à partir de l'endpoint Prometheus.<br> `<NEW_METRIC_NAME>` est une option facultative. Lorsqu'elle est définie, elle est utilisée comme nom dans Datadog. Cette liste doit contenir au moins une métrique.                            |
| `prometheus_metrics_prefix`             | chaîne                                  | facultatif  | aucune          | Le préfixe pour les métriques Prometheus/OpenMetrics exposées.                                                                                                                                                                                                                   |
| `health_service_check`                  | booléen                                 | facultatif  | true          | Envoie un check de service concernant la santé de l'endpoint Prometheus. Le check s'appelle `<NAMESPACE>.prometheus.health`.                                                                                                                                         |
| `label_to_hostname`                     | chaîne                                  | facultatif  | aucune          | Remplace le hostname par la valeur d'une étiquette.                                                                                                                                                                                                                   |
| `label_joins`                           | objet                                  | facultatif  | aucune          | Ce paramètre vous permet de cibler une métrique et de récupérer son étiquette à l'aide d'un mappage individuel.                                                                                                                                                                               |
| `labels_mapper`                         | liste d'éléments key:value               | facultatif  | aucune          | Ce paramètre vous permet de renommer certaines étiquettes. Format : `<ÉTIQUETTE_À_RENOMMER>:<NOUVEAU_NOM_ÉTIQUETTE>`.                                                                                                                                                                    |
| `type_overrides`                        | liste d'éléments key:value               | facultatif  | aucune          | Ce paramètre vous permet de remplacer un type dans la charge utile Prometheus ou d'attribuer un type à une métrique qui n'en possède pas (ces métriques sont ignorées par défaut). <br> Les types de métriques pris en charge sont `gauge`, `monotonic_count`, `histogram` et `summary`.                                             |
| `tags`                                  | liste d'éléments key:value               | facultatif  | aucune          | La liste de tags à appliquer à chaque métrique, événement ou check de service provenant de cette intégration.<br> [En savoir plus sur le tagging][5].                                                                                                                                     |
| `send_distribution_buckets`             | booléen                                 | facultatif  | false         | Définissez `send_distribution_buckets` sur `true` pour envoyer et convertir les histogrammes d'OpenMetrics en [métriques de distribution][15]. <br>`send_histograms_buckets` doit être défini sur `true` (valeur par défaut).                                                                              |
| `send_distribution_counts_as_monotonic` | booléen                                 | facultatif  | false         | Définissez `send_distribution_counts_as_monotonic` sur `true` pour envoyer les counts des métriques histogram/summary OpenMetrics en tant que counts monotones.                                                                                                                                              |
| `send_histograms_buckets`               | booléen                                 | facultatif  | true          | Définissez `send_histograms_buckets` sur `true` pour envoyer le compartiment des histograms.                                                                                                                                                                                               |
| `send_monotonic_counter`                | booléen                                 | facultatif  | true          | Pour envoyer des counts en tant que counts monotones, consultez [le ticket à ce sujet sur GitHub][9].                                                                                                                                                                                             |
| `exclude_labels`                        | liste de chaînes                          | facultatif  | aucune          | La liste des étiquettes à exclure.                                                                                                                                                                                                                                       |
| `ssl_cert`                              | chaîne                                  | facultatif  | aucune          | Si votre endpoint Prometheus est sécurisé, vous pouvez le configurer de deux façons :<br> en spécifiant le chemin vers le certificat uniquement, auquel cas vous devrez préciser la clé privée ; ou en spécifiant le chemin vers un fichier contenant à la fois le certificat et la clé privée. |
| `ssl_private_key`                       | chaîne                                  | facultatif  | aucune          | Ce paramètre est requis si le certificat n'inclut pas la clé privée.<br> **ATTENTION** : la clé privée de votre certificat local ne doit pas être chiffrée.                                                                                                                          |
| `ssl_ca_cert`                           | chaîne                                  | facultatif  | aucune          | Le chemin vers l'autorité de certification de confiance utilisée pour générer les certificats personnalisés.                                                                                                                                                                                                  |
| `prometheus_timeout`                    | nombre entier                                 | facultatif  | 10            | Permet de définir un délai d'expiration en secondes pour la requête Prometheus/OpenMetrics.                                                                                                                                                                                                       |
| `max_returned_metrics`                  | nombre entier                                 | facultatif  | 2000          | Le check se limite à 2 000 métriques par défaut. Revoyez cette limite à la hausse si besoin.                                                                                                                                                                                   |
| `bearer_token_auth`                     | booléen                                 | facultatif  | false         | Définissez `bearer_token_auth` sur `true` pour ajouter un en-tête d'authentification de bearer token. **Remarque** : si `bearer_token_path` n'est pas défini, `/var/run/secrets/kubernetes.io/serviceaccount/token` est utilisé en tant que chemin par défaut.                                                       |
| `bearer_token_path`                     | chaîne                                  | facultatif  | aucune          | Le chemin vers un fichier bearer token de compte de service Kubernetes (assurez-vous que le fichier existe et qu'il est monté correctement). **Remarque** : définissez `bearer_token_auth` sur `true` pour activer l'ajout du token aux en-têtes HTTP pour l'authentification.                                          |

**Remarque** : à l'exception de `send_distribution_buckets` et de `send_distribution_counts_as_monotonic`, tous les paramètres sont pris en charge aussi bien par le check OpenMetrics que par le check Prometheus.

## Prise en main

### Collecte de métriques simple

Pour commencer à recueillir des métriques exposées par Prometheus, suivez les étapes ci-dessous :

1. Référez-vous à la section [Getting Started de la documentation Prometheus][11] (en anglais) pour exécuter une version locale de Prometheus capable de se surveiller elle-même.

2. [Installez l'Agent Datadog pour votre plateforme][6].

3. Modifiez le fichier `openmetrics.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][8] en ajoutant le contenu suivant :

    ```yaml
    init_config:

    instances:
        - prometheus_url: http://localhost:9090/metrics
          namespace: 'documentation_example'
          metrics:
              - promhttp_metric_handler_requests_total: prometheus.handler.requests.total
    ```

4. [Redémarrez l'Agent][12].

5. Accédez à votre [page Metric summary][13] pour visualiser les métriques recueillies : `prometheus_target_interval_length_seconds*`.

    {{< img src="integrations/guide/prometheus_host/prometheus_collected_metric_host.png" alt="Métrique Prometheus recueillie">}}

## Proposer une intégration personnalisée comme intégration officielle

Par défaut, toutes les métriques récupérées par le check Prometheus générique sont considérées comme des métriques custom. Si vous surveillez un logiciel prêt à l'emploi et que vous pensez qu'il mérite une intégration officielle, n'hésitez pas à apporter votre [contribution][5] !

Les intégrations officielles utilisent des répertoires dédiés. Le check générique intègre un système de création d'instances qui se charge de coder en dur la configuration par défaut et les métadonnées des métriques. Reportez-vous au référentiel sur l'intégration [kube-proxy][14] pour obtenir un exemple.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/openmetrics/
[2]: /fr/integrations/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/openmetrics
[4]: https://github.com/DataDog/integrations-core/tree/master/prometheus
[5]: /fr/developers/custom_checks/prometheus/
[6]: https://app.datadoghq.com/account/settings#agent
[7]: /fr/getting_started/tagging/
[8]: /fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[9]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[10]: /fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://prometheus.io/docs/prometheus/latest/getting_started/
[12]: /fr/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[13]: https://app.datadoghq.com/metric/summary
[14]: https://github.com/DataDog/integrations-core/tree/master/kube_proxy
[15]: /fr/metrics/distributions/