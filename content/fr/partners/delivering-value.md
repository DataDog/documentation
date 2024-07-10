---
description: Étapes recommandées après avoir configuré l'ingestion de données dans
  Datadog.
private: true
title: Générer de la valeur ajoutée
---

Une fois l'ingestion de données configurée, l'étape suivante consiste à optimiser la valeur ajoutée de ces données pour vos clients. Voici quelques aspects clés sur lesquels vous concentrer.

## Configurer des monitors et des downtimes

Les monitors et les alertes permettent d'attirer l'attention des personnes concernées sur des systèmes et des services qui nécessitent d'être inspectés en vue d'une éventuelle intervention. Pour générer des alertes, Datadog propose :
- Des monitors, qui permettent de définir des conditions d'alerte
- Des downtimes, qui permettent de définir des intervalles sur lesquels il n'est pas nécessaire de générer une alerte

Pour vous familiariser avec le concept général des monitors, consultez les ressources suivantes :
- [Alertes][1]
- [Monitoring 101 : définir des alertes pertinentes][2] (blog).
- [Présentation de la surveillance][3] (formation).

### Migrer un monitor

Les fournisseurs de services ont souvent besoin de migrer un client vers Datadog à partir d'une autre plateforme de surveillance ou d'observabilité. Dans ce cas, le premier réflexe est souvent de reprendre les monitors utilisés dans la solution précédente et de les recréer dans Datadog. Toutefois, cette méthode signifie souvent que les fonctionnalités les plus utiles de Datadog ne sont pas utilisées. Il serait particulièrement dommage de ne pas tirer parti de la détection améliorée des problèmes, de la réduction des temps de résolution ou de la limitation des alertes superflues.

Avant de commencer à migrer vos monitors, passez en revue les alertes et les seuils définis en répondant aux questions suivantes :
- La métrique évolue-t-elle dans le temps ? Un [monitor d'anomalie][4] est peut-être plus adapté.
- La métrique évolue-t-elle en fonction de la charge ? Il est peut-être préférable d'utiliser un [monitor arithmétique][5] afin de combiner une métrique avec une autre métrique qui mesure la charge d'un système. Par exemple, la charge du système est susceptible d'augmenter avec le nombre de personnes qui utilisent un service.
- La valeur absolue de la métrique est-elle moins importante que le taux de variation ? Un [monitor de changement][6] ou un [monitor de prévision][7] est peut-être plus adapté.
- La valeur de la métrique est-elle moins importante que l'écart avec les valeurs d'autres hosts ou entités ? Par exemple, voulez-vous générer une alerte lorsque la latence est élevée sur l'un des nœuds d'un cluster mais pas sur les autres ? Un [monitor de singularité][8] est peut-être plus adapté dans ce cas de figure.
- Une intervention est-elle nécessaire uniquement lorsque plusieurs métriques remplissent certaines conditions ? Utilisez un [monitor composite][9] pour répondre à votre besoin sans avoir à créer de scripts.

### Gestion automatique des monitors

En tant que fournisseur de services, vous pouvez optimiser la gestion de vos monitors et de ceux de vos clients via l'une des méthodes suivantes :
- [API Monitors Datadog][10]
- Terraform
  - [Comment gérer vos ressources Datadog avec Terraform][11] (Vidéo)
  - [Automatiser votre surveillance avec le fournisseur Datadog pour Terraform][12] (guide HashiCorp)

Assurez-vous de [taguer vos monitors][13] afin faciliter la gestion de grandes quantités de monitors.

### Monitors recommandés

Il arrive que vous n'ayez pas beaucoup d'expérience avec certaines technologies utilisées par vos clients. Datadog propose une liste de [monitors recommandés][14] pour vous aider à intégrer ces nouvelles technologies rapidement et en toute confiance.

Pour en savoir plus sur les monitors, consultez les ressources suivantes :
- [Gérer les monitors][15]
- [Monitors][16]
- [Créer des alertes dynamiques avec des valeurs de tag][17] (Vidéo)
- [Surveiller les modifications de paramètres non appliquées][18]

### Downtimes

Les systèmes d'alerte posent souvent un problème majeur : ils génèrent beaucoup d'alertes superflues, ce qui signifie que les équipes finissent souvent par ne plus prêter attention aux notifications. Afin d'atténuer ce problème, il est nécessaire de réduire le nombre de faux positifs, en particulier dans les situations contrôlées telles qu'un arrêt planifié, une maintenance ou une mise à jour.

Les downtimes de Datadog vous permettent de désactiver vos monitors et ceux de vos clients pendant les périodes de maintenance, qu'elles soient planifiées ou non.

Pour en savoir plus sur la gestion des downtimes, en particulier les solutions automatiques, consultez les ressources suivantes :
- [Downtime][19]
- [Désactiver les alertes Datadog pendant un downtime planifié][20] (Blog)
- [Gérer Datadog avec Terraform][21] (Blog)
- [API Downtime][22]
- [Empêcher des monitors de générer des alertes pendant un downtime][23]

### Notifications

Voici quelques recommandations générales pour les notifications :
- Générez des alertes à volonté, mais notifiez les équipes avec modération
- Notifiez pour informer des symptômes, et non des causes

Datadog propose de nombreux canaux de notification pour informer les utilisateurs en cas d'alerte importante :

- Notifications par e-mail
- Intégrations, telles que :
  - [Slack][24]
  - [PagerDuty][25]
  - [Flowdock][26]
  - [ServiceNow][27]
  - [Google Chat][28]
  - [Microsoft Teams][29]
  - Et [bien d'autres][19]

Vous pouvez également invoquer n'importe quelle API REST à l'aide de l'[intégration Webhooks][30] générique. Cette intégration peut être utilisée pour notifier des utilisateurs, mais aussi pour déclencher des workflows de remédiation automatiques.

Pour en savoir plus sur les notifications, consultez les ressources suivantes :
- [Notifications][31]
- [Envoyer des alertes par SMS à l'aide de Webhooks et de Twilio][32] (Blog)

## Configurer des visualisations avec les dashboards

Les visualisations sont idéales pour représenter de façon claire des stacks techniques complexes ainsi que la vaste quantité de métriques et d'événements collectés. Lorsqu'un monitor vous alerte ou alerte l'un de vos clients d'un problème potentiel, il est souvent préférable de commencer par consulter les dashboards pour mener l'enquête.

### Dashboards prêts à l'emploi

Dès lors que vous configurez un Agent ou une intégration cloud, Datadog active automatiquement des dashboards prêts à l'emploi pour vous offrir des informations sur le service ou la technologie que vous venez d'intégrer. Vous pouvez également cloner un dashboard prêt à l'emploi pour créer facilement un dashboard personnalisé efficace.

### Créer des dashboards personnalisés

Générez de la valeur ajoutée et démarquez-vous de vos concurrents en créant des dashboards spécialement adaptés à des rôles ou des perspectives spécifiques.

Voici quelques recommandations à prendre en compte lors de la création d'un dashboard :
- Concentrez-vous sur vos métriques opérationnelles au lieu d'ajouter un trop grand nombre de métriques de ressources. Pour comprendre la différence entre les deux types, consultez [Monitoring 101 : Recueillir les bonnes données][33] (article de blog en anglais).
- Utilisez les [superpositions d'événements][34] pour mettre en corrélation vos métriques et vos événements.
- Annotez vos dashboards en ajoutant du [texte libre][35] pour décrire les données affichées et la marche à suivre si le dashboard indique un problème.

Pour en savoir plus sur les dashboards, consultez les ressources suivantes :
- [Améliorer vos dashboards][36] (Formation)
- Utiliser les [Notebooks Datadog][37] pour explorer vos données et élaborer des dashboards
- [Surveiller des datacenters et des réseaux avec Datadog][38] (Blog)
- [Utiliser les template variables associées][39] (Blog)
- [API Dashboard Datadog][40]
- [Configurer l'observabilité en tant que code avec Terraform et Datadog][41] (Webinar HashiCorp)

### Visualisations pour les utilisateurs n'ayant pas accès à Datadog

En fonction de votre modèle opérationnel, il est possible que vos clients n'aient pas besoin d'accéder directement à Datadog. Même s'ils n'ont pas accès à la plateforme, vous avez la possibilité de leur transmettre des visualisations Datadog via l'une des méthodes suivantes :
- [Partage de dashboard][42] : offrez une page de statut à vos clients en leur communiquant un lien d'accès public à un dashboard en lecture seule, ou partagez le dashboard en privé en spécifiant une adresse e-mail.
  - En tant que fournisseur de services, vous avez besoin d'une solution gérable à grande échelle. Utilisez les [API de Datadog pour gérer vos dashboards partagés][40] de façon efficace.
- Graphiques intégrables : si vous avez un portail client sur lequel vous souhaitez afficher des données Datadog, les graphiques intégrables sont la solution idéale. Vous pouvez modifier les paramètres pour filtrer les données en fonction de vos besoins. Pour en savoir plus, consultez les ressources suivantes :
  - [API Graphiques intégrables][43]
  - [Graphiques intégrables avec les template variables][44]

### Configurer des service-level objectives

Il est recommandé de communiquer en permanence à vos clients la qualité et le niveau de vos services en faisant preuve de transparence. Les service-level objectives (SLO) constituent le moyen idéal de contrôler et de visualiser la qualité d'un service pour le compte de vos clients, mais aussi d'aider vos clients à mettre en œuvre un reporting basé sur le niveau de service en interne.

Les ressources suivantes vous aideront à configurer et gérer des SLO :
- Pour commencer, consultez [Service Level Objectives 101 : Mettre en place des SLO efficaces][45] (Blog).
- [Liste de contrôle pour les SLO][46]
- [Conseils à suivre pour gérer vos SLO avec Datadog][47] (Blog)
- [Faire un suivi du statut de tous vos SLO dans Datadog][48] (Blog)
- [API SLO Datadog][49]

## Utiliser Watchdog

La fonctionnalité Watchdog permet de détecter de manière algorithmique les problèmes au sein de vos applications et de votre infrastructure.

Configurez un monitor Watchdog pour votre propre équipe ou votre client et recevez une notification dès que Watchdog détecte une nouvelle irrégularité.

Pour en savoir plus, consultez la section [Watchdog][50].

## Et ensuite ?

Pour découvrir comment surveiller l'utilisation de Datadog par vos différents clients et l'utilisation globale avec un compte multi-organisations, consultez la section [Données d'utilisation et de facturation][51].

[1]: /fr/monitors
[2]: https://www.datadoghq.com/blog/monitoring-101-alerting/
[3]: https://learn.datadoghq.com/courses/introduction-to-observability
[4]: /fr/monitors/types/anomaly/
[5]: /fr/monitors/guide/monitor-arithmetic-and-sparse-metrics/
[6]: /fr/monitors/types/metric/?tab=change
[7]: /fr/monitors/types/forecasts/?tab=linear
[8]: /fr/monitors/types/outlier/?tab=dbscan
[9]: /fr/monitors/types/composite/
[10]: /fr/api/latest/monitors/
[11]: https://www.youtube.com/watch?v=Ell_kU4gEGI
[12]: https://learn.hashicorp.com/tutorials/terraform/datadog-provider
[13]: https://www.datadoghq.com/blog/tagging-best-practices-monitors/
[14]: https://www.datadoghq.com/blog/datadog-recommended-monitors/
[15]: /fr/monitors/manage/
[16]: /fr/monitors/
[17]: https://www.youtube.com/watch?v=Ma5pr-u9bjk
[18]: /fr/monitors/guide/why-did-my-monitor-settings-change-not-take-effect/
[19]: /fr/monitors/notify/downtimes/
[20]: https://www.datadoghq.com/blog/mute-datadog-alerts-planned-downtime/
[21]: https://www.datadoghq.com/blog/managing-datadog-with-terraform/
[22]: /fr/api/latest/downtimes/
[23]: /fr/monitors/guide/prevent-alerts-from-monitors-that-were-in-downtime/
[24]: /fr/integrations/slack/?tab=slackapplication
[25]: /fr/integrations/pagerduty/
[26]: /fr/integrations/flowdock/
[27]: /fr/integrations/servicenow/
[28]: /fr/integrations/google_hangouts_chat/
[29]: /fr/integrations/microsoft_teams/
[30]: /fr/integrations/webhooks/
[31]: /fr/monitors/notify/
[32]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio/
[33]: https://www.datadoghq.com/blog/monitoring-101-collecting-data/
[34]: /fr/dashboards/widgets/timeseries/
[35]: /fr/dashboards/widgets/free_text/
[36]: https://learn.datadoghq.com/courses/building-better-dashboards
[37]: /fr/notebooks/
[38]: https://www.datadoghq.com/blog/network-device-monitoring/
[39]: https://www.datadoghq.com/blog/template-variable-associated-values/
[40]: /fr/api/latest/dashboards/
[41]: https://www.hashicorp.com/resources/configure-observability-as-code-with-terraform-and-datadog
[42]: /fr/dashboards/sharing/
[43]: /fr/api/latest/embeddable-graphs/
[44]: /fr/dashboards/guide/embeddable-graphs-with-template-variables/
[45]: https://www.datadoghq.com/blog/establishing-service-level-objectives/
[46]: /fr/monitors/guide/slo-checklist/
[47]: https://www.datadoghq.com/blog/define-and-manage-slos/
[48]: https://www.datadoghq.com/blog/slo-monitoring-tracking/
[49]: /fr/api/latest/service-level-objectives/
[50]: /fr/monitors/types/watchdog/
[51]: /fr/partners/billing-and-usage-reporting/