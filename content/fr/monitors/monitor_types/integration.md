---
title: Monitor d'intégration
kind: documentation
description: Surveiller les valeurs des métriques ou des statuts de santé à partir d'une intégration spécifique
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

Utilisez un monitor d'intégration pour vérifier si une [intégration][1] installée fonctionne. Pour une surveillance approfondie, un monitor de métrique peut être utilisé pour évaluer des informations spécifiques concernant une intégration.

## Création d'un monitor

Pour créer un [monitor d'intégration][2] dans Datadog :

1. Utilisez la navigation principale : *Monitors --> New Monitor --> Integration*.
2. Recherchez une intégration ou sélectionnez-la à partir de la liste ou des images.
3. Choisissez un monitor de type **Integration metric** ou **Integration status** :
    {{< img src="monitors/monitor_types/integration/metric_or_status.png" alt="Métrique ou Statut"  style="width:90%;">}}

### Métrique d'intégration

Créez un monitor de métrique d'intégration en suivant les instructions dans la documentation relative aux [monitors de métrique][3]. Sélectionnez cette option pour permettre à la facette correspondant au type de monitor d'intégration de sélectionner le monitor sur la page [Gérer les monitors][4].

### Statut d'intégration

Si l'intégration comprend un check de service, l'onglet **Integration Status** devient actif.

**Remarque** : si l'intégration n'envoie pas de métrique ni de check de service, elle est considérée comme « Misconfigured ».

#### Choisir un check

S'il n'existe qu'un seul check pour l'intégration, aucune sélection n'est nécessaire. Autrement, sélectionnez le check pour votre monitor.

#### Choisir le contexte du monitor

Sélectionnez le contexte à surveiller en spécifiant les hostnames ou des tags, ou sélectionnez `All Monitored Hosts`. Si vous souhaitez exclure certains hosts, spécifiez leurs hostnames ou des tags dans le second champ.

* Le champ Include utilise la logique `AND`. Tous les hostnames et tags spécifiés doivent correspondre à un host pour que celui-ci soit inclus.
* Le champ Exclude utilise la logique `OR`. Tout host correspondant à l'un des hostnames ou tags est exclu.

#### Définir vos conditions d'alerte

Dans cette section, utilisez les options **Check Alert** et **Cluster Alert** pour choisir entre une alerte de check ou une alerte de cluster :

{{< tabs >}}
{{% tab "Alerte de check" %}}

Une alerte de check récupère les statuts consécutifs envoyés pour chaque groupe de checks et les compare à vos seuils.

Paramètres d'une alerte de check :

1. Déclencher une alerte différente pour chaque `<GROUPE>` évalué par votre check.

    Les groupes d'un check sont définis en fonction d'une liste de groupes connus ou par vous. Pour les monitors d'intégration, les groupes pour chaque check sont explicitement connus. Par exemple, l'intégration Postgres reçoit les tags `db`, `host` et `port`.

2. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique (`OK`, `WARN`, `CRITICAL` ou `UNKNOWN`). Choisissez le nombre de statuts `CRITICAL` consécutifs à partir duquel une notification doit être envoyée. Par exemple, il arrive que la connexion à une base de données n'échoue que pendant un bref instant ; en définissant cette valeur sur `> 1`, les échecs ponctuels sont ignorés, tandis que les échecs prolongés déclenchent une notification.

3. Résoudre l'alerte après le nombre de réussites consécutives sélectionné : `<NOMBRE>`

    Choisissez le nombre de statuts `OK` consécutifs à partir duquel l'alerte doit être résolue.

{{% /tab %}}
{{% tab "Alerte de cluster" %}}

Une alerte de cluster calcule le pourcentage de checks présentant un statut donné et le compare à vos seuils.

Paramètres d'une alerte de cluster :

1. Choisissez si vos checks doivent être regroupés en fonction d'un tag ou non. `Ungrouped` calcule le pourcentage de statuts sur l'ensemble des sources. `Grouped` calcule le pourcentage de statuts pour chaque groupe.

2. Sélectionnez le pourcentage de seuil d'alerte.

{{% /tab %}}
{{< /tabs >}}

Consultez la documentation relative aux [monitors de métrique][3] pour en savoir plus sur les options [No data][5], [Auto resolve][6] et [Evaluation delay][7].

#### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/
[2]: https://app.datadoghq.com/monitors#create/integration
[3]: /fr/monitors/monitor_types/metric/
[4]: https://app.datadoghq.com/monitors/manage
[5]: /fr/monitors/monitor_types/metric/#no-data
[6]: /fr/monitors/monitor_types/metric/#auto-resolve
[7]: /fr/monitors/monitor_types/metric/#evaluation-delay
[8]: /fr/monitors/notifications/