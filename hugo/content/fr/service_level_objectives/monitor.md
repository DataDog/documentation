---
aliases:
- /fr/monitors/service_level_objectives/monitor/
- /fr/service_management/service_level_objectives/monitor/
description: Définir un Service Level Objective à partir de monitors
further_reading:
- link: /monitors/
  tag: Documentation
  text: Plus d'informations sur les monitors
- link: https://www.datadoghq.com/blog/define-and-manage-slos/#monitor-based-slo
  tag: Blog
  text: Conseils à suivre pour gérer vos SLO avec Datadog
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Améliorez la précision et les performances des SLO grâce à Datadog Synthetic
    Monitoring
- link: https://learn.datadoghq.com/courses/understanding-slos
  tag: Centre d'apprentissage
  text: Comprendre les Service Level Objectives (SLO)
title: SLO basés sur des monitors
---
## Présentation {#overview}
Pour utiliser un SLO reposant sur des monitors Datadog nouveaux ou existants, créez un SLO basé sur des monitors. En utilisant un SLO basé sur un monitor, vous pouvez calculer l'indicateur de niveau de service (SLI) en divisant la durée pendant laquelle votre système présente un bon comportement par la durée totale.

<div class="alert alert-info">Les SLO par tranches temporelles sont un autre moyen de créer des SLO avec un calcul de SLI basé sur le temps. Avec les SLO par tranches temporelles, vous pouvez créer un SLO de disponibilité sans passer par un monitor, vous n'avez donc pas à créer et à maintenir à la fois un monitor et un SLO.</div>

{{< img src="service_level_objectives/monitor/monitor_slo_side_panel.png" alt="exemple de SLO basé sur un monitor" >}}

## Prérequis {#prerequisites}

Pour créer un SLO basé sur un monitor, vous avez besoin d'un monitor Datadog existant. Pour configurer un nouveau monitor, accédez à la [page de création de monitor][1].

Les SLO Datadog basés sur des monitors prennent en charge les types de monitors suivants :
- Types de monitors de métriques (Métrique, Intégration, Métrique APM, Anomalie, Prévision, Singularité)
- Synthétique
- Checks de service

## Configuration {#setup}

Sur la [page d'état des SLO][2], cliquez sur {{< ui >}}\+ New SLO{{< /ui >}}. Ensuite, sélectionnez {{< ui >}}By Monitor Uptime{{< /ui >}}.

### Définir les requêtes {#define-queries}


Dans la zone de recherche, commencez à saisir le nom d'un monitor. Une liste de monitors correspondants s'affiche. Cliquez sur le nom d'un monitor pour l'ajouter à la liste des sources.

**Remarques** :

- Si vous utilisez un seul monitor multi-alerte dans un SLO, vous pouvez éventuellement sélectionner « Calculer sur les groupes sélectionnés » et choisir jusqu'à 20 groupes. 
- Si vous ajoutez plusieurs monitors à votre SLO, la sélection de groupe n'est pas prise en charge. Vous pouvez ajouter jusqu'à 20 monitors.

### Définissez vos objectifs de SLO {#set-your-slo-targets}

Sélectionnez un pourcentage {{< ui >}}target{{< /ui >}}, {{< ui >}}time window{{< /ui >}} et un niveau {{< ui >}}warning{{< /ui >}} optionnel.

Le pourcentage cible définit la durée pendant laquelle le ou les monitors sous-jacents du SLO ne doivent pas posséder le statut ALERT. L'intervalle définit la période glissante prise en compte pour le calcul du SLO.

La couleur du statut SLO dans l'interface Datadog varie selon la valeur du SLI :
- Tant que le SLI reste au-dessus de la cible, l'interface utilisateur affiche le statut du SLO en vert.
- Lorsque le SLI tombe en dessous de la cible, l'interface utilisateur affiche le statut du SLO en rouge.
- Si vous avez inclus un niveau d'avertissement et que le SLI tombe en dessous de l'avertissement, mais au-dessus du niveau cible, l'interface utilisateur affiche le statut du SLO en jaune.

L'intervalle sélectionné pour vos SLO basés sur des monitors modifie leur précision :
- Les fenêtres temporelles de 7 et 30 jours autorisent jusqu'à deux décimales.
- Les fenêtres temporelles de 90 jours autorisent jusqu'à trois décimales.

Dans la vue détaillée du SLO, les valeurs affichées pour les SLO sont arrondies au centième près pour les intervalles de 7 et 30 jours, et au millième près pour les intervalles de 90 jours.

L'exemple suivant démontre pourquoi Datadog affiche un nombre limité de décimales pour les calculs de SLO. Une cible de 99,999 % pour une fenêtre temporelle de 7 ou 30 jours entraîne un budget d'erreur de 6 secondes ou 26 secondes, respectivement. Les monitors s'évaluent chaque minute, donc la granularité d'un SLO basé sur un monitor est également de 1 minute. Par conséquent, une alerte consommerait entièrement et dépasserait le budget d'erreur de 6 secondes ou 26 secondes de l'exemple précédent. En pratique, les équipes ne peuvent pas respecter des budgets d'erreur aussi faibles.

Si vous souhaitez bénéficier d'une granularité de moins d'une minute pour l'évaluation des monitors, utilisez plutôt des [SLO basés sur des métriques][3].

### Ajouter un nom et des tags {#add-name-and-tags}

Choisissez un nom et une description étendue pour votre SLO. Sélectionnez les tags que vous souhaitez associer à votre SLO. Sélectionnez {{< ui >}}Create{{< /ui >}} ou {{< ui >}}Create & Set Alert{{< /ui >}} pour enregistrer votre nouveau SLO.

## Calcul du statut {#status-calculation}

{{< img src="service_level_objectives/monitor/monitor_slo_overall_status.png" alt="SLO basé sur des monitors avec groupes" >}}

Datadog calcule le statut global du SLO comme le pourcentage de disponibilité sur tous les monitors ou groupes de monitors, sauf si des groupes spécifiques ont été sélectionnés :
- Si des groupes spécifiques ont été sélectionnés (jusqu'à 20), le statut du SLO est calculé uniquement avec ces groupes. L'interface utilisateur affiche tous les groupes sélectionnés. 
- Si aucun groupe spécifique n'est sélectionné, le statut du SLO est calculé pour *tous* les groupes. L'interface utilisateur affiche tous les groupes sous-jacents du SLO. 

**Remarque :** Pour les SLO basés sur des monitors avec des groupes, tous les groupes peuvent être affichés pour les SLO contenant jusqu'à 5 000 groupes. Pour les SLO contenant plus de 5 000 groupes, le SLO est calculé sur la base de tous les groupes, mais aucun groupe n'est affiché dans l'interface utilisateur.

Les SLO basés sur des monitors traitent l'état `WARN` comme `OK`. La définition d'un SLO nécessite une distinction binaire entre un bon et un mauvais comportement. Les calculs de SLO traitent `WARN` comme un bon comportement car `WARN` n'est pas assez grave pour indiquer un mauvais comportement.

Considérez l'exemple suivant pour un SLO basé sur des monitors contenant 3 monitors. Le calcul pour un SLO basé sur des monitors reposant sur un seul monitor multi-alerte serait similaire.

| Monitor            | t1 | t2 | t3    | t4 | t5    | t6 | t7 | t8 | t9    | t10 | Statut |
|--------------------|----|----|-------|----|-------|----|----|----|-------|-----|--------|
| Monitor 1          | OK | OK | OK    | OK | ALERTE | OK | OK | OK | OK    | OK  | 90%    |
| Monitor 2          | OK | OK | OK    | OK | OK    | OK | OK | OK | ALERTE | OK  | 90%    |
| Monitor 3          | OK | OK | ALERTE | OK | ALERTE | OK | OK | OK | OK    | OK  | 80%    |
| **Statut global** | OK | OK | ALERTE | OK | ALERTE | OK | OK | OK | ALERTE | OK  | 70%    |

Dans cet exemple, le statut global est inférieur à la moyenne de chaque statut.

La désactivation des alertes d'un monitor n'a aucune incidence sur le calcul d'un SLO. Pour exclure des intervalles du calcul d'un SLO, utilisez la fonctionnalité de [correction de statut SLO][5].

### Exceptions pour les tests Synthetic {#exceptions-for-synthetic-tests}
Dans certains cas, il existe une exception au calcul du statut pour les SLO basés sur des monitors composés d'un test Synthetic groupé. Les tests Synthetic ont des conditions d'alerte spéciales facultatives qui modifient le comportement du passage du test à l'état ALERTE et ont par conséquent un impact sur la disponibilité globale :

- Attendez que les groupes soient en échec pendant un nombre de minutes spécifié (par défaut : 0)
- Attendez qu'un nombre spécifié de groupes soit en échec (par défaut : 1)
- Réessayez un nombre de fois spécifié avant qu'un test d'emplacement ne soit considéré comme un échec (par défaut : 0)

Si vous modifiez la valeur par défaut de l'une de ces conditions, il se peut que le statut global d'un SLO basé sur des monitors et utilisant uniquement un test Synthetic soit meilleur que les statuts agrégés de chaque groupe du test Synthetic.

Pour en savoir plus sur les conditions d'alerte des tests Synthetic, consultez la section relative à la [Synthetic Monitoring][4].

### Données manquantes {#missing-data}
#### Monitors de métriques {#metric-monitors}
Lorsque vous créez un monitor de métriques, vous choisissez [comment le monitor gérera les données manquantes][6] . Cette configuration affecte la façon dont un calcul de SLO basé sur un monitor interprète les données manquantes :

| Configuration du monitor     | Calcul du SLO des données manquantes |
|---------------------------|---------------------------------|
| `Evaluate as zero`        | Dépend du seuil d'alerte du monitor <br> Par exemple, un seuil de `> 10` entraînerait une disponibilité (puisque le statut du monitor serait `OK`), tandis qu'un seuil de `< 10` entraînerait un downtime.                             |
| `Show last known status`  | Conserver le dernier état du SLO          |
| `Show NO DATA`            | Disponibilité                          |
| `Show NO DATA and notify` | Downtime                        |
| `Show OK`                 | Disponibilité |

#### Autres types de monitors {#other-monitor-types}
Lorsque vous créez un monitor de check de service, vous choisissez s'il doit envoyer une alerte lorsque des données sont manquantes. Cette configuration affecte la façon dont un calcul de SLO basé sur un monitor interprète les données manquantes. Pour les monitors configurés pour ignorer les données manquantes, les périodes avec des données manquantes sont traitées comme OK (disponibilité) par le SLO . Pour les monitors configurés pour alerter en cas de données manquantes, les périodes avec des données manquantes sont traitées comme ALERTE (downtime) par le SLO .

Si vous mettez en pause un test Synthetic, le SLO supprime la période pendant laquelle les données sont manquantes de son calcul. Dans l'interface utilisateur, ces périodes sont marquées en gris clair sur la barre d'état du SLO.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://app.datadoghq.com/slo
[3]: /fr/service_level_objectives/metric/
[4]: /fr/synthetics/api_tests/?tab=httptest#alert-conditions
[5]: /fr/service_level_objectives/#slo-status-corrections
[6]: /fr/monitors/configuration/#no-data