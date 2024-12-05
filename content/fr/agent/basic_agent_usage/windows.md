---
title: Utilisation de base de l'Agent pour Windows
description: Fonctionnalités de base de l'Agent Datadog sur la plateforme Windows.
platform: Windows
aliases:
  - /fr/guides/basic_agent_usage/windows/
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
---
## Implémentation

Si vous n'avez pas encore installé l'Agent Datadog, consultez les informations ci-dessous ou les [instructions d'installation intégrées à l'application][1]. Consultez la documentation de l'Agent pour connaître les [versions des systèmes d'exploitation pris en charge][2].

Pour l'installation et la configuration avec le site européen de Datadog, utilisez le paramètre `SITE=`. Consultez le tableau de variables de configuration ci-dessous.

### Installation

Depuis la **version 6.11.0 de l'Agent Windows**, les composants de base ainsi que ceux de l'APM et du système de tracing s'exécutent sous le compte `ddagentuser` créé au moment de l'installation à la place du compte `LOCAL_SYSTEM`. Lorsqu'il est activé, le composant Live Process s'exécute sous le compte `LOCAL_SYSTEM`. En savoir plus sur l'[utilisateur de l'Agent Windows Datadog][3].

Si vous installez l'Agent Datadog dans un environnement de domaine, consultez les [exigences d'installation de l'Agent][4].

**Remarque** : des précautions particulières doivent être prises pour les [contrôleurs de domaine][4].

{{< tabs >}}
{{% tab "Interface graphique" %}}

1. Téléchargez le [fichier d'installation de l'Agent Datadog][1].
2. Exécutez le programme d'installation (en tant qu'**administrateur**) en ouvrant `datadog-agent-7-latest.amd64.msi`.
3. Suivez les instructions à l'écran, acceptez l'accord de licence et entrez votre [clé d'API Datadog][2].
4. Une fois l'installation terminée, le programme vous propose de lancer Datadog Agent Manager.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Ligne de commande" %}}

Pour installer l'Agent depuis la ligne de commande :

1. Téléchargez le [fichier d'installation de l'Agent Datadog][1].
2. Exécutez l'une des commandes suivantes dans le répertoire où est stocké le fichier d'installation.

**Invite de commandes**

```shell
start /wait msiexec /qn /i datadog-agent-7-latest.amd64.msi APIKEY="<VOTRE_CLÉ_API_DATADOG>"
```

**Powershell**

```powershell
Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-agent-7-latest.amd64.msi APIKEY="<VOTRE_CLÉ_API_DATADOG>"'
```

**Remarques**

- L'option `/qn` lance une installation silencieuse. Pour afficher les instructions de l'interface graphique, supprimez cette option.
- Certaines versions de l'Agent peuvent entraîner un redémarrage forcé. Pour empêcher cela, ajoutez le paramètre : `REBOOT=ReallySuppress`.

### Configuration

Chaque élément de configuration est ajouté en tant que propriété dans la ligne de commande. Les options de configuration en ligne de commande suivantes sont disponibles à l'installation de l'Agent sur Windows :

| Variable                                    | Type    | Description                                                                                                                                                                                                                         |
|----------------------------                 |---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `APIKEY`                                    | Chaîne  | Ajoute la clé d'API Datadog au fichier de configuration.                                                                                                                                                                                 |
| `SITE`                                      | Chaîne  | Définit le site d'admission Datadog, par exemple `SITE=`{{< region-param key="dd_site" code="true" >}}.                                                                                                                                     |
| `TAGS`                                      | Chaîne  | Liste de tags séparés par des virgules à attribuer dans le fichier de configuration. Exemple : `TAGS="key_1:val_1,key_2:val_2"`.                                                                                                                         |
| `HOSTNAME`                                  | Chaîne  | Configure le hostname transmis par l'Agent à Datadog (remplace le hostname calculé lors de l'exécution).                                                                                                                            |
| `LOGS_ENABLED`                              | Chaîne  | Active (`"true"`) ou désactive (`"false"`) la fonction de collecte de logs dans le fichier de configuration. Les logs sont désactivés par défaut.                                                                                                        |
| `APM_ENABLED`                               | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent APM dans le fichier de configuration. L'APM est désactivé par défaut.                                                                                                                        |
| `PROCESS_ENABLED`                           | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'Agent de processus dans le fichier de configuration. L'Agent de processus est désactivé par défaut.                                                                                                     |
| `HOSTNAME_FQDN_ENABLED`                     | Chaîne  | Active (`"true"`) ou désactive (`"false"`) l'utilisation de FQDN pour le hostname de l'Agent. Cela revient à définir `hostname_fqdn` dans le fichier de configuration de l'Agent. L'utilisation de FQDN pour le hostname est désactivée par défaut. _(v6.20.0+)_ |
| `CMD_PORT`                                  | Nombre  | Un numéro de port valide compris entre 0 et 65534. L'Agent Datadog expose une API de commande sur le port 5001. Si ce port est déjà utilisé par un autre programme, la valeur par défaut peut être remplacée ici.                                               |
| `PROXY_HOST`                                | Chaîne  | En cas d'utilisation d'un proxy, définit le host de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][2].                                                                                                                                 |
| `PROXY_PORT`                                | Nombre  | En cas d'utilisation d'un proxy, définit le port de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][2].                                                                                                                                 |
| `PROXY_USER`                                | Chaîne  | En cas d'utilisation d'un proxy, définit l'utilisateur de votre proxy. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][2].                                                                                                                                 |
| `PROXY_PASSWORD`                            | Chaîne  | En cas d'utilisation d'un proxy, définit le mot de passe de votre proxy. Pour l'Agent de processus/conteneur, cette variable est requise pour la transmission d'un mot de passe d'authentification. Elle ne peut pas être renommée. [En savoir plus sur l'utilisation d'un proxy avec l'Agent Datadog][2]. |
| `DDAGENTUSER_NAME`                          | Chaîne  | Remplace le nom d'utilisateur `ddagentuser` par défaut lors de l'installation de l'Agent _(version 6.11.0+)_. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].                                                                                      |
| `DDAGENTUSER_PASSWORD`                      | Chaîne  | Remplace le mot de passe chiffré généré pour l'utilisateur `ddagentuser` lors de l'installation de l'Agent _(version 6.11.0+)_. Doit être spécifié pour les installations sur les serveurs DNS. [En savoir plus sur l'utilisateur de l'Agent Windows Datadog][3].  |
| `APPLICATIONDATADIRECTORY`                  | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du fichier de configuration. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `C:\ProgramData\Datadog`. _(version 6.11.0+)_                                           |
| `PROJECTLOCATION`                           | Chemin    | Remplace le répertoire à utiliser pour l'arborescence du binaire. Peut uniquement être spécifié à l'installation initiale, pas lors des mises à jour. Valeur par défaut : `%PROGRAMFILES%\Datadog\Datadog Agent`. _(v6.11.0+)_                                    |
| `ADDLOCAL`                                  | Chaîne  | Active le composant d'Agent supplémentaire. La valeur `"MainApplication,NPM"` entraîne l'installation du composant de pilote pour la solution [Network Performance Monitoring][4].                                                                          |
| `EC2_USE_WINDOWS_PREFIX_DETECTION`          | Booléen | Utilise l'ID de l'instance EC2 pour les hosts Windows sur EC2 _(v7.28.0+)_.                                                                                                                                                                      |

**Remarque** : si un fichier `datadog.yaml` valide est trouvé et qu'une clé d'API y est configurée, ce fichier est prioritaire sur toutes les options de ligne de commande spécifiées.

[1]: https://s3.amazonaws.com/ddagent-windows-stable/datadog-agent-7-latest.amd64.msi
[2]: /fr/agent/proxy/
[3]: /fr/agent/faq/windows-agent-ddagent-user/
[4]: /fr/network_monitoring/performance
{{% /tab %}}
{{% tab "Mise à niveau" %}}

L'Agent 7 prend uniquement en charge Python 3. Avant d'effectuer une mise à niveau, vérifiez que vos checks custom sont compatibles avec Python 3. Consultez le guide [Migration de checks custom vers Python 3][1] pour en savoir plus. Si vous n'utilisez pas de checks custom ou avez déjà vérifié leur compatibilité, effectuez la mise à niveau à l'aide des instructions prévues pour l'[interface graphique](?tab=Interface graphique) ou la [ligne de commande](?tab=Ligne de commande).

Si vous utilisez une version < 5.12.0 de l'Agent Datadog, procédez d'abord à la mise à niveau vers une version plus récente de l'Agent 5 (>= 5.12.0, mais < 6.0.0) à l'aide du [fichier d'installation EXE][2], puis effectuez la mise à niveau vers une version >= 6 de l'Agent Datadog.

[1]: /fr/agent/guide/python-3/
[2]: https://s3.amazonaws.com/ddagent-windows-stable/ddagent-cli-latest.exe
{{% /tab %}}
{{< /tabs >}}

### Fichiers de log d'installation

Vous pouvez trouver les fichiers de log d'installation de l'Agent à l'emplacement `%TEMP%\MSI*.LOG`.

### Validation

Pour vérifier votre installation, suivez les instructions dans la section [Statut et informations de l'Agent](#statut-et-informations-de-l-agent).

## Commandes de l'Agent

L'exécution de l'Agent est contrôlée par le gestionnaire de contrôle des services Windows.

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* Le nom du fichier exécutable principal est `agent.exe`. Son emplacement varie en fonction de la version de l 'Agent :
    - Versions de l'Agent <= 6.11 : `"C:\Program Files\Datadog\Datadog Agent\embedded\agent.exe"`
    - Versions de l'Agent >= 6.12 : `"C:\Program Files\Datadog\Datadog Agent\bin\agent.exe"`
* L'interface de configuration est une application basée sur un navigateur (pour Windows 64 bits uniquement).
* Les commandes peuvent être exécutées depuis une ligne de commande avec **élévation des privilèges (exécutée en tant qu'administrateur)** (Powershell ou Invite de commandes) à l'aide de la syntaxe `<CHEMIN_VERS_AGENT.EXE> <COMMANDE>`.
* Vous trouverez ci-dessous la liste des options disponibles depuis la ligne de commande :

| Commande         | Description                                                                      |
|-----------------|----------------------------------------------------------------------------------|
| check           | Exécute le check spécifié.                                                        |
| diagnose        | Exécute un diagnostic de connectivité sur votre système.                             |
| flare           | Recueille et envoie un flare à Datadog.                                         |
| help            | Affiche des informations d'aide pour n'importe quelle commande.                                                     |
| hostname        | Affiche le hostname utilisé par l'Agent.                                           |
| import          | Importe et convertit les fichiers de configuration des versions précédentes de l'Agent.    |
| installservice  | Installe l'Agent dans le gestionnaire de contrôle des services.                           |
| launch-gui      | Démarre Datadog Agent Manager.                                                |
| regimport       | Importe les paramètres de registre dans `datadog.yaml`.                                |
| remove-service  | Supprime l'Agent du gestionnaire de contrôle des services.                              |
| restart-service | Redémarre l'Agent dans le gestionnaire de contrôle des services.                           |
| run             | Démarre l'Agent.                                                                |
| start           | Démarre l'Agent. (Obsolète, mais accepté. Utilisez plutôt `run`.) |
| start-service   | Démarre l'Agent dans le gestionnaire de contrôle des services.                             |
| status          | Affiche le statut actuel.                                                        |
| stopservice     | Arrête l'Agent dans le gestionnaire de contrôle des services.                              |
| version         | Affiche les informations sur la version.                                                         |

* Exemples :
  - PowerShell (`powershell.exe`)

    ```powershell
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    & "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

  - Invite de commandes (`cmd.exe`)

    ```cmd
    "%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" status
    "%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" launch-gui
    "%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" flare
    ```

{{% /tab %}}
{{% tab "Agent v5" %}}

Utilisez Datadog Agent Manager (disponible depuis le menu Démarrer).

{{< img src="agent/basic_agent_usage/windows/windows-start-menu.png" alt="Menu Démarrer Windows" style="width:75%;">}}

Utilisez les commandes `start`, `stop` et `restart` dans Datadog Agent Manager :

{{< img src="agent/basic_agent_usage/windows/manager-snapshot.png" alt="Snapshot de Datadog Agent Manager" style="width:75%;">}}

Vous pouvez également utiliser le Powershell Windows, si celui-ci est disponible :
`[start|stop|restart]-service datadogagent`

{{% /tab %}}
{{< /tabs >}}

## Configuration

Utilisez [Datadog Agent Manager][5] pour activer, désactiver et configurer des checks. Redémarrez l'Agent pour appliquer vos modifications.

{{< tabs >}}
{{% tab "Agent v6 et v7" %}}
Le fichier de configuration principal de l'Agent se situe à l'emplacement suivant :
`C:\ProgramData\Datadog\datadog.yaml`
{{% /tab %}}
{{% tab "Agent v5" %}}

Le fichier principal de l'Agent se situe à l'emplacement suivant :
`C:\ProgramData\Datadog\datadog.conf`
{{% /tab %}}
{{< /tabs >}}

Les fichiers de configuration pour les intégrations se situent à l'emplacement suivant :
`C:\ProgramData\Datadog\conf.d\` OU
`C:\Documents and Settings\All Users\Application Data\Datadog\conf.d\`

**Remarque** : `ProgramData` est un dossier caché.

## Dépannage

### Statut et informations sur l'Agent

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service `DatadogAgent` indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé *Datadog Metrics Agent* (`agent.exe`) doit également être présent dans le gestionnaire des tâches.

Pour obtenir davantage d'informations sur l'état de l'agent, démarrez Datadog Agent Manager :

* Dans la barre d'état système, faites un clic droit sur l'icône de l'Agent Datadog -> Configure, ou
* Exécutez la commande `launch-gui` depuis une ligne de commande avec **élévation des droits (exécutée en tant qu'administrateur)** :
    - PowerShell : `& "<CHEMIN_VERS_AGENT.EXE>" launch-gui`
    - cmd : `"<CHEMIN_VERS_AGENT.EXE>" launch-gui`

Ouvrez ensuite la page d'état en accédant à *Status* -> *General*.
Obtenez davantage d'informations sur les checks en cours d'exécution dans *Status* -> *Collector* et *Checks* -> *Summary*.

La commande status est disponible pour Powershell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" status
```

ou cmd.exe :

```cmd
"%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" status
```

{{% /tab %}}
{{% tab "Agent v5" %}}

Pour vous assurer que l'Agent est bien lancé, vérifiez si l'état du service indique *En cours d'exécution* dans la liste des services Windows. Un processus appelé `ddagent.exe` doit également être présent dans le gestionnaire des tâches.

Pour obtenir plus d'informations sur l'état de l'Agent pour les versions 5.2+, accédez à *Datadog Agent Manager -> Settings -> Agent Status* :

{{< img src="agent/faq/windows_status.png" alt="Statut Windows" style="width:50%;" >}}

Pour connaître le statut des versions 3.9.1 à 5.1 de l'Agent, accédez à `http://localhost:17125/status`.

La commande info est disponible pour Powershell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" "$env:ProgramFiles\Datadog\Datadog Agent\agent\agent.py" info
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
{{% tab "Agents v6 et v7" %}}

Les logs de l'Agent se situent dans `C:\ProgramData\Datadog\logs\agent.log`.

**Remarque** : `ProgramData` est un dossier caché.

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help/
{{% /tab %}}
{{% tab "Agent v5" %}}

Sous Windows Server 2008, Vista et les systèmes plus récents, les logs de l'Agent se situent dans `C:\ProgramData\Datadog\logs`.

**Remarque** : `ProgramData` est un dossier caché.

Besoin d'aide ? Contactez [l'assistance Datadog][1].

[1]: /fr/help/
{{% /tab %}}
{{< /tabs >}}

### Envoyer un flare

{{< tabs >}}
{{% tab "Agents v6 et v7" %}}

* Accédez à [http://127.0.0.1:5002][1] pour afficher Datadog Agent Manager.

* Sélectionnez l'onglet Flare.

* Saisissez votre numéro de ticket (si vous en avez un).

* Saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog.

* Cliquez sur Submit.

La commande flare est disponible pour Powershell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" flare <ID_TICKET>
```

ou cmd.exe :

```cmd
"%PROGRAMFILES%\Datadog\Datadog Agent\bin\agent.exe" flare <ID_TICKET>
```

{{< img src="agent/basic_agent_usage/windows/windows_flare_agent_6.png" alt="Flare Windows avec l'Agent v6" style="width:75%;">}}

[1]: http://127.0.0.1:5002
{{% /tab %}}
{{% tab "Agent v5" %}}

Pour envoyer une copie de vos configurations et logs Windows à l'assistance Datadog, suivez les étapes suivantes :

* Ouvrez Datadog Agent Manager.

* Sélectionnez Actions.

* Sélectionnez Flare.

* Saisissez votre numéro de ticket (si vous n'en avez aucun, laissez la valeur 0).

* Saisissez l'adresse e-mail que vous utilisez pour vous connecter à Datadog.

{{< img src="agent/faq/windows_flare.jpg" alt="Flare Windows" style="width:70%;">}}

La commande flare est disponible pour Powershell :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\embedded\python.exe" "$env:Programfiles\Datadog\Datadog Agent\agent\agent.py" flare <ID_TICKET>
```

ou cmd.exe :

```
"%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe" "%PROGRAMFILES%\Datadog\Datadog Agent\agent\agent.py" flare <ID_TICKET>
```

#### Échec de l'envoi du flare

La sortie de la commande flare vous indique où l'archive flare compressée est enregistrée. Si l'envoi du fichier à Datadog échoue, vous pouvez le récupérer dans ce dossier et l'ajouter manuellement comme pièce jointe à un e-mail. Les fichiers flare sont généralement stockés aux emplacements suivants :
- Linux : `\tmp\`
- macOS : `$TMPDIR`
- Windows: `C:\Users\<UTILISATEUR_AGENT_DD>\AppData\Local\Temp\`

Pour les versions antérieures de l'Agent sous Windows, vous pouvez trouver l'emplacement de ce fichier en exécutant la commande suivante dans l'invite de commandes Python de l'Agent :

**Étape 1** :

* Version 5.12+ de l'Agent :
    `"%PROGRAMFILES%\Datadog\Datadog Agent\dist\shell.exe" since`

* Versions antérieures de l'Agent :
    `"%PROGRAMFILES%\Datadog\Datadog Agent\files\shell.exe"`

**Étape 2** :

```python
import tempfile
print tempfile.gettempdir()
```

Exemple :

{{< img src="agent/faq/flare_fail.png" alt="Échec de l'envoi du flare" style="width:70%;">}}

{{% /tab %}}
{{< /tabs >}}

## Cas d'utilisation

###  Surveiller un service Windows

Sur votre host cible, lancez Datadog Agent Manager et sélectionnez l'intégration « Windows Service » dans la liste. Un exemple prêt à l'emploi est inclus ; il repose toutefois sur DHCP.

Pour obtenir le nom du service, ouvrez `services.msc` et repérez votre service cible. En utilisant DHCP comme cible, vous pouvez voir le nom du service en haut de la fenêtre des propriétés du service :

{{< img src="agent/faq/DHCP.png" alt="DHCP" style="width:75%;">}}

Lors de l'ajout de vos propres services, veillez à suivre précisément le format indiqué. En cas d'erreur de format, l'intégration ne fonctionnera pas. **Remarque** : les caractères spéciaux doivent être échappés dans le nom des services. Par exemple, pour indiquer le nom `MSSQL$BILLING`, utilisez `MSSQL\$BILLING`.

{{< img src="agent/faq/windows_DHCP_service.png" alt="Service DHCP Windows" style="width:75%;">}}

De plus, lorsque vous modifiez une intégration, le service Datadog doit être redémarré. Vous pouvez le faire depuis services.msc ou depuis la barre latérale de l'interface.

Datadog ne surveille pas les métriques des services : il vérifie uniquement leur disponibilité. Pour surveiller les métriques, utilisez l'intégration [Processus][6] ou [WMI][7]). Pour configurer un monitor, sélectionnez le [type de monitor d'intégration][8] puis recherchez **Windows Service**. Dans *Integration Status -> Pick Monitor Scope*, choisissez le service que vous souhaitez surveiller.

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


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: /fr/agent/basic_agent_usage/#supported-os-versions
[3]: /fr/agent/faq/windows-agent-ddagent-user/
[4]: /fr/agent/faq/windows-agent-ddagent-user/#installation-in-a-domain-environment
[5]: /fr/agent/guide/datadog-agent-manager-windows/
[6]: /fr/#monitoring-windows-processes
[7]: /fr/integrations/wmi/
[8]: https://app.datadoghq.com/monitors#create/integration
[9]: /fr/infrastructure/process/?tab=linuxwindows#installation
[10]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[11]: /fr/agent/guide/agent-commands/#restart-the-agent