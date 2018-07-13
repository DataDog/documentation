---
title: Notebooks
kind: documentation
---
Les notebooks combinent des graphiques et du texte dans un format linéaire basé sur les cellules. Ils sont conçus pour vous aider à explorer et partager des histoires avec vos données.

## Cas d'usage

### Storytelling Data-driven

Vous pouvez utiliser un notebook pour créer et partager des histoires axées sur les données avec vos coéquipiers, telles que les enquêtes sur les incidents, les post-mortem, les runbooks et la documentation d'infrastructure.

### Exploration de données Scratch

Bien que les notebooks soient parfaits pour le partage, vous pouvez également les utiliser pour grapher des métriques en privé. Dans le passé, vous avez peut-être fait cela dans le metric explorer ou en créant des dashboards personnels.

## Partage et autorisations

Toute personne de votre équipe peut ouvrir ou modifier un notebook, mais un notebook ne peut être supprimé que par son créateur.

Les modifications apportées au notebook par un autre utilisateur ne sont pas enregistrées automatiquement. Si vous tentez d'enregistrer des modifications dans le notebook de quelqu'un d'autre, une copie est créée à moins que vous ne choisissiez explicitement d'écraser l'original.

Un nouveau notebook n'est pas sauvegardé par défaut, ce qui le rend parfait comme espace de travail éphémère. Cela signifie également que vous n'avez pas à vous soucier de sauvegarder des notebook uniques que vous n'avez pas l'intention de revisiter.

## Caractéristiques importantes

### Plusieurs horizons temporels

L'une des caractéristiques les plus puissantes des notebooks est la possibilité de définir plusieurs horizons temporels.

Par défaut, toutes les cellules graphiques on le même horizon temporel que celui définie dans l'en-tête du notebook. Cependant, des cellules individuelles peuvent être libérées de l'horizon temporel globale et réglées sur une période de temps indépendante.

Cela permet la comparaison des métriques sur plusieurs périodes de temps distinctes au sein d'un notebook. Il vous permet de créer facilement une chronologie cohérente d'un événement et rend les notebooks particulièrement bien adaptés aux enquêtes sur les incidents.

En ce sens, les notebooks fonctionnent comme les deux types de dashboard Datadog: les Timeboards, dans lesquels un seul horizon temporel est appliqué à tous les graphiques, et les Screenboards, dans lesquels l'horizon temporel de chaque graphique est défini indépendamment.

### Types de contenu

Les métriques dans un notebook sont représentées graphiquement à l'aide de l'éditeur de requête standard qui apparaît dans Datadog. Les notebook prennent actuellement en charge trois types de visualisations: les séries temporelles, les heatmaps et les distributions.

Comme sur la page Metrics Explorer, une métrique peut être comparée entre différents groupes de votre infrastructure. Par exemple, si une métrique est rapportée depuis plusieurs hôtes, un notebook vous permet de générer des graphiques séparés qui affichent le comportement de la métrique sur chaque hôte.

Le texte dans un notebook est formaté en Markdown, ce qui signifie que les notebook peuvent inclure des titres, sous-titres, des liens, des images, des listes à puces et numérotées, et des blocs de code.

## Instructions d'utilisation spécifiques

### Manipulation des cellules

Lorsqu'un notebook existant est ouvert, ses cellules sont dans un état fermé. Pour ouvrir une cellule afin de l'éditer, cliquez dessus ou naviguez jusqu'à celle-ci avec les touches fléchées et appuyez sur Entrée. Pour fermer une cellule, cliquez en dehors de celle-ci ou appuyez sur `⌘ + Entrée`. Une seule cellule peut être ouverte à la fois.

{{< img src="graphing/notebooks/states.png" alt="states" responsive="true" >}}

Pour insérer, cloner ou supprimer des cellules, cliquez sur l'icône de roue dentée qui apparaît à gauche du numéro de cellule,  ou utilisez un raccourci clavier. Une liste de tous les raccourcis clavier est disponible en cliquant sur l'icône du clavier dans l'en-tête du notebook.
Les cellules peuvent également être réorganisées en utilisant des raccourcis clavier.

### Changer l'horizon temporel

Un indicateur de temps apparaît dans le coin supérieur droit de chaque cellule graphique. Si la cellule est verrouillée sur l'horizon temporel global, elle indique “Global Time”. Dans le cas contraire, elle spécifie le l'horizon temporel indépendant de la cellule.

Pour déverrouiller une cellule de l'horizon temporel global, cliquez sur cet indicateur d'heure.

{{< img src="graphing/notebooks/timerange.png" alt="timerange" responsive="true" style="width:40%;">}}

Notez que cliquer et glisser pour zoomer sur un graphique ne débloque pas cette cellule de l'horizon temporel global. Il change à la place l'horizon temporel global du notebook.

### Fractionnement par tag et autres options pour les graphiques

Pour diviser un graphique par tag, modifier la taille d'un graphique ou basculer la visibilité d'une légende de graphique, cliquez sur l'icône sur le bord droit de la cellule.
Les légendes sont automatiquement désactivées lorsque la taille du graphique a été définie sur XS ou S. La modification de ces paramètres n'affecte que la cellule cible. la disposition des autres cellules graphiques n'est pas affectée.

{{< img src="graphing/notebooks/options.png" alt="options" responsive="true" style="width:40%;">}}

### Liaison à des cellules individuelles

Pour copier l'URL d'une cellule spécifique, cliquez sur l'icône de lien située sur le côté droit de la cellule. Un lien direct est disponible pour les cellules graphiques et Markdown.
Lorsqu'un utilisateur visite l'URL d'une cellule spécifique, son notebook est ouvert pour afficher la cellule en question en haut de la fenêtre. Les liens sont absolus, ce qui signifie que l'URL d'une cellule reste la même si elle est déplacée vers une nouvelle position dans son notebook.

{{< img src="graphing/notebooks/directlink.png" alt="directlink" responsive="true" style="width:40%;">}}

### Sauvegarde, renommage et suppression d'un notebook

Pour enregistrer un notebook, appuyez sur `⌘ +` ou cliquez sur le bouton “Save” dans l'en-tête du notebook. Une fois qu'un nouveau notebook a été enregistré une fois, il continue de s'enregistrer automatiquement à intervalles réguliers. Un notebook peut également être enregistré manuellement à tout moment entre deux autosaves. Pour vous assurer de ne pas perdre votre travail, vous serez invité à confirmer si vous tentez de quitter un notebook avec des modifications non enregistrées.

Pour renommer un notebook, cliquez sur le champ nom dans l'en-tête du notebook.

Pour supprimer un notebook que vous avez créé, cliquez sur l'icône dans l'en-tête du notebook et sélectionnez "Delete Notebook." . Vous pouvez également supprimer vos propres notebook à partir de la page Notebook List.

