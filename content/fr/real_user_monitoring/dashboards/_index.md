---
title: Dashboards RUM
kind: documentation
further_reading:
  - link: /real_user_monitoring/explorer
    tag: Documentation
    text: Explorer vos vues dans Datadog
---
Lorsque vous créez une application RUM, des dashboards sont automatiquement créés dans Datadog pour analyser l'intégralité des [données recueillies][1]. Les dashboards RUM figurent dans la liste des dashboards. Ils sont identifiés par le logo Datadog :

{{< img src="real_user_monitoring/dashboards/rum_dashboard_in_dashlist.png" alt="Dashboard RUM dans la liste des dashboards" >}}

Vous pouvez également consulter ces dashboards depuis la [page de vos applications RUM][2]. Cliquez sur les liens **Dashboard** associés à votre application :

{{< img src="real_user_monitoring/dashboards/rum_applications.gif" alt="Applications RUM" >}}

{{< whatsnext desc="Vous pouvez utiliser les dashboards suivants :" >}}
  {{< nextlink href="/real_user_monitoring/dashboards/performance_overview_dashboard" >}}<u>Performance Overview</u> : consultez une vue d'ensemble des performances et des données démographiques de votre site Web. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/resources_dashboard" >}}<u>Resources</u> : identifiez les ressources les plus lentes et étudiez les ressources tierces. {{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/dashboards/errors_dashboard" >}}<u>Errors</u> : analysez les erreurs survenant dans la console des utilisateurs en fonction du navigateur et du type d'appareil. {{< /nextlink >}}
{{< /whatsnext >}}

## Interactions avec les dashboards

Vous pouvez personnaliser vos dashboards RUM comme [n'importe quel autre dashboard][3]. Il est également possible d'explorer directement les données sous-jacentes dans votre [RUM Explorer][1].

### Template variables

Les dashboards RUM sont générés pour toutes vos applications avec un ensemble de template variables par défaut. Grâce à celles-ci, vous pouvez appliquer différents filtres. Utilisez par exemple la template variable `applicationId` pour afficher uniquement les données d'une certaine application.

{{< img src="real_user_monitoring/dashboards/template_variables.gif" alt="Template variable" style="width:50%;" >}}

### Événements de vue RUM

Pour explorer chacun événement, cliquez sur un graphique et sélectionnez l'option _View RUM events_. Vous serez alors redirigé vers le RUM Explorer. Les filtres que vous aviez sélectionnés sont conservés.

{{< img src="real_user_monitoring/dashboards/view_rum_events.gif" alt="View RUM events" style="width:80%;" >}}

### Personnaliser les dashboards

Dupliquez vos dashboards RUM et personnalisez-les afin de répondre à vos besoins. Vous pouvez ajouter des widgets et modifier les template variables :

{{< img src="real_user_monitoring/dashboards/clone_dashboard.png" alt="Dupliquer un dashboard" style="width:50%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/data_collected/
[2]: https://app.datadoghq.com/rum/list
[3]: /fr/dashboards/