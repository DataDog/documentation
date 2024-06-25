4F09D16B---
aliases:
- /fr/agent/faq/upgrade-to-agent-v6
- /fr/agent/guide/upgrade-to-agent-v6
title: Upgrade vers l'Agent v6 de Datadog
---

<div class="alert alert-info">
L'Agent v7 est disponible. <a href="/agent/versions/upgrade_to_agent_v7">Passez à la dernière version</a> pour profiter des nouvelles fonctionnalités.
</div>

## Upgrade vers l'Agent 6

Si l'Agent v5 est déjà installé, un script est disponible pour installer ou passer à l'Agent v6. Ce script configure les référentiels du package et installe le package de l'Agent automatiquement. Lors de l'upgrade, l'outil d'importation recherche également un fichier `datadog.conf` existant issu d'une version antérieure et convertit les configurations de l'Agent et des checks au nouveau format v6. Sélectionnez votre plateforme ci-dessous pour connaître la marche à suivre détaillée. Vous pouvez [télécharger le package DMG et l'installer manuellement](#upgrade-manuel), ou utiliser le [script d'installation en une étape](#upgrade-en-une-etape).

## Upgrade en une étape

{{< tabs >}}
{{% tab "Linux" %}}

Le programme d'installation de l'Agent v6 peut automatiquement convertir les configurations v5 lors de l'upgrade :

La commande suivante fonctionne sous Amazon Linux, CentOS, Debian, Fedora, Red Hat, Ubuntu et SUSE :
: `DD_UPGRADE=true bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"`

**Remarque** : le processus d'importation n'importe pas automatiquement les checks **custom** de l'Agent. Ce comportement est délibéré : nous ne pouvons par garantir la compatibilité totale et immédiate de ces checks.

{{% /tab %}}
{{% tab "Windows" %}}

L'installation en une étape n'est pas disponible pour Windows. Référez-vous à la section [Upgrade manuel](#upgrade-manuel).

{{% /tab %}}
{{% tab "macOS" %}}

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

- [Passer à lʼAgent 6](#passer-a-l-agent-6)
- [Mise à niveau en une étape](#mise-a-niveau-en-une-etape)
- [Mise à niveau manuelle](#mise-a-niveau-manuelle)
  - [Amazon Linux](#amazon-linux)
  - [CentOS](#centos)
  - [Debian](#debian)
  - [Fedora](#fedora)
  - [Red Hat](#red-hat)
  - [Ubuntu](#ubuntu)
  - [SUSE](#suse)

### Amazon Linux

1. Configurez le référentiel Yum de Datadog sur votre système en créant un fichier `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
    ```ini
    [datadog]
    name=Datadog, Inc.
    baseurl=https://yum.datadoghq.com/stable/6/x86_64/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```shell
    sudo yum makecache
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. (Re)démarrez l'Agent :

    * Amazon Linux 2.0 :
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Amazon Linux 1.0 :
    ```shell
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
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **Remarque** : en raison d'un [bug dans dnf][1], utilisez `repo_gpgcheck=0` au lieu de `repo_gpgcheck=1` pour CentOS 8.1.

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :

    * Centos 7 et versions ultérieures :
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Centos 6 :
    ```shell
    sudo initctl restart datadog-agent
    ```

### Debian

1. Activez la prise en charge du HTTPS pour APT, installez `curl` et `gnupg` :
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez les clés APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si vous utilisez Debian 8 ou une version antérieure, copiez le keyring vers `/etc/apt/trusted.gpg.d` :

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Mettez à jour votre cache APT local et installez l'Agent :
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Démarrez l'Agent :
    ```shell
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
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent
    ```shell
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
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
    ```

   **Remarque** : en raison d'un [bug dans dnf][1], utilisez `repo_gpgcheck=0` au lieu de `repo_gpgcheck=1` pour RHEL 8.1.

2. Mettez à jour votre référentiel Yum local et installez l'Agent :
    ```shell
    sudo yum makecache
    sudo yum remove datadog-agent-base
    sudo yum install datadog-agent
    ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :

    * Red Hat 7 et versions ultérieures :
    ```shell
    sudo systemctl restart datadog-agent.service
    ```

    * Red Hat 6 :
    ```shell
    sudo initctl restart datadog-agent
    ```

### Ubuntu

1. Activez la prise en charge du HTTPS pour APT, installez `curl` et `gnupg` :
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```

2. Configurez le référentiel de l'API Datadog sur votre système et importez les clés APT de Datadog :
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg

    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```

3. Si vous utilisez Ubuntu 14 ou une version antérieure, copiez le keyring vers `/etc/apt/trusted.gpg.d` :

   ```shell
   sudo cp /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d
   ```

4. Mettez à jour votre cache APT local et installez l'Agent :
    ```shell
    sudo apt-get update
    sudo apt-get install datadog-agent datadog-signing-keys
    ```

5. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
    ```shell
    sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
    ```

6. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

7. Démarrez l'Agent :

    * Ubuntu 16.04 ou versions ultérieures :
    ```shell
    sudo systemctl start datadog-agent
    ```

    * Ubuntu 14.04 ou versions antérieures :
    ```shell
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
  repo_gpgcheck=1
  gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
         https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  ```

2. Mettez à jour votre référentiel Zypper local et installez l'Agent :
  ```shell
  sudo zypper refresh
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
  sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
  sudo zypper install datadog-agent
  ```

3. Copiez l'exemple de configuration à l'emplacement adéquat et spécifiez votre clé d'API :
  ```shell
  sudo sh -c "sed 's/api_key:.*/api_key: <YOUR_API_KEY>/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
  ```

4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    ```shell
    sudo -u dd-agent -- datadog-agent import /etc/dd-agent/ /etc/datadog-agent/
    ```

5. Redémarrez l'Agent :
  ```shell
  sudo systemctl restart datadog-agent.service
  ```

[1]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
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
{{% tab "macOS" %}}

1. Téléchargez le paquet DMG de la version la plus récente de l'Agent. Choisissez la version macOS la plus récente sur la [page Releases][9] du référentiel.
2. Installez le paquet DMG.
3. Ajoutez votre clé d'API dans `/opt/datadog-agent/etc/datadog.yaml`.
4. Procédez à la conversion des formats et des chemins de configuration de votre Agent au format v6 avec la commande `import`. La commande analyse le fichier `datadog.conf` v5 existant et convertit les options de configuration vers le nouveau format `datadog.yaml` v6. Celle-ci copie également les fichiers de configuration des checks actuellement activés :
    `datadog-agent import /opt/datadog-agent/etc/ /opt/datadog-agent/etc/`

Démarrez ensuite l'application Agent Datadog (une fois celle-ci démarrée, elle doit s'afficher dans la barre d'état système) et gérez l'Agent à partir de cet emplacement. L'Agent v6 intègre une interface graphique Web qui vous permet de modifier les fichiers de configuration de l'Agent, et bien plus encore.

https://github.com/DataDog/datadog-agent/releases

{{% /tab %}}
{{< /tabs >}}
