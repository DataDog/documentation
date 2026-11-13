---
description: Configurez le contrôle d'accès basé sur les rôles (RBAC) pour les monitors
  afin de limiter les autorisations de modification à des rôles spécifiques et d'empêcher
  les modifications non autorisées.
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: Documentation
  text: En savoir plus sur les autorisations RBAC pour les monitors
- link: /api/latest/monitors/#create-a-monitor
  tag: Documentation
  text: En savoir plus sur la création de monitors restreints via l'API
- link: /monitors/configuration/#permissions
  tag: Documentation
  text: En savoir plus sur la création de monitors restreints via l'interface
title: Configuration du RBAC pour les monitors
---
## Présentation {#overview}

Les monitors alertent vos équipes des problèmes potentiels liés à vos systèmes. S'assurer que seuls les utilisateurs autorisés peuvent modifier vos monitors permet d'éviter les modifications accidentelles des configurations de vos monitors.

Pour gérer en toute sécurité chacun de vos monitors, vous pouvez octroyer uniquement à certains rôles des autorisations de modification.

## Configurez les rôles {#set-up-roles}

Pour en savoir plus sur les rôles par défaut et les rôles personnalisés, et découvrir la procédure à suivre pour créer des rôles personnalisés, octroyer des autorisations à des rôles et attribuer des rôles à des utilisateurs, consultez la section [Contrôle d'accès basé sur les rôles (RBAC)][1].

## Restreignez l'accès aux monitors {#restrict-access-to-monitors}

{{< tabs >}}

{{% tab "IU" %}}

1. Accédez à la page de modification du monitor en créant un nouveau monitor ou en modifiant un monitor existant.
2. En bas du formulaire, spécifiez quels rôles, en plus du créateur, sont autorisés à modifier le monitor.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="Monitor restreint par RBAC" >}}

Pour en savoir plus, consultez la documentation relative aux [autorisations des monitors][1].

[1]: /fr/monitors/configuration/#permissions
{{% /tab %}}

{{% tab "API" %}}

Utilisez l'[endpoint API Énumérer les rôles][1] pour obtenir la liste des rôles et des ID associés.

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>'
```

```bash
{
    "meta": {
        "page": {
            "total_filtered_count": 4,
            "total_count": 4
        }
    },
    "data": [
        {
            "type": "roles",
            "id": "89f5dh86-e470-11f8-e26f-4h656a27d9cc",
            "attributes": {
                "name": "Corp IT Eng - User Onboarding",
                "created_at": "2018-11-05T21:19:54.105604+00:00",
                "modified_at": "2018-11-05T21:19:54.105604+00:00",
                "user_count": 4
            },
            "relationships": {
                "permissions": {
                    "data": [
                        {
                            "type": "permissions",
                            "id": "984d2rt4-d5b4-13e8-a5yf-a7f560d33029"
                        },
                        ...
                    ]
                }
            }
        },
        ...
    ]
}
```

Utilisez l'endpoint d'API [Create][2] ou [Edit a monitor][3] et le paramètre `restricted_roles` pour limiter la modification des monitors à un ensemble spécifique de rôles et au créateur du monitor. 

**Remarque :** Vous pouvez spécifier un ou plusieurs UUID de rôle. Définir `restricted_roles` sur `null` autorise la modification des monitors pour tous les utilisateurs disposant des [Monitor Write permissions][4].

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <DD-API-KEY>' \
--header 'DD-APPLICATION-KEY: <DD-APPLICATION-KEY>' \
--data-raw '{
  "message": "You may need to add web hosts if this is consistently high.",
  "name": "Bytes received on host0",
  "options": {
    "no_data_timeframe": 20,
    "notify_no_data": true
  },
  "query": "avg(last_5m):sum:system.net.bytes_rcvd{host:host0} \u003e 100",
  "tags": [
    "app:webserver",
    "frontend"
  ],
  "type": "query alert",
  "restricted_roles": ["89f5dh86-e470-11f8-e26f-4h656a27d9cc"]
}'
```

Pour en savoir plus, consultez les sections [Rôles][5] et [Monitors][6] de la documentation sur l'API.


[1]: /fr/api/latest/roles/#list-roles
[2]: /fr/api/latest/monitors/#create-a-monitor
[3]: /fr/api/latest/monitors/#edit-a-monitor
[4]: /fr/account_management/rbac/permissions/#monitors
[5]: /fr/api/latest/roles/
[6]: /fr/api/latest/monitors/
{{% /tab %}}
{{< /tabs >}}

## Rôles restreints {#restricted-roles}

Datadog permet de restreindre la modification des monitors à des rôles spécifiques grâce à l'option de restriction de rôle. Cela vous donne la flexibilité de définir quels utilisateurs sont autorisés à modifier les monitors.

### API {#api}

Vous pouvez mettre à jour la définition des monitors gérés via l'API ou Terraform en utilisant le paramètre `restricted_roles`. Vous pouvez également utiliser l'endpoint [Restriction Policies][4] pour définir les règles de contrôle d'accès d'un monitor, en associant un ensemble de relations (telles que editor et viewer) à un ensemble d'entités autorisées (telles que des rôles, des équipes ou des utilisateurs). La politique de restriction détermine qui est autorisé à effectuer quelles actions sur le monitor.

Les monitors prennent en charge les relations `viewer`, `muter` et `editor`. La relation `muter`, qui accorde uniquement le droit de mettre un monitor en sourdine, est en Preview. Une politique qui lie la relation `muter` doit également lier la relation `editor`, et chaque entité ne peut détenir qu'une seule relation par politique. Le paramètre `restricted_roles` contrôle uniquement l'accès en modification ; pour accorder uniquement le droit de mettre un monitor en sourdine, utilisez une politique de restriction. Pour plus d'informations, consultez [Niveaux d'accès][5].

Pour plus d'informations, consultez [Edit a monitor API endpoint][3] et [Restriction Policies API][4].

### UI {#ui}

Tous les nouveaux monitors créés depuis l'UI utilisent le paramètre `restricted_roles`. 
Tous les monitors affichent également l'option de restriction par rôle, quel que soit le mécanisme sous-jacent :

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="Monitor non restreint par RBAC" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /fr/api/latest/monitors/#edit-a-monitor
[4]: /fr/api/latest/restriction-policies/
[5]: /fr/monitors/configuration/#access-levels