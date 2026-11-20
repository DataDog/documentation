---
aliases:
- /fr/service_management/case_management/view_and_manage/
- /fr/incident_response/case_management/view_and_manage/
further_reading:
- link: incident_response/work_management/settings
  tag: Documentation
  text: Paramètres de gestion du travail
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: Blog
  text: Centralisation et remédiation des risques avec Datadog Case Management
- link: https://www.datadoghq.com/blog/work-management/
  tag: Blog
  text: Centralisez le travail humain et celui effectué par des agents avec Datadog
    Work Management
title: 'Afficher et gérer les éléments de travail :'
---
## Présentation {#overview}

Sur la [page de gestion du travail][1], les éléments de travail peuvent être triés par date de création, statut ou priorité. Par défaut, les éléments de travail sont triés par date de création. Basculez entre la vue **Liste** et la vue **Tableau**: La vue Liste fournit un tableau détaillé, et la vue Tableau propose un tableau Kanban avec une fonctionnalité de glisser-déposer.

Pour effectuer des modifications en masse sur des éléments de travail au sein d'un projet, utilisez les cases à cocher pour sélectionner un ou plusieurs éléments de travail. Ensuite, utilisez les menus déroulants pour effectuer des actions en masse, telles que la gestion du statut, l'assignation et l'archivage. Lorsque les éléments de travail sont déplacés vers un projet différent, un nouvel identifiant d'élément de travail leur est attribué. L'ancienne URL de l'élément de travail ne redirige pas vers le nouvel élément de travail.

## Raccourcis clavier {#keyboard-shortcuts}
Utilisez les raccourcis clavier suivants pour une navigation rapide :

| Action                   | Raccourci       |
| ------------------       | ----------     |
| Déplacer vers le haut                  | `↑` ou `K`     |
| Déplacer vers le bas                | `↓` ou `J`     |
| Sélectionner l'élément de travail         | `X`            |
| Afficher l'élément de travail sélectionné  | `Enter` ou `O` |
| Créer un élément de travail       | `C`            |
| Définir le statut               | `S`            |
| Assigner à l'utilisateur           | `A`            |
| Définir la priorité             | `P`            |
| Déplacer vers le projet          | `V`            |
| Archiver / désarchiver | `E`            |

## Rechercher des éléments de travail {#search-work-items}

Au sein d'un projet, vous pouvez rechercher des éléments de travail par :
- **paires clé-valeur d'attribut**: Par exemple, pour trouver tous les éléments de travail créés à partir de modèles de corrélation d'événements, recherchez `creation_source:Event Management`. Pour les éléments de travail créés à partir d'événements individuels, recherchez `creation_source:Event`.
- **titre**: Entourez votre terme de recherche de guillemets doubles. Par exemple, pour trouver tous vos éléments de travail contenant le terme « kubernetes pods » dans le titre, recherchez `"kubernetes pods."`

Pour composer une requête plus complexe, vous pouvez utiliser les opérateurs booléens suivants sensibles à la casse : `AND`, `OR` et `-` (exclusion). Par exemple, `priority:(P2 OR P3)` renvoie les éléments de travail de priorité `P2` ou `P3`.

De plus, vous pouvez rechercher des éléments de travail dans tous les projets à l'aide de la barre de recherche située dans le coin supérieur gauche.

## Créer une vue {#create-a-view}

Une **vue** est un filtre de requête enregistré qui vous permet de limiter une liste d'éléments de travail à ce qui est le plus pertinent pour vous. Les projets disposent de vues par défaut pour chacun des statuts :  ouverts, en cours, fermés et archivés. De plus, il existe des vues par défaut pour les éléments de travail qui vous sont assignés et ceux que vous avez créés.

Pour créer une vue personnalisée :
1. Sélectionnez **Ajouter une vue** au sein d'un projet.
1. Donnez un nom à la vue.
1. Dans la zone de recherche, saisissez une requête. L'aperçu s'actualise pour vous montrer les éléments de travail qui correspondent à la requête de recherche actuelle.
1. (Facultatif) Envoyez une notification avec des outils tiers tels que Slack, Microsoft Teams, PagerDuty ou des Webhooks. Cliquez sur **+ Ajouter un type de destinataire** et sélectionnez parmi les canaux ou destinataires préconfigurés. Consultez [Créer des notifications et des tickets ][2] pour en savoir plus sur les outils et options disponibles.
1. Cliquez sur **Enregistrer la vue**.

## Détails de l'élément de travail {#work-item-details}

La page Détails de l'élément de travail sert de source unique de vérité sur ce qui se passe avec l'enquête. Chaque élément de travail possède les propriétés suivantes :

Status
: Tous les éléments de travail sont ouverts par défaut lors de leur création. Au fur et à mesure que vous progressez dans l'élément de travail, vous pouvez le faire passer à en cours et fermé. Tapez `S` pour modifier le statut d'un élément de travail.

Priorité
: Par défaut, aucune priorité n'est définie. Vous pouvez définir la priorité de l'élément de travail sur P1 - Critique, P2 - Élevée, P3 - Moyenne, P4 - Faible, P5 - Info. Tapez `P` pour définir la priorité d'un élément de travail.

Assigné
: Non assigné par défaut. Pour l'assigner à un utilisateur, tapez `A`. Pour vous l'assigner, tapez `I`.

Attributes
: L'ajout d'attributs permet l'organisation et le filtrage. Par défaut, tous les éléments de travail possèdent les attributs suivants : équipe, centres de données, services, environnements et versions.

Archivage
: L'archivage d'un élément de travail le supprime des recherches. Tapez `E` pour archiver un élément de travail.

Chronologie de l'activité
: Chaque élément de travail crée automatiquement une chronologie de l'activité pour capturer les mises à jour en temps réel du statut, du responsable, de la priorité, des signaux et de tout commentaire ajouté. Si vous êtes mentionné dans un commentaire, vous recevez un e-mail. Tapez `M` pour ajouter un commentaire et `Cmd + Enter` pour le soumettre.

## Agir {#take-action}

Utilisez Work Management pour rassembler des informations, du contexte et des ressources afin de déterminer l'action appropriée à entreprendre. Cela inclut une enquête plus approfondie, une escalade vers un incident ou la clôture d'un élément de travail.

À partir d'un élément de travail individuel :
- [Créer un notebook d'investigation][3] : rassemblez des informations d'investigation et collaborez avec les membres de votre équipe.
- [Déclarer un incident][4] : faites passer un élément de travail au statut d'incident et lancez votre processus de réponse aux incidents.
- Créez manuellement un ticket Jira : utilisez `Shift + J` pour créer un ticket Jira. Pour plus d'informations sur la configuration de la création automatique de tickets Jira et de la synchronisation bidirectionnelle, consultez la documentation [Paramètres][5].
- Créez manuellement un incident ServiceNow : utilisez `Shift + N` pour créer un incident ServiceNow.
- Clôturez l'élément de travail : informez l'équipe qu'aucune autre action n'est nécessaire. Mettez à jour le statut de l'élément de travail sur « Fermé ».
- [Demander une approbation][7] : demandez la validation d'un ou plusieurs membres de l'équipe avant d'agir sur un élément de travail.

## Analyses de Work Management {#work-management-analytics}

Les analyses de Work Management constituent une source de données interrogeable pour les statistiques agrégées des éléments de travail. Vous pouvez interroger ces analyses dans divers widgets graphiques, à la fois dans les [Dashboards][8] et les [Notebooks][3], afin d'analyser la productivité de l'équipe et d'identifier des tendances dans les problèmes.

Les widgets suivants prennent en charge les analyses de Work Management : série temporelle, top list, valeur de requête, tableau, arborescence, graphique à secteurs, changement et liste.

## Export{#export}

Vous pouvez exporter des éléments de travail directement depuis une page de détails d'élément de travail :
1. Depuis un élément de travail individuel, cliquez sur l'icône **Plus d'options** en haut à droite d'une page de détails d'élément de travail.
1. Sélectionnez **Exporter au format PDF**.
1. Dans la boîte de dialogue d'impression qui s'affiche, choisissez **Enregistrer au format PDF** comme destination.
1. Cliquez sur **Enregistrer** pour terminer l'exportation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /fr/incident_response/work_management/notifications_integrations
[3]: /fr/notebooks/
[4]: /fr/incident_response/incident_management/#describing-the-incident
[5]: /fr/incident_response/work_management/settings/#jira
[7]: /fr/incident_response/work_management/approvals
[8]: https://docs.datadoghq.com/fr/dashboards/