---
"assets":
  "configuration": {}
  "dashboards":
    "N2WSBackup&Recovery-EntitiesSpecificDashboard": assets/dashboards/N2WSBackup&Recovery-EntitiesSpecificDashboard.json
    "N2WSBackup&Recovery-GraphicalVersion": assets/dashboards/N2WSBackup&Recovery-Graphicalversion.json
    "N2WSBackup&Recovery-GraphicalVersion-Areas": assets/dashboards/N2WSBackup&Recovery-Graphicalversion-areas.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- ""
"creates_events": false
"ddtype": "check"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md"
"display_name": "N2WS Backup & Recovery"
"draft": true
"git_integration_title": "n2ws"
"guid": "315aa71c-cc41-4f8c-b0f3-37882c1fa766"
"integration_id": "n2ws"
"integration_title": "N2WS"
"is_public": false
"kind": "integration"
"maintainer": "eliad.eini@n2ws.com"
"manifest_version": "1.0.0"
"metric_prefix": "cpm_metric."
"metric_to_check": "cpm_metric.dashboard_activity.backup_success_num"
"name": "n2ws"
"public_title": "N2WS"
"short_description": "Consulter les données récapitulatives de tous les hosts connectés de N2WS Backup & Recovery"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation

Connu sous le nom de N2WS, N2WS Backup & Recovery (CPM) est une solution professionnelle de sauvegarde, de récupération et de reprise d'activité après sinistre pour AWS.
N2WS tire parti de technologies basées sur le cloud, telles que les snapshots EBS, afin de proposer des fonctionnalités de sauvegarde et de récupération dans AWS.

Votre instance N2WS Backup and Recovery prend en charge la surveillance des sauvegardes, des reprises d'activité après sinistre, des copies vers S3, des alertes 
et d'autres éléments par le service dédié de Datadog. 
Cette intégration permet aux utilisateurs de surveiller et d'analyser les métriques du dashboard N2WS Backup and Recovery.

## Configuration

### Installation

1.  Installez l'[intégration Python][1].


2.  Activer la prise en charge de Datadog sur votre instance N2WS
Connectez-vous à votre instance N2WS Backup and Recovery avec le protocole SSH et ajoutez les lignes suivantes à `/cpmdata/conf/cpmserver.cfg`. Vous devrez peut-être posséder les privilèges `sudo` pour effectuer cette action.
`[external_monitoring]
enabled=True`

Exécutez `service apache2 restart`.


3.  Installer l'Agent Datadog sur votre instance N2WS
Connectez-vous à Datadog et accédez à Integrations-> Agent -> Ubuntu.
Copiez la commande ‘easy one-step install’ de l'Agent.
Connectez-vous à votre instance N2WS Backup and Recovery avec le protocole SSH. Vous devrez peut-être posséder les privilèges `sudo` pour effectuer cette action.


4.  Configurer les métriques du dashboard Datadog
Accédez à [‘Metrics-> Explorer’][2].

**Graph** : sélectionnez votre métrique dans la liste. Toutes les métriques N2WS commencent par la chaîne ‘cpm_metric’.

**Over** : sélectionnez les données dans la liste. Toutes les données des utilisateurs N2WS commencent par la chaîne ‘cpm:user:<nom-utilisateur>’.
Vous pouvez sélectionner un utilisateur spécifique ou toute l'instance N2WS.


5.  Accéder aux dashboards N2WS 
Dans les [intégrations Datadog][3], recherchez le carré 'N2WS' et installez-le.
    Votre compte comporte alors trois types de dashboards :
    'N2WSBackup&Recovery-Graphicalversion', 'N2WSBackup&Recovery-Graphicalversion-areas' et 'N2WSBackup&Recovery-Squaresdashboard'.

Les utilisateurs peuvent également [importer des modèles JSON depuis N2WS][4].


## Données collectées

Datadog recueille différentes données relatives aux sauvegardes de N2WS Backup & Recovery : le nombre de snapshots de chaque type, les sauvegardes réussies, les échecs de sauvegarde, les sauvegardes partiellement réussies, les ressources protégées de tout type, les données relatives à la capacité du volume, les alertes, etc.


### Métriques
{{< get-metrics-from-git "n2ws" >}}



### Événements

Datadog recueille les messages d'alerte de tous les hosts de N2WS Backup & Recovery.


### Checks de service

N2WS Backup & Recovery ne propose aucun check de service.


## Dépannage

[Documentation et guide de l'utilisateur de N2WS][6]
[Assistance N2WS][7] 



[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://app.datadoghq.com/account/settings#integrations
[4]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[5]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[6]: https://n2ws.com/support/documentation
[7]: https://n2ws.com/support

