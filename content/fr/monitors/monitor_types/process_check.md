---
title: Monitor de check de processus
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

Un monitor de check de processus surveille le statut généré par le check de l'Agent `process.up`. Au niveau de l'Agent, vous pouvez [configurer les seuils de votre check][1] en fonction du nombre processus correspondants.

## Création d'un monitor

Pour créer un [monitor de check de processus][2] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Process Check*.

### Choisir un processus

Dans la liste déroulante, sélectionnez un processus à surveiller. Filtrez la liste en saisissant vos critères de recherche.

### Choisir le contexte du monitor

Sélectionnez les hosts à surveiller en spécifiant les hostnames ou des tags, ou sélectionnez `All Monitored Hosts`. Si vous souhaitez exclure certains hosts, spécifiez leurs hostnames ou des tags dans le second champ. Si vous souhaitez exclure certains hosts, spécifiez leurs noms ou des tags dans le second champ.

* Le champ include utilise la logique `AND`. Tous les hostnames et tags spécifiés doivent correspondre à un host pour que celui-ci soit inclus.
* Le champ Exclude utilise la logique `OR`. Tout host correspondant à l'un des hostnames ou tags est exclu.

### Définir vos conditions d'alerte

{{< tabs >}}
{{% tab "Alerte de check" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils. Pour les monitors de check de processus, les groupes sont statiques : `host` et `process`.

Paramètres d'une alerte de check :

1. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique (`OK`, `WARN` ou `CRITICAL`). Choisissez le nombre de statuts `WARN` et `CRITICAL` consécutifs à partir duquel une notification doit être envoyée. Par exemple, il arrive que la connexion à un processus échoue pendant un bref instant seulement ; en définissant cette valeur sur `> 1`, les échecs ponctuels sont ignorés, tandis que les échecs prolongés déclenchent une notification.

2. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`

    Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue.

{{% /tab %}}
{{% tab "Alerte de cluster" %}}

Une alerte de cluster calcule le pourcentage de checks de processus présentant un statut donné et le compare à vos seuils.

Paramètres d'une alerte de cluster :

1. Choisissez si vos checks de processus doivent être regroupés en fonction d'un tag ou non. `Ungrouped` calcule le pourcentage de statuts sur l'ensemble des sources. `Grouped` calcule le pourcentage de statuts pour chaque groupe.

2. Sélectionnez les seuils d'alerte et d'avertissement en pourcentage. Il est possible de ne définir qu'un seul de ces paramètres (alerte ou avertissement).

{{% /tab %}}
{{< /tabs >}}

Consultez la documentation relative aux [monitors de métrique][3] pour en savoir plus sur les options [No data][4], [Auto resolve][5] et [Evaluation delay][6].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][7].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/process/
[2]: https://app.datadoghq.com/monitors#create/process
[3]: /fr/monitors/monitor_types/metric/
[4]: /fr/monitors/monitor_types/metric/#no-data
[5]: /fr/monitors/monitor_types/metric/#auto-resolve
[6]: /fr/monitors/monitor_types/metric/#evaluation-delay
[7]: /fr/monitors/notifications/