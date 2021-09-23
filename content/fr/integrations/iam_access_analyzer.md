---
categories:
  - cloud
  - aws
  - log collection
  - security
ddtype: crawler
description: null
short_description: null
doc_link: https://docs.datadoghq.com/integrations/iam_access_analyser/
git_integration_title: amazon_iam_access_analyser
has_logo: true
integration_title: AWS Identity and Access Management (IAM) Access Analyzer
is_public: true
dependencies:
  - https://github.com/DataDog/documentation/blob/master/content/en/integrations/iam_access_analyzer.md
kind: integration
manifest_version: 1
name: iam_access_analyzer
public_title: Intégration Datadog/AWS Identity and Access Management Access Analyzer
version: 1
integration_id: iam-access-analyzer
---
## Présentation

Utilisez AWS Identity and Access Management (IAM) Access Analyzer sur votre compte Amazon pour analyser en permanence les autorisations IAM accordées en utilisant les stratégies de votre compte. Datadog s'intègre à Amazon IAM Access Analyzer via une fonction Lambda qui transmet tous les logs à Datadog.

## Configuration

### Collecte de logs

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][1].

2. Créez une règle dans AWS EventBridge.

3. Définissez un modèle d'événement personnalisé avec le bloc suivant :

    ```json
    {
        "source": ["aws.access-analyzer"]
    }
    ```

4. Sélectionnez un bus d'événements et définissez la fonction Lambda de Datadog comme cible.

5. Enregistrez votre règle.

6. Accédez ensuite à la section [Log Explorer][2] pour commencer à explorer vos logs.

[1]: /fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[2]: https://app.datadoghq.com/logs