---
description: L'Internal Developer Portal de Datadog unifie la télémétrie en direct,
  les métadonnées et les workflows en libre-service pour standardiser la livraison
  de logiciels et optimiser l'expérience développeur.
disable_toc: false
further_reading:
- link: getting_started/internal_developer_portal/
  tag: Documentation
  text: Démarrer avec l'Internal Developer Portal
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métriques de succès pour les équipes d'ingénierie de plateforme
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: Blog
  text: Transformez les retours en actions au sein de votre organisation d'ingénierie
    avec Datadog Forms
- link: https://www.datadoghq.com/blog/software-catalog
  tag: Blog
  text: Améliorez l'expérience développeur et la collaboration avec Catalog
- link: https://www.datadoghq.com/blog/service-scorecards
  tag: Blog
  text: Priorisez et promouvez les meilleures pratiques d'observabilité des services
    avec Service Scorecards
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions
  tag: Blog
  text: Donnez à vos équipes d'ingénierie les moyens d'agir avec Self-Service Actions
    dans Datadog Catalog
- link: https://www.datadoghq.com/blog/how-datadog-manages-internal-deployments/
  tag: Blog
  text: Comment l'équipe Infrastructure de Datadog gère les déploiements internes
    en utilisant Service Catalog et CI/CD Visibility
- link: https://www.datadoghq.com/blog/internal-developer-portal/
  tag: Blog
  text: Livrez des logiciels rapidement et en toute confiance avec l'IDP de Datadog
- link: https://www.datadoghq.com/blog/datadog-backstage-plugin/
  tag: Blog
  text: Synchronisez votre catalogue Backstage avec l'IDP de Datadog
- link: https://www.datadoghq.com/blog/idp-campaigns/
  tag: Blog
  text: Coordonnez les initiatives d'ingénierie à grande échelle avec IDP Campaigns
- link: https://app.datadoghq.com/idp/get-started
  tag: App
  text: Explorer l'IDP dans Datadog
title: Internal Developer Portal
---
{{< img src="tracing/internal_developer_portal/scrolling_the_catalog.mp4" alt="Une vidéo qui fait défiler la page du catalogue de l'Internal Developer Portal et clique sur un service pour afficher un graphe de dépendances avec les services parents et enfants représentés." video=true >}}

## Présentation {#overview}

La création d'un IDP est un élément essentiel des meilleures pratiques en matière d'[ingénierie de plateforme][7]. L'Internal Developer Portal (IDP) de Datadog est une solution entièrement gérée qui unifie la télémétrie en direct, les métadonnées et les workflows en libre-service pour standardiser et accélérer la livraison de logiciels et optimiser l'expérience développeur. 

- Propulsé par la télémétrie en direct, [Catalog][1] inventorie chaque service et environnement en temps réel et enrichit chaque entrée avec des métadonnées descriptives pour la propriété et le contexte opérationnel.
- [Self-Service Actions][2] et [Scorecards][3] traduisent les politiques de la plateforme en tâches en un clic, garantissant que chaque changement répond aux critères d'observabilité, de sécurité et de production. 
- Built-in [Engineering Reports][4] offrent aux ingénieurs de plateforme et aux responsables une visibilité en temps réel sur la qualité des logiciels, l'adoption des normes et l'expérience développeur, facilitant ainsi l'identification des lacunes et la prise de décisions fondées sur des données.

Si vous débutez avec l'IDP, commencez par le [guide de démarrage][5], qui présente la configuration et l'utilisation de base.

{{< callout url="https://www.datadoghq.com/product-preview/?product=internal-developer-portal-idp" header="Inscrivez-vous pour obtenir un accès anticipé à nos prochaines fonctionnalités !" >}}
{{< /callout >}}

## Cas d'utilisation courants {#common-use-cases}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dev_onboarding" >}}Accélérez l'intégration des développeurs{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/incident_response" >}}Améliorez la réponse aux incidents{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/dependency_management" >}}Gérez et mappez les dépendances{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/use_cases/production_readiness" >}}Évaluez la préparation à la production{{< /nextlink >}}
{{< /whatsnext >}}

## Fonctionnalités principales {#main-features}

{{< whatsnext desc=" " >}}
    {{< nextlink href="/internal_developer_portal/catalog" >}}Centralisez l'observabilité, la propriété et les connaissances techniques avec Catalog{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/scorecards" >}}Promouvez les meilleures pratiques d'ingénierie à grande échelle avec Scorecards{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/self_service_actions" >}}Accélérez les déploiements grâce à Self-Service Actions{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/eng_reports" >}}Suivez la fiabilité et la conformité aux Scorecards avec Engineering Reports{{< /nextlink >}}
    {{< nextlink href="/internal_developer_portal/external_provider_status" >}}Surveillez les dépendances externes avec External Provider Status{{< /nextlink >}}
{{< /whatsnext >}}

## Travailler avec des équipes {#working-with-teams}

Utilisez [Datadog Teams][6] pour activer les fonctionnalités basées sur les équipes dans l'IDP :

- Suivez vos équipes dans Datadog et synchronisez-les automatiquement avec vos sources de vérité externes 
- Assignez des équipes en tant que propriétaires de services et d'autres entités 
- Créez des [hiérarchies][8] pour établir des relations parent-enfant entre vos équipes
- Filtrez les vues par équipe dans l'ensemble de l'IDP (par exemple, dans Catalog, Scorecards et Engineering Reports) :

Si votre organisation gère la structure des équipes dans GitHub, utilisez GitHub Integration for Teams afin de synchroniser automatiquement les équipes GitHub avec Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/internal_developer_portal/catalog
[2]: /fr/internal_developer_portal/self_service_actions
[3]: /fr/internal_developer_portal/scorecards
[4]: /fr/internal_developer_portal/eng_reports
[5]: /fr/getting_started/internal_developer_portal/
[6]: /fr/account_management/teams/
[7]: https://www.datadoghq.com/knowledge-center/platform-engineering/
[8]: /fr/account_management/teams/manage/#team-hierarchies