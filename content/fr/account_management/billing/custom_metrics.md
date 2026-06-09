---
algolia:
  tags:
  - custom metrics billing
aliases:
- /fr/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /metrics/custom_metrics/
  tag: Documentation
  text: En savoir plus sur les métriques personnalisées
- link: /metrics/guide/custom_metrics_governance/
  tag: Guide
  text: Meilleures pratiques pour la gouvernance des métriques personnalisées
title: Facturation des métriques custom
---
## Aperçu {#overview}

Si une métrique n'est pas soumise par l'une des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1], elle est considérée comme une [métrique personnalisée][2]. Certaines intégrations standard peuvent également potentiellement émettre des métriques personnalisées. Pour plus d'informations, voir [métriques personnalisées et intégrations standard][14].

**Une métrique personnalisée est identifiée de manière unique par une combinaison d'un nom de métrique et de valeurs de balise (y compris la balise hôte)**. En général, toute métrique que vous envoyez en utilisant [DogStatsD][3] ou via un [Agent Check personnalisé][4] est une métrique personnalisée.

Votre utilisation mensuelle des métriques personnalisées facturables (réflétée sur la page d'utilisation) est calculée en prenant le total de toutes les métriques personnalisées distinctes (également connues sous le nom de séries temporelles) pour chaque heure d'un mois donné, et en le divisant par le nombre d'heures dans le mois pour obtenir une valeur moyenne mensuelle. Votre utilisation facturable n'est pas impactée par la fréquence de soumission des points de données ou le nombre de requêtes que vous exécutez sur vos métriques.

Les utilisateurs de Metrics without Limits™ voient les volumes mensuels facturables pour _ingérés_ et _indexés_ des métriques personnalisées sur leur page d'utilisation. En savoir plus sur les métriques personnalisées ingérées et indexées et [Metrics without Limits™][5]. 

## Comptage des métriques personnalisées {#counting-custom-metrics}

Le nombre de métriques personnalisées associées à un nom de métrique particulier dépend de son [type de soumission de métrique][6]. Voici des exemples de la façon de compter vos métriques personnalisées en fonction du scénario suivant :

Supposons que vous soumettiez une métrique, `request.Latency`, depuis deux hôtes (`host:A`,`host:B`), qui mesure la latence de vos requêtes d'endpoint. Vous soumettez cette métrique avec deux clés de balise :

- `endpoint`, qui a la valeur `endpoint:X` ou `endpoint:Y`.
- `status`, qui a la valeur `status:200` ou `status:400`.

Supposons que dans vos données, `endpoint:X` soit pris en charge par les deux hôtes, mais échoue uniquement sur `host:B`. Supposons également que les demandes à `endpoint:Y` soient toujours réussies et n'apparaissent que sur `host:B` comme indiqué ci-dessous :

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence de la demande" style="width:80%;">}}

{{< tabs >}}
{{% tab "Nombre, Taux"%}}

La même logique est appliquée pour calculer le nombre de métriques custom pour les métriques de type [COUNT][1] et [RATE][2].

Le nombre de combinaisons de valeurs de balises uniques soumises pour une métrique de TAUX avec ce schéma de balisage est **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Cela se traduit par `request.Latency` rapportant **quatre métriques personnalisées**. 

### Effet de l'ajout de balises {#effect-of-adding-tags}

L'ajout de balises **peut ne pas** entraîner plus de métriques personnalisées. Votre nombre de métriques personnalisées évolue généralement avec la balise la plus granulaire ou détaillée. Supposons que vous mesuriez la température aux États-Unis, et que vous ayez étiqueté votre `temperature` métrique par pays et région. Vous soumettez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de balises                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supposons que vous souhaitiez ajouter la balise `city` qui a trois valeurs : `NYC`, `Miami` et `Orlando`. L'ajout de cette balise augmente le nombre de métriques personnalisées car elle fournit plus de détails et de granularité à votre ensemble de données comme indiqué ci-dessous :

| Nom de la métrique   | Valeurs de balises                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de métriques personnalisées rapportées par `temperature` évolue avec le tag le plus granulaire, `city`.

Supposons que vous souhaitiez également taguer votre métrique de température par `state` (qui a deux valeurs : `NY` et `Florida`). Cela signifie que vous taguez la température par les tags : `country`, `region`, `state` et `city`. Ajouter le tag d'état n'augmente pas le niveau de granularité déjà présent dans votre ensemble de données fourni par le tag de la ville.

Pour connaître la température en Floride, vous pouvez combiner les métriques custom suivantes :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : Le réordonnancement des valeurs de tag n'ajoute pas d'unicité. Les combinaisons suivantes sont la même métrique personnalisée :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer des tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits}

Les volumes de métriques personnalisées peuvent être impactés par la configuration des tags en utilisant [Metrics without Limits™][3]. Metrics without Limits™ découple les coûts d'ingestion des coûts d'indexation -- vous pouvez continuer à envoyer à Datadog toutes vos données (tout est ingéré) et vous pouvez spécifier une liste blanche de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Étant donné que le volume de données que Datadog ingère pour vos métriques configurées diffère maintenant du volume plus petit restant que vous avez indexé, vous verrez deux volumes distincts sur votre page d'utilisation ainsi que sur la page de résumé des métriques. 
 
- **Métriques personnalisées ingérées** : Le volume original de métriques personnalisées basé sur tous les tags ingérés (envoyés par code)
- **Métriques personnalisées indexées** : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (basé sur toute configuration de Metrics without Limits™) 

**Remarque : Seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous ne payez que pour son volume de métriques personnalisées indexées.

#### Quand êtes-vous facturé pour les métriques ingérées par rapport aux métriques indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques personnalisées indexées.

|                                      | Métriques personnalisées indexées<br>(basées sur le nombre moyen mensuel de métriques personnalisées par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 métriques personnalisées indexées par hôte <br>- Entreprise : 200 métriques personnalisées indexées par hôte |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées ingérées au-delà de l'allocation de compte, vous payez 0,10 $.                   Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (les balises sont configurées), vous payez pour les métriques personnalisées ingérées et les métriques personnalisées indexées.

|                                      | Métriques personnalisées ingérées                                                                           | Métriques personnalisées indexées                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 métriques personnalisées ingérées par hôte<br>- Entreprise : 200 métriques personnalisées ingérées par hôte | - Pro : 100 métriques personnalisées indexées par hôte<br>- Entreprise : 200 métriques personnalisées indexées par hôte                               |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées ingérées au-delà de l'allocation de compte, vous payez 0,10 $.                   | Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Supposons que vous souhaitiez utiliser Metrics without Limits™ pour réduire la taille de votre `request.Latency` métrique en ne conservant que les balises `endpoint` et `status`. Cela donne les trois combinaisons de balises uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

En raison de la configuration des balises, `request.Latency` rapportant un total de **3 métriques personnalisées indexées** . Sur la base des balises d'origine envoyées sur cette métrique, le volume original de **métriques personnalisées ingérées** de `request.Latency` est **4 métriques personnalisées ingérées**.

En savoir plus sur [Metrics without Limits™][3].

[1]: /fr/metrics/types/?tab=count#metric-types
[2]: /fr/metrics/types/?tab=rate#metric-types
[3]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
Le nombre de combinaisons de valeurs de balises uniques soumises pour une métrique GAUGE avec ce schéma de balisage est **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Cela se traduit par `request.Latency` rapportant **quatre métriques personnalisées**. 

### Effet de l'ajout de balises {#effect-of-adding-tags-1}

L'ajout de balises **peut ne pas** entraîner plus de métriques personnalisées. Votre nombre de métriques personnalisées évolue généralement avec la balise la plus granulaire ou détaillée. Supposons que vous mesuriez la température aux États-Unis, et que vous ayez étiqueté votre `temperature` métrique par pays et région. Vous soumettez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de balises                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Supposons que vous souhaitiez ajouter la balise `city` qui a trois valeurs : `NYC`, `Miami` et `Orlando`. L'ajout de ce tag augmente le nombre de métriques personnalisées car il fournit plus de détail et de granularité à votre ensemble de données, comme indiqué ci-dessous :

| Nom de la métrique   | Valeurs de tag                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de métriques personnalisées rapportées par `temperature` évolue avec le tag le plus granulaire, `city`.

Supposons que vous souhaitiez également étiqueter votre métrique de température par `state` (qui a deux valeurs : `NY` et `Florida`). Cela signifie que vous étiquetez la température par `country`, `region`, `state`, et `city`. Ajouter le tag état n'augmente pas le niveau de granularité déjà présent dans votre ensemble de données fourni par le tag ville.

Pour connaître la température en Floride, vous pouvez combiner les métriques custom suivantes :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque **: Le réordonnancement des valeurs de tag n'ajoute pas d'unicité. Les combinaisons suivantes sont la même métrique personnalisée :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer des tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits-1}

Les volumes de métriques personnalisées peuvent être impactés par la configuration des tags utilisant [Metrics without Limits™][4]. Metrics without Limits™ découple les coûts d'ingestion des coûts d'indexation -- vous pouvez donc continuer à envoyer à Datadog toutes vos données (tout est ingéré) et vous pouvez spécifier une liste blanche de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Étant donné que le volume de données que Datadog ingère pour vos métriques configurées diffère maintenant du volume plus petit restant que vous avez indexé, vous verrez deux volumes distincts sur votre page d'utilisation ainsi que sur la page de résumé des métriques. 
 
- **Métriques personnalisées ingérées** : Le volume original de métriques personnalisées basé sur tous les tags ingérés (envoyés par code)
- **Métriques personnalisées indexées** : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (basé sur toute configuration de Metrics without Limits™) 

**Remarque : Seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous ne payez que pour son volume de métriques personnalisées indexées.

#### Quand êtes-vous facturé pour les métriques ingérées par rapport aux métriques indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-1}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques personnalisées indexées.

|                                      | Métriques personnalisées indexées<br>(basées sur le nombre moyen mensuel de métriques personnalisées par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 métriques personnalisées indexées par hôte <br>- Entreprise : 200 métriques personnalisées indexées par hôte                             |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (les tags sont configurés), vous payez pour les métriques personnalisées ingérées et les métriques personnalisées indexées.

|                                      | Métriques personnalisées ingérées                                                                           | Métriques personnalisées indexées                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte                    | - Pro : 100 métriques personnalisées ingérées par hôte<br>- Entreprise : 200 métriques personnalisées ingérées par hôte | - Pro : 100 métriques personnalisées indexées par hôte<br>- Entreprise : 200 métriques personnalisées indexées par hôte                               |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées ingérées au-delà de l'allocation de compte, vous payez 0,10 $.                   | Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Par défaut, les agrégations suivantes peuvent être utilisées pour les requêtes :
- grouper par `SUM` et rollup par `AVG`
- grouper par `MAX` et rollup par `AVG`
- grouper par `MIN` et rollup par `AVG`
- grouper par `AVG` et rollup par `SUM`
- grouper par `SUM` et rollup par `SUM`
- grouper par `MAX` et rollup par `MAX`
- grouper par `MIN` et rollup par `MIN`
- grouper par `SUM` et rollup par `COUNT`

Votre nombre de métriques personnalisées indexées **n'évolue pas** avec le nombre d'agrégations activées.

En savoir plus sur [Metrics without Limits™][1].

[1]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**Une métrique HISTOGRAM génère par défaut cinq métriques personnalisées pour chaque combinaison unique de nom de métrique et de valeurs de tag** pour prendre en charge les agrégations côté Agent `max`, `median`, `avg`, `95pc` et `count`. [En savoir plus sur le type de métrique HISTOGRAM][1].

Le nombre de combinaisons de valeurs de tag uniques soumises pour une métrique HISTOGRAM avec ce schéma de tagging est **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Par défaut, l'Agent génère cinq métriques personnalisées pour chacune des quatre combinaisons uniques de valeurs de tag d'origine pour tenir compte [de chaque agrégation côté Agent activée][2] : `avg`, `count`, `median`, `95percentile` et `max`. Par conséquent, `request.Latency` rapporte un total de **4\*5 = 20 métriques personnalisées**.

**Remarque** : Ajouter des agrégations à vos métriques HISTOGRAM augmente le nombre de métriques personnalisées distinctes rapportées. La suppression des agrégations diminue le nombre de métriques personnalisées rapportées.

- Configurez l'agrégation que vous souhaitez envoyer à Datadog avec le paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][3]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. `sum` et `min` sont également disponibles si désiré.
- Configurez l'agrégation de percentile que vous souhaitez envoyer à Datadog avec le paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][3]. Par défaut, seul le percentile `95percentile`, le 95e percentile, est envoyé à Datadog.


[1]: /fr/metrics/types/?tab=histogram#metric-types
[2]: /fr/metrics/types/?tab=histogram#definition
[3]: /fr/agent/configuration/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**Une métrique de DISTRIBUTION génère par défaut cinq métriques personnalisées pour chaque combinaison unique de nom de métrique et de valeurs de tag** afin de représenter la distribution statistique globale des valeurs. Ces cinq métriques personnalisées représentent des agrégations côté serveur de `count`, `sum`, `min`, `max` et `avg`. [En savoir plus sur le type de métrique DISTRIBUTION][1].

Le nombre de combinaisons uniques de valeurs de tag soumises pour une métrique de DISTRIBUTION avec ce schéma de tagging est **quatre**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Le nombre de métriques personnalisées d'une [métrique de DISTRIBUTION][1] est cinq fois la combinaison unique de nom de métrique et de valeurs de tag. Cela donne `request.Latency` un total de **5\*4 = 20 métriques personnalisées**.

##### Ajout d'agrégations de percentile {#adding-percentile-aggregations}

Vous pouvez inclure des agrégations de percentile (`p50`, `p75`, `p90`, `p95` et `p99`) sur votre métrique de distribution. L'inclusion de ces agrégations de percentile supplémentaires entraîne un volume supplémentaire de cinq fois la combinaison unique de nom de métrique et de valeurs de tag (**5\*4 = 20 métriques personnalisées**). Par conséquent, le nombre total de métriques personnalisées émises par cette métrique de distribution avec des agrégations de percentile est **2 * (5\*4) = 40 métriques personnalisées**.

Le tableau ci-dessous résume l'impact de l'ajout d'agrégations par centile pour une distribution de métrique. 

| Métriques                                                                                   | Nombre de métriques personnalisées facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Nombre de métriques personnalisées d'une distribution de base (compte, somme, min, max, avg)         | `5*(tag value combinations)`      |
| Nombre de métriques personnalisées incluant des agrégations de percentile (p50, p75, p90, p95, p99) | `5*(tag value combinations)`      |
| Total                                                                                     | `2*5(tag value combinations)`     |

### Configurer des tags avec Metrics without Limits™ {#configure-tags-with-metrics-without-limits-2}

Les volumes de métriques personnalisées peuvent être affectés par la configuration des tags et des agrégations en utilisant [Metrics without Limits™][2]. Metrics without Limits™ découple les coûts d'ingestion des coûts d'indexation -- vous pouvez continuer à envoyer à Datadog toutes vos données (tout est ingéré) et vous pouvez spécifier une liste blanche de tags que vous souhaitez garder interrogeables sur la plateforme Datadog. Étant donné que le volume de données que Datadog ingère pour vos métriques configurées diffère maintenant du volume plus petit restant que vous avez indexé, vous verrez deux volumes distincts sur votre page d'utilisation ainsi que sur la page de résumé des métriques. 
 
- **Métriques personnalisées ingérées** : Le volume original de métriques personnalisées sur toutes les balises ingérées (envoyées par code)
- **Métriques personnalisées indexées** : Le volume de métriques personnalisées qui reste interrogeable sur la plateforme Datadog (en fonction de toute configuration Metrics without Limits™) 

**Remarque : Seules les métriques configurées contribuent à votre volume de métriques personnalisées ingérées.** Si une métrique n'est pas configurée avec Metrics without Limits™, vous ne payez que pour son volume de métriques personnalisées indexées.

#### Quand êtes-vous facturé pour les métriques personnalisées ingérées par rapport aux métriques personnalisées indexées ? {#when-are-you-charged-for-ingested-vs-indexed-custom-metrics-2}
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques personnalisées indexées.

|                                      | Métriques personnalisées indexées<br> (basé sur le nombre moyen mensuel de métriques personnalisées par heure) |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte | - Pro : 100 métriques personnalisées indexées par hôte <br>- Entreprise : 200 métriques personnalisées indexées par hôte |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (les balises/agrégations sont configurées), vous payez pour les métriques personnalisées ingérées et les métriques personnalisées indexées.

|                                      | Métriques personnalisées ingérées | Métriques personnalisées indexées |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Allocation de compte | - Pro : 100 métriques personnalisées ingérées par hôte<br>- Entreprise : 200 métriques personnalisées ingérées par hôte | - Pro : 100 métriques personnalisées indexées par hôte<br>- Entreprise : 200 métriques personnalisées indexées par hôte |
| Utilisation supérieure à l'allocation de compte | Pour chaque 100 métriques personnalisées ingérées au-delà de l'allocation de compte, vous payez 0,10 $. | Pour chaque 100 métriques personnalisées indexées au-delà de l'allocation de compte, vous payez un montant spécifié dans votre contrat actuel. |

Supposons que vous souhaitiez conserver uniquement les balises `endpoint` et `status` associées à la métrique `request.Latency`. Cela donne les trois combinaisons de balises uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Le nombre de métriques personnalisées d'une [métrique de DISTRIBUTION][1] est cinq fois la combinaison unique de nom de métrique et de valeurs de tag. En raison de la personnalisation des balises, `request.Latency` rapportant un total de **5\*3 = 15 métriques personnalisées indexées**. Basé sur les balises originales envoyées sur cette métrique, le volume original de métriques personnalisées **ingérées** de `request.Latency` est **20 métriques personnalisées ingérées**.

En savoir plus sur [Metrics without Limits™][2].

[1]: /fr/metrics/types/?tab=distribution#definition
[2]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Suivi des métriques personnalisées {#tracking-custom-metrics}

Les utilisateurs administratifs (ceux ayant [des rôles d'administrateur Datadog][7]) peuvent voir le nombre moyen mensuel de **métriques personnalisées ingérées** et **indexées** par heure. Le tableau des métriques personnalisées les plus importantes indique également le nombre moyen de **métriques personnalisées indexées** sur la [page des détails d'utilisation][8]. Consultez la documentation [Détails d'utilisation][9] pour plus d'informations.

Pour un suivi en temps réel du nombre de métriques personnalisées pour un nom de métrique particulier, cliquez sur le nom de la métrique sur la [page de résumé des métriques][10]. Vous pouvez voir le nombre de **métriques personnalisées ingérées** et **indexées** sur le panneau latéral des détails de la métrique. 

{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested_3142025.jpg" alt="Panneau latéral du résumé des métriques" style="width:80%;">}}


## Allocation {#allocation}

Un certain nombre de **métriques personnalisées ingérées** et **indexées** vous est alloué en fonction de votre plan tarifaire Datadog :

- Pro : 100 métriques personnalisées ingérées par hôte et 100 métriques personnalisées indexées par hôte
- Entreprise : 200 métriques personnalisées ingérées par hôte et 200 métriques personnalisées indexées par hôte

Ces allocations sont comptées sur l'ensemble de votre infrastructure. Par exemple, si vous êtes sur le plan Pro et licencié pour trois hôtes, 300 métriques personnalisées indexées sont allouées. Les 300 métriques personnalisées indexées peuvent être réparties également entre chaque hôte, ou les 300 métriques personnalisées indexées peuvent être utilisées par un seul hôte. Pour cet exemple, le graphique ci-dessous indique des scénarios respectant le nombre de métriques custom attribuées :

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Allocations pour les métriques personnalisées" >}}

Le nombre facturable de métriques personnalisées indexées est basé sur le nombre moyen de métriques personnalisées (provenant de tous les hôtes payants) par heure sur un mois donné. Le nombre facturable de métriques personnalisées ingérées n'augmente que si vous avez utilisé Metrics without Limits™ pour configurer votre métrique. Contactez [Ventes][11] ou votre [Responsable du succès client][12] pour discuter des métriques personnalisées pour votre compte ou pour acheter un package supplémentaire de métriques personnalisées.

## Dépannage {#troubleshooting}

Pour des questions techniques, contactez [le support Datadog][13].

Pour des questions de facturation, contactez votre [Responsable du succès client][12].

[1]: /fr/integrations/
[2]: /fr/metrics/custom_metrics/
[3]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[4]: /fr/metrics/custom_metrics/agent_metrics_submission/
[5]: /fr/metrics/metrics-without-limits
[6]: /fr/metrics/types/#metric-types
[7]: /fr/account_management/users/default_roles/
[8]: https://app.datadoghq.com/billing/usage
[9]: /fr/account_management/plan_and_usage/usage_details/
[10]: https://app.datadoghq.com/metric/summary
[11]: mailto:sales@datadoghq.com
[12]: mailto:success@datadoghq.com
[13]: /fr/help/
[14]: /fr/metrics/custom_metrics/#standard-integrations