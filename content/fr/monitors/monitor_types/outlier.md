---
title: Monitor outlier
kind: documentation
aliases:
  - /fr/guides/outliers
description: Recevoir des alertes lorsqu'un membre d'un groupe se comporte différemment des autres
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
La détection de singularités est une fonction algorithmique qui vous permet de détecter lorsque certains membres d'un groupe se comportent étrangement par rapport aux autres. Par exemple, il est possible de recevoir une alerte lorsqu'un serveur Web d'un pool traite un nombre de requêtes inhabituel et doit par conséquent faire l'objet d'un remplacement. Vous pouvez également être alerté dès qu'une zone de disponibilité AWS produit plus d'erreurs 500 que les autres, ce qui peut être le signe d'un problème imminent dans cette zone.

{{< img src="monitors/monitor_types/outliers/outliers-metric-alert.png" alt="alerte métrique singularités" responsive="true" style="width:80%;">}}

## Comment utiliser la détection de singularités sur vos données

Lorsque la fonction de requête `outliers` est appliquée à votre requête, celle-ci renvoie les résultats habituels, mais en marquant les séries de singularités.

Vous pouvez utiliser cette fonction pour détecter les singularités dans vos données et en être informé. Pour l'essayer, vous aurez d'abord besoin d'une métrique pour laquelle un groupe de hosts (ou de zones de disponibilité, de partitions, etc.) doit présenter un comportement uniforme. Pour que la fonction génère les résultats attendus, assurez-vous que le groupe comporte au minimum 3 membres. Compte tenu de tous ces paramètres, voici deux façons d'utiliser la détection de singularités sur ce groupe.

### Afficher les singularités dans des dashboards ou screenboards

Voici un graphique de requêtes Gunicorn par host avec la détection des singularités activée.

{{< img src="monitors/monitor_types/outliers/outliers-graph-dbscan-gunicorn.png" alt="Graphique dbscan Gunicorn singularités" responsive="true" style="width:80%;">}}

On peut voir que l'une des séries constitue une singularité : elle gère un trafic largement inférieur aux autres pour l'intervalle étudié.

Pour configurer un graphique de détection des singularités pour vos données, ajoutez une métrique au graphique illustrant toutes les séries dans les groupes. Appliquez ensuite l'algorithme de détection des singularités en ajoutant la fonction `outliers` à vos données. Une fois la fonction appliquée, les séries de singularités sont affichées en gras avec une palette de couleurs chaudes, tandis que les autres séries sont affichées normalement avec une palette de nuances de gris.

Créez d'abord un graphique de séries temporelles sur votre dashboard avec la métrique de votre choix.

{{< img src="monitors/monitor_types/outliers/outliers-dash-choose-metrics-updated.png" alt="Sélection de métrique mise à jour dashboard singularités" responsive="true" style="width:80%;">}}

Pour activer la détection de singularités, cliquez sur l'icône `+` à droite de la ligne des métriques. Choisissez **Algorithms** dans les catégories de fonction, puis choisissez un algorithme de singularité parmi les quatre proposés.

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-selector.png" alt="sélection d'algorithme singularités" responsive="true" style="width:80%;">}}

La fonction outliers est alors appliquée à votre graphique, et les singularités détectées dans le groupe sont affichées en gras et avec des couleurs chaudes.

{{< img src="monitors/monitor_types/outliers/outliers-algorithm-annotated-newer.png" alt="nouveau algorithme annoté singularités" responsive="true" style="width:80%;">}}

Plusieurs algorithmes de détection des singularités sont proposés. L'algorithme par défaut (DBSCAN) et les valeurs par défaut des paramètres devraient convenir à la plupart des scénarios. Cependant, si le nombre de singularités identifiées est trop élevé ou trop faible, vous pouvez ajuster l'algorithme ou en essayer un autre. Pour en savoir plus, consultez la section « Paramètres et algorithmes de détection des singularités » ci-dessous.

### Recevoir des alertes en cas de singularités

Vous pouvez également définir un monitor pour recevoir une alerte en cas de détection d'une singularité dans un groupe important.

{{< img src="monitors/monitor_types/outliers/outliers-alert-snapshot.png" alt="snapshot alerte singularités" responsive="true" style="width:80%;">}}

Par exemple, pour recevoir une alerte lorsqu'un host Cassandra est anormalement chargé par rapport au reste du groupe, vous pouvez [ajouter un nouveau monitor outlier][1] pour la métrique.

Accédez à la page [New Monitor][2] et cliquez sur **Outlier**. Remplissez ensuite la section **Define the metric** comme pour n'importe quel autre monitor.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-define-metric.png" alt="Définition métrique nouveau monitor singularités" responsive="true" style="width:80%;">}}

Dans les [conditions d'alerte][3], sélectionnez le groupe et l'intervalle. Sélectionnez ensuite un algorithme et les valeurs de paramètres à utiliser pour la détection des singularités.

{{< img src="monitors/monitor_types/outliers/outliers-newer-monitor-set-conditions.png" alt="Définition condition nouveau monitor singularités" responsive="true" style="width:80%;">}}

Pour vous assurer que votre alerte est correctement calibrée, vous pouvez définir l'intervalle en haut de l'écran et utiliser le bouton de retour en arrière (<<) pour regarder à quel moment des singularités ont été détectées et signalées. La même méthode peut être employée pour ajuster les paramètres en fonction de l'algorithme de singularité spécifique que vous utilisez.

{{< img src="monitors/monitor_types/outliers/outliers-new-monitor-graph-calibrate.png" alt="Calibrage graphique nouveau monitor singularités" responsive="true" style="width:80%;">}}

## Référence : paramètres et algorithmes de détection des singularités

Deux types d'algorithmes de détection des singularités différents peuvent être appliqués à vos données : DBSCAN/ScaledDBSCAN et MAD/ScaledMAD. Datadog vous conseille de commencer avec l'algorithme par défaut, DBSCAN. Si vous éprouvez des difficultés à détecter les singularités appropriées, vous pouvez ajuster les paramètres de DBSCAN ou essayer l'autre algorithme, MAD. Si vous avez des métriques à plus grande échelle qui semblent être étroitement regroupées mais que les algorithmes DBSCAN/MAD les considèrent comme des singularités, essayez les algorithmes mis à échelle. Lisez notre [article de blog sur la détection des singularités][4] pour en savoir plus.

### DBSCAN

[DBSCAN][5] (Density-based spatial clustering of applications with noise) est un algorithme de clustering populaire. Généralement, DBSCAN prend en compte : 1) un paramètre 𝜀 correspondant au seuil de distance en dessous duquel deux points sont considérés comme proches ; et 2) le nombre minimal de points qui doivent se trouver dans le rayon 𝜀 d'un point avant que ce point commence à s'agglomérer.

Datadog utilise une forme simplifiée de DBSCAN pour détecter les singularités sur des séries temporelles. Datadog considère que chaque host est un point en *d* dimensions, où *d* est le nombre d'éléments dans les séries temporelles. N'importe quel point peut s'agglomérer, et n'importe quel point qui ne se trouve pas dans le plus grand cluster est considéré comme une singularité. Le seuil de distance initial est défini en créant une série temporelle médiane, qui est elle-même établie en prenant la médiane des valeurs des séries temporelles existantes à chaque point dans le temps. La distance euclidienne entre chaque host et la série médiane est calculée. Le seuil est défini comme la médiane de ces distances, multipliée par une constante de normalisation.

Cette implémentation de DBSCAN prend en compte un paramètre, `tolerance`, qui correspond à la constante par laquelle le seuil initial est multiplié pour obtenir le paramètre de distance 𝜀 de DBSCAN.

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-config.png" alt="Configuration dbscan singularités" responsive="true" style="width:80%;">}}

Sur l'image qui suit, DBSCAN est appliqué avec une tolérance de 3.0 sur un pool de workers Cassandra :

{{< img src="monitors/monitor_types/outliers/outliers-dbscan-cassandra.png" alt="singularités dbscan cassandra" responsive="true" style="width:80%;">}}

Définissez le paramètre de tolérance en fonction de comportements similaires auxquels vous vous attendez de la part de vos hosts : des valeurs plus importantes permettent une plus grande tolérance quant à la possibilité pour un host d'avoir un comportement qui s'écarte de celui de ses pairs.

### MAD

Le [Median Absolute Deviation][6] (MAD) ou écart médian absolu est une mesure fiable de la variabilité et peut être considéré comme la version analogique fiable de l'écart-type. Les données sont décrites par des statistiques robustes de façon à limiter l'influence des singularités.

Pour utiliser MAD pour votre monitor outlier, configurez les deux paramètres suivants : 

- `tolerance` : ce paramètre correspond au nombre d'« écarts » devant séparer un point de la médiane pour qu'il soit considéré comme une singularité.
- `pct` : si le pourcentage de points considérés comme des singularités dépasse ce pourcentage dans une série spécifique, toute la série est considérée comme une singularité.

{{< img src="monitors/monitor_types/outliers/outliers-mad-config.png" alt="Configuration MAD singularités" responsive="true" style="width:80%;">}}

Sur l'image qui suit, MAD est appliqué avec une tolérance de 3 et un pourcentage de 20 lors de la comparaison de la charge système moyenne par zone de disponibilité :

{{< img src="monitors/monitor_types/outliers/outliers-mad-az.png" alt="singularités MAD AZ" responsive="true" style="width:80%;">}}

Le paramètre de tolérance doit être ajusté en fonction de la variabilité attendue des données. Par exemple, si les données se trouvent généralement dans une plage de valeurs restreinte, la tolérance doit être faible. En revanche, si les points varient parfois considérablement, nous vous conseillons de définir une échelle plus élevée afin d'éviter que ces variabilités ne déclenchent un faux positif.

### DBSCAN et MAD

Quel algorithme faut-il donc utiliser ? Pour la plupart des singularités, chacun des deux algorithmes sera tout aussi efficace avec les paramètres par défaut. Cependant, il existe des cas spécifiques où l'un des deux algorithmes est plus approprié.

Dans l'image ci-dessous, plusieurs hosts vident leurs buffers en même temps, tandis qu'un host vide son buffer un peu plus tard. Avec DBSCAN, cela est détecté comme une singularité, ce qui n'est pas le cas avec MAD. Ces singularités n'étant pas pertinentes, il peut être préférable d'utiliser MAD dans ce type de cas.

La synchronisation du groupe signifie simplement que les hosts ont été redémarrés en même temps. En revanche, si au lieu des buffers vidés les métriques ci-dessous représentaient une tâche planifiée qui doit être effectuée de façon synchronisée par tous les hosts, DBSCAN serait le choix idéal.

{{< img src="monitors/monitor_types/outliers/outliers-flushing.png" alt="transmission singularités" responsive="true" style="width:80%;">}}

#### Algorithmes mis à l'échelle et algorithmes standard

DBSCAN et MAD possèdent des versions mises à l'échelle, appelées ScaledDBSCAN et ScaledMAD, respectivement. Dans la plupart des situations, les algorithmes mis à l'échelle se comportent de la même façon que leur version standard. Cependant, si les algorithmes DBSCAN/MAD identifient des singularités au sein d'un groupe de métriques homogènes et que vous souhaitez que l'algorithme de détection des singularités tienne compte de l'amplitude globale des métriques, essayez les algorithmes mis à l'échelle.

L'image ci-dessous compare les algorithmes DBSCAN et ScaledDBSCAN, qui sont appliqués avec une tolérance de 3 sur la taille des données de champ d'un groupe de nœuds Elasticsearch :

{{< img src="monitors/monitor_types/outliers/outliers-scaled-dbscan-es.png" alt="singularités mises à l'échelle dbscan es" responsive="true" style="width:80%;">}}

Dans l'image ci-dessous, les algorithmes MAD et ScaledMAD sont appliqués afin de comparer la mémoire utilisable dans des hosts Cassandra. Les deux présentent une tolérance de 3 et une valeur de pourcentage de 20 :

{{< img src="monitors/monitor_types/outliers/outliers-scaled-mad-cassandra.png" alt="singularités mises à l'échelle MAD Cassandra" responsive="true" style="width:80%;">}}

### Configuration d'alertes

Lors de la configuration d'une alerte de singularité, l'intervalle de temps constitue un paramètre important. Si cet intervalle est trop grand, la singularité risque d'être détectée alors que le comportement inapproprié dure déjà depuis trop longtemps. Si cet intervalle est trop court, les alertes ne seront pas en mesure d'omettre les pics ponctuels non importants.

Les deux algorithmes sont configurés de façon à identifier les singularités qui diffèrent de la majorité des métriques présentant un comportement similaire. Si le comportement de vos hosts prend la forme de « lignes » comme dans l'image ci-dessous (peut-être parce que chaque ligne représente une partition différente), nous vous conseillons de taguer chaque ligne avec un identificateur et de configurer des alertes de détection des singularités spécifiques pour chaque ligne.

{{< img src="monitors/monitor_types/outliers/outliers-banding.png" alt="ligne singularités" responsive="true" style="width:80%;">}}

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/outlier
[2]: https://app.datadoghq.com/monitors#/create
[3]: /fr/monitors/monitor_types/#define-the-conditions
[4]: https://www.datadoghq.com/blog/outlier-detection-algorithms-at-datadog
[5]: https://en.wikipedia.org/wiki/DBSCAN
[6]: https://en.wikipedia.org/wiki/Median_absolute_deviation