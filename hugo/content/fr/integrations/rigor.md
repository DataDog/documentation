---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- monitoring
creates_events: true
ddtype: crawler
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md
display_name: Rigor
draft: false
git_integration_title: rigor
guid: f51704ed-a327-4132-9f04-a25a47791693
integration_id: rigor
integration_title: Rigor
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@rigor.com
manifest_version: 1.0.0
metric_prefix: rigor.
metric_to_check: rigor.http.dns_time
name: rigor
public_title: Intégration Datadog/Rigor
short_description: Rigor est une solution d'optimisation et de surveillance synthétique
  conçue pour l'ensemble du cycle de développement.
support: contrib
supported_os:
- linux
- mac_os
- windows
---

## Présentation

Rigor fournit des informations pour l'optimisation et la surveillance synthétique tout au long du cycle de développement.

![timeboard][1]

Grâce à Rigor, vous pouvez collecter des métriques de performance synthétique frontales et les transmettre à Datadog. Vous pouvez également transmettre des alertes à Datadog sous forme d'événements.

## Configuration

Rigor propose deux intégrations différentes avec Datadog : une intégration pour les métriques et une pour les événements.

### Configuration
#### Collecte de métriques

En tant qu'administrateur, cliquez sur le menu « Admin Tools » en haut à droite de votre écran et sélectionnez « Integrations ».

![menu administrateur][2]

Ajoutez une nouvelle intégration en cliquant sur le bouton New. Vous pourrez alors configurer cette intégration.

![configuration du Push][3]

Donnez un nom unique à cette intégration et ajoutez votre clé d'API de Datadog. Sélectionnez ensuite les tags et métriques que vous souhaitez envoyer. Voici quelques notions à retenir :

- Une version normalisée du nom du check est incluse en tant que tag par défaut.
- Pour les checks à plusieurs étapes (checks API et Real Browser), la position de la requête à l'origine des métriques est incluse.
- Les checks Uptime comprennent les checks d'API, de port et HTTP.
- Les checks de port ne transmettent que la métrique « Temps de réponse ».
- Seuls certains navigateurs prennent en charge la totalité des métriques.

Si vous souhaitez que les checks Real Browser transmettent les calculs de temps provenant de l'[API User Timings][4], sélectionnez l'option « Send All User Timings? ». Tous les marqueurs sont transmis dans l'espace de nommage `rigor.real_browser.marks`, et toutes les mesures sont transmises dans l'espace de nommage `rigor.real_browser.measures`. **Remarque** : la sélection de cette option est susceptible d'entraîner l'envoi d'un grand nombre de nouvelles séries à Datadog, en particulier si les marqueurs et les mesures du site que vous testez sont générés de manière dynamique.

Une fois l'intégration configurée, vous pouvez l'ajouter à tous les checks d'API, de port, HTTP ou Real Browser. Il vous suffit de modifier le check et d'accéder à l'onglet « Notifications ». Vous pourrez alors ajouter l'intégration créée.

![Ajouter l'intégration au check][5]

#### Collecte d'événements

En tant qu'administrateur, cliquez sur le menu « Admin Tools » en haut à droite de votre écran et sélectionnez « Alert Webhooks ».

![Menu Webhooks][6]

Ajoutez une nouvelle intégration en cliquant sur le bouton « New » et en cliquant sur le carré Datadog.

![Sélection du Webhook][7]

Donnez nom unique à ce Webhook et assurez-vous de mettre à jour les déclencheurs avec votre clé d'API Datadog.

![Configuration des Webhooks][8]

Une fois l'intégration configurée, vous pouvez l'ajouter à tous les checks d'API, de port, HTTP ou Real Browser.  Il vous suffit de modifier le check et d'accéder à l'onglet « Notifications ». Vous pourrez alors ajouter le Webhook créé.

![Ajouter un Webhook à un check][9]

## Données collectées

### Métriques
{{< get-metrics-from-git "rigor" >}}


### Événements

Lorsqu'un check est configuré de façon à vous prévenir à l'aide d'un événement Datadog, deux types d'événements sont envoyés à Datadog :

- **Failed** : une alerte est envoyée à chaque fois que le check échoue en dépassant le seuil.
- **Back online** : lorsque le check parvient à s'exécuter en étant dans un état d'alerte.

![Exemple d'événements][11]

### Checks de service

L'intégration Rigor n'inclut aucun check de service.

### Dépannage

Besoin d'aide ? Contactez [l'assistance Rigor][12].


[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://github.com/DataDog/integrations-core/blob/master/rigor/metadata.csv
[11]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[12]: mailto:support@rigor.com