---
description: Permettez aux utilisateurs de demander l'accès dont ils ont besoin directement
  depuis une page d'accès refusé, avec des workflows d'approbation manuels ou automatiques
  pour les administrateurs.
further_reading:
- link: /account_management/rbac/permissions/
  tag: Documentation
  text: Permissions
- link: /account_management/rbac/granular_access/
  tag: Documentation
  text: Accès granulaire
- link: /getting_started/access_for_enterprises/
  tag: Guide
  text: Accès pour les entreprises
title: Request Access
---
{{< callout url="#" btn_hidden="true" header="faux" >}}
Request Access est en préversion et est déployé progressivement. Il se peut que Request Access ne soit pas encore disponible dans votre organisation.
{{< /callout >}}

## Présentation {#overview}

Obtenir l'accès à une fonctionnalité dans Datadog peut signifier savoir à qui s'adresser, créer un ticket et attendre une réponse. Pour les organisations gérant de nombreux rôles et utilisateurs, cela ralentit les utilisateurs et crée un travail manuel pour les administrateurs.

Request Access permet à un utilisateur de demander l'autorisation dont il a besoin directement depuis la page où il a été bloqué, avec une justification pour la demande. Les administrateurs peuvent examiner et approuver ces demandes depuis une file d'attente centrale, ou configurer des rôles spécifiques pour qu'ils soient accordés automatiquement. Chaque demande, décision et justification apparaît dans [Audit Trail][2], afin que les modifications d'accès restent traçables sans ticket de support.

## Activer ou désactiver Request Access {#enable-or-disable-request-access}

**Remarque** : Vous devez disposer de l'autorisation `user_access_manage`.

Pour activer les demandes d'approbation manuelle ou automatique pour votre organisation, accédez à [Organization Settings][1] et sélectionnez {{< ui >}}Access Controls{{< /ui >}}, puis créez la configuration correspondante. Consultez [Configuration des demandes d'accès en tant qu'administrateur](#configuring-access-requests-as-an-administrator) pour plus de détails sur la configuration.

Pour désactiver les demandes d'approbation manuelle ou automatique, supprimez toutes les configurations correspondantes. La désactivation est particulièrement pertinente si vous gérez les accès via un processus interne distinct d'élévation des accès.

## Demander l'accès en tant qu'utilisateur final {#requesting-access-as-an-end-user}

### Depuis une page d'accès refusé {#from-a-permission-denied-page}

Lorsque vous accédez à une page qui nécessite une autorisation que vous n'avez pas, Datadog affiche une page 403 d'accès refusé. Si votre organisation a activé une configuration d'approbation manuelle ou automatique pour un rôle incluant cette autorisation, un bouton {{< ui >}}Request Access{{< /ui >}} apparaît sur la page.

1. Cliquez sur {{< ui >}}Request Access{{< /ui >}}.
2. Saisissez une justification pour la demande.
3. Envoyez la demande.

Si une configuration d'approbation automatique correspondante existe, Datadog accorde l'accès en une minute et vous en informe. Sinon, Datadog envoie la demande aux approbateurs de votre organisation pour un examen manuel.

### Depuis la page Roles {#from-the-roles-page}

Vous pouvez également demander un rôle directement, sans passer au préalable par une page d'accès refusé.

1. Accédez à [Organization Settings][1] et sélectionnez {{< ui >}}Roles{{< /ui >}}.
2. Recherchez le rôle souhaité et ouvrez son panneau de détails.
3. Cliquez sur {{< ui >}}Request Access{{< /ui >}}.
4. Saisissez une justification et soumettez.

Les demandes de rôle directes suivent les mêmes règles d'approbation et d'approbation automatique que les demandes effectuées depuis une page de refus d'autorisation.

### Pour une ressource {#for-an-asset}

Vous pouvez également demander l'accès aux assets tels que Monitors et Dashboards si votre administrateur a configuré des règles d'approbation automatique.

Pour demander l'accès à une ressource individuelle, accédez à la ressource et cliquez sur {{< ui >}}Request Access{{< /ui >}}. Si vous disposez déjà d'un accès en lecture seule et que vous souhaitez demander un niveau d'autorisation supérieur, ouvrez plutôt les paramètres de partage existants pour la ressource.

## Configurer les demandes d'accès en tant qu'administrateur {#configuring-access-requests-as-an-administrator}

Accédez à [Organization Settings][1] et sélectionnez {{< ui >}}Access Controls{{< /ui >}} pour configurer et gérer tous les paramètres de demande d'accès. Vous avez besoin de l'autorisation `user_access_manage` pour accéder à cette page.

### Approbation manuelle {#manual-approval}

L'approbation manuelle transmet une demande à une liste d'approbateurs, qui peuvent l'approuver ou la refuser. Votre organisation prend en charge une configuration d'approbation manuelle, et son activation active les demandes manuelles pour chaque rôle de l'organisation.

1. Accédez à [Organization Settings][1] et sélectionnez {{< ui >}}Access Controls{{< /ui >}}.
2. Créez une configuration d'approbation manuelle.
3. Sélectionnez les utilisateurs qui peuvent approuver les demandes. Seuls les utilisateurs disposant de l'autorisation `user_access_manage` sont éligibles.

Si vous ne désignez pas d'approbateurs, chaque utilisateur disposant de `user_access_manage` peut toujours approuver ou refuser les demandes, mais aucun d'entre eux ne reçoit de notifications par e-mail.

Les approbateurs examinent les demandes en attente depuis l'onglet {{< ui >}}Pending Requests{{< /ui >}} sur la page Contrôles d'accès, où chaque demande affiche le demandeur, le rôle et la justification du demandeur. Datadog envoie un e-mail au demandeur après qu'un approbateur a effectué une action.

### Approbation automatique pour les rôles et les autorisations {#auto-approval-for-roles-and-permissions}

L'approbation automatique permet aux utilisateurs éligibles de se débloquer immédiatement, sans étape d'examen manuel.

1. Accédez à [Organization Settings][1] et sélectionnez {{< ui >}}Access Controls{{< /ui >}}.
2. Créez une configuration d'approbation automatique. Votre organisation prend en charge jusqu'à 10 configurations.
3. Sélectionnez les rôles que cette configuration approuve automatiquement.
4. Optionnellement, restreignez les utilisateurs, équipes ou rôles pouvant déclencher cette configuration. Si vous laissez ce champ vide, la configuration s'applique à tous les utilisateurs.

### Accès temporaire (Aperçu) {#temporary-access-preview}

Une configuration d'approbation automatique peut accorder un rôle pour une durée limitée au lieu de façon permanente. Définissez la durée d'attribution lors de la création de la configuration : 1 heure, 1 jour, 1 semaine, 30 jours ou permanent.

Lorsqu'une attribution de rôle temporaire expire, Datadog la révoque dans un délai de 5 minutes. Vous pouvez consulter les attributions de rôle actives et expirantes d'un utilisateur depuis sa page de profil, ou depuis [Organization Settings][1] sous {{< ui >}}Users{{< /ui >}}.

### Auto-approbation pour les ressources {#auto-approval-for-assets}

L'auto-approbation des ressources étend le même modèle en libre-service aux ressources individuelles. Votre organisation peut approuver automatiquement l'accès en lecture ou en modification pour les types de ressources suivants :

- Projets Case Management
- Dashboards
- Monitors
- Notebooks
- Reference Tables
- Tests Synthetic
- Variables globales Synthetic
- Emplacements privés Synthetic

L'activation d'un type de ressource applique la configuration à chaque ressource de ce type. Tout comme l'auto-approbation des rôles et des autorisations, les configurations d'auto-approbation des ressources peuvent être limitées à des utilisateurs, des équipes ou des rôles spécifiques. Configurez le périmètre du demandeur séparément pour chaque niveau d'accès. Par exemple, vous pouvez autoriser tous les utilisateurs à demander un accès en lecture aux Dashboards tout en limitant les demandes d'accès en modification à une équipe spécifique.

## Audit Trail {#audit-trail}

Datadog consigne chaque demande d'accès dans [Audit Trail][2], y compris le demandeur, le rôle ou la ressource demandé(e), la justification et le résultat. Utilisez Audit Trail pour examiner l'historique des accès sans dépendre de l'historique des tickets ou des discussions.

## Fonctionnement de la sélection de rôle {#how-role-selection-works}

Lorsqu'un utilisateur demande un accès en raison d'une autorisation manquante, Datadog sélectionne le rôle qui satisfait l'autorisation requise avec le moins d'autorisations totales. Si plusieurs rôles sont à égalité en nombre d'autorisations, Datadog choisit le premier par ordre alphabétique. Cette méthode de sélection limite le surprovisionnement sans exiger qu'un administrateur mappe chaque rôle à chaque scénario d'accès possible à l'avance.

## Limitations {#limitations}

- Votre organisation prend en charge une configuration d'approbation manuelle et jusqu'à 10 configurations d'approbation automatique.
- Si aucun rôle dans votre organisation ne contient l'autorisation requise, l'utilisateur n'a aucune option pour en demander l'accès.
- Les demandes accordent un rôle complet, et non une seule autorisation. Si vous avez besoin d'un contrôle plus précis, créez un rôle limité aux seules autorisations requises et définissez-le comme option d'approbation automatique ou manuelle.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /fr/account_management/audit_trail/