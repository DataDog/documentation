---
further_reading:
- link: agent/
  tag: Documentation
  text: L'Agent Datadog
private: true
title: Installer l'Agent Datadog 6
---

Ce guide décrit comment installer la version 6 de l'Agent. Datadog recommande d'installer la version 7 de l'Agent ou d'effectuer la mise à niveau vers celle-ci pour bénéficier des dernières fonctionnalités. Pour en savoir plus sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation les plus récentes de l'Agent][1]. Pour obtenir plus d'informations sur la mise à niveau vers la version 7 de l'Agent à partir d'une version antérieure, consultez la section relative à la [mise à niveau vers la version 7 de l'Agent Datadog][2].

## macOS

- La version 6 de l'Agent Datadog nécessite macOS 10.12 ou ultérieur.
- La version 6.34 de l'Agent est la dernière à prendre en charge macOS 10.12.
- La version 6.38 de l'Agent est la dernière version 6 pour macOS.

### Installer l'Agent

#### Ligne de commande

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
{{< code-block lang="shell" >}}
DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="${site}" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

L'Agent s'exécute à l'ouverture de la session. Vous pouvez le désactiver à partir de la barre d'état système.

#### LaunchDaemon

L'Agent Datadog peut être installé en tant que LaunchDaemon dans l'ensemble du système en spécifiant `DD_SYSTEMDAEMON_INSTALL=true` et `DD_SYSTEMDAEMON_USER_GROUP=username:groupname`. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

{{< code-block lang="shell" >}}
DD_SYSTEMDAEMON_INSTALL=true DD_SYSTEMDAEMON_USER_GROUP=username:groupname DD_AGENT_MAJOR_VERSION=6 DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_mac_os.sh)"
{{< /code-block >}}

L'Agent s'exécute au démarrage du système. Un utilisateur non root valide et son groupe doivent être fournis à l'aide de la variable `DD_SYSTEMDAEMON_USER_GROUP`. Le processus de l'Agent s'exécute sous cet utilisateur et ce groupe.

L'application de la barre d'état système n'est pas prise en charge par les installations via un LaunchDaemon dans l'ensemble du système.

#### Interface graphique

1. Téléchargez et installez le [package DMG][3].
1. Ajoutez la ligne suivante à `/opt/datadog-agent/etc/datadog.yaml`, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
api_key: MY_API_KEY
site: datad0g.com
{{< /code-block >}}

### Gérer l'Agent

Vous disposez des ressources suivantes pour gérer l'Agent :
- L'application de l'Agent Datadog dans la barre d'état système, pour les installations basées sur un seul utilisateur
- `launchctl` pour les installations via un LaunchDaemon dans l'ensemble du système
- La commande `datadog-agent` ; le binaire se trouve dans `/usr/local/bin`

Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d.`

## Windows

Depuis la version 6.11.0, les composants principaux, APM et de tracing de l'Agent Windows s'exécutent sous le compte `ddagentuser` et sont créés au moment de l'installation, au lieu de s'exécuter sous le compte `LOCAL_SYSTEM`. Si vous passez d'une version 6.x de l'Agent Datadog à la version 6.11 ou à une version ultérieure, consultez la documentation [Utilisateur de l'Agent pour Windows][10] avant de procéder à la mise à niveau.

Les liens vers les différentes versions du programme d'installation de Windows sont fournis au [format JSON][6].

### Installer l'Agent

#### Installation interactive

1. Téléchargez et exécutez le [programme d'installation de l'Agent Datadog][4].
1. Exécutez le programme d'installation (en tant qu'administrateur) en ouvrant `datadog-agent-6-latest.amd64.msi`.
1. Suivez les instructions à l'écran, acceptez l'accord de licence et saisissez votre clé d'API Datadog.
1. Saisissez votre région Datadog : {{< region-param key=dd_site code="true" >}}.
1. Si vous le souhaitez, lancez le Datadog Agent Manager lorsque cela vous est demandé.

#### Installation sans surveillance

1. Téléchargez et exécutez le [programme d'installation de l'Agent Datadog][4].
1. Exécutez l'une des commandes suivantes dans le répertoire où vous avez téléchargé le programme d'installation, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   - Invite de commandes :
     {{< code-block lang="shell" >}}
start /wait msiexec /qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"
{{< /code-block >}}
   - Powershell :
     {{< code-block lang="powershell" >}}
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-6-latest.amd64.msi APIKEY="MY_API_KEY" SITE="datad0g.com"'
{{< /code-block >}}

`HOSTNAME` et `TAGS` sont des valeurs facultatives. Consultez la [documentation relative à l'Agent Windows][5] pour découvrir toutes les options disponibles.

#### Déploiement sur Azure

Pour installer l'Agent sur Azure, suivez les instructions de la [documentation Microsoft Azure][8].

## Linux et Unix

{{< tabs >}}

{{% tab "Debian" %}}
### Installation en une seule étape

La commande en une seule étape installe les packages APT pour l'Agent Datadog et vous demande de saisir votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent, les valeurs existantes sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines des options de l'Agent au cours de la procédure d'installation initiale. Pour en savoir plus, consultez les [options de configuration install_script][101].

Pour installer l'Agent, exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes

1. Configurez APT afin de pouvoir effectuer des téléchargements via HTTPS et installer `curl` et `gnupg` :
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configurez le référentiel Debian de Datadog sur votre système et créez un keyring d'archive Datadog :
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

1. Si vous utilisez Debian 8 ou une version antérieure, copiez le keyring vers `/etc/apt/trusted.gpg.d` :
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Mettez à jour votre répertoire APT local et installez l'Agent :
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Si vous effectuez une mise à niveau depuis la version 5.17 ou une version ultérieure de l'Agent, vous pouvez choisir d'importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez l'exemple de configuration et installez le fichier Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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
### Installation en une seule étape

La commande en une seule étape installe les packages APT pour l'Agent Datadog et vous demande de saisir votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes

1. Configurez APT afin de pouvoir effectuer des téléchargements via HTTPS et installer `curl` et `gnupg` :
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configurez le référentiel Debian de Datadog sur votre système et créez un keyring d'archive Datadog :
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
1. Si vous utilisez Ubuntu 14 ou une version antérieure, copiez le keyring vers `/etc/apt/trusted.gpg.d` :
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Mettez à jour votre répertoire APT local et installez l'Agent :
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Si vous effectuez une mise à niveau depuis la version 5.17 ou une version ultérieure de l'Agent, vous pouvez choisir d'importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez l'exemple de configuration et installez le fichier Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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
   - Ubuntu 16.04 et versions ultérieures :
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Ubuntu 14.04 :
     ```shell
     sudo initctl start datadog-agent
     ```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Installation en une seule étape

La commande en une seule étape installe les packages YAM pour l'Agent Datadog et vous demande de saisir votre mot de passe.
- Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.
- Si vous disposez d'un fichier de configuration de l'Agent, les valeurs existantes sont conservées lors de la mise à jour.
- Vous pouvez configurer certaines des options de l'Agent au cours de la procédure d'installation initiale. Pour en savoir plus, consultez les [options de configuration install_script][101].

1. Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
   ```

1. For Amazon Linux 2022 installations on Agent version <= 6.39. The Agent requires the `libxcrypt-compat` package:
   ```shell
   dnf install -y libxcrypt-compat
   ```

### Multi-step install

1. On an x86_64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. On an arm64 host, set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If upgrading from Agent 5 or 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```
1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```
1. Start the Agent: 
   - Amazon Linux 2.0:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Amazon Linux 1.0:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "CentOS and RedHat" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

   **Note**: The `repo_gpgcheck=0` option is a workaround for [a bug in DNF][102].

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Start the Agent: 
   - Centos or Red Hat 7 and higher:
     ```shell
     sudo systemctl restart datadog-agent.service
     ```
   - Centos or Red Hat 6:
     ```shell
     sudo initctl start datadog-agent
     ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
[102]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
{{% /tab %}}

{{% tab "Alma, Oracle, and Rocky" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Fedora" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Multi-step install

1. Set up the Datadog YUM repo by creating `/etc/yum.repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local yum repo and install the Agent:
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```

1. Optionally, if upgrading from Agent 5.17 or higher, import your existing Agent 5 configuration:
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. If you're not upgrading and do not want to use an old configuration, copy the example config into place and install the Agent. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sudo sh -c "sed 's/api_key:.*/api_key: .*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configure the Datadog region:
   ```shell
   sudo sh -c "sed -i 's/# site:.*/site: datad0g.com/' /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure the Agent user's permissions are correct::
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 640 /etc/datadog-agent/datadog.yaml"
   ```

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "Suse" %}}
### One-step install

The one-step command installs the YUM packages for the Datadog Agent and prompts you for your password.
- If the Agent is not already installed on your machine and you don't want it to start automatically after the installation, prepend `DD_INSTALL_ONLY=true` to the command before running it.
- If you have an existing Agent configuration file, existing values are retained during the update.
- You can configure some of the Agent options during the initial install process. For more information, check the [install_script configuration options][101].

Run the following command, replacing `MY_API_KEY` with your Datadog API key:
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent6.sh)"
```

### Installation en plusieurs étapes

1. Set up the Datadog YUM repo by creating `/etc/zypp/repos.d/datadog.repo` with the following configuration:
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

1. If you're upgrading from Agent 5 or a previous version of Agent 6, delete the obsolete RPM GPG key:
   ```shell
   sudo sh -c 'if rpm -q gpg-pubkey-4172a230-55dd14f6 >/dev/null; then rpm --erase gpg-pubkey-4172a230-55dd14f6; fi'
   ```

1. Update your local zypper repo and install the Agent:
   ```shell
   sudo zypper refresh
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_4F09D16B.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   sudo rpm --import https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   sudo zypper install datadog-agent
   ```

1. Si vous effectuez une mise à niveau depuis la version 5.17 ou une version ultérieure de l'Agent, vous pouvez choisir d'importer votre configuration existante de l'Agent 5 :
   ```shell
   sudo -u dd-agent -- datadog-agent import /etc/dd-agent /etc/datadog-agent
   ```

1. Si vous n'effectuez pas de mise à niveau et que vous ne souhaitez pas utiliser une ancienne configuration, copiez l'exemple de configuration et installez le fichier Agent. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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

1. Restart the Agent: 
   ```shell
   sudo systemctl restart datadog-agent.service
   ```

[101]: https://github.com/DataDog/agent-linux-install-script/blob/main/README.md#agent-configuration-options
{{% /tab %}}

{{% tab "AIX" %}}
### Installation en une seule étape

The one-step command installs the latest BFF package for the Datadog Agent and prompts you for your password if necessary. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

### Upgrade from a previous installation

To install the Agent while keeping your existing configuration, run the following command:
```shell
DD_UPGRADE=true DD_SITE="datad0g.com" ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

For a full list of the available installation script environment variables, see [Basic Agent Usage for AIX][101].

### Installation en plusieurs étapes

1. Download the preferred BFF from the [datadog-unix-agent][102] repo releases.

1. Install the artifact as root with `installp`:
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```

1. If you don't have an existing configuration file, copy the example config into place. Replace `MY_API_KEY` with your Datadog API key:
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```

1. Configurez la région Datadog :
   ```shell
   sudo sh -c "sed \'s/# site:.*/site: datad0g.com/\' /etc/datadog-agent/datadog.yaml > /etc/datadog-agent/datadog.yaml.new && mv /etc/datadog-agent/datadog.yaml.new /etc/datadog-agent/datadog.yaml"
   ```

1. Ensure that the Datadog Agent has the correct permissions:
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```

1. Stop the Agent service:
   ```shell
   sudo stopsrc -s datadog-agent
   ```

1. Verify the Agent service has stopped:
   ```
   sudo lssrc -s datadog-agent
   ```

1. Restart the Agent service:
   ```shell
   sudo startsrc -s datadog-agent
   ```

[101]: /fr/agent/basic_agent_usage/aix/#installation
[102]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Cloud and containers

{{< tabs >}}

{{% tab "Kubernetes" %}}

Run the Datadog Agent directly in your Kubernetes cluster to start collecting your cluster and applications metrics, traces, and logs. You can deploy the Agent with a Helm chart, [the Datadog Operator][101] or directly with [a DaemonSet][102]. For more information about installing the Datadog Agent on different distributions, see the [Kubernetes distributions documentation][103].

### Installing the Datadog Agent

To install the chart with a custom release name `RELEASE_NAME`:

1. [Install Helm][104].
1. Add the Datadog Helm repository:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   ```

1. Fetch the latest version of newly added charts:
   ```shell
   helm repo update
   ```

1. Create an empty `values.yaml` file, and override any of the [default values][105] if desired. See the [Datadog `helm-charts` repo][106] for examples. 
1. Deploy the Datadog Agent, replacing `MY_API_KEY` with your Datadog API key:
   **With Helm v3+**:
   ```shell
   helm install RELEASE_NAME -f datadog-values.yaml --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   **With Helm v1 or v2**:
   ```shell
   helm install -f datadog-values.yaml --name RELEASE_NAME --set datadog.site='datad0g.com' --set agents.image.tag='6' --set datadog.apiKey=MY_API_KEY datadog/datadog
   ```

   This chart adds the Datadog Agent to all nodes in your cluster using a DaemonSet. Soon after installation, Datadog begins to report hosts and metrics data in your account.

### Enabling log collection

To enable log collection with Helm, update your `datadog-values.yaml` file with the following log collection configuration:

```yaml
datadog:
  logs:
    enabled: true
    containerCollectAll: true
```    

Then upgrade your Datadog Helm chart:
```shell
helm upgrade -f datadog-values.yaml RELEASE_NAME datadog/datadog
```

### Enabling trace collection

Follow the dedicated [APM setup documentation][107] to learn how to collect your application traces in a Kubernetes environment.

### Further Reading

For information on available Agent features, see the [Kubernetes documentation][108].

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
### Installation en une seule étape

The one-step installation command runs a signed Docker container which embeds the Datadog Agent to monitor your host. The Docker integration is enabled by default, as well as [Autodiscovery][101] in automatic configuration mode.

<div class="alert alert-info">You must not run more than one Datadog Agent per node. Running multiple Agents may result in unexpected behavior.</a></div>

For a one-step install, run the following command. Replace `MY_API_KEY` with your Datadog API key:

On Amazon Linux v2:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

On other operating systems:
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY=MY_API_KEY -e DD_SITE="datad0g.com" gcr.io/datadoghq/agent:6
```

#### Troubleshooting

If the one-step installation command does not work, it's possible that your system mounts the `cgroup` directory in an unexpected place or does not use CGroups for memory management. CGroups are required for the Docker check to succeed. To enable CGroups, see [the Setup documentation][102]. 

If CGroups are enabled, but the check is failing because of an unexpected `cgroup` directory location:
1. Run `mount | grep "cgroup type tmpfs"` to retrieve the location of the `cgroup` directory.
1. Replace the first occurrence of `/sys/fs/cgroup` in the one-step installation command with the location of the `cgroup` directory.

### Send custom metrics with DogStatsD

By default, DogStatsD only listens to localhost. To listen to DogStatsD packets from other containers:
1. Add `-e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true` to the container's parameters. 
1. Bind the container's statsd port to the hosts's IP by adding the `-p 8125:8125/udp` option to the container's parameters.
1. Configure your client library to send UDP packets to the hosts's IP.

### Customize your Agent configuration

- For information on configuring the Agent, see [Docker Agent for Docker, containerd, and Podman][103].
- To tune Autodiscovery, see [Docker Integrations Autodiscovery][104].

[101]: /fr/containers/docker/integrations/?tabs=docker
[102]: /fr/containers/docker/?tab=standard#setup
[103]: /fr/containers/docker/?tab=standard
[104]: /fr/containers/docker/integrations/?tab=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Running CoreOS Container Linux is supported with the Docker runtime. For installation instructions, see [Docker][1].

To run CoreOS Tectonic on Kubernetes, see [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Starting with version 6.1, the Datadog Agent supports monitoring OpenShift Origin and Enterprise clusters. Depending on your needs and the security constraints of your cluster, three deployment scenarios are supported:

- [Restricted SCC operations][101]
- [Host network SCC operations][102]
- [Custom Datadog for all features][103]

To install OpenShift, see the [Kubernetes installation instructions](?tab=kubernetes#cloud-and-containers). The Kubernetes integration targets OpenShift 3.7.0+ by default. For older versions of OpenShift, you must complete additional installation steps. For more information, see the [OpenShift integration documentation][104].

[101]: /fr/integrations/openshift/?tab=helm#restricted-scc-operations
[102]: /fr/integrations/openshift/?tab=helm#host
[103]: /fr/integrations/openshift/?tab=helm#custom-datadog-scc-for-all-features
[104]: /fr/integrations/openshift/?tab=helm#installation
{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">The Datadog Agent BOSH release only works on Ubuntu and Red Hat stemcells.</a></div>

1. Upload the Datadog Agent release to your BOSH Director:

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configure Datadog as an addon in your runtime config. Replace `MY_API_KEY` with your Datadog API key::

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

3. Add the runtime to your [runtime config][101]:

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redeploy any existing deployments:
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

## Configuration management

{{< tabs >}}
{{% tab "Ansible" %}}

Installing the Agent with Ansible requires Ansible version 2.10 or higher.

<div class="alert alert-info">The Datadog Ansible collection supports most Debian, RHEL-based and SUSE-based Linux distributions, macOS, and Windows.<br></div>

### Prerequisites

#### Windows
Before you can use the Datadog Ansible Collection to manage Windows hosts, you must install the `ansible.windows` collection:
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE and SLES

Before you can use the Datadog Ansible Collection to manage openSUSE/SLES hosts, you must install the `community.general` collection:

```shell
ansible-galaxy collection install community.general
```

### Install Datadog

1. Install the Datadog Ansible collection from Ansible Galaxy on your Ansible server:
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - The Datadog Ansible collection is also available through the [Red Hat Automation Hub][101] where it is officially certified by Red Hat.
   - Installing the collection is recommended. If needed, you can also install Datadog using the [standalone role][102].

2. To deploy the Datadog Agent on hosts, add the Datadog role and your API key to your playbook. Replace `MY_API_KEY` with your Datadog API key:
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

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, you can use the `datadog_checks` variable. Here is an example for the process check:
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

You can find more examples of the Agent role usage on the GitHub repo for the [standalone role][103].

### Metrics and events

To get metrics and events on Datadog after Ansible runs, see the Ansible callback project's [GitHub page][104].

[101]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[102]: /fr/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[103]: https://github.com/DataDog/ansible-datadog/#role-variables
[104]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">Starting with version 2.9.0, the <code>datadog_agent</code> module supports both Windows and Linux nodes. Previous versions of the datadog_agent module only support Linux nodes.</a></div>

## Requirements:
- Requires Puppet Open Source version >= 4.6 or Puppet Enterprise version >= 2016.4

## Install the Agent

1. Install the `datadog_agent` module from the [Puppet Forge][101] on your Puppet server:
   - For fresh installs, run the `module install command`:
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - If the module is already installed, upgrade it:
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. To deploy the Datadog Agent on nodes, add this parametrized class to your manifests. Replace `MY_API_KEY` with your Datadog API key:
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY",
         datadog_site => "datad0g.com",
         agent_major_version => 6,
      }
   }
   ```

   To ensure that the Agent can group your hosts together, only use node hostnames that the Datadog Agent is tracking. You can check what hostnames the Agent is tracking using the following command:

   ```shell
   sudo datadog-agent status
   ```

3. Enable reporting to Datadog on your Puppet server:
   1. Add the following parameters to `/etc/puppet/puppet.conf`:
      ```conf
      [master]
      report = true
      reports = datadog_reports
      pluginsync = true

      [agent]
      report = true
      pluginsync = true
      ```

   1. In your manifest, add the `puppet_run_reports` option to your Puppet server. For example:
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
1. Run Puppet on your Puppet server to install all necessary dependencies.
1. Restart your Puppet server to begin receiving Puppet data in Datadog.

## Specific Agent checks

To use a specific Agent check or integration on one of your nodes, see the relevant [integration manifest][102] for a code sample. Here is an example for the elasticsearch integration:

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

Refer to the [GitHub repository of the module][103] for more examples and advanced use cases.

[101]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[102]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations
[103]: https://github.com/DataDog/puppet-datadog-agent

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Requires Chef version 10.14.x or higher.</a></div>

1. Add the Datadog cookbook:
   - If you are using [Berkshelf][101], add the cookbook to your Berksfile:
      ```shell
      cookbook 'datadog', '~> 4.0'
      ```

   - If you're not using Berkshelf, install the cookbook in to your repository using Knife:
     ```shell
     knife cookbook site install datadog 
     ```

1. Set the Datadog-specific attributes in either a role, environment, or another recipe. Replace `MY_API_KEY` with your Datadog API key:
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"

   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"

   # Enable install for Agent version 6
   node.default['datadog']['agent_major_version'] = 6

   # Set the Datadog site
   node.default['datadog']['site'] = "datad0g.com"
   ```

1. Upload the updated cookbook to your Chef server:
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Add the cookbook to your node's `run_list` or `role`:
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Wait for the next scheduled `chef-client` run.


For more information and examples, see the [Agent GitHub repository][102].

[101]: https://docs.chef.io/workstation/berkshelf/
[102]: https://github.com/DataDog/chef-datadog

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">The Datadog Saltstack formula only supports Debian-based and RedHat-based systems.<br><br>
The following instructions add the Datadog formula to the <code>base</code> Salt environment. To add it to another Salt environment, replace references to <code>base</code> with the name of your Salt environment.</div>

<!-- vale Datadog.inclusive = NO -->

### Install using `gitfs_remotes`
1. Install the [Datadog formula][101] in the base environment of your Salt Master node, using the `gitfs_remotes` option in your Salt Master configuration file (by default `/etc/salt/master`):
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

1. Restart your Salt Master service:
   ```shell
   systemctl restart salt-master
   ```
   or 
   ```shell
   service salt-master restart
   ```

### Install by cloning the Datadog formula

1. Clone the [Datadog formula][101] on your Salt Master node:
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas
   git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Add the cloned formula to the base environment in the `file_roots` of your Salt Master configuration file (by default `/etc/salt/master`):
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Deploy the Agent to your hosts

1. Add the Datadog formula to your top file (by default `/srv/salt/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Add a `datadog.sls` pillar file to your pillar directory (by default `/srv/pillar/`) and add your API key. Replace `MY_API_KEY` with your Datadog API key:
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT6_VERSION>
   ```

1. Add the `datadog.sls` pillar file to the top pillar file (by default `/srv/pillar/top.sls`):
   ```yaml
   base:
     '*':
       - datadog
   ```

1. To use a specific Agent check or integration on one of your hosts, you can use the checks variable. Here is an example for the directory integration:
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

Refer to the formula [GitHub repository][101] for logs configuration, check examples, and advanced use cases.
<!-- vale Datadog.inclusive = YES -->
[101]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Install from source

Follow [the instructions in the Agent GitHub repository][11] to build the Agent 6 `.deb` and `.rpm` packages on Linux with Docker.

Alternatively, you can build the Agent binary for version 6 following the [Getting Started instructions][12].

## Further reading

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