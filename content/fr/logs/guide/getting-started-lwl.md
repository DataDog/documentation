---
title: Guide de la fonctionnalité Logging without Limits™
kind: guide
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: "En savoir plus sur la vue Log\_Explorer"
  - link: '/logs/explorer/#patterns'
    tag: Documentation
    text: Se familiariser avec la vue Log Pattern
  - link: /logs/live_tail/
    tag: Documentation
    text: Explorer la fonctionnalité Live Tail
  - link: /logs/logs_to_metrics/
    tag: Documentation
    text: Découvrir comment générer des métriques à partir de logs ingérés
---
## Présentation

Les applications cloud peuvent générer des millions de logs par minute. Toutefois, selon votre situation, vos logs ne sont pas tous utiles. Pour cette raison, la fonctionnalité [Logging without Limits™][1] de Datadog vous offre une flexibilité accrue en séparant [le processus d'ingestion des logs du processus d'indexation][2].

Ce guide identifie les principaux composants de la fonctionnalité Logging without Limits™ tels que les [patterns](#2-identifier-les-patterns-de-journalisation-volumineuse), les [filtres d'exclusion](#3-creer-un-filtre-d-exclusion-de-pattern-de-log), les [métriques custom basées sur des logs](#4-generer-des-metriques-pour-effectuer-un-suivi-des-logs-exclus) et les [monitors](#creer-un-monitor-de-detection-d-anomalies), qui peuvent améliorer l'organisation de votre vue Log Explorer et optimiser la surveillance de vos KPI au fil du temps.

## 1. Identifier le statut de service générant le plus de logs

Votre service avec la plus forte journalisation comporte de nombreux logs, qui ne sont pas tous pertinents en fonction du problème que vous cherchez à résoudre. Par exemple, si vous souhaitez étudier le log de chaque code de réponse 4xx ou 5xx, vous pouvez exclure le log de chaque réponse 200 de la vue Log Explorer afin d'accélérer le processus de résolution d'une panne ou d'un événement important. Après avoir détecté le service concerné, vous pouvez identifier le statut de service qui génère le plus de logs afin de l'exclure de la [vue Log Explorer][3].

{{< img src="logs/guide/getting-started-lwl/identify_logging_service.gif" alt="Identifier le statut de service générant le plus de logs" style="width:100%;">}}

**Pour identifier le statut de service générant le plus de logs** :

1. Dans la vue Log Explorer, sélectionnez la **vue graphique** en regard de la barre de recherche.
2. Sous la barre de recherche, indiquez count `*` group by `service` et limitez les résultats au `top 10`.
3. Sélectionnez **Top List** dans le menu déroulant en regard de l'option Hide Controls.
4. Cliquez sur le premier service répertorié, puis sélectionnez **Search for** dans le menu qui s'affiche. Cela lance une recherche, visible dans la barre de recherche au-dessus, en fonction de la facette de votre service.
5. Remplacez l'expression « group by `service` » par « group by `status` ». Cela affiche la liste des principaux statuts pour votre service.
6. Cliquez sur le premier statut répertorié, puis sélectionnez **Search for** dans le menu qui s'affiche. Cela ajoute la facette de votre statut à la recherche.

**Remarque** : vous pouvez appliquer cette méthode à n'importe quelle requête, peu importe son volume de journalisation, afin de générer une Top List. Vous êtes libre de modifier les facettes de regroupement, en remplaçant par exemple `service` ou `status` par `host` ou encore `network.client.ip`.

## 2. Identifier les patterns de journalisation volumineuse

Maintenant que vous savez lequel de vos statut de service génère le plus de logs, passez à la [vue Patterns][4], située en regard du graphique, à haut à gauche du Log Explorer. Vous pourrez ainsi visualiser automatiquement vos patterns de log pour le contexte sélectionné.

Un contexte est constitué d'un intervalle et d'une requête de recherche. Les principales caractéristiques de chaque pattern sont détaillées, afin de comprendre rapidement ses particularités. Un petit graphique représente le volume de ses logs au sein d'un calendrier approximatif. Cette visualisation vous permet d'identifier ce qui distingue votre pattern des autres patterns. Les éléments de logs qui varient au sein du pattern sont mis en évidence pour identifier facilement les différences entre chaque ligne de log. 

Cliquez sur le pattern de log à exclure pour afficher un échantillon de logs sous-jacents.

{{< img src="logs/guide/getting-started-lwl/patterns_context_panel.png" alt="Contexte des patterns" style="width:100%;">}}

La vue Pattern vous aide à identifier et à filtrer les patterns inutiles. Elle présente le nombre de logs correspondant à un pattern, répartis en fonction de leur service et de leur statut. Cliquez sur le premier pattern pour visualiser un log détaillé des événements associés au statut. Les informations sur le pattern de statut transmettant le plus de données parasites s'affichent dans une fenêtre contextuelle.

## 3. Créer un filtre d'exclusion de pattern de log

Le volet de contexte des patterns répertorie toutes les instances (tous les événements) d'un pattern de log. Il crée également une requête de recherche personnalisée en fonction du pattern sélectionné. Ajoutez cette requête à un filtre d'exclusion pour supprimer ces logs de votre index.

**Pour créer un filtre d'exclusion** :

1. Cliquez sur un pattern depuis la liste des patterns.
2. Cliquez sur le bouton **View All** dans le coin supérieur droit pour générer automatiquement la requête de recherche associée au pattern.
3. Sélectionnez l'option `</>` à droite de la requête de recherche pour copier cette dernière.

{{< img src="logs/guide/getting-started-lwl/pattern_view.gif" alt="Vue Pattern" style="width:100%;">}}

4. Accédez à la page **Configuration**, sous Logs, dans le menu principal. Sélectionnez **Indexes** et cliquez sur l'index correspondant. Les informations relatives à l'ajout d'un filtre d'exclusion sont automatiquement remplies.
5. Sélectionnez **Add an Exclusion Filter**.
6. Indiquez le nom du filtre, collez la requête de recherche afin de définir la requête d'exclusion, puis définissez un pourcentage d'exclusion.

{{< img src="logs/guide/getting-started-lwl/exclusion_filter.gif" alt="Filtre d'exclusion" style="width:100%;">}}

**Remarque** : si un log correspond à plusieurs filtres d'exclusion, seule la règle du premier filtre d'exclusion est appliquée. Un log ne peut pas être échantillonné ou exclu plusieurs fois par différents filtres d'exclusion. 

Dans cet exemple, le pattern `Updating recommendations with customer_id=* & url=shops/*/*` du statut de service `INFO` est exclus à l'aide d'un filtre d'exclusion. En supprimant les patterns de journalisation volumineuse comme celui-ci de votre vue Log Explorer, vous pouvez parcourir vos données et identifier vos problèmes plus facilement. Sachez cependant que ces logs sont **uniquement** retirés de la vue Log Explorer. Ils sont toujours ingérés et consultables dans la vue [Live Tail][5]. Ils peuvent également être envoyés vers les [archives de logs][6] ou utilisés pour [générer des métriques][7].

{{< img src="logs/guide/getting-started-lwl/live_tail.gif" alt="Live Tail" style="width:100%;">}}

Vous pouvez désactiver à tout moment un filtre d'exclusion à l'aide du bouton situé sur sa droite. Pour modifier ou supprimer un filtre, il vous suffit de passer votre curseur dessus pour afficher les options pertinentes.

## 4. Générer des métriques pour effectuer un suivi des logs exclus

Si vous excluez un pattern de log de la vue Log Explorer, vous pouvez tout de même surveiller l'évolution de ses KPI durant l'ingestion. Pour ce faire, créez une [métrique custom basée sur des logs][8].

### Ajouter une nouvelle métrique basée sur des logs

**Pour générer des métriques basées sur votre pattern de log** :

1. Depuis votre compte Datadog, passez le curseur sur **Logs** dans le menu principal, sélectionnez **Generate Metrics**, puis cliquez sur le bouton **New Metric+** dans le coin supérieur droit.
2. Sous **Define Query**, collez la requête de recherche que vous avez précédemment copiée et utilisée pour le filtre d'exclusion de pattern. Dans notre exemple, il s'agit de `service:web-store status:info "updating recommendations with customer_id" "url shops"`.
3. Choisissez le champ à surveiller : sélectionnez `*` pour calculer le nombre de logs correspondant à votre requête, ou saisissez une mesure (p. ex., `@duration`) pour agréger une valeur numérique et créer les métriques agrégées count, min, max, sum et avg correspondantes.
4. Ajoutez des dimensions au groupe : sélectionnez les attributs de log ou les clés de tag à appliquer à la métrique basée sur des logs que vous avez créée, afin de les convertir en tags au format `<KEY>:<VALUE>`. Les métriques basées sur des logs sont considérées comm des métriques custom. Évitez donc d'effectuer des regroupements à partir d'attributs sans restriction ou présentant une cardinalité extrêmement élevée, tels que des timestamps, des ID utilisateur, des ID de requête ou des ID de session, pour empêcher une hausse conséquente de vos coûts.
5. Donnez un nom à votre métrique : les noms de métriques basées sur des logs doivent suivre la convention de nommage des métriques.

{{< img src="logs/guide/getting-started-lwl/custom_metric.gif" alt="Générer une métrique custom" style="width:100%;">}}

### Créer un monitor de détection d'anomalies

La [détection d'anomalies][9] est une fonction algorithmique qui identifie le comportement anormal d'une métrique en fonction de ses données historiques. Si vous créez un monitor de détection d'anomalies pour vos logs exclus, vous serez prévenu en cas de changement, selon les conditions d'alerte précisées.

**Pour définir un monitor de détection d'anomalie** :

1. Dans la navigation principale, accédez à **Monitors -> New Monitor -> Anomaly**.
2. Saisissez le nom de la métrique basée sur des logs que vous avez définie dans la section précédente.
3. Indiquez des conditions d'alerte et précisez les informations supplémentaires requises pour prévenir votre équipe ou vous-même du changement de comportement.
4. Enregistrez le monitor.

{{< img src="logs/guide/getting-started-lwl/anomaly_monitor.gif" alt="Monitor d'anomalie" style="width:100%;">}}

Lorsqu'une anomalie est détectée, toutes les personnes concernées reçoivent une alerte. Cette alerte figure également dans [Monitors -> Triggered Monitors][10].

## Résumé

Vous savez désormais comment utiliser la fonctionnalité Logging without Limits™ pour :

1. [Identifier le statut de service générant le plus de logs](#1-identify-your-most-logging-service-status)
2. [Identifier les patterns de logs les plus volumineux](#2-identify-high-volume-logging-patterns)
3. [Créer un filtre d'exclusion de pattern de log](#3-create-a-log-pattern-exclusion-filter)
4. [Générer des métriques pour effectuer un suivi des logs exclus](#4-generate-metrics-to-track-excluded-logs)
  * [Ajouter une nouvelle métrique basée sur des logs](#add-a-new-log-based-metric)
  * [Créer un monitor de détection d'anomalies](#create-an-anomaly-detection-monitor)

Pour en savoir plus sur la fonctionnalité Logging without Limits™ et exploiter pleinement des fonctions comme la vue Log Explorer, Live Tail et les patterns de logs, consultez les liens ci-dessous.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/logging-without-limits/
[2]: /fr/logs/
[3]: https://app.datadoghq.com/logs
[4]: https://app.datadoghq.com/logs/patterns
[5]: /fr/logs/live_tail/
[6]: /fr/logs/archives/
[7]: /fr/developers/metrics/
[8]: /fr/logs/logs_to_metrics/
[9]: /fr/monitors/monitor_types/anomaly/
[10]: https://app.datadoghq.com/monitors#/triggered