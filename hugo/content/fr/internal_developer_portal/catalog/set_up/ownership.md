---
aliases:
- /fr/internal_developer_portal/software_catalog/set_up/ownership
description: Associez des services et d'autres entités aux Datadog Teams afin de pouvoir
  filtrer les vues, acheminer les notifications et renforcer la responsabilité dans
  l'ensemble de votre portefeuille logiciel.
further_reading:
- link: /account_management/teams/
  tag: Documentation
  text: Teams
- link: /internal_developer_portal/catalog/entity_model/
  tag: Documentation
  text: Ajouter des métadonnées depuis le Datadog UI.
title: Définissez la propriété des entités de Catalog.
---
## Présentation {#overview}

Définissez la propriété dans Catalog pour associer les entités aux Datadog Teams responsables. Les informations de propriété apparaissent sur la page de détails de chaque entité et vous permettent de : 
- Filtrer les vues par équipe dans les Datadog products.
- Attribuez les Scorecards et les Campaigns aux bons propriétaires.
- Acheminer les notifications et le contexte d'astreinte à la bonne équipe.

## Créer une Team {#create-a-team}

Vous pouvez créer une Team depuis vos [Datadog Organization Settings][3] ou directement depuis [Catalog][1]. Pour obtenir des instructions complètes, consultez [Team set up and configuration][2]. 

La définition d'une Team comprend les éléments suivants :
1. **Nom de la Team** : par exemple, « Bits Demo ».
2. **Handle** : un identifiant unique, tel que `bits-demo`. Les handles peuvent être utilisés comme facettes de recherche (par exemple, `team:bits-demo`).
3. **Membres** : un ou plusieurs utilisateurs Datadog. 
4. **Description** : facultative, mais recommandée pour le contexte.

Après avoir créé une Team, vous pouvez ajouter des liens de référence, configurer des notifications et associer la Team à des ressources Datadog telles que des Monitors et des Dashboards.

## Configurer la propriété des entités {#configure-entity-ownership}

### Dans Datadog {#in-datadog}

Pour ajouter ou mettre à jour le propriétaire d'une entité dans Datadog :

1. Accédez au **Catalog** et ouvrez l'entité.
2. Cliquez sur **Edit in UI** sur la page de l'entité.
3. Dans la section **Ownership**, définissez le **Owner** et ajoutez éventuellement des **Additional owners**.
   - Recherchez par nom de Team ou collez un handle (par exemple, `team:example-team`).
5. Cliquez sur **Save Entry**.

### Via des fichiers de configuration {#through-configuration-files}

Si vous gérez des entités en tant que code (par exemple, via des définitions de service basées sur un dépôt ou l'automatisation), incluez le ou les team handle(s) dans le champ de métadonnées de l'entité qui correspond aux propriétaires. Assurez-vous que les handles correspondent exactement aux Datadog Teams existants.

## Bonnes pratiques {#best-practices}

- **Utilisez des Teams, pas des individus :** Assignez les entités à des Teams afin que les changements de membres n'interrompent pas les liens de propriété, les filtres ou les notifications.
- **Choisissez un propriétaire principal :** Désignez une Team responsable ; ajoutez des propriétaires secondaires uniquement si nécessaire.
- **Gardez des handles cohérents :** Utilisez des handles en minuscules et avec des traits d'union pour la cohérence et la facilité de recherche (par exemple, `payments-platform`, et non `Payments Platform`).
- **Synchronisez depuis votre IDP :** Si possible, provisionnez les Teams depuis SAML ou SCIM pour maintenir les membres à jour.
- **Utilisez les team filters :** Encouragez les ingénieurs à sélectionner leurs Teams dans le [team filter][4] pour concentrer les vues sur les entités possédées.
- **Utilisez des team hierarchies** : Créez des [subteams][5] pour refléter la structure de votre organisation et permettre un filtrage hiérarchique. 



[1]: https://app.datadoghq.com/teams
[2]: /fr/account_management/teams/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: /fr/account_management/teams/#team-filter
[5]: /fr/account_management/teams/manage/#team-hierarchies