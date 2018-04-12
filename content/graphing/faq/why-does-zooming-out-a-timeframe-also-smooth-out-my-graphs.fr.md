---
title: Pourquoi zoomer sur une période de temps lisse également mes graphiques?
kind: faq
---
Dans Datadog, un graphique ne peut contenir qu'un nombre défini de points et, au fur et à mesure que la durée d'affichage d'une mesure augmente, une agrégation entre les points se produit pour rester en dessous de ce nombre défini. Ainsi, vous perdrez en granularité à mesure que vous augmentez l'horizon temporel. Par exemple, pour une fenêtre de temps de 4 heures, les données sont agrégées pour avoir une valeur par minute. Lorsque vous effectuez un «zoom arrière» (c.-à-d. Sélectionnez un horizon temporel plus long), les données affichées sur le graphique représenteront alors une période plus longue.

Vous pouvez ajouter la fonction rollup() à votre requête pour ajuster la méthode et la granularité de l'agrégation temporelle. Cette fonction utilise par défaut la méthode avg et 20s de granularité, mais si vous souhaitez agréger la somme de la métrique sur une période de 1 jour , vous pouvez ajouter .rollup(sum, 86400) à votre requête. Si vous voulez garder un œil sur les valeurs max, vous pouvez utiliser l'agrégation maximum .rollup (max).

Voici un graphique à barres affichant la valeur d'une semaine d'utilisation du processeur pour un host sans utiliser la fonction .rollup():

{{< img src="graphing/faq/smooth_1.png" alt="smooth_1" responsive="true" popup="true">}}

Et voici la même métrique, représentée graphiquement en utilisant un rollup d'un jour avec .rollup(86400):

{{< img src="graphing/faq/smooth_2.png" alt="smooth_2" responsive="true" popup="true">}}

[Consultez cette page](/graphing/miscellaneous/functions) pour plus d'informations sur la fonction .rollup().