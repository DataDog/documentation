---
title: Signature de code Lambda
kind: documentation
---
Grâce à la [signature de code pour AWS Lambda][1], vous êtes certain de ne déployer que du code fiable depuis vos fonctions Lambda vers AWS. Lorsque vous activez la signature de code sur vos fonctions, AWS vérifie que tout le code de vos déploiements est signé par une source fiable. Vous pouvez définir les sources auxquelles vous faites confiance depuis la [configuration de la signature de code][2]. 

# Configuration

Si vos fonctions Lambda sont configurées de façon à utiliser la signature de code, vous devez ajouter l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) à la [configuration de la signature de code][2] de votre fonction avant de pouvoir déployer vos fonctions Lambda à l'aide des couches Lambda publiées par Datadog. Les bibliothèques et intégrations suivantes ajoutent des couches Lambda à vos fonctions :
- [Bibliothèque Lambda Datadog][3]
- [Extension Lambda Datadog][4]
- [Plug-in Serverless Datadog][5]
- [Macro CloudFormation Datadog][6]
- [CLI Datadog][7]
- [Bibliothèque CDK Construct Datadog][8]

[1]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html
[2]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-updates
[3]: /fr/serverless/libraries_integrations/library
[4]: /fr/serverless/libraries_integrations/extension
[5]: /fr/serverless/libraries_integrations/plugin
[6]: /fr/serverless/libraries_integrations/macro
[7]: /fr/serverless/libraries_integrations/cli
[8]: https://www.npmjs.com/package/datadog-cdk-constructs