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
- https://github.com/DataDog/integrations-extras/blob/master/php_apcu/README.md
display_name: PHP APCu
draft: false
git_integration_title: php_apcu
guid: d6b2f21e-8a91-4c5a-98c3-647af53065b7
integration_id: php-apcu
integration_title: PHP APCu
integration_version: 0.0.2
is_public: true
custom_kind: integration
maintainer: noname@withgod.jp
manifest_version: 1.0.0
metric_prefix: php_apcu.
metric_to_check: php_apcu.cache.mem_size
name: php_apcu
public_title: Intégration Datadog/PHP APCu
short_description: Surveillez la mise en cache des données en mémoire PHP APCu.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [PHP APCu][1] avec l'Agent Datadog.

## Configuration

Le check PHP APCu n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Installation

Pour l'Agent v7.21+/6.21+, suivez les instructions ci-dessous afin d'installer le check PHP APCu sur votre host. Consultez la section [Utiliser les intégrations de la communauté][3] pour effectuer une installation avec l'Agent Docker ou avec des versions antérieures de l'Agent.

1. Exécutez la commande suivante pour installer l'intégration de l'Agent :

   ```shell
   datadog-agent integration install -t datadog-php_apcu==<INTEGRATION_VERSION>
   ```

2. Configurez votre intégration comme une [intégration][4] de base.

#### APCu

Puisqu'APCu n'expose pas les métriques par défaut, cette intégration inclut un outil d'exportation de métriques, qui se trouve à l'emplacement suivant :

```
/opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
```

Lorsque vous [configurez](#configuration) votre Agent, appelez l'outil d'exportation en utilisant directement ce nom de fichier, ou configurez un alias pour celui-ci sur votre serveur Web. SI vous utilisez Apache, voici un exemple d'alias dans le fichier de configuration du serveur Web :

```
Alias /apcu-status /opt/datadog-agent/embedded/lib/python3.8/site-packages/datadog_checks/php_apcu/assets/exporter/apcu-dd-handler.php
<Location /apcu-status>
    Require all denied
    Require local
</Location>
```

### Procédure à suivre

1. Modifiez le fichier `php_apcu.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance `php_apcu`. Consultez le [fichier d'exemple `php_apcu.d/conf.yaml`][5] pour découvrir toutes les options de configuration disponibles.
    ```
    instances
      - url: http://localhost/apcu-status
    ```

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `php_apcu` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "php_apcu" >}}


### Événements

L'intégration PHP APCu n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "php_apcu" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.php.net/manual/en/book.apcu.php
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/use-community-integrations/
[4]: https://docs.datadoghq.com/fr/getting_started/integrations/
[5]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/datadog_checks/php_apcu/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/php_apcu/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/