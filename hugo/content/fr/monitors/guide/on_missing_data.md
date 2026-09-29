---
description: Migrez des anciennes configurations « No Data » vers les options « On
  Missing Data » pour une meilleure gestion des données manquantes dans les monitors
  de métriques.
further_reading:
- link: /api/latest/monitors/
  tag: API
  text: Documentation de l'API Monitors
title: Migration vers la configuration « On Missing Data »
---
## Présentation {#overview}

Les monitors de métriques offrent des options améliorées pour la gestion des données manquantes, vous permettant de différencier les données manquantes en tant que mode de défaillance et en tant qu'état sain. 

Ces options s'alignent sur ce qui est disponible dans d'autres types de monitors comme les logs, les événements, la CI, les bases de données, Error Tracking, et plus encore.

## Avantages de l'utilisation des options « On Missing Data » {#benefits-of-using-on-missing-data-options}

Lors de la mesure du nombre d'événements indésirables, tels que des erreurs, les monitors doivent indiquer « OK » lorsqu'aucune donnée n'est détectée. Avec les anciennes configurations « No Data », les monitors signalaient « No Data ». Les options de configuration « On Missing Data » permettent aux monitors de refléter plus précisément les états de santé, améliorant ainsi la clarté.

## Monitors gérés via l'interface utilisateur {#monitors-managed-through-the-ui}

Si vous gérez vos monitors depuis l'interface utilisateur, la configuration se met automatiquement à jour la prochaine fois que vous les modifiez. Pour mettre à jour la configuration « On Missing Data » plus rapidement, consultez les sections suivantes sur l'ajustement via l'API.

## Monitors gérés via l'API ou Terraform {#monitors-managed-through-the-api-or-terraform}

Si vous gérez vos monitors avec l'API ou Terraform, remplacez `notify_no_data` et `no_data_timeframe` par `on_missing_data`. Le paramètre `no_data_timeframe` n'est pas requis car `on_missing_data` utilise la même période que la fenêtre temporelle.  

### Paramètres de l'API {#api-parameters}

L'ancien paramètre « No Data », `notify_no_data`, reste disponible sur les monitors existants et n'est pas automatiquement mis à niveau vers les nouvelles fonctionnalités `on_missing_data`.

| Paramètre                               | Description dans l'interface utilisateur                                                                                     |
|-----------------------------------------|----------------------------------------------------------------------------------------------------|
| `"on_missing_data": "show_and_notify_no_data"` | Si des données sont manquantes {{< ui >}}Show NO DATA and notify{{< /ui >}}<br>(Auparavant, « {{< ui >}}Notify if data is missing{{< /ui >}} »)                       |
| `"on_missing_data": "show_no_data"`     | Si des données sont manquantes {{< ui >}}Show NO DATA{{< /ui >}}<br>(Auparavant, « {{< ui >}}Do not notify if data is missing{{< /ui >}} »)                           |
| `"on_missing_data": "resolve"`          | Si des données sont manquantes {{< ui >}}Show OK{{< /ui >}}                                                                       |
| `"on_missing_data": "default"` en cas d'utilisation de l'agrégation somme ou compte | Si des données sont manquantes {{< ui >}}Evaluate as 0{{< /ui >}} (ou autre valeur par défaut)                                  |
| `"on_missing_data": "default"` en cas d'utilisation de tous les autres types d'agrégation | Si des données sont manquantes {{< ui >}}Show last known status{{< /ui >}} |

Pour tous les champs disponibles, consultez la [Documentation de l'API][1].

Voici un exemple avant et après d'un monitor JSON avec ces champs:

**Avant**  
{{< highlight yaml "hl_lines=11-12" >}}{ 
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
        "thresholds": { "critical": 90 },  
        "notify_audit": false,  
        "include_tags": false,  
        "notify_no_data": true,  
        "no_data_timeframe": 10  
    }  
}
{{< /highlight >}}


**Après**  
{{< highlight yaml "hl_lines=11" >}}{
  "name": "CPU usage is high for host $host.value",  
    "type": "query alert",  
    "query": "avg(last_5m):100 - avg:system.cpu.idle{$host} > 90",  
    "message": "A high CPU usage has been detected for host $host.value, which can impact the system performance.",  
    "tags": [],  
    "options": {  
       "thresholds": { "critical": 90 },  
       "notify_audit": false,  
       "include_tags": false,  
       "on_missing_data": "show_and_notify_no_data"  
    }  
}  
{{< /highlight >}}

## SLO basés sur des monitors {#monitor-based-slos}

Les SLO traitent la disponibilité et le downtime selon cette correspondance :

| Configuration « On Missing Data » | Statut du monitor                 | Traitement SLO               |
|-------------------------------|--------------------------------|-----------------------------|
| {{< ui >}}Show OK{{< /ui >}}                       | OK                             | Disponibilité                      |
| {{< ui >}}Show No Data{{< /ui >}}                  | No Data                        | Disponibilité                      |
| {{< ui >}}Show No Data and Notify{{< /ui >}}       | No Data                        | Downtime                    |
| {{< ui >}}Show last known status{{< /ui >}}        | Quel que soit le dernier statut   | Si OK, Disponibilité<br>Si Alerte, Downtime |
| {{< ui >}}Evaluate as zero{{< /ui >}}              | Dépend de la configuration du seuil | Si OK, Disponibilité<br>Si Alerte, Downtime |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/api/latest/monitors/