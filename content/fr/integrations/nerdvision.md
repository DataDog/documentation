---
"assets":
  "dashboards":
    "NerdVision Overview": assets/dashboards/overview.json
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"author":
  "homepage": "https://nerd.vision"
  "name": NerdVision
"categories":
- marketplace
- log collection
- monitoring
"creates_events": true
"ddtype": "crawler"
"dependencies": []
"display_name": "NerdVision"
"draft": false
"git_integration_title": "nerdvision"
"guid": "5f778314-2ff5-4601-ac36-aa2955c0b4d4"
"integration_id": "nerdvision"
"integration_title": "NerdVision"
"is_public": true
"kind": "integration"
"maintainer": "support@nerd.vision"
"manifest_version": "1.0.0"
"metric_prefix": "nerdvision."
"metric_to_check": "nerdvision.clients"
"name": "nerdvision"
"pricing":
- "billing_type": tag_count
  "metric": datadog.marketplace.nerdvision.clients
  "tag": hostname
  "unit_label": Clients
  "unit_price": !!int "2"
"public_title": "NerdVision"
"short_description": "Plateforme de debugging en temps réel pour .NET, Java, Python et Node."
"support": "partner"
"supported_os":
- linux
- mac_os
- windows
"terms":
  "eula": assets/eula.pdf
  "legal_email": support@nerd.vision
---



## Présentation

### Qu'est-ce que NerdVision ?

{{< img src="marketplace/nerdvision/images/screenshot.png" alt="nerdvision" >}}

NerdVision est une plateforme de debugging en temps réel qui vous permet d'analyser en profondeur votre application à tout moment. NerdVision vous offre la possibilité d'installer des tracepoints dans votre application afin de recueillir des données sur son état, sans redémarrage ni modification du code.

Une fois configurée, cette intégration crée un dashboard et synchronise l'ensemble des événements et logs du groupe NerdVision avec votre organisation Datadog.

#### Watchers et conditions

Utilisez des conditions pour faire en sorte que votre tracepoint se déclenche uniquement dans les situations qui vous intéressent. Ajoutez des watchers pour enrichir le contexte et inclure des données clés sur le problème ou des données non couvertes par la capture de variables.

### Dashboard NerdVision pour Datadog

Le dashboard Datadog vous permet de déterminer à quels endroits dans votre code les tracepoints se déclenchent de manière à identifier les principales sources d'activité de debugging.

{{< img src="marketplace/nerdvision/images/screenshot_datadog.png" alt="datadog" >}}

### Événements

Chaque tracepoint déclenché est envoyé à Datadog en tant qu'événement, avec les tags appropriés et un lien pour visualiser les données dans NerdVision. Les tracepoints vous permettent de récupérer la stack complète ainsi que les variables actives au moment où le tracepoint s'est déclenché.

{{< img src="marketplace/nerdvision/images/datadog_event.png" alt="datadog" >}}

### Logs

Grâce au logging dynamique, vous pouvez injecter de nouveaux messages de log à n'importe quel endroit dans votre code pour ajouter les données qui ont été manquées. Lorsqu'un message de log se déclenche, il est synchronisé avec Datadog dès son traitement par NerdVision.

{{< img src="marketplace/nerdvision/images/datadog_log.png" alt="datadog" >}}

### Métriques

NerdVision génère des métriques pour les clients en ligne et les déclencheurs de tracepoint.

### Checks de service

NerdVision n'inclut aucun check de service.

## Assistance

Pour obtenir de l'aide ou communiquer une demande, contactez NerdVision aux coordonnées suivantes :

E-mail : support@nerd.vision

La documentation est disponible [ici](https://docs.nerd.vision/).

---
 Cette application est disponible sur le Marketplace et développée par un partenaire de Datadog. [Cliquez ici](https://app.datadoghq.com/marketplace/app/nerdvision/pricing) pour l'acheter.

