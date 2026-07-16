---
aliases:
- /fr/developers/marketplace/
description: En savoir plus sur le Marketplace Datadog
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: Réseau de partenaires
  text: Réseau de partenaires Datadog
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Élargissez votre audience pour votre solution de surveillance avec le Marketplace
    Datadog
- link: /developers/integrations/
  tag: Documentation
  text: Créer une intégration
- link: /developers/integrations/agent_integration
  tag: Documentation
  text: Créer une intégration basée sur l'Agent
title: Créer une offre de marketplace
type: documentation
---
## Présentation

Le [Datadog Marketplace][2] est une place de marché numérique où les partenaires technologiques peuvent proposer des offres payantes aux utilisateurs de Datadog.

La page **Integrations** regroupe des intégrations gratuites développées par Datadog ou ses partenaires technologiques, tandis que la page **Marketplace** est une plateforme commerciale destinée aux clients Datadog et aux partenaires pour acheter et vendre différentes offres, notamment des intégrations via l'Agent ou via l'API, des licences logicielles ou encore des services professionnels.

{{< img src="developers/marketplace/marketplace_overview.png" alt="Page de la Marketplace Datadog" style="width:100%" >}}

## Publier une offre

Les types d'offres suivants sont pris en charge sur le Datadog Marketplace :

Intégrations
: Intégrations Marketplace qui soumettent des données tierces au compte Datadog d'un utilisateur (ou en extraient) via l'[Agent Datadog][19] ou l'[API Datadog][15]. Ces intégrations peuvent inclure divers types de données : métriques, événements, logs, traces, etc.

Licences logicielles
: Les licences logicielles vous permettent de proposer des solutions logicielles sur abonnement aux clients via le Datadog Marketplace.

Services professionnels
: Les services professionnels vous permettent de proposer des services d'implémentation, d'assistance ou de gestion par votre équipe pendant une période déterminée.

## Rejoindre le Datadog Marketplace

Les partenaires Marketplace bénéficient d'avantages exclusifs qui ne sont pas accessibles aux partenaires technologiques publiant des intégrations gratuites :

- **Collaboration commerciale** incluant un article de blog, une citation pour un communiqué de presse, une amplification sur les réseaux sociaux, ainsi qu'un accès à des ressources commerciales et marketing dédiées à l'accélération de la croissance des partenaires.
- **Formation et assistance** pour accompagner les équipes commerciales internes.
- **Opportunités exclusives de sponsoring** lors de conférences et événements (comme [Datadog DASH][20]) à tarif préférentiel.
- **Génération de nouveaux leads** via la visibilité offerte aux utilisateurs.

## Rejoindre le réseau de partenaires Datadog

Avant de publier une offre sur le Datadog Marketplace, vous devez d'abord postuler au programme **Technology Partner** du [réseau de partenaires Datadog][3]. Une fois votre candidature approuvée, vous pouvez commencer à développer votre offre.

## Demander un compte sandbox

Tous les partenaires technologiques peuvent demander un compte sandbox Datadog dédié pour faciliter leur développement.

Pour demander un compte sandbox, procédez comme suit :

1. Connectez-vous au [portail partenaire de Datadog][6].
2. Sur votre page d'accueil personnelle, cliquez sur le bouton *Learn More** sous **Sandbox Access**.
3. Sélectionnez **Request Sandbox Upgrade**.

<div class="alert alert-info">Si vous faites déjà partie d'une organisation Datadog (y compris d'une organisation d'essai), vous devrez peut-être vous connecter à votre nouveau compte sandbox. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentation dédiée à la gestion de compte</a>.</div>

La création d'un compte sandbox pour développeur peut prendre un à deux jours ouvrables. Une fois votre compte sandbox créé, vous pourrez [inviter des membres de votre organisation][7] afin qu'ils collaborent avec vous.

## Demander à accéder au Marketplace

Pour obtenir l'accès au référentiel privé du Marketplace, envoyez un e-mail à <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>. Une fois l'accès accordé, vous pourrez consulter un [exemple de pull request][12] annoté avec les bonnes pratiques.

## Coordonner les opportunités de mise sur le marché (GTM)

Une fois qu'un carré du Marketplace est publié, les partenaires technologiques ont la possibilité de rencontrer l'équipe marketing dédiée aux partenaires Datadog pour établir une stratégie de mise sur le marché conjointe, qui permet notamment de prévoir ce qui suit :

- L'ajout d'une citation de Datadog pour les communiqués de presse du partenaire
- La publication d'un article sur le [blog Monitor de Datadog][21]
- Le relais des publications sur les réseaux sociaux

## Prise en main

Pour débuter la création d'une intégration, consultez la section [Créer une intégration avec Datadog][13].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[5]: https://docs.datadoghq.com/fr/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /fr/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: https://docs.datadoghq.com/fr/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: /fr/developers/integrations/build_integration/
[15]: https://docs.datadoghq.com/fr/developers/integrations/api_integration
[19]: https://docs.datadoghq.com/fr/developers/integrations/agent_integration
[20]: https://www.dashcon.io/
[21]: https://www.datadoghq.com/blog/