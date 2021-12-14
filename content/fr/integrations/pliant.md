---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - notification
  - compliance
  - automation
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/pliant/README.md'
display_name: Pliant
draft: false
git_integration_title: pliant
guid: 3beeb950-4020-4e0e-914e-35281dad9719
integration_id: pliant
integration_title: Pliant
is_public: true
kind: integration
maintainer: hello@pliant.io
manifest_version: 1.0.0
metric_prefix: pliant.
metric_to_check: ''
name: pliant
public_title: Intégration Datadog/Pliant
short_description: Automatisation de processus informatiques avec Pliant.io
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Pliant.io renforce le système de notifications de Datadog en intégrant des workflows automatisés nécessitant peu de code. Cette approche permet de tirer profit d'une véritable solution d'automatisation à circuit fermé, afin de faciliter l'identification des erreurs, le dépannage et les corrections automatiques.

Pour en savoir plus sur l'intégration, consultez le site de [Pliant][1] (en anglais).

Voici quelques exemples de workflows disponibles :



- Redémarrage de service
- Configuration de répartiteur de charge
- Approvisionnement système
- Nettoyage de disque et réapprovisionnement du stockage
- Approvisionnement de machines virtuelles ou de nœuds de conteneur selon le niveau de charge
- Désactivation de ressources en cas de faible charge


## Configuration

### Installation

Créez un ou plusieurs workflows à déclencher à partir d'une notification Datadog.

### Configuration

#### Configuration Pliant
**Créez une clé d'API Pliant.**
1. Connectez-vous à Pliant et cliquez sur votre nom d'utilisateur en haut à droite de l'écran pour afficher le menu. Cliquez sur « API Keys ».

![Étape 1 menu API Keys][2]

2. Depuis l'écran API Keys, cliquez sur « + Create » en haut à droite de l'écran, puis nommez votre nouvelle clé d'API. Cliquez sur Save. La clé d'API est alors ajoutée à la table.

![Étape 2 Créer une clé d'API][3]

**Créer un workflow Pliant à déclencher à partir de Datadog**

1. Accédez à l'onglet Workflows dans Pliant. Cliquez sur « + Create » et sur « Create Flow » pour créer un nouveau workflow. Nommez votre workflow dans la fenêtre qui s'affiche, puis cliquez sur « Create » pour lancer l'éditeur pour le nouveau workflow.

![Étape 1a Créer une étape de flow][4]

2. Configurez le workflow en ajoutant des actions à effectuer au déclenchement de la notification Datadog.

Dans cet exemple, le workflow s'intitule « RestartHost ». Il redémarre un host à partir des informations avec lesquelles Datadog le déclenche.

Ce workflow s'exécute avec ses variables d'entrée qui sont initialement attribuées en fonction du corps de requête utilisé pour le déclencher. Le workflow peut déclencher/exécuter n'importe quelle action d'automatisation d'infrastructure de votre choix à l'aide des informations fournies par son entrée. Dans cet exemple, un host est redémarré via SSH dans certaines conditions lorsque Datadog déclenche notre workflow d'automatisation avec certains paramètres.

  - Pour ajouter des variables d'entrée ayant pour valeur les données envoyées par Datadog, cliquez sur l'icône « Expand » au démarrage du workflow pour ouvrir le volet Variable. Pour créer des variables d'**entrée** correspondantes, définissez la valeur de toutes ces variables d'entrée sur des guillemets vides : `""`. Par défaut, Datadog transmet des données pour les champs suivants :
`body`
`last_updated`
`event_type`
`title`
`date`
`org`
`id`

Certaines variables de sortie (`host`, `meta` et `ip`) sont également initialisées. Le workflow attribue ces variables de sortie et renvoie les valeurs résultantes à la fin de l'action. Il est également possible de spécifier des variables qui ne sont ni d'entrée ni de sortie de façon à les utiliser en interne dans la logique du workflow.

![Expand][5]

3. Pour obtenir l'endpoint du workflow Plant utilisé pour déclencher l'alerte Datadog avec une requête HTTP, cliquez sur l'icône « Expand » au début du workflow.

Cliquez sur cURL > Temporary Bearer Token et sélectionnez la clé d'API que vous venez de créer.

![curl][6]

![Sélection d'une clé][7]

Votre endpoint est mis entre des guillemets et se présente sous le format suivant : ***https://<VOTRE_INSTANCE_PLIANT>/api/v1/trigger/<VOTRE_NOM_UTILISATEUR_PLIANT>/User/<CHEMIN_DU_WORKFLOW>/<WORKFLOW_ACTUEL>?sync=true&api_key=<VOTRE_CLÉ_API>***

![endpoint][8]

Copiez l'URL complète qui est mise entre guillemets (comprenant éventuellement des paramètres de requête supplémentaires) et qui commence par ***https***. N'incluez pas les guillemets.

#### Configuration de Datadog
1. Ouvrez Datadog. Depuis la barre latérale de gauche, cliquez sur **Integrations** > **integrations**.
![integrations][9]

2. Saisissez « webhooks » dans la barre de recherche, puis cliquez sur l'entrée **webhooks** pour afficher la fenêtre de configuration.
![recherche de webhooks][10]


3. Faites défiler jusqu'à atteindre la section « webhooks ». Cliquez sur **New** pour ajouter un webhook associé au workflow Plant. Commencez par nommer votre webhook en remplissant le champ « name ». Dans cet exemple, le nom du workflow est « RestartHost ».
![Configuration webhooks 2][11]

Collez ensuite l'URL copiée à l'étape 4. Exemple :

***https://<VOTRE_INSTANCE_PLIANT>/api/v1/trigger/<VOTRE_NOM_UTILISATEUR_PLIANT>/User/<CHEMIN_WORKFLOW>/<WORKFLOW_ACTUEL>?sync=true&api_key=<VOTRE_CLÉ_API>***

Collez cette URL dans le champ ***URL*** du formulaire du webhook.

![formulaire webhook][12]

La charge utile de la requête est préconfigurée. Cochez la case « ENCODE AS FORM » et cliquez sur Save.

Ajoutez cette intégration aux notifications d'alerte de votre choix dans Datadog. Pour ce faire, ajoutez le destinataire `@webhook-RestartHost`. Lorsque le monitor déclenche une alerte, le webhook déclenche votre workflow Pliant et les variables d'entrée sont envoyées à Pliant depuis Datadog.

## Données collectées

### Métriques

L'intégration Pliant n'inclut aucune métrique.

### Checks de service

L'intégration Pliant n'inclut aucun check de service.

### Événements

L'intégration Pliant n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://pliant.io/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step2.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/step1-a-.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/expand.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/curl.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/selectDDkey.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/endpoint.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/integrations_.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhook_Search.png
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhooksConfig3.png
[12]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/pliant/images/webhookForm.png
[13]: https://docs.datadoghq.com/fr/help/