---
title: Visualisez votre check de service dans l'interface Datadog.
kind: guide
aliases:
  - /fr/monitors/faq/visualize-your-service-check-in-the-datadog-ui
  - /fr/guides/services_checks/
---
Les checks de service peuvent être visualisés et utilisés dans 3 sections de Datadog :

* [Sommaire des checks][1]
* [Screenboards][2]
* [Monitor de checks custom][3]

## Sommaire des checks

Pour accéder au [Sommaire des checks][1], cliquez sur l'onglet *Monitors* puis sur *Check Summary*.

{{< img src="monitors/faq/check_summary.png" alt="Sommaire des checks"  >}}

Cette section affiche la liste de tous les checks de votre infrastructure ainsi que de leur statut au cours des dernières 24 heures. Sélectionnez un check pour connaître le nombre de checks distincts relatifs à chaque tag qui lui est associé.

## Screenboards

Vous pouvez visualiser les checks de service dans un widget *Statut de check* sur les screenboards :

{{< img src="monitors/faq/check_status_widget.png" alt="Widget Statut de check"  >}}
​
Après avoir cliqué sur l'icône du widget *Check status*, la fenêtre contextuelle suivante apparaît :

{{< img src="monitors/faq/check_widget_config.png" alt="Configuration du widget Check"  >}}

Dans ce formulaire, vous pouvez sélectionner les options suivantes :

* **Check Name** : permet de sélectionner le nom de votre check de service.
* **Reporting Timeframe** : permet de sélectionner l'intervalle de temps à l'intérieur duquel vous souhaitez agréger votre statut.
* **Scoping** : permet de sélectionner un statut de check unique ou un cluster de statuts de check associés à un seul tag ou à un groupe de tags.
* **Widget Title** : permet de définir le titre de votre widget.

## Monitor de checks custom

Même si vous ne pouvez pas représenter graphiquement un check custom (comme vous le feriez pour des métriques), vous pouvez quand même le surveiller.
Accédez à l'onglet *Monitor* > *new monitor*, puis sélectionnez la section **custom check** :

{{< img src="monitors/faq/check_monitor.png" alt="Monitor de check"  >}}

Configurez votre monitor de checks custom : 
​
{{< img src="monitors/faq/check_monitor_config.png" alt="Configuration du monitor de check"  >}}

Dans ce formulaire, vous pouvez sélectionner les options suivantes :

* **Pick a custom check** : permet de sélectionner le nom du statut de check à surveiller
* **Pick monitor scope** : permet de sélectionner le contexte de votre monitor (en incluant ou excluant des tags)
* **Set alert conditions** : permet de choisir entre une alerte de check simple et une alerte de cluster.
* **Say what's happening** : permet de modifier la notification envoyée (en apprendre plus sur les [notifications Datadog][4].)
* **Notify your team** : permet de choisir les personnes qui doivent être notifiées par ce monitor

Les monitors de checks de service associés aux intégrations Datadog par défaut peuvent être définis dans l'onglet *Monitor* > *Integration* > onglet *Integration status* sur la gauche. Par exemple, avec l'intégration HAProxy : 

{{< img src="monitors/faq/haproxy_service_check.mp4" alt="Check de service Haproxy" video="true"  >}}

Pour apprendre à écrire une intégration, consultez la [documentation dédiée au développement d'intégrations][5].


[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors#create/custom
[4]: /fr/monitors/notifications
[5]: /fr/developers/integrations