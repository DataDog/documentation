---
description: Exigences et considérations pour l'envoi double des données de Workload
  Protection vers deux organisations Datadog.
disable_toc: false
further_reading:
- link: /agent/configuration/dual-shipping/
  tag: Documentation
  text: Transmission multiple
- link: /account_management/multi_organization/
  tag: Documentation
  text: Gestion des comptes multi-organisations
- link: /infrastructure/
  tag: Documentation
  text: Infrastructure Monitoring
title: Expédiez en toute sécurité Workload Protection simultanément vers plusieurs
  organisations
---
Ce guide explique pourquoi et comment envoyer en double les données de Workload Protection vers deux organisations Datadog, par exemple une organisation principale utilisée par les équipes de plateforme et une seconde organisation utilisée uniquement par les équipes de sécurité.

{{< partial name="security-platform/WP-billing-note.html" >}}

## Pourquoi envoyer en double les données de Workload Protection ? {#why-dual-ship-workload-protection-data}

[Dual shipping][1] envoie les mêmes événements d'exécution de Workload Protection depuis un seul Datadog Agent vers deux organisations. Ceci est utile lorsque différentes équipes ont besoin d'accéder à des données différentes dans Datadog. Par exemple, une équipe de sécurité a besoin de signaux, de résultats et de workflows d'investigation de Workload Protection, tandis que les équipes de plateforme ou d'application de l'organisation principale ne doivent pas voir les données de sécurité.

Dans chaque organisation de destination, activez Workload Protection afin que Datadog puisse analyser les événements d'exécution entrants et générer des signaux et des résultats.

## Exigence Infrastructure Monitoring : {#infrastructure-monitoring-requirement}

<div class="alert alert-warning">
Datadog déconseille d'exécuter Workload Protection sur une organisation ou une sous-organisation qui n'a pas activé Infrastructure Monitoring.
</div>

Workload Protection s'appuie sur [Infrastructure Monitoring][2] pour offrir une expérience complète :

- Les règles backend enrichissent les événements de l'Agent avec un **contexte d'infrastructure** (fournisseur cloud, host, cluster Kubernetes, conteneur et image), ce qui alimente les workflows de détection, de résultats et d'investigation.
- **Les tags de host et de conteneur** délimitent le déploiement des politiques et les filtres de règles dans votre environnement.
- La page [Coverage][3] et les workflows d'investigation basculent vers des vues d'infrastructure pour identifier les hosts non protégés et reconstruire les scénarios d'attaque.

Sans Infrastructure Monitoring, l'expérience Workload Protection est incomplète.

## Envoi double et sous-organisations {#dual-shipping-and-sub-organizations}

Pour configurer l'envoi double, consultez la documentation suivante :

- [Dual Shipping][1] : configuration de l'Agent pour les événements d'exécution, les métriques d'infrastructure et d'autres types de télémétrie de Workload Protection. Consultez la section [Workload Protection][1] pour les paramètres `runtime_security_config.endpoints`.
- [Managing Multiple-Organization Accounts][4] : fonctionnement des sous-organisations, y compris l'isolation des données entre les organisations et le suivi de l'utilisation depuis une organisation parente.

<div class="alert alert-warning">
L'envoi double peut affecter la facturation si vous envoyez des données à plusieurs organisations Datadog. Pour plus d'informations, contactez <a href="/help/">le support Datadog</a>.
</div>

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/dual-shipping/
[2]: /fr/infrastructure/
[3]: /fr/security/workload_protection/inventory/
[4]: /fr/account_management/multi_organization/