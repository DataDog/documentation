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
- /fr/agent/basic_agent_usage/windows/
description: Fonctionnalités de base du Datadog Agent sur la plateforme Windows.
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
- link: /agent/architecture/#agent-architecture
  tag: Documentation
  text: En savoir plus sur l'architecture de l'Agent
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurer les ports entrants
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: En savoir plus sur l'utilisateur du Datadog Agent pour Windows
platform: Windows
title: Windows
---
## Présentation {#overview}

Cette page présente les fonctionnalités de base du Datadog Agent pour Windows. Si vous n'avez pas encore installé l'Agent, consultez les instructions d'installation ci-dessous ou [suivez les instructions dans l'application][1].

Consultez [Plateformes prises en charge][15] pour obtenir la liste complète des versions de Windows prises en charge.

## Installation {#installation}

Pour installer le Datadog Agent sur vos hosts Windows, suivez le [flux guidé dans l'application au sein de Fleet Automation][16], puis copiez et exécutez la commande d'installation. Les Agents Datadog s'exécutent sous le `ddagentuser`. Consultez la documentation de l'utilisateur Datadog Windows Agent [17] pour plus d'informations.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Étapes d'installation dans l'application pour le Datadog Agent sur un host Windows." style="width:90%;">}}


## Méthodes d'installation alternatives {#alternative-installation-methods}

### Installer avec l'interface graphique de l'Agent Manager {#install-with-the-agent-manager-gui}

<div class="alert alert-info">L'emplacement d'installation par défaut de l'Agent est <code>%ProgramFiles%\Datadog\Datadog Agent</code>Si vous choisissez d'utiliser un emplacement d'installation personnalisé, assurez-vous de spécifier un <code>Datadog</code> sous-répertoire pour les fichiers Datadog.</div>

1. Téléchargez le [programme d'installation du Datadog Agent][400] pour installer la dernière version de l'Agent.
2. Exécutez le programme d'installation en ouvrant `datadog-agent-7-latest.amd64.msi`. Lorsque vous y êtes invité, saisissez vos identifiants d'administrateur.
3. Suivez les instructions, acceptez le contrat de licence et saisissez votre [clé d'API Datadog][500].

Une fois l'installation terminée, vous avez la possibilité de lancer Datadog Agent Manager.


#### Options de configuration de l'installation {#installation-configuration-options}

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows. Pour des options de configuration de l'Agent supplémentaires, consultez [plus d'options de configuration de l'Agent](#more-agent-configuration-options).


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Chaîne  | Ajoute la clé d'API Datadog API au fichier de configuration.                                                                                                                                                                                 |
| `SITE`   | Chaîne  | Définit le site d'ingestion Datadog, par exemple : `SITE=datadoghq.com`     |
| `TAGS`                                      | Chaîne  | Liste séparée par des virgules de tags à attribuer dans le fichier de configuration. Exemple : `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Chaîne  | Configure le nom de host rapporté par l'Agent à Datadog (remplace tout nom de host calculé au moment de l'exécution).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Chaîne  | Remplace le nom d'utilisateur `ddagentuser` par défaut utilisé lors de l'installation de l'Agent _(v6.11.0+)_. [En savoir plus sur l'utilisateur du Datadog Agent pour Windows][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Chaîne  | Remplace le mot de passe sécurisé cryptographiquement généré pour l'utilisateur `ddagentuser` lors de l'installation de l'Agent _(v6.11.0+)_. Doit être fourni pour les installations sur des serveurs de domaine. [En savoir plus sur l'utilisateur du Datadog Agent pour Windows][3].  |
| `APPLICATIONDATADIRECTORY`                  | Chemin  | Remplace le répertoire à utiliser pour l'arborescence du fichier de configuration. Ne peut être fourni que lors de l'installation initiale ; non valide pour les mises à niveau. Par défaut : `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Chemin  | Remplace le répertoire à utiliser pour l'arborescence du fichier binaire. Ne peut être fourni que lors de l'installation initiale ; non valide pour les mises à niveau. Par défaut : `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si vous choisissez de remplacer le répertoire par défaut, assurez-vous de spécifier un sous-répertoire `Datadog` pour les fichiers Datadog.                                    |

**Remarques**

- L'option `/qn` exécute une installation silencieuse. Pour voir les invites de l'interface graphique, supprimez-la.
- Certaines versions de l'Agent peuvent provoquer un redémarrage forcé. Pour éviter cela, ajoutez le paramètre : `REBOOT=ReallySuppress`.
- Certains composants de l'Agent nécessitent un pilote de noyau pour collecter des données. Pour savoir si un pilote de noyau est requis pour votre composant, consultez sa page de documentation ou recherchez `kernel driver` dans les fichiers de configuration de l'Agent associés.
- Si un `datadog.yaml` valide est trouvé, ce fichier prévaut sur toutes les options de ligne de commande spécifiées.

#### Plus d'options de configuration de l'Agent {#more-agent-configuration-options}

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows.

**Remarque** : Si un `datadog.yaml` valide est trouvé, ce fichier prévaut sur toutes les options de ligne de commande spécifiées.


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Chaîne  | Active (`"true"`) ou désactive (`"false"`) la fonctionnalité de collecte des logs dans le fichier de configuration. Les logs sont désactivés par défaut.                                                                                                        |
| `APM_ENABLED`                               | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent APM dans le fichier de configuration. L'APM est activé par défaut.                                                                                                                        |
| `PROCESS_ENABLED`                           | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent de processus dans le fichier de configuration. L'Agent de processus est désactivé par défaut.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'utilisation du FQDN pour le nom de host de l'Agent. Cela équivaut à définir `hostname_fqdn` dans le fichier de configuration de l'Agent. L'utilisation du FQDN pour le nom de host est désactivée par défaut. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Nombre | Un numéro de port valide compris entre 0 et 65534. Le Datadog Agent expose une API de commande sur le port 5001. Si ce port est déjà utilisé par un autre programme, la valeur par défaut peut être remplacée ici.                                               |
| `PROXY_HOST`                                | Chaîne | (Si vous utilisez un proxy) définit votre host de proxy. [En savoir plus sur l'utilisation d'un proxy avec le Datadog Agent][4].                                                                                                                                 |
| `PROXY_PORT`                                | Nombre | (Si vous utilisez un proxy) définit votre port de proxy. [En savoir plus sur l'utilisation d'un proxy avec le Datadog Agent][4].                                                                                                                                 |
| `PROXY_USER`                                | Chaîne | (Si vous utilisez un proxy) définit votre utilisateur de proxy. [En savoir plus sur l'utilisation d'un proxy avec le Datadog Agent][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Chaîne | (Si vous utilisez un proxy) définit votre mot de passe de proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour transmettre un mot de passe d'authentification et ne peut pas être renommée. [En savoir plus sur l'utilisation d'un proxy avec le Datadog Agent][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booléen | Utilisez l'identifiant d'instance EC2 pour les hosts Windows sur EC2. _(v7.28.0+)_                                            |

#### Fichiers logs d'installation {#installation-log-files}

Définissez l'option `/log <FILENAME>` msiexec pour configurer un fichier log d'installation. Si cette option n'est pas définie, msiexec écrit le log dans `%TEMP%\MSI*.LOG` par défaut.


## Configuration {#configuration}

Le fichier de configuration principal de l'Agent se trouve à l'emplacement suivant :
`C:\ProgramData\Datadog\datadog.yaml`. Ce fichier est utilisé pour les paramètres à l'échelle du host, tels que la clé d'API, le site Datadog sélectionné, les paramètres de proxy, les tags de host et le niveau de log.

Il existe également un fichier `datadog.yaml.example` dans le même répertoire, qui est une référence entièrement commentée contenant toutes les options de configuration disponibles, utile pour consulter et copier des paramètres spécifiques. Sinon, consultez l'[exemple de fichier de configuration de l'Agent pour Windows][19] sur GitHub.


Les fichiers de configuration pour les intégrations se trouvent dans :
`C:\ProgramData\Datadog\conf.d\` Il peut également y avoir un autre emplacement hérité : `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Chaque intégration possède un sous-répertoire `<INTEGRATION>.d\` qui contient :
- `conf.yaml` : Les paramètres actifs pour l'intégration
* `conf.yaml.example` : Un exemple de fichier montrant quelles clés de configuration sont prises en charge

Lorsque vous effectuez des modifications de configuration, assurez-vous de redémarrer l'Agent pour que les modifications prennent effet.

L'[interface graphique du Datadog Agent Manager][6] peut être utilisée pour activer, désactiver et configurer les checks. Vous devez redémarrer l'Agent pour que vos modifications prennent effet.

**Remarque** : `ProgramData` est un dossier masqué.

## Commandes de l'Agent {#agent-commands}

L'exécution de l'Agent est contrôlée par le gestionnaire de contrôle des services Windows.

* Le nom de l'exécutable principal est `agent.exe`.
* L'interface graphique de configuration est une application de configuration basée sur un navigateur (pour Windows 64 bits uniquement).
* Les commandes peuvent être exécutées depuis la ligne de commande **élevée (exécutée en tant qu'administrateur)** (PowerShell ou invite de commande) en utilisant la syntaxe `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Les options de ligne de commande sont ci-dessous :

| Commande         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| Exécute le check spécifié.|                                                         |
| diagnose        | Exécute un diagnostic de connectivité sur votre système.                             |
| flare           | Collecte un flare et l'envoie à Datadog.                                         |
| help            | Obtient de l'aide sur n'importe quelle commande.                                                     |
| hostname        | Affiche le nom de host utilisé par l'Agent.                                           |
| import          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent.    |
| launch-gui      | Démarre le Datadog Agent Manager.                                                |
| restart-service | Redémarre l'Agent au sein du gestionnaire de contrôle des services.                           |
| run             | Démarre l'Agent.                                                                |
| start           | Démarre l'Agent. (Obsolète, mais accepté. Utilisez `run` comme alternative.) |
| start-service   | Démarre l'Agent au sein du gestionnaire de contrôle des services.                             |
| status          | Affiche le statut actuel.                                                        |
| stopservice     | Arrête l'Agent au sein du gestionnaire de contrôle des services.                              |
| version         | Affiche les informations de version.                                                         |

**Exemples** :
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Command Prompt (`cmd.exe`)

    ```cmd
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

## Désinstalle l'Agent {#uninstall-the-agent}

Il existe deux méthodes différentes pour désinstaller l'Agent sur Windows. Les deux méthodes suppriment l'Agent, mais ne suppriment pas le dossier de configuration `C:\ProgramData\Datadog` sur le host.

### Ajouter ou supprimer des programmes {#add-or-remove-programs}

1. Appuyez sur **CTRL** et **Esc** ou utilisez la touche Windows pour lancer la recherche Windows.
1. Recherchez `add` et cliquez sur {{< ui >}}Add or remove programs{{< /ui >}}.
1. Recherchez `Datadog Agent` et cliquez sur {{< ui >}}Uninstall{{< /ui >}}.

### PowerShell {#powershell}

**Remarque0:** Activez WinRM pour utiliser les commandes ci-dessous.

Utilisez la commande PowerShell suivante pour désinstaller l'Agent sans redémarrage :

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Dépannage {#troubleshooting}

Pour les étapes de dépannage, consultez la [documentation de dépannage de l'Agent][18] .


### État et informations de l'Agent {#agent-status-and-information}

Pour vérifier que l'Agent est en cours d'exécution, vérifiez si le service `DatadogAgent` dans le panneau Services est indiqué comme *Démarré*. Un processus appelé *Datadog Metrics Agent* (`agent.exe`) devrait également exister dans le Gestionnaire des tâches.

Pour obtenir davantage d'informations sur l'état de l'Agent, démarrez Datadog Agent Manager :

* Faites un clic droit sur l'icône de la barre d'état système du Datadog Agent > {{< ui >}}Configure{{< /ui >}}, ou
* Exécutez la commande `launch-gui` depuis une ligne de commande **élevée (exécuter en tant qu'administrateur)**
	- PowerShell: `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd: `"<PATH_TO_AGENT.EXE>" launch-gui`

Ensuite, ouvrez la page d'état en allant sur {{< ui >}}Status{{< /ui >}} > {{< ui >}}General{{< /ui >}}.
Obtenez plus d'informations sur l'exécution des checks dans {{< ui >}}Status{{< /ui >}} > {{< ui >}}Collector{{< /ui >}} et {{< ui >}}Checks{{< /ui >}} > {{< ui >}}Summary{{< /ui >}}.

La commande status est disponible pour PowerShell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

ou cmd.exe :

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Emplacement des logs {#logs-location}

Les logs de l'Agent se trouvent dans `C:\ProgramData\Datadog\logs\agent.log`.

**Remarque** : `ProgramData` est un dossier masqué.

## Cas d'utilisation {#use-cases}

###  Surveillance d'un service Windows {#monitoring-a-windows-service}

Sur votre host cible, lancez le Datadog Agent Manager et sélectionnez l'intégration {{< ui >}}Windows Service{{< /ui >}} dans la liste. Il existe un exemple prêt à l'emploi ; cependant, cet exemple utilise DHCP.

Pour obtenir le nom du service, ouvrez `services.msc` et localisez votre service cible. En utilisant DHCP comme cible, vous pouvez voir le nom du service en haut de la fenêtre des propriétés du service :

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Lorsque vous ajoutez vos propres services, assurez-vous de respecter exactement le formatage indiqué. Si le formatage n'est pas correct, l'intégration échoue. **Remarque** : Les caractères spéciaux dans un nom de service doivent être échappés. Par exemple, le nom `MSSQL$BILLING` peut être ajouté avec `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Windows DHCP Service" style="width:75%;">}}

De plus, chaque fois que vous modifiez une intégration, le service Datadog doit être redémarré. Vous pouvez effectuer cette opération depuis services.msc ou depuis la barre latérale de l'interface utilisateur.

Pour les Services, Datadog ne suit pas les métriques, seulement leur disponibilité. (Pour les métriques, utilisez l'intégration [Process](#monitoring-windows-processes) ou [WMI][7]). Pour configurer un Monitor, sélectionnez le [Integration monitor type][8], puis recherchez {{< ui >}}Windows Service{{< /ui >}}. Depuis {{< ui >}}Integration Status{{< /ui >}} > {{< ui >}}Pick Monitor Scope{{< /ui >}}, choisissez le service que vous souhaitez surveiller.

### Surveillance de la charge système pour Windows {#monitoring-system-load-for-windows}

Le Datadog Agent collecte par défaut un grand nombre de métriques système. Les métriques système les plus couramment utilisées sont `system.load.*`, mais ces métriques sont spécifiques à **Unix**.

Bien que Windows ne propose pas les métriques `system.load.*`, une option équivalente disponible par défaut est `system.proc.queue.length`. Cette métrique indique le nombre de threads observés comme étant retardés dans la file d'attente du processeur et en attente d'exécution.

### Surveillance des processus Windows {#monitoring-windows-processes}

Vous pouvez surveiller les processus Windows avec [Live Process Monitoring][9]. Pour activer cette fonctionnalité sur Windows, modifiez le [fichier de configuration principal de l'Agent][10] en définissant le paramètre suivant sur true :

`datadog.yaml` :

```yaml
process_config:
  enabled: "true"
```

Une fois la configuration effectuée, [redémarrez l'Agent][11].

## Pour aller plus loin {#further-reading}

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
[15]: https://docs.datadoghq.com/fr/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /fr/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/fr/agent/troubleshooting/
[19]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys