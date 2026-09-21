---
description: Coordonnez les initiatives d'ingénierie limitées dans le temps en regroupant
  les règles de Scorecard sous un objectif commun et en suivant leur adoption par
  les entités et les équipes.
further_reading:
- link: /internal_developer_portal/scorecards/
  tag: Documentation
  text: Documentation sur les Scorecards
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: Blog
  text: Coordonnez les initiatives d'ingénierie à grande échelle avec les campagnes
    IDP
site_support_id: idp
title: Campagnes
---
{{< img src="/tracing/software_catalog/campaign-manage.png" alt="Liste des campagnes dans Internal Developer Portal" style="width:90%;" >}}

## Présentation {#overview}

Les campagnes vous permettent de coordonner des initiatives d'ingénierie à court terme en regroupant les règles [Scorecard][1] sous un objectif commun et en suivant leur adoption par les entités et les équipes. 

Alors que les Scorecards définissent des bonnes pratiques à long terme, les campagnes vous aident à concentrer vos efforts sur des initiatives limitées dans le temps, telles que les runtime migrations, les remédiations de sécurité ou l'optimisation des coûts. Vous pouvez définir une échéance, sélectionner les règles à suivre et surveiller l'achèvement par les équipes.

Utilisez l'[**Campaigns** onglet sur la page Scorecards][2] pour : 
- Afficher les campagnes actives et passées
- Suivre la progression par règle, équipe ou statut
- Assurer le suivi auprès des équipes directement depuis l'interface 

Si votre service fait partie d'une campagne, les règles et échéances associées apparaissent dans l'onglet **Scorecards** de l'entité dans le Catalogue, ainsi que sur la page de l'entité dans la section **Scorecards**. Cette visibilité permet aux équipes d'agir sur les objectifs de la campagne sans dépendre de rappels manuels ou de documentation externe.

## Création d'une campagne {#creating-a-campaign}

Créez et gérez des campagnes depuis l'onglet [**Campaigns** dans Scorecards][2]. 

**Remarque :** La création d'une campagne nécessite les autorisations Service Catalog Write et Work Management Write. 

{{< img src="/tracing/software_catalog/campaign-creation.png" alt="Page de création de campagne avec les champs remplis" style="width:90%;" >}}

### 1. Définir les métadonnées de la campagne {#1-define-campaign-metadata}

Fournissez les informations suivantes :
- **Nom** : un titre court et descriptif (par exemple, « Migrer vers GitHub Actions »)
- **Clé** : un identifiant unique pour la campagne (généré automatiquement par défaut)
- **Description** : un court résumé de l'objectif de la campagne
- **Propriétaire** : l'équipe responsable de la conduite de la campagne
- **Date de début et de fin** : le calendrier de la campagne (la date de fin est facultative)
- **Périmètre** : entités auxquelles la campagne s'applique (par exemple, `kind:service AND tier:1`)

### 2. Sélectionner les règles de Scorecard {#2-select-scorecard-rules}

Ajoutez une ou plusieurs [règles Scorecard existantes][3] qui correspondent à l'objectif de votre campagne.

### 3. Définir les recommandations {#3-define-guidance}

Pour chaque règle, incluez éventuellement : 
- Documentation associée
- Workflows via [Workflow Automation][4] pour remédier automatiquement aux règles en échec
- Étapes que les équipes doivent suivre pour respecter la conformité

## Suivi de la progression de la campagne {#tracking-campaign-progress}

Après avoir créé une campagne, utilisez la page de la campagne pour surveiller l'adoption et effectuer un suivi si nécessaire.

{{< img src="/tracing/software_catalog/campaign-details.png" alt="Page de campagne mettant en évidence les détails, la progression et les prochaines étapes de la campagne" style="width:90%;" >}}

Depuis la page de la campagne, vous pouvez : 
- Voir l'achèvement et la progression globaux par équipe ou par règle
- Filtrer pour trouver les entités, les équipes ou les règles qui sont toujours en échec
- Comparer les taux d'adoption entre les équipes
- Visualiser les tendances de progression au fil du temps
- Envoyer des mises à jour ou créer des tickets de suivi directement depuis la page

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/internal_developer_portal/scorecards/
[2]: https://app.datadoghq.com/software/scorecards?activeTab=campaigns
[3]: /fr/internal_developer_portal/scorecards/custom_rules#create-custom-rules
[4]: /fr/actions/workflows/