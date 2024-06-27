---
aliases:
- /fr/developers/faq/how-can-i-submit-a-custom-status-check
- /fr/developers/service_checks/visualize-your-service-check-in-the-datadog-ui
- /fr/guides/services_checks/
- /fr/monitors/guide/visualize-your-service-check-in-the-datadog-ui
title: Check de service
---

## Présentation

Grâce aux checks de service, vous pouvez définir le statut d'un service, afin de le surveiller dans Datadog. Les checks de service effectuent un suivi du statut de disponibilité d'un service donné. Après un certain nombre d'échecs successifs de connexion au service en question, l'Agent de surveillance vous envoie une alerte. Par exemple, si l'Agent surveillant un host Redis ne parvient pas à se connecter à Redis ni à recueillir des métriques après trois tentatives consécutives, vous en êtes informé.

Les checks de service au niveau du cluster vous permettent de surveiller efficacement les systèmes distribués ou redondants qui peuvent subir certaines défaillances. Ces alertes sont particulièrement utiles pour les architectures au sein desquelles des hosts individuels exécutent plusieurs services. En effet, elles affichent le niveau de dégradation du service en question, même si les hosts exécutant ce service demeurent disponibles (et transmettent un check de santé au niveau du host).

Vous pouvez configurer la surveillance et l'envoi d'alertes lorsqu'un service critique non redondant n'est plus accessible, ou lorsqu'un cluster est sur le point d'échouer en raison d'une défaillance importante d'un nœud. Il est également possible de surveiller d'autres situations critiques, comme une chute du débit des requêtes ou une hausse de la latence des requêtes.

Si une intégration ne possède pas de check de service natif, ou si vous souhaitez surveiller le statut de disponibilité d'un service interne, vous devrez peut-être configurer un check de service.

Pour utiliser un check de service, commencez par configurer le check :

{{< whatsnext >}}
    {{< nextlink href="/developers/service_checks/agent_service_checks_submission" >}}Envoyer un check d'Agent custom{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission" >}}Envoyer un check de service avec DogStatsD{{< /nextlink >}}
    {{< nextlink href="/api/v1/service-checks/" >}}Envoyer un check de service avec l'API Datadog{{< /nextlink >}}
{{< /whatsnext >}}

Dès que le check de service commence à envoyer des données, vous pouvez consulter son résumé et configurer des dashboards, des monitors et des alertes :

## Visualiser votre check de service dans Datadog

Les checks de service peuvent être visualisés et utilisés dans 3 sections de Datadog :

- [Sommaire des checks][1]
- [Screenboards][2]
- [Monitor de check de service][3]

### Sommaire des checks

Cliquez sur **Monitors** > **Check Summary** pour afficher la page [Check Summary][1] contenant le sommaire des checks.

{{< img src="developers/service_checks/check_summary.png" alt="Sommaire des checks" >}}

Cette section affiche la liste de tous les checks de votre infrastructure ainsi que de leurs statuts au cours des dernières 24 heures. Sélectionnez un check pour connaître le nombre de checks distincts relatifs à chaque tag qui lui est associé.

### Screenboards

Vous pouvez visualiser vos checks de service en ajoutant un widget **Statut de check** à un screenboard :

{{< img src="developers/service_checks/check_status_widget.png" alt="Widget Statut de check" >}}

Lorsque vous cliquez sur l'icône du widget **Statut de check**, la fenêtre contextuelle suivante s'affiche :

{{< img src="developers/service_checks/check_widget_config.png" alt="Configuration du widget Statut de check" >}}

Utilisez ce formulaire pour définir les options suivantes :

- **Check Name** : permet de sélectionner le nom de votre check de service.
- **Reporting Timeframe** : permet de sélectionner l'intervalle de temps selon lequel le statut doit être agrégé.
- **Scoping** : permet de sélectionner un statut de check unique ou un cluster de statuts de check associés à une seule valeur de tag ou à une clé de tag.
- **Widget Title** : permet de définir le titre de votre widget.

## Monitor de check de service

Même si vous ne pouvez pas représenter graphiquement l'évolution d'un check de service (comme vous le feriez pour des métriques), vous pouvez quand même le surveiller. Accédez à l'onglet **Monitors** > **New Monitor**, puis sélectionnez **Service Check** :

{{< img src="developers/service_checks/service_check_monitor.png" alt="Monitor de check" >}}

Utilisez ce formulaire pour définir les options suivantes :

- **Pick a service check** : permet de sélectionner le nom du statut de check à surveiller.
- **Pick monitor scope** : permet de sélectionner le contexte de votre monitor (en incluant ou excluant des tags).
- **Set alert conditions** : permet de choisir entre une alerte de check simple et une alerte de cluster.
- **Notify your team** : permet de choisir les personnes qui doivent être notifiées par ce monitor.
- **Say what's happening** : permet de modifier les notifications envoyées (en savoir plus sur les [notifications Datadog][4]).

Pour en savoir plus sur la création d'un check de service, consultez la section [Monitor de check de service][5].

[1]: https://app.datadoghq.com/check/summary
[2]: https://app.datadoghq.com/dashboard
[3]: https://app.datadoghq.com/monitors#create/custom
[4]: /fr/monitors/notify/
[5]: /fr/monitors/types/service_check/