---
aliases:
- /fr/graphing/widgets/note/
description: Affichez du texte dans un widget de dashboard.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Découvrir comment créer des dashboards avec JSON
title: Widget Notes et liens
---

Le widget **Notes et liens** fonctionne comme le [widget Texte libre][1], mais il offre davantage d'options d'affichage et de mise en forme.

**Remarque** : le widget Notes et liens ne prend pas en charge le HTML intégré.

## Configuration

1. Saisissez le texte que vous souhaitez afficher. Le format Markdown est pris en charge.
2. Sélectionnez un modèle prédéfini ou personnalisez les options d'affichage.
3. Choisissez la taille du texte et la couleur d'arrière-plan du widget.
4. Pour ajuster la position du texte, cliquez sur les boutons **Alignment**. Pour désactiver le remplissage (padding), cliquez sur **No Padding**.
5. Pour ajouter un pointeur, cliquez sur **Show Pointer**et sélectionnez une position dans le menu déroulant.

{{< img src="dashboards/widgets/note/overview.png" alt="Ajouter du texte dans le champ Markdown de l'éditeur du widget Notes et liens" style="width:90%;" >}}

Lorsque vous êtes prêt à créer le widget, cliquez sur **Save**.

Ce widget prend en charge les template variables. Utilisez la syntaxe `$<NOM_VARIABLE>.value` pour mettre à jour le contenu du widget de façon dynamique.

{{< img src="dashboards/widgets/note/template_variable.png" alt="Utiliser des template variables dans le champ Markdown de l'éditeur du widget Notes et liens" style="width:90%;" >}}

Dans cet exemple, `$env.value` définit la valeur d'un lien sur l'environnement sélectionné.

## API

Ce widget peut être utilisé avec l'**API Dashboards**. Consultez la [documentation à ce sujet][2] pour en savoir plus.

Le [schéma JSON][3] utilisé pour le widget Notes et liens est le suivant :

{{< dashboards-widgets-api >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/widgets/free_text/
[2]: /fr/api/v1/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/