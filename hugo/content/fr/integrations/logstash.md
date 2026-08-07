---
aliases:
  - /fr/logs/log_collection/logstash
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/logstash/README.md'
display_name: Logstash
draft: false
git_integration_title: logstash
guid: 9d110885-cbdf-44e5-83b8-7a6514724e98
integration_id: logstash
integration_title: Logstash
is_public: true
custom_kind: integration
maintainer: ervansetiawan@gmail.com
manifest_version: 1.0.0
metric_prefix: logstash.
metric_to_check: logstash.process.cpu.percent
name: logstash
public_title: Intégration Datadog/Logstash
short_description: Surveiller et recueillir des métriques runtime à partir d'une instance Logstash
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Recueillez des métriques du service Logstash en temps réel pour :

- Visualiser et surveiller les états de Logstash
- Être informé des événements Logstash

## Configuration

Le check Logstash n'est **PAS** inclus avec le package de l'[Agent Datadog][1].

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check Logstash sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][2] pour installer des checks avec une [version < 6.8 de l'Agent][3] ou avec l'[Agent Docker][4] :

1. [Téléchargez et lancez l'Agent Datadog][1].
2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-logstash==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][5].

### Configuration

1. Modifiez le fichier `logstash.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour commencer à recueillir vos [métriques](#collecte-de-metriques) et vos [logs](#collecte-de-logs) Logstash. Consultez le [fichier d'exemple logstash.d/conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][8].

#### Collecte de métriques

Ajoutez cette configuration à votre fichier `conf.yaml` pour commencer à recueillir vos [métriques Logstash](#metriques) :

```yaml
init_config:

instances:
  # L'URL sur laquelle Logstash fournit son API de surveillance.
  # Celle-ci sera utilisée pour récupérer diverses métriques runtime concernant Logstash.
  #
  - url: http://localhost:9600
```

Configurez-la de façon à spécifier votre serveur et votre port.

Consultez le [fichier d'exemple conf.yaml][7] pour découvrir toutes les options de configuration disponibles.

Enfin, [redémarrez l'Agent][9] pour commencer à envoyer vos métriques Logstash à Datadog.

#### Collecte de logs

Datadog possède [un plug-in de sortie][10] pour Logstash qui s'occupe d'envoyer vos logs à votre plateforme Datadog.

Pour installer ce plug-in, exécutez la commande suivante :

- `logstash-plugin install logstash-output-datadog_logs`

Configurez ensuite le plug-in `datadog_logs` avec votre [clé d'API Datadog][11] :

```conf
output {
    datadog_logs {
        api_key => "<CLÉ_API_DATADOG>"
    }
}
```

Par défaut, le plug-in est configuré de façon à envoyer des logs via HTTPS (port 443) à l'aide de la compression gzip.
Vous pouvez modifier ce comportement avec les paramètres suivants :

- `use_http` : définissez ce paramètre sur `false` pour utiliser la connexion TCP. Vous devez modifier les paramètres `host` et `port` en conséquence. Valeur par défaut : `true`.
- `use_compression` : la compression est uniquement disponible pour les transmissions HTTP. Définissez ce paramètre sur `false` pour la désactiver. Valeur par défaut : `true`.
- `compression_level` : définissez le niveau de compression via HTTP. Choisissez une valeur entre 1 (ratio le plus faible) et 9 (ratio le plus élevé). Valeur par défaut : `6`.

Il est possible d'utiliser des paramètres supplémentaires pour changer l'endpoint utilisé afin de passer par un [proxy][12] :

- `host` : l'endpoint proxy pour les logs qui ne sont pas directement transmis à Datadog. Valeur par défaut :  `http-intake.logs.datadoghq.com`.
- `port` : le port proxy pour les logs qui ne sont pas directement transmis à Datadog. Valeur par défaut : `80`.
- `ssl_port` : le port utilisé pour les logs transmis via une connexion TCP/SSL sécurisée à Datadog. Valeur par défaut : `443`.
- `use_ssl` : indique à l'Agent d'initialiser une connexion TCP/SSL sécurisée vers Datadog. Valeur par défaut : `true`.
- `no_ssl_validation` : désactive la validation du hostname SSL. Valeur par défaut : `false`.

**Remarque** : définissez `host` et `port` sur votre région {{< region-param key="http_endpoint" code="true" >}} {{< region-param key="http_port" code="true" >}}.

```conf
output {
   datadog_logs {
       api_key => "<CLÉ_API_DATADOG>"
       host => "http-intake.logs.datadoghq.eu"
   }
}
```

##### Ajouter des métadonnées à vos logs

Pour tirer pleinement parti de vos logs dans Datadog, il est important de leur associer les métadonnées appropriées, y compris le hostname et la source. Par défaut, le hostname et le timestamp sont normalement remappés comme il se doit grâce au processus de [remappage pour les attributs réservés][13] de Datadog. Pour vous assurer que le service est correctement remappé, ajoutez la valeur de son attribut à la liste de remappage du service.

##### Source

Configurez un filtre Logstash pour définir la source (nom d'intégration Datadog) sur vos logs. 

```conf
filter {
  mutate {
    add_field => {
 "ddsource" => "<MA_VALEUR_SOURCE>"
       }
    }
 }
```

Cela déclenche la [configuration automatique de l'intégration][14] dans Datadog.

##### Custom tags

Les [tags de host][15] sont automatiquement appliqués à vos logs s'il existe un hostname correspondant dans votre [liste d'infrastructures][16]. Utilisez l'attribut `ddtags` pour ajouter des tags personnalisés à vos logs :

```conf
filter {
  mutate {
    add_field => {
        "ddtags" => "env:test,<KEY:VALUE>"
       }
    }
 }
```

### Validation

[Lancez la sous-commande `status` de l'Agent][17] et cherchez `logstash` dans la section Checks.

## Compatibilité

Le check Logstash est compatible avec les versions 5.x, 6.x et 7.x de Logstash. Il prend également en charge les nouvelles métriques multipipeline ajoutées dans la version 6.0. Ce check a été testé avec les versions 5.6.15, 6.3.0 et 7.0.0 de Logstash.

## Données collectées

### Métriques
{{< get-metrics-from-git "logstash" >}}


### Événements

Le check Logstash n'inclut aucun événement.

### Checks de service

`logstash.can_connect` :

Renvoie `Critical` si l'Agent ne parvient pas à se connecter à Logstash pour recueillir des métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

### Connexion de l'Agent impossible

```text
    logstash
    -------
      - instance #0 [ERROR]: "('Connection aborted.', error(111, 'Connection refused'))"
      - Collected 0 metrics, 0 events & 1 service check
```

Vérifiez que le paramètre `url` dans `conf.yaml` est correctement configuré.

Si vous avez besoin d'aide supplémentaire, contactez [l'assistance Datadog][19].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/fr/getting_started/integrations/
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/logstash/datadog_checks/logstash/data/conf.yaml.example
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/fr/agent/faq/agent-commands/#start-stop-restart-the-agent
[10]: https://github.com/DataDog/logstash-output-datadog_logs
[11]: https://app.datadoghq.com/account/settings#api
[12]: https://docs.datadoghq.com/fr/agent/proxy/#proxy-for-logs
[13]: /fr/logs/#edit-reserved-attributes
[14]: /fr/logs/processing/#integration-pipelines
[15]: /fr/getting_started/tagging/assigning_tags
[16]: https://app.datadoghq.com/infrastructure
[17]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#service-status
[18]: https://github.com/DataDog/integrations-extras/blob/master/logstash/metadata.csv
[19]: http://docs.datadoghq.com/help