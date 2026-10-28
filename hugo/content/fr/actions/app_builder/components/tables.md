---
aliases:
- /fr/service_management/app_builder/tables/
- /fr/service_management/app_builder/components/tables
description: Fonctionnalités avancées du composant de tableau, notamment le filtrage
  côté client, le filtrage côté serveur, les indicateurs de chargement et les valeurs
  dynamiques.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: Documentation
  text: Composants
- link: /actions/app_builder/build/
  tag: Documentation
  text: Créer des applications
title: Tables
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder est en préversion sur le site Datadog Government US1-FED.
</div>
{{< /site-region >}}

Cette page décrit les fonctionnalités avancées que vous pouvez utiliser pour manipuler les composants de tableau dans vos applications App Builder.

## Filtrage côté client{#client-side-filtering}

Lorsque vous disposez déjà d'une liste complète d'éléments et que vous souhaitez les filtrer, il existe plusieurs méthodes pour le faire côté client.

### Filtrage par colonne{#column-filtering}

Sous {{< ui >}}Columns{{< /ui >}}, développez une colonne et activez l'option {{< ui >}}Filterable{{< /ui >}} pour permettre aux utilisateurs de filtrer par entrées dans cette colonne. Une fois activé, un menu déroulant apparaît dans l'en-tête du tableau, permettant à l'utilisateur de sélectionner un élément de cette colonne pour effectuer un filtrage.

### Filtrage par plage de dates{#filter-by-date-range}

Pour autoriser le filtrage par plage de dates, sous {{< ui >}}Appearance{{< /ui >}}, activez l'option {{< ui >}}Has Date Range Filter{{< /ui >}} et sélectionnez un chemin de données pour le filtrage. Une fois activé, un menu déroulant apparaît dans l'en-tête du tableau, permettant à l'utilisateur de sélectionner une période de filtrage.

### Filtrage avec recherche{#filter-with-search}

Pour ajouter une barre de recherche à votre tableau, sous {{< ui >}}Appearance{{< /ui >}}, activez l'option {{< ui >}}Is Searchable{{< /ui >}}.

### Filtrer un tableau avec une saisie de texte ou un composant de recherche{#filter-a-table-with-a-text-input-or-search-component}

Un cas d'utilisation courant consiste à filtrer un composant de tableau en utilisant la valeur d'un composant de saisie de texte.

Par exemple, si vous souhaitez lister vos dashboards dans un tableau que vous pouvez filtrer à l'aide d'un composant de saisie de texte, vous pouvez procéder comme suit :

1. Ajoutez une nouvelle requête en utilisant le bouton {{< ui >}}\+{{< /ui >}}.
1. Recherchez « liste dashboards » et cliquez sur l'action {{< ui >}}List Dashboards{{< /ui >}}. Nommez votre requête `listDashboards0`.
1. Ajoutez un composant de saisie de texte ou de recherche à votre application. Nommez-le `searchInput`.
1. Ajoutez un composant de tableau.
1. Définissez la propriété {{< ui >}}data source{{< /ui >}} du tableau sur vos données filtrées par le composant de saisie de texte ou de recherche que vous avez créé. Dans cet exemple, définissez {{< ui >}}data source{{< /ui >}} sur l'expression suivante :

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(searchInput.value))}
    ```

Vous pouvez saisir du texte dans le composant de saisie de texte et les lignes du tableau sont filtrées par ce texte.

### Filtrer un tableau avec un composant de sélection {#filter-a-table-with-a-select-component}

Un autre cas d'utilisation courant consiste à filtrer un tableau à l'aide d'un composant de sélection.

Par exemple, si vous souhaitez lister vos dashboards dans un tableau que vous pouvez filtrer à l'aide d'un composant de sélection, vous pouvez procéder comme suit :

1. Ajoutez une nouvelle requête en utilisant le bouton {{< ui >}}\+{{< /ui >}}.
1. Recherchez « liste dashboards » et cliquez sur l'action {{< ui >}}List Dashboards{{< /ui >}}. Nommez votre requête `listDashboards0`.
1. Ajoutez un composant de sélection à votre application. Nommez-le `selectInput`.
1. Ajoutez un composant de tableau.
1. Définissez la propriété {{< ui >}}data source{{< /ui >}} du tableau sur vos données filtrées par le composant de sélection. Dans cet exemple, définissez {{< ui >}}data source{{< /ui >}} sur l'expression suivante :

    ```
    ${listDashboards0?.outputs.dashboards.filter(row => row.title.includes(selectInput.value))}
    ```

Vous pouvez sélectionner une valeur dans le composant de sélection et les lignes du tableau sont filtrées par cette valeur.

### Filtrer les résultats de requête à l'aide d'une transformation post-requête {#filter-query-results-using-a-post-query-transformation}

Si vous souhaitez filtrer les résultats d'une requête elle-même, puis utiliser ces résultats dans votre tableau, effectuez les étapes suivantes :

1. Ajoutez une nouvelle requête en utilisant le bouton {{< ui >}}\+{{< /ui >}}.
1. Recherchez « liste dashboards » et cliquez sur l'action {{< ui >}}List Dashboards{{< /ui >}}. Nommez votre requête `listDashboards0`.
1. Ajoutez un composant de saisie de texte ou de recherche à votre application. Nommez-le `searchInput`.
1. Ajoutez un composant de tableau et définissez sa propriété {{< ui >}}data source{{< /ui >}} sur la requête que vous avez ajoutée.
1. Développez la section {{< ui >}}Advanced{{< /ui >}} de la requête et recherchez {{< ui >}}Post-query Transformation{{< /ui >}}.
1. Remplacez `return outputs` par la ligne suivante :

    ```
    outputs.dashboards.filter(row => row.title.includes(searchInput.value))
    ```

Vous pouvez saisir du texte dans le composant de saisie de texte et les lignes du tableau sont filtrées par ce texte.

Si vous avez besoin du résultat de la requête original et non transformé, vous pouvez y faire référence en tant que `${listDashboards0.rawOutputs}`.

## Filtrage côté serveur {#server-side-filtering}

Dans certains cas, vous souhaiterez peut-être filtrer les valeurs côté serveur et émettre de nouvelles requêtes lorsque l'utilisateur saisit une valeur dans une entrée telle qu'un composant de saisie de texte.

Dans ce cas, vous pouvez activer le filtrage côté serveur en modifiant directement la requête.

Par exemple, dans le blueprint [GitHub PR pipeline][4], la requête `listOpenedPulls` possède une entrée qui obtient l'URL suivante :

```
https://api.github.com/search/issues?q=org:${organizationInput.value}+author:${userNameInput.value}+type:pr+state:open
```

L'API GitHub accepte des paramètres de requête pour le filtrage basé sur l'organisation, l'auteur ou le type de demande de tirage. L'URL d'entrée de requête précédente contient des expressions de modèle pour `organizationInput.value`, qui est la valeur du composant de saisie de texte « Organization », et `userNameInput.value`, qui est la valeur du composant de saisie de texte « Username ». Si vous définissez les paramètres d'exécution de la requête sur auto, la requête s'actualise automatiquement lorsque les valeurs de ces expressions de modèle changent, et les valeurs du tableau sont mises à jour.


## Affichage d'un indicateur de chargement {#showing-a-loading-indicator}

Si vous souhaitez afficher un indicateur de chargement sur un tableau pendant que les données sont récupérées, vous pouvez définir la valeur `isLoading` du _tableau_ sur la propriété `isLoading` de la _requête_. Exemple :

1. Suivez les étapes décrites dans [filtrage avec une saisie de texte][2].
1. Dans les propriétés de votre tableau, sous {{< ui >}}Appearance{{< /ui >}}, cliquez sur {{< ui >}}&lt;/&gt;{{< /ui >}} à côté de {{< ui >}}Is Loading{{< /ui >}} pour ouvrir l'éditeur de code.
1. Définissez la valeur `isLoading` du tableau sur l'expression suivante :

    ```
    ${listDashboards0.isLoading}
    ```

Le tableau affiche un indicateur de chargement lorsque vous saisissez du nouveau texte dans le composant de saisie de texte.

## Valeurs de tableau dynamiques {#dynamic-table-values}

Vous pouvez utiliser {{< ui >}}data source{{< /ui >}}la propriété d'un composant de tableau pour remplir dynamiquement les valeurs du tableau et limiter les objets extraits dans le tableau en tant que colonnes.

Par exemple, le blueprint [GitHub PR Summarizer][3] utilise une série de requêtes GitHub pour résumer une liste de demandes de tirage dans un dépôt. La requête utilise l'entrée de source de données ci-dessous pour limiter le tableau à 6 colonnes : `title`, `Summary`, `updated_at`, `user`, `html_url` et `state`. Le code mis en surbrillance remplit dynamiquement la colonne utilisateur pour chaque demande de tirage avec l'avatar et le nom d'utilisateur GitHub de l'auteur.

{{< highlight js "hl_lines=17" >}}
${(() => {
    const summaryById = Object.fromEntries(
        summarizePulls.outputs.map(({id, summary}) => [id, summary])
    );
    return listPulls.outputs.map(result => {
        const {title, updated_at, user, state, html_url} = result;
        const updatedAt = new Date(result.updated_at);
        let summary;
        if (summarizePulls.isLoading) {
            summary = 'Summarizing';
        } else {
            summary = summaryById[result.id] ?? 'N/A';
        }
        return {
            title: `**${title}**`,
            updated_at: updatedAt.toLocaleString(),
            user: {label: user.login, src: user.avatar_url},
            summary,
            state, html_url};
    })
})()}
{{< /highlight >}}

Dans le tableau, la colonne {{< ui >}}User{{< /ui >}} se remplit avec un avatar et le nom d'utilisateur GitHub pour chaque auteur de PR.



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Datadog Community Slack][0].

[0]: https://chat.datadoghq.com/
[1]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=pagerduty_oncall_manager&viewMode=preview
[2]: /fr/actions/app_builder/components/tables/#filtering-with-a-text-input
[3]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=github-pr-summarizer
[4]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=github-pr-dashboard&viewMode=preview