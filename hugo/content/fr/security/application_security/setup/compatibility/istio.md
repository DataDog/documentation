---
code_lang: istio
code_lang_weight: 40
title: Exigences de compatibilité Istio
type: multi-code-lang
---
Le tableau suivant répertorie les fonctionnalités de protection des applications et des API pour l'intégration Istio en fonction de la version de l'image du processeur externe Datadog spécifiée :

| Fonctionnalité de protection des applications et des API              | Version minimale de l'image Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Détection des menaces| v1.71.0|
| Protection contre les menaces| v1.71.0|
| Personnalisation de la réponse aux requêtes bloquées| v1.71.0|
| Mode asynchrone non bloquant (observabilité)| v2.1.0|
| Sécurité des API| v2.2.2|
| Protection des applications et des API autonome| v2.2.2|
| Suivi automatique des événements d'activité utilisateur         | non pris en charge                                     |

### Prise en charge du traitement du corps {#body-processing-support}

Le service Datadog External Processor prend en charge le traitement des corps de requête et de réponse pour les types de charge utile suivants :

| Type de charge utile | Version minimale de l'image Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON| v2.2.2|

## Prise en charge des versions d'Istio{#istio-version-support}

### Versions d'Envoy prises en charge{#supported-envoy-versions}

Le plan de données d'Istio est basé sur Envoy. Le tableau suivant présente la relation entre les versions d'Istio et leurs branches de publication Envoy correspondantes :

| Version d'Istio| Branche de publication Envoy|
|---------------|----------------------|
| 1.26.x        | release/v1.34        |
| 1.25.x        | release/v1.33        |
| 1.24.x        | release/v1.32        |

Vous pouvez trouver plus d'informations sur la relation entre les versions d'Istio et d'Envoy dans la [documentation Istio][1].

### Prise en charge de la version d'Envoy {#envoy-version-support}

L'intégration Datadog Envoy pour la protection des applications et des API repose sur des fonctionnalités qui pourraient ne pas être présentes dans toutes les versions d'Envoy. Le tableau suivant indique quelles versions d'Envoy prennent en charge chaque fonctionnalité.

| Fonctionnalité | Version minimale d'Envoy |
|---------|-----------------------|
| Filtre de traitement externe | v1.27.0 |
| Mode d'observabilité | v1.30.0 |

## Support de l'intégration Datadog Istio{#datadog-istio-integration-support}

Seules la version Linux et les architectures arm64 et arm64 sont prises en charge.

<div class="alert alert-info">Si vous souhaitez voir la prise en charge ajoutée pour l'une des
Les fonctionnalités non prises en charge, faites-le-nous savoir ! Remplissez <a
href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour envoyer
des détails</a>.</div>

[1]: https://istio.io/latest/docs/releases/supported-releases/#supported-envoy-versions