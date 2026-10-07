---
categories:
- log collection
- security
ddtype: crawler
dependencies: []
description: Connectez-vous à votre compte Microsoft 365 pour intégrer les logs d'audit
  d'une organisation à la plateforme de journalisation de Datadog.
doc_link: https://docs.datadoghq.com/integrations/microsoft_365/
draft: false
git_integration_title: microsoft_365
has_logo: true
integration_id: ''
integration_title: Microsoft 365
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: microsoft_365
public_title: Intégration Datadog/Microsoft 365
short_description: Afficher les logs d'audit Microsoft 365 dans Datadog
team: web-integrations
version: '1.0'
---

## Présentation

Intégrez votre plate-forme Microsoft 365 pour :

- Consulter et parser vos logs d'audit à l'aide de la solution de journalisation de Datadog
- Définir des monitors sur les événements depuis votre plate-forme Microsoft 365
- Exploitez les outils de sécurité de la solution Datadog pour définir des règles de sécurité

Datadog recueille les types de logs d'audit suivants :

* `Audit.General`
* `Audit.Exchange`
* `Audit.SharePoint`
* `Audit.AzureActiveDirectory`
* `DLP.All`

## Configuration

### Installation

Utilisez le [carré Microsoft 365 Datadog][1] pour installer l'intégration.

Cliquez sur **Install a New Tenant**. Vous êtes alors invité à vous connecter à votre compte Microsoft 365 pour autoriser Datadog. Vous devez vous connecter avec un compte administrateur.

Vous pouvez également ajouter des tags personnalisés, séparés par des virgules, afin de les joindre à chaque log du nouveau locataire configuré. Exemple : `environment:prod,team:us`. Ces tags servent à filtrer ou à analyser des logs.

**Remarque** : votre organisation doit avoir [activé la journalisation d'audit][2] pour l'utiliser dans Datadog.

## Données collectées

### Logs

L'intégration Microsoft 365 génère un événement de log par log d'audit. Les logs recueillis possèdent le tag source `microsoft-365`.

## Dépannage

L'endpoint d'admission de logs Datadog accepte les événements de log avec une date pouvant être jusqu'à 18 heures avant l'heure actuelle. Les événements de log avec un horodatage plus ancien sont ignorés.

Datadog ne prend pas en charge les locataires GCC Government, GCC High Government ou DoD, car ils utilisent d'autres endpoints Microsoft.

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/microsoft_365
[2]: https://docs.microsoft.com/en-us/microsoft-365/compliance/turn-audit-log-search-on-or-off?view=o365-worldwide#turn-on-audit-log-search
[3]: https://docs.datadoghq.com/fr/help/