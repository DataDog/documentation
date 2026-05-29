---
aliases:
- /fr/tracing/universal_service_monitoring/
cascade:
  algolia:
    rank: 70
description: Surveillez les métriques de santé des services sur l'ensemble de votre
  stack sans instrumentation de code en utilisant la Surveillance Universelle des
  Services et l'Agent Datadog.
further_reading:
- link: /universal_service_monitoring/setup/
  tag: Documentation
  text: Configuration de la Surveillance Universelle des Services
- link: https://www.datadoghq.com/blog/universal-service-monitoring-datadog/
  tag: Blog
  text: Récupérez en quelques secondes des signaux clés avec Universal Service Monitoring
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Tagging de serice unifié
- link: /tracing/software_catalog/
  tag: Documentation
  text: Découvrez et cataloguez les services rapportant à Datadog
- link: /tracing/services/service_page/
  tag: Documentation
  text: En savoir plus sur les services dans Datadog
- link: /tracing/services/services_map/
  tag: Documentation
  text: En savoir plus sur la Service Map
- link: https://www.datadoghq.com/blog/monitor-connection-churn-datadog/
  tag: Blog
  text: Meilleures pratiques pour surveiller et remédier au connection churn.
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: Blog
  text: Améliorez l'expérience des développeurs et la collaboration avec le Catalogue
    de logiciels
- link: https://learn.datadoghq.com/courses/getting-started-usm
  tag: Centre d'apprentissage
  text: Prise en main de la Surveillance Universelle des Services (USM)
title: Universal Service Monitoring
---
## Aperçu {#overview}

La Surveillance Universelle des Services (USM) fournit une visibilité sur vos métriques de santé des services de manière universelle sur l'ensemble de votre stack _sans avoir à instrumenter votre code_. Elle repose uniquement sur la présence d'un Agent Datadog configuré et [Unified Service Tagging][1], et apporte des données de performance sur vos services non instrumentés dans des vues telles que le Catalogue de logiciels et la Carte des Services. L'USM fonctionne également avec [Deployment Tracking][2], Monitors, Dashboards et SLOs.

{{< img src="universal_service_monitoring/usm-demo.mp4" alt="Vidéo démontrant la Surveillance Universelle des Services. Un aperçu d'un service est accessible en cliquant sur un service sur la Carte des services et en sélectionnant Voir l'aperçu du service." video="true" >}}

## Configuration {#setup}

Pour des informations sur les plateformes et protocoles pris en charge, et pour des instructions sur la mise en route, lisez [Setting Up Universal Service Monitoring][7].

<div class="alert alert-info"><strong>Preview : Protocoles supplémentaires et méthodes de chiffrement</strong><p>L'USM est en preview pour découvrir des services cloud et pour décoder des protocoles supplémentaires ainsi que des méthodes de chiffrement du trafic. Pour plus d'informations et pour demander l'accès, lisez <a href="/universal_service_monitoring/additional_protocols/">Cloud Service Discovery and Additional Protocols</a>.</p></div>

## Tagging automatique des services {#automatic-service-tagging}

La Surveillance Universelle des Services détecte automatiquement les services fonctionnant dans votre infrastructure. S'il ne trouve pas de [unified service tags][1], il leur attribue un nom basé sur l'un des tags : `app`, `short_image`, `kube_container_name`, `container_name`, `kube_deployment`, `kube_service`.

Pour mettre à jour le nom du service, configurez [Unified Service Tagging][1].

{{< img src="universal_service_monitoring/automatic-service-tagging.png" alt="Lorsque Datadog détecte automatiquement vos services, le tag utilisé pour cela est affiché en haut de la page du service." style="width:80%;" >}}

## Explorer vos services {#exploring-your-services}

Après avoir configuré l'Agent, attendez environ cinq minutes pour que votre service apparaisse dans le Catalogue de logiciels. Cliquez sur le service pour voir la page des détails du service. Un nom d'opération de `universal.http.server` ou `universal.http.client` dans le coin supérieur gauche indique que la télémétrie du service provient de la Surveillance Universelle des Services.

Le nom d'opération `universal.http.server` capture les métriques de santé pour le trafic entrant vers votre service. Le nom d'opération correspondant `universal.http.client` représente le trafic sortant vers d'autres destinations.

{{< img src="universal_service_monitoring/select_service_operation_cropped.png" alt="Le menu déroulant des opérations dans l'onglet Services montre les noms d'opération disponibles." style="width:100%;" >}}

Une fois la solution Universal Service Monitoring activée, vous pouvez :


- Naviguez vers **APM** > **Catalogue de logiciels** ou **APM** > **Carte des services** pour [visualiser vos services et leurs dépendances][3].

- Cliquez sur les pages de service spécifiques pour voir les métriques des signaux principaux (demandes, erreurs et durée), et corrélez-les avec les récents changements de code grâce à [Deployment Tracking][2].

- Créez [monitors][4], [dashboards][5] et [SLOs][6] à l'aide des métriques `universal.http.*`.



## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/tracing/services/deployment_tracking/
[3]: /fr/tracing/software_catalog/
[4]: /fr/monitors/types/apm/?tab=apmmetrics
[5]: /fr/dashboards/
[6]: /fr/service_level_objectives/metric/
[7]: /fr/universal_service_monitoring/setup/