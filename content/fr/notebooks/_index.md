---
title: Notebooks
kind: documentation
aliases:
  - /fr/graphing/notebooks/
further_reading:
  - link: 'https://www.datadoghq.com/blog/collaborative-notebooks-datadog/'
    tag: Blog
    text: Créer des récits axés sur les données grâce aux notebooks collaboratifs
  - link: /dashboards/screenboard/
    tag: Documentation
    text: Créer un screenboard
  - link: /dashboards/timeboard/
    tag: Documentation
    text: Créer un timeboard
---
## Présentation

Les notebooks combinent des graphiques et du texte au sein d'un format linéaire basé sur des cellules. Ils facilitent l'exploration de vos données et le partage de récits en créant des analyses de fin de projet, des enquêtes, des runbooks, des documents, etc.

{{< img src="notebooks/demo_notebook.png" alt="notebook de démonstration"  style="width:90%;">}}

## Collaboration en direct

Les notebooks prennent en charge la collaboration en temps réel. Les indicateurs de présence indiquent à tout moment qui consulte votre notebook ; les indicateurs apparaissent également à côté de toute cellule en cours de modification par un autre utilisateur.

{{< img src="notebooks/live_editing.png" alt="collaboration en direct dans les notebooks"  style="width:90%;">}}

Les modifications apportées à un notebook s'affichent automatiquement, sans qu'une actualisation soit nécessaire.

Tous les membres de votre équipe peuvent ouvrir ou modifier un notebook. Cependant, un notebook peut uniquement être supprimé par le créateur ou un administrateur.

## Publier des commentaires

Pour ajouter un commentaire, sélectionnez du texte ou passez le curseur sur un graphique. Le bouton **Add a comment** apparaît alors à droite de la cellule.

{{< img src="notebooks/add_comment.png" alt="ajouter un commentaire au texte"  style="width:90%;">}}

Pour modifier ou supprimer un commentaire que vous avez ajouté, cliquez sur le menu dans le coin supérieur droit du commentaire.

{{< img src="notebooks/edit_comment.png" alt="modifier un commentaire dans un notebook"  style="width:90%;">}}

Consultez ou rouvrez les commentaires résolus dans l'historique des commentaires. Celui-ci se trouve dans le menu en forme d'engrenage des notebooks. 

{{< img src="notebooks/comment_history.png" alt="modifier un commentaire dans un notebook"  style="width:90%;">}}

Des notifications par e-mail sont envoyées aux auteurs de notebook lorsque de nouveaux commentaires sont ajoutés, ainsi qu'aux personnes à l'origine d'un commentaire en cas de réponse. Vous pouvez gérer vos paramètres de notifications en accédant à `Notifications` depuis le menu des réglages du notebook.


## Liste des notebooks

La [liste des notebooks][1] vous permet de consulter et de rechercher les notebooks précédemment créés. Le nom, l'identité du créateur et la date de dernière modification de chaque notebook sont indiqués. Les notebooks sont regroupés en deux catégories :

* **My Notebooks** : les notebooks que vous avez créés.
* **Other Notebooks** : les notebooks créés par d'autres membres de votre équipe.

La liste des notebooks comporte également des modèles prédéfinis ainsi que des tutoriels. Modifiez directement ces modèles et cliquez sur **Clone** pour enregistrer vos modifications.

{{< img src="notebooks/templates.png" alt="modèles sur la page de la liste des notebooks"  style="width:80%;">}}

## Nouveau notebook

Créez un [notebook][2] depuis la navigation principale, en accédant à *Notebooks > New Notebook*.

Par défaut, les nouveaux notebooks ne s'enregistrent pas automatiquement. Vous devez cliquer sur le bouton **Save**.

### Types de contenus

Les notebooks prennent en charge les visualisations et les cellules de texte.

#### Visualisation

Les graphiques dans les notebooks prennent en charge toutes les sources de données Datadog : métriques, événements de log, spans indexées, live processes, trafic réseau, événements RUM, métriques de profiling et signaux de sécurité.

{{< img src="notebooks/data_sources.png" alt="collaboration en direct dans les notebooks"  style="width:50%;">}}

Les graphiques sont créés à l'aide de l'éditeur de requête de Datadog. Les notebooks prennent en charge les éléments suivants :

* [Série temporelle][3]
* [Top List][4]
* [Carte thermique][5]
* [Distribution][6]
* [Flux de logs][7]

#### Texte

Le texte d'un notebook prend en charge le format [Markdown][8], qui permet l'utilisation de titres, de sous-titres, de liens, d'images, de listes et de blocs de code.

### Manipulation de cellules

Lorsque vous ouvrez un notebook existant, ses cellules sont « fermées ». Pour ouvrir une cellule afin de la modifier, placez le curseur de la souris dessus et utilisez `CMD + clic`, ou cliquez sur **Edit**. Pour fermer une cellule, cliquez en dehors de celle-ci, appuyez sur `Échap` ou appuyez sur `CMD + Entrée`. Une seule cellule peut être ouverte à la fois.

Pour insérer des cellules, utilisez le bouton **+** qui figure à gauche de la cellule. Pour partager, dupliquer ou supprimer des cellules, utilisez la barre d'action qui s'affiche au-dessus de la cellule lorsque vous passez le curseur dessus. Vous pouvez également utiliser un raccourci clavier. Accédez à la liste de tous les raccourcis clavier en cliquant sur l'icône en forme de clavier dans l'en-tête du notebook.

### Intervalles de temps

Par défaut, toutes les cellules des graphiques sont associées à l'intervalle global défini dans l'en-tête du notebook.

Pour afficher un autre intervalle, sélectionnez une option dans le sélecteur d'intervalle, ou faites défiler directement un graphique. L'URL du notebook se met à jour afin de correspondre au nouvel intervalle, sans pour autant l'enregistrer dans le notebook.

**Remarque** : si vous cliquez sur une cellule et la faites glisser pour zoomer sur un graphique, cela ne dissocie pas la cellule de l'intervalle de temps global. À la place, cette opération modifie l'intervalle de temps global du notebook.

{{< img src="notebooks/global_time.png" alt="Sélecteur d'intervalle de notebook"  style="width:90%;">}}


Pour enregistrer l'intervalle sélectionné en tant que paramètre par défaut du notebook, cliquez sur **Update Default**. Le bouton de réinitialisation annule toutes les modifications apportées à l'intervalle.

Chaque cellule peut être dissociée de l'intervalle global et posséder son propre intervalle.

{{< img src="notebooks/cell_time.png" alt="Sélecteur d'intervalle de cellule"  style="width:90%;">}}

Pour afficher un autre intervalle pour une seule cellule, sélectionnez la cellule de votre choix, puis utilisez l'interrupteur pour la dissocier de l'intervalle global. Modifiez ensuite l'intervalle à l'aide du sélecteur l'intervalle, ou en faisant défiler le graphique. Les modifications apportées en mode édition sont enregistrées lorsque vous cliquez sur **Done**. Pour les annuler, cliquez sur **Cancel**.

### Agrandir un notebook

Développez le graphique en cliquant sur l'icône d'agrandissement située à droite de la cellule. Consultez la page [Widgets][9] pour en savoir plus sur le mode plein écran.

### Options de disposition

Pour afficher les options de disposition suivantes, cliquez sur l'icône en forme de grille à droite de la cellule dans l'éditeur :

* **Graph size** : sélectionnez la taille du graphique parmi `XS`, `S`, `M` (par défaut), `L` et `XL`.
* **Graph legend** : décochez cette case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques `XS` et `S`.
* **Grouping** : cette option permet d'afficher un graphique par valeur de tag, afin de visualiser de petits multiples de votre visualisation.

{{< img src="notebooks/layout_options.png" alt="options de disposition" style="width:50%;">}}

**Remarque** : si vous modifiez l'un de ces paramètres, le changement s'applique uniquement à la cellule sélectionnée.

<!--- KEEP- WILL RE-IMPLEMENT
### Link to individual cells

Pour copier l'URL d'une cellule spécifique, cliquez sur l'icône en forme de chaîne située à droite de la cellule. Un lien direct est disponible pour les cellules de visualisation et Markdown.

Lorsqu'un utilisateur accède à l'URL d'une cellule spécifique, le notebook s'ouvre et affiche la cellule en haut de la fenêtre d'affichage. Les liens sont absolus : l'URL d'une cellule reste inchangée si elle est déplacée vers un nouvel emplacement dans le notebook.--->

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook
[3]: /fr/dashboards/widgets/timeseries/
[4]: /fr/dashboards/widgets/top_list/
[5]: /fr/dashboards/widgets/heat_map/
[6]: /fr/dashboards/widgets/distribution/
[7]: /fr/dashboards/widgets/log_stream/
[8]: https://daringfireball.net/projects/markdown/
[9]: /fr/dashboards/widgets/#full-screen