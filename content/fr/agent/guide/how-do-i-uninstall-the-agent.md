---
aliases:
- /fr/agent/faq/how-do-i-uninstall-the-agent/
further_reading:
- link: /agent/
  tag: Documentation
  text: En savoir plus sur l'Agent Datadog
title: Désinstaller l'Agent
---

Choisissez votre plateforme pour consulter les instructions de désinstallation de l'Agent correspondantes :

## Debian et Ubuntu

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> Cette commande supprime l'Agent, mais pas :

* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.

> Si vous souhaitez également supprimer ces éléments, utilisez plutôt la commande suivante :

```shell
sudo apt-get remove --purge datadog-agent -y
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo apt-get remove datadog-agent -y
```

> Cette commande supprime l'Agent, mais pas :
* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.
> Si vous souhaitez également supprimer ces éléments, utilisez plutôt la commande suivante :

```shell
sudo apt-get --purge remove datadog-agent -y
```
{{% /tab %}}
{{< /tabs >}}

## CentOS, RHEL, Fedora et Amazon Linux
{{< tabs >}}
{{% tab "Agents v6 et v7" %}}


```shell
sudo yum remove datadog-agent
```

> Cette commande supprime l'Agent, mais pas :
* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.

> Si vous souhaitez également supprimer ces éléments ainsi que vos fichiers de log Datadog, utilisez plutôt la commande suivante après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}
```shell
sudo yum remove datadog-agent
```

> Cette commande supprime l'Agent, mais pas :

* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.

> Si vous souhaitez également supprimer ces éléments ainsi que vos fichiers de log Datadog, utilisez plutôt la commande suivante après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}

## openSUSE et SLES
{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
```shell
sudo zypper remove datadog-agent
```

> Cette commande supprime l'Agent, mais pas :
* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/datadog-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.

> Si vous souhaitez également supprimer ces éléments ainsi que vos fichiers de log Datadog, utilisez plutôt la commande suivante après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/datadog-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}

{{% tab "Agent v5" %}}

```shell
sudo zypper remove datadog-agent
```

Cette commande supprime l'Agent, mais pas :
* le fichier de configuration `datadog.yaml`,
* les fichiers créés par l'utilisateur dans le dossier de configuration `/etc/dd-agent`,
* les fichiers créés par l'utilisateur dans le dossier `/opt/datadog-agent`,
* l'utilisateur `dd-agent`.

Si vous souhaitez également supprimer ces éléments ainsi que vos fichiers de log Datadog, utilisez plutôt la commande suivante après avoir supprimé l'Agent :

```shell
sudo userdel dd-agent \
&& sudo rm -rf /opt/datadog-agent/ \
&& sudo rm -rf /etc/dd-agent/ \
&& sudo rm -rf /var/log/datadog/
```
{{% /tab %}}
{{< /tabs >}}
## macOS
{{< tabs >}}
{{% tab "Agents v6 et v7" %}}
**Installation sur un seul compte utilisateur**

Pour supprimer l'Agent et tous ses fichiers de configuration :
1. Arrêtez et fermez l'Agent Datadog en cliquant sur l'icône en forme d'os dans la barre des menus.
2. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
3. Exécutez les commandes suivantes :
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    launchctl remove com.datadoghq.agent
    sudo rm -rf /var/log/datadog
    ```
4. Redémarrez votre machine pour que les modifications soient appliquées.

**Installation en tant que LaunchDaemon sur l'ensemble du système**

Pour supprimer l'Agent et tous ses fichiers de configuration :
1. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
2. Pour supprimer les fichiers restants, exécutez les commandes suivantes :
    ```shell
    sudo rm -rf /opt/datadog-agent
    sudo rm -rf /usr/local/bin/datadog-agent
    sudo rm -rf ~/.datadog-agent/**​ #to remove broken symlinks
    sudo launchctl disable system/com.datadoghq.agent && sudo launchctl bootout system/com.datadoghq.agent
    sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
    sudo rm -rf /var/log/datadog
    ```
3. Redémarrez votre machine pour que les modifications soient appliquées.
{{% /tab %}}

{{% tab "Agent v5" %}}
1. Arrêtez et fermez l'Agent Datadog en cliquant sur l'icône en forme d'os dans la barre des menus.
2. Faites glisser l'application Datadog depuis le dossier Applications vers la corbeille.
3. Exécutez :

```shell
sudo rm -rf /opt/datadog-agent
sudo rm -rf /usr/local/bin/datadog-agent
sudo rm -rf ~/.datadog-agent/** # pour supprimer les liens symboliques non fonctionnels 
```

Si vous avez exécuté les commandes d'installation facultatives pour que l'Agent se lance au démarrage, exécutez les commandes suivantes pour finaliser la désinstallation :

```shell
sudo launchctl unload -w /Library/LaunchDaemons/com.datadoghq.agent.plist
sudo rm /Library/LaunchDaemons/com.datadoghq.agent.plist
```

> Cette méthode permet de supprimer l'Agent ainsi que ses fichiers de configuration.
{{% /tab %}}
{{< /tabs >}}

## Windows

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

L'Agent peut être désinstallé de deux façons différentes sur Windows. Les deux méthodes suppriment l'Agent, mais pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

### Ajouter ou supprimer des programmes

1. Appuyez sur **CTRL** et **Échap** ou utilisez la touche Windows pour lancer la recherche Windows.
1. Recherchez `ajouter` et cliquez sur **Ajouter ou supprimer des programmes**.
1. Recherchez `Datadog Agent` et cliquez sur **Désinstaller**.

### PowerShell

**Remarque :** activez WinRM pour utiliser les commandes ci-dessous.

Utilisez l'une des commandes PowerShell suivantes pour désinstaller l'Agent sans redémarrage :
```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber, 'REBOOT=ReallySuppress')
```

Avec `/norestart` :

```powershell
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/norestart', '/q', '/x', (Get-CimInstance -ClassName Win32_Product -Filter "Name='Datadog Agent'" -ComputerName .).IdentifyingNumber)
```

{{% /tab %}}

{{% tab "Agent v5" %}}

L'Agent peut être désinstallé de deux façons différentes sur Windows. Les deux méthodes suppriment l'Agent, mais pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

> **Remarque** : si vous utilisez une version < 5.12.0 de l'Agent, il est important de désinstaller l'Agent avec le **compte initialement utilisé** pour l'installer. Sinon, la suppression risque de ne pas se faire proprement.

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

{{% /tab %}}
{{< /tabs >}}