---
description: Comment utiliser l'API pour configurer les paramètres de la liste d'autorisation
  de domaines afin de restreindre les domaines de messagerie pouvant recevoir des
  notifications Datadog pour les monitor et les rapports planifiés.
further_reading:
- link: https://app.datadoghq.com/organization-settings/domain-allowlist
  tag: Dans l'application
  text: Liste d'autorisations pour les domaines
- link: /account_management/org_settings/domain_allowlist
  tag: Documentation
  text: Interface utilisateur de la liste des domaines autorisés
title: API de liste d'autorisation de domaines
---

{{< callout url="/help/" header="Commencer avec la liste d'autorisation de domaines" >}}
  La liste d'autorisation de domaines est disponible pour les clients disposant d'un plan Enterprise. Si vous êtes intéressé par cette fonctionnalité, contactez l'assistance Datadog pour demander l'accès.
{{< /callout >}}

La [liste d'autorisation de domaines][1] vous permet de restreindre les domaines de messagerie auxquels les notifications peuvent être envoyées.

Ce document décrit comment accéder à la liste d'autorisation de domaines et la configurer via l'API. Pour utiliser l'interface utilisateur à la place, consultez la [liste d'autorisation de domaines][1].

## Obtenir la liste d'autorisation de domaines

Renvoyez la liste d'autorisation de domaines et son état activé ou désactivé.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">GET</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### Requête

#### Exemple

```bash
curl -X GET "https://api.datadoghq.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}"
```

### Réponse

{{< tabs >}}
{{% tab "200" %}}

OK

#### Modèle

| Champ | Type | Rôle |
| :----- | :---- | :----------- |
| données | objet | Données de messagerie de la liste d'autorisation de domaines |
| data.type | enum | Type de liste d'autorisation de domaines. Valeurs énumérées autorisées : `domain_allowlist`. Par défaut : `domain_allowlist`.|
| data.attributes | objet | Attributs de la liste d'autorisation de domaines |
| data.attributes.enabled | Booléen | Si `true`, la liste d'autorisation de domaines est activée |
| data.attributes.domains | [string] | Liste des domaines dans la liste d'autorisation de domaines |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{< /tabs >}}

#### Exemple

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@aol.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Modifier la liste d'autorisation d'un domaine

Activez ou désactivez la liste d'autorisation de domaines et réécrivez entièrement la liste avec une liste donnée de domaines de messagerie.

<span style="padding:3px" class="font-semibold text-api-get bg-bg-api-get">PATCH</span>
https://api.datadoghq.com/api/v2/domain_allowlist

### Requête

#### Exemple

```bash
curl -X PATCH "https://api.datadog.com/api/v2/domain_allowlist" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
-d @- << EOF

{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}

EOF
```

### Réponse

{{< tabs >}}
{{% tab "200" %}}

OK

#### Modèle

| Champ | Type | Rôle |
| :----- | :---- | :----------- |
| données | objet | Données de messagerie de la liste d'autorisation de domaines |
| data.type | enum | Type de liste d'autorisation de domaines. Valeurs énumérées autorisées : `domain_allowlist`. Par défaut : `domain_allowlist`.|
| data.attributes | objet | Attributs de la liste d'autorisation de domaines |
| data.attributes.enabled | Booléen | Si `true`, la liste d'autorisation de domaines est activée |
| data.attributes.domains | [string] | Liste des domaines dans la liste d'autorisation de domaines |

{{% /tab %}}
{{% tab "403" %}}

Forbidden

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{% tab "404" %}}

Not Found

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{% tab "429" %}}

Too many requests

#### Modèle

| Champ | Type | Rôle |
| ----- | ---- | ----------- |
| errors \[_required_\] | [string] | Liste des erreurs |

{{% /tab %}}
{{< /tabs >}}

#### Exemple

```js
{
  "data": {
    "type": "domain_allowlist",
    "attributes": {
      "enabled": true,
      "domains": [
        "@datadoghq.com",
        "@yahoo.com",
        "@gmail.com"
      ]
    }
  }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/org_settings/domain_allowlist