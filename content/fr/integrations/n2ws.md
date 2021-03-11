---
assets:
  configuration: {}
  dashboards:
    N2WSBackup&Recovery-EntitiesSpecificDashboard: assets/dashboards/N2WSBackup&Recovery-EntitiesSpecificDashboard.json
    N2WSBackup&Recovery-GraphicalVersion: assets/dashboards/N2WSBackup&Recovery-Graphicalversion.json
    N2WSBackup&Recovery-GraphicalVersion-Areas: assets/dashboards/N2WSBackup&Recovery-Graphicalversion-areas.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/n2ws/README.md'
display_name: N2WS Backup & Recovery
doc_link: 'https://docs.datadoghq.com/integrations/n2ws/'
draft: false
git_integration_title: n2ws
guid: 315aa71c-cc41-4f8c-b0f3-37882c1fa766
has_logo: true
integration_id: n2ws
integration_title: N2WS
is_public: true
kind: integration
maintainer: eliad.eini@n2ws.com
manifest_version: 1.0.0
metric_prefix: cpm_metric.
metric_to_check: cpm_metric.dashboard_activity.backup_success_num
name: n2ws
public_title: Intégration Datadog/N2WS
short_description: Consulter les données récapitulatives de tous les hosts connectés de N2WS Backup & Recovery
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Connu sous le nom de N2WS, N2WS Backup & Recovery (CPM) est une solution professionnelle de sauvegarde, de récupération et de reprise d'activité après sinistre pour AWS. N2WS tire parti de technologies basées sur le cloud (comme les snapshots) afin de proposer des fonctionnalités de sauvegarde et de récupération dans AWS.

Votre instance N2WS Backup and Recovery prend en charge la surveillance des sauvegardes, des reprises d'activité après sinistre, des copies vers S3, des alertes et d'autres éléments par le service dédié de Datadog. Cette intégration permet aux utilisateurs de surveiller et d'analyser les métriques du dashboard N2WS Backup and Recovery.

## Configuration

### Installation

1. Installez l'[intégration Python][1].

2. Activez la prise en charge de Datadog sur votre instance N2WS :
    - Connectez-vous à votre instance N2WS Backup and Recovery avec le protocole SSH.
    - Ajoutez les lignes suivantes à `/cpmdata/conf/cpmserver.cfg`. Vous devrez peut-être posséder les privilèges `sudo` pour effectuer cette action.
        ```
        [external_monitoring]
        enabled=True
        ```
    - Exécutez `service apache2 restart`.

3. Installez l'Agent Datadog sur votre instance N2WS :
    - Connectez-vous à Datadog et accédez à [Integrations -> Agent -> Ubuntu][2].
    - Copiez la commande d'installation en une seule étape de l'Agent.
    - Connectez-vous à votre instance N2WS Backup and Recovery avec le protocole SSH. Vous devrez peut-être posséder les privilèges `sudo` pour effectuer cette action.

4. Visualisez les métriques N2WS dans Datadog :
    - Accédez à [Metrics -> Explorer][3].
    - **Graph** : sélectionnez votre métrique dans la liste. Toutes les métriques N2WS commencent par la chaîne `cpm_metric`.
    - **Over** : sélectionnez les données dans la liste. Toutes les données des utilisateurs N2WS commencent par la chaîne `cpm:user:<NOM_UTILISATEUR>`. Vous pouvez sélectionner un utilisateur spécifique ou toute l'instance N2WS.


5. Ajoutez des dashboards N2WS à votre compte Datadog :
    - Accédez au [carré d'intégration N2WS][4] et installez l'intégration.
    - Cliquez sur le bouton d'installation pour ajouter les dashboards suivants : `N2WSBackup&Recovery-Graphicalversion`, `N2WSBackup&Recovery-Graphicalversion-areas` et `N2WSBackup&Recovery-Squaresdashboard`.
    - Les utilisateurs peuvent également [importer des modèles JSON depuis N2WS][5].

## Données collectées

Datadog recueille les données suivantes relatives aux sauvegardes N2WS Backup & Recovery :

- Nombre de snapshots de chaque type
- Sauvegardes réussies
- Échecs de sauvegarde
- Sauvegardes partiellement réussies
- Ressources protégées de tout type
- Données relatives à la capacité du volume, aux alertes, etc.

### Métriques
{{< get-metrics-from-git "n2ws" >}}


### Événements

Datadog recueille les messages d'alerte de tous les hosts de N2WS Backup & Recovery.

### Checks de service

L'intégration N2WS Backup & Recovery n'inclut aucun check de service.

## Dépannage

- [Documentation et guide de l'utilisateur de N2WS][7]
- [Assistance N2WS][8]
- [Assistance Datadog][9]


[1]: https://app.datadoghq.com/account/settings#integrations/python
[2]: https://app.datadoghq.com/account/settings#ubuntu
[3]: https://app.datadoghq.com/metric/explorer
[4]: https://app.datadoghq.com/account/settings#integrations/n2ws
[5]: https://support.n2ws.com/portal/en/kb/articles/datadog-templates
[6]: https://github.com/DataDog/integrations-extras/blob/master/n2ws/metadata.csv
[7]: https://n2ws.com/support/documentation
[8]: https://n2ws.com/support
[9]: https://docs.datadoghq.com/fr/help/