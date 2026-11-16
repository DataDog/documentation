---
algolia:
  tags:
  - scim
  - identity provider
  - IdP
  - Azure AD
  - Entra ID
aliases:
- /fr/account_management/scim/azure/
description: Configurez le provisionnement automatisé des utilisateurs depuis Microsoft
  Entra ID vers Datadog en utilisant SCIM avec une configuration étape par étape et
  un mappage d'attributs.
title: Configurez SCIM avec Microsoft Entra ID
---
<div class="alert alert-info">
SCIM est disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup.
</div>

<div class="alert alert-danger">
  En raison d'un gel par Microsoft des mises à jour d'applications tierces dans Entra suite à un incident de sécurité fin 2024, le provisionnement d'équipes via SCIM est indisponible. Pour créer des équipes dans Datadog, utilisez l'une des alternatives prises en charge : 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">mappage SAML</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">l'API publique</a>, ou 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">appels directs au serveur SCIM</a>. SCIM peut toujours être utilisé pour provisionner des utilisateurs.
</div>

Consultez les instructions suivantes pour synchroniser vos utilisateurs Datadog avec Microsoft Entra ID en utilisant SCIM.

Pour connaître les capacités et les limitations de cette fonctionnalité, consultez [SCIM][1].

## Prérequis {#prerequisites}

SCIM dans Datadog est une fonctionnalité avancée disponible avec les plans Infrastructure Pro, Infrastructure Enterprise et Startup.

Cette documentation suppose que votre organisation gère les identités des utilisateurs à l'aide d'un fournisseur d'identité.

Datadog recommande vivement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM pour éviter toute interruption de l'accès. Pour plus de détails, consultez [l'utilisation d'un compte de service avec SCIM][2].

Lorsque vous utilisez SAML et SCIM ensemble, Datadog recommande vivement de désactiver le provisionnement juste-à-temps (JIT) SAML pour éviter les divergences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

## Ajoutez Datadog à la galerie d'applications Microsoft Entra ID {#add-datadog-to-the-microsoft-entra-id-application-gallery}

1. Connectez-vous au [centre d'administration Microsoft Entra][6] en tant qu'au moins [Administrateur d'applications cloud][7]
1. Accédez à {{< ui >}}Identity{{< /ui >}} -> {{< ui >}}Applications{{< /ui >}} -> {{< ui >}}Enterprise Applications{{< /ui >}}
1. Cliquez sur {{< ui >}}New Application{{< /ui >}}
1. Saisissez « Datadog » dans la zone de recherche
1. Sélectionnez l'application Datadog dans la galerie
1. Facultativement, saisissez un nom dans la zone de texte {{< ui >}}Name{{< /ui >}}
1. Cliquez sur {{< ui >}}Create{{< /ui >}}

**Remarque :** Si vous avez déjà configuré Datadog avec Microsoft Entra ID pour le SSO, accédez à {{< ui >}}Enterprise Applications{{< /ui >}} et sélectionnez votre application Datadog existante.

## Configurer le provisionnement automatique des utilisateurs {#configure-automatic-user-provisioning}

1. Dans l'écran de gestion des applications, sélectionnez {{< ui >}}Provisioning{{< /ui >}} dans le panneau de gauche
2. Dans le menu {{< ui >}}Provisioning Mode{{< /ui >}}, sélectionnez {{< ui >}}Automatic{{< /ui >}}
3. Ouvrez {{< ui >}}Admin Credentials{{< /ui >}}
4. Remplissez la section {{< ui >}}Admin Credentials{{< /ui >}} comme suit :
    - {{< ui >}}Tenant URL{{< /ui >}} : `{{< region-param key="dd_api" >}}/api/v2/scim?aadOptscim062020`
        - **Note:** Use the API host for your site, not the app host. For the SCIM endpoints for each site, see the [SCIM API reference][3].
        - **Note:** The `?aadOptscim062020` La partie de l'URL du locataire est spécifiquement destinée à Entra ID. Il s'agit d'un indicateur qui demande à Entra de corriger son comportement SCIM comme indiqué dans cette [documentation Microsoft Entra][8]. Si vous n'utilisez pas Entra ID, vous ne devez pas inclure ce suffixe dans l'URL.
    - {{< ui >}}Secret Token{{< /ui >}} : Utilisez une clé d'application Datadog valide. Vous pouvez créer une clé d'application sur [votre page de paramètres d'organisation][4]. Pour maintenir un accès continu à vos données, utilisez une clé d'application de [compte de service][5].

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Écran de configuration des informations d'identification de l'administrateur Azure AD">}}

5. Cliquez sur {{< ui >}}Test Connection{{< /ui >}} et attendez le message confirmant que les informations d'identification sont autorisées à activer le provisionnement.
6. Cliquez sur {{< ui >}}Save{{< /ui >}}. La section de mappage apparaît. Consultez la section suivante pour configurer le mappage.

## Mappage d'attributs{#attribute-mapping}

### Attributs utilisateur{#user-attributes}

1. Développez la section {{< ui >}}Mappings{{< /ui >}}
2. Cliquez sur {{< ui >}}Provision Azure Active Directory Users{{< /ui >}}. La page de mappage d'attributs apparaît.
3. Définissez {{< ui >}}Enabled{{< /ui >}} sur {{< ui >}}Yes{{< /ui >}}
4. Cliquez sur l'icône {{< ui >}}Save{{< /ui >}}
5. Sous {{< ui >}}Target Object actions{{< /ui >}}, assurez-vous que les actions Créer, Mettre à jour et Supprimer sont sélectionnées
6. Examinez les attributs utilisateur synchronisés depuis Microsoft Entra ID vers Datadog dans la section de mappage d'attributs. Définissez les mappages suivants :
| Attribut Microsoft Entra ID     | Attribut Datadog              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |
| `AppRoleAssignmentsComplex([appRoleAssignments])` | `roles`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Configuration du mappage d'attributs, Provisionner des utilisateurs Azure Active Directory :">}}

7. Une fois vos mappages définis, cliquez sur {{< ui >}}Save{{< /ui >}}.

Pour provisionner le rôle Datadog d'un utilisateur (intégré ou personnalisé), définissez d'abord un rôle d'application dans l'enregistrement d'application Microsoft Entra. Créez un rôle d'application pour chaque rôle Datadog que vous souhaitez provisionner. Assignez les utilisateurs ou groupes pertinents à ces rôles d'application. Définissez le **Nom d'affichage** de chaque rôle d'application sur le nom du rôle Datadog et la **Valeur** sur l'UUID du rôle Datadog correspondant. N'utilisez pas le nom du rôle Datadog ou la valeur de revendication de rôle SAML comme **Valeur** du rôle d'application. Vous pouvez trouver l'UUID d'un rôle dans l'URL du rôle sur votre page [Paramètres de l'organisation][11]. Pour obtenir des instructions de configuration, consultez la [documentation sur les rôles d'application de Microsoft][12]. Après avoir défini les rôles d'application, mappez l'attribut `roles` comme indiqué ci-dessus. Utilisez l'expression `AppRoleAssignmentsComplex([appRoleAssignments])` pour l'attribut Microsoft Entra ID. Si `roles` n'est pas disponible dans la liste déroulante des attributs cibles, ajoutez-le en tant qu'attribut de chaîne **à valeurs multiples**. Pour obtenir des instructions de configuration, consultez la [documentation sur le mappage d'attributs de Microsoft][10].

Les rôles suivent la convention d'attribut à valeurs multiples SCIM définie dans la [RFC 7643][9]. Si une requête SCIM envoie plusieurs rôles, Datadog provisionne uniquement les rôles qui correspondent à un rôle dans votre organisation. Si aucune correspondance n'est trouvée et que l'organisation dispose d'un rôle par défaut, l'utilisateur se voit attribuer ce rôle par défaut. Si l'organisation n'a pas de rôle par défaut, Datadog ignore la mise à jour du rôle et conserve les rôles existants de l'utilisateur. Les rôles sans correspondance sont enregistrés dans Audit Trail. Pour plus de détails, consultez [SCIM][1].

### Attributs de groupe {#group-attributes}

Le mappage de groupe n'est pas pris en charge.

[1]: /fr/account_management/scim/
[2]: /fr/account_management/scim/#using-a-service-account-with-scim
[3]: /fr/api/latest/scim/
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /fr/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior
[9]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
[10]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/customize-application-attributes#provisioning-a-role-to-a-scim-app
[11]: https://app.datadoghq.com/organization-settings/roles
[12]: https://learn.microsoft.com/en-us/entra/identity-platform/howto-add-app-roles-in-apps