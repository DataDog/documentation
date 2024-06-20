---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- web
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/resin/README.md
display_name: Resin
draft: false
git_integration_title: resin
guid: f7b4c3db-5e56-4ab7-bef7-9d4a347daaee
integration_id: resin
integration_title: Resin
integration_version: 1.0.0
is_public: true
custom_kind: integration
maintainer: brent@bmontague.com
manifest_version: 1.0.0
metric_prefix: resin.
metric_to_check: resin.thread_pool.thread_count
name: resin
public_title: Intégration Datadog/Resin
short_description: Surveillez les paramètres de pool de threads et de connexions dans
  Resin
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller [Resin][1] avec l'Agent Datadog.

## Configuration

### Installation

Le check Resin n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer.

### Configuration

1. Configurez le [serveur par défaut de Resin][3] pour activer JMX en ajoutant les arguments JVM suivants :

```
<server-default>
  <jvm-arg>-Dcom.sun.management.jmxremote</jvm-arg>
  <jvm-arg>-Dcom.sun.management.jmxremote.port=7199</jvm-arg>
</server-default>
```

2. Modifiez le fichier `resin.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Resin. Consultez le [fichier d'exemple resin.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `resin` dans la section Checks.

### Collecte de logs

Sur les plateformes Linux, l'activation de la collecte de logs pour l'Agent Datadog se fait dans `/etc/datadog-agent/datadog.yaml`. Sur les autres plateformes, consultez la [section Fichiers de configuration de l'Agent][6] pour connaître l'emplacement de votre fichier de configuration :

```yaml
logs_enabled: true
```

- Activez ce bloc de configuration dans votre fichier `resin.d/conf.yaml` pour commencer à recueillir vos logs :
    ```yaml
    logs:
      - type: file
        path: /var/opt/resin/log/*.log
        source: resin
    ```

## Données collectées

### Métriques
{{< get-metrics-from-git "resin" >}}


### Événements

Resin n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "resin" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].


[1]: https://caucho.com/
[2]: https://github.com/DataDog/integrations-extras/blob/master/resin/datadog_checks/resin/data/conf.yaml.example
[3]: https://www.caucho.com/resin-4.0/admin/cluster-server.xtp#JVMparameters:settingtheJVMcommandline
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/
[7]: https://github.com/DataDog/integrations-extras/blob/master/resin/metadata.csv
[8]: https://github.com/DataDog/integrations-extras/blob/master/resin/assets/service_checks.json
[9]: https://docs.datadoghq.com/fr/help/