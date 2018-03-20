---
title: Utilisation basique de l'Agent pour Debian
kind: documentation
aliases:
    - /guides/basic_agent_usage/deb/
    - /agent/basic_agent_usage/install_debian_5/
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collectez vos logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collectez vos processus
- link: "tracing"
  tag: "Documentation"
  text: Collectez vos traces
---

## Aperçu

Cette page présente les fonctionnalités de base de l'agent Datadog.
Si vous n'avez pas encore installé l'Agent, les instructions d'installation peuvent être trouvées [sur la page d'intégration de l'agent Datadog](https://app.datadoghq.com/account/settings#agent/debian).

Le processus de mise à niveau à partir de la version précédente de l'agent consiste à réexécuter l'installation depuis le début.

## Commandes

L'Agent Datadog possède quelques commandes. Seules les commandes _lifecycle_ (ie `start`/`stop`/`restart` /`status` sur le service Agent) doivent être exécutées avec `sudo service` /` sudo initctl` / `sudo systemctl`, toutes les autres commandes doivent être exécutées avec la commande `datadog-agent`.

{{% table responsive="true" %}}
| Agent v5                                  |  Agent v6                          | Notes
| ----------------------------------------------- | --------------------------------------- | ----------------------------- |
| `sudo service datadog-agent start`              | `sudo service datadog-agent start`      | Start Agent as a service |
| `sudo service datadog-agent stop`               | `sudo service datadog-agent stop`       | Stop Agent running as a service |
| `sudo service datadog-agent restart`            | `sudo service datadog-agent restart`    | Restart Agent running as a service |
| `sudo service datadog-agent status`             | `sudo service datadog-agent status`     | Status of Agent service |
| `sudo service datadog-agent info`               | `sudo datadog-agent status`             | Status page of running Agent |
| `sudo service datadog-agent flare`              | `sudo datadog-agent flare`              | Send flare |
| `sudo service datadog-agent`                    | `sudo datadog-agent --help`             | Display command usage |
| `sudo -u dd-agent -- dd-agent check <check_name>` | `sudo -u dd-agent -- datadog-agent check <check_name>` | Run a check |
{{% /table %}}

Plus d'informations sur les métriques, les événements et les checks de service pour une [intégrations](/integrations) peuvent être récupérées avec la commande check:
```shell
sudo service datadog-agent check [integration]
```

Ajoutez l'argument check_rate pour avoir les valeurs les plus récentes pour les fréquences:
```shell
sudo service datadog-agent check [integration] check_rate
```

**NB**: Si `service` n'est pas disponible sur votre système, utilisez:

* pour les système basés sur `upstart`: `sudo start/stop/restart datadog-agent`
* pour les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart datadog-agent`
* pour les système basés sur `initctl`: `sudo initctl start/stop/restart datadog-agent`

## Configuration

Les fichiers et dossiers de configuration de l'Agent se trouvent à:

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/datadog.conf`| `/etc/datadog-agent/datadog.yaml` |

Fichiers de configuration pour [les intégrations](/integrations):

| Agent v5                                  |  Agent v6                          |
|:-----|:----|
|`/etc/dd-agent/conf.d/`|`/etc/datadog-agent/conf.d/`|

## Troubleshooting

Exécutez la commande info ou status pour voir l'état de l'Agent.
Les logs de l'Agent se trouvent dans le dossier `/var/log/datadog/`:

* Pour l'Agent v6, tous les logs se trouvent dans le fichier `agent.log`
* Pour l'Agent v5 les logs sont dans:

    * `datadog-supervisord.log`
    * `collector.log`
    * `dogstatsd.log`
    * `forwarder.log`

Si vous rencontrez toujours des problèmes, [notre équipe de support](/help) se fera un plaisir de vous aider.

## Basculer entre Agent v5 et v6
### Mettre à niveau vers l'agent v6

Un script est disponible pour installer ou mettre à jour automatiquement le nouvel agent. Il configure les repos et installe le paquet de l'Agent pour vous; En cas de mise à niveau, l'outil d'importation cherche également si il existe un `datadog.conf` depuis version antérieure de l'Agent afin de le garder tout en vérifiant que les configurations sont toujours valable avec l'Agent 6.
#### Installation en une étape
##### Mettre à jour

Le programme d'installation d'Agent 6.x peut convertir automatiquement votre configuration d'Agent  5.x lors de la mise à niveau:

```shell
 DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Note:** le processus d'importation ne déplace pas automatiquement les check custom, 
puisque nous ne pouvons pas garantir la compatibilité et la portabilité de ces derniers.

##### Installer depuis le début

Pour installer (ou avoir une installation d'Agent v5 à partir de laquelle vous ne souhaitez pas importer la configuration) fournissez une clé api:

```shell
 DD_API_KEY=YOUR_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

#### Installation manuelle

1. Configurez apt pour pouvoir le télécharger via https

    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le repo deb de Datadog sur votre système et importez la clé apt de Datadog:

    ```
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

    Note: Vous devrez peut-être installer `dirmngr` pour ajouter la clé apt de Datadog.

3. Mettez à jour votre repo apt local et installez l'agent:

    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copiez l'exemple de configuration et rajoutez votre clé API:

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml" 
    ```

5. Démarrer l'Agent:

    ```
    sudo systemctl restart datadog-agent.service
    ```


### Revenir à l'Agent v5

1. Configurez apt pour pouvoir le télécharger via https
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Supprimer le repo de l'Agent v6 et s'assurez vous que le dépôt stable est présent

    ```shell
    sudo rm /etc/apt/sources.list.d/datadog.list [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 382E94DE
    ```

3. Mettez à jour apt et rétrograder l'agent

    ```shell
    sudo apt-get update
    sudo apt-get remove datadog-agent
    sudo apt-get install datadog-agent
    ```

## Désinstaller l'Agent

Pour désinstaller l'agent, exécutez:

```
$ sudo apt-get --purge remove datadog-agent -y
CentOS/RHEL/Amazon Linux
```

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}