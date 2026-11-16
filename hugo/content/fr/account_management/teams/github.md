---
description: Activez le provisionnement automatique de Datadog Teams en fonction de
  la structure des équipes GitHub d'une organisation, y compris les équipes imbriquées.
  Autorisez Datadog à utiliser GitHub comme source pour les données Datadog Teams.
further_reading:
- link: /integrations/github/
  tag: Documentation
  text: Intégration GitHub
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Maintenez la propriété des services à jour grâce à l'intégration GitHub de
    Datadog Teams.
title: Provisionnez Datadog Teams avec GitHub
---
## Présentation {#overview}

Liez vos équipes GitHub à Datadog Teams pour provisionner automatiquement Datadog Teams. Les fonctionnalités suivantes sont prises en charge :
- Créez des équipes Datadog Teams basées sur la configuration de vos équipes GitHub.
- Synchronisez l'appartenance aux équipes entre Datadog et GitHub. Nécessite que les utilisateurs individuels connectent leurs comptes Datadog à GitHub.

Datadog associe les équipes existantes en effectuant une correspondance exacte des noms entre les slugs d'équipe GitHub et les [handles][1] d'équipe Datadog. La correspondance ne tient pas compte de la casse et ignore les différences d'espaces.

Si vos équipes GitHub ont une structure hiérarchique, Datadog reproduit cette même structure lors du provisionnement.

**Remarque :** Dans Datadog, une sous-équipe doit être aussi restrictive ou plus restrictive que son équipe parente. Par exemple, une sous-équipe ne peut pas être [open][2] si l'équipe parente est [invite-only][2].

Datadog lit uniquement les équipes GitHub. Datadog ne modifie, ne crée ni ne supprime jamais d'équipes GitHub.

## Prérequis {#prerequisites}

### Intégration GitHub {#github-integration}
Assurez-vous que votre organisation Datadog est [connectée][3] à une organisation GitHub. Votre intégration GitHub doit disposer de l'autorisation `members_read` pour lire les données d'équipe.

<div class="alert alert-info">Les clients GitHub Enterprise Cloud et GitHub Enterprise Server sont pris en charge. Cependant, les équipes gérées par l'entreprise (équipes gérées au niveau de l'entreprise GitHub à travers plusieurs organisations) ne sont pas prises en charge. Seules les équipes GitHub au niveau de l'organisation peuvent être provisionnées dans Datadog.</div>

### Autorisations {#permissions}
- Pour lier et créer des équipes, votre utilisateur Datadog doit disposer de l'autorisation `teams_manage`. 
- Pour gérer l'appartenance aux équipes, votre utilisateur Datadog doit disposer de l'autorisation `user_access_manage`.

## Configuration {#setup}

### Connectez les équipes GitHub à Datadog Teams {#connect-github-teams-to-datadog-teams}
1. Accédez à [Datadog Teams][4].
1. En haut à droite, cliquez sur {{< ui >}}GitHub Connections{{< /ui >}}.
1. Configurez votre connexion en sélectionnant des options pour le type d'importation, la synchronisation des membres et la cadence.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

### Consultez Datadog Teams {#view-datadog-teams}
1. Accédez à [GitHub Connections][5].
1. Si la liste des équipes créées et liées est vide, cliquez sur {{< ui >}}Refresh{{< /ui >}}.
1. Optionnellement, mettez à jour manuellement Datadog Teams pour atteindre l'état souhaité. 

### Configuration utilisateur {#user-configuration}

Une fois qu'un administrateur a activé le provisionnement d'équipe depuis GitHub, une notification apparaît sur la page de détails de l'équipe. La notification demande aux utilisateurs {{< ui >}}Log in to GitHub{{< /ui >}} de connecter leurs comptes de Datadog à GitHub via OAuth.

{{< img src="account_management/teams/github/connect-to-github-v2.png" alt="Boîte « Non connecté à GitHub » avec un bouton « Se connecter à GitHub »" style="width:60%;">}}

Chaque utilisateur doit lier manuellement son compte GitHub à Datadog pour établir la connexion entre Datadog et GitHub. Ce comportement est requis par les politiques d'OAuth et de confidentialité des utilisateurs de GitHub.

Après qu'un utilisateur a lié ses comptes, Datadog ajoute l'utilisateur à toutes les équipes Datadog Teams qui correspondent aux équipes GitHub dont l'utilisateur est membre.

Par exemple, supposons que l'utilisateur B soit membre de l'équipe A dans GitHub. La séquence suivante se produit dans Datadog :
1. Un administrateur active le provisionnement de Datadog Teams et la synchronisation des utilisateurs depuis GitHub.
1. L'équipe A est créée dans Datadog, vide.
1. L'utilisateur B voit une notification pour {{< ui >}}Log in to GitHub{{< /ui >}} et donne suite.
1. L'utilisateur B est provisionné dans l'équipe A dans Datadog.

## Suppression des équipes {#deleting-teams}

La suppression d'une équipe GitHub ne supprime pas l'équipe Datadog correspondante. Au lieu de cela, Datadog :
- Supprime tous les membres synchronisés de l'équipe Datadog.
- Supprime la connexion entre l'équipe Datadog et l'équipe GitHub supprimée.
- Supprime tous les liens hiérarchiques (relations parent/enfant) qui ont été synchronisés depuis GitHub.

L'équipe Datadog elle-même subsiste et peut continuer à être gérée indépendamment.

### Exemple {#example}
1. L'équipe A existe dans GitHub et est synchronisée avec Datadog (soit créée automatiquement, soit liée manuellement).
1. L'équipe A est supprimée dans GitHub.
1. Dans Datadog, les membres synchronisés, la connexion GitHub et les liens hiérarchiques de l'équipe A sont supprimés.
1. L'équipe A subsiste dans Datadog et peut être gérée indépendamment.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/teams/#team-handle
[2]: /fr/account_management/teams/manage/#team-modification-permissions
[3]: /fr/integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced