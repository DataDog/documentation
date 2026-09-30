---
description: Rationalisez vos processus de dépannage grâce au suivi des changements,
  en surveillant vos déploiements, feature flags, changements de configuration et
  autres changements apportés à vos services.
further_reading:
- link: /monitors/status/
  tag: Documentation
  text: Page Monitor Status
- link: /dashboards/
  tag: Documentation
  text: Dashboards
- link: /tracing/services/service_page/
  tag: Documentation
  text: Page Service
- link: /api/latest/events/
  tag: Documentation
  text: API Event Management
- link: /tracing/services/deployment_tracking/
  tag: Documentation
  text: Suivi des déploiements
- link: /integrations/launchdarkly/#integration-de-suivi-des-feature-flags
  tag: Documentation
  text: LaunchDarkly
- link: /watchdog/
  tag: Documentation
  text: Watchdog
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /data_streams/
  tag: Documentation
  text: Data Streams Monitoring
- link: https://www.datadoghq.com/blog/change-tracking/
  tag: Blog
  text: Unifier la visibilité sur les changements apportés à vos services et dépendances
title: Suivi des changements
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le suivi des changements n'est pas disponible pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Présentation

Le suivi des changements rationalise vos processus de dépannage et de gestion des incidents en présentant les changements pertinents apportés à votre service et à ses dépendances. Cela vous permet de détecter plus rapidement les problèmes qui surviennent et de réagir instantanément.

{{< img src="/change_tracking/change-tracking-overview-2.png" alt="Les détails d'un changement dans la chronologie Recent Changes du résumé d'un service" style="width:100%;" >}}

Le suivi des changements permet de surveiller un grand nombre de modifications apportées à votre service et à ses dépendances, notamment ce qui suit :
- Déploiements
- [Feature Flags][14]
- Pics de trafic
- Changements de configuration
- Changements apportés aux bases de données
- Changements de schéma
- Ajustements d'échelle
- Ajustements Kubernetes
- Crashs de pod Kubernetes
- Alertes Watchdog

Pour en savoir plus sur les types de changements spécifiques pris en charge, et sur les exigences relatives à la configuration, consultez la rubrique [Changements surveillés](#changements-surveilles).

## Utilisation du suivi des changements

Le suivi des changements est disponible sur plusieurs pages du site Datadog :

### Page Monitor Status

Visualisez et analysez les changements depuis la [page Monitor Status][1].

{{< img src="/change_tracking/change-tracking-monitor-status-page-2.png" alt="Fonctionnalité de suivi des changements affichée sur la page Monitor Status" style="width:100%;" >}}

#### Prérequis

Pour utiliser le suivi des changements sur la page Monitor Status, vérifiez que le service pertinent a été :
- spécifié dans la requête de monitor ;
- sélectionné dans le cadre d'un groupe ;
- ajouté en tant que tag `service` sur le monitor.

#### Pour analyser les changements depuis la page Monitor Status, procédez comme suit :

1. Accédez à la page Monitor Status du monitor à analyser.
1. Repérez la chronologie de suivi des changements en haut de la page.
   - Pour les moniteurs comportant plusieurs graphiques (basés sur le paramètre group by de la requête de monitor), appliquez un filtre correspondant à un groupe individuel.
1. Utilisez la chronologie et les graphiques d'événements pour établir une corrélation entre les événements de changement et l'alerte.
1. Cliquez sur l'indicateur de changement dans la chronologie pour afficher plus de détails sur le changement dans le volet latéral.
1. Depuis le volet latéral, vous pouvez analyser plus de détails sur le changement et effectuer les opérations suivantes :
   - Visualiser le déploiement dans votre système CI/CD
   - Afficher les dernières commits de votre référentiel
   - Comparer les changements entre les déploiements pour identifier les problèmes potentiels
   - Configurer des liens personnalisés supplémentaires dans le volet latéral des déploiements pour accéder rapidement à d'autres ressources qui vous sont pertinentes

### Services

Visualisez et analysez les changements depuis la [page Service][2].

{{< img src="/change_tracking/change-tracking-service-page-2.png" alt="Composant Recent Changes dans la section Service Summary, avec les changements apportés aux dépendances affichés" style="width:100%;" >}}

#### Pour analyser les changements de la page Service, procédez comme suit :

1. Naviguez jusqu'à la page Service de votre choix.
1. Repérez la chronologie des changements à la section **Service Summary**.
1. Utilisez les onglets du service et des dépendances pour afficher l'un des types de changements suivants :
   - Changements s'appliquant seulement au service spécifique (**Changes by Service**)
   - Changements s'appliquant au service spécifique et aux services dépendants susceptibles d'avoir un impact sur ce service (**Changes by Service + Dependencies**)
1. Cliquez sur l'indicateur de changement pour afficher des informations détaillées et prendre des mesures correctives.

### Dashboards

Visualisez et analysez les changements depuis n'importe quel [dashboard][3].

{{< img src="/change_tracking/change-tracking-dashboard-show-overlays-active-2.png" alt="Fonctionnalité de suivi des changements affichée dans un dashboard" style="width:100%;" >}}

#### Prérequis
Pour afficher les changements pertinents dans la chronologie et sous forme de superpositions sur votre dashboard, assurez-vous d'avoir configuré au moins un widget de série temporelle.

#### Pour analyser les changements depuis des dashboards, procédez comme suit :

1. Accédez à votre dashboard.
2. Cliquez sur **Show Overlays** en haut de la page pour activer la chronologie et les superpositions de changement dans les widgets compatibles.
3. Passez le curseur sur un indicateur de changement ou une superposition pour afficher une synthèse du changement.
4. Cliquez sur l'indicateur de changement ou la superposition pour afficher des informations détaillées et prendre des mesures correctives.

## Changements surveillés
Le suivi des changements permet de surveiller les types de changements suivants dans l'ensemble de votre infrastructure :

| Type de changement                                                                      | Exigences pour le suivi                                                                                                                                                                   |
|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Déploiements du code (APM)                                                           | APM & [suivi des déploiements][4]. Une version doit être disponible sur le service.                                                                                                             |
| Mises à jour du manifeste de déploiement Kubernetes                                           | Configuration de l'Agent Datadog pour Kubernetes (ajoutez une étiquette de service au fichier YAML Kubernetes si possible)                                                                                             |
| Feature Flags                                                                    | Utilisez l'intégration LaunchDarkly ou envoyez des événements personnalisés à l'aide de l'API Events. Référez-vous à la [documentation relative au suivi des feature flags][14] pour consulter la configuration et les options avancées.                          |
| Événements de changement de configuration personnalisés                                               | [API Event Management][6].                                                                                                                                                               |
| Alertes Watchdog (pics de taux d'erreur, pics de latence, pannes du cloud et de l'API, etc.) | Consultez la documentation [Watchdog][7] pour en savoir plus sur les exigences relatives aux alertes spécifiques à Watchdog.                                                                                          |
| Pics de trafic (APM)                                                             | [Application Performance Monitoring (APM)][15]
| Crashs des pods Kubernetes CrashLoopBackOff                                          | Intégration Kubernetes (ajoutez une étiquette de service au fichier YAML Kubernetes si possible)                                                                                                          |
| Changements apportés aux tables de base de données (schémas) PostgreSQL, SQL Server et MySQL                 | Consultez la section [Exploration des schémas de base de données][12] pour en savoir plus sur le suivi des schémas à l'aide de DBM et la section [Associer la fonctionnalité Database Monitoring aux traces][10] pour configurer la corrélation entre APM et DBM. |
| Changements relatifs à l'index et au SearchIndex MongoDB                                              | [Database Monitoring (DBM)][8], [Associer la fonctionnalité Database Monitoring aux traces][10]                                                                                                          |
| Changements relatifs aux réglages de base de données PostgreSQL                                              | [Database Monitoring (DBM)][8], [Associer la fonctionnalité Database Monitoring aux traces][10]                                                                                                          |
| Changements relatifs aux réglages de base de données SQL Server                                              | [Database Monitoring (DBM)][8], [Associer la fonctionnalité Database Monitoring aux traces][10]                                                                                                          |
| Mises à jour de schéma Kafka                                                             | [Data Streams Monitoring (DSM)][9]                                                                                                                                                      |
| Événements de mise à l'échelle manuelle de déploiement Kubernetes                                        | Journalisation de l'audit Kubernetes                                                                                                                                                               |
| Changements relatifs aux ressources de l'infrastructure cloud ({{< tooltip text="en préversion" tooltip="Cette fonctionnalité est disponible en préversion et est limitée à un faible échantillon de changements de ressource cloud. Pour demander un accès, consultez la documentation relative aux changements de ressource, dont le lien figure dans les exigences de suivi." >}}) | [Changements de ressource][13] : activez la collecte des ressources et, si vous le souhaitez, le transfert des événements depuis le fournisseur cloud

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/status/
[2]: /fr/tracing/services/service_page/
[3]: /fr/dashboards/
[4]: /fr/tracing/services/deployment_tracking/
[5]: /fr/integrations/launchdarkly/#feature-flag-tracking-integration/
[6]: /fr/api/latest/events/
[7]: /fr/watchdog/
[8]: /fr/database_monitoring/
[9]: /fr/data_streams/
[10]: /fr/database_monitoring/connect_dbm_and_apm/
[11]: /fr/service_management/workflows/connections/#work-with-connections
[12]: /fr/database_monitoring/schema_explorer
[13]: /fr/infrastructure/resource_catalog/resource_changes/
[14]: /fr/change_tracking/feature_flags
[15]: /fr/tracing