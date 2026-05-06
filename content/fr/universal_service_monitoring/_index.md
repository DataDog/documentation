---
aliases:
- /fr/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
description: Surveillez les métriques de santé des services sur l'ensemble de votre
  infrastructure sans instrumentation de code en utilisant la Surveillance Universelle
  des Services et l'Agent Datadog.
further_reading:
- link: /universal_service_monitoring/setup/
  tag: Documentation
  text: Configuration de la Surveillance Universelle des Services
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: GitHub
  text: Récupérez en quelques secondes des signaux clés avec Universal Service Monitoring
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Tagging de serice unifié
- link: /tracing/software_catalog/
  tag: Documentation
  text: Découvrez et recensez les services qui transmettent des rapports à Datadog.
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/services_map/
  tag: Documentation
  text: En savoir plus sur la Service Map
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: GitHub
  text: Meilleures pratiques pour surveiller et remédier à l'instabilité des connexions.
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: GitHub
  text: Améliorez l'expérience des développeurs et la collaboration avec Software
    Catalog.
- link: https://learn.datadoghq.com/courses/getting-started-usm
  tag: Centre d'apprentissage
  text: Premiers pas avec Universal Service Monitoring (USM)
title: Universal Service Monitoring
---
## Aperçu {#overview}

Universal Service Monitoring (USM) vous permet de visualiser les métriques de santé de vos services sur l'ensemble de votre infrastructure _sans avoir à instrumenter votre code_. Elle repose uniquement sur la présence d'un Datadog Agent configuré et de [Unified Service Tagging][1], et fournit des données de performance sur vos services non instrumentés dans des vues telles que Software Catalog et Service Map. L'USM fonctionne également avec [Deployment Tracking][2], Monitors, Dashboards et SLOs.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Vidéo démontrant la Surveillance Universelle des Services. Un aperçu d'un service est accessible en cliquant sur un service sur le Service Map et en sélectionnant View service overview." video="true" >}}

## Configuration {#setup}

Pour obtenir des informations sur les plateformes et protocoles pris en charge, ainsi que des instructions pour bien démarrer, consultez [Setting Up Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Preview : Additional protocols and encryption methods</strong><p>L'USM est en Preview pour découvrir des cloud services et pour décoder des protocoles supplémentaires ainsi que des méthodes de cryptage du trafic. Pour plus d'informations et pour demander l'accès, lisez <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>

## Tagging automatique des services {#automatic-service-tagging}

La Surveillance Universelle des Services détecte automatiquement les services fonctionnant dans votre infrastructure. S'il ne trouve pas de [tags de service unifiés][1], il leur attribue un nom basé sur l'un des tags : `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

Pour mettre à jour le nom du service, configurez [Unified Service Tagging][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Lorsque Datadog détecte automatiquement vos services, le tag utilisé pour cela est affiché en haut de la page du service." style="width:80%;" >}}

## Explorer vos services {#exploring-your-services}

Après avoir configuré l'Agent, attendez environ cinq minutes pour que votre service apparaisse dans Software Catalog. Cliquez sur le service pour voir la service details page. Un nom d'opération de `universal.http.server` ou `universal.http.client` dans le coin supérieur gauche indique que la télémétrie du service provient de Universal Service Monitoring.

Le nom d'opération `universal.http.server` capture les métriques de santé pour le trafic entrant vers votre service. Le nom d'opération correspondant `universal.http.client` représente le trafic sortant vers d'autres destinations.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="Le menu déroulant des opérations dans l'onglet Services montre les noms d'opération disponibles." style="width:100%;" >}}

Une fois la solution Universal Service Monitoring activée, vous pouvez :


- Naviguez vers **APM** > **Software Catalog** ou **APM** > **Service Map** pour [visualiser vos services et leurs dépendances][3].

- Cliquez sur des pages de service spécifiques pour voir les golden signal metrics (requests, errors, and duration), et corrélez-les avec les récents changements de code grâce à [Deployment Tracking][2].

- Créez des [monitors][4], des [dashboards][5] et des [SLOs][6] en utilisant les métriques de `universal.http.*`.



## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/tracing/services/deployment_tracking/
[3]: /fr/tracing/software_catalog/
[4]: /fr/monitors/types/apm/?tab=apmmetrics
[5]: /fr/dashboards/
[6]: /fr/service_level_objectives/metric/
[7]: /fr/universal_service_monitoring/setup/