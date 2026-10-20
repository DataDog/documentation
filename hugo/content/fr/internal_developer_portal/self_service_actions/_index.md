---
aliases:
- /fr/software_catalog/actions
- /fr/software_catalog/self-service
- /fr/service_catalog/self-service
- /fr/software_catalog/self-service_actions
- /fr/software_catalog/self_service_actions
cascade:
  site_support_id: idp
description: Les équipes de plateforme peuvent définir et partager des modèles qui
  permettent aux développeurs de provisionner l'infrastructure, de générer des services,
  de gérer les déploiements et d'automatiser les tâches en un clic.
further_reading:
- link: https://www.datadoghq.com/blog/app-builder-remediation/
  tag: Blog
  text: Résolvez les incidents plus rapidement avec App Builder
- link: /actions/app_builder/
  tag: Documentation
  text: En savoir plus sur App Builder
- link: /actions/workflows/
  tag: Documentation
  text: En savoir plus sur Workflows
- link: https://www.datadoghq.com/blog/software-catalog-self-service-actions/
  tag: Blog
  text: Donnez à vos équipes d'ingénierie les moyens d'agir avec Self-Service Actions
    dans Datadog Catalog
title: Self-Service Actions
---
Les [Self-Service Actions][17] aident les équipes de plateforme à définir et partager des modèles pour rationaliser les tâches tout au long du cycle de vie du développement logiciel. Les développeurs peuvent utiliser ces actions prédéfinies pour :

- créer des microservices et une infrastructure avec des configurations appropriées
- initialiser les environnements de développement
- gérer les déploiements entre les environnements
- surveiller et optimiser activement les services en cours d'exécution

Chaque vignette représente une application, qui fournit une interface structurée pour exécuter des actions prédéfinies. Les applications sont créées via [App Builder][2], propulsées par [Action Catalog][7] et [Workflow Automation][1], et présentées dans le Catalogue pour rationaliser les workflows des développeurs.

## Automatisez les workflows des développeurs {#automate-developer-workflows}

Pour créer une nouvelle application dans le Catalogue, vous pouvez commencer avec un exemple ou créer à partir de zéro. De manière générale, la création d'une nouvelle application implique les étapes suivantes :

1. Utilisez [App Builder][2] pour créer des formulaires dynamiques et conviviaux afin de recueillir les entrées des développeurs.
1. Appelez les [Actions][7] de Datadog depuis votre application pour lancer des appels API vers des services externes, exécuter une logique personnalisée ou transformer des données. 
1. Utilisez [Workflow Automation][1] pour orchestrer des processus de bout en bout avec plusieurs actions.
1. Intégrez votre application au Catalogue de Datadog pour activer des workflows dynamiques et en libre-service.

{{< img src="tracing/software_catalog/self-service-ui.png" alt="Publier sur Self-Service" style="width:100%;" >}}

### Partir d'un exemple {#start-from-an-example}

Pour commencer rapidement, explorez les [Blueprints App Builder][9] et les [Blueprints Workflow Automation][15] pour obtenir des exemples sur la façon de configurer respectivement des applications et des workflows. Vous pouvez configurer des entrées, mettre en place des intégrations, configurer des autorisations et effectuer d'autres ajustements sur les blueprints pour répondre à vos besoins. 

Par exemple, vous pouvez utiliser les Blueprints App Builder pour :

- **Générez de nouveaux services à partir de modèles :** Configurez un formulaire pour collecter les informations d'un développeur, intégrez-le à un modèle dans la gestion du code source (par exemple, GitHub ou GitLab), et générez un nouveau dépôt, pull request ou merge request pour ce développeur. Lisez la [documentation sur les modèles logiciels][16] pour en savoir plus.
- **Provisionner l'infrastructure :** Permettez aux développeurs de lancer une nouvelle infrastructure (par exemple, un compartiment S3) avec quelques entrées et un seul clic. Recueillez les approbations d'une équipe SRE ou d'ingénierie de plateforme via la gestion du code source ou les actions d'approbation dans Workflow Automation.
- **Remédier aux problèmes :** Consolidez les données de l'infrastructure cloud ou de Kubernetes et permettez aux développeurs d'effectuer des actions de remédiation simples et sûres. Déclenchez des actions manuellement, en réponse à un monitor ou à partir d'un appel API externe.
- **Gérer les modifications de code et les déploiements :** Gérez les déploiements, les modifications des feature flags, et plus encore. Initiez des changements directement depuis Datadog et suivez leur statut et leurs approbations.
- **Provisionner des environnements de développement :** Créez des environnements éphémères pour les développeurs à la demande. Utilisez Workflow Automation pour déprovisionner automatiquement toute infrastructure inutilisée afin de contrôler les coûts.

### Partir de zéro {#start-from-scratch}

Si vous préférez créer une application à partir de zéro :

1. Créer un formulaire à l'aide d'App Builder :

    1. Accédez à **Actions** > **App Builder** depuis le menu de gauche, et sélectionnez **New App**.
    1. Saisissez un nom et une description, et utilisez l'éditeur glisser-déposer pour créer un formulaire qui collecte les paramètres requis.
       - Vous pouvez utiliser le composant `Form` ou créer une interface utilisateur personnalisée.
    1. Sélectionnez **Nouvelle requête**, et utilisez l'action **Déclencher le workflow** pour appeler votre workflow et transmettre des paramètres. 
       - Explorez l'[Action Catalog][7] pour les intégrations intégrées, ou utilisez l'action `HTTP` pour interagir avec toute intégration non disponible.
    1. Créez un **Bouton** qui soumet le formulaire et déclenche votre workflow.
    1. Enregistrez et publiez l'application.

1. Associez votre application à des [Actions][7] ou à un [Workflow][6] pour automatiser les processus.

   {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow pour l'automatisation de modèles logiciels" style="width:100%;" >}}

1. Testez votre application et votre workflow :
   
   1. Cliquez sur **Voir l'application** pour prévisualiser l'application sur une page autonome.
   1. Surveillez l'exécution du workflow dans [Workflow Automation][3].

### Publiez votre application {#publish-your-app}

Une fois votre modèle de logiciel configuré et testé, publiez-le afin que votre équipe puisse l'utiliser. Le flux de publication vous permet de :

- Définir des autorisations pour contrôler l'accès.
- Ajouter l'application à un Dashboard ou aux Self-Service Actions pour une découverte facile.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publier sur Self-Service" style="width:100%;" >}}
    

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/actions/workflows/
[2]: /fr/actions/app_builder/
[3]: https://app.datadoghq.com/workflow
[4]: https://www.cookiecutter.io/
[5]: https://gist.github.com/enbashi/366c62ee8c5fc350d52ddabc867602d4#file-readme-md
[6]: /fr/actions/workflows/build/#create-a-custom-workflow
[7]: /fr/actions/actions_catalog/
[9]: https://app.datadoghq.com/app-builder/blueprints
[10]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=create-new-s3-bucket&viewMode=edit
[11]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=queries&showActionCatalog=false&template=scaffolding&viewMode=edit
[12]: /fr/actions/private_actions/
[13]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=provision-eks-cluster&viewMode=edit&visibleDataItemId=createOrUpdateFile0-action
[14]: https://app.datadoghq.com/app-builder/apps/edit?activeTab=data&showActionCatalog=false&template=rds_provision_instance&viewMode=edit&visibleDataItemId=createDbInstance0-action
[15]: https://app.datadoghq.com/workflow/blueprints
[16]: /fr/internal_developer_portal/self_service_actions/software_templates/
[17]: https://app.datadoghq.com/software/self-service