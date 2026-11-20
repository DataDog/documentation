---
description: Affichez et gérez les événements de monitor sur la page d'état, y compris
  les actions rapides, les détails des événements et les outils de dépannage.
further_reading:
- link: events/
  tag: Documentation
  text: Event Management
title: Événements d'état
---
<div class="alert alert-info">Les événements d'état font partie de la <a href="/monitors/status/status_page">page d'état du monitor provisoire</a>. Si vous utilisez l'ancienne page d'état, consultez la documentation <a href="/monitors/status/status_legacy">Status Page (Legacy)</a>.</div>

## Présentation {#overview}

{{< img src="/monitors/status/status_page_event_details.png" alt="Page d'état du monitor affichant les détails de l'événement" style="width:100%;" >}}

Tous les événements générés par votre monitor apparaissent sur la page d'état du monitor, indiquant le nom des groupes, le type d'événement et l'horodatage. La chronologie des événements inclut également les événements de downtime et de piste d'audit.

Pour chaque événement, vous pouvez accéder aux actions rapides et afficher les ressources associées, comme les tableaux de bord et les logs.

## Section des détails de l'événement {#event-details-section}

Pour explorer chaque événement individuel afin d'obtenir plus d'informations, y compris les tags et les actions associées :

1. Depuis la page d'état du monitor, faites défiler jusqu'à {{< ui >}}Event timeline{{< /ui >}}.
2. Cliquez sur un événement dans la chronologie pour afficher les détails de l'événement.

Utilisez les détails de l'événement pour comprendre les alertes de monitor et identifier les causes profondes. Ces informations prennent en charge les flux de travail des intervenants et vous aident à rester informé des situations en cours.

### Prenez des mesures pour remédier {#take-action-to-remediate}

Avec Quick Actions, vous pouvez agir sans quitter la page d'état. Les intervenants gagnent du temps car le contexte est automatiquement ajouté.

| Action | Description |
| :---- | :---- |
| {{< ui >}}Mute{{< /ui >}}  | Créez un [downtime][1] pour désactiver les alertes de monitor. |
| {{< ui >}}Resolve{{< /ui >}} | Définissez temporairement l'état du monitor sur `OK` jusqu'à sa prochaine évaluation. |
| {{< ui >}}Declare Incident{{< /ui >}} | Faites remonter les alertes de monitor avec [Incident Management][2]. |
| {{< ui >}}Create Work Item{{< /ui >}} | Créez un [élément de travail][3] pour suivre cette enquête sur l'alerte sans quitter Datadog. |
| {{< ui >}}Run Workflow{{< /ui >}} | Exécutez l'automatisation [Workflow][4] avec des extraits prédéfinis pour exécuter des actions d'atténuation. |

### Resolve {#resolve}

Vous pouvez résoudre une alerte de monitor depuis la page d'état [Header][5] ou les sections de détails de l'événement. La résolution depuis la section des détails de l'événement n'affecte que le groupe lié à l'événement sélectionné, tandis que la résolution depuis [Header] résout tous les groupes de l'alerte et définit l'état du monitor sur `OK` (tous les groupes).

Si un monitor envoie une alerte parce que ses données actuelles correspondent à l'état `ALERT`, l'utilisation de `resolve` entraînera le passage temporaire de l'état de `ALERT` à `OK`, puis le retour à `ALERT`. Par conséquent, `resolve` n'est pas destiné à accuser réception de l'alerte ou à demander à Datadog de l'ignorer.

La résolution manuelle d'un monitor est utile lorsque les données sont signalées par intermittence. Par exemple, après le déclenchement d'une alerte, le monitor peut cesser de recevoir des données, ce qui l'empêche d'évaluer les conditions d'alerte et de revenir à l'état `OK`. Dans de tels cas, la fonction `resolve` ou {{< ui >}}Automatically resolve monitor after X hours{{< /ui >}} ramène le monitor à un état `OK`.

**Cas d'utilisation typique** : Un monitor basé sur des métriques d'erreur qui ne sont pas générées lorsqu'il n'y a pas d'erreurs (`aws.elb.httpcode_elb_5xx`, ou tout compteur DogStatsD dans votre code signalant une erreur _uniquement lorsqu'il y a une erreur_).

## Section de dépannage des événements {#event-troubleshooting-section}

{{< img src="/monitors/status/events/event_troubleshooting.png" alt="Dépannage des événements avec un exemple de carte des dépendances" style="width:100%;" >}}

Pour chaque événement, accédez aux informations de dépannage pour aider les intervenants à comprendre rapidement le contexte de l'alerte.

| Composant de dépannage     | Description    |
| ---  | ----------- |
| {{< ui >}}Dependency Map{{< /ui >}} | Lorsqu'un tag de service est disponible, soit en tant que tag de monitor, soit dans le groupe, vous pouvez accéder à une carte des dépendances affichant l'état de vos dépendances. |
| {{< ui >}}Change Tracking{{< /ui >}} | Lorsqu'un tag de service est disponible, soit en tant que tag de monitor, soit dans le groupe, vous pouvez accéder à une liste des changements pertinents pour votre service et ses dépendances. Pour plus de détails sur les types spécifiques de changements pris en charge et les exigences de configuration, consultez la documentation [Change Tracking][6]. |


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/downtimes/?tab=bymonitorname
[2]: /fr/incident_response/incident_management/
[3]: /fr/incident_response/work_management/
[4]: /fr/actions/workflows/trigger/#trigger-a-workflow-from-a-monitor
[5]: /fr/monitors/status/status_page/#header
[6]: /fr/change_tracking