---
title: Notebooks
kind: documentation
further_reading:
  - link: graphing/dashboards/screenboard
    tag: Documentation
    text: Créer un screenboard
  - link: graphing/dashboards/timeboard
    tag: Documentation
    text: Créer un timeboard
---
## Présentation

Les notebooks combinent des graphiques et du texte au sein d'un format linéaire basé sur des cellules. Ils sont conçus pour explorer vos données et partager des histoires : enquêtes à la suite d'incidents, analyses de fin de projet, runbooks ou encore documentation d'infrastructure.

{{< img src="graphing/notebooks/demo_notebook.png" alt="notebook de démonstration" responsive="true" style="width:100%;">}}

## Notebook List

La [Notebook List][1] vous permet de consulter et de rechercher les notebooks précédemment créés. Le nom, le créateur et la date de dernière modification de chaque notebook sont indiqués. Les notebooks sont regroupés en deux catégories :

* **My Notebooks** : les notebooks que vous avez créés.
* **Other Notebooks** : les notebooks créés par d'autres membres de votre équipe.

### Partage et autorisations

Tous les membres de votre équipe peuvent ouvrir ou modifier un notebook. Cependant, seul le créateur d'un notebook peut le supprimer.

Les modifications apportées au notebook d'un autre utilisateur ne sont pas enregistrées automatiquement. Si vous essayez d'enregistrer des modifications effectuées sur le notebook de quelqu'un d'autre, cela crée une copie, sauf si vous indiquez clairement que vous souhaitez remplacer l'original.

## Nouveau notebook

Créez un [notebook][2] depuis la navigation principale, en accédant à *Notebooks > New Notebook*.

Par défaut, les nouveaux notebooks ne s'enregistrent pas automatiquement. Vous devez cliquer sur le bouton **Save**.

### Types de contenu

Les notebooks prennent en charge les visualisations et les cellules de texte.

#### Visualisation

Les métriques des notebooks sont représentées graphiquement à l'aide de l'éditeur de requête de Datadog. Les notebooks prennent en charge les éléments suivants :

* [Série temporelle][3]
* [Carte thermique][4]
* [Distribution][5]
* [Flux de log][6]

#### Texte

Le texte d'un notebook bénéficie du format Markdown, qui permet l'utilisation de titres, de sous-titres, de liens, d'images, de listes et de blocs de code.

### Manipulation de cellules

Lorsque vous ouvrez un notebook existant, les cellules sont « fermées ». Pour ouvrir une cellule afin de la modifier, cliquez dessus ou naviguez jusqu'à celle-ci avec les touches fléchées, puis appuyez sur la touche `Entrée`. Pour fermer une cellule, cliquez en dehors de celle-ci ou appuyez sur `CMD + Entrée`. Une seule cellule peut être ouverte à la fois.

Pour insérer, dupliquer ou supprimer des cellules, cliquez sur l'icône en forme d'engrenage qui apparaît à gauche du numéro de cellule, ou utilisez un raccourci clavier. Accédez à liste de tous les raccourcis clavier en cliquant sur le bouton en forme de clavier dans l'en-tête du notebook.

### Intervalles de temps

Par défaut, toutes les cellules de graphique respectent le même intervalle de temps global que celui défini dans l'en-tête du notebook. Cependant, certaines cellules peuvent se dissocier de l'intervalle global et être définies sur un autre intervalle indépendant. Cela permet de comparer des métriques sur plusieurs intervalles de temps distincts au sein d'un notebook, une fonctionnalité particulièrement utile pour les enquêtes à la suite d'incidents.

Pour définir un intervalle de temps spécifique, cliquez sur l'icône en forme d'horloge dans le coin supérieur droit d'une cellule de graphique. Décochez ensuite la case *Lock this cell to global time frame* et définissez l'intervalle de temps souhaité :

{{< img src="graphing/notebooks/time_selector.png" alt="Sélecteur d'intervalle de temps" responsive="true" style="width:60%;">}}

**Remarque** : si vous cliquez sur une cellule et la faites glisser pour zoomer sur un graphique, cela ne dissocie pas la cellule de l'intervalle de temps global. À la place, cette opération modifie l'intervalle de temps global du notebook.

### Agrandir un notebook

Développez le graphique en cliquant sur l'icône d'agrandissement située à droite de la cellule. Consultez la page [Widgets][7] pour en savoir plus sur le mode plein écran.

### Options de disposition

Pour afficher les options de disposition suivantes, cliquez sur l'icône en forme de grille à droite de la cellule :

* **Graph size** : sélectionnez la taille du graphique parmi `XS`, `S`, `M` (par défaut), `L` et `XL`.
* **Graph legend** : décochez cette case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques `XS` et `S`.
* **Grouping** : permet d'afficher un graphique par regroupement de sources.

{{< img src="graphing/notebooks/layout_options.png" alt="options de disposition" responsive="true" style="width:50%;">}}

**Remarque** : si vous modifiez l'un de ces paramètres, le changement s'applique uniquement à la cellule sélectionnée.

### Liens vers des cellules précises

Copiez l'URL d'une cellule spécifique en cliquant sur l'icône de lien située à droite de la cellule. Vous pouvez créer des liens directs pour les visualisations ainsi que pour les cellules Markdown.

Lorsqu'un utilisateur accède à l'URL d'une cellule spécifique, le notebook s'ouvre afin de présenter la cellule en haut de la fenêtre d'affichage. Les liens sont absolus, ce qui signifie que l'URL d'une cellule reste inchangée même si elle est déplacée vers un nouvel emplacement dans le notebook.

### Enregistrer, renommer, dupliquer et supprimer des notebooks

Pour enregistrer un notebook, appuyez sur `CMD + S` ou cliquez sur le bouton **Save** dans l'en-tête du notebook. Une fois le premier enregistrement effectué, le notebook continue de s'enregistrer automatiquement à intervalles réguliers. Un notebook peut également être enregistré manuellement à tout moment entre deux enregistrements automatiques. Pour ne pas perdre votre travail, vous recevez une invite de confirmation chaque fois que vous tentez de quitter un notebook avec des modifications non enregistrées.

Pour renommer un notebook, cliquez sur le champ de nom dans l'en-tête du notebook.

Pour dupliquer un notebook spécifique, utilisez l'icône en forme d'engrenage dans le coin supérieur droit.

Pour supprimer un notebook depuis son éditeur ou à partir de la page Notebook List, utilisez l'icône en forme d'engrenage dans le coin supérieur droit. Vous pouvez uniquement supprimer les notebooks que vous avez créés.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook
[3]: /fr/graphing/widgets/timeseries
[4]: /fr/graphing/widgets/heat_map
[5]: /fr/graphing/widgets/distribution
[6]: /fr/graphing/widgets/log_stream
[7]: /fr/graphing/widgets/#full-screen