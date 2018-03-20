---
title: Utilisation basique de l'Agent pour Red Hat
kind: documentation
platform: Red Hat
aliases:
  - '/[object Object]/guides/basic_agent_usage/redhat/'
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
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration et rajoutez votre clé API:

    ```
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Redémarrer l'agent sur Centos 7 et plus:

    ```
    sudo systemctl restart datadog-agent.service
    ```

5. Redémarrer l'agent sur Centos 6:

    ```
    sudo initctl start datadog-agent
    ```

### Revenir à l'Agent v5

1. Supprimez le repo Yum de l'Agent 6  de votre système:
    ```shell 
    rm /etc/yum.repos.d/datadog.repo [ ! -f /etc/yum.repos.d/datadog.repo ] && echo -e '[datadog]\nname = Datadog, Inc.\nbaseurl = https://yum.datadoghq.com/rpm/x86_64/\nenabled=1\ngpgcheck=1\npriority=1\ngpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public\n       https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public' | sudo tee /etc/yum.repos.d/datadog.repo
    ```

2. Mettez à jour votre cache yum local et rétrograder l'agent
    ```shell
    sudo yum clean expire-cache metadata
    sudo yum check-update
    sudo yum remove datadog-agent
    sudo yum install datadog-agent
    ```

3. Configurations Back-sync et canevas d'AutoDiscovery (optionnels):
    Si vous avez apporté des modifications à vos configurations ou canevas, vous pouvez les synchroniser pour l'Agent v5.

    Note: si vous avez apporté des modifications à vos configurations pour prendre en charge les nouvelles options de l'Agent v6 uniquement, elles ne fonctionneront plus avec Agent v5.

4. Check custom Back-sync (optionnel)
    Si vous avez effectué des modifications ou ajouté de nouveaux custom check lors du test de l'Agent v6, vous pouvez les réactiver sur l'Agent 5. Remarque: il vous suffit de recopier les checks que vous avez modifiés.

    ```shell
    sudo -u dd-agent -- cp /etc/datadog-agent/checks.d/<check>.py /etc/dd-agent/checks.d/
    ```

5. Redémarez votre Agent
    ```shell
    # Systemd
    sudo systemctl restart datadog-agent
    # Upstart
    sudo /etc/init.d/datadog-agent restart
    ```

6. Nettoyez /etc/datadog-agent (optionnel)
    ```shell
    sudo -u dd-agent -- rm -rf /etc/datadog-agent/
    ```

## Désinstaller l'Agent

Pour désinstaller l'agent, exécutez:

    ```
    $ sudo yum remove datadog-agent
    ```

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}