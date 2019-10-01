---
title: Notebooks
kind: documentation
---

Les notebooks combinent des graphiques et du texte dans un format linéaire basé sur des cellules. Ils sont conçus pour vous permettre d'explorer vos données et de partager des histoires.

Vous pouvez utiliser un notebook pour créer et partager des histoires reposant sur des données avec vos collègues. Ainsi, ces derniers peuvent facilement explorer des enquêtes liées à des incidents, des analyses de fin de projet, des runbooks et de la documentation d'infrastructure. 

## Partage et autorisations

Tous les membres de votre équipe peuvent ouvrir ou modifier un notebook. Cependant, seul le créateur d'un notebook peut le supprimer.

Les modifications apportées au notebook d'un autre utilisateur ne sont pas enregistrées automatiquement. Si vous essayez d'enregistrer des modifications effectuées sur le notebook de quelqu'un d'autre, cela crée une copie, sauf si vous indiquez clairement que vous souhaitez remplacer l'original.

Un nouveau notebook n'est pas enregistré par défaut.

## Caractéristiques importantes

### Plusieurs intervalles de temps

Par défaut, toutes les cellules de graphique respectent le même intervalle de temps global que celui défini dans l'en-tête du notebook. Cependant, certaines cellules peuvent se dissocier de l'intervalle global et être définies sur un autre intervalle indépendant.

Cela permet de comparer des métriques sur plusieurs intervalles de temps distincts au sein d'un notebook. Ainsi, vous pouvez créer une chronologie cohérente pour un événement. Les notebooks sont donc particulièrement utiles pour les enquêtes liées à des incidents.

### Types de contenu

Les métriques d'un notebook sont représentées graphiquement à l'aide de l'éditeur de requête standard qui s'affiche dans Datadog. Les notebooks prennent en charge trois types de visualisations : les séries temporelles, les cartes thermiques et les distributions.

Comme dans le Metrics Explorer, vous pouvez comparer une métrique entre différents groupes de votre infrastructure. Par exemple, si les données d'une métrique sont transmises pour plusieurs hosts, un notebook vous permet de générer des graphiques séparés qui affichent le comportement de la métrique sur chaque host.

Le texte d'un notebook bénéficie du format Markdown. Cela signifie que les notebooks peuvent inclure des titres, des sous-titres, des liens, des images, des listes à puces et numérotées et des blocs de code.

## Instructions d'utilisation spécifiques

### Manipulation de cellules

Lorsque vous ouvrez un notebook existant, ses cellules sont « fermées ». Pour ouvrir une cellule afin de la modifier, cliquez dessus ou naviguez jusqu'à celle-ci avec les touches fléchées, puis appuyez sur la touche « Entrée ». Pour fermer une cellule, cliquez en dehors de celle-ci ou appuyez sur `⌘ + Entrée`. Une seule cellule peut être ouverte à la fois.

{{< img src="graphing/notebooks/states.png" alt="états" responsive="true" >}}

Pour insérer, dupliquer ou supprimer des cellules, cliquez sur l'icône en forme d'engrenage qui apparaît à gauche du numéro de cellule, ou utilisez un raccourci clavier. Accédez à liste de tous les raccourcis clavier en cliquant sur le bouton du clavier dans l'en-tête du notebook.

Les cellules peuvent également être réorganisées en utilisant des raccourcis clavier.

### Modification des intervalles de temps

Un indicateur de durée apparaît dans le coin supérieur droit de chaque cellule de graphique. Si la cellule est associée à l'intervalle de temps global, elle indique « Global Time ». Dans le cas contraire, elle précise l'intervalle de temps indépendant de la cellule.

Pour dissocier une cellule de l'intervalle de temps global, cliquez sur cet indicateur de durée.

{{< img src="graphing/notebooks/timerange.png" alt="intervalle de temps" responsive="true" style="width:40%;">}}

Veuillez noter que si vous cliquez sur une cellule et la faites glisser pour zoomer sur un graphique, cela ne dissocie pas cette cellule de l'intervalle de temps global. À la place, cette opération modifie l'intervalle de temps global du notebook.

### Fractionnement par tag et autres options pour les graphiques

Pour diviser un graphique par tag, modifier la taille d'un graphique ou activer/désactiver l'affichage de la légende d'un graphique, cliquez sur l'icône de grille dans le coin droit de la cellule.

Les légendes sont automatiquement désactivées lorsque la taille du graphique a été définie sur XS ou S. La modification de ces paramètres n'affecte que la cellule cible : la disposition des autres cellules du graphique n'est pas modifiée.

{{< img src="graphing/notebooks/options.png" alt="options" responsive="true" style="width:40%;">}}

### Création de liens vers des cellules précises

Pour copier l'URL d'une cellule spécifique, cliquez sur l'icône de lien située sur le côté droit de la cellule. Un lien direct est disponible pour les cellules graphiques et Markdown.

Lorsqu'un utilisateur accède à l'URL d'une cellule spécifique, son notebook s'ouvre afin de présenter la cellule en question en haut de la fenêtre d'affichage. Les liens sont absolus, ce qui signifie que l'URL d'une cellule reste inchangée si elle est déplacée vers un nouvel emplacement dans son notebook.

{{< img src="graphing/notebooks/directlink.png" alt="lien direct" responsive="true" style="width:40%;">}}

### Enregistrement, renommage et suppression d'un notebook

Pour enregistrer un notebook, appuyez sur `⌘ + S` ou cliquez sur le bouton Enregistrer dans l'en-tête du notebook. Dès qu'un nouveau notebook a été enregistré une fois, il continue de s'enregistrer automatiquement à intervalles réguliers. Un notebook peut également être enregistré manuellement à tout moment entre deux enregistrements automatiques. Pour ne pas perdre votre travail, vous recevrez une invitation de confirmation à chaque fois que vous tentez de quitter un notebook avec des modifications non enregistrées.

Pour renommer un notebook, cliquez sur le champ de nom dans l'en-tête du notebook.

Pour supprimer un notebook que vous avez créé, supprimez-le de la page Notebook List ou de la page de notebook individuel à l'aide de l'icône en forme d'engrenage.

