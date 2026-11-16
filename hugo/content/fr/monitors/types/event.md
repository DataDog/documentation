---
aliases:
- /fr/monitors/monitor_types/event
- /fr/monitors/create/types/event/
description: Surveiller des événements recueillis par Datadog
further_reading:
- link: /events/
  tag: Documentation
  text: Présentation d'Event Management
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
title: Monitor d'événement
---
## Présentation {#overview}

Datadog crée automatiquement des événements à partir de divers produits, notamment les monitors, Watchdog et Error Tracking. Vous pouvez également suivre les événements générés par l'Agent et les intégrations installées, et ingérer des événements provenant de sources variées, notamment des alertes tierces, des demandes de changement, des déploiements et des modifications de configuration.

<div class="alert alert-info">Les monitors d'événements ne déclenchent pas d'alerte sur les <a href="/monitors/status/events/">événements de monitor</a>, car cela peut créer une boucle infinie.</a></div>

Les monitors d'événements alertent sur les événements ingérés qui correspondent à une requête de recherche, vous permettant de concentrer votre attention sur les événements les plus importants pour votre équipe.

## Création de monitor {#monitor-creation}

Pour créer un monitor d'événements dans Datadog, accédez à [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Event{{< /ui >}}][1].

<div class="alert alert-info">Il existe une limite par défaut de 1000 monitors d'événements par compte. Si vous atteignez cette limite, envisagez d'utiliser des <a href="/monitors/configuration/#set-alert-aggregation">alertes multiples</a>, ou <a href="/help/">contactez le support</a>.</div>

### Définissez la requête de recherche {#define-the-search-query}

À mesure que vous définissez votre requête de recherche, le graphique du haut se met à jour.

1. Construisez une requête de recherche en utilisant la [syntaxe de recherche de l'Event Explorer][2].
2. Choisissez de surveiller un nombre d'événements, une facette, des tags ou des attributs :
    * Datadog évalue le nombre d'événements sur une période sélectionnée, puis le compare aux conditions de seuil.
    * Pour certains attributs et tags, Datadog évalue les valeurs agrégées (par exemple, Moyenne, Médiane, Min ou Somme).
    * {{< ui >}}Monitor over a facet{{< /ui >}} : Si une facette est sélectionnée, le monitor alerte sur le nombre de valeurs uniques de la facette.
      
3. Groupez les événements par plusieurs dimensions (facultatif) : 

   Tous les événements correspondant à la requête sont agrégés en groupes basés sur la valeur d'un maximum de quatre facettes d'événement. Lorsque plusieurs dimensions sont présentes, les valeurs principales sont déterminées selon la première dimension, puis selon la deuxième dimension parmi les valeurs principales de la première, et ainsi de suite jusqu'à la dernière dimension. La limite des dimensions dépend du nombre total de dimensions :
   * **1 facette** : 1000 valeurs principales
   * **2 facettes** : 30 valeurs principales par facette (au maximum 900 groupes)
   * **3 facettes** : 10 valeurs principales par facette (1000 groupes au maximum)
   * **4 facettes** : 5 valeurs principales par facette (625 groupes au maximum)

   Si plusieurs requêtes ou formules sont définies dans un monitor d'événements, vous pouvez sélectionner le nombre de valeurs les plus élevées ou les plus basses pour chaque dimension.

   La limite totale pour les valeurs principales est de 1 000, quel que soit le nombre de facettes. Si vous augmentez la valeur principale à un nombre supérieur à 1 000, Datadog ajuste les valeurs principales pour les autres dimensions afin de garantir que le nombre de combinaisons résultantes soit inférieur à 1 000. Les valeurs principales par défaut pour chaque regroupement sont de 10, à l'exception de la quatrième facette, qui est définie par défaut sur les cinq valeurs principales.

   Par exemple, un monitor d'événements avec quatre regroupements sur la requête de recherche pourrait avoir :
   * **Première facette** : 10 valeurs principales
   * **Deuxième facette** : 10 valeurs principales
   * **Troisième facette** : 5 valeurs principales
   * **Quatrième facette** : 2 valeurs principales

### Définir les conditions d'alerte {#set-alert-conditions}

Déclencher lorsque la requête remplit l'une des conditions suivantes par rapport à une valeur seuil :
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

**Remarque** : Certains fournisseurs introduisent un délai important entre le moment où un événement est **publié** et celui où il est initié. Dans ce cas, Datadog antidate l'événement à son heure d'occurrence, ce qui pourrait placer un événement entrant en dehors de la fenêtre d'évaluation actuelle du monitor. Élargir votre fenêtre d'évaluation peut aider à prendre en compte ce décalage temporel.

#### Conditions d'alerte avancées {#advanced-alert-conditions}

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, délai d'évaluation, etc.), consultez la documentation relative à la [configuration des monitors][4].

### Notifications {#notifications}

Pour des instructions détaillées sur la section {{< ui >}}Configure notifications & automations{{< /ui >}}, consultez la page [Notifications][5].

#### Variables de modèle d'événement {#event-template-variables}

Les monitors d'événement disposent de variables de modèle spécifiques que vous pouvez inclure dans le message de notification :

| Variable de modèle          | Définition                                                                     |
|----------------------------|--------------------------------------------------------------------------------|
| `{{event.id}}`             | The ID of the event.                                                           |
| `{{event.title}}`          | The title of the event.                                                        |
| `{{event.text}}`           | The text of the event.                                                         |
| `{{event.host.name}}`      | The name of the host that generated the event.                                 |
| `{{event.tags}}`           | A list of tags attached to the event.                                          |
| `{{event.tags.<TAG_KEY>}}` | La valeur d'une clé de tag spécifique associée à l'événement. Voir l'exemple ci-dessous. |

##### Syntaxe des `key:value` tags {#tags-keyvalue-syntax}

Pour les tags `env:test`, `env:staging` et `env:prod` :

* `env` est la clé de tag.
* `test`, `staging` et `prod` sont les valeurs des tags.

La variable de modèle est `{{event.tags.env}}`. The result of using this template variable is `test`, `staging`, or `prod`.

### Regroupement des notifications {#notification-aggregation}

Configurez la stratégie de regroupement des alertes :
    * {{< ui >}}Simple-Alert{{< /ui >}} : Les alertes simples se regroupent sur toutes les sources de rapport. Vous recevez une alerte lorsque la valeur regroupée remplit les conditions définies. Ceci fonctionne mieux pour surveiller une métrique provenant d'un seul host ou la somme d'une métrique sur plusieurs hosts. Cette stratégie peut être sélectionnée pour réduire le bruit des notifications.
    * {{< ui >}}Multi Alert{{< /ui >}} : Les alertes multiples appliquent l'alerte à chaque source selon vos paramètres de groupe, jusqu'à 1000 groupes correspondants. Un événement d'alerte est généré pour chaque groupe qui remplit les conditions définies. Par exemple, vous pouvez regrouper par `host` pour recevoir des alertes distinctes pour chaque host.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/event
[2]: /fr/events/explorer/searching
[3]: /fr/help/
[4]: /fr/monitors/configuration/#advanced-alert-conditions
[5]: /fr/monitors/notify/