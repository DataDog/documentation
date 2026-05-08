---
description: Consulter les alertes de sécurité, les avertissements de configuration
  et les bonnes pratiques de gestion des utilisateurs depuis le centre de sécurité
  centralisé de Datadog.
further_reading:
- link: /account_management/api-app-keys/
  tag: Documentation
  text: Clés d'API et d'application
- link: /account_management/users/
  tag: Documentation
  text: Gestion des utilisateurs
- link: /account_management/org_settings/oauth_apps
  tag: Documentation
  text: OAuth Apps
site_support_id: safety_center
title: Centre de sécurité
---

## Présentation
Le centre de sécurité de Datadog, accessible dans **Organization Settings**, est un emplacement centralisé pour les alertes de sécurité et les bonnes pratiques. Les [administrateurs][1] d'une organisation peuvent ouvrir cette page pour consulter les recommandations et agir sur les alertes et avertissements de sécurité prioritaires.

{{< img src="account_management/safety_center/overview.png" alt="Page d'aperçu du centre de sécurité" style="width:80%;" >}}

## Alertes de sécurité
Si votre organisation a une alerte de sécurité prioritaire, elle s'affiche dans la section **Security Alerts** du **Safety Center**. Le Safety Center prend en charge deux types d'alertes : les fuites de [clés d'application][2] et les fuites de [clés d'API][3].

Une alerte de fuite de clé signifie qu'une ou plusieurs clés privées (application ou API) ont été compromises ou exposées publiquement sur internet. Les clés exposées doivent être [révoquées][4] dès que possible afin de minimiser les risques pour la sécurité de votre organisation. Supprimer le fichier contenant la clé d'un site public tel que GitHub **ne garantit pas** qu'elle n'a pas déjà été consultée par un tiers.

{{< img src="account_management/safety_center/revoke-leaked-api-key.png" alt="Révocation d'une clé API divulguée" style="width:70%;" >}}

## Configuration
L’onglet **Configuration** dans le **Safety Center** permet de définir des **contacts de sécurité**, des adresses e-mail principale et secondaire destinées à recevoir les notifications de sécurité pour votre organisation Datadog. Lorsqu’un problème de sécurité est détecté, comme des clés Datadog exposées publiquement devant être [remplacées][4], les **contacts de sécurité** désignés reçoivent une notification.

{{< img src="account_management/safety_center/set-security-contacts.png" alt="Définition des contacts de sécurité" style="width:70%;" >}}

Il est important de maintenir les **contacts de sécurité** à jour afin de garantir que les risques potentiels pour la sécurité soient traités et atténués rapidement. La page **Safety Center** vous rappelle de vérifier les **contacts de sécurité** assignés tous les 6 mois.

## Accès et partage
La section **Access & Sharing** du **Safety Center** répertorie les entités qui permettent un accès externe à votre organisation Datadog. Elle met en évidence :

- Les [**applications OAuth**][5] inactives depuis plus de 60 jours ou disposant d'un accès en écriture et inactives depuis plus de 30 jours.
- Les [**clés d'API**][3] non utilisées depuis plus de 30 jours.

### OAuth Apps
Les **applications OAuth** inactives peuvent représenter un risque de sécurité pour votre organisation si elles sont compromises. Elles doivent être examinées régulièrement, et celles qui ne sont plus utilisées doivent être désactivées.

{{< img src="account_management/safety_center/disable-unused-oauth-app.png" alt="Désactivation d'une application OAuth inutilisée" style="width:70%;" >}}

### API Keys
Les **clés d'API** inutilisées peuvent faciliter un accès non autorisé à votre organisation si elles sont exposées sur Internet. Ces clés doivent être examinées et révoquées si l'infrastructure de votre organisation ne dépend pas de leur utilisation.

{{< img src="account_management/safety_center/revoke-unused-api-key.png" alt="Révocation d'une clé d'API inutilisée" style="width:70%;" >}}

## Utilisateurs
Pour assurer la sécurité de votre organisation, il est important de suivre les bonnes pratiques en matière de gestion des utilisateurs. La page **Users** du **Safety Center** met en évidence des recommandations de sécurité liées aux utilisateurs :

- Les [invitations d'utilisateurs][7] non acceptées depuis plus de 30 jours.
- Les [utilisateurs administrateurs][1] si leur nombre dépasse 10 % de l'ensemble des utilisateurs de l'organisation.

### Invitations en attente
La présence de comptes utilisateur inactifs ou d'**invitations en attente obsolètes** augmente le risque de compromission par prise de contrôle de compte. Cela peut s'avérer particulièrement dangereux si les comptes inactifs disposent de privilèges élevés. Pour limiter le nombre d'utilisateurs inactifs, envisagez de renvoyer les **anciennes invitations en attente** ou de les supprimer si ces utilisateurs n'ont pas besoin d'accéder à la plateforme Datadog.

{{< img src="account_management/safety_center/resend-pending-invite.png" alt="Renvoi d'une invitation en attente" style="width:70%;" >}}

{{< img src="account_management/safety_center/delete-pending-invite.png" alt="Suppression d'une invitation en attente" style="width:70%;" >}}

### Administrateurs
Donner un **accès administrateur** à des utilisateurs sans y réfléchir attentivement augmente les risques de sécurité en cas de compromission d'un compte avec des privilèges élevés. Pour limiter le nombre d'utilisateurs disposant de **l'accès administrateur**, examinez régulièrement la liste de vos administrateurs et révoquez les privilèges si ces utilisateurs n'en ont pas besoin.

{{< img src="account_management/safety_center/edit-admin-user.png" alt="Modification d'un utilisateur administrateur" style="width:70%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/rbac/#datadog-default-roles
[2]: /fr/account_management/api-app-keys/#application-keys
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/account_management/api-app-keys/#what-to-do-if-an-api-or-application-key-was-exposed
[5]: /fr/account_management/org_settings/oauth_apps
[7]: /fr/account_management/users/#add-new-members-and-manage-invites