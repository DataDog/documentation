---
title: Métriques custom
kind: documentation
aliases:
  - /fr/getting_started/custom_metrics
---
Avec Datadog, vous pouvez envoyer de plusieurs façons des métriques custom afin de gagner en visibilité sur l'ensemble de votre infrastructure.

Cette page explique :

* Qu'est-ce qu'une métrique custom, et comment pouvez-vous l'envoyer à Datadog
* Le nombre de métriques custom autorisées par défaut
* Comment vérifier le nombre de métriques custom au fil du temps

## Comment est définie une métrique custom ?

Une métrique custom représente une seule et unique combinaison du nom, du host et des tags d'une métrique.

Les métriques custom désignent généralement n'importe quelle métrique envoyée avec Statsd, [DogStatsD][1] ou grâce aux extensions de l'[Agent Datadog][2]. Certaines [intégrations][3] peuvent éventuellement générer un nombre illimité de métriques qui susceptible d'être considérées comme des métriques custom. Découvrez [plus de détails sur les intégrations standard qui génèrent des métriques custom][4].

Afin de tirer pleinement parti des capacités de Datadog via le contexte et les alertes, vous utiliserez sans doute des tags. Par conséquent, l'envoi d'une seule métrique peut entraîner la création de **plusieurs combinaisons de tags uniques** prises en compte dans le nombre de métriques custom.

Par exemple :

* Vous choisissez le nom de métrique suivant : `auth.exceptionCount`.
* Votre instrumentation de code prévoit d'associer les tags suivants à cette métrique : `method:X`, `method:Y`, `exception:A`, `exception:B`.
* Votre métrique suit alors la logique suivante :
{{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="métrique_custom_1" responsive="true" >}}

Les métriques uniques **pour un host donné** sont alors :

* `auth.exceptionCount` avec le tag `method:X`
* `auth.exceptionCount` avec le tag `method:Y`
* `auth.exceptionCount` avec les tags `method:X` et `exception:A` (elles sont uniques à cause du nouveau tag `exception:A`)
* `auth.exceptionCount` avec les tags `method:X` et `exception:B`
* `auth.exceptionCount` avec les tags `method:Y` et `exception:A`
* `auth.exceptionCount` avec les tags `method:Y` et `exception:B`

Dans cette situation, vous obtiendriez 6 métriques différentes.

Veuillez noter que l'ordre des tags n'a pas d'importance, les deux métriques suivantes ne sont donc pas considérées comme uniques :

* auth.exceptionCount avec les tags `method:X` et `exception:A`
* auth.exceptionCount avec les tags `exception:A` et `method:X`

## Combien de métriques custom puis-je utiliser ?

Datadog propose deux forfaits : Pro et Enterprise. Les clients Pro ont droit à 100 métriques custom par host, contre 200 métriques custom par host pour les clients Enterprise. Le total de ces métriques repose sur l'ensemble de l'infrastructure, plutôt que sur une évaluation par host. Par exemple, si vous utilisez le forfait Pro et que vous avez droit à 3 hosts, vous disposez alors de 300 métriques personnalisées par défaut. Ces 300 métriques peuvent être réparties de façon égale entre chaque host individuel ou être toutes envoyées depuis un seul host.

En suivant l'exemple précédent, voici trois scénarios qui ne dépassent pas le nombre de métriques par défaut pour trois hosts :

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="métriques_custom_300" responsive="true" style="width:75%;">}}

{{< img src="developers/metrics/custom_metrics/custom-metrics-1.jpg" alt="métriques-custom-1" responsive="true" style="width:75%;">}}

Aucune [limite de débit fixe][5] n'est appliquée lors de l'envoi des métriques custom. Si vous dépassez votre nombre de métriques par défaut, un membre l'assistance Datadog vous contactera.

## Comment vérifier le nombre de métriques custom ?

Lorsque vous créez une métrique custom, tous les tags de host sont automatiquement ajoutés à cette métrique sous une seule combinaison de tags, à laquelle vous ajouterez les tags associés à la métrique. Ces tags sont les plus importants, car ils s'ajoutent au nombre réel de métriques.

Imaginons que vous souhaitez recevoir des statistiques concernant le nombre de requêtes de différents services sur votre infrastructure.

* Vous créez ainsi votre métrique service.request.count.
* Vous souhaitez séparer les requêtes réussies des échecs. Vous créez donc deux tags :
    * `status:success`
    * `status:failure`
* Vous souhaitez que cette métrique soit transmise par chaque service s'exécutant sur votre infrastructure. Imaginons que vous disposez de trois services par host :
    * `service:database`
    * `service:api`
    * `service:webserver`

Votre métrique suit alors la logique suivante :

{{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="métrique_logique" responsive="true" style="width:75%;">}}

À partir de là, vous pouvez voir que **sur chaque host transmettant cette métrique**, si tous les services renvoient des réussites et des échecs, vous pouvez avoir jusqu'à 1 x 2 x 3 = **6 métriques custom**.

Partons du principe que vous avez trois hosts :

* `host1` transmet toutes les configurations possibles.
* `host2` transmet uniquement les réussites de tous les services.
* `host3` transmet les réussites et les échecs, mais uniquement pour les services de base de données et de serveur Web.

Avec vos 3 hosts, vous disposez de 13 métriques distinctes. Le tableau suivant vous explique pourquoi :

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="nombre_métriques" responsive="true" style="width:75%;">}}

Si vous êtes un administrateur, vous pouvez voir le nombre total de métriques custom par heure ainsi que les 500 principales métriques custom en fonction de leur cardinalité depuis votre compte, sur [la page des détails d'utilisation][6]. Vous pouvez également accéder à ces informations sur votre [page de résumé des métriques][7], où vous pouvez voir le nombre exact de combinaisons de tags uniques en cliquant sur la métrique service.request.count.

Voyons maintenant combien de métriques custom existent avec uniquement le premier host de l'exemple ci-dessus :

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="résumé_métriques" responsive="true" style="width:70%;">}}

En ajoutant le deuxième host :

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="résumé_métriques_2" responsive="true" style="width:70%;">}}

Avec le troisième host, vous obtenez 13 métriques distinctes :

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="résumé_métriques_3" responsive="true" style="width:70%;">}}

Grâce à l'éditeur de requêtes, vous pouvez également utiliser l'agrégateur count: :

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="agrégateur_métriques" responsive="true" style="width:70%;">}}

Enfin, vous obtenez 13 métriques avec la requête suivante : `count:service.request.count{*}`.

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="nombre_de_métriques" responsive="true" style="width:70%;">}}

## Traitement

Si vous envoyez directement des métriques à l'API Datadog *sans* utiliser [DogStatsD][1], attendez-vous à :

* 64 bits pour le timestamp
* 64 bits pour la valeur
* 20 octets pour les noms de métriques
* 50 octets pour les séries temporelles

La charge utile totale vaut \~ 100 octets. Cependant, avec l'API DogStatsD, cette charge est compressée, ce qui entraîne un nombre d'octets très faible.

[1]: /fr/developers/dogstatsd
[2]: /fr/agent
[3]: /fr/integrations
[4]: /fr/integrations/faq/what-standard-integrations-emit-custom-metrics
[5]: /fr/api/#rate-limiting
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: https://app.datadoghq.com/metric/summary
