---
aliases:
- /fr/developers/marketplace/offering
- /fr/developers/integrations/create_a_tile
- /fr/guides/agent_checks/
- /fr/agent/agent_checks
- /fr/developers/agent_checks/
description: Apprenez à développer et publier une intégration Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Élargissez votre audience pour votre solution de surveillance avec le Marketplace
    Datadog
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Créer une offre sur le Datadog Marketplace
title: Intégrations Datadog
type: documentation
---
## Présentation

Cette page explique ce qu'est une intégration et présente les étapes générales pour en créer une à l'aide de la plateforme de développement d'intégrations de Datadog.

## Qu'est-ce qu'une intégration ?

Les intégrations permettent à des tiers d'envoyer des données d'observabilité, telles que des métriques, des logs, des traces ou des événements, dans Datadog. Les intégrations incluent des dashboards, des monitors et d'autres contenus prêts à l'emploi pour aider les utilisateurs à visualiser et analyser leurs données. 

### Avantages de la création d'intégrations

La création d'une intégration permet de profiter des avantages suivants :

Mise en corrélation de vos données avec les données d'observabilité des utilisateurs
: Tirez parti de Datadog pour accroître la valeur de votre plateforme en permettant aux utilisateurs de consulter les données de votre plateforme en même temps que celles du reste de leur stack technologique.

Diminution du temps moyen de résolution des problèmes pour les clients
: Grâce aux données issues des intégrations, le client bénéficie d'une visibilité optimale sur son stack et peut ainsi accélérer le debugging et la résolution des problèmes.

Augmentation du taux d'adoption et de la visibilité
: En proposant une prise en charge native de Datadog aux utilisateurs, ceux-ci seront plus enclins à adopter votre solution. En outre, l'affichage d'un carré sur la [page Integrations][2] ou la [page Marketplace][3] garantit une meilleure visibilité de votre solution auprès des clients de Datadog.

## Qu'est-ce qu'une tuile d'intégration ?

Une tuile d'intégration permet aux utilisateurs de découvrir votre solution et de l'installer. Elle comprend :
* Une description de votre offre
* Instructions de configuration
* Des options d'installation ou d'achat
* Des dashboards et autres contenus fournis par défaut

Les tuiles d'intégration sont un élément central du fonctionnement des intégrations dans Datadog.

## Exigences pour une intégration officielle

Pour être reconnue comme officielle, une intégration doit inclure les éléments suivants :
* L'envoi de données de télémétrie vers Datadog
* Un dashboard dʼintégration prêt à l'emploi
* Des images pour illustrer votre tuile
* OAuth (pour les intégrations dʼAPI uniquement)
* Un pipeline de log (pour les intégrations de logs uniquement)
* Monitor recommandé (pour les intégrations qui envoient en métriques)

## Prise en main

### Rejoindre le réseau de partenaires Datadog

Pour pouvoir publier une intégration sur Datadog, vous devez d'abord demander à rejoindre le parcours **Technology Partners** du [réseau de partenaires Datadog][1]. Une fois votre demande approuvée, vous pourrez commencer à développer votre intégration.

### Demander un compte sandbox

Tous les partenaires technologiques peuvent demander à obtenir un compte sandbox Datadog dédié pour faciliter le développement de leur intégration. Ce compte sandbox comprend une licence gratuite que vous pouvez utiliser pour transmettre des données, concevoir des dashboards, et plus encore.

<div class="alert alert-info">Si vous faites déjà partie d'une organisation Datadog (y compris d'une organisation d'essai), vous devrez peut-être vous connecter à votre nouveau compte sandbox. Pour en savoir plus, consultez la <a href="https://docs.datadoghq.com/account_management/org_switching/">documentation dédiée à la gestion de compte</a>.</div>

Pour demander un compte sandbox, procédez comme suit :

1. Connectez-vous au [portail partenaire de Datadog][1].
2. Sur votre page d'accueil personnelle, cliquez sur le bouton **Learn More** sous **Sandbox Access**.
3. Sélectionnez **Request Sandbox Upgrade**.

La création d'un compte sandbox pour développeur peut prendre un à deux jours ouvrables. Une fois votre compte sandbox créé, vous pourrez [inviter des membres de votre organisation][7] afin qu'ils collaborent avec vous.

### Vue d'ensemble du développement d'une intégration

Suivez les étapes ci-dessous pour créer une nouvelle intégration avec Datadog.

1. **Faire une demande pour rejoindre le réseau de partenaires Datadog.** Une fois votre demande acceptée, un membre de l'équipe Technology Partner de Datadog vous contactera pour planifier un appel de présentation.
2. **Demander un compte sandbox Datadog** pour le développement via le portail du réseau de partenaires.
3. **Commencer à développer votre intégration** à l'aide de la plateforme de développement d'intégrations :

   a. Définissez les informations de base concernant votre intégration.

   b. Écrivez le code de votre intégration en suivant les instructions correspondant au type d'intégration que vous souhaitez créer :
      - [Intégration basée sur l'Agent][5]
      - [Intégration basée sur l'API][6]   

   c. Indiquerz le type de données interrogées ou envoyées par votre intégration.

   d. Créez un dashboard et, si nécessaire, configurez des monitors ou des règles de sécurité.

   e. Renseignez les champs restants : instructions d'installation et de désinstallation, images, informations d'assistance et autres éléments clés pour décrire la valeur de votre intégration.

4. **Testez votre intégration** dans votre compte sandbox Datadog.
5. **Soumettez votre intégration pour examen.**
6. **Une fois approuvée, votre intégration est publiée.**

### Responsabilités

En tant que créateur de l'intégration, vous êtes tenu de mettre à jour le code et d'assurer le bon fonctionnement de l'intégration sur tous les [sites de Datadog][8]. [Contactez l'assistance][9] si vous rencontrez des problèmes de configuration.

## Intégrations prêtes à l'emploi et offres du Marketplace

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

Les intégrations publiées sur le Marketplace conviennent particulièrement :
* Aux intégrateurs système disposant d'une expertise approfondie des produits Datadog.
* Aux partenaires proposant des services professionnels pour favoriser l'adoption de Datadog.

|                          | **Intégrations prêtes à l'emploi**                                                                 | **Intégrations du Marketplace**                                                                                   |
|--------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Objectif**              | Fournir un moyen de connecter Datadog à des plateformes partenaires et de transférer des données entre elles     | Améliorer l'expérience Datadog grâce à des fonctionnalités étendues, des services partenaires ou la prise en charge de technologies existantes    |
| **Disponibilité**         | Présentes sur la page des intégrations                                                     | Payantes, disponibles sur le Marketplace                                                                             |
| **Développées et maintenues par**| Datadog ou des partenaires technologiques                                                        | Des partenaires technologiques                                                                                            |
| **Facturation**              | Incluses dans l'abonnement Datadog                                                      | Frais supplémentaires                                               |

## Opportunités de mise sur le marché (GTM)

Datadog propose un accompagnement GTM. Contactez votre responsable partenaire pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: https://app.datadoghq.com/integrations
[3]: https://app.datadoghq.com/marketplace
[4]: https://docs.datadoghq.com/fr/developers/integrations/marketplace_offering/
[5]: /fr/developers/integrations/agent_integration/
[6]: /fr/developers/integrations/api_integration/
[7]: https://docs.datadoghq.com/fr/account_management/users/#add-new-members-and-manage-invites
[8]: https://docs.datadoghq.com/fr/getting_started/site/
[9]: https://docs.datadoghq.com/fr/help/