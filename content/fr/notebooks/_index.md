---
aliases:
- /fr/graphing/notebooks/
cascade:
  algolia:
    rank: 70
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
- link: https://www.datadoghq.com/blog/automate-security-tasks-with-workflows-and-cloud-siem/
  tag: blog
  text: Automatiser les tâches de sécurité courantes et anticiper les menaces avec
    les workflows Datadog et Cloud SIEM
title: Notebooks
---

## Présentation

Les notebooks combinent des graphiques et du texte au sein d'un format linéaire basé sur des cellules. Ils facilitent l'exploration de vos données et le partage de récits en créant des analyses de fin de projet, des enquêtes, des runbooks, des documents, etc.

## Prise en main

1. Créez un [notebook][1] depuis la navigation principale, en accédant à **Notebooks > New Notebook**.

2. Cliquez sur le bouton **Save Notebook**. </br>
  **Remarque** : par défaut, les nouveaux notebooks ne sont pas enregistrés.

3. Ajoutez de nouvelles cellules à votre notebook en intégrant du [contenu textuel et graphique pris en charge](#types-de-contenus).

4. [Configurez les cellules](#configuration-des-cellules).

## Collaboration

{{< img src="notebooks/collaboration.png" alt="Indicateurs d'utilisateurs consultant le notebook et le modifiant en direct" style="width:100%;">}}

Les notebooks prennent en charge la collaboration en temps réel. Les indicateurs de présence affichent les personnes qui consultent votre notebook à tout moment, ainsi que les modifications en temps réel apportées aux cellules du notebook. Ces modifications s'affichent automatiquement : il n'est pas nécessaire d'actualiser le notebook.

Chaque membre de votre équipe peut ouvrir n'importe quel notebook. Toutefois, seuls les rôles Datadog disposant de l'autorisation `Notebooks Write` peuvent modifier ou supprimer du contenu.

### Publier des commentaires

Pour ajouter un commentaire, sélectionnez du texte ou passez votre curseur sur un graphique. L'icône **Add comment** s'affiche à droite de la cellule. Il est également possible de prévenir un membre de votre équipe dans un commentaire, grâce à la fonctionnalité `@mention`. Cliquez sur les trois points verticaux en haut à droite de votre commentaire pour le modifier ou le supprimer. Vous pouvez également consulter ou rouvrir des commentaires fermés depuis le volet latéral Comment History, accessible depuis le menu des paramètres du notebook.

Des notifications par e-mail sont envoyées aux auteurs de notebook lorsque de nouveaux commentaires sont ajoutés, ainsi qu'aux personnes à l'origine d'un commentaire en cas de réponse. Vous pouvez gérer vos paramètres de notifications en accédant à `Notifications` depuis le menu des réglages du notebook.

### Mode Vue

{{< img src="notebooks/read_mode.png" alt="Menu déroulant avec le mode Vue" style="width:100%;">}}

Pour basculer d'un mode à un autre dans un notebook, cliquez sur la liste déroulante en haut à droite du notebook.

- **Editing** : apportez des modifications au notebook.

- **Viewing** : le contenu est uniquement disponible en lecture seule, ce qui signifie que les utilisateurs ne peuvent pas modifier de façon malencontreuse des informations et configurations existantes.

- **Presenting** : partagez le contenu du notebook à l'aide d'un format d'affichage spécial où chaque cellule est affichée en tant que diapositive. Le mode Présentation prend en charge les interactions des graphiques, comme les infobulles et les légendes.

## Partager des notebooks

Cliquez sur l'icône en forme d'engrenage en haut à droite d'un notebook pour afficher les options de partage. Les notebooks peuvent être exportés au format PDF, au format Markdown ou dans des documents texte.

Pour copier un notebook dans un document texte, cliquez sur **Copy formatted contents**. Accédez ensuite à un éditeur de texte, comme Google Docs ou Microsoft Word, pour coller le contenu du notebook, y compris les graphiques, dans son format d'origine.

{{< img src="notebooks/export-to-gdocs.jpeg" alt="Exemple d'exportation de notebook dans Google Docs" style="width:100%;">}}

### Importer ou exporter le JSON d'un notebook

Utilisez l'option **Export Notebook JSON** pour télécharger un fichier JSON contenant la définition de votre notebook. L'option **Import Notebook JSON** remplace tout le contenu du notebook par le contenu du JSON importé.

### Liens vers des cellules précises

Depuis le menu **Share** d'une cellule, cliquez sur l'option **Link directly to cell** pour copier l'URL de cette cellule. Vous pouvez créer des liens directs pour les visualisations ainsi que pour les cellules Markdown.

Lorsqu'un utilisateur accède à l'URL d'une cellule spécifique, le notebook s'ouvre afin de présenter la cellule en haut de la fenêtre d'affichage. Les liens sont absolus, ce qui signifie que l'URL d'une cellule reste inchangée même si elle est déplacée vers un nouvel emplacement dans le notebook.

## Liste des notebooks

{{< img src="notebooks/notebook_list.png" alt="Liste de notebooks avec un aperçu des types de cellules du notebook sélectionné" style="width:100%;">}}

La [liste des notebooks][2] vous permet de consulter et de rechercher les notebooks précédemment créés. Le nom, l'identité du créateur et la date de dernière modification de chaque notebook sont indiqués. Les notebooks sont regroupés en plusieurs catégories :

* **Your Notebooks** : les notebooks que vous avez créés.
* **All Notebooks** : tous les notebooks de votre organisation.
* **[Type de notebook](#types-de-notebooks)** : regroupez des notebooks par type.

Passez votre curseur sur l'icône Preview d'un notebook pour afficher un aperçu de son contenu, y compris les types de widgets et le contenu Markdown. Pour ouvrir le notebook en [mode Vue](#mode-vue), passez votre curseur dessus, puis cliquez sur l'option **Open notebook in view mode** située sur la droite.

## Galerie de modèles
La [galerie de modèles][3] contient des modèles prêts à l'emploi vous permettant de créer directement des notebooks. Les modèles comprennent un post-mortem pour la gestion d'incident, un rapport d'incident et une spécification SLO. Vous pouvez également créer un nouveau modèle personnalisé pour concevoir des structures de notebook réutilisables.

## Historique des versions
À partir d'un notebook, cliquez sur l'icône **Configure**, puis sur **Version history** pour ouvrir le volet latéral Version History. Depuis ce volet, vous pouvez afficher un aperçu de l'historique des versions de votre notebook, le restaurer ou le dupliquer. Pour en savoir plus, consultez le [guide sur l'historique des versions][4].

## Configuration des notebooks

### Intervalles de temps

Par défaut, toutes les cellules des graphiques sont associées à l'intervalle global défini dans l'en-tête du notebook.

Pour afficher un autre intervalle, sélectionnez une option dans le sélecteur d'intervalle global, ou faites défiler directement un graphique. L'URL du notebook se met à jour afin de correspondre au nouvel intervalle, sans pour autant l'enregistrer dans le notebook.

**Remarque** : si vous cliquez sur une cellule et la faites glisser pour zoomer sur un graphique, cela ne dissocie pas la cellule de l'intervalle de temps global. À la place, cette opération modifie l'intervalle de temps global du notebook.

{{< img src="notebooks/set_default_time.png" alt="Enregistrer l'intervalle global grâce au bouton Set Default Time" style="width:100%;">}}

Pour configurer par défaut cet intervalle pour le notebook, cliquez sur **Set Default Time**. Pour rétablir l'intervalle précédemment configuré, cliquez sur le bouton de réinitialisation.

Chaque cellule peut être dissociée de l'intervalle global et posséder son propre intervalle.

{{< img src="notebooks/cell_time.png" alt="Sélecteur d'intervalle de cellule avec une cellule ne respectant pas l'intervalle global" style="width:100%;">}}

Pour afficher un autre intervalle pour une seule cellule, sélectionnez la cellule de votre choix, puis utilisez l'interrupteur pour la dissocier de l'intervalle global. Modifiez ensuite l'intervalle à l'aide du sélecteur l'intervalle, ou en faisant défiler le graphique. Les modifications apportées en mode édition sont enregistrées lorsque vous cliquez sur **Done**. Pour les annuler, cliquez sur **Cancel**.

### Types de notebooks

{{< img src="notebooks/add_notebook_type.png" alt="Bouton Add Type mis en évidence dans un notebook" style="width:100%;">}}

il est possible de regrouper plusieurs notebooks au sein d'un même type, afin de pouvoir accéder rapidement aux informations dont vous avez besoin. Les notebooks créés à partir d'autres produits, par exemple la solution Incident Management ou des monitors, peuvent se voir attribuer automatiquement un type. Passez votre curseur sur le titre du notebook pour afficher l'option permettant d'ajouter ou de modifier le type. Pour ajouter un type, cliquez sur **+ Add Type**. Pour modifier un type, cliquez sur l'icône en forme de crayon qui s'affiche en regard du type lorsque vous passez votre curseur dessus.

### Snapshots de graphique

Les notebooks peuvent être configurés de façon à prendre automatiquement des snapshots des graphiques susceptibles d'expirer. Pour activer cette fonctionnalité, cliquez sur l'option **Turn on snapshots** dans le menu des paramètres d'un notebook. Utilisez ce même menu pour consulter les snapshots ou désactiver la prise automatique de snapshots. Si vous désactivez cette fonctionnalité, vous ne pourrez plus accéder aux snapshots existants.

{{< img src="notebooks/cog_snapshots.png" alt="Option du menu des paramètres permettant d'activer les snapshots" style="width:100%;">}}

 Les notebooks pour lesquels la prise de snapshots automatique est activée enregistrent une image statique des graphiques avec un intervalle fixe (par exemple, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Si un graphique est modifié, tant qu'il possède toujours un intervalle fixe, les snapshots sont mis à jour. Si vous appliquez une durée globale (par exemple, `Past 1 Hour`), les snapshots sont supprimés.

 Vous pouvez afficher un aperçu du snapshot existant sur n'importe quel graphique avec un intervalle fixe. Pour ce faire, pendant que vous modifiez un graphique, passez le curseur sur l'icône en forme d'appareil photo.

Pour partager une version de votre notebook avec des snapshots, depuis le menu des paramètres, cliquez sur **View snapshots**. Copiez ensuite l'URL, ou ajoutez `&view=snapshots` à la fin de l'URL d'un notebook pour lequel les snapshots sont activés.

### Template variables

Les notebooks prennent en charge les template variables. Pour filtrer de façon dynamique les visualisations, ajoutez et sélectionnez des valeurs de template variable. Pour en savoir plus, consultez la section [Template variables][5].

### Configuration des cellules

Pour ajouter des cellules, cliquez sur le bouton **+** figurant à gauche d'une cellule, ou sélectionnez une option depuis la section **Add New Cell** située en bas du notebook. La barre d'actions, qui s'affiche au-dessus de la cellule lorsque vous passez votre curseur dessus, vous permet de partager, de dupliquer ou de supprimer des cellules. Il est possible d'exporter des cellules de graphique vers un dashboard, ou encore de télécharger les données d'un graphique aux formats PNG ou CSV. Lorsque vous cliquez sur **Done**, les modifications apportées dans le mode Modification sont automatiquement enregistrées. Pour ignorer vos changements, cliquez plutôt sur **Cancel**.

#### Options de modification

Cliquez sur **More options** dans l'éditeur intégré d'un widget pour modifier ses options. Vous pouvez par exemple superposer des événements, ajouter des marqueurs ou afficher les options de l'axe des ordonnées.

#### Options de disposition

Depuis une cellule de notebook, cliquez sur **Edit** pour afficher sa configuration et y apporter des modifications. Il est également possible d'afficher les options de disposition disponibles. La liste des options varie selon le type de contenu de la cellule. Elle comprend les options suivantes : 

* **Graph size** : sélectionnez la taille du graphique parmi `XS`, `S`, `M` (par défaut), `L` et `XL`.
* **Graph legend** : décochez cette case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques `XS` et `S`.
* **Grouping** : cette option permet d'afficher un graphique par valeur de tag, afin de visualiser de petits multiples de votre visualisation.

{{< img src="notebooks/edit_cell_action_menu.png" alt="L'option Graph Settings d'une cellule de notebook en mode Modification, avec des options de disposition relatives à la taille du graphique, la légende et la configuration du regroupement" style="width:100%;">}}

**Remarque** : si vous modifiez l'un de ces paramètres, le changement s'applique uniquement à la cellule sélectionnée.

#### Types de contenus

Les notebooks prennent en charge les visualisations et les cellules de texte. Ces dernières bénéficient du format [Markdown][6], qui permet d'ajouter des titres, des sous-titres, des liens, des images, des listes et des blocs de code. Les notebooks prennent également en charge les diagrammes au format [MermaidJS][7].

Les graphiques dans les notebooks prennent en charge toutes les sources de données Datadog : métriques, événements de log, spans indexées, live processes, trafic réseau, événements RUM, métriques de profiling, signaux de sécurité, etc. Pour créer un graphique, vous devez utiliser l'éditeur de requête Datadog. Les notebooks prennent en charge les éléments suivants :

* [Série temporelle][8]
* [Top list][9]
* [Table][10]
* [Carte thermique][11]
* [Distribution][12]
* [Liste][13]
* [Valeur de requête][14]
* [Entonnoir][15]
* [Graphique à secteurs][16]
* [Résumé de SLO][17]

### Restreindre les modifications

Par défaut, tous les utilisateurs disposent de l'ensemble des autorisations relatives aux notebooks.

Utilisez les contrôles d'accès granulaires pour limiter les [rôles][18] capables de modifier un notebook spécifique :
1. Pendant que vous consultez un notebook, cliquez sur l'icône en forme d'engrenage dans le coin supérieur droit. Le menu des paramètres s'ouvre alors.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Depuis la liste déroulante, sélectionnez les rôles, équipes (bêta) ou utilisateurs (bêta) autorisés à modifier le notebook.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Save**.

**Remarque** : afin de toujours pouvoir modifier le notebook, vous devez inclure au moins un de vos rôles avant d'enregistrer vos modifications.

Pour rétablir les autorisations globales d'un notebook restreint, procédez comme suit :
1. Pendant que vous consultez le notebook, cliquez sur l'icône en forme d'engrenage dans le coin supérieur droit. Le menu des paramètres s'ouvre alors.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/notebook
[2]: https://app.datadoghq.com/notebook/list
[3]: https://app.datadoghq.com/notebook/template-gallery
[4]: /fr/notebooks/guide/version_history
[5]: /fr/dashboards/template_variables/
[6]: https://daringfireball.net/projects/markdown/
[7]: https://mermaid.js.org/
[8]: /fr/dashboards/widgets/timeseries/
[9]: /fr/dashboards/widgets/top_list/
[10]: /fr/dashboards/widgets/table/
[11]: /fr/dashboards/widgets/heatmap/
[12]: /fr/dashboards/widgets/distribution/
[13]: /fr/dashboards/widgets/list/
[14]: /fr/dashboards/widgets/query_value/
[15]: /fr/dashboards/widgets/funnel/
[16]: /fr/dashboards/widgets/pie_chart/
[17]: /fr/dashboards/widgets/slo/
[18]: /fr/account_management/rbac/