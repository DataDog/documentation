---
title: Monitor de checks custom
kind: documentation
description: Surveiller le statut de checks custom arbitraires.
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: Configurer les notifications de vos monitors
  - link: /monitors/downtimes/
    tag: Documentation
    text: Planifier un downtime pour désactiver un monitor
  - link: /monitors/monitor_status/
    tag: Documentation
    text: Consulter le statut de votre monitor
---
## Présentation

Les monitors de checks custom désignent tout check de service non transmis par l'une des [quelque {{< translate key="integration_count" >}} intégrations][1] incluses avec l'Agent. Les checks de service custom peuvent être envoyés à Datadog à l'aide d'un [check custom de l'Agent][2], de [DogStatsD][3] ou de l'[API][4].

## Création d'un monitor

Pour créer un [monitor de check custom][5] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Custom Check*.

### Choisir un check custom

Choisissez un check custom dans la liste déroulante.

### Choisir le contexte du monitor

Sélectionnez le contexte à surveiller en spécifiant les hostnames ou des tags, ou sélectionnez `All Monitored Hosts`. Si vous souhaitez exclure certains hosts, spécifiez leurs hostnames ou des tags dans le second champ.

* Le champ Include utilise la logique `AND`. Tous les hostnames et tags spécifiés doivent correspondre à un host pour que celui-ci soit inclus.
* Le champ Exclude utilise la logique `OR`. Tout host correspondant à l'un des hostnames ou tags est exclu.

### Définir vos conditions d'alerte

Dans cette section, utilisez les options **Check Alert** et **Cluster Alert** pour choisir entre une alerte de check ou une alerte de cluster :

{{< tabs >}}
{{% tab "Alerte de check" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils.

Paramètres d'une alerte de check :

1. Déclencher une alerte différente pour chaque `<GROUPE>` évalué par votre check.

    Les groupes d'un check sont définis en fonction d'une liste de groupes connus ou par vous. Pour les monitors de check custom, les groupes pour chaque check ne sont pas connus : vous devez donc les spécifier.

2. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique `OK`, `WARN`, `CRITICAL` ou `UNKNOWN`. Choisissez le nombre d'exécutions consécutives avec le statut ` `WARN` et `CRITICAL` qui déclenche une notification. Par exemple, pour être notifié immédiatement en cas d'échec de votre check, choisissez de recevoir une alerte à partir de `1` statut Critical ou `1` statut Warning.

3. `Do not notify` ou` Notify` en cas de statut Unknown.

4. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`.

    Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue. Par exemple, pour être sûr qu'un problème est résolu, choisissez de résoudre le monitor après `4` statuts OK.

{{% /tab %}}
{{% tab "Alerte de cluster" %}}

Une alerte de cluster calcule le pourcentage de checks présentant un statut donné et le compare à vos seuils.

Paramètres d'une alerte de cluster :

1. Choisissez si vos checks doivent être regroupés en fonction d'un tag ou non. `Ungrouped` calcule le pourcentage de statuts sur l'ensemble des sources. `Grouped` calcule le pourcentage de statuts pour chaque groupe.

2. Sélectionnez les seuils d'alerte et d'avertissement en pourcentage. Il est possible de ne définir qu'un seul de ces paramètres (alerte ou avertissement).

{{% /tab %}}
{{< /tabs >}}

Consultez la documentation relative aux [monitors de métrique][6] pour en savoir plus sur les options [No data][7], [Auto resolve][8] et [Evaluation delay][9].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/developers/custom_checks/write_agent_check/
[3]: /fr/developers/dogstatsd/
[4]: /fr/api/v1/service-checks/
[5]: https://app.datadoghq.com/monitors#create/custom
[6]: /fr/monitors/monitor_types/metric/
[7]: /fr/monitors/monitor_types/metric/#no-data
[8]: /fr/monitors/monitor_types/metric/#auto-resolve
[9]: /fr/monitors/monitor_types/metric/#evaluation-delay
[10]: /fr/monitors/notifications/