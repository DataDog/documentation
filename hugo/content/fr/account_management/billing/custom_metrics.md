---
algolia:
  tags:
  - custom metrics billing
aliases:
- /fr/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /account_management/billing/metric_name_pricing/
  tag: Documentation
  text: Tarification par nom de métrique pour les Custom Metrics
- link: /metrics/custom_metrics/
  tag: Documentation
  text: En savoir plus sur les Custom Metrics
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Bonnes pratiques pour la gouvernance des Custom Metrics
title: Facturation des Custom Metrics
---
## Présentation {#overview}

**Note** : Cette page décrit le modèle de facturation des Custom Metrics basé sur la cardinalité. Si votre contrat utilise des SKU de tarification par nom de métrique, consultez plutôt [Metric Name Pricing for Custom Metrics][15].

Si une métrique n'est pas soumise à partir de l'une des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1], elle est considérée comme une [métrique personnalisée][2]. Certaines intégrations standard peuvent également émettre des métriques personnalisées. Pour plus d'informations, consultez [métriques personnalisées et intégrations standard][14].

**Une métrique personnalisée est identifiée de manière unique par la combinaison d'un nom de métrique et de valeurs de tag (y compris le tag host)**. En général, toute métrique que vous envoyez en utilisant [DogStatsD][3] ou via un [custom Agent Check][4] est une métrique personnalisée.

Votre utilisation mensuelle facturable de métriques personnalisées (reflétée sur la page Usage) est calculée en prenant le total de toutes les métriques personnalisées distinctes (également appelées séries temporelles) pour chaque heure d'un mois donné, et en le divisant par le nombre d'heures dans le mois pour calculer une valeur moyenne mensuelle. Votre utilisation facturable n'est pas impactée par la fréquence de soumission des points de données ou le nombre de requêtes que vous exécutez sur vos métriques.

Les utilisateurs de Metrics without Limits™ voient les volumes mensuels facturables de métriques personnalisées _ingérées_ et _indexées_ sur leur page Usage. Apprenez-en davantage sur les métriques personnalisées ingérées et indexées et sur [Metrics without Limits™][5]. 

## Comptage des métriques personnalisées {#counting-custom-metrics}

Le nombre de métriques personnalisées associées à un nom de métrique particulier dépend de son [type de soumission][6]. Vous trouverez ci-dessous des exemples de la manière de compter vos métriques personnalisées selon le scénario suivant :

Supposons que vous soumettiez une métrique, `request.Latency`, depuis deux hosts (`host:A`, `host:B`), qui mesure la latence de vos requêtes d'endpoint. Vous soumettez cette métrique avec deux clés de tag :

- `endpoint`, qui a la valeur `endpoint:X` ou `endpoint:Y`.
- `status`, qui a la valeur `status:200` ou `status:400`.

Supposons que dans vos données, `endpoint:X` soit pris en charge par les deux hosts, mais qu'il échoue uniquement sur `host:B`. Supposez également que les requêtes vers `endpoint:Y` réussissent toujours et n'apparaissent sur `host:B` que comme indiqué ci-dessous :

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence de la requête" style="width:80%;">}}

{{< tabs >}}
{{% tab "Nombre, Taux"%}}

Le nombre de métriques personnalisées provenant de [COUNT][1] et [RATE][2] est calculé selon la même logique.

Le nombre de combinaisons de valeurs de tag uniques soumises pour une métrique RATE avec ce schéma de tag est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Cela conduit `request.Latency` à signaler **quatre métriques personnalisées**. 

### Effet de l'ajout de tags {#effect-of-adding-tags}

L'ajout de tags **peut ne pas** entraîner davantage de métriques personnalisées. Votre nombre de métriques personnalisées évolue généralement avec le tag le plus granulaire ou détaillé. Supposons que vous mesuriez la température aux États-Unis et que vous ayez tagué votre métrique `temperature` par pays et par région. Vous soumettez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de tag                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supposons que vous souhaitiez ajouter le tag `city` qui possède trois valeurs : `NYC`, `Miami` et `Orlando`. L'ajout de ce tag augmente le nombre de métriques personnalisées, car il apporte plus de détails et de granularité à votre jeu de données, comme illustré ci-dessous :

| Nom de la métrique   | Valeurs de tag                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de métriques personnalisées rapportées par `temperature` évolue avec le tag le plus granulaire, `city`.

Supposons que vous souhaitiez également taguer votre métrique de température par `state` (qui possède deux valeurs : `NY` et `Florida`). Cela signifie que vous taguez la température avec les tags : `country`, `region`, `state` et `city`. L'ajout du tag d'État n'augmente pas la granularité déjà apportée à votre jeu de données par le tag de ville.

Pour obtenir la température en Floride, vous pouvez recombiner les métriques personnalisées de :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : Réorganiser les valeurs des tags ne crée pas de nouvelle combinaison unique. Les combinaisons suivantes correspondent à la même métrique personnalisée :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer les tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits}

Les volumes de métriques personnalisées peuvent être affectés par la configuration des tags à l'aide de [Metrics without Limits™][3]. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation : vous pouvez donc continuer à envoyer toutes vos données à Datadog (toutes sont ingérées) et définir une liste de tags autorisés qui resteront interrogeables sur la plateforme Datadog. Étant donné que le volume de données ingérées par Datadog pour vos métriques configurées diffère désormais du volume plus faible que vous avez indexé, vous verrez deux volumes distincts sur votre page Usage ainsi que sur la page Metrics Catalog. 
 
- **Métriques personnalisées ingérées** : Le volume initial de métriques personnalisées calculé à partir de tous les tags ingérés (envoyés via le code)
- **Métriques personnalisées indexées** : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (en fonction des configurations de Metrics without Limits™) 

**Remarque : Seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous n'êtes facturé que pour son volume de métriques personnalisées indexées.

#### Quand êtes-vous facturé pour les métriques personnalisées ingérées ou indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques personnalisées indexées.

|                                      | Métriques personnalisées indexées<br>(sur la base du nombre mensuel moyen de métriques personnalisées par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota du compte                    | - Pro : 100 métriques personnalisées indexées par host <br>- Enterprise : 200 métriques personnalisées indexées par host                             |
| Utilisation supérieure au quota du compte | Pour chaque tranche de 100 métriques personnalisées indexées au-delà du quota du compte, vous payez le montant indiqué dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (les tags sont configurés), vous payez pour les métriques personnalisées ingérées et les métriques personnalisées indexées.

|                                      | Métriques personnalisées ingérées                                                                           | Métriques personnalisées indexées                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota du compte                    | - Pro : 100 métriques personnalisées ingérées par host<br>- Enterprise : 200 métriques personnalisées ingérées par host | - Pro : 100 métriques personnalisées indexées par host<br>- Enterprise : 200 métriques personnalisées indexées par host                               |
| Utilisation supérieure à l'allocation de compte | Pour chaque tranche de 100 Custom Metrics ingérées au-delà de l'allocation de compte, vous payez 0,10 $.                   | Pour chaque tranche de 100 Custom Metrics indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Supposons que vous souhaitiez utiliser Metrics without Limits™ pour réduire la taille de votre métrique `request.Latency` en ne conservant que les tags `endpoint` et `status`. Cela donne les trois combinaisons de tags uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

En raison de la configuration des tags, `request.Latency` rapporte un total de **3 Custom Metrics indexées**. Sur la base des tags d'origine envoyés sur cette métrique, le volume initial de **Custom Metrics ingérées** de `request.Latency` est de **4 Custom Metrics ingérées**.

Apprenez-en plus sur [Metrics without Limits™][3].

[1]: /fr/metrics/types/?tab=count#metric-types
[2]: /fr/metrics/types/?tab=rate#metric-types
[3]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Jauge" %}}
Le nombre de combinaisons uniques de valeurs de tags soumises pour une métrique de type jauge avec ce schéma de tags est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Cela entraîne le signalement de **quatre Custom Metrics** par `request.Latency`. 

### Effet de l'ajout de tags {#effect-of-adding-tags-1}

L'ajout de tags **peut ne pas** entraîner davantage de Custom Metrics. Votre nombre de Custom Metrics évolue généralement avec le tag le plus granulaire ou détaillé. Supposons que vous mesuriez la température aux États-Unis et que vous ayez tagué votre métrique `temperature` par pays et par région. Vous soumettez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de tag                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supposons que vous souhaitiez ajouter le tag `city` qui possède trois valeurs : `NYC`, `Miami` et `Orlando`. L'ajout de ce tag augmente le nombre de Custom Metrics, car il apporte plus de détails et de granularité à votre jeu de données, comme illustré ci-dessous :

| Nom de la métrique   | Valeurs de tag                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de Custom Metrics rapportées depuis `temperature` évolue avec le tag le plus granulaire, `city`.

Supposons que vous souhaitiez également taguer votre métrique de température par `state` (qui possède deux valeurs : `NY` et `Florida`). Cela signifie que vous taguez la température par `country`, `region`, `state` et `city`. L'ajout du tag d'État n'augmente pas le niveau de granularité déjà apporté à votre jeu de données par le tag de ville.

Pour obtenir la température en Floride, vous pouvez recombiner les Custom Metrics de :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : La réorganisation des valeurs de tag n'ajoute pas d'unicité. Les combinaisons suivantes correspondent à la même Custom Metric :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer des tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits-1}

Les volumes de Custom Metrics peuvent être affectés par la configuration de tags à l'aide de [Metrics without Limits™][4]. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation : vous pouvez donc continuer à envoyer toutes vos données à Datadog (tout est ingéré) et définir une liste d'autorisation des tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Étant donné que le volume de données que Datadog ingère pour vos métriques configurées diffère désormais du volume plus faible que vous avez indexé, vous verrez deux volumes distincts sur la page Usage ainsi que sur la page Metrics Catalog. 
 
- **Custom Metrics ingérées** : le volume initial de Custom Metrics basé sur tous les tags ingérés (envoyés via le code)
- **Custom Metrics indexées** : le volume de Custom Metrics qui reste interrogeable sur la plateforme Datadog (selon les configurations de Metrics without Limits™) 

**Remarque : Seules les métriques configurées contribuent à votre volume de Custom Metrics ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous n'êtes facturé que pour son volume de Custom Metrics indexées.

#### Quand êtes-vous facturé pour les Custom Metrics ingérées plutôt que pour les Custom Metrics indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les Custom Metrics indexées.

|                                      | Custom Metrics indexées<br> (calculées sur la base du nombre mensuel moyen de Custom Metrics par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 Custom Metrics indexées par host <br>- Enterprise : 200 Custom Metrics indexées par host                             |
| Utilisation supérieure à l'allocation de compte | Pour chaque tranche de 100 Custom Metrics indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (les tags sont configurés), vous payez pour les Custom Metrics ingérées et les Custom Metrics indexées.

|                                      | Custom Metrics ingérées                                                                           | Custom Metrics indexées                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 Custom Metrics ingérées par host<br>- Enterprise : 200 Custom Metrics ingérées par host | - Pro : 100 Custom Metrics indexées par host<br>- Enterprise : 200 Custom Metrics indexées par host                               |
| Utilisation supérieure à l'allocation de compte | Pour chaque tranche de 100 Custom Metrics ingérées au-delà de l'allocation de compte, vous payez 0,10 $.                   | Pour chaque tranche de 100 Custom Metrics indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Par défaut, les agrégations suivantes peuvent être utilisées pour les requêtes :
- group by `SUM` & rollup by `AVG`
- group by `MAX` & rollup by `AVG`
- group by `MIN` & rollup by `AVG`
- group by `AVG` & rollup by `SUM`
- group by `SUM` & rollup by `SUM`
- group by `MAX` & rollup by `MAX`
- group by `MIN` & rollup by `MIN`
- group by `SUM` & rollup by `COUNT`

Votre nombre de Custom Metrics indexées **n'augmente pas** avec le nombre d'agrégations activées.

En savoir plus sur [Metrics without Limits™][1].

[1]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**Une métrique HISTOGRAM génère par défaut cinq Custom Metrics pour chaque combinaison unique de nom de métrique et de valeurs de tags** afin de prendre en charge les agrégations côté Agent `max`, `median`, `avg`, `95pc` et `count`. [En savoir plus sur le type de métrique HISTOGRAM][1].

Le nombre de combinaisons de valeurs de tags uniques soumises pour une métrique HISTOGRAM avec ce schéma de tags est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Par défaut, l'Agent génère cinq Custom Metrics pour chacune des quatre combinaisons uniques d'origine de valeurs de tags afin de prendre en compte [chaque agrégation activée côté Agent][2] : `avg`, `count`, `median`, `95percentile` et `max`. Par conséquent, `request.Latency` rapporte un total de **4\*5 = 20 Custom Metrics**.

**Remarque** : l'ajout d'agrégations à vos métriques HISTOGRAM augmente le nombre de Custom Metrics distinctes rapportées. La suppression d'agrégations diminue le nombre de Custom Metrics rapportées.

- Configurez l'agrégation que vous souhaitez envoyer à Datadog avec le paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][3]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. `sum` et `min` sont également disponibles si vous le souhaitez.
- Configurez l'agrégation de centiles que vous souhaitez envoyer à Datadog avec le paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][3]. Par défaut, seul `95percentile`, le 95e centile, est envoyé à Datadog.


[1]: /fr/metrics/types/?tab=histogram#metric-types
[2]: /fr/metrics/types/?tab=histogram#definition
[3]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**Une métrique DISTRIBUTION génère par défaut cinq Custom Metrics pour chaque combinaison unique de nom de métrique et de valeurs de tags** afin de représenter la distribution statistique globale des valeurs. Ces cinq Custom Metrics représentent des agrégations côté serveur de `count`, `sum`, `min`, `max` et `avg`. [En savoir plus sur le type de métrique DISTRIBUTION][1].

Le nombre de combinaisons de valeurs de tags uniques soumises pour une métrique DISTRIBUTION avec ce schéma de tags est de **quatre**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Le nombre de Custom Metrics issues d'une [métrique DISTRIBUTION][1] est égal à cinq fois le nombre de combinaisons uniques de nom de métrique et de valeurs de tags. Cela conduit `request.Latency` à comptabiliser un total de **5\*4 = 20 Custom Metrics**.

##### Ajout d'agrégations de centiles {#adding-percentile-aggregations}

Vous pouvez inclure des agrégations de centiles (`p50`, `p75`, `p90`, `p95` et `p99`) sur votre métrique de distribution. L'inclusion de ces agrégations de centiles supplémentaires entraîne un volume additionnel égal à cinq fois le nombre de combinaisons uniques de nom de métrique et de valeurs de tags (**5\*4 = 20 Custom Metrics**). Par conséquent, le nombre total de Custom Metrics émises par cette métrique de distribution avec agrégations de centiles est de **2 * (5\*4) = 40 Custom Metrics**.

Ce tableau résume l'effet de l'ajout d'agrégations de centiles à toute métrique de distribution. 

| Métriques                                                                                   | Nombre de Custom Metrics facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Nombre de Custom Metrics issues d'une distribution de base (count, sum, min, max, avg)         | `5*(tag value combinations)`      |
| Nombre de Custom Metrics résultant de l'ajout des agrégations de centiles (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configurer des tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits-2}

Les volumes de Custom Metrics peuvent être affectés par la configuration de tags et d'agrégations à l'aide de [Metrics without Limits™][2]. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Vous pouvez donc continuer à envoyer toutes vos données à Datadog (tout est ingéré) et définir une liste de tags autorisés que vous souhaitez pouvoir continuer à interroger sur la plateforme Datadog. Étant donné que le volume de données que Datadog ingère pour vos métriques configurées diffère désormais du volume plus faible que vous avez indexé, vous verrez deux volumes distincts sur la page Usage et sur la page Metrics Catalog. 
 
- **Custom Metrics ingérées** : le volume initial de Custom Metrics basé sur tous les tags ingérés (envoyés via le code)
- **Custom Metrics indexées** : le volume de Custom Metrics qui reste interrogeable sur la plateforme Datadog (selon les configurations Metrics without Limits™) 

**Remarque : seules les métriques configurées contribuent à votre volume de Custom Metrics ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous n'êtes facturé que pour son volume de Custom Metrics indexées.

#### Quand êtes-vous facturé pour les Custom Metrics ingérées et les Custom Metrics indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les Custom Metrics indexées.

|                                      | Custom Metrics indexées<br>(sur la base du nombre moyen mensuel de Custom Metrics par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota du compte                    | - Pro : 100 Custom Metrics indexées par host <br>- Enterprise : 200 Custom Metrics indexées par host                             |
| Utilisation supérieure au quota du compte | Pour chaque tranche de 100 Custom Metrics indexées au-delà du quota du compte, vous payez un montant spécifié dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (tags/agrégations configurés), vous payez pour les Custom Metrics ingérées et les Custom Metrics indexées.

|                                      | Custom Metrics ingérées                                                                           | Custom Metrics indexées                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota du compte                    | - Pro : 100 Custom Metrics ingérées par host<br>- Enterprise : 200 Custom Metrics ingérées par host | - Pro : 100 Custom Metrics indexées par host<br>- Enterprise : 200 Custom Metrics indexées par host                               |
| Utilisation supérieure au quota du compte | Pour chaque tranche de 100 Custom Metrics ingérées au-delà du quota du compte, vous payez $0.10.                   | Pour chaque tranche de 100 Custom Metrics indexées au-delà du quota du compte, vous payez un montant spécifié dans votre contrat actuel. |

Supposons que vous souhaitiez conserver uniquement les tags `endpoint` et `status` associés à la métrique `request.Latency`. Cela donne les trois combinaisons de tags uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Le nombre de Custom Metrics issues d'une [métrique DISTRIBUTION][1] est égal à cinq fois le nombre de combinaisons uniques de nom de métrique et de valeurs de tags. À la suite de la personnalisation des tags, `request.Latency` comptabilise un total de **5\*3 = 15 Custom Metrics indexées**. Sur la base des tags d'origine envoyés sur cette métrique, le volume initial de custom metrics **ingérées** de `request.Latency` est de **20 custom metrics ingérées**.

En savoir plus sur [Metrics without Limits™][2].

[1]: /fr/metrics/types/?tab=distribution#definition
[2]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Suivi des custom metrics {#tracking-custom-metrics}

Les utilisateurs administrateurs (ceux disposant de [rôles Datadog Admin][7]) peuvent consulter le nombre moyen mensuel de custom metrics **ingérées** et **indexées** par heure. Le tableau des principales custom metrics indique également le nombre moyen de custom metrics **indexées** sur la [page des détails d'utilisation][8]. Consultez la documentation [Usage Details][9] pour plus d'informations.

Pour suivre plus précisément en temps réel le nombre de custom metrics pour un nom de métrique spécifique, cliquez sur le nom de la métrique sur la [page Metrics Catalog][10]. Vous pouvez afficher le nombre de custom metrics **ingérées** et de custom metrics **indexées** dans le panneau latéral des détails de la métrique. 

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Panneau latéral de Metrics Catalog" style="width:80%;">}}


## Allocation {#allocation}

Un certain nombre de custom metrics **ingérées** et **indexées** vous est alloué en fonction de votre plan tarifaire Datadog :

- Pro : 100 custom metrics ingérées par host et 100 custom metrics indexées par host
- Enterprise : 200 custom metrics ingérées par host et 200 custom metrics indexées par host

Ces allocations sont comptabilisées sur l'ensemble de votre infrastructure. Par exemple, si vous utilisez le plan Pro et disposez d'une licence pour trois hosts, 300 custom metrics indexées vous sont allouées. Les 300 custom metrics indexées peuvent être réparties équitablement entre les hosts, ou les 300 custom metrics indexées peuvent être utilisées par un seul host. En utilisant cet exemple, le graphique ci-dessous présente des scénarios qui ne dépassent pas le nombre de custom metrics allouées :

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Allocations de custom metrics" >}}

Le nombre facturable de custom metrics indexées est basé sur le nombre moyen de custom metrics (provenant de tous les hosts payants) par heure sur un mois donné. Le nombre facturable de custom metrics ingérées n'augmente que si vous avez utilisé Metrics without Limits™ pour configurer votre métrique. Contactez le service [Sales][11] ou votre responsable [Customer Success][12] pour discuter des custom metrics pour votre compte ou pour acheter un forfait de custom metrics supplémentaire.

## Dépannage {#troubleshooting}

Pour toute question technique, contactez [l'assistance Datadog][13].

Pour toute question relative à la facturation, contactez votre responsable [Customer Success][12].

[1]: /fr/integrations/
[2]: /fr/metrics/custom_metrics/
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /fr/metrics/custom_metrics/agent_metrics_submission/
[5]: /fr/metrics/metrics-without-limits
[6]: /fr/metrics/types/#metric-types
[7]: /fr/account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /fr/account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/catalog
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /fr/help/
[14]: /fr/metrics/custom_metrics/#standard-integrations
[15]: /fr/account_management/billing/metric_name_pricing/