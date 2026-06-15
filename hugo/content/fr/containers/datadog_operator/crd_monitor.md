---
description: Déployer et gérer les Monitors Datadog en utilisant la définition de
  ressource personnalisée DatadogMonitor avec le Datadog Operator
further_reading:
- link: https://docs.datadoghq.com/api/latest/monitors/#create-a-monitor
  tag: API Datadog
  text: 'Référence de l''API : créer un Monitor Datadog'
- link: https://github.com/DataDog/helm-charts/blob/main/crds/datadoghq.com_datadogmonitors.yaml
  tag: GitHub
  text: DatadogMonitor CRD
title: CRD DatadogMonitor
---

Pour déployer un Monitor Datadog, vous pouvez utiliser le Datadog Operator et la définition de ressource personnalisée (CRD) `DatadogMonitor`.

## Prérequis
- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v0.6+

## Configuration

1. Créez un fichier avec les spécifications de votre configuration de déploiement `DatadogMonitor`.

   **Exemple** :

   La spécification suivante crée un [Monitor de métrique][4] qui envoie une alerte sur la requête `avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5`.

   {{< code-block lang="yaml" filename="datadog-metric-monitor.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogMonitor
   metadata:
     name: datadog-monitor-test
     namespace: datadog
   spec:
     query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
     type: "metric alert"
     name: "Test monitor made from DatadogMonitor"
     message: "1-2-3 testing"
     tags:
       - "test:datadog"
     priority: 5
     controllerOptions:
       disableRequiredTags: false
     options:
       evaluationDelay: 300
       includeTags: true
       locked: false
       newGroupDelay: 300
       notifyNoData: true
       noDataTimeframe: 30
       renotifyInterval: 1440
       thresholds:
         critical: "0.5"
         warning: "0.28"
   {{< /code-block >}}

   Consultez la [liste complète des champs de configuration](#tous-les-champs-de-configuration-disponibles).

2. Déployez votre `DatadogMonitor` :

   ```shell
   kubectl apply -f /path/to/your/datadog-metric-monitor.yaml
   ```

## Autres exemples

### Monitors de métriques
- [Un pod est en CrashLoopBackOff][6]
- [Un pod est en ImagePullBackOff][8]
- [Les pods de plusieurs réplicas de déploiement sont arrêtés][7]
- [Les pods de plusieurs réplicas de StatefulSet sont arrêtés][12]
- [Plus de 20 % des nœuds d'un cluster ne peuvent pas être planifiés][9]
- [Plus de 10 pods sont en échec dans un cluster][10]
- [Les pods redémarrent plusieurs fois au cours des cinq dernières minutes][11]


### Autres monitors
- [Monitor d'audit][13]
- [Monitor d'événement][14]
- [Monitor d'événement V2][15]
- [Monitor de log][16]
- [Monitor de processus][17]
- [Monitor RUM][18]
- [Check de service Monitor][19]
- [Monitor de SLO][20]
- [Monitor de trace analytics][21]

## Tous les champs de configuration disponibles

Le tableau suivant répertorie tous les champs de configuration disponibles pour la ressource personnalisée `DatadogMonitor`.

`message`
: **obligatoire** - _chaîne_
<br/>Message à inclure dans les notifications de ce Monitor.

`name`
: **obligatoire** - _chaîne_
<br/>Nom du Monitor.

`query`
: **obligatoire** - _chaîne_
<br/>Requête du Monitor.

`type`
: **obligatoire** - _énumération_
<br/>Type du Monitor.
<br/>Valeurs d'énumération autorisées : `metric alert`, `query alert`, `service check`, `event alert`, `log alert`, `process alert`, `rum alert`, `trace-analytics alert`, `slo alert`, `event-v2 alert`, `audit alert`, `composite`

`controllerOptions.disableRequiredTags`
: _booléen_
<br/>Désactive l'ajout automatique de tags requis aux Monitors.

`priority`
: _int64_
<br/>Entier de 1 (élevé) à 5 (faible) indiquant la gravité de l'alerte.

`restrictedRoles`
: _[chaîne]_
<br/>Liste d'identifiants de rôle uniques définissant les rôles autorisés à modifier le Monitor. Les identifiants uniques de tous les rôles peuvent être récupérés à partir de l'[API Roles][22] et se trouvent dans le champ `data.id`.

`tags`
: _[chaîne]_
<br/>Tags associés à votre Monitor.

`options`
: _objet
<br/>Liste des options associées à votre Monitor. Consultez la section [Options](#options).

### Options

Les champs suivants sont définis dans la propriété `options`.

Exemple :

{{< highlight yaml "hl_lines=11-15" >}}
apiVersion: datadoghq.com/v1alpha1
kind: DatadogMonitor
metadata:
  name: datadog-monitor-test
  namespace: datadog
spec:
  query: "avg(last_10m):avg:system.disk.in_use{*} by {host} > 0.5"
  type: "metric alert"
  name: "Test monitor made from DatadogMonitor"
  message: "1-2-3 testing"
  options:
    enableLogsSample: true
    thresholds:
      critical: "0.5"
      warning: "0.28"
{{< /highlight >}}

`enableLogsSample`
: _booléen
<br/>Indique si un échantillon de log doit être envoyé lorsque le Monitor de log se déclenche.

`escalationMessage`
: _chaîne_
<br/>Message à inclure dans une nouvelle notification.

`evaluationDelay`
: _int64_
<br/>Délai (en secondes) avant l'évaluation, sous forme d'entier non négatif. Par exemple : si la valeur est définie sur 300 (5 min), la période est définie sur `last_5m` et l'heure est 7:00, le Monitor évalue les données de 6:50 à 6:55. Cette option est utile pour AWS CloudWatch et d'autres métriques renvoyées rétroactivement afin de garantir que le Monitor dispose toujours de données lors de l'évaluation.

`groupRetentionDuration`
: _chaîne_
<br/>Durée après laquelle les groupes dont les données sont manquantes sont supprimés de l'état du Monitor. La valeur minimale est d'une heure et la valeur maximale est de 72 heures. Exemples de valeurs : `60m`, `1h` et `2d`. Cette option est disponible uniquement pour les Monitors APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs et RUM.

`groupbySimpleMonitor`
: booléen
<br/>OBSOLÈTE : indique si le Monitor d'alerte de log déclenche une alerte unique ou plusieurs alertes lorsqu'un groupe dépasse un seuil. Utilisez `notifyBy` à la place.

`includeTags`
: booléen
<br/>Valeur booléenne indiquant si les notifications de ce Monitor insèrent automatiquement ses tags de déclenchement dans le titre.

`locked`
: booléen
<br/>OBSOLÈTE : indique si le Monitor est verrouillé (modifiable uniquement par le créateur et les administrateurs). Utilisez `restrictedRoles` à la place.

`newGroupDelay`
: _int64_
<br/>Délai (en secondes) accordé à un host pour démarrer et aux applications pour démarrer complètement avant de commencer l'évaluation des résultats du Monitor. Doit être un entier non négatif.

`noDataTimeframe`
: _int64_
<br/>Nombre de minutes avant qu'un Monitor n'envoie une notification après l'arrêt du signalement des données. Datadog recommande au moins 2 fois la période du Monitor pour les alertes de métrique ou 2 minutes pour les checks de service. En cas d'omission, 2 fois la période d'évaluation est utilisée pour les alertes de métrique et 24 heures sont utilisées pour les checks de service.

`notificationPresetName`
: _énumération_
<br/>Active/désactive l'affichage du contenu supplémentaire envoyé dans la notification du Monitor.
<br/>Valeurs d'énumération autorisées : `show_all`, `hide_query`, `hide_handles`, `hide_all`
<br/>Par défaut : `show_all`

`notifyAudit`
: _booléen
<br/>Valeur booléenne indiquant si les utilisateurs tagués sont informés des modifications apportées à ce Monitor.

`notifyBy`
: _[chaîne]_
<br/>Chaîne indiquant la granularité sur laquelle un Monitor envoie des alertes. Disponible uniquement pour les Monitors avec groupements. Par exemple, si vous avez un Monitor groupé par cluster, espace de nommage et pod, et que vous définissez `notifyBy` sur `["cluster"]`, votre Monitor n'envoie des notifications que pour chaque nouveau cluster enfreignant les conditions d'alerte.
<br/>Les tags mentionnés dans `notifyBy` doivent être un sous-ensemble des tags de groupement de la requête. Par exemple, une requête groupée par cluster et espace de nommage ne peut pas notifier par région.
<br/>La définition de `notifyBy` sur `[*]` configure le Monitor pour qu'il notifie sous forme d'alerte simple.

`notifyNoData`
: booléen
<br/>Valeur booléenne indiquant si ce Monitor envoie une notification lorsque les données cessent d'être signalées.
<br/>Par défaut : `false`.

`onMissingData`
: _énumération_
<br/>Contrôle la façon dont les groupes ou Monitors sont traités si une évaluation ne renvoie aucun point de données. L'option par défaut entraîne un comportement différent selon le type de requête du Monitor. Pour les Monitors utilisant des requêtes de type Count, une évaluation de Monitor vide est traitée comme 0 et est comparée aux conditions de seuil. Pour les Monitors utilisant un type de requête autre que Count, par exemple Gauge, Measure ou Rate, le Monitor affiche le dernier statut connu. Cette option est disponible uniquement pour les Monitors APM Trace Analytics, Audit Trail, CI, Error Tracking, Event, Logs et RUM.
<br/>Valeurs d'énumération autorisées : `default`, `show_no_data`, `show_and_notify_no_data`, `resolve`

`renotifyInterval`
: _int64_
<br/>Nombre de minutes après la dernière notification avant qu'un Monitor n'envoie une nouvelle notification sur le statut actuel. Il ne notifie à nouveau que s'il n'est pas résolu.

`renotifyOccurrences`
: _int64_
<br/>Nombre de fois que les messages de nouvelle notification doivent être envoyés sur le statut actuel à l'intervalle de nouvelle notification fourni.

`renotifyStatuses`
: _[chaîne]_
<br/>Types de statuts de Monitor pour lesquels des messages de nouvelle notification sont envoyés.
<br/>Si `renotifyInterval` est null, la valeur par défaut est null.
<br/>Si `renotifyInterval` n'est pas null, la valeur par défaut est `["Alert", "No Data"]`
<br/>Valeurs pour le statut du Monitor : `Alert`, `No Data`, `Warn`

`requireFullWindow`
: booléen
<br/>Valeur booléenne indiquant si ce Monitor nécessite une fenêtre complète de données avant d'être évalué. Datadog recommande vivement de définir cette valeur sur `false` pour les métriques éparses, sinon certaines évaluations sont ignorées.
<br/>Par défaut : `false`.

`schedulingOptions`
: _objet_
<br/>Options de configuration pour la planification :

  `customSchedule`
  : _object_
 <br/>Options de configuration pour le site personnalisé schedule (programmer):

    `recurrence`
    : _[objet]_
    <br/>Tableau de récurrences de planification personnalisée.

      `rrule`
      : _chaîne_
      <br/>Règle de récurrence au format iCalendar. Par exemple, `FREQ=MONTHLY;BYMONTHDAY=28,29,30,31;BYSETPOS=-1`.

      `start`
      : _chaîne_
      <br/>Date de début de la règle de récurrence définie au format `YYYY-MM-DDThh:mm:ss`. En cas d'omission, l'heure de création du Monitor est utilisée.

      `timezone`
      : _chaîne_
      <br/>Fuseau horaire au format `tz database`, dans lequel la règle de récurrence est définie. Par exemple, `America/New_York` ou `UTC`.

  `evaluationWindow`
  : _objet_
  <br/>Options de configuration pour la fenêtre d'évaluation. Si `hour_starts` est défini, aucun autre champ ne peut être défini. Sinon, `day_starts` et `month_starts` doivent être définis ensemble.

    `dayStarts`
    : _chaîne_
    <br/>Heure de la journée à laquelle commence une fenêtre d'évaluation cumulative d'un jour. Doit être définie en heure UTC au format `HH:mm`.

    `hourStarts`
    : _entier_
    <br/>Minute de l'heure à laquelle commence une fenêtre d'évaluation cumulative d'une heure.

    `monthStarts`
    : _entier_
    <br/>Jour du mois auquel commence une fenêtre d'évaluation cumulative d'un mois.

`thresholdWindows`
: _objet_
<br/>Options de fenêtre temporelle d'alerte :

  `recoveryWindow`
  : _chaîne_
  <br/>Décrit la durée pendant laquelle une métrique anormale doit être normale avant que l'alerte ne se rétablisse.

  `triggerWindow`
  : _chaîne_
  <br/>Décrit la durée pendant laquelle une métrique doit être anormale avant qu'une alerte ne se déclenche.

`thresholds`
: _objet_
<br/>Liste des différents seuils de Monitor disponibles :

  `critical`
  : _chaîne_
  <br/>Seuil CRITICAL du Monitor.

  `criticalRecovery`
  : _chaîne_
  <br/>Seuil de rétablissement CRITICAL du Monitor.

  `ok`
  : _chaîne_
  <br/>Seuil OK du Monitor.

  `unknown`
  : _chaîne_
  <br/>Seuil UNKNOWN du Monitor.

  `warning`
  : _chaîne_
  <br/>Seuil WARNING du Monitor.

  `warningRecovery`
  : _chaîne_
  <br/>Seuil de rétablissement WARNING du Monitor.

`timeoutH`
: _int64_
<br/>Nombre d'heures pendant lesquelles le Monitor ne signale pas de données avant qu'il ne se résolve automatiquement à partir d'un état déclenché.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /fr/containers/kubernetes/installation?tab=datadogoperator#installation
[4]: /fr/monitors/types/metric/?tab=threshold
[5]: /fr/api/latest/monitors/#create-a-monitor
[6]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-crashloopbackoff.yaml
[7]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-deployment-replicas.yaml
[8]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-imagepullbackoff.yaml
[9]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-nodes-unavailable.yaml
[10]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-failed-state.yaml
[11]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-pods-restarting.yaml
[12]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/metric-monitor-statefulset-replicas.yaml
[13]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/audit-alert-monitor-test.yaml
[14]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-alert-monitor-test.yaml
[15]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/event-v2-alert-monitor-test.yaml
[16]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/log-alert-monitor-test.yaml
[17]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/process-alert-monitor-test.yaml
[18]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/rum-alert-monitor-test.yaml
[19]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/service-check-monitor-test.yaml
[20]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/slo-alert-monitor-test.yaml
[21]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogmonitor/trace-analytics-alert-monitor-test.yaml
[22]: /fr/api/latest/roles/#list-roles