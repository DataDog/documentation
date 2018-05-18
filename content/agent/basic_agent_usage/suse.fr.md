---
title: Utilisation basique de l'Agent pour SUSE
kind: documentation
platform: SUSE
aliases:
  - /fr/guides/basic_agent_usage/suse/
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

Le processus de mise à niveau à partir de la version précédente de l'Agent consiste à réexécuter l'installation depuis le début.

## Commandes

L'Agent Datadog possède quelques commandes. Seules les commandes _lifecycle_ (ie `start`/`stop`/`restart` /`status` sur le service Agent) doivent être exécutées avec `sudo service` /` sudo systemctl`, toutes les autres commandes doivent être exécutées avec la commande `datadog-agent`.

| Agent v5                                          | Agent v6                                               | Notes                              |
| -----------------------------------------------   | ---------------------------------------                | -----------------------------      |
| `sudo service datadog-agent start`                | `sudo service datadog-agent start`                     | Démarrer l'Agent comme un service           |
| `sudo service datadog-agent stop`                 | `sudo service datadog-agent stop`                      | Arrêter l'Agent s'éxecutant comme un service    |
| `sudo service datadog-agent restart`              | `sudo service datadog-agent restart`                   | Redémarrer l'Agent s'éxecutant comme un service |
| `sudo service datadog-agent status`               | `sudo service datadog-agent status`                    | Status du service de l'Agent            |
| `sudo service datadog-agent info`                 | `sudo datadog-agent status`                            | Page de statut de l'Agent       |
| `sudo service datadog-agent flare`                | `sudo datadog-agent flare`                             | Envoyer un flare                         |
| `sudo service datadog-agent`                      | `sudo datadog-agent --help`                            | Affiche les commandes d'usage              |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Execute un check                        |

Plus d'informations sur les métriques, les événements et les checks de service pour une [intégrations][2] peuvent être récupérées avec la commande check:
```shell
sudo service datadog-agent check [integration]
```

Ajoutez l'argument check_rate pour avoir les valeurs les plus récentes pour les fréquences:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: Si `service` n'est pas disponible sur votre système, utilisez:

* pour les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart datadog-agent`

[En apprendre plus sur les commandes pour l'Agent][4]

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| Agent v5                     | Agent v6                          |
| :-----                       | :----                             |
| `/etc/dd-agent/datadog.conf` | `/etc/datadog-agent/datadog.yaml` |

Fichiers de configuration pour [les intégrations][2]:

| Agent v5                | Agent v6                     |
| :-----                  | :----                        |
| `/etc/dd-agent/conf.d/` | `/etc/datadog-agent/conf.d/` |

## Mettre à niveau vers l'agent v6

1. Configurez le repo Yum de Datadog sur votre système en créant /etc/zypp/repos.d/datadog.repo avec le contenu suivant:

  ```
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  ```

2. Mettez à jour votre repo zypper local et installez l'agent:

  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo zypper install datadog-agent
  ```

3. Copiez l'exemple de configuration et rajoutez votre clé API:

  ```
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Redémarrez l'Agent:

  ```
  sudo systemctl restart datadog-agent.service
  ```

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

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/suse
[2]: /integrations
[3]: /help
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md#service-lifecycle-commands