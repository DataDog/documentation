---
title: Utilisation basique de l'Agent pour macOS
kind: documentation
platform: OS X
os: osx
aliases:
  - /fr/guides/basic_agent_usage/osx/
further_reading:
  - link: logs/
    tag: Documentation
    text: Collectez vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Collectez vos processus
  - link: tracing
    tag: Documentation
    text: Collectez vos traces
---
## Aperçu

Cette page présente les fonctionnalités de base de l'agent Datadog.
Si vous n'avez pas encore installé l'Agent, les instructions d'installation peuvent être trouvées [sur la page d'intégration de l'agent Datadog][1].

Par défaut, votre agent est installé dans sa propre sandbox à `/opt.datadog-agent`. Vous êtes libre de déplacer ce dossier où vous le souhaitez. Cependant, cet article suppose que l'agent est installé dans son emplacement par défaut. Veillez donc à modifier les instructions en conséquence si vous avez décidé de le déplacer.

## Commandes

Les commandes de cycle de vie (anciennement `datadog-agent start`/`stop`/`restart`/`status` sur l'Agent 5) sont remplacées par des commandes `launchctl` sur le service `com.datadoghq.agent`, et doivent être exécutées sous l'utilisateur connecté. Pour ces commandes, vous pouvez également utiliser l'application systray de l'Agent Datadog , toutes les autres commandes peuvent toujours être exécutées avec la commande `datadog-agent` (située dans le `PATH` (`/usr/local/bin/`) par défaut).

| Agent v5                           | Agent v6                                             | Notes                              |
| ---------------------------------- | ---------------------------------------------------- | ---------------------------------- |
| `datadog-agent start`              | `launchctl start com.datadoghq.agent` or systray app | Démarrer l'Agent comme un service           |
| `datadog-agent stop`               | `launchctl stop com.datadoghq.agent` or systray app  | Arrêter l'Agent s'éxecutant comme un service    |
| `datadog-agent restart`            | _run `stop` then `start`_ or systray app             | Redémarrer l'Agent s'éxecutant comme un service |
| `datadog-agent status`             | `launchctl list com.datadoghq.agent` or systray app  | Status du service de l'Agent            |
| `datadog-agent info`               | `datadog-agent status` ou web GUI                    | Page de statut de l'Agent       |
| `datadog-agent flare`              | `datadog-agent flare` ou web GUI                     | Envoyer un flare                         |
| _pas implémenté_                  | `datadog-agent --help`                               | Affiche les commandes d'usage              |
| `datadog-agent check <check_name>` | `datadog-agent check <check_name>`                   | Execute un check                        |

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| Agent v5                        | Agent v6                        |
| :-----                          | :----                           |
| `~/.datadog-agent/datadog.conf` | `~/.datadog-agent/datadog.yaml` |

Fichiers de configuration pour [les intégrations][2]:

| Agent v5                   | Agent v6                   |
| :-----                     | :----                      |
| `~/.datadog-agent/conf.d/` | `~/.datadog-agent/conf.d/` |

## Troubleshooting

Exécutez la commande info ou status pour voir l'état de l'Agent.
Les logs de l'Agent se trouvent dans le dossier `/var/log/datadog/`:

* Pour l'Agent v6, tous les logs se trouvent dans le fichier `agent.log`
* Pour l'Agent v5 les logs sont dans:

    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

Si vous rencontrez toujours des problèmes, [notre équipe de support][3] se fera un plaisir de vous aider.

## Basculer entre Agent v5 et v6
### Mettre à niveau vers l'agent v6

Vous pouvez soit télécharger le paquet DMG et l'installer manuellement, soit utiliser le script d'installation en une seule ligne.

### Installation manuelle

1. Téléchargez le paquet DMG de la dernière version de l'Agent, utilisez la dernière version de macOS listée sur la page [release page][4] du répertoire.
2. Installez le package DMG
3. Ajoutez votre clef d'API à `/opt/datadog-agent/etc/datadog.yaml`

Lancez ensuite l'application Datadog Agent (une fois démarrée, vous devriez la voir dans la barre d'état système), et gérez la à partir de là. L'Agent6 fournit également une interface graphique dans votre navigateur pour éditer les fichiers de configuration de l'Agent et pour d'autres usages, reportez-vous au document [changes and deprecations][changes] pour plus d'informations.
### Script d'installation
#### Mettre à niveau

Le programme d'installation d'Agent 6.x peut convertir automatiquement votre configuration d'Agent  5.x lors de la mise à niveau:

```shell
  DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

#### Installer depuis le début

Dans le cas où vous voulez installer sur un environnement propre (ou vous avez déjà un Agent 5 d'installé à partir duquel vous ne souhaitez pas importer la configuration), vous devrez fournir une clés d'api:

```shell
 DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

### Revenir à l'Agent v5

1. Arrêter l'Agent avec l'application systray, si elle est en cours d'exécution.
2. Quittez l'app systray
3. Désinstaller l'application Agent Datadog
4. [Installez le paquet DMG Agent 5 en utilisant la méthode d'installation de votre choix][1].

## Désinstaller l'Agent

Stop and Close the Datadog Agent: via the bone icon in the Tray.

Drag the Datadog Application from the application folder to the Trash Bin.

```
$ sudo rm -rf /opt/datadog-agent
$ sudo rm -rf /usr/local/bin/datadog-agent
$ sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
```
If you ran the optional install commands to have the Agent run at boot time, run the following to finish uninstalling:

```
$ sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
$ sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/mac
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/releases
