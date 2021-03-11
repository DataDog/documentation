---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    '[php_apcu] Cache Full has been detected': assets/monitors/php-apcu_expunges.json
    '[php_apcu] Detected High Cache Usage': assets/monitors/php-apcu_high_usage.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - ''
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md'
display_name: "PHP\_APCu"
draft: true
git_integration_title: php_apcu
guid: d6b2f21e-8a91-4c5a-98c3-647af53065b7
integration_id: php-apcu
integration_title: "PHP\_APCu"
is_public: false
kind: integration
maintainer: noname@withgod.jp
manifest_version: 1.0.0
metric_prefix: php_apcu.
metric_to_check: php_apcu.cache.mem_size
name: php_apcu
public_title: "Intégration Datadog/PHP\_APCu"
short_description: "Surveillez la mise en cache des données en mémoire PHP\_APCu."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [PHP APCu][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Si vous utilisez la version 6.8 ou une version ultérieure de l'Agent, suivez les instructions ci-dessous pour installer le check `php_apcu` sur votre host. Consultez le guide relatif à l'[installation d'intégrations développées par la communauté][3] pour installer des checks avec une [version < 6.8 de l'Agent][4] ou avec l'[Agent Docker][5] :

1. [Téléchargez l'Agent Datadog][6].

2. Exécutez la commande suivante pour installer le wheel de l'intégration à l'aide de l'Agent :

   ```shell
      datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

3. Configurez votre intégration comme [n'importe quelle autre intégration fournie avec l'Agent][7].


#### Configuration d'APCu


Puisqu'APCu n'expose pas les métriques par défaut, cette intégration inclut un outil d'exportation de métriques, qui se trouve à l'emplacement suivant :

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```
Vous pouvez télécharger [ici][5] l'outil d'exportation.

Lorsque vous configurez votre Agent (avec le paramètre `instances` décrit ci-dessous), vous pouvez appeler l'outil d'exportation en utilisant directement ce nom de fichier. Il est également possible de configurer un alias pour celui-ci sur votre serveur Web. SI vous utilisez Apache, voici un exemple d'alias dans le fichier de configuration du serveur Web :

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### Configuration

1. Modifiez le fichier `php_apcu.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance `php_apcu`. Consultez le [fichier d'exemple `php_apcu.d/conf.yaml`][8] pour découvrir toutes les options de configuration disponibles.
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Redémarrez l'Agent][9].

### Validation

[Lancez la sous-commande status de l'Agent][10] et cherchez `php_apcu` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "php_apcu" >}}


### Checks de service

`php_apcu` n'inclut aucun check de service.

### Événements

`php_apcu` n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][12].

[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[5]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[6]: https://app.datadoghq.com/account/settings#agent
[7]: https://docs.datadoghq.com/fr/getting_started/integrations/
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[9]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[12]: https://docs.datadoghq.com/fr/help/