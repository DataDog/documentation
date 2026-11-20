---
further_reading:
- link: agent/
  tag: Documentation
  text: Le Datadog Agent
private: true
title: Installez Datadog Agent 5
---
Ce guide couvre l'installation de l'Agent 5. Datadog recommande d'installer ou de mettre à niveau vers l'Agent 7 pour bénéficier des dernières fonctionnalités. Pour plus d'informations sur l'installation de la dernière version de l'Agent, suivez les [Instructions d'installation de l'Agent 7][1]. Pour plus d'informations sur la mise à niveau vers l'Agent 7 à partir d'une version antérieure, consultez [Mise à niveau vers Datadog Agent v7][2].

## macOS {#macos}

### Installez l'Agent {#install-the-agent}

#### Ligne de commande {#command-line}

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
{{< code-block lang="shell" >}}
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/osx/install.sh)"
{{< /code-block >}}

Pour gérer l'Agent, utilisez la commande `datadog-agent`. Par défaut, le binaire `datadog-agent` est situé dans `/usr/local/bin`. Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d`.

#### Interface graphique {#gui}

1. Téléchargez et installez le [paquet DMG][3].
1. Ajoutez la ligne suivante à `/opt/datadog-agent/etc/datadog.conf`, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
api_key:MY_API_KEY
{{< /code-block >}}

Pour gérer l'Agent, utilisez l'application Datadog Agent dans la barre des menus. Activez ou désactivez les intégrations dans `/opt/datadog-agent/etc/conf.d`.

### Comportement d'exécution de l'Agent {#agent-run-behavior}

Par défaut, l'Agent s'exécute à la connexion. Vous pouvez le désactiver à l’aide de l'application Datadog Agent dans la barre des menus. Si vous souhaitez exécuter l'Agent au démarrage, utilisez ces commandes :
{{< code-block lang="shell" >}}
sudo cp '/opt/datadog-agent/etc/com.datadoghq.agent.plist' /Library/LaunchDaemons
sudo launchctl load -w /Library/LaunchDaemons/com.datadoghq.agent.plist
{{< /code-block >}}

### Désinstallation {#uninstall}

1. Arrêtez et fermez Datadog Agent à l’aide de l'icône en forme d'os dans la barre des menus.
1. Faites glisser l'application Datadog du dossier des applications vers la corbeille.
1. Exécutez :

   ```shell
   sudo rm -rf /opt/datadog-agent
   sudo rm -rf /usr/local/bin/datadog-agent
   sudo rm -rf ~/.datadog-agent/** # to remove broken symlinks
   ```

Si vous avez exécuté les commandes d'installation facultatives pour que l'Agent s'exécute au démarrage, exécutez ce qui suit pour terminer la désinstallation :

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

## Windows {#windows}

### Installer l'Agent {#install-the-agent-1}

#### Interface graphique {#gui-1}

Téléchargez et exécutez le programme d'installation de Datadog Agent :
- [programme d'installation 64 bits][4].
- [programme d'installation 32 bits][5]. Les installations 32 bits ne sont prises en charge que jusqu'à la version 5.10.1 de l'Agent.

Les liens vers toutes les versions disponibles du programme d'installation Windows sont disponibles au [format JSON][6].

#### Ligne de commande {#command-line-1}

1. Téléchargez l'Agent :
   - Pour les nouvelles installations, téléchargez le [programme d'installation de Datadog Agent][4].
   - Si vous effectuez une mise à niveau depuis une version de Datadog Agent antérieure à 5.12.0, utilisez la [méthode d'installation EXE][7].
1. Dans un shell `cmd.exe`, exécutez la commande suivante depuis le répertoire où vous avez téléchargé le programme d'installation. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   {{< code-block lang="shell" >}}
start /wait msiexec /qn /i ddagent-cli-latest.msi APIKEY="MY_API_KEY"
{{< /code-block >}}
   Ajoutez éventuellement les valeurs `TAG` et `HOSTNAME`.

#### Déploiement sur Azure {#deployment-to-azure}

Pour installer l'Agent sur Azure, suivez la [documentation Microsoft Azure][8].

### Nouvelle procédure de mise à niveau pour 5.12 {#new-upgrade-procedure-for-512}

Si vous êtes un client existant utilisant un Agent Windows antérieur à la version 5.12, des étapes supplémentaires peuvent être nécessaires pour mettre à niveau votre appareil. Plus précisément, la dernière version de l'Agent s'installe « par machine ». Les versions précédentes de l'Agent s'installaient « par utilisateur » par défaut. Des étapes supplémentaires peuvent également être nécessaires si vous effectuez le déploiement avec Chef. Pour plus d'informations, consultez [Installation de l'Agent Windows][9].

### Désinstallation {#uninstall-1}

Il existe deux méthodes différentes pour désinstaller l'Agent sur Windows. Les deux méthodes suppriment l'Agent, mais ne suppriment pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

**Remarque** : pour les versions de l'Agent < v5.12.0, il est important de désinstaller l'Agent avec le **compte d'origine** utilisé pour l'installer, sinon il risque de ne pas être supprimé correctement.

### Ajouter ou supprimer des programmes {#add-or-remove-programs}

1. Appuyez sur **CTRL** et **Esc** ou utilisez la touche Windows pour lancer la recherche Windows.
1. Recherchez `add` et cliquez sur {{< ui >}}Add or remove programs{{< /ui >}}.
1. Recherchez `Datadog Agent` et cliquez sur {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell {#powershell}

**Remarque0:** Activez WinRM pour utiliser les commandes ci-dessous.

Utilisez la commande PowerShell suivante pour désinstaller l'Agent sans redémarrage :

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

## Linux et Unix {#linux-and-unix}

{{< tabs >}}

{{% tab "Debian" %}}
### Installation en une étape {#one-step-install}

La commande d'installation en une étape installe les paquets APT pour Datadog Agent et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, placez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install}

1. Configurez APT pour qu'il puisse télécharger via HTTPS et installer `curl` et `gnupg` :
   ```shell
   sudo apt-get update
   sudo apt-get install apt-transport-https curl gnupg
   ```
1. Configurez le dépôt Debian Datadog sur votre système et créez un trousseau de clés d'archive Datadog :
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
1. Si vous utilisez Debian 8 ou une version antérieure, copiez le trousseau de clés vers `/etc/apt/trusted.gpg.d` :
   ```shell
   sudo cp -a /usr/share/keyrings/datadog-archive-keyring.gpg /etc/apt/trusted.gpg.d/
   ```

1. Mettez à jour votre dépôt APT local et installez l'Agent :
   ```shell
   sudo apt-get update
   sudo apt-get install datadog-agent datadog-signing-keys
   ```

1. Exécutez la commande suivante pour copier la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Démarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

{{% /tab %}}

{{% tab "Ubuntu" %}}
### Installation en une étape {#one-step-install-1}

La commande d'installation en une étape installe les paquets APT pour Datadog Agent et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, faites précéder la commande de `DD_INSTALL_ONLY=true` avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

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
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable main' > /etc/apt/sources.list.d/datadog.list"
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

1. Exécutez la commande suivante pour copier la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Démarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent start
   ```

### Désinstallation {#uninstall-2}

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo apt-get remove datadog-agent -y
```

Cette commande supprime l'Agent, mais ne supprime pas :

* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo apt-get --purge remove datadog-agent -y
```

{{% /tab %}}

{{% tab "Amazon Linux" %}}
### Installation en une étape {#one-step-install-2}

La commande d'installation en une étape installe les paquets YUM pour Datadog Agent et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, faites précéder la commande de `DD_INSTALL_ONLY=true` avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-2}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
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

   **Remarque** : Sur l'architecture i386/i686, remplacez « x86_64 » par « i386 ».

1. Mettez à jour votre dépôt yum local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copiez la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```


### Désinstallation {#uninstall-3}

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais ne supprime pas :

* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "CentOS et Red Hat" %}}
### Installation en une étape {#one-step-install-3}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, placez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-3}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
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

1. Mettez à jour votre dépôt YUM local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum remove datadog-agent-base 
   sudo yum install datadog-agent
   ```
1. Copiez la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation {#uninstall-4}

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais ne supprime pas :

* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "Fedora" %}}
### Installation en une étape {#one-step-install-4}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, placez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-4}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
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

1. Mettez à jour votre dépôt YUM local et installez l'Agent :
   ```shell
   sudo yum makecache
   sudo yum install datadog-agent
   ```
1. Copiez la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key:MY_API_KEY /' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation {#uninstall-5}

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo yum remove datadog-agent
```

Cette commande supprime l'Agent, mais ne supprime pas :

* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```

{{% /tab %}}

{{% tab "SUSE" %}}
### Installation en une étape {#one-step-install-5}

La commande en une étape installe les paquets YUM pour l'Agent Datadog et vous demande votre mot de passe. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, placez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante, en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Installation en plusieurs étapes {#multi-step-install-5}

1. Configurez le dépôt YUM Datadog en créant `/etc/yum.repos.d/datadog.repo` avec le contenu suivant :
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

1. Mettez à jour votre dépôt zypper local et installez l'Agent :
   ```shell
   sudo zypper refresh
   sudo zypper install datadog-agent
   ```
1. Copiez la configuration d'exemple à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```shell
   sudo sh -c "sed 's/api_key:.*/api_key: MY_API_KEY/' /etc/dd-agent/datadog.conf.example > /etc/dd-agent/datadog.conf"
   ```

1. Redémarrez l'Agent :
   ```shell
   sudo /etc/init.d/datadog-agent restart
   ```

### Désinstallation {#uninstall-6}

Pour désinstaller l'Agent, exécutez la commande suivante :

```shell
sudo zypper remove datadog-agent
```

Cette commande supprime l'Agent, mais ne supprime pas :
* Le fichier de configuration `datadog.yaml`
* Les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`
* Fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`
* L'utilisateur `dd-agent`
* Fichiers logs Datadog

Si vous souhaitez également supprimer ces éléments, exécutez cette commande après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```


{{% /tab %}}

{{% tab "AIX" %}}
**Remarque** : cet onglet concerne l'ancien Agent UNIX Datadog. Datadog recommande d'installer [l'Agent 7 sur AIX][3] ou de passer à cette version pour bénéficier des dernières fonctionnalités et d'un support continu. Consultez [Plateformes prises en charge][4] pour connaître les versions d'AIX prises en charge par l'Agent 7.

### Installation en une étape {#one-step-install-6}

La commande en une étape installe le dernier paquet BFF de l'Agent Datadog et vous demande votre mot de passe si nécessaire. Si l'Agent n'est pas déjà installé sur votre machine et que vous ne souhaitez pas qu'il démarre automatiquement après l'installation, ajoutez `DD_INSTALL_ONLY=true` au début de la commande avant de l'exécuter.

Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY bash -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/install_agent.sh)"
```

### Mise à niveau depuis une installation précédente {#upgrade-from-a-previous-installation}

Pour installer l'Agent tout en conservant votre configuration existante, exécutez la commande suivante :

```shell
DD_UPGRADE=true ksh -c "$(curl -L https://raw.githubusercontent.com/DataDog/datadog-unix-agent/master/scripts/install_script.sh)"
```

Pour plus d'informations, consultez [Datadog UNIX Agent for AIX][1].

### Installation en plusieurs étapes {#multi-step-install-6}

1. Téléchargez le fichier BFF souhaité parmi les versions publiées du dépôt [datadog-unix-agent][2] :
1. Installez l'artefact en tant que root avec `installp` :
   ```shell
   installp -aXYgd datadog-unix-agent-latest.powerpc.aix..bff datadog-unix-agent
   ```
1. Si vous n'avez pas de fichier de configuration existant, copiez l'exemple de configuration à l'emplacement approprié. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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
1. Vérifiez que le service de l'Agent est arrêté :
   ```
   sudo lssrc -s datadog-agent
   ```
1. Redémarrez le service de l'Agent :
   ```shell
   sudo startsrc -s datadog-agent
   ```

### Désinstallation {#uninstall-7}

Pour désinstaller l'Agent, exécutez la commande suivante :

Pour supprimer un Agent installé, exécutez la commande `installp` suivante :

```shell
installp -e dd-aix-uninstall.log -uv datadog-unix-agent
```

Remarque : les journaux de désinstallation de l'Agent se trouvent dans le fichier `dd-aix-install.log`. Pour désactiver cette journalisation, supprimez le paramètre `-e` dans la commande de désinstallation.

[1]: /fr/agent/guide/install-unix-agent-aix/#installation
[2]: https://github.com/DataDog/datadog-unix-agent/releases
[3]: /fr/agent/supported_platforms/aix/
[4]: /fr/agent/supported_platforms/?tab=aix
{{% /tab %}}

{{< /tabs >}}

## Cloud et conteneurs {#cloud-and-containers}

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Installez l'Agent {#install-the-agent-2}
### Installez avec des DaemonSets {#install-with-daemonsets}

Si vous utilisez Kubernetes >= 1.1.0, vous pouvez tirer parti des [DaemonSets][1] pour déployer automatiquement l'Agent Datadog sur tous vos nœuds

1. Créez un secret contenant votre clé d'API. Ce secret est utilisé dans le manifeste pour déployer l'Agent Datadog. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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

<div class="alert alert-info">Ce manifeste active la fonctionnalité d'auto-configuration d'Autodiscovery. Pour désactiver l'auto-configuration, supprimez la <code>SD_BACKEND</code> définition de la variable d'environnement. Pour savoir comment configurer Autodiscovery, consultez <a href="https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=kubernetesadv2">Kubernetes Integrations Autodiscovery</a>.</div>

### Exécutez l'Agent en tant que conteneur Docker {#run-the-agent-as-a-docker-container}

Si vous n'utilisez pas Kubernetes 1.1.0 ou une version ultérieure, ou si vous ne souhaitez pas utiliser de DaemonSets, exécutez l'Agent en tant que conteneur Docker sur chaque nœud que vous souhaitez surveiller. Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e KUBERNETES=yes -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

## Envoyez des métriques personnalisées {#send-custom-metrics}

Si vous prévoyez d'envoyer des [métriques personnalisées][2] à l'aide de DogStatsD :
1. Liez le port StatsD du conteneur à l'adresse IP du nœud en ajoutant un `hostPort` à la section `ports` de votre manifeste :
   ```yaml
   ports:
     - containerPort: 8125
       hostPort: 8125
       name: dogstatsdport
       protocol: UDP
   ```

1. Configurez votre bibliothèque cliente pour envoyer des paquets UDP à l'adresse IP du nœud. Si vous utilisez le mode réseau bridge, la passerelle par défaut de votre conteneur d'application correspond à l'adresse IP du nœud. Vous pouvez également utiliser la downward API pour exposer le nom d'hôte du nœud en tant que variable d'environnement.

## Personnalisez la configuration de votre Agent {#customize-your-agent-configuration}

Pour personnaliser la configuration de votre Agent, consultez la documentation dans le dépôt [docker-dd-agent][3] de l'Agent 5. Pour ajuster la configuration d'Autodiscovery, consultez [Kubernetes Integrations Autodiscovery][4]. Pour désactiver Autodiscovery, supprimez la variable d'environnement `SD_BACKEND` de votre manifeste.

Pour plus d'informations sur la collecte de métriques, de service checks et d'événements, consultez la documentation sur l'[intégration Kubernetes][5].

[1]: https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/
[2]: /fr/metrics/custom_metrics
[3]: https://github.com/DataDog/docker-dd-agent
[4]: /fr/containers/kubernetes/integrations/?tab=kubernetesadv2
[5]: /fr/integrations/kubernetes/

{{% /tab %}}

{{% tab "Docker" %}}
### Installation en une étape {#one-step-install-7}

L'installation en une étape exécute un conteneur Docker qui intègre l'Agent Datadog pour surveiller votre hôte. L'intégration Docker est activée par défaut, tout comme Autodiscovery en mode auto config. Pour désactiver Autodiscovery, supprimez la variable `SD_BACKEND` de la commande d'installation en une étape.

#### Amazon Linux {#amazon-linux}
Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Autres systèmes d'exploitation {#other-operating-systems}
Exécutez la commande suivante en remplaçant `MY_API_KEY` par votre clé d'API Datadog :

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY=MY_API_KEY -e SD_BACKEND=docker gcr.io/datadoghq/docker-dd-agent:latest
```

#### Dépannage {#troubleshooting}

Si la commande d'installation en une étape ne fonctionne pas, il est possible que votre système monte le répertoire `cgroup` à un emplacement inattendu ou n'utilise pas les CGroups pour la gestion de la mémoire. Les CGroups sont requis pour que le Docker check réussisse. Pour activer les CGroups, consultez la documentation dans le dépôt [docker-dd-agent][1]. Si le check échoue en raison d'un emplacement inattendu du répertoire `cgroup` :

1. Exécutez `mount | grep "cgroup type tmpfs"` pour récupérer l'emplacement du répertoire `cgroup`.
1. Remplacez la première occurrence de `/sys/fs/cgroup` dans la commande d'installation en une étape par l'emplacement du répertoire `cgroup`.

### Envoyez des métriques personnalisées {#send-custom-metrics-1}

Pour envoyer des métriques personnalisées à l'aide de DogStatsD :
1. Ajoutez l'option `-p 8125:8125/udp` à la commande d'installation. Cela lie le port StatsD du conteneur à l'adresse IP de l'hôte.
1. Configurez votre bibliothèque cliente pour envoyer des paquets UDP à l'adresse IP de l'hôte.

### Personnalisez la configuration de votre Agent {#customize-your-agent-configuration-1}

Pour personnaliser la configuration de votre Agent, consultez la documentation dans le dépôt [docker-dd-agent][2] de l'Agent 5. Pour ajuster la configuration d'Autodiscovery, consultez [Docker Integrations Autodiscovery][3]. Pour désactiver Autodiscovery, supprimez la variable d'environnement `SD_BACKEND` de la commande d'installation en une étape.

[1]: https://github.com/DataDog/docker-dd-agent?tab=readme-ov-file#cgroups
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://docs.datadoghq.com/fr/containers/docker/integrations/?tabs=docker

{{% /tab %}}

{{% tab "CoreOS" %}}
L'exécution de CoreOS Container Linux est prise en charge avec le runtime Docker. Pour les instructions d'installation, consultez [Docker][1].

Pour exécuter CoreOS Tectonic sur Kubernetes, consultez [Kubernetes][2].

[1]: ?tab=docker#cloud-and-containers
[2]: ?tab=kubernetes#cloud-and-containers

{{% /tab %}}

{{% tab "OpenShift" %}}
Pour plus d'informations sur l'installation de Datadog avec OpenShift, consultez le dépôt [datadog-openshift][1].

[1]: https://github.com/DataDog/datadog-openshift

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

2. Configurez Datadog en tant qu'addon dans votre runtime config. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

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

3. Ajoutez le runtime à votre runtime config :

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

{{% /tab %}}

{{< /tabs >}}

## Gestion de la configuration {#configuration-management}

{{< tabs >}}
{{% tab "Ansible" %}}

<div class="alert alert-info">La collection Ansible Datadog prend en charge la plupart des distributions Linux basées sur Debian, RHEL et SUSE, ainsi que macOS et Windows.<br>Nécessite Ansible version 2.10 ou supérieure.</div>

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
   - La collection Ansible Datadog est également disponible via le [Red Hat Automation Hub][1] où elle est officiellement certifiée par Red Hat.
   - L'installation de la collection est recommandée. Si nécessaire, vous pouvez également installer Datadog en utilisant le [rôle autonome][2].

2. Pour déployer l'Agent Datadog sur des hôtes, ajoutez le rôle Datadog et votre clé d'API à votre playbook. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
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

   Pour vous assurer que l'Agent peut regrouper vos hôtes, utilisez uniquement les noms d'hôte de nœud que l'Agent Datadog suit. Vous pouvez vérifier quels noms d'hôte l'Agent suit en utilisant la commande suivante :

   ```shell
   service datadog-agent info
   ```

## Agent checks spécifiques {#specific-agent-checks}

Pour utiliser un Agent check ou une intégration spécifique sur l'un de vos nœuds, vous pouvez utiliser la variable `datadog_checks`. Voici un exemple pour le process check :

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

Vous trouverez plus d'exemples d'utilisation du rôle Agent sur le dépôt GitHub pour le [rôle autonome][3].

### Métriques et événements {#metrics-and-events}

Pour obtenir des métriques et des événements sur Datadog après l'exécution d'Ansible, consultez la [page GitHub][4] du projet Ansible Callback.

[1]: https://console.redhat.com/ansible/automation-hub/repo/published/datadog/dd/
[2]: /fr/agent/guide/ansible_standalone_role/#ansible-role-versus-ansible-collection
[3]: https://github.com/DataDog/ansible-datadog/#role-variables
[4]: https://github.com/DataDog/ansible-datadog-callback

{{% /tab %}}
{{% tab "Puppet" %}}
<div class="alert alert-info">Le <code>datadog_agent</code> Le module ne prend en charge que les nœuds Linux.<br>Nécessite Puppet Agent version 2.7 ou supérieure.</a></div>

1. Installez le module `datadog_agent` depuis le [Puppet Forge][1] sur votre serveur Puppet :
   - Pour les nouvelles installations, exécutez la commande `module install command` :
     ```shell
     puppet module install datadog-datadog_agent
     ```
   - Si le module est déjà installé, mettez-le à niveau :
     ```shell
     puppet module upgrade datadog-datadog_agent
     ```

2. Pour déployer l'Agent Datadog sur des nœuds, ajoutez cette classe paramétrée à vos manifestes. Remplacez `MY_API_KEY` par votre clé d'API Datadog :
   ```puppet
   node "db1.mydomain.com" {
      class { "datadog_agent":
         api_key => "MY_API_KEY"
      }
   }
   ```

   Pour vous assurer que l'Agent peut regrouper vos hôtes, utilisez uniquement les noms d'hôte de nœud que l'Agent Datadog suit. Vous pouvez vérifier quels noms d'hôte l'Agent suit en utilisant la commande suivante :

   ```shell
   service datadog-agent info
   ```

3. Activez l'envoi de rapports à Datadog sur votre serveur Puppet :
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
            api_key            => "MY_API_KEY",
            puppet_run_reports => true
            }
      }
      ```
1. Exécutez Puppet sur votre serveur Puppet pour installer toutes les dépendances nécessaires.
1. Redémarrez votre serveur Puppet pour commencer à recevoir des données Puppet dans Datadog.

## Agent checks spécifiques {#specific-agent-checks-1}

Pour utiliser un Agent check spécifique ou une intégration sur l'un de vos nœuds, consultez le [manifeste d'intégration][2] correspondant pour obtenir un exemple de code. Voici un exemple pour l'intégration Elasticsearch :

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

<div class="alert alert-info">Nécessite Chef en version 10.14.x ou supérieure.</a></div>

1. Ajoutez le cookbook Datadog :
   - Si vous utilisez [Berkshelf][1], ajoutez le cookbook à votre Berksfile :
      ```shell
      cookbook 'datadog'
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

[1]: https://docs.chef.io/workstation/berkshelf/

{{% /tab %}}

{{% tab "SaltStack" %}}

<div class="alert alert-info">La formule Saltstack Datadog prend uniquement en charge les systèmes basés sur Debian et RedHat.<br><br>
Les instructions suivantes ajoutent la formule Datadog à l'environnement Salt de base. Pour l'ajouter à un autre environnement Salt, remplacez les références à <code>base</code> par le nom de votre environnement Salt.</div>

<!-- vale Datadog.inclusive = NO -->

### Installez en utilisant `gitfs_remotes` {#install-using-gitfs-remotes}
1. Installez la [formule Datadog][1] dans l'environnement de base de votre nœud Salt Master, en utilisant l'option `gitfs_remotes` dans votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
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

### Installez en clonant la formule Datadog {#install-by-cloning-the-datadog-formula}

1. Clonez la [formule Datadog][1] sur votre nœud Salt Master :
   ```shell
   mkdir -p /srv/formulas && cd /srv/formulas git clone https://github.com/DataDog/datadog-formula.git
   ```
1. Ajoutez la formule clonée à l'environnement de base dans le `file_roots` de votre fichier de configuration Salt Master (par défaut `/etc/salt/master`) :
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
       agent_version: <AGENT5_VERSION>
   ```

1. Ajoutez le fichier pillar `datadog.sls` au fichier top des pillars (par défaut `/srv/pillar/top.sls`) :
   ```yaml
   base:
     '*':
       - datadog
   ```

1. Pour utiliser un check ou une intégration spécifique de l'Agent sur l'un de vos hôtes, vous pouvez utiliser la variable checks. Voici un exemple pour l'intégration Directory :
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

Consultez le [dépôt GitHub][1] de la formule pour la configuration des journaux, des exemples de checks et des cas d'utilisation avancés.
<!-- vale Datadog.inclusive = YES -->
[1]: https://github.com/DataDog/datadog-formula
{{% /tab %}}

{{< /tabs >}}

## Installez à partir des sources {#install-from-source}

<div class="alert alert-info">L'Agent Datadog nécessite Python 2.7 et <code>sysstat</code> sur Linux.</div>

Utilisez le script d'installation à partir des sources en une étape. Remplacez `MY_API_KEY` par votre clé d'API Datadog :

```shell
DD_API_KEY=MY_API_KEY sh -c "$(curl -L https://raw.githubusercontent.com/DataDog/dd-agent/master/packaging/datadog-agent/source/setup_agent.sh)"
``` 

Le script installe l'Agent dans son propre bac à sable autonome situé à `~/.datadog-agent`.

Pour rendre l'installation permanente, configurez votre démon `init` pour exécuter `$sandbox_dir/bin/agent` avec `$sandbox_dir` défini sur le répertoire de travail actuel. Le répertoire du bac à sable est portable, et le bac à sable peut fonctionner depuis n'importe quel emplacement de votre système de fichiers. Le répertoire du bac à sable est défini sur `~/.datadog-agent` par défaut.

## Pour aller plus loin {#further-reading}

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