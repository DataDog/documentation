---
aliases:
- /fr/monitors/monitor_types/host
description: Vérifier si un ou plusieurs hosts transmettent des données à Datadog
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/notify/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
kind: documentation
title: Monitor de host
---

## Présentation

Chaque processus de l'Agent Datadog transmet un check de service du nom de `datadog.agent.up` avec le statut `OK`. Vous pouvez surveiller ce check pour un ou plusieurs hosts à l'aide d'un monitor de host.

## Création d'un monitor

Pour créer un [monitor de host][1] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Host*.

### Choisir les hosts par nom ou par tag

Sélectionnez les hosts à surveiller en spécifiant les hostnames ou des tags, ou sélectionnez `All Monitored Hosts`. Si vous souhaitez exclure certains hosts, spécifiez leurs hostnames ou des tags dans le second champ.

- Le champ Include utilise la logique `AND`. Tous les hostnames et tags spécifiés doivent correspondre à un host pour que celui-ci soit inclus.
- Le champ Exclude utilise la logique `OR`. Tout host correspondant à l'un des hostnames ou tags est exclu.

#### Scénarios

| Surveiller                                                | Include               | Exclude     |
|--------------------------------------------------------|-----------------------|-------------|
| Inclure tous les hosts avec le tag `env:prod`              | `env:prod`            | Laisser vide |
| Inclure tous les hosts, à l'exception de ceux avec le tag `env:test` | `All Monitored Hosts` | `env:test`  |

### Définir vos conditions d'alerte

Dans cette section, utilisez les options **Check Alert** et **Cluster Alert** pour choisir entre une alerte de check ou une alerte de cluster :

{{< tabs >}}
{{% tab "Alerte de check" %}}

Une alerte de check surveille si un host cesse de transmettre des données pendant une période donnée. Lorsque trop de temps s'écoule après l'exécution d'un check, cela peut signifier que le host ne parvient pas à transmettre de données.

Saisissez le nombre de minutes pendant lequel l'absence de données doit être vérifiée. La valeur par défaut est de 2 minutes.

Si `datadog.agent.up` cesse d'envoyer un statut `OK` pendant une durée supérieure au nombre de minutes indiqué, une alerte se déclenche.

{{% /tab %}}
{{% tab "Alerte de cluster" %}}

Une alerte de cluster surveille si un certain pourcentage de hosts ont cessé de transmettre des données pendant une période donnée.

Pour configurer une alerte de cluster :

1. Choisissez si vos hosts doivent être regroupés en fonction d'un tag ou non. `Ungrouped` calcule le pourcentage de statuts sur l'ensemble des hosts inclus. `Grouped` calcule le pourcentage de statuts pour chaque groupe.
2. Sélectionnez les seuils d'alerte et d'avertissement en pourcentage. Il est possible de ne définir qu'un seul de ces paramètres (alerte ou avertissement).
3. Saisissez le nombre de minutes pendant lequel l'absence de données doit être vérifiée. La valeur par défaut est de 2 minutes.

Si `datadog.agent.up` cesse d'envoyer un statut `OK` pendant une durée supérieure au nombre de minutes indiqué, une alerte se déclenche.

{{% /tab %}}
{{< /tabs >}}

### Conditions d'alerte avancées

Pour obtenir des instructions détaillées concernant les options d'alerte avancées (résolution automatique, délai pour les nouveaux groupes, etc.), consultez la documentation relative à la [configuration des monitors][2].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][3].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/host
[2]: /fr/monitors/create/configuration/#advanced-alert-conditions
[3]: /fr/monitors/notify/