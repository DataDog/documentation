---
aliases:
- /fr/guides/outliers
- /fr/monitors/monitor_types/outlier
- /fr/monitors/create/types/outlier/
description: Recevoir des alertes lorsqu'un membre d'un groupe se comporte différemment
  des autres
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
title: Monitor outlier
---

## Présentation

La détection de singularités est une fonction algorithmique qui vous permet de détecter lorsqu'un groupe spécifique se comporte différemment par rapport aux autres. Par exemple, il est possible de recevoir une alerte lorsqu'un serveur Web d'un pool traite un nombre de requêtes inhabituel. Vous pouvez également être alerté dès qu'une zone de disponibilité AWS produit plus d'erreurs 500 que les autres.

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="alerte métrique singularités" style="width:80%;">}}

## Création d'un monitor

Pour créer un [monitor outlier][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Outlier*.

### Définir la métrique

Toutes les métriques actuellement transmises à Datadog peuvent être surveillées. Pour obtenir des informations supplémentaires, consultez la page [Monitor de métrique][2].

Le monitor outlier requiert une métrique avec un groupe (hosts, zones de disponibilité, partitions, etc.) dans lequel au moins trois membres affichent un comportement uniforme.

### Définir vos conditions d'alerte

* Déclencher une alerte différente pour chaque `<GROUPE>` anormal
* sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore lors d'une période `custom` (comprise entre 1 minute et 24 heures).
* avec l'algorithme `MAD`, `DBSCAN`, `scaledMAD` ou `scaledDBSCAN`
* tolérance : `0.33`, `1.0`, `3.0`, etc.
* % : `10`, `20`, `30`, etc. (seulement pour les algorithmes `MAD`)

Lors de la configuration d'un monitor outlier, l'intervalle de temps est un paramètre important. Si cet intervalle est trop grand, vous risquez de ne pas être alerté à temps. Si cet intervalle est trop court, les alertes ne seront pas en mesure d'omettre les pics ponctuels.

Pour vous assurer que votre alerte est correctement calibrée, vous pouvez définir l'intervalle dans l'aperçu du graphique et utiliser le bouton de retour en arrière (<<) pour regarder à quels moments des singularités auraient déclenché une alerte. De plus, vous pouvez utiliser cette fonctionnalité pour ajuster les paramètres en fonction d'un algorithme de détection spécifique.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="Calibrage graphique nouveau monitor singularités" style="width:80%;">}}

#### Algorithmes

Datadog propose deux types d'algorithmes de détection des singularités : `DBSCAN`/`scaledDBSCAN` et `MAD`/`scaledMAD`. Il est conseillé d'utiliser l'algorithme par défaut DBSCAN. Si vous éprouvez des difficultés à détecter les singularités appropriées, vous pouvez ajuster les paramètres de DBSCAN ou essayer l'algorithme MAD. Les algorithmes mis à l'échelle peuvent être utiles si vos métriques sont homogènes et recueillies à grande échelle.

{{< tabs >}}
{{% tab "DBSCAN" %}}

[DBSCAN][1] (Density-based spatial clustering of applications with noise) est un algorithme de clustering populaire. Généralement, DBSCAN prend en compte :

1. Un paramètre `ε` correspondant au seuil de distance en dessous duquel deux points sont considérés comme proches.
2. Le nombre minimal de points qui doivent se trouver dans le rayon `ε-radius` d'un point avant que ce point commence à s'agglomérer.

Datadog utilise une forme simplifiée de DBSCAN pour détecter les singularités sur des séries temporelles. Chaque groupe est considéré comme un point en *d* dimensions, où *d* est le nombre d'éléments dans la série temporelle. N'importe quel point peut s'agglomérer, et n'importe quel point qui ne se trouve pas dans le plus grand cluster est considéré comme une singularité. Le seuil de distance initial est défini en créant une série temporelle médiane, qui est elle-même établie en prenant la médiane des valeurs des séries temporelles existantes à chaque point dans le temps. La distance euclidienne entre chaque groupe et la série médiane est calculée. Le seuil est défini comme la médiane de ces distances, multipliée par une constante de normalisation.

**Paramètres**<br>
Cette implémentation de DBSCAN prend en compte un paramètre, la `tolerance`, qui correspond à la constante par laquelle le seuil initial est multiplié pour obtenir le paramètre de distance ε de DBSCAN. Définissez le paramètre de tolérance en fonction de l'homogénéité que vous attendez de la part de vos groupes : plus la valeur est importante, plus la tolérance aux écarts d'un groupe par rapport aux autres le sera également.

[1]: https://en.wikipedia.org/wiki/DBSCAN
{{% /tab %}}
{{% tab "MAD" %}}

Le [MAD][1] (median absolute deviation) ou écart médian absolu est une mesure fiable de la variabilité et peut être considéré comme la version analogique fiable de l'écart-type. Les données sont décrites par des statistiques robustes de façon à limiter l'influence des singularités.

**Paramètres**<br>
Pour appliquer l'algorithme MAD à votre monitor outlier, configurez les deux paramètres suivants : `tolerance` et `%`. 

La tolérance correspond au nombre d'écarts devant séparer un point (indépendamment des groupes) de la médiane pour qu'il soit considéré comme une singularité. Le paramètre de tolérance doit être ajusté en fonction de la variabilité attendue des données. Par exemple, si les données se trouvent généralement dans une plage de valeurs restreinte, la tolérance doit être faible. En revanche, si les points varient parfois considérablement, nous vous conseillons de définir une échelle plus élevée afin d'éviter que ces variabilités ne déclenchent un faux positif.

Le pourcentage désigne le pourcentage de points d'un groupe considérés comme des singularités. Si ce pourcentage est dépassé, tout le groupe est considéré comme une singularité.

[1]: https://en.wikipedia.org/wiki/Median_absolute_deviation
{{% /tab %}}
{{% tab "Mis à l'échelle" %}}

DBSCAN et MAD possèdent des versions mises à l'échelle (ScaledDBSCAN et ScaledMAD). Dans la plupart des situations, les algorithmes mis à l'échelle se comportent de la même façon que leur version standard. Cependant, si les algorithmes DBSCAN/MAD identifient des singularités au sein d'un groupe de métriques homogènes et que vous souhaitez que l'algorithme de détection des singularités tienne compte de l'amplitude globale des métriques, essayez les algorithmes mis à l'échelle.

{{% /tab %}}
{{< /tabs >}}

##### DBSCAN et MAD

Quel algorithme faut-il donc utiliser ? Pour la plupart des singularités, chacun des deux algorithmes sera tout aussi efficace avec les paramètres par défaut. Cependant, il existe des cas spécifiques où l'un des deux algorithmes est plus approprié.

Dans l'image ci-dessous, plusieurs hosts vident leurs buffers en même temps, tandis qu'un host vide son buffer un peu plus tard. Avec DBSCAN, ce comportement est détecté comme une singularité, ce qui n'est pas le cas avec MAD. La synchronisation des groupes étant ici simplement le résultat d'un redémarrage simultané des hosts, il est probablement préférable d'opter pour MAD. En revanche, si au lieu des buffers vidés les métriques représentaient une tâche planifiée qui doit être effectuée de façon synchronisée par tous les hosts, DBSCAN serait le choix idéal.

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="transmission singularités" style="width:80%;">}}

### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, délai pour les nouveaux groupes, etc.), consultez la documentation relative à la [configuration des monitors][3].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][4].

## API

Pour automatiser la création de monitors outlier, consultez la [documentation de référence sur l'API Datadog][5]. Datadog vous conseille d'[exporter le JSON d'un monitor][6] pour créer la requête pour l'API.

## Dépannage

Les algorithmes de détection des singularités sont conçus pour identifier les groupes qui affichent un comportement différent par rapport aux autres. Si le comportement de votre groupe prend la forme de « lignes » (peut-être que chaque ligne représente une partition différente), Datadog vous conseille de taguer chaque ligne avec un identificateur et de configurer des alertes de détection des singularités spécifiques pour chaque ligne.

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="ligne singularités" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: /fr/monitors/types/metric/#define-the-metric
[3]: /fr/monitors/configuration/#advanced-alert-conditions
[4]: /fr/monitors/notify/
[5]: /fr/api/v1/monitors/#create-a-monitor
[6]: /fr/monitors/manage/status/#settings