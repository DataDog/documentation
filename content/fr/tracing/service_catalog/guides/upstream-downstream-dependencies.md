---
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Catalogue des services Datadog
kind: guide
title: Visualiser les dépendances en amont et en aval pendant un incident actif
---

Le catalogue des services s'intègre aux outils de gestion des incidents, tels que la solution [Incident Management Datadog][1] et [PagerDuty][2]. Pour en savoir plus sur les incidents en cours connexes, ouvrez l'onglet **Reliability** sur la page des détails du service.

{{< img src="tracing/service_catalog/svc_cat_reliability.png" alt="Onglet Reliability de la page des détails de service du catalogue des services." >}}

Les Incidents Datadog sont automatiquement associés au catalogue des services. Afin de garantir l'exactitude des données des incidents d'un service, appliquez les tags `SERVICE` appropriés aux incidents. Pour utiliser l'intégration d'incidents PagerDuty, vous devez configurer l'[intégration PagerDuty][2].

Pour connaître le statut des incidents des dépendances en amont et en aval de votre service, cliquez sur le service dans le catalogue des services. Sélectionnez ensuite l'onglet **Dependencies** sur la page des détails du service.

{{< img src="tracing/service_catalog/svc_cat_dependencies.png" alt="Onglet Dependencies de la page des détails de service du catalogue des services." >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/incident_management/
[2]: /fr/integrations/pagerduty/