---
disable_toc: false
further_reading:
- link: /real_user_monitoring/guide/setup-feature-flag-data-collection/
  tag: Documentation
  text: Configurer la collecte de données Feature Flag
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Assurer la sécurité des versions grâce au suivi des feature flags dans le
    RUM Datadog
title: Surveillance des feature flags
---

## Présentation

Les données des feature flags vous offrent une meilleure visibilité sur l'expérience de vos utilisateurs et la surveillance des performances. Elles indiquent les fonctionnalités qui sont proposées à différents utilisateurs et l'impact de vos modifications sur l'expérience utilisateur ou sur les performances.

En enrichissant vos données RUM avec des données sur les feature flags, vous pouvez :
- vous assurer que votre fonctionnalité démarrera avec succès sans provoquer de bogue involontaire ni de régression des performances.
- établir une corrélation entre les versions des fonctionnalités et les performances, identifier les problèmes liés à des versions spécifiques et résoudre les problèmes plus rapidement.
- simplifier la collecte et l'analyse des données et vous concentrer sur le dépannage

## configurer la collecte de données sur les feature flags

Pour obtenir des instructions détaillées sur la configuration, consultez notre guide sur [la collecte de données de feature flags][1].

Le suivi des feature flags est disponible dans le SDK Browser RUM. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance Browser RUM][2]. La version 4.25.0 ou une version ultérieure du SDK Browser RUM est requise.

Vous pouvez commencer à recueillir des données de feature flags pour les [solutions de gestion personnalisée des feature flags][3] ou en utilisant l'un de nos partenaires d'intégration.

Nous prenons en charge les intégrations avec :

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

Les feature flags s'afficheront lors d'événements durant lesquelles ils sont évalués. Ils devraient ainsi apparaître sur les views où la logique de code des feature flags est exécutée.

## Afficher vos feature flags

Une fois que vous avez configuré la collecte de données de feature flags, accédez à l'onglet [**Feature Flags**][4] dans le RUM.

Dans cette vue, vous pouvez répondre à toutes les questions que vous vous posez sur l'état de santé et l'utilisation de votre feature flag.
- Surveillez le nombre d'utilisateurs ayant expérimenté chaque variante et consultez un résumé des statistiques de votre feature flag
- Vérifiez l'état de votre feature flag pour voir s'il y en a qui peuvent être supprimés pour nettoyer le code
- Afficher les pages sur lesquelles vos feature flags sont évalués

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-2.png" alt="Affichez la liste de vos feature flags pour répondre à toutes les questions que vous pourriez avoir sur leur santé et leur utilisation" style="width:90%;" >}}


### Rechercher et filtrer des événements
Recherchez et filtrez vos feature flags en tapant dans la barre de recherche. Vous pouvez également utiliser la recherche à facettes pour restreindre, élargir ou déplacer votre focus sur les sous-ensembles de feature flags qui vous intéressent.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-list-search-filter.png" alt="Barre de recherche et filtrage dans la liste des feature flags" style="width:90%;" >}}

### Statut des feature flags
Il existe trois statuts possibles pour les feature flags :
- **Active** : le feature flag a évalué différentes variantes au cours des deux dernières semaines.
- **Inactive** : au cours des deux dernières semaines, il n'y a eu que des évaluations de feature flags pour votre variante de contrôle.
- **Out to 100%** : au cours des deux dernières semaines, il n'y a eu que des évaluations de feature flags pour l'une de vos variantes de non-contrôle.

## Analyser vos feature flags
Pour obtenir plus de détails sur la santé et les performances de votre feature flag, vous pouvez cliquer sur le flag dans la liste pour accéder à un dashboard d'analyse dédié au feature flag. Le dashboard d'analyse des feature flags dashboard fournit une vue d'ensemble des performances de vos feature flags, en affichant des informations sur les sessions d'utilisateurs, les changements dans vos Core Web Vitals et les taux d'erreur. 

Ces graphiques prêts à l'emploi sont agrégés pour l'ensemble de vos variantes de flags, ce qui permet de repérer facilement les problèmes dans les publications de vos fonctionnalités avant qu'ils ne deviennent graves. Ce dashboard offre un moyen facile de surveiller les publications de vos fonctionnalités et vous permet de revenir rapidement en arrière dès que vous repérez un problème afin d'éviter les expériences négatives des utilisateurs. 

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-details-page.mp4" alt="Page des détails des feature flags - Vue d'ensemble des utilisateurs" video=true width=90% >}}


L'onglet **Users** onglet fournit des statistiques sommaires de haut niveau sur votre feature flag et vous permet d'analyser plus en détail les utilisateurs qui consultent chacune des variantes de vos feature flag en fonction de certains attributs. Si vous souhaitez savoir quel aspect revêt chaque variante pour les utilisateurs, vous pouvez consulter un enregistrement [Session Replay][5] pour chacune d'entre elles.

L'onglet **Issues** vous donne un aperçu des erreurs qui se produisent dans votre application pour les sessions d'utilisateurs qui possèdent votre feature flag. Voyez si des problèmes détectés par [le suivi des erreurs][6] sont survenus pour une variante spécifique de votre feature flag et s'ils peuvent être liés à vos modifications.

L'onglet **Performance** vous permet de comprendre si l'une des variantes de vos feature flags a entraîné une baisse des performances. Vous pouvez consulter vos données vitales et le temps de chargement pour chaque variante afin de déterminer si l'une de vos variantes peut avoir un impact négatif sur les performances de votre application.

### Créer des vues personnalisées à partir des données de feature flags à l'aide du RUM Explorer
Effectuez une recherche dans les données recueillies par le RUM dans le [RUM Explorer][7] pour distinguer les tendances des feature flags, analyser des modèles avec davantage de contexte ou les exporter dans des [dashboards][8] et des [monitors][9]. 

Vous pouvez rechercher vos sessions, vues ou erreurs dans le RUM Explorer, avec l'attribut `@feature_flags.{flag_name}` comme filtre pour vous concentrer sur des événements où les utilisateurs ont eu une expérience spécifique.

Vous pouvez comparer des métriques importantes pour vous et vos équipes en regroupant votre requête avec `@feature_flags.{flag_name}`. Par exemple, si vous souhaitez comprendre comment votre nouveau processus de paiement affecte le taux de conversion entre la page de paiement et les utilisateurs qui effectuent un achat, vous pouvez ajouter « Group by » sur le graphique du taux de conversion.

{{< img src="real_user_monitoring/feature_flag_tracking/feature-flag-rum-explorer.png" alt="Barre de recherche et filtrage dans la liste des feature flags" style="width:90%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/guide/setup-feature-flag-data-collection/
[2]: /fr/real_user_monitoring/browser#setup
[3]: /fr/real_user_monitoring/guide/setup-feature-flag-data-collection/?tab=npm#custom-feature-flag-management
[4]: https://app.datadoghq.com/rum/feature-flags
[5]: /fr/real_user_monitoring/session_replay/browser/
[6]: /fr/real_user_monitoring/error_tracking/explorer/#explore-your-issues
[7]: https://app.datadoghq.com/rum/explorer
[8]: /fr/dashboards/
[9]: /fr/monitors/#create-monitors
