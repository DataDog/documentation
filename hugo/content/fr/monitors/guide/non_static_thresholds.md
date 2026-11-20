---
description: Surveillez les seuils variables à l'aide de modèles saisonniers, de métriques
  de référence et de moniteurs composites pour des scénarios d'alerte dynamiques.
further_reading:
- link: /monitors/types/composite/
  tag: Documentation
  text: Moniteur composite
- link: /monitors/types/anomaly/
  tag: Documentation
  text: Moniteur d'anomalies
title: Comment surveiller des seuils non statiques
---
## Présentation {#overview}

Un moniteur de métrique classique déclenche une alerte si une seule métrique dépasse un seuil spécifique. Par exemple, vous pourriez définir une alerte qui se déclenche si votre utilisation du disque dépasse 80 %. Cette approche est efficace pour de nombreux cas d'utilisation, mais que se passe-t-il lorsque le seuil est une variable plutôt qu'un nombre absolu ?

Les moniteurs basés sur Watchdog (à savoir [anomalie][1] et [singularité][2]) sont particulièrement utiles lorsqu'il n'existe pas de définition explicite de ce qui constitue une anomalie pour votre métrique. Cependant, lorsque cela est possible, vous devez utiliser des moniteurs classiques avec des conditions d'alerte personnalisées pour maximiser la précision et minimiser le délai d'alerte pour votre cas d'utilisation spécifique.

Ce guide couvre les cas d'utilisation courants pour l'alerte sur des seuils non statiques :
  - [Alerter lorsqu'une métrique s'écarte de ses **variations saisonnières**](#seasonal-threshold)  habituelles
  - [Alerter en fonction de la valeur d'une autre métrique de **référence**](#reference-threshold)

## Seuil saisonnier {#seasonal-threshold}

### Contexte {#context}

Vous êtes le chef d'équipe responsable d'un site web de commerce électronique. Vous souhaitez : 
- recevoir des alertes en cas de trafic anormalement bas sur votre page d'accueil 
- détecter des incidents plus localisés comme ceux affectant les fournisseurs d'accès à Internet publics
- couvrir des scénarios de défaillance inconnus

Le trafic de votre site web varie de la nuit au jour, et de la semaine au week-end. Il n'existe pas de nombre absolu pour quantifier ce que signifie « anormalement bas ». Cependant, le trafic suit un modèle prévisible où vous pouvez considérer une différence de 10 % comme un indicateur fiable d'un problème, tel qu'un incident localisé affectant les fournisseurs d'accès à Internet publics.

{{< img src="monitors/guide/non_static_thresholds/seasonal_line_graph.png" alt="Graphique linéaire d'une métrique périodique ou saisonnière" style="width:100%;" >}}

### Moniteur {#monitor}

Votre équipe mesure le nombre de connexions sur votre serveur web NGINX en utilisant la métrique [`nginx.requests.total_count`][3].

La **requête** se compose de 3 parties : 
1. Une requête pour obtenir le nombre actuel de requêtes.
2. Une requête pour obtenir le nombre de requêtes à la même heure une semaine auparavant.
3. Des requêtes « Formula » qui calculent le ratio entre les deux premières requêtes.

Ensuite, déterminez l'agrégation temporelle :
- Vous choisissez la période. Plus la période est longue, plus elle évalue de données pour détecter une anomalie. Des périodes plus longues peuvent également entraîner davantage d'alertes de moniteur ; commencez donc par 1 heure, puis ajustez selon vos besoins. 
- Vous choisissez l'agrégation. S'agissant d'une métrique de comptage effectuant un ratio, `average` (ou `sum`) est un choix naturel.

Le seuil affiché dans la capture d'écran ci-dessous a été configuré à 0,9 pour permettre une différence de 10 % entre la valeur de la première requête (actuelle) et la deuxième requête (la semaine précédente).

{{< tabs >}}
{{% tab "Configuration de l'interface utilisateur" %}}

{{< img src="monitors/guide/non_static_thresholds/seasonal_threshold_config.png" alt="Configuration pour ajouter un décalage temporel week_before à la requête de métrique et définir la formule a/b" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Exemple JSON" %}}
``` json
{
	"name": "[Seasonal threshold] Amount of connection",
	"type": "query alert",
	"query": "sum(last_10m):sum:nginx.requests.total_count{env:prod} by {datacenter} / week_before(sum:nginx.requests.total_count{env:prod} by {datacenter}) <= 0.9",
	"message": "The amount of connection is lower than yesterday by {{value}} !",
	"tags": [],
	"options": {
		"thresholds": {
			"critical": 0.9
		},
		"notify_audit": false,
		"require_full_window": false,
		"notify_no_data": false,
		"renotify_interval": 0,
		"include_tags": true,
		"new_group_delay": 60,
		"silenced": {}
	},
	"priority": null,
	"restricted_roles": null
}

```
{{% /tab %}}
{{< /tabs >}}

## Reference threshold

### Context
You are the QA team lead, in charge of the checkout process of your e-commerce website. You want to ensure that your customers have a good experience and can purchase your products without any issues. One indicator of that is the error rate.

The traffic is not the same throughout the day, so 50 errors/minute on a Friday evening is less worrying than 50 errors/minute on a Sunday morning. Monitoring an error rate rather than the errors themselves gives you a reliable view of what healthy and unhealthy metrics look like.

Get alerted when the error rate is high, but also when the volume of hits is significant enough.

### Monitor

Create 3 monitors in total:
1. [Metric monitor to alert on total number of hits.](#metric-monitor-to-alert-on-the-total-number-of-hits)
1. [Metric monitor to calculate the error rate.](#metric-monitor-to-calculate-the-error-rate)
1. [Composite monitor that triggers an alert if the first two monitors are in an ALERT state.](#composite-monitor)

#### Metric monitor to alert on the total number of hits

The first monitor tracks the total number of hits, both successes and failures. This monitor determines whether the error rate should trigger an alert.

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_total_hits.png" alt="Metric monitor configuration with formula to calculate total hits" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
```
{
	"name": "Number of hits",
	"type": "query alert",
	"query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count() > 4000",
	"message": "Il y a eu plus de 4000 accès pour cette région !",
	"tags": [],
	"options": {
		"thresholds": {
			"critical": 1000
		},
		"notify_audit": false,
		"require_full_window": false,
		"notify_no_data": false,
		"renotify_interval": 0,
		"include_tags": true,
		"new_group_delay": 60
	}
}

```
{{% /tab %}}
{{< /tabs >}}

#### Metric monitor to calculate the error rate

The second monitor calculates the error rate. Create a query on the number of errors divided by the total number of hits to get the error rate `a / a+b`:

{{< tabs >}}
{{% tab "UI Configuration" %}}

{{< img src="monitors/guide/non_static_thresholds/reference_error_rate.png" alt="Metric monitor configuration with formula to calculate error rate" style="width:100%;" >}}

{{% /tab %}}

{{% tab "JSON Example" %}}
```
{
	"name": "Error Rate",
	"type": "query alert",
	"query": "sum(last_5m):sum:shopist.checkouts.failed{env:prod} by {region}.as_count() / (sum:shopist.checkouts.failed{env:prod} by {region}.as_count() + sum:shopist.checkouts.success{env:prod} by {region}.as_count()) > 0.5",
	"message": "Le taux d'erreur est actuellement {{value}} ! Soyez prudent !",
	"tags": [],
	"options": {
		"thresholds": {
			"critical": 0.5
		},
		"notify_audit": false,
		"require_full_window": false,
		"notify_no_data": false,
		"renotify_interval": 0,
		"include_tags": true,
		"new_group_delay": 60
	}
}

```

{{% /tab %}}
{{< /tabs >}}


#### Moniteur composite {#composite-monitor}

Le dernier moniteur est un moniteur composite, qui envoie une alerte uniquement si les deux moniteurs précédents sont tous deux dans un état {{< ui >}}ALERT{{< /ui >}}. 

{{< img src="monitors/guide/non_static_thresholds/reference_composite_monitor_config.png" alt="Exemple de configuration de moniteur composite montrant la logique booléenne pour alerter si les deux moniteurs sont dans l'état ALERT" style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/anomaly/
[2]: /fr/monitors/types/outlier/
[3]: /fr/integrations/nginx/?tab=host#data-collected
[4]: /fr/account_management/billing/usage_metrics/estimated_usage_metrics/#types-of-usage
[5]: /fr/logs/log_configuration/logs_to_metrics/#logs-usage-metrics