---
aliases:
- /fr/software_catalog/developer_homepage
- /fr/internal_developer_portal/developer_homepage
description: La Internal Developer Portal Homepage vous offre une vue centralisée
  des entités de votre équipe, des pull requests GitHub, des merge requests GitLab,
  des tickets Jira et Linear, ainsi que des éléments de travail Datadog en un seul
  endroit.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-idp-homepage/
  tag: Blog
  text: Commencez votre journée avec la IDP Homepage
- link: /integrations/github/
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: /integrations/gitlab-source-code/
  tag: Documentation
  text: En savoir plus sur l'intégration GitLab Source Code
- link: /integrations/jira/#configure-a-jira-webhook
  tag: Documentation
  text: En savoir plus sur l'intégration Jira
- link: /integrations/linear/#configure-a-linear-webhook
  tag: Documentation
  text: En savoir plus sur l'intégration Linear
site_support_id: idp
title: Page d'accueil
---
{{< img src="tracing/software_catalog/idp_homepage_2.png" alt="La IDP Homepage affichant les pull requests en attente de révision et les tickets assignés." style="width:100%;" >}}

## Présentation {#overview}

La [IDP Homepage][5] fournit une vue centralisée des entités de votre équipe et de vos tâches quotidiennes.  

Avec cette vue, vous pouvez :
- Consultez les informations clés sur les entités de votre équipe, notamment les scorecards, les déploiements récents, les monitors, les issues, les incidents, les dashboards et le on‑call status. 
- Suivez les tâches qui vous sont assignées sur GitHub, GitLab, Jira et Linear.
- Identifiez les monitors en alerte ou les déploiements ayant échoué.

## Prérequis {#prerequisites}

La page d'accueil agrège les données de vos intégrations Datadog. Configurez les éléments suivants avant d'utiliser la page d'accueil :

- **GitHub** : Requis pour l'onglet **GitHub** dans **Vos PR**. Un administrateur configure l'[intégration GitHub][1] et le webhook, et chaque utilisateur se connecte avec son compte GitHub.
- **GitLab Source Code** : Requis pour l'onglet **GitLab** dans **Vos PR**. Un administrateur configure l'[intégration GitLab Source Code][2] et le webhook, et chaque utilisateur se connecte avec son compte GitLab.
- **Jira** : Requis pour l'onglet **Jira** dans **Vos tickets**. Un administrateur [configure le webhook Jira][3].
- **Linear** : Requis pour l'onglet **Linear** dans **Vos tickets**. Un administrateur [configure le webhook Linear][4].

## Configurer la page d'accueil {#configure-the-homepage}

Cliquez sur **Configure** en haut de la [IDP Homepage][5] pour personnaliser la page. Le panneau **Homepage settings** s'ouvre avec deux onglets : **Section layout** et **Integrations**. Après avoir effectué vos modifications, cliquez sur **Save** pour les appliquer, ou sur **Cancel** pour les ignorer.

### Section layout{#section-layout}

L'onglet **Section layout** permet de contrôler les sections qui apparaissent sur la Homepage et leur ordre d'affichage. Les sections disponibles sont : **Your PRs**, **Your Tickets**, **Services & Entities** et **Apps**.

- Pour réorganiser une section, faites-la glisser par sa poignée vers une nouvelle position.
- Pour afficher ou masquer une section, cliquez sur l'icône de visibilité située à côté.
- Pour restaurer les sections et l'ordre par défaut, cliquez sur **Réinitialiser la mise en page**.

### Integrations {#integrations}

L'onglet **Integrations** permet de contrôler quelles intégrations sont activées et ce que chacune affiche sur la page d'accueil. Les intégrations sont regroupées par la section qu'elles alimentent, comme **PR** et **Éléments de travail**.

Chaque intégration dispose d'un bouton bascule pour l'activer ou la désactiver. Lorsque vous désactivez une intégration, ses données n'apparaissent plus sur la page d'accueil. Selon l'intégration, vous pouvez également : 

- Sélectionner le compte, l'instance ou l'organisation connecté(e) à afficher. Par exemple, l'intégration GitLab inclut un sélecteur **Instance**.
- Ouvrir la configuration de l'intégration pour gérer sa connexion. Par exemple, l'intégration GitHub inclut une option **Configure**. 

## Your PRs{#your-prs}

La section **Your PRs** consolide vos éléments d'action personnels issus du contrôle de source, afin que vous puissiez suivre les pull requests et merge requests qui vous sont assignées sans quitter la Homepage. Basculez entre les onglets **GitHub** et **GitLab** pour afficher chaque source.

{{< img src="tracing/software_catalog/your_prs_table.png" alt="La section Your PRs affichant les pull requests GitHub regroupées par statut." style="width:100%;" >}}

### GitHub {#github}

L'onglet **GitHub** fait apparaître les pull requests qui nécessitent votre attention, regroupées par état de revue, afin que vous puissiez agir dessus sans quitter la page d'accueil. 

Une fois connecté avec votre compte GitHub, l'onglet charge vos pull requests, regroupées par statut. Si votre organisation n'a pas configuré l'intégration GitHub, cet onglet affiche un état vide avec une invite à l'activer depuis la [tuile d'intégration GitHub][1]. Pour lire les PRs depuis GitHub, cette intégration nécessite les autorisations suivantes :

- Members: Read
- Metadata: Read
- Pull Requests: Read
- Contents: Read
- Statuses: Read
- Checks: Read

Si plusieurs organisations GitHub sont connectées dans Datadog, vous avez besoin de l'autorisation Integrations Read pour basculer entre elles.

### GitLab {#gitlab}

L'onglet **GitLab** fait apparaître les merge requests qui nécessitent votre attention, regroupées par état de revue. Pour chacune, il affiche le statut de revue et d'approbation, le statut du pipeline et les merge blockers, ainsi que le nombre de discussions résolues et non résolues. 

Une fois connecté avec votre compte GitLab, l'onglet charge vos merge requests, regroupées par statut. Si votre organisation n'a pas configuré l'intégration GitLab Source Code, cet onglet affiche un état vide avec une invite à l'activer depuis la [tuile d'intégration GitLab Source Code][2].

Si vous avez plusieurs instances GitLab connectées dans Datadog, utilisez le sélecteur **Instance** pour choisir l'instance à afficher. 

## Your Tickets{#your-tickets}

La section **Your Tickets** consolide les éléments qui vous sont assignés dans Jira, Linear et Datadog Work Management, afin que vous puissiez suivre votre travail en cours sans quitter the Homepage. Basculez entre les onglets **Jira**, **Linear** et **Work Items** pour afficher chaque source, et utilisez **Display** pour modifier la présentation des éléments.

{{< img src="tracing/software_catalog/your_tickets_table.png" alt="La section Your Tickets affichant les tickets Jira regroupés par statut." style="width:100%;" >}}

### Jira {#jira}

L'onglet **Jira** liste les tickets Jira qui vous sont assignés, regroupés par statut. Après la configuration, vos tickets assignés apparaissent automatiquement.

### Linear {#linear}

L'onglet **Linear** liste les problèmes Linear qui vous sont assignés, regroupés par statut. Après la configuration, vos problèmes assignés apparaissent automatiquement.

### Work Items{#work-items}

L'onglet **Work Items** liste les éléments de travail de Datadog Work Management qui vous sont assignés, regroupés par statut. Les éléments de travail apparaissent automatiquement lorsqu'ils vous sont assignés. Pour plus d'informations, consultez [Work Management][6].

## Services & Entities{#services-and-entities}

{{< img src="tracing/software_catalog/services_entities_table_2.png" alt="La section Services & Entities affichant les services d'équipe avec les scorecards, monitors et on‑call status." style="width:100%;" >}}

La section **Services & Entities** affiche les services et entités clés de votre équipe, agrégés automatiquement à partir des produits et intégrations Datadog liés. Chaque entrée résume le contexte opérationnel de l'entité, tel que le scorecard health, les déploiements récents, le monitor and incident status, les linked dashboards et le current on‑call. Vous pouvez filtrer par entités récemment consultées, celles appartenant à votre équipe ou que vous avez ajoutées à vos favoris. 

## Étendre la Homepage avec des applications personnalisées {#extend-the-homepage-with-custom-apps}

En plus des sections intégrées, la section **Apps** vous permet d'ajouter des applications personnalisées à la Homepage, afin de rassembler les données et les actions que vous trouvez les plus utiles, qu'elles proviennent de Datadog, d'un outil interne ou d'un service tiers. Datadog propose deux façons de créer ces apps : 

- **App Builder** : Un constructeur low-code par glisser-déposer pour les outils internes. Les apps combinent des composants UI préconçus, des sources de données Datadog (telles que métriques, logs et monitors) et des actions prêtes à l'emploi pour des services tels que GitHub et AWS. Pour plus d'informations, consultez [App Builder][7].
- **Datadog Apps** : Une voie basée sur le code pour les applications que vous créez localement avec React et TypeScript (ou JavaScript), en utilisant une CLI et votre workflow de développement standard. Choisissez Datadog Apps lorsque vous avez besoin d'une collaboration d'équipe avec le contrôle de version et CI/CD, d'un développement local assisté par IA, d'une intégration avec des services au-delà de l'Action Catalog, ou d'un contrôle total sur l'interface utilisateur et la logique de l'application. Pour plus d'informations, consultez [Datadog Apps][8].

Pour rendre une application personnalisée disponible ici, publiez-la d'abord et définissez ses autorisations afin que votre équipe puisse la voir et l'utiliser.

Pour ajouter une application à la page d'accueil :

1. Dans la section **Apps**, cliquez sur **Add App**.
2. Choisissez un **blueprint** pour partir d'une application prédéfinie, ou choisissez une **application personnalisée** que votre organisation a déjà créée.
3. Configurez l'application, puis ajoutez-la à la page d'accueil.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}  

[1]: /fr/integrations/github/  
[2]: /fr/integrations/gitlab-source-code/
[3]: /fr/integrations/jira/#configure-a-jira-webhook
[4]: /fr/integrations/linear/#configure-a-linear-webhook
[5]: https://app.datadoghq.com/idp/home
[6]: /fr/service_management/case_management
[7]: /fr/actions/app_builder/
[8]: /fr/actions/datadog_apps