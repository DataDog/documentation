---
description: Créez et gérez des jetons d'accès de service pour authentifier les appels
  de Datadog API au nom d'un compte de service, sans dépendre des identifiants d'utilisateurs
  individuels.
further_reading:
- link: /account_management/org_settings/service_accounts/
  tag: Documentation
  text: Comptes de service
- link: /account_management/personal-access-tokens/
  tag: Documentation
  text: Jetons d'accès personnels
- link: /account_management/workload_identity_federation/
  tag: Documentation
  text: Fédération d'identités de charges de travail
- link: https://www.datadoghq.com/blog/datadog-api-authentication/
  tag: Blog
  text: Modernisez l’authentification à la Datadog API avec des identifiants à portée
    définie.
title: Les Jetons d'accès de service
---
## Présentation {#overview}

Les jetons d'accès de service sont des identifiants qui authentifient les appels de Datadog API au nom d'un
[compte de service][1]. Contrairement aux [jetons d'accès personnels (PAT)][2], les SAT appartiennent à un compte de service
plutôt qu'à un utilisateur individuel — ils restent valides lorsque des membres de l'équipe rejoignent ou quittent l'organisation.

Avec les SAT, vous pouvez :
- Authentifier des workflows et des scripts automatisés avec des identifiants qui restent valides après le départ de membres de l'équipe de l'organisation.
- Créez des jetons à longue durée de vie pour des intégrations stables qui ne nécessitent pas de rotation périodique.
- Limitez les jetons aux autorisations minimales requises par votre workflow.
- Attribuez toute activité d'API au compte de service propriétaire pour une responsabilité d'audit claire.

### Comparaison des SAT avec d'autres types d'identifiants {#sats-compared-to-other-credential-types}

| | Jetons d'accès de service | Jetons d'accès personnels | Clés d'application |
|---|---|---|---|
| Propriétaire | Compte de service | Utilisateur individuel | Utilisateur individuel ou compte de service |
| Durée de vie (TTL) | Optionnel ; 1 jour, 1 mois, 1 an, Jamais ou Personnalisé | Requis ; 1 jour à 1 an | Aucune expiration |
| À portée définie par défaut | Oui ; les portées sont obligatoires | Oui ; les portées sont obligatoires | Optionnel ; sans portée par défaut |
| Authentification autonome | Oui ; aucune association de clé d'API nécessaire | Oui ; aucune association de clé d'API nécessaire | Non ; nécessite une clé d'API |
| Préfixe identifiable | `ddsat_` | `ddpat_` | `ddapp_` (nouveau) |
| Visible dans | Détails du compte de service, Paramètres de l'organisation > Jetons d'accès | Paramètres personnels > Jetons d'accès, Paramètres de l'organisation > Jetons d'accès | Paramètres personnels > Clés d'application, Paramètres de l'organisation > Clés d'application |

Pour les jetons d'accès personnels, consultez [Jetons d'accès personnels][2].

## Prérequis {#prerequisites}

- Un compte de service Datadog. Pour en créer un, consultez [Comptes de service][1].
- L'autorisation `service_account_write` de créer des jetons d'accès de service pour un compte de service que vous gérez.
- L'autorisation `org_app_keys_write` de gérer des jetons d'accès de service pour tout compte de service dans l'organisation.

## Créer un jeton d'accès de service {#create-a-service-access-token}

1. Accédez à [**Paramètres de l'organisation** > **Comptes de service**][3] et cliquez sur un compte de service.
2. Dans le panneau des détails, sous **Jetons d'accès**, cliquez sur {{< ui >}}+ New Token{{< /ui >}}.
3. Saisissez un {{< ui >}}Name{{< /ui >}} pour le jeton.
4. Sélectionnez un {{< ui >}}Expiration Date{{< /ui >}} : **1 jour**, **1 mois**, **1 an**, **Jamais**,
   ou **Personnalisé**. Sélectionnez **Jamais** pour un jeton sans expiration.
5. Cliquez sur {{< ui >}}Select Scopes{{< /ui >}} pour définir ce à quoi le jeton peut accéder. N'accordez que les
   autorisations requises par votre workflow, puis cliquez sur {{< ui >}}Save{{< /ui >}}.

<div class="alert alert-warning">Datadog affiche le secret du jeton une seule fois au moment de la création.
Copiez-le et stockez-le en toute sécurité. Vous ne pourrez pas le récupérer ultérieurement.</div>

Après l'enregistrement, un panneau de détails affiche le secret du jeton, le nom, l'ID du jeton, le propriétaire, les rôles du propriétaire,
la date d'expiration et les portées.

Si vous configurez un SAT avec une longue expiration ou si vous sélectionnez **Jamais**, stockez le secret dans un gestionnaire de secrets
tel qu'AWS Secrets Manager, HashiCorp Vault ou Azure Key Vault, au lieu de le stocker dans le code source
ou dans des fichiers d'environnement. AWS Secrets Manager prend en charge la [rotation gérée pour les identifiants de compte de service Datadog][8].
identifiants de compte de service Datadog][8].

## Utiliser un jeton d'accès de service {#use-a-service-access-token}

Les SAT prennent en charge deux méthodes d'authentification.

### En-tête d'autorisation (recommandé) {#authorization-header-recommended}

Transmettez le jeton d'accès de service en tant que jeton Bearer dans l'en-tête `Authorization`. Cette méthode ne nécessite pas de
Clé d'API :

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "Authorization: Bearer <YOUR_SAT>"
```

### En-tête de clé d'application {#application-key-header}

Transmettez le SAT dans l'en-tête `dd-application-key` :

```bash
curl -X GET "https://api.datadoghq.com/api/v2/users" \
  -H "dd-application-key: <YOUR_SAT>"
```

**Remarque :** Lorsqu'un jeton d'accès de service valide est fourni dans l'en-tête `dd-application-key`, Datadog s'authentifie
uniquement avec le SAT. L'en-tête `dd-api-key` est facultatif et sa valeur n'est pas évaluée.

## Restrictions sur les appels d'API authentifiés par SAT {#restrictions-on-sat-authenticated-api-calls}

Pour empêcher l'élévation de privilèges, Datadog restreint les actions possibles pour un appel d'API authentifié avec un SAT. Ces restrictions s'appliquent quel que soit le client API effectuant l'appel :

- **Clés d'application** : un jeton d'accès de service ne peut pas créer ni mettre à jour de clés d'application. La révocation des clés d'application est autorisée.
- **Portées sur les nouveaux jetons** : un jeton d'accès de service peut créer ou mettre à jour un autre jeton d'accès de service uniquement si les portées du nouveau jeton sont un sous-ensemble de ses propres portées.
- **Durée de vie (TTL) sur les nouveaux jetons** : un jeton d'accès de service ne peut pas créer un jeton d'accès de service avec une durée de vie qui dépasse sa propre expiration.

Un appel qui enfreint l'une de ces restrictions renvoie une réponse `403 Forbidden`.

## Gérer les jetons d'accès de service {#manage-service-access-tokens}

### Afficher les jetons {#view-tokens}

Les jetons d'un compte de service apparaissent dans le panneau des détails sous
[**Paramètres de l'organisation** > **Comptes de service**][3].

{{< img src="account_management/service-access-tokens/sat-service-account-panel.png" alt="Panneau des détails du compte de service affichant la section Jetons d'accès avec deux jetons d'accès de service listés." style="width:80%;" >}}

Les administrateurs de l'organisation disposant de l'autorisation `org_app_keys_read` peuvent également afficher tous les jetons d'accès de service
ainsi que les jetons d'accès personnels depuis [**Paramètres de l'organisation** > **Jetons d'accès**][4].

### Révoquer un jeton {#revoke-a-token}

1. Accédez à [**Paramètres de l'organisation** > **Comptes de service**][3] et cliquez sur le compte de service.
2. Dans le panneau des détails, survolez le jeton et cliquez sur {{< ui >}}Revoke{{< /ui >}}.

Sinon, révoquez un SAT depuis [**Paramètres de l'organisation** > **Jetons d'accès**][4].

Les jetons révoqués ne peuvent plus authentifier les appels d'API. La révocation prend effet en quelques secondes.

### Modifier un jeton {#edit-a-token}

Vous pouvez mettre à jour le nom et les portées d'un SAT existant. Vous ne pouvez pas modifier la date d'expiration
après la création. Pour modifier l'expiration, révoquez le jeton et créez-en un nouveau.

## Autorisations {#permissions}

| Autorisation | Description |
|------------|-------------|
| `service_account_write` | Créer des jetons d'accès de service pour les comptes de service que vous gérez |
| `org_app_keys_read` | Afficher les jetons d'accès de service pour tous les comptes de service de l'organisation |
| `org_app_keys_write` | Créer, modifier et révoquer des jetons d'accès de service pour n'importe quel compte de service |

Pour plus d'informations, consultez [Access Control basé sur les rôles][5].

## Audit Trail {#audit-trail}

Si [Audit Trail][6] est activé, il enregistre toutes les créations, utilisations et révocations de SAT
événements. Chaque appel d'API authentifié avec un SAT est attribué au compte de service propriétaire.
Cela donne aux administrateurs une visibilité sur l'utilisation automatisée des identifiants dans toute l'organisation.

Pour examiner l'activité des SAT, accédez à [**Security** > **Compliance** > **Audit Trail**][7] et
filtrez par la méthode d'authentification Service Access Token.

## Référence de l'API {#api-reference}

Gérez les SAT par programmation via Datadog API :

| Opération | Endpoint |
|-----------|----------|
| Lister les jetons d'accès de service | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Créer un jeton d'accès de service | `POST /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens` |
| Obtenir un jeton d'accès de service spécifique | `GET /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Mettre à jour un jeton d'accès de service | `PATCH /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |
| Révoquer un jeton d'accès de service | `DELETE /api/v2/service_accounts/<SERVICE_ACCOUNT_ID>/access_tokens/<TOKEN_ID>` |

Pour récupérer tous les PAT et les jetons d'accès de service de l'ensemble des utilisateurs et des comptes de service en un seul appel, utilisez l'endpoint
unifié :

```
GET /api/v2/personal_access_tokens
```

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/org_settings/service_accounts/
[2]: /fr/account_management/personal-access-tokens/
[3]: https://app.datadoghq.com/organization-settings/service-accounts
[4]: https://app.datadoghq.com/organization-settings/access-tokens
[5]: /fr/account_management/rbac/permissions/
[6]: /fr/account_management/audit_trail/
[7]: https://app.datadoghq.com/audit-trail
[8]: https://aws.amazon.com/about-aws/whats-new/2026/05/secrets-manager-managed-external-secrets-datadog-snowflake/