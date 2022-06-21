---
title: Alertes sur le taux d'utilisation
kind: documentation
description: Utiliser des monitors pour envoyer des alertes à propos du taux d'utilisation d'un SLO
---
{{< jqmath-vanilla >}}

<div class="alert alert-warning">
Cette fonctionnalité est disponible en version bêta ouverte. Envoyez un e-mail à <a href="mailto:slo-help@datadoghq.com">slo-help@datadoghq.com</a> si vous avez des questions ou des retours.
</div>

## Présentation

Les alertes de taux d'utilisation de SLO vous préviennent lorsque l'utilisation de la marge d'erreur de votre SLO dépasse constamment un certain seuil pendant une certaine durée. Vous pouvez par exemple envoyer une alerte lorsqu'un taux d'utilisation de 14,4 ou plus est enregistré pendant 5 minutes lors de la dernière heure pour votre SLO avec une cible de 30 jours. Il est également possible de recevoir un avertissement pour un seuil légèrement plus faible qu'une alerte (par exemple, un taux d'utilisation de 7,2).

**Remarque :** les alertes de taux d'utilisation ne sont disponibles que pour les [SLO basés sur des métriques][1], ou les [SLO basés sur des monitors][2] uniquement composés de types de monitors de métrique (les monitors Metric, Integration, APM Metric, Anomaly, Forecast ou Outliner).

{{< img src="monitors/service_level_objectives/burn_rate_alert_config.jpeg" alt="Configuration d'une alerte de taux d'utilisation">}}

## Fonctionnement des alertes de taux d'utilisation

Le taux d'utilisation est une valeur sans unité [créée par Google][3]. Elle indique la vitesse à laquelle vous utilisez votre marge d'erreur par rapport à la durée cible de votre SLO. Par exemple, pour une cible de 30 jours, un taux d'utilisation de 1 indique que votre marge d'erreur sera entièrement utilisée en 30 jours précisément, tant que le taux de 1 reste constant. Un taux d'utilisation stable de 2 indique que la marge d'erreur sera utilisée en 15 jours, un taux d'indisponibilité de 3 en 10 jours, etc.

Cette relation s'exprime de la façon suivante :

$${\text"Durée de la cible du SLO" \text" (7, 30 ou 90 jours)"} / \text"taux d'utilisation" = \text"Nombre de jours requis pour utiliser toute la marge d'erreur"\$$

Les alertes de taux d'utilisation se basent sur le dernier taux d'erreur pour calculer le taux d'utilisation observé. Le terme « taux d'erreur » désigne le ratio entre le nombre de comportements négatifs et le nombre total de comportements sur une *période donnée* :

{{< img src="monitors/service_level_objectives/error-rate-definition.jpeg" alt="Définition du taux d'erreur">}}

Les unités des « comportements » varient en fonction du type de SLO. Ainsi, les SLO basés sur des métriques mesurent le nombre d'occurrences d'un élément (comme le nombre de requêtes ayant réussi ou échoué), tandis que les SLO basés sur des monitors surveillent des durées (comme la durée d'indisponibilité et de disponibilité des monitors).

Lorsque vous définissez une cible pour votre SLO (par exemple, 99,9 %), votre marge d'erreur correspond à la quantité de problèmes de fiabilité que vous êtes prêt à accepter :

{{< img src="monitors/service_level_objectives/error-budget-definition.jpeg" alt="Définition de la marge d'erreur">}}

En d'autres termes, votre marge d'erreur (sous forme de fraction) correspond au taux d'erreur idéal à conserver. Ainsi, un taux d'utilisation représente également le multiplicateur de votre taux d'erreur idéal. Par exemple, pour un SLO avec une cible de 99,9 % sur 30 jours, vous enregistrez un taux d'utilisation de 10, cela signifie qu'à ce rythme, la marge d'erreur sera entièrement utilisée en 3 jours, et que le taux d'erreur observé est 10 fois trop élevé :
{{< img src="monitors/service_level_objectives/observed-error-rate-example.jpeg" alt="Exemple de taux d'erreur observé">}}

Dans l'idéal, vous devez toujours essayer de conserver un taux d'utilisation de 1 tout au long de la durée de votre SLO (pendant que vous investissez dans de nouvelles fonctionnalités pour votre application). Néanmoins, en pratique, votre taux d'utilisation évolue en fonction des problèmes ou incidents qui surviennent. Votre taux d'utilisation augmente rapidement tant que les problèmes en question n'ont pas été résolus. Pour y remédier, les alertes relatives aux taux d'utilisation vous informent de façon proactive lorsqu'un problème utilise une grande partie de votre marge d'erreur et compromet potentiellement la cible de votre SLO.

Lorsque vous configurez une alerte de taux d'utilisation, vous définissez le seuil du taux d'utilisation, mais également une période d'alerte courte et une période d'alerte longue durant lesquelles le taux d'utilisation sera mesuré. La période d'alerte longue est exprimée en heures. Elle permet au monitor de mesurer le taux d'utilisation sur une période suffisamment large pour englober des problèmes importants. Ainsi, le monitor ne déclenche pas l'envoi d'alertes irrégulières causées par des problèmes mineurs. La période d'alerte courte est exprimée en minutes. Elle permet au monitor de se rétablir rapidement après la correction du problème pertinent, en vérifiant si le taux d'utilisation actuel est supérieur au seuil défini. Google recommande de définir une période courte correspondant à un douzième (1/12) de la période longue. Toutefois, vous pouvez personnaliser automatiquement la période courte dans Datadog à l'aide de l'API ou de Terraform. Voici la formule complète utilisée pour évaluer les alertes de taux d'utilisation :

{{< img src="monitors/service_level_objectives/burn-rate-alert-formula.jpeg" alt="Formule des alertes de taux d'utilisation">}}

## Valeurs maximales des taux d'utilisation

Comme indiqué plus haut, vous pouvez utiliser la formule suivante pour évaluer le taux d'utilisation observé pour vos périodes longue et courte :

{{< img src="monitors/service_level_objectives/observed-error-rate.jpeg" alt="Taux d'erreur observé">}}

Le taux d'erreur observable ne peut pas dépasser 1 (au maximum, 100 % des comportements sont négatifs durant la période donnée). Cela signifie que le taux d'utilisation maximal utilisable dans vos alertes peut être calculé à partir de la formule suivante :

{{< img src="monitors/service_level_objectives/max-burn-rate.jpeg" alt="Taux d'utilisation maximal">}}

Plus la cible de votre SLO est faible, plus votre taux d'utilisation maximal est limité. Avec un seuil de taux d'utilisation supérieur à cette valeur maximale, l'alerte ne pourrait pas se déclencher. Si vous définissez la condition de l'alerte de taux d'utilisation sur une valeur supérieure au taux maximal calculé à partir de cette formule, votre alerte cherchera à vous prévenir lorsque votre SLO enregistre un taux d'erreur supérieur à 100 % (ce qui est impossible). Ainsi, pour éviter de créer par inadvertance des alertes inutiles, Datadog vous empêche de créer des alertes lorsqu'elles sont définies sur un taux d'utilisation supérieur à la valeur maximale.

## Choisir les valeurs des taux d'utilisation

Les valeurs des taux d'utilisation à définir pour vos alertes varient en fonction de la cible et de la période de votre SLO. Lorsque vous configurez une alerte de taux d'utilisation, vous devez avant tout déterminer le seuil du taux d'utilisation et la période longue. Datadog vous conseille de définir dans un premier temps la période courte sur un douzième (1/12) de la période d'alerte longue, tel que suggéré par Google, puis d'ajuster la valeur si besoin après avoir observé les premiers résultats. Votre taux d'utilisation maximal est limité par la relation décrite dans la section précédente.

### 1re approche : durée jusqu'à l'utilisation de toute la marge d'erreur

Comme indiqué plus haut, le seuil du taux d'erreur est défini par la relation suivante :

{{< img src="monitors/service_level_objectives/time-to-depletion.jpeg" alt="Formule de la durée jusqu'à l'utilisation de la marge d'erreur">}}

Calculez le taux d'utilisation, en définissant le « nombre de jours requis pour utiliser toute la marge d'erreur » sur une valeur fortement problématique.

Pour la période longue, choisissez une durée pour laquelle un taux d'utilisation élevé et constant indiquerait un réel problème, et non simplement une erreur passagère peu importante. Un taux d'utilisation élevé doit être accompagné d'une période plus faible (afin que les problèmes graves soient identifiés plus rapidement).

### 2e approche : utilisation théorique de la marge d'erreur

Il est également possible d'exprimer le taux d'utilisation et la période longue en fonction de l'utilisation théorique de la marge d'erreur :

{{< img src="monitors/service_level_objectives/burn-rate-approach-2.jpeg" alt="Formule de la 2e approche du taux d'utilisation">}}

Par exemple, avec un SLO de 7 jours, si vous souhaitez recevoir une alerte lorsque l'utilisation de la marge d'erreur théorique atteint 10 % pendant une heure lors de votre période longue, utilisez la formule suivante pour calculer le taux d'utilisation :

{{< img src="monitors/service_level_objectives/burn-rate-approach-2-example.jpeg" alt="Exemple de formule de la 2e approche du taux d'utilisation">}}

**Remarque** : avec cette relation, pour les SLO basés sur des métriques, le nombre total d'occurrences qui surviennent lors de la période longue est extrapolé à partir de la durée totale de la cible du SLO. En pratique, l'utilisation observée de la marge d'erreur ne correspond jamais précisément à cette relation, car le total d'occurrences surveillées par le SLO basé sur des métriques lors d'une période mobile varie généralement tout au long de la journée. Une alerte de taux d'utilisation vise à prédire des utilisations importantes de la marge d'erreur avant qu'elles ne se produisent. Pour les SLO basés sur des monitors, les utilisations théorique et réelle de la marge d'erreur sont identiques, car le temps évolue toujours à la même vitesse. Par exemple, 60 minutes de données seront toujours incluses dans une période d'une heure.

## Création d'un monitor

1. Accédez à la [page de statut des SLO][4].
2. Créez un SLO ou modifiez-en un, puis cliquez sur le bouton **Save and Set Alert**. Si vous utilisez un SLO existant, vous pouvez également cliquer sur le bouton **Set up Alerts** dans le volet latéral des détails pour accéder directement à la configuration de l'alerte.
3. Sélectionnez l'onglet **Burn Rate** dans la section **Step 1: Setting alerting conditions**.
4. Définissez une alerte afin qu'elle se déclenche lorsqu'un certain taux d'utilisation est mesuré durant une période longue spécifique :
   * La valeur du taux d'utilisation doit respecter la formule suivante :
     {{< img src="monitors/service_level_objectives/burn-rate-range.jpeg" alt="Plage du taux d'utilisation">}}
   * La valeur de la période longue doit être comprise entre 1 heure et 48 heures.
   * Dans l'interface, la période courte est automatiquement calculée à partir de la formule suivante : `période courte = 1/12 * période longue`.
   * Vous pouvez définir une période courte personnalisée à l'aide de [l'API ou de Terraform](#api-et-terraform). Toutefois, la valeur de la période courte doit forcément être inférieure à celle de la période longue.
5. Ajoutez des [informations sur les notifications][4] dans les sections **Say what’s happening** et **Notify your team**.
6. Cliquez sur le bouton **Save and Exit** sur la page de configuration du SLO.

### Scénarios

Vous trouverez ci-dessous les valeurs recommandées pour les cibles de 7, 30 et 90 jours.

- Pour ces exemples, il est supposé que la cible est définie sur 99,9 %. Les valeurs demeurent cependant acceptables pour des cibles plus faibles jusqu'à 96 % (le taux d'utilisation maximal pour une cible de 96 % est de 25). Toutefois, sachez que si vous utilisez des cibles moins élevées, vous devrez définir des seuils plus faibles, tels que décrits à la rubrique [Valeurs maximales des taux d'utilisation](valeurs-maximales-des-taux-d-utilisation). Datadog recommande d'utiliser la [2e approche](2e-approche- utilisation-theorique-de-la-marge-d-erreur) avec une utilisation théorique de la marge d'erreur plus faible ou une période longue plus élevée.
- Pour les SLO basés sur des métriques, l'utilisation théorique de la marge d'erreur est calculée en extrapolant le nombre total d'occurrences observées lors de la période d'alerte longue à partir de la durée totale de la cible du SLO.

Pour les cibles de 7 jours :

| Taux d'utilisation | Période longue | Période courte | Utilisation théorique de la marge d'erreur |
|---|---|---|---|
| 16.8  | 1 heure  | 5 minutes  | 10 %  |
| 5.6  | 6 heures  | 30 minutes  | 20 %  |
| 2.8  | 24 heures  | 120 minutes  | 40 %  |

Pour les cibles de 30 jours :

| Taux d'utilisation | Période longue | Période courte | Utilisation théorique de la marge d'erreur |
|---|---|---|---|
| 14.4  | 1 heure  | 5 mlnutes  | 2 %  |
| 6  | 6 heures  | 30 minutes  | 5 %  |
| 3  | 24 heures  | 120 minutes  | 10 %  |

Pour les cibles de 90 jours :

| Taux d'utilisation | Période longue | Période courte | Utilisation théorique de la marge d'erreur |
|---|---|---|---|
| 21.6  | 1 heure  | 5 mlnutes  | 1 %  |
| 10.8  | 6 heures  | 30 minutes  | 3 %  |
| 4.5  | 24 heures  | 120 minutes  | 5 %  |

**Conseil** : si vous estimez que vos alertes de taux d'utilisation sont trop irrégulières, vous devez augmenter votre période courte. Sachez toutefois qu'une période courte plus élevée augmente le délai de rétablissement du monitor une fois le problème résolu.

### API et Terraform

Vous pouvez créer des alertes de taux d'utilisation de SLO à l'aide de l'[endpoint d'API create-monitor][5]. Vous trouverez ci-dessous un exemple de requête pour un taux d'utilisation. Des alertes sont envoyées lorsqu'il atteint au minimum 14,4 durant 5 minutes au cours de la dernière heure. Remplacez *slo_id* par l'ID alphanumérique du SLO pour lequel vous souhaitez configurer une alerte de taux d'utilisation. Remplacez également *time_window* par la valeur « 7d », « 30d » ou « 90d », en fonction de la cible de votre SLO :

```
burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
```

Il est également possible de créer des alertes de taux d'utilisation de SLO à l'aide de la [ressource datadog_monitor dans Terraform][6]. Voici un exemple de fichier .tf qui configure une alerte de taux d'utilisation pour un SLO basé sur des métriques à partir de la même requête que celle de l'exemple ci-dessus.

**Remarque :** les alertes de taux d'utilisation de SLO sont uniquement prises en charge par la v2.7.0 et les versions antérieures du fournisseur Terraform, ou par la v2.13.0 et les versions ultérieures. Elles ne sont donc pas prises en charge pour les versions entre v2.7.0 et v.2.13.0.

```
resource "datadog_monitor" "metric-based-slo" {
    name = "Exemple d'alerte de taux d'erreur de SLO"
    type  = "slo alert"

    query = <<EOT
    burn_rate("slo_id").over("time_window").long_window("1h").short_window("5m") > 14.4
    EOT

    message = "Exemple de message de monitor"
    monitor_thresholds = {
      critical = 14.4
    }
    tags = ["foo:bar", "baz"]
}
```

## Restrictions bêta

- Les alertes sont uniquement disponibles pour les SLO basés sur des métriques, ou les SLO basés sur des monitors uniquement composés de types de monitors de métrique (les monitors Metric, Integration, APM Metric, Anomaly, Forecast ou Outliner).
- Le statut d'alerte d'un monitor de SLO est disponible dans l'onglet **Alerts** du volet des détails du SLO ou sur la page [Manager Monitors][6].

[1]: /fr/monitors/service_level_objectives/metric/
[2]: /fr/monitors/service_level_objectives/monitor/
[3]: https://sre.google/workbook/alerting-on-slos/
[4]: https://app.datadoghq.com/slo
[5]: /fr/api/v1/monitors/#create-a-monitor
[6]: https://www.terraform.io/docs/providers/datadog/r/monitor.html