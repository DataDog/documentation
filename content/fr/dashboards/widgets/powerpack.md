---
description: Créez des groupes de widgets réutilisables pour standardiser les mises
  en page de dashboards et démultiplier l'expertise en matière de surveillance au
  sein des équipes.
disable_toc: false
further_reading:
- link: /dashboards/guide/powerpacks-best-practices/
  tag: Guide
  text: Diffuser l'expertise des créateurs de graphiques avec les powerpacks
- link: https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/
  tag: Blog
  text: Enregistrez les widgets du dashboard dans des groupes réutilisables avec les
    Powerpacks
- link: /dashboards/widgets/group/
  tag: Documentation
  text: Widget Groupe
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Widget Powerpack
---

## Présentation

<div class="alert alert-info">Les widgets Powerpack ne sont pas pris en charge sur les screenboards.</div>

Les Powerpacks sont des groupes de widgets modélisés qui démultiplient l'expertise en matière de graphiques sous forme de blocs de construction de dashboards réutilisables. Les Powerpacks sont soit prédéfinis (créés par Datadog, disponibles pour tous les clients), soit personnalisés (créés par un utilisateur et disponibles uniquement au sein de son organisation). Pour plus d'informations sur les bonnes pratiques relatives aux Powerpacks, consultez le guide [Démultiplier l'expertise en matière de graphiques avec les Powerpacks][1].

## Configuration

### Créer un Powerpack

Créez un Powerpack à partir d'un groupe existant dans un dashboard :

{{< img src="dashboards/widgets/powerpack/group_header_icons.png" alt="Icônes de l'en-tête de groupe de dashboard mettant en évidence l'option d'icône Enregistrer en tant que Powerpack" style="width:80%;" >}} 

1. Depuis l'en-tête d'un groupe de dashboard, cliquez sur l'icône « Save as Powerpack ».
1. Renseignez les détails pour rendre le Powerpack détectable par votre organisation.
1. Ajoutez des tags sous « Add Search Categories » pour organiser vos Powerpacks. Cela permet aux membres de l'équipe de trouver le bon Powerpack à ajouter à leur dashboard.
1. Choisissez les filtres qui doivent être configurables pour les utilisateurs du Powerpack.

**Remarque** : après la création d'un Powerpack, le groupe d'origine est remplacé par une instance du Powerpack.

### Mettre à jour un powerpack

Les modifications apportées à un Powerpack se synchronisent sur tous les dashboards où votre Powerpack est utilisé.

Pour modifier l'apparence ou la mise en page d'un Powerpack :
1. Passez la souris sur l'en-tête et cliquez sur le menu au trois barres.
1. Sélectionnez **Edit Powerpack Layout** dans le menu Powerpack Actions. **Remarque** : la mise en page des Powerpacks ne peut pas être modifiée sur les timeboards.
1. Apportez les modifications souhaitées à la mise en page du Powerpack ou à un widget individuel et sélectionnez **Confirm Changes**.
1. Si ce Powerpack est utilisé dans plusieurs dashboards, une invite s'ouvre pour confirmer les instances du Powerpack affectées par cette mise à jour.

{{< img src="dashboards/widgets/powerpack/powerpack_actions_menu.png" alt="Options du menu d'actions pour mettre à jour un Powerpack et l'instance du Powerpack accessibles via le menu aux trois points dans l'en-tête du Powerpack" style="width:60%;" >}}

Pour modifier les détails du Powerpack :
1. Passez la souris sur l'en-tête et cliquez sur le menu au trois points.
1. Sélectionnez **Edit Powerpack Details** dans le menu Powerpack Actions.
1. Modifiez les informations du Powerpack, les catégories de recherche ou la configuration des filtres, puis sélectionnez **Update Powerpack**.
1. Si ce Powerpack est utilisé dans plusieurs dashboards, une invite s'ouvre pour confirmer les instances du Powerpack affectées par cette mise à jour.

**Remarque** : vous devez disposer des [autorisations de modification](#powerpack-permissions) pour effectuer des mises à jour du Powerpack ou modifier les autorisations. 

## Utiliser les Powerpacks

### Ajouter ou supprimer une instance de Powerpack
Après avoir créé un Powerpack, vous pouvez ajouter une instance de ce Powerpack à plusieurs dashboards.

Pour ajouter une instance de Powerpack au dashboard :
1. Cliquez sur **Add Widgets** pour ouvrir le panneau de widgets.
1. Cliquez sur l'onglet **Powerpacks** pour afficher les Powerpacks disponibles. Vous pouvez effectuer une recherche par texte ou par tags prédéfinis.
1. Cliquez sur le Powerpack souhaité pour ouvrir la configuration de l'instance du Powerpack.
1. Sélectionnez les valeurs de filtre et le mode de contrôle des filtres.
    * Filtres Powerpack : la valeur sélectionnée s'applique aux widgets à l'intérieur de l'instance du Powerpack.
    * Filtres de dashboard : contrôlés par les template variables du dashboard.
1. Cliquez sur **Confirm**.

Pour supprimer une instance de Powerpack du dashboard :
1. Cliquez sur le menu au trois points dans l'en-tête de l'instance.
1. Sélectionnez **Remove from Dashboard**.

### Personnaliser une instance de Powerpack

Les modifications apportées à une instance de Powerpack ne s'appliquent **pas** aux autres instances de Powerpack dans d'autres dashboards.

Pour personnaliser les instances de Powerpack affichées dans votre dashboard :
1. Cliquez sur le menu au trois points dans l'en-tête de l'instance.
1. Sélectionnez une option dans le menu **Powerpack Actions** :
    1. Edit Display Options : personnalisez le style de l'en-tête du groupe, les couleurs d'affichage et le nom.
    1. Detach Instance : dissociez l'instance du Powerpack d'origine.
    1. Remove from Dashboard : supprimez l'instance du dashboard.
    1. Edit Powerpack Layout : personnalisez la mise en page des widgets dans l'instance.
    1. Edit Powerpack Details : personnalisez le titre, la description et les tags associés.
1. Choisissez de nouvelles options de style pour l'en-tête, mettez à jour le titre du groupe ou configurez les filtres utilisés par votre Powerpack.
1. Configurez les valeurs de tags de votre instance de Powerpack.

{{< img src="dashboards/widgets/powerpack/instance_configuration_modal.png" alt="Options de configuration d'une instance de Powerpack" style="width:80%;" >}}

## Supprimer un Powerpack

Seul l'auteur d'un Powerpack peut le supprimer. Après la suppression d'un Powerpack, les instances existantes du Powerpack restent intactes, mais elles affichent une alerte indiquant que le Powerpack a été supprimé. Pour supprimer cette alerte, dissociez l'instance et convertissez-la en groupe de widgets.

Pour supprimer un Powerpack :
1. Cliquez sur **Add Widgets** pour ouvrir le panneau de widgets.
1. Sélectionnez **Delete Powerpack**.

## Autorisations des Powerpacks

Pour modifier les autorisations de modification d'un Powerpack :
1. Passez la souris sur l'en-tête et cliquez sur le menu au trois points.
1. Sélectionnez **Modify Permissions** dans le menu Powerpack Actions.
1. Mettez à jour les utilisateurs disposant des autorisations de modification pour le Powerpack.

## API

Ce widget peut être utilisé avec l'**[API Dashboards][2]**. Le tableau ci-dessous définit le [schéma JSON du widget][3] :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/powerpacks-best-practices/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/