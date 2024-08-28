---
disable_toc: false
further_reading:
- link: /service_management/workflows/actions_catalog/
  tag: Documentation
  text: Catalogue des actions
- link: https://www.datadoghq.com/blog/datadog-app-builder-low-code-internal-tools/
  tag: Blog
  text: Créer des outils de surveillance et de remédiation personnalisés avec la solution App Builder
    Datadog
title: App Builder
---

{{< callout url="https://www.datadoghq.com/dg/datadog-app-builder/" btn_hidden="false" header="Rejoignez la bêta !">}}
La solution App Builder Datadog est disponible en version bêta privée. Remplissez le formulaire pour pouvoir en bénéficier.
{{< /callout >}}

La solution App Builder Datadog est une plateforme de création d'applications nécessitant peu de code. Grâce à son interface conviviale, basée sur des glisser-déposer, et à sa prise en charge native de JavaScript, App Builder simplifie le développement de vos outils internes. Cette solution tire parti des intégrations de services populaires, tels que GitHub et AWS, ce qui vous permet d'exploiter leurs données et de vous connecter facilement à des API et datastores externes. L'environnement centralisé d'App Builder repose sur les fonctionnalités existantes de Datadog. Il vous permet de prendre des mesures préventives ou de résoudre directement les incidents en cours, et ce depuis la vue que vous utilisez pour le dépannage.

{{< img src="/service_management/app_builder/datadog-app-builder-1.png" alt="Une application dans App Builder" style="width:100%;" >}}

## Configurer les actions d'App Builder

La solution App Builder Datadog propose un [catalogue][1] composé de plus de 300 actions réparties sur plusieurs intégrations. Le catalogue des actions, ainsi que les identifiants de connexion de chaque intégration, sont partagés avec la solution [Workflow Automation][2] Datadog. Si aucune intégration n'est adaptée à votre situation, des actions génériques telles que la requête HTTP et la fonction JavaScript vous permettent d'accomplir toutes les tâches nécessaires sur votre application.

{{< img src="/service_management/app_builder/app-builder-actions.png" alt="La solution App Builder Datadog propose un catalogue de plus de 300 actions réparties sur plusieurs intégrations." style="width:100%;" >}}

## Débuter avec des blueprints

Datadog fournit des flux préconfigurés, à savoir des [blueprints][3] prêts à l'emploi, pour faciliter votre prise en main.

Vous trouverez ci-dessous quelques exemples des possibilités offertes par les applications App Builder :
- Identifier les causes les plus probables d'une régression sur la base d'une description textuelle d'un incident et des 150 derniers commits d'un référentiel
- Surveiller le statut de votre service PagerDuty pour bénéficier de tout le contexte nécessaire à la résolution d'incidents
- Autoriser des utilisateurs à gérer leurs instances EC2 directement à partir d'un dashboard
- Autoriser des utilisateurs à explorer et visualiser le contenu d'un compartiment S3
- Utiliser une intégration PagerDuty pour identifier les membres en service de chaque équipe d'une organisation
- Consulter un résumé de la progression de chaque PR au sein d'un référentiel donné

{{< img src="/service_management/app_builder/app-builder-blueprints-1.png" alt="Blueprints d'application" style="width:100%;" >}}

## Gagner du temps grâce à l'IA

{{< callout url="https://docs.google.com/forms/d/14Heybl3cLHuyxl1XpsGrEoWvc1TPA2DVLeS7S0wgIRI" btn_hidden="false" header="Participez à la bêta !">}}
Les fonctionnalités IA d'App Builder sont accessibles sur demande.
{{< /callout >}}

Si vous ne savez pas trop par où commencer, décrivez votre application à l'IA de l'outil de création d'applications, qui se chargera de créer une application de base pour vous.

{{< img src="/service_management/app_builder/app-builder-ai.png" alt="Créer une application de base avec l'IA" style="width:100%;" >}}

## Effectuer des opérations directement à partir des dashboards

Utilisez vos applications depuis la page Apps ou accédez-y de manière indépendante depuis les dashboards. Les applications Datadog fonctionnent comme des intégrations de dashboard natives, ce qui signifie que vous pouvez personnaliser vos données et prendre des mesures sur la base de celles-ci directement à partir de votre dashboard.

{{< img src="/service_management/app_builder/app-builder-embedded-dashboard-1.png" alt="Une application intégrée à un dashboard" style="width:100%;" >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/service_management/workflows/actions_catalog/
[2]: /fr/service_management/workflows/
[3]: https://app.datadoghq.com/app-builder/blueprints