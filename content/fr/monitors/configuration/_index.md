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
  text: Statut des monitors
- link: https://www.datadoghq.com/blog/manage-monitors-with-datadog-teams/
  tag: Blog
  text: Gérez vos monitors plus efficacement avec la solution Teams de Datadog
title: Configurer des monitors
---

## Section Overview

Pour commencer à configurer le monitor, complétez les sections suivantes :

* **Define the search query :** créez une requête afin de compter le nombre d'événements, de mesurer des métriques, de regrouper une ou plusieurs dimensions, etc.
* **Set alert conditions :** configurez des seuils d'alerte et d'avertissement, des intervalles d'évaluation et des options d'alerte avancées.
* **Configure notifications and automations :** Rédigez un titre et un message personnalisés avec des variables. Choisissez comment les notifications sont envoyées à vos équipes (email, Slack ou PagerDuty). Incluez des automatisations de workflow ou des cas dans la notification d'alerte.
* **Define permissions and audit notifications :** Configurez des contrôles d'accès granulaires et désignez les rôles et utilisateurs autorisés à modifier un monitor. Activez les notifications d'audit pour être alerté en cas de modification d'un monitor.

## Définir la requête de recherche

Pour découvrir comment créer la requête de syntaxe, consultez les pages de documentation de chaque [type de monitor][1]. Le graphique d'aperçu situé au-dessus des champs de recherche s'actualise au fur et à mesure que vous modifiez la requête de recherche.

{{< img src="/monitors/create/preview_graph_monitor.mp4" alt="Graphique d'aperçu" video=true style="width:90%;">}}

## Définir vos conditions d'alerte

Les conditions d'alerte varient en fonction du [type de monitor][1]. Vous pouvez configurer vos monitors de façon à ce qu'ils se déclenchent lorsque la valeur de la requête dépasse un certain seuil, ou si un certain nombre de checks consécutifs ont échoué.

{{< tabs >}}
{{% tab "Alerte de seuil" %}}

* Envoyer une alerte lorsque la valeur `average`, `max`, `min` ou `sum` de la métrique est
* `above`, `above or equal to`, `below` ou `below or equal to` (supérieure, supérieure ou égale, inférieure ou inférieure ou égale) au seuil
* sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou encore lors d'une période `custom` comprise entre 1 minute et 48 heures (jusqu'à 1 mois pour les monitors de métrique).

### Méthode d'agrégation

La requête renvoie une série de points. Toutefois, le monitor ne doit comparer qu'une seule valeur au seuil. Les données transmises lors de la période d'évaluation doivent donc être converties en une valeur unique.

| Option                  | Rôle                                            |
|-------------------------|--------------------------------------------------------|
| average         | La moyenne de la série est calculée afin de générer une valeur unique, qui est ensuite comparée au seuil. Cette option ajoute la fonction `avg()` à la requête de votre monitor. |
| max | Si une valeur dans la série générée dépasse le seuil, une alerte se déclenche alors. Cette option ajoute la fonction `max()` à la requête de votre monitor.* |
| min  | Si chaque point compris dans l'intervalle d'évaluation de votre requête dépasse le seuil, une alerte se déclenche alors. Cette option ajoute la fonction `min()` à la requête de votre monitor.* |
| sum | Si la somme de tous les points de la série dépasse le seuil, une alerte se déclenche alors. Cette option ajoute la fonction `sum()` à la requête de votre monitor. |

\* Ces descriptions de max et min supposent que le monitor alerte lorsque la métrique dépasse le seuil. Pour les monitors qui alertent lorsque la métrique est inférieure au seuil, le comportement de max et min est inversé. Pour plus d'exemples, consultez le guide [Agrégateurs de monitor][1].

**Remarque** : trois comportements différents peuvent être appliqués lorsque vous utilisez `as_count()`. Consultez [as_count() dans les évaluations de monitors][2] pour en savoir plus.

### Fenêtre d'évaluation

Un monitor peut être évalué en fonction d'une période cumulée ou d'une période glissante. Les périodes cumulées sont idéales pour les questions qui nécessitent d'examiner des données historiques, telles que « Quelle est la somme de l'ensemble des données disponibles jusqu'à maintenant ? » Les périodes mobiles sont adaptées aux questions qui ne nécessitent pas de contexte, telles que « Quelle est la moyenne des _N_ derniers points de données ? »

Le schéma ci-dessous illustre la différence entre les périodes cumulées et les périodes mobiles.

{{< img src="/monitors/create/rolling_vs_expanding.png" alt="Deux graphiques comparant les périodes cumulées et les périodes mobiles. Les périodes cumulées continuent de s'étendre à mesure que le temps passe. Les périodes mobiles couvrent des instants spécifiques." style="width:100%;">}}

#### Périodes mobiles

Les périodes mobiles ont une durée fixe, mais leur point de départ se décale au fil du temps. Les monitors peuvent analyser les dernières `5 minutes`, `15 minutes`, `1 hour` ou un intervalle personnalisé allant jusqu'à 1 mois.

**Remarque** : les [monitors de logs][6] ont une période mobile maximale de `2 days`.

#### Périodes cumulées
Les périodes cumulées ont un point de départ fixe et s'étendent au fil du temps. Les monitors prennent en charge trois périodes cumulées différentes :

- `Current hour` : une période d'une heure maximum qui commence à la minute choisie. Par exemple, vous pouvez surveiller le nombre d'appels reçus par un endpoint HTTP sur une heure à partir de la minute 0.
- `Current day` : une période de 24 heures maximum qui commence à l'heure et la minute choisies. Par exemple, vous pouvez surveiller un [quota journalier d'indexation de logs][3] en utilisant l'intervalle `current day` et en le faisant commencer à 14 h UTC.
- `Current month` : analyse le mois en cours à partir d'un jour, d'une heure et d'une minute configurables. Cette option représente une fenêtre temporelle du mois en cours (month-to-date) et est uniquement disponible pour les monitors de métriques.

{{< img src="/monitors/create/cumulative_window_example_more_options.png" alt="Capture d'écran illustrant la configuration d'une période cumulée dans l'interface Datadog. L'utilisateur a recherché la métrique aws.sqs.number_of_messages_received. Les options définies permettent d'évaluer la somme de la requête sur le mois actuel." style="width:100%;">}}

Les fenêtres cumulées sont réinitialisées dès que l'intervalle maximum est atteint. Par exemple, si une période cumulée est définie sur `current month` (mois actuel), celle-ci se réinitialise automatiquement le premier de chaque mois à minuit UTC. De la même façon, une période cumulée définie sur `current hour` avec un point de départ à la minute 30 se réinitialise toutes les heures : à 6 h 30, à 7 h 30, à 8 h 30.

### Fréquence d'évaluation

La fréquence d'évaluation correspond à la fréquence à laquelle Datadog exécute la requête de monitor. Elle est généralement de `1 minute`, ce qui signifie que chaque minute, le monitor évalue les [données sélectionnées](#definir-la-requete-de-recherche) sur la [fenêtre d'évaluation sélectionnée](#fenetre-d-evaluation) et compare la valeur agrégée aux [seuils définis](#seuils).

Par défaut, la fréquence d'évaluation dépend de la [fenêtre d'évaluation](#fenetre-d-evaluation) utilisée. Une fenêtre plus longue entraîne une fréquence d'évaluation plus faible. Le tableau suivant illustre comment la fréquence d'évaluation est influencée par des périodes plus longues :

| Plages de fenêtres d'évaluation        | Fréquence d'évaluation  |
|---------------------------------|-----------------------|
| fenêtre < 24 heures               | 1 minute              |
| 24 heures <= fenêtre < 48 heures   | 10 minutes            |
| fenêtre >= 48 heures              | 30 minutes            |

La fréquence d'évaluation peut également être configurée pour que la condition d'alerte du monitor soit vérifiée quotidiennement, chaque semaine ou chaque mois. Dans cette configuration, la fréquence d'évaluation ne dépend plus de la fenêtre d'évaluation, mais du planning configuré.

Pour plus d'informations, consultez le guide sur la manière de [personnaliser la fréquence d'évaluation des monitors][4].

### Seuils

Utilisez les seuils pour définir la valeur numérique à partir de laquelle une alerte doit se déclencher. En fonction de la métrique choisie, l'éditeur affiche l'unité utilisée (`byte`, `kibibyte`, `gibibyte`, etc).

Datadog peut envoyer des notifications d'alerte et des notifications d'avertissement. Les monitors sont rétablis automatiquement en fonction du seuil d'alerte ou d'avertissement, mais des conditions supplémentaires peuvent être spécifiées. Pour en savoir plus sur les seuils de rétablissement, consultez la section [Qu'est-ce qu'un seuil de rétablissement ?][5] Par exemple, si un monitor envoie une alerte lorsqu'une métrique dépasse la valeur `3` et qu'aucun seuil de rétablissement n'est défini, le monitor se rétablit lorsque la valeur de la métrique redescend sous `3`.

| Option                                   | Rôle                    |
|------------------------------------------|--------------------------------|
| Seuil d'alerte **(obligatoire)** | La valeur utilisée pour déclencher une notification d'alerte. |
| Seuil d'avertissement                   | La valeur utilisée pour déclencher une notification d'avertissement. |
| Seuil de rétablissement de l'alerte       | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'alerte. |
| Seuil de rétablissement de l'avertissement     | Un seuil facultatif pour indiquer une condition supplémentaire de rétablissement d'avertissement. |

Lorsque vous modifiez un seuil, l'aperçu du graphique dans l'éditeur affiche un indicateur symbolisant la limite.

{{< img src="/monitors/create/preview_graph_thresholds.png" alt="Graphique d'aperçu des seuils" style="width:100%;">}}

**Remarque** : lorsque vous saisissez des valeurs décimales pour des seuils, si votre valeur est `<1`, ajoutez un `0` au début du nombre. Par exemple, utilisez `0.5` et non `,5`.


[1]: /fr/monitors/guide/monitor_aggregators/
[2]: /fr/monitors/guide/as-count-in-monitor-evaluations/
[3]: https://docs.datadoghq.com/fr/logs/log_configuration/indexes/#set-daily-quota
[4]: /fr/monitors/guide/custom_schedules
[5]: /fr/monitors/guide/recovery-thresholds/
[6]: /fr/monitors/types/log/
{{% /tab %}}
{{% tab "Alerte de check" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils. Configurez une alerte de check pour :

1. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique (`OK`, `WARN` ou `CRITICAL`). Choisissez le nombre de statuts `WARN` et `CRITICAL` consécutifs à partir duquel une notification doit être envoyée. Par exemple, il arrive que la connexion à un processus échoue pendant un bref instant seulement ; en définissant cette valeur sur `> 1`, les échecs ponctuels sont ignorés, tandis que les échecs prolongés déclenchent une notification.

    {{< img src="/monitors/create/check_thresholds_alert_warn.png" alt="Seuils d'alerte et d'avertissement d'un check" style="width:90%;">}}

2. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`

    Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue.

    {{< img src="/monitors/create/check_thresholds_recovery.png" alt="Seuils de rétablissement d'un check" style="width:90%;">}}

Consultez la documentation sur les monitors de [check de processus][1], [check d'intégration][2] et [check custom][3] pour en savoir plus sur la configuration des alertes des checks.



[1]: /fr/monitors/types/process_check/
[2]: /fr/monitors/types/integration/?tab=checkalert#integration-metric
[3]: /fr/monitors/types/custom_check/
{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées

#### No data

Les notifications d'absence de données sont particulièrement utiles si une métrique est supposée envoyer des données en permanence. Par exemple, si un host sur lequel l'Agent est installé doit être disponible en continu, la métrique `system.cpu.idle` doit toujours envoyer des données.

Dans ce cas, nous vous conseillons d'activer ces notifications. Les sections ci-dessous expliquent comment procéder pour chaque option.

**Remarque** : le monitor doit pouvoir évaluer les données avant d'envoyer une alerte d'absence de données. Par exemple, si vous créez un monitor pour `service:abc` et que `service` n'a jamais transmis de données, le monitor n'envoie aucune alerte.

En cas d'absence de données pendant `N` minutes, sélectionnez une option dans le menu déroulant :

{{< img src="/monitors/create/on_missing_data.png" alt="Options No Data" style="width:70%;">}}

- `Evaluate as zero` / `Show last known status`
- `Show NO DATA`
- `Show NO DATA and notify`
- `Show OK`.

Le comportement sélectionné est appliqué lorsque la requête d'un monitor ne renvoie aucune donnée. Contrairement à l'option `Do not notify`, la fenêtre d'absence de données n'est **pas** configurable.

| Option                    | Statut du monitor et notification                                             |
|---------------------------|---------------------------------------------------------------------------|
| `Evaluate as zero`        | Les résultats vides sont remplacés par zéro et comparés aux seuils d'alerte/d'avertissement. Par exemple, si le seuil d'alerte est défini sur `> 10`, un zéro ne déclenchera pas cette condition et le statut du monitor sera défini sur `OK`.   |
| `Show last known status`  | Le dernier statut connu du groupe ou monitor est défini.                        |
| `Show NO DATA`            | Le statut du monitor est défini sur `NO DATA`.                                       |
| `Show NO DATA and notify` | Le statut du monitor est défini sur `NO DATA` et une notification est envoyée.        |
| `Show OK`                 | Le monitor est résolu et le statut est défini sur `OK`.                            |

Les options `Evaluate as zero` et `Show last known status` s'affichent en fonction du type de requête :

- **Evaluate as zero :** cette option est disponible pour les monitors basés sur une requête `Count`, sans la fonction `default_zero()`.
- **Show last known status :** cette option est disponible pour les monitors basés sur un type de requête autre que `Count`, par exemple `Gauge`, `Rate` et `Distribution`, ainsi que pour les requêtes `Count` avec `default_zero()`.

#### Rétablissement automatique

Utilisez les options `[Never]`, `After 1 hour`, `After 2 hours`, etc. pour choisir si et au bout de combien de temps un monitor doit être automatiquement rétabli après s'être déclenché.

Le rétablissement automatique s'applique lorsqu'aucune nouvelle donnée n'est transmise. Il n'est pas utilisé pour rétablir les monitors qui passent d'un statut ALERT à un statut WARN alors que des données continuent à être transmises. Si des données sont toujours envoyées, vous pouvez informer votre équipe que le problème n'est pas résolu grâce à la fonctionnalité de [renvoi de notifications][2].

Lorsqu'une métrique n'envoie des données qu'à certains moments, il est logique de résoudre automatiquement une alerte après un certain temps. Par exemple, si un counter envoie uniquement des informations lorsqu'une erreur est détectée, l'alerte n'est jamais résolue car la métrique ne renvoie jamais un nombre d'erreurs égal à `0`. Dans ce cas, il est préférable de résoudre l'alerte lorsque la métrique est inactive depuis un certain temps. **Remarque** : si un monitor est automatiquement rétabli et que la valeur de la requête ne satisfait pas le seuil de rétablissement lors de l'évaluation suivante, le monitor déclenche une nouvelle alerte.

Ce paramètre n'est pas utile dans la plupart des cas : il est préférable de résoudre une alerte uniquement lorsqu'elle a été traitée. Il convient donc généralement de le laisser sur `[Never]`. Les alertes sont alors uniquement résolues lorsque la métrique est supérieure ou inférieure au seuil défini.

#### Durée de rétention du groupe

Vous pouvez retirer le groupe du statut du monitor après `N` heures sans données. La durée peut être de minimum 1 heure et de maximum 72 heures. Pour les monitors multi alertes, sélectionnez **Remove the non-reporting group after `N (length of time)`**.

{{< img src="/monitors/create/group_retention_time.png" alt="Choix de la durée de rétention du groupe" style="width:70%;">}}

Tout comme l'[option de rétablissement automatique][3], la durée de rétention du groupe s'applique lorsque la requête ne renvoie plus de données. Cette option détermine la durée pendant laquelle le groupe conserve le statut du monitor à partir du moment où les données cessent d'être transmises. Par défaut, les groupes conservent le statut pendant 24 heures avant d'être exclus. Le délai de rétention du groupe et le délai de rétablissement automatique commencent **au même moment**, dès que la requête du monitor ne renvoie plus de données.

Les durées de rétention peuvent par exemple s'avérer utiles dans les cas suivants :

- Lorsque vous souhaitez exclure le groupe dès que la requête ne renvoie plus de données, ou peu de temps après
- Lorsque vous souhaitez que le groupe conserve le statut du monitor pendant toute la durée du dépannage

**Remarque** : pour configurer la durée de rétention, vous devez utiliser un monitor à alertes multiples qui prend en charge l'option [`On missing data`][4]. Cela englobe les monitors d'analyse de traces APM, de logs d'audit, de pipelines CI, de suivi des erreurs, d'événements, de logs et RUM.

#### Délai pour les nouveaux groupes

Retardez de `N` secondes le début de l'évaluation des nouveaux groupes.

Ce délai correspond à la durée, en secondes, après laquelle les alertes commencent à être envoyées. Il permet aux nouveaux groupes de se lancer et aux applications de terminer leur démarrage. Sa valeur doit être définie sur un nombre entier positif.

Par exemple, si votre architecture est conteneurisée, le délai pour les nouveaux groupes vous permet d'éviter de déclencher les groupes de monitors filtrés sur des conteneurs en cas d'utilisation élevée des ressources ou de latence importante au moment de la création d'un conteneur. Le délai est appliqué à tous les nouveaux groupes (qui n'ont pas été détectés lors des dernières 24 heures). Sa valeur est définie par défaut sur `60` secondes.

Cette option est disponible pour les monitors à alertes multiples.

#### Délai avant évaluation

<div class='alert alert-info'>Datadog recommande un délai de 15 minutes pour les métriques cloud, qui sont rétropolées par les fournisseurs de services. De plus, lorsque vous utilisez une formule de division, un délai de 60 secondes permet de s'assurer que le monitor s'évalue sur des valeurs complètes. Consultez la page <a href="https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/">Délai de réception des métriques cloud</a> pour connaître les délais estimés.</div>

Choisissez de retarder l'évaluation de `N` secondes.

La durée (en secondes) correspondant au délai avant l'évaluation. La valeur doit être un nombre entier non négatif. Par exemple, si le délai est défini sur 900 secondes (15 min), que l'intervalle est défini sur les dernières `5 minutes` et qu'il est 7 h, le monitor évalue les données mesurées entre 6 h 40 et 6 h 45. Le délai avant évaluation maximum est de 86400 secondes (24 heures).

## Configurer des notifications et des automatisations

Configurez vos messages de notification de façon à inclure les informations qui vous intéressent le plus. Indiquez les équipes auxquelles ces alertes doivent être envoyées, ainsi que les attributs pour lesquels les alertes doivent se déclencher.

### Message

Utilisez cette section pour configurer les notifications envoyées à votre équipe et la façon dont elles sont envoyées :

  - [Configurer votre notification à l'aide de template variables][5]
  - [Envoyer des notifications à votre équipe via e-mail, Slack ou PagerDuty][6]

Pour en savoir plus sur les options de configuration du message de notification, consultez la section [Notifications d'alerte][7].

### Ajouter des métadonnées

<div class='alert alert-info'>Les tags de monitor sont indépendants des tags envoyés par l'Agent ou les intégrations. Consultez la <a href="/monitors/manage/">documentation relative à la gestion des monitors</a>.</div>

1. Utilisez le menu déroulant **Tags** pour associer des [tags][8] à votre monitor.
1. Utilisez le menu déroulant **Teams** pour associer des [équipes][9] à votre monitor.
1. Utilisez le champ **Priority** pour choisir une priorité.

### Définir l'agrégation des alertes

Les alertes sont regroupées automatiquement en fonction de l'agrégation choisie pour votre requête (par exemple, `avg by service`). Si la requête ne contient aucun regroupement, le type d'alerte par défaut est `Simple Alert`. Si la requête est groupée selon une ou plusieurs dimensions, le type passe à `Multi Alert`.

{{< img src="/monitors/create/notification-aggregation.png" alt="Options de configuration pour l'agrégation des notifications de monitor" style="width:100%;">}}

#### Alerte simple

Le mode `Simple Alert` déclenche une notification en agrégeant toutes les sources qui envoient des données. Vous recevez **une seule alerte** lorsque la valeur agrégée atteint les conditions définies. Par exemple, vous pouvez configurer un monitor pour vous alerter si la consommation moyenne de CPU de l'ensemble des serveurs dépasse un certain seuil. Si ce seuil est atteint, vous recevrez une seule notification, quel que soit le nombre de serveurs individuels ayant dépassé le seuil. Cela peut être utile pour surveiller des tendances ou des comportements globaux du système.


{{< img src="/monitors/create/simple-alert.png" alt="Diagramme montrant comment les notifications de monitor sont envoyées en mode simple alert" style="width:90%;">}}

#### Alerte multiple

Un monitor `Multi Alert` déclenche des notifications individuelles pour chaque entité du monitor qui atteint le seuil d'alerte.

{{< img src="/monitors/create/multi-alert.png" alt="Diagramme montrant comment les notifications de monitor sont envoyées en mode multi alert" style="width:90%;">}}

Par exemple, si vous configurez un monitor pour vous alerter lorsque la latence P99, agrégée par service, dépasse un certain seuil, vous recevrez une **alerte distincte** pour chaque service dont la latence P99 dépasse ce seuil. Cela peut être utile pour identifier et résoudre des problèmes spécifiques liés au système ou à une application. Ce mode permet de suivre les incidents à un niveau plus granulaire.

##### Regroupement des notifications

Lorsque vous surveillez un grand groupe d'entités, les multi alerts peuvent générer un trop grand nombre de notifications. Pour atténuer cela, personnalisez les dimensions qui déclenchent les alertes. Cela permet de réduire le bruit et de vous concentrer sur les alertes les plus importantes. 
Par exemple, vous surveillez la consommation moyenne de CPU de tous vos hosts. Si vous regroupez votre requête par `service` et `host` mais souhaitez recevoir une alerte uniquement pour chaque attribut `service` dépassant le seuil, retirez l'attribut `host` des options de multi alert afin de réduire le nombre de notifications envoyées.

{{< img src="/monitors/create/multi-alert-aggregated.png" alt="Diagramme montrant comment les notifications sont envoyées lorsqu'elles sont définies selon des dimensions spécifiques en mode multi alert" style="width:90%;">}}

Lorsque vous agrégerez les notifications en mode `Multi Alert`, les dimensions non utilisées pour l'agrégation deviennent des `Sub Groups` dans l'interface.

**Remarque** : si votre métrique dispose uniquement du tag `host` sans tag `service`, elle ne sera pas détectée par le monitor. Les métriques qui disposent à la fois des tags `host` et `service` seront détectées par le monitor. 

Si vous avez configuré des tags ou des dimensions dans votre requête, ces valeurs sont disponibles pour chaque groupe évalué dans l'alerte multiple afin d'ajouter des informations de contexte dynamiques dans les notifications. Consultez la section [Variables d'attribut et de tag][10] pour découvrir comment utiliser les valeurs de tag dans le message de notification.

| Regrouper en fonction de                       | Alertes simples | Alertes multiples |
|-------------------------------------|------------------------|-----------------------|
| _(tous les éléments)_                      | Un seul groupe déclenchant une notification | S. O. |
| Une ou plusieurs dimensions | Envoi d'une notification si un ou plusieurs groupes répondent aux conditions de l'alerte | Envoi d'une notification par groupe respectant les conditions d'alerte |

## Autorisations

Tous les utilisateurs peuvent consulter tous les monitors, quel que soit le rôle ou l'équipe auxquels ils sont associés. Par défaut, seuls les utilisateurs rattachés à des rôles disposant de la [permission Monitors Write][11] peuvent modifier des monitors. Les rôles [Datadog Admin Role et Datadog Standard Role][12] disposent de cette permission par défaut. Si votre organisation utilise des [rôles personnalisés][13], ces derniers peuvent également inclure la permission Monitors Write. Pour en savoir plus sur la configuration du contrôle d'accès RBAC pour les monitors et sur la migration des monitors à partir du paramètre verrouillé vers l'utilisation de restrictions basées sur les rôles, consultez le guide [Configuration du RBAC pour les monitors][14].

Vous pouvez restreindre davantage l'accès à votre monitor en spécifiant une liste d'[équipes][17], de [rôles][15] ou d'utilisateurs autorisés à le modifier. Le créateur du monitor dispose des droits de modification par défaut. La modification inclut toute mise à jour de la configuration du monitor, sa suppression ou sa mise en sourdine pour une durée quelconque.

**Remarque** : les limites s'appliquent à la fois à l'IU et à l'API.

### Contrôles d'accès granulaires

Utilisez les [contrôles d'accès granulaires][16] pour limiter les équipes, rôles ou utilisateurs autorisés à modifier un monitor :
1. Lors de la modification ou de la configuration d'un monitor, accédez à la section **Define permissions and audit notifications**.
  {{< img src="monitors/configuration/define_permissions_audit_notifications.png" alt="Options de configuration du monitor pour définir les permissions" style="width:70%;" >}}
1. Cliquez sur **Edit Access**.
1. Cliquez sur **Restrict Access**.
1. La boîte de dialogue affiche alors les membres de votre organisation disposant de l'autorisation **Viewer** par défaut.
1. Utilisez le menu déroulant pour sélectionner un ou plusieurs rôles, équipes ou utilisateurs autorisés à modifier le monitor.
1. Cliquez sur **Add**.
1. La boîte de dialogue indique alors que le rôle sélectionné possède l'autorisation **Editor**.
1. Cliquez sur **Done**.

**Remarque** : afin de toujours pouvoir accéder au monitor, vous devez inclure au moins un de vos rôles ou une de vos équipes avant d'enregistrer vos modifications.

Pour rétablir les autorisations globales d'un monitor restreint, procédez comme suit :
1. Lorsque vous consultez un monitor, cliquez sur le menu déroulant **More**.
1. Sélectionnez **Permissions**.
1. Cliquez sur **Restore Full Access**.
1. Cliquez sur **Save**.

## Pour aller plus loin

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