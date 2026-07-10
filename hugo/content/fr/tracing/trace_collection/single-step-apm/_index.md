---
aliases:
- /fr/tracing/trace_collection/admission_controller/
- /fr/tracing/trace_collection/library_injection_local/
- /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/
further_reading:
- link: /tracing/metrics/runtime_metrics/
  tag: Documentation
  text: Activer les métriques d'exécution
- link: /tracing/guide/injectors
  tag: Documentation
  text: Comprendre le comportement de l'injecteur avec l'instrumentation par étape
    unique
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
  tag: Documentation
  text: Dépannage de l'APM par étape unique
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Centre d'apprentissage
  text: Dépannage de l'instrumentation APM sur un hôte
- link: /tracing/guide/local_sdk_injection
  tag: Documentation
  text: Instrumentez vos applications en utilisant l'injection locale de SDK
- link: https://www.datadoghq.com/blog/datadog-csi-driver/
  tag: Blog
  text: Apportez une observabilité haute performance aux environnements Kubernetes
    sécurisés avec le pilote CSI de Datadog
- link: https://www.datadoghq.com/blog/rum-apm-single-step
  tag: Blog
  text: Activez la visibilité de bout en bout dans vos applications Java avec une
    seule commande
title: Instrumentation APM en une étape
---
## Aperçu {#overview}

L'instrumentation par étape unique (SSI) installe automatiquement les SDK Datadog sans configuration supplémentaire requise, réduisant le temps d'intégration de plusieurs jours à quelques minutes.

Pour en savoir plus sur son fonctionnement, consultez le [guide de l'injecteur pour l'instrumentation par étape unique][8].

## Prérequis {#prerequisites}

1. Supprimez tout code d'instrumentation personnalisé de votre application et redémarrez-la. La SSI est automatiquement désactivée si une instrumentation personnalisée est détectée.
1. Confirmez la compatibilité de l'environnement en consultant le [guide de compatibilité SSI][18] pour les langages, systèmes d'exploitation et architectures pris en charge.

## Instrumentation des SDK dans les applications {#instrument-sdks-across-applications}

Lorsque vous [installez ou mettez à jour l'Agent Datadog][1] avec **l'instrumentation APM** activée, l'Agent instrumente vos applications en chargeant le SDK Datadog dans les processus pris en charge. Cela permet le traçage distribué en capturant et en envoyant des données de trace depuis vos services sans nécessiter de modifications de code.

Après l'instrumentation, vous pouvez optionnellement :
- [configurer les balises de service unifiées (USTs)][14]
- activer des produits et fonctionnalités supplémentaires dépendants du SDK, tels que Continuous Profiler ou Application Security Monitoring

Cliquez sur l'une des tuiles suivantes pour apprendre à configurer SSI pour votre type de déploiement :

{{< card-grid card_width="170px" image_width="200" >}}
  {{< image-card href="linux/" src="integrations_logos/linux.png" alt="linux" >}}
  {{< image-card href="docker/" src="integrations_logos/docker.png" alt="docker" >}}
  {{< image-card href="kubernetes/" src="integrations_logos/kubernetes.png" alt="kubernetes" >}}
  {{< image-card href="windows/" src="integrations_logos/windows.png" alt="windows" >}}
{{< /card-grid >}}

<br>

## Dépannage {#troubleshooting}

Si vous rencontrez des problèmes pour activer APM avec SSI, consultez le [guide de dépannage SSI][15].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /fr/tracing/metrics/runtime_metrics/
[3]: /fr/internal_developer_portal/catalog/
[4]: /fr/tracing/glossary/#instrumentation
[5]: /fr/containers/cluster_agent/admission_controller/
[6]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility
[7]: /fr/tracing/trace_collection/custom_instrumentation/
[8]: /fr/tracing/guide/injectors
[9]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=installingwithdatadogoperator#configure-instrumentation-for-namespaces-and-pods
[10]: /fr/tracing/trace_collection/library_config/
[11]: /fr/tracing/metrics/runtime_metrics/
[12]: /fr/internal_developer_portal/catalog/
[13]: /fr/tracing/glossary/#instrumentation
[14]: /fr/getting_started/tagging/unified_service_tagging
[15]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[16]: /fr/tracing/trace_collection/custom_instrumentation/
[17]: /fr/tracing/trace_collection/library_config/application_monitoring_yaml/
[18]: /fr/tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/