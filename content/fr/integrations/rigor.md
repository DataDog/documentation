---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "service_checks": assets/service_checks.json
"categories":
- monitoring
"creates_events": true
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/rigor/README.md"
"display_name": "Rigor"
"draft": false
"git_integration_title": "rigor"
"guid": "f51704ed-a327-4132-9f04-a25a47791693"
"integration_id": "rigor"
"integration_title": "Rigor"
"is_public": true
"kind": "integration"
"maintainer": "support@rigor.com"
"manifest_version": "1.0.0"
"metric_prefix": "rigor."
"name": "rigor"
"public_title": "Intégration Datadog/Rigor"
"short_description": "Rigor est une solution d'optimisation et de surveillance synthétique conçue pour l'ensemble du cycle de développement."
"support": "contrib"
"supported_os":
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

### Configurer l'intégration des métriques

En tant qu'administrateur, cliquez sur le menu « Admin Tools » en haut à droite de votre écran et sélectionnez « Integrations ».

![menu administrateur][2]

Ajoutez une nouvelle intégration en cliquant sur le bouton « New ». Vous pourrez alors configurer cette intégration.

![configuration du Push][3]

Donnez un nom unique à cette intégration et ajoutez votre clé d'API de Datadog. Sélectionnez ensuite les tags et métriques que vous souhaitez envoyer. Voici quelques notions à retenir :

- Une version normalisée du nom du check est incluse en tant que tag par défaut.
- Pour les checks en plusieurs étapes (checks Real Browser et d'API), on spécifie l'emplacement
  de la requête d'où proviennent les métriques est spécifiée.
- Les checks Uptime comprennent les checks d'API, de port et HTTP.
- Les checks de port ne transmettent que la métrique « Temps de réponse ».
- Seuls certains navigateurs prennent en charge la totalité des métriques.

Si vous souhaitez que les checks Real Browser transmettent les calculs de temps provenant de l'[API User Timings][4], sélectionnez l'option « Send All User Timings? ». Tous les marqueurs sont transmis dans l'espace de nommage `rigor.real_browser.marks`, et toutes les mesures sont transmises dans l'espace de nommage `rigor.real_browser.measures`. À noter que la sélection de cette option est susceptible d'entraîner l'envoi de nombreuses séries à Datadog, en particulier si les marqueurs et les mesures du site que vous testez sont générés de manière dynamique.

Une fois l'intégration configurée, vous pouvez l'ajouter à tous les checks d'API, de port, HTTP ou Real Browser. Il vous suffit de modifier le check et d'accéder à l'onglet « Notifications ». Vous pourrez alors ajouter l'intégration créée.

![Ajouter l'intégration au check][5]

### Configurer l'intégration des événements

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

Toutes les métriques Rigor peuvent être envoyées à Datadog. La configuration de votre intégration permet de sélectionner les données qui seront envoyées. Les métriques qui peuvent être envoyées sont les suivantes :

#### Checks HTTP

- `rigor.http.dns_time`
- `rigor.http.first_byte_time`
- `rigor.http.response_time`

#### Checks de port

- `rigor.port.response_time`

#### Checks d'API

- `rigor.api.dns_time`
- `rigor.api.first_byte_time`
- `rigor.api.response_time`

#### Checks Real Browser

- `rigor.real_browser.first_byte_time_ms`
- `rigor.real_browser.dom_interactive_time_ms`
- `rigor.real_browser.first_paint_time_ms`
- `rigor.real_browser.start_render_ms`
- `rigor.real_browser.first_contentful_paint_time_ms`
- `rigor.real_browser.first_meaningful_paint_time_ms`
- `rigor.real_browser.dom_load_time_ms`
- `rigor.real_browser.dom_complete_time_ms`
- `rigor.real_browser.onload_time_ms`
- `rigor.real_browser.visually_complete_ms`
- `rigor.real_browser.speed_index`
- `rigor.real_browser.fully_loaded_time_ms`
- `rigor.real_browser.requests`
- `rigor.real_browser.content_bytes`
- `rigor.real_browser.html_files`
- `rigor.real_browser.html_bytes`
- `rigor.real_browser.image_files`
- `rigor.real_browser.image_bytes`
- `rigor.real_browser.javascript_files`
- `rigor.real_browser.javascript_bytes`
- `rigor.real_browser.css_files`
- `rigor.real_browser.css_bytes`
- `rigor.real_browser.video_files`
- `rigor.real_browser.video_bytes`
- `rigor.real_browser.font_files`
- `rigor.real_browser.font_bytes`
- `rigor.real_browser.other_files`
- `rigor.real_browser.other_bytes`
- `rigor.real_browser.client_errors`
- `rigor.real_browser.connection_errors`
- `rigor.real_browser.server_errors`
- `rigor.real_browser.errors`

De plus, si l'intégration est configurée, les indicateurs User Timings du navigateur seront envoyés dans les espaces de nommage `rigor.real_browser.marks` et `rigor.real_browser.measures`.

### Événements

Lorsqu'un check est configuré de façon à vous avertir via un événement Datadog, deux types d'événements sont envoyés à Datadog :

- **Failed** : une alerte est envoyée à chaque fois que le check échoue en dépassant le seuil.
- **Back online** : lorsque le check parvient à s'exécuter en étant dans un état d'alerte.

![Exemple d'événements][10]

### Checks de service

Cette intégration n'inclut aucun check de service.

### Dépannage

Besoin d'aide ? Contactez [l'assistance Rigor][11].

### Pour aller plus loin

Consultez le site [Rigor][12] pour obtenir plus d'informations sur Rigor et sur la façon dont nous pouvons contribuer à optimiser les performances de votre site web.

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_timeboard_with_metrics.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_admin_menu.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_integration_configuration.png
[4]: https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_integration_to_check.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_menu.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_chooser.png
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_webhooks_configuration.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_add_webhook_to_check.png
[10]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rigor/images/rigor_events_example.png
[11]: mailto:support@rigor.com
[12]: https://rigor.com

