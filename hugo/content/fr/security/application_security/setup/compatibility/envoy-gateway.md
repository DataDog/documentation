---
code_lang: envoy-gateway
code_lang_weight: 40
title: Exigences de compatibilité d'Envoy Gateway
type: multi-code-lang
---
Le tableau suivant répertorie les fonctionnalités de protection des applications et des API pour l'intégration d'Envoy Gateway en fonction de la version spécifiée de l'image Datadog External Processor :

| Fonctionnalité de protection des applications et des API              | Version minimale de l'image Datadog External Processor  |
|------------------------------------------------|---------------------------------------------------|
| Détection des menaces                               | v2.4.0                                            |
| Protection contre les menaces                              | v2.4.0                                            |
| Personnalisation de la réponse aux requêtes bloquées         | v2.4.0                                            |
| Mode asynchrone non bloquant (observabilité) | non pris en charge                                     |
| Sécurité des API                                   | v2.4.0                                            |
| Protection autonome des applications et des API              | v2.4.0                                            |
| Suivi automatique des événements d'activité utilisateur         | non pris en charge                                     |

### Prise en charge du traitement du corps {#body-processing-support}

Le service Datadog External Processor prend en charge le traitement des corps de requête et de réponse pour les types de charge utile suivants :

| Type de charge utile | Version minimale de l'image Datadog External Processor  |
|--------------|---------------------------------------------------|
| JSON         | v2.4.0                                            |

## Prise en charge de la version d'Envoy Gateway {#envoy-gateway-version-support}

### Versions d'Envoy Gateway prises en charge {#supported-envoy-gateway-versions}

Envoy Gateway repose sur Envoy Proxy et l'API Gateway, et s'exécute au sein d'un cluster Kubernetes. Datadog prend uniquement en charge les versions non‑EOL d'Envoy Gateway ; consultez la [matrice de compatibilité officielle d'Envoy Gateway][1] pour obtenir la liste actuelle des versions et des dépendances amont prises en charge (Envoy Proxy, Gateway API, Kubernetes).


### Prise en charge de la version d'Envoy {#envoy-version-support}

L'intégration Datadog Envoy pour la protection des applications et des API repose sur des fonctionnalités qui pourraient ne pas être présentes dans toutes les versions d'Envoy. Le tableau suivant indique quelles versions d'Envoy prennent en charge chaque fonctionnalité.

| Fonctionnalité | Version minimale d'Envoy |
|---------|-----------------------|
| Filtre de traitement externe | v1.27.0 |
| Mode d'observabilité | v1.30.0 |

## Prise en charge de l'intégration de Datadog Envoy Gateway {#datadog-envoy-gateway-integration-support}

Seule la version Linux et les architectures amd64 et arm64 sont prises en charge.

<div class="alert alert-info">Si vous souhaitez voir la prise en charge ajoutée pour l'une des
Les fonctionnalités non prises en charge, faites-le-nous savoir ! Remplissez <a
href="https://forms.gle/gHrxGQMEnAobukfn7">ce court formulaire pour envoyer
des détails</a>.</div>

[1]: https://gateway.envoyproxy.io/news/releases/matrix/