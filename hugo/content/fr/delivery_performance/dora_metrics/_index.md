---
aliases:
- /fr/continuous_integration/dora_metrics
- /fr/dora_metrics/
description: Découvrez comment utiliser les métriques DORA pour mesurer et améliorer
  les processus de livraison logicielle de votre organisation.
further_reading:
- link: /delivery_performance/dora_metrics/calculation/
  tag: Documentation
  text: Découvrez comment Datadog calcule les métriques DORA
- link: /continuous_delivery/deployments
  tag: Documentation
  text: En savoir plus sur Deployment Visibility
- link: /events
  tag: Documentation
  text: En savoir plus sur Event Management
- link: /monitors/types/metric
  tag: Documentation
  text: En savoir plus sur les monitors de métriques
- link: /catalog
  tag: Documentation
  text: En savoir plus sur le Catalog
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métriques de succès pour les équipes d'ingénierie de plateforme
- link: https://www.datadoghq.com/blog/dora-metrics-software-delivery/
  tag: Blog
  text: Bonnes pratiques pour utiliser les métriques DORA afin d'améliorer la livraison
    logicielle
- link: https://www.datadoghq.com/blog/datadog-dora-metrics/
  tag: Blog
  text: 3 façons de favoriser la réussite de la livraison logicielle avec Datadog
    DORA Metrics
- link: https://www.datadoghq.com/blog/devsecops-2026-study-learnings
  tag: Blog
  text: Principaux enseignements de l'étude 2026 sur l'état du DevSecOps
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
is_beta: true
title: DORA Metrics
---
## Présentation {#overview}

Les métriques DORA (DevOps Research and Assessment) sont [quatre métriques clés][1] qui indiquent la vélocité et la stabilité du développement logiciel.

Fréquence de déploiement
: La fréquence à laquelle une organisation déploie avec succès en production.

Délai de changement
: Le temps nécessaire pour qu'un commit arrive en production.

Taux d'échec des changements
: Le ratio de déploiements qui échouent et nécessitent une intervention immédiate.

Temps de récupération après un déploiement échoué
: Le temps nécessaire pour se rétablir après un déploiement qui échoue et nécessite une intervention immédiate.

Définir et suivre les métriques DORA peut vous aider à identifier les axes d'amélioration de la rapidité et de la qualité de livraison logicielle de votre équipe ou de votre organisation.

## Configurer les métriques DORA {#set-up-dora-metrics}

Pour commencer à configurer les sources de données afin d'envoyer des événements de déploiement à Datadog, consultez la [documentation de configuration][2].

## Analyser les métriques DORA {#analyze-dora-metrics}

Une fois que vous avez configuré les sources de données pour vos événements de déploiement, accédez à [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}}][4] pour identifier les améliorations ou les régressions pour chaque métrique. Vous pouvez également agréger les métriques par équipe, service, dépôt, environnement, période et [tags personnalisés][8] pour comparer les tendances au fil du temps.

{{< img src="delivery_performance/dora_metrics/dora_ui_3.png" alt="Un aperçu des calculs DORA Metrics filtrés par le tag personnalisé Language" style="width:100%;" >}}

Cliquez sur {{< ui >}}View Deployments{{< /ui >}} pour ouvrir un nouvel onglet avec la liste des événements de déploiement.

{{< img src="delivery_performance/dora_metrics/deployments_list.png" alt="La répartition des déploiements affichant une ventilation des métriques et une liste des événements associés" style="width:100%;" >}}

Cliquez sur {{< ui >}}View Change Failures{{< /ui >}} pour ouvrir un panneau latéral contenant la liste des événements de déploiement marqués comme échecs de changement.

{{< img src="delivery_performance/dora_metrics/change_failures_list.png" alt="La répartition des échecs de changement affichant une ventilation des métriques et une liste des événements associés" style="width:100%;" >}}

## Utilisez les données de DORA Metrics {#use-dora-metrics-data}

### Exportez les widgets DORA Metrics {#export-dora-metrics-widgets}
Exportez vos widgets de visualisation vers des dashboards ou des notebooks.

Cliquez sur l'icône {{< ui >}}Export{{< /ui >}} sur n'importe quelle visualisation pour l'ajouter à un dashboard ou à un notebook. Pour plus d'informations sur les métriques calculées par DORA Metrics, consultez la [documentation sur les données collectées][3].

### Créez des dashboards personnalisés {#create-custom-dashboards}

Créez des dashboards personnalisés à l'aide de DORA Metrics pour analyser votre workflow de livraison de bout en bout, des commits et pull requests aux déploiements en production. Par exemple, comparez les performances de revue de code entre les équipes pour identifier celles qui sont bloquées par des approbations lentes et hiérarchisez les investissements dans l'amélioration du workflow.

{{< img src="delivery_performance/dora_metrics/dashboard.png" alt="Un exemple de Dashboard DORA Metrics personnalisé" style="width:100%;" >}}

Dans les dashboards et les graphiques, les tags personnalisés sont traités comme des [attributs][7]. Pour filtrer ou regrouper par un tag personnalisé, il doit être précédé d'un symbole `@`.

{{< img src="delivery_performance/dora_metrics/graph_with_custom_tag.png" alt="Un exemple de graphique DORA Metrics personnalisé regroupé par un tag personnalisé" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/knowledge-center/dora-metrics/
[2]: /fr/delivery_performance/dora_metrics/setup/
[3]: /fr/delivery_performance/dora_metrics/data_collected/
[4]: https://app.datadoghq.com/ci/dora
[5]: /fr/monitors/types/metric/?tab=threshold
[6]: /fr/monitors/
[7]: /fr/dashboards/guide/quick-graphs/#graphing-events
[8]: /fr/delivery_performance/dora_metrics/data_collected/#custom-tags