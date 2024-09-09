---
aliases:
- /fr/monitors/monitor_types/process
- /fr/monitors/create/types/process/
description: Vérifier si un processus est en cours d'exécution sur un host
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
- link: https://www.datadoghq.com/blog/monitor-fargate-processes/
  tag: Blog
  text: Surveiller des processus s'exécutant sur AWS Fargate avec Datadog
title: Monitor de live processes
---

## Présentation

Les monitors de live processes tirent parti des données recueillies par l'[Agent de processus][1]. Vous pouvez créer des monitors qui vous envoient des états d'alerte ou d'avertissement selon le nombre d'éléments d'un groupe de processus associés à des hosts ou tags.

Les monitors de live processes s'avèrent particulièrement utiles pour accomplir ce qui suit :

- Vérifier qu'un nombre suffisant d'instances de processus longs non conteneurisés sont en cours d'exécution
- Indiquer lorsqu'un processus spécifique est en cours d'exécution

**Remarque** : seuls les processus longs sont recueillis par l'Agent. Les monitors basés sur des processus qui durant 20 secondes ou moins peuvent donner lieu à des résultats irréguliers.

## Création d'un monitor

Pour créer un monitor de live processes, deux options s'offrent à vous :

- Utilisez la navigation principale : **Monitors --> New Monitor --> Live Process**.
- Depuis la [page Live Process][4], recherchez le processus à surveiller. Cliquez ensuite sur le menu déroulant en regard de **+New Metric**, puis sur **Create monitor**.

### Sélectionner des processus

Vous pouvez utiliser des tags ou une chaîne approximative pour appliquer un filtre à l'ensemble des processus de votre infrastructure. Les processus et totaux pertinents s'affichent sous la recherche :

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Sélectionner des processus" style="width:90%;">}}

Une fois votre recherche définie, un graphique s'affiche au-dessus des termes de recherche. Il représente le nombre approximatif de processus correspondants. Il est recommandé de limiter votre recherche à quelques milliers de processus. Ajoutez des tags pour restreindre les résultats ou divisez un monitor en plusieurs monitors distincts si besoin. Pour obtenir des données plus granulaires, consultez la [page Live Process][4].

#### Recherche de tags

Filtrez les processus à surveiller en fonction de leurs tags. Datadog vous conseille d'appliquer un filtre en fonction de tags avant d'effectuer une recherche de texte intégral.

#### Recherche de texte intégral

SI vous ne parvenez pas à obtenir la granularité de votre choix à l'aide de tags, vous pouvez effectuer une recherche textuelle basée sur les lignes de commande et les noms d'utilisateur. Cette recherche renvoie des résultats partiels et approximatifs pour l'ensemble des processus de votre infrastructure. Les opérateurs `AND`, `OR` et `NOT` sont pris en charge. Consultez la [section Live processes][3] pour en savoir plus.

##### Exemples

| Exemple de requête | Explication |
|---|---|
| `foo AND bar` | Renvoie tous les processus dont une ligne de commande contient à la fois les termes `foo` et `bar`. |
| `foo AND NOT bar` | Renvoie tous les processus dont une ligne de commande contient le terme `foo`, mais pas le terme `bar`. |
| `foo OR bar` | Renvoie tous les processus contenant le terme `foo` ou le terme `bar`. |
| `foo or NOT bar` | Renvoie tous les processus contenant le terme `foo` ou ne contenant pas le terme `bar`. |

#### Groupe d'alertes

`Simple Alert` (valeur par défaut) : agrège vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies.

`Multi Alert` : applique l'alerte à chaque source en fonction des paramètres de votre groupe. Vous recevez une alerte pour chaque groupe qui répond aux conditions définies.

### Définir des conditions d'alerte

- Le nombre de processus était `above`, `above or equal to`, `below` ou `below or equal to` (supérieur, supérieur ou égal à, inférieur, inférieur ou égal à)
- au seuil sur un intervalle de `5 minutes`, `15 minutes`, `1 hour` ou sur une période plus longue. De plus, vous pouvez utiliser le paramètre `custom` pour définir une valeur entre 5 minutes et 24 heures.

Ici, le nombre de processus est égal au total des processus correspondants qui étaient actifs durant l'intervalle.

Les seuils vous permettent de déclencher une alerte lorsqu'une certaine valeur numérique est dépassée. Datadog dispose de deux types de notifications : les alertes et les avertissements. Les monitors de live processes se rétablissent automatiquement en fonction du seuil d'alerte ou d'avertissement.

#### Meilleures pratiques à adopter pour sélectionner le bon intervalle

Les monitors de live processes reposent sur une [période mobile][7] pour l'évaluation du nombre de processus. En d'autres termes, chaque minute, le monitor compte le nombre de processus lors des X dernières minutes et se déclenche si les conditions d'alerte sont respectées. Il est déconseillé d'utiliser des périodes d'évaluation de moins de cinq minutes, afin d'éviter tout faux positif causé par une défaillance réseau de courte durée entre l'Agent de processus et Datadog.

### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, délai d'évaluation, etc.), consultez la documentation relative à la [configuration des monitors][5].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation de la section **Configurer des notifications et des automatisations**, consultez la page [Notifications][6].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /fr/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /fr/monitors/configuration/#advanced-alert-conditions
[6]: /fr/monitors/notify/
[7]: /fr/monitors/configuration/?tab=thresholdalert#evaluation-window