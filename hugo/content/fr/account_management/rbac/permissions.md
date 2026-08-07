---
algolia:
  category: Documentation
  rank: 80
  subcategory: Datadog Role Permissions
aliases:
- /fr/account_management/faq/managing-global-role-permissions
description: Référence complète des autorisations Datadog, y compris les rôles gérés,
  les rôles personnalisés, les autorisations sensibles et la liste des autorisations.
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: Documentation
  text: Créer, mettre à jour et supprimer un rôle
- link: /api/v2/roles/#list-permissions
  tag: Documentation
  text: Gérer vos autorisations avec l'API Permission
title: Autorisations des rôles Datadog
---
## Autorisations {#permissions}

Les autorisations définissent le type d'accès qu'un utilisateur a à une ressource donnée. En général, les autorisations donnent à un utilisateur le droit de lire, d'éditer ou de supprimer un objet. Les autorisations sous-tendent les droits d'accès de tous les rôles, y compris les trois rôles gérés et les rôles personnalisés.

### Autorisations sensibles {#sensitive-permissions}

Certaines autorisations Datadog offrent un accès à des fonctionnalités à privilèges élevés dont il est important d'être conscient, telles que :

- Accès pour modifier les paramètres de l'organisation
- Accès pour lire des données potentiellement sensibles
- Accès pour effectuer des opérations privilégiées

Les autorisations sensibles sont signalées dans les interfaces Rôles et Autorisations pour indiquer qu'elles peuvent nécessiter une attention accrue. En tant que meilleure pratique, les administrateurs configurant des rôles doivent prêter une attention particulière à ces autorisations et confirmer lesquelles de ces autorisations sont attribuées à leurs rôles et utilisateurs.

### Autorisations en mode aperçu {#preview-mode-permissions}

Certaines autorisations apparaissent en "mode aperçu" avant de devenir pleinement appliquées. Pendant cette période :

- Les autorisations en aperçu sont marquées dans l'application avec un badge "Aperçu"
- Elles ne restreignent pas l'accès jusqu'à la fin de la période d'aperçu
- L'aperçu dure généralement de 2 à 4 semaines avant que l'application des restrictions ne commence.
- Les administrateurs doivent configurer les rôles de manière appropriée pendant cette période

Le mode aperçu donne aux administrateurs de votre organisation la possibilité d'opter pour certaines nouvelles autorisations, afin qu'ils puissent éviter de perdre l'accès à des ressources qui étaient auparavant non restreintes. Les notes de version associées à chaque mode d'aperçu indiquent quand la permission est créée et quand elle sera appliquée. Bien que ces permissions ne restreignent pas l'accès pendant l'aperçu, Datadog recommande de mettre à jour les configurations de rôle avant qu'elles ne soient appliquées pour éviter toute interruption.

## Rôles {#roles}

### Rôles gérés {#managed-roles}

Par défaut, les utilisateurs existants sont associés à l'un des trois rôles gérés :

- Rôle Administrateur Datadog
- Rôle Standard Datadog
- Rôle Lecture Seule Datadog

Tous les utilisateurs ayant l'un de ces rôles peuvent lire des données, sauf pour les ressources [individuellement restreintes en lecture][1]. Les utilisateurs Administrateurs et Standards ont des autorisations d'écriture sur les actifs. Les utilisateurs Administrateurs ont des autorisations supplémentaires de lecture et d'écriture pour les actifs sensibles liés à la gestion des utilisateurs, à la gestion des organisations, à la facturation et à l'utilisation.

Les rôles gérés sont créés et maintenus par Datadog. Leurs autorisations peuvent être mises à jour automatiquement par Datadog à mesure que de nouvelles fonctionnalités sont ajoutées ou que les autorisations changent. Les utilisateurs ne peuvent pas modifier directement les rôles gérés, mais ils peuvent les cloner pour créer [des rôles personnalisés](#custom-roles) avec des autorisations spécifiques. Si nécessaire, les utilisateurs peuvent supprimer des rôles gérés de leur compte.

### Rôles personnalisés {#custom-roles}

Créez un rôle personnalisé pour combiner des autorisations dans de nouveaux rôles. Un rôle personnalisé vous permet de définir un profil, par exemple un administrateur de facturation, puis d'attribuer les autorisations appropriées pour ce rôle. Après avoir créé un rôle, attribuez ou retirez des autorisations à ce rôle directement en [mettant à jour le rôle dans Datadog][2], ou via l'[API d’autorisations Datadog][3]. Vous pouvez également ajouter une autorisation à plusieurs rôles personnalisés à la fois en sélectionnant ces rôles depuis la page des rôles et en cliquant sur {{< ui >}}Add Permission{{< /ui >}}.

Contrairement aux rôles gérés, les rôles personnalisés ne reçoivent pas de nouvelles autorisations lorsque Datadog publie de nouveaux produits et fonctionnalités, sauf s'ils sont configurés pour recevoir des mises à jour automatiques. Si les mises à jour automatiques sont désactivées, les rôles personnalisés ne reçoivent que de nouvelles autorisations pour maintenir la compatibilité lorsque Datadog publie une nouvelle autorisation restreignant une fonctionnalité existante.

Pour configurer les mises à jour automatiques pour les rôles personnalisés :

1. Allez sur la page des paramètres de l'organisation et cliquez sur l'onglet {{< ui >}}Roles{{< /ui >}}.
2. Cliquez sur le rôle que vous souhaitez mettre à jour et cliquez sur {{< ui >}}Edit Role{{< /ui >}}.
3. Sous {{< ui >}}Automatically Receives Permissions{{< /ui >}}, choisissez une option dans le menu déroulant : Aucune, Rôle Datadog en lecture seule, Rôle Datadog standard ou Rôle Datadog administrateur.

Si le rôle personnalisé est configuré pour recevoir des mises à jour automatiques, votre rôle personnalisé reçoit toutes les nouvelles autorisations lorsqu'elles sont publiées pour le modèle de rôle sélectionné. Aucune autorisation déjà publiée n'est ajoutée. Vous pouvez ajouter ou supprimer des autorisations de ce rôle et continuer à recevoir des mises à jour automatiques.

**Remarque**: Lorsque vous ajoutez un nouveau rôle personnalisé à un utilisateur, assurez-vous de supprimer le rôle Datadog géré associé à cet utilisateur pour appliquer strictement les nouvelles autorisations du rôle.

## Liste des autorisations {#permissions-list}

Le tableau suivant répertorie le nom, la description et le rôle par défaut pour toutes les autorisations disponibles dans Datadog. Chaque type d'actif a des autorisations de lecture et d'écriture correspondantes.

Chaque rôle géré hérite de toutes les autorisations des rôles moins puissants. Par conséquent, le rôle Datadog standard a toutes les autorisations énumérées dans le tableau avec Datadog en lecture seule comme rôle par défaut. De plus, le rôle Datadog administrateur contient toutes les autorisations des rôles Datadog standard et Datadog en lecture seule.

{{% permissions %}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration est une marque de commerce de Datadog, Inc.

[1]: /fr/account_management/rbac/granular_access
[2]: /fr/account_management/users/#edit-a-user-s-roles
[3]: /fr/api/latest/roles/#list-permissions