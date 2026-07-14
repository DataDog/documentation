---
further_reading:
- link: /agent/basic_agent_usage/windows/
  tag: Documentation
  text: Utilisation de base de l'Agent pour l'Agent Windows
title: Datadog Agent Manager pour Windows
---

## Présentation

L'interface graphique de Datadog Agent Manager repose sur l'utilisation d'un navigateur. Vous pouvez configurer le port sur lequel elle s'exécute dans votre fichier `datadog.yaml`. L'interface graphique est désactivée lorsque le port est défini sur `-1`. Par défaut, elle est activée sur le port 5002, pour Windows et Mac, et désactivée sur Linux.

### Exigences

1. Les cookies doivent être activés dans votre navigateur. L'interface graphique génère et enregistre un token dans votre navigateur, qui est utilisé pour authentifier toutes les communications effectuées avec le serveur de l'interface graphique.

2. L'interface graphique se lance uniquement si l'utilisateur dispose des autorisations nécessaires. Si vous parvenez à ouvrir `datadog.yaml`, vous pouvez utiliser l'interface graphique.

3. Pour des raisons de sécurité, l'interface graphique est uniquement accessible à partir de l'interface réseau locale (localhost/127.0.0.1). Vous devez donc utiliser le même host que celui exécuté par l'Agent. Ainsi, vous ne pouvez pas exécuter l'Agent sur une machine virtuelle ou un conteneur et y accéder à partir de la machine du host.

#### Navigateurs pris en charge

| Browser       | Version prise en charge (ou ultérieure) | Publier des commentaires                 |
|---------------|------------------------------|-------------------------|
| IE            | 11                           |                         |
| Edge          | 12                           |  Edge pré-Chromium |
| Edge-chromium | 79                           |                         |
| Firefox       | 38                           |                         |
| Chrome        | 60                           |                         |
| Safari        | 8                            |                         |
| iOS           | 12                           |  Safari mobile          |

### Démarrer Datadog Agent Manager

Une fois l'Agent [installé][1] sur votre host Windows, lancez Datadog Agent Manager pour gérer graphiquement l'Agent.

À partir du menu Démarrer de Windows :

* Cliquez sur le dossier Datadog.
* Faites un clic droit sur Datadog Agent Manager.
* Choisissez `Exécuter en tant qu'administrateur`.

Depuis une invite PowerShell avec élévation de privilèges :
```powershell
& "$env:ProgramFiles\Datadog\Datadog Agent\bin\agent.exe" launch-gui
```

Datadog Agent Manager se lance dans votre navigateur Web par défaut. L'adresse Web est `http://127.0.0.1:5002`.

## Options

Les sections suivantes décrivent les options de la barre de navigation de gauche.

### Status

#### General

La page de statut General s'affiche par défaut lors du lancement de Datadog Agent Manager. Elle contient les sections suivantes :

| Section     | Description                                                                     |
|-------------|---------------------------------------------------------------------------------|
| Agent Info  | Informations sur l'Agent, notamment sa version, le niveau de log et les chemins de fichiers. |
| System Info | Informations sur l'heure système, le décalage NTP et les versions Go et Python.       |
| Host Info   | Informations sur le host, notamment le système d'exploitation, la plateforme, les processus et la disponibilité.     |
| Hostnames   | Hostnames et tags de host trouvés par l'Agent.                        |
| JMX Status  | Liste des checks JMX et de leur statut.                                         |
| Forwarder   | Informations sur le Forwarder de l'Agent, y compris le statut de votre clé d'API.      |
| Endpoints   | Endpoints utilisés par l'Agent.                                                  |
| Logs Agent  | Informations sur l'Agent de logs (lorsque celui-ci est activé).                                     |
| Aggregator  | Informations sur l'agrégateur de données de l'Agent.                                     |
| DogStatsD   | Statistiques sur les données envoyées via DogStatsD.                                         |

#### Collector

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

### Log

La page Log affiche les logs de l'Agent renvoyés au sein de `agent.log`. Les logs peuvent être triés du plus récent au plus ancien et vice-versa.

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

### Paramètres

La page Settings affiche le contenu du fichier de configuration principal de l'Agent, `datadog.yaml`. Vous pouvez modifier directement ce fichier depuis Datadog Agent Manager. Après l'avoir modifié, cliquez sur **Save** dans le coin supérieur droit, puis [redémarrez l'Agent](#redemarrer-l-agent).

Consultez le [fichier d'exemple config_template.yaml][2] pour découvrir toutes les options de configuration disponibles.

### Checks

#### Manage checks

La page Manage checks affiche le contenu des fichiers de configuration de check activés. Vous pouvez modifier directement ces fichiers depuis Datadog Agent Manager. Après avoir effectué une modification, cliquez sur **Save** dans le coin supérieur droit, puis [redémarrez l'Agent](#redemarrer-l-agent).

Pour ajouter un check, sélectionnez **Add a Check** dans le menu déroulant. La liste de tous les checks pouvant être installés s'affiche alors. Consultez la page d'[intégration][3] du check de votre choix pour obtenir des détails sur sa configuration.

#### Sommaire des checks

Le sommaire des checks contient la liste des checks en cours d'exécution, le nombre d'instances pour chaque check, ainsi que le statut du check.

### Flare

Si vous rencontrez des difficultés avec l'Agent, la page Flare facilite le dépannage avec l'équipe d'[assistance Datadog][4]. Entrez votre numéro de ticket (facultatif) et votre adresse e-mail, puis cliquez sur **Submit**. Une copie des logs et des fichiers de configuration de votre Agent est alors envoyée à l'assistance Datadog. Pour en savoir plus sur la fonctionnalité Flare de l'Agent, consultez la [documentation dédiée][5].

### Redémarrer l'Agent

Cliquez sur **Restart Agent** dans la barre de navigation de gauche pour redémarrer immédiatement l'Agent. Aucune page ni aucun message de confirmation ne s'affiche. Après avoir redémarré l'Agent, la page de [statut General](#general) s'affiche.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/basic_agent_usage/windows/#installation
[2]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[3]: /fr/integrations/
[4]: /fr/help/
[5]: /fr/agent/troubleshooting/send_a_flare/