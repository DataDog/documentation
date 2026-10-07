---
description: Estimez l'utilisation et les coûts de vos Feature Flags avant leur déploiement,
  et appliquez des leviers concrets pour les gérer et les réduire après le déploiement.
further_reading:
- link: /feature_flags/concepts/monthly_flag_configuration_requests/
  tag: Documentation
  text: Requêtes de configuration mensuelles de Feature Flags
- link: /feature_flags/concepts/stale_flags/
  tag: Documentation
  text: Feature Flags obsolètes
- link: /feature_flags/concepts/environments/
  tag: Documentation
  text: Environnements
- link: /feature_flags/concepts/configuration_sources/
  tag: Documentation
  text: Sources de configuration des SDK côté serveur
- link: /account_management/plan_and_usage/usage_details/
  tag: Documentation
  text: Utilisation détaillée
- link: /account_management/plan_and_usage/bill_overview/
  tag: Documentation
  text: Aperçu de la facturation
title: Estimer et gérer les coûts des Feature Flags
---
## Présentation {#overview}

L'utilisation des Feature Flags évolue en fonction de la manière dont vous les déployez :

- Pour une utilisation **côté client**, cela dépend du nombre d'applications clientes et d'utilisateurs finaux se connectant à Datadog.
- Pour une utilisation **côté serveur**, cela dépend du nombre de services backend interrogeant la configuration.

Deux organisations ayant le même nombre de flags peuvent générer des volumes d'utilisation différents, en fonction de cette empreinte de déploiement. Ce guide vous aide à estimer l'utilisation et les coûts avant un déploiement à grande échelle. Il couvre également les leviers disponibles pour gérer et réduire les coûts après le déploiement.

## Estimez l'utilisation et les coûts de vos Feature Flags {#estimate-your-feature-flags-usage-and-costs}

Datadog facture l'utilisation des Feature Flags en requêtes de configuration de flag mensuelles (MFCR). Une MFCR est une requête pour le fichier contenant vos flags et leurs règles de ciblage, et non une évaluation de flag individuelle. Les SDK mettent ce fichier en cache localement et évaluent les flags à partir de celui-ci sans appels réseau supplémentaires ; ainsi, une seule requête de configuration peut prendre en charge de nombreuses évaluations sur de nombreux flags. Pour la définition complète et les règles de comptage, consultez [Monthly Flag Configuration Requests][1].

Comme les MFCR comptabilisent les requêtes de configuration, le nombre de flags que vous maintenez et leur fréquence d'évaluation n'influent pas directement sur l'utilisation. Les facteurs qui le font :

- **Utilisation côté client** : Un SDK côté client demande une configuration lors de son initialisation, ce qui se produit généralement chaque fois qu'un utilisateur ouvre un onglet de navigateur ou une application mobile. Le MFCR côté client suit de près le volume total (non échantillonné) de sessions ou d'ouvertures d'application sur les applications où vous utilisez des indicateurs.
- **Utilisation côté serveur** : Un SDK côté serveur interroge Datadog (ou le Datadog Agent, selon la [source de configuration][2] que vous choisissez) à un intervalle configurable, 30 secondes par défaut. Le MFCR côté serveur suit le nombre total d'hosts, de services ou de conteneurs en cours d'exécution avec le SDK déployé, multiplié par la fréquence d'interrogation de chacun.
- **Combinaison côté client et côté serveur** : Si vous utilisez les Feature Flags à la fois côté client et côté serveur, additionnez les deux estimations.

<div class="alert alert-info">Datadog facture les requêtes de configuration côté serveur à 10 fois leur nombre brut, car une seule requête côté serveur peut servir des attributions de variantes à beaucoup plus d'utilisateurs finaux qu'une seule requête côté client.</div>

### Estimez votre utilisation avant de procéder au déploiement {#estimate-your-usage-before-you-roll-out}

1. Décidez quels SDK vous prévoyez de déployer : côté client, côté serveur, ou les deux.
1. Pour une utilisation côté client, effectuez une estimation avec l'un des éléments suivants :
   - Votre volume mensuel de sessions RUM. Sinon, utilisez votre nombre d'utilisateurs actifs quotidiens sur les applications où vous prévoyez d'utiliser des Feature Flags, multiplié par 30 pour une estimation mensuelle.
   - Si les Feature Flags couvrent un ensemble d'applications plus large que votre implémentation RUM actuelle, utilisez plutôt le nombre d'utilisateurs actifs quotidiens ou de sessions quotidiennes sur ces applications.
1. Pour une utilisation côté serveur, comptez le nombre total d'hosts, de services ou de conteneurs en cours d'exécution avec le SDK déployé. Multipliez ce nombre par le nombre de requêtes de configuration par jour à votre intervalle d'interrogation, puis par 30 pour une estimation mensuelle, et appliquez le multiplicateur côté serveur de 10.
1. Additionnez les estimations côté client et côté serveur pour obtenir une estimation mensuelle combinée des MFCR.

Par exemple, une organisation disposant de 1,2 million d'utilisateurs actifs quotidiens sur des applications clientes utilisant des Feature Flags génère environ 36 millions de MFCR par mois (1,2 million x 30 jours).

Pour un exemple côté serveur, une organisation exécutant le SDK sur 33 hosts génère 2 880 requêtes de configuration par host et par jour à l'intervalle d'interrogation par défaut de 30 secondes (86 400 secondes par jour / 30 secondes). Cela représente 33 x 2 880 x 30 jours = 2 851 200 (environ 2,85 millions) de MFCR avant le multiplicateur côté serveur, ou environ 28,5 millions de MFCR après celui-ci.

Une utilisation inférieure à 1 million de MFCR par mois est incluse sans frais. Pour connaître les niveaux de tarification actuels au-delà de ce quota, consultez la [page de tarification des Feature Flags][4].

### Surveillez votre utilisation et vos coûts réels {#monitor-your-actual-usage-and-cost}

Après le déploiement, comparez votre estimation à l'utilisation réelle. Datadog rapporte l'utilisation et le coût des Feature Flags aux côtés de vos autres produits sur les pages [Détails de l'utilisation][5] et [Aperçu de la facture][6], où vous pouvez visualiser les tendances d'utilisation au fil du temps et télécharger des données d'utilisation détaillées.

## Gérez et réduisez les coûts des Feature Flags {#manage-and-reduce-feature-flags-costs}

Comme le MFCR suit les requêtes de configuration plutôt que le nombre de Feature Flags, réduire le nombre de Feature Flags que vous maintenez ne réduit pas le coût en soi. Les leviers suivants ciblent ce qui génère réellement le MFCR : combien de sessions client initialisent le SDK, combien d'instances serveur interrogent la configuration, et à quelle fréquence.

### Examinez la prolifération des environnements et l'empreinte du SDK serveur {#review-environment-sprawl-and-server-sdk-footprint}

Le MFCR côté serveur se multiplie avec chaque environnement exécutant une instance du SDK. Examinez quels [environnements][3] ont réellement besoin d'une distribution en temps réel des Feature Flags côté serveur. L'infrastructure éphémère ou à courte durée de vie, telle que les environnements par branche ou CI, augmente le volume de requêtes sans ajouter de valeur de déploiement si elle ne nécessite pas de ciblage. Consolidez les requêtes d'environnement lorsque plusieurs `env` valeurs correspondent au même environnement logique, afin de ne pas dupliquer inutilement la distribution de la configuration.

### Désactivez les Feature Flags là où ils ne sont pas utilisés {#turn-off-feature-flags-where-they-arent-in-use}

L'installation d'un SDK serveur n'active pas la facturation en soi ; une requête de configuration ne se produit qu'après l'initialisation du fournisseur. Si un service a le traceur installé mais n'utilise pas de Feature Flags, définissez `DD_FEATURE_FLAGS_ENABLED=false` pour désactiver le fournisseur et arrêter l'interrogation de la configuration. Pour plus de détails, consultez [Sources de configuration du SDK serveur][2].

### Ajustez l'intervalle d'interrogation de la configuration {#adjust-the-configuration-polling-interval}

Pour une distribution côté serveur sans agent, `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE_AGENTLESS_POLL_INTERVAL_SECONDS` contrôle la fréquence à laquelle le SDK demande la configuration, avec une valeur par défaut de 30 secondes et un maximum de 3600 secondes (une heure). Un intervalle plus long réduit le volume de requêtes au prix d'une propagation plus lente des Feature Flags. Augmenter l'intervalle sur les environnements à faible priorité, tels que le développement ou la préproduction, est un moyen de réduire le volume là où une propagation rapide importe moins qu'en production.

### Choisissez une source de configuration correspondant à votre déploiement {#choose-a-configuration-source-that-matches-your-deployment}

Avec Agent Remote Configuration, les applications communiquent avec le Datadog Agent local au lieu d'interroger directement Datadog. Si vous exécutez plusieurs processus d'application sur le même host, les acheminer via un Agent partagé peut consolider les requêtes de configuration par rapport à chaque processus interrogeant Datadog indépendamment via une livraison sans agent. Mettez cela en balance avec le coût opérationnel de l'exécution et de la maintenance des Agents avec Remote Configuration activée. Consultez [Sources de configuration du SDK serveur][2] pour savoir comment choisir entre les deux.

### Limitez l'initialisation du SDK côté client aux endroits où vous utilisez des Feature Flags {#scope-client-side-sdk-initialization-to-where-you-use-flags}

Le MFCR côté client suit les sessions ou les ouvertures d'application dans les applications qui initialisent le fournisseur de Feature Flags. Initialisez le fournisseur uniquement dans les applications et les propriétés où vous contrôlez des fonctionnalités avec des Feature Flags, plutôt que de manière universelle sur chaque propriété client.

### Nettoyez les Feature Flags obsolètes et inutilisés {#clean-up-stale-and-unused-flags}

Les [Feature Flags obsolètes][7] n'augmentent pas directement le MFCR, car une requête de configuration couvre tous vos Feature Flags, quel que soit leur nombre. Les archiver permet tout de même de réduire la dette technique liée aux Feature Flags et le risque de maintenir une logique associée à des services ou à des environnements dont vous n'avez plus besoin. L'examen des Feature Flags obsolètes est également un signal utile pour mettre hors service des environnements entiers ou des déploiements de SDK qui ne sont plus utilisés, ce qui réduit le volume de requêtes côté serveur.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/feature_flags/concepts/monthly_flag_configuration_requests/
[2]: /fr/feature_flags/concepts/configuration_sources/
[3]: /fr/feature_flags/concepts/environments/
[4]: https://www.datadoghq.com/pricing/?product=feature-flags#products
[5]: /fr/account_management/plan_and_usage/usage_details/
[6]: /fr/account_management/plan_and_usage/bill_overview/
[7]: /fr/feature_flags/concepts/stale_flags/