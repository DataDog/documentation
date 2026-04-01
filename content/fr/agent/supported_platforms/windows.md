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
description: Fonctionnalité de base de l'Agent Datadog sur la plateforme Windows.
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
  text: Découvrez-en plus sur l'architecture de l'Agent.
- link: /agent/configuration/network#configure-ports
  tag: Documentation
  text: Configurez les ports entrants.
- link: /agent/guide/windows-agent-ddagent-user
  tag: Documentation
  text: En savoir plus sur l'utilisateur de l'Agent Datadog pour Windows.
platform: Windows
title: Windows
---
## Aperçu

Cette page décrit les fonctionnalités de base de l'Agent Datadog pour Windows. Si vous n'avez pas encore installé l'Agent, consultez les instructions d'installation ci-dessous ou [suivez les instructions dans l'application][1].

Voir [Plateformes prises en charge][15] pour la liste complète des versions de Windows prises en charge.

## Installation

Pour installer l'Agent Datadog sur vos hôtes Windows, suivez le [flux guidé dans l'application au sein de Fleet Automation][16], puis copiez et exécutez la commande d'installation. Les Agents Datadog s'exécutent sous le `ddagentuser`. Consultez la documentation [Utilisateur de l'Agent Datadog pour Windows][17] pour plus d'informations.


{{< img src="/agent/basic_agent_usage/windows_img2_july_25.png" alt="Étapes d'installation dans l'application pour l'Agent Datadog sur un hôte Windows." style="width:90%;">}}


## Méthodes d'installation alternatives

### Installer avec l'interface graphique de l'Agent Manager

<div class="alert alert-info"> L'emplacement d'installation par défaut pour l'Agent est <code>%ProgramFiles%\Datadog\Datadog Agent</code>. Si vous choisissez d'utiliser un emplacement d'installation personnalisé, assurez-vous de spécifier un sous-répertoire <code>Datadog</code> pour les fichiers Datadog.</div>

1. Téléchargez le [programme d'installation de l'Agent Datadog][400] pour installer la dernière version de l'Agent.
2. Exécutez le programme d'installation en ouvrant `datadog-agent-7-latest.amd64.msi`. Lorsque vous y êtes invité, entrez vos identifiants d'administrateur.
3. Suivez les instructions, acceptez le contrat de licence et entrez votre [clé API Datadog][500].

Une fois l'installation terminée, vous avez la possibilité de lancer Datadog Agent Manager.


#### Options de configuration à l'installation

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows. Pour des options de configuration supplémentaires de l'Agent, voir [plus d'options de configuration de l'Agent](#more-agent-configuration-options).


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Chaîne  | Ajoute la clé API Datadog au fichier de configuration.                                                                                                                                                                                 |
| `SITE`   | Chaîne  | Définit le site d'admission Datadog, par exemple : `SITE=datadoghq.com`     |
| `TAGS`                                      | Chaîne  | Liste de tags séparés par des virgules à attribuer dans le fichier de configuration. Exemple : `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                         |
| `HOSTNAME`                                  | Chaîne  | Configure le nom d'hôte rapporté par l'Agent à Datadog (remplace tout nom d'hôte calculé à l'exécution).                                                                                                                            |
| `DDAGENTUSER_NAME`                          | Chaîne  | Remplace le `ddagentuser` nom d'utilisateur par défaut utilisé lors de l'installation de l'Agent _(v6.11.0+)_. [En savoir plus sur l'Agent Windows Datadog][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Chaîne  | Remplace le mot de passe cryptographiquement sécurisé généré pour le `ddagentuser` utilisateur lors de l'installation de l'Agent _(v6.11.0+)_. Doit être fourni pour les installations sur des serveurs de domaine. [En savoir plus sur l'Agent Windows Datadog][3].  |
| `APPLICATIONDATADIRECTORY`                  | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du fichier de configuration. Ne peut être fourni que lors de l'installation initiale ; non valide pour les mises à niveau. Par défaut : `C:\ProgramData\Datadog`. _(v6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du fichier binaire. Ne peut être fourni que lors de l'installation initiale ; non valide pour les mises à niveau. Par défaut : `%ProgramFiles%\Datadog\Datadog Agent`. _(v6.11.0+)_<br><br>Si vous choisissez de remplacer le répertoire par défaut, assurez-vous de spécifier un `Datadog` sous-répertoire pour les fichiers Datadog.                                    |

**Notes**

- L'`/qn` option exécute une installation silencieuse. Pour voir les invites de l'interface graphique, retirez-le.
- Certaines versions de l'Agent peuvent provoquer un redémarrage forcé. Pour éviter cela, ajoutez le paramètre : `REBOOT=ReallySuppress`.
- Certains composants de l'Agent nécessitent un pilote de noyau pour collecter des données. Pour savoir si un pilote de noyau est requis pour votre composant, consultez sa page de documentation ou recherchez `kernel driver` dans les fichiers de configuration de l'Agent associés.
- Si un `datadog.yaml` valide est trouvé, ce fichier prend le pas sur toutes les options de ligne de commande spécifiées.

#### Autres options de configuration de l'Agent

Chacune des options de configuration suivantes peut être ajoutée en tant que propriété dans la ligne de commande lors de l'installation de l'Agent sur Windows.

**Note** : Si un `datadog.yaml` valide est trouvé, ce fichier prend le pas sur toutes les options de ligne de commande spécifiées.


| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LOGS_ENABLED`                              | Chaîne  | Activez (`"true"`) ou désactivez (`"false"`) la fonctionnalité de collecte de journaux dans le fichier de configuration. Les journaux sont désactivés par défaut.                                                                                                        |
| `APM_ENABLED`                               | Chaîne  | Activez (`"true"`) ou désactivez (`"false"`) l'Agent APM dans le fichier de configuration. L'APM est activé par défaut.                                                                                                                        |
| `PROCESS_ENABLED`                           | Chaîne  | Activez (`"true"`) ou désactivez (`"false"`) l'Agent de Processus dans le fichier de configuration. L'Agent de Processus est désactivé par défaut.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Chaîne  | Activez (`"true"`) ou désactivez (`"false"`) l'utilisation de FQDN pour le nom d'hôte de l'Agent. Cela équivaut à définir `hostname_fqdn` dans le fichier de configuration de l'Agent. L'utilisation de FQDN pour le nom d'hôte est désactivée par défaut. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Nombre  | Un numéro de port valide entre 0 et 65534. L'Agent Datadog expose une API de commande sur le port 5001. Si ce port est déjà utilisé par un autre programme, la valeur par défaut peut être remplacée ici.                                               |
| `PROXY_HOST`                                | Chaîne  | (Si vous utilisez un proxy) définit votre hôte proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_PORT`                                | Numéro | (Si vous utilisez un proxy) définit votre port proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_USER`                                | Chaîne | (Si vous utilisez un proxy) définit votre utilisateur proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Chaîne | (Si vous utilisez un proxy) définit votre mot de passe proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour passer un mot de passe d'authentification et ne peut pas être renommée. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][4]. |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booléen | Utilisez l'identifiant d'instance EC2 pour les hôtes Windows sur EC2. _(v7.28.0+)_                                            |

#### Fichiers journaux d'installation

Définissez l'option `/log <FILENAME>` msiexec pour configurer un fichier journal d'installation. Si cette option n'est pas définie, msiexec écrit le journal par défaut dans `%TEMP%\MSI*.LOG`.


## Créez un fichier `conf.yaml` dans le dossier `logstash.d/` précédemment créé.

Le fichier de configuration principal de l'Agent est situé à
`C:\ProgramData\Datadog\datadog.yaml`. Ce fichier est utilisé pour les paramètres globaux tels que la clé API, le site Datadog sélectionné, les paramètres du proxy, les balises d'hôte et le niveau de journalisation.

Il y a aussi un fichier `datadog.yaml.example` dans le même répertoire, qui est une référence entièrement commentée avec toutes les options de configuration disponibles, utile pour référence et pour copier des paramètres spécifiques.


Les fichiers de configuration pour les intégrations se trouvent dans :
`C:\ProgramData\Datadog\conf.d\` Il peut également y avoir un emplacement alternatif hérité : `C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`.

Chaque intégration a un sous-répertoire `<INTEGRATION>.d\` qui contient :
- `conf.yaml` : Les paramètres actifs pour l'intégration
* `conf.yaml.example` : Un fichier d'exemple montrant quelles clés de configuration sont prises en charge

Lors de la modification des configurations, assurez-vous de redémarrer l'Agent pour garantir que les modifications prennent effet.

L'[interface graphique du gestionnaire d'Agent Datadog][6] peut être utilisée pour activer, désactiver et configurer des vérifications. Vous devez redémarrer l'Agent pour que vos modifications prennent effet.

**Remarque** : `ProgramData` est un dossier caché.

## Commandes de l'Agent

L'exécution de l'Agent est contrôlée par le gestionnaire de contrôle des services Windows.

* Le nom de l'exécutable principal est `agent.exe`.
* L'interface de configuration est une application basée sur un navigateur (pour Windows 64 bits uniquement).
* Les commandes peuvent être exécutées à partir de la ligne de commande **élevée (exécuter en tant qu'administrateur)** en utilisant la syntaxe `<PATH_TO_AGENT.EXE> <COMMAND>`.
* Vous trouverez ci-dessous la liste des options disponibles depuis l'interface de ligne de commande :

| Commande         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| vérifier         | Exécute la vérification spécifiée.                                                        |
| diagnostiquer     | Exécute un diagnostic de connectivité sur votre système.                             |
| flare            | Collecte un flare et l'envoie à Datadog.                                         |
| aide            | Obtient de l'aide sur n'importe quelle commande.                                                     |
| nom d'hôte      | Affiche le nom d'hôte utilisé par l'Agent.                                           |
| importer        | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent.    |
| lancer-gui      | Démarre le gestionnaire d'Agent Datadog.                                                |
| redémarrer-service | Redémarre l'Agent dans le gestionnaire de contrôle des services.                           |
| exécuter         | Démarre l'Agent.                                                                |
| démarrer         | Démarre l'Agent. (En cours de dépréciation, mais accepté. Utilisez `run` comme alternative.) |
| démarrer-service | Démarre l'Agent dans le gestionnaire de contrôle des services.                             |
| statut          | Affiche le statut actuel.                                                        |
| arrêter-service  | Arrête l'Agent dans le gestionnaire de contrôle des services.                              |
| version         | Affiche les informations de version.                                                         |

**Exemples** :
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

Il existe deux méthodes différentes pour désinstaller l'Agent sur Windows. Les deux méthodes suppriment l'Agent, mais ne suppriment pas le dossier de configuration `C:\ProgramData\Datadog` sur l'hôte.

### Ajouter ou supprimer des programmes

1. Appuyez sur **CTRL** et **Esc** ou utilisez la touche Windows pour exécuter la recherche Windows.
1. Recherchez `add` et cliquez sur **Ajouter ou supprimer des programmes**.
1. Recherchez `Datadog Agent` et cliquez sur **Désinstaller**.

### PowerShell

**Remarque :** Activez WinRM pour utiliser les commandes ci-dessous.

Utilisez la commande PowerShell suivante pour désinstaller l'Agent sans redémarrage :

{{< code-block lang="powershell" >}}
$productCode = (@(Get-ChildItem -Path "HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall" -Recurse) | Where {$_.GetValue("DisplayName") -like "Datadog Agent" }).PSChildName
start-process msiexec -Wait -ArgumentList ('/log', 'C:\uninst.log', '/q', '/x', "$productCode", 'REBOOT=ReallySuppress')
{{< /code-block >}}

## Dépannage

Pour les étapes de dépannage, consultez la [documentation de dépannage de l'Agent][18].


### Statut et informations de l'Agent

Pour vérifier que l'Agent fonctionne, vérifiez si le service `DatadogAgent` dans le panneau des Services est répertorié comme *Démarré*. Un processus appelé *Agent de métriques Datadog* (`agent.exe`) devrait également exister dans le Gestionnaire des tâches.

Pour obtenir davantage d'informations sur l'état de l'agent, démarrez Datadog Agent Manager :

* Cliquez avec le bouton droit sur l'icône de la barre d'état système de l'Agent Datadog -> Configurer, ou
* Exécutez `launch-gui` la commande depuis une **invite de commande élevée (exécuter en tant qu'Admin)**
	- PowerShell : `& "<PATH_TO_AGENT.EXE>" launch-gui`
	- cmd : `"<PATH_TO_AGENT.EXE>" launch-gui`

Ensuite, ouvrez la page d'état en allant à *État* -> *Général*.
Obtenez plus d'informations sur l'exécution des vérifications dans *Statut* -> *Collecteur* et *Vérifications* -> *Résumé*.

La commande status est disponible pour PowerShell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

ou cmd.exe :

```cmd
"%ProgramFiles%\Datadog\Datadog Agent\bin\agent.exe" status
```

### Emplacement des journaux

Les journaux de l'Agent se trouvent dans `C:\ProgramData\Datadog\logs\agent.log`.

**Remarque** : `ProgramData` est un dossier caché.

## Cas d'utilisation

### Surveillance d'un service Windows

Sur votre hôte cible, lancez le Gestionnaire d'Agent Datadog et sélectionnez l'intégration "Service Windows" dans la liste. Il existe un exemple prêt à l'emploi ; cependant, cet exemple utilise DHCP.

Pour obtenir le nom du service, ouvrez `services.msc` et localisez votre service cible. En utilisant DHCP comme cible, vous pouvez voir le nom du service en haut de la fenêtre des propriétés du service :

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Lorsque vous ajoutez vos propres services, assurez-vous de suivre le format exactement comme indiqué. Si le format n'est pas correct, l'intégration échoue. **Remarque** : Les caractères spéciaux dans un nom de service doivent être échappés. Par exemple, le nom `MSSQL$BILLING` peut être ajouté avec `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Service DHCP Windows" style="width:75%;">}}

De plus, chaque fois que vous modifiez une intégration, le service Datadog doit être redémarré. Vous pouvez le faire depuis services.msc ou depuis la barre latérale de l'interface utilisateur.

Pour les Services, Datadog ne suit pas les métriques—seulement leur disponibilité. (Pour les métriques, utilisez l'intégration [Processus](#monitoring-windows-processes) ou [WMI][7]). Pour configurer un Moniteur, sélectionnez le [type de moniteur d'intégration][8] puis recherchez **Service Windows**. Depuis *Statut d'intégration -> Choisir la portée de surveillance*, choisissez le service que vous souhaitez surveiller.

### Surveiller la charge système sous Windows

L'Agent Datadog collecte par défaut un grand nombre de métriques système. Les métriques système les plus couramment utilisées sont `system.load.*` mais ces métriques sont **spécifiques à Unix**.

Bien que Windows n'offre pas les `system.load.*` métriques, une option équivalente disponible par défaut est `system.proc.queue.length`. Cette métrique montre le nombre de threads observés comme retardés dans la file d'attente prête du processeur qui attendent d'être exécutés.

### Surveiller des processus Windows

Vous pouvez surveiller les processus Windows avec [Surveillance des processus en direct][9]. Pour activer cela sur Windows, modifiez le [fichier de configuration principal de l'Agent][10] en définissant le paramètre suivant sur vrai :

`datadog.yaml`:

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
[15]: https://docs.datadoghq.com/fr/agent/supported_platforms/?tab=windows
[16]: https://app.datadoghq.com/fleet/install-agent/latest?platform=windows
[17]: /fr/agent/faq/windows-agent-ddagent-user/
[18]: https://docs.datadoghq.com/fr/agent/troubleshooting/
[400]: https://windows-agent.datadoghq.com/datadog-agent-7-latest.amd64.msi
[500]: https://app.datadoghq.com/organization-settings/api-keys