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
description: Configurez le provisionnement automatique des utilisateurs de Microsoft
  Entra ID vers Datadog à l'aide de SCIM, avec une configuration pas à pas et un mappage
  des attributs.
title: Configurer SCIM avec Microsoft Entra ID
---

<div class="alert alert-info">
SCIM est disponible avec les offres Infrastructure Pro et Infrastructure Enterprise.
</div>

<div class="alert alert-danger">
  En raison d’un gel des mises à jour des applications tierces dans Entra par Microsoft à la suite d’un incident de sécurité fin 2024, le provisionnement des équipes via SCIM n’est pas disponible. Pour créer des équipes dans Datadog, utilisez l’une des alternatives prises en charge : 
  <a href="https://docs.datadoghq.com/account_management/saml/mapping/" target="_blank">le mappage SAML</a>, 
  <a href="https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team" target="_blank">Terraform</a>, 
  <a href="https://docs.datadoghq.com/api/latest/teams/" target="_blank">l’API publique</a>, ou 
  <a href="https://docs.datadoghq.com/api/latest/scim/" target="_blank">des appels directs au serveur SCIM</a>. SCIM peut toujours être utilisé pour le provisionnement des utilisateurs.
</div>

Consultez les instructions suivantes pour synchroniser vos utilisateurs Datadog avec Microsoft Entra ID à l'aide de SCIM.

Pour en savoir plus sur les fonctionnalités et les limitations de cette fonctionnalité, consultez la page [SCIM][1].

## Prérequis

La fonctionnalité SCIM dans Datadog est une option avancée disponible avec les formules Infrastructure Pro et Infrastructure Enterprise.

Cette documentation part du principe que votre organisation gère les identités utilisateur à l'aide d'un fournisseur d'identité.

Datadog recommande fortement d'utiliser une clé d'application de compte de service lors de la configuration de SCIM afin d'éviter toute interruption d'accès. Pour plus de détails, consultez la section [Utiliser un compte de service avec SCIM][2].

Lorsque SAML et SCIM sont utilisés conjointement, Datadog recommande fortement de désactiver le provisionnement SAML juste-à-temps (JIT) afin d'éviter les incohérences d'accès. Gérez le provisionnement des utilisateurs uniquement via SCIM.

## Ajouter Datadog à la galerie d'applications de Microsoft Entra ID

1. Connectez-vous au [Centre d'administration Microsoft Entra][6] en tant qu'au moins [Administrateur des applications cloud][7]
1. Accédez à **Identity** -> **Applications** -> **Enterprise Applications**
1. Cliquez sur **New Application**
1. Saisissez « Datadog » dans la zone de recherche
1. Sélectionnez l'application Datadog dans la galerie
1. Si vous le souhaitez, vous pouvez saisir un nom dans la zone de texte **Name**
1. Cliquez sur **Create**

**Remarque :** si Datadog est déjà configuré avec Microsoft Entra ID pour l'authentification unique (SSO), accédez à **Enterprise Applications** et sélectionnez votre application Datadog existante.

## Configurer le provisionnement automatique des utilisateurs

1. Dans l'écran de gestion de l'application, sélectionnez **Provisioning** dans le panneau de gauche
2. Dans le menu **Provisioning Mode**, sélectionnez **Automatic**
3. Ouvrez **Admin Credentials**
4. Complétez la section **Admin Credentials** comme suit :
    - **Tenant URL** : `https://{{< region-param key="dd_full_site" >}}/api/v2/scim?aadOptscim062020`
        - **Remarque :** utilisez le sous-domaine approprié pour votre site. Pour trouver votre URL, consultez la rubrique dédiée aux [sites Datadog][3].
        - **Remarque :** le paramètre `?aadOptscim062020` dans l’URL du client est spécifique à Entra ID. Il s’agit d’un indicateur qui informe Entra de corriger son comportement SCIM, comme expliqué dans cette [documentation Microsoft Entra][8]. Si vous n’utilisez pas Entra ID, vous ne devez pas inclure ce suffixe dans l’URL.
    - **Jeton secret** : utilisez une clé d’application Datadog valide. Vous pouvez créer une clé d’application depuis [la page des paramètres de votre organisation][4]. Pour garantir un accès continu à vos données, utilisez une clé d’application de [compte de service][5].

{{< img src="/account_management/scim/admin-credentials-entra-flag.png" alt="Écran de configuration des identifiants administrateur Azure AD" >}}

5. Cliquez sur **Test Connection**, puis attendez le message confirmant que les identifiants sont autorisés à activer le provisioning.
6. Cliquez sur **Save**. La section de mappage s'affiche. Consultez la section suivante pour configurer le mappage.

## Mappage des attributs

### Attributs utilisateur

1. Développez la section **Mappings**.
2. Cliquez sur **Provision Azure Active Directory Users**. La page Attribute Mapping s'affiche.
3. Définissez **Enabled** sur **Yes**
4. Cliquez sur l'icône **Save**
5. Sous **Target Object actions**, assurez-vous que les actions de création, de mise à jour et de suppression sont sélectionnées
6. Passez en revue les attributs utilisateur synchronisés de Microsoft Entra ID vers Datadog dans la section de mappage des attributs. Définissez les mappages suivants :
| Attribut Microsoft Entra ID | Attribut Datadog |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users-2.png" alt="Configuration du mappage des attributs, Provisionner les utilisateurs Azure Active Directory" >}}

7. Après avoir défini vos mappages, cliquez sur **Save**.

### Attributs du groupe

Le mappage de groupe n'est pas pris en charge.

[1]: /fr/account_management/scim/
[2]: /fr/account_management/scim/#using-a-service-account-with-scim
[3]: /fr/getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /fr/account_management/org_settings/service_accounts
[6]: https://entra.microsoft.com/
[7]: https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference#cloud-application-administrator
[8]: https://learn.microsoft.com/en-us/entra/identity/app-provisioning/application-provisioning-config-problem-scim-compatibility#flags-to-alter-the-scim-behavior