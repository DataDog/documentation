---
title: Monitor composite
kind: documentation
aliases:
  - /fr/guides/composite_monitors
description: Alerte sur une expression combinant plusieurs monitors
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Vérifier le statut de votre monitor
---
## Présentation

Un monitor composite rassemble plusieurs monitors individuels afin de définir des conditions d'alertes plus spécifiques.

Pour créer un monitor composite, commencez par choisir des monitors existants, par exemple un monitor `A` et un monitor `B`. Définissez ensuite une condition de déclenchement à l'aide d'opérateurs booléens, p. ex. `A && B`. Le monitor composite se déclenche alors lorsque les valeurs des monitors individuels vérifient toutes les deux la condition de déclenchement du monitor composite.

Pour des raisons de configuration, un monitor composite ne dépend pas des monitors qui le composent. Sa stratégie de notification peut être modifiée sans altérer celle des monitors individuels, et vice versa. De même, la suppression d'un monitor composite n'entraîne pas la suppression des monitors qui le composent. Un monitor composite ne possède pas d'autres monitors, il se contente d'utiliser leurs résultats. En outre, plusieurs monitors composite peuvent utiliser un même monitor individuel.

**Remarques**

- Les termes `monitors individuels`, `monitors qui le composent` et `monitors non composite` désignent tous des monitors utilisés par un monitor composite pour calculer son statut.
- Pour obtenir un résultat composite, il est nécessaire d'effectuer des regroupements communs. Si vous choisissez des monitors qui ne partagent pas de tels regroupements, les monitors sélectionnés dans l'expression peuvent ne pas générer de résultat composite.
- Les monitors composite ne peuvent pas se baser sur d'autres monitors composite.

## Création d'un monitor

Pour créer un [monitor composite][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Composite*.

### Sélectionner des monitors et définir des conditions de déclenchement

#### Sélectionner des monitors

Choisissez jusqu'à 10 monitors individuels qui seront utilisés par le monitor composite. Les monitors peuvent être caractérisés par différents types d'alertes (alertes simples, alertes multiples ou mélange des deux). Aucun monitor individuel ne peut être un monitor composite. Une fois votre premier monitor sélectionné, l'IU affiche son type d'alerte et son statut actuel :

Si vous choisissez un monitor à alertes multiples, l'IU affiche la condition de regroupement et le nombre de sources uniques pour lesquelles il envoie des données. Par exemple, `Returns 5 host groups`. Lorsque vous combinez plusieurs monitors à alertes multiples, ces informations vous aident à choisir des monitors dont l'utilisation conjointe est pertinente.

Utilisez des monitors avec les mêmes groupes. Le cas contraire, l'IU vous informe qu'il se peut que votre monitor composite ne se déclenche jamais :

```text
Group Matching Error
Il se peut que les monitors sélectionnés dans l'expression ne génèrent pas de résultat composite, car ils n'évaluent pas de regroupements communs ou possèdent moins de deux monitors sélectionnés.
```

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

#### No data

Choisissez les options `Do not notify` (Ne pas prévenir) ou `Notify` (Prévenir) pour les situations où le monitor composite ne reçoit aucune donnée. L'option choisit ne modifie pas les paramètres `Notify no data` (Prévenir en cas d'absence de données) des monitors individuels. Cependant, pour qu'un monitor composite envoie une alerte en l'absence de données, les monitors individuels et le monitor composite doivent être définis sur `Notify`.

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][2].

## API

Lorsque vous utilisez l'API, la requête d'un monitor non composite peut rassembler une métrique, des tags, une fonction d'agrégation telle que `avg`, une condition de regroupement, etc. À l'inverse, la requête d'un monitor composite est définie par les caractéristiques des monitors qui le composent via leur ID.

Imaginons que deux monitors non composite possèdent les requêtes et ID suivants :
```text
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" # Monitor ID: 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # Monitor ID: 5678
```

La requête du monitor composite regroupant ces monitors peut correspondre à `"1234 && 5678"`, `"!1234 || 5678"`, etc.

## Fonctionnement des monitors composite

Cette section repose sur des exemples pour expliquer le processus de calcul des conditions de déclenchement ainsi que pour illustrer le nombre d'alertes reçues selon différents scénarios.

### Calcul des conditions de déclenchement

Le calcul de `A && B && C` par Datadog suit les conventions. Cependant, quels sont les statuts de monitor qui entraînent l'envoi d'alertes ? Un monitor composite tient compte de six différents statuts :

| Status    | Envoi d'alertes                             |
|-----------|------------------------------------------|
| `Ok`      | False                                    |
| `Warn`    | True                                     |
| `Alert`   | True                                     |
| `Skipped` | False                                    |
| `No Data` | Non (oui si `notify_no_data` est true) |
| `Unknown` | True                                     |

Lorsqu'un monitor composite estime qu'il doit envoyer des alertes, il hérite du statut le plus grave de ses monitors individuels et déclenche une alerte. S'il considère qu'aucune alerte ne doit être envoyée, il hérite du statut le _moins_ grave.

Lorsqu'il est appliqué à un statut de monitor composite ou individuel, l'opérateur de négation (`!`) entraîne un statut `Ok`, `Alert` ou `No Data`. En effet, si un monitor `A` possède un statut générant des alertes, `!A` entraîne le statut `OK`. S'il possède un statut ne générant **pas** d'alerte, `!A` entraîne le statut `Alert`. Enfin, s'il possède le statut `No Data`, `!A` ne modifie pas le statut, qui reste `No Data`.

Prenons pour exemple un monitor composite qui utilise trois monitors individuels (`A`, `B` et `C`) et la condition de déclenchement `A && B && C`. Le tableau suivant illustre le statut du monitor composite en fonction des différents statuts de ses monitors individuels. Les scénarios générant des alertes sont indiqués par T (true) ou F (false) :

| Monitor A   | Monitor B   | Monitor C   | Statut du monitor composite | Alerte déclenchée ? |
|-------------|-------------|-------------|------------------|------------------|
| Unknown (T) | Warn (T)    | Unknown (T) | Warn (T)         | {{< X >}}        |
| Skipped (F) | Ok (F)      | Unknown (T) | Ok (F)           |                  |
| Alert (T)   | Warn (T)    | Unknown (T) | Alert (T)        | {{< X >}}        |
| Skipped (F) | No Data (F) | Unknown (T) | Skipped (F)      |                  |

Deux des quatre scénarios déclenchent une alerte, même si les monitors individuels ne possèdent pas tous le statut le plus grave, à savoir `Alert`.

### Statut des monitors composite

Les monitors composite sont évalués à partir des résultats glissants de chaque monitor qui les compose. En effet, **ils reposent sur le statut le plus grave de chaque monitor lors des cinq dernières minutes**. Par exemple, pour un monitor composite défini par `A && B`, imaginons que les statuts des monitors qui le composent correspondent aux valeurs ci-dessous (une minute d'intervalle sépare les timestamps). Le monitor composite se déclenche à T1, même si `A` possède techniquement l'état `OK`.

| Monitor | T0    | T1    | T2    |
|---------|-------|-------|-------|
| A       | Alert | OK    | OK    |
| B       | OK    | Alert | Alert |

Ce comportement s'explique par le fait qu'il est étonnamment difficile de définir le concept de simultanéité pour les systèmes d'alerte. Les programmes d'évaluation des monitors peuvent différer. De plus, en raison d'une éventuelle latence des métriques, il est possible que deux événements susceptibles d'être simultanés ne se réalisent pas au même moment une fois les monitors évalués. Un simple échantillonnage de l'état actuel entraînerait certainement le non-déclenchement de plusieurs alertes pour le monitor composite.

Ainsi, la résolution des monitors peut s'effectuer plusieurs minutes après celles des monitors qui le composent.

### Nombre d'alertes

Le nombre d'alertes reçues dépend du type d'alerte du monitor individuel. Si tous les monitors individuels envoient des alertes simples, le monitor composite adopte lui aussi un système d'alerte simple. Il envoie une seule notification lorsque les requêtes des monitors `A`, `B` et `C` possèdent toutes la valeur `true` à la fois.

Si un ou plusieurs des monitors sont caractérisés par des alertes multiples, le monitor composite est également à alertes multiples. Le _nombre_ d'alertes envoyées simultanément dépend du nombre de monitors individuels à alertes multiples du monitor composite.

#### Un monitor à alertes multiples

Mettons que le monitor `A` soit caractérisé par des alertes multiples et regroupé selon `host`. Si le monitor possède quatre sources de transmission (les hosts `web01` à `web04`), chaque fois que Datadog évalue le monitor composite, vous pouvez recevoir jusqu'à quatre alertes. En d'autres termes, pour chaque cycle d'évaluation, Datadog considère quatre situations. Pour chaque situation, le statut du monitor `A` peut varier selon ses sources, mais les statuts des monitors `B` et `C` (à alertes simples) n'évoluent pas.

Le tableau ci-dessous indique le statut de chaque scénario d'alertes multiples à un moment « t » pour le monitor composite `A && B && C` :

| Source | Monitor A | Monitor B | Monitor C | Statut du monitor composite | Alerte déclenchée ? |
|--------|-----------|-----------|-----------|------------------|------------------|
| web01  | Alert     | Warn      | Alert     | Alert            | {{< X >}}        |
| web02  | Ok        | Warn      | Alert     | Ok               |                  |
| web03  | Warn      | Warn      | Alert     | Alert            | {{< X >}}        |
| web04  | Skipped   | Warn      | Alert     | Skipped          |                  |

#### Plusieurs monitors à alertes multiples

Imaginons maintenant que les monitors `A` et `B` soient à alertes multiples et regroupés par host. Chaque cycle peut entraîner l'envoi d'un nombre d'alertes pouvant atteindre le nombre de sources de transmission communes entre les monitors `A` et `B`. Si les sources `web01` à `web05` transmettent des données pour le monitor `A`, et les sources `web04` à `web09` pour le monitor `B`, le monitor composite prend _uniquement_ en compte les sources communes, à savoir `web04` et `web05`. Chaque cycle d'évaluation peut donc générer un maximum de deux alertes.

Voici un exemple de cycle pour le monitor composite `A && B && C` :

| Source | Monitor A | Monitor B | Monitor C | Statut du monitor composite | Alerte déclenchée ? |
|--------|-----------|-----------|-----------|------------------|------------------|
| web04  | Unknown   | Warn      | Alert     | Alert            | {{< X >}}        |
| web05  | Ok        | Ok        | Alert     | Ok               |                  |

### Sources de transmission communes

Les monitors composite qui utilisent de nombreux monitors à alertes multiples prennent seulement en considération les *sources de transmissions communes* des monitors individuels. Dans l'exemple ci-dessus, `host:web04` et `host:web05` sont les sources communes.

Les monitors composite analysent uniquement les *valeurs* des tags (`web04`) et non les *clés* des tags (`host`). Si nous ajoutons à cet exemple un monitor `D` à alertes multiples regroupé selon `environment`, avec une seule source de transmission `environment:web04`, `web04` est la seule source de transmission commune entre `A`, `B` et `D`. Le monitor composite prend donc en considération cette unique source.

Un monitor composite peut être créé à partir de monitors à alertes multiples qui ne possèdent aucune valeur de tag en commun, mais qui sont regroupés selon un même nom de tag. En effet, les noms de tags communs peuvent constituer une éventuelle source de transmission commune. Il est possible qu'au fil du temps, certaines de leurs valeurs correspondent. Cela explique pourquoi, dans l'exemple ci-dessus, les sources de transmission communes sont `host:web04` et `host:web05`.

Les valeurs des monitors regroupés selon différents tags, comme `web04` et `web05` pour le monitor `A` et `dev` et `prod` pour le monitor `D`, se recoupent rarement. Si c'est néanmoins le cas, un monitor composite les utilisant peut déclencher une alerte.

En cas de monitor à alertes multiples divisé par plusieurs tags, un groupe de monitors correspond à la combinaison entière de tags. Par exemple, si le monitor `1` est un monitor à alertes multiples regroupé selon `device,host` et le monitor `2` un monitor à alertes multiples regroupé selon `host`, un monitor composite peut combiner les monitors `1` et `2` :

{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="rédaction de notification" style="width:80%;">}}

Cependant, s'il existe un monitor `3` à alertes multiples regroupé selon `host,url`, les monitors `1` et `3` ne peuvent pas générer de résultat pour un monitor composite, car leur regroupement diverge trop.
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="rédaction de notification" style="width:80%;">}}

Faites preuve de bon sens lors de la sélection des monitors à alertes multiples afin de choisir un ensemble de monitors qui est pertinent.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/composite
[2]: /fr/monitors/notifications/