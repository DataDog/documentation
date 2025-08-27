---
aliases:
- /fr/continuous_integration/dora_metrics
description: Découvrez comment utiliser les métriques DORA pour mesurer et améliorer
  les processus de livraison logicielle de votre organisation.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de la livraison de logiciels (connexion à
    l'application requise).
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: Blog
  text: Bonnes pratiques pour utiliser les métriques DORA afin d’améliorer la livraison
    logicielle
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: Blog
  text: 3 façons de favoriser la réussite de la livraison logicielle avec les métriques
    DORA de Datadog
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /service_management/events
  tag: Documentation
  text: En savoir plus Event Management
- link: /monitors/types/metric
  tag: Documentation
  text: En savoir plus sur les monitors de métriques
- link: /software_catalog
  tag: Documentation
  text: En savoir plus sur le Software Catalog
is_beta: true
title: Métriques DORA
---

## Section Overview

Les métriques DORA (DevOps Research and Assessment) sont [quatre métriques clés][1] qui indiquent la vélocité et la stabilité du développement logiciel.

Deployment frequency (Fréquence de déploiement)
: Fréquence à laquelle une organisation effectue des mises en production réussies.

Change lead time (Délai de changement)
: Temps nécessaire pour qu'un commit soit mis en production.

Change failure rate (Taux d'échec de changement)
: Pourcentage de déploiements entraînant une défaillance en production.

Time to restore service (Temps de restauration du service)
: Durée nécessaire à une organisation pour se remettre d'une défaillance en production.

Définir et suivre les métriques DORA peut vous aider à identifier les axes d'amélioration de la rapidité et de la qualité de livraison logicielle de votre équipe ou de votre organisation.

## Configurer les métriques DORA

Pour commencer à configurer les sources de données afin d'envoyer les événements de déploiement et d'échec vers Datadog, consultez la [documentation relative à la configuration][2].

## Analyser les métriques DORA

Une fois les sources de données configurées pour vos événements de déploiement et d'échec, rendez-vous dans [Software Delivery > DORA Metrics][4] pour identifier les améliorations ou régressions de chaque métrique. Vous pouvez également agréger les métriques par équipe, service, référentiel, environnement, période et [tags custom][8] pour comparer les tendances dans le temps.

{{< img src="dora_metrics/dora_ui_3.png" alt="Vue d'ensemble des calculs des métriques DORA filtrés par le tag custom Language" style="width:100%;" >}}

Cliquez sur **View Deployments** pour ouvrir un nouvel onglet affichant les métriques Deployment Frequency et Change Lead Time, ainsi qu'une liste des événements de déploiement.

{{< img src="dora_metrics/deployments_list.png" alt="La répartition des déploiements affichant un détail des métriques ainsi qu'une liste des événements associés" style="width:100%;" >}}

Cliquez sur **View Failures** pour ouvrir un panneau latéral affichant les métriques Change Failure Rate et Time To Restore, ainsi qu'une liste des événements d'échec.

{{< img src="dora_metrics/failures_list.png" alt="La répartition des échecs affichant un détail des métriques ainsi qu'une liste des événements associés" style="width:100%;" >}}

## Utiliser les données des métriques DORA

### Exporter les widgets des métriques DORA
Exportez vos widgets de visualisation vers des dashboards, des notebooks, ou ajoutez-les à des incidents existants.

{{< img src="dora_metrics/dora_ui_2.png" alt="Cliquez sur l'icône Exporter pour ajouter le widget de visualisation à un incident, un dashboard ou un notebook." style="width:100%;" >}}

Cliquez sur l'icône **Export** de n'importe quelle visualisation pour l'ajouter à un incident, un dashboard ou un notebook. Pour en savoir plus sur les métriques calculées par les métriques DORA, consultez la [documentation relative aux données collectées][3].

### Créer des dashboards personnalisés

Les métriques DORA sont très flexibles et peuvent être utilisées dans des dashboards customisés pour répondre aux besoins spécifiques de votre équipe.

{{< img src="dora_metrics/dashboard.png" alt="Exemple de dashboard personnalisé pour les métriques DORA" style="width:100%;" >}}

Dans les dashboards et graphiques, les tags custom sont traités comme des [attributs][7]. Pour filtrer ou regrouper par tag custom, celui-ci doit être précédé du symbole @.

{{< img src="dora_metrics/graph_with_custom_tag.png" alt="Exemple de graphique personnalisé des métriques DORA regroupé par un tag custom" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /fr/dora_metrics/setup/
[3]: /fr/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /fr/monitors/types/metric/?tab=threshold
[6]: /fr/monitors/
[7]: /fr/dashboards/guide/quick-graphs/#graphing-events
[8]: /fr/dora_metrics/data_collected/#custom-tags