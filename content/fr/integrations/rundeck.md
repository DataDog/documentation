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
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rundeck/README.md'
display_name: Rundeck
draft: false
git_integration_title: rundeck
guid: 2e3492d3-14fd-409d-b339-fb1bc14d7db9
integration_id: rundeck
integration_title: Rundeck
is_public: true
kind: integration
maintainer: forrest@rundeck.com
manifest_version: 1.0.0
metric_prefix: rundeck.
metric_to_check: ''
name: Rundeck
public_title: Intégration Datadog/Rundeck
short_description: Automatisez les actions de réponse aux incidents à l'aide de webhooks Rundeck
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Rundeck rend les notifications Datadog encore plus puissantes en vous permettant d'automatiser certaines actions afin de faciliter le diagnostic et la résolution des incidents.

Apprenez-en plus sur l'automatisation de vos runbooks pour réduire la durée des incidents [sur le site Web Rundeck][1].

Voici quelques exemples d'automatisations possibles :

- Si un service Windows/Linux est indisponible, tenter de le redémarrer
- Si la synchronisation NTP est désactivée, redémarrer le service NTP sur la machine concernée
- Nettoyer les logs et autres fichiers inutiles lorsque l'espace disque devient insuffisant
- Redémarrer des services lorsqu'une file d'attente de travail est bloquée
- Augmenter la capacité en cas d'utilisation élevée

Suivez les instructions ci-dessous pour configurer votre intégration Datadog/Rundeck.

## Configuration

### Installation
Préparez au moins une tâche Rundeck qui doit se déclencher en réponse à une alerte Datadog.

### Configuration

#### Configuration de Rundeck

1. Dans votre projet Rundeck, cliquez sur l'option de navigation **Webhooks**.
2. Cliquez sur **Add**.
3. Donnez un nom au webhook.  (Par exemple, *Datadog-Restart Service*)
4. Cliquez sur le bouton **Choose Webhook Plugin** et sélectionnez **Run Job***.
5. Sélectionnez la tâche que vous souhaitez exécuter lorsque ce webhook se déclenche.
6. [Facultatif] Dans la ligne **Options**, ajoutez le texte suivant :
`-raw ${raw} -event_type ${data.event_type}`
(La charge utile Datadog complète sera alors disponible dans les options de saisie de tâche.)
7. Cliquez sur **Create Webhook**. Le champ URL est automatiquement rempli une fois le webhook créé.

![rundeck-setup][2]

#### Configuration de Datadog
1. Ouvrez Datadog et accédez à **Integrations** > **Integrations**.
2. Recherchez « webhooks ».

![search-dd][3]


3. Cliquez sur le carré Webhooks illustré ci-dessus. La fenêtre de configuration s'ouvre alors.

![webhooks-config][4]

4. Cliquez sur le bouton **New** et remplissez le formulaire :
  - Donnez un nom au webhook. (a)
  - Collez l'URL associée à votre webhook Rundeck dans le champ URL. Cela correspond à l'étape 7 dans la section ci-dessus. (b)
  - Cliquez sur **Save**. (c)

![webhook-fill][5]

Ajoutez cette intégration à n'importe quelle notification d'alerte dans Datadog en ajoutant le destinataire `@webhook-Rundeck_Restart_Service`. Le nom varie en fonction du nom que vous avez donné au webhook à l'étape 4a. Lorsque le monitor déclenche une alerte, le webhook exécute la tâche associée.

D'autres plugins, tels qu'Advanced Run Job, peuvent également être utilisés selon vos besoins.


## Données collectées

### Métriques

L'intégration Rundeck n'inclut aucune métrique.

### Checks de service

L'intégration Rundeck n'inclut aucun check de service.

### Événements

L'intégration Rundeck n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.rundeck.com
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/rundeck-setup.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/dd-search.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhooks-config.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rundeck/images/webhook-fill.png
[6]: https://docs.datadoghq.com/fr/help/