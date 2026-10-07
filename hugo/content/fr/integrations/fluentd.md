---
aliases:
- /fr/logs/log_collection/fluentd
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    fluentd: assets/dashboards/fluentd_dashboard.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    fluentd_processes: assets/saved_views/fluentd_processes.json
  service_checks: assets/service_checks.json
categories:
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/fluentd/README.md
display_name: fluentd
draft: false
git_integration_title: fluentd
guid: 68100352-b993-43e6-9dc8-5ecd498e160b
integration_id: fluentd
integration_title: FluentD
integration_version: 2.1.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: fluentd.
metric_to_check: fluentd.buffer_queue_length
name: fluentd
process_signatures:
- td-agent
- fluentd
- ruby td-agent
public_title: Intégration Datadog/Fluentd
short_description: Gérez les files d'attente de mise en mémoire tampon et le nombre
  de nouvelles tentatives pour chaque plug-in Fluentd que vous avez activé.
support: core
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Fluentd][1]

## Présentation

Obtenez des métriques de Fluentd pour :

- Visualiser les performances Fluentd
- Corréler les performances de Fluentd avec le reste de vos applications

## Configuration

### Installation

Le check Fluentd est inclus avec le package de l'[Agent Datadog][2] : vous n'avez donc rien d'autre à installer sur vos serveurs FluentD.

#### Préparer Fluentd

Dans votre fichier de configuration Fluentd, ajoutez une source `monitor_agent` :

```text
<source>
  @type monitor_agent
  bind 0.0.0.0
  port 24220
</source>
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `fluentd.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos [métriques Fluentd](#metriques). Consultez le [fichier d'exemple fluentd.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

   ```yaml
   init_config:

   instances:
     ## @param monitor_agent_url - string - required
     ## Monitor Agent URL to connect to.
     #
     - monitor_agent_url: http://example.com:24220/api/plugins.json
   ```

2. [Redémarrez l'Agent][3].

##### Collecte de logs

Vous pouvez utiliser le [plug-in FluentD de Datadog][4] pour transférer directement les logs depuis Fluentd vers votre compte Datadog.

###### Ajouter des métadonnées à vos logs

Pour tirer pleinement parti de vos logs dans Datadog, vous devez pouvoir compter sur des métadonnées pertinentes (notamment, le hostname et la source). Normalement, les champs hostname et timestamp sont correctement remappés par défaut grâce au [remappage d'attributs réservés][5].

###### Tag source et tags personnalisés

Ajoutez l'attribut `ddsource` avec [le nom de l'intégration de logs][6] dans vos logs afin de déclencher la [configuration automatique de l'intégration][7] dans Datadog.
Les [tags host][8] sont automatiquement définis dans vos logs si un hostname correspond à une entrée de votre [liste des infrastructures][9]. Utilisez l'attribut `ddtags` pour ajouter des tags personnalisés à vos logs :

Exemple de configuration :

```conf
  # Associer les événements avec le tag "datadog.**" et
  # les envoyer à Datadog

<match datadog.**>
  @type datadog
  @id awesome_agent
  api_key <votre_clé_api>

  # Facultatif
  include_tag_key true
  tag_key 'tag'

  # Tags facultatifs
  dd_source '<NOM_INTÉGRATION>'
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'

  <buffer>
          @type memory
          flush_thread_count 4
          flush_interval 3s
          chunk_limit_size 5m
          chunk_limit_records 500
  </buffer>
</match>
```

Par défaut, le plug-in est configuré de façon à envoyer des logs via HTTPS (port 443) à l'aide de la compression gzip.
Vous pouvez modifier ce comportement avec les paramètres suivants :

- `use_http` : définissez ce paramètre sur `false` pour utiliser la connexion TCP. Vous devez modifier les paramètres `host` et `port` en conséquence. Valeur par défaut : `true`.
- `use_compression` : la compression est uniquement disponible pour les transmissions HTTP. Définissez ce paramètre sur `false` pour la désactiver. Valeur par défaut : `true`.
- `compression_level` : définissez le niveau de compression via HTTP. Choisissez une valeur entre 1 (ratio le plus faible) et 9 (ratio le plus élevé). Valeur par défaut : `6`.

Il est possible d'utiliser des paramètres supplémentaires pour changer l'endpoint utilisé afin de passer par un proxy :

- `host` : l'endpoint proxy pour les logs qui ne sont pas directement transmis à Datadog. Valeur par défaut :  `http-intake.logs.datadoghq.com`.
- `port` : le port proxy pour les logs qui ne sont pas directement transmis à Datadog. Valeur par défaut : `80`.
- `ssl_port` : le port utilisé pour les logs transmis via une connexion TCP/SSL sécurisée à Datadog. Valeur par défaut : `443`.
- `use_ssl` : indique à l'Agent d'initialiser une connexion TCP/SSL sécurisée vers Datadog. Valeur par défaut : `true`.
- `no_ssl_validation` : désactive la validation du hostname SSL. Valeur par défaut : `false`.

**Remarque** : définissez `host` et `port` sur votre région {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
<match datadog.**>

  #...
  host 'http-intake.logs.datadoghq.eu'

</match>
```

###### Tags Kubernetes et Docker

Les tags Datadog s'avèrent indispensables pour passer d'une partie du produit à une autre. De la même façon, il est crucial d'associer des métadonnées pertinentes à vos logs pour passer de la vue d'un conteneur ou de métriques de conteneur aux logs connexes.

Si vos logs contiennent un ou plusieurs des attributs suivants, ces attributs sont automatiquement ajoutés en tant que tags Datadog à vos logs :

- `kubernetes.container_image`
- `kubernetes.container_name`
- `kubernetes.namespace_name`
- `kubernetes.pod_name`
- `docker.container_id`

Bien que l'Agent Datadog recueille automatiquement les métadonnées Docker et Kubernetes, FluentD doit utiliser un plug-in pour y parvenir. Datadog vous conseille d'utiliser [fluent-plugin-kubernetes_metadata_filter][10] pour recueillir ces métadonnées.

Exemple de configuration :

```conf
# Recueillir les métadonnées des logs avec le tag "kubernetes.**"
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/fluentd/datadog_checks/fluentd/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/fluent-plugin-datadog
[5]: https://docs.datadoghq.com/fr/logs/processing/#edit-reserved-attributes
[6]: https://docs.datadoghq.com/fr/integrations/#cat-log-collection
[7]: https://docs.datadoghq.com/fr/logs/processing/#integration-pipelines
[8]: https://docs.datadoghq.com/fr/getting_started/tagging/assigning_tags/
[9]: https://app.datadoghq.com/infrastructure
[10]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `fluentd`                                                         |
| `<CONFIG_INIT>`      | vide ou `{}`                                                     |
| `<CONFIG_INSTANCE>`  | `{"monitor_agent_url": "http://%%host%%:24220/api/plugins.json"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][3] et cherchez `fluentd` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "fluentd" >}}


### Événements

Le check Fluentd n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "fluentd" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

- [Comment surveiller FluentD avec Datadog][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/fluentd/images/snapshot-fluentd.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitor-fluentd-datadog