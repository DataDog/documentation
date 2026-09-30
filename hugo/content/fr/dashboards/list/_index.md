---
description: Organiser et gérer des dashboards avec des listes
disable_toc: false
further_reading:
- link: dashboards/
  tag: Documentation
  text: Présentation des dashboards
- link: dashboards/guide/maintain-relevant-dashboards
  tag: Guide
  text: Pratiques recommandées pour conserver des dashboards pertinents
title: Liste de dashboards
---

## Présentation

Organisez et simplifiez votre collection grandissante de dashboards grâce aux fonctionnalités de la page Dashboard List. Regroupez les dashboards dans des listes, attribuez-les à des équipes spécifiques, et ajoutez les plus importants à vos favoris pour pouvoir accéder rapidement à des visualisations essentielles. Améliorez l'organisation de vos dashboards grâce au filtrage par équipe, aux opérations groupées pour une gestion plus efficace, et à l'assignation d'équipes à plusieurs dashboards. Créez, explorez et gérer en toute simplicité des dashboards personnalisés ou intégrés depuis la [page Dashboard List][1]. Vous pouvez visualiser et gérer vos dashboards de plusieurs façons :
- [Utilisez le tableau *All Dashboards* pour trier vos dashboards, les rechercher et les regrouper au sein de listes](#afficher-tous-les-dashboards)
- [Organisez les vues de vos dashboards à l'aide de listes](#listes)

## Afficher tous les dashboards

Le tableau **All Dashboards** énumère tous les dashboards de votre organisation Datadog, que ce soit les dashboards prêts à l'emploi ou les dashboards personnalisés qui ont été créés. Sélectionnez plusieurs dashboards dans le tableau pour effectuer des opérations groupées, par exemple afin d'associer des [équipes](#equipes) à des dashboards ou d'ajouter des dashboards à des [listes](#listes).

Vous pouvez trier les dashboards en fonction des en-têtes de colonne *Name*, *Modified* et *Popularity*.

| Colonne     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | Tous les dashboards pour lesquels l'utilisateur actuel a ajouté une étoile.                                              |
| Name       | Le nom du dashboard personnalisé ou prédéfini.                                              |
| Author     | L'icône du profil du créateur du dashboard.                                             |
| Teams      | Les [équipes][2] assignées au dashboard.                                                    |
| Modified   | La date de dernière modification d'un dashboard personnalisé.                                            |
| Popularity | La [popularité](#popularité) relative du dashboard au sein de votre organisation.           |
| Icon       | Une icône indiquant le type du dashboard (Timeboard ou Screenboard).                     |


### Popularité

Le dashboard le plus populaire d'une organisation est caractérisé par cinq barres de popularité. La popularité des autres dashboards dépend de ce dashboard. Elle est basée sur le trafic des dashboards et mise à jour quotidiennement. Les nouveaux dashboards n'ont aucune barre de popularité pendant les 24 premières heures.

**Remarque** : le trafic vers les URL de dashboards publics n'est pas pris en compte dans le calcul de la popularité.

## Équipes

Utilisez l'option **My Teams** pour afficher tous les dashboards ou uniquement les dashboards appartenant à vos [équipes][2].

Pour modifier les équipes associées à un ou plusieurs dashboards, procédez comme suit :
1. Cochez la case en regard de chaque dashboard à modifier.
1. Ouvrez le menu déroulant **Edit Teams** dans le coin supérieur droit.
1. Cochez les cases en regard des équipes pertinentes pour les dashboards.
1. Cliquez sur **Apply Changes**.

## Listes

Les listes de dashboards regroupent des dashboards afin de permettre à votre équipe et à vous-même de passer d'un dashboard à un autre avec le même contexte. Vous pouvez ajouter des dashboards aux [listes prédéfinies](#listes-predefinies) ou à une liste personnalisée.

1. Pour créer une liste de dashboards, cliquez sur **+ New list** en haut à droite.
1. Cliquez sur l'icône en forme de crayon pour modifier le titre d'une liste. Le titre de la liste est automatiquement défini sur le prénom de l'utilisateur, par exemple `John's list`. 
1. Ajoutez des dashboards à une liste. Dans le tableau **[All Dashboards](#afficher-tous-les-dashboards)**, cochez les cases situées en regard du titre du dashboard. Cliquez ensuite sur le menu déroulant **Add to** dans le coin supérieur droit de la liste des dashboards et sélectionnez la liste.

La barre latérale gauche affiche toutes les listes. Vous pouvez appliquer un filtre basé sur une équipe ou sur des termes de recherche. Activez l'option **Hide Controls** pour masquer cette barre latérale.

### Listes favorites

Les listes favorites sont des listes de dashboards pour lesquelles l'utilisateur actuellement connecté a ajouté une étoile. **Remarque** : si vous n'avez ajouté d'étoile à aucune liste, cette catégorie est masquée.

### Listes prédéfinies

Les listes prédéfinies sont des listes de dashboards prêts à l'emploi dans Datadog :

| Liste                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Rassemble les dashboards personnalisés créés par un membre d'équipe dans le compte de votre organisation. |
| All Hosts                | Rassemble les dashboards créés automatiquement par Datadog lors de l'ajout d'un host.              |
| All Integrations         | Rassemble les dashboards créés automatiquement par Datadog lors de l'installation d'une intégration.  |
| All Shared               | Rassemble les dashboards pour lesquels le partage d'un lien avec authentification ou public est activé.             |
| Created By You           | Rassemble les dashboards personnalisés créés par l'utilisateur actuel.                            |
| Frequently Viewed By You | Rassemble tous les dashboards consultés régulièrement par l'utilisateur actuel.                     |
| Recently Deleted         | Rassemble les dashboards supprimés au cours des 30 derniers jours. Vous pouvez [restaurer des dashboards supprimés](#restaurer-des-dashboards-supprimes) à partir de cette liste.|
| Security and Compliance  | Dashboards de sécurité prêts à l'emploi.                                       |

### Restaurer des dashboards supprimés

Utilisez la liste prédéfinie **Recently Deleted** pour restaurer les dashboards supprimés. Depuis cette liste, sélectionnez tous les dashboards à restaurer, puis cliquez sur **Restore to**. Sélectionnez une liste spécifique vers laquelle envoyer les dashboards restaurés, ou sélectionnez **All Custom** pour les restaurer sans aucune liste personnalisée. Les dashboards qui figurent dans la liste **Recently Deleted** sont supprimés de façon définitive après 30 jours.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restaurer un dashboard supprimé à partir de la liste Recently Deleted" style="width:100%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /fr/account_management/teams/