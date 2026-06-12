---
further_reading:
- link: agent/
  tag: Documentation
  text: L'Agent Datadog
private: true
title: Installer l'Agent Datadog 5
---

Ce guide décrit comment installer la version 5 de l'Agent. Datadog recommande d'installer la version 7 de l'Agent ou d'effectuer la mise à niveau vers celle-ci pour bénéficier des dernières fonctionnalités. Pour en savoir plus sur l'installation de la dernière version de l'Agent, suivez les [instructions d'installation les plus récentes de l'Agent][1]. Pour obtenir plus d'informations sur la mise à niveau vers la version 7 de l'Agent à partir d'une version antérieure, consultez la section relative à la [mise à niveau vers la version 7 de l'Agent Datadog][2].

## macOS

### Installer l'Agent

#### Ligne de commande

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Pour gérer l'Agent, utilisez la commande `datadog-agent`. Par défaut, le binaire `datadog-agent` se trouve dans `/usr/local/bin`. Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d`.

#### Interface graphique

1. Téléchargez et installez le [package DMG][3].
1. Ajoutez la ligne suivante à `/opt/datadog-agent/etc/datadog.conf`, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Pour gérer l'Agent, utilisez l'application Datadog Agent dans la barre d'état système. Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d`.

### Comportement d'exécution de l'Agent

Par défaut, l'Agent s'exécute à la connexion. Vous pouvez le désactiver à l'aide de l'application Datadog Agent dans la barre d'état système. Si vous souhaitez exécuter l'Agent au démarrage, utilisez ces commandes :
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### Désinstallation

1. Arrêtez et fermez l'Agent Datadog en cliquant sur l'icône en forme d'os dans la barre des menus.
1. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
1. Exécutez :

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

Si vous avez exécuté les commandes d'installation facultatives pour que l'Agent se lance au démarrage, exécutez les commandes suivantes pour finaliser la désinstallation :

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows

### Installer l'Agent

#### Interface graphique

Téléchargez et exécutez le programme d'installation de l'Agent Datadog :
- [Programme d'installation 64 bits][4].
- [Programme d'installation 32 bits][5]. Les installations 32 bits sont uniquement prises en charge jusqu'à la version 5.10.1 de l'Agent.

Les liens vers les différentes versions du programme d'installation de Windows sont fournis au [format JSON][6].

#### Ligne de commande

1. Téléchargez l'Agent :
   - Pour les nouvelles installations, téléchargez le [programme d'installation de l'Agent Datadog][4].
   - Si vous effectuez une mise à niveau depuis une version de l'Agent Datadog <5.12.0, utilisez la [méthode d'installation EXE][7].
1. Dans un shell `cmd.exe` dans le répertoire où vous avez téléchargé le programme d'installation, exécutez la commande suivante. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   Ajoutez éventuellement les valeurs `TAG` et `HOSTNAME`.

#### Déploiement sur Azure

Pour installer l'Agent sur Azure, suivez les instructions de la [documentation Microsoft Azure][8].

### Nouvelle procédure de mise à niveau pour la version 5.12

Si vous êtes un client existant exécutant un Agent Windows antérieur à la version 5.12, des étapes supplémentaires peuvent être nécessaires pour mettre à niveau votre appareil. Plus précisément, le dernier Agent est une installation « par machine ». Les versions précédentes de l'Agent étaient « par utilisateur » par défaut. Des étapes supplémentaires peuvent également être nécessaires si vous déployez avec Chef. Pour plus d'informations, consultez la section [Installation de l'Agent Windows][9]. 

### Désinstallation

L'Agent peut être désinstallé de deux façons différentes sur Windows. Les deux méthodes suppriment l'Agent, mais pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

**Remarque** : pour l'Agent < v5.12.0, il est important de désinstaller l'Agent avec le **compte d'origine** utilisé pour installer l'Agent, sinon il peut ne pas être supprimé proprement.

### Ajouter ou supprimer des programmes

1. Appuyez sur **CTRL** et **Échap** ou utilisez la touche Windows pour lancer la recherche Windows.
1. Recherchez `ajouter` et cliquez sur **Ajouter ou supprimer des programmes**.
1. Recherchez `Datadog Agent` et cliquez sur **Désinstaller**.

### PowerShell

**Remarque :** activez WinRM pour utiliser les commandes ci-dessous.

Utilisez la commande PowerShell suivante pour désinstaller l'Agent sans redémarrage :

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux et Unix

{{< tabs >}}

{{% tab "Debian" %}}
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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. Exécutez la commande suivante pour copier l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Démarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. Exécutez la commande suivante pour copier l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Démarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo apt-get remove datadog-agent -y
```

Cette commande supprime l'Agent, mais pas :

* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers de log Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Installation en une seule étape

La commande en une seule étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog:
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes

1. Configurez le référentiel YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Remarque** : sur l'architecture i386/i686, remplacez « x86_64 » par « i386 ». 

1. Mettez à jour votre référentiel yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copiez l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais pas :

* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers de log Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS and Red Hat" %}}
### Installation en une seule étape

La commande en une seule étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes

1. Configurez le référentiel YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Remarque** : sur l'architecture i386/i686, remplacez « x86_64 » par « i386 ». 

1. Mettez à jour votre référentiel YUM local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. Copiez l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais pas :

* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers de log Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### Installation en une seule étape

La commande en une seule étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes

1. Configurez le référentiel YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
   ```conf
   [datadog]
   name=Datadog, Inc.
   baseurl=https://yum.datadoghq.com/rpm/x86_64/
   enabled=1
   gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
          https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

   **Remarque** : sur l'architecture i386/i686, remplacez « x86_64 » par « i386 ». 

1. Mettez à jour votre référentiel YUM local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copiez l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais pas :

* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers de log Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Suse" %}}
### Installation en une seule étape

La commande en une seule étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes

1. Configurez le référentiel YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
   ```conf
   [datadog]
   name=Datadog, Inc.
   enabled=1
   baseurl=https://yum.datadoghq.com/suse/rpm/x86_64
   type=rpm-md
   gpgcheck=1
   repo_gpgcheck=0
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
   ```

1. Mettez à jour votre référentiel zypper local et installez l'Agent :
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. Copiez l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo zypper remove datadog-agent
```

Cette commande supprime l'Agent, mais pas :
* Le fichier de configuration `datadog.yaml`
* Fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers de log Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
### Installation en une seule étape

La commande en une seule étape installe le dernier paquet BFF pour l'Agent Datadog et vous demande votre mot de passe si nécessaire. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Mise à niveau depuis une installation précédente

Pour installer l'Agent tout en conservant votre configuration existante, exécutez la commande suivante :
```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

Pour obtenir une liste complète des variables d'environnement du script d'installation disponibles, consultez la section [Utilisation de base de l'Agent pour AIX][1].

### Installation en plusieurs étapes

1. Téléchargez le BFF préféré depuis les versions du référentiel [datadog-unix-agent][2] :
1. Installez l'artefact en tant que root avec `installp` :
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. Si vous n'avez pas de fichier de configuration existant, copiez l'exemple de configuration en place. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/datadog-agent/datadog.yaml.example > /etc/datadog-agent/datadog.yaml"
   ```
1. Assurez-vous que l'Agent Datadog dispose des autorisations correctes :
   ```shell
   sudo sh -c "chown dd-agent:dd-agent /etc/datadog-agent/datadog.yaml && chmod 660 /etc/datadog-agent/datadog.yaml"
   ```
1. Arrêtez le service de l'Agent :
   ```shell
   sudo stopsrc -s datadog-agent
   ```
1. Vérifiez que le service de l'Agent s'est arrêté :
   ```
   sudo lssrc -s datadog-agent
   ```
1. Redémarrez le service de l'Agent :
   ```shell
   sudo startsrc -s datadog-agent
   ```

### Désinstallation

Pour désinstaller l'Agent, exécutez la commande suivante :

Pour supprimer un Agent installé, exécutez la commande `installp` suivante :

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Remarque : les logs de désinstallation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver l'enregistrement de ces logs, supprimez le paramètre `-e` de la commande de désinstallation.

[1]: /fr/agent/basic_agent_usage/aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
{{% /tab %}}

{{< /tabs >}}

## Cloud et conteneurs

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Installer l'Agent
### Installation avec DaemonSets

Si vous exécutez Kubernetes >= 1.1.0, vous pouvez profiter des [DaemonSets][1] pour déployer automatiquement l'Agent Datadog sur tous vos nœuds

1. Créez un secret qui contient votre clé d'API. Ce secret est utilisé dans le manifeste pour déployer l'Agent Datadog. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key =" MY_API_KEY"
   ```

1. Créez le manifeste suivant nommé `dd-agent.yaml` :

   ```yaml
   apiVersion: extensions/v1beta1
   kind: DaemonSet
   metadata:
   name: dd-agent
   spec:
   template:
      metadata:
         labels:
         app: dd-agent
         name: dd-agent
      spec:
         containers:
         - image: gcr.io/datadoghq/docker-dd-agent:latest
         imagePullPolicy: Always
         name: dd-agent
         ports:
            - containerPort: 8125
               name: dogstatsdport
               protocol: UDP
         env:
            - name: DD_API_KEY
               valueFrom:
               secretKeyRef:
                  name: datadog-secret
                  key: api-key
            - name: KUBERNETES
               value: "yes"
            - name: SD_BACKEND
               value: docker
            # Uncomment this variable if the agent has issues reaching kubelet
            # - name: KUBERNETES_KUBELET_HOST
            #   valueFrom:
            #     fieldRef:
            #       fieldPath: status.hostIP  # Kubernetes >= 1.7
            #       # or
            #       # fieldPath: spec.nodeName  # Kubernetes < 1.7
         resources:
            requests:
               memory: "256Mi"
               cpu: "200m"
            limits:
               memory: "256Mi"
               cpu: "200m"
         volumeMounts:
            - name: dockersocket
               mountPath: /var/run/docker.sock
            - name: procdir
               mountPath: /host/proc
               readOnly: true
            - name: cgroups
               mountPath: /host/sys/fs/cgroup
               readOnly: true
         livenessProbe:
            exec:
               command:
               - ./probe.sh
            initialDelaySeconds: 15
            periodSeconds: 5
         volumes:
         - hostPath:
               path: /var/run/docker.sock
            name: dockersocket
         - hostPath:
               path: /proc
            name: procdir
         - hostPath:
               path: /sys/fs/cgroup
            name: cgroups
   ```

1. Déployez le DaemonSet :
   ```shell
   kubectl create -f dd-agent.yaml
   ```

<div class="alert alert-info">Ce manifeste active la fonctionnalité de configuration automatique d'Autodiscovery. Pour désactiver la configuration automatique, supprimez la définition de la variable d'environnement <code>SD_BACKEND</code>. Pour apprendre à configurer Autodiscovery, consultez la section <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Autodiscovery des intégrations Kubernetes</a>.</div>

### Exécuter l'Agent en tant que conteneur Docker

Si vous n'exécutez pas Kubernetes 1.1.0 ou version ultérieure, ou si vous ne souhaitez pas utiliser DaemonSets, exécutez l'Agent en tant que conteneur Docker sur chaque nœud que vous souhaitez surveiller. Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Envoyer des métriques custom

Si vous prévoyez d'envoyer des [métriques custom][2] à l'aide de DogStatsD :
1. Liez le port StatsD du conteneur à l'adresse IP du nœud en ajoutant un `hostPort` à la section `ports` de votre manifeste :
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. Configurez votre bibliothèque client pour envoyer des paquets UDP à l'adresse IP du nœud. Si vous utilisez le réseau en pont, la passerelle par défaut du conteneur de votre application correspond à l'adresse IP du nœud. Vous pouvez également utiliser l'API descendante pour exposer le nom d'hôte du nœud en tant que variable d'environnement.

## Personnaliser la configuration de votre Agent

Pour personnaliser la configuration de votre Agent, consultez la documentation dans le référentiel [docker-dd-agent][3] de l'Agent 5. Pour ajuster la configuration d'Autodiscovery, consultez la section [Autodiscovery des intégrations Kubernetes][4]. Pour désactiver Autodiscovery, supprimez la variable d'environnement `SD_BACKEND` de votre manifeste.

Pour obtenir des informations sur la collecte de métriques, de checks de service et d'événements, consultez la documentation de l'[intégration Kubernetes][5].

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /fr/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /fr/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /fr/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### Installation en une seule étape

L'installation en une seule étape exécute un conteneur Docker qui intègre l'Agent Datadog pour surveiller votre host. L'intégration Docker est activée par défaut, ainsi qu'Autodiscovery en mode de configuration automatique. Pour désactiver Autodiscovery, supprimez la variable `SD_BACKEND` de la commande d'installation en une seule étape.

#### Amazon Linux
Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Autres systèmes d'exploitation
Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Dépannage

Si la commande d'installation en une seule étape ne fonctionne pas, il est possible que votre système monte le répertoire `cgroup` dans un emplacement inattendu ou n'utilise pas CGroups pour la gestion de la mémoire. Les CGroups sont nécessaires pour que le check Docker réussisse. Pour activer les CGroups, consultez la documentation dans le référentiel [docker-dd-agent][1]. Si le check échoue en raison d'un emplacement de répertoire `cgroup` inattendu :

1. Exécutez `mount | grep "cgroup type tmpfs"` pour récupérer l'emplacement du répertoire `cgroup`.
1. Remplacez la première occurrence de `/sys/fs/cgroup` dans la commande d'installation en une étape par l'emplacement du répertoire `cgroup`.

### Envoyer des métriques custom

Pour envoyer des métriques custom à l'aide de DogStatsD :
1. Ajoutez l'option `-p 8125:8125/udp` à la commande d'installation. Cela lie le port StatsD du conteneur à l'adresse IP de l'host.
1. Configurez votre bibliothèque client pour envoyer des paquets UDP à l'adresse IP de l'host.

### Personnaliser la configuration de votre Agent

Pour personnaliser la configuration de votre Agent, consultez la documentation dans le référentiel [docker-dd-agent][2] de l'Agent 5. Pour ajuster la configuration d'Autodiscovery, consultez la section [Autodiscovery des intégrations Docker][3]. Pour désactiver Autodiscovery, supprimez la variable d'environnement `SD_BACKEND` de la commande d'installation en une seule étape.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/fr/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
Running CoreOS Container Linux is supported with the Docker runtime. For installation instructions, see [Docker][1].

Pour exécuter CoreOS Tectonic sur Kubernetes, consultez la section [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
For information on installing Datadog with OpenShift, see the [datadog-openshift][1] repo.

[1]: https://github.com/DataDog/datadog-openshift

{{% /tab %}}

{{% tab "Cloud Foundry" %}}
<div class="alert alert-info">La version BOSH de l'Agent Datadog ne fonctionne que sur les stemcells Ubuntu et Red Hat.</a></div>

1. Téléchargez la version de l'Agent Datadog sur votre directeur BOSH :

   ```shell
   # BOSH CLI v1
   bosh upload release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz

   # BOSH CLI v2
   bosh upload-release https://cloudfoundry.datadoghq.com/datadog-agent/datadog-agent-boshrelease-latest.tgz
   ```

2. Configurez Datadog en tant que module complémentaire dans votre configuration de runtime. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

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

3. Ajoutez le runtime à votre configuration de runtime :

   ```shell
   # BOSH cli v1
   bosh update runtime-config runtime.yml

   # BOSH cli v2
   bosh update-runtime-config runtime.yml
   ```

4. Redéployez tous les déploiements existants :
   ```shell
   # BOSH cli v1
   bosh deployment myDeployment.yml
   bosh -n deploy

   # BOSH cli v2
   bosh -n -d myDeployment deploy myDeployment.yml
   ```

{{% /tab %}}

{{< /tabs >}}

## Gestion de la configuration

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">La collection Ansible Datadog prend en charge la plupart des distributions Linux basées sur Debian, RHEL et SUSE, macOS et Windows.<br>Nécessite Ansible version 2.10 ou supérieure.</div>

### Prérequis

#### Windows
Avant de pouvoir utiliser la collection Ansible Datadog pour gérer les hosts Windows, vous devez installer la collection `ansible.windows` :
```shell
ansible-galaxy collection install ansible.windows
```

#### openSUSE et SLES

Avant de pouvoir utiliser la collection Ansible Datadog pour gérer les hosts openSUSE/SLES, vous devez installer la collection `community.general` :

```shell
ansible-galaxy collection install community.general
```

### Installer Datadog

1. Installez la collection Ansible Datadog depuis Ansible Galaxy sur votre serveur Ansible :
   ```shell
   ansible-galaxy collection install datadog.dd
   ```
   - La collection Ansible Datadog est également disponible via le [Red Hat Automation Hub][1] où elle est officiellement certifiée par Red Hat.
   - L'installation de la collection est recommandée. Si nécessaire, vous pouvez également installer Datadog à l'aide du [rôle autonome][2].

2. Pour déployer l'Agent Datadog sur les hosts, ajoutez le rôle Datadog et votre clé d'API à votre playbook. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```yaml
   - hosts: servers
   tasks:
      - name: Import the Datadog Agent role from the Datadog collection
         import_role:
         name: datadog.dd.agent
   vars:
      datadog_api_key: "MY_API_KEY"
      datadog_agent_major_version: 5
   ```

   Pour vous assurer que l'Agent peut regrouper vos hosts ensemble, utilisez uniquement les noms d'hôtes de nœuds que l'Agent Datadog suit. Vous pouvez vérifier quels noms d'hôtes l'Agent suit à l'aide de la commande suivante :

   ```shell
   service datadog-agent info
   ```

## Checks spécifiques de l'Agent

Pour utiliser un check ou une intégration spécifique de l'Agent sur l'un de vos nœuds, vous pouvez utiliser la variable `datadog_checks`. Voici un exemple pour le check de processus :
```yaml
- hosts: servers
  tasks:
    - name: Import the Datadog Agent role from the Datadog collection
      import_role:
        name: datadog.dd.agent
  vars:
    datadog_api_key: "MY_API_KEY"
    datadog_agent_major_version: 5
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

Vous pouvez trouver d'autres exemples d'utilisation du rôle Agent sur le référentiel Github du [rôle autonome][3].

### Métriques et événements

Pour obtenir des métriques et des événements sur Datadog après l'exécution d'Ansible, consultez la [page Github][4] du projet de rappel Ansible.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /fr/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">Le module <code>datadog_agent</code> ne prend en charge que les nœuds Linux.<br>Nécessite Puppet Agent version 2.7 ou supérieure.</a></div>

1. Installez le module `datadog_agent` depuis le [Puppet Forge][1] sur votre serveur Puppet :
   - Pour les nouvelles installations, exécutez la commande `module install` :
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si le module est déjà installé, mettez-le à niveau :
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Pour déployer l'Agent Datadog sur les nœuds, ajoutez cette classe paramétrée à vos manifestes. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Pour vous assurer que l'Agent peut regrouper vos hosts ensemble, utilisez uniquement les noms d'hôtes de nœuds que l'Agent Datadog suit. Vous pouvez vérifier quels noms d'hôtes l'Agent suit à l'aide de la commande suivante :

   ```shell
   service datadog-agent info
   ```

3. Activer la génération de rapports vers Datadog sur votre serveur Puppet :
   1. Ajoutez les paramètres suivants à `/etc/puppet/puppet.conf` :
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
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Exécutez Puppet sur votre serveur Puppet pour installer toutes les dépendances nécessaires.
1. Redémarrez votre serveur Puppet pour commencer à recevoir des données Puppet dans Datadog.

## Checks spécifiques de l'Agent

Pour utiliser un check ou une intégration spécifique de l'Agent sur l'un de vos nœuds, consultez le [manifeste d'intégration][2] pertinent pour un exemple de code. Voici un exemple pour l'intégration Elasticsearch :

```puppet
node "elastic-node1.mydomain.com" {
    class { "datadog_agent":
        api_key => ""
    }
    include "datadog_agent::integrations::elasticsearch"
}
```

[1]: https://forge.puppetlabs.com/modules/datadog/datadog_agent/readme
[2]: https://github.com/DataDog/puppet-datadog-agent/tree/main/manifests/integrations

{{% /tab %}}

{{% tab "Chef" %}}

<div class="alert alert-info">Nécessite Chef version 10.14.x ou supérieure.</a></div>

1. Ajoutez le cookbook Datadog :
   - Si vous utilisez [Berkshelf][1], ajoutez le cookbook à votre Berksfile :
      ```shell
      cookbook 'datadog'
      ```

   - Si vous n'utilisez pas Berkshelf, installez le cookbook dans votre référentiel à l'aide de Knife :
     ```shell
     knife cookbook site install datadog 
     ```

1. Définissez les attributs spécifiques à Datadog dans un rôle, un environnement ou une autre recette. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```chef
   node.default['datadog']['api_key'] = "MY_API_KEY"
   # Use an existing application key or create a new one for Chef
   node.default['datadog']['application_key'] = "Generate Application Key"
   ```

1. Importez le cookbook mis à jour sur votre serveur Chef :
   ```shell
   berks upload
   # or
   knife cookbook upload datadog
   knife cookbook list | grep datadog && 
   echo -e "e[0;32mdatadog cookbook - OKe[0m" ||
   echo -e "e[0;31mmissing datadog cookbook - OKe[0m"
   ```

1. Ajoutez le cookbook à la `run_list` ou au `role` de votre nœud :
   ```chef
   "run_list": [
    "recipe[datadog::dd-agent]"
   ]
   ```

1. Attendez la prochaine exécution planifiée de `chef-client`.

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La formule Datadog Saltstack ne prend en charge que les systèmes basés sur Debian et RedHat.<br><br>
Les instructions suivantes ajoutent la formule Datadog à l'environnement Salt de base. Pour l'ajouter à un autre environnement Salt, remplacez les références à <code>base</code> par le nom de votre environnement Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Installer à l'aide de `gitfs_remotes`
1. Installez la formule [Datadog ][1] dans l'environnement de base de votre nœud Salt Master, en utilisant l'option `gitfs_remotes` dans votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
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

1. Redémarrez votre service Salt Master :
   ```shell
   systemctl restart salt-master
   ```
   ou 
   ```shell
   service salt-master restart
   ```

### Installer en clonant la formule Datadog 

1. Clonez la [formule Datadog][1] sur votre nœud Salt Master :
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Ajoutez la formule clonée à l'environnement de base dans le `file_roots` de votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
   ```yaml
   file_roots:
     base:
       - /srv/salt/
       - /srv/formulas/datadog-formula/
   ```

## Déployer l'Agent sur vos hosts

1. Ajoutez la formule Datadog à votre fichier top (par défaut `/srv/salt/top.sls`) :
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Ajoutez un fichier pilier `datadog.sls` à votre répertoire pillar (par défaut `/srv/pillar/`) et ajoutez votre clé d'API. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
   ```

1. Ajoutez le fichier pilier `datadog.sls` au fichier pillar top (par défaut `/srv/pillar/top.sls`) :
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Pour utiliser un check ou une intégration spécifique de l'Agent sur l'un de vos hosts, vous pouvez utiliser la variable checks. Voici un exemple pour l'intégration directory :
   ```yaml
   datadog:
     config:
       api_key: MY_API_KEY
     install_settings:
       agent_version: <AGENT5_VERSION>
     checks:
       directory:
         config:
           instances:
             - directory: "/srv/pillar"
               name: "pillars"
   ```         

Consultez le [référentiel Github][1] de la formule pour la configuration des logs, les exemples de checks et les cas d'utilisation avancés.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Installation depuis les sources

<div class="alert alert-info">L'Agent Datadog nécessite python 2.7 et <code>sysstat</code> sur Linux.</div>

Utilisez le script d'installation source en une seule étape. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

Le script installe l'Agent dans son propre sandbox autonome situé dans `~/.datadog-agent`.

Pour rendre l'installation permanente, configurez votre démon `init` pour qu'il exécute `$sandbox_dir/bin/agent` avec `$sandbox_dir` dans le répertoire de travail actuel. Le répertoire sandbox est portable et peut être exécuté à partir de n'importe quel emplacement de votre système de fichiers. Le répertoire sandbox est défini par défaut sur `~/.datadog-agent`.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /fr/agent/versions/upgrade_to_agent_v7/
[3]: https://install.datadoghq.com/datadog-agent-5.11.3-1.dmg
[4]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.msi
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-32bit-cli.msi
[6]: https://s3.amazonaws.com/ddagent-windows-stable/installers.json
[7]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[8]: /fr/integrations/azure/
[9]: https://github.com/DataDog/dd-agent/wiki/Windows-Agent-Installation