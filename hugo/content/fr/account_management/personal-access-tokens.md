---
aliases:
- /fr/account_management/faq/personal-access-tokens/
description: Créez et gérez des jetons d'accès personnels à durée de vie limitée et
  à portée définie pour authentifier les appels de Datadog API sans avoir à associer
  de clés d'API et d'application.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: Blog
  text: Modernisez l’authentification à la Datadog API avec des identifiants à portée
    définie.
title: Jetons d'accès personnels
---
## Présentation {#overview}

Les jetons d'accès personnels (PATs) sont un type d'identifiant qui authentifie les appels de Datadog API. Contrairement aux clés d'application, les PAT n'ont pas besoin d'être associés à une clé d'API. Ils sont à durée de vie limitée et à portée définie par défaut, ce qui vous donne un contrôle plus strict sur ce à quoi chaque jeton peut accéder et sur sa durée de validité.

Avec les PATs, vous pouvez :
- Authentifier les appels d'API avec un identifiant unique.
- Appliquez le principe du moindre privilège en sélectionnant uniquement les portées dont votre workflow a besoin.
- Limitez l'impact d'une fuite d'identifiants grâce à des valeurs de durée de vie (TTL) obligatoires. Les jetons expirés sont automatiquement révoqués, de sorte que les identifiants inactifs ne persistent pas indéfiniment.
- Séparez les préoccupations en réservant les clés d'API à la soumission de télémétrie (Agent, logs, métriques) et utilisez les PAT pour tous les autres appels d'API web.

### Comparaison des PAT avec d'autres types d'identifiants {#pats-compared-to-other-credential-types}

| | Jetons d'accès personnels | Jetons d'accès de service | Clés d'application |
|---|---|---|---|
| Authentification autonome | Oui ; aucune association de clé d'API nécessaire | Oui ; aucune association de clé d'API nécessaire | Non ; nécessite une clé d'API |
| À portée définie par défaut | Oui ; les portées sont obligatoires | Oui ; les portées sont obligatoires | Optionnel ; sans portée par défaut |
| Durée de vie (TTL) | Obligatoire (24 heures à un an) | Optionnel ; peut être à longue durée de vie | Aucune expiration |
| Préfixe identifiable | `ddpat_` | `ddsat_` | `ddapp_` (nouveau) |
| Lié à | Utilisateur individuel | Compte de service | Utilisateur individuel ou compte de service |

Pour les jetons d'accès de service, consultez [Service Access Tokens][7].

## Prérequis {#prerequisites}

- Un compte utilisateur Datadog avec l'autorisation `user_app_keys`
- L'autorisation `org_app_keys_write` si vous souhaitez gérer les PATs pour d'autres utilisateurs de l'organisation

## Créer un jeton d'accès personnel {#create-a-personal-access-token}

1. Accédez à [**Paramètres personnels** > **Jetons d'accès**][1].
2. Cliquez sur {{< ui >}}+ New Access Token{{< /ui >}}.
3. Saisissez un {{< ui >}}Name{{< /ui >}} pour le jeton.
4. Sélectionnez une {{< ui >}}Expiration Date{{< /ui >}}. La durée d'expiration minimale est de 24 heures et la durée maximale est d'un an à compter de la création.
5. Cliquez sur {{< ui >}}Select Scopes{{< /ui >}} pour choisir les portées qui définissent ce à quoi ce jeton peut accéder. Au moins un périmètre est requis. Accordez uniquement les autorisations requises par votre workflow, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">Datadog affiche le secret du jeton une seule fois au moment de la création. Copiez-le et stockez-le en toute sécurité. Vous ne pourrez pas le récupérer ultérieurement.</div>

## Utilisez un jeton d'accès personnel {#use-a-personal-access-token}

Les PATs prennent en charge deux méthodes d'authentification.

### En-tête d'autorisation (recommandé) {#authorization-header-recommended}

Transmettez le PAT en tant que jeton Bearer dans l'en-tête `Authorization`. Cette méthode ne nécessite pas de clé d'API :

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_PAT>"
```

### En-tête de clé d'application {#application-key-header}

Transmettez le PAT dans l'en-tête `dd-application-key`. Ceci est utile pour migrer des intégrations existantes qui utilisent déjà le format d'en-tête de clé d'application :

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_PAT>"
```

**Remarque :** Lorsqu'un PAT valide est fourni dans l'en-tête `dd-application-key`, Datadog s'authentifie uniquement avec le PAT. L'en-tête `dd-api-key` est facultatif et sa valeur n'est pas évaluée.

## Restrictions sur les appels d'API authentifiés par PAT {#restrictions-on-pat-authenticated-api-calls}

Pour empêcher l'élévation de privilèges, Datadog restreint ce qu'un appel d'API authentifié avec un PAT peut faire. Ces restrictions s'appliquent quel que soit le client API effectuant l'appel :

- **Clés d'application** : un PAT ne peut pas créer ou mettre à jour des clés d'application. La révocation des clés d'application est autorisée.
- **Portées sur les nouveaux jetons** : un PAT ne peut créer ou mettre à jour un PAT ou un SAT que si les portées du nouveau jeton sont un sous-ensemble de ses propres portées.
- **Durée de vie (TTL) sur les nouveaux jetons** : un PAT ne peut pas créer un PAT ou un SAT avec une durée de vie qui dépasse sa propre expiration.

Un appel qui enfreint l'une de ces restrictions renvoie une réponse `403 Forbidden`.

## Gérer les jetons d'accès personnels {#manage-personal-access-tokens}

### Voir vos jetons{#view-your-tokens}

Accédez à [**Paramètres personnels** > **Jetons d'accès**][1] pour voir tous les PATs associés à votre compte, y compris leurs noms, portées, dates d'expiration et informations sur la dernière utilisation.

Après la création d'un jeton, un panneau de détails affiche le secret du jeton, son nom, l'ID du jeton, le propriétaire, les portées et la date d'expiration. Depuis ce panneau, vous pouvez également modifier ou révoquer le jeton.

{{< img src="account_management/personal-access-tokens/pat-details.png" alt="Détails du jeton d'accès personnel affichant le secret du jeton, son nom, l'ID du jeton, le propriétaire, les portées et l'expiration" style="width:60%;" >}}

### Gérer les jetons en tant qu'administrateur {#manage-tokens-as-an-administrator}

Les administrateurs d'organisation disposant des autorisations `org_app_keys_read` et `org_app_keys_write` peuvent afficher et gérer les PATs pour tous les utilisateurs de l'organisation à partir de [**Paramètres de l'organisation** > **Jetons d'accès**][2].

{{< img src="account_management/personal-access-tokens/pat-admin.png" alt="Les administrateurs d'organisation peuvent afficher et gérer tous les PATs à partir des Paramètres de l'organisation" style="width:80%;" >}}


### Révoquer un jeton {#revoke-a-token}

1. Accédez à [**Paramètres personnels** > **Jetons d'accès**][1], ou [**Paramètres de l'organisation** > **Jetons d'accès**][2] pour les administrateurs.
2. Passez la souris sur le jeton que vous souhaitez révoquer et cliquez sur l'icône {{< ui >}}Revoke Token{{< /ui >}}.

Les jetons révoqués ne peuvent plus authentifier les appels d'API. La révocation prend effet en quelques secondes.

### Modifier un jeton {#edit-a-token}

Vous pouvez mettre à jour le nom et les portées d'un PAT existant. Vous ne pouvez pas modifier la durée de vie (TTL) après la création. Pour modifier la durée de vie, révoquez le jeton existant et créez un jeton avec la configuration souhaitée.

## Format du jeton {#token-format}

Les PATs utilisent un format identifiable qui prend en charge l'analyse des secrets et la gestion des clés :

```
ddpat_<ALIAS>_<SECRET><CHECKSUM>
```

| Composant | Description |
|-----------|-------------|
| `ddpat_` | Préfixe identifiant le credential en tant que jeton d'accès personnel |
| `<ALIAS>` | Identifiant de jeton encodé en Base62, dérivé de l'UUID du jeton |
| `<SECRET>` | Secret généré aléatoirement de 32 octets |
| `<CHECKSUM>` | Somme de contrôle CRC32 suivant la norme de somme de contrôle GitHub |

Le préfixe identifiable et la somme de contrôle permettent une détection automatisée par les services d'analyse des secrets, notamment l'analyse des secrets GitHub, Sensitive Data Scanner et GitGuardian.

## Autorisations {#permissions}

Les PATs utilisent les mêmes autorisations que les clés d'application :

| Autorisation | Description |
|------------|-------------|
| `user_app_keys` | Créer et gérer vos propres PATs |
| `org_app_keys_read` | Afficher les PATs pour tous les utilisateurs de l'organisation |
| `org_app_keys_write` | Créer, modifier et révoquer des PATs pour n'importe quel utilisateur de l'organisation |

Pour plus d'informations sur les autorisations, consultez [Access Control basé sur les rôles][3].

## Audit Trail {#audit-trail}

Si la [Audit Trail][4] est activée pour votre organisation, la Audit Trail enregistre tous les événements de création, d'utilisation et de révocation de PATs. La Audit Trail capture la méthode d'authentification et les métadonnées du jeton pour chaque appel API effectué avec un PAT, offrant aux administrateurs une visibilité sur l'utilisation des identifiants dans toute l'organisation.

Pour examiner l'activité des PAT, accédez à [**Security** > **Compliance** > **Audit Trail**][5] et filtrez par la méthode d'authentification Personal Access Token.

## Référence de l'API {#api-reference}

Gérez les PATs par programmation via la Datadog API :

| Opération | Endpoint |
|-----------|----------|
| Lister les PATs et les SATs | `GET /api/v2/personal_access_tokens` |
| Créer un PAT | `POST /api/v2/personal_access_tokens` |
| Obtenir un PAT spécifique | `GET /api/v2/personal_access_tokens/<PAT_ID>` |
| Mettre à jour un PAT | `PATCH /api/v2/personal_access_tokens/<PAT_ID>` |
| Révoquer un PAT | `DELETE /api/v2/personal_access_tokens/<PAT_ID>` |

L'endpoint `GET /api/v2/personal_access_tokens` renvoie à la fois les PAT et les SAT en un seul appel.
Pour gérer les Jetons d'accès de service (SATs), consultez [Jetons d'accès de service][7].

Pour la référence complète de l'API, consultez [Gestion des clés][6].

## Délai de propagation de la clé {#key-propagation-delay}

Les PAT suivent un modèle de cohérence éventuelle. Après la création ou la révocation, les modifications peuvent prendre quelques secondes pour se propager dans tous les systèmes Datadog. N'utilisez pas un jeton immédiatement après sa création dans des workflows critiques. Mettez en œuvre une stratégie de réessai avec un court délai d'attente exponentiel pour gérer les erreurs transitoires pendant la fenêtre de propagation.

[1]: https://app.datadoghq.com/personal-settings/access-tokens
[2]: https://app.datadoghq.com/organization-settings/access-tokens
[3]: /fr/account_management/rbac/permissions/
[4]: /fr/account_management/audit_trail/
[5]: https://app.datadoghq.com/audit-trail
[6]: /fr/api/latest/key-management/
[7]: /fr/account_management/service-access-tokens/

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}