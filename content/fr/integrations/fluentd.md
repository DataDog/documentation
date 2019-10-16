---
aliases:
  - /fr/logs/log_collection/fluentd
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/fluentd/README.md'
display_name: fluentd
git_integration_title: fluentd
guid: 68100352-b993-43e6-9dc8-5ecd498e160b
integration_id: fluentd
integration_title: FluentD
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: fluentd.
metric_to_check: fluentd.buffer_queue_length
name: fluentd
process_signatures:
  - td-agent
  - fluentd
  - ruby td-agent
public_title: Intégration Datadog/FluentD
short_description: Gérez les files d'attente de mise en mémoire tampon et le nombre de nouveaux essais pour chaque plug-in FluentD que vous avez activé. you've enabled.
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
![Dashboard Fluentd][1]

## Présentation

Obtenez des métriques de Fluentd pour :

* Visualiser les performances FluentD
* Corréler les performances de FluentD avec le reste de vos applications

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Le check FluentD est inclus avec le paquet de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur vos serveurs FluentD.

### Configuration

Modifiez le fichier `fluentd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][4] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et vos [logs](#collecte-de-logs) FluentD.
Consultez le [fichier d'exemple fluentd.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

#### Préparer Fluentd

Dans votre fichier de configuration FluentD, ajoutez une source `monitor_agent` :

```
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

#### Collecte de métriques

1. Ajoutez ce bloc de configuration à votre fichier `fluentd.d/conf.yaml` pour commencer à recueillir vos [métriques FluentD](#metriques) :

    ```yaml
      init_config:

      instances:
        - monitor_agent_url: http://localhost:24220/api/plugins.json
          #tag_by: "type" # defaults to 'plugin_id'
          #plugin_ids:    # collect metrics only on your chosen plugin_ids (optional)
          #  - plg1
          #  - plg2
    ```

    Consultez le [fichier d'exemple fluentd.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6] pour commencer à envoyer vos métriques FluentD à Datadog.

#### Collecte de logs

Vous pouvez utiliser le [plug-in FluentD de Datadog][7] pour transférer directement les logs depuis FluentD vers votre compte Datadog.

##### Ajouter des métadonnées à vos logs

Pour tirer pleinement parti de vos logs dans Datadog, vous devez pouvoir compter sur des métadonnées pertinentes (notamment, le hostname et la source). Normalement, les champs hostname et timestamp sont correctement remappés par défaut grâce au [remappage d'attributs réservés][8].

##### Tag source et tags personnalisés

Ajoutez l'attribut `ddsource` avec [le nom de l'intégration de log][9] dans vos logs afin de déclencher la [configuration automatique de l'intégration][10] dans Datadog.
Les [tags de host][11] sont automatiquement définis dans vos logs si un hostname correspondant fait partie de votre [liste d'infrastructures][12]. Utilisez l'attribut `ddtags` pour ajouter des tags personnalisés à vos logs :

Exemple de configuration :

```
  # Associer les événements avec le tag « datadog.** » et
  # les envoyer à Datadog

<match datadog.**>

  @type datadog
  @id awesome_agent
  api_key <votre_cle_api>

  # Facultatif
  include_tag_key true
  tag_key 'tag'

  # Tags facultatifs
  dd_source '<NOM_INTEGRATION>'
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'
  dd_sourcecategory '<CATÉGORIE_SOURCE>'

</match>
```

Il est possible d'utiliser des paramètres supplémentaires pour changer l'endpoint utilisé afin de passer par un proxy :

* `host` : endpoint proxy lorsque des logs ne sont pas directement transmis à Datadog (valeur par défaut : `intake.logs.datadoghq.com`).
* `port` : port proxy lorsque les logs ne sont pas directement transmis à Datadog (valeur par défaut : `10514`).
* `ssl_port` : port utilisé lorsque les logs sont transmis via une connexion TCP/SSL sécurisée à Datadog (valeur par défaut : `10516`).
* `use_ssl` : si ce paramètre est défini sur `true`, l'Agent initialise une connexion TCP/SSL sécurisée vers Datadog (valeur par défaut : `true`).

Il peut également être utilisé pour l'envoi de logs au **site européen de Datadog** en définissant :

```
<match datadog.**>

  ...
  host 'tcp-intake.logs.datadoghq.eu'
  ssl_port '443'

</match>
```

##### Tags Kubernetes et Docker

Les tags Datadog s'avèrent indispensables pour passer d'une partie du produit à une autre. De la même façon, il est crucial d'associer des métadonnées pertinentes à vos logs pour passer de la vue d'un conteneur ou de métriques de conteneur aux logs connexes.

Si vos logs contiennent un ou plusieurs des attributs suivants, ces attributs sont automatiquement ajoutés en tant que tags Datadog à vos logs :

* `kubernetes.container_image`
* `kubernetes.container_name`
* `kubernetes.namespace_name`
* `kubernetes.pod_name`
* `docker.container_id`

Bien que l'Agent Datadog recueille automatiquement les métadonnées Docker et Kubernetes, FluentD doit utiliser un plug-in pour y parvenir. Nous vous conseillons d'utiliser [fluent-plugin-kubernetes_metadata_filter][13] pour recueillir ces métadonnées.

Exemple de configuration :

```
# Recueillir les métadonnées des logs avec le tag « kubernetes.** »
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```


### Validation

[Lancez la sous-commande `status` de l'Agent][14] et cherchez `fluentd` dans la section Checks.

## Données collectées
### Métriques
{{< get-metrics-from-git "fluentd" >}}


### Événements
Le check FluentD n'inclut aucun événement.

### Checks de service

`fluentd.is_ok` :

Renvoie « Critical » si l'Agent n'est pas capable de se connecter à Fluentd pour recueillir des métriques. Il s'agit du check que la plupart des intégrations désignent comme le check `can_connect`.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][16].

## Pour aller plus loin

* [Comment surveiller FluentD avec Datadog][17]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png
[2]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: http://www.rubydoc.info/gems/fluent-plugin-datadog
[8]: https://docs.datadoghq.com/fr/logs/processing/#edit-reserved-attributes
[9]: https://docs.datadoghq.com/fr/integrations/#cat-log-collection
[10]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[11]: https://docs.datadoghq.com/fr/getting_started/tagging/assigning_tags
[12]: https://app.datadoghq.com/infrastructure
[13]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/fluentd/metadata.csv
[16]: https://docs.datadoghq.com/fr/help
[17]: https://www.datadoghq.com/blog/monitor-fluentd-datadog


{{< get-dependencies >}}