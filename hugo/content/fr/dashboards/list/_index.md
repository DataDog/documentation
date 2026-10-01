---
description: Organisez et gérez des dashboards avec des listes
disable_toc: false
further_reading:
- link: dashboards/
  tag: Documentation
  text: Présentation des dashboards
- link: dashboards/guide/maintain-relevant-dashboards
  tag: Guide
  text: Pratiques recommandées pour conserver des dashboards pertinents
title: Dashboard List
---
## Présentation {#overview}

Organisez et rationalisez votre collection croissante de dashboards grâce aux fonctionnalités de Dashboard List. Regroupez les dashboards dans des listes, assignez-les à des équipes spécifiques et marquez les plus importants comme favoris pour un accès rapide aux visualisations clés. Gérez davantage l'organisation des dashboards en utilisant des fonctionnalités telles que le filtrage par équipes, l'exécution d'actions groupées pour une gestion efficace et l'assignation d'équipes à plusieurs dashboards. Explorez, créez et gérez facilement des dashboards personnalisés ou intégrés sur la [page Dashboard List][1].
Affichez et gérez vos dashboards :
- [Utilisez le tableau {{< ui >}}All Dashboards{{< /ui >}} pour trier, rechercher et regrouper vos listes.](#view-all-dashboards)
- [Organisez vos vues de dashboards via des listes.](#lists)

## Affichez tous les dashboards {#view-all-dashboards}

Le tableau {{< ui >}}All Dashboards{{< /ui >}} répertorie les dashboards de votre organisation Datadog, qu'ils soient créés sur mesure ou disponibles en tant que dashboard prêt à l'emploi. Sélectionnez plusieurs dashboards dans le tableau pour effectuer des actions groupées, comme associer des [équipes](#teams) à des dashboards ou ajouter des dashboards à des [listes](#lists).

Vous pouvez trier par en-têtes de colonne {{< ui >}}Name{{< /ui >}}, {{< ui >}}Modified{{< /ui >}} et {{< ui >}}Popularity{{< /ui >}}.

| Colonne     | Description                                                                              |
|------------|------------------------------------------------------------------------------------------|
| Star       | Tous les dashboards marqués comme favoris par l'utilisateur actuel.                                              |
| Name       | Le nom du dashboard personnalisé ou prédéfini.                                              |
| Author     | L'icône de profil du créateur du dashboard.                                             |
| Teams      | [Équipes][2] assignées au dashboard.                                                    |
| Modified   | La date de dernière modification d'un dashboard personnalisé.                                            |
| Popularity | La [popularité](#popularity) relative du dashboard pour votre organisation.           |
| Icon       | Une icône indiquant le type de dashboard (Timeboard ou Screenboard).                     |


### Popularité {#popularity}

Le dashboard le plus populaire d'une organisation affiche cinq barres de popularité. Tous les autres dashboards sont relatifs à ce dashboard. La popularité est basée sur le volume de trafic qu'un dashboard reçoit. La popularité est mise à jour quotidiennement ; les nouveaux dashboards ont zéro barre de popularité pendant une durée allant jusqu'à 24 heures.

**Remarque** : Le trafic vers les URL des dashboards publics n'est pas pris en compte pour la popularité.

## Équipes {#teams}

Utilisez le [filtre d'équipe][3] pour afficher uniquement les dashboards appartenant aux équipes que vous sélectionnez. Pour revenir à l'affichage de tous les dashboards, effacez votre sélection.

Pour modifier les équipes associées à un ou plusieurs dashboards, procédez comme suit :
1. Cochez la case à côté de chaque dashboard que vous souhaitez modifier.
1. Ouvrez le menu déroulant {{< ui >}}Edit Teams{{< /ui >}} en haut à droite.
1. Utilisez les cases à cocher pour sélectionner les équipes appropriées pour les dashboards.
1. Cliquez sur {{< ui >}}Apply Changes{{< /ui >}}.

## Listes {#lists}

Les listes Dashboard regroupent les dashboards afin que vous et votre équipe puissiez passer de l'un à l'autre dans le même contexte. Vous pouvez ajouter des dashboards à des [listes prédéfinies](#preset-lists) ou à une liste personnalisée.

1. Pour créer une liste de dashboards, cliquez sur {{< ui >}}\+ New List{{< /ui >}} en haut à droite.
1. Cliquez sur l'icône en forme de crayon pour modifier le titre d'une liste. Le titre de la liste est automatiquement défini avec le prénom de l'utilisateur. Par exemple, `John's list`.
1. Ajoutez des dashboards à une liste. Dans le tableau [{{< ui >}}All Dashboards{{< /ui >}}](#view-all-dashboards), cochez les cases à côté du titre du dashboard. Cliquez ensuite sur le menu déroulant {{< ui >}}Add to{{< /ui >}} dans le coin supérieur droit de la liste Dashboard et sélectionnez la liste.

La barre latérale gauche affiche toutes les listes, que vous pouvez filtrer par équipe ou via des termes de recherche. Activez {{< ui >}}Hide Controls{{< /ui >}} pour masquer cette barre latérale.

### Listes favorites {#favorite-lists}

Les listes favorites sont des listes de dashboards marquées d'une étoile par l'utilisateur actuellement connecté. **Remarque** : Si vous n'avez aucune liste marquée d'une étoile, la catégorie {{< ui >}}Favorite Lists{{< /ui >}} est masquée.

### Listes prédéfinies {#preset-lists}

Les listes prédéfinies sont des dashboards prêts à l'emploi dans Datadog :

| Liste                     | Description                                                               |
|--------------------------|---------------------------------------------------------------------------|
| All Custom               | Dashboards personnalisés créés par n'importe quel membre de l'équipe dans le compte de votre organisation. |
| All Hosts                | Dashboards automatiques créés par Datadog lorsque vous ajoutez un host.              |
| All Integrations         | Dashboards automatiques créés par Datadog lorsque vous installez une intégration.  |
| All Shared               | Dashboards avec partage de lien authentifié ou public activé.             |
| Created By You           | Dashboards personnalisés créés par l'utilisateur actuel.                            |
| Recently Deleted         | Dashboards supprimés au cours des 30 derniers jours. [Restaurez les dashboards supprimés](#restore-deleted-dashboards) à partir de cette liste.|
| Security and Compliance  | Dashboards de sécurité prêts à l'emploi.                                       |

### Restaurez les dashboards supprimés {#restore-deleted-dashboards}

Utilisez la liste prédéfinie {{< ui >}}Recently Deleted{{< /ui >}} pour restaurer les dashboards supprimés. Dans la liste, sélectionnez tous les dashboards à restaurer et cliquez sur {{< ui >}}Restore to{{< /ui >}}. Sélectionnez une liste spécifique vers laquelle restaurer les dashboards, ou sélectionnez {{< ui >}}All Custom{{< /ui >}} pour les restaurer sans liste personnalisée. Les dashboards dans {{< ui >}}Recently Deleted{{< /ui >}} sont définitivement supprimés après 30 jours.

{{< img src="dashboards/list/recently_deleted_restore.png" alt="Restaurez le dashboard supprimé dans la liste Récemment supprimés" style="width:100%;">}}

## Syntaxe de recherche {#search-syntax}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
La syntaxe de recherche des dashboards est en préversion.
{{< /callout >}}

Utilisez la barre de recherche en haut de la page Dashboard List pour filtrer les dashboards par nom, auteur, tags ou contenu de widget. La recherche prend en charge les requêtes en texte libre, les filtres clé:valeur, les opérateurs booléens et les comparaisons de plages.

### Recherche en texte libre {#free-text-search}

Saisissez un ou plusieurs mots pour effectuer une recherche dans les titres, descriptions, noms d'auteur, tags et contenu des widgets des dashboards.

- **Jeton unique** : `redis` correspond aux dashboards contenant « redis » dans le titre, l'auteur, les tags ou les widgets.
- **Jetons multiples** : `redis postgres` équivaut à `redis AND postgres`—les deux jetons doivent apparaître.
- **Expression entre guillemets** : `"web latency"` correspond exactement à cette expression.
- **Caractère générique** : `elastic*` correspond à « elasticsearch », « elastic-search » et similaire.

### Filtres clé:valeur {#keyvalue-filters}

Affinez les résultats sur un champ spécifique en utilisant la syntaxe `key:value`.

| Filtre | Description | Exemple |
|--------|-------------|---------|
| `author:<value>` | Dashboards dont le nom d'utilisateur ou le nom d'affichage de l'auteur correspond à | `author:jane.doe` |
| `title:<value>` | Titre du dashboard | `title:elasticsearch` |
| `description:<value>` | Description du dashboard | `description:latency` |
| `team:<value>` | Tag d'équipe | `team:dashboards-backend` |
| `favorites:true` | Dashboards que vous avez mis en favoris | `favorites:true` |
| `type:<value>` | Type de dashboard. Utilisez `custom`, `integration` ou des valeurs concrètes telles que `custom_timeboard`, `custom_screenboard`, `integration_timeboard`, `integration_screenboard`. | `type:integration` |
| `is_shared:true` | Dashboards avec partage par lien activé | `is_shared:true` |
| `popularity:<range>` | Score de popularité (0 à 1) | `popularity:>=0.5` |
| `widgets.count:<range>` | Nombre de widgets | `widgets.count:<5` |
| `widgets.title:<value>` | Titre du widget | `widgets.title:cpu` |
| `widgets.type:<value>` | Type de widget | `widgets.type:geomap` |
| `widgets.metrics:<value>` | Métrique utilisée dans un widget | `widgets.metrics:system.cpu.user` |
| `template_variables.name:<value>` | Nom de la variable de modèle | `template_variables.name:service` |
| `template_variables.prefix:<value>` | Préfixe de la variable de modèle | `template_variables.prefix:env` |
| `template_variables.defaults:<value>` | Valeur par défaut de la variable de modèle | `template_variables.defaults:prod` |
| `template_variables.available_values:<value>` | Valeur de variable de modèle disponible | `template_variables.available_values:us-east` |

### Opérateurs booléens {#boolean-operators}

Combinez les filtres avec `AND`, `OR` et `NOT` (sensible à la casse ). Le préfixe `-` et le préfixe `!` sont équivalents à `NOT`.

| Opérateur | Description | Exemple |
|----------|-------------|---------|
| `AND` | Les deux conditions doivent correspondre | `type:integration AND team:platform` |
| `OR` | L'une ou l'autre condition doit correspondre | `k8s OR kubernetes` |
| `NOT` / `-` / `!` | Exclure les dashboards correspondants | `NOT type:integration` |
| `field:(A OR B)` | Faites correspondre l'une ou l'autre valeur dans un seul champ | `team:(backend OR frontend)` |

### Opérateurs de plage {#range-operators}

Utilisez `<`, `>`, `<=` et `>=` avec des champs numériques .

| Filtre | Description | Exemple |
|--------|-------------|---------|
| `widgets.count:<N` | Moins de N widgets | `widgets.count:<3` |
| `widgets.count:>=N` | N widgets ou plus | `widgets.count:>=10` |
| `popularity:>=N` | Popularité égale ou supérieure au seuil | `popularity:>=0.2` |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists
[2]: /fr/account_management/teams/
[3]: /fr/account_management/teams/#team-filter