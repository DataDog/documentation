---
title: Sélectionner des couleurs appropriées pour vos graphiques
---

Dans les graphiques Datadog, l'utilisation de couleurs est la principale façon de distinguer les différentes séries de données. En sélectionnant les couleurs appropriées pour vos graphiques, les membres de votre équipe pourront analyser les données qui y figurent, tirer des conclusions et résoudre les problèmes efficacement. 

{{< img src="dashboards/guide/colors/colors_top.png" alt="Sous Graph your data, l'utilisateur sélectionne l'une des palettes de couleurs disponibles." style="width:90%;" >}}

## Types de palettes de couleurs

### Palettes catégorielles

Les palettes catégorielles sont optimales pour différencier des données qui ne suivent pas un ordre naturel, comme les zones de disponibilité.

{{< img src="dashboards/guide/colors/2_alphabet.png" alt="Une palette affichant les lettres A B C D E F G, chacune d'elles correspondant à une teinte différente." style="width:40%;" >}}

#### Classic

La palette Classic par défaut utilise un ensemble de six couleurs différentes optimisées pour améliorer la lisibilité. Les couleurs attribuées aux séries se répètent si le nombre de séries est supérieur à six. Des couleurs distinctes sont attribuées aux séries adjacentes. 

La palette de couleurs Classic prend en charge l'accessibilité visuelle.

{{< img src="dashboards/guide/colors/3_classic_palette.png" alt="Aperçu de la palette Classic utilisée avec un graphique en anneau et un graphique à barres empilées." style="width:80%;" >}}

#### Consistent/Semantic

La palette Consistent vous permet de toujours attribuer la même couleur à une série de données précise, ce qui facilite la corrélation des données entre les différents graphiques. Contrairement à la palette Classic, la palette Consistent ne garantit pas que la même couleur sera attribuée aux séries de données adjacentes et ne prend pas en charge l'accessibilité visuelle.


{{< img src="dashboards/guide/colors/4_consistent_palette.png" alt="Exemple de palette de couleurs Consistent/Semantic." style="width:70%;" >}}

{{< img src="dashboards/guide/colors/5_consistent_interface.png" alt="Graphiques à barres avec la palette Consistent." style="width:90%;" >}}

Pour un petit sous-ensemble de tags compatibles, Datadog est en mesure d'identifier automatiquement la signification de chaque série de données. Dans ce cas, la palette de couleurs Consistent se présente sous la forme d'une palette de couleurs Semantic, qui utilise une couleur pour représenter la signification. Par exemple, la couleur rouge peut être utilisée pour représenter une erreur.

{{< img src="dashboards/guide/colors/6_semantic_interface.png" alt="Graphique à barres avec la palette Semantic." style="width:90%;" >}}

### Palettes divergentes

Utilisez une palette divergente lorsque vous devez mettre en avant l'écart entre des valeurs au sein d'un ensemble de données. Les palettes divergentes sont idéales pour les données qui présentent un ordre et un point médian naturels. Exemple : l'évolution de l'utilisation de la mémoire, de -100 % à +100 %, avec un point médian naturel à 0 %. 

Deux options sont disponibles pour les palettes divergentes : Cool (vert et bleu) ou Warm (interpolation entre les couleurs jaune et orange).

{{< img src="dashboards/guide/colors/7_divergent_palette.png" alt="Une palette affichant -3 -2 -1 0 1 2 3, avec différents dégradés de couleur à chaque extrême." style="width:40%;" >}}
{{< img src="dashboards/guide/colors/8_divergent_graphs.png" alt="Graphiques avec une palette divergente." style="width:80%;" >}}

### Palettes séquentielles

Utilisez une palette séquentielle lorsque vous devez mettre en avant les points communs entre différentes séries de votre ensemble de données. Cette palette est adaptée aux données qui suivent un ordre naturel, comme l'utilisation du processeur (de 0 % à 100 %) d'un groupe de hosts.

Vous avez le choix entre Purple, Orange, Gray, Red, Green et Blue.

Lorsqu'elles sont associées à des [remplacements de couleur](#remplacements-de-couleur), les palettes séquentielles vous permettent de faire la distinction entre les résultats de plusieurs requêtes dans un même graphique.

{{< img src="dashboards/guide/colors/9_sequential_palette.png" alt="Une palette affichant 1 2 3 4 5 6 7, chaque couleur correspondant à un dégradé." style="width:r0%;" >}}
{{< img src="dashboards/guide/colors/10_sequential_graphs.png" alt="Graphiques avec une palette séquentielle." style="width:80%;" >}}

## Remplacements de couleur

Les remplacements de couleur vous permettent d'attribuer une couleur de votre choix à chaque requête. Cela s'avère particulièrement utile pour faire la distinction entre les résultats de plusieurs requêtes dans un même graphique.

{{< img src="dashboards/guide/colors/11_overrides.png" alt="Le volet permettant à l'utilisateur de configurer des remplacements de couleur." style="width:80%;" >}}

## Paramètres d'accessibilité

Datadog propose des modes de couleurs accessibles pour les graphiques afin de répondre à différents besoins visuels, notamment le daltonisme, la faible acuité visuelle et la sensibilité aux contrastes. Lorsque vous sélectionnez un mode de couleurs accessibles, la palette Classic est appliquée à tous les graphiques avec un ensemble de couleurs accessibles répondant à un besoin visuel précis. Il est possible de définir un mode de couleurs accessibles depuis la [page User Preferences][1].

{{< img src="dashboards/guide/colors/visual_accessibility.png" alt="Options d'accessibilité visuelle disponibles : Default, Protanopia (difficulté à distinguer les tons verts et rouges), Deuteranopia (difficulté à distinguer les tons rouges, verts et jaunes), Tritanopia (difficulté à distinguer les tons bleus et verts), High Contrast (séparation plus marquée entre les couleurs en cas de faible acuité visuelle), Low Saturation (diminution du contraste en cas de sensibilité visuelle aux contrastes)." style="width:90%;" >}}

[1]: https://app.datadoghq.com/personal-settings/preferences