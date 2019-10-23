---
title: "Upgrade vers l'Agent\_v6 de Datadog"
kind: guide
aliases:
  - /fr/agent/faq/upgrade-to-agent-v6
---
<div class="alert alert-info">
Pour effectuer une nouvelle installation de l'Agent v6 de Datadog, consultez le <a href="https://app.datadoghq.com/account/settings#agent">processus d'installation</a> de l'Agent.
</div>

## En quoi consiste l'Agent v6 ?

L'Agent 6 est la toute dernière version majeure de l'Agent Datadog. La grande différence entre l'Agent 5 et l'Agent 6 est que les composants principaux de l'Agent 6 ont été entièrement réécrits en Golang. Cela permet à Datadog de tirer parti de la programmation concurrente : au lieu des trois processus que l'Agent v5 exécutait, à savoir *le Forwarder*, *le Collector* et *DogStatsD*, il n'existe désormais plus qu'un seul processus : *l'Agent*. Cette version offre de nombreuses autres améliorations importantes :

* L'Agent v6 a considérablement réduit l'utilisation des ressources par rapport à l'Agent v5 :
  * Charge processeur réduite
  * Utilisation de la mémoire réduite
  * Nombre de descripteurs de fichier réduit
  * Empreinte globale réduite

* L'Agent 6 utilise [deux ports supplémentaires][1] :
    * `5000` pour exposer ses métriques de runtime.
    * `5001` pour les [commandes de l'interface de ligne de commande/l'interface graphique de l'Agent][2].

    **Remarque** : vous pouvez modifier les ports pour `expvar_port` et `cmd_port` dans le fichier `datadog.yaml`.

* Personnalisez l'Agent v6 et le service [DogStatsD][3] encore plus facilement et de façon plus poussée grâce aux nouvelles options de configuration, qui vous permettent d'inclure ou d'exclure pratiquement tout ce que vous souhaitez.

### Nouvelles fonctionnalités de l'Agent v6

Pour découvrir l'ensemble des nouveautés de l'Agent v6 par rapport à la v5, consultez la documentation relative aux [modifications apportées à l'Agent Datadog][4]. Voici toutefois la liste des principales différences :

* Les [métriques de distribution][5] peuvent être exécutées directement sur le serveur pour calculer les centiles globaux réels et effectifs. (REMARQUE : cette fonctionnalité est en version BÊTA. Contactez l'assistance pour découvrir comment l'activer pour votre compte.)

* [DogStatsD][3] peut être utilisé sur un socket Unix plutôt que via UDP.

* [La surveillance de live processes est disponible pour Windows][6].

* [Le format OpenMetrics de Prometheus est pris en charge de façon native][7].

* [Tous vos logs peuvent être envoyés à Datadog à des fins d'alerte, d'analyse et de corrélation avec les métriques][8].

## Upgrade vers l'Agent 6

Si l'Agent v5 est déjà installé, un script est disponible pour installer ou passer à l'Agent v6. Ce script configure les référentiels des paquets et installe le paquet de l'Agent automatiquement. Lors de l'upgrade, l'outil d'importation recherche également un fichier `datadog.conf` existant issu d'une version antérieure et convertit les configurations de l'Agent et des checks au nouveau format v6. Sélectionnez votre plateforme pour connaître la marche à suivre détaillée :

* [Amazon Linux](#amazon-linux)
* [CentOS](#centos)
* [Debian](#debian)
* [Fedora](#fedora)
* [macOS](#macosx)
* [Red Hat](#red-hat)
* [SUSE](#suse)
* [Ubuntu](#ubuntu)
* [Windows](#windows)

### Amazon Linux
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. (Re)démarrez l'Agent :

    * Amazon Linux 2.0 :
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0 :
    ```
    sudo initctl start datadog-agent
    ```

### CentOS
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```
4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :

    * Centos 7 et versions ultérieures :
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6 :
    ```
    sudo initctl restart datadog-agent
    ```

### Debian
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Activez la prise en charge du HTTPS pour APT :
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez la clé APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    Remarque : vous devrez peut-être installer `dirmngr` pour importer la clé APT de Datadog.

3. Mettez à jour votre cache APT local et installez l'Agent :
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Démarrez l'Agent :
    ```
    sudo service datadog-agent start
    ```

### Fedora
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent
    ```
    sudo systemctl restart datadog-agent.service
    ```


### macOS

Vous pouvez télécharger le paquet DMG et l'installer manuellement ou utiliser le script d'installation en une étape.

#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_mac_os.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Téléchargez le paquet DMG de la version la plus récente de l'Agent. Choisissez la version macOS la plus récente sur la [page Releases][9] du référentiel.
2. Installez le paquet DMG
3. Ajoutez votre clé d'API dans `/opt/datadog-agent/etc/datadog.yaml`
4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

Démarrez ensuite l'application Agent Datadog (une fois celle-ci démarrée, elle doit s'afficher dans la barre d'état système) et gérez l'Agent à partir de cet emplacement. L'Agent v6 intègre une interface graphique Web qui vous permet de modifier les fichiers de configuration de l'Agent, et bien plus encore.

### Red Hat
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
           https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :

    * Red Hat 7 et versions ultérieures :
    ```
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6 :
    ```
    sudo initctl restart datadog-agent
    ```

### SUSE
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```
**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

#### Upgrade manuel

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/zypp/repos.d/datadog.repo` avec le contenu suivant :
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://yum.datadoghq.com/DATADOG_RPM_KEY.public
         https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. Mettez à jour votre référentiel Zypper local et installez l'Agent :
  ```
  sudo zypper refresh
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY.public
  sudo rpm --import https://yum.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :
  ```
  sudo systemctl restart datadog-agent.service
  ```

### Ubuntu
#### Upgrade en une seule étape

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :
```shell
DD_UPGRADE=true bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-agent/master/cmd/agent/install_script.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

### Upgrade manuel

1. Activez la prise en charge du HTTPS pour APT :
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez la clé APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    ```

    Remarque : vous devrez peut-être installer `dirmngr` pour importer la clé APT de Datadog.

3. Mettez à jour votre cache APT local et installez l'Agent :
    ```
    sudo apt-get update
    sudo apt-get install datadog-agent
    ```

4. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

5. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

6. Démarrez l'Agent :

    * Ubuntu 16.04 ou versions ultérieures :
    ```
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 ou versions antérieures :
    ```
    sudo initctl start datadog-agent
    ```


### Windows

Téléchargez la version la plus récente disponible [en cliquant ici][10] et exécutez le paquet d'installation.

Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :

`datadog-agent import <ANCIEN_RÉPERTOIRE_CONFIGURATION> <RÉPERTOIRE_DESTINATION>`

Où :

* `<ANCIEN_RÉPERTOIRE_CONFIGURATION>` est le répertoire contenant le fichier `datadog.conf`
* `<RÉPERTOIRE_DESTINATION>` est le répertoire dans lequel le fichier `datadog.yaml` importé sera écrit (vous pouvez utiliser le même répertoire que `<ANCIEN_RÉPERTOIRE_CONFIGURATION>`).

**Remarque** : `datadog.conf` est automatiquement converti en `datadog.yaml` lors de l'upgrade.

[1]: /fr/agent/?tab=agentv6#agent-architecture
[2]: /fr/agent/guide/agent-commands
[3]: /fr/developers/dogstatsd/unix_socket
[4]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/changes.md
[5]: /fr/developers/metrics/metrics_type
[6]: /fr/graphing/infrastructure/process
[7]: https://www.datadoghq.com/blog/monitor-prometheus-metrics
[8]: /fr/logs
[9]: https://github.com/DataDog/datadog-agent/releases
[10]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi