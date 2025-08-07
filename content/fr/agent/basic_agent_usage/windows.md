---
algolia:
  tags:
  - install
  - installing
  - uninstall
  - uninstalling
  - windows
aliases:
- /fr/guides/basic_agent_usage/windows/
description: Fonctionnalités de base de l'Agent Datadog sur la plateforme Windows.
further_reading:
- link: /logs/
  tag: Documentation
  text: Recueillir vos logs
- link: /infrastructure/process/
  tag: Documentation
  text: Recueillir vos processus
- link: /tracing/
  tag: Documentation
  text: Recueillir vos traces
- link: /agent/basic_agent_usage/#agent-architecture
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurer les ports entrants
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: En savoir plus sur l'utilisateur de l'Agent Windows Datadog
platform: Windows
title: Utilisation de base de l'Agent pour Windows
---

## Section Overview

Cette page présente les fonctionnalités de base de l'Agent Datadog pour Windows. Si vous n'avez pas encore installé l'Agent, consultez les instructions d'installation ci-dessous ou [suivez les instructions dans l'application][1].

Voir [Plates-formes prises en charge][15] pour la liste complète des distributions et versions de Linux prises en charge.

## Installation

Pour installer Datadog Agent sur vos hôtes Windows, suivez le [flux guidé in-app dans Fleet Automation][16], puis copiez et exécutez la commande d'installation. Les Datadog Agent s'exécutent sous `ddagentuser`. Voir la documentation [Datadog Windows Agent User][17] pour plus d'informations. 


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="In-app installation steps for the Datadog Agent on a Windows host." style="width:90%;">}}


## Autres méthodes d'installation

### Installation avec l'interface graphique du gestionnaire Agent 

<div class="alert alert-info">L'emplacement d'installation par défaut de l'Agent est <code>%ProgramFiles%\Datadog\Datadog Agent</code>. Si vous choisissez un autre emplacement, veillez à spécifier un sous-dossier <code>Datadog</code> pour les fichiers de Datadog.</div>

1. Téléchargez le [Datadog Agent installer][400] pour installer la dernière version de Agent.
2. Exécutez l'installateur en ouvrant `datadog-agent-7-latest.amd64.msi`. Lorsque vous y êtes invité, entrez vos identifiants administrateur.
3. Suivez les invites, acceptez le contrat de licence et saisissez votre [Datadog API key][500].

Une fois l'installation terminée, le programme vous propose de lancer Datadog Agent Manager.


#### Options de configuration à l'installation

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows. Pour plus d'options de configuration, consultez la section [options de configuration supplémentaires de l'Agent](#options-de-configuration-supplementaires-de-l-agent).


| Variable                                    | Type    | Rôle                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Chaîne  | Ajoute la clé d'API Datadog au fichier de configuration.                                                                                                                                                                                 |
| `SITE`   | Chaîne  | Définir le site d'accueil Datadog, par exemple : `SITE=datadoghq.com`     |
| `TAGS`                                      | Chaîne  | Liste de tags séparés par des virgules à attribuer dans le fichier de configuration. Exemple : `TAGS="key_1:val_1,key_2:val_2"`.                                                                                                                         |
| `HOSTNAME`                                  | Chaîne  | Configure le hostname transmis par l'Agent à Datadog (remplace le hostname calculé lors de l'exécution).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Chaîne  | Remplace le nom d'utilisateur `ddagentuser` par défaut lors de l'installation de l'Agent _(version 6.11.0+)_. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Chaîne  | Remplace le mot de passe chiffré généré pour l'utilisateur `ddagentuser` lors de l'installation de l'Agent _(version 6.11.0+)_. Doit être spécifié pour les installations sur les serveurs DNS. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].  |
| `APPLICATIONDATADIRECTORY`                  | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du fichier de configuration. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `C:\ProgramData\Datadog`. _(version 6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du binaire. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si vous choisissez de remplacer le répertoire par défaut, assurez-vous de spécifier un sous-répertoire `Datadog` pour les fichiers Datadog.                                    |

**Remarques**

- L'option `/qn` lance une installation silencieuse. Pour afficher les instructions de l'interface graphique, supprimez cette option.
- Certaines versions de l'Agent peuvent entraîner un redémarrage forcé. Pour empêcher cela, ajoutez le paramètre : `REBOOT=ReallySuppress`.
- Certains composants de l'Agent nécessitent un pilote noyau pour collecter des données. Pour savoir si un pilote noyau est requis pour votre composant, consultez sa page de documentation ou recherchez `kernel driver` dans les fichiers de configuration associés de l'Agent.
- Si un fichier `datadog.yaml` valide est détecté, ce fichier prévaut sur toutes les options spécifiées en ligne de commande.

#### Autres options de configuration de l'Agent

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows.

**Remarque** : si un fichier valide 'datadog.yaml' est détecté, celui-ci prévaut sur toutes les options spécifiées en ligne de commande.


| Variable                                    | Type    | Rôle                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Chaîne  | Active (`"true"`) ou désactive (`"false"`) la fonction de collecte de logs dans le fichier de configuration. Les logs sont désactivés par défaut.                                                                                                        |
| `APM_ENABLED`                               | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent APM dans le fichier de configuration. L'APM est désactivé par défaut.                                                                                                                        |
| `PROCESS_ENABLED`                           | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent de processus dans le fichier de configuration. L'Agent de processus est désactivé par défaut.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'utilisation de FQDN pour le hostname de l'Agent. Cela revient à définir `hostname_fqdn` dans le fichier de configuration de l'Agent. L'utilisation de FQDN pour le hostname est désactivée par défaut. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Nombre  | Un numéro de port valide compris entre 0 et 65534. L'Agent Datadog expose une API de commande sur le port 5001. Si ce port est déjà utilisé par un autre programme, la valeur par défaut peut être remplacée ici.                                               |
| `PROXY_HOST`                                | Chaîne  | (Si vous utilisez un proxy) définit l'hôte de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_PORT`                                | Nombre  | (Si vous utilisez un proxy) définit le port de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_USER`                                | Chaîne  | En cas d'utilisation d'un proxy, définit l'utilisateur de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Chaîne  | (Si vous utilisez un proxy) définit le mot de passe de votre proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour la transmission d'un mot de passe d'authentification. Elle ne peut pas être renommée. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booléen | Utilise l'ID de l'instance EC2 pour les hosts Windows sur EC2 _(v7.28.0+)_.                                            |

#### Fichiers de log d'installation

Définissez l'option `/log <FILENAME>` de msiexec pour configurer un fichier log d'installation. Si cette option n'est pas définie, msiexec écrit le log dans `%TEMP%\MSI*.LOG` par défaut.


## Configuration

Le fichier de configuration principal de Agent se trouve à l'adresse suivante
`C:\ProgramData\Datadog\datadog.yaml`. Ce fichier est utilisé pour les paramètres de l'hôte tels que la clé API, le site Datadog sélectionné, les paramètres du proxy, les balises de l'hôte et le niveau log. 

Il existe également un fichier `datadog.yaml.example` dans le même répertoire, qui est une référence entièrement commentée avec toutes les options de configuration disponibles, utile pour la référence et la copie de paramètres spécifiques. 


Les fichiers de configuration pour les intégrations sont disponibles :
`C:\ProgramData\Datadog\conf.d\` Il peut également y avoir un autre emplacement : `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Chaque intégration a un sous-répertoire `<INTEGRATION>.d\` qui contient :
- `conf.yaml`: Les paramètres actifs pour l'intégration
* `conf.yaml.example`: Un fichier d'exemple montrant les clés de configuration prises en charge 

Lorsque vous modifiez la configuration, veillez à redémarrer le site Agent pour que les modifications soient prises en compte.

Le [Datadog Agent Manager GUI][6] peut être utilisé pour activer, désactiver et configurer les contrôles. Vous devez redémarrer le site Agent pour que vos modifications soient prises en compte.

**Remarque** : `ProgramData` est un dossier caché.

## Commandes de l'Agent

L'exécution de l'Agent est contrôlée par le gestionnaire de contrôle des services Windows.

* Le nom de l'exécutable principal est `agent.exe`. 
* L'interface de configuration est une application basée sur un navigateur (pour Windows 64 bits uniquement).
* Les commandes peuvent être exécutées à partir de la ligne de commande **élevée (exécutée en tant qu'administrateur)** (PowerShell ou Command Prompt) en utilisant la syntaxe suivante : `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Vous trouverez ci-dessous la liste des options disponibles depuis la ligne de commande :

| Commande         | Rôle                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Exécute le check spécifié.                                                        |
| diagnose        | Exécute un diagnostic de connectivité sur votre système.                             |
| flare           | Recueille et envoie un flare à Datadog.                                         |
| help            | Affiche des informations d'aide pour n'importe quelle commande.                                                     |
| hostname        | Affiche le hostname utilisé par l'Agent.                                           |
| import          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent.    |
| launch-gui      | Démarre Datadog Agent Manager.                                                |
| restart-service | Redémarre l'Agent dans le gestionnaire de contrôle des services.                           |
| run             | Démarre l'Agent.                                                                |
| start           | Démarre l'Agent. (Obsolète, mais accepté. Utilisez plutôt `run`.) |
| start-service   | Démarre l'Agent dans le gestionnaire de contrôle des services.                             |
| status          | Affiche le statut actuel.                                                        |
| stopservice     | Arrête l'Agent dans le gestionnaire de contrôle des services.                              |
| version         | Affiche les informations sur la version.                                                         |

**Exemples** :
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Invite de commandes (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Désinstaller l'Agent

L'Agent peut être désinstallé de deux façons différentes sur Windows. Les deux méthodes suppriment l'Agent, mais pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

### Ajouter ou supprimer des programmes

1. Appuyez sur **CTRL** et **Échap** ou utilisez la touche Windows pour lancer la recherche Windows.
1. Recherchez `ajouter` et cliquez sur **Ajouter ou supprimer des programmes**.
1. Recherchez `Datadog Agent` et cliquez sur **Désinstaller**.

### PowerShell

**Remarque :** activez WinRM pour utiliser les commandes ci-dessous.

Utilisez la commande PowerShell suivante pour désinstaller l'Agent sans redémarrage :

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Dépannage

Pour les étapes de dépannage, voir la [Agent Documentation de dépannage][18] .


### Statut et informations sur l'Agent

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service `DatadogAgent` indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé *Datadog Metrics Agent* (`agent.exe`) doit également être présent dans le gestionnaire des tâches.

Pour obtenir davantage d'informations sur l'état de l'agent, démarrez Datadog Agent Manager :

* Dans la barre d'état système, faites un clic droit sur l'icône de l'Agent Datadog -> Configure, ou
* Exécutez la commande `launch-gui` depuis une ligne de commande avec **élévation des droits (exécutée en tant qu'administrateur)** :
    - PowerShell : `& "<CHEMIN_VERS_AGENT.EXE>" launch-gui`
    - cmd : `"<CHEMIN_VERS_AGENT.EXE>" launch-gui`

Ouvrez ensuite la page d'état en accédant à *Status* -> *General*.
Obtenez davantage d'informations sur les checks en cours d'exécution dans *Status* -> *Collector* et *Checks* -> *Summary*.

La commande status est disponible pour PowerShell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

ou cmd.exe :

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Emplacement des logs

Les logs de l'Agent se situent dans `C:\ProgramData\Datadog\logs\agent.log`.

**Remarque** : `ProgramData` est un dossier caché.

## Cas d'utilisation

###  Surveiller un service Windows

Sur votre host cible, lancez Datadog Agent Manager et sélectionnez l'intégration « Windows Service » dans la liste. Un exemple prêt à l'emploi est inclus ; il repose toutefois sur DHCP.

Pour obtenir le nom du service, ouvrez `services.msc` et repérez votre service cible. En utilisant DHCP comme cible, vous pouvez voir le nom du service en haut de la fenêtre des propriétés du service :

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Lors de l'ajout de vos propres services, veillez à suivre précisément le format indiqué. En cas d'erreur de format, l'intégration ne fonctionnera pas. **Remarque** : les caractères spéciaux doivent être échappés dans le nom des services. Par exemple, pour indiquer le nom `MSSQL$BILLING`, utilisez `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Service DHCP Windows" style="width:75%;">}}

De plus, lorsque vous modifiez une intégration, le service Datadog doit être redémarré. Vous pouvez le faire depuis services.msc ou depuis la barre latérale de l'interface.

Datadog ne surveille pas les métriques des services : il vérifie uniquement leur disponibilité. Pour surveiller les métriques, utilisez l'intégration [Processus](#surveillance-des-processus-de-windows) ou [WMI][7]). Pour configurer un monitor, sélectionnez le [type de monitor d'intégration][8] puis recherchez **Windows Service**. Dans *Integration Status -> Pick Monitor Scope*, choisissez le service que vous souhaitez surveiller.

### Surveiller la charge système sous Windows

L'Agent Datadog recueille par défaut un grand nombre de métriques système. Les métriques système les plus souvent utilisées sont les métriques `system.load.*`. Toutefois, celles-ci sont réservées aux environnements **Unix**.

Bien que Windows ne propose pas de métriques `system.load.*`, une option équivalente est disponible par défaut : `system.proc.queue.length`. Cette métrique affiche le nombre de threads présents dans la file d'attente du processeur et en attente d'exécution.

### Surveiller des processus Windows

Vous pouvez surveiller des processus Windows avec la fonctionnalité de [surveillance des Live Process][9]. Pour l'activer dans Windows, modifiez le [fichier de configuration principal de l'Agent][10] en définissant le paramètre suivant sur true :

`datadog.yaml` :

```yaml
process_config:
  enabled: "true"
```

Une fois la configuration effectuée, [redémarrez l'Agent][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[2]: /fr/agent/supported_platforms/?tab=windows
[3]: /fr/agent/faq/windows-agent-ddagent-user/
[4]: /fr/agent/configuration/proxy/
[5]: /fr/network_monitoring/cloud_network_monitoring
[6]: /fr/agent/guide/datadog-agent-manager-windows/
[7]: /fr/integrations/wmi_check/
[8]: https://app.datadoghq.com/monitors/create/integration
[9]: /fr/infrastructure/process/?tab=linuxwindows#installation
[10]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/agent/configuration/agent-commands/#restart-the-agent
[12]: http://127.0.0.1:5002
[13]: /fr/agent/guide/python-3/
[14]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
[15]: https://docs.datadoghq.com/fr/agent/supported_platforms/?tab=linux
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /fr/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/fr/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys