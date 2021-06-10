---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[php_opcache] Cache Full has been detected': assets/monitors/php-opcache_expunges.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/php_opcache/README.md'
display_name: "PHP\_OPcache"
draft: false
git_integration_title: php_opcache
guid: 323518fd-be8d-4b5e-b35d-829107a1c416
integration_id: php-opcache
integration_title: "PHP\_OPcache"
is_public: true
kind: integration
maintainer: noname@withgod.jp
manifest_version: 1.0.0
metric_prefix: php_opcache.
metric_to_check: php_opcache.memory_usage.used_memory
name: php_opcache
public_title: "Intégration Datadog/PHP\_OPcache"
short_description: "Surveillez le système de cache du bytecode PHP\_OPcache."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [PHP OPcache][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Pour installer le check `php_opcache` sur votre host :


1. Installez le [kit de développement][3].
 sur n'importe quelle machine.

2. Exécutez `ddev release build php_opcache` pour générer le package.

3. [Téléchargez l'Agent Datadog][4].

4. Importez l'artefact du build sur tous les hosts avec un Agent et
 exécutez `datadog-agent integration install -w
 chemin/vers/php_opcache/dist/<NOM_ARTEFACT>.whl`.

#### Configuration d'OPcache


Puisqu'OPcache n'expose pas les métriques par défaut, cette intégration inclut un outil d'exportation de métriques, qui se trouve à l'emplacement suivant :

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
```
Vous pouvez télécharger [ici][5] l'outil d'exportation.

Lorsque vous configurez votre Agent (avec le paramètre `instances` décrit ci-dessous), vous pouvez appeler l'outil d'exportation en utilisant directement ce nom de fichier. Il est également possible de configurer un alias pour celui-ci sur votre serveur Web. SI vous utilisez Apache, voici un exemple d'alias dans le fichier de configuration du serveur Web :

```
Alias /opcache-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
<Location /opcache-status>
    Require all denied
    Require local
</Location>
```

### Configuration

1. Modifiez le fichier `php_opcache.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance `php_opcache`. Consultez le [fichier d'exemple `php_opcache.d/conf.yaml`][6] pour découvrir toutes les options de configuration disponibles.
    ```
    instances
      - url: http://localhost/opcache-status
    ```
2. [Redémarrez l'Agent][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `php_opcache` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "php_opcache" >}}


### Checks de service

`php_opcache` n'inclut aucun check de service.

### Événements

`php_opcache` n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://www.php.net/manual/en/book.opcache.php
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/developers/integrations/new_check_howto/#developer-toolkit
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/assets/exporter/opcache-dd-handler.php
[6]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/datadog_checks/php_opcache/data/conf.yaml.example
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_opcache/metadata.csv
[10]: https://docs.datadoghq.com/fr/help/