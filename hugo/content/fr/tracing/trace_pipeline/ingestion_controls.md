---
aliases:
- /fr/tracing/trace_ingestion/control_page
- /fr/tracing/trace_ingestion/ingestion_control_page
- /fr/account_management/billing/usage_control_apm/
- /fr/tracing/app_analytics/
- /fr/tracing/guide/ingestion_control_page/
- /fr/tracing/trace_ingestion/ingestion_controls
description: Découvrez comment contrôler les taux d'ingestion avec la solution APM.
further_reading:
- link: /tracing/trace_pipeline/ingestion_mechanisms/
  tag: Documentation
  text: Mécanismes d'ingestion
- link: /tracing/trace_pipeline/metrics/
  tag: Documentation
  text: Métriques d'utilisation
- link: https://www.datadoghq.com/architecture/mastering-distributed-tracing-data-volume-challenges-and-datadogs-approach-to-efficient-sampling/
  tag: Architecture Center
  text: 'Maîtriser le traçage distribué : défis liés au volume de données et approche
    de Datadog pour un échantillonnage efficace'
- link: https://www.datadoghq.com/architecture/optimizing-distributed-tracing-best-practices-for-remaining-within-budget-and-capturing-critical-traces/
  tag: Architecture Center
  text: 'Optimiser le traçage distribué : bonnes pratiques pour respecter le budget
    et capturer les traces critiques'
title: Paramètres d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage d'ingestion" >}}

Les contrôles d'ingestion affectent les traces envoyées par vos applications à Datadog. Les [métriques APM][1] sont toujours calculées sur la base de toutes les traces et ne sont pas affectées par les contrôles d'ingestion.

La page Ingestion Control offre une visibilité sur la configuration d'ingestion de vos applications et services. Depuis la [page Ingestion Control][2] :

- Obtenez une visibilité sur la configuration d'ingestion au niveau de vos services.
- Ajustez les taux d'échantillonnage des traces pour les services ou endpoints à haut débit afin de mieux gérer le budget d'ingestion.
- Ajustez les taux d'échantillonnage des traces pour les services ou endpoints à faible débit ou à trafic rare afin d'accroître la visibilité.
- Comprenez quels [mécanismes d'ingestion][11] sont responsables de l'échantillonnage de la plupart de vos traces.
- Enquêtez sur les problèmes potentiels de configuration d'ingestion et agissez en conséquence, tels que des ressources CPU ou RAM limitées pour l'Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Vue d'ensemble de la page Ingestion Control" >}}

## Comprendre votre configuration d'ingestion {#understanding-your-ingestion-configuration}

Utilisez les données de l'en-tête de contrôle de l'ingestion pour surveiller l'ingestion de vos traces. L'en-tête affiche la quantité totale de données ingérées au cours de la dernière heure, votre utilisation mensuelle estimée et le pourcentage de votre limite d'ingestion mensuelle allouée, calculé en fonction de votre infrastructure APM active (telle que les hosts, les tâches Fargate et les fonctions serverless).

Si l'utilisation mensuelle est inférieure à `100%`, les données ingérées projetées tiennent dans votre allocation mensuelle. Une valeur d'utilisation mensuelle supérieure à `100%` signifie que les données ingérées mensuelles devraient dépasser votre allocation mensuelle.

### Niveaux d'ingestion par service {#ingestion-levels-by-service}

Le tableau des services fournit des informations sur les volumes ingérés et les paramètres d'ingestion pour chaque service :

Type
: Le type de service: service web, base de données, cache, navigateur, etc.

Name
: Le nom de chaque service envoyant des traces à Datadog. Le tableau contient les services racines et non racines pour lesquels des données ont été ingérées au cours de la dernière heure.

Traces ingérées/s
: Nombre moyen de traces par seconde ingérées à partir du service au cours de la dernière heure.

Octets ingérés/s
: Nombre moyen d'octets par seconde ingérés pour le service au cours de la dernière heure.

Octets en aval/s
: Nombre moyen d'octets par seconde ingérés pour lesquels le service _prend la décision d'échantillonnage_. Cela inclut les octets de tous les spans des services en aval dans la pile d'appels qui suivent la décision prise au début de la trace. Les données de cette colonne sont basées sur la dimension `sampling_service`, définie sur les métriques `datadog.estimated_usage.apm.ingested_bytes`. Pour plus d'informations, consultez [Métriques d'utilisation APM][15].

Répartition du trafic
: Une répartition détaillée du trafic échantillonné et non échantillonné pour les traces commençant à partir du service. Voir [Répartition du trafic](#traffic-breakdown) pour plus d'informations.

Configuration de l'ingestion
: Indique `Automatic` si le [default head-based sampling mechanism][4] de l'Agent s'applique. Si l'ingestion a été configurée avec des [trace sampling rules][8], le service est marqué comme `Configured` ; une étiquette `Local` est définie lorsque la règle d'échantillonnage est appliquée à partir de la configuration dans le SDK, une étiquette `Remote` est définie lorsque la règle d'échantillonnage est appliquée à distance, depuis l'interface utilisateur. Pour plus d'informations sur la configuration de l'ingestion pour un service, lisez la section sur la [modification du taux d'ingestion par défaut](#configure-the-service-ingestion-rate).

Infrastructure
: hosts, conteneurs et fonctions sur lesquels le service s'exécute.

Statut de service
: Affiche `Limited Resource` lorsque certains spans sont abandonnés car le Datadog Agent atteint les limites de CPU ou de RAM définies [dans sa configuration][9], `Legacy Setup` lorsque certains spans sont ingérés via l'ancien [App Analytics mechanism][7], ou `OK` sinon.

Filtrez la page par environnement, configuration et statut pour afficher les services pour lesquels vous devez effectuer une action. Pour réduire le volume d'ingestion global, triez le tableau par la colonne `Downstream Bytes/s` pour afficher les services responsables de la plus grande part de votre ingestion.

**Remarque** : Le tableau est alimenté par les [métriques d'utilisation][10] `datadog.estimated_usage.apm.ingested_spans` et `datadog.estimated_usage.apm.ingested_bytes`. Ces métriques sont taguées par `service`, `env` et `ingestion_reason`.

#### Répartition du trafic {#traffic-breakdown}

La colonne Répartition du trafic détaille la destination de toutes les traces commençant à partir du service. Elle vous donne une estimation de la part du trafic qui est ingérée et abandonnée, et pour quelles raisons.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Répartition du trafic de l'ingestion de traces" >}}

Les données détaillées sont composées des parties suivantes :

- {{< ui >}}Complete traces ingested{{< /ui >}} (bleu) : Le pourcentage de traces qui ont été ingérées par Datadog.
- {{< ui >}}Complete traces not retained{{< /ui >}} (gris) : Le pourcentage de traces qui n'ont pas été ingérées par Datadog. Certaines traces peuvent être abandonnées car : 

    1. Par défaut, [Agent automatically sets a sampling rate][4] sur les services, en fonction du trafic du service.
    2. Le service est configuré pour ingérer un certain pourcentage de traces à l'aide de [sampling rules][8].

- {{< ui >}}Complete traces dropped by the SDK rate limiter{{< /ui >}} (orange) : Lorsque vous choisissez de définir manuellement le taux d'ingestion du service sous forme de pourcentage avec des règles d'échantillonnage de traces, un limiteur de débit est automatiquement activé, réglé par défaut sur 100 traces par seconde. Consultez la documentation sur le [rate limiter][8] pour modifier ce taux.

- {{< ui >}}Traces dropped due to the Agent CPU or RAM limit{{< /ui >}} (rouge) : Ce mécanisme peut abandonner des spans et créer des traces incomplètes. Pour corriger cela, augmentez l'allocation de CPU et de mémoire pour l'infrastructure sur laquelle l'Agent s'exécute.

## Configuration de l'ingestion pour un service {#configuring-ingestion-for-a-service}

Cliquez sur n'importe quel service pour afficher le Service Ingestion Summary, qui fournit des informations exploitables et des options de configuration pour gérer l'ingestion des traces de ce service.

### Configuration de l'ingestion pour un service {#ingestion-configuration-for-a-service}

#### Taux d'échantillonnage par ressource {#sampling-rates-by-resource}

Le tableau répertorie les taux d'échantillonnage appliqués par ressource du service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Tableau des taux d'échantillonnage par ressource" style="width:100%;">}}

- La colonne `Ingested bytes` affiche les octets ingérés à partir des spans du service et de la ressource, tandis que la colonne `Downstream bytes` affiche les octets ingérés à partir des spans où la décision d'échantillonnage est prise à partir de ce service et de cette ressource, y compris les octets provenant des services en aval dans la chaîne d'appel.
- La colonne `Configuration` indique où le taux d'échantillonnage de la ressource est appliqué : 
  - `Automatic` si le [default head-based sampling mechanism][4] de l'Agent s'applique.
  - `Local Configured` si une [sampling rule][8] a été définie localement dans le SDK.
  - `Remote Configured` si une règle d'échantillonnage à distance a été définie depuis l'interface utilisateur Datadog. Pour savoir comment configurer des règles d'échantillonnage depuis la page Ingestion Control, lisez la section sur la [configuration à distance des règles d'échantillonnage](#configure-the-service-ingestion-rates-by-resource).

**Remarque** : Si le service ne prend pas de décisions d'échantillonnage, les ressources du service seront regroupées sous la ligne `Resources not making sampling decisions`.

**Remarque** : Sur de courtes périodes (1 à 4 heures), le taux d'échantillonnage effectif peut s'afficher en dessous de 100 %, même lorsqu'il est configuré à 100 %. Il s'agit d'un comportement attendu dû aux calculs statistiques qui nécessitent davantage de points de données pour converger. Toutes les traces sont toujours capturées correctement. Pour un affichage plus précis, consultez les taux d'échantillonnage sur des périodes plus longues.

#### Raisons d'ingestion et décideurs d'échantillonnage {#ingestion-reasons-and-sampling-decision-makers}

Explorez la {{< ui >}}Ingestion reasons breakdown{{< /ui >}} pour voir quels mécanismes sont responsables de l'ingestion de votre service. Chaque motif d'ingestion est lié à un [ingestion mechanism][11] spécifique. Après avoir modifié votre configuration d'ingestion de service, vous pouvez observer l'augmentation ou la diminution des octets et des spans ingérés dans ce graphique de séries temporelles basé sur la dernière heure de données ingérées.

Si la majeure partie de votre volume d'ingestion de service est due à des décisions prises par des services en amont, examinez le détail de la top list {{< ui >}}Sampling decision makers{{< /ui >}}. Par exemple, si votre service n'est pas racine (ce qui signifie qu'il **ne décide jamais** d'échantillonner des traces), observez tous les services en amont responsables de l'ingestion de votre service non racine. Configurez les services racine en amont pour réduire votre volume d'ingestion global.

Pour des investigations plus approfondies, utilisez le [APM Trace - Estimated Usage Dashboard][12], qui fournit des informations globales sur l'ingestion ainsi que des graphiques de répartition par `service`, `env` et `ingestion reason`.

#### Versions de l'Agent et du SDK {#agent-and-sdk-versions}

Consultez la {{< ui >}}Datadog Agent and SDK versions{{< /ui >}} que votre service utilise. Comparez les versions utilisées aux dernières versions publiées pour vous assurer que vous exécutez des Agents et des bibliothèques récents et à jour.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versions d'Agent et du SDK" >}}

### Gestion des taux d'échantillonnage des services {#managing-services-sampling-rates}

Pour contrôler les taux d'échantillonnage d'un service, vous pouvez utiliser :
- {{< ui >}}Adaptive sampling{{< /ui >}} : Ajustez automatiquement les taux d'échantillonnage pour correspondre à un budget de volume ingéré mensuel configuré.
- {{< ui >}}Resource-based sampling{{< /ui >}} : Définissez manuellement des taux d'échantillonnage explicites par ressource.

Les configurations pour ces stratégies peuvent être appliquées {{< ui >}}Remotely{{< /ui >}} via l'interface utilisateur Datadog. Cette méthode permet aux modifications de prendre effet immédiatement sans redéployer votre service. Pour {{< ui >}}Resource-based Sampling{{< /ui >}}, vous avez également la possibilité d'appliquer des configurations **localement** en mettant à jour les fichiers de configuration de votre service et en redéployant.

**Remote Configuration** pour les taux d'ingestion de service a des exigences spécifiques.

{{% collapse-content title="Exigences de Remote Configuration" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Datadog Agent [7.41.1][19] ou supérieur.
- [Remote Configuration][3] activée pour votre Agent.
- `APM Remote Configuration Write` [permissions][20]. Si vous ne disposez pas de ces permissions, demandez à votre administrateur Datadog de mettre à jour vos permissions depuis les paramètres de votre organisation.

Vous trouverez ci-dessous la version minimale du SDK requise pour cette fonctionnalité :

| Langage | Version minimale requise |
|----------|--------------------------|
| Java     | v1.34.0                  |
| Go       | v1.64.0                  |
| Python   | v.2.9.0                  |
| Ruby     | v2.0.0                   |
| Node.js  | v5.16.0                  |
| PHP      | v1.4.0                   |
| .NET     | v2.53.2                  |
| C++      | v0.2.2                   |

{{% /collapse-content %}}

#### Échantillonnage adaptatif {#adaptive-sampling}

Utilisez l'échantillonnage adaptatif pour laisser Datadog gérer les taux d'échantillonnage des services pour vous. Spécifiez un volume d'ingestion mensuel cible pour un ou plusieurs services tout en conservant une visibilité sur tous les services et endpoints.

Pour configurer l'échantillonnage adaptatif :

1. Accédez à la page [Ingestion Control][2].
2. Cliquez sur un service pour afficher le {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Cliquez sur {{< ui >}}Manage Ingestion Rate{{< /ui >}}.
4. Choisissez {{< ui >}}Datadog adaptive sampling rates{{< /ui >}} comme stratégie d'échantillonnage de votre service.
5. Cliquez sur {{< ui >}}Apply{{< /ui >}}.

<div class="alert alert-info">Si l'application de cette configuration <strong>Remote Configuration</strong> est désactivée, assurez-vous que les <a href="#remote-configuration-requirements">Remote Configuration requirements</a> sont remplies.</div>

Pour plus d'informations, consultez [Adaptive Sampling][17].


#### Échantillonnage basé sur les ressources {#resource-based-sampling}

Pour configurer des taux d'échantillonnage personnalisés pour le service par nom de ressource : 
1. Accédez à la page [Ingestion Control][2].
2. Cliquez sur un service pour afficher le {{< ui >}}Service Ingestion Summary{{< /ui >}}.
3. Cliquez sur {{< ui >}}Manage Ingestion rate{{< /ui >}}.
4. Cliquez sur {{< ui >}}Custom sampling rates only{{< /ui >}}.
5. Cliquez sur {{< ui >}}Add new rule{{< /ui >}} pour définir les taux d'échantillonnage pour certaines ressources.  
   **Remarque** : Les règles d'échantillonnage utilisent la correspondance de modèles glob, vous pouvez donc utiliser des caractères génériques (`*`) pour faire correspondre plusieurs ressources en même temps.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="Fenêtre modale de configuration" style="width:100%;">}}
6. Appliquez la configuration {{< ui >}}Remotely{{< /ui >}} ou {{< ui >}}Locally{{< /ui >}} :
{{< tabs >}}
{{% tab "Remotely" %}}

Cette option applique la configuration à l'aide de Remote Configuration, vous **n'avez donc pas besoin** de redéployer le service pour que la modification prenne effet. Vous pouvez observer les modifications de configuration depuis le [Live Search Explorer][100].

Cliquez sur {{< ui >}}Apply{{< /ui >}} pour enregistrer la configuration. 

Les ressources configurées à distance s'affichent sous la forme `Configured Remote` dans la colonne {{< ui >}}Configuration{{< /ui >}}.  

<br><div class="alert alert-info">Si l'application de cette configuration <strong>Remote Configuration</strong> est désactivée, assurez-vous que les <a href="#remote-configuration-requirements">Remote Configuration requirements</a> sont remplies.</div>

[100]: /fr/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Locally" %}}

Cette option génère une configuration que vous pouvez appliquer manuellement.
1. Appliquez la configuration générée à votre service.  
   **Remarque** : La valeur du nom du service est sensible à la casse. Elle doit correspondre à la casse du nom de votre service.
1. Redéployez le service.
1. Confirmez que le nouveau pourcentage a été appliqué en consultant la colonne {{< ui >}}Traffic Breakdown{{< /ui >}}. Les ressources qui ont été configurées localement s'affichent sous la forme `Configured Local` dans la colonne {{< ui >}}Configuration{{< /ui >}}.

{{% /tab %}}
{{< /tabs >}}

## Gestion de la configuration de l'ingestion du Datadog Agent {#managing-datadog-agent-ingestion-configuration}

Cliquez sur {{< ui >}}Configure Datadog Agent Ingestion{{< /ui >}} pour gérer les taux d'échantillonnage par défaut (head-based), l'échantillonnage des erreurs et l'échantillonnage des traces rares.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Fenêtre modale de configuration au niveau de l'Agent" >}}

- [{{< ui >}}Head-based Sampling{{< /ui >}}][4] : Lorsqu'aucune règle d'échantillonnage n'est définie pour un service, le Datadog Agent calcule automatiquement les taux d'échantillonnage à appliquer pour vos services, en ciblant **10 traces par seconde par Agent**. Modifiez ce nombre cible de traces dans Datadog, ou définissez `DD_APM_TARGET_TPS` localement au niveau de l'Agent.
- [{{< ui >}}Error Spans Sampling{{< /ui >}}][5]: Pour les traces non capturées par l'échantillonnage head-based, le Datadog Agent capture les traces d'erreur locales **jusqu'à 10 traces par seconde par Agent**. Modifiez ce nombre cible de traces dans Datadog, ou définissez `DD_APM_ERROR_TPS` locally au niveau de l'Agent.
- [{{< ui >}}Rare Spans Sampling{{< /ui >}}][6]: Pour les traces non capturées par l'échantillonnage head-based, le Datadog Agent capture les traces rares locales **jusqu'à 5 traces par seconde par Agent**. Ce paramètre est désactivé par défaut. Activez la collecte des traces rares dans Datadog, ou définissez `DD_APM_ENABLE_RARE_SAMPLER` locally au niveau de l'Agent.

Grâce à Remote Configuration, vous n'avez pas besoin de redémarrer l'Agent pour mettre à jour ces paramètres. Cliquez sur `Apply` pour enregistrer les modifications de configuration, et la nouvelle configuration prend effet immédiatement. La configuration à distance pour les paramètres d'échantillonnage de l'Agent est disponible si vous utilisez la version [7.42.0][13] ou supérieure de l'Agent.

**Remarque** : La section `Other Ingestion Reasons` (grise) du graphique en secteurs représente d'autres raisons d'ingestion qui _ne sont pas configurables_ au niveau du Datadog Agent. 

**Remarque** : Les paramètres configurés à distance prévalent sur les configurations locales telles que les variables d'environnement et la configuration `datadog.yaml`.

## Priorité des règles d'échantillonnage {#sampling-rules-precedence}

Si des règles d'échantillonnage sont définies à plusieurs emplacements, les règles de priorité suivantes s'appliquent dans l'ordre, les règles apparaissant en premier dans la liste pouvant remplacer celles de priorité inférieure :

1. Règles d'échantillonnage configurées à distance, définies via [l'échantillonnage basé sur les ressources](#configure-the-service-ingestion-rates-by-resource)
1. [Règles d'échantillonnage adaptatif][17]
1. [Règles d'échantillonnage configurées localement][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Taux d'échantillonnage global configuré à distance][8]
1. [Taux d'échantillonnage global configuré localement][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Taux provenant du trace agent contrôlés indirectement avec les paramètres de l'Agent](#managing-datadog-agent-ingestion-configuration) à distance ou localement (`DD_APM_TARGET_TPS`)

En d'autres termes, Datadog utilise les règles de priorité suivantes :
- Tracer settings > Agent settings
- Sampling rules > Global sampling rate
- Remote > Local

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/metrics/metrics_namespace/
[2]: https://app.datadoghq.com/apm/traces/ingestion-control
[3]: /fr/tracing/guide/remote_config
[4]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[5]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#error-traces
[6]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#rare-traces
[7]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#single-spans-app-analytics
[8]: /fr/tracing/trace_pipeline/ingestion_mechanisms/#in-tracing-libraries-user-defined-rules
[9]: /fr/tracing/troubleshooting/agent_rate_limits/#maximum-cpu-percentage
[10]: /fr/tracing/trace_pipeline/metrics
[11]: /fr/tracing/trace_pipeline/ingestion_mechanisms/
[12]: https://app.datadoghq.com/dash/integration/30337/app-analytics-usage
[13]: https://github.com/DataDog/datadog-agent/releases/tag/7.42.0
[14]: /fr/remote_configuration#enabling-remote-configuration
[15]: /fr/tracing/trace_pipeline/metrics#what-is-the-sampling-service
[17]: /fr/tracing/trace_pipeline/adaptive_sampling/
[18]: /fr/tracing/guide/trace_ingestion_volume_control/#globally-configure-the-ingestion-sampling-rate-at-the-agent-level
[19]: https://github.com/DataDog/datadog-agent/releases/tag/7.41.1
[20]: /fr/account_management/rbac/permissions/