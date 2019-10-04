---
title: Monitor composite
kind: documentation
aliases:
  - /fr/guides/composite_monitors
description: Alerte sur une expression combinant plusieurs monitors
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: monitors/downtimes
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: monitors/monitor_status
    tag: Documentation
    text: Consulter le statut de votre monitor
---
Un monitor composite rassemble plusieurs monitors individuels afin de définir des conditions d'alertes plus spécifiques.

Pour créer un monitor composite, commencez par choisir des monitors existants, par exemple un monitor A et un monitor B. Définissez ensuite une condition de déclenchement à l'aide d'opérateurs booléens (p. ex., « A && B »). Le monitor composite se déclenche alors lorsque les statuts des monitors individuels vérifient tous les deux la condition de déclenchement du monitor composite.

La configuration d'un monitor composite ne dépend pas des monitors qui le composent. Sa stratégie de notification peut être modifiée sans altérer celle des monitors individuels, et vice versa. De même, la suppression d'un monitor composite n'entraîne pas la suppression des monitors qui le composent. Un monitor composite ne possède pas d'autres monitors, il se contente d'utiliser leurs résultats. En outre, plusieurs monitors composite peuvent utiliser un même monitor individuel.

_Remarque : cette documentation utilise régulièrement les termes « monitors individuels », « monitors qui le composent » ou encore « monitors non composite ». Ils désignent tous le même concept, à savoir les monitors utilisés par un monitor composite pour calculer son statut._

## Créer un monitor composite

Depuis l'application Datadog, accédez à la page [**New Monitor**][1] et choisissez **Composite** parmi la liste des types de monitors disponibles 

{{< img src="monitors/monitor_types/composite/select-monitor-type.png" alt="sélection du type de monitor" responsive="true" >}}

### Choisir des monitors individuels

Choisissez jusqu'à 10 monitors individuels qui seront utilisés par votre nouveau monitor composite. Les monitors peuvent être caractérisés par différents types d'alertes : ils peuvent tous être dotés d'alertes simples, d'alertes multiples ou d'un mélange des deux. Aucun monitor individuel ne peut être un monitor composite.

Une fois votre premier monitor sélectionné, l'IU affiche son type d'alerte et son statut actuel :

{{< img src="monitors/monitor_types/composite/create-composite-2.png" alt="création de composite 2" responsive="true" style="width:80%;">}}

Si vous choisissez un monitor à alertes multiples, l'IU affiche sa condition de regroupement (p. ex., `host`) ainsi que le nombre de sources uniques (ici, le nombre de hosts) pour lesquelles il envoie des données. Lorsque vous combinez plusieurs monitors à alertes multiples, ces informations vous aident à choisir des monitors dont l'utilisation conjointe est pertinente. Il est presque toujours recommandé d'utiliser des monitors avec le même critère de regroupement. Le cas contraire, l'IU vous informe qu'il se peut que votre monitor composite ne se déclenche jamais :

{{< img src="monitors/monitor_types/composite/create-composite-4.png" alt="création de composite 4" responsive="true" style="width:80%;">}}

Même si vous choisissez plusieurs monitors à alertes multiples possédant le même critère de regroupement, l'IU peut afficher un avertissement concernant votre sélection. Dans l'exemple suivant, les deux monitors sont regroupés selon `host` :

{{< img src="monitors/monitor_types/composite/create-composite-5.png" alt="création de composite 5" responsive="true" style="width:80%;">}}

Étant donné que l'IU affiche l'erreur « Group Matching » malgré un critère de regroupement identique, nous pouvons en déduire que ces monitors ne partagent actuellement aucune source de transmission (ou regroupement commun). En l'absence de source de transmission commune, Datadog ne peut pas calculer le statut d'un monitor composite, et celui-ci ne se déclenche jamais. Cependant, vous _pouvez_ choisir d'ignorer l'avertissement et de créer le monitor. Pour mieux comprendre ce qui justifie une telle création, [lisez la section ci-dessous](#selection-des-sources-de-transmission-communes-par-les-monitors-composite).

Lorsque vous sélectionnez un deuxième monitor qui n'entraîne pas d'avertissement de la part de l'IU, celle-ci remplit le champ **Trigger when** en indiquant la condition de déclenchement par défaut `a && b` et affiche le statut du monitor composite proposé :

{{< img src="monitors/monitor_types/composite/create-composite-3.png" alt="création de composite 3"  responsive="true" style="width:80%;">}}

### Définir une condition de déclenchement

Dans le champ **Trigger when**, rédigez la condition de déclenchement de votre choix à l'aide d'opérateurs booléens. Désignez les monitors individuels par leur étiquette dans le formulaire (a, b, c, etc.). Utilisez des parenthèses pour contrôler la précédence des opérateurs et créer des conditions plus complexes.

Toutes les conditions de déclenchement suivantes sont valides :

```
!(a && b)
a || b && !c
(a || b) && (c || d)
```

En dehors des formulaires de création et de modification d'un monitor composite, les monitors individuels sont désignés par leur ID numérique :

{{< img src="monitors/monitor_types/composite/composite-status.png" alt="statut composite" responsive="true" style="width:80%;">}}

Dans l'API, la condition de déclenchement d'un monitor composite correspond à sa requête. La requête d'un monitor non composite peut rassembler de nombreux concepts : métrique, tags, fonction d'agrégation telle que `avg`, condition de regroupement, etc. À l'inverse, la requête d'un monitor composite correspond à sa condition de déclenchement, définie par les monitors qui le composent.

Si l'on considère deux monitors non composite avec les requêtes suivantes :

```
"avg(last_1m):avg:system.mem.free{role:database} < 2147483648" ID de monitor : 1234
"avg(last_1m):avg:system.cpu.system{role:database} > 50" # ID de monitor : 5678
```

la requête du monitor composite associé est : `"1234 && 5678"`, `"!1234 || 5678"`, etc.

### Configurer le comportement pour `No Data`

Comme pour un monitor non composite, vous pouvez choisir si un monitor composite se déclenche lorsqu'il affiche le statut `No Data`. Ce réglage n'a aucune influence sur les paramètres `notify_no_data` des monitors qui le composent.

### Rédiger un message de notification

Comme pour les monitors standard, vous pouvez rédiger un message de notification à l'aide de la syntaxe `@` (p. ex., `@vous@exemple.com`) pour avertir des personnes ou des équipes :

{{< img src="monitors/monitor_types/composite/writing-notification.png" alt="rédaction de notification" responsive="true" style="width:80%;">}}

Si vous ajoutez des template variables, telles que `{{a.value}}` et `{{b.value}}` au message du monitor, cela affiche les valeurs de chaque monitor :


### Enregistrer le monitor

Après avoir défini les autres options diverses, cliquez sur **Save**. N'oubliez pas : chaque option sélectionnée ne concerne que le monitor composite, et non les monitors qui le composent.

## Fonctionnement des monitors composite

Cette section repose sur des exemples pour expliquer le processus de calcul des conditions de déclenchement ainsi que pour illustrer le nombre d'alertes reçues selon différents scénarios.

### Calcul des conditions de déclenchement

Le calcul de `A && B && C` par Datadog suit les conventions. Cependant, quels sont les statuts de monitor qui sont considérés comme « true » ou « false » ?

Pour rappel, voici les six statuts qu'un monitor peut avoir (par ordre de gravité) :

* `Ok`
* `Warn`
* `Alert`
* `Skipped`
* `No Data`
* `Unknown`

Les monitors composite considèrent que les statuts `Unknown`, `Warn` et `Alert` doivent générer des alertes (true). Les autres, à savoir `Ok`, `Skipped` et `No Data`, n'en génèrent aucune (false). Cependant, vous pouvez configurer le monitor de façon à ce que le statut `No Data` génère des alertes. Pour ce faire, définissez `notify_no_data` sur true.

Lorsqu'un monitor composite estime qu'il doit envoyer des alertes, il hérite du statut le plus grave de ses monitors individuels et déclenche une alerte. S'il considère qu'aucune alerte ne doit être envoyée, il hérite du statut le _moins_ grave.
Lorsqu'il est appliqué à un statut de monitor composite ou individuel, l'opérateur de négation (« ! ») entraîne un statut `Ok`, `Alert` ou `No Data`. En effet, si un monitor A possède un statut générant des alertes, `!A` entraîne le statut `OK`. S'il possède un statut ne générant **pas** d'alerte, `!A` entraîne le statut `Alert`. Enfin, s'il possède le statut `No Data`, `!A` ne modifie pas le statut, qui reste `No Data`.

Prenons pour exemple un monitor composite qui utilise trois monitors individuels (A, B et C) et la condition de déclenchement `A && B && C`. Le tableau suivant illustre le statut du monitor composite en fonction des différents statuts de ses monitors individuels. Les scénarios générant des alertes sont indiqués par T (true) ou F (false) :

| monitor A   | monitor B  | monitor C  | statut du monitor composite        | alerte déclenchée ? |
|-------------|------------|------------|-------------------------|-------------------------|
| Unknown (T) | Warn (T)   | Unknown (T)| Warn (T)                |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | Ok (F)     | Unknown (T)| Ok (F)                  |
| Alert (T)   | Warn (T)   | Unknown (T)| Alert (T)               |<i class="fa fa-check" aria-hidden="true"></i>
| Skipped (F) | No Data (F)| Unknown (T)| Skipped (F)             |

Deux des quatre scénarios déclenchent une alerte, même si les monitors individuels ne possèdent pas tous le statut le plus grave, à savoir `Alert` (pour le premier exemple, aucun des monitors individuels n'affiche ce statut). Cependant, _combien_ d'alertes seront envoyées par le monitor composite ? Cela dépend des types d'alertes des monitors individuels.

### Détermination du statut d'un monitor individuel

Au lieu d'échantillonner régulièrement le statut actuel des monitors individuels, les monitors composite sont évalués à partir des résultats glissants de chaque monitor qui les compose. En effet, ils reposent sur le statut le plus grave de chaque monitor dans un délai de 5 minutes. Par exemple, pour un monitor composite défini par `A && B`, imaginons que les statuts des monitors qui le composent correspondent à ce qui suit (une minute d'intervalle sépare les timestamps) :

|   | T0    | T1    | T2    |
|---|-------|-------|-------|
| A | Alert | OK    | OK    |
| B | OK    | Alert | Alert |

Le monitor composite se déclenche à T1, même si le monitor `A` possède techniquement un statut `OK`.

Ce comportement s'explique par le fait qu'il est étonnamment difficile de définir le concept de simultanéité pour les systèmes d'alerte. Les programmes d'évaluation des monitors peuvent différer. De plus, en raison d'une éventuelle latence des métriques, il est possible que deux événements susceptibles d'être simultanés ne se réalisent pas au même moment une fois les monitors évalués. Un simple échantillonnage du statut actuel entraînerait certainement le non-déclenchement de plusieurs alertes pour le monitor composite.

Ainsi, la résolution des monitors peut s'effectuer plusieurs minutes après celles des monitors qui le composent.

### Nombres d'alertes envoyées

Si tous les monitors individuels envoient des alertes simples, le monitor composite adopte lui aussi un système d'alerte simple. Il envoie une seule notification lorsque les requêtes des monitors A, B et C se vérifient simultanément.

Si un ou plusieurs des monitors sont caractérisés par des alertes multiples, le monitor composite est également à alertes multiples. Le _nombre_ d'alertes envoyées simultanément dépend du nombre de monitors individuels à alertes multiples du monitor composite.

#### Un monitor à alertes multiples

Mettons que le monitor A soit caractérisé par des alertes multiples et regroupé selon `host`. Si le monitor possède quatre sources de transmission (les hosts web01 à web04), chaque fois que Datadog évalue le monitor composite, vous pouvez recevoir jusqu'à quatre alertes. En d'autres termes, pour chaque cycle d'évaluation, Datadog considère quatre situations. Pour chaque situation, le statut du monitor A peut varier selon ses sources, mais les statuts des monitors B et C (à alertes simples) n'évoluent pas.

Le tableau précédent indiquait le statut du monitor composite pour quatre occurrences. À l'inverse, dans cet exemple, le tableau indique le statut de chaque situation à alertes multiples, pour une seule occurrence :

{{% table responsive="true" %}}

|source | monitor A    | monitor B| monitor C | statut du monitor composite (A && B && C) | alerte déclenchée ? |
|-------|--------------|----------|-----------|--------------------------------|-------------------------|
| web01 | Alert        | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web02 | Ok           | Warn     | Alert     | Ok                             |
| web03 | Warn         | Warn     | Alert     | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>|
| web04 | Skipped      | Warn     | Alert     | Skipped                        |
{{% /table %}}

Pour ce cycle, deux alertes sont envoyées.

#### Plusieurs monitors à alertes multiples

Imaginons maintenant que le monitor B soit également à alertes multiples et regroupé selon host. Chaque cycle peut entraîner l'envoi d'un nombre d'alertes pouvant atteindre le nombre de sources de transmission communes entre les monitors A et B. Si les sources web01 à web05 transmettent des données pour le monitor A, et les sources web04 à web09 pour le monitor B, le monitor composite prend _uniquement_ en compte les sources communes, à savoir web04 et web05. Chaque cycle d'évaluation peut donc générer un maximum de deux alertes.

Voici un exemple de cycle :

|source | monitor A | monitor B | monitor C  | statut du monitor composite (A && B && C) |alerte déclenchée ?|
|-------|-----------|-----------|------------|--------------------------------|----------------|
| web04 | Unknown   | Warn      | Alert      | Alert                          |<i class="fa fa-check" aria-hidden="true"></i>
| web05 | Ok        | Ok        | Alert      | Ok                             |

Pour ce cycle, une alerte est envoyée.

### Sélection de sources de transmission communes par les monitors composite

Comme nous l'avons expliqué plus tôt, les monitors composite qui reposent sur des monitors à alertes multiples prennent uniquement en compte les *sources de transmission communes* des monitors individuels.
Dans l'exemple ci-dessous, il s'agit des sources `host:web04` et `host:web05`. Il convient de noter que les monitors composite analysent uniquement les *valeurs* des tags (p. ex., `web04`) et non les *noms* des tags (p. ex., `host`).
Si nous ajoutons à cet exemple un monitor `D` à alertes multiples regroupé selon `environment`, et si ce monitor possède une seule source de transmission, `environment:web04`, `web04` est la seule source de transmission commune entre `A`, `B`, et `D`. Le monitor composite prend donc en considération cette unique source et calcule sa condition de déclenchement.

Un monitor composite peut être créé à partir de monitors à alertes multiples qui ne possèdent aucune valeur de tag en commun, mais qui sont regroupés selon un même nom de tag. En effet, les noms de tags communs peuvent constituer une éventuelle source de transmission commune. Il est possible qu'au fil du temps, certaines de leurs valeurs correspondent. Cela explique pourquoi, dans l'exemple ci-dessus, les sources de transmission communes sont `host:web04` et `host:web05`.

Les valeurs des monitors regroupés selon différents tags, comme `web04` et `web05` pour le monitor `A` et `dev` et `prod` pour le monitor `D`, se recoupent rarement. Si c'est néanmoins le cas, un monitor composite les utilisant peut déclencher une alerte.

En cas d'alertes multiples divisées par plusieurs tags (p. ex., une alerte par `host, instance, url`), un groupe de monitors correspond à la combinaison entière de tags.

Par exemple, si le monitor 1 est un monitor à alerte multiples regroupé selon `device,host` et le monitor 2 un monitor à alertes multiples regroupé selon `host`, un monitor composite peut combiner les monitors 1 et 2 :
{{< img src="monitors/monitor_types/composite/multi-alert-1.png" alt="rédaction de notification" responsive="true" style="width:80%;">}}

Cependant, s'il existe un monitor 3 à alertes multiples regroupé selon `host,url`, les monitors 1 et 3 ne peuvent pas déclencher de monitor composite, car leur regroupement diverge trop.
{{< img src="monitors/monitor_types/composite/multi-alert-2.png" alt="rédaction de notification" responsive="true" style="width:80%;">}}

Faites preuve de bon sens lors de la sélection des monitors à alertes multiples afin de choisir un ensemble de monitors qui est pertinent.

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create
