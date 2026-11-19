---
aliases:
- /fr/monitors/monitor_types/log
- /fr/monitors/create/types/log/
description: Surveillez les logs indexés pour détecter les menaces de sécurité, résoudre
  les problèmes et vous alerter lorsque les modèles de logs dépassent les seuils définis.
further_reading:
- link: /logs/
  tag: Documentation
  text: Présentation de Log Management
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Vérifier le statut de votre monitor
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilisez des requêtes en notation CIDR pour filtrer vos logs de trafic réseau
- link: https://learn.datadoghq.com/courses/log-investigations
  tag: Centre d'apprentissage
  text: Suivez les logs pour les alertes et les enquêtes
title: Monitor de logs
---
## Présentation {#overview}

Les logs sont essentiels pour les enquêtes de sécurité, car ils facilitent la détection des menaces, le suivi de la conformité et la surveillance de la sécurité. Les systèmes de Log Management corrèlent les logs avec les données d'observabilité pour une détection rapide de la cause racine. Le Log Management permet également un dépannage efficace, la résolution des problèmes et les audits de sécurité.

Une fois que le [Log Management est activé][1] pour votre organisation, vous pouvez créer un monitor de logs pour vous alerter lorsqu'un type de log spécifié dépasse un seuil défini par l'utilisateur sur une période donnée. Le monitor de logs évalue uniquement les [logs indexés][2].

**Remarque** : les monitors de logs ont une fenêtre temporelle glissante maximale de `2 days`.

## Création de monitor {#monitor-creation}

Pour créer un monitor de logs dans Datadog, utilisez la navigation principale : [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Logs{{< /ui >}}][3].

<div class="alert alert-info">Il existe une limite par défaut de 1 000 monitors de logs par compte. Si vous atteignez cette limite, envisagez d'utiliser des <a href="/monitors/configuration/?tab=thresholdalert#alert-grouping">multi alerts</a> ou de sélectionner <a href="/help/">Contact Support</a>.</div>

### Définissez la requête de recherche {#define-the-search-query}

À mesure que vous définissez la requête de recherche, le graphique au-dessus des champs de recherche se met à jour.

1. Construisez une requête de recherche en utilisant la même logique qu'une [recherche dans le Log Explorer][4]. Notez que les [logs Flex Tier][10], qui peuvent être affichés dans le Log Explorer, ne sont pas pris en charge pour les monitors. Seuls les logs Standard Tier sont pris en charge.
2. Choisissez de surveiller un nombre de logs, une [facette][5], un attribut ou une [mesure][6] :
    * {{< ui >}}Monitor over a log count{{< /ui >}} : Utilisez la barre de recherche (facultatif) et ne sélectionnez **pas** d'attribut ou de mesure. Datadog évalue le nombre de logs sur une période sélectionnée, puis le compare aux conditions de seuil.
    * {{< ui >}}Monitor over a facet or an attribute{{< /ui >}} : Si un attribut est sélectionné, le monitor envoie des alertes sur le {{< ui >}}Unique value count{{< /ui >}} de l'attribut. Par exemple, si vous avez un attribut tel que `user.email`, le nombre de valeurs uniques correspond au nombre d'adresses e-mail d'utilisateurs uniques. Tout attribut peut être utilisé dans un monitor, mais seules les facettes sont affichées dans l'autocomplétion.
    * {{< ui >}}Monitor over measure{{< /ui >}} : Si une [mesure][6] est sélectionnée, le monitor déclenche une alerte sur la valeur numérique de la facette de log (similaire à un monitor de métrique) et une agrégation doit être sélectionnée (`min`, `avg`, `sum`, `median`, `pc75`, `pc90`, `pc95`, `pc98`, `pc99` ou `max`).
3. Groupez les logs par plusieurs dimensions (facultatif) :

   Datadog agrège tous les logs correspondant à la requête en groupes basés sur les valeurs des tags, des attributs et jusqu'à quatre facettes. Lorsque plusieurs dimensions sont présentes, les valeurs principales sont déterminées selon la première dimension, puis selon la deuxième dimension parmi les valeurs principales de la première, et ainsi de suite jusqu'à la dernière dimension. La limite des dimensions dépend du nombre total de dimensions :
   * **1 facette** : 1000 valeurs principales
   * **2 facettes** : 30 valeurs principales par facette (au maximum 900 groupes)
   * **3 facettes** : 10 valeurs principales par facette (1000 groupes au maximum)
   * **4 facettes** : 5 valeurs principales par facette (625 groupes au maximum)

   Si plusieurs requêtes ou formules sont définies dans un monitor de logs, vous pouvez sélectionner le nombre de valeurs les plus élevées ou les plus basses pour chaque dimension.

   La limite totale, indépendamment du nombre de facettes, est de 1 000 valeurs les plus élevées. Si vous augmentez cette valeur au-delà de 1 000, Datadog ajuste le nombre de valeurs les plus élevées pour les autres dimensions afin de garantir que le nombre de combinaisons résultantes soit inférieur à 1 000. Le nombre de valeurs les plus élevées par défaut pour chaque regroupement est de 10, à l'exception du quatrième, pour lequel il est de 5.

   Par exemple, un monitor de logs avec quatre regroupements sur la requête de recherche pourrait avoir :
   * **Première facette** : 10 valeurs principales
   * **Deuxième facette** : 10 valeurs principales
   * **Troisième facette** : 5 valeurs principales
   * **Quatrième facette** : 2 valeurs principales

4. En option, utilisez le menu {{< ui >}}Σ Modify Query{{< /ui >}} pour affiner la requête avec :
   * **Functions and formulas** : Transformez et combinez les résultats de votre requête. Consultez les [fonctions][11] et les [formules][12].
   * **Advanced search** : Définissez le périmètre des alertes à l'aide de jeux de données sélectionnés, tels que des listes d'entités, des niveaux de clients ou des événements corrélés. Consultez les [sous-requêtes][13] et les [Reference Tables][14].

   Vous pouvez également créer un monitor directement à partir d'une recherche avancée dans [Log Explorer][4].

5. Configurez la stratégie de regroupement des alertes (facultatif) :
    * {{< ui >}}Simple-Alert{{< /ui >}} : Les alertes simples agrègent les données de toutes les sources qui en transmettent. Vous recevez une alerte lorsque la valeur regroupée remplit les conditions définies. Ceci fonctionne mieux pour surveiller une métrique provenant d'un seul host ou la somme d'une métrique sur plusieurs hosts. Cette stratégie peut être sélectionnée pour réduire le bruit des notifications.
    * {{< ui >}}Multi Alert{{< /ui >}} : Les alertes multiples appliquent l'alerte à chaque source selon vos paramètres de groupe. Un événement d'alerte est généré pour chaque groupe qui remplit les conditions définies. Par exemple, vous pourriez grouper `system.disk.in_use` par `device` pour recevoir une alerte distincte pour chaque appareil qui manque d'espace.

### Définir les conditions d'alerte {#set-alert-conditions}

Déclencher lorsque la requête remplit l'une des conditions suivantes par rapport à une valeur seuil :
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

#### Alertes NO DATA et Below {#no-data-and-below-alerts}

Par défaut, un monitor de logs n'entre pas dans l'état NO DATA. Les requêtes de type Count évaluent les données manquantes comme zéro par rapport aux seuils, et les autres agrégations, comme la moyenne, affichent le dernier état connu. Pour afficher NO DATA lorsqu'aucun log ne correspond à la requête, ou lorsqu'un groupe qui envoyait précédemment des données cesse de le faire, définissez l'option missing-data sur {{< ui >}}Show NO DATA{{< /ui >}} ou {{< ui >}}Show NO DATA and notify{{< /ui >}}.

Pour recevoir une notification lorsque tous les groupes correspondant à une requête spécifique ont cessé d'envoyer des logs, définissez la condition sur `below 1`. Ceci envoie une notification lorsqu'aucun log ne correspond à la requête du monitor dans un intervalle de temps donné pour l'ensemble des groupes agrégés.

Lorsque vous segmentez le monitor par une dimension (tag ou facette) et que vous utilisez une condition `below`, l'alerte est déclenchée **si et seulement si** il existe des logs pour un groupe donné et que leur nombre est inférieur au seuil, ou s'il n'y a aucun log pour **l'ensemble** des groupes.

**Exemples** :

* Ce monitor se déclenche si et seulement s'il n'y a aucun log pour l'ensemble des services :
  {{< img src="monitors/monitor_types/log/log_monitor_below_by_service.png" alt="Monitor Below par service" style="width:60%;" >}}
* Ce monitor se déclenche s'il n'y a aucun log pour le service `backend` :
  {{< img src="monitors/monitor_types/log/log_monitor_below_condition.png" alt="Monitor Below pour le service backend" style="width:60%;" >}}

#### Conditions d'alerte avancées {#advanced-alert-conditions}

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (délai d'évaluation, délai pour les nouveaux groupes, etc.), consultez la page [Monitor configuration][7].

### Notifications {#notifications}

Pour des instructions détaillées sur la section {{< ui >}}Configure notifications and automations{{< /ui >}}, consultez la page [Notifications][8].

#### Classement des échantillons de logs et des valeurs dépassant le seuil {#log-samples-and-breaching-values-toplist}

Lorsqu'un monitor de logs est déclenché, des échantillons ou des valeurs peuvent être ajoutés au message de notification. Les logs sans message ne sont pas inclus dans les échantillons. Afin d'ajouter le contenu d'un attribut de log au message du monitor, utilisez directement les [variables de modèle][9] du monitor de logs dans le corps du message du monitor.

| Configuration du monitor                    | Peut être ajouté au message de notification |
|----------------------------------|--------------------------------------|
| Nombre de logs, alerte simple non groupée | Jusqu'à 10 échantillons de logs.                |
| Nombre de logs d'alerte simple groupée   | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Nombre de logs d'alerte multiple groupée    | Jusqu'à 10 échantillons de logs.                |
| Mesure d'alerte simple non groupée   | Jusqu'à 10 échantillons de logs.                |
| Mesure d'alerte simple groupée     | Jusqu'à 10 valeurs de facette ou de mesure.    |
| Mesure de log d'alerte multiple groupée  | Jusqu'à 10 valeurs de facette ou de mesure.    |

Ils sont disponibles pour les notifications envoyées à Slack, à Jira, aux webhooks, à Microsoft Teams et à Pagerduty, ainsi que par e-mail. **Remarque** : Les échantillons ne sont pas affichés pour les notifications de rétablissement.

Pour désactiver les échantillons de journaux, décochez la case en bas de la section {{< ui >}}Configure notification & automations{{< /ui >}}. Le texte à côté de la case est basé sur le regroupement de votre monitor (comme indiqué ci-dessus).

#### Exemples {#examples}

Incluez un tableau des 10 valeurs les plus élevées dépassant le seuil :
{{< img src="monitors/monitor_types/log/top_10_breaching_values.png" alt="10 valeurs les plus élevées dépassant le seuil" style="width:60%;" >}}

Incluez un échantillon de 10 journaux dans la notification d’alerte :
{{< img src="monitors/monitor_types/log/10_sample_logs.png" alt="10 valeurs les plus élevées dépassant le seuil" style="width:60%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/
[2]: /fr/logs/log_configuration/indexes/
[3]: https://app.datadoghq.com/monitors/create/log
[4]: /fr/logs/explorer/search/
[5]: /fr/logs/explorer/facets/
[6]: /fr/logs/explorer/facets/#measures
[7]: /fr/monitors/configuration/#advanced-alert-conditions
[8]: /fr/monitors/notify/
[9]: /fr/monitors/notify/variables/?tab=is_alert#matching-attributetag-variables
[10]: /fr/logs/log_configuration/flex_logs/
[11]: /fr/logs/explorer/analytics/#functions
[12]: /fr/logs/explorer/analytics/#formulas
[13]: /fr/logs/explorer/advanced_search/#filter-logs-with-subqueries
[14]: /fr/logs/explorer/advanced_search/#filter-logs-based-on-reference-tables