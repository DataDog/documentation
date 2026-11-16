---
aliases:
- /fr/service_management/case_management/customization/
- /fr/incident_response/case_management/customization/
description: Personnalisez la gestion du travail Datadog avec des types de travail,
  des attributs et des statuts personnalisés.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-risk-management
  tag: Blog
  text: Centralisation et remédiation des risques avec Datadog Case Management
- link: /incident_response/work_management/
  tag: Documentation
  text: Présentation de la gestion du travail
- link: /incident_response/work_management/create_work_item
  tag: Documentation
  text: Créer un élément de travail
- link: /incident_response/work_management/settings
  tag: Documentation
  text: Settings
title: Personnalisation
---
## Présentation {#overview}

La gestion du travail Datadog permet une personnalisation pour s'aligner sur les workflows uniques, les besoins de saisie de données et les exigences en matière de rapports de votre équipe.

## Types de travail personnalisés {#custom-work-types}

<div class="alert alert-danger">
  Vous devez disposer des autorisations Case Shared Settings Write (<code>cases_shared_settings_write</code>). autorisations. Pour plus d'informations, consultez
  <a href="https://docs.datadoghq.com/account_management/rbac/permissions/#case_management">Autorisations de rôle Datadog</a>.
</div>

Datadog fournit cinq [types de travail intégrés][1], chacun conçu pour des workflows courants. Pour personnaliser la gestion du travail selon les besoins de votre équipe, vous pouvez définir vos propres types de travail personnalisés. Cela vous permet de :

* Limitez la capture de données personnalisées aux types de travail pertinents
* Activez une automatisation ciblée
* Effectuez des analyses et des rapports plus granulaires

### Créer un type de travail personnalisé {#create-a-custom-work-type}

1. Accédez à [**Settings > Shared Settings > Work Types**][2].
2. Cliquez sur **+ Create Work Type**.
3. Indiquez un **Nom** et une **Description** facultative.
4. Enregistrez votre nouveau type de travail.
5. (Facultatif) Consultez la [section des attributs personnalisés](#custom-attributes) de cette page pour ajouter des attributs personnalisés.

### Activer un type de travail personnalisé {#enable-a-custom-work-type}

Une fois que vous avez créé un type de travail personnalisé, vous devez l'attribuer explicitement à chaque projet où il doit être disponible. Suivez les étapes ci-dessous pour activer votre nouveau type de travail au sein d'un projet Work Management spécifique.

1. De retour sur la page [**Settings**][2], localisez le projet cible sous **Starred Projects** ou **Other Projects**.
2. Développez le menu du projet en cliquant sur le nom du projet.
3. Cliquez sur **General** pour ouvrir le panneau des paramètres du projet.
4. Faites défiler jusqu'à la section **Work Types** dans le panneau des paramètres.
5. Sous **From your organization**, ouvrez le menu déroulant et sélectionnez le type de travail personnalisé que vous avez créé.

Une fois que vous avez ajouté le type de travail, il est disponible en tant qu'option lorsque vous créez un nouvel élément de travail au sein de ce projet.

Votre nouveau type de travail est disponible pour :

* Création manuelle d'éléments de travail
* Création basée sur l'API
* Création automatisée d'éléments de travail via des Workflows

## Attributs personnalisés {#custom-attributes}

Les attributs personnalisés vous permettent de capturer les données structurées dont votre équipe a besoin pour travailler efficacement et rendre compte efficacement. Tous les types de travail, qu'ils soient fournis par Datadog ou personnalisés, incluent cinq attributs réservés qui ne peuvent être ni supprimés ni modifiés :

* Teams
* Services
* Environments
* Datacenters
* Versions

Vous pouvez ajouter des attributs qui reflètent les besoins spécifiques de votre équipe, tels que les niveaux d'escalade, les responsables de composants, l'impact sur l'activité ou des liens externes. Pour ajouter un attribut personnalisé :

1. Accédez à [**Settings > Shared Settings > Work Types**][2].
2. Cliquez sur le type de travail souhaité.
3. Cliquez sur **+ Add Attribute**.
4. Indiquez :
   * Nom d'affichage (tel que « Région »)
   * Clé (utilisée pour l'accès programmatique et le reporting)
   * Description (contexte facultatif pour votre équipe)
   * Type de données, choisissez parmi :
     * Texte
     * URL
     * Nombre
   * Choisissez si vous souhaitez autoriser plusieurs valeurs pour cet attribut.

## Statuts personnalisés {#custom-statuses}

Work Management prend en charge des statuts d'élément de travail personnalisables. Par défaut, les éléments de travail passent par Ouvert, En cours et Fermé. Vous pouvez ajouter des statuts supplémentaires pour représenter les révisions, les transferts ou d'autres étapes de workflow. Les statuts personnalisés vous permettent de standardiser les workflows des éléments de travail et d'aligner les options de statut sur les processus de votre équipe pour prendre en charge le reporting et l'automatisation.

### Comprendre le comportement des statuts personnalisés {#understanding-custom-statuses-behavior}
* Chaque groupe de statut (Ouvert, En cours, Fermé) doit contenir au moins un statut.
* Vous pouvez supprimer un statut existant, mais vous devez d'abord migrer tous les éléments de travail utilisant actuellement ce statut vers un autre statut du même groupe.
* Les statuts personnalisés se comportent exactement de la même manière que les statuts intégrés de Datadog.

### Créer un statut personnalisé {#create-a-custom-status}

1. Accédez à [**Settings > Shared Settings > Work Types**][2].
2. Sélectionnez le type de travail que vous souhaitez mettre à jour.
3. Faites défiler jusqu'à la section **Statuses**.
4. Ajoutez un nouveau statut sous l'un des trois groupes de statut existants : **Ouvert, En cours,** ou **Fermé**.
5. (Facultatif) Définissez un nouveau **statut par défaut** pour chaque groupe de statut. Les statuts par défaut sont utilisés dans les automatisations comme les statuts préférés pour le groupe lorsque les noms de statut exacts ne sont pas fournis.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/incident_response/work_management/create_work_item#work-types
[2]: https://app.datadoghq.com/work/settings?type=shared