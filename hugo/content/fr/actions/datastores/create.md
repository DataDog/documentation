---
aliases:
- /fr/actions/datastore/create
description: Créez des datastores avec des clés primaires, préremplissez-les avec
  des données initiales et gérez le contenu des datastores en les modifiant manuellement
  ou en téléchargeant des fichiers.
disable_toc: false
further_reading:
- link: actions/app_builder/build
  tag: Documentation
  text: Créer des applications
- link: actions/workflows/build
  tag: Documentation
  text: Créer des workflows
- link: https://www.datadoghq.com/blog/datadog-datastore/
  tag: Blog
  text: Améliorez vos workflows automatisés et vos applications avec Datastore
title: Créer et gérer des Datastores
---
Vous pouvez créer et gérer des datastores depuis la [page Datastore][1].

## Créer un datastore {#create-a-datastore}

Pour créer un datastore :

1. Accédez à la [page Datastores][1].
1. Cliquez sur {{< ui >}}\+ New Datastore{{< /ui >}}.
1. Saisissez un {{< ui >}}Name{{< /ui >}} pour votre datastore.
1. Saisissez une {{< ui >}}Primary Key{{< /ui >}} ou activez l'option {{< ui >}}Autogenerate a Primary Key{{< /ui >}} si une clé primaire n'est pas essentielle à votre cas d'utilisation.
   - Si vous choisissez de saisir une clé primaire, la clé doit être un nom de colonne dans vos données où chaque clé possède une valeur unique.
   - Le choix de l'autogénération d'une clé supprime votre capacité à fournir vos propres clés pour les nouveaux éléments du datastore, mais vous pouvez toujours mettre à jour les éléments existants en spécifiant leurs clés.
1. Optionnellement, saisissez une {{< ui >}}Description{{< /ui >}} pour votre datastore.
1. _Optionnellement_, vous pouvez initialiser votre datastore avec des données provenant d'un fichier JSON ou CSV. Utilisez l'une des méthodes suivantes pour téléverser le contenu du fichier :
   * Faites glisser et déposez le fichier dans l'interface utilisateur.
   * Cliquez sur {{< ui >}}browse files{{< /ui >}} pour parcourir et sélectionner un fichier depuis votre ordinateur.
   * Copiez un fichier CSV sur votre ordinateur et utilisez <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>V</kbd> pour le coller.

   Le fichier CSV ou JSON doit inclure une ligne d'en-tête avec une colonne qui correspond à votre clé primaire.
1. Cliquez sur {{< ui >}}Create{{< /ui >}}. Une fenêtre contextuelle de confirmation apparaît avec des options pour [créer un workflow ou une application][2] à partir de votre datastore, ou pour afficher le datastore.

### Créer à partir d'une application ou d'un workflow {#create-from-an-app-or-workflow}

Vous pouvez créer un datastore à partir d'une application ou d'un workflow en cliquant sur le bouton {{< ui >}}Datastore ID{{< /ui >}} dans une action de datastore et en sélectionnant {{< ui >}}New Datastore{{< /ui >}}.

{{< img src="actions/datastore/datastore-create.png" alt="Créer un workflow à partir d'un workflow en cliquant sur New Datastore" style="width:100%;" >}}

## Modifier un datastore {#edit-a-datastore}

### Modifier manuellement vos données {#manually-edit-your-data}

Pour modifier manuellement une ligne dans votre datastore :
1. Sur la [page Datastores][1], localisez votre datastore et cliquez dessus pour l'ouvrir.
1. Survolez la ligne que vous souhaitez modifier et cliquez sur {{< ui >}}Edit{{< /ui >}} {{< img src="icons/pencil.png" inline="true" style="width:14px;">}} icône.
1. Utilisez les onglets {{< ui >}}JSON{{< /ui >}} ou {{< ui >}}Raw text{{< /ui >}} pour modifier les clés de la ligne.

**Remarque :** Vous ne pouvez pas modifier manuellement la clé primaire d'une ligne. Si vous devez modifier une clé primaire, supprimez la ligne et ajoutez-la à nouveau ou téléversez à nouveau les données à partir d'un fichier.

### Mettre à jour à l'aide d'un fichier {#update-using-a-file}

Pour mettre à jour un datastore à l'aide d'un fichier :
1. Sur la [page Datastores][1], localisez votre datastore et cliquez dessus pour l'ouvrir.
1. Cliquez sur {{< ui >}}Add Data{{< /ui >}}.
1. Sélectionnez une option pour la gestion de vos données.
   - {{< ui >}}Overwrite{{< /ui >}} remplace les lignes existantes de votre tableau par les données de votre fichier.
   - {{< ui >}}Append{{< /ui >}} ajoute les lignes de votre fichier au jeu de données existant. L'option d'ajout ne vous permet pas d'ajouter des entrées en double à votre jeu de données.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.

## Afficher un datastore {#view-a-datastore}

Pour afficher un datastore, localisez votre datastore sur la [page Datastores][1] et cliquez dessus pour l'ouvrir.

Une fois que vous avez ouvert un datastore, vous pouvez :
- Exporter le jeu de données vers un fichier JSON ou CSV.
- Cliquez sur {{< ui >}}Columns{{< /ui >}} pour afficher ou masquer les colonnes du tableau.
- Cliquez sur {{< ui >}}Create{{< /ui >}} pour [créer un workflow ou une application][2] à partir du datastore.
- Cliquez sur {{< ui >}}Add data{{< /ui >}} pour [ajouter des données](#edit-a-datastore) à partir d'un fichier CSV ou JSON.

Le bouton {{< ui >}}Table Options{{< /ui >}} vous permet de :
- Modifier les [autorisations du datastore][3].
- Copier l'UUID du datastore, ce qui est utile pour les [applications avec plusieurs références de datastore][4].
- Cloner le datastore.
- Supprimer le datastore.

## Limitations {#limitations}

Les datastores présentent les limitations suivantes :

- Un datastore peut contenir jusqu'à 100 000 lignes.
- Une colonne de clé primaire de type `string` est requise et doit identifier chaque ligne de manière unique.
- Chaque ligne peut atteindre une taille de 100 Ko.
- La valeur de la clé primaire est immuable, elle ne peut pas être modifiée après la création de la ligne.

Contactez le [support][5] si vous avez un cas d'utilisation qui dépasse ces limites.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/datastores
[2]: /fr/actions/datastore/use#create-workflow-app
[3]: /fr/actions/datastore/auth/
[4]: /fr/actions/datastore/use#multiple-datastores
[5]: /fr/help/