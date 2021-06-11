---
title: Facturation des métriques custom
kind: documentation
aliases:
  - /fr/integrations/faq/what-standard-integrations-emit-custom-metrics/
---
Si une métrique n'est pas envoyée depuis l'une des [plus de {{< translate key="integration_count" >}} intégrations Datadog][1], elle est considérée comme une [métrique custom][2]<sup>[(1)](#integrations-standard)</sup>.

**Les métrique custom se distinguent par une combinaison unique de nom de métrique et de valeurs de tag (tag host inclus)**.

Votre volume mensuel facturable pour les métriques custom (indiqué sur la page Usage) désigne le nombre moyen de métriques custom distinctes pour toutes les heures du mois actuel.

## Calcul du nombre de métriques custom

Le nombre de métriques custom associées à un nom de métrique donné dépend du [type de métrique envoyé][3]. Vous trouverez ci-dessous des exemples de calculs basés sur le scénario suivant :

Une métrique intitulée `request.Latency` est envoyée à partir de deux hosts (`host:A`,`host:B`) afin de mesurer la latence des requêtes envoyées à vos endpoints. Vous envoyez cette métrique avec deux clés de tag :

- `endpoint`, qui a pour valeur `endpoint:X` ou `endpoint:Y` ;
- `status`, qui a pour valeur `status:200` ou `status:400`.

Imaginons que dans vos données, `endpoint:X` est pris en charge par les deux hosts mais échoue uniquement pour `host:B`. Imaginons également que les requêtes envoyées à `endpoint:Y` réussissent toujours et apparaissent uniquement pour `host:B`, comme illustré ci-dessous :

{{< img src="account_management/billing/custom_metrics/request_latency.png" alt="Latence des requêtes"  style="width:80%;">}}

{{< tabs >}}
{{% tab "Count, Rate, Gauge" %}}

La même logique est appliquée pour calculer le nombre de métriques custom et le nombre de métriques [COUNT][1], [RATE][2] et [GAUGE][3].

Le nombre de combinaisons de valeurs de tag uniques envoyées pour une métrique GAUGE avec ce schéma de tagging est de **quatre** :

- `host:A`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:200`
- `host:B`, `endpoint:X`, `status:400`
- `host:B`, `endpoint:Y`, `status:200`

Ici, la métrique `request.Latency` envoie donc **quatre métriques custom distinctes**.

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

Imaginons maintenant que vous souhaitiez appliquer le tag `state` à votre métrique `temperature`, et que ce tag prenne deux valeurs : `NY` et `Florida`. La température est alors associée aux tags suivants : `country`, `region`, `state` et `city`. La granularité du tag `state` n'étant pas supérieure à celle du tag `city`, l'ajout de ce tag n'augmente pas la granularité de vos données.

Pour connaître la température en Floride, il vous suffit de combiner les métriques custom suivantes :

- `temperature{country:USA, state:Florida, city:Orlando}`
- `temperature{country:USA, state:Florida, city:Miami}`

**Remarque** : l'ordre des tags n'a pas d'influence sur le nombre de métriques custom. Les combinaisons suivantes correspondent à la même métrique custom :

- `temperature{country:USA, state:Florida, city:Miami}`
- `temperature{state:Florida, city:Miami, country:USA}`

[1]: /fr/developers/metrics/types/?tab=count#metric-types
[2]: /fr/developers/metrics/types/?tab=rate#metric-types
[3]: /fr/developers/metrics/types/?tab=gauge#metric-types
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


[1]: /fr/developers/metrics/types/?tab=histogram#metric-types
[2]: /fr/developers/metrics/types/?tab=histogram#definition
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

| Métriques                                                                                    | Nombre de métriques custom facturables |
|--------------------------------------------------------------------------------------------|-----------------------------------|
| Nombre de métriques custom générées par une distribution standard (count, sum, min, max et avg)          | `5 * (combinaisons de valeurs de tag)`      |
| Nombre de métriques custom générées par l'ajout des agrégations par centile (p50, p75, p90, p95 et p99)  | `5 * (combinaisons de valeurs de tag)`      |
| Total                                                                                      | `2 * 5(combinaisons de valeurs de tag)`     |

##### Personnalisation du tagging

Vous avez la possibilité de personnaliser les agrégations de [combinaisons de tags][2] créées pour une métrique DISTRIBUTION. Imaginons que vous souhaitiez uniquement conserver les tags `endpoint` et `status` pour la métrique `request.Latency`. Vous obtenez alors trois combinaisons de tags uniques :

- `endpoint:X`, `status:200`
- `endpoint:X`, `status:400`
- `endpoint:Y`, `status:200`

Le nombre de métriques custom envoyées par une [métrique DISTRIBUTION][1] correspond au nombre de combinaisons uniques de nom de métrique et de valeurs de tag multiplié par cinq. Ainsi, une fois les tags personnalisés, la métrique `request.Latency` envoie **5\*3 = 15 métriques custom** au total.

[1]: /fr/developers/metrics/types/?tab=distribution#definition
[2]: /fr/metrics/distributions/#customize-tagging
{{% /tab %}}
{{< /tabs >}}

## Suivi des métriques custom

Les administrateurs (c'est-à-dire les utilisateurs disposant du rôle [Admin de Datadog][4]) peuvent consulter le nombre moyen de métriques custom par heure et les 5 000 principales métriques custom pour leur compte depuis la [page des détails d'utilisation][5]. Consultez la documentation sur les [détails d'utilisation][6] pour en savoir plus.

Pour suivre en temps réel le nombre de métriques custom associées à un nom de métrique donné, accédez à la [page Résumé des métriques][7] et cliquez sur le nom de métrique souhaité. Le nombre est affiché à la ligne « Currently reporting X distinct metrics… », comme illustré ci-dessous :

{{< img src="account_management/billing/custom_metrics/tracking_metric.mp4" alt="Suivre les métriques" video="true" >}}

## Quota

Vous avez le droit à un certain quota de métriques custom en fonction de votre offre tarifaire Datadog :

- Pro : 100 métriques custom par host
- Entreprise : 200 métriques custom par host

Ces quotas sont calculés pour l'ensemble de votre infrastructure. Par exemple, si vous utilisez l'offre Pro avec 3 hosts, 300 métriques custom vous sont attribuées. Ces 300 métriques custom peuvent être réparties équitablement entre chaque host ou toutes être attribuées à un seul host. Pour cet exemple, le graphique ci-dessous illustre des scénarios respectant le quota de métriques custom autorisé :

{{< img src="account_management/billing/custom_metrics/host_custom_metrics.png" alt="métriques custom par host"  >}}

Le nombre de métriques custom facturables est calculé en fonction du nombre moyen de métriques custom (pour tous les hosts facturés) par heure et sur un mois donné. Contactez le [service commercial][8] ou votre [chargé de compte][9] pour discuter de vos métriques custom ou pour acheter un forfait de métriques custom supplémentaire.

## Intégrations standard

Les intégrations standard suivantes peuvent potentiellement générer des métriques custom.

| Types d'intégrations                           | Intégrations                                                                                   |
|------------------------------------------------|------------------------------------------------------------------------------------------------|
| Limitées à 350 métriques custom par défaut.      | [ActiveMQ XML][10] / [Go-Expvar][11] / [Java-JMX][12]                                          |
| Aucune limite appliquée à la collecte de métriques custom par défaut. | [Nagios][13] / [Check PDH][14] / [Prometheus][15] / [SNMP][16] / [Services Windows][17] / [WMI][18] |
| Peuvent être configurées pour collecter des métriques custom.   | [MySQL][19] / [Oracle][20] / [Postgres][21] / [SQL Server][22]                                    |
| Métriques custom envoyées depuis des intégrations cloud    | [AWS][23]                                                                                      |

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][24].

Pour toute question concernant la facturation, contactez votre [chargé de compte][9].

[1]: /fr/integrations/
[2]: /fr/developers/metrics/custom_metrics/
[3]: /fr/developers/metrics/types/#metric-types
[4]: /fr/account_management/users/default_roles/
[5]: https://app.datadoghq.com/account/usage/hourly
[6]: /fr/account_management/billing/usage_details/
[7]: https://app.datadoghq.com/metric/summary
[8]: mailto:sales@datadoghq.com
[9]: mailto:success@datadoghq.com
[10]: /fr/integrations/activemq/#activemq-xml-integration
[11]: /fr/integrations/go_expvar/
[12]: /fr/integrations/java/
[13]: /fr/integrations/nagios/
[14]: /fr/integrations/pdh_check/
[15]: /fr/integrations/prometheus/
[16]: /fr/integrations/snmp/
[17]: /fr/integrations/windows_service/
[18]: /fr/integrations/wmi_check/
[19]: /fr/integrations/mysql/
[20]: /fr/integrations/oracle/
[21]: /fr/integrations/postgres/
[22]: /fr/integrations/sqlserver/
[23]: /fr/integrations/amazon_web_services/
[24]: /fr/help/