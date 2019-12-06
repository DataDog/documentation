---
title: Utilisation de base de l'Agent pour Windows
kind: documentation
description: Fonctionnalités de base de l'Agent Datadog sur la plateforme Windows.
platform: Windows
aliases:
  - /fr/guides/basic_agent_usage/windows/
further_reading:
  - link: logs/
    tag: Documentation
    text: Recueillir vos logs
  - link: graphing/infrastructure/process
    tag: Documentation
    text: Recueillir vos processus
  - link: tracing
    tag: Documentation
    text: Recueillir vos traces
---
## Implémentation
Si vous n'avez pas encore installé l'Agent Datadog, consultez les informations ci-dessous ou les [instructions d'installation intégrées à l'application][1]. Consultez la documentation de l'Agent pour connaître les [versions des systèmes d'exploitation pris en charge][2].

### Installation
À partir de la **version 6.11.0 de l'Agent Windows**, les composants de base ainsi que ceux de l'APM et du système de tracing s'exécutent sous le compte `ddagentuser` créé au moment de l'installation à la place du compte `LOCAL_SYSTEM`. Le composant Live Process, s'il est activé, s'exécute sous le compte `LOCAL_SYSTEM`. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].

**Remarque**: il existe des considérations particulières concernant les [contrôleurs de domaine][4].

#### Interface graphique

1. Téléchargez [le fichier d'installation de l'Agent Datadog][5].
2. Exécutez le fichier d'installation (en tant qu'**administrateur**) en ouvrant `ddagent-cli-6.14.3.msi`.
3. Suivez les instructions à l'écran, acceptez l'accord de licence et entrez votre [clé d'API Datadog][6].
4. Une fois l'installation terminée, vous avez la possibilité de lancer Datadog Agent Manager.

#### Ligne de commande
Vous pouvez également installer l'Agent avec une ligne de commande pour ajouter des paramètres personnalisés.

1. Téléchargez [le fichier d'installation de l'Agent Datadog][5].
2. Exécutez l'une des commandes suivantes dans le répertoire où vous avez téléchargé le fichier d'installation.
   **Remarque** : l'option `/qn` lance une installation silencieuse. Pour afficher les instructions de l'interface, supprimez cette option.

Invite de commande :
```cmd
start /wait msiexec /qn /i ddagent-cli-6.14.3.msi APIKEY="<VOTRE_CLÉ_API_DATADOG>"
```

Powershell :
```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i ddagent-cli-6.14.3.msi APIKEY="<VOTRE_CLÉ_API_DATADOG>"'
```

Chaque élément de configuration est ajouté en tant que propriété dans la ligne de commande. Les options de configuration en ligne de commande suivantes sont disponibles à l'installation de l'Agent sur Windows :

| Variable                   | Type   | Description                                                                                                                                                                                                                        |
|----------------------------|--------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                   | Chaîne | Ajoute la clé d'API Datadog au fichier de configuration.                                                                                                                                                                                |
| `TAGS`                     | Chaîne | Liste de tags à assigner dans le fichier de configuration, séparés par des virgules. Exemple : `TAGS="key_1:val_1,key_2:val_2"`                                                                                                                        |
| `HOSTNAME`                 | Chaîne | Configure le hostname transmis par l'Agent à Datadog (remplace le hostname calculé lors de l'exécution).                                                                                                                           |
| `LOGS_ENABLED`             | Chaîne | Active (`"true"`) ou désactive (`"false"`) la fonction de collecte de logs dans le fichier de configuration. Les logs sont désactivés par défaut.                                                                                                       |
| `APM_ENABLED`              | Chaîne | Active (`"true"`) ou désactive (`"false"`) l'Agent APM dans le fichier de configuration. L'APM est désactivé par défaut.                                                                                                                       |
| `PROCESS_ENABLED`          | Chaîne | Active (`"true"`) ou désactive (`"false"`) l'Agent de processus dans le fichier de configuration. L'Agent de processus est désactivé par défaut.                                                                                                    |
| `CMD_PORT`                 | Numéro | Un numéro de port valide compris entre 0 et 65534. L'Agent Datadog expose une API de commande sur le port 5001. Si ce port est déjà utilisé par un autre programme, la valeur par défaut peut être remplacée ici.                                              |
| `PROXY_HOST`               | Chaîne | En cas d'utilisation d'un proxy, définit le host de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][7].                                                                                                                                |
| `PROXY_PORT`               | Numéro | En cas d'utilisation d'un proxy, définit le port de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][7].                                                                                                                                |
| `PROXY_USER`               | Chaîne | En cas d'utilisation d'un proxy, définit l'utilisateur de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][7].                                                                                                                                |
| `PROXY_PASSWORD`           | Chaîne | En cas d'utilisation d'un proxy, définit le mot de passe de votre proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour la transmission d'un mot de passe d'authentification. Elle ne peut pas être renommée. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][7].                                                                                                                            |
| `DDAGENTUSER_NAME`         | Chaîne | Remplace le nom d'utilisateur `ddagentuser` par défaut lors de l'installation de l'Agent _(version 6.11.0+)_. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].                                                                                     |
| `DDAGENTUSER_PASSWORD`     | Chaîne | Remplace le mot de passe chiffré généré pour l'utilisateur `ddagentuser` lors de l'installation de l'Agent _(version 6.11.0+)_. Doit être spécifié pour les installations sur les serveurs DNS. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3]. |
| `APPLICATIONDATADIRECTORY` | Chemin   | Remplace le répertoire à utiliser pour l'arborescence du fichier de configuration. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `C:\ProgramData\Datadog`. _(version 6.11.0+)_                                          |
| `PROJECTLOCATION`          | Chemin   | Remplace le répertoire à utiliser pour l'arborescence du binaire. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `%PROGRAMFILES%\Datadog\Datadog Agent`. _(v6.11.0+)_                                 |

**Remarque** : si un fichier `datadog.yaml` valide est trouvé et qu'une clé d'API y est configurée, ce fichier est prioritaire sur toutes les options de ligne de commande spécifiées.

### Validation
Pour vérifier votre installation, suivez les instructions dans la section [Statut et informations de l'Agent](#statut-et-informations-de-l-agent).

## Commandes de l'Agent

L'exécution de l'Agent est contrôlée par le gestionnaire de contrôle des services Windows.

{{< tabs >}}
{{% tab "Agent v6" %}}

* Le nom du fichier exécutable principal est `agent.exe`.
* L'interface de configuration est une application basée sur un navigateur (pour Windows 64 bits uniquement).
* Les commandes peuvent être exécutées avec la ligne de commande `"%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" <commande>` pour les versions >= 6.12 de l'Agent ou `"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" <commande>` pour les versions <= 6.11 de l'Agent. Options de ligne de commande :

| Commande         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Exécute le check spécifié.                                                        |
| diagnose        | Exécute un diagnostic de connectivité sur votre système.                             |
| flare           | Recueille et envoie un flare à Datadog.                                         |
| help            | Affiche des informations d'aide pour n'importe quelle commande.                                                     |
| hostname        | Affiche le hostname utilisé par l'Agent.                                           |
| import          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent.    |
| installservice  | Installe l'Agent dans le gestionnaire de contrôle de service.                           |
| launch-gui      | Démarre Datadog Agent Manager.                                                |
| regimport       | Importe les paramètres de registre dans `datadog.yaml`.                                |
| remove-service  | Supprime l'Agent du gestionnaire de contrôle de service.                              |
| restart-service | Redémarre l'Agent dans le gestionnaire de contrôle de service.                           |
| run             | Démarre l'Agent.                                                                |
| start           | Démarre l'Agent. (Obsolète, mais accepté. Utilisez plutôt `run`.) |
| start-service   | Démarre l'Agent dans le gestionnaire de contrôle de service.                             |
| status          | Affiche le statut actuel.                                                        |
| stopservice     | Arrête l'Agent dans le gestionnaire de contrôle de service.                              |
| version         | Affiche les informations sur la version.                                                         |

{{% /tab %}}
{{% tab "Agent v5" %}}

Utilisez Datadog Agent Manager (disponible depuis le menu Démarrer).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Menu Démarrer Windows" responsive="true" style="width:75%;">}}

Utilisez les commandes `start`, `stop` et `restart` dans Datadog Agent Manager :

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Capture d'écran de Datadog Agent Manager" responsive="true" style="width:75%;">}}

Vous pouvez également utiliser le Powershell Windows, si celui-ci est disponible :
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Configuration

Utilisez [Datadog Agent Manager][8] pour activer, désactiver et configurer des checks. Redémarrez l'Agent pour appliquer vos modifications.

{{< tabs >}}
{{% tab "Agent v6" %}}
Le fichier de configuration principal de l'Agent se situe dans :  
`C:\ProgramData\Datadog\datadog.yaml`

Les fichiers de configuration pour les [intégrations][1] se situent dans :  
`C:\ProgramData\Datadog\conf.d\` OU  
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Remarque** : `ProgramData` est un dossier caché.

[1]: /fr/integrations
{{% /tab %}}
{{% tab "Agent v5" %}}

Le fichier de configuration principal de l'Agent se situe dans :  
`C:\ProgramData\Datadog\datadog.conf`

Les fichiers de configuration pour les [intégrations][1] se situent dans :  
`C:\ProgramData\Datadog\conf.d\` OU  
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Remarque** : `ProgramData` est un dossier caché.

[1]: /fr/integrations
{{% /tab %}}
{{< /tabs >}}

## Dépannage
### Statut et informations de l'Agent

{{< tabs >}}
{{% tab "Agent v6" %}}

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service `DatadogAgent` indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé *Datadog Metrics Agent* (`agent.exe`) doit également être présent dans le gestionnaire des tâches.

Pour obtenir davantage d'informations sur l'état de l'agent, démarrez Datadog Agent Manager :

* Dans la barre d'état système, faites un clic droit sur l'icône de l'Agent Datadog -> Configure, ou
* Exécutez  `& "%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" launch-gui` pour les versions >= 6.12 de l'Agent ou `& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" launch-gui` pour les versions <= 6.11 de l'Agent dans une invite Powershell en tant qu'administrateur

Ouvrez ensuite la page d'état en accédant à *Status* -> *General*.
Obtenez davantage d'informations sur les checks en cours d'exécution dans *Status* -> *Collector* et *Checks* -> *Summary*.

La commande status est disponible pour Powershell :
```powershell
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" status
```

ou cmd.exe :
```cmd
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé `ddagent.exe` doit également être présent dans le gestionnaire des tâches.

Des informations sur l'état de l'Agent pour l'Agent version 5.2+ sont disponibles dans
*Datadog Agent Manager -> Settings -> Agent Status* :

{{< img src="agent/faq/windows_status.png" alt="État Windows" responsive="true" style="width:50%;" >}}

Pour connaître le status de l'Agent version 3.9.1 à 5.1, accédez à `http://localhost:17125/status`.

La commande info est disponible pour Powershell :

```
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" info
```

ou cmd.exe :

```
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" info
```

**Remarque** : pour les versions <= 6.11 de l'Agent, le chemin spécifié doit être `%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe`.


{{% /tab %}}
{{< /tabs >}}

### Emplacement des logs

{{< tabs >}}
{{% tab "Agent v6" %}}

Les logs de l'Agent se situent dans `C:\ProgramData\Datadog\logs\agent.log`.

**Remarque** : `ProgramData` est un dossier caché.

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help
{{% /tab %}}
{{% tab "Agent v5" %}}

Sous Windows Server 2008, Vista et les systèmes plus récents, les logs de l'Agent se situent dans `C:\ProgramData\Datadog\logs`.

**Remarque** : `ProgramData` est un dossier caché.

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help
{{% /tab %}}
{{< /tabs >}}

### Envoyer un flare
{{< tabs >}}
{{% tab "Agent v6" %}}

* Accédez à [http://127.0.0.1:5002][1] pour afficher Datadog Agent Manager.

* Sélectionnez l'onglet Flare.

* Saisissez votre numéro de ticket (si vous en avez un).

* Saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog. 

* Cliquez sur Submit.

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Flare Windows avec l'Agent v6" responsive="true" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

Pour envoyer une copie de vos configurations et logs Windows à l'assistance Datadog, suivez ces étapes :

* Ouvrez Datadog Agent Manager.

* Sélectionnez Actions.

* Sélectionnez Flare.

* Saisissez votre numéro de ticket (si vous n'en avez aucun, laissez la valeur 0).

* Saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog. 

{{< img src="agent/faq/windows_flare.jpg" alt="Flare Windows" responsive="true" style="width:70%;">}}

La commande flare est disponible pour Powershell :

```
& "%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" flare <ID_TICKET>
```
ou cmd.exe :
```
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" flare <ID_TICKET>
```

#### Échec de l'envoi du flare

Sous Linux et macOS, la sortie de la commande flare vous indique où l'archive flare compressée est enregistrée. Si l'envoi du fichier à Datadog échoue, vous pouvez le récupérer dans ce dossier et l'ajouter manuellement comme pièce jointe à un e-mail.

Sous Windows, vous pouvez trouver l'emplacement de ce fichier en exécutant la commande suivante dans l'invite de commande Python de l'Agent :

**Étape 1** :

* Agent version 5.12+ :
    `"%PROGRAMFILES%\Datadog\Datadog Agent\dist\shell.exe" since`

* Versions antérieures de l'Agent :
    `"%PROGRAMFILES%\Datadog\Datadog Agent\files\shell.exe"`

**Étape 2** :

```
import tempfile
print tempfile.gettempdir()
```

Exemple :

{{< img src="agent/faq/flare_fail.png" alt="Échec de l'envoi du flare" responsive="true" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## Cas d'utilisation
###  Surveiller un service Windows

Sur votre host cible, lancez Datadog Agent Manager et sélectionnez l'intégration « Windows Service » dans la liste. Un exemple est déjà inclus pour cette intégration ; toutefois, cet exemple utilise DHCP.

Pour obtenir le nom du service, ouvrez `services.msc` et repérez votre service cible. En utilisant DHCP comme cible, vous pouvez voir le nom du service en haut de la fenêtre des propriétés du service :

{{< img src="agent/faq/DHCP.png" alt="DHCP" responsive="true" style="width:75%;">}}

Lorsque vous ajoutez vos propres services, assurez-vous de suivre précisément le formatage affiché. L'intégration échouera si le formatage est incorrect.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Service DHCP Windows" responsive="true" style="width:75%;">}}

De plus, lorsque vous modifiez une intégration, le service Datadog doit être redémarré. Vous pouvez le faire depuis services.msc ou depuis la barre latérale de l'interface.

Datadog ne surveille pas les métriques des services : il vérifie uniquement leur disponibilité. (Pour surveiller les métriques, utilisez l'intégration [Processus][9] ou [WMI][10]). Pour configurer un monitor, sélectionnez le [type de monitor d'intégration][11] puis recherchez **Windows Service**. Dans *Integration Status -> Pick Monitor Scope*, choisissez le service que vous souhaitez surveiller.

### Surveiller la charge système sous Windows

L'Agent Datadog recueille un grand nombre de métriques système par défaut. Une des métriques système les plus couramment utilisées est `system.load.*`.

| Métrique                      | Description                                                                    |
|-----------------------------|--------------------------------------------------------------------------------|
| system.load.1 (gauge)       | La charge système moyenne sur une minute.                                       |
| system.load.15 (gauge)      | La charge système moyenne sur quinze minutes.                                  |
| system.load.5 (gauge)       | La charge système moyenne sur cinq minutes.                                     |
| system.load.norm.1 (gauge)  | La charge système moyenne sur une minute, normalisée en fonction du nombre de processeurs.      |
| system.load.norm.15 (gauge) | La charge système moyenne sur quinze minutes, normalisée en fonction du nombre de processeurs. |
| system.load.norm.5 (gauge)  | La charge système moyenne sur cinq minutes, normalisée en fonction du nombre de processeurs.    |

La métrique `system.load.*` est spécifique à **Unix** : elle représente le nombre moyen de ressources qui attendent d'utiliser ou qui utilisent actuellement le processeur. Chaque processus en attente ou utilisant actuellement le processeur augmente le nombre de charge d'une unité. Le nombre à la fin du nom de la métrique indique le nombre moyen de processus exécutés sur les X dernières minutes. Par exemple, `system.load.5` correspond à la moyenne mesurée sur les 5 dernières minutes. Une valeur de 0 indique que le processeur n'est pas du tout utilisé, tandis qu'un nombre égal au nombre de cœurs du processeur dans l'environnement indique que le processeur traite toutes les requêtes entrantes sans délai. Un nombre supérieur au nombre de cœurs indique que des processus sont en attente.

#### Où se trouve la charge système sous Windows ?

Bien que Windows n'offre pas exactement cette métrique, une option équivalente est disponible par défaut dans les métriques système : `system.proc.queue.length`. La métrique `system.proc.queue.length` vous permet d'afficher le nombre de threads présents dans la file d'attente du processeur (en attente d'exécution).

### Surveiller des processus Windows

Vous pouvez surveiller des processus Windows avec la fonctionnalité [Live Process Monitoring][12]. Pour l'activer dans Windows, modifiez le [fichier de configuration principal de l'Agent][13] en définissant le paramètre suivant sur true :

`datadog.yaml`:
```yaml
process_config:
  enabled: "true"
```

Une fois la configuration effectuée, [redémarrez l'Agent][14].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: /fr/agent/basic_agent_usage/#supported-os-versions
[3]: /fr/agent/faq/windows-agent-ddagent-user
[4]: /fr/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-6.14.3.msi
[6]: https://app.datadoghq.com/account/settings#api
[7]: /fr/agent/proxy
[8]: /fr/agent/guide/datadog-agent-manager-windows
[9]: /fr/#monitoring-windows-processes
[10]: /fr/integrations/wmi
[11]: https://app.datadoghq.com/monitors#create/integration
[12]: /fr/graphing/infrastructure/process/?tab=linuxwindows#installation
[13]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[14]: /fr/agent/guide/agent-commands/#restart-the-agent
