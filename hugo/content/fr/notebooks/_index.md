---
aliases:
- /fr/graphing/notebooks/
- /fr/notebooks_new/
- /fr/notebooks_legacy/
description: Créez des documents collaboratifs en texte enrichi avec des graphiques
  Datadog en direct pour les enquêtes, les post-mortems, les runbooks et le storytelling
  basé sur les données.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management.
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Créer des histoires axées sur les données grâce aux notebooks collaboratifs
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Meilleures pratiques pour écrire des postmortems d'incident
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transformez et enrichissez vos journaux avec les pipelines d'observabilité
    Datadog.
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorez vos données avec Sheets, l'éditeur DDSQL et les carnets pour une
    analyse avancée dans Datadog.
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog.
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centre d'apprentissage
  text: Commencer avec les carnets.
- link: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
  tag: Centre d'apprentissage
  text: Utiliser les carnets Datadog pour des rapports centralisés.
title: Notebooks
---
## Aperçu {#overview}

Les carnets sont des documents collaboratifs en texte enrichi qui vous donnent tout le pouvoir des graphiques Datadog. Plusieurs utilisateurs peuvent travailler ensemble pour réaliser une enquête ou un [post-mortem][8] avec des données en direct de votre incident. Les carnets sont également excellents pour les runbooks et la documentation, fournissant des informations réelles sur vos systèmes en plus de votre contenu.

## Créer un carnet {#creating-a-notebook}

Vous pouvez créer un carnet à deux endroits :

- Dans la barre de navigation à gauche, cliquez sur **Tableaux de bord > Nouveau carnet**.
- Dans le coin supérieur droit de la [page de la liste des carnets][1], cliquez sur **Nouveau carnet**.

### Modèles de carnet {#notebook-templates}

Dans la [galerie de modèles][2], consultez des modèles prêts à l'emploi à partir desquels vous pouvez créer de nouveaux carnets. Les modèles incluent un [post-mortem][8] de réponse à un incident, un rapport d'incident et une spécification SLO. Vous pouvez également créer un nouveau modèle personnalisé pour construire des structures de carnet réutilisables.

## Modification d'un carnet {#editing-a-notebook}

Les carnets offrent une expérience d'édition de texte enrichi pour créer et collaborer sur du contenu. Vous pouvez taper et formater librement du texte en utilisant des options de barre d'outils familières et des raccourcis clavier, tels que gras, italique, titres, listes, et plus encore, directement dans l'éditeur.

Pour les utilisateurs qui préfèrent les raccourcis, les carnets prennent également en charge la syntaxe Markdown. Par exemple, taper `#` suivi d'un espace crée un titre, et utiliser des triples accents graves (<code>```</code>) commence un bloc de code.

Le contenu textuel est automatiquement enregistré au fur et à mesure que vous tapez. Pour les graphiques intégrés, assurez-vous d'enregistrer vos modifications dans l'éditeur de graphiques pour les appliquer dans le carnet.

### Types de contenu {#content-types}

Les carnets prennent en charge divers types de contenu enrichi et intégré, y compris, mais sans s'y limiter :

- [Graphiques](#graphs-in-notebooks)
- Images
- Titres (H1 - H3)
- Listes (listes à puces, listes numérotées et listes de contrôle)
- Blocs de code
- Citations en bloc
- Cellules Markdown

Pour la liste complète, tapez <kbd>/</kbd> dans un carnet.

### Graphiques dans les carnets {#graphs-in-notebooks}

Les carnets prennent en charge tous les types de widgets. Pour la liste complète, voir [Widgets][3].

Survolez le widget pour afficher les options d'édition et de configuration des graphiques.

Pour modifier la requête ou configurer l'affichage du graphique, utilisez la fonction **Édition rapide** pour effectuer la plupart des modifications en ligne. Pour une configuration plus avancée, cliquez sur l'icône de crayon ou maintenez la touche <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> enfoncée et cliquez sur le graphique pour ouvrir l'éditeur de graphique complet. Vous pouvez ajuster la période locale ou lier le graphique à l'heure du carnet global en cliquant sur l'icône de l'horloge.

Des options de configuration supplémentaires pour le graphique sont accessibles dans le menu à trois points, selon le type de graphique :
- **Taille du graphique** : Ajustez la hauteur du graphique en sélectionnant XS, S, M (par défaut), L ou XL.
- **Légende du graphique** : Décochez la case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques XS et S.

### Fonctionnalités de texte enrichi {#rich-text-features}

Les carnets prennent en charge les fonctionnalités de texte enrichi couramment utilisées telles que le gras, l'italique, le code en ligne et les en-têtes. Les carnets prennent également en charge une variété de types de listes tels que les listes à puces, numérotées ou de contrôle.

| Fonction       | Description                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Gras**      | Pour mettre du texte en gras, sélectionnez-le et appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Italique*     | Pour mettre du texte en italique, sélectionnez-le et appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | Pour le code en ligne, tapez <code>`</code> au début et à la fin du texte.                                          |
| Blocs de code    | Insérez un bloc de code en tapant <code>```</code> et en appuyant sur <kbd>Entrée</kbd>, ou en utilisant le menu de commande slash.           |
| Citations        | Insérez un bloc de citation en tapant `>`, ou en utilisant le menu de commande slash.                                                    |
| Tableaux de texte   | Insérez un tableau en tapant `/table` ou en utilisant le menu **Ajouter une cellule**.                                                          |
| Appels | Insérez un appel en tapant `/table` ou en tapant `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT` ou `!CAUTION` puis en appuyant sur <kbd>Espace</kbd>.   |

### Chips intelligents {#smart-chips}

| Fonctionnalité | Description |
|------------|----------------------------------------------------------------------------|
| `@Mention` | Pour mentionner un autre utilisateur, tapez `@` suivi de son nom ou de son adresse e-mail. |
| `$TemplateVariable` | Tapez `$` suivi du nom de votre variable de modèle existante. |
| `/date` | Ajoutez une puce de date en tapant `/date`. Vous pouvez modifier la date ou l'heure dans le popover chaque fois que vous cliquez sur la puce. Essayez également `/today` et `/now` ! |

### Commandes slash {#slash-commands}

Les commandes slash sont une interface pour créer des graphiques ou insérer d'autres contenus. Sur une nouvelle ligne, tapez `/` pour ouvrir le menu des commandes slash. Continuez à taper le nom du type de contenu souhaité et sélectionnez l'option appropriée.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Menu des commandes slash qui apparaît lorsque vous tapez / dans un carnet" style="width:70%;" >}}

Lorsque vous sélectionnez un type de graphique, cela ouvre l'[éditeur de graphique][3]. Après avoir cliqué sur **Enregistrer**, le graphique apparaît dans votre carnet.

### Raccourcis clavier {#keyboard-shortcuts}

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menu des raccourcis clavier pour les carnets Datadog" style="width:70%;" >}}

En bas à gauche d'un carnet, cliquez sur l'icône de clavier pour voir une liste des raccourcis clavier pour l'édition.

De plus, vous pouvez utiliser les raccourcis suivants pour couper et coller des widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Table des matières {#table-of-contents}

Les carnets génèrent automatiquement une table des matières à partir de tous les en-têtes ou graphiques que vous insérez dans votre document. Vous pouvez créer un en-tête en utilisant le raccourci markdown `#` ou en sélectionnant du texte et en cliquant sur **En-tête** dans la barre d'outils.

### Étiquettes de carnet {#notebook-tags}

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Options d'étiquettes de carnet pour favoriser un carnet, ajouter une équipe ou ajouter un type" style="width:80%;" >}}

| Action d'étiquette                | Description                                                                                                          |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Favoriser un carnet**   | Favoriser un carnet pour le fixer en haut de vos résultats sur la page de la liste des carnets. Pour basculer un carnet en favori, cliquez sur l'icône en forme d'étoile dans l'en-tête du carnet.                                                                     |
| **Étiqueter par équipe**           | Étiqueter un carnet avec une équipe vous permet de l'utiliser comme filtre lors de la recherche d'un carnet. Vous pouvez étiqueter un carnet avec jusqu'à 5 équipes. Pour étiqueter un carnet, cliquez sur l'option **Équipe** dans l'en-tête du carnet et sélectionnez les équipes souhaitées. |
| **Étiqueter par type**           | Vous pouvez étiqueter vos carnets avec des étiquettes de type pour faciliter la recherche, telles que : Postmortem, Runbook, Enquête, Documentation, Rapport. Pour étiqueter un carnet, cliquez sur **Type** et sélectionnez un type.                                                     |

### Ajouter des images aux carnets {#add-images-to-notebooks}

<div class="alert alert-info">Seuls les types de fichiers PNG, JPG, JPEG et GIF sont pris en charge. Les téléchargements ont une taille de fichier maximale de 4 Mo.</a></div>

Vous pouvez ajouter des images à votre carnet en utilisant `/image` ou le menu **Ajouter une cellule**. Cela offre des options pour redimensionner, aligner et légender l'image. Les images téléchargées sont hébergées par Datadog.

<!-- TODO Add updated image from new notebooks -->

Vous pouvez utiliser l'une des options suivantes pour télécharger une image à héberger par Datadog :
- Déposez un fichier image dans la zone de téléchargement
- Cliquez sur **Choisir un fichier** et localisez l'image dans votre répertoire de fichiers
- Collez une URL accessible au public pour l'image

Cliquez sur les icônes de la barre d'actions de l'image pour ajuster la taille, l'alignement, ajouter une légende pour l'image, ou voir l'image en mode plein écran.


## Ajouter des commentaires à un carnet {#adding-comments-to-a-notebook}

Vous pouvez ajouter des commentaires sur le contenu dans le corps du carnet. Pour commenter un texte, surlignez le texte et cliquez sur l'icône de commentaire dans la barre d'outils.

<!-- TODO Add updated image from new notebooks -->

Pour commenter un graphique ou une image, cliquez sur l'icône de commentaire à droite du graphique.

| Fonctionnalité :                  | Description                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Naviguer vers les commentaires** | Les commentaires enregistrés apparaissent dans la marge droite du carnet. Cliquez sur un surlignage de commentaire dans le texte pour l'ouvrir dans la marge, ou cliquez sur un commentaire dans la marge pour faire défiler jusqu'à son emplacement. |
| **Répondre aux commentaires** | Répondez aux commentaires en cliquant dessus dans la marge droite, ce qui ouvre une boîte de commentaire. Vous pouvez écrire du texte, `@mention` un utilisateur de Datadog, ou résoudre un commentaire en cliquant sur **Résoudre**. |
| **Lier aux commentaires**    | Liez à un commentaire spécifique en cliquant sur l'icône de lien dans le coin supérieur droit du commentaire pour copier son lien.      |
| **Modifier ou supprimer des commentaires** | Modifiez ou supprimez vos commentaires en cliquant sur le menu à trois points dans le coin supérieur droit du commentaire.                 |
| **Notifications de commentaires** | Par défaut, des notifications par e-mail sont envoyées à l'auteur du carnet pour les nouveaux commentaires des autres. Les utilisateurs dans un fil de commentaires reçoivent des notifications pour chaque réponse. Pour ajuster les notifications, dans le menu des paramètres, sélectionnez **Notifications**. |

## Expérience multijoueur dans les carnets {#multiplayer-experience-in-notebooks}

Les carnets prennent en charge la collaboration complète, permettant à plusieurs utilisateurs de modifier simultanément. Lorsqu'un collaborateur ouvre votre carnet, son curseur apparaît en temps réel. Survolez un curseur pour voir le nom du collaborateur.

<!-- TODO Add updated image from new notebooks -->

### Widgets {#widgets}

Lorsqu'un autre utilisateur édite un widget, un contour apparaît autour du widget. Étant donné que les widgets sont enregistrés selon le principe du dernier écrit, évitez d'éditer un widget sur lequel quelqu'un d'autre travaille.

<!-- TODO Add updated image from new notebooks -->

#### Présence {#presence}

En haut du carnet, vous pouvez voir les images d'avatar de tous les utilisateurs actuellement en train de consulter le carnet. Survolez un avatar pour voir le nom du collaborateur associé.

<!-- TODO Add updated image from new notebooks -->

## Configuration d'un carnet {#configuring-a-notebook}

### Variables de modèle {#template-variables}

Les carnets prennent en charge les variables de modèle. Définissez dynamiquement la portée des visualisations en ajoutant et en sélectionnant des valeurs de variables de modèle. Pour plus d'informations, voir [Variables de Modèle][5].

<div class="alert alert-danger">Certaines fonctionnalités d'analyse ont un support limité ou inexistant pour les variables de modèle. Pour plus d'informations, voir <a href="/notebooks/guide/template_variables_analysis_notebooks">Prise en charge des variables de modèle dans les carnets d'analyse</a>.</div>

### Contrôles temporels {#time-controls}

Par défaut, tous les graphiques sont liés à la plage de temps globale définie dans l'en-tête du carnet.

Pour voir une plage de temps différente, sélectionnez une option dans le sélecteur de temps global, ou faites glisser directement sur un graphique. L'URL du carnet se met à jour pour refléter cette nouvelle plage de temps sans l'enregistrer dans le carnet.

**Remarque** : Cliquer et faire glisser pour zoomer sur un graphique ne déverrouille pas le graphique de la plage de temps globale. Cela change la plage de temps globale du carnet à la place.

<!-- TODO Add updated image from new notebooks -->

Pour enregistrer ce temps comme le temps par défaut du carnet, cliquez sur **Définir le temps par défaut**. Pour réinitialiser votre plage de temps globale à la plage de temps globale par défaut précédemment enregistrée, cliquez sur le bouton de réinitialisation.

Les graphiques individuels peuvent être dissociés de la plage de temps globale et définis sur une plage de temps indépendante.

<!-- TODO Add updated image from new notebooks -->

Pour afficher une plage de temps différente sur un seul graphique, modifiez le graphique et utilisez le commutateur pour le dissocier de la plage de temps globale. Changez la plage de temps en utilisant le sélecteur de temps ou en glissant sur le graphique. Les modifications apportées en mode édition sont enregistrées automatiquement lorsque vous cliquez sur **Terminé**. Pour annuler vos modifications, cliquez sur **Annuler** au lieu de **Terminé**.

### Modes {#modes}

Vous pouvez passer d'un mode à l'autre depuis le carnet en sélectionnant le menu déroulant en haut à droite de votre carnet.

- **Édition** : Apportez des modifications au carnet.
- **Visualisation** : Le contenu est en lecture seule, empêchant les utilisateurs d'apporter des modifications non désirées aux configurations et informations existantes.

### Historique des versions {#version-history}

Depuis un carnet, cliquez sur l'icône d'engrenage et cliquez sur **Historique des versions** pour ouvrir le panneau latéral de l'historique des versions. Vous pouvez prévisualiser, restaurer ou cloner une version précédente de votre carnet. Pour plus d'informations, consultez le [guide de l'historique des versions][6].

### Instantanés de graphiques {#graph-snapshots}

Les carnets prennent automatiquement des instantanés des graphiques avec des plages de temps fixes pour préserver la vue avant que les limites de conservation des données ne s'appliquent. Aucune configuration n'est requise. Utilisez le menu kebab à côté d'un graphique pour afficher ou télécharger un instantané.

{{< img src="notebooks/kebab_snapshots.png" alt="Option du menu kebab pour afficher ou télécharger un instantané." style="width:100%;">}}

Les instantanés sont des images statiques de graphiques avec une plage de temps fixe (par exemple, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Un instantané se met à jour lorsque le graphique est mis à jour, tant que le graphique continue d'utiliser une plage de temps fixe. Changer le graphique en une plage de temps globale (par exemple, `Past 1 hour`) supprime l'instantané.

Vous pouvez prévisualiser l'état de l'instantané pour un carnet en survolant l'indicateur d'instantané du graphique sous le titre du carnet. La prévisualisation montre l'heure du dernier instantané et le nombre d'instantanés créés.

{{< img src="notebooks/hover_graph_snapshots.png" alt="Indicateur d'instantané indiquant combien d'instantanés ont été générés." style="width:100%;">}}

Lorsqu'un carnet contient un graphique avec des données qui dépassent ses limites de conservation des données, le carnet affiche un instantané en ligne du graphique. L'instantané est une image statique, mais il est remplacé si vous modifiez le graphique sous-jacent.

### Permissions {#permissions}

Par défaut, tous les utilisateurs disposent de l'ensemble des autorisations relatives aux notebooks.

Utilisez nos contrôles d'accès pour restreindre l'accès en vue et en modification uniquement à vous-même :
1. En visualisant un carnet, cliquez sur le bouton **Partager** dans le coin supérieur droit.
1. Sélectionnez **Privé pour moi**.
1. Cliquez sur **Enregistrer**.

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][7] qui peuvent modifier un carnet particulier :
1. En visualisant un carnet, cliquez sur le bouton **Partager** dans le coin supérieur droit.
1. Sélectionnez **Personnalisé**.
1. Mettez à jour l'accès de l'organisation à **Lecteur** pour révoquer l'accès en modification du reste de l'organisation.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs qui peuvent modifier le carnet.
1. Cliquez sur **Ajouter**.
1. La boîte de dialogue se met à jour pour montrer que le rôle que vous avez sélectionné a la permission **Éditeur**.
1. Cliquez sur **Enregistrer**.

**Remarque :** Pour maintenir votre accès en modification au carnet, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant de sauvegarder.

Vous devez avoir un accès en modification pour restaurer l'accès général à un carnet restreint. Complétez les étapes suivantes :
1. En visualisant un carnet, cliquez sur le bouton **Partager** dans le coin supérieur droit.
1. Sélectionnez **Mon organisation**.
1. Cliquez sur **Enregistrer**.

## Recherche de carnets {#finding-notebooks}

La page [Liste des Carnets][1] est l'endroit où trouver tous vos carnets.

<!-- TODO Add updated image from new notebooks -->

### Rechercher {#search}

Le champ de recherche prend en charge la recherche en texte intégral. Tapez votre requête pour afficher les carnets pertinents comme résultats.

### Filtrage {#filtering}

Vous pouvez filtrer les carnets avec les méthodes suivantes :
| Type de Filtre      | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| **Auteur**       | Pour filtrer par auteur, sélectionnez le menu déroulant de l'auteur et entrez des noms pour filtrer. |
| **Équipe**         | Pour filtrer par équipe, sélectionnez le menu déroulant de l'équipe et entrez des noms d'équipe pour filtrer. |
| **Type de Carnet**| Filtrer par investigation, post-mortem, runbook, rapport ou documentation.     |
| **Date Modifiée**| Filtrer en fonction de la date à laquelle un carnet a été modifié en utilisant le menu déroulant de la date modifiée. |

Il existe également des filtres rapides pour accéder à vos carnets et aux carnets étiquetés avec vos équipes.

### Reprendre là où vous vous étiez arrêté {#jump-back-in}

Si aucun filtre n'est activé, la section Reprendre là où vous vous étiez arrêté apparaît, affichant les carnets les plus récents que vous avez consultés ou modifiés.

<!-- TODO Add updated image from new notebooks -->

### Tri des carnets {#sorting-notebooks}

Vous pouvez trier les carnets en sélectionnant l'étoile ⭐, les détails ou les en-têtes modifiés pour trier par ces valeurs.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/list?location=templates
[3]: /fr/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /fr/dashboards/template_variables/
[6]: /fr/notebooks/guide/version_history
[7]: /fr/account_management/rbac/
[8]: /fr/incident_response/incident_management/post_incident/postmortems