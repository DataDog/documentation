---
aliases:
- /fr/graphing/notebooks/
further_reading:
- link: https://www.datadoghq.com/blog/incident-management-templates-notebooks-list/
  tag: Blog
  text: Créer et explorer une bibliothèque de documentation
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Créer des récits axés sur les données grâce aux notebooks collaboratifs
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Pratiques recommandées pour la création de post-mortems d'incident
kind: documentation
title: Notebooks
---

## Présentation

Les notebooks combinent des graphiques et du texte au sein d'un format linéaire basé sur des cellules. Ils facilitent l'exploration de vos données et le partage de récits en créant des analyses de fin de projet, des enquêtes, des runbooks, des documents, etc.

{{< img src="notebooks/demo_notebook.png" alt="notebook de démonstration" style="width:90%;">}}

## Collaboration en direct

Les notebooks prennent en charge la collaboration en temps réel. Les indicateurs de présence indiquent à tout moment qui consulte votre notebook ; les indicateurs apparaissent également à côté de toute cellule en cours de modification par un autre utilisateur.

{{< img src="notebooks/live_editing.png" alt="collaboration en direct dans les notebooks" style="width:90%;">}}

Les modifications apportées à un notebook s'affichent automatiquement, sans qu'une actualisation soit nécessaire.

Tous les membres de votre équipe peuvent ouvrir ou modifier un notebook. Cependant, un notebook peut uniquement être supprimé par le créateur ou un administrateur.

## Publier des commentaires

Pour ajouter un commentaire, sélectionnez du texte ou passez le curseur sur un graphique. Le bouton **Add a comment** apparaît alors à droite de la cellule.

{{< img src="notebooks/add_comment.png" alt="ajouter un commentaire au texte" style="width:90%;">}}

Pour modifier ou supprimer un commentaire que vous avez ajouté, cliquez sur le menu dans le coin supérieur droit du commentaire.

{{< img src="notebooks/edit_comments.png" alt="modifier un commentaire dans un notebook" style="width:90%;">}}

Consultez ou rouvrez les commentaires résolus dans l'historique des commentaires. Celui-ci se trouve dans le menu en forme d'engrenage des notebooks. 

{{< img src="notebooks/check_comment_history.png" alt="modifier un commentaire dans un notebook" style="width:90%;">}}

Des notifications par e-mail sont envoyées aux auteurs de notebook lorsque de nouveaux commentaires sont ajoutés, ainsi qu'aux personnes à l'origine d'un commentaire en cas de réponse. Vous pouvez gérer vos paramètres de notifications en accédant à `Notifications` depuis le menu des réglages du notebook.


## Liste des notebooks

La [liste des notebooks][1] vous permet de consulter et de rechercher les notebooks précédemment créés. Le nom, l'identité du créateur et la date de dernière modification de chaque notebook sont indiqués. Les notebooks sont regroupés en deux catégories :

* **My Notebooks** : les notebooks que vous avez créés.
* **Other Notebooks** : les notebooks créés par d'autres membres de votre équipe.

La liste des notebooks comporte également des modèles prédéfinis ainsi que des tutoriels. Modifiez directement ces modèles et cliquez sur **Clone** pour enregistrer vos modifications.

{{< img src="notebooks/templates.png" alt="modèles sur la page de la liste des notebooks" style="width:80%;">}}

## Nouveau notebook

Créez un [notebook][2] depuis la navigation principale, en accédant à *Notebooks > New Notebook*.

Par défaut, les nouveaux notebooks ne s'enregistrent pas automatiquement. Vous devez cliquer sur le bouton **Save**.

### Types de contenus

Les notebooks prennent en charge les visualisations et les cellules de texte.

#### Visualisation

Les graphiques dans les notebooks prennent en charge toutes les sources de données Datadog : métriques, événements de log, spans indexées, live processes, trafic réseau, événements RUM, métriques de profiling et signaux de sécurité.

{{< img src="notebooks/data_sources.png" alt="collaboration en direct dans les notebooks" style="width:50%;">}}

Les graphiques sont créés à l'aide de l'éditeur de requête de Datadog. Les notebooks prennent en charge les éléments suivants :

* [Série temporelle][3]
* [Top List][4]
* [Carte thermique][5]
* [Distribution][6]
* [Flux de logs][7]
* [Valeur de requête][8]

#### Texte

Le texte d'un notebook prend en charge le format [Markdown][9], qui permet l'utilisation de titres, de sous-titres, de liens, d'images, de listes et de blocs de code.

### Manipulation de cellules

Pour ouvrir une cellule afin de la modifier, passez le curseur dessus et cliquez dessus en maintenant la touche Cmd ou Ctrl enfoncée, ou cliquez sur **Edit**. Pour fermer une cellule, cliquez en dehors de celle-ci, appuyez sur la touche `Échap` ou utilisez le raccourci `Cmd + Entrée` / `Ctrl + Entrée`. Utilisez l'option **Cancel** pour annuler les modifications apportées à la cellule. Vous pouvez ouvrir une seule cellule à la fois.

Pour insérer des cellules, utilisez le bouton **+** qui figure à gauche de la cellule. Pour partager, dupliquer ou supprimer des cellules, utilisez la barre d'action qui s'affiche au-dessus de la cellule lorsque vous passez le curseur dessus. Vous pouvez exporter les cellules d'un graphique au sein d'un dashboard ou les télécharger au format PNG ou CSV.

{{< img src="notebooks/export-to-dash.png" alt="Exporter le graphique d'un notebook au sein d'un dashboard"  style="width:90%;">}}

### Plein écran

Cliquez sur l'icône de plein écran à droite de la cellule pour la modifier dans l'[éditeur de graphiques][10]. Sous **Graph your date**, ajoutez des informations telles que des événements superposés, des marqueurs et des commandes pour l'axe des ordonnées. Consultez et modifier le JSON du graphique directement dans l'onglet **JSON**.

### Options de disposition

Pour afficher les options de disposition suivantes, cliquez sur l'icône en forme de grille à droite de la cellule dans l'éditeur :

* **Graph size** : sélectionnez la taille du graphique parmi `XS`, `S`, `M` (par défaut), `L` et `XL`.
* **Graph legend** : décochez cette case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques `XS` et `S`.
* **Grouping** : cette option permet d'afficher un graphique par valeur de tag, afin de visualiser de petits multiples de votre visualisation.

{{< img src="notebooks/layout_options.png" alt="options de disposition" style="width:50%;">}}

**Remarque** : si vous modifiez l'un de ces paramètres, le changement s'applique uniquement à la cellule sélectionnée.

### Liens vers des cellules précises

Copiez l'URL d'une cellule spécifique en cliquant sur l'icône de lien située à droite de la cellule. Vous pouvez créer des liens directs pour les visualisations ainsi que pour les cellules Markdown.

Lorsqu'un utilisateur accède à l'URL d'une cellule spécifique, le notebook s'ouvre afin de présenter la cellule en haut de la fenêtre d'affichage. Les liens sont absolus, ce qui signifie que l'URL d'une cellule reste inchangée même si elle est déplacée vers un nouvel emplacement dans le notebook.

## Paramètres des notebooks

### Intervalles de temps

Par défaut, toutes les cellules des graphiques sont associées à l'intervalle global défini dans l'en-tête du notebook.

Pour afficher un autre intervalle, sélectionnez une option dans le sélecteur d'intervalle global, ou faites défiler directement un graphique. L'URL du notebook se met à jour afin de correspondre au nouvel intervalle, sans pour autant l'enregistrer dans le notebook.

**Remarque** : si vous cliquez sur une cellule et la faites glisser pour zoomer sur un graphique, cela ne dissocie pas la cellule de l'intervalle de temps global. À la place, cette opération modifie l'intervalle de temps global du notebook.

{{< img src="notebooks/global_time.png" alt="Sélecteur d'intervalle de notebook" style="width:90%;">}}


Pour enregistrer l'intervalle sélectionné en tant que paramètre par défaut du notebook, cliquez sur **Update Default**. Le bouton de réinitialisation annule toutes les modifications apportées à l'intervalle.

Chaque cellule peut être dissociée de l'intervalle global et posséder son propre intervalle.

{{< img src="notebooks/cell_time.png" alt="Sélecteur d'intervalle de cellule" style="width:90%;">}}

Pour afficher un autre intervalle pour une seule cellule, sélectionnez la cellule de votre choix, puis utilisez l'interrupteur pour la dissocier de l'intervalle global. Modifiez ensuite l'intervalle à l'aide du sélecteur l'intervalle, ou en faisant défiler le graphique. Les modifications apportées en mode édition sont enregistrées lorsque vous cliquez sur **Done**. Pour les annuler, cliquez sur **Cancel**.

### Snapshots de graphique

Les notebooks peuvent être configurés de façon à prendre automatiquement des snapshots des graphiques susceptibles d'expirer. Pour ce faire, cliquez sur l'option **Turn on graph snapshots** dans le menu des paramètres d'un notebook. Une fois cette option activée, utilisez ce même menu pour consulter les snapshots ou désactiver la prise automatique de snapshots. Si vous désactivez cette fonctionnalité, vous ne pourrez plus accéder aux snapshots existants.

{{< img src="notebooks/view-snapshots.png" alt="Option du menu des paramètres permettant de consulter les snapshots" style="width:50%;">}}

 Les notebooks pour lesquels la prise de snapshots automatique est activée enregistrent une image statique des graphiques avec un intervalle fixe (par exemple, `Aug 18, 12:00 am – Aug 19, 11:59 pm`). Si un graphique est modifié, tant qu'il possède toujours un intervalle fixe, les snapshots sont mis à jour. Si vous appliquez une durée globale (par exemple, `Past 1 Hour`), les snapshots sont supprimés.

 Vous pouvez afficher un aperçu du snapshot existant sur n'importe quel graphique avec un intervalle fixe. Pour ce faire, pendant que vous modifiez un graphique, passez le curseur sur l'icône en forme d'appareil photo.

{{< img src="notebooks/snapshot-preview.png" alt="Aperçu d'un snapshot de graphique" style="width:90%;">}}

Pour partager une version de votre notebook avec des snapshots, cliquez sur **View graph snapshots** dans l'en-tête du notebook et copiez l'URL, ou ajoutez `&view=snapshots` à la fin de l'URL d'un notebook pour lequel les snapshots sont activés.

## Partager des notebooks

Utilisez le menu **Share** en haut à droite d'un notebook pour afficher les options de partage. Les notebooks peuvent être exportés au format PDF, au format Markdown ou dans des documents texte.

{{< img src="notebooks/notebook-export.png" alt="Menu de partage de notebook" style="width:50%;">}}

Pour copier un notebook dans un document texte, cliquez sur **Copy formatted contents**. Accédez ensuite à un éditeur de texte, comme Google Docs ou Microsoft Word, pour coller le contenu du notebook, y compris les graphiques, dans son format d'origine (voir l'exemple ci-dessous).

{{< img src="notebooks/export-to-gdocs.jpeg" alt="Exemple d'exportation de notebook dans Google Docs" style="width:80%;">}}

### Importer ou exporter le JSON d'un notebook

Utilisez l'option **Export Notebook JSON** pour télécharger un fichier JSON contenant la définition de votre notebook. L'option **Import Notebook JSON** remplace tout le contenu du notebook par le contenu du JSON importé.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook
[3]: /fr/dashboards/widgets/timeseries/
[4]: /fr/dashboards/widgets/top_list/
[5]: /fr/dashboards/widgets/heat_map/
[6]: /fr/dashboards/widgets/distribution/
[7]: /fr/dashboards/widgets/log_stream/
[8]: /fr/dashboards/widgets/query_value/
[9]: https://daringfireball.net/projects/markdown/
[10]: /fr/dashboards/querying/#graphing-editor