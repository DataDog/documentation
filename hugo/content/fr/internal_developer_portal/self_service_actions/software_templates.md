---
aliases:
- /fr/service_catalog/software_templates
- /fr/software_catalog/software_templates
- /fr/software_catalog/self-service/software_templates
- /fr/software_catalog/self_service_actions/software_templates
- /fr/software_catalog/self-service_actions/software_templates
description: Créez des modèles logiciels réutilisables dans le Catalogue pour aider
  les développeurs à provisionner l'infrastructure et à créer des microservices conformes
  aux meilleures pratiques de votre organisation.
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
title: Modèles logiciels
---
Créez des modèles logiciels dans le Catalogue pour aider les développeurs à provisionner rapidement l'infrastructure et à créer des microservices conformes à vos meilleures pratiques. 

## Créez un modèle logiciel {#create-a-software-template}

Un modèle logiciel est stocké dans un dépôt Git et sert de cadre réutilisable. [Build apps][2] pour collecter des entrées et les transmettre au dépôt de modèles afin de générer des configurations personnalisées.

Pour créer un modèle logiciel, vous pouvez :
- Partez d'un exemple en utilisant des blueprints prédéfinis.
- Partez de zéro en définissant votre propre modèle et vos workflows.

### Partir d'un exemple {#start-from-an-example}

Utilisez [App Builder Blueprints][9] pour configurer rapidement une application ou un workflow. Ces blueprints fournissent des exemples fonctionnels que vous pouvez personnaliser en modifiant les entrées, en intégrant le contrôle de version ou des fournisseurs cloud, et en ajustant les autorisations.

Exemples de blueprints :

- **[Scaffold New Service blueprint][11]** : Créez un formulaire qui recueille les entrées des développeurs, s'intègre à GitHub et génère un nouveau dépôt ou un pull request.
- **[Blueprint Create S3 Bucket][10]** : Générez du code Terraform pour un S3 bucket en utilisant un formulaire dans GitHub.
- **[Blueprint Provision EKS Cluster][13]** : Générez du code Terraform pour un cluster Kubernetes dans GitHub.
- **[Blueprint Provision RDS Instance][14]** : Provisionnez une instance RDS dans AWS via un appel API.

Pour utiliser un blueprint :

1. Sélectionnez un blueprint dans [**App Builder Blueprints**][9].
1. Personnalisez les champs du formulaire pour capturer les entrées requises.
1. Cliquez sur **Save as New App** pour créer une application liée à un workflow de création de modèles.

### Partir de zéro {#start-from-scratch}

Pour créer un modèle logiciel à partir de zéro :

1. Créer un formulaire à l'aide d'App Builder :

    1. Accédez à **Actions** > **App Builder** depuis le menu de gauche, et sélectionnez **New App**.
    1. Saisissez un nom et une description, et utilisez l'éditeur glisser-déposer pour créer un formulaire qui collecte les paramètres requis.
       - Vous pouvez utiliser le composant `Form` ou créer une interface utilisateur personnalisée.
    1. Sélectionnez **Nouvelle requête**, et utilisez l'action **Déclencher le workflow** pour appeler votre workflow et transmettre des paramètres. 
       - Explorez l'[Action Catalog][7] pour les intégrations intégrées, ou utilisez l'action `HTTP` pour interagir avec toute intégration non disponible.
    1. Créez un **Bouton** qui soumet le formulaire et déclenche votre workflow.
    1. Enregistrez et publiez l'application.

2. [Créez un workflow][6] pour votre modèle :
   
   1. Accédez à [Workflow Automation][3] et cliquez sur **New Workflow**. 
   1. Saisissez un nom, ajoutez des tags pertinents et définissez les paramètres d'entrée que vous souhaitez collecter auprès des utilisateurs.
  
3. Configurez le workflow de création de modèles :

   1. Utilisez les [actions][7] GitHub, GitLab ou HTTP pour récupérer vos fichiers de modèle.
   1. Utilisez l'action [Apply Template][7] pour manipuler votre dépôt de modèles et transmettre vos paramètres d'entrée.
   1. Utilisez les [actions][7] GitHub, GitLab ou HTTP pour téléverser les fichiers du projet vers le dépôt.
   1. Enregistrez le workflow.

  {{< img src="tracing/software_catalog/templating-workflow.png" alt="Workflow pour la création d'automatisations de modèles logiciels" style="width:100%;" >}}

4. Testez votre application et votre workflow :

   1. Cliquez sur **Voir l'application** pour prévisualiser l'application en tant que page autonome.
   1. Surveillez le processus de création de modèles dans [Workflow Automation][3].

## Publiez votre application {#publish-your-app}

Une fois votre modèle de logiciel configuré et testé, publiez-le afin que votre équipe puisse l'utiliser. Le flux de publication vous permet de :

- Définir des autorisations pour contrôler l'accès.
- Ajouter l'application à un Dashboard ou aux Self-Service Actions pour une découverte facile.

{{< img src="tracing/software_catalog/self-service-publish.png" alt="Publier sur Self-Service" style="width:100%;" >}}

## Actions de création de modèles disponibles {#available-templating-actions}

Les actions suivantes sont disponibles pour le catalogue dans Datadog App Builder et Workflow Automation. Pour une liste complète, consultez [Action Catalog][7].

- **Création de modèles**
  - « Apply template » : transmettez des paramètres d'entrée dans un ensemble de fichiers.
- **GitHub**
  - « Create or update file » : créez ou modifiez des fichiers dans un dépôt GitHub.
  - « Edit configuration file » : modifiez des fichiers de configuration YAML ou JSON.
  - « Trigger GitHub Actions workflow » : lancez une action GitHub.
  - « Search repositories » : récupérez une liste de dépôts.
  - « Create pull request » : ouvrez une pull request.
- **GitLab**
  - « Create file » : créez un fichier dans un dépôt GitLab.
  - « Create project » : créez un projet GitLab.
- **Azure DevOps**
  - « Run pipeline » : déclenchez l'exécution d'un pipeline dans Azure DevOps.
- **Retrieve Service Information**
  - « List entity definitions » : récupérez toutes les définitions de service du Catalogue Datadog (v3.0 et antérieures).
  - « Get service dependencies » : récupérez les dépendances amont et aval d'un service.
- **Approbations**
  - « Make a decision » : utilisez Slack ou Microsoft Teams pour solliciter une approbation.
    - Utilisez des intégrations avec ServiceNow, Jira ou des appels HTTP si vous disposez d'un processus de gestion des changements existant.
- **HTTP**
  - « Make request » : effectuez une requête HTTP pour interagir avec n'importe quelle API externe.
- **Transformation de données**
  - « Expression », « Function » : effectuez des transformations de données avec JavaScript.
    - Utilisez Bits AI pour vous aider à écrire du code JavaScript personnalisé.
- **Private Actions**
  - Pour interagir avec des ressources privées, utilisez le [Private Action Runner][12].
    

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