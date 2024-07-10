---
aliases:
- /fr/monitors/incident_management/datadog_clipboard
description: Créer et gérer des incidents
further_reading:
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Explorer facilement vos données avec le presse-papiers Datadog
title: Presse-papiers Datadog
---

## Présentation

Le presse-papiers Datadog est un outil multiplateforme vous permettant de recueillir et de partager des signaux dans divers contextes. Son contenu est propre à chaque utilisateur. Il stocke tous les graphiques copiés ainsi que les liens enregistrés. Les signaux peuvent être regroupés et exportés vers un dashboard, notebook ou incident.

{{< img src="service_management/incidents/clipboard-full.png" alt="Le principal presse-papiers">}}

## Exploration sur plusieurs pages

Le presse-papiers fonctionne sur l'ensemble des pages Datadog. Il peut enregistrer tous les graphiques copiés par un utilisateur précis. Il ne copie pas automatiquement le texte des requêtes, le contenu JSON des événements ni tout autre contenu textuel.

## Ouverture du presse-papiers

Pour ouvrir le presse-papiers, copiez n'importe quel graphique, puis cliquez sur « Open Clipboard » dans le message qui s'affiche.

{{< img src="service_management/incidents/open-clipboard.png" alt="Ouvrir un graphique dans le presse-papiers" style="width:80%;">}}

Vous pouvez également cliquer sur « `Cmd/Ctrl + Shift + K` to open » dans le presse-papiers réduit.

Enfin, il est également possible d'ouvrir et de fermer le presse-papiers à l'aide du raccourci `Cmd/Ctrl + Maj + K`. Pour réduire le presse-papiers, cliquez sur l'icône de réduction. Le presse-papiers continue à s'afficher sur toutes les pages de Datadog.

## Ajout de contenu

Pour ajouter un graphique, copiez-le à l'aide du raccourci `Cmd/Ctrl + C` ou en cliquant sur **Copy** dans le menu d'exportation. Les graphiques copiés sont automatiquement ajoutés au presse-papiers lorsque celui-ci est ouvert.

Pour ajouter une URL, ouvrez le presse-papiers, puis cliquez sur **Add current page**.

{{< img src="service_management/incidents/add-page.png" alt="Ajouter un dashboard au presse-papiers" style="width:80%;">}}

## Gestion du contenu

Chaque élément du presse-papiers peut être ouvert, dupliqué ou supprimé. Pour effectuer ces actions, passez le curseur sur un signal. Si vous ouvrez un élément, vous êtes redirigé vers le lien du signal à son origine. Pour ouvrir la source d'un graphique (par exemple, le dashboard d'où il est extrait), cliquez sur le titre de l'élément.

{{< img src="service_management/incidents/managing-clips.png" alt="Gérer le contenu" style="width:80%;">}}

Le presse-papiers peut stocker jusqu'à 20 signaux. Pour retirer des signaux, supprimez-les individuellement ou cliquez sur **Remove All**. Si vous ajoutez plus de 20 signaux, les premiers signaux, qui sont stockés tout à gauche, sont automatiquement supprimés du presse-papiers.

## Exportation

Vous pouvez exporter des éléments du presse-papiers vers des dashboards, notebooks ou incidents à l'aide des raccourcis clavier ou du menu d'exportation. Pour copier un signal spécifique, passez votre curseur dessus, utilisez le raccourci `Cmd/Ctrl + C` pour le copier, puis le raccourci `Cmd/Ctrl + V` pour le coller dans un dashboard ou un notebook. Pour copier plusieurs signaux, utilisez le raccourci `Maj + Clic` pour sélectionner des graphiques et des liens, puis le raccourci `Cmd/Ctrl + C` pour les copier.

Vous pouvez également exporter votre sélection vers un dashboard, notebook ou incident existant ou nouveau à l'aide du menu d'exportation. Seuls les [graphiques pris en charge][1] peuvent être exportés vers des notebooks.

{{< img src="service_management/incidents/exporting.png" alt="Exporter du contenu depuis le presse-papiers" style="width:80%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/notebooks/#visualization