---
aliases:
- /fr/guides/composite_monitors
- /fr/monitors/monitor_types/composite
- /fr/monitors/create/types/composite/
description: Recevoir des alertes sur une expression combinant plusieurs monitors
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
title: Monitor composite
---


## Présentation

Un monitor composite rassemble plusieurs monitors individuels afin de définir des conditions d'alertes plus spécifiques.

Pour créer un monitor composite, commencez par choisir des monitors existants, par exemple un monitor `A` et un monitor `B`. Définissez ensuite une condition de déclenchement à l'aide d'opérateurs booléens, p. ex. `A && B`. Le monitor composite se déclenche alors lorsque les valeurs des monitors individuels vérifient toutes les deux la condition de déclenchement du monitor composite.

{{< img src="monitors/monitor_types/composite/overview.jpg" alt="exemple de monitor composite" style="width:80%;">}}

Pour des raisons de configuration, un monitor composite ne dépend pas des monitors qui le composent. Sa stratégie de notification peut être modifiée sans altérer celle des monitors individuels, et vice versa. De même, la suppression d'un monitor composite n'entraîne pas la suppression des monitors qui le composent. Un monitor composite ne possède pas d'autres monitors, il se contente d'utiliser leurs résultats. En outre, plusieurs monitors composite peuvent utiliser un même monitor individuel.

**Remarques**

- Les termes `monitors individuels`, `monitors qui le composent` et `monitors non composite` désignent tous des monitors utilisés par un monitor composite pour calculer son statut.
- Pour obtenir un résultat composite, il est nécessaire d'effectuer des regroupements communs. Si vous choisissez des monitors qui ne partagent pas de tels regroupements, les monitors sélectionnés dans l'expression peuvent ne pas générer de résultat composite.
- Les monitors composite ne peuvent pas se baser sur d'autres monitors composite.

## Création d'un monitor

Pour créer un [monitor composite][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Composite*.

### Sélectionner des monitors et définir des conditions de déclenchement

#### Sélectionner des monitors

Choisissez jusqu'à **10** monitors individuels qui seront utilisés par le monitor composite. Les monitors peuvent être caractérisés par différents types d'alertes (alertes simples, alertes multiples ou mélange des deux). Aucun monitor individuel ne peut être un monitor composite. Une fois votre premier monitor sélectionné, l'interface affiche son type d'alerte et son statut actuel.

Si vous choisissez un monitor à alertes multiples, l'IU affiche la condition de regroupement et le nombre de sources uniques pour lesquelles il envoie des données. Par exemple, `Returns 5 host groups`. Lorsque vous combinez plusieurs monitors à alertes multiples, ces informations vous aident à choisir des monitors dont l'utilisation conjointe est pertinente.

{{< img src="monitors/monitor_types/composite/composite_example.jpg" alt="exemple de monitor composite"style="width:80%;">}}

Utilisez des monitors avec les mêmes groupes. Le cas contraire, l'IU vous informe qu'il se peut que votre monitor composite ne se déclenche jamais :

{{< img src="monitors/monitor_types/composite/composite_common_group.jpg" alt="groupes communs d'un monitor composite" style="width:80%;">}}


Même si vous choisissez des monitors à alertes multiples avec des groupes communs, l'erreur `Group Matching Error` peut se produire si vos monitors ne partagent aucune source de transmission (ou regroupement commun). En l'absence de source de transmission commune, Datadog ne peut pas calculer le statut d'un monitor composite, et celui-ci ne se déclenche jamais. Cependant, vous _pouvez_ choisir d'ignorer l'avertissement et de créer le monitor. Pour en savoir plus, consultez la section [Sélectionner des monitors et définir des conditions de déclenchement](#selectionner-des-monitors-et-definir-des-conditions-de-declenchement).

Lorsque vous sélectionnez un deuxième monitor qui n'entraîne pas d'avertissement, l'UI remplit le champ **Trigger when** en indiquant la condition de déclenchement par défaut `a && b` et affiche le statut du monitor composite proposé :

#### Définir des conditions de déclenchement

Dans le champ **Trigger when**, rédigez la condition de déclenchement de votre choix à l'aide d'opérateurs booléens. Désignez les monitors individuels par leur étiquette, p. ex. `a`, `b` ou `c`. Utilisez des parenthèses pour contrôler la précédence des opérateurs et créer des conditions plus complexes.

Toutes les conditions de déclenchement suivantes sont valides :

```text
!(a && b)
a || b && !c
(a || b) && (c || d)
```

#### Conditions d'alerte avancées

##### No data

Choisissez les options `Do not notify` (Ne pas prévenir) ou `Notify` (Prévenir) pour les situations où le monitor composite ne reçoit aucune donnée. L'option choisit ne modifie pas les paramètres `Notify no data` (Prévenir en cas d'absence de données) des monitors individuels. Cependant, pour qu'un monitor composite envoie une alerte en l'absence de données, les monitors individuels et le monitor composite doivent être définis sur `Notify`.

##### Autres options

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, etc.), consultez la documentation relative à la [configuration des monitors][2].

### Notifications

Pour obtenir des instructions sur l'utilisation de template variables issues des monitors qui composent un monitor composite dans vos notifications, consultez la documentation relative aux [variables des monitors composite][4]. Pour obtenir des instructions détaillées concernant les sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

### API

Avec l'API, la requête d'un monitor composite est définie en fonction de ses sous-monitors, grâce aux ID de monitor.

Imaginons que deux monitors non composite possèdent les requêtes et ID suivants :

```text
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # Monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # Monitor ID: 5678
```

La requête du monitor composite regroupant ces monitors peut correspondre à `"1234 && 5678"`, `"!1234 || 5678"`, etc.

## Fonctionnement des monitors composite

Cette section repose sur des exemples pour expliquer le processus de calcul des conditions de déclenchement ainsi que pour illustrer le nombre d'alertes reçues selon différents scénarios.

### Calcul des conditions de déclenchement

Un monitor composite peut avoir quatre statuts différents. Trois d'entre eux entraînent l'envoi d'alertes :

| Statut    | Envoi d'alertes         |Gravité           |
|-----------|----------------------|-------------------|
| `Alert`   | Oui                 |4 (le plus grave)    |
| `Warn`    | Oui                 |3                  |
| `No Data` | Oui                 |2                  |
| `OK`      | Non                |1 (le moins grave)   |

Les opérateurs booléens disponibles (`&&`, `||` et `!`) s'appliquent à l'envoi potentiel d'alertes pour un statut particulier du monitor composite.

* Si `A && B` implique l'envoi d'alertes, le résultat obtenu correspond au statut le **moins** grave des monitors A et B.
* Si `A || B` entraîne l'envoi d'alertes, le résultat obtenu correspond au statut le **plus** grave des monitors A et B.
* Si le monitor `A` possède le statut `No Data`, `!A` génère le statut `No Data`.
* Si le monitor `A` entraîne l'envoi d'alertes, `!A` génère le statut `OK`.
* Si le monitor `A` n'entraîne pas l'envoi d'alertes, `!A` génère le statut `Alert`.

Prenons pour exemple un monitor composite qui utilise deux monitors individuels : `A` et `B`. Le tableau suivant illustre le statut du monitor composite obtenu en fonction de la condition de déclenchement (`&&` ou `||`) et des différents statuts de ses monitors individuels. Les scénarios générant des alertes sont indiqués par T (true) ou F (false) :

| Monitor A   | Monitor B   | Condition   | Notify No Data   | Statut du monitor composite | Alerte déclenchée ? |
|-------------|-------------|-------------|------------------|------------------|------------------|
| Alert (T)   | Warn (T)    | `A && B`    |                  | Warn (T)         | {{< X >}}        |
| Alert (T)   | Warn (T)    | `A \|\| B`  |                  | Alert (T)        | {{< X >}}        |
| Alert (T)   | OK (F)      | `A && B`    |                  | OK (F)           |                  |
| Alert (T)   | OK (F)      | `A \|\| B`  |                  | Alert (T)        | {{< X >}}        |
| Warn (T)    | OK (F)      | `A && B`    |                  | OK (F)           |                  |
| Warn (T)    | OK (F)      | `A \|\| B`  |                  | Warn (T)         | {{< X >}}        |
| No Data (T) | Warn (T)    | `A && B`    | Oui             | No Data (T)      | {{< X >}}        |
| No Data (T) | Warn (T)    | `A \|\| B`  | Oui             | Warn (T)         | {{< X >}}        |
| No Data (T) | Warn (T)    | `A && B`    | Non            | Dernier statut connu       |                  |
| No Data (T) | Warn (T)    | `A \|\| B`  | Non            | Warn (T)         | {{< X >}}        |
| No Data (T) | OK (F)      | `A && B`    | Non            | OK (F)           |                  |
| No Data (T) | OK (F)      | `A \|\| B`  | Non            | Dernier statut connu       |                  |
| No Data (T) | OK (F)      | `A && B`    | Oui             | OK (F)           |                  |
| No Data (T) | OK (F)      | `A \|\| B`  | Oui             | No Data (T)      | {{< X >}}        |
| No Data (T) | No Data (T) | `A && B`    | Oui             | No Data (T)      | {{< X >}}        |
| No Data (T) | No Data (T) | `A \|\| B`  | Oui             | No Data (T)      | {{< X >}}        |

**Remarque** : lorsque le paramètre `notify_no_data` d'un monitor composite est défini sur false, et que l'évaluation des sous-monitors devrait entraîner un statut `No Data` pour le monitor composite, ce dernier prend alors le dernier statut connu.

### Composites et downtimes

Un monitor composite et ses monitors individuels sont mutuellement indépendants.

#### Downtime sur un monitor composite

Imaginons un monitor composite `C` composé de deux monitors individuels avec la condition `A || B`. La création d'un downtime sur le monitor composite aura pour effet de supprimer uniquement les notifications de `C`.

Si le monitor `A` ou le monitor `B` envoie des notifications à des services ou des équipes dans leurs configurations de monitor respectives, le downtime sur le composite `C` ne désactive aucune notification provoquée par `A` ou `B`. Pour désactiver les notifications de `A` ou de `B`, configurez un downtime sur ces monitors.

#### Downtime sur un monitor individuel faisant partie d'un monitor composite

La création d'un downtime sur un monitor individuel `A` faisant partie d'un monitor composite ne désactive pas le monitor composite.

Par exemple, supposons qu'un downtime désactive le monitor `A`, et plus précisément son groupe `env:staging`. Lorsque le groupe `env:staging` atteint un état nécessitant l'envoi d'une alerte, la notification provenant du monitor individuel est désactivée, mais le monitor composite envoie tout de même une notification d'alerte.

### Nombre d'alertes

Le nombre d'alertes reçues dépend du type d'alerte du monitor individuel.
Si tous les monitors individuels envoient des alertes simples, le monitor composite adopte lui aussi un système d'alerte simple. Il envoie une seule notification lorsque les requêtes des monitors `A` et `B` possèdent simultanément la valeur `true`.

Si un ou plusieurs des monitors sont caractérisés par des alertes multiples, le monitor composite est également à alertes multiples. Le _nombre_ d'alertes envoyées simultanément dépend du nombre de monitors individuels à alertes multiples du monitor composite.


### Sources de transmission communes

Les monitors composite qui utilisent de nombreux monitors à alertes multiples prennent seulement en considération les *sources de transmissions communes* des monitors individuels.

**Exemple de monitors à alertes multiples**

Imaginons que les monitors `A` and `B` sont des monitors à alertes multiples et qu'ils sont regroupés par host.

* Les hosts `host:web01` à `host:web05` transmettent des données au monitor `A`.
* Les hosts `host:web04` à `host:web09` transmettent des données au monitor `B`.

Le monitor composite tient _uniquement_ compte des sources communes, à savoir `web04` et `web05`. Un cycle d'évaluation peut donc entraîner au maximum l'envoi de deux alertes.

**Valeur de groupes communs avec différents noms de groupes**

Les monitors composite analysent uniquement les *valeurs* des tags (`web04`) et non les *clés* des tags (`host`).
Si nous ajoutons à cet exemple un monitor `C` à alertes multiples regroupé selon `service`, avec une seule source de transmission `service:web04`, `web04` est la seule source de transmission commune entre `A`, `B` et `C`. Le monitor composite prend donc en considération cette unique source.

**Groupe de monitors basés sur plusieurs dimensions**

Lorsqu'un monitor à alertes multiples est réparti selon plusieurs tags, un groupe de monitors correspond à la combinaison entière de tags.
Par exemple, si le monitor `1` est un monitor à alertes multiples regroupé selon `device,host` et le monitor `2` un monitor à alertes multiples regroupé selon `host`, un monitor composite peut combiner les monitors `1` et `2`.

{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="rédaction de notification" style="width:80%;">}}

Cependant, s'il existe un monitor `3` à alertes multiples regroupé selon `host,url`, les monitors `1` et `3` ne peuvent pas générer de résultat pour un monitor composite, car leur regroupement diverge trop.
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="rédaction de notification" style="width:80%;">}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/composite
[2]: /fr/monitors/configuration/#advanced-alert-conditions
[3]: /fr/monitors/notify/
[4]: /fr/monitors/notify/variables/?tab=is_alert#composite-monitor-variables