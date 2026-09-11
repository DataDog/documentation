---
further_reading:
- link: /account_management/rbac/permissions/#monitors
  tag: Documentation
  text: En savoir plus sur les autorisations RBAC pour les monitors
- link: /api/latest/monitors/#creer-un-monitor
  tag: Documentation
  text: En savoir plus sur la création de monitors restreints via l'API
- link: /monitors/notify/#autorisations
  tag: Documentation
  text: En savoir plus sur la création de monitors restreints via l'interface

title: Configuration du RBAC pour les monitors
---

## Présentation

Les monitors envoient des alertes à vos équipes lorsque vos systèmes rencontrent des problèmes potentiels. Il est important de vous assurer que seuls les utilisateurs autorisés peuvent modifier vos monitors, afin d'éviter tout changement accidentel de leur configuration. 

Pour gérer en toute sécurité chacun de vos monitors, vous pouvez octroyer uniquement à certains rôles des autorisations de modification.

## Configurer des rôles

Pour en savoir plus sur les rôles par défaut et les rôles personnalisés, et découvrir la procédure à suivre pour créer des rôles personnalisés, octroyer des autorisations à des rôles et attribuer des rôles à des utilisateurs, consultez la section [Contrôle d'accès à base de rôles (RBAC)][1].

## Restreindre l'accès aux monitors

{{< tabs >}}

{{% tab "Interface" %}}

1. Créez un monitor ou modifiez-en un pour accéder à la page de modification.
2. Spécifiez en bas de la page les rôles qui pourront, en plus du créateur, modifier le monitor.

{{< img src="/monitors/guide/monitor_rbac_restricted.jpg" alt="Monitor avec une restriction RBAC" >}}

Pour en savoir plus, consultez la documentation relative aux [autorisations des monitors][1].

[1]: /fr/monitors/notify/#permissions
{{% /tab %}}

{{% tab "API" %}}

Utilisez l'[endpoint API Énumérer les rôles][1] pour obtenir la liste des rôles et des ID associés.

```bash
curl --request GET 'https://api.datadoghq.com/api/v2/roles' \
--header 'DD-API-KEY: <CLÉ_API_DD>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DD>'
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
                "name": "IT entreprise FR - Intégration d'utilisateurs",
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

Utilisez l'endpoint API [Créer un monitor][2] ou [Modifier un monitor][3] ainsi que le paramètre `restricted_roles` pour autoriser uniquement un ensemble précis de rôles et le créateur du monitor à modifier ce dernier.

**Remarque** : vous pouvez spécifier un ou plusieurs UUID de rôle. Si vous définissez `restricted_roles` sur `null`, tous les utilisateurs disposant de l'[autorisation monitor_write][4] pourront modifier le monitor.

```bash
curl --location --request POST 'https://api.datadoghq.com/api/v1/monitor' \
--header 'Content-Type: application/json' \
--header 'DD-API-KEY: <CLÉ_API_DD>' \
--header 'DD-APPLICATION-KEY: <CLÉ_APPLICATION_DAD>' \
--data-raw '{
  "message": "Si cette valeur demeure élevée, vous devrez peut-être ajouter des hosts Web.",
  "name": "Octets reçus sur host0",
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

## Déverrouiller des monitors et restreindre leur modification à certains rôles

Avant que Datadog n'implémente la fonctionnalité de restriction des modifications des monitors basée sur les rôles, il pouvait être utile de verrouiller des monitors. Seuls le créateur du monitor et les utilisateurs disposant du [rôle Admin Datadog][2] peuvent modifier un monitor verrouillé.

{{< img src="/monitors/guide/monitor_rbac_locked.jpg" alt="Monitor avec verrouillage RBAC" style="width:70%;">}}

La fonctionnalité de verrouillage des monitors est désormais obsolète. Datadog vous conseille d'utiliser la restriction basée sur les rôles, afin de pouvoir définir avec plus de flexibilité les utilisateurs autorisés à modifier des monitors.

Les monitors verrouillés sont toujours pris en charge : il est donc possible que votre organisation en utilise toujours. Seuls les utilisateurs disposant du [rôle Admin Datadog][2] et le créateur peuvent modifier un monitor verrouillé.

Les sections suivantes détaillent la marche à suivre pour supprimer le verrouillage des monitors et adopter une restriction basée sur les rôles. La procédure varie en fonction de la façon dont vous gérez vos monitors.

### API

Bien qu'il soit désormais obsolète, le paramètre `locked` servant à verrouiller les monitors est toujours pris en charge. Vous pouvez donc modifier la définition de vos monitors gérés via l'API ou Terraform afin de remplacer le paramètre `locked` par `restricted_roles`, pour bénéficier de la nouvelle fonctionnalité de restriction basée sur les rôles.

Pour en savoir plus sur la modification des définitions de vos monitors, consultez la documentation relative au [endpoint API Modifier un monitor][3] et la section [Options de l'API Monitor][4].

### Interface

Tous les monitors créés depuis l'interface utilisent désormais le paramètre `restricted_roles`. Ils indiquent également l'option de restriction basée sur les rôles, et ce peu importe le mécanisme sous-jacent :

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="Monitor sans restriction RBAC" >}}

Dès qu'un monitor est enregistré, Datadog modifie sa définition de façon à remplacer l'ancien mécanisme de verrouillage par la nouvelle restriction basée sur les rôles.

Les instructions ci-dessous vous permettent de déterminer la procédure à suivre si vous devez enregistrer un monitor qui repose sur le mécanisme de verrouillage.

#### Monitors verrouillés (avec `locked:true`) et modifiés par le créateur ou par un utilisateur avec le rôle Admin Datadog

Si le créateur ou un utilisateur disposant du [rôle Admin Datadog][2] modifie un monitor verrouillé, l'avertissement suivant s'affiche :

```
This monitor is using the locked attribute: only its creator and admins can edit it. locked is deprecated in favor of restricted_roles. On save, the monitor will be automatically updated to use a restricted_roles attribute set to all roles with Admin permissions. 
If there is no specific change you want to apply to this monitor’s permissions, click Save. If you want to update this monitor’s permissions, read this doc.
```

Lorsque ce monitor est enregistré, sa définition est modifiée de façon à autoriser les modifications de la part de tous les utilisateurs disposant du rôle Admin. La procédure à suivre lorsque cet avertissement s'affiche varie selon les modifications que vous souhaitez apporter à votre monitor :

**1. Vous ne souhaitez pas du tout modifier les autorisations de votre monitor**

Enregistrez le monitor. Datadog remplace alors automatiquement le mécanisme de verrouillage par la restriction basée sur les rôles. Toutes les autres modifications que vous apportez au monitor, par exemple un changement de seuil ou de message, sont enregistrées simultanément.

Pour modifier la configuration de votre monitor, vous pouvez également vous contenter de cliquer sur **Save**, sans apporter le moindre changement.

**2. Vous souhaitez que tous les utilisateurs puissent modifier ce monitor**

Enregistrez le monitor, afin que Datadog active la restriction basée sur les rôles, puis rouvrez la page de modification. Supprimez ensuite tous les rôles depuis le menu déroulant **Restrict editing of this monitor to**. Enfin, cliquez à nouveau sur **Save**.

**3. Vous souhaitez autoriser uniquement certains rôles avec les autorisations Admin à modifier le monitor**

Sélectionnez les rôles de votre choix depuis le menu déroulant **Restrict editing of this monitor to**, puis enregistrez le monitor. Seuls les rôles que vous avez sélectionnés pourront modifier le monitor.

#### Monitors verrouillés (avec `locked:true`) et modifiés par une personne autre que le créateur et sans le rôle Admin Datadog

Si une personne autre que le créateur et ne disposant pas du [rôle Admin Datadog][2] modifie un monitor verrouillé, l'avertissement suivant s'affiche :

```
This monitor is locked: only its creator and admins can edit it. Read more here.
```

Cela signifie que ce monitor est verrouillé. Cette personne doit donc contacter un utilisateur disposant du [rôle Admin Datadog][2] ou le créateur du monitor afin de lui demander d'ajouter un de ses rôles aux paramètres de restriction du monitor. L'administrateur doit suivre l'étape 2 ou l'étape 3 de la section ci-dessus relative aux [monitors verrouillés](#monitors-verrouilles-avec-lockedtrue-et-modifies-par-le-createur-ou-par-un-utilisateur-avec-le-role-admin-datadog).

**Remarque** : l'avertissement et l'option n'indiquent pas les mêmes choses, ce qui est normal. L'avertissement présente l'état actuel du monitor utilisant le paramètre de verrouillage. À l'inverse, l'option correspond à la restriction basée sur les rôles qui sera activée une fois le monitor modifié et enregistré par un utilisateur disposant du [rôle Admin Datadog][2] ou par le créateur. Après l'enregistrement du monitor, l'avertissement disparaît et les rôles autorisés à modifier le monitor sont ajoutés à la liste déroulante.

#### Monitors non verrouillés (avec `locked:false`, `locked:null` ou un paramètre `locked` non défini)

Si une personne modifie un monitor non verrouillé et que le message suivant s'affiche :

{{< img src="/monitors/guide/monitor_rbac_non_restricted.jpg" alt="Monitor sans restriction RBAC" >}}

La procédure à suivre varie selon selon les modifications que vous souhaitez apporter à votre monitor :

**1. Vous ne souhaitez pas du tout modifier les autorisations de votre monitor**

Enregistrez le monitor. Datadog remplace alors automatiquement le mécanisme de verrouillage par la restriction basée sur les rôles. Toutes les autres modifications que vous apportez au monitor, par exemple un changement de seuil ou de message, sont enregistrées simultanément.

Pour modifier la configuration de votre monitor, vous pouvez également vous contenter de cliquer sur **Save**, sans apporter le moindre changement.

**2. Vous souhaitez autoriser uniquement certains rôles à modifier votre monitor**

Sélectionnez les rôles de votre choix depuis le menu déroulant **Restrict editing of this monitor to**, puis enregistrez le monitor. Seuls les rôles que vous avez sélectionnés pourront modifier le monitor.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/
[2]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[3]: /fr/api/latest/monitors/#edit-a-monitor
[4]: /fr/monitors/guide/monitor_api_options/#permissions-options