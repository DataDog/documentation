---
title: Configuration des filtres de sécurité à l'aide de l'API Security Monitoring
kind: guide
aliases:
  - /fr/security_monitoring/guide/how-to-setup-security-filters-using-security-monitoring-api/
---
## Présentation

La solution Security Monitoring vous permet d'analyser vos logs ingérés afin de détecter en temps réel les menaces. Ainsi, vous pouvez associer vos logs aux renseignements sur les menaces, ou appliquer des [règles de sécurité][1] pour détecter toute attaque ou anomalie.

Les logs analysés sont facturés en fonction du nombre total de gigaoctets ingérés et analysés par le service Security Monitoring Datadog. Par défaut, cette solution analyse tous vos logs ingérés, afin de maximiser les capacités de détection. Toutefois, avec l'[API Security Monitoring][2], vous pouvez configurer par programmation des filtres de sécurité, afin de définir le sous-ensemble de logs ingérés à analyser.

Les scénarios suivants sont abordés dans ce guide :

* [Configurer le filtre de sécurité par défaut pour exclure certains logs](ajouter-une-exclusion-au-filtre-de-securite-par-defaut)
* [Créer des filtres de sécurité personnalisés pour spécifier les sources de logs à analyser](#creer-un-filtre-de-securite-personnalise)

## Prérequis

* Pour utiliser l'API, il est nécessaire de disposer de la clé d'API et de la clé d'application **d'un utilisateur admin**. Ces informations sont disponibles sur la [page des clés API de votre compte Datadog][3]. Remplacez `<CLÉ_API_DATADOG>` et `<CLÉ_APPLICATION_DATADOG>` par votre clé d'API et votre clé d'application Datadog.

* Ce guide contient des exemples `curl`. Si vous ne l'avez pas déjà fait, installez [curl][4]. Sinon, consultez la [documentation sur les API][2] pour découvrir des exemples dans d'autres langages pour cet endpoint d'API.

## Scénarios

### Ajouter une exclusion au filtre de sécurité par défaut

Par défaut, vous disposez d'un filtre de sécurité capable d'analyser tous les logs ingérés : `all ingested logs`, avec la requête `*`. Vous pouvez personnaliser ce filtre en ajoutant une exclusion, afin d'exclure un sous-ensemble de logs en fonction de leurs tags. Pour ce faire, récupérez d'abord la liste des filtres de sécurité, afin d'obtenir l'`id` du filtre.

**Appel d'API :**

```bash
curl -L -X GET 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <CLÉ_API_DATADOG>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>'
```

**Réponse :**

```json
{
    "data": [
        {
            "attributes": {
                "is_enabled": true,
                "is_builtin": true,
                "name": "all ingested logs",
                "filtered_data_type": "logs",
                "exclusion_filters": [],
                "version": 1,
                "query": "*"
            },
            "type": "security_filters",
            "id": "l6l-rmx-mqx"
        }
    ]
}
```

Dans cet exemple, l'`id` du filtre est `"l6l-rmx-mqx"`. Vous pouvez ensuite modifier ce filtre pour ajouter une exclusion, par exemple afin d'exclure tous les logs avec le tag `env:staging`.

**Remarque** : `version` indique la version actuelle du filtre que vous souhaitez modifier.

**Appel d'API :**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <CLÉ_API_DATADOG>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>' \
--data-raw '{
    "data": {
        "attributes": {
             "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 1
        },
        "type": "security_filters"
    }
}'
```

**Réponse :**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 2,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

### Créer un filtre de sécurité personnalisé

Vous pouvez également créer des filtres de sécurité personnalisés, afin de limiter l'analyse à certains logs de votre choix. Par exemple, il est possible d'analyser les logs d'AWS Cloudtrail en appliquant un filtre qui renvoie uniquement les logs avec le tag `source:cloudtrail`.

**Appel d'API :**

```bash
curl -L -X POST 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <CLÉ_API_DATADOG>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>' \
--data-raw '{
    "data": {
        "type": "security_filters",
        "attributes": {
            "is_enabled": true,
            "name": "cloudtrail",
            "exclusion_filters": [],
            "filtered_data_type": "logs",
            "query": "source:cloudtrail"
        }
    }
}'
```

**Réponse :**

```json
{
    "data": {
        "attributes": {
            "is_enabled": true,
            "is_builtin": false,
            "name": "cloudtrail",
            "filtered_data_type": "logs",
            "exclusion_filters": [],
            "version": 1,
            "query": "source:cloudtrail"
        },
        "type": "security_filters",
        "id": "qa6-tzm-rp7"
    }
}
```

Les filtres de sécurité sont inclusifs. Ainsi, un log est analysé **s'il correspond au moins à l'un des filtres de sécurité**. Si vous souhaitez définir un sous-ensemble de logs à analyser, il est donc recommandé de commencer par désactiver le filtre intégré par défaut, `all ingested logs`. Pour ce faire, définissez l'attribut `is_enabled` sur `false`, tel que suit :

**Appel d'API :**

```bash
curl -L -X PATCH 'https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/security_monitoring/configuration/security_filters/l6l-rmx-mqx' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <CLÉ_API_DATADOG>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DATADOG>' \
--data-raw '{
    "data": {
        "attributes": {
            "is_enabled": false,
            "version": 2
        },
        "type": "security_filters"
    }
}'
```

**Réponse :**

```json
{
    "data": {
        "attributes": {
            "is_enabled": false,
            "is_builtin": true,
            "name": "all ingested logs",
            "filtered_data_type": "logs",
            "exclusion_filters": [
                {
                    "query": "env:staging",
                    "name": "exclude env:staging"
                }
            ],
            "version": 3,
            "query": "*"
        },
        "type": "security_filters",
        "id": "l6l-rmx-mqx"
    }
}
```

## Tags et attributs clés pour la sécurité

Si vous souhaitez analyser uniquement certaines catégories explicites de logs, assurez-vous de ne pas exclure des logs qui contiennent des utilisateurs et entités importantes d'un point de vue sécurité, ou encore des sources de logs de sécurité clés. Vous trouverez ci-dessous quelques exemples utiles.

**Utilisateurs et entités clés**

| Nom                  | Requête                                            |
| --------------------- |--------------------------------------------------|
| Tous les événements avec un nom      | `@evt.name:*`                                    |
| Toutes les adresses IP client        | `@network.client.ip:*`                           |
| Toutes les adresses IP de destination   | `@network.destination.ip:*`                      |
| Tous les utilisateurs             | `@usr.id:* OR @usr.name:* @usr.email:*`          |
| Tous les hosts             | `host:* OR instance-id:*`                        |

**Sources de sécurité clés**

| Nom                  | Requête                                            |
| --------------------- |--------------------------------------------------|
| Logs de sécurité AWS     | `source:(cloudtrail OR guardduty OR route53)`    |
| Logs réseau AWS      | `source:(vpc OR waf OR elb OR alb)`              |
| Logs GCP              | `source:gcp*`                                    |
| Logs Azure            | `source:azure*`                                  |
| Logs d'audit Kubernetes | `source:kubernetes.audit`                        |
| Logs de fournisseur d'identité| `source:(okta OR gsuite OR auth0)`               |
| Logs de CDN              | `source:(cloudfront OR cloudflare OR fastly)`    |
| Logs de serveur Web       | `source:(nginx* OR apache OR iis)`               |

[1]: /fr/security_platform/detection_rules/security_monitoring
[2]: /fr/api/latest/security-monitoring/#get-all-security-filters
[3]: /fr/api/v1/authentication/
[4]: https://curl.haxx.se/download.html