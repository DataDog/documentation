---
description: Utilisez l'interface graphique du Datadog Agent Manager basée sur le
  navigateur pour configurer et gérer l'Agent Windows avec les navigateurs et l'authentification
  pris en charge.
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentation
  text: Utilisation de base de l'Agent pour l'Agent Windows
title: Datadog Agent Manager pour Windows
---
## Présentation {#overview}

L'interface graphique du Datadog Agent Manager est basée sur le navigateur. Le port sur lequel l'interface graphique s'exécute peut être configuré dans votre fichier `datadog.yaml`. Définir le port sur `-1` désactive l'interface graphique. Par défaut, elle est activée sur le port 5002 pour Windows et Mac et est désactivée sur Linux.

### Prérequis {#requirements}

1. Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un jeton dans votre navigateur qui est utilisé pour authentifier toutes les communications avec le serveur de l'interface graphique.

2. L'interface graphique n'est lancée que si l'utilisateur qui la lance dispose des autorisations utilisateur appropriées. Si vous êtes en mesure d'ouvrir `datadog.yaml`, vous êtes en mesure d'utiliser l'interface graphique.

3. Pour des raisons de sécurité, l'interface graphique ne peut être accessible qu'à partir de l'interface réseau locale (localhost/127.0.0.1), vous devez donc être sur le même host que celui sur lequel l'Agent s'exécute pour l'utiliser. En d'autres termes, vous ne pouvez pas exécuter l'Agent sur une VM ou un conteneur et y accéder depuis la machine du host.

#### Navigateurs pris en charge {#supported-browsers}

| Navigateur       | Version prise en charge (ou ultérieure) | Commentaire                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Edge pré-Chromium |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Mobile Safari          |

### Démarrez le Datadog Agent Manager {#start-the-datadog-agent-manager}

Une fois l'Agent [installé][1] sur votre host Windows, lancez Datadog Agent Manager pour gérer graphiquement l'Agent.

À partir du menu Démarrer de Windows :

* Cliquez sur le dossier {{< ui >}}Datadog{{< /ui >}}.
* Faites un clic droit sur {{< ui >}}Datadog Agent Manager{{< /ui >}}.
* Choisissez {{< ui >}}Run as Administrator{{< /ui >}}.

Depuis une invite PowerShell avec élévation de privilèges :

```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

Le Datadog Agent Manager se lance dans votre navigateur web par défaut. L'adresse web est `http://127.0.0.1:5002`.

## Options {#options}

Les sections suivantes décrivent les options de la barre de navigation de gauche.

### État {#status}

#### Général {#general}

La page d'état général s'affiche par défaut lors du lancement du Datadog Agent Manager. Elle contient les sections suivantes :

| Section     | Description                                                                     |
|-------------|---------------------------------------------------------------------------------|
| {{< ui >}}Agent Info{{< /ui >}}  | Fournit des informations sur l'Agent, notamment la version, le niveau de log et les chemins d'accès aux fichiers. |
| {{< ui >}}System Info{{< /ui >}} | Inclut des informations sur l'heure système, le décalage NTP, ainsi que les versions de Go et de Python.       |
| {{< ui >}}Host Info{{< /ui >}}   | Fournit des informations sur le host, notamment le système d'exploitation, la plateforme, les processus et la durée de fonctionnement.     |
| {{< ui >}}Hostnames{{< /ui >}}   | Affiche les noms de host et les tags de host détectés par l'Agent.                        |
| {{< ui >}}JMX Status{{< /ui >}}  | Une liste des checks JMX avec leur état.                                         |
| {{< ui >}}Forwarder{{< /ui >}}   | Informations sur le forwarder de l'Agent, y compris l'état de votre clé d'API.      |
| {{< ui >}}Endpoints{{< /ui >}}   | Endpoints utilisés par l'Agent.                                                  |
| {{< ui >}}Logs Agent{{< /ui >}}  | Informations sur l'Agent de logs (si activé).                                     |
| {{< ui >}}Aggregator{{< /ui >}}  | Informations sur l'agrégateur de données de l'Agent.                                     |
| {{< ui >}}DogStatsD{{< /ui >}}   | Statistiques sur les données envoyées avec DogStatsD.                                         |

#### Collecteur {#collector}

La page de statut Collector affiche des détails sur les checks de l'Agent en cours d'exécution, par exemple :

```text
cpu
   Instance ID: cpu [OK]
   Total Runs: 1,561
   Metric Samples: 7, Total: 10,921
   Events: 0, Total: 0
   Service Checks: 0, Total: 0
   Average Execution Time: 4ms
```

### Log {#log}

La page des logs affiche les logs de l'Agent envoyés vers `agent.log`. Les logs peuvent être triés du plus récent au plus ancien ou inversement.

```text
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check cpu
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check disk
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check file_handle
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check io
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check memory
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check network
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check ntp
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:302 in work) | Done running check uptime
2019-07-10 17:46:04 EDT | INFO | (runner.go:246 in work) | Running check winproc
2019-07-10 17:46:05 EDT | INFO | (runner.go:302 in work) | Done running check winproc
2019-07-10 17:48:02 EDT | INFO | (transaction.go:114 in Process) | Successfully posted payload to "https://6-2-1-app.agent.datadoghq.com/api/v1/check_run?api_key=*************************12345"
```

### Paramètres {#settings}

La page des paramètres affiche le contenu du fichier de configuration principal de l'Agent `datadog.yaml`. Vous pouvez modifier ce fichier directement depuis le Datadog Agent Manager. Après avoir effectué une modification, cliquez sur {{< ui >}}Save{{< /ui >}} dans le coin supérieur droit, puis [redémarrez l'Agent](#restart-agent).

Pour obtenir une liste complète des options disponibles, consultez le [fichier `datadog.yaml` exemple pour Windows][6].

### Checks {#checks}

#### Gérer les checks {#manage-checks}

La page de gestion des checks affiche le contenu des fichiers de configuration des checks activés. Vous pouvez modifier ces fichiers directement depuis le Datadog Agent Manager. Après avoir effectué une modification, cliquez sur {{< ui >}}Save{{< /ui >}} dans le coin supérieur droit, puis [redémarrez l'Agent](#restart-agent).

Pour ajouter un check, sélectionnez {{< ui >}}Add a Check{{< /ui >}} dans le menu déroulant. Cela affiche une liste des checks disponibles à installer. Consultez la page d'[intégration][3] du check spécifique pour obtenir des détails sur la configuration.

#### Résumé des checks {#checks-summary}

Le sommaire des checks contient la liste des checks en cours d'exécution, le nombre d'instances pour chaque check, ainsi que le statut du check.

### Flare {#flare}

Si vous rencontrez des problèmes avec l'Agent, la page flare vous aide à effectuer le dépannage avec l'équipe du [support Datadog][4]. Saisissez votre numéro de ticket (facultatif) et votre adresse e-mail, puis cliquez sur {{< ui >}}Submit{{< /ui >}}. Ceci transmet une copie des logs et des fichiers de configuration de votre Agent au support Datadog. Plus d'informations sur les flares sont disponibles dans la documentation [Agent Flare][5].

### Redémarrer l'Agent {#restart-agent}

Cliquer sur {{< ui >}}Restart Agent{{< /ui >}} dans la barre de navigation de gauche redémarre l'Agent immédiatement. Il n'y a ni page ni invite de confirmation. Après le redémarrage de l'Agent, vous êtes redirigé vers la page [d'état général](#general)

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage/windows/#installation
[3]: /fr/integrations/
[4]: /fr/help/
[5]: /fr/agent/troubleshooting/send_a_flare/
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_windows.yaml.example