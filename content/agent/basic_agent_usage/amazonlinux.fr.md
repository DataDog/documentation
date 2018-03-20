---
title: Utilisation basique de l'Agent pour Linux
kind: documentation
platform: Amazon Linux
aliases:
    - /fr/guides/basic_agent_usage/amazonlinux/
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: Collectez vos logs
- link: "/graphing/infrastructure/process"
  tag: "Documentation"
  text: Collectez vos processus
- link: "/tracing"
  tag: "Documentation"
  text: Collectez vos traces
---

## Aperçu

Cette page présente les fonctionnalités de base de l'agent Datadog.
Si vous n'avez pas encore installé l'Agent, les instructions d'installation peuvent être trouvées [sur la page d'intégration de l'agent Datadog](https://app.datadoghq.com/account/settings#agent/aws).

## Commandes

Le gestionnaire de services fourni par le système d'exploitation est responsable du cycle de vie de l'Agent: en fonction de celui qui est installé, `sudo service`,` sudo initctl` ou `sudo systemctl` devraient être utilisé pour` start`, `stop` ou` restart` l'Agent.
D'autres fonctionnalités sont fournies par le binaire de l'Agent lui-même, toutes disponibles via la commande `datadog-agent`: c'est le cas par exemple des commandes` status` et `flare`.

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

**NB**: Si `service` n'est pas disponible sur votre système, utilisez:

* pour les système basés sur `upstart`: `sudo initctl start/stop/restart datadog-agent`
* pour les systèmes basés sur `systemd` : `sudo systemctl start/stop/restart datadog-agent`

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

## Ajouter d'un package python personnalisé à l'agent

L'interpréteur Python intégré à l'agent se trouve ici:
`/opt/datadog-agent/embedded/bin/python`.
L'agent est également livré avec pip, installez les bibliothèques python avec:
```
sudo -u dd-agent -- /opt/datadog-agent/embedded/bin/pip install <package_name>
```

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
1. Configurez le repo Yum de Datadog sur votre système en créant /etc/yum.repos.d/datadog.repo avec le contenu suivant:

    ```
    [datadog]
    name = Datadog, Inc.
    baseurl = https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
    ```

2. Mettez à jour votre repo yum local et installez l'agent:

    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration et rajoutez votre clé API:

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Redémarrez l'agent pour Amazon Linux 2.0:

    ```
    sudo systemctl restart datadog-agent.service
    ```

5. Redémarrez l'agent pour Amazon Linux 1.0:

    ```
    sudo initctl start datadog-agent
    ```

### Revenir à l'Agent v5

1. Configurez apt pour pouvoir le télécharger via https
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Supprimez le repo Agent 6 et assurez-vous que le dernier repo stable est présent

    ```shell
    sudo rm /etc/yum.repos.d/datadog.repo [ ! -f /etc/apt/sources.list.d/datadog.list ] &&  echo 'deb https://apt.datadoghq.com/ stable main' | sudo tee /etc/apt/sources.list.d/datadog.list
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
```

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}