---
title: Check de service
kind: documentation
aliases:
  - /fr/developers/faq/how-can-i-submit-a-custom-status-check
  - /fr/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
  - /fr/guides/services_checks/
  - /fr/monitors/guide/visualize-your-service-check-in-the-datadog-ui
---
## Présentation

Les checks de service vous permettent de déterminer le statut d'un service afin de le surveiller dans Datadog. Tous les checks de status doivent présenter l'un des codes de statut suivants :

| Code de statut | Description |
|-------------|-------------|
| `0`         | OK          |
| `1`         | Warning     |
| `2`         | Critical    |
| `3`         | Unknown     |

{{< whatsnext desc="Il existe plusieurs façons d'envoyer un check de service à Datadog :">}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}Envoyer un check avec un check custom de l'Agent.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}Envoyer un check de service avec DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/api/#service-checks" >}}Envoyer un check de service avec l'API Datadog.{{< /nextlink >}}
{{< /whatsnext >}}

## Visualiser votre check de service dans Datadog

Les checks de service peuvent être visualisés et utilisés dans 3 sections de Datadog :

* [Sommaire des checks][1]
* [Screenboards][2]
* [Monitor de checks custom][3]

### Sommaire des checks

Cliquez sur l'onglet *Monitors* puis sur *Check Summary* pour afficher le [Sommaire des checks][1].

{{< img src="developers/service_checks/check_summary.png" alt="Sommaire des checks" >}}

Cette section affiche la liste de tous les checks de votre infrastructure ainsi que de leurs statuts au cours des dernières 24 heures. Sélectionnez un check pour connaître le nombre de checks distincts relatifs à chaque tag qui lui est associé.

### Screenboards

Vous pouvez visualiser vos checks de service en ajoutant un widget *Statut de check* à un screenboard :

{{< img src="developers/service_checks/check_status_widget.png" alt="Widget Statut de check" >}}

Après avoir cliqué sur l'icône du widget *Check Status*, la fenêtre contextuelle suivante apparaît :

{{< img src="developers/service_checks/check_widget_config.png" alt="Configuration du widget Statut de check" >}}

Utilisez ce formulaire pour définir les options suivantes :

* **Check Name** : permet de sélectionner le nom de votre check de service.
* **Reporting Timeframe** : permet de sélectionner l'intervalle de temps selon lequel le statut doit être agrégé.
* **Scoping** : permet de sélectionner un statut de check unique ou un cluster de statuts de check associés à un seul tag ou à un groupe de tags.
* **Widget Title** : permet de définir le titre de votre widget.

## Monitor de checks custom

Même si vous ne pouvez pas représenter graphiquement un check custom (comme vous le feriez pour des métriques), vous pouvez quand même le surveiller.
Accédez à l'onglet *Monitor* > *new monitor*, puis sélectionnez la section **custom check** :

{{< img src="developers/service_checks/check_monitor.png" alt="Monitor de check"  >}}

Configurez votre monitor de checks custom : 

{{< img src="developers/service_checks/check_monitor_config.png" alt="Configuration de monitor de check" >}}

Utilisez ce formulaire pour définir les options suivantes :

* **Pick a custom check** : permet de sélectionner le nom du statut de check à surveiller.
* **Pick monitor scope** : permet de sélectionner le contexte de votre monitor (en incluant ou excluant des tags).
* **Set alert conditions** : permet de choisir entre une alerte de check simple et une alerte de cluster.
* **Say what's happening** : permet de modifier les notifications envoyées (en savoir plus sur les [notifications Datadog][4]).
* **Notify your team** : permet de choisir les personnes qui doivent être notifiées par ce monitor.

Les monitors de checks de service associés aux intégrations Datadog par défaut peuvent être définis dans l'onglet *Monitor* > *Integration* > onglet *Integration status* sur la gauche. Par exemple, avec l'intégration HAProxy : 

{{< img src="developers/service_checks/haproxy_service_check.mp4" alt="Check de service Haproxy" video="true" >}}

Pour apprendre à écrire une intégration, consultez la [documentation dédiée au développement d'intégrations][5].

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors#create/custom
[4]: /fr/monitors/notifications
[5]: /fr/developers/integrations