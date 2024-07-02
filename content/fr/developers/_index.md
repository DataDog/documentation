---
aliases:
- /fr/developers/faq/how-to-monitor-logs-with-loggly-live-tail-and-datadog
cascade:
  algolia:
    rank: 70
description: Découvrez comment développer une intégration pour la plateforme Datadog.
further_reading:
- link: /api/latest/
  tag: Documentation
  text: En savoir plus sur l'API Datadog
- link: https://datadoghq.dev/integrations-core/guidelines/dashboards/#best-practices
  tag: Meilleures pratiques
  text: Créer des dashboards d'intégration efficaces
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: Blog
  text: DRUIDS, le système de design qui propulse Datadog
- link: https://www.datadoghq.com/blog/introducing-open-source-hub/
  tag: Blog
  text: Présentation du portail Open Source Datadog
title: Développeurs
---

## Présentation

La section Développeurs contient des références sur le développement pour Datadog. Il peut être intéressant de développer une solution pour Datadog si vous souhaitez visualiser des données jusque là indisponibles dans Datadog. Dans ce cas, il est possible que Datadog prenne d'ores et déjà en charge la technologie dont vous avez besoin. Consultez le tableau des [technologies fréquemment demandées](#technologies-frequemment-demandees) pour trouver un produit ou une intégration susceptible de répondre à vos besoins.

## Technologies fréquemment demandées

Si vous souhaitez surveiller des données avec Datadog alors qu'elles ne sont actuellement pas prises en charge, avant de développer quoi que ce soit, passez en revue les solutions et intégrations Datadog suivantes :

{{< partial name="requests.html" links="requests" >}}

Si la solution dont vous avez besoin n'est pas du tout disponible, vous pouvez contacter l'[assistance Datadog][1] pour demander l'ajout d'une fonctionnalité. Il est également possible de [créer votre propre solution](#creer-votre-propre-solution) à l'aide des références de cette page.

### Partenaires et Marketplace Datadog

Nos partenaires ont également la possibilité de contribuer à la plateforme Datadog en proposant leur solution sur le [Marketplace Datadog][10] ou en développant une [intégration][6] communautaire.

{{< whatsnext desc="Pour vous aider à concevoir une solution ou une intégration, consultez les ressources suivantes :" >}}
    {{< nextlink href="/developers/integrations/agent_integration" >}}Créer une intégration pour l'Agent{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/api_integration" >}}Créer une intégration basée sur une API{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/log_integration" >}}Créer une intégration basée sur des logs{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/marketplace_offering" >}}Créer une solution pour le Marketplace{{< /nextlink >}}
{{< /whatsnext >}}

Pour découvrir comment devenir partenaire Datadog, rendez-vous sur le site dédié au [réseau de partenaires Datadog][2].

## Créer votre propre solution

Vous n'avez pas trouvé d'alternative pour surveiller le type de données souhaité ? Vous disposez de plusieurs options pour envoyer des données non prises en charge à Datadog.

- [**DogStatsD**][3] est un service d'agrégation de métriques qui prend en charge les métriques custom, les événements et les checks de service.

- Les [**checks custom**][4] vous permettent de recueillir des métriques à partir d'applications ou de systèmes personnalisés. Les [checks custom d'Agent][4] peuvent être utilisés dans de nombreux scénarios. Pour répondre à des besoins plus avancés (par exemple, pour le pré-traitement des métriques), il peut être plus pertinent d'écrire un check [OpenMetrics][5].

- Les [**intégrations**][6] vous permettent également de recueillir des métriques, des événements et des checks de service à partir d'applications ou de systèmes personnalisés. Elles sont réutilisables. Vous pouvez développer une intégration que vous seul pourrez utiliser, ou écrire une intégration publique incluse dans le [référentiel d'intégrations de la communauté][7] Datadog, afin que d'autres développeurs puissent en tirer profit.


### Comparaison entre les checks custom et les intégrations

Ce qui différencie avant tout les checks custom des intégrations, c'est que les intégrations sont des composants réutilisables qui peuvent intégrer l'écosystème Datadog. Leur développement est généralement plus difficile et nécessite plus de temps. Elles sont particulièrement utiles pour des outils généraux (frameworks d'application, projets open source ou logiciels couramment utilisés). Si vous souhaitez répondre à des besoins plus spécifiques, par exemple surveiller des services peu utilisés en dehors de votre équipe ou de votre organisation, Datadog vous recommande d'écrire un check custom.

Il peut toutefois être plus pertinent de concevoir une intégration qu'un check custom si votre scénario implique la publication et le déploiement de votre solution en tant que wheel Python (`.whl`). Les métriques générées par les checks custom sont considérées comme des métriques custom : leur coût est donc calculé en fonction de votre offre d'abonnement. À l'inverse, dès lors qu'une intégration rejoint l'écosystème Datadog, ses métriques ne sont plus considérées comme des métriques custom, et ne sont donc pas comptabilisées dans votre total de métriques custom. Pour en savoir plus sur l'impact de cette particularité sur vos coûts, consultez les [tarifs Datadog][8].

### Comment créer une intégration ?

Il est plus difficile de concevoir une intégration publique (à savoir, une intégration incluse dans l'écosystème Datadog, pouvant être installée avec la commande `datadog-agent integration` et faisant partie du référentiel [integrations-extras][7] ou [integrations-core][9] de Datadog) qu'une intégration privée. En effet, les intégrations publiques doivent réussir toutes les étapes `ddev validate`, proposer des tests utilisables et faire l'objet d'un examen de leur code. En tant qu'auteur du code, vous devez vous occuper activement de l'intégration et êtes responsable de son bon fonctionnement.

L'objectif initial est de générer du code permettant de recueillir les métriques souhaitées de façon fiable et de s'assurer que le framework d'intégration général fonctionne correctement. Commencez par développer la fonction de base en tant que check custom, puis ajoutez les détails du framework en suivant les instructions de la section [Créer une intégration pour l'Agent][13].

Ensuite, ouvrez une pull request sur le [référentiel `integrations-extras`][7]. Cela indique à Datadog que vous êtes prêt à commencer à réviser le code ensemble. Ne vous inquiétez pas si vous avez des questions à propos des tests, des procédures internes de Datadog ou d'autres sujets : l'équipe Écosystème est là pour vous aider, et les pull requests constituent le moyen idéal d'aborder ces questions.

Une fois que les fonctionnalités, la conformité du framework et la qualité générale du code de votre intégration ont été validées, cette dernière est ajoutée au référentiel `integrations-extras`. Elle fait alors officiellement partie de l'écosystème Datadog.

Pour bien choisir l'approche à adopter pour envoyer des données non prises en charge à Datadog, il convient avant tout de tenir compte de la difficulté (durée du développement) et du budget associé (coût des métriques custom). Si vous essayez de visualiser des données que Datadog ne prend pas en charge, commencez par opter pour la méthode qui vous paraît la plus logique :

| Type                | Difficulté | Custom Metrics | Langage |
|---------------------|--------|----------------|----------|
| DogStatsD           | Minimale | Oui            | Tous      |
| Check custom        | Faible    | Oui            | Python   |
| Intégration privée | Medium | Oui            | Python   |
| Intégration publique  | High   | Non             | Python   |

### Pourquoi créer une intégration ?

Les [checks custom][1] conviennent pour des transmissions occasionnelles, ou si la source de données est unique ou très limitée. Pour des cas d'utilisation plus généraux, comme des frameworks d'application, des projets open source ou un logiciel couramment utilisé, il est conseillé d'écrire une intégration.

Les métriques transmises à partir d'intégrations acceptées ne sont pas considérées comme des métriques custom et n'ont par conséquent aucune incidence sur votre quota autorisé. (Les intégrations qui transmettent des métriques potentiellement illimitées sont toutefois susceptibles d'être considérées comme custom.) En proposant une prise en charge native de Datadog aux utilisateurs, ceux-ci seront plus enclins à adopter votre produit, service ou projet. En outre, le fait de figurer dans l'écosystème Datadog vous garantira également une plus grande visibilité.

### Quelle est la différence entre les checks custom et les checks de service ?

Les [checks custom][11], ou checks custom d'Agent, vous permettent d'envoyer des données sur un service interne à Datadog. Les [check de service][12] sont bien plus simples : ils surveillent le statut de disponibilité d'un service spécifique. Bien que ces deux outils soient des checks, leur fonctionnement diffère. Ils peuvent être utilisés de façon distincte ou conjointe en fonction de vos besoins en matière de surveillance. Pour en savoir plus sur ces ressources, consultez les sections [Checks custom][11] et [Check de service][12].

### Envoyer des métriques en fonction du type d'intégration

{{< whatsnext desc="Découvrez comment envoyer vos propres métriques à Datadog :" >}}
    {{< nextlink href="/developers/dogstatsd" >}}<u>DogStatsD</u> : parcourez la présentation des fonctionnalités de DogStatsD, y compris sa configuration, le format des datagrammes et l'envoi de données.{{< /nextlink >}}
    {{< nextlink href="/developers/write_agent_check" >}}<u>Check custom d'Agent</u> : découvrez comment transmettre des métriques, des événements et des checks de service à l'aide de votre propre check custom.{{< /nextlink >}}
    {{< nextlink href="/developers/prometheus" >}}<u>Check OpenMetrics personnalisé</u> : apprenez à transmettre votre propre check OpenMetrics avec un check custom d'Agent.{{< /nextlink >}}
    {{< nextlink href="/developers/integrations/" >}}<u>Intégrations</u> : pour gérer des tâches plus complexes, créez une intégration Datadog privée ou publique (qui peut être partagée avec la communauté).{{< /nextlink >}}
{{< /whatsnext >}}

### Envoyer des données en fonction de leur type

{{< whatsnext desc="Familiarisez-vous avec les différents types de données que vous pouvez envoyer à Datadog et avec leur méthode d'envoi :" >}}
    {{< nextlink href="/metrics" >}}<u>Métriques custom</u> : plongez au cœur des métriques custom de Datadog et découvrez les différents types de métriques, ce qu'ils représentent, comment les envoyer et leur rôle au sein de l'écosystème Datadog.{{< /nextlink >}}
    {{< nextlink href="service_management/events/guides/" >}}<u>Événements</u> : découvrez comment envoyer des événements à Datadog avec des checks custom d'Agent, DogStatsD ou l'API Datadog.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks" >}}<u>Checks de service</u> : apprenez à envoyer le statut de disponibilité d'un service spécifique à Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Échanger avec la communauté des développeurs

{{< whatsnext desc="Découvrez comment collaborer avec la communauté de développeurs Datadog :" >}}
    {{< nextlink href="/developers/libraries" >}}<u>Bibliothèques</u> : parcourez la liste des bibliothèques client officielles et de la communauté pour l'API Datadog, le client DogStatsD, l'APM et le profileur en continu, ainsi que les intégrations de la communauté reposant sur des ressources extérieures, pour un large choix de plateformes.{{< /nextlink >}}
    {{< nextlink href="/developers/guide/" >}}<u>Guides</u> : consultez des articles d'aide supplémentaires sur des particularités techniques, des exemples de code et la documentation de référence.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: https://www.datadoghq.com/partner/
[3]: /fr/developers/dogstatsd/
[4]: /fr/developers/custom_checks/write_agent_check/
[5]: /fr/developers/custom_checks/prometheus/
[6]: /fr/developers/integrations/
[7]: https://github.com/DataDog/integrations-extras
[8]: https://www.datadoghq.com/pricing/
[9]: https://github.com/DataDog/integrations-core
[10]: /fr/developers/integrations/marketplace_offering
[11]: /fr/developers/custom_checks/
[12]: /fr/developers/service_checks/
[13]: /fr/developers/integrations/agent_integration