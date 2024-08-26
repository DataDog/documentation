---
aliases:
- /fr/network_performance_monitoring/guide/detecting_a_network_outage/
title: Détecter une panne de réseau
---
Les pannes de réseau se cachent souvent derrière des problèmes d'infrastructure, d'application ou de conteneur, ce qui les rend difficiles à détecter. Si vous n'avez pas de moyen de surveiller les performances de votre réseau régional ou de l'endpoint tiers que vous utilisez, détecter une panne sur un cloud tiers ou régional peut prendre jusqu'à plusieurs heures, et pourrait finir par affecter vos clients.

Grâce à NPM (Network Performance Monitoring), les pannes réseau sont détectées en quelques minutes. En analysant simultanément les données de flux réseau et les métriques, traces, logs et métriques d'infrastructure, vous pouvez clairement savoir lorsque vous rencontrez une panne de réseau, et ainsi procéder par élimination (voir les étapes ci-dessous) pour trouver la source d'un problème sur le réseau.

## Surcharge de trafic sur l'infrastructure sous-jacente

Utilisez les métriques NPM pour savoir si votre endpoint de source émet un trafic important ou s'il réalise un grand nombre de connexions ouvertes vers l'endpoint de destination. Lorsque vous sélectionnez une dépendance défectueuse (par exemple, une dont la latence est élevée), vous pouvez observer les graphiques du panneau latéral pour détecter des pics dans le trafic. Ces pics peuvent révéler une surcharge de votre application trop importante pour que celle-ci ne puisse (dans le cas d'un TCP) répondre à toutes les connexions, provoquant une augmentation des pertes de paquets, entraînant à son tour une latence accrue du TCP.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/npm-metrics.png" alt="Surcharge de trafic sur l'infrastructure sous-jacente">}}

## Surconsommation de processeur par l'infrastructure sous-jacente

En revanche, si l'un des endpoints, côté client ou côté serveur, est responsable d'une surconsommation de ressources, cela peut entraîner des problèmes de communication entre les deux. Dans l'onglet **Processes** du panneau latéral, limitez l'affichage aux processus exécutant l'un des deux endpoints (de source ou de destination) pour repérer tout logiciel lourd qui pourrait être à l'origine d'une baisse des performances des hosts ou des conteneurs sous-jacents, car celle-ci pourrait affecter leur capacité à répondre aux appels provenant du réseau. Dans ce cas, il vous faut non seulement déterminer si un host sous-jacent surchauffe et provoque une latence de l'application, mais vous devez également en comprendre la raison. En groupant vos métriques de processus par commande, vous obtiendrez la granularité qui vous permettra d'identifier précisément la tâche qui consomme vos ressources de processeur et de mémoire.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/processes.png" alt="Surconsommation de processeur par l'infrastructure sous-jacente">}}

## Erreurs d'application dans le code

La latence et les erreurs sur le réseau peuvent également être causées par des erreurs sur l'application côté client. Par exemple, si votre application génère inutilement des connexions en boucle, cela pourrait surcharger les endpoints que vous utilisez, entraînant des problèmes de réseau et d'application en aval. Utilisez l'onglet **Traces** dans NPM ou l'onglet **Network** dans Traces APM pour chercher des erreurs de requête d'application et déterminer si c'est le cas.

{{< img src="network_performance_monitoring/guide/detecting_a_network_outage/traces.png" alt="Erreurs d'application dans le code">}}

Si aucune des étapes ci-dessus n'a révélé de problèmes et que vous constatez des erreurs ou une latence sur vos dépendances filtrées sur une région particulière, une zone de disponibilité, ou l'endpoint d'un domaine tiers, cela signifie que vous rencontrez une panne de réseau. Dans ce cas, vous pouvez contacter les prestataires concernés pour leur signaler et résoudre le problème.