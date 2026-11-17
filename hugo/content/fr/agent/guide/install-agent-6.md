---
further_reading:
- link: agent/
  tag: Documentation
  text: Le Datadog Agent
private: true
title: Installez l'Agent Datadog 6
---
Ce guide couvre l'installation de l'Agent 6. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation de la dernière version de l'Agent][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 à partir d'une version antérieure, consultez [Mise à niveau vers l'Agent Datadog v7][2].

## macOS {#macos}

- La version 6 de l'Agent Datadog nécessite macOS 10.12 ou une version ultérieure. 
- L'Agent 6.34 est la dernière version à prendre en charge macOS 10.12.
- L'Agent 6.38 est la dernière version de l'Agent 6 pour macOS. 

### Installez l'Agent {#install-the-agent}

#### Ligne de commande {#command-line}

Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

L'Agent s'exécute à la connexion. Vous pouvez le désactiver depuis la barre d'état système.

#### LaunchDaemon {#launchdaemon}

L'Agent Datadog peut être installé en tant que LaunchDaemon à l'échelle du système en spécifiant `DD_SYSTEMDAEMON_INSTALL=true` et `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

L'Agent s'exécute au démarrage du système. Un utilisateur non-root valide et son groupe doivent être fournis en utilisant la variable `DD_SYSTEMDAEMON_USER_GROUP`. Le processus de l'agent s'exécute sous cet utilisateur et ce groupe.

L'application de la barre d'état système n'est pas prise en charge dans les installations LaunchDaemon à l'échelle du système.

#### GUI {#gui}

1. Téléchargez et installez le [paquet DMG][3].
1. Ajoutez la ligne suivante à `/opt/datadog-agent/etc/datadog.yaml`, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Gérez l'Agent {#manage-the-agent}

Pour gérer l'Agent, utilisez :
- l'application Datadog Agent dans la barre d'état système pour une installation mono-utilisateur.
- `launchctl` pour une installation LaunchDaemon à l'échelle du système.
- la commande `datadog-agent`. Le binaire est situé dans `/usr/local/bin`.

Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d.`

## Windows {#windows}

À partir de la version 6.11.0, les composants principaux et APM/trace de l'Agent Windows s'exécutent sous le compte `ddagentuser` et sont créés lors de l'installation, au lieu de s'exécuter sous le compte `LOCAL_SYSTEM`. Si vous effectuez une mise à niveau depuis une version 6.x de l'Agent Datadog vers la version 6.11 ou supérieure, consultez la documentation sur l'[utilisateur de l'Agent Windows][10] avant de procéder à la mise à niveau.

Les liens vers toutes les versions disponibles du programme d'installation Windows sont disponibles au [format JSON][6].

### Installez l'Agent {#install-the-agent-1}

#### Interactif {#interactive}

1. Téléchargez et exécutez le [programme d'installation de l'Agent Datadog][4].
1. Exécutez le programme d'installation (en tant qu'administrateur) en ouvrant `datadog-agent-6-latest.amd64.msi`.
1. Suivez les instructions, acceptez le contrat de licence et saisissez votre clé d'API Datadog.
1. Saisissez votre région Datadog : {{< region-param key=dd_site code="true" >}}.
1. Si vous le souhaitez, lancez le Datadog Agent Manager lorsque vous y êtes invité.

#### Sans intervention {#unattended}

1. Téléchargez et exécutez le [programme d'installation de l'Agent Datadog][4].
1. Exécutez l'une des commandes suivantes dans le répertoire où vous avez téléchargé le programme d'installation, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   - Invite de commande :
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell :
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` et `TAGS` sont des valeurs facultatives. Consultez la [documentation de l'Agent Windows][5] pour connaître toutes les options disponibles.

#### Déploiement sur Azure {#deployment-to-azure}

Pour installer l'Agent sur Azure, suivez la [documentation Microsoft Azure][8].

## Linux {#linux}

{{< tabs >}}

{{% tab "Debian" %}}
### Installation en une étape {#one-step-install}

La commande en une étape installe les paquets APT pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration de install_script][101].

Pour installer l'Agent, exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes {#multi-step-install}

1. Configurez APT pour qu'il puisse télécharger via HTTPS et installez `curl` et `gnupg` :
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configurez le dépôt Debian Datadog sur votre système et créez un trousseau de clés d'archive Datadog :
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```

1. Si vous utilisez Debian 8 ou une version antérieure, copiez le trousseau de clés vers `/etc/apt/trusted.gpg.d` :
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Mettez à jour votre dépôt APT local et installez l'Agent :
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version supérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/'
                    /etc/datadog-agent/datadog.yaml"
   ```
1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Démarrez l'Agent :
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Ubuntu" %}}
### Installation en une étape {#one-step-install-1}

La commande en une étape installe les paquets APT pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, placez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-1}

1. Configurez APT pour qu'il puisse télécharger via HTTPS et installez `curl` et `gnupg` :
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configurez le dépôt Debian Datadog sur votre système et créez un trousseau de clés d'archive Datadog :
   ```shell
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 6' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
1. Si vous utilisez Ubuntu 14 ou une version antérieure, copiez le trousseau de clés vers `/etc/apt/trusted.gpg.d` :
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Mettez à jour votre dépôt APT local et installez l'Agent :
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version supérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Démarrez l'Agent : 
   - Ubuntu 16.04 et versions ultérieures :
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04 :
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Installation en une étape {#one-step-install-2}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration d'install_script][101].

1. Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. Pour les installations sur Amazon Linux 2022 avec une version de l'Agent <= 6.39, l'Agent nécessite le paquet `libxcrypt-compat` :
   ```shell
   dnf install -y libxcrypt-compat
   ```

### Installation en plusieurs étapes {#multi-step-install-2}

1. Sur un hôte x86_64, configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec la configuration suivante :
   ```conf
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

1. Sur un hôte arm64, configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec la configuration suivante :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/stable/6/aarch64/ 
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5 ou 6, supprimez la clé GPG RPM obsolète :
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Mettez à jour votre dépôt yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version ultérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Démarrez l'Agent : 
   - Amazon Linux 2.0 :
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Amazon Linux 1.0 :
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "CentOS et RedHat" %}}
### Installation en une étape {#one-step-install-3}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration d'install_script][101].

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-3}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec la configuration suivante :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=0
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

   **Remarque** : l'option `repo_gpgcheck=0` est une solution de contournement pour [un bug dans DNF][102].

1. Si vous effectuez une mise à niveau depuis l'Agent 5 ou une version précédente de l'Agent 6, supprimez la clé GPG RPM obsolète :
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Mettez à jour votre dépôt yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version ultérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Démarrez l'Agent : 
   - CentOS ou Red Hat 7 et versions ultérieures :
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - CentOS ou Red Hat 6 :
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle et Rocky" %}}
### Installation en une étape {#one-step-install-4}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration d'install_script][101].

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-4}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec la configuration suivante :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5 ou une version précédente de l'Agent 6, supprimez la clé GPG RPM obsolète :
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Mettez à jour votre dépôt yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version ultérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Redémarrez l'Agent : 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### Installation en une étape {#one-step-install-5}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration d'install_script][101].

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-5}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec la configuration suivante :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5 ou une version précédente de l'Agent 6, supprimez la clé GPG RPM obsolète :
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Mettez à jour votre dépôt yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version ultérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Redémarrez l'Agent : 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "SUSE" %}}
### Installation en une étape {#one-step-install-6}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent existant, les valeurs actuelles sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines options de l'Agent lors du processus d'installation initiale. Pour plus d'informations, consultez les [options de configuration du script d'installation][101].

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-6}

1. Configurez le dépôt YUM Datadog en créant `/etc/zypp/repos.d/datadog.repo` avec la configuration suivante :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=hhttps://yum.datadoghq.com/suse/stable/6/x86_64
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5 ou une version précédente de l'Agent 6, supprimez la clé GPG RPM obsolète :
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Mettez à jour votre dépôt zypper local et installez l'Agent :
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis l'Agent 5.17 ou une version supérieure, vous pouvez importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez la configuration d'exemple à l'emplacement approprié et installez l'Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Assurez-vous que les autorisations de l'utilisateur de l'Agent sont correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
   
1. Redémarrez l'Agent : 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{< /tabs >}}

## Cloud et conteneurs {#cloud-and-containers}

{{< tabs >}}

{{% tab "Kubernetes" %}}

Exécutez l'Agent Datadog directement dans votre cluster Kubernetes pour commencer à collecter les métriques, traces et journaux de votre cluster et de vos applications. Vous pouvez déployer l'Agent avec un chart Helm, [Datadog Operator][101] ou directement avec [un DaemonSet][102]. Pour plus d'informations sur l'installation de l'Agent Datadog sur différentes distributions, consultez la [documentation sur les distributions Kubernetes][103].

### Installation de l'Agent Datadog {#installing-the-datadog-agent}

Pour installer le chart avec un nom de release personnalisé `RELEASE_NAME` :

1. [Installez Helm][104].
1. Ajoutez le dépôt Helm Datadog :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. Récupérez la dernière version des charts nouvellement ajoutés :
   ```shell
   helm repo update
   ```

1. Créez un fichier `values.yaml` vide et modifiez, si vous le souhaitez, les [valeurs par défaut][105] de votre choix. Consultez le [dépôt Datadog `helm-charts`][106] pour obtenir des exemples. 
1. Déployez l'Agent Datadog en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   **Avec Helm v3+** :
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **Avec Helm v1 ou v2** :
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   Ce chart ajoute l'Agent Datadog à tous les nœuds de votre cluster à l'aide d'un DaemonSet. Peu après l'installation, Datadog commence à transmettre à votre compte des données sur les hôtes et les métriques.

### Activation de la collecte des journaux {#enabling-log-collection}

Pour activer la collecte des journaux avec Helm, mettez à jour votre fichier `datadog-values.yaml` avec la configuration de collecte des journaux suivante :

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

Ensuite, mettez à niveau votre chart Helm Datadog :

```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### Activation de la collecte de traces {#enabling-trace-collection}

Suivez la [documentation de configuration APM][107] dédiée pour apprendre à collecter les traces de votre application dans un environnement Kubernetes.

### Pour aller plus loin {#further-reading}

Pour plus d'informations sur les fonctionnalités disponibles de l'Agent, consultez la [documentation Kubernetes][108].

[101]: /fr/containers/kubernetes/?tab=operator
[102]: /fr/containers/kubernetes/?tab=daemonset
[103]: /fr/containers/kubernetes/distributions/
[104]: https://v3.helm.sh/docs/intro/install/
[105]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[106]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[107]: https://dd-dev-local.datad0g.com/apm/service-setup?architecture=container-based&collection=Helm%20Chart%20%28Recommended%29&environment=kubernetes
[108]: /fr/containers/kubernetes/
{{% /tab %}}

{{% tab "Docker" %}}
### Installation en une étape {#one-step-install-7}

La commande d'installation en une étape exécute un conteneur Docker signé qui intègre l'Agent Datadog pour surveiller votre hôte. L'intégration Docker est activée par défaut, tout comme l'[Autodiscovery][101] en mode de configuration automatique.

<div class="alert alert-info">Vous ne devez pas exécuter plus d'un Agent Datadog par nœud. L'exécution de plusieurs Agents peut entraîner un comportement inattendu.</a></div>

Pour une installation en une étape, exécutez la commande suivante. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

Sur Amazon Linux v2 :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

Sur les autres systèmes d'exploitation :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" registry.datadoghq.com/agent:6
```

#### Dépannage {#troubleshooting}

Si la commande d'installation en une étape ne fonctionne pas, il est possible que votre système monte le répertoire `cgroup` à un emplacement inattendu ou n'utilise pas les CGroups pour la gestion de la mémoire. Les CGroups sont requis pour que la vérification Docker réussisse. Pour activer les CGroups, consultez [la documentation de configuration][102]. 

Si les CGroups sont activés, mais que la vérification échoue en raison d'un emplacement inattendu du répertoire `cgroup` :
1. Exécutez `mount | grep "cgroup type tmpfs"` pour récupérer l'emplacement du répertoire `cgroup`.
1. Remplacez la première occurrence de `/sys/fs/cgroup` dans la commande d'installation en une étape par l'emplacement du répertoire `cgroup`.

### Envoyez des métriques personnalisées avec DogStatsD {#send-custom-metrics-with-dogstatsd}

Par défaut, DogStatsD n'écoute que localhost. Pour recevoir les paquets DogStatsD provenant d'autres conteneurs :
1. Ajoutez `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` aux paramètres du conteneur. 
1. Associez le port statsd du conteneur à l'adresse IP de l'hôte en ajoutant l'option `-p 8125:8125/udp` aux paramètres du conteneur.
1. Configurez votre bibliothèque cliente pour envoyer des paquets UDP à l'adresse IP de l'hôte.

### Personnalisez la configuration de votre Agent {#customize-your-agent-configuration}

- Pour plus d'informations sur la configuration de l'Agent, consultez [Agent Docker pour Docker, containerd et Podman][103].
- Pour régler l'Autodiscovery, consultez [Autodiscovery des intégrations Docker][104].

[101]: /fr/containers/docker/integrations/?tabs=docker
[102]: /fr/containers/docker/?tab=standard#setup
[103]: /fr/containers/docker/?tab=standard
[104]: /fr/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
L'exécution de CoreOS Container Linux est prise en charge avec l'environnement d'exécution Docker. Pour les instructions d'installation, consultez [Docker][1].

Pour exécuter CoreOS Tectonic sur Kubernetes, consultez [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
À partir de la version 6.1, l'Agent Datadog prend en charge la surveillance des clusters OpenShift Origin et Enterprise. Selon vos besoins et les contraintes de sécurité de votre cluster, trois scénarios de déploiement sont pris en charge :

- [Opérations SCC restreintes][101]
- [Opérations SCC réseau hôte][102]
- [Datadog personnalisé pour toutes les fonctionnalités][103]

Pour installer OpenShift, consultez les [instructions d'installation de Kubernetes](?tab=kubernetes#cloud-and-containers). L'intégration Kubernetes cible OpenShift 3.7.0+ par défaut. Pour les versions antérieures d'OpenShift, vous devez effectuer des étapes d'installation supplémentaires. Pour plus d'informations, consultez la [documentation d'intégration OpenShift][104].

[101]: /fr/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /fr/integrations/openshift/?tab=helm#host
[103]: /fr/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /fr/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">La version BOSH de l'Agent Datadog fonctionne uniquement sur les stemcells Ubuntu et Red Hat.</a></div>

1. Téléversez la version de l'Agent Datadog vers votre BOSH Director :

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configurez Datadog en tant qu'addon dans votre configuration d'exécution. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

   ```yaml
   # runtime.yml
   ---
   releases:
   - name: datadog-agent
      version: $UPLOADED_VERSION # e.g. 1.0.5140

   addons:
   - name: datadog
   jobs:
   - name: dd-agent
      release: datadog-agent
   properties:
      dd:
         use_dogstatsd: yes
         dogstatsd_port: 18125 # Many Cloud Foundry deployments have their own StatsD listening on port 8125
         api_key: MY_API_KEY
         tags: ["my-cloud-foundry-deployment"] # optional. Add any tags you wish
         # Optionally, enable any Agent Checks here
         # integrations:
         #   directory:
         #     init_config: {}
         #     instances:
         #       directory: "."
   ```

3. Ajoutez l'environnement d'exécution à votre [configuration d'exécution][101] :

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redéployez tous les déploiements existants :
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```
   
[101]: https://bosh.io/docs/runtime-config/   
{{% /tab %}}

{{< /tabs >}}

## Gestion de la configuration {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

L'installation de l'Agent avec Ansible nécessite la version 2.10 ou une version ultérieure d'Ansible.

<div class="alert alert-info">La collection Ansible Datadog prend en charge la plupart des distributions Linux Debian, basées sur RHEL et SUSE, macOS et Windows.<br></div>

### Prérequis {#prerequisites}

#### Windows {#windows-1}
Avant de pouvoir utiliser la collection Ansible Datadog pour gérer des hôtes Windows, vous devez installer la collection `ansible.windows` :

```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE et SLES {#opensuse-and-sles}

Avant de pouvoir utiliser la collection Ansible Datadog pour gérer des hôtes openSUSE/SLES, vous devez installer la collection `community.general` :

```shell
ansible-galaxy collection install community.general
```

### Installer Datadog {#install-datadog}

1. Installez la collection Ansible Datadog depuis Ansible Galaxy sur votre serveur Ansible :
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - La collection Ansible Datadog est également disponible via le [Red Hat Automation Hub][101] où elle est officiellement certifiée par Red Hat.
   - L'installation de la collection est recommandée. Si nécessaire, vous pouvez également installer Datadog en utilisant le [rôle autonome][102].

2. Pour déployer l'Agent Datadog sur des hôtes, ajoutez le rôle Datadog et votre clé d'API à votre playbook. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 6
      datadog_site: "datad0g.com"
   ```

   Pour vous assurer que l'Agent peut regrouper vos hôtes, utilisez uniquement les noms d'hôte des nœuds suivis par l'Agent Datadog. Vous pouvez vérifier quels noms d'hôte l'Agent suit en utilisant la commande suivante :

   ```shell
   sudo datadog-agent status
   ```

## Vérifications spécifiques de l'Agent {#specific-agent-checks}

Pour utiliser une vérification ou une intégration spécifique de l'Agent sur l'un de vos nœuds, vous pouvez utiliser la variable `datadog_checks`. Voici un exemple pour la vérification de processus :

```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 6
    datadog_site: "datad0g.com"
    datadog_checks:
      process:
        init_config:
        instances:
          - name: ssh
            search_string: ['ssh', 'sshd']
          - name: syslog
            search_string: ['rsyslog']
            cpu_check_interval: 0.2
            exact_match: true
            ignore_denied_access: true
```

Vous pouvez trouver plus d'exemples d'utilisation du rôle de l'Agent sur le dépôt GitHub pour le [rôle autonome][103].

### Métriques et événements {#metrics-and-events}

Pour obtenir des métriques et des événements sur Datadog après l'exécution d'Ansible, consultez la [page GitHub][104] du projet de callback Ansible.

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /fr/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">À partir de la version 2.9.0, le <code>datadog_agent</code> module prend en charge les nœuds Windows et Linux. Les versions précédentes du module datadog_agent ne prennent en charge que les nœuds Linux.</a></div>

## Prérequis : {#requirements}
- Nécessite la version >= 4.6 de Puppet Open Source ou la version >= 2016.4 de Puppet Enterprise

## Installer l'Agent {#install-the-agent-2}

1. Installez le module `datadog_agent` depuis [Puppet Forge][101] sur votre serveur Puppet :
   - Pour les nouvelles installations, exécutez le `module install command` :
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si le module est déjà installé, mettez-le à jour :
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Pour déployer l'Agent Datadog sur des nœuds, ajoutez cette classe paramétrée à vos manifestes. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   Pour vous assurer que l'Agent peut regrouper vos hôtes, utilisez uniquement les noms d'hôte des nœuds suivis par l'Agent Datadog. Vous pouvez vérifier quels noms d'hôte l'Agent suit en utilisant la commande suivante :

   ```shell
   sudo datadog-agent status
   ```

3. Activez le reporting vers Datadog sur votre serveur Puppet :
   1. Ajoutez les paramètres suivants à `/etc/puppet/puppet.conf` :
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. Dans votre manifeste, ajoutez l'option `puppet_run_reports` à votre serveur Puppet. Par exemple :
      ```puppet
      node "puppet" {
         class { "datadog_agent":
            api_key => "MY_API_KEY",
            datadog_site => "datad0g.com",
            agent_major_version => 6,
            puppet_run_reports => true,
         }
      }
      ```
1. Exécutez Puppet sur votre serveur Puppet pour installer toutes les dépendances nécessaires.
1. Redémarrez votre serveur Puppet pour commencer à recevoir des données Puppet dans Datadog.

## Vérifications spécifiques de l'Agent {#specific-agent-checks-1}

Pour utiliser une vérification ou une intégration spécifique de l'Agent sur l'un de vos nœuds, consultez le [manifeste d'intégration][102] correspondant pour obtenir un exemple de code. Voici un exemple pour l'intégration elasticsearch :

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => "MY_API_KEY",
        datadog_site => "datad0g.com",
        agent_major_version => 6,
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

Reportez-vous au [dépôt GitHub du module][103] pour plus d'exemples et de cas d'utilisation avancés.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Nécessite la version 10.14.x ou une version ultérieure de Chef.</a></div>

1. Ajoutez le cookbook Datadog :
   - Si vous utilisez [Berkshelf][101], ajoutez le cookbook à votre Berksfile :
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - Si vous n'utilisez pas Berkshelf, installez le cookbook dans votre dépôt en utilisant Knife :
     ```shell
     knife cookbook site install datadog 
     ```

1. Définissez les attributs spécifiques à Datadog dans un rôle, un environnement ou une autre recette. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. Téléversez le cookbook mis à jour sur votre serveur Chef :
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Ajoutez le cookbook au `run_list` ou au `role` de votre nœud :
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Attendez la prochaine exécution planifiée de `chef-client`.


Pour plus d'informations et d'exemples, consultez le [dépôt GitHub de l'Agent][102].

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La formule Saltstack Datadog prend uniquement en charge les systèmes basés sur Debian et RedHat.<br><br>
Les instructions suivantes ajoutent la formule Datadog au <code>base</code> l'environnement Salt. Pour l'ajouter à un autre environnement Salt, remplacez les références à <code>base</code> par le nom de votre environnement Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Installer en utilisant `gitfs_remotes` {#install-using-gitfs-remotes}
1. Installez la [formule Datadog][101] dans l'environnement de base de votre nœud Salt Master, en utilisant l'option `gitfs_remotes` dans votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
   ```yaml
   fileserver_backend:
   - roots # Active by default, necessary to be able to use the local salt files we define in the next steps
   - gitfs # Adds gitfs as a fileserver backend to be able to use gitfs_remotes

   gitfs_remotes:
   - https://github.com/DataDog/datadog-formula.git:
     - saltenv:
       - base:
       - ref: 3.0 # Pin here the version of the formula you want to use
   ```

1. Redémarrez votre service Salt Master :
   ```shell
   systemctl restart salt-master
   ```
   ou 
   ```shell
   service salt-master restart
   ```

### Installer en clonant la formule Datadog {#install-by-cloning-the-datadog-formula}

1. Clonez la [formule Datadog][101] sur votre nœud Salt Master :
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Ajoutez la formule clonée à l'environnement de base dans `file_roots` de votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Déployez l'Agent sur vos hôtes {#deploy-the-agent-to-your-hosts}

1. Ajoutez la formule Datadog à votre fichier top (par défaut `/srv/salt/top.sls`) :
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Ajoutez un fichier pillar `datadog.sls` à votre répertoire pillar (par défaut `/srv/pillar/`) et ajoutez votre clé d'API. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. Ajoutez le fichier pillar `datadog.sls` au fichier top pillar (par défaut `/srv/pillar/top.sls`) :
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Pour utiliser une vérification ou une intégration spécifique de l'Agent sur l'un de vos hôtes, vous pouvez utiliser la variable checks. Voici un exemple pour l'intégration directory :
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

Consultez le [dépôt GitHub][101] de la formule pour la configuration des journaux, des exemples de vérifications et des cas d'utilisation avancés.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Installer à partir des sources {#install-from-source}

Suivez [les instructions du dépôt GitHub de l'Agent][11] pour compiler les paquets `.deb` et `.rpm` de l'Agent 6 sur Linux avec Docker.

Sinon, vous pouvez compiler le binaire de l'Agent pour la version 6 en suivant les [instructions de démarrage][12].

## Pour aller plus loin {#further-reading-1}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: https://s3.amazonaws.com/dd-agent/datadogagent.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-6-latest.amd64.msi
[5]: /fr/agent/basic_agent_usage/windows/
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /fr/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation
[10]: /fr/agent/guide/windows-agent-ddagent-user/
[11]: https://github.com/DataDog/datadog-agent/blob/main/docs/dev/agent_omnibus.md#building-inside-docker-linux-only-recommended
[12]: https://github.com/DataDog/datadog-agent#getting-started