---
beta: true
description: Visualisez et comprenez la santé et l'utilisation de votre feature flag.
disable_toc: false
further_reading:
- link: /real_user_monitoring/feature_flag_tracking/setup/
  tag: Documentation
  text: Configurer la collecte de données Feature Flag
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Assurer la sécurité des versions grâce au suivi des feature flags dans Datadog
    RUM
title: Utilisation du suivi du feature flag
---
Une fois que vous avez configuré la collecte de données de votre feature flag, accédez à l'onglet [{{< ui >}}Feature Flag Tracking{{< /ui >}}][1] dans RUM.

Dans cette vue, vous pouvez répondre à toutes les questions que vous vous posez sur l'état de santé et l'utilisation de votre feature flag.
- Surveillez le nombre d'utilisateurs rencontrant chaque variante et consultez les statistiques récapitulatives de votre feature flag.
- Vérifiez le [statut](#feature-flag-status) de votre feature flag pour voir s'il y en a qui peuvent être supprimés pour le nettoyage du code.
- Visualisez les pages sur lesquelles votre Feature Flag est évalué.

Les feature flags apparaissent dans le contexte des événements où ils sont évalués, ce qui signifie qu'ils doivent apparaître sur les vues sur lesquelles la logique de code du feature flag est exécutée.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="Affichez une liste de vos Feature Flags pour examiner toute question que vous pourriez avoir sur la santé et l'utilisation de votre feature flag." style="width:90%;" >}}

## Recherchez et filtrez {#search-and-filter}
Recherchez et filtrez vos Feature Flags en tapant dans la barre de recherche. Vous pouvez également utiliser la recherche à facettes pour affiner, élargir ou déplacer votre attention sur des sous-ensembles de Feature Flags qui vous intéressent.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Barre de recherche et filtrage de la liste des feature flags" style="width:90%;" >}}

## Statut du feature flag {#feature-flag-status}
Il existe trois statuts possibles pour les feature flags :

Actif
: Le feature flag a évalué différentes variantes au cours des 2 dernières semaines.

Inactif
: Au cours des 2 dernières semaines, il n'y a eu que des évaluations du feature flag pour votre variante de contrôle.

Déployé à 100 %
: Au cours des 2 dernières semaines, il n'y a eu que des évaluations du feature flag pour l'une de vos variantes _non-contrôle_.


## Analysez vos Feature Flags {#analyze-your-feature-flags}
Pour obtenir plus de détails sur la santé et les performances de votre feature flag, vous pouvez cliquer sur le feature flag dans la liste pour accéder à un dashboard d'analyse dédié. Le dashboard d'analyse du feature flag offre une vue d'ensemble des performances de votre feature flag, en affichant des informations sur les sessions utilisateur, les changements dans vos Core Web Vitals et les taux d'erreur. 

Ces graphiques prêts à l'emploi sont agrégés sur l'ensemble de vos variantes de feature flag, ce qui permet de repérer facilement les problèmes dans vos versions de fonctionnalités avant qu'ils ne deviennent des problèmes sérieux. Ce dashboard offre un moyen simple de surveiller vos versions de fonctionnalités et vous permet d'effectuer rapidement un retour en arrière dès que vous repérez un problème afin d'éviter les expériences utilisateur négatives. 

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Page de détails du feature flag - Aperçu des utilisateurs" video=true width=90% >}}

- L'onglet {{< ui >}}Users{{< /ui >}} fournit des statistiques récapitulatives de haut niveau sur votre feature flag et vous permet d'analyser plus en détail les utilisateurs consultant chacune de vos variantes de feature flag par n'importe quel attribut. Si vous souhaitez comprendre ce qu'il en est pour quelqu'un qui a fait l'expérience d'une certaine variante par rapport à une autre, vous pouvez regarder une [Session Replay][2] pour chaque cas.

- L'onglet {{< ui >}}Issues{{< /ui >}} vous donne une vue des erreurs qui se produisent dans votre application pour les sessions utilisateur qui ont votre feature flag. Vérifiez si des problèmes détectés par [Error Tracking][3] se sont produits pour une variante spécifique de votre feature flag et pourraient être liés à vos modifications.

- L'onglet {{< ui >}}Performance{{< /ui >}} vous permet de comprendre si l'une de vos variantes de feature flag a causé de faibles performances. Vous pouvez consulter vos Core Web Vitals et le temps de chargement pour chaque variante afin de déterminer si l'une de vos variantes de feature flag pourrait avoir un impact négatif sur les performances de votre application.

## Créez des vues personnalisées à partir des données des feature flags à l'aide du RUM Explorer {#build-custom-views-from-feature-flag-data-using-the-rum-explorer}
Effectuez des recherches dans toutes les données collectées par RUM dans le [RUM Explorer][4] pour faire ressortir les tendances sur les Feature Flags, analyser les modèles avec un meilleur contexte ou les exporter vers des [dashboards][5] et des [monitors][6]. 

Vous pouvez effectuer des recherches dans vos sessions, vues ou erreurs dans le RUM Explorer, avec l'attribut `@feature_flags.{flag_name}` pour restreindre le champ et vous concentrer sur les événements où les utilisateurs ont été exposés à une expérience utilisateur spécifique.

Vous pouvez comparer les métriques importantes pour vous et vos équipes en regroupant votre requête par `@feature_flags.{flag_name}`. Par exemple, si vous souhaitez comprendre comment votre nouveau flux de paiement affecte le taux de conversion de la page de paiement vers les utilisateurs effectuant un achat, vous pouvez ajouter un « Regrouper par » sur le graphique du taux de conversion.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Barre de recherche et filtrage de la liste des feature flags" style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/feature-flags
[2]: /fr/session_replay/
[3]: /fr/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[4]: https://app.datadoghq.com/rum/explorer
[5]: /fr/dashboards/
[6]: /fr/monitors/#create-monitors