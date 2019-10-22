---
title: Créer un monitor
type: apicontent
order: 27.01
external_redirect: '/api/#creer-un-monitor'
---
## Créer un monitor

Si vous programmez la gestion et le déploiement des monitors, vous pouvez définir plus facilement le monitor dans l'IU Datadog et [exporter son JSON valide][1].

**ARGUMENTS**:

*   **`type`** [*obligatoire*] :
    le [type de monitor][2]. Vous trouverez sous-dessous les différentes valeurs autorisées :

| Type de monitor | Valeur de l'attribut du type             |
|:-------------|:---------------------------------|
| anomaly      | `query alert`                    |
| apm          | `query alert`                    |
| composite    | `composite`                      |
| custom       | `service check`                  |
| event        | `event alert`                    |
| forecast     | `query alert`                    |
| host         | `service check`                  |
| integration  | `query alert` ou `service check` |
| live process | `process alert`                  |
| logs         | `log alert`                      |
| metric       | `metric alert`                   |
| network      | `service check`                  |
| outlier      | `query alert`                    |
| process      | `service check`                  |
| watchdog     | `event alert`                    |

*   **`query`** [*obligatoire*] :
    le paramètre query définit à quel moment le monitor se déclenche. La syntaxe de la requête dépend du type de monitor que vous créez :

    ##### Requête d'alerte de métrique
    `time_aggr(time_window):space_aggr:metric{tags} [by {key}] operator #`

    -   `time_aggr` : avg, sum, max, min, change ou pct_change.
    -   `time_window` : `last_#m` (où `#` doit être remplacé par 5, 10, 15 ou 30), `last_#h` (où `#` doit être remplacé par 1, 2 ou 4) ou `last_1d`.
    -   `space_aggr` : avg, sum, min ou max.
    -   `tags` : un ou plusieurs tags (séparés par des virgules) ou *.
    -   `key` : la 'key' de la syntaxe de tags key:value. Définit une alerte distincte pour chaque tag du groupe (alertes multiples).
    -   `operator` : <, <=, >, >=, == ou !=.
    -   `#` : un nombre entier ou un chiffre décimal utilisé pour définir le seuil.

    Si vous utilisez l'agrégateur temporel `_change_` ou `_pct_change_`, utilisez plutôt `change_aggr(time_aggr(time_window), timeshift):space_aggr:metric{tags} [by {key}] operator #` avec :

    *   `change_aggr` : change, pct_change.
    *   `time_aggr` : avg, sum, max, min. [En savoir plus][3].
    *   `time_window` : last_#m (1, 5, 10, 15 ou 30), last_#h (1, 2 ou 4) ou last_#d (1 ou 2).
    *   `timeshift` : #m_ago (5, 10, 15 ou 30), #h_ago (1, 2 ou 4) ou 1d_ago.

    Utilisez ce paramètre pour créer un monitor outlier à l'aide de la requête suivante : `avg(last_30m):outliers(avg:system.cpu.user{role:es-events-data} by {host}, 'dbscan', 7) > 0`.

    ##### Requête de check de service
    `"check".over(tags).last(count).count_by_status()`

    *   **`check`** : nom du check, par exemple datadog.agent.up.
    *   **`tags`** : un ou plusieurs tags entre guillemets (séparés par des virgules) ou « * ». Exemple : `.over("env:prod", "role:db")`.
    *   **`count`** doit être >= à votre seuil maximum (défini dans `options`). Par exemple, si vous souhaitez recevoir une notification à partir de 1 statut Critical, 3 statuts Ok et 2  statuts Warning, « count » doit prendre pour valeur 3. La valeur maximale est de 10.

    ##### Requête d'alerte d'événement

    `events('sources:nagios status:error,warning priority:normal tags: "string query"').rollup("count").last("1h")"`

    *  **`event`** : la chaîne de requête de l'événement.
    *   **`string_query`** : requête en texte libre à comparer au titre et au texte de l'événement.
    *   **`sources`** : sources des événements (séparées par des virgules). [Liste complète des valeurs d'attributs source][4].
    *   **`status`** : statuts des événements (séparés par des virgules). Valeurs autorisées : error, warn et info.
    *   **`priority`** : priorités des événements (séparées par des virgules). Valeurs autorisées : low, normal ou all.
    *   **`host`** : hosts de transmission d'événements (séparés par des virgules).
    *   **`tags`** : tags d'événement (séparés par des virgules).
    *   **`excluded_tags`** : tags des événements exclus (séparés par des virgules).
    *   **`rollup`** : la méthode de cumulation des statistiques. `count` est actuellement la seule méthode prise en charge.
    *   **`last`** : l'intervalle pour cumuler les totaux. Exemples : 60 s, 4 h. Unités de temps prises en charge : s, m, h et j.

    ##### Requête d'alerte de processus

    `processes(search).over(tags).rollup('count').last(timeframe) operator #`

    *   **`search`** : recherche en texte libre pour interroger les processus. Les processus correspondants correspondent aux résultats de la page [Live Processes][5].
    *   `**tags`** : un ou plusieurs tags (séparés par des virgules).
    *   **`timeframe`** : l'intervalle pour cumuler les totaux. Exemples : 60 s, 4 h. Unités de temps prises en charge : s, m, h et j
    *   **`operator`** : <, <=, >, >=, == ou !=.
    *   **`#`** : un nombre entier ou un chiffre décimal utilisé pour définir le seuil.

    ##### Requête de composite

    `12345 && 67890`, où `12345` et `67890` sont les identifiants de monitors non composites.

* **`name`** [*obligatoire*, *défaut*=**valeur dynamique, basée sur la requête**] :
    le nom de l'alerte.
* **`message`** [*obligatoire*, *défaut*=**valeur dynamique, basée sur la requête**] :
    un message à inclure avec les notifications pour ce monitor. Les notifications par e-mail peuvent être envoyées à des utilisateurs spécifiques en utilisant la même notation « @nomutilisateur » que les événements.
* **`tags`** [*facultatif*, *défaut*=**liste vide**] :
    la liste de tags à associer à votre monitor. Lorsque vous obtenez tous les détails du monitor via l'API, utilisez l'argument `monitor_tags` pour filtrer les résultats avec ces tags. Ces valeurs ne peuvent être utilisées qu'avec l'API et ne sont ni visibles ni modifiables dans l'IU Datadog.

* **`options`** [*facultatif*, *défaut*=**{}**] :
    un dictionnaire d'options pour le monitor. Certaines options sont couramment utilisées pour tous les types, tandis que d'autres sont spécifiques à certains types de monitors.
    ##### Options couramment utilisées

    *   **`silenced`** : dictionnaire de contextes caractérisés par des timestamps ou la valeur `None`. Chaque contexte est désactivé jusqu'au timestamp POSIX. Les contextes peuvent également être définitivement désactivés avec la valeur `None`. Valeur par défaut : **None**.
        Exemples :
        *   Pour désactiver complètement l'alerte : `{'*': None}`.
        *   Pour désactiver `role:db` à court terme : `{'role:db': 1412798116}`.

    *   **`new_host_delay`** : durée (en secondes) autorisée pour le démarrage d'un host et le lancement complet des applications avant le début de l'évaluation des résultats du monitor. Doit être un nombre entier non négatif. Valeur par défaut : **300**.

    *   **`notify_no_data`** : une valeur booléenne qui indique si ce monitor envoie une notification en absence de transmission de données. Valeur par défaut : **false**.

    *   **`no_data_timeframe`** : le nombre de minutes avant qu'un monitor envoie une notification en l'absence de transmission de données. Ce paramètre est obligatoire lorsque `notify_no_data​` est défini sur `true`. Il doit correspondre au moins au double de l'intervalle du monitor pour les alertes de métrique, ou à 2 minutes pour les checks de service. Valeur par défaut : **le double de l'intervalle pour les alertes de métrique, 2 minutes pour les checks de service**.

    *   **`timeout_h`** : le nombre d'heures durant lesquelles le monitor ne transmet pas les données avant qu'il ne procède à une résolution automatique à partir d'un état déclenché. Valeur par défaut : **None**.

    *   **`require_full_window`** : une valeur booléenne indiquant si ce monitor a besoin d'une période complète de données avant son évaluation. Nous vous recommandons fortement de définir ce paramètre sur `False` pour les métriques creuses, sans quoi certaines évaluations sont ignorées. Valeur par défaut : **True** pour les agrégations « on average », « at all times » et « in total ». Pour les autres cas, **False**.

    *   **`renotify_interval`** : le nombre de minutes après la dernière notification avant qu'un monitor envoie à nouveau une notification sur le statut actuel. La notification est uniquement envoyée s'il le monitor n'est pas résolu. Valeur par défaut : **None**.

    *   **`escalation_message`** : le message à inclure avec la nouvelle notification. Prend en charge la syntaxe '@username' utilisée ailleurs. Non applicable si `renotify_interval` est défini sur `None`. Valeur par défaut : **None**.

    *   **`notify_audit`** : une valeur booléenne qui indique si les utilisateurs tagués sont informés des modifications apportées à ce monitor. Valeur par défaut : **False**.

    *   **`locked`** : une valeur booléenne qui indique si uniquement le créateur ou les administrateurs peuvent apporter des modifications. Valeur par défaut : **False**.

    *   **`include_tags`** : une valeur booléenne qui indique si les notifications de ce monitor insèrent automatiquement les tags à l'origine du déclenchement dans le titre. Valeur par défaut : **True**. Exemples :
        *   True : `[Triggered on {host:h1}] Titre du monitor`
        *   False: `[Triggered] Titre du monitor`

    ##### Options d'anomalie
    _Ces options s'appliquent uniquement aux monitors d'anomalie et sont ignorées pour les autres types de monitors._

    -   **`threshold_windows`** : un dictionnaire contenant `recovery_window` et `trigger_window`.
        * `recovery_window` désigne la durée pendant laquelle une métrique anormale doit afficher un comportement normal pour que l'alerte soit annulée.
        * `trigger_window` désigne la durée pendant laquelle une métrique doit afficher un comportement anormal pour que l'alerte soit déclenchée.

            Exemple : `{'threshold_windows': {'recovery_window': 'last_15m', 'trigger_window': 'last_15m'}}`

    ##### Options d'alerte de métrique
    _Ces options s'appliquent uniquement aux alertes de métrique._

    -   **`thresholds`** : un dictionnaire de seuils par type de seuil. Il existe deux types de seuils pour les alertes de métrique : *critical* et *warning*. *Critical* est défini dans la requête, mais peut également être précisé dans cette option. Le seuil *warning* peut uniquement être spécifié à l'aide de l'option thresholds.
    Si vous souhaitez utiliser des [seuils d'annulation][6] pour votre monitor, utilisez les attributs `critical_recovery` et `warning_recovery`.

            Exemple : `{'critical': 90, 'warning': 80,  'critical_recovery': 70, 'warning_recovery': 50}`.

    -   **`evaluation_delay`** : durée (en secondes) correspondant au délai avant l'évaluation (nombre entier non négatif). Par exemple, pour une valeur définie sur 300 (5 min), si l'intervalle est défini sur last_5m et s'il est 7 h, le monitor évalue les données de 6 h 50 à 6 h 55. Cette option s'avère très utile pour AWS CloudWatch et pour d'autres métriques renvoyées pour s'assurer que le monitor dispose toujours de données lors de l'évaluation.

    ##### Options de check de service
    _Ces options s'appliquent uniquement aux checks de service et sont ignorées pour les autres types de monitors._

    -   **`thresholds`** : un dictionnaire de seuils par statut. Comme les checks de service peuvent avoir plusieurs seuils, nous ne les définissons pas directement dans la requête.

            Exemple : `{'ok': 1, 'critical': 1, 'warning': 1}`

    ##### Erreurs et validation
    Si une option de monitor non valide fait partie de la requête, la réponse sera :

            Error: 400 - ["Invalid monitor option:<option non valide>"]


[1]: /fr/monitors/monitor_types/#import
[2]: /fr/monitors/monitor_types
[3]: /fr/monitors/monitor_types/#define-the-conditions
[4]: /fr/integrations/faq/list-of-api-source-attribute-value
[5]: /fr/graphing/infrastructure/process
[6]: /fr/monitors/faq/what-are-recovery-thresholds