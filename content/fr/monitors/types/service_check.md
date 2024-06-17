---
aliases:
- /fr/monitors/monitor_types/custom_check
- /fr/monitors/create/types/custom_check/
- /fr/monitors/types/custom_check/
description: Surveillez le statut de checks de service arbitraires.
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
kind: documentation
title: Monitor de check de service
---

## Présentation

Les monitors de checks de service désignent tout check de service non transmis par l'une des [quelque {{< translate key="integration_count" >}} intégrations][1] incluses avec l'Agent. Les checks de service peuvent être envoyés à Datadog à l'aide d'un [check custom de l'Agent][2], de [DogStatsD][3] ou de l'[API][4]. Pour en savoir plus, consultez la [présentation des checks de service][5].

## Création d'un monitor

Pour créer un [monitor de check de service][6] dans Datadog, utilisez la navigation principale : **Monitors** --> **New Monitor** --> **Service Check**.

### Choisir un check de service

Choisissez un check de service dans la liste déroulante.

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
    * Les groupes d'un check sont définis en fonction d'une liste de groupes connus ou par vous. Pour les monitors de check de service, les groupes pour chaque check ne sont pas connus : vous devez donc les spécifier.

2. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`
    * Choisissez le nombre d'exécutions consécutives avec le statut `CRITICAL` à partir duquel une notification doit être générée. Par exemple, pour être notifié immédiatement en cas d'échec de votre check, choisissez de recevoir une alerte à partir de `1` statut Critical.

3. Sélectionnez `Do not notify` ou` Notify` en cas de statut Unknown.
    * Si l'option `Notify` est sélectionnée, un changement de statut vers `UNKNOWN` déclenche une notification. Sur la [page Monitor Status][1], la barre d'état d'un groupe avec le statut `UNKNOWN` utilise la couleur grise `NODATA`. Le statut global du monitor demeure `OK`.

4. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`.
    * Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue. Par exemple, pour être sûr qu'un problème est résolu, choisissez de résoudre le monitor après `4` statuts `OK`.


[1]: /fr/monitors/manage/status
{{% /tab %}}
{{% tab "Alerte de cluster" %}}

Une alerte de cluster calcule le pourcentage de checks présentant un statut donné et le compare à vos seuils.

Chaque check possédant une combinaison spécifique de tags est considéré comme un check distinct dans le cluster. Seul le statut du dernier check de chaque combinaison de tags est pris en compte lors du calcul du pourcentage du cluster.

{{< img src="monitors/monitor_types/process_check/cluster_check_thresholds.png" alt="Seuils des checks de cluster" style="width:90%;">}}

Par exemple, un monitor de check de cluster regroupé par environnement peut envoyer des alertes si plus de 70 % des checks d'un environnement renvoient le statut `CRITICAL`, et envoyer un avertissement si plus de 70 % des checks d'un environnement renvoient le statut `WARN`.

Pour configurer une alerte de cluster :

1. Choisissez si vos checks doivent être regroupés en fonction d'un tag ou non. `Ungrouped` calcule le pourcentage de statuts sur l'ensemble des sources. `Grouped` calcule le pourcentage de statuts pour chaque groupe.

2. Sélectionnez les seuils d'alerte et d'avertissement en pourcentage. Il est possible de ne définir qu'un seul de ces paramètres (alerte ou avertissement).

{{% /tab %}}
{{< /tabs >}}

#### Conditions d'alerte avancées

Consultez la documentation relative à la [configuration des monitors][7] pour en savoir plus sur [les notifications en absence de données (No data)][8], [la résolution automatique][9] et [le délai pour les nouveaux groupes][10].

### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: /fr/developers/custom_checks/write_agent_check/
[3]: /fr/developers/dogstatsd/
[4]: /fr/api/v1/service-checks/
[5]: /fr/developers/service_checks/#overview
[6]: https://app.datadoghq.com/monitors/create/custom
[7]: /fr/monitors/configuration/#advanced-alert-conditions
[8]: /fr/monitors/configuration/#no-data
[9]: /fr/monitors/configuration/#auto-resolve
[10]: /fr/monitors/configuration/#new-group-delay
[11]: /fr/monitors/notify/