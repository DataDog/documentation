---
aliases:
- /fr/graphing/notebooks/
- /fr/notebooks_new/
- /fr/notebooks_legacy/
description: Créez des documents collaboratifs de texte enrichi intégrant des graphiques
  Datadog en direct pour les enquêtes, les postmortems, les runbooks et des récits
  basés sur les données.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/collaborative-notebooks-datadog/
  tag: Blog
  text: Créer des histoires axées sur les données grâce aux Notebooks collaboratifs
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: Blog
  text: Meilleures pratiques pour écrire des postmortems d'incident
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: blog
  text: Transformez et enrichissez vos logs avec Datadog Observability Pipelines
- link: https://www.datadoghq.com/blog/advanced-analysis-tools/
  tag: Blog
  text: Explorez vos données avec Sheets, l'éditeur DDSQL et les Notebooks pour une
    analyse avancée dans Datadog
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog
- link: https://learn.datadoghq.com/courses/getting-started-with-notebooks
  tag: Centre d'apprentissage
  text: Prise en main des Notebooks
- link: https://learn.datadoghq.com/courses/using-datadog-notebooks-lab
  tag: Centre d'apprentissage
  text: Utilisation de Datadog Notebooks pour le reporting centralisé
title: Notebooks
---
## Présentation {#overview}

Les Notebooks sont des documents de texte enrichi collaboratifs qui vous offrent toute la puissance des graphiques Datadog. Plusieurs utilisateurs peuvent travailler ensemble pour élaborer une enquête ou un [post-mortem][8] intégrant des données en direct de votre incident. Les Notebooks sont également parfaits pour les runbooks et la documentation intégrant des informations réelles sur vos systèmes parallèlement à votre contenu.

## Création d'un Notebook {#creating-a-notebook}

Vous pouvez créer un Notebook à deux endroits :

- Depuis la barre de navigation de gauche, cliquez sur {{< ui >}}Dashboards{{< /ui >}} > {{< ui >}}New Notebook{{< /ui >}}.
- Dans le coin supérieur droit de la [page Notebooks List][1], cliquez sur {{< ui >}}New Notebook{{< /ui >}}.

### Modèles de Notebooks {#notebook-templates}

Dans la [Galerie de modèles][2], consultez les modèles prêts à l'emploi à partir desquels vous pouvez créer de nouveaux Notebooks. Les modèles incluent un [post-mortem][8] d'intervention sur incident, un rapport d'incident et une spécification SLO. Vous pouvez également créer un nouveau modèle personnalisé pour élaborer des structures de Notebooks réutilisables.

## Modification d'un Notebook {#editing-a-notebook}

Les Notebooks offrent une expérience d'édition de texte enrichi pour créer et collaborer sur du contenu. Vous pouvez librement saisir et mettre en forme du texte à l'aide des options de la barre d'outils et des raccourcis clavier habituels (gras, italique, en-têtes, listes, etc.) directement dans l'éditeur.

Pour les utilisateurs qui préfèrent les raccourcis, les Notebooks prennent également en charge la syntaxe Markdown. Par exemple, taper `#` suivi d'un espace crée un en-tête, et l'utilisation de triples backticks (<code>```</code>) démarre un bloc de code.

Le contenu textuel est automatiquement enregistré au fur et à mesure que vous tapez. Pour les graphiques intégrés, assurez-vous d'enregistrer vos modifications dans l'éditeur de graphique pour les appliquer dans le Notebook.

### Types de contenu {#content-types}

Les Notebooks prennent en charge divers types de contenu enrichi et intégré, y compris, mais sans s'y limiter :

- [Graphiques](#graphs-in-notebooks)
- Images
- En-têtes (H1 - H3)
- Listes (listes à puces, listes numérotées et listes de contrôle)
- Blocs de code
- Blocs de citation
- Cellules Markdown

Pour la liste complète, tapez <kbd>/</kbd> dans un Notebook.

### Graphiques dans les Notebooks {#graphs-in-notebooks}

Les Notebooks prennent en charge tous les types de widgets. Pour la liste complète, consultez [Widgets][3].

Survolez le widget pour afficher les options d'édition et de configuration des graphiques.

Pour modifier la requête ou configurer l'affichage du graphique, utilisez la fonctionnalité {{< ui >}}Quick Edit{{< /ui >}} pour effectuer la plupart des modifications en ligne. Pour une configuration plus avancée, cliquez sur l'icône en forme de crayon ou maintenez la touche <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> enfoncée et cliquez sur le graphique pour ouvrir l'éditeur de graphique complet. Vous pouvez ajuster le fuseau horaire local ou lier le graphique à l'heure globale du Notebook en cliquant sur l'icône d'horloge.

Des options de configuration de graphique supplémentaires sont accessibles via le menu à trois points, selon le type de graphique :
- {{< ui >}}Graph size{{< /ui >}}: Ajustez la hauteur du graphique en sélectionnant XS, S, M (par défaut), L ou XL.
- {{< ui >}}Graph legend{{< /ui >}}: Décochez la case pour masquer la légende. Les légendes sont automatiquement désactivées pour les graphiques XS et S.

### Fonctionnalités de texte enrichi {#rich-text-features}

Les Notebooks prennent en charge les fonctionnalités de texte enrichi couramment utilisées comme le gras, l'italique, le code en ligne et les en-têtes. Les Notebooks prennent également en charge divers types de listes tels que les listes à puces, numérotées ou à cocher.

| Fonctionnalité       | Description                                                                                                                |
|---------------|----------------------------------------------------------------------------------------------------------------------------|
| **Gras**      | Pour mettre du texte en gras, sélectionnez-le et appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>B</kbd>.                                           |
| *Italique*     | Pour mettre du texte en italique, sélectionnez-le et appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.                                      |
| `Inline code` | Pour le code en ligne, tapez <code>`</code> au début et à la fin du texte.                                          |
| Blocs de code    | Insérez un bloc de code en tapant <code>```</code> et en appuyant sur <kbd>Entrée</kbd>, ou en utilisant le menu de commande barre oblique.           |
| Citations        | Insérez un bloc de citation en tapant `>`, ou en utilisant le menu de commande barre oblique.                                                    |
| Tableaux de texte   | Insérez un tableau en tapant `/table` ou en utilisant le menu {{< ui >}}Add Cell{{< /ui >}}.                                                          |
| Encadrés      | Insérez un encadré en tapant `/table` ou en tapant `!NOTE`, `!TIP`, `!WARNING`, `!IMPORTANT`, ou `!CAUTION` puis en appuyant sur <kbd>Espace</kbd>.   |

### Puces intelligentes {#smart-chips}

| Fonctionnalité    | Description                                                                |
|------------|----------------------------------------------------------------------------|
| `@Mention` | Pour mentionner un autre utilisateur, tapez `@` suivi de son nom ou de son adresse e-mail. |
| `$TemplateVariable` | Tapez `$` suivi du nom de votre variable de modèle existante. |
| `/date` | Ajoutez un chip de date en tapant `/date`. Vous pouvez modifier la date ou l'heure dans la fenêtre contextuelle chaque fois que vous cliquez sur le chip. Essayez aussi `/today` et `/now` ! |

### Commandes slash {#slash-commands}

Les commandes slash sont une interface pour créer des graphiques ou insérer d'autres contenus. Sur une nouvelle ligne, tapez `/` pour ouvrir le menu des commandes slash. Continuez à taper le nom du type de contenu souhaité et sélectionnez l'option appropriée.

{{< img src="/notebooks/notebooks_new/slash_command_menu.png" alt="Menu des commandes slash qui apparaît lorsque vous tapez / dans un Notebook." style="width:70%;" >}}

Lorsque vous sélectionnez un type de graphique, cela ouvre l'[éditeur de graphique][3]. Après avoir cliqué sur {{< ui >}}Save{{< /ui >}}, le graphique apparaît dans votre Notebook.

### Raccourcis clavier {#keyboard-shortcuts}

{{< img src="/notebooks/notebook_keyboard_shortcuts.png" alt="Menu des raccourcis clavier pour Datadog Notebooks" style="width:70%;" >}}

Dans le coin inférieur gauche d'un Notebook, cliquez sur l'icône de clavier pour afficher une liste des raccourcis clavier pour l'édition.

De plus, vous pouvez utiliser les raccourcis suivants pour couper et coller des widgets (<kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>X</kbd>, <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>V</kbd>).

### Table des matières {#table-of-contents}

Les Notebooks génèrent automatiquement une table des matières à partir de tous les en-têtes ou graphiques que vous insérez dans votre document. Vous pouvez créer un en-tête en utilisant le raccourci markdown `#` ou en sélectionnant du texte et en cliquant sur {{< ui >}}Header{{< /ui >}} dans la barre d'outils.

### Tags de Notebook {#notebook-tags}

{{< img src="/notebooks/notebooks_new/notebook_tags.png" alt="Options de tag pour Notebook permettant de mettre un Notebook en favori, d'ajouter une équipe ou d'ajouter un type" style="width:80%;" >}}

| Action de tag : | Description : |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Mettre un Notebook en favori**   | Mettez un Notebook en favori pour l'épingler en haut de vos résultats sur la page Notebooks List. Pour basculer un Notebook en favori, cliquez sur l'icône en forme d'étoile dans l'en-tête du Notebook.                                                                     |
| **Taguer par équipe**           | Taguer un Notebook avec une équipe vous permet de l'utiliser comme filtre lors de la recherche d'un Notebook. Vous pouvez taguer un Notebook avec jusqu'à 5 équipes. Pour taguer un Notebook, cliquez sur l'option {{< ui >}}Team{{< /ui >}} dans l'en-tête du Notebook et sélectionnez les équipes souhaitées. |
| **Taguer par type**           | Vous pouvez taguer vos Notebooks avec des tags de type pour faciliter la recherche, tels que : Post-mortem, Runbook, Investigation, Documentation, Rapport. Pour taguer un Notebook, cliquez sur {{< ui >}}Type{{< /ui >}} et sélectionnez un type.                                                     |

### Ajouter des images aux Notebooks {#add-images-to-notebooks}

<div class="alert alert-info">Seuls les types de fichiers PNG, JPG, JPEG et GIF sont pris en charge. La taille maximale des fichiers téléchargés est de 4 Mo.</a></div>

Vous pouvez ajouter des images à votre Notebook en utilisant `/image` ou le menu {{< ui >}}Add Cell{{< /ui >}}. Cela fournit des options pour redimensionner, aligner et légender l'image. Les images téléchargées sont hébergées par Datadog.

<!-- TODO Add updated image from new notebooks -->

Vous pouvez utiliser l'une des options suivantes pour télécharger une image afin qu'elle soit hébergée par Datadog :
- Déposez un fichier image dans la zone de téléchargement
- Cliquez sur {{< ui >}}Choose File{{< /ui >}} et localisez l'image dans votre répertoire de fichiers
- Collez une URL accessible publiquement pour l'image

Cliquez sur les icônes de la barre d'action de l'image pour ajuster la taille, l'alignement, ajouter une légende à l'image ou afficher l'image en mode plein écran.


## Ajout de commentaires à un notebook {#adding-comments-to-a-notebook}

Vous pouvez ajouter des commentaires sur le contenu dans le corps du notebook. Pour commenter du texte, surlignez le texte et cliquez sur l'icône de commentaire dans la barre d'outils.

<!-- TODO Add updated image from new notebooks -->

Pour commenter un graphique ou une image, cliquez sur l'icône de commentaire à droite du graphique.

| Fonctionnalité                  | Description                                                                                                          |
|--------------------------|----------------------------------------------------------------------------------------------------------------------|
| **Navigation dans les commentaires** | Les commentaires enregistrés apparaissent dans la marge droite du notebook. Cliquez sur un commentaire surligné dans le texte pour l'ouvrir dans la marge, ou cliquez sur un commentaire dans la marge pour faire défiler jusqu'à son emplacement. |
| **Répondre aux commentaires** | Répondez aux commentaires en cliquant dessus dans la marge droite, ce qui ouvre une zone de commentaire. Vous pouvez écrire du texte, `@mention` un utilisateur Datadog, ou résoudre un commentaire en cliquant sur {{< ui >}}Resolve{{< /ui >}}. |
| **Lien vers des commentaires**    | Créez un lien vers un commentaire spécifique en cliquant sur l'icône de lien dans le coin supérieur droit du commentaire pour copier son lien.      |
| **Modification ou suppression de commentaires** | Modifiez ou supprimez vos commentaires en cliquant sur le menu à trois points dans le coin supérieur droit du commentaire.                 |
| **Notifications de commentaires** | Par défaut, des notifications par e-mail sont envoyées à l'auteur du notebook pour les nouveaux commentaires ajoutés par d'autres utilisateurs. Les utilisateurs participant à un fil de discussion reçoivent des notifications pour chaque réponse. Pour ajuster les notifications, dans le menu en forme de roue dentée, sélectionnez {{< ui >}}Notifications{{< /ui >}}. |

## Expérience multi-utilisateurs dans les Notebooks {#multiplayer-experience-in-notebooks}

Les Notebooks prennent en charge une collaboration complète, permettant à plusieurs utilisateurs de modifier simultanément. Lorsqu'un collaborateur ouvre votre notebook, son curseur apparaît en temps réel. Survolez un curseur pour voir le nom du collaborateur.

<!-- TODO Add updated image from new notebooks -->

### Widgets {#widgets}

Lorsqu'un autre utilisateur modifie un widget, un contour apparaît autour de celui-ci. Comme les widgets sont enregistrés selon le principe « last write wins » (la dernière écriture l'emporte), évitez de modifier un widget sur lequel quelqu'un d'autre travaille.

<!-- TODO Add updated image from new notebooks -->

#### Présence {#presence}

En haut du notebook, vous pouvez voir les avatars de tous les utilisateurs qui consultent actuellement le notebook. Survolez un avatar pour voir le nom du collaborateur associé.

<!-- TODO Add updated image from new notebooks -->

## Configuration d'un notebook {#configuring-a-notebook}

### Variables de modèle{#template-variables}

Les Notebooks prennent en charge les variables de modèle. Définissez dynamiquement le périmètre des visualisations en ajoutant et en sélectionnant des valeurs de variables de modèle. Pour plus d'informations, consultez [Variables de modèle][5].

Une variable de modèle dont la clé de tag est `team` s'affiche sous forme de filtre d'équipe, avec une sélection tenant compte de la hiérarchie et une liste combinée de Datadog Teams et de valeurs de tag `team`. Pour plus d'informations, consultez [Filtre d'équipe][9].

<div class="alert alert-danger">Certaines fonctionnalités d'analyse ont une prise en charge limitée ou inexistante des variables de modèle. Pour plus d'informations, consultez <a href="/notebooks/guide/template_variables_analysis_notebooks">Prise en charge des variables de modèle dans les Notebooks d'analyse</a>.</div>

### Contrôles temporels {#time-controls}

Par défaut, tous les graphiques sont liés à la période globale définie dans l'en-tête du notebook.

Pour afficher une période différente, sélectionnez une option dans le sélecteur de temps global ou effectuez un balayage directement sur un graphique. L'URL du notebook se met à jour pour refléter cette nouvelle période sans l'enregistrer dans le notebook.

**Remarque** : Cliquer et faire glisser pour effectuer un zoom avant sur un graphique ne détache pas le graphique du temps global. Cela modifie plutôt le temps global du notebook.

<!-- TODO Add updated image from new notebooks -->

Pour enregistrer cette période comme valeur par défaut du notebook, cliquez sur {{< ui >}}Set Default Time{{< /ui >}}. Pour réinitialiser votre plage temporelle globale à la plage temporelle globale par défaut précédemment enregistrée, cliquez sur le bouton de réinitialisation.

Les graphiques individuels peuvent être dissociés du temps global et réglés sur une période indépendante.

<!-- TODO Add updated image from new notebooks -->

Pour afficher une période différente sur un seul graphique, modifiez le graphique et utilisez l'interrupteur pour le dissocier du temps global. Modifiez la période à l'aide du sélecteur de temps ou en faisant défiler le graphique. Les modifications apportées en mode édition sont enregistrées automatiquement lorsque vous cliquez sur {{< ui >}}Done{{< /ui >}}. Pour annuler vos modifications, cliquez sur {{< ui >}}Cancel{{< /ui >}} au lieu de {{< ui >}}Done{{< /ui >}}.

### Modes {#modes}

Vous pouvez basculer entre les modes depuis le notebook en sélectionnant le menu déroulant en haut à droite de votre notebook.

- {{< ui >}}Editing{{< /ui >}} : Apportez des modifications au notebook.
- {{< ui >}}Viewing{{< /ui >}} : Le contenu est en lecture seule, ce qui empêche les utilisateurs d'apporter des modifications indésirables aux configurations et aux informations existantes.

### Historique des versions {#version-history}

Depuis un notebook, cliquez sur l'icône en forme de roue dentée, puis cliquez sur {{< ui >}}Version history{{< /ui >}} pour ouvrir le panneau latéral Historique des versions. Vous pouvez prévisualiser, restaurer ou cloner une version précédente de votre notebook. Pour plus d'informations, consultez le [guide de l'historique des versions][6].

### Instantanés de graphiques {#graph-snapshots}

Les Notebooks prennent automatiquement des instantanés des graphiques avec des plages temporelles fixes afin de préserver la vue avant que les limites de rétention des données ne s'appliquent. Aucune configuration n'est requise. Utilisez le menu kebab à côté d'un graphique pour afficher ou télécharger un instantané.

{{< img src="notebooks/kebab_snapshots.png" alt="Option du menu kebab pour afficher ou télécharger un instantané" style="width:100%;">}}

Les instantanés sont des images statiques de graphiques avec une plage temporelle fixe (par exemple, `Aug 18, 12:00 am - Aug 19, 11:59 pm`). Un instantané se met à jour lorsque le graphique est mis à jour, tant que le graphique continue d'utiliser une plage temporelle fixe. Le passage du graphique à une plage temporelle globale (par exemple, `Past 1 hour`) supprime l'instantané.

Vous pouvez prévisualiser le statut de l'instantané d'un notebook en survolant l'indicateur d'instantané du graphique sous le titre du notebook. La prévisualisation affiche l'heure de l'instantané le plus récent et le nombre d'instantanés créés.

{{< img src="notebooks/hover_graph_snapshots.png" alt="Indicateur d'instantané montrant combien d'instantanés ont été générés" style="width:100%;">}}

Lorsqu'un notebook contient un graphique avec des données ayant dépassé leurs limites de rétention, le notebook affiche un instantané intégré du graphique. L'instantané est une image statique, mais il est remplacé si vous modifiez le graphique sous-jacent.

### Autorisations{#permissions}

Par défaut, tous les utilisateurs disposent de l'ensemble des autorisations relatives aux notebooks.

Utilisez nos contrôles d'accès pour restreindre l'accès en consultation et en modification à vous seul :
1. Pendant la consultation d'un notebook, cliquez sur le bouton {{< ui >}}Share{{< /ui >}} en haut à droite.
1. Sélectionnez {{< ui >}}Private to me{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Utilisez des contrôles d'accès granulaires pour limiter les [rôles][7] pouvant modifier un notebook particulier :
1. Pendant la consultation d'un notebook, cliquez sur le bouton {{< ui >}}Share{{< /ui >}} en haut à droite.
1. Sélectionnez {{< ui >}}Custom{{< /ui >}}.
1. Mettez à jour l'accès de l'Organisation sur {{< ui >}}Viewer{{< /ui >}} pour révoquer l'accès en modification du reste de l'organisation.
1. Utilisez la liste déroulante pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs pouvant modifier le notebook.
1. Cliquez sur {{< ui >}}Add{{< /ui >}}.
1. La boîte de dialogue se met à jour pour indiquer que le rôle que vous avez sélectionné dispose de l'autorisation {{< ui >}}Editor{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

**Remarque :** Pour conserver votre accès en modification au notebook, le système exige que vous incluiez au moins un rôle dont vous êtes membre avant d'enregistrer.

Vous devez disposer d'un accès en modification pour rétablir l'accès général à un notebook restreint. Effectuez les étapes suivantes :
1. Pendant la consultation d'un notebook, cliquez sur le bouton {{< ui >}}Share{{< /ui >}} en haut à droite.
1. Sélectionnez {{< ui >}}My Org{{< /ui >}}.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Recherche de notebooks {#finding-notebooks}

La page [Notebooks List][1] est l'endroit où trouver tous vos notebooks.

<!-- TODO Add updated image from new notebooks -->

### Rechercher {#search}

Le champ de recherche prend en charge la recherche en texte intégral. Saisissez votre requête pour afficher les notebooks pertinents en tant que résultats.

### Filtrage {#filtering}

Vous pouvez filtrer les notebooks avec les méthodes suivantes :
| Type de filtre      | Description                                                                 |
|------------------|-----------------------------------------------------------------------------|
| {{< ui >}}Author{{< /ui >}}       | Pour filtrer par auteur, sélectionnez le menu déroulant des auteurs et saisissez les noms pour filtrer. |
| {{< ui >}}Team{{< /ui >}}         | Pour filtrer par équipe, sélectionnez le menu déroulant des équipes et saisissez les noms d'équipe pour filtrer. |
| {{< ui >}}Notebook Type{{< /ui >}}| Filtrer par investigation, post-mortem, runbook, rapport ou documentation.     |
| {{< ui >}}Modified Date{{< /ui >}}| Filtrer en fonction de la date de modification récente d'un notebook à l'aide du menu déroulant de date de modification. |

Il existe également des filtres rapides pour accéder à vos notebooks et aux notebooks marqués avec vos équipes.

### Reprendre {#jump-back-in}

Si aucun filtre n'est activé, la section Reprendre apparaît, affichant les notebooks les plus récents que vous avez consultés ou modifiés.

<!-- TODO Add updated image from new notebooks -->

### Trier les notebooks {#sorting-notebooks}

Vous pouvez trier les notebooks en sélectionnant les en-têtes ⭐, détails ou modifiés pour effectuer un tri selon ces valeurs.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/notebook/list
[2]: https://app.datadoghq.com/notebook/list?location=templates
[3]: /fr/dashboards/querying/#graphing-editor
[4]: https://www.markdownguide.org/basic-syntax/#images-1
[5]: /fr/dashboards/template_variables/
[6]: /fr/notebooks/guide/version_history
[7]: /fr/account_management/rbac/
[8]: /fr/incident_response/incident_management/post_incident/postmortems
[9]: /fr/dashboards/template_variables/#team-filter