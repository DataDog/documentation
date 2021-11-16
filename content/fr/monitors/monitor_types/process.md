---
title: Monitor de live processes
kind: documentation
description: Vérifier si un processus est en cours d'exécution sur un host
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

Les monitors de live processes tirent parti des données recueillies par l'[Agent de processus][1]. Créez des monitors qui vous envoient des états d'alerte ou d'avertissement selon le nombre d'éléments d'un groupe de processus associés à des hosts ou tags.

## Création d'un monitor

Pour créer un [monitor de live process][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Live Process*.

### Sélectionner des processus

Recherchez un processus à surveiller en indiquant une liste de chaînes séparées par des espaces. Cela lance une recherche approximative avec correspondance partielle dans l'ensemble des processus de votre infrastructure. Vous pouvez utiliser les opérateurs de recherche `AND`, `OR` et `NOT`. Consultez la page [Surveillance de live processes][3] pour en savoir plus. Vous pouvez également appliquer un filtre basé sur des tags pour affiner le contexte de votre monitor.

Les processus et les totaux correspondants s'affichent sous la recherche :

{{< img src="monitors/monitor_types/process/select_processes.png" alt="Sélectionner des processus" style="width:90%;">}}

Une fois votre recherche définie, un graphique s'affiche au-dessus des critères de recherche. Celui-ci représente le nombre total approximatif de processus trouvés. Pour obtenir des données plus granulaires, consultez votre [page Live Process][4].

#### Groupe d'alertes

`Simple Alert` (valeur par défaut) : agrège vos données pour toutes les sources de transmission. Vous recevez une alerte lorsque la valeur agrégée répond aux conditions définies.

`Multi Alert` : applique l'alerte à chaque source en fonction des paramètres de votre groupe. Vous recevez une alerte pour chaque groupe qui répond aux conditions définies.

### Définir vos conditions d'alerte

* Le total était `above`, `above or equal to`, `below` ou `below or equal to` (supérieur, supérieur ou égal à, inférieur, inférieur ou égal à)
* au seuil sur un intervalle de `5 minutes`, `15 minutes` ou `1 hour` ou sur un intervalle `custom` (entre 1 minute et 48 heures).

Les seuils vous permettent de déclencher une alerte lorsqu'une certaine valeur numérique est dépassée. Datadog dispose de deux types de notifications : les alertes et les avertissements. Les monitors de live processes se rétablissent automatiquement en fonction du seuil d'alerte ou d'avertissement.

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/infrastructure/process/
[2]: https://app.datadoghq.com/monitors#create/live_process
[3]: /fr/infrastructure/process/#search-syntax
[4]: https://app.datadoghq.com/process
[5]: /fr/monitors/notifications/