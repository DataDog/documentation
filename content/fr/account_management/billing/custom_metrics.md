---
aliases:
- /fr/integrations/faq/what-standard-integrations-emit-custom-metrics/
further_reading:
- link: /observability_pipelines/guide/custom-metrics-governance
  tag: Documentation
  text: Utiliser des pipelines d'observabilité pour contrôler vos métriques custom
title: Facturation des métriques custom
---

Si une métrique n'est pas envoyée depuis l'une des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1], elle est considérée comme une [métrique custom][2]<sup>[(1)](#integrations-standard)</sup>.

**Une métrique custom correspond à une combinaison unique de nom de métrique et de valeurs de tag (y compris le tag du host)**. En général, les métriques envoyées par [DogStatsD][25] ou via un [check d'Agent custom][26] sont des métriques custom.

Le nombre de métriques custom mensuelles facturables (qui est indiqué sur la page Usage) est calculé à partir de la formule suivante : Total de métriques custom distinctes pour chaque heure d'un mois donné / nombre d'heures du mois. Cette formule permet d'obtenir une moyenne mensuelle.

Les utilisateurs de Metrics without Limits™ peuvent consulter les volumes mensuels facturables pour les métriques custom _ingérées_ et _indexées_ sur leur page Usage. En savoir plus sur les métriques custom ingérées et indexées et sur la solution [Metrics without Limits™][3]. 

## Calcul du nombre de métriques custom

Le nombre de métriques custom associées à un nom de métrique donné dépend du [type de métrique envoyé][4]. Vous trouverez ci-dessous des exemples de calculs basés sur le scénario suivant :

Une métrique intitulée `request.Latency` est envoyée à partir de deux hosts (`host:A`,`host:B`) afin de mesurer la latence des requêtes envoyées à vos endpoints. Vous envoyez cette métrique avec deux clés de tag :

- `endpoint`, qui a pour valeur `endpoint:X` ou `endpoint:Y` ;
- `status`, qui a pour valeur `status:200` ou `status:400`.

Imaginons que dans vos données, `endpoint:X` est pris en charge par les deux hosts mais échoue uniquement pour `host:B`. Imaginons également que les requêtes envoyées à `endpoint:Y` réussissent toujours et apparaissent uniquement pour `host:B`, comme illustré ci-dessous :

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence des requêtes" style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate"%}}

La même logique est appliquée pour calculer le nombre de métriques custom pour les métriques de type [COUNT][1] et [RATE][2].

Le nombre de combinaisons de valeurs de tag uniques envoyées pour une métrique RATE avec ce schéma de tagging est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Ici, la métrique `request.Latency` envoie donc **quatre métriques custom**.

### Conséquences de l'ajout de tags

L'ajout de tags **n'augmente pas forcément** le nombre de métriques custom. Le nombre de métriques custom dépend généralement du tag le plus granulaire ou le plus détaillé. Imaginons que vous mesurez la température aux États-Unis et que votre métrique `temperature` est taguée en fonction du pays et de la région. Vous envoyez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de tag                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Imaginons que vous souhaitiez ajouter le tag `city`, qui prend trois valeurs différentes : `NYC`, `Miami` et `Orlando`. Comme le montre le tableau ci-dessous, l'ajout de ce tag augmente le nombre de métriques custom étant donné qu'il rend vos données plus granulaires :

| Nom de la métrique   | Valeurs de tag                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de métriques custom envoyées par la métrique `temperature` dépend du tag le plus granulaire, c'est-à-dire `city`.

Imaginons que vous souhaitiez appliquer le tag `state` à votre métrique `temperature`, et que ce tag prenne deux valeurs : `NY` et `Florida`. La température est alors associée aux tags suivants : `country`, `region`, `state` et `city`. La granularité du tag `state` n'étant pas supérieure à celle du tag `city`, l'ajout de ce tag n'augmente pas la granularité de vos données.

Pour connaître la température en Floride, vous pouvez combiner les métriques custom suivantes :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : l'ordre des tags n'a pas d'influence sur le nombre de métriques custom. Les combinaisons suivantes correspondent à la même métrique custom :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer des tags et des agrégations avec Metrics without Limits™

La configuration de tags et d'agrégations à l'aide de [Metrics without Limits™][3] peut avoir une incidence sur les volumes de métriques custom. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Ainsi, vous pouvez continuer à envoyer toutes vos données à Datadog (toutes les informations sont ingérées) et ajouter des tags à une liste d'autorisation afin que seuls ces tags puissent être interrogés sur la plateforme Datadog. Comme le volume de données ingérées par Datadog pour les métriques que vous avez configurées est maintenant différent du volume de données indexées, qui est plus petit, deux volumes distincts s'affichent sur votre page Usage et sur la page Metrics Summary. 

- **Ingested Custom Metrics** : le volume initial de métriques custom basé sur tous les tags ingérés (qui ont été envoyés par le code).
- **Indexed Custom Metrics** : le volume de métriques custom pouvant être interrogées sur la plateforme Datadog (en fonction des configurations Metrics without Limits™).

**Remarque : seules les métriques configurées rentrent en compte dans le calcul du volume des métriques custom.** Si vous n'avez pas configuré Metrics without Limits™ pour une métrique, seul le volume des métriques custom indexées vous est facturé.

#### Dans quels cas les métriques custom ingérées ou indexées vous sont-elles facturées ?
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques custom indexées.

|                                      | Métriques custom indexées<br>(en fonction du nombre moyen mensuel de métriques custom par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom indexées par host <br>- Enterprise : 200 métriques custom indexées par host                             |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (des tags/agrégations sont configurés), vous payez pour les métriques custom ingérées et les métriques custom indexées.

|                                      | Métriques custom ingérées                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom ingérées par host<br>- Enterprise : 200 métriques custom ingérées par host | - Pro : 100 métriques custom indexées par host<br>- Enterprise : 200 métriques custom indexées par host                               |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom ingérées supplémentaires vous est facturé 0,10 $.                   | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Imaginons que vous souhaitiez utiliser Metrics without Limits™ pour réduire le volume de votre métrique `request.Latency` en conservant uniquement les tags `endpoint` et `status`. Vous obtenez les trois combinaisons de tags uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Une ces tags configurés, la métrique `request.Latency` envoie **3 métriques custom indexées** au total. En se basant sur les tags envoyés initialement sur cette métrique, le volume initial de métriques custom **ingérées** pour la métrique `request.Latency` est de **4 métriques custom ingérées**.

Par défaut, Datadog stocke la combinaison des agrégations les plus souvent interrogées en fonction du type de métrique afin d'assurer la précision mathématique de la requête associée à la métrique que vous avez configurée.

- Les métriques count/rate configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type `SUM`.

Vous pouvez ajouter d'autres agrégations en cas de besoin. Le nombre de métriques custom indexées dépend du nombre d'agrégations activées. 

En savoir plus sur [Metrics without Limits™][3].

[1]: /fr/metrics/types/?tab=count#metric-types
[2]: /fr/metrics/types/?tab=rate#metric-types
[3]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Gauge" %}}
Le nombre de combinaisons de valeurs de tag uniques envoyées pour une métrique GAUGE avec ce schéma de tagging est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Ici, la métrique `request.Latency` envoie donc **quatre métriques custom**.

### Conséquences de l'ajout de tags

L'ajout de tags **n'augmente pas forcément** le nombre de métriques custom. Le nombre de métriques custom dépend généralement du tag le plus granulaire ou le plus détaillé. Imaginons que vous mesurez la température aux États-Unis et que votre métrique `temperature` est taguée en fonction du pays et de la région. Vous envoyez ce qui suit à Datadog :

| Nom de la métrique   | Valeurs de tag                         |
|---------------|------------------------------------|
| `temperature` | `country:USA`, `region: Northeast` |
| `temperature` | `country:USA`, `region: Southeast` |

Imaginons que vous souhaitiez ajouter le tag `city`, qui prend trois valeurs différentes : `NYC`, `Miami` et `Orlando`. Comme le montre le tableau ci-dessous, l'ajout de ce tag augmente le nombre de métriques custom étant donné qu'il rend vos données plus granulaires :

| Nom de la métrique   | Valeurs de tag                                          |
|---------------|-----------------------------------------------------|
| `temperature` | `country:USA`, `region: Northeast`, `city: NYC`     |
| `temperature` | `country:USA`, `region: Southeast`, `city: Orlando` |
| `temperature` | `country:USA`, `region: Southeast`, `city: Miami`   |

Le nombre de métriques custom envoyées par la métrique `temperature` dépend du tag le plus granulaire, c'est-à-dire `city`.

Imaginons que vous souhaitiez appliquer le tag `state` à votre métrique `temperature`, et que ce tag prenne deux valeurs : `NY` et `Florida`. La température est alors associée aux tags suivants : `country`, `region`, `state` et `city`. La granularité du tag `state` n'étant pas supérieure à celle du tag `city`, l'ajout de ce tag n'augmente pas la granularité de vos données.

Pour connaître la température en Floride, vous pouvez combiner les métriques custom suivantes :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : l'ordre des tags n'a pas d'influence sur le nombre de métriques custom. Les combinaisons suivantes correspondent à la même métrique custom :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

### Configurer des tags et des agrégations avec Metrics without Limits™

La configuration de tags et d'agrégations à l'aide de [Metrics without Limits™][3] peut avoir une incidence sur les volumes de métriques custom. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Ainsi, vous pouvez continuer à envoyer toutes vos données à Datadog (toutes les informations sont ingérées) et ajouter des tags à une liste d'autorisation afin que seuls ces tags puissent être interrogés sur la plateforme Datadog. Comme le volume de données ingérées par Datadog pour les métriques que vous avez configurées est maintenant différent du volume de données indexées, qui est plus petit, deux volumes distincts s'affichent sur votre page Usage et sur la page Metrics Summary. 

- **Ingested Custom Metrics** : le volume initial de métriques custom basé sur tous les tags ingérés (qui ont été envoyés par le code).
- **Indexed Custom Metrics** : le volume de métriques custom pouvant être interrogées sur la plateforme Datadog (en fonction des configurations Metrics without Limits™).

**Remarque : seules les métriques configurées rentrent en compte dans le calcul du volume des métriques custom.** Si vous n'avez pas configuré Metrics without Limits™ pour une métrique, seul le volume des métriques custom indexées vous est facturé.

#### Dans quels cas les métriques custom ingérées ou indexées vous sont-elles facturées ?
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques custom indexées.

|                                      | Métriques custom indexées<br>(en fonction du nombre moyen mensuel de métriques custom par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom indexées par host <br>- Enterprise : 200 métriques custom indexées par host                             |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (des tags/agrégations sont configurés), vous payez pour les métriques custom ingérées et les métriques custom indexées.

|                                      | Métriques custom ingérées                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom ingérées par host<br>- Enterprise : 200 métriques custom ingérées par host | - Pro : 100 métriques custom indexées par host<br>- Enterprise : 200 métriques custom indexées par host                               |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom ingérées supplémentaires vous est facturé 0,10 $.                   | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Par défaut, Datadog stocke de la façon suivante la combinaison des agrégations les plus souvent interrogées en fonction du type de métrique afin d'assurer la précision mathématique de la requête associée à la métrique que vous avez configurée :

- Les métriques gauge configurées peuvent être interrogées à l'aide d'agrégations temporelles/spatiales de type `AVG/AVG`. 

Vous pouvez ajouter d'autres agrégations en cas de besoin. Le nombre de métriques custom indexées dépend du nombre d'agrégations activées.

En savoir plus sur [Metrics without Limits™][1].

[1]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{% tab "Histogram" %}}

**Par défaut, une métrique HISTOGRAM génère cinq métriques custom pour chaque combinaison unique de nom de métrique et de valeurs de tag**, ce qui correspond aux agrégations effectuées côté Agent (`max`, `median`, `avg`, `95pc` et `count`). [En savoir plus sur les métriques HISTOGRAM][1].

Le nombre de combinaisons de valeurs de tag uniques envoyées pour une métrique HISTOGRAM avec ce schéma de tagging est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Par défaut, l'Agent génère cinq métriques custom pour chacune des quatre combinaisons de valeur de tag uniques d'origine, soit une métrique custom [pour chaque agrégation activée côté Agent][2] : `avg`, `count`, `median`, `95percentile` et `max`. Ainsi, `request.Latency` envoie **4\*5 = 20 métriques custom** au total.

**Remarque** : l'ajout d'agrégations à vos métriques HISTOGRAM augmente le nombre de métriques custom distinctes envoyées. La désactivation d'agrégations réduit le nombre de métriques custom envoyées.

- Configurez les agrégations que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_aggregates` dans votre [fichier de configuration datadog.yaml][3]. Par défaut, seules les agrégations `max`, `median`, `avg` et `count` sont envoyées à Datadog. Les agrégations `sum` et `min` sont également disponibles si vous le souhaitez.
- Configurez les agrégations par centile que vous souhaitez envoyer à Datadog à l'aide du paramètre `histogram_percentiles` dans votre [fichier de configuration datadog.yaml][2]. Par défaut, seul le 95e centile, `95percentile`, est envoyé à Datadog.


[1]: /fr/metrics/types/?tab=histogram#metric-types
[2]: /fr/metrics/types/?tab=histogram#definition
[3]: /fr/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Distribution" %}}

**Par défaut, une métrique DISTRIBUTION génère cinq métriques custom pour chaque combinaison unique de nom de métrique et de valeurs de tag**, ce qui correspond à la distribution statistique globale des valeurs. Ces cinq métriques custom reflètent les agrégations effectuées côté serveur, `count`, `sum`, `min`, `max` et `avg`. [En savoir plus sur les métriques de type DISTRIBUTION][1].

Le nombre de combinaisons de valeurs de tag uniques envoyées pour une métrique DISTRIBUTION avec ce schéma de tagging est de **quatre**.

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Le nombre de métriques custom envoyées par une [métrique DISTRIBUTION][1] correspond au nombre de combinaisons uniques de nom de métrique et de valeurs de tag multiplié par cinq. Ainsi, la métrique `request.Latency` envoie **5\*4 = 20 métriques custom** au total.

##### Ajout d'agrégations par centile

Vous pouvez ajouter des agrégations par centile (`p50`, `p75`, `p90`, `p95` et `p99`) pour votre métrique de distribution, afin d'obtenir cinq fois plus de combinaisons uniques nom de métrique/valeur de tag (**5 \* 4 = 20 métriques customs**). Avec les agrégations par centile, le nombre total de métriques custom généré par cette métrique de distribution atteint 40 (**2 * (5 \* 4) = 40**).

Le tableau ci-dessous résume l'impact de l'ajout d'agrégations par centile pour une distribution de métrique.

| Métriques                                                                                   | Nombre de métriques custom facturables |
|-------------------------------------------------------------------------------------------|-----------------------------------|
| Nombre de métriques custom générées par une distribution standard (count, sum, min, max et avg)         | `5 * (combinaisons de valeurs de tag)`      |
| Nombre de métriques custom générées par l'ajout des agrégations par centile (p50, p75, p90, p95 et p99) | `5 * (combinaisons de valeurs de tag)`      |
| Total                                                                                     | `2 * 5(combinaisons de valeurs de tag)`     |

### Configurer des tags avec Metrics without Limits™

La configuration de tags et d'agrégations à l'aide de [Metrics without Limits™][3] peut avoir une incidence sur les volumes de métriques custom. Metrics without Limits™ dissocie les coûts d'ingestion des coûts d'indexation. Ainsi, vous pouvez continuer à envoyer toutes vos données à Datadog (toutes les informations sont ingérées) et ajouter des tags à une liste d'autorisation afin que seuls ces tags puissent être interrogés sur la plateforme Datadog. Comme le volume de données ingérées par Datadog pour les métriques que vous avez configurées est maintenant différent du volume de données indexées, qui est plus petit, deux volumes distincts s'affichent sur votre page Usage et sur la page Metrics Summary. 

- **Ingested Custom Metrics** : le volume initial de métriques custom basé sur tous les tags ingérés (qui ont été envoyés par le code).
- **Indexed Custom Metrics** : le volume de métriques custom pouvant être interrogées sur la plateforme Datadog (en fonction des configurations Metrics without Limits™).

**Remarque : seules les métriques configurées rentrent en compte dans le calcul du volume des métriques custom.** Si vous n'avez pas configuré Metrics without Limits™ pour une métrique, seul le volume des métriques custom indexées vous est facturé.

#### Dans quels cas les métriques custom ingérées ou indexées vous sont-elles facturées ?
Pour les métriques non configurées avec Metrics without Limits™, vous payez pour les métriques custom indexées.

|                                      | Métriques custom indexées<br>(en fonction du nombre moyen mensuel de métriques custom par heure)                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom indexées par host <br>- Enterprise : 200 métriques custom indexées par host                             |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Pour les métriques configurées avec Metrics without Limits™ (des tags/agrégations sont configurés), vous payez pour les métriques custom ingérées et les métriques custom indexées.

|                                      | Métriques custom ingérées                                                                           | Indexed Custom Metrics                                                                                                        |
|--------------------------------------|---------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Quota de l'abonnement                    | - Pro : 100 métriques custom ingérées par host<br>- Enterprise : 200 métriques custom ingérées par host | - Pro : 100 métriques custom indexées par host<br>- Enterprise : 200 métriques custom indexées par host                               |
| Dépassement du quota | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom ingérées supplémentaires vous est facturé 0,10 $.                   | Si vous dépassez le quota de votre abonnement, chaque palier de 100 métriques custom indexées supplémentaires vous est facturé le montant indiqué dans votre contrat actuel. |

Imaginons que vous souhaitiez conserver uniquement les tags `endpoint` et `status` associés à la métrique `request.Latency`. Vous obtenez alors les trois combinaisons de tags uniques suivantes :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Le nombre de métriques custom envoyées par une [métrique DISTRIBUTION][1] correspond au nombre de combinaisons uniques de nom de métrique et de valeurs de tag multiplié par cinq. Une fois les tags configurés, la métrique `request.Latency` envoie **5\*3 = 15 métriques custom indexées** au total. En se basant sur les tags envoyés initialement sur cette métrique, le volume initial de métriques custom **ingérées** pour la métrique `request.Latency` est de **20 métriques custom ingérées**.

En savoir plus sur [Metrics without Limits™][2].

[1]: /fr/metrics/types/?tab=distribution#definition
[2]: /fr/metrics/metrics-without-limits
{{% /tab %}}
{{< /tabs >}}

## Suivi des métriques custom

Les administrateurs (c'est-à-dire les utilisateurs disposant du rôle [Admin de Datadog][5]) peuvent consulter le nombre moyen mensuel de métriques custom **ingérées** et **indexées** par heure. Le tableau des principales métriques custom affiche également le nombre moyen de métriques custom **indexées** sur la [page des détails d'utilisation][6]. Consultez la documentation sur les [détails d'utilisation][7] pour en savoir plus.

Pour suivre en temps réel le nombre de métriques custom associées à un nom de métrique donné, accédez à la [page Résumé des métriques][8] et cliquez sur le nom de métrique souhaité. Vous pouvez visualiser le nombre de métriques custom **ingérées** et **indexées** dans le volet latéral des détails de la métrique. 
{{< img src="account_management/billing/custom_metrics/mwl_sidepanel_ingested.jpg" alt="Volet latéral affichant le résumé des métriques" style="width:80%;">}}


## Allocation

Vous avez droit à un certain quota de métriques custom **ingérées** et **indexées** en fonction de votre abonnement Datadog :

- Pro : 100 métriques custom ingérées par host et 100 métriques custom indexées par host
- Enterprise : 200  métriques custom ingérées par host et 200 métriques custom indexées par host

Ces quotas sont calculés pour l'ensemble de votre infrastructure. Par exemple, si vous utilisez l'offre Pro avec 3 hosts, 300 métriques custom indexées vous sont attribuées. Ces 300 métriques custom indexées peuvent être réparties équitablement entre chaque host ou toutes être attribuées à un seul host. Pour cet exemple, le graphique ci-dessous illustre des scénarios respectant le quota de métriques custom autorisé :

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="Quotas pour les métriques custom"  >}}

Le nombre de métriques custom facturables est calculé en fonction du nombre moyen de métriques custom (pour tous les hosts facturés) par heure et sur un mois donné. Le nombre de métriques custom ingérées facturables augmente uniquement si vous avez utilisé Metrics without Limits™ pour configurer votre métrique. Contactez le [service commercial][9] ou votre [chargé de compte][10] pour discuter de vos métriques custom ou pour acheter un forfait de métriques custom supplémentaire.

## Intégrations standard

Les intégrations standard suivantes peuvent potentiellement générer des métriques custom.

| Types d'intégrations                           | Intégrations                                                                       |
|------------------------------------------------|------------------------------------------------------------------------------------|
| Limitées à 350 métriques custom par défaut.      | [ActiveMQ XML][11] / [Go-Expvar][12] / [Java-JMX][13]                              |
| Aucune limite appliquée à la collecte de métriques custom par défaut. | [Nagios][14] / [Check PDH][15] / [OpenMetrics][16] / [Windows Services][17] / [WMI][18] / [Prometheus][27] |
| Peuvent être configurées pour collecter des métriques custom.   | [MySQL][19] / [Oracle][20] / [Postgres][21] / [SQL Server][22]                        |
| Métriques custom envoyées depuis des intégrations cloud    | [AWS][23]                                                                          |

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][24].

Pour toute question concernant la facturation, contactez votre [chargé de compte][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/metrics/custom_metrics/
[3]: /fr/metrics/metrics-without-limits
[4]: /fr/metrics/types/#metric-types
[5]: /fr/account_management/users/default_roles/
[6]: https://app.datadoghq.com/billing/usage
[7]: /fr/account_management/billing/usage_details/
[8]: https://app.datadoghq.com/metric/summary
[9]: mailto:sales@datadoghq.com
[10]: mailto:success@datadoghq.com
[11]: /fr/integrations/activemq/#activemq-xml-integration
[12]: /fr/integrations/go_expvar/
[13]: /fr/integrations/java/
[14]: /fr/integrations/nagios/
[15]: /fr/integrations/pdh_check/
[16]: /fr/integrations/openmetrics/
[17]: /fr/integrations/windows_service/
[18]: /fr/integrations/wmi_check/
[19]: /fr/integrations/mysql/
[20]: /fr/integrations/oracle/
[21]: /fr/integrations/postgres/
[22]: /fr/integrations/sqlserver/
[23]: /fr/integrations/amazon_web_services/
[24]: /fr/help/
[25]: /fr/metrics/custom_metrics/dogstatsd_metrics_submission/
[26]: /fr/metrics/custom_metrics/agent_metrics_submission/
[27]: /fr/integrations/prometheus