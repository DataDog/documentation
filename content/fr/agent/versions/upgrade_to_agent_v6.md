---
title: "Upgrade vers l'Agent\_v6 de Datadog"
kind: documentation
aliases:
  - /fr/agent/faq/upgrade-to-agent-v6
  - /fr/agent/guide/upgrade-to-agent-v6
---
<div class="alert alert-info">
L'Agent v7 est disponible. <a href="/agent/versions/upgrade_to_agent_v7">Passez à la dernière version</a> pour profiter des nouvelles fonctionnalités.
</div>

## Upgrade vers l'Agent 6

Si l'Agent v5 est déjà installé, un script est disponible pour installer ou passer à l'Agent v6. Ce script configure les référentiels des paquets et installe le paquet de l'Agent automatiquement. Lors de l'upgrade, l'outil d'importation recherche également un fichier `datadog.conf` existant issu d'une version antérieure et convertit les configurations de l'Agent et des checks au nouveau format v6. Sélectionnez votre plateforme ci-dessous pour connaître la marche à suivre détaillée. Vous pouvez [télécharger le paquet DMG et l'installer manuellement](#upgrade-manuel), ou utiliser le [script d'installation en une étape](#upgrade-en-une-etape).

## Upgrade en une seule étape

{{< tabs >}}
{{% tab "Linux" %}}

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :

| Plateforme     | Commande                                                                                                                           |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------|
| Amazon Linux | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| CentOS       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Debian       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Fedora       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Red Hat      | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| Ubuntu       | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |
| SUSE         | `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"` |

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

{{% /tab %}}
{{% tab "Windows" %}}

L'installation en une étape n'est pas disponible pour Windows. Référez-vous à la section [Upgrade manuel](#upgrade-manuel).

{{% /tab %}}
{{% tab "MacOS" %}}

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :

```shell
DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"
```

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

{{% /tab %}}
{{< /tabs >}}

## Upgrade manuel

{{< tabs >}}
{{% tab "Linux" %}}

Vous trouverez ci-dessous les instructions d'installation manuelle pour :

* [Amazon Linux](#amazon-linux)
* [CentOS](#centos)
* [Debian](#debian)
* [Fedora](#fedora)
* [Red Hat](#red-hat)
* [SUSE](#suse)
* [Ubuntu](#ubuntu)

### Amazon Linux

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
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

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
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

1. Activez la prise en charge du HTTPS pour APT :
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez les clés APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 D75CEA17048B9ACBF186794B32637D44F14F620E
    ```

    Remarque : vous devrez peut-être installer `dirmngr` pour importer les clés APT de Datadog.

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

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
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

### Red Hat

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY.public
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

### Ubuntu

1. Activez la prise en charge du HTTPS pour APT :
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez les clés APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 A2923DFF56EDA6E76E55E492D3A80E30382E94DE
    sudo apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 D75CEA17048B9ACBF186794B32637D44F14F620E
    ```

    Remarque : vous devrez peut-être installer `dirmngr` pour importer les clés APT de Datadog.

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

### SUSE

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/zypp/repos.d/datadog.repo` avec le contenu suivant :
  ```ini
  [datadog]
  name=Datadog, Inc.
  enabled=1
  baseurl=https://yum.datadoghq.com/suse/stable/6/x86_64
  type=rpm-md
  gpgcheck=1
  repo_gpgcheck=0
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY.public
  ```

2. Mettez à jour votre référentiel Zypper local et installez l'Agent :
  ```
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY.public
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

{{% /tab %}}
{{% tab "Windows" %}}

Téléchargez la [dernière version disponible][1] et exécutez le paquet d'installation.

Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :

`datadog-agent import <ANCIEN_RÉPERTOIRE_CONFIGURATION> <RÉPERTOIRE_DESTINATION>`

Où :

* `<ANCIEN_RÉPERTOIRE_CONFIGURATION>` est le répertoire contenant le fichier `datadog.conf`
* `<RÉPERTOIRE_DESTINATION>` est le répertoire dans lequel le fichier `datadog.yaml` importé sera écrit (vous pouvez utiliser le même répertoire que `<ANCIEN_RÉPERTOIRE_CONFIGURATION>`).

**Remarque** : `datadog.conf` est automatiquement converti en `datadog.yaml` lors de l'upgrade.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
{{% /tab %}}
{{% tab "MacOS" %}}

1. Téléchargez le paquet DMG de la version la plus récente de l'Agent. Choisissez la version macOS la plus récente sur la [page Releases][9] du référentiel.
2. Installez le paquet DMG.
3. Ajoutez votre clé d'API dans `/opt/datadog-agent/etc/datadog.yaml`.
4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

Démarrez ensuite l'application Agent Datadog (une fois celle-ci démarrée, elle doit s'afficher dans la barre d'état système) et gérez l'Agent à partir de cet emplacement. L'Agent v6 intègre une interface graphique Web qui vous permet de modifier les fichiers de configuration de l'Agent, et bien plus encore.

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}