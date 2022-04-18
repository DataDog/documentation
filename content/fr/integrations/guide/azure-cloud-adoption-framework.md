---
title: Utilisation du Cloud Adoption Framework Azure avec Datadog
kind: guide
further_reading:
  - link: /integrations/azure/
    tag: Documentation
    text: Intégration Datadog/Azure
---
## Présentation

Il peut être risqué de migrer vos services vers un environnement cloud depuis des environnements sur site ou un autre fournisseur cloud.

Le Cloud Adoption Framework Azure met en œuvre une stratégie éprouvée afin de garantir le succès de vos migrations. La surveillance Datadog vérifie que vos migrations s'effectuent rapidement et en toute sécurité. Vous pouvez ainsi mesurer la santé de vos anciens et nouveaux environnements, avec un cadre unique d'observabilité et de gestion des incidents.

Vous pouvez :

1. configurer votre compte Datadog pour vos équipes, afin d'exécuter efficacement la migration de leurs workloads (phase de planification) ;
2. utiliser Datadog pour mesurer la santé de vos anciens environnements et de vos nouveaux workloads durant leur lancement dans les nouvelles zones d'atterrissage (phase de migration).

Ce guide présente le processus de migration à suivre si votre organisation a adopté le Cloud Adoption Framework Azure.

Si vous ne possédez pas encore de compte Datadog, vous pouvez [bénéficier d'une version d'essai gratuite de deux semaines][2].

## Planification

La planification de votre migration consiste à configurer votre compte Datadog de façon à ce qu'il surveille vos nouveaux workloads dès leur migration vers votre compte Azure. Pour configurer votre compte, procédez comme suit :

1. Activez l'[intégration Datadog/Azure][1] pour visualiser les performances et la santé de vos nouveaux workloads.
2. Préparez une stratégie de tagging permettant à vos équipes de décrire leurs workloads durant leur migration.
3. Configurez des dashboards afin que les parties prenantes puissent suivre l'avancée de la migration et consulter la santé globale des nouveaux workloads.
4. Créez des canaux de communication pour la gestion des incidents.

### Activer les intégrations Datadog/Azure

Datadog et Azure se sont associés afin de vous proposer des services Datadog depuis votre compte Azure. Pour chacune de vos zones d'atterrissage, vous pouvez créer une ressource Datadog permettant d'associer votre compte Datadog à votre compte Azure, puis consulter vos données d'observabilité dans Azure.

Pour vous faire une idée des données Azure à recueillir dans Datadog, consultez la [documentation Microsoft Azure][1].

La ressource Datadog simplifie la configuration d'un grand nombre d'intégrations Datadog/Azure et permet à vos équipes de bénéficier d'une visibilité accrue sur la santé et les performances des nouveaux workloads Azure. Datadog vous conseille d'activer l'[intégration Azure DevOps][3] pour pouvoir mettre en corrélation les données de performance des workloads avec les événements de build et de version.

Pour en savoir plus sur la configuration de cette intégration, consultez la section [Microsoft Azure DevOps][4].

Datadog propose de nombreuses intégrations, comme Microsoft Teams ou Slack, visant à faciliter les communications entre vos équipes lorsque leur attention est requise.

Ajoutez toutes les intégrations de communication utilisées par votre organisation. Pour obtenir la liste complète des intégrations, ainsi que des instructions de configuration, consultez la section [Intégrations][5].

### Tags

Les tags occupent un rôle majeur dans la surveillance active de vos applications et environnements. Afin de commencer votre migration vers une zone d'atterrissage Azure, vous devez mettre en œuvre une stratégie de tagging.

Bien que cela puisse sembler complexe au premier abord, il est relativement simple et rapide de créer une telle stratégie. Pour définir des tags pertinents, utilisez des données permettant de catégoriser votre infrastructure ou vos services.

Ajoutez les tags suivants à vos ressources, tant qu'ils demeurent pertinents :

| Nom du tag       | Description                                                                                                                                                                                                     |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `env`          | Pour les environnements `prod`, `staging` et `dev`.                                                                                                                                                                               |
| `service`      | En cas de doute, utilisez la même valeur que `ApplicationName`.                                                                                                                                                         |
| `version`      | Identifie la version de l'application en cours d'utilisation.                                                                                                                                                       |
| `team`         | Définit l'équipe qui a conçu la ressource ou qui la gère. Créez un canal Microsoft Teams dédié à chaque équipe, afin qu'elle soit informée de la santé de ses services. |
| `owner`        | Définit la personne responsable d'une ressource.                                                                                                                                                         |
| `workload`     | Indique le workload associé à une ressource et permet de comparer plus facilement les KPI et les performances entre les systèmes obsolètes et les solutions dans le cloud.                                                                                                  |
| `landing-zone` | Identifie la zone d'atterrissage dans laquelle une ressource se trouve (le cas échéant) et permet de comparer plus facilement les KPI et les performances entre les systèmes obsolètes et les solutions dans le cloud.                                                                                     |

Le Cloud Adoption Framework Azure fournit une [stratégie de tagging prédéfinie][6] qui reprend certains tags de la liste ci-dessus. Passez en revue ce document et implémentez les tags pertinents pour votre organisation, notamment ceux qui sont répertoriés sous la section **Minimum Suggested Tags**.

### Dashboards

Datadog propose plusieurs dashboards prêts à l'emploi reposant sur des services Azure. Pour obtenir la liste des dashboards disponibles, consultez les [intégrations Azure][7].

Après avoir mis en place une stratégie de tagging efficace pour votre organisation, Datadog vous conseille de [dupliquer les dashboards prêts à l'emploi][8] et d'ajouter des [template variables de dashboard][9] depuis votre liste de tags standardisés.

Grâce à ces template variables, les dashboards Datadog synthétisent en fonction d'un tag des ensembles de données volumineux et des sous-ensembles plus spécifiques. Par exemple, si vous ajoutez à un dashboard une template variable pour le tag `workload`, vous pouvez visualiser la synthèse des performances de nombreux workloads, puis filtrer toutes les données afin d'afficher les performances d'un workload spécifique.

Ainsi, un seul dashboard vous permet d'obtenir des informations pertinentes pour l'ensemble de vos workloads. Vous n'avez donc pas besoin de gérer différents dashboards pour chacun de vos workloads.

### Canaux de communication pour la gestion des incidents

De nombreuses organisations configurent des canaux de communication dédiés qui s'alignent sur la hiérarchie de propriété de leurs services ou workloads. Datadog vous conseille d'utiliser pour ces canaux la même convention de nommage que pour votre stratégie de tagging.

Par exemple, si vous avez appliqué de façon globale l'utilisation du tag `owner`, utilisez la valeur de ce tag pour définir le nom des groupes d'e-mail ou des canaux de communication concernés par la gestion des incidents pertinents. Vous pouvez également configurer des [handles dynamiques][10] afin de veiller à ce que les alertes soient distribuées aux bonnes personnes.

## Migration

Une fois votre compte Datadog configuré, vos équipes peuvent utiliser la plateforme Datadog pour s'assurer que la migration entre les environnements d'origine et les workloads de zone d'atterrissage s'effectue sans accroc.

Vous devez suivre la procédure ci-dessous pour chaque workload :

1. Installez et configurez l'Agent Datadog, afin d'effectuer une surveillance complète et cohérente de vos anciens environnements ainsi que de vos nouveaux workloads.
2. Configurez des dashboards, afin de visualiser la santé de vos anciens environnements et de vos nouveaux workloads en comparant leurs données.
3. Configurez des monitors, afin que les équipes pertinentes puissent prendre des mesures en cas de changement majeur de vos KPI.
4. Ajoutez des tests Synthetic, afin de surveiller de façon proactive les comportements inattendus nuisant à l'expérience utilisateur.
5. Configurez des SLO, afin de documenter l'évolution de vos KPI pour vos parties prenantes.

### Limiter les zones d'ombre de vos environnements d'origine

Pour qu'un propriétaire de workload ou de service puisse accéder à des données exhaustives et cohérentes sur vos environnements d'origine et vos nouveaux workloads Azure, il est nécessaire d'installer l'Agent Datadog.

L'Agent Datadog est un logiciel léger conçu pour s'exécuter sur l'ensemble de vos serveurs (sur site ou dans le cloud) et recueillir les données nécessaires pour vérifier l'intégrité de vos services. Toutes ces données sont rassemblées au sein de votre compte Datadog.

[Cette page][11] vous explique comment installer l'Agent sur des serveurs individuels et comment installer votre outil de gestion des configurations préféré (installation conseillée).

Après avoir installé l'Agent Datadog, ajoutez les outils de collecte de données suivants pour visualiser en détail la santé de votre environnement :

  1. [Ajoutez des intégrations pour recueillir des données][12] spécifiques aux technologies utilisées par vos services.
  2. [Activez la solution Application Performance Monitoring (APM)][13] pour mesurer le nombre de requêtes, la latence et les taux d'erreur de vos services.
  3. [Recueillez les logs générés par votre environnement][14] pour contextualiser les comportements inattendus de vos métriques et traces. Si vous générez un volume élevé de logs, [conservez uniquement vos logs les plus importants][15].
  4. [Activer la solution Network Performance Monitoring (NPM)][16] pour veiller à ce que vos services communiquent efficacement entre eux. Cette étape est essentielle, car vos environnements d'origine devront potentiellement communiquer avec vos nouveaux environnements dans le cloud.

Avant de migrer vers vos nouveaux workloads, installez l'Agent, configurez toutes les méthodes de collecte de données sur vos environnements d'origine, puis configurez vos nouveaux workloads de façon à inclure l'Agent Datadog, avec le même processus de collecte de données.

Suivez les normes de tagging de votre organisation pour que toutes vos données de performance soient analysées et identifiées efficacement par l'équipe, le workload et la zone d'atterrissage appropriés.

### Dashboards sur la migration et la santé des workloads

Dès lors que vous commencez à recevoir des données dans votre compte Datadog, vous pouvez consulter et analyser des informations sur votre environnement depuis les visualisations de Datadog. Vous avez notamment accès à des maps sur les [hosts][17], les [conteneurs][18], les [services][19] et le [trafic réseau][20], ainsi qu'aux [dashboards prêts à l'emploi][21] correspondant aux technologies que vous avez intégrées.

Vous pouvez dupliquer et personnaliser ces dashboards, ou même créer des dashboards personnalisés pour visualiser les données dont vous avez besoin pour certains scénarios.

Il peut parfois être intéressant de comparer les performances de vos anciens environnements à celles de vos nouveaux workloads.

Suivez les étapes suivantes pour recréer ce type de dashboard :

1. [Créez un dashboard][22] depuis votre compte Datadog.
2. Cliquez sur l'icône **Settings** en haut à droite.
3. Cliquez sur **Import dashboard JSON**. Pour en savoir plus, consultez la documentation relative aux [réglages des dashboards][23].
4. Collez ou importez la définition JSON du dashboard, disponible dans [`azure_caf_side_by_side_dashboard.json`][24].

### Envoyer des alertes exploitables aux propriétaires de workloads

Durant la migration de vos workloads, vérifiez que des alertes sont automatiquement envoyées aux bonnes personnes lorsque vos KPI importants dépassent certains seuils.

Pour ce faire, créez des monitors dans Datadog qui surveillent constamment la santé de vos workloads et déclenchent l'envoi de notifications sur vos canaux de communication (Microsoft Teams, Slack, services de pagination et système de gestion de tickets). Pour en savoir plus, consultez la section [Monitors][25].

Si vos tags sont efficacement attribués à des canaux d'enquête dédiés (par exemple, si vous avez un canal Teams pour chaque propriétaire, équipe ou workspace), vous pouvez configurer vos monitors de façon à [envoyer une notification dynamique au canal de communication pertinent][10], en incluant des template variables de monitor.

Le processus à suivre pour configurer des alertes exploitables varie grandement selon l'organisation. Adaptez-vous donc aux besoins spécifiques de vos équipes. Consultez le [fichier `azure_caf_service_errors_15_min.json`][26] pour obtenir la définition d'un exemple de monitor.

### Surveillance Synthetic proactive

Vous pouvez configurer des [tests Synthetic][27] pour vérifier de façon proactive que vos utilisateurs finaux ne rencontrent pas de problème majeur lors de leur parcours.

Si vos nouveaux workloads sont utilisés par les mêmes utilisateurs que vos anciens environnements, il est essentiel d'exécuter des tests Synthetic. Si jamais votre processus de migration entraîne de nouvelles erreurs ou des régressions, vous pouvez signaler les problèmes associés et les corriger avant que vos clients ne s'en rendent compte.

Vous pouvez également [intégrer ces tests à vos pipelines de CI/CD][28] dans Azure DevOps, afin de tester l'expérience de vos utilisateurs finaux dans le cadre de votre processus de déploiement.

### Documenter les résultats obtenus avec des SLO

Configurez des Service Level Objectives (SLO) pour documenter les cibles de disponibilité de vos workloads ainsi que les résultats obtenus tout au long de la migration.

Pour découvrir comment configurer des SLO et les partager à des parties prenantes au sein de dashboards, consultez la section [Service Level Objectives][29].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/integrations/azure/?tab=link&site=us3
[2]: https://us3.datadoghq.com/signup
[3]: /fr/integrations/azure_devops/#overview
[4]: /fr/integrations/azure_devops/#setup
[5]: /fr/integrations/#cat-collaboration
[6]: https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging#minimum-suggested-tags
[7]: https://app.datadoghq.com/dashboard/lists/preset/3?q=azure
[8]: /fr/dashboards/#clone-dashboard
[9]: /fr/dashboards/template_variables/
[10]: /fr/monitors/notify/variables/?tab=is_alert#dynamic-handles
[11]: https://app.datadoghq.com/account/settings#agent
[12]: https://app.datadoghq.com/account/settings#integrations
[13]: https://app.datadoghq.com/apm/getting-started
[14]: https://app.datadoghq.com/logs/onboarding
[15]: /fr/logs/guide/getting-started-lwl/
[16]: /fr/network_monitoring/performance/
[17]: https://app.datadoghq.com/infrastructure/map
[18]: https://app.datadoghq.com/infrastructure/map?node_type=container
[19]: https://app.datadoghq.com/apm/map
[20]: https://app.datadoghq.com/network/map
[21]: https://app.datadoghq.com/dashboard/lists/preset/3
[22]: https://app.datadoghq.com/dashboard/lists#
[23]: /fr/dashboards/#copy-import-or-export-dashboard-json
[24]: /resources/json/azure_caf_side_by_side_dashboard.json
[25]: /fr/monitors/
[26]: /resources/json/azure_caf_service_errors_15_min.json
[27]: /fr/synthetics/
[28]: /fr/synthetics/cicd_integrations/configuration?tab=npm
[29]: /fr/monitors/service_level_objectives/