---
further_reading:
- link: https://www.datadoghq.com/partner/
  tag: Réseau de partenaires
  text: Réseau de partenaires Datadog
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: GitHub
  text: Élargissez votre audience pour votre solution de surveillance avec le Marketplace
    Datadog
- link: /developers/marketplace/offering/
  tag: Documentation
  text: Comment développer une solution pour le Marketplace
- link: /developers/datadog_apps/
  tag: Documentation
  text: En savoir plus sur les Apps Datadog
title: Marketplace
type: documentation
---

## Présentation

Le Marketplace Datadog est une place de marché en ligne sur laquelle les partenaires technologiques de Datadog peuvent proposer des solutions pour les utilisateurs de la plateforme. Ces derniers peuvent ensuite accéder aux carrés des différentes intégrations via la [page **Integrations**][2] ou via la [page **Marketplace**][3].

{{< img src="developers/marketplace/marketplace_overview.png" alt="Page de la Marketplace Datadog" style="width:100%" >}}

La page **Integrations** inclut les intégrations et les Apps Datadog conçues par Datadog et par ses partenaires technologiques, qui sont proposées gratuitement aux clients. La page **Marketplace** est une plateforme commerciale dédiée aux clients et aux partenaires technologiques de Datadog leur permettant d'acheter et de vendre différentes solutions, notamment des intégrations basées sur l'Agent ou des API, des Apps Datadog, des logiciels et des services professionnels.

## Rejoindre le réseau de partenaires Datadog

Pour demander à accéder au Marketplace Datadog, vous devez d'abord rejoindre le parcours **Technology Partners** du [réseau de partenaires Datadog][3]. En tant que partenaire technologique de Datadog, vous pourrez développer une [intégration basée sur l'Agent ou des API][4] ou une [App Datadog][5], ou encore proposer une licence SaaS ou vos services professionnels.

## Demander l'ouverture d'un compte sandbox

Tous les partenaires technologiques peuvent demander un compte Datadog sandbox dédié pour faciliter leur processus de développement.

Pour demander un compte sandbox, procédez comme suit :

1. Connectez-vous au [portail partenaire de Datadog][6].
2. Sur votre page d'accueil personnelle, cliquez sur le bouton *Learn More** sous **Sandbox Access**.
3. Sélectionnez **Request Sandbox Upgrade**.

<div class="alert alert-info">Si vous faites déjà partie d'une organisation Datadog (y compris d'une organisation d'essai), vous devrez peut-être vous connecter à votre nouveau compte sandbox. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentation dédiée à la gestion de compte</a>.</div>

La création d'un compte sandbox pour développeur peut prendre un à deux jours ouvrables. Une fois votre compte sandbox créé, vous pourrez [inviter des membres de votre organisation][7] afin qu'ils collaborent avec vous.

## Explorer les ressources d'apprentissage

Après avoir rejoint le parcours Technology Partners et demandé un compte sandbox, vous pouvez commencer à vous renseigner sur le développement d'intégrations Datadog et de solutions supplémentaires. Pour ce faire :

* Suivez la formation à la demande [**Présentation des intégrations Datadog**][8] (en anglais), disponible dans le [centre d'apprentissage Datadog][9].
* Participez à nos heures de permanence dédiées au développement pour le Marketplace via le [canal Slack de Datadog][10].
* Si vous cherchez à concevoir un widget personnalisé permettant d'ajouter des données externes et des fonctionnalités à des dashboards Datadog, passez en revue la documentation sur les [Apps Datadog][5].
* Lisez la documentation dédiée à la configuration d'un [client OAuth 2.0][11] pour les intégrations basées sur l'Agent ou basées sur des API et les Apps Datadog.

## Proposer une solution sur le Marketplace

Tous les partenaires technologiques peuvent proposer une intégration gratuite sur la page **Integrations** ou une solution commerciale sur la page **Marketplace**. D'autres solutions peuvent être proposées sur le Marketplace Datadog, notamment :

Intégrations
: Les intégrations permettent d'envoyer ou de récupérer des données tierces via l'Agent Datadog ou une API.

Licences logicielles
: Les licences SaaS vous permettent de proposer des solutions logicielles sur abonnement aux clients via le Marketplace Datadog.

UI extensions ou applications
: Une application (telle qu'une [App Datadog][5]) proposée uniquement sous la forme d'un carré sur le Marketplace Datadog.

Services professionnels
: Les services professionnels vous permettent de proposer des services d'implémentation, d'assistance ou de gestion par votre équipe pendant une période déterminée.

### Demander à accéder au Marketplace

Pour demander à accéder au référentiel privé du Marketplace, envoyez un e-mail à l'adresse <a href="mailto:marketplace@datadoghq.com">marketplace@datadoghq.com</a>. Pour proposer une solution sur le Marketplace, vous aurez besoin de fournir certains fichiers ainsi que des informations telles que les offres tarifaires. Une fois votre accès accordé, vous pourrez passer en revue un [exemple de pull request][12] dans le référentiel du Marketplace avec des annotations et des bonnes pratiques à adopter.

Pour commencer à créer une solution destinée au Marketplace Datadog, consultez la section [Développer une solution pour le Marketplace][13].

## {{< partial name="whats-next/whats-next.html" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations
[2]: https://app.datadoghq.com/marketplace
[3]: https://partners.datadoghq.com/
[4]: /fr/developers/integrations/new_check_howto/
[5]: /fr/developers/datadog_apps
[6]: https://partners.datadoghq.com/English/
[7]: /fr/account_management/users/#add-new-members-and-manage-invites
[8]: https://learn.datadoghq.com/courses/intro-to-integrations
[9]: https://learn.datadoghq.com/
[10]: https://chat.datadoghq.com/
[11]: /fr/developers/authorization/
[12]: https://github.com/DataDog/marketplace/pull/107
[13]: /fr/developers/marketplace/offering