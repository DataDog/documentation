---
title: Options de l'API Monitor
kind: guide
---

## Options courantes

- **`silenced`** : dictionnaire de contextes caractérisés par des timestamps ou la valeur `None`. Chaque contexte est désactivé jusqu'au timestamp POSIX. Les contextes peuvent également être définitivement désactivés avec la valeur `None`. Valeur par défaut : **None**. Exemples :

  - Pour désactiver complètement l'alerte : `{'*': None}`.
  - Pour désactiver `role:db` à court terme : `{'role:db': 1412798116}`.

- **`new_host_delay`** : durée (en secondes) autorisée pour le démarrage d'un host et le lancement complet des applications avant le début de l'évaluation des résultats du monitor. Doit être un nombre entier non négatif. Valeur par défaut : **300**.
- **`notify_no_data`** : une valeur booléenne qui indique si ce monitor envoie une notification en absence de transmission de données. Valeur par défaut : **false**.
- **`no_data_timeframe`** : le nombre de minutes avant qu'un monitor envoie une notification en l'absence de données reçues. Nous vous conseillons de choisir une valeur correspondant au moins au double de l'intervalle du monitor pour les alertes de métrique, ou à 24 heures pour les checks de service. **S'il est omis, ce paramètre est défini sur le double de l'intervalle d'évaluation pour les alertes de métriques, et sur 24 heures pour les checks de service.**
- **`timeout_h`** : le nombre d'heures pendant lesquelles le monitor ne doit pas transmettre de données pour qu'il soit automatiquement résolu à partir d'un état déclenché. Valeur par défaut : **Aucune**.
-  **`require_full_window`** : une valeur booléenne indiquant si ce monitor a besoin d'une période complète de données avant son évaluation. Nous vous recommandons fortement de définir ce paramètre sur `False` pour les métriques creuses, sans quoi certaines évaluations sont ignorées. Valeur par défaut : **True** pour les agrégations « on average », « at all times » et « in total ». Pour les autres cas, **False**.
- **`renotify_interval`** : le nombre de minutes après la dernière notification avant qu'un monitor envoie à nouveau une notification sur le statut actuel. La notification est uniquement envoyée s'il le monitor n'est pas résolu. Valeur par défaut : **Aucune**.
- **`escalation_message`** : le message à inclure avec la nouvelle notification. Prend en charge la syntaxe '@username' utilisée ailleurs. Non applicable si `renotify_interval` est défini sur `None`. Valeur par défaut : **Aucune**.
- **`notify_audit`** : une valeur booléenne qui indique si les utilisateurs tagués sont informés des modifications apportées à ce monitor. Valeur par défaut : **False**.
- **`locked`** : une valeur booléenne qui indique si uniquement le créateur ou les administrateurs peuvent apporter des modifications. Valeur par défaut : **False**.
- **`include_tags`** : une valeur booléenne qui indique si les notifications de ce monitor insèrent automatiquement les tags à l'origine du déclenchement dans le titre. Valeur par défaut : **True**. Exemples :

  - `True` : `[Triggered on {host:h1}] Monitor Title`
  - `False` : `[Triggered] Monitor Title`

## Options d'anomalie

_Ces options s'appliquent uniquement aux monitors d'anomalie et sont ignorées pour les autres types de monitors._

- **`threshold_windows`** : un dictionnaire contenant `recovery_window` et `trigger_window`.

  - `recovery_window` désigne la durée pendant laquelle une métrique anormale doit afficher un comportement normal pour que l'alerte soit annulée.
  - `trigger_window` désigne la durée pendant laquelle une métrique doit afficher un comportement anormal pour que l'alerte soit déclenchée.

  Exemple : `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

## Options d'alerte de métrique

_Ces options s'appliquent uniquement aux alertes de métrique._

- **`thresholds`** : un dictionnaire de seuils par type de seuil. Il existe deux types de seuils pour les alertes de métrique : *critical* et *warning*. Le seuil *critical* est défini dans la requête, mais peut également être précisé dans cette option. Le seuil *warning* peut uniquement être spécifié à l'aide de l'option thresholds. Si vous souhaitez appliquer des [seuils de rétablissement][1] à votre monitor, utilisez les attributs `critical_recovery` et `warning_recovery`.

Exemple : `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`.

- **`evaluation_delay`** : durée (en secondes) correspondant au délai avant l'évaluation (nombre entier non négatif). Par exemple, pour une valeur définie sur 300 (5 min), si l'intervalle est défini sur last_5m et s'il est 7 h, le monitor évalue les données de 6 h 50 à 6 h 55. Cette option s'avère très utile pour AWS CloudWatch et pour d'autres métriques renvoyées pour s'assurer que le monitor dispose toujours de données lors de l'évaluation.

## Options de check de service

_Ces options s'appliquent uniquement aux checks de service et sont ignorées pour les autres types de monitors._

- **`thresholds`** : un dictionnaire de seuils par statut. Comme les checks de service peuvent avoir plusieurs seuils, nous ne les définissons pas directement dans la requête.

Exemple : `{'ok': 1, 'critical': 1, 'warning': 1}`

## Options d'alerte de logs

_Ces options s'appliquent uniquement aux alertes de logs._

- **`thresholds`** : un dictionnaire des seuils par statut.

Exemple : `{'ok': 1, 'critical': 1, 'warning': 1}`

- **`aggregation`** : un dictionnaire des valeurs `type`, `metric` et `groupeBy`.
  - `type` : `count`, `cardinality` et `avg` sont les 3 types pris en charge.
  - `metric` :  pour `cardinality`, le nom de la facette. Pour `avg`, le nom de la métrique. Pour `count`, utilisez simplement `count` comme métrique
  - `groupeBy` : nom de la facette en fonction de laquelle vous souhaitez regrouper les données.

Exemple : `{"metric": "count","type": "count","groupBy": "core_service"}`

- **`enable_logs_sample`** : un booléen permettant d'ajouter des échantillons ou des valeurs au message de notification. Valeur par défaut : `False`.

[1]: ../../faq/what-are-recovery-thresholds/
