---
further_reading:
- link: https://www.datadoghq.com/blog/zendesk-cost-optimization/#measuring-the-impact-of-our-optimizations
  tag: Blog
  text: 'Optimiser Datadog à grande échelle : observabilité rentable chez Zendesk'
title: Métriques d'estimation d'utilisation
---
<style>tbody code {word-break: break-word !important;}</style>

## Aperçu {#overview}

Datadog calcule votre utilisation estimée actuelle en temps quasi réel. Les métriques d'utilisation estimée vous permettent de :

* Tracez votre utilisation estimée
* Créer des [moniteurs][3] autour de votre utilisation estimée en fonction des seuils de votre choix
* Recevez des [alertes de moniteur][4] en cas de pics ou de baisses de votre utilisation
* Évaluez l'impact potentiel des modifications de code sur votre utilisation en temps quasi réel

**Remarque** : Ces métriques d'utilisation sont des estimations qui ne correspondent pas toujours à l'utilisation facturable en raison de leur nature en temps réel. Il y a en moyenne une différence de 10 à 20 % entre l'utilisation estimée et l'utilisation facturable. En raison de la nature des estimations, la marge d'erreur est plus grande pour une faible utilisation.

{{< img src="account_management/billing/usage-metrics-01.png" alt="Exemple de tableau de bord" >}}

## Types d'utilisation {#types-of-usage}

Les métriques d'estimation de l'utilisation sont généralement disponibles pour les types d'utilisation suivants :

| Type d'utilisation                    | Métrique                                   | Description |
|-------------------------------|------------------------------------------| ----------- |
| Hôtes d'infrastructure          | `datadog.estimated_usage.hosts`, `datadog.estimated_usage.hosts.by_tag`          | Hôtes uniques vus dans la dernière heure. |
| Conteneurs                    | `datadog.estimated_usage.containers`, `datadog.estimated_usage.containers.by_tag`     | Conteneurs uniques vus dans la dernière heure. |
| Tâches Fargate                 | `datadog.estimated_usage.fargate_tasks`, `datadog.estimated_usage.fargate_tasks.by_tag`  | Tâches Fargate uniques vues dans les 5 dernières minutes.<br/><br/>**Remarque** : Cette métrique suit à la fois l'utilisation ECS Fargate et EKS Fargate. |
| Métriques personnalisées indexées        | `datadog.estimated_usage.metrics.custom`, `datadog.estimated_usage.metrics.custom.by_metric`, `datadog.estimated_usage.metrics.custom.by_tag`  | Métriques personnalisées indexées uniques vues dans la dernière heure. |
| Métriques personnalisées ingérées       | `datadog.estimated_usage.metrics.custom.ingested`, `datadog.estimated_usage.metrics.custom.ingested.by_metric`, `datadog.estimated_usage.metrics.custom.ingested.by_tag`  | Métriques personnalisées ingérées uniques vues dans la dernière heure. |
| (Aperçu) Points de métriques personnalisées indexées | `datadog.estimated_usage.metrics.points.indexed`, `datadog.estimated_usage.metrics.points.indexed.by_tag`, `datadog.estimated_usage.metrics.points.indexed.hourly` | Points indexés estimés pour les métriques personnalisées. |
| (Aperçu) Points de métriques personnalisées ingérés | `datadog.estimated_usage.metrics.points.ingested`, `datadog.estimated_usage.metrics.points.ingested.hourly` | Points ingérés estimés pour les métriques personnalisées. |
| (Aperçu) Noms de métriques facturables | `datadog.estimated_usage.billable.metrics` | Nombre de noms de métriques avec plus de 100 points indexés, depuis le début du mois. S'applique aux organisations sur [Tarification des noms de métriques][7]. |
| (Aperçu) Points indexés facturables | `datadog.estimated_usage.billable.points` | Somme des points indexés au-delà des 10 millions de points inclus par nom de métrique, depuis le début du mois. S'applique aux organisations sur [Tarification des noms de métriques][7]. |
| (Aperçu) Ratio de points ingérés à indexés | `datadog.estimated_usage.metrics.points.ratio` | Comparaison du total des points ingérés par rapport au total des points indexés. S'applique aux organisations sur [Tarification des noms de métriques][7]. |
| Octets de journaux ingérés | `datadog.estimated_usage.logs.ingested_bytes` | Total de l'ingestion de journaux en octets. |
| Événements de journaux ingérés | `datadog.estimated_usage.logs.ingested_events` | Nombre total d'événements ingérés, y compris les journaux exclus. |
| Octets de pipelines de journaux | `datadog.estimated_usage.logs.ingested_bytes` | Nombre de journaux correspondants par les pipelines en octets. |
| Événements de pipelines de journaux | `datadog.estimated_usage.logs.ingested_events` | Nombre d'événements correspondants par les pipelines en octets, y compris les journaux exclus. |
| Événements de journaux supprimés | `datadog.estimated_usage.logs.drop_count` | Nombre total d'événements supprimés lors de l'ingestion. |
| Événements de journaux tronqués | `datadog.estimated_usage.logs.truncated_count` | Nombre total d'événements tronqués lors de l'ingestion. |
| Octets d'événements de journaux tronqués | `datadog.estimated_usage.logs.truncated_bytes` | Volume d'événements tronqués en octets. |
| Événements de journaux de suivi des erreurs | `datadog.estimated_usage.error_tracking.logs.events` | Volume de journaux d'erreurs ingérés dans le suivi des erreurs. |
| Journaux analysés (sécurité) | `datadog.estimated_usage.security_monitoring.analyzed_bytes` | Total de l'ingestion des journaux Cloud SIEM en octets. |
| Hôtes APM | `datadog.estimated_usage.apm_hosts`, `datadog.estimated_usage.apm_hosts.by_tag` | Hôtes APM uniques vus au cours de la dernière heure. N'inclut pas les hôtes Azure App Services. |
| APM Indexed Spans | `datadog.estimated_usage.apm.indexed_spans` | Nombre total de spans indexés par les filtres de rétention basés sur les balises. |
| APM Ingested Bytes | `datadog.estimated_usage.apm.ingested_bytes` | Volume de spans ingérés en octets. |
| APM Ingested Spans | `datadog.estimated_usage.apm.ingested_spans` | Nombre total de spans ingérés. |
| Tâches APM Fargate             | `datadog.estimated_usage.apm.fargate_tasks`, `datadog.estimated_usage.apm.fargate_tasks.by_tag` | Tâches APM Fargate uniques vues dans les 5 dernières minutes. |
| Sessions RUM                  | `datadog.estimated_usage.rum.sessions` | Nombre total de sessions RUM. |
| Sessions RUM ingérées         | `datadog.estimated_usage.rum.ingested_sessions` | Nombre total de sessions RUM ingérées.<br /><br />**Note** : S'applique à RUM sans limites. |
| Sessions RUM indexées          | `datadog.estimated_usage.rum.indexed_sessions` | Nombre total de sessions RUM indexées par les filtres de rétention.<br /><br />**Note** : S'applique à RUM sans limites. |
| Fonctions Lambda sans serveur   | `datadog.estimated_usage.serverless.aws_lambda_functions`, `datadog.estimated_usage.serverless.aws_lambda_functions.by_tag` | Fonctions sans serveur uniques vues dans la dernière heure. |
| Invocations sans serveur        | `datadog.estimated_usage.serverless.invocations`| Somme des invocations sans serveur dans la dernière heure. |
| Exécutions de tests API         | `datadog.estimated_usage.synthetics.api_test_runs` | Utilisation estimée pour les tests API. |
| Exécutions de tests de navigateur | `datadog.estimated_usage.synthetics.browser_test_runs`| Utilisation estimée pour les tests de navigateur. |
| Slots de test parallèles        | `datadog.estimated_usage.synthetics.parallel_testing_slots` | Utilisation estimée pour les slots de test parallèles. |
| Hôtes réseau                   | `datadog.estimated_usage.network.hosts`, `datadog.estimated_usage.network.hosts.by_tag` | Hôtes CNM uniques vus dans la dernière heure. |
| Network Devices | `datadog.estimated_usage.network.devices`, `datadog.estimated_usage.network.devices.by_tag` | NDM devices uniques vus dans la dernière heure. |
| Hôtes profilés                | `datadog.estimated_usage.profiling.hosts`, `datadog.estimated_usage.profiling.hosts.by_tag` | Hôtes de profilage uniques vus dans la dernière heure. |
| Conteneurs profilés           | `datadog.estimated_usage.profiling.containers`, `datadog.estimated_usage.profiling.containers.by_tag` | Conteneurs de profilage uniques vus dans les 5 dernières minutes. |
| Tâches Profiler Fargate        | `datadog.estimated_usage.profiling.fargate_tasks`, `datadog.estimated_usage.profiling.fargate_tasks.by_tag` | Tâches de profilage Fargate uniques vues dans les 5 dernières minutes. |
| Hôtes CSPM                    | `datadog.estimated_usage.cspm.hosts`, `datadog.estimated_usage.cspm.hosts.by_tag` | Hôtes CSPM uniques vus au cours de la dernière heure. |
| Conteneurs CSPM               | `datadog.estimated_usage.cspm.containers`, `datadog.estimated_usage.cspm.containers.by_tag` | Conteneurs CSPM uniques vus dans les 5 dernières minutes. |
| Hôtes CWS                     | `datadog.estimated_usage.cws.hosts`, `datadog.estimated_usage.cws.hosts.by_tag` | Hôtes CWS uniques vus au cours de la dernière heure. |
| Conteneurs CWS                | `datadog.estimated_usage.cws.containers`, `datadog.estimated_usage.cws.containers.by_tag` | Conteneurs CWS uniques vus dans les 5 dernières minutes. |
| Hôtes de base de données       | `datadog.estimated_usage.dbm.hosts`, `datadog.estimated_usage.dbm.hosts.by_tag` | Hôtes DBM uniques vus au cours de la dernière heure. |
| Hôtes AAP                     | `datadog.estimated_usage.asm.hosts`, `datadog.estimated_usage.asm.hosts.by_tag` | Hôtes AAP uniques vus dans la dernière heure. |
| Tâches AAP                     | `datadog.estimated_usage.asm.tasks`, `datadog.estimated_usage.asm.tasks.by_tag` | Tâches AAP Fargate uniques vues au cours des 5 dernières minutes. |
| Contributeurs du pipeline de visibilité CI | `datadog.estimated_usage.ci_visibility.pipeline.committers` | Contributeurs du pipeline vus depuis le début du mois (calendaire). |
| Contributeurs de tests de visibilité CI | `datadog.estimated_usage.ci_visibility.test.committers` | Contributeurs de tests vus depuis le début du mois (calendaire). |
| Contributeurs de couverture de code | `datadog.estimated_usage.code_coverage.committers` | Contributeurs de couverture de code vus depuis le début du mois (calendaire). |
| Appareils IoT                   | `datadog.estimated_usage.iot.devices`, `datadog.estimated_usage.iot.devices.by_tag` | Appareils IoT uniques vus au cours de la dernière heure. |
| Octets ingérés par les pipelines d'observabilité | `datadog.estimated_usage.observability_pipelines.ingested_bytes` | Volume de données ingérées par les pipelines d'observabilité. |
| Événements personnalisés                 | `datadog.estimated_usage.events.custom_events` | Volume d'événements personnalisés soumis. |
| Événements ingérés               | `datadog.estimated_usage.events.ingested_events` | Volume de données ingérées par les événements. |
| Contributeurs SAST de sécurité du code | `datadog.estimated_usage.code_security.sast.committers` | Contributeurs SAST vus depuis le début du mois (calendaire). |
| Contributeurs SCA de sécurité du code  | `datadog.estimated_usage.code_security.sca.committers`  | Contributeurs SCA vus depuis le début du mois (calendaire).  |
| Hôtes SCA de sécurité du code       | `datadog.estimated_usage.asm.vulnerability_oss_host`, `datadog.estimated_usage.asm.vulnerability_oss_host.by_tag` | Hôtes SCA uniques vus au cours de la dernière heure. |
| Contributeurs de scan de secrets de sécurité du code  | `datadog.estimated_usage.code_security.secrets.committers`  | Contributeurs de scan de secrets vus depuis le début du mois (calendaire).  |
| Contributeurs IaC de sécurité du code  | `datadog.estimated_usage.code_security.iac.committers`  | Contributeurs d'infrastructure en tant que code (IaC) vus depuis le début du mois (calendaire).  |
| Sièges de gestion des incidents  | `datadog.estimated_usage.incident_management.seats`  | Sièges utilisateurs pour la gestion des incidents autonome.  |
| Utilisateurs actifs mensuels de gestion des incidents  | `datadog.estimated_usage.incident_management.monthly_active_users`  | Utilisateurs actifs uniques de gestion des incidents vus depuis le début du mois (calendaire) (facturation héritée).  |

{{< img src="account_management/billing/usage-metrics-02.png" alt="Noms des métriques" >}}

## Définissez des balises pour vos métriques d'utilisation estimées par balise {#setting-tags-for-your-by-tag-estimated-usage-metrics}
Pour définir des répartitions de balises dans vos métriques d'utilisation estimées par balise, configurez vos balises souhaitées—comme l'équipe ou l'environnement—sur la page [Attribution d'utilisation][6] (Si vous êtes sur un plan PRO, vous pouvez demander l'accès à cette fonctionnalité par l'intermédiaire de votre [Responsable du succès client][2]). Les changements prennent effet au prochain 00:00 UTC.

{{< img src="account_management/billing/setting-eum-tags-in-ua.png" alt="Configuration des balises EUM by_tag dans l'attribution d'utilisation." >}}

## Dashboards {#dashboards}

Des tableaux de bord d'utilisation estimée prêts à l'emploi sont disponibles, offrant des requêtes utiles avec ces métriques. Vous pouvez cloner ces tableaux de bord pour vous aider à démarrer avec les métriques d'utilisation. Pour trouver ces tableaux de bord, accédez à [Listes de tableaux de bord prédéfinis][5] et recherchez "Utilisation estimée."

## Utilisation Multi-Org {#multi-org-usage}

Pour les comptes comportant plusieurs organisations, vous pouvez agréger l'utilisation estimée des organisations filles en utilisant le champ `from` pour surveiller l'utilisation de l'ensemble de votre compte.

{{< img src="account_management/billing/usage-metrics-03.png" alt="Multi-Org Usage" >}}

## Dépannage {#troubleshooting}

Pour des questions techniques, contactez [l'assistance Datadog][1].

Pour toute question concernant la facturation, contactez votre [chargé de compte][2].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help/
[2]: mailto:success@datadoghq.com
[3]: /fr/monitors/types/metric/?tab=threshold
[4]: /fr/logs/guide/best-practices-for-log-management/#alert-on-indexed-logs-volume-since-the-beginning-of-the-month
[5]: https://app.datadoghq.com/dashboard/lists/preset/3?q=estimated%20usage
[6]: /fr/account_management/billing/usage_attribution/
[7]: /fr/account_management/billing/metric_name_pricing/