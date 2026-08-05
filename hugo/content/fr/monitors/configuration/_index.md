---
aliases:
- /fr/monitors/create/configuration
description: Description de la page de création des monitors
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Notifications de monitor
- link: /monitors/manage/
  tag: Documentation
  text: Gérer les monitors
- link: /monitors/status/
  tag: Documentation
  text: Status
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: Blog
  text: Gérez vos monitors plus efficacement avec la solution Teams de Datadog
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: Centre d'apprentissage
  text: Personnaliser les notifications du moniteur d’alerte
title: Configurer des monitors
---
## Aperçu {#overview}

Pour commencer à configurer le monitor, complétez les sections suivantes :

* **Définissez la requête de recherche :** Construisez une requête pour compter les événements, mesurer les métriques, regrouper par une ou plusieurs dimensions, et plus encore.
* **Définissez les conditions d’alerte :** Définissez les seuils d’alerte et d’avertissement, les périodes d’évaluation, et configurez des options d’alerte avancées.
* **Configurez les notifications et les automatisations :** Rédigez un titre et un message de notification personnalisés avec des variables. Choisissez comment les notifications sont envoyées à vos équipes (email, Slack ou PagerDuty). Incluez des automatisations de flux de travail ou des cas dans la notification d'alerte.
* **Définissez les autorisations et les notifications d’audit :** Configurez des contrôles d’accès granulaires et désignez des rôles et des utilisateurs spécifiques qui peuvent modifier un moniteur. Activez les notifications d'audit pour alerter en cas de modification d'un moniteur.

## Définissez la requête de recherche {#define-the-search-query}

Pour apprendre à construire la requête de recherche, consultez les pages individuelles des [types de moniteurs][1].

## Aperçu des graphiques {#preview-graphs}

Au fur et à mesure que vous construisez ou modifiez votre requête, le graphique d'aperçu en haut de la configuration se met à jour dynamiquement pour refléter les résultats en temps réel.

{{< tabs >}}
{{% tab "Données évaluées" %}}

{{< img src="/monitors/configuration/evaluated_data_preview_high_error_rate.png" alt="Graphique d'aperçu des données évaluées" style="width:100%;" >}}

Le graphique des données évaluées montre comment votre moniteur aurait évalué les données en utilisant votre requête et vos seuils actuels. Avec l'aperçu d'évaluation, vous pouvez
- Visualisez les transitions d'état historiques (par exemple, `OK` → `ALERT`).
- Comprenez comment votre moniteur se serait comporté.
- Visualisez qui serait notifié (y compris selon les règles de notification)
- Repérez rapidement les erreurs de configuration avant de sauvegarder.

Cette fonctionnalité est prise en charge pour les métriques, les journaux, l'APM, le RUM, les événements, l'audit, l'observabilité de la base de données et les moniteurs de déploiement.

{{% /tab %}}

{{% tab "Données sources" %}}

{{< img src="/monitors/configuration/source_data_graph_high_error_rate.png" alt="Aperçu des données sources" style="width:100%;" >}}

Le graphique des données sources affiche les séries temporelles brutes ou les résultats de requête pour votre moniteur, sans évaluation de seuil ni logique d'alerte appliquée. Cela vous permet de :

- Visualisez les données sous-jacentes que votre moniteur évalue.
- Corrélez les changements d'état d'alerte avec les tendances réelles des données.
- Identifiez les anomalies, les lacunes ou les modèles inattendus dans vos données avant de configurer les conditions d'alerte.

Utilisez le graphique des données sources pour vous assurer que votre requête renvoie les résultats attendus et pour affiner vos seuils d'alerte et vos fenêtres d'évaluation.

{{% /tab %}}
{{< /tabs >}}

## Définissez les conditions d'alerte {#set-alert-conditions}

Les conditions d'alerte varient en fonction du [type de moniteur][1]. Configurez les moniteurs pour déclencher une alerte si la valeur de la requête dépasse un seuil, ou si un certain nombre de vérifications consécutives échouent.

{{< tabs >}}
{{% tab "Alerte de seuil" %}}

* Déclencher lorsque le `average`, `max`, `min` ou `sum` de la métrique est
* `above`, `above or equal to`, `below` ou `below or equal to` le seuil
* au cours des `5 minutes`, `15 minutes`, `1 hour` ou `custom` derniers pour définir une valeur entre 1 minute et 48 heures (1 mois pour les moniteurs de métriques)

### Méthode d'agrégation {#aggregation-method}

La requête renvoie une série de points, mais une seule valeur est nécessaire pour la comparer au seuil. Le moniteur doit réduire les données dans la fenêtre d'évaluation à une seule valeur.

| Option                  | Description                                            |
|-------------------------|--------------------------------------------------------|
| moyenne         | La série est moyennée pour produire une valeur unique qui est vérifiée par rapport au seuil. Elle ajoute la `avg()` fonction à votre requête de moniteur. |
| max | Si une seule valeur dans la série générée dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la `max()` fonction à votre requête de moniteur.* |
| min  | Si tous les points dans la fenêtre d'évaluation de votre requête dépassent le seuil, alors une alerte est déclenchée. Elle ajoute la `min()` fonction à votre requête de moniteur.* |
| somme | Si la somme de chaque point dans la série dépasse le seuil, alors une alerte est déclenchée. Elle ajoute la `sum()` fonction à votre requête de surveillance. |

\* Ces descriptions de max et min supposent que le moniteur alerte lorsque la métrique est _au-dessus_ du seuil. Pour les moniteurs qui alertent lorsque _en dessous_ du seuil, le comportement de max et min est inversé. Pour plus d'exemples, consultez le guide [Agrégateurs de moniteurs][1].

**Remarque** : Il existe différents comportements lors de l'utilisation de `as_count()`. Voir [as_count() dans les évaluations de moniteur][2] pour plus de détails.

### Fenêtre d'évaluation {#evaluation-window}

Un moniteur peut être évalué en utilisant des fenêtres de temps cumulatives ou des fenêtres de temps glissantes. Les fenêtres de temps cumulatives sont mieux adaptées aux questions qui nécessitent un contexte historique, comme "Quelle est la somme de toutes les données disponibles jusqu'à ce point dans le temps ?" Les fenêtres de temps glissantes sont mieux adaptées pour répondre à des questions qui ne nécessitent pas ce contexte, comme "Quelle est la moyenne des _N_ derniers points de données ?"

Le schéma ci-dessous illustre la différence entre les périodes cumulées et les périodes mobiles.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Deux graphiques montrant les fenêtres de temps cumulatives par rapport aux fenêtres de temps glissantes. Les fenêtres de temps cumulatives continuent de s'étendre au fur et à mesure que le temps passe. Les fenêtres de temps glissantes couvrent des moments particuliers dans le temps." style="width:100%;">}}

#### Fenêtres temporelles glissantes {#rolling-time-windows}

Une fenêtre temporelle glissante a une taille fixe et déplace son point de départ dans le temps. Les moniteurs peuvent consulter les `5 minutes`, `15 minutes`, `1 hour` derniers, ou utiliser une fenêtre temporelle personnalisée allant jusqu'à 1 mois.

**Remarque** : [Log monitors][6] ont une fenêtre temporelle glissante maximale de `2 days`.

#### Fenêtres de temps cumulatives {#cumulative-time-windows}
Une fenêtre temporelle cumulative a un point de départ fixe et s'étend dans le temps. Les moniteurs prennent en charge trois fenêtres temporelles cumulatives différentes :

- `Current hour` : Une fenêtre temporelle avec un maximum d'une heure commençant à une minute configurable d'une heure. Par exemple, surveillez le nombre d'appels qu'un point de terminaison HTTP reçoit en une heure à partir de la minute 0.
- `Current day` : Une fenêtre temporelle avec un maximum de 24 heures commençant à une heure et une minute configurables d'une journée. Par exemple, surveiller un [quota d'index de journal quotidien][3] en utilisant la fenêtre temporelle `current day` et en la laissant commencer à 14h00 UTC.
- `Current month` : Regarde en arrière sur le mois en cours, en commençant à un jour configurable du mois à une heure et une minute configurables. Cette option représente une fenêtre temporelle du mois en cours et n'est disponible que pour les moniteurs de métriques.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Capture d'écran de la façon dont une fenêtre cumulative est configurée dans l'interface de Datadog. L'utilisateur a recherché aws.sqs.number_of_messages_received. Les options sont définies pour évaluer la SOMME de la requête sur le MOIS EN COURS." style="width:100%;">}}

Une fenêtre temporelle cumulative est réinitialisée après que sa durée maximale est atteinte. Par exemple, une fenêtre temporelle cumulative regardant le `current month` se réinitialise le premier de chaque mois à minuit UTC. Alternativement, une fenêtre temporelle cumulative de `current hour`, qui commence à la minute 30, se réinitialise chaque heure. Par exemple, à 6h30, 7h30, 8h30.

### Fréquence d'évaluation {#evaluation-frequency}

La fréquence d'évaluation définit à quelle fréquence Datadog exécute la requête de moniteur. Pour la plupart des configurations, la fréquence d'évaluation est de `1 minute`, ce qui signifie qu'une fois par minute, le moniteur interroge les [données sélectionnées](#define-the-search-query) sur la [fenêtre d'évaluation sélectionnée](#evaluation-window) et compare la valeur agrégée aux [seuils définis](#thresholds).

Par défaut, les fréquences d'évaluation dépendent de la [fenêtre d'évaluation](#evaluation-window) utilisée. Une fenêtre plus longue entraîne des fréquences d'évaluation plus faibles. Le tableau suivant illustre comment la fréquence d'évaluation est contrôlée par des fenêtres temporelles plus larges :

| Plages de fenêtres d'évaluation        | Fréquence d'évaluation  |
|---------------------------------|-----------------------|
| fenêtre < 24 heures               | 1 minute              |
| 24 heures <= fenêtre < 48 heures   | 10 minutes            |
| fenêtre >= 48 heures              | 30 minutes            |

La fréquence d'évaluation peut également être configurée de sorte que la condition d'alerte du moniteur soit vérifiée quotidiennement, hebdomadairement ou mensuellement. Dans cette configuration, la fréquence d'évaluation n'est plus dépendante de la fenêtre d'évaluation, mais du calendrier configuré.

Pour plus d'informations, consultez le guide sur la manière de [personnaliser la fréquence d'évaluation des monitors][4].

### Seuils {#thresholds}

Utilisez des seuils pour définir une valeur numérique pour déclencher une alerte. En fonction de votre métrique choisie, l'éditeur affiche l'unité utilisée (`byte`, `kibibyte`, `gibibyte`, etc.).

Datadog dispose de deux types de notifications (alerte et avertissement). Les moniteurs se rétablissent automatiquement en fonction du seuil d'alerte ou d'avertissement, mais des conditions supplémentaires peuvent être spécifiées. Pour des informations supplémentaires sur les seuils de récupération, voir [Quels sont les seuils de récupération ?][5]. Par exemple, si un moniteur alerte lorsque la métrique est supérieure à `3` et que les seuils de récupération ne sont pas spécifiés, le moniteur se rétablit une fois que la valeur de la métrique redescend en dessous de `3`.

| Option                                   | Description                    |
|------------------------------------------|--------------------------------|
| Seuil d'alerte&nbsp;**(obligatoire)** | La valeur utilisée pour déclencher une notification d'alerte. |
| Seuil d'avertissement&nbsp;| La valeur utilisée pour déclencher une notification d'avertissement. |
| Seuil de récupération d'alerte&nbsp;| Un seuil optionnel pour indiquer une condition supplémentaire pour la récupération d'alerte. |
| Seuil de récupération d'avertissement&nbsp;| Un seuil optionnel pour indiquer une condition supplémentaire pour la récupération d'avertissement. |

Lorsque vous modifiez un seuil, l'aperçu du graphique dans l'éditeur affiche un marqueur qui indique le point limite.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Graphique d'aperçu des seuils" style="width:100%;">}}

**Remarque** : Lors de la saisie de valeurs décimales pour les seuils, si votre valeur est `<1`, ajoutez un `0` devant le nombre. Par exemple, utilisez `0.5`, pas `.5`.


[1]: /fr/monitors/guide/monitor_aggregators/
[2]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/fr/logs/log_configuration/indexes/#set-daily-quota
[4]: /fr/monitors/guide/custom_schedules
[5]: /fr/monitors/guide/recovery-thresholds/
[6]: /fr/monitors/types/log/
{{% /tab %}}
{{% tab "Vérifier l'alerte" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils. Configurer l'alerte de vérification pour :

1. Déclenchez l'alerte après un nombre déterminé d'échecs consécutifs : `<NUMBER>`

    Chaque exécution de vérification soumet un statut unique de `OK`, `WARN` ou `CRITICAL`. Choisissez combien d'exécutions consécutives avec le statut `WARN` et `CRITICAL` déclenchent une notification. Par exemple, votre processus peut connaître une brève interruption lorsque la connexion échoue. Si vous définissez cette valeur à `> 1`, cette brève interruption est ignorée, mais un problème avec plus d'un échec consécutif déclenche une notification.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Vérifier les seuils Alert/Warn" style="width:90%;">}}

2. Résolvez l'alerte après un nombre défini de succès consécutifs : `<NUMBER>`

    Choisissez combien d'exécutions consécutives avec le statut `OK` résolvent l'alerte.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Vérifier les seuils de récupération" style="width:90%;">}}

Consultez la documentation sur les monitors de [check de processus][1], [check d'intégration][2] et [check custom][3] pour en savoir plus sur la configuration des alertes des checks.



[1]: /fr/monitors/types/process_check/
[2]: /fr/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /fr/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées {#advanced-alert-conditions}

#### Pas de données {#no-data}

Les notifications pour les données manquantes sont utiles si vous vous attendez à ce qu'une métrique rapporte toujours des données dans des circonstances normales. Par exemple, si un hôte avec l'Agent doit être opérationnel en continu, vous pouvez vous attendre à ce que la métrique `system.cpu.idle` rapporte toujours des données.

Dans ce cas, vous devez activer les notifications pour les données manquantes. Les sections ci-dessous expliquent comment y parvenir avec chaque option.

**Note** : Le moniteur doit être capable d'évaluer les données avant d'alerter sur les données manquantes. Par exemple, si vous créez un moniteur pour `service:abc` et que les données de ce `service` ne sont pas rapportées, le moniteur n'envoie pas d'alertes.

Si des données sont manquantes pendant `N` minutes, sélectionnez une option dans le menu déroulant :

{{< img src="/monitors/create/on_missing_data.png" alt="Options sans données" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

Le comportement sélectionné est appliqué lorsque la requête d'un moniteur ne renvoie aucune donnée. Contrairement à l'option `Do not notify`, la fenêtre de données manquantes n'est **pas** configurable.

| Option                    | État du moniteur et notification                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | Le résultat vide est remplacé par zéro et est comparé aux seuils d'alerte/avertissement. Par exemple, si le seuil d'alerte est fixé à `> 10`, un zéro ne déclencherait pas cette condition, et le statut du moniteur est fixé à `OK`.   |
| `Show last known status`  | Le dernier statut connu du groupe ou du moniteur est défini.                        |
| `Show NO DATA`            | Le statut du moniteur est fixé à `NO DATA`.                                       |
| `Show NO DATA and notify` | Le statut du moniteur est fixé à `NO DATA` et une notification est envoyée.        |
| `Show OK`                 | Le moniteur est résolu et le statut est fixé à `OK`.                            |

Les options `Evaluate as zero` et `Show last known status` sont affichées en fonction du type de requête :

- **Évaluer à zéro :** Cette option est disponible pour les moniteurs utilisant des requêtes `Count` sans la fonction `default_zero()`.
- **Afficher le dernier statut connu :** Cette option est disponible pour les moniteurs utilisant tout autre type de requête que `Count`, par exemple `Gauge`, `Rate` et `Distribution`, ainsi que pour les requêtes `Count` avec `default_zero()`.

#### Résolution automatique {#auto-resolve}

`[Never]`, `After 1 hour`, `After 2 hours` et ainsi de suite. Résolvez automatiquement cet événement à partir d'un état déclenché.

La résolution automatique fonctionne lorsque les données ne sont plus soumises. Les moniteurs ne se résolvent pas automatiquement lorsqu'ils sont en état ALERT ou WARN si des données continuent d'être rapportées. Si des données sont encore soumises, la fonction [renotify][2] peut être utilisée pour informer votre équipe lorsqu'un problème n'est pas résolu.

Pour certaines métriques qui rapportent périodiquement, il peut être judicieux que les alertes déclenchées se résolvent après une certaine période de temps. Par exemple, si vous avez un compteur qui ne signale que lorsqu'une erreur est enregistrée, l'alerte ne se résout jamais car la métrique ne signale jamais `0` comme le nombre d'erreurs. Dans ce cas, définissez votre alerte pour se résoudre après un certain temps d'inactivité sur la métrique. **Remarque** : Si un moniteur se résout automatiquement et que la valeur de la requête ne respecte pas le seuil de récupération lors de la prochaine évaluation, le moniteur déclenche à nouveau une alerte.

Dans la plupart des cas, ce paramètre n'est pas utile car vous souhaitez uniquement qu'une alerte se résolve après qu'elle soit réellement corrigée. Donc, en général, il est logique de laisser cela comme `[Never]` afin que les alertes ne se résolvent que lorsque la métrique est au-dessus ou en dessous du seuil défini.

#### Temps de rétention du groupe {#group-retention-time}

Vous pouvez supprimer le groupe de l'état du moniteur après `N` heures de données manquantes. La durée peut être d'un minimum de 1 heure et d'un maximum de 72 heures. Pour les moniteurs multi-alertes, sélectionnez **Supprimer le groupe non rapporté après `N (length of time)`**.

{{< img src="/monitors/create/group_retention_time.png" alt="Option de temps de rétention du groupe" style="width:70%;">}}

Semblable à l'[option de résolution automatique][3], la rétention de groupe fonctionne lorsque les données ne sont plus soumises. Cette option contrôle la durée pendant laquelle le groupe est conservé dans l'état du moniteur une fois que les données cessent d'être rapportées. Par défaut, un groupe conserve l'état pendant 24 heures avant d'être supprimé. Le moment de début de la rétention du groupe et l'option de résolution automatique sont **identiques** dès que la requête du moniteur ne renvoie plus de données.

Les durées de rétention peuvent par exemple s'avérer utiles dans les cas suivants :

- Lorsque vous souhaitez supprimer le groupe immédiatement ou peu après que les données cessent d'être rapportées
- Lorsque vous souhaitez conserver le groupe dans l'état aussi longtemps que vous le faites habituellement pour le dépannage

**Remarque** : L'option de temps de rétention du groupe nécessite un moniteur multi-alertes qui prend en charge l'option [`On missing data`][4]. Ces types de moniteurs sont APM Trace Analytics, Audit Logs, CI Pipelines, Error Tracking, Events, Logs et moniteurs RUM.

#### Délai de nouveau groupe {#new-group-delay}

Retarder le début de l'évaluation de `N` secondes pour les nouveaux groupes.

Le temps (en secondes) à attendre avant de commencer l'alerte, pour permettre aux groupes nouvellement créés de démarrer et aux applications de démarrer complètement. Cela doit être un entier non négatif.

Par exemple, si vous utilisez une architecture conteneurisée, définir un délai de groupe empêche les groupes de moniteurs ciblés sur les conteneurs de se déclencher en raison d'une utilisation élevée des ressources ou d'une latence élevée lors de la création d'un nouveau conteneur. Le délai est appliqué à chaque nouveau groupe (qui n'a pas été vu au cours des dernières 24 heures) et par défaut à `60` secondes.

Cette option est disponible pour les monitors à alertes multiples.

#### Délai d'évaluation {#evaluation-delay}

<div class="alert alert-info"> Datadog recommande un délai de 15 minutes pour les métriques cloud, qui sont remplies par les fournisseurs de services. De plus, lors de l'utilisation d'une formule de division, un délai de 60 secondes est utile pour s'assurer que votre moniteur évalue sur des valeurs complètes. Voir la <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/
">Cloud Metric Delay</a> pour les temps de délai estimés.</div>

Retarder l'évaluation de `N` secondes.

Le temps (en secondes) pour retarder l'évaluation. Cela doit être un entier non négatif. Ainsi, si le délai est fixé à 900 secondes (15 minutes), l'évaluation du moniteur se fait pendant les `5 minutes` dernières minutes, et l'heure est 7h00, le moniteur évalue les données de 6h40 à 6h45. Le délai d'évaluation configurable maximum est de 86400 secondes (24 heures).

## Configurer les notifications et les automatisations {#configure-notifications-and-automations}

Configurez vos messages de notification de façon à inclure les informations qui vous intéressent le plus. Indiquez les équipes auxquelles ces alertes doivent être envoyées, ainsi que les attributs pour lesquels les alertes doivent se déclencher.

### Message {#message}

Utilisez cette section pour configurer les notifications envoyées à votre équipe et la façon dont elles sont envoyées :

  - [Configurez votre notification avec des variables de modèle][5]
  - [Envoyez des notifications à votre équipe par email, Slack ou PagerDuty][6]

Pour en savoir plus sur les options de configuration du message de notification, consultez la section [Notifications d'alerte][7].

### Ajouter des métadonnées {#add-metadata}

<div class="alert alert-info">Les tags de moniteur sont indépendants des tags envoyés par l'Agent ou les intégrations. Voir la documentation <a href="/monitors/manage/">Gérer les Moniteurs</a>.</div>

1. Utilisez le menu déroulant **Tags** pour associer [tags][8] à votre moniteur.
1. Utilisez le menu déroulant **Teams** pour associer [teams][9] à votre moniteur.
1. Choisissez une **Priorité**.

### Définissez l'agrégation des alertes {#set-alert-aggregation}

Les alertes sont regroupées automatiquement en fonction de l'agrégation sélectionnée pour votre requête (par exemple, `avg by service`). Si la requête n'a pas de regroupement, elle utilise `Simple Alert` par défaut. Si la requête est regroupée par une dimension quelconque, le regroupement change en `Multi Alert`.

{{< img src="/monitors/create/notification-aggregation.png" alt="Options de configuration pour l'agrégation des notifications du moniteur" style="width:100%;">}}

#### Alerte simple {#simple-alert}

`Simple Alert` le mode déclenche une notification en agrégeant toutes les sources de rapport. Vous recevez **une alerte** lorsque la valeur agrégée répond aux conditions définies. Par exemple, vous pourriez configurer un moniteur pour vous notifier si l'utilisation moyenne du CPU de tous les serveurs dépasse un certain seuil. Si ce seuil est atteint, vous recevrez une seule notification, quel que soit le nombre de serveurs individuels ayant atteint le seuil. Cela peut être utile pour surveiller les tendances ou comportements globaux du système.


{{< img src="/monitors/create/simple-alert.png" alt="Diagramme montrant comment les notifications de surveillance sont envoyées en mode d'alerte simple." style="width:90%;">}}

#### Alerte multiple {#multi-alert}

Un `Multi Alert` moniteur déclenche des notifications individuelles pour chaque entité du moniteur qui atteint le seuil d'alerte.

{{< img src="/monitors/create/multi-alert.png" alt="Diagramme montrant comment les notifications du moniteur sont envoyées en mode d'alerte multiple." style="width:90%;">}}

Par exemple, lorsque vous configurez un moniteur pour vous notifier si la latence P99, agrégée par service, dépasse un certain seuil, vous recevrez une **distincte** alerte pour chaque service individuel dont la latence P99 a dépassé le seuil d'alerte. Cela peut être utile pour identifier et résoudre des instances spécifiques de problèmes système ou d'application. Cela vous permet de suivre les problèmes à un niveau plus granulaire.

##### Regroupement de notifications {#notification-grouping}

Lors de la surveillance d'un grand groupe d'entités, les alertes multiples peuvent entraîner des moniteurs bruyants. Pour atténuer cela, personnalisez les dimensions qui déclenchent des alertes. Cela réduit le bruit et vous permet de vous concentrer sur les alertes qui comptent le plus. Par exemple, vous surveillez l'utilisation moyenne du CPU de tous vos hôtes. Si vous regroupez votre requête par `service` et `host` mais que vous souhaitez que les alertes soient envoyées une seule fois pour chaque attribut `service` atteignant le seuil, retirez l'attribut `host` de vos options d'alerte multiple et réduisez le nombre de notifications envoyées.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagramme de la façon dont les notifications sont envoyées lorsqu'elles sont définies sur des dimensions spécifiques dans les alertes multiples." style="width:90%;">}}

Lors de l'agrégation des notifications en mode `Multi Alert`, les dimensions qui ne sont pas agrégées deviennent `Sub Groups` dans l'interface utilisateur.

**Remarque** : Si votre métrique ne rapporte que par `host` sans `service` tag, elle n'est pas détectée par le moniteur. Les métriques avec à la fois `host` et `service` tags sont détectées par le moniteur.

Si vous configurez des tags ou des dimensions dans votre requête, ces valeurs sont disponibles pour chaque groupe évalué dans l'alerte multiple afin de remplir dynamiquement les notifications avec un contexte utile. Voir [Attributs et tag variables][10] pour apprendre à référencer les valeurs de tag dans le message de notification.

| Grouper par                       | Mode d'alerte simple | Mode d'alerte multiple |
|-------------------------------------|------------------------|-----------------------|
| _(tout)_                      | Un seul groupe déclenchant une notification | N/A |
| 1&nbsp;ou&nbsp;plus&nbsp;de&nbsp;dimensions | Une notification si un ou plusieurs groupes remplissent les conditions d'alerte | Une notification par groupe remplissant les conditions d'alerte |

## Permissions {#permissions}

Tous les utilisateurs peuvent voir tous les moniteurs, quels que soient l’équipe ou le rôle auxquels ils sont associés. Par défaut, seuls les utilisateurs attachés à des rôles avec la [permission d'écriture sur les moniteurs][11] peuvent modifier les moniteurs. [Rôle Administrateur Datadog et Rôle Standard Datadog][12] ont la permission d'écriture sur les moniteurs par défaut. Si votre organisation utilise [Rôles personnalisés][13], d'autres rôles personnalisés peuvent avoir la permission d'écriture sur les moniteurs. Pour plus d'informations sur la configuration de RBAC pour les moniteurs et la migration des moniteurs de la configuration verrouillée vers l'utilisation de restrictions de rôle, consultez le guide sur [Comment configurer RBAC pour les moniteurs][14].

Vous pouvez restreindre davantage votre moniteur en spécifiant une liste de [teams][17], [rôles][15] ou d'utilisateurs autorisés à le modifier. Le créateur du moniteur a par défaut des droits d'édition sur le moniteur. Il est notamment possible de modifier la configuration du monitor, de supprimer le monitor et de désactiver ses notifications pendant la durée souhaitée.

**Remarque** : Les limitations s'appliquent à la fois dans l'interface utilisateur et l'API.

### Contrôles d'accès granulaires {#granular-access-controls}

Utilisez les [contrôles d'accès granulaires][16] pour limiter les équipes, rôles ou utilisateurs autorisés à modifier un monitor :
1. Lors de l'édition ou de la configuration d'un moniteur, repérez la section **Définir les permissions et les notifications d'audit**.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Options de configuration du moniteur pour définir les permissions" style="width:70%;" >}}
1. Cliquez sur **Modifier l'accès**.
1. Cliquez sur **Restreindre l'accès**.
1. La boîte de dialogue se met à jour pour montrer que les membres de votre organisation ont par défaut un accès **Visiteur**.
1. Utilisez le menu déroulant pour sélectionner une ou plusieurs [teams], [roles] ou utilisateurs pouvant modifier le moniteur.
1. Cliquez sur **Ajouter**.
1. La boîte de dialogue se met à jour pour montrer que le rôle que vous avez sélectionné a la permission **Éditeur**.
1. Cliquez sur **Terminé**.

**Remarque :** Pour maintenir votre accès en tant qu'éditeur au moniteur, le système exige que vous incluiez au moins un rôle ou une équipe dont vous êtes membre avant de sauvegarder.

Pour rétablir les autorisations globales d'un monitor restreint, procédez comme suit :
1. Lors de la visualisation d'un moniteur, cliquez sur le menu déroulant **Plus**.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restaurer l'accès complet**.
1. Cliquez sur **Enregistrer**.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types
[2]: /fr/monitors/notify/#renotify
[3]: /fr/monitors/configuration/?tab=thresholdalert#auto-resolve
[4]: /fr/monitors/configuration/?tabs=othermonitortypes#no-data
[5]: /fr/monitors/notify/variables/
[6]: /fr/monitors/notify/#configure-notifications-and-automations
[7]: /fr/monitors/notify/
[8]: /fr/getting_started/tagging/
[9]: /fr/account_management/teams/
[10]: /fr/monitors/notify/variables/?tab=is_alert#attribute-and-tag-variables
[11]: /fr/account_management/rbac/permissions/#monitors
[12]: /fr/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[13]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[14]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /fr/account_management/rbac/
[16]: /fr/account_management/rbac/granular_access
[17]: /fr/account_management/teams/