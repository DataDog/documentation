---
aliases:
- /fr/developers/datadog_apps/
- /fr/developers/ui_extensions/
- /fr/developers/faq/ui_extensions
- /fr/service_management/app_builder/
description: Plateforme low-code pour créer des outils internes avec une interface
  glisser-déposer, la prise en charge de JavaScript et l'intégration avec des services
  externes.
disable_toc: false
further_reading:
- link: /actions/datadog_apps/
  tag: Documentation
  text: Apps Datadog
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: Blog
  text: 'Datadog Cloud SIEM : stimuler l''innovation dans les opérations de sécurité'
- link: /actions/actions_catalog/
  tag: Documentation
  text: Action Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Créer des outils de surveillance et de remédiation personnalisés avec la solution
    Datadog App Builder
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Corrigez les applications créées avec Datadog App Builder
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Créez des workflows et des applications Datadog en quelques minutes avec notre
    assistant IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Comment nous avons créé une application unique pour automatiser les tâches
    répétitives avec Datadog Workflow Automation, Datastore et App Builder
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: Centre d'apprentissage
  text: Prise en main d'App Builder
- link: https://www.datadoghq.com/blog/generate-apps-with-ai/
  tag: Blog
  text: Créez des applications personnalisées en quelques secondes avec l'IA conversationnelle
    dans App Builder
- link: https://learn.datadoghq.com/courses/app-builder-integration
  tag: Centre d'apprentissage
  text: Créez des applications en libre-service avec App Builder pour les intégrations
    tierces.
title: App Builder
---
## Présentation {#overview}

Datadog App Builder est une plateforme de création d'applications low-code. Elle rationalise le développement de vos outils internes grâce à une interface glisser-déposer conviviale et une prise en charge intégrée de JavaScript. App Builder s'intègre avec des services populaires tels qu'AWS et GitHub, vous permettant d'exploiter des données et de vous connecter de manière transparente à des API et des magasins de données externes. En s'intégrant aux capacités existantes de Datadog, App Builder fournit un contexte centralisé qui vous permet de prendre des mesures préventives ou de répondre à des incidents en cours, le tout depuis la même vue que celle que vous utilisez pour le dépannage.

Pour des applications plus complexes nécessitant un workflow de développement local, un contrôle de version ou une collaboration entre plusieurs ingénieurs, consultez [Datadog Apps][10] pour créer des applications sous forme de code.

{{< img src="/actions/app_builder/app-builder-app.png" alt="Une application dans App Builder" caption="Une application dans App Builder" style="width:100%;" >}}

### Exemples de cas d'utilisation {#example-use-cases}
Vous trouverez ci-dessous quelques exemples des possibilités offertes par les applications App Builder :
- Identifiez les causes les plus probables d'une régression à partir d'une description textuelle d'un incident et des 150 commits les plus récents d'un dépôt.
- Surveillez le statut de votre service PagerDuty pour obtenir un contexte complet tout en travaillant sur des incidents.
- Permettez aux utilisateurs de gérer leurs instances EC2 directement depuis un dashboard.
- Permettez aux utilisateurs d'explorer et de visualiser le contenu d'un bucket S3.
- Utilisez une intégration PagerDuty pour voir qui est d'astreinte pour chaque équipe au sein d'une organisation.
- Résumez la progression de chaque PR dans un dépôt donné.

## Comment App Builder fonctionne avec les actions {#how-app-builder-works-with-actions}

Datadog App Builder fournit un [Action Catalog][1] composé de centaines d'actions à travers de multiples intégrations. L'Action Catalog et les identifiants de connexion pour chaque intégration sont partagés avec [Datadog Workflow Automation][2]. S'il n'existe pas d'intégration permettant d'accomplir votre tâche, vous pouvez utiliser des actions génériques telles que les requêtes HTTP et les fonctions JavaScript pour effectuer toute tâche requise par votre application.

## Agissez directement depuis les dashboards {#take-action-directly-from-dashboards}

Vous pouvez utiliser vos applications depuis la page Applications ou [y accéder directement depuis vos dashboards][6]. Les applications Datadog fonctionnent comme des intégrations natives de dashboard, vous permettant de personnaliser et d'agir sur vos données directement depuis votre dashboard.

{{< img src="/actions/app_builder/app-builder-embedded-dashboard-2.png" alt="Une application ECS Task Balancer intégrée dans un dashboard, avec un curseur cliquant sur le bouton Scale Service" caption="Une application ECS Task Balancer intégrée dans un dashboard, avec un curseur cliquant sur un bouton de celle-ci" style="width:100%;" >}}

### Applications créées par Datadog {#apps-created-by-datadog}

Les applications créées par Datadog sont des applications intégrées aux dashboards d'intégration. Elles fonctionnent sans avoir à les créer ; il vous suffit de choisir une connexion.

Par exemple, le [dashboard d'intégration EC2][7] propose une application de gestion d'instances EC2. Lorsque vous chargez le dashboard, l'application est alimentée avec des données de démonstration :

{{< img src="/actions/app_builder/ootb-app-ec2-demo-data.png" alt="Une application EC2 créée par Datadog" caption="Une application EC2 créée par Datadog" style="width:100%;" >}}

Pour utiliser l'application avec vos données, cliquez sur {{< ui >}}\+ Connect Data{{< /ui >}}, puis créez une nouvelle connexion ou sélectionnez-en une existante. Une fois votre sélection enregistrée, l'application affiche les données de votre connexion.

Vous pouvez modifier la connexion sélectionnée en cliquant sur {{< ui >}}Change Connection{{< /ui >}} dans l'application.

## Dashboard App Builder Overview {#app-builder-overview-dashboard}

Le dashboard App Builder Overview offre une vue d'ensemble de vos applications Datadog. Pour trouver le dashboard, accédez à votre [Dashboard List][8] et recherchez `App Builder Overview`.

{{< img src="actions/app_builder/app-builder-overview-dashboard-2.png" alt="Le dashboard App Builder Overview" caption="Le dashboard App Builder Overview"style="width:100%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [Slack de la communauté Datadog][4].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /fr/actions/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://chat.datadoghq.com/
[5]: /fr/actions/app_builder/build/#build-an-app-from-a-blueprint
[6]: /fr/actions/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list
[10]: /fr/actions/datadog_apps/