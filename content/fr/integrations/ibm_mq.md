---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    IBM MQ: assets/dashboards/overview.json
  logs:
    source: ibm_mq
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - messaging
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ibm_mq/README.md'
display_name: "IBM\_MQ"
draft: false
git_integration_title: ibm_mq
guid: 873153b6-5184-438a-8a32-1e2d2e490dde
integration_id: ibm-mq
integration_title: "IBM\_MQ"
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ibm_mq.
metric_to_check: ibm_mq.queue.usage
name: ibm_mq
public_title: "Intégration Datadog/IBM\_MQ"
short_description: "IBM\_MQ est un système de gestion de file d'attente de messages."
support: core
supported_os:
  - linux
  - mac_os
---
## Présentation

Ce check surveille [IBM MQ][1], versions 5 à 9.0.

## Configuration

### Installation

Le check IBM MQ est inclus avec le package de l'[Agent Datadog][2].

Pour utiliser le check IBM MQ, vous devez :

1. Vous assurer que le [client IBM MQ][3] 9.1+ est installé (sauf si un serveur IBM MQ est déjà installé)
2. Mettre à jour vos LD_LIBRARY_PATH et C_INCLUDE_PATH afin d'inclure l'emplacement des bibliothèques

Par exemple :

```text
export LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH
export C_INCLUDE_PATH=/opt/mqm/inc

```

**Remarque** : l'Agent v6+ utilise `upstart`, `systemd` ou `launchd` pour orchestrer le service datadog-agent. Il est possible que des variables d'environnement doivent être ajoutées aux fichiers de configuration du service, dont les emplacements par défaut sont :

- Upstart (Linux) : `/etc/init/datadog-agent.conf`
- Systemd (Linux) : `/lib/systemd/system/datadog-agent.service`
- Launchd (MacOS) : `~/Library/LaunchAgents/com.datadoghq.agent.plist`
  - Cela ne fonctionne que si le SIP macOS est désactivé (peut ne pas être conseillé en fonction de votre politique de sécurité). Cette situation est due à la [suppression de la variable d'environnement `LD_LIBRARY_PATH` par SIP][4].

Exemple de configuration pour `systemd` :

```yaml
[Unit]
Description="Datadog Agent"
After=network.target
Wants=datadog-agent-trace.service datadog-agent-process.service
StartLimitIntervalSec=10
StartLimitBurst=5

[Service]
Type=simple
PIDFile=/opt/datadog-agent/run/agent.pid
Environment="LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH"
User=dd-agent
Restart=on-failure
ExecStart=/opt/datadog-agent/bin/agent/agent run -p /opt/datadog-agent/run/agent.pid

[Install]
WantedBy=multi-user.target
```

Exemple de configuration pour `upstart` :

```conf
description "Datadog Agent"

start on started networking
stop on runlevel [!2345]

respawn
respawn limit 10 5
normal exit 0

console log
env DD_LOG_TO_CONSOLE=false
env LD_LIBRARY_PATH=/opt/mqm/lib64:/opt/mqm/lib:$LD_LIBRARY_PATH

setuid dd-agent

script
  exec /opt/datadog-agent/bin/agent/agent start -p /opt/datadog-agent/run/agent.pid
end script

post-stop script
  rm -f /opt/datadog-agent/run/agent.pid
end script
```

Exemple de configuration pour `launchd` :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <dict>
            <key>SuccessfulExit</key>
            <false/>
        </dict>
        <key>Label</key>
        <string>com.datadoghq.agent</string>
        <key>EnvironmentVariables</key>
        <dict>
            <key>DD_LOG_TO_CONSOLE</key>
            <string>false</string>
            <key>LD_LIBRARY_PATH</key>
            <string>/opt/mqm/lib64:/opt/mqm/lib</string>
        </dict>
        <key>ProgramArguments</key>
        <array>
            <string>/opt/datadog-agent/bin/agent/agent</string>
            <string>run</string>
        </array>
        <key>StandardOutPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>StandardErrorPath</key>
        <string>/var/log/datadog/launchd.log</string>
        <key>ExitTimeOut</key>
        <integer>10</integer>
    </dict>
</plist>
```

À chaque mise à jour de l'Agent, ces fichiers sont effacés et doivent à nouveau être modifiés.

Si vous utilisez Linux, une fois le client MQ installé, vérifiez que l'éditeur de liens du runtime parvient à trouver les bibliothèques. Par exemple, avec ldconfig :

Précisez l'emplacement de la bibliothèque dans un fichier de configuration ld.

```shell
sudo sh -c "echo /opt/mqm/lib64 > /etc/ld.so.conf.d/mqm64.conf"
sudo sh -c "echo /opt/mqm/lib > /etc/ld.so.conf.d/mqm.conf"
```

Mettez à jour les liens :

```shell
sudo ldconfig
```

#### Autorisations et authentification

Il existe plusieurs façons de configurer les autorisations dans IBM MQ. Selon votre configuration, créez un utilisateur `datadog` dans MQ avec un accès en lecture seule.

**Remarque :** le « Queue Monitoring » doit être activé et défini au minimum sur « Medium ». Ce réglage peut s'effectuer via l'IU MQ ou avec une commande mqsc :

```text
> /opt/mqm/bin/runmqsc
5724-H72 (C) Copyright IBM Corp. 1994, 2018.
Starting MQSC for queue manager datadog.


ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
     1 : ALTER QMGR MONQ(MEDIUM) MONCHL(MEDIUM)
AMQ8005I: IBM MQ queue manager changed.

       :
One MQSC command read.
No commands have a syntax error.
All valid MQSC commands were processed.
```

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

##### Collecte de métriques

1. Modifiez le fichier `ibm_mq.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance IBM MQ. Consultez le [fichier d'exemple ibm_mq.d/conf.yaml][1] pour découvrir toutes les options de configuration disponibles.
   Plusieurs options sont disponibles pour configurer IBM MQ, selon la façon dont vous l'utilisez.

   - `channel` : le canal IBM MQ
   - `queue_manager` : le gestionnaire de file d'attente nommé
   - `host` : le host sur lequel IBM MQ est exécuté
   - `port` : le port exposé par IBM MQ

    Si vous utilisez une configuration reposant sur des identifiants, vous pouvez définir le `username` et le `password`. Si aucun nom d'utilisateur n'est spécifié, le propriétaire du processus de l'Agent est utilisé (p. ex. `dd-agent`).

    **Remarque** : le check surveille uniquement les files d'attente spécifiées via le paramètre `queues`

    ```yaml
    queues:
      - APP.QUEUE.1
      - ADMIN.QUEUE.1
    ```

2. [Redémarrez l'Agent][2].

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Redirigez ensuite le fichier de configuration vers les bons fichiers de log MQ. Vous pouvez supprimer la mise en commentaire des lignes en bas du fichier de configuration de l'intégration MQ et les modifier comme bon vous semble :

   ```yaml
     logs:
       - type: file
         path: '/var/mqm/log/<APPNAME>/active/AMQERR01.LOG'
         service: '<APPNAME>'
         source: ibm_mq
         log_processing_rules:
           - type: multi_line
             name: new_log_start_with_date
             pattern: "\d{2}/\d{2}/\d{4}"
   ```

3. [Redémarrez l'Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_mq/datadog_checks/ibm_mq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

##### Collecte de métriques

| Paramètre            | Valeur                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `<NOM_INTÉGRATION>` | `ibm_mq`                                                                                                                        |
| `<CONFIG_INIT>`      | vide ou `{}`                                                                                                                   |
| `<CONFIG_INSTANCE>`  | `{"channel": "DEV.ADMIN.SVRCONN", "queue_manager": "datadog", "host":"%%host%%", "port":"%%port%%", "queues":["<NOM_FILE>"]}` |

##### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][2].

| Paramètre      | Valeur                                                                                                                                                              |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<CONFIG_LOG>` | `{"source": "ibm_mq", "service": "<NOM_SERVICE>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{2}/\d{2}/\d{4}"}}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `ibm_mq` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "ibm_mq" >}}


### Checks de service

**mysql.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter au serveur MQ pour une raison quelconque. Si ce n'est pas le cas, renvoie `OK`.

**ibm_mq.queue_manager** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir des statistiques provenant du gestionnaire de files d'attente. Si ce n'est pas le cas, renvoie `OK`.

**ibm_mq.queue** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir des statistiques sur les files d'attente. Si ce n'est pas le cas, renvoie `OK`.

**ibm_mq.channel** :br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à recueillir des statistiques sur les canaux. Si ce n'est pas le cas, renvoie `OK`.

**ibm_mq.channel.status** :<br/>
Renvoie `CRITICAL` si le statut est INACTIVE, STOPPED ou STOPPING. Renvoie `OK` si le statut est RUNNING et renvoie `WARNING` si le statut peut passer à running.

### Événements

IBM MQ n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les métriques et les logs d'IBM MQ avec Datadog][7]


[1]: https://www.ibm.com/products/mq
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://developer.ibm.com/messaging/mq-downloads
[4]: https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/RuntimeProtections/RuntimeProtections.html#//apple_ref/doc/uid/TP40016462-CH3-SW1
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/fr/help/
[7]: https://www.datadoghq.com/blog/monitor-ibmmq-with-datadog