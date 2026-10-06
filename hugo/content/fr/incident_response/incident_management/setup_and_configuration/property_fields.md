---
aliases:
- /fr/service_management/incident_management/incident_settings/property_fields/
- /fr/incident_response/incident_management/incident_settings/property_fields
title: Champs de propriété
---
## Présentation {#overview}

Les champs de propriétés personnalisés vous permettent de capturer des attributs importants propres à votre organisation, tels que des modèles de produits spécifiques dans l'industrie automobile ou des codes uniques dans un déploiement logiciel. Ces attributs vous aident à catégoriser efficacement les incidents.

Vous pouvez utiliser des champs personnalisés pour filtrer des sous-ensembles spécifiques d'incidents sur la page [Incident Management][2] et dans [Incident Management Analytics][3]. Vous pouvez également créer des conditions autour des champs personnalisés dans les [règles de notification d'incident][9].

## Sections de champs {#field-sections}

Les champs de propriétés sont organisés en trois tableaux qui correspondent à l'endroit où les champs apparaissent dans l'[onglet Vue d'ensemble][1] de la page Détails de l'incident :

1. `What Happened`
2. `Why It Happened`
3. `Attributes`

Vous pouvez déplacer ou réorganiser les champs de propriétés en les faisant glisser à l'aide de l'icône de poignée de glissement.

## Champs par défaut {#default-fields}

Il existe cinq champs par défaut :

| Champs                   | Description |
| ----------------------   | ----------- |
|**Detection&nbsp;Method** | Ajoutez du contexte sur la façon dont cet incident a été déclaré.||
|**Summary**               | Fournissez des détails sur ce qui s'est passé pour causer cet incident.||
|**Root&nbsp;Cause**       | Listez les causes racines possibles ou les domaines à investiguer.||
|**Services**              | Si vous avez configuré [Datadog APM][4], le champ de propriété `Services` utilise automatiquement vos noms de service APM. |
|**Teams**                 | Le champ de propriété `Teams` se remplit automatiquement à partir des [équipes][5] définies dans votre organisation. |

**Remarque**: Vous ne pouvez pas supprimer les champs par défaut.

### Types de champ {#field-types}

Vous pouvez définir de nouveaux champs en utilisant l'un des types de champ suivants :

**Sélection unique**
: Une liste déroulante qui accepte une seule valeur. Vous définissez les valeurs disponibles lors de la définition du champ.

**Sélection multiple**
: Une liste déroulante qui accepte plusieurs valeurs. Vous définissez les valeurs disponibles lors de la définition du champ.

**Tableau de texte**
: Un champ libre qui accepte plusieurs valeurs. Les intervenants en cas d'incident définissent des valeurs arbitraires lors du paramétrage du champ sur un incident.

**Zone de texte**
: Une zone de texte libre qui accepte une seule valeur. Les intervenants en cas d'incident définissent des valeurs arbitraires lors du paramétrage du champ sur un incident.

**Tag de métrique**
: Une liste déroulante qui accepte plusieurs valeurs. Les intervenants en cas d'incident sont invités à sélectionner toutes les valeurs ingérées du tag de métrique que vous sélectionnez lors de la définition du champ.

**Nombre**
: Accepte tout nombre entier ou décimal.

**Date et heure**
: Accepte toute date et heure. Les valeurs sont stockées en UTC et sont analysées et formatées en utilisant le fuseau horaire local de l'utilisateur.

### Noms de champ {#field-names}

Le nom d'un champ est un identifiant en snake_case utilisé dans les [requêtes de recherche et d'analytique][12], les [automatisations de workflow][13] et les API. Son nom d'affichage est une étiquette conviviale qui détermine la façon dont le champ apparaît sur la [page de présentation d'un incident][1], dans la [chronologie d'un incident][10] et dans la [fenêtre modale de déclaration d'incident][11].

### Requis lors de la déclaration {#required-at-declaration}

Si vous marquez un champ comme « Requis lors de la déclaration », les utilisateurs doivent saisir une valeur lors de la déclaration des incidents. Cette option n'affecte pas les automatisations de workflow Datadog ni les requêtes API.

### Inviter l'utilisateur {#prompt-user}

Incident Management peut être configuré pour inviter les intervenants à définir des champs particuliers lors du changement d'état de l'incident.

**Lors de la déclaration** : Pour inviter les intervenants à saisir une valeur pour le champ lors de la déclaration, modifiez l'option « Inviter l'utilisateur » du champ.

**Lorsque l'incident passe à Stable/Résolu/Terminé** : Pour inviter les utilisateurs à renseigner un champ lorsqu'un incident passe à un statut donné, utilisez les [formulaires de transition][14].

### Champs personnalisés dans la recherche et l'analytique {#custom-fields-in-search-and-analytics}

Les champs Sélection unique, Sélection multiple, Tableau de texte, Nombre et Date/heure sont des facettes interrogeables sur la [page d'accueil des incidents][2] et dans [Incident Management Analytics][3].

Dans Incident Management Analytics, les champs numériques apparaissent comme des mesures pouvant être représentées graphiquement et visualisées dans les [Dashboards][7] et les [Notebooks][8].

[1]: /fr/incident_response/incident_management/investigate#overview-tab
[2]: https://app.datadoghq.com/incidents
[3]: /fr/incident_response/incident_management/analytics
[4]: /fr/tracing/
[5]: /fr/account_management/teams/
[6]: /fr/getting_started/tagging/using_tags/?tab=assignment#metrics
[7]: /fr/dashboards/
[8]: /fr/notebooks/
[9]: /fr/incident_response/incident_management/setup_and_configuration/notification_rules
[10]: /fr/incident_response/incident_management/investigate/timeline
[11]: /fr/incident_response/incident_management/investigate/declare
[12]: /fr/incident_response/incident_management/setup_and_configuration/property_fields/#custom-fields-in-search-and-analytics
[13]: /fr/actions/workflows/
[14]: /fr/incident_response/incident_management/setup_and_configuration/transition_forms