---
description: Comparez les données de séries temporelles entre plusieurs groupes de
  tags, chaque groupe étant affiché sous forme de ligne codée par couleur.
further_reading:
- link: /dashboards/graphing_json/
  tag: Documentation
  text: Créer des dashboards avec JSON
title: Heatgrid Widget
widget_type: heatgrid
---
{{< img src="dashboards/widgets/heatgrid/heatgrid.png" alt="Exemple de visualisation avec le Heatgrid Widget" style="width:100%;">}}

Le Heatgrid Widget affiche les données de séries temporelles regroupées par tag, chaque groupe étant représenté par sa propre ligne et les valeurs étant codées par couleur. Cela facilite l'identification des changements et la comparaison directe des groupes, même lorsque le nombre de groupes est élevé.

## Configuration {#setup}

### Configuration {#configuration}

1. Configurez votre requête en regroupant par le tag que vous souhaitez comparer entre les lignes. Chaque groupe dans les résultats de la requête apparaît sous forme de ligne distincte dans la grille.
   {{< img src="dashboards/widgets/heatgrid/heatgrid_colors.png" alt="Panneau de configuration du Heatgrid affichant les options de tri, de largeur de la colonne d'étiquettes de ligne, de légende et de couleur." style="width:90%;">}}
1. {{< ui >}}Sort rows by{{< /ui >}} : Triez les lignes par **valeur moyenne**, **valeur max**, **valeur min**, **somme des valeurs** ou **étiquette**, par ordre croissant ou décroissant.
1. {{< ui >}}Colors{{< /ui >}} : Configurez la manière dont les valeurs de la requête sont associées aux couleurs des lignes.
   - {{< ui >}}Scheme{{< /ui >}} : Sélectionnez un jeu de couleurs prédéfini ou modifiez la couleur ou la position d'un point individuel dans **Format stops** pour le personnaliser.
   « - {{< ui >}}Apply as{{< /ui >}} : Choisissez **Continuous Gradient** pour associer les valeurs le long d'une échelle de couleurs fluide, ou **Discrete Conditions** pour associer des plages de valeurs à des couleurs spécifiques. »
   - Pour un dégradé personnalisé, ajoutez des stops le long de l'échelle et définissez une couleur et une position (0-100 %) pour chacun.
   - Pour des conditions discrètes personnalisées, définissez une couleur et une plage de valeurs (borne inférieure et supérieure) pour chaque condition. La première condition n'a pas de borne inférieure et la dernière n'a pas de borne supérieure, de sorte que les conditions couvrent ensemble la totalité de la plage de valeurs. **Remarque** : La borne inférieure du premier compartiment est la valeur minimale dans les données et la borne supérieure du dernier compartiment est la valeur maximale.
   - Chaque dégradé ou ensemble de conditions discrètes prend en charge 2 à 6 stops ou conditions.
1. {{< ui >}}Row label width{{< /ui >}} : Choisissez une largeur spécifique pour la colonne d'étiquettes de ligne, en utilisant des tailles prédéfinies. Par défaut, Datadog sélectionne la taille la plus proche de la largeur des étiquettes affichées.
1. {{< ui >}}Show legend label{{< /ui >}} : Activez ou désactivez l'affichage de l'étiquette de la légende.

### Options {#options}

#### Remplacement d'unité {#unit-override}

Configurez les unités telles qu'elles s'affichent dans la grille et les info-bulles.

#### Liens contextuels {#context-links}

Les [liens contextuels][1] sont activés par défaut ; vous pouvez les activer ou les désactiver. Les liens contextuels connectent les widgets de dashboard à d'autres pages (dans Datadog ou des tiers).

## <!-- API

Ce widget peut être utilisé avec l'**[Dashboards API][2]**. Consultez le tableau suivant pour la [définition du schéma JSON du widget][3] :

{{< dashboards-widgets-api >}} -->

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/dashboards/guide/context-links/
[2]: /fr/api/latest/dashboards/
[3]: /fr/dashboards/graphing_json/widget_json/