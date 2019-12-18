---
kind: documentation
title: "Datadog/Amazon\_CloudFormation"
---
​
[AWS CloudFormation][1] vous fournit des modèles afin de décrire, de configurer et de provisionner simultanément toutes les ressources AWS de votre environnement. Les ressources Datadog/AWS CloudFormation vous permettent d’interagir avec les ressources Datadog prises en charge. Pour commencer :

1. Dans votre terminal, utilisez [l'outil aws-cli][2] pour ajouter une ressource Datadog.

    ```shell
    aws cloudformation register-type \
        --region "<REGION>" \
        --type RESOURCE \
        --type-name "<DATADOG_RESOURCE_NAME>" \
        --schema-handler-package "<LINK_TO_S3>"
    ```

2. Pour visualiser la version de la ressource que vous venez d'ajouter, exécutez ce qui suit dans votre terminal :

    ```shell
    aws cloudformation list-type-versions \
    --region "<REGION>" \
    --type RESOURCE \
    --type-name "<DATADOG_RESOURCE_NAME>"
    ```

3. Définissez cette version comme version `default` en exécutant ce qui suit dans votre terminal :

    ```shell
    aws cloudformation set-type-default-version \
        --region "<REGION>" \
        --type RESOURCE \
        --version-id <VERSION_ID> \
        --type-name "<DATADOG_RESOURCE_NAME>"
    ```

   Assurez-vous de remplacer les paramètres fictifs suivants :
    * `<REGION>` : votre région AWS.
    * `<DATADOG_RESOURCE_NAME>` : le nom de la ressource à ajouter. Consultez le [tableau ci-dessous](#ressources-disponibles) pour vérifier les ressources prises en charge.
    * `<LINK_TO_S3>` : le lien S3 vers la ressource.
      * S3 link : `s3://datadog-cloudformation-resources/<DOSSIER_RESSOURCE>/<DOSSIER_RESSOURCE>-<VERSION_RESSOURCE>.zip`
      * Consultez la section [Ressources disponibles](#ressources-disponibles) pour obtenir des exemples de liens S3 récents pris en charge.
    * `VERSION_ID` : la version sous-jacente de la ressource, telle que spécifiée dans la sortie de la commande à l'étape `2`.

4. Dans votre compte AWS, [créez une pile AWS][3] qui comprend les ressources Datadog ajoutées.

Pour en savoir plus sur les commandes et les workflows disponibles, consultez la [documentation AWS officielle][14].

## Ressources disponibles

Les ressources Datadog suivantes peuvent être ajoutées à votre compte AWS. Consultez la documentation à leur sujet pour découvrir comment les configurer :

| Ressource                | Nom                          | Description                                             | Dossier                      | Lien vers la ressource     |
|-------------------------|-------------------------------|---------------------------------------------------------|-----------------------------|-------------|
| Intégration Datadog/AWS | `Datadog::Integrations::AWS`  | [Gérer votre intégration Datadog/Amazon Web Services][4] | `datadog-integrations-aws`  | [Télécharger][5]  |
| Monitors                | `Datadog::Monitors::Monitor`  | [Créer, modifier et supprimer des monitors Datadog][6]       | `datadog-monitors-monitor`  | [Télécharger][7]  |
| Downtimes               | `Datadog::Monitors::Downtime` | [Activer ou désactiver des downtimes pour vos monitors][8]     | `datadog-monitors-downtime` | [Télécharger][9]  |
| Utilisateur                    | `Datadog::IAM::User`          | [Créer et gérer des utilisateurs Datadog][10]                 | `datadog-iam-user`          | [Télécharger][11] |

## Développement

Le référentiel `Datadog/datadog-cloudformation-resources` contient :

* Toutes les ressources actuellement mises en œuvre pour AWS CloudFormation
* Un package avec des capacités de base partagées entre les ressources, `datadog-cloudformation-common`

### Implémentation

Pour définir le fournisseur Datadog/AWS CloudFormation, suivez les instructions ci-dessous :

1. Créez [datadog-api-client-java][12] :

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

**Remarque** : les tests utilisent les paramètres de variable d'environnement `DD_TEST_CF_API_KEY`, `DD_TEST_CF_APP_KEY` et éventuellement `DD_TEST_CF_API_URL`.

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

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/GettingStarted.html
[2]: https://aws.amazon.com/cli/
[3]: https://console.aws.amazon.com/cloudformation/home
[4]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-integrations-aws-handler
[5]: s3://datadog-cloudformation-resources/datadog-integrations-aws/datadog-integrations-aws-1.0.1.zip
[6]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-monitor-handler
[7]: s3://datadog-cloudformation-resources/datadog-monitors-monitor/datadog-monitors-monitor-1.0.1.zip
[8]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/datadog-monitors-downtime-handler
[9]: s3://datadog-cloudformation-resources/datadog-monitors-downtime/datadog-monitors-downtime-1.0.1.zip
[10]: https://github.com/DataDog/datadog-cloudformation-resources/tree/master/ddatadog-iam-user-handler
[11]: s3://datadog-cloudformation-resources/datadog-iam-user/datadog-iam-user-1.0.1.zip
[12]: https://github.com/DataDog/datadog-api-client-java
[13]: https://docs.datadoghq.com/fr/help/
[14]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html