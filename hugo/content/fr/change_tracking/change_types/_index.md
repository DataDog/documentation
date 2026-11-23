---
description: Découvrez quels types de changements Change Tracking surveille, de quelle
  fonctionnalité Datadog provient chaque type et comment activer son suivi.
title: Types de changements suivis
---
Change Tracking collecte les changements provenant de plusieurs produits Datadog. Il n'existe pas de produit Change Tracking distinct à acheter et, dans la plupart des cas, aucun Agent ni aucune intégration distincte à installer. Si vous envoyez la télémétrie sous-jacente, les changements sont déjà suivis.

Utilisez les informations sur cette page pour confirmer :

- De quelle fonctionnalité Datadog provient le type de changement.
- Ce que vous devez configurer, le cas échéant.

## Types de changements pris en charge {#supported-change-types}

### Déploiements{#deployments}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Déploiements de code backend | APM | Un tag `version` doit être présent sur le service. Consultez [Unified Service Tagging][11] pour configurer le tag. |
| Déploiements frontend | RUM | Configurez [RUM deployment tracking][2]. |
| Mises à jour des manifestes de déploiement Kubernetes | Datadog Agent sur Kubernetes | Ajoutez un label `service` à votre YAML Kubernetes si possible. |

### Feature flags {#feature-flags}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Datadog Feature Flags | Datadog Feature Flags | Suivis automatiquement. |
| LaunchDarkly | LaunchDarkly integration | Configurez [LaunchDarkly integration][3]. |
| Tout autre fournisseur de feature flags | Events API | Envoyez les changements de feature flags sous forme d'événements personnalisés via l'[Events API][4]. |
| Évaluations de feature flags frontend | RUM | Configurez [RUM feature flag tracking][5]. |

Consultez [Track Feature Flag Changes][6] pour la configuration et les options avancées.

### Changements de l'infrastructure {#infrastructure-changes}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Changements des ressources cloud et de la configuration (AWS) {{< tooltip text="in Preview" tooltip="Cette fonctionnalité est en préversion et limitée à un petit échantillon de changements de ressources cloud. Pour demander l'accès, consultez la documentation Resource Collection." >}} | Infrastructure Monitoring | Activez [Resource Collection][12] et, éventuellement, le transfert des événements du fournisseur cloud. |
| Événements de mise à l'échelle des déploiements Kubernetes | Intégration Kubernetes | Activez [Kubernetes audit logging][13]. |
| Plantages de pods en état CrashLoopBackOff | Intégration Kubernetes | Ajoutez un label `service` à votre YAML Kubernetes lorsque cela est possible. |

### Changements de base de données {#database-changes}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Changements des schémas PostgreSQL, SQL Server et MySQL | Database Monitoring | Consultez [Exploring Database Schemas][7] et [Correlate Database Monitoring and Traces][8]. |
| Changements des index et des index de recherche MongoDB, et des paramètres PostgreSQL et SQL Server | Database Monitoring | [Correlate Database Monitoring and Traces][8]. |

Consultez [Database Monitoring][14] pour la configuration et les options avancées.

### Comportement des flux de données et des applications {#streaming-and-application-behavior}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Mises à jour des schémas Kafka | Data Streams Monitoring | Configurez [Data Streams Monitoring][9]. |
| Pics de trafic | APM | Suivis automatiquement par [APM][15]. |
| Alertes Watchdog | Watchdog | Suivies automatiquement. Consultez [Watchdog][10] pour connaître les exigences propres à chaque alerte. |

### Changements personnalisés {#custom-changes}

| Type de changement | Provient de | Comment activer |
| --- | --- | --- |
| Tout autre changement que vous souhaitez suivre | Events API | Envoyez des événements de changement à l'aide de l'[Events API][4]. |

[2]: /fr/real_user_monitoring/guide/setup-rum-deployment-tracking/
[3]: /fr/integrations/launchdarkly/#setup
[4]: /fr/api/latest/events/
[5]: /fr/real_user_monitoring/feature_flag_tracking/
[6]: /fr/change_tracking/change_types/feature_flags/
[7]: /fr/database_monitoring/schema_explorer/
[8]: /fr/database_monitoring/connect_dbm_and_apm/
[9]: /fr/data_streams/
[10]: /fr/watchdog/
[11]: /fr/getting_started/tagging/unified_service_tagging/
[12]: /fr/infrastructure/resource_catalog/resource_changes/
[13]: /fr/integrations/kubernetes_audit_logs/
[14]: /fr/database_monitoring/
[15]: /fr/tracing/