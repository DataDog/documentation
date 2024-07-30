---
"assets":
  "dashboards": {}
  "metrics_metadata": metadata.csv
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- monitoring
- collaboration
- notification
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/amixr/README.md"
"display_name": "Amixr"
"draft": false
"git_integration_title": "amixr"
"guid": "56e3b585-27b4-4a04-b528-9c1adfecf387"
"integration_id": "amixr"
"integration_title": "Amixr"
"integration_version": ""
"is_public": true
"custom_kind": "integration"
"maintainer": "ildar@amixr.io"
"manifest_version": "1.0.0"
"metric_prefix": "amixr."
"metric_to_check": ""
"name": "amixr"
"public_title": "Intégration Datadog/Amixr"
"short_description": "Gestion des alertes conviviale pour les développeurs avec une excellente intégration Slack"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---



## Présentation

Utilisez Amixr pour gérer des alertes avec une intégration Slack :

- Recueillez et analysez des alertes et d'autres événements depuis Datadog.
- Configurez des rotations du personnel avec Google Agenda ou dans Slack ;
- Configurez des chaînes de réaffectation automatique.
- Recevez des alertes par appel et SMS.
- Orchestrez la gestion des incidents avec GitOps.

![Interface_Amixr][1]

## Configuration

### Installation

Vous n'avez rien d'autre à installer sur votre serveur.

### Configuration

Dans Amixr :

1. Accédez à *Settings > Connect New Monitorings > Datadog > How to connect*.
2. Copiez l'URL du webhook Datadog.

Dans Datadog :

1. Accédez à la page **Integrations** à partir de la barre latérale.
2. Recherchez **webhook** dans la barre de recherche.
3. Saisissez un nom pour l'intégration, par exemple : `amixr-alerts-prod`.
4. Collez l'URL du webhook copiée précédemment.
5. Cliquez sur le bouton Save.

### Validation

Dans Datadog :

1. Accédez à la page **Events** à partir de la barre latérale.
2. Saisissez `@webhook-<nom_intégration><VOTRE_TEXTE>`, par exemple : `@webhook-amixr-alerts-prod test alert`.
3. Cliquez sur le bouton Post.

Dans Amixr :

1. Accédez à **Incidents** à partir de la barre latérale pour vérifier si l'alerte a été reçue.

## Données collectées

### Métriques

L'intégration Amixr n'inclut aucune métrique.

### Checks de service

L'intégration Amixr n'inclut aucun check de service.

### Événements

L'intégration Amixr n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Amixr][2].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png
[2]: https://amixr.io/support/

