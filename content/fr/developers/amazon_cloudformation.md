---
kind: documentation
title: Datadog/Amazon CloudFormation
---

​
[AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html) vous fournit des modèles afin de décrire, de configurer et de provisionner simultanément toutes les ressources AWS de votre environnement. Le fournisseur Datadog/AWS CloudFormation vous permet d’interagir avec les ressources Datadog prises en charge. Pour commencer :

1. Dans votre terminal, utilisez [l'outil aws-cli](https://aws.amazon.com/cli/) pour ajouter une ressource Datadog.

    ```shell
    aws cloudformation register-type \
        --region <REGION> \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package <LINK_TO_S3>
    ```

    Avec les paramètres fictifs suivants :
    * `<REGION>` : votre région AWS.
    * `<DATADOG_RESOURCE_NAME>` : le nom de la ressource à ajouter ; consultez le tableau ci-dessous pour vérifier les ressources prises en charge.
    * `<LINK_TO_S3>` : le lien S3 vers la ressource.
      * S3 link: `s3://datadog-cloudformation-resources/<DOSSIER_RESSOURCE>/<DOSSIER_RESSOURCE>-1.0.0.zip`

2. Dans votre compte AWS, [créez une pile AWS](https://console.aws.amazon.com/cloudformation/home) qui comprend les ressources Datadog ajoutées.

## Ressources disponibles

Les ressources Datadog suivantes peuvent être ajoutées à votre compte AWS. Consultez la documentation à leur sujet pour découvrir comment les configurer :

| Ressource                | Nom                          | Description                                                                                                                                                    |
|-------------------------|-------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Intégration Datadog/AWS | `Datadog::Integrations::AWS`  | [Gérez votre intégration Datadog/Amazon Web Services.](https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler) |
| Monitors                | `Datadog::Monitors::Monitor`  | [Créez, modifiez et supprimez des monitors Datadog](https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler).       |
| ​Downtimes                | `Datadog::Monitors::Downtime` | [Activez ou désactivez des downtimes pour vos monitors](https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler).    |
| Utilisateur                    | `Datadog::IAM::User`          | [Créez et gérez des utilisateurs Datadog](https://github.com/DataDog/datadog-cloudformation-resources/tree/master/ddatadog-iam-user-handler).                         |

## Développement

Le référentiel `Datadog/datadog-cloudformation-resources` contient :

* Toutes les ressources actuellement mises en œuvre pour AWS CloudFormation
* Un package avec des capacités de base partagées entre les ressources, `datadog-cloudformation-common`

### Implémentation

Pour définir le fournisseur Datadog/AWS CloudFormation, suivez les instructions ci-dessous :

1. Créez [datadog-api-client-java](https://github.com/DataDog/datadog-api-client-java) :

    ```
    git clone git@github.com:DataDog/datadog-api-client-java.git
    cd datadog-api-client-java

    # This installs the client into ~/.m2/repository
    mvn install -Dmaven.test.skip=true
    ```
2. Créez `datadog-cloudformation-common` :
​
    ```
    # This installs the common package into ~/.m2/repository
    mvn -f datadog-cloudformation-common/pom.xml -Dmaven.test.skip=true install
    ```
3. Installez `cfn-cli`.

### Effectuer des tests

1. Suivez les étapes de la section [Implémentation](#implementation).
2. Exécutez la commande `cd` sur le répertoire de la ressource à tester.
3.  Exécutez `mvn test` au sein du répertoire pour lancer un ensemble de tests sur cette ressource.

**Remarque** : les tests utilisent les paramètres `DD_TEST_CF_API_KEY` and `DD_TEST_CF_APP_KEY` de variables d'environnement.

### Conseils de développement

* Les gestionnaires `Create` et `Update` de votre ressource doivent appeler le gestionnaire `Read` (lorsque la création ou la mise à jour fonctionnent) afin de renvoyer un modèle entièrement rempli.
* En cas d'échec, les gestionnaires renvoient un message d'erreur. À l'inverse, en cas d'opération réussie, vous ne recevez pas de message. Par exemple :
​
    ```
    return ProgressEvent.<ResourceModel, CallbackContext>builder()
        .resourceModel(model)
        .status(OperationStatus.FAILED)
        .message("Failed to read monitor 12345")
        .build();
    ```

* Les identificateurs primaires doivent tous reposer sur les champs requis. L'utilisation de champs facultatifs pour cette propriété entraîne des erreurs lors de la création de la pile. Les identifiants primaires apparaissent également lorsque `Fn:Ref` est appelé sur cette ressource.
* L'utilisation du `logger` intégré au niveau de la ressource affiche les logs CloudWatch afin de vous aider à résoudre les éventuels problèmes.

## Dépannage

Besoin d'aide ? Contactez l'[assistance Datadog](https://docs.datadoghq.com/help/).
