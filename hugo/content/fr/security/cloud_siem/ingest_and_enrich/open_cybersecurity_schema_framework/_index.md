---
aliases:
- /fr/security/cloud_siem/open_cybersecurity_schema_framework
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: Documentation
  text: Pipelines de traitement de logs
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: Blog
  text: Normalisez tous les logs pour Cloud SIEM avec le processeur OCSF de Datadog
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM : stimuler l''innovation dans les opérations de sécurité.'
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: Blog
  text: Normalisez vos données avec le modèle de données commun OCSF dans Datadog
    Cloud SIEM
- link: https://www.datadoghq.com/blog/cloud-siem-claude-compliance-api-integration/
  tag: Blog
  text: Surveillez l'activité de Claude Enterprise avec Datadog Cloud SIEM
title: Modèle de données commun Open Cybersecurity Schema Framework (OCSF) dans Datadog
---
## Vue d'ensemble {#overview}

Cloud SIEM collecte et analyse des données provenant d'un large éventail de sources telles que les services cloud, les pare-feu, les réseaux, les applications et les systèmes informatiques. Comme ces services émettent des données dans différents formats, ils nécessitent souvent des efforts considérables pour normaliser et préparer les logs avant de pouvoir réaliser une analyse significative des menaces.

L'Open Cybersecurity Schema Framework (OCSF) est une norme open source, indépendante du fournisseur, pour organiser et classer les données d'événements de sécurité. Il est conçu pour simplifier et unifier la manière dont les logs de sécurité sont structurés entre les plateformes et les produits, permettant une détection des menaces cohérente et une enquête plus rapide.

Chez Datadog, la prise en charge d'OCSF est intégrée directement dans Datadog Cloud SIEM afin que vous obteniez des données de log normalisées et standardisées sans configuration manuelle. Les logs de sécurité entrants sont automatiquement enrichis avec des attributs conformes à OCSF au moment de l'ingestion grâce à des pipelines prêts à l'emploi (OOTB). Toutes les valeurs OCSF sont contenues dans l'attribut `OCSF` et s'ajoutent aux autres processus qui transforment et enrichissent les logs. Consultez [les pipelines OCSF prêts à l'emploi](#supported-out-of-the-box-ocsf-pipelines) pour voir la liste des intégrations Log Management qui prennent en charge OCSF. 

L'intégration OCSF dans Cloud SIEM de Datadog permet :

* **Règles de détection simplifiées** : une structure d'attributs unifiée signifie que la logique de détection peut être écrite une fois et appliquée à plusieurs sources.
* **Enquêtes rationalisées** : les analystes n'ont plus besoin de mémoriser les formats spécifiques à chaque source, car un schéma unique permet d'effectuer un triage à l'aide d'une requête unique.
* **Corrélation inter-sources** : la logique de détection peut corréler des événements entre des services disparates (par exemple, le phishing et l'élévation de privilèges).
* **Maintenance évolutive de l'intégration** : OCSF permet d'avoir des attentes de schéma cohérentes, même lorsque de nouvelles sources de données sont ajoutées.

## Modèle OCSF {#ocsf-model}

Pour normaliser vos données de sécurité, OCSF remappe vos données en fonction des composants suivants :

1. [Types de données, attributs, objets et tableaux](#data-types-attributes-objects-and-arrays)
1. [Classes et catégories d'événements](#event-categories-and-classes)
1. [Profils](#profiles)
1. [Extensions](#extensions)

### Types de données, attributs, objets et tableaux {#data-types-attributes-objects-and-arrays}

Les types de données, les attributs, les objets et les tableaux sont les principaux composants du modèle OCSF.

| Nom | Description |
| ---- | ----------- |
| Types de données | Les types de données définissent les éléments de données en tant qu'entiers, chaînes, nombres à virgule flottante et valeurs booléennes.  |
| Attributs | Les attributs sont les éléments constitutifs du cadre. Ils sont utilisés pour fournir un langage commun pour vos données, quelle que soit la source. Consultez le [dictionnaire des attributs][1] pour obtenir une liste de tous les attributs.  |
| Objets | Les objets sont des collections d'attributs associés qui représentent les entités, telles qu'un processus, un appareil, un utilisateur, un logiciel malveillant ou un fichier.  |
| Tableaux | Les tableaux prennent en charge tous les types de données, y compris les types complexes.  |

### Catégories et classes d'événements {#event-categories-and-classes}

Les événements de sécurité au sein du modèle OCSF sont organisés en catégories, qui sont des regroupements de haut niveau classant les événements en fonction de leur type de données. Consultez les [catégories OCSF][2] pour plus d'informations et pour obtenir une liste des catégories disponibles. Les catégories sont ensuite divisées en classes d'événements. Par exemple, il existe [six classes][3] pour la catégorie Gestion des identités et des accès. Consultez les [classes d'événements OCSF][4] pour plus d'informations.

### Profils {#profiles}

Les profils sont une classe d'attributs que vous pouvez éventuellement superposer aux classes d'événements et aux objets qui y font référence. Il ajoute des informations supplémentaires à une classe d'événements existante et est indépendant des catégories d'événements. Consultez les [profils OCSF][5] pour obtenir une liste de profils et la [documentation sur les profils OCSF][6] pour plus d'informations.

### Extensions {#extensions}

Vous pouvez éventuellement ajouter des extensions, telles que de nouveaux attributs, objets, catégories, profils et classes d'événements, aux schémas OCSF. Consultez [Extensions OCSF][7] pour plus d'informations.

## Pipelines OCSF supportés et prêts à l'emploi{#supported-out-of-the-box-ocsf-pipelines}

Les intégrations Log Management suivantes prennent en charge les pipelines OCSF prêts à l'emploi:

{{% cloud-siem-supported-ocsf %}}

## Afficher les pipelines Security - OCSF {#view-security-pipelines-ocsf}

Cloud SIEM OCSF remappe les données de log dans les [pipelines d'intégration][8] de Log Management. Consultez [les pipelines OCSF prêts à l'emploi](#supported-out-of-the-box-ocsf-pipelines) pour plus de détails.

Pour afficher la bibliothèque de pipelines d'intégration pour une source :

1. Accédez à [Logs Pipelines][9].
1. Cliquez sur {{< ui >}}Browse Pipeline Library{{< /ui >}}.
1. Recherchez et cliquez sur l'intégration qui vous intéresse (par exemple, Okta).
1. Pour afficher les pipelines OCSF pour Okta, faites défiler jusqu'à la fin de la liste des processeurs pour l'intégration Okta.

Pour afficher le pipeline OCSF en lecture seule pour une intégration source :
1. Accédez à [Logs Pipelines][9].
1. Sélectionnez votre pipeline.
1. Faites défiler jusqu'aux pipelines OCSF à la fin des processeurs du pipeline.
1. Cliquez sur le pipeline OCSF pour afficher les processeurs de remappage associés.
1. Cliquez sur l'icône en forme d'œil sur le pipeline OCSF pour afficher des informations telles que les suivantes :
    - Version du schéma OCSF
    - Classe
    - Profil

**Remarque** : Le clonage du pipeline principal convertit les pipelines OCSF en pipelines de logs plutôt qu'en pipelines de Security.

## Afficher les données OCSF dans les logs {#view-ocsf-data-in-logs}

Pour afficher les données OCSF dans les logs :
1. Accédez à [Logs Explorer][10].
1. Saisissez une recherche pour vos logs.
1. Cliquez sur un log.
1. Dans le panneau latéral, faites défiler jusqu'aux attributs JSON `ocsf` pour voir les données OCSF.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/ocsf/ocsf-schema/blob/4a8ad2fa4a1908f1cad2cbf331a1b49efd5001c2/dictionary.json
[2]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#categories
[3]: https://schema.ocsf.io/1.4.0/categories/iam?extensions=
[4]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#event-classes
[5]: https://schema.ocsf.io/1.4.0/profiles
[6]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#profiles
[7]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#extensions
[8]: /fr/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://app.datadoghq.com/logs