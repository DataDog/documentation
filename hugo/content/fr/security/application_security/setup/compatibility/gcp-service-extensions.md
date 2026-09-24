---
aliases:
- /fr/security/application_security/threats/setup/compatibility/gcp-service-extensions
code_lang: gcp-service-extensions
code_lang_weight: 40
title: Exigences de compatibilité des extensions de service GCP pour App and API Protection
type: multi-code-lang
---
Le tableau suivant répertorie les fonctionnalités d'App and API Protection pour les extensions de service GCP, selon la version d'image de callout des extensions de service Datadog spécifiée :

| Capacité d'App and API Protection| Version minimale de l'image de callout des App and API Protection Service Extensions|
|------------------------------------------|--------------------------------------------------------------------------|
| Détection des menaces | 1.71.0 |
| Protection contre les menaces | 1.71.0 |
| Personnalisation de la réponse aux requêtes bloquées | 1.71.0 |
| Sécurité des API | v2.2.2 |
| App and API Protection Standalone| v2.2.2|
| Suivi automatique des événements d'activité utilisateur | non pris en charge |

Veuillez consulter les [limitations][1] de l'intégration des extensions de service GCP pour App and API Protection.

### Prise en charge du traitement du corps de requête {#body-processing-support}

Le callout des extensions de service Datadog prend en charge le traitement des corps de requête et de réponse pour les types de charge utile suivants :

| Type de charge utile| Version minimale de l'image de callout des App and API Protection Service Extensions|
|--------------|--------------------------------------------------------------------------|
| JSON | v2.2.2 |

## Prise en charge des App and API Protection GCP Service Extensions{#app-and-api-protection-gcp-service-extensions-support}

<div class="alert alert-info">App and API Protection GCP Service Extensions est en version préliminaire.</div>

<div class="alert alert-info">Si vous souhaitez voir le support ajouté pour l'une des
fonctionnalités non prises en charge, faites-le-nous savoir ! Remplissez <a
href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour envoyer
détails</a>.</div>

[1]: /fr/security/application_security/setup/gcp/service-extensions