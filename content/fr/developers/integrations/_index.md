---
aliases:
- /fr/guides/agent_checks/
- /fr/agent/agent_checks
- /fr/developers/agent_checks/
description: Découvrez comment développer et publier une solution sur la page Integrations.
further_reading:
- link: /developers/integrations/agent_integration/
  tag: Documentation
  text: Créer une intégration pour l'Agent
- link: /developers/integrations/api_integration/
  tag: Documentation
  text: Créer une intégration basée sur l'API
- link: /developers/integrations/marketplace_offering/
  tag: Documentation
  text: Découvrir comment vendre une intégration sur le Marketplace Datadog
- link: /developers/
  tag: Documentation
  text: Découvrir comment développer sur la plateforme Datadog
kind: documentation
title: Créer une intégration
---
## Présentation

Cette page vous explique comment les partenaires technologiques peuvent [créer une intégration](#creer-une-integration-datadog) par le biais de l'[Agent Datadog][11] ou de l'[API Datadog][12] et publier leurs solutions sur la page **Integrations** ou **Marketplace**.

{{< tabs >}}
{{% tab "Intégrations" %}}

La [page Integrations][101] affiche les intégrations créées par Datadog et par ses partenaires technologiques. Ces intégrations sont proposées _gratuitement_ aux clients Datadog.

{{< img src="developers/integrations/integrations_overview.png" alt="La page Integrations de Datadog" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

La [page Marketplace][101] est une plateforme commerciale sur laquelle les partenaires technologiques peuvent _vendre_ toutes sortes de solutions aux clients Datadog, notamment des intégrations, des licences logicielles ainsi que des services professionnels.

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="La page Marketplace de Datadog" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}

### Avantages

La création d'une intégration permet de profiter des avantages suivants :

Mise en corrélation de vos données avec les données d'observabilité des utilisateurs
: Tirez parti de Datadog pour accroître la valeur de votre plateforme en permettant aux utilisateurs de consulter les données de votre plateforme en même temps que celles du reste de leur stack technologique.

Diminution du temps moyen de résolution des problèmes pour les clients
: Grâce aux données issues des intégrations, le client bénéficie d'une visibilité optimale sur son stack et peut ainsi accélérer le debugging et la résolution des problèmes.

Augmentation du taux d'adoption et de la visibilité
: En proposant une prise en charge native de Datadog aux utilisateurs, ceux-ci seront plus enclins à adopter votre solution. En outre, l'affichage d'un carré sur la [page Integrations][10] ou la [page Marketplace][17] garantit une meilleure visibilité de votre solution auprès des clients de Datadog.

## Débuter

### Rejoindre le réseau de partenaires Datadog

Pour pouvoir publier une intégration sur Datadog, vous devez d'abord demander à rejoindre le parcours **Technology Partners** du [réseau de partenaires Datadog][5]. Une fois votre demande approuvée, vous pourrez commencer à développer votre intégration.

### Demander un compte sandbox

Tous les partenaires technologiques peuvent demander à obtenir un compte sandbox Datadog dédié pour faciliter le développement de leur intégration. Ce compte sandbox comprend une licence gratuite que vous pouvez utiliser pour transmettre des données, concevoir des dashboards, et plus encore.

<div class="alert alert-info">Si vous faites déjà partie d'une organisation Datadog (y compris d'une organisation d'essai), vous devrez peut-être vous connecter à votre nouveau compte sandbox. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentation dédiée à la gestion de compte</a>.</div>

Pour demander un compte sandbox, procédez comme suit :

1. Connectez-vous au [portail partenaire de Datadog][5].
2. Sur votre page d'accueil personnelle, cliquez sur le bouton **Learn More** sous **Sandbox Access**.
3. Sélectionnez **Request Sandbox Upgrade**.

La création d'un compte sandbox pour développeur peut prendre un à deux jours ouvrables. Une fois votre compte sandbox créé, vous pourrez [inviter des membres de votre organisation][6] afin qu'ils collaborent avec vous.

### Explorer les ressources d'apprentissage

Après avoir rejoint le parcours **Technology Partners** et demandé un compte sandbox, vous pouvez commencer à vous renseigner sur le développement d'une solution. Pour ce faire :

* Suivez la formation à la demande [**Présentation des intégrations Datadog**][7] (en anglais), disponible dans le [centre d'apprentissage Datadog][8].
* Lisez la documentation dédiée à la création d'[intégrations basées sur l'API][1] et à la configuration d'un [client OAuth 2.0 pour les intégrations basées sur l'API][9].
* Lisez la documentation dédiée à la création d'[intégrations basées sur l'Agent][2].

Pour en savoir plus sur la vente d'une intégration Datadog ou de tout autre type de solution, consultez la section [Créer une solution pour le Marketplace][4].

## Créer une intégration Datadog

### Responsabilités

En tant que créateur de l'intégration, vous êtes tenu de mettre à jour le code et d'assurer le bon fonctionnement de l'intégration sur tous les [sites de Datadog][15]. [Contactez l'assistance][16] si vous rencontrez des problèmes de configuration.

### Intégrations basées sur l'Agent

Les intégrations basées sur l'Agent utilisent l'[Agent Datadog][11] pour envoyer des données via des checks écrits par les partenaires technologiques. Le code d'implémentation pour ces intégrations est hébergé par Datadog.

Les intégrations basées sur l'Agent conviennent particulièrement pour la collecte des données de systèmes ou d'applications situés sur un réseau local (LAN) ou un cloud privé virtuel (VPC). Pour [créer une intégration basée sur l'Agent][2], vous devrez publier et déployer votre solution au format wheel Python (`.whl`).

### Intégrations basées sur l'API

Les intégrations basées sur l'API peuvent envoyer les données de télémétrie (métriques, traces, logs, etc.) de plateformes externes par le biais de l'[API Datadog][12]. Les clients peuvent ensuite visualiser ces données et les mettre en corrélation avec les données du reste de leur stack de manière à détecter et résoudre rapidement les problèmes. Les intégrations basées sur l'API peuvent également lire les données extraites de Datadog si le client [accorde cet accès avec OAuth][13].

Les partenaires technologiques écrivent et hébergent le code d'implémentation qui compose l'intégration. La [création d'une intégration basée sur l'API][1] s'adresse avant tout aux partenaires technologiques qui créent un connecteur entre Datadog et une autre plateforme SaaS.




## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/integrations/api_integration/
[2]: https://docs.datadoghq.com/fr/developers/integrations/agent_integration/
[3]: https://docs.datadoghq.com/fr/integrations/
[4]: https://docs.datadoghq.com/fr/developers/integrations/marketplace_offering/
[5]: https://partners.datadoghq.com/
[6]: https://docs.datadoghq.com/fr/account_management/users/#add-new-members-and-manage-invites
[7]: https://learn.datadoghq.com/courses/intro-to-integrations
[8]: https://learn.datadoghq.com/
[9]: https://docs.datadoghq.com/fr/developers/authorization/
[10]: https://app.datadoghq.com/integrations
[11]: https://docs.datadoghq.com/fr/agent/
[12]: https://docs.datadoghq.com/fr/api/latest/
[13]: https://docs.datadoghq.com/fr/developers/authorization/
[14]: https://docs.datadoghq.com/fr/metrics/custom_metrics/
[15]: https://docs.datadoghq.com/fr/getting_started/site/
[16]: https://docs.datadoghq.com/fr/help/
[17]: https://app.datadoghq.com/marketplace