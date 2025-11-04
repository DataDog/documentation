---
aliases:
- /fr/developers/datadog_apps/
- /fr/developers/ui_extensions/
- /fr/developers/faq/ui_extensions
- /fr/service_management/app_builder/
description: Plateforme low-code pour créer des outils internes avec une interface
  de glisser-déposer, une prise en charge de JavaScript et une intégration avec des
  services externes.
disable_toc: false
further_reading:
- link: /actions/actions_catalog/
  tag: Documentation
  text: Action Catalog
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Créer des outils de surveillance et de remédiation personnalisés avec la solution App Builder
    Datadog
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Corriger les applications créées avec Datadog App Builder
- link: https://www.datadoghq.com/blog/ai-assistant-workflows-apps/
  tag: Blog
  text: Créer des workflows et des applications Datadog en quelques minutes avec notre
    assistant IA
- link: https://www.datadoghq.com/blog/pm-app-automation/
  tag: Blog
  text: Comment nous avons créé une application unique pour automatiser les tâches
    répétitives avec Datadog Workflow Automation, Datastore et App Builder
- link: https://learn.datadoghq.com/courses/getting-started-app-builder/
  tag: Centre d'apprentissage
  text: Débuter avec App Builder
title: App Builder
---

Datadog App Builder est une plateforme de création d'applications low-code. Elle simplifie le développement de vos outils internes grâce à une interface de glisser-déposer conviviale et à une prise en charge intégrée de JavaScript. App Builder s'intègre à des services populaires comme AWS et GitHub, ce qui vous permet d'exploiter des données et de vous connecter de manière transparente à des API externes et à des banques de données. En s'intégrant aux capacités existantes de Datadog, App Builder fournit un contexte centralisé qui vous permet de prendre des mesures préventives ou de répondre à des incidents en cours, le tout depuis la même vue que celle que vous utilisez pour le dépannage.

{{< img src="/service_management/app_builder/app-builder-app.png" alt="Une application dans App Builder" style="width:100%;" >}} 

## Configurer les actions d'App Builder

Datadog App Builder fournit un [Action Catalog][1] de centaines d'actions pour de multiples intégrations. L'Action Catalog et les identifiants de connexion pour chaque intégration sont partagés avec [Datadog Workflow Automation][2]. S'il n'existe pas d'intégration qui accomplit votre tâche, vous pouvez utiliser des actions génériques telles que les requêtes HTTP et les fonctions JavaScript pour effectuer toute tâche dont votre application a besoin.

{{< img src="/service_management/app_builder/app-builder-action-catalog.png" alt="Datadog App Builder fournit un Action Catalog de centaines d'actions pour de multiples intégrations." style="width:100%;" >}} 

## Commencer avec les blueprints

Datadog vous fournit des flux préconfigurés sous la forme de [blueprints][3] prêts à l'emploi pour vous aider à [démarrer][5].

Vous trouverez ci-dessous quelques exemples des possibilités offertes par les applications App Builder :
- Identifier les causes les plus probables d'une régression sur la base d'une description textuelle d'un incident et des 150 derniers commits d'un référentiel
- Surveiller le statut de votre service PagerDuty pour bénéficier de tout le contexte nécessaire à la résolution d'incidents
- Autoriser des utilisateurs à gérer leurs instances EC2 directement à partir d'un dashboard
- Autoriser des utilisateurs à explorer et visualiser le contenu d'un compartiment S3
- Utiliser une intégration PagerDuty pour identifier les membres en service de chaque équipe d'une organisation
- Consulter un résumé de la progression de chaque PR au sein d'un référentiel donné

{{< img src="/service_management/app_builder/app-builder-blueprints-2.png" alt="Blueprints d'apps" style="width:100%;" >}}

## Effectuer une action directement depuis les dashboards 

Vous pouvez utiliser vos applications depuis la page Apps ou [y accéder directement depuis vos dashboards][6]. Les applications Datadog fonctionnent comme des intégrations de dashboard natives, ce qui vous permet de personnaliser et d'effectuer des actions sur vos données directement dans le contexte de votre dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard.png" alt="Une application intégrée dans un dashboard" style="width:100%;" >}} 

### Applications créées par Datadog

Les applications créées par Datadog sont des applications intégrées dans les dashboards d'intégration. Elles fonctionnent sans avoir à les créer ; il vous suffit de choisir une connexion.

Par exemple, le [dashboard d'intégration EC2][7] propose une application de gestion d'instances EC2. Lorsque vous chargez le dashboard, l'application est remplie avec des données de démonstration :

{{< img src="/service_management/app_builder/ootb-app-ec2-demo-data.png" alt="Application EC2 créée par Datadog, remplie avec des données de démonstration" style="width:100%;" >}}

Pour utiliser l'application avec vos données, cliquez sur **+ Connect Data**, puis créez une nouvelle connexion ou sélectionnez une connexion existante. Une fois votre sélection enregistrée, l'application affiche les données de votre connexion. 

Vous pouvez modifier la connexion sélectionnée en cliquant sur **Change Connection** dans l'application.

## Dashboard App Builder Overview

Le dashboard App Builder Overview fournit une vue d'ensemble de haut niveau de vos applications Datadog. Pour trouver le dashboard, accédez à votre [liste de dashboards][8] et recherchez `App Builder Overview`.

{{< img src="service_management/app_builder/app-builder-overview-dashboard.png" alt="Le dashboard App Builder Overview" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#app-builder** sur le [slack de la communauté Datadog][4].

[1]: https://app.datadoghq.com/actions/action-catalog/
[2]: /fr/service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints
[4]: https://datadoghq.slack.com/
[5]: /fr/service_management/app_builder/build/#build-an-app-from-a-blueprint
[6]: /fr/service_management/app_builder/embedded_apps/#add-apps-to-your-dashboard
[7]: https://app.datadoghq.com/dash/integration/60
[8]: https://app.datadoghq.com/dashboard/lists
[9]: https://app.datadoghq.com/app-builder/apps/list