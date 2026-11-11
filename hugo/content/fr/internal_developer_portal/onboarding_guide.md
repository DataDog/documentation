---
description: Un guide de mise en œuvre progressive pour les responsables de plateforme
  et d'ingénierie qui configurent l'Internal Developer Portal de Datadog, de la planification
  et des sources de données aux parcours dorés.
further_reading:
- link: https://app.datadoghq.com/idp/get-started
  tag: App
  text: Explorer l'IDP dans Datadog
- link: /getting_started/internal_developer_portal/
  tag: Documentation
  text: Prise en main de l'Internal Developer Portal
- link: /internal_developer_portal/software_catalog/
  tag: Documentation
  text: Catalog
- link: /internal_developer_portal/scorecards/
  tag: Documentation
  text: Scorecards
- link: /internal_developer_portal/self_service_actions/
  tag: Documentation
  text: Actions en libre-service
- link: /internal_developer_portal/eng_reports/
  tag: Documentation
  text: Rapports d'ingénierie
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: Blog
  text: Maintenez la propriété des services à jour grâce à l'intégration GitHub de
    Datadog Teams.
site_support_id: idp
title: Intégration à l'Internal Developer Portal
---
## Présentation {#overview}

Ce guide d'intégration accompagne les responsables de plateforme et d'ingénierie à travers les phases de mise en œuvre de l'Internal Developer Portal (IDP) de Datadog.  

Recommandations :
- Intégrez d'abord une ou deux équipes et utilisez leurs retours pour affiner les normes.  
- Itérez régulièrement : traitez votre Internal Developer Portal comme un produit.  
- Connectez les normes de l'IDP à d'autres initiatives, telles que les SLO, les pipelines CI/CD et les workflows d'incident.  

## Phase 1 : Planifiez votre mise en œuvre {#phase-1-plan-your-implementation}

1. **Examinez les concepts clés** : découvrez le [Entity model][2], les [Scorecards][3] et les [Self-service Actions][4].  
1. **Intégrez la structure de votre organisation** : configurez [Teams][5] et reflétez votre hiérarchie dans Datadog.  
1. **Définissez votre ontologie** : faites correspondre vos systèmes existants à l'[Entity model][2] afin que votre structure s'aligne sur le schéma de Datadog. Décidez quels [types d'entités][6] et quelles validations vous souhaitez appliquer.

## Phase 2 : Familiarisez-vous avec les outils {#phase-2-familiarize-yourself-with-tooling}

1. **Identifiez les sources de données** : découvrez les trois façons d'intégrer des entités et décidez de ce que vous utiliserez comme sources de vérité pour votre [Catalog][7] :

   - **[Découvrez automatiquement les entrées depuis les produits Datadog][23]**, tels qu'APM, RUM ou USM. Vous pouvez également importer depuis Infrastructure ou Log Management.
   - **Importez depuis des systèmes externes** tels que [Backstage][14] ou [ServiceNow][15].  
   - **[Créez des entrées directement][24]** via l'interface utilisateur de Datadog, ou par programmation en important depuis GitHub, GitLab, Terraform, le fournisseur de métadonnées logicielles Datadog ou l'API de définition de service.

  **Remarque** : Si vous utilisez APM, privilégiez le [Unified Service Tagging][25] et les [Inferred Services][26] comme points d'entrée, plutôt que de vous appuyer sur des remplacements de service.

1. **Créez des conseils d'intégration internes** : Documentez les normes de tagging, des exemples de fichiers `entity.definition.yaml` et les attentes vis-à-vis des équipes d'application.  
1. **Explorez l'automatisation** : Utilisez l'[API][8] ou le fournisseur Terraform pour gérer les entités, les Scorecards et les workflows de manière programmatique.

## Phase 3 : Intégrer les sources de données {#phase-3-integrate-data-sources}

1. **Adoptez une gestion de type GitOps** : [Connectez GitHub ou GitLab][13] pour gérer votre catalogue. [Importez les manifestes Backstage existants][14] s'ils sont disponibles.
1. **[Importez depuis ServiceNow][15]** : Synchronisez les CI de votre CMDB ServiceNow dans l'IDP.  
1. **Connectez les outils d'astreinte et d'incident** : Configurez [Jira][9], [PagerDuty][10] ou [d'autres intégrations][16].

## Phase 4 : Personnaliser et étendre le schéma {#phase-4-customize-and-extend-schema}

1. **Établissez des normes de définition d'entité** : Décidez de la manière dont vous représentez la criticité, le cycle de vie et les environnements. Consultez le [Entity Model][6] pour les schémas de définition. 
1. **Définissez les attentes en matière de métadonnées** : Décidez s'il convient d'inclure des [custom tags and extensions][18]. Déterminez comment définir les relations entre les composants et comment auditer les relations détectées automatiquement.
1. **Maintenez des conseils internes** : Conservez la documentation destinée aux développeurs, telle que les normes d'instrumentation et de tagging, ainsi que des exemples de manifestes de définition d'entité.

## Phase 5 : Établir et communiquer les normes {#phase-5-establish-and-communicate-standards}

1. **Examinez les Scorecards recommandées** : Commencez par les [Datadog's out-of-the-box rules][3]. Sélectionnez celles qui sont pertinentes pour votre organisation.
1. **Ajoutez des règles spécifiques à l'organisation** : [Étendez les Scorecards][19] avec des contrôles de sécurité personnalisés, des exigences de fréquence de déploiement ou des normes de tagging.  
1. **Définissez les niveaux de criticité** : [regroupez les règles par niveaux][20] pour signaler leur importance.

## Phase 6 : Mettre en place des parcours dorés {#phase-6-set-up-golden-paths}

1. **Examinez des exemples de blueprints** : Explorez [Self-service blueprints][11], qui présentent des exemples de parcours pour le provisionnement et la gestion de l'infrastructure, la création de structures de projet, et plus encore. Faites des essais en modifiant les blueprints pour les adapter à la pile technologique de votre organisation.
1. **Explorez l'[Action Catalog]** : Consultez les intégrations prises en charge ou étendez-les avec des [requêtes HTTP et Private Actions][4].  
1. **Publiez votre premier workflow** : Créez un parcours doré et itérez en fonction des retours des développeurs.

## Phase 7 : Explorez les rapports d'ingénierie {#phase-7-explore-engineering-reports}

1. **Suivez les progrès** : Utilisez les [Engineering Reports][12] intégrés pour surveiller la préparation à la production, la fiabilité et l'adoption des meilleures pratiques.  
1. **Mesurez l'engagement** : Surveillez l'engagement des développeurs grâce au dashboard d'analyse d'utilisation intégré.
 
## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /fr/internal_developer_portal/catalog/entity_model/native_entities/
[3]: /fr/internal_developer_portal/scorecards/
[4]: /fr/internal_developer_portal/self_service_actions/
[5]: /fr/internal_developer_portal/catalog/set_up/ownership
[6]: /fr/internal_developer_portal/catalog/entity_model/
[7]: /fr/internal_developer_portal/catalog/
[8]: /fr/api/latest/software-catalog/
[9]: /fr/integrations/jira/
[10]: /fr/integrations/pagerduty/
[11]: https://app.datadoghq.com/software/self-service-actions
[12]: /fr/internal_developer_portal/eng_reports/
[13]: /fr/internal_developer_portal/catalog/set_up/create_entities/#github-and-gitlab-integrations
[14]: /fr/internal_developer_portal/catalog/set_up/import_entities#entities-from-backstage
[15]: /fr/internal_developer_portal/catalog/set_up/import_entities#import-from-servicenow
[16]: /fr/internal_developer_portal/integrations
[18]: /fr/internal_developer_portal/catalog/entity_model?tab=v30#build-custom-extensions
[19]: /fr/internal_developer_portal/scorecards/custom_rules
[20]: /fr/internal_developer_portal/scorecards/scorecard_configuration#group-rules-into-levels
[23]: /fr/internal_developer_portal/catalog/set_up/discover_entities
[24]: /fr/internal_developer_portal/catalog/set_up/create_entities
[25]: /fr/getting_started/tagging/unified_service_tagging
[26]: /fr/tracing/services/inferred_services