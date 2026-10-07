---
categories:
- log collection
- security
ddtype: crawler
dependencies: []
description: Recueille des logs à partir du centre d'aide Google Workspace.
doc_link: https://docs.datadoghq.com/integrations/google_workspace_alert_center/
draft: false
git_integration_title: google_workspace_alert_center
has_logo: true
integration_id: ''
integration_title: Centre d'alerte Google Workspace
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: google_workspace_alert_center
public_title: Centre d'alerte Google Workspace
short_description: Recueille des logs à partir du centre d'aide Google Workspace.
team: web-integrations
version: '1.0'
---

## Présentation

Le centre d'alerte offre une vue d'ensemble exhaustive des notifications, alertes et actions essentielles liées à la sécurité pour l'ensemble de la solution Google Workspace. Intégrez le centre d'alerte Google Workspace à Datadog pour :

- Consulter et parser vos logs d'alerte à l'aide des [fonctionnalités de logs de Datadog][1]
- Définir des [monitors][2] sur les [événements][3] de votre domaine Google Workspace
- Tirer profit de la [plateforme de sécurité][4] de Datadog afin de surveiller et de détecter les menaces sur l'ensemble de votre domaine Google Workspace

## Configuration

### Installation

L'intégration Centre d'alerte Google Workspace de Datadog utilise des comptes de service pour établir une connexion API entre Google et Datadog. Vous trouverez ci-dessous les instructions à suivre pour créer un compte de service et fournir à Datadog ses identifiants afin de commencer à passer des appels d'API en votre nom.

1. Suivez les [instructions pour créer un compte de service et lui attribuer des autorisations][5]. Vous devez
   disposer d'un accès super administrateur pour pouvoir effectuer ces étapes. **Remarque** : notez l'emplacement de sauvegarde
   du fichier JSON de la clé privée dans le cadre de ce processus.
2. Accédez au [carré d'intégration Centre d'alerte Google Workspace][6].
3. Dans l'onglet **Configuration**, sélectionnez _Upload Private Key File_ pour intégrer ce projet
   à Datadog. Sélectionnez le fichier JSON de la clé privée enregistrée lors de la première étape.
4. Saisissez dans le champ Subject Email l'adresse e-mail d'un compte utilisateur ou robot disposant
   d'un accès au Centre d'alerte. N'utilisez pas l'adresse e-mail associée au compte de service.
   L'intégration emprunte l'identité de cet utilisateur lorsqu'elle effectue des appels d'API.

Si vous souhaitez surveiller plusieurs projets, vous pouvez répéter le processus ci-dessus de façon à utiliser plusieurs comptes de service.

### Procédure à suivre

Vous avez la possibilité de fournir des tags pour chaque projet. Ces tags sont alors ajoutés à chaque événement de log du projet en question dans Datadog.

### Résultats

Patientez au moins cinq minutes le temps que les [logs][1] soient transmis depuis la source `google.workspace.alert.center`. Si votre environnement ne génère pas régulièrement des alertes Centre d'alerte, ce délai peut-être plus long.

## Données collectées

### Métriques

Cette intégration Centre d'alerte Google Workspace n'inclut pas de données de métriques.

### Événements

Pour obtenir la liste complète des événements de log, consultez la [documentation relative au Centre d'alerte Google Workspace][7].

### Checks de service

L'intégration Centre d'alerte Google Workspace n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: /fr/logs/
[2]: /fr/monitors/monitor_types/
[3]: /fr/events/
[4]: /fr/security_platform/
[5]: https://developers.google.com/admin-sdk/alertcenter/guides/prerequisites
[6]: http://app.datadoghq.comhttps://app.datadoghq.com/account/settings#integrations/google-workspace-alert-center
[7]: https://support.google.com/a/answer/9104586?hl=en&ref_topic=9105077
[8]: https://docs.datadoghq.com/fr/help/