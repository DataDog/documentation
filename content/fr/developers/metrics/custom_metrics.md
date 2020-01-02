---
title: Métriques custom
kind: documentation
aliases:
  - /fr/getting_started/custom_metrics
further_reading:
  - link: /graphing/metrics/introduction
    tag: Documentation
    text: Présentation des métriques
  - link: /graphing/metrics/distributions
    tag: Documentation
    text: Métriques de distribution
---
## Présentation

Si une métrique n'est pas envoyée depuis l'une des [plus de 350 intégrations Datadog][1], elle est considérée comme une métrique custom. **Remarque** : certaines intégrations standard [génèrent des métriques custom][2].

Une métrique custom désigne une combinaison unique de nom de métrique, de host et de valeurs de tag. En général, les métriques envoyées par StatsD, par [DogStatsD][3] ou par des extensions de [l'Agent Datadog][4] sont des métriques custom.

## Attribution

Un certain nombre de métriques custom vous est attribué en fonction de votre offre tarifaire Datadog :

* **Pro** : 100 métriques custom par host
* **Entreprise** : 200 métriques custom par host

Ces attributions sont calculées sur l'ensemble de votre infrastructure. Par exemple, si vous utilisez l'offre Pro avec 3 hosts, 300 métriques custom vous sont attribuées. Ces 300 métriques custom peuvent être réparties équitablement entre chaque host ou toutes être attribuées à un seul host.

Pour cet exemple, le graphique ci-dessous indique des scénarios respectant le nombre de métriques custom attribuées :

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="300_métriques_custom"  style="width:80%;">}}

Aucune [limite de débit fixe][5] n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, vous serez facturé conformément à la [politique de facturation de Datadog pour les métriques custom][6].

## Suivi

Les administrateurs peuvent afficher le nombre total de métriques custom par heure et les 500 principales métriques custom pour leur compte depuis la [page des détails d'utilisation][7]. Consultez la documentation sur les [détails d'utilisation][8] pour en savoir plus.

## Compte

L'utilisation de tags sur des métriques custom peut modifier le nombre total de **combinaisons uniques de tags**, ce qui change le nombre total de métriques custom créées. Les exemples ci-dessous indiquent comment le compte de métriques custom est calculé.

### Host unique

Dans cet exemple, nous supposons que vous envoyez une métrique `COUNT`(`auth.exceptionCount`) sur un host unique.

* Votre instrumentation de code envoie les différents tags suivants associés à cette métrique : `method:X`, `method:Y`, `exception:A`, `exception:B`.
* Le tagging de votre métrique suit alors la logique suivante :

    {{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="métrique_custom_1"  >}}

* Ici, vous disposez de 6 métriques distinctes. Les métriques uniques pour un **host unique** sont :

| Métrique                | Tags                      |
|-----------------------|---------------------------|
| `auth.exceptionCount` | `method:X`                |
| `auth.exceptionCount` | `method:Y`                |
| `auth.exceptionCount` | `method:X`, `exception:A` |
| `auth.exceptionCount` | `method:X`, `exception:B` |
| `auth.exceptionCount` | `method:Y`, `exception:A` |
| `auth.exceptionCount` | `method:Y`, `exception:B` |

**Remarque** : l'ordre des tags n'a pas d'influence sur le compte de métriques. Les métriques suivantes ne sont pas uniques :

* `auth.exceptionCount` avec les tags `method:X` et `exception:A`
* `auth.exceptionCount` avec les tags `exception:A` et `method:X`

### Hosts multiples

Une métrique custom se distingue de par sa combinaison unique de nom de métrique, de host et de valeurs de tag. Par conséquent, la transmission d'une métrique custom à partir de plusieurs hosts génère plusieurs combinaisons de valeurs de tag uniques.

Par exemple, vous créez la métrique `service.request.count` pour surveiller différents services dans votre infrastructure.

* Pour surveiller les réussites et échecs, vous créez le tag `status` qui prend deux valeurs :
    * `status:success`
    * `status:failure`
* Vous surveillez la métrique pour chaque service s'exécutant sur votre infrastructure :
    * `service:database`
    * `service:api`
    * `service:webserver`
* Votre métrique suit alors la logique suivante :

    {{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="logique_métrique"  style="width:80%;">}}

Dans cet exemple, seul un sous-ensemble des services et des statuts est envoyé. Vous possédez trois hosts :

* `host1` transmet toutes les configurations possibles.
* `host2` transmet uniquement les réussites de tous les services.
* `host3` transmet les réussites et les échecs pour les services de base de données et de serveur Web.

Vos trois hosts envoient alors 13 métriques (séries temporelles) distinctes :

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="compte_métriques"  style="width:75%;">}}

**Remarque** : si tous les services transmettent les deux statuts, vous disposez de 1 x 2 x 3 = 6 métriques custom **par host**.

#### Résumé des métriques

La [page Metric Summary][9] affiche le nombre de métriques distinctes, équivalent au nombre de séries temporelles distinctes associées au nom de la métrique, au host et aux valeurs de tag. Par exemple, `service.request.count` avec 1 host, 2 statuts et 3 services donne lieu à **6 métriques distinctes** :

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="résumé_métriques"  style="width:80%;">}}

Si vous ajoutez un deuxième host avec 3 services et 1 statut, vous obtenez **9 métriques distinctes** :

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="résumé_métriques_2"  style="width:80%;">}}

Si vous ajoutez un troisième host avec 2 services et 2 statuts ; vous obtenez **13 métriques distinctes** :

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="résumé_métriques_3"  style="width:80%;">}}

#### Éditeur de requête

Vous pouvez compter vos métriques custom en utilisant l'agrégateur `count:` dans l'éditeur de requête. Pour compter le nombre de métriques pour l'exemple précédent, la requête `count:service.request.count{*}` est utilisée :

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="agrégateur_métriques"  style="width:80%;">}}

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="compte_des_métriques"  style="width:80%;">}}

### Métriques gauges, counts, histograms et rates

Supposons que vous souhaitiez mesurer la `temperature` moyenne dans l'État de Floride. La `temperature` est enregistrée en tant que métrique de type [GAUGE][10] dans Datadog. Vous recueillez les mesures de température suivantes toutes les 10 secondes au cours de la dernière minute pour Orlando, Miami, Boston, New York et Seattle. Chaque mesure est taguée avec les informations relatives à `city`, `state`, `region` et `country`.

| Tags                         | 0 à 10 s | 10 à 20 s | 20 à 30 s | 30 à 40 s | 40 à 50 s | 50 à 60 s |
|------------------------------|--------|---------|---------|---------|---------|---------|
| Orlando, FL, Southeast, USA  | 80     | 80      | 80      | 80      | 81      | 81      |
| Miami, FL, Southeast, USA    | 82     | 82      | 82      | 82      | 82      | 82      |
| Boston, MA, Northeast, USA   | 78     | 78      | 78      | 78      | 78      | 79      |
| New York, NY, Northeast, USA | 79     | 79      | 79      | 79      | 79      | 79      |
| Seattle, WA, Northwest, USA  | 75     | 75      | 75      | 75      | 75      | 75      |

Il y a au total 5 métriques custom associées à la métrique `temperature`. Chaque combinaison de tag unique entre `city`, `state`, `region` et `country` est considérée comme une métrique custom :

| Métrique        | Tags                                                           |
|---------------|----------------------------------------------------------------|
| `temperature` | `city:orlando`, `state:fl`, `region:southeast`, `country:usa`  |
| `temperature` | `city:miami`, `state:fl`, `region:southeast`, `country:usa`    |
| `temperature` | `city:boston`, `state:ma`, `region:northeast`, `country:usa`   |
| `temperature` | `city:new_york`, `state:ny`, `region:northeast`, `country:usa` |
| `temperature` | `city:seattle`, `state:wa`, `region:northwest`, `country:usa`  |

À partir des cinq séries temporelles ci-dessus, il est possible de déterminer la `temperature` moyenne aux États-Unis, dans le Nord-Est ou en Floride au moment de la requête.

**Remarque** : la méthode utilisée pour calculer le nombre de métriques custom est la même que celle utilisée pour calculer les métriques de type `COUNT`, `HISTOGRAM` et `RATE`.

#### Ignorer des tags

Imaginons que vous supprimiez le tag `country` de la métrique `temperature`. Les données contiennent encore cinq combinaisons de valeur de tag uniques pour les tags `city`, `state` et `region`. Au total, cinq métriques custom sont générées à partir de la métrique `temperature` :

| Métrique        | Tags                                            |
|---------------|-------------------------------------------------|
| `temperature` | `city:orlando`, `state:fl`, `region:southeast`  |
| `temperature` | `city:miami`, `state:fl`, `region:southeast`    |
| `temperature` | `city:boston`, `state:ma`, `region:northeast`   |
| `temperature` | `city:new_york`, `state:ny`, `region:northeast` |
| `temperature` | `city:seattle`, `state:wa`, `region:northwest`  |

Supposons que vous supprimiez le tag `city` de la métrique `temperature`. Cela regroupe les données d'Orlando et de Miami :

| Tags          | 0 à 10 s | 10 à 20 s | 20 à 30 s | 30 à 40 s | 40 à 50 s | 50 à 60 s |
|---------------|--------|---------|---------|---------|---------|---------|
| FL, Southeast | 81     | 81      | 81      | 81      | 81.5    | 81.5    |
| MA, Northeast | 78     | 78      | 78      | 78      | 78      | 79      |
| NY, Northeast | 79     | 79      | 79      | 79      | 79      | 79      |
| WA, Northwest | 75     | 75      | 75      | 75      | 75      | 75      |

Les données de `temperature` contiennent désormais quatre combinaisons de valeurs de tag uniques. Par conséquent, il y a au total quatre métriques custom :

| Métrique        | Tags                           |
|---------------|--------------------------------|
| `temperature` | `state:fl`, `region:southeast` |
| `temperature` | `state:ma`, `region:northeast` |
| `temperature` | `state:ny`, `region:northeast` |
| `temperature` | `state:wa`, `region:northwest` |

### Distributions

Une métrique de distribution récupère toutes les valeurs de l'ensemble des hosts générant des valeurs de métriques dans un intervalle de dix secondes. Les distributions émettent un nombre de métriques custom proportionnel au nombre de métriques custom émises par `GAUGE`. Les distributions génèrent cinq séries temporelles pour chaque combinaison de tag unique qui apparaît dans les données : `sum`, `count`, `min`, `max` et `avg` (calculé à partir de sum/count).

Supposons que vous souhaitiez mesurer la métrique `age` maximale dans l'État de New York. Elle est envoyée en tant que métrique de distribution avec les tags `city` et `state` :

| Tags          | Valeurs par intervalle de 10 secondes | Somme | Total | Minimum | Maximum | Moyenne |
|---------------|------------------------------|-----|-------|---------|---------|---------|
| Rochester, NY | 23, 29, 33, 55, 41, 36, 12, 67      | 296 | 8     | 12      | 67      | 37      |
| New York, NY  | 18, 22, 26, 31, 29, 40, 23, 35      | 215 | 8     | 18      | 40      | 28      |

Le nombre total de métriques custom ou de séries temporelles émises à partir de la métrique de distribution `age` est de **dix (5 x 2)**. Pour les deux combinaisons de valeurs de tags uniques ci-dessus (Rochester, NY et New York, NY), Datadog conserve cinq séries temporelles (`sum`, `count`, `min`, `max` et `avg`).

Pour obtenir l'âge maximal dans l'État de New York, agrégez les séries temporelles ci-dessus : âge maximal à New York = `max` (`max` (Rochester, NY), `max` (New York, NY)) = 67.

#### Métriques de distribution avec agrégations en centile

Après avoir envoyé une métrique de distribution à Datadog, vous avez la possibilité d'ajouter des agrégations de centiles à une distribution depuis l'[interface Distributions][11]. Les distributions avec agrégations en centile sont calculées différemment des types de métriques énumérés ci-dessus, car les centiles ne peuvent pas être réagrégés mathématiquement.

Supposons que vous souhaitiez calculer l'`age` *médian* dans l'État de New York, où la métrique de distribution `age` est associée aux tags `city` et `state`.

| Tags          | Valeurs par intervalle de 10 secondes | Somme | Total | Min | Max | Moyenne | p50 | p75 | p90 | p95 | p99 |
|---------------|------------------------------|-----|-------|-----|-----|-----|-----|-----|-----|-----|-----|
| Rochester, NY | 23, 33, 55, 41, 36, 12, 66         | 266 | 7     | 12  | 66  | 38  | 36  | 55  | 66  | 66  | 66  |
| New York, NY  | 18, 26, 31, 29, 40, 23, 36         | 203 | 7     | 18  | 40  | 29  | 29  | 36  | 40  | 40  | 40  |

Contrairement aux âges maximum ci-dessus, les centiles ne peuvent PAS être réagrégés. L'âge médian à New York n'est pas égal à `median`(`median`(Rochester, NY), `median`(New York, NY)).

Par conséquent, pour vous fournir les agrégations de centile statistiquement valides, Datadog doit précalculer cinq séries temporelles (`p50`, `p75`, `p90`, `p95` et `p99`) pour chaque combinaison de valeurs de tags pouvant faire l'objet d'une requête. Dans l'exemple de New York, les combinaisons de valeurs de tags `city` et `state` pouvant faire l'objet d'une requête sont les suivantes :

| Tag city  | Tag state |
|-----------|-----------|
| Rochester | `empty`   |
| Rochester | NY        |
| New York  | `empty`   |
| New York  | NY        |
| `empty`   | NY        |
| `empty`   | `empty`   |

Le nombre de valeurs pouvant faire l'objet d'une requête est de trois pour le tag `city` {Rochester, New York, `empty`} et de deux pour le tag `state` : {NY, `empty`}.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations
[2]: /fr/account_management/billing/custom_metrics/#standard-integrations
[3]: /fr/developers/metrics/dogstatsd_metrics_submission
[4]: /fr/agent
[5]: /fr/api/#rate-limiting
[6]: /fr/account_management/billing/custom_metrics
[7]: https://app.datadoghq.com/account/usage/hourly
[8]: /fr/account_management/billing/usage_details
[9]: https://app.datadoghq.com/metric/summary
[10]: /fr/developers/metrics/gauges
[11]: https://app.datadoghq.com/metric/distribution_metrics