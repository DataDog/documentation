---
title: Créer un dashboard pour suivre et corréler les métriques APM

further_reading:
  - link: /tracing/guide/alert_anomalies_p99_database/
    tag: "3\_minutes"
    text: Être alerté en cas de latence au 99e centile anormale pour un service de base de données
  - link: /tracing/guide/week_over_week_p50_comparison/
    tag: "2\_minutes"
    text: Comparer la latence d'un service avec celle de la semaine précédente
  - link: /tracing/guide/slowest_request_daily/
    tag: "3\_minutes"
    text: Débuguer la trace la plus lente sur l'endpoint le plus lent d'un service web
  - link: /tracing/guide/add_span_md_and_graph_it/
    tag: "7\_minutes"
    text: Ajouter des tags de span et filtrer ou regrouper les données de performance de votre application
  - link: /tracing/guide/
    tag: ''
    text: Tous les guides
---
_Temps de lecture : 4 minutes_

{{< img src="tracing/guide/apm_dashboard/dashboard_7.mp4" alt="dashboard 7" video="true"  style="width:90%;">}}

L'APM Datadog vous permet de créer des dashboards en fonction des priorités de votre entreprise et des métriques qui vous importent :
Vous pouvez créer des widgets sur ces dashboards afin de suivre vos métriques d'infrastructure traditionnelles, vos métriques de log et vos métriques custom, telles que la charge mémoire du host, conjointement à vos métriques APM critiques mesurant le débit, la latence et le taux d'erreur de façon à mettre toutes ces données en corrélation.
Il est également possible de suivre la latence de l'expérience utilisateur pour les clients et les transactions critiques tout en surveillant les performances de votre serveur Web principal en prévision d'un événement majeur, tel que le 1er jour des soldes.

Dans ce guide, vous découvrirez comment procéder pour ajouter des métriques de trace à un dashboard, les corréler avec vos métriques d'infrastructure, puis exporter une requête Analytics. L'ajout de widgets à un dashboard peut se faire de trois façons différentes :

* En copiant un graphique APM existant _( étapes 1, 2 et 3)_
* En créant un graphique manuellement _(étapes 4 et 5)_
* En exportant une requête Analytics _(étape 7)_

1. **Ouvrez la [page contenant la liste des services][1]** et sélectionnez le service `web-store`.

2. **Recherchez le graphique Total Requests** et cliquez sur le bouton `export` en haut à droite afin de sélectionner `Export to Dashboard`. **Cliquez sur `New Timeboard`**.

    {{< img src="tracing/guide/apm_dashboard/dashboard_2.png" alt="dashboard 2"  style="width:90%;">}}

3. **Cliquez sur `View Dashboard`** dans le message de réussite.

    Dans le nouveau dashboard, le graphique `Hit/error count on service` correspondant au service `web-store` est maintenant disponible. Il affiche le débit global du service ainsi que le nombre total d'erreurs détectées.

    {{< img src="tracing/guide/apm_dashboard/dashboard_3.png" alt="dashboard 3"  style="width:90%;">}}

    **Remarque** : vous pouvez cliquer sur l'icône en forme de crayon pour modifier ce graphique et voir les métriques exactes utilisées.

4. **Cliquez sur `Add graph` dans le carré d'espace réservé** au sein du dashboard, puis **faites glisser une `Timeseries` vers cet espace**.

    Vous accédez alors à l'écran de modification des widgets du dashboard. Celui-ci vous permet de représenter comme bon vous semble les métriques de votre choix. Consultez la [documentation relative au widget Série temporelle][2] pour en savoir plus.

5. **Cliquez sur la case `system.cpu.user`** et sélectionnez la métrique et les paramètres qui vous intéressent. Cet exemple utilise les paramètres suivants :

    | Paramètre | Valeur                         | Description                                                                                                          |
    | ------    | -----                         | -----                                                                                                                |
    | `metric`  | `trace.rack.requests.errors` | Le nombre total de requêtes Ruby Rack ayant généré une erreur.                                                                      |
    | `from`    | `service:web-store`           | Dans cet exemple de pile, le service principal est un service Ruby à partir duquel proviennent toutes les informations présentées sur le graphique. |
    | `sum by`  | `http.status_code`            | Permet de présenter les données en fonction des codes de statut http.                                                                        |

    {{< img src="tracing/guide/apm_dashboard/dashboard_4.mp4" video="true" alt="dashboard 4"  style="width:90%;">}}

    Cette présentation n'est qu'un exemple parmi bien d'autres options possibles. Il convient de noter que toutes les métriques qui commencent par `trace.` contiennent des informations sur l'APM. Consultez la [documentation sur les métriques de l'APM pour en savoir plus][3].

6. **Faites glisser d'autres séries temporelles vers le carré d'espace réservé**

    Dans cet exemple, deux métriques distinctes sont représentées sur un graphique : une métrique `trace.*` et une métrique `runtime.*`. Lorsqu'elles sont visualisées côte à côte, ces métriques vous permettent de mettre en corrélation les informations sur vos requêtes avec celles sur les performances d'exécution du code. Les pics de latence étant parfois liés à une augmentation du nombre de threads, nous allons représenter la latence d'un service en même temps que le nombre de threads :

    1. Commencez par ajouter la métrique `trace.rack.requests.errors` au widget :

        | Paramètre | Valeur                                        | Description                                                                                                          |
        | ------    | -----                                        | -----                                                                                                                |
        | `metric`  | `trace.rack.request.duration.by.service.99p` | Le 99e centile de latence des requêtes au sein de notre service.                                                           |
        | `from`    | `service:web-store`           | Dans cet exemple de pile, le service principal est un service Ruby à partir duquel proviennent toutes les informations présentées sur le graphique. |

    2. Cliquez ensuite sur `Graph additional: Metrics` pour ajouter une autre métrique sur le graphique :

        | Paramètre | Valeur                       | Description                                                                                                          |
        | ------    | -----                       | -----                                                                                                                |
        | `metric`  | `runtime.ruby.thread_count` | Nombre de threads mesuré par les métriques runtime Ruby.                                                                    |
        | `from`    | `service:web-store`           | Dans cet exemple de pile, le service principal est un service Ruby à partir duquel proviennent toutes les informations présentées sur le graphique. |

        {{< img src="tracing/guide/apm_dashboard/dashboard_5.mp4" alt="dashboard_5" video="true"  style="width:90%;">}}

    Avec ces paramètres, il est possible de déterminer si un pic de latence est lié à une hausse du nombre de threads Ruby, ce qui expliquerait immédiatement la cause de la latence et permettrait ainsi de résoudre rapidement le problème.

7. **Accédez à [Analytics][4]**.

    Cet exemple illustre la marche à suivre pour mesurer la latence au sein d'une application, en classant les résultats par marchand afin d'identifier les 10 marchands qui présentent la latence la plus élevée. Depuis l'écran Analytics, exportez le graphique vers le dashboard et affichez-le dans celui-ci :

    {{< img src="tracing/guide/apm_dashboard/dashboard_6.mp4" video="true" alt="dashboard 6"  style="width:90%;">}}

8. **Revenez à votre dashboard**.

    Plusieurs widgets sont désormais visibles, vous permettant ainsi d'analyser en détail l'application aussi bien d'un point de vue technique que commercial. Il ne s'agit toutefois que d'une possibilité parmi tant d'autres : il est possible d'ajouter des métriques d'infrastructure, d'utiliser un autre type de visualisation ou encore d'ajouter des calculs et des projections.

    Le dashboard vous permet également de visualiser les événements associés.

9. **Cliquez sur le bouton `Search Events or Logs`** et recherchez un flux d'événements pertinent. **Remarque** : Ansible est utilisé dans cet exemple. Il se peut que votre [flux d'événements][5] soit différent.

    {{< img src="tracing/guide/apm_dashboard/dashboard_1.png" alt="dashboard 1"  style="width:90%;">}}

    Les événements qui se sont produits récemment (dans Datadog ou dans des services externes comme Ansible, Chef, etc.) s'affichent alors au sein du dashboard : ceux-ci comprennent notamment les déploiements, les tâches terminées ou les alertes de monitors. Ces événements peuvent être corrélés avec les métriques représentées dans le dashboard.

   Enfin, assurez-vous d'utiliser les template variables. Ces dernières correspondent à un ensemble de valeurs qui permettent à chaque utilisateur de contrôler les widgets d'un dashboard de façon dynamique, sans avoir à modifier les widgets eux-mêmes.

10. **Cliquez sur `Add Template Variables`** dans la zone de configuration. **Cliquez sur `Add Variable +`**, nommez la template variable et choisissez le tag que la variable doit contrôler.

    Dans cet exemple, une template variable associée au tag `Region` est ajoutée pour surveiller le comportement des données du dashboard au sein de `us-east1` et de `europe-west-4`, nos deux principales zones d'activité.

    {{< img src="tracing/guide/apm_dashboard/dashboard_8.mp4" alt="dashboard 8" video="true"  style="width:90%;">}}

    Vous pouvez maintenant ajouter cette template variable à chaque graphique :

    {{< img src="tracing/guide/apm_dashboard/dashboard_9.png" alt="dashboard 9"  style="width:90%;">}}

    Lorsque vous modifiez la valeur dans la zone de configuration, toutes les valeurs sont mises à jour dans le dashboard :

    {{< img src="tracing/guide/apm_dashboard/dashboard_10.mp4" alt="dashboard 10" video="true"  style="width:90%;">}}

    Tirez parti de ces fonctionnalités pour mettre en œuvre les trois piliers de la visibilité de Datadog et profiter d'une visibilité optimale sur toutes vos métriques. Un dashboard simple peut être transformé en outil tout-en-un puissant qui vous permettra de surveiller efficacement votre organisation :

    {{< img src="tracing/guide/apm_dashboard/dashboard_7.mp4" alt="dashboard 7" video="true"  style="width:90%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /fr/dashboards/widgets/timeseries/
[3]: /fr/tracing/guide/metrics_namespace/
[4]: https://app.datadoghq.com/apm/analytics
[5]: /fr/events/
