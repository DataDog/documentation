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
title: Paramètres d'ingestion
---
{{< img src="tracing/apm_lifecycle/ingestion_sampling_rules.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Règles d'échantillonnage d'ingestion" >}}

Les contrôles d'ingestion affectent les traces envoyées par vos applications à Datadog. [Les métriques APM][1] sont toujours calculées sur la base de toutes les traces et ne sont pas impactées par les contrôles d'ingestion.

La page de contrôle d'ingestion offre une visibilité sur la configuration d'ingestion de vos applications et services. Depuis la [page de contrôle d'ingestion][2] :

- Obtenez une visibilité sur la configuration d'ingestion au niveau du service.
- Ajustez les taux d'échantillonnage des traces pour les services ou points de terminaison à fort débit afin de mieux gérer le budget d'ingestion.
- Ajustez les taux d'échantillonnage des traces pour les services ou points de terminaison à faible débit et au trafic rare afin d'augmenter la visibilité.
- Comprenez quels [mécanismes d'ingestion][11] sont responsables de l'échantillonnage de la plupart de vos traces.
- Enquêtez et agissez sur les problèmes potentiels de configuration d'ingestion, tels que des ressources CPU ou RAM limitées pour l'Agent.

{{< img src="tracing/trace_indexing_and_ingestion/ingestion_control_page.png" style="width:100%;" alt="Aperçu de la page de contrôle d'ingestion" >}}

## Comprendre votre configuration d'ingestion {#understanding-your-ingestion-configuration}

Utilisez les données dans l'en-tête de contrôle d'ingestion pour surveiller votre ingestion de traces. L'en-tête affiche la quantité totale de données ingérées au cours de la dernière heure, votre utilisation mensuelle estimée et le pourcentage de votre limite d'ingestion mensuelle allouée, calculé sur la base de votre infrastructure APM active (telles que les hôtes, les tâches Fargate et les fonctions sans serveur).

Si l'utilisation mensuelle est inférieure à `100%`, les données ingérées projetées s'inscrivent dans votre allotissement mensuel. Une valeur d'utilisation mensuelle supérieure à `100%` signifie que les données ingérées mensuellement devraient dépasser votre allotissement mensuel.

### Niveaux d'ingestion par service {#ingestion-levels-by-service}

Le tableau des services fournit des informations sur les volumes ingérés et les paramètres d'ingestion pour chaque service :

Type
: Le type de service: service web, base de données, cache, navigateur, etc...

Name
: Le nom de chaque service envoyant des traces à Datadog. Le tableau contient des services racines et non racines pour lesquels des données ont été ingérées au cours de la dernière heure.

Traces ingérées/s
: Nombre moyen de traces par seconde ingérées à partir du service au cours de la dernière heure.

Octets ingérés/s
: Nombre moyen d'octets par seconde ingérés pour le service au cours de la dernière heure.

Octets en aval/s
: Nombre moyen d'octets par seconde ingérés pour lesquels le service _prend la décision d'échantillonnage_. Cela inclut les octets de tous les spans des services en aval dans la pile d'appels qui suivent la décision prise au début de la trace. Les données de cette colonne sont basées sur la `sampling_service` dimension, définie sur les `datadog.estimated_usage.apm.ingested_bytes` métriques. Pour plus d'informations, lisez [les métriques d'utilisation de l'APM][15].

Répartition du trafic
: Une répartition détaillée du trafic échantillonné et non échantillonné pour les traces à partir du service. Voir [Répartition du trafic](#traffic-breakdown) pour plus d'informations.

Configuration d'ingestion
: Montre `Automatic` si le [mécanisme d'échantillonnage basé sur l'en-tête par défaut][4] de l'Agent s'applique. Si l'ingestion a été configurée avec [des règles d'échantillonnage de traces][8], le service est marqué comme `Configured` ; une étiquette `Local` est définie lorsque la règle d'échantillonnage est appliquée à partir de la configuration dans le SDK, une étiquette `Remote` est définie lorsque la règle d'échantillonnage est appliquée à distance, depuis l'UI. Pour plus d'informations sur la configuration de l'ingestion pour un service, consultez [comment modifier le taux d'ingestion par défaut](#configure-the-service-ingestion-rate).

Infrastructure
: Hôtes, conteneurs et fonctions sur lesquels le service est en cours d'exécution.

Statut de service
: Montre `Limited Resource` lorsque certains spans sont abandonnés en raison de l'Agent Datadog atteignant les limites de CPU ou de RAM définies [dans sa configuration][9], `Legacy Setup` lorsque certains spans sont ingérés via le [mécanisme d'App Analytics hérité][7], ou `OK` autrement.

Filtrez la page par environnement, configuration et statut pour afficher les services pour lesquels vous devez agir. Pour réduire le volume global d'ingestion, triez le tableau par la colonne `Downstream Bytes/s` pour afficher les services responsables de la plus grande part de votre ingestion.

**Remarque** : Le tableau est alimenté par les [métriques d'utilisation][10] `datadog.estimated_usage.apm.ingested_spans` et `datadog.estimated_usage.apm.ingested_bytes`. Ces métriques sont étiquetées par `service`, `env` et `ingestion_reason`.

#### Répartition du trafic {#traffic-breakdown}

La colonne Répartition du trafic décompose la destination de toutes les traces à partir du service. Elle vous donne une estimation de la part de trafic qui est ingérée et abandonnée, ainsi que des raisons pour lesquelles cela se produit.

{{< img src="tracing/trace_indexing_and_ingestion/service_traffic_breakdown.png" style="width:100%;" alt="Répartition du trafic d'ingestion des traces" >}}

Les données détaillées sont composées des parties suivantes :

- **Traces complètes ingérées** (bleu) : Le pourcentage de traces qui ont été ingérées par Datadog.
- **Traces complètes non retenues** (gris) : Le pourcentage de traces qui n'ont pas été ingérées par Datadog. Certaines traces peuvent être abandonnées pour les raisons suivantes : 

    1. Par défaut, l'[Agent définit automatiquement un taux d'échantillonnage][4] sur les services, en fonction du trafic du service.
    2. Le service est configuré pour ingérer un certain pourcentage de traces en utilisant [règles d'échantillonnage][8].

- **Traces complètes abandonnées par le limiteur de taux SDK** (orange) : Lorsque vous choisissez de définir manuellement le taux d'ingestion du service en pourcentage avec des règles d'échantillonnage de traces, un limiteur de taux est automatiquement activé, réglé par défaut à 100 traces par seconde. Consultez la documentation du [limiteur de taux][8] pour modifier ce taux.

- **Traces abandonnées en raison de la limite CPU ou RAM de l'Agent** (rouge) : Ce mécanisme peut abandonner des spans et créer des traces incomplètes. Pour résoudre ce problème, augmentez l'allocation de CPU et de mémoire pour l'infrastructure sur laquelle l'Agent fonctionne.

## Configuration de l'ingestion pour un service {#configuring-ingestion-for-a-service}

Cliquez sur n'importe quel service pour voir le Résumé de l'ingestion du service, qui fournit des informations exploitables et des options de configuration pour gérer l'ingestion des traces de ce service.

### Configuration de l'ingestion pour un service {#ingestion-configuration-for-a-service}

#### Taux d'échantillonnage par ressource {#sampling-rates-by-resource}

Le tableau répertorie les taux d'échantillonnage appliqués par ressource du service.

{{< img src="/tracing/trace_indexing_and_ingestion/resource_sampling_rates.png" alt="Table des taux d'échantillonnage par ressource" style="width:100%;">}}

- La colonne `Ingested bytes` présente les octets ingérés des spans du service et de la ressource, tandis que la colonne `Downstream bytes` présente les octets ingérés des spans pour lesquels la décision d'échantillonnage est prise à partir de ce service et de cette ressource, y compris les octets des services en aval dans la chaîne d'appels.
- La colonne `Configuration` indique où le taux d'échantillonnage de la ressource est appliqué : 
  - `Automatic` si le [mécanisme d'échantillonnage basé sur l'en-tête par défaut][4] de l'Agent s'applique.
  - `Local Configured` si une [règle d'échantillonnage][8] a été définie localement dans le SDK.
  - `Remote Configured` si une règle d'échantillonnage à distance a été définie depuis l'interface utilisateur de Datadog. Pour apprendre à configurer des règles d'échantillonnage depuis la page de contrôle d'ingestion, lisez la section sur [la configuration à distance des règles d'échantillonnage](#configure-the-service-ingestion-rates-by-resource).

**Remarque** : Si le service ne prend pas de décisions d'échantillonnage, les ressources du service seront regroupées sous la ligne `Resources not making sampling decisions`.

**Remarque** : Sur de courtes périodes (1 à 4 heures), le taux d'échantillonnage effectif peut afficher moins de 100 % même lorsqu'il est configuré à 100 %. C'est un comportement attendu en raison des calculs statistiques qui nécessitent plus de points de données pour converger. Toutes les traces sont toujours capturées correctement. Pour un affichage aussi précis que possible, consultez les taux d'échantillonnage sur des périodes plus longues.

#### Raisons d'ingestion et décideurs d'échantillonnage {#ingestion-reasons-and-sampling-decision-makers}

Explorez la **répartition des raisons d'ingestion** pour voir quels mécanismes sont responsables de l'ingestion de votre service. Chaque raison d'ingestion est liée à un [mécanisme d'ingestion][11] spécifique. Après avoir modifié la configuration d'ingestion de votre service, vous pouvez observer l'augmentation ou la diminution des octets et des intervalles ingérés dans ce graphique de séries temporelles basé sur l'heure passée de données ingérées.

Si la majeure partie de votre volume d'ingestion de service est due à des décisions prises par des services en amont, examinez le détail de la liste des **décideurs d'échantillonnage**. Par exemple, si votre service n'est pas racine, (ce qui signifie qu'il **ne décide jamais** d'échantillonner des traces), observez tous les services en amont responsables de l'ingestion de votre service non racine. Configurez les services racines en amont pour réduire votre volume d'ingestion global.

Pour des investigations plus approfondies, utilisez le [Tableau de bord d'utilisation estimée des traces APM][12], qui fournit des informations globales sur l'ingestion ainsi que des graphiques de répartition par `service`, `env` et `ingestion reason`.

#### Versions de l'Agent et du SDK {#agent-and-sdk-versions}

Voir les **versions de l'Agent et du SDK Datadog** que votre service utilise. Comparez les versions en cours d'utilisation avec les dernières versions publiées pour vous assurer que vous utilisez des Agents et des bibliothèques récents et à jour.

{{< img src="tracing/trace_indexing_and_ingestion/agent_tracer_version.png" style="width:90%;" alt="Versions de l'Agent et du SDK" >}}

### Gestion des taux d'échantillonnage des services {#managing-services-sampling-rates}

Pour contrôler les taux d'échantillonnage d'un service, vous souhaiterez peut-être utiliser :
- **Échantillonnage adaptatif** : Ajustez automatiquement les taux d'échantillonnage pour correspondre  à un budget de volume ingéré mensuel configura9.
- **Échantillonnage basé sur les ressources** : Da9finissez manuellement des taux d'a9chantillonnage explicites par ressource.

Les configurations pour ces stratégies peuvent être appliquées **à distance** via l'interface utilisateur de Datadog. Cette méthode permet aux modifications de prendre effet immédiatement sans redéployer votre service. Pour **l'échantillonnage basé sur les ressources**, vous avez également la possibilité d'appliquer des configurations **localement** en mettant à jour les fichiers de configuration de votre service et en redéployant.

L'utilisation de **la configuration à distance** pour les taux d'ingestion des services a des exigences spécifiques.

{{% collapse-content title="Exigences de configuration à distance" level="h4" expanded="false" id="remote-configuration-requirements" %}}

- Agent Datadog [7.41.1][19] ou version supérieure.
- [Configuration à distance][3] activée pour votre Agent.
- `APM Remote Configuration Write` [permissions][20]. Si vous n'avez pas ces permissions, demandez à votre administrateur Datadog de mettre à jour vos permissions dans les paramètres de votre organisation.

Trouvez ci-dessous la version minimale du SDK requise pour la fonctionnalita9 :

| Langue | Version minimale requise |
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

Utilisez l'échantillonnage adaptatif pour permettre à Datadog de gérer les taux d'échantillonnage des services en votre nom. Spécifiez un volume d'ingestion mensuel cible pour un ou plusieurs services tout en gardant une visibilité sur tous les services et points de terminaison.

Pour configurer l'a9chantillonnage adaptatif :

1. Accédez à la page [Contrôle d'Ingestion][2].
2. Cliquez sur un service pour voir le **Résumé d'Ingestion du Service**.
3. Cliquez sur **Gérer le Taux d'Ingestion**.
4. Choisissez **les taux d'échantillonnage adaptatifs de Datadog** comme stratégie d'échantillonnage de votre service.
5. Cliquez sur **Appliquer**.

<div class="alert alert-info">Si l'application de cette configuration <strong>à distance</strong> est désactivée, assurez-vous que les <a href="#remote-configuration-requirements">exigences de Configuration à Distance</a> sont respectées.</div>

Pour plus d'informations, voir [Échantillonnage Adaptatif][17].


#### Échantillonnage basé sur les ressources {#resource-based-sampling}

Pour configurer des taux d'échantillonnage personnalisés pour le service par nom de ressource : 
1. Accédez à la page [Contrôle d'Ingestion][2].
2. Cliquez sur un service pour voir le **Résumé d'Ingestion du Service**.
3. Cliquez sur **Gérer le taux d'ingestion**.
4. Cliquez sur **Taux d'échantillonnage personnalisés uniquement**.
5. Cliquez sur **Ajouter une nouvelle règle** pour définir les taux d'échantillonnage pour certaines ressources.  
   **Remarque** : Les règles d'a9chantillonnage utilisent la correspondance de motifs globaux, vous pouvez donc utiliser des caractères génériques (`*`) pour correspondre à plusieurs ressources en même temps.
   {{< img src="/tracing/trace_indexing_and_ingestion/sampling_configuration_custom.png" alt="Modal de configuration" style="width:100%;">}}
6. Appliquez la configuration **à distance** ou **localement** :
{{< tabs >}}
{{% tab "À distance" %}}

Cette option applique la configuration en utilisant la Configuration à distance, vous **n'avez pas besoin** de redéployer le service pour que le changement prenne effet. Vous pouvez observer les changements de configuration depuis le [Live Search Explorer][100].

Cliquez sur **Appliquer** pour enregistrer la configuration. 

Les ressources qui ont été configurées à distance s'affichent comme `Configured Remote` dans la colonne **Configuration**.  

<br><div class="alert alert-info">Si l'application de cette configuration <strong>à distance</strong> est désactivée, assurez-vous que les <a href="#remote-configuration-requirements">exigences de Configuration à distance</a> sont respectées.</div>

[100]: /fr/tracing/trace_explorer/?tab=listview#live-search-for-15-minutes

{{% /tab %}}

{{% tab "Localement" %}}

Cette option génère une configuration que vous devez appliquer manuellement.
1. Appliquez la configuration générée à votre service.  
   **Remarque** : La valeur du nom du service est sensible à la casse. Elle doit correspondre à la casse de votre nom de service.
1. Redéployez le service.
1. Confirmez que le nouveau pourcentage a été appliqué en consultant la colonne **Répartition du trafic**. Les ressources qui ont été configurées localement s'affichent comme `Configured Local` dans la colonne **Configuration**.

{{% /tab %}}
{{< /tabs >}}

## Gestion de la configuration d'ingestion de l'Agent Datadog {#managing-datadog-agent-ingestion-configuration}

Cliquez sur **Configurer l'ingestion de l'Agent Datadog** pour gérer les taux d'échantillonnage par défaut basés sur l'en-tête, l'échantillonnage des erreurs et l'échantillonnage rare.

{{< img src="tracing/trace_indexing_and_ingestion/agent_level_configurations_modal.png" style="width:70%;" alt="Modal de configuration au niveau de l'Agent" >}}

- **[Échantillonnage basé sur l'en-tête][4]** : Lorsque aucune règle d'échantillonnage n'est définie pour un service, l'Agent Datadog calcule automatiquement les taux d'échantillonnage à appliquer pour vos services, visant **10 traces par seconde par Agent**. Changez ce nombre cible de traces dans Datadog, ou définissez `DD_APM_TARGET_TPS` localement au niveau de l'agent.
- **[Échantillonnage des erreurs][5]** : Pour les traces non capturées par l'échantillonnage basé sur l'en-tête, l'Agent Datadog capture les traces d'erreur locales **jusqu'à 10 traces par seconde par Agent**. Changez ce nombre cible de traces dans Datadog, ou définissez `DD_APM_ERROR_TPS` localement au niveau de l'agent.
- **[Échantillonnage des traces rares][6]** : Pour les traces non capturées par l'échantillonnage basé sur l'en-tête, l'Agent Datadog capture les traces rares locales **jusqu'à 5 traces par seconde par Agent**. Ce paramètre est désactivé par défaut. Activez la collecte de traces rares dans Datadog, ou définissez `DD_APM_ENABLE_RARE_SAMPLER` localement au niveau de l'agent.

Avec la configuration à distance, vous n'avez pas besoin de redémarrer l'Agent pour mettre à jour ces paramètres. Cliquez sur `Apply` pour enregistrer les modifications de configuration, et la nouvelle configuration prend effet immédiatement. La configuration à distance pour les paramètres d'échantillonnage de l'Agent est disponible si vous utilisez la version de l'Agent [7.42.0][13] ou supérieure.

**Remarque** : La section `Other Ingestion Reasons` (grise) du graphique en secteurs représente d'autres raisons d'ingestion qui _ne sont pas configurables_ au niveau de l'Agent Datadog. 

**Remarque** : Les paramètres configurés à distance ont la priorité sur les configurations locales telles que les variables d'environnement et `datadog.yaml` la configuration.

## Priorité des règles d'échantillonnage {#sampling-rules-precedence}

Si des règles d'échantillonnage sont définies à plusieurs endroits, les règles de priorité suivantes s'appliquent dans l'ordre, où les règles qui apparaissent en premier sur la liste peuvent remplacer les règles de priorité inférieure :

1. Règles d'échantillonnage configurées à distance, définies par [échantillonnage basé sur les ressources](#configure-the-service-ingestion-rates-by-resource)
1. [Règles d'échantillonnage adaptatif][17]
1. [Règles d'échantillonnage configurées localement][8] (`DD_TRACE_SAMPLING_RULES`)
1. [Taux d'échantillonnage global configuré à distance][8]
1. [Taux d'échantillonnage global configuré localement][8] (`DD_TRACE_SAMPLE_RATE`)
1. [Taux contrôlés indirectement par les paramètres de l'agent](#managing-datadog-agent-ingestion-configuration) à distance ou localement (`DD_APM_TARGET_TPS`)

Pour le dire autrement, Datadog utilise les règles de priorité suivantes :
- Paramètres du traceur > Paramètres de l'agent
- Règles d'échantillonnage > Taux d'échantillonnage global
- À distance > Local

## Lectures complémentaires {#further-reading}

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