---
algolia:
  tags:
  - service page
aliases:
- /fr/tracing/visualization/service/
further_reading:
- link: /tracing/trace_collection/
  tag: Documentation
  text: Configurer le tracing APM avec votre application
- link: /tracing/services/services_list/
  tag: Documentation
  text: Découvrir la liste des services transmettant des données à Datadog
- link: /tracing/services/resource_page/
  tag: Documentation
  text: Plonger au cœur des traces et des performances de vos ressources
- link: /tracing/trace_explorer/trace_view/
  tag: Documentation
  text: Apprendre à lire une trace Datadog
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: Blog
  text: Ajouter une URL vers la page d'un service APM à votre presse-papiers
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: Blog
  text: Gagner en visibilité sur les risques, vulnérabilités et attaques avec la vue
    Security APM
title: Page Service
---

{{< img src="tracing/visualization/service/overview_service_page.png" alt="Page Service détaillée" style="width:100%;">}}

## Présentation

Lorsque vous sélectionnez un service sur la page des services, vous accédez à une page Service détaillée. Un service est un ensemble de processus qui partagent la même fonction, par exemple un framework Web ou une base de données (pour découvrir comment définir des services, consultez la [présentation d'APM][1]).

Cette page vous permet de consulter :

* Les [états des service monitors](#service-monitor)
* Les [Watchdog Insights](#watchdog-insights)
* Les [fiches récapitulatives](#fiches-recapitulatives)
* Les [graphiques prêts à l'emploi](#graphiques-prets-a-l-emploi)
* Les [ressources associées au service en question][2]
* Des [onglets supplémentaires](#onglets-supplementaires)
    *  Les [déploiements](#deploiements), le [suivi des erreurs](#suivi-des-erreurs), les [traces](#traces), la [sécurité](#securite), etc.

## Service monitor

Datadog fournit une liste de monitors en fonction de votre type de service :

{{< img src="tracing/visualization/service/service_monitors.png" alt="Service Monitors" style="width:90%;">}}

Activez-les directement ou créez vos propres [monitors APM][3].

**Remarque** : ajoutez le tag `service:<NOM_SERVICE>` à un monitor pour le lier à un service APM.

## Watchdog Insights

Le carrousel [Watchdow Insights][7] affiche les anomalies et singularités qui ont été détectées pour certains tags. Vous pouvez ainsi déterminer la cause à l'origine d'un problème. Les insights proviennent des solutions APM et Log Management, du profileur en continu et des données d'infrastructure comportant le tag service. Ces insights sont identiques à celles qui s'affichent sur la page de chaque produit. Par exemple, les singularités de log affichées sur la page Service sont les mêmes que celles représentées dans le [Log Explorer][19].

{{< img src="tracing/visualization/service/cross-product-insight.jpg" alt="Watchdog Insights" style="width:100%;">}}

Cliquez sur une insight pour afficher plus de détails, notamment l'intervalle, les logs ou traces associés et les prochaines étapes suggérées.

{{< img src="tracing/visualization/service/watchdog-details.jpg" alt="Détails de Watchdog Insights" style="width:100%;">}}

## Fiches récapitulatives

La page Service contient des fiches récapitulatives mettant en avant la santé de vos services. Sur cette page, vous pouvez détecter facilement un éventuel déploiement défectueux, cliquer sur la fiche pour afficher les détails ou les traces du dernier déploiement, ou bien afficher tous les déploiements sur ce service. Grâce à l'intégration de notre solution de [suivi des erreurs][4], qui permet de regrouper des erreurs au sein de problèmes, vous pouvez consulter les nouveaux problèmes détectés dans votre service.

{{< img src="tracing/visualization/service/summary_cards.png" alt="Fiches récapitulatives" style="width:100%;">}}

Nos résumés des [Service Level Objectives (SLO)][5] et [incidents][6] vous permettent de surveiller le statut des SLO et des incidents en cours, afin que vous puissiez toujours vous focaliser sur vos objectifs de performance. Cliquez sur les fiches pour créer un SLO sur le service ou signaler un incident. Le résumé des [signaux de sécurité][18] décrit la façon dont vos services réagissent face aux menaces à l'encontre de l'application.

## Graphiques prêts à l'emploi

Datadog fournit des [graphiques prêts à l'emploi][8] pour chaque service :

* Requêtes  – Choisissez d'afficher :
    *  Le **nombre total de requêtes et d'erreurs**
    *  Le nombre **de requêtes et d'erreurs par seconde**
* Latence – Choisissez d'afficher :
    *  La moyenne, le 75e centile, le 90e centile, le 95e centile, le 99e centile ou la valeur maximale de la latence de vos requêtes tracées
    *  La **distribution de la latence**
    *  Le **score Apdex** des services Web ([En savoir plus sur ce score][9])
* Erreurs – Choisissez d'afficher :
    * Le **nombre total d'erreurs**
    * Le nombre **d'erreurs par seconde**
    * Le **taux d'erreur en %**
* Carte des dépendances :
    * La **carte des dépendances** présente les services en amont et en aval.
* **Sous-services** : lorsque plusieurs services sont impliqués, un quatrième graphique (dans la même option que la carte des dépendances) est disponible. Il présente la **durée totale**, le **% de temps passé** et la **durée moyenne par requête** de votre service en fonction des *services* ou des *types* de service.

    Cela représente le temps total, relatif et moyen passé par les traces des services en aval, depuis le service actuel vers les autres *services* ou *types* de service.

    **Remarque** : pour les services comme *Postgres* ou *Redis*, qui mettent fin au processus et n'appellent pas d'autres services, aucun graphique de sous-services n'est disponible.
[Watchdog] [7] effectue une détection automatique des anomalies sur les graphiques des requêtes, de la latence et des erreurs. En cas d'anomalie, les données sont superposées au graphique et une icône Watchdog apparaît. Cliquez sur cette icône pour afficher plus de détails dans un volet latéral.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="Graphiques sur les services prêts à l'emploi" style="width:100%;">}}

### Exporter

En haut à droite de chaque graphique, cliquez sur la flèche pour exporter votre graphique dans un [dashboard][10] existant :

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="Enregistrer le graphique dans un dashboard" style="width:60%;">}}

## Ressources

Consultez les graphiques sur les requêtes, la latence et les erreurs répartis par ressource pour identifier les ressources problématiques. Les ressources sont des actions particulières pour vos services (généralement, des endpoints ou des requêtes). Pour en savoir plus, consultez la [présentation d'APM][1].

Sous les graphiques se trouve la liste des [ressources][11] associées à votre service. Triez les ressources de ce service par requête, latence, erreur et durée pour identifier les zones à trafic élevé ou les problèmes potentiels. Sachez que ces colonnes de métrique peuvent être personnalisées (voir l'image ci-dessous).

{{< img src="tracing/visualization/service/resources_tab.jpg" alt="Ressources" style="width:100%;">}}

Cliquez sur une ressource pour afficher dans un volet latéral les graphiques prêts à l'emploi (sur les requêtes, les erreurs et la latence) pour la ressource, une carte des dépendances des ressources et un tableau récapitulatif des spans. Utilisez les touches directionnelles du clavier pour passer d'une ressource à une autre dans la liste **Resources** et comparer les ressources d'un service. Pour afficher toutes les informations sur les ressources, cliquez sur **Open Full Page**.

[Consultez la documentation relative aux ressources pour en savoir plus][2].

### Colonnes

Choisissez les informations à afficher dans votre liste de ressources :

* **Requests** : le nombre absolu de requêtes tracées (par seconde)
* **Requests per second** : le nombre absolu de requêtes tracées par seconde
* **Total time** : la durée totale de cette ressource
* **Avg/p75/p90/p95/p99/Max Latency** : la moyenne, le 75e centile, le 90e centile, le 95e centile, le 99e centile et la valeur maximale de la latence de vos requêtes tracées
* **Errors** : le nombre absolu d'erreurs pour une ressource donnée
* **Error Rate** : le pourcentage d'erreur pour une ressource donnée

{{< img src="tracing/visualization/service/resource_columns.png" alt="Colonnes des ressources" style="width:40%;">}}

## Onglets supplémentaires

### Déploiements
Lorsqu'un service est configuré avec des tags « version », les versions sont affichées dans l'onglet Deployment. La section Version affiche toutes les versions du service qui étaient actives pendant l'intervalle sélectionné. Les versions actives sont affichées en premier.

Les informations suivantes sont affichées par défaut :
* Les noms des versions déployées pour ce service sur l'intervalle sélectionné.
* L'heure de la première observation et de la dernière observation des traces correspondant à cette version.
* Un indicateur Error Types, qui affiche le nombre de types d'erreurs présents dans chaque version, mais pas dans la version qui la précède.

    **Remarque** : cet indicateur affiche les erreurs qui n'ont pas été observées dans les traces de la version précédente ; cela ne signifie pas forcément que ces erreurs sont apparues dans cette version pour la première fois. Le nombre de nouveaux types d'erreurs est particulièrement utile pour commencer à analyser les erreurs.

* Les requêtes par seconde.
* Le taux d'erreur, exprimé en tant que pourcentage du nombre total de requêtes.

Vous avez la possibilité d'ajouter des colonnes ou d'en supprimer. Vos sélections seront enregistrées. Les colonnes supplémentaires suivantes peuvent être ajoutées :

* Endpoints actifs dans une version, mais qui ne l'étaient pas dans la version précédente.
* Durée d'activité, à savoir la durée entre la première trace envoyée à Datadog et la dernière trace envoyée pour la version en question.
* Nombre total de requêtes.
* Nombre total d'erreurs.
* Latence mesurée au p50, p75, p90, p95 ou p99, ou latence maximale.

{{< img src="tracing/visualization/service/deployments.png" alt="Déploiements" style="width:90%;">}}

Pour en savoir plus sur les déploiements, consultez [la page Service][12].

### Suivi des erreurs
Cet onglet affiche les problèmes constatés sur votre service. En regroupant les erreurs similaires, il permet d'éviter les flux illisibles et facilite ainsi la résolution des erreurs. Grâce au suivi des erreurs, vous pouvez également évaluer l'impact des erreurs de votre service. Pour en savoir plus sur les problèmes, consultez la section [Suivi des erreurs][4].

Cet onglet comporte des graphiques généraux indiquant les ressources les plus problématiques ainsi que la liste des problèmes les plus courants rencontrés dans votre service. Cliquez sur un problème de la liste pour afficher dans un volet latéral sa stack trace, les versions de code associées ou encore le nombre total d'occurrences d'erreurs depuis sa création.

{{< img src="tracing/visualization/service/error_tracking_side_panel.jpg" alt="Onglet Error Tracking" style="width:90%;">}}

### Sécurité
Déterminez la posture de sécurité de votre service, en identifiant notamment les vulnérabilités connues exposées dans les bibliothèques du service. Analysez également les signaux de sécurité qui sont créés automatiquement lorsque Datadog détecte une attaque à l'encontre de votre application qui nuit à vos services. Les signaux vous révèlent les menaces conséquentes et vous évitent d'avoir à évaluer chaque tentative d'attaque. Pour en savoir plus, consultez la documentation relative à [Application Security Management][18].

La section supérieure de l'onglet Security contient des graphiques généraux qui indiquent le nombre de vulnérabilités et leur gravité, la chronologie des attaques, leur type ainsi que des informations à propos de la personne à l'origine de l'attaque (IP client ou utilisateur authentifié).

La section suivante du volet répertorie l'ensemble des vulnérabilités et signaux concernant le service. Cliquez sur une vulnérabilité de sécurité pour ouvrir un volet latéral contenant des détails pertinents. Ce volet vous permet d'approfondir votre analyse et de corriger la vulnérabilité. Cliquez sur un signal de sécurité pour obtenir des informations à propos de la menace détectée et découvrir des mesures à prendre pour y répondre.

{{< img src="tracing/visualization/service/security_tab.jpg" alt="Sécurité" style="width:90%;">}}

### Infrastructure
Si votre service s'exécute sur Kubernetes, l'onglet Infrastructure est disponible sur la page Service. Le tableau Kubernetes Pods fournit des informations détaillées en temps réel sur vos pods. Il indique par exemple si l'utilisation de la mémoire est proche de sa limite. Il vous permet également de savoir si les ressources de calcul provisionnées dépassent la valeur requise pour optimiser les performances de l'application. Vous pouvez ainsi optimiser l'allocation des ressources.

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes Pods" style="width:90%;">}}

La section Kubernetes Metrics présente un résumé global de la santé de votre infrastructure pour une période donnée. Elle contient notamment des métriques sur le CPU, la mémoire, le réseau et le disque.

{{< img src="tracing/visualization/service/infra_metrics.png" alt="Kubernetes Metrics" style="width:90%;">}}

Pour les environnements autres que Kubernetes (par exemple une installation basée sur un host), consultez la [documentation relative au tagging de service unifié][13].

### Métriques runtime
Si les métriques runtime sont activées dans le client de tracing, un onglet correspondant au langage du runtime de votre service s'affiche. Pour en savoir plus, consultez la section [Métriques runtime][14].

{{< img src="tracing/visualization/service/runtime_metrics.png" alt="Métriques runtime" style="width:90%;">}}

### Profiling
L'onglet Profiling s'affiche si le [Pprofileur en continu][15] est configuré pour votre service. En haut de l'onglet sont affichées des informations récapitulatives, notamment les versions disponibles et le langage du runtime. En dessous figure les métriques de profiling par défaut selon la version, l'endpoint et la méthode. Elles vous permettent d'identifier et de débugger les méthodes gourmandes en ressources. Cliquez sur n'importe quel graphique pour afficher les traces, les logs et d'autres données associés, ou ouvrez un flamegraph pour analyser le profil du code. [En savoir plus sur APM et le profileur en continu][15].

{{< img src="tracing/visualization/service/profiler.jpg" alt="Profiling" style="width:90%;">}}

### Traces
L'onglet Traces présente la liste des traces associées au service, avec un filtre basé sur votre service, votre environnement et le nom de l'opération. Accédez aux spans problématiques à l'aide de [facettes][16] de base représentant le statut, la ressource ou encore le type d'erreur. Cliquez sur une span pour afficher un flamegraph de sa trace et obtenir plus de détails.

{{< img src="tracing/visualization/service/traces.png" alt="Traces" style="width:90%;">}}

### Logs
Cet onglet présente les patterns courants dans les logs de votre service. Pour filtrer la liste des patterns, utilisez des facettes représentant le statut dans la barre de recherche. Cliquez sur un pattern pour afficher des informations, comme les événements qui ont déclenché la cascade, dans un volet latéral. Pour en savoir plus, consultez l'article sur les [patterns de log] [17] (en anglais).

{{< img src="tracing/visualization/service/log_patterns.png" alt="Patterns de log" style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/glossary/
[2]: /fr/tracing/services/resource_page/
[3]: /fr/monitors/types/apm/
[4]: /fr/tracing/error_tracking/
[5]: /fr/service_management/service_level_objectives/
[6]: /fr/service_management/incident_management/
[7]: /fr/watchdog/
[8]: /fr/tracing/metrics/metrics_namespace/
[9]: /fr/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[10]: /fr/dashboards/
[11]: /fr/tracing/glossary/#resources
[12]: /fr/tracing/services/deployment_tracking/#versions-deployed
[13]: /fr/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /fr/tracing/metrics/runtime_metrics/
[15]: /fr/profiler/
[16]: /fr/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /fr/security/application_security/how-appsec-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/