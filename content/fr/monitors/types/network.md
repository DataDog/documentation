---
aliases:
- /fr/monitors/monitor_types/network
- /fr/monitors/create/types/network/
description: Vérifier le statut des endpoints TCP/HTTP
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
kind: documentation
title: Monitor réseau
---

## Présentation

Les monitors réseau sont destinés aux checks TCP et HTTP disponibles dans l'Agent. Lisez la documentation sur le [check HTTP][1] ou celle sur le [check TCP][2] pour en savoir plus sur la configuration de l'Agent.

## Création d'un monitor

Pour créer un [monitor réseau][3] dans Datadog, utilisez la navigation principale : *Monitors --> New Monitor --> Network*.

### Statut du réseau

#### Choisir un check

* Choisissez un type de check Network (`ssl`, `http` ou `tcp`).
* Choisissez un endpoint spécifique ou `All monitored <TYPE> endpoints`.

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

    Les groupes d'un check sont définis en fonction d'une liste de groupes connus ou par vous. Pour les monitors réseau, les groupes pour chaque check sont explicitement connus. Par exemple, le check HTTP reçoit les tags `host`, `instance` et `url`.

2. Déclencher l'alerte après le nombre d'échecs consécutifs sélectionné : `<NOMBRE>`

    Chaque exécution du check transmet un statut unique (`OK`, `WARN` ou `CRITICAL`). Choisissez le nombre de statuts `CRITICAL` consécutifs à partir duquel une notification doit être envoyée. Par exemple, il arrive que le check HTTP détecte un problème de connexion pendant un bref instant seulement ; en définissant cette valeur sur `> 1`, les échecs ponctuels sont ignorés, tandis que les échecs prolongés déclenchent une notification.

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

#### Conditions d'alerte avancées

Consultez la documentation relative à la [configuration des monitors][4] pour en savoir plus sur [les notifications en absence de données (No data)][5], [la résolution automatique][6] et [le délai pour les nouveaux groupes][7].

#### Notifications

Pour obtenir des instructions détaillées sur l'utilisation des sections **Say what's happening** et **Notify your team**, consultez la page [Notifications][8].

### Métrique réseau

Créez un monitor de métrique réseau en suivant les instructions de la documentation relative aux [monitors de métrique][10]. Un tel monitor peut être sélectionné par la facette de type de monitor réseau sur la page [Manage Monitors][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/http_check/
[2]: /fr/integrations/tcp_check/
[3]: https://app.datadoghq.com/monitors#create/network
[4]: /fr/monitors/configuration/#advanced-alert-conditions
[5]: /fr/monitors/configuration/#no-data
[6]: /fr/monitors/configuration/#auto-resolve
[7]: /fr/monitors/configuration/#new-group-delay
[8]: /fr/monitors/notify/
[9]: https://app.datadoghq.com/monitors/manage
[10]: /fr/monitors/types/metric