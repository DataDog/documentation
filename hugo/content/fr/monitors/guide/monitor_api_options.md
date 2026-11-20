---

title: Options de l'API Monitor
---

## Options couramment utilisées

- **`silenced`** : dictionnaire de portées caractérisées par des timestamps ou la valeur `null`. Chaque portée est désactivée jusqu'au timestamp POSIX. Les portées peuvent également être complètement désactivées avec la valeur `null`. Valeur par défaut : **null**. Exemples :

  - Pour désactiver complètement l'alerte : `{'*': null}`.
  - Pour désactiver `role:db` à court terme : `{'role:db': 1412798116}`.

- **`new_group_delay`** : délai (en secondes) avant que des alertes ne soient générées pour les nouveaux groupes. Ce délai permet aux nouvelles applications ou aux nouveaux conteneurs de terminer leur lancement avant d'envoyer les premières alertes. Doit être un nombre entier non négatif. Valeur par défaut : **60**. Exemple : si vous utilisez une architecture conteneurisée, un délai d'évaluation vous permet d'éviter que les conteneurs de regroupement d'un monitor se déclenchent après la création d'un conteneur, afin d'éviter toute hausse de la latence ou tout pic de la charge CPU lors des premières minutes.

- **`new_host_delay`** : délai (en secondes) accordé au démarrage d'un host et au lancement complet des applications avant le début de l'évaluation des résultats du monitor. Doit être un nombre entier non négatif. **Obsolète : utilisez plutôt `new_group_delay`.**

- **`notify_no_data`** : une valeur booléenne qui indique si ce monitor envoie une notification en l'absence de transmission de données. Valeur par défaut : **False**.
- **`no_data_timeframe`** : le nombre de minutes avant qu'un monitor envoie une notification en l'absence de données reçues. Datadog vous conseille de choisir une valeur correspondant au moins au double de l'intervalle du monitor pour les alertes de métrique, ou à 2 minutes pour les checks de service. **S'il est omis, ce paramètre est défini sur le double de l'intervalle d'évaluation pour les alertes de métriques, et sur 24 heures pour les checks de service.**
- **`timeout_h`** : le nombre d'heures durant lesquelles le monitor ne transmet pas les données avant qu'il ne procède à une résolution automatique à partir d'un état déclenché. Valeur minimale : 0 heure. Valeur maximale : 24 heures. Valeur par défaut : **null**.

-  **`require_full_window`** : une valeur booléenne indiquant si ce monitor a besoin d'une période complète de données avant son évaluation. Datadog vous recommande de définir ce paramètre sur `False` pour les métriques creuses, sans quoi certaines évaluations sont ignorées. Valeur par défaut : **False**.
- **`renotify_interval`** : le nombre de minutes après la dernière notification avant qu'un monitor envoie à nouveau une notification sur le statut actuel. La notification est uniquement envoyée si le monitor n'est pas résolu. Valeur par défaut : **null**.
- **`renotify_statuses`** : l'état à partir duquel un monitor renvoie une notification. Peut uniquement être défini si l'option `renotify_interval` a été configurée. Valeur par défaut : **null**. Si `renotify_statuses` n'a pas été défini, des notifications sont renvoyées pour les états `Alert` et `No Data`.
- **`renotify_occurrences`** : le nombre de nouvelles notifications envoyées par le monitor. Peut uniquement être défini si l'option `renotify_interval` a été configurée. Valeur par défaut : **null** (aucune limite de renotification).
- **`escalation_message`** : le message à inclure avec la nouvelle notification. Prend en charge la syntaxe « @nomutilisateur » utilisée ailleurs. Non applicable si `renotify_interval` est défini sur `null`. Valeur par défaut : **null**.
- **`notify_audit`** : une valeur booléenne qui indique si les utilisateurs tagués sont informés des modifications apportées à ce monitor. Valeur par défaut : **False**.
- **`include_tags`** : une valeur booléenne qui indique si les notifications de ce monitor insèrent automatiquement les tags à l'origine du déclenchement dans le titre. Valeur par défaut : **True**. Exemples :

  - `True` : `[Triggered on {host:h1}] Monitor Title`
  - `False` : `[Triggered] Monitor Title`

### Options relatives aux autorisations

- **`locked`** : une valeur booléenne indiquant si le créateur ou les utilisateurs disposant de l'autorisation Org Management (`org_management`) sont capables de modifier ce monitor. Valeur par défaut : **False**. **Obsolète : utilisez plutôt `restricted_roles`.**
- **`restricted_roles`** : un tableau répertoriant les UUID des rôles autorisés à modifier le monitor. Il est notamment possible de modifier la configuration du monitor, de supprimer le monitor et de désactiver ses notifications pendant la durée souhaitée. Les UUID de rôle sont récupérés depuis l'[API Roles][1]. L'option `restricted_roles` remplace `locked`.

**Remarque** : il est inutile de définir à la fois le paramètre `locked` et le paramètre `restricted_roles` pour un seul monitor. Si vous définissez ces deux paramètres, seul le paramètre le plus restrictif est appliqué. Tout rôle défini dans `restricted_roles` est considéré comme plus restrictif que le paramètre `locked:true`. 

Les exemples suivants décrivent les interactions entre les paramètres `locked` et `restricted_roles` :
- Lorsque les paramètres `locked:false` et `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]` sont définis pour un monitor, le paramètre `restricted_roles` est appliqué.
- Lorsque les paramètres `locked:true` et `"restricted_roles": [ "er6ec1b6-903c-15ec-8686-da7fd0960002" ]` sont définis pour un monitor, le paramètre `restricted_roles` est appliqué.
- Lorsque le paramètre `locked:true` est défini et qu'aucun paramètre `"restricted_roles"` n'est défini pour un monitor, le paramètre `locked:true` est appliqué.

Pour en savoir plus sur la configuration du RBAC pour les monitors et découvrir comment passer du paramètre locked aux restrictions de rôles pour vos monitors, consultez le [guide dédié][2]

## Options d'anomalie

_Ces options s'appliquent uniquement aux monitors d'anomalie et sont ignorées pour les autres types de monitors._

- **`threshold_windows`** : un dictionnaire contenant `recovery_window` et `trigger_window`.

  - `recovery_window` désigne la durée pendant laquelle une métrique anormale doit afficher un comportement normal pour que l'alerte soit annulée.
  - `trigger_window` désigne la durée pendant laquelle une métrique doit afficher un comportement anormal pour que l'alerte soit déclenchée.

Exemple : `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Options d'alerte de métrique

_Ces options s'appliquent uniquement aux alertes de métrique._

- **`thresholds`** : un dictionnaire de seuils par type de seuil. Il existe deux types de seuils pour les alertes de métrique : *critical* et *warning*. Le seuil *critical* est défini dans la requête, mais peut également être précisé dans cette option. Le seuil *warning* peut uniquement être spécifié à l'aide de l'option thresholds. Si vous souhaitez appliquer des [seuils de rétablissement][3] à votre monitor, utilisez les attributs `critical_recovery` et `warning_recovery`.

Exemple : `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`.

- **`evaluation_delay`** : durée (en secondes) correspondant au délai avant l'évaluation (nombre entier non négatif). Par exemple, pour une valeur de 300 (5 min), si l'intervalle est défini sur last_5m et s'il est 7 h, le monitor évalue les données de 6 h 50 à 6 h 55. Cette option s'avère très utile pour AWS CloudWatch et pour d'autres métriques renvoyées pour s'assurer que le monitor dispose toujours de données lors de l'évaluation.

## Options de check de service

_Ces options s'appliquent uniquement aux checks de service et sont ignorées pour les autres types de monitors._

- **`thresholds`** : un dictionnaire de seuils par statut. Comme les checks de service peuvent avoir plusieurs seuils, ils ne sont pas définis directement dans la requête.

Exemple : `{'ok': 1, 'critical': 1, 'warning': 1}`

## Options d'alerte de logs

_Ces options s'appliquent uniquement aux alertes de logs._

- **`thresholds`** : un dictionnaire des seuils par statut.

Exemple : `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** : un dictionnaire des valeurs `type`, `metric` et `groupBy`.
  - `type` : `count`, `cardinality` et `avg` sont les 3 types pris en charge.
  - `metric` : pour `cardinality`, indiquez le nom de la facette. Pour `avg`, indiquez le nom de la métrique. Pour `count`, indiquez `count` comme métrique.
  - `groupBy` : nom de la facette en fonction de laquelle vous souhaitez regrouper les données.

Exemple : `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** : une valeur booléenne permettant d'ajouter des échantillons ou des valeurs au message de notification. Valeur par défaut : `False`.

[1]: /fr/api/latest/roles/
[2]: /fr/monitors/guide/how-to-set-up-rbac-for-monitors/
[3]: /fr/monitors/guide/recovery-thresholds/