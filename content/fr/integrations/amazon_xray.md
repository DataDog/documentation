---
aliases:
  - /fr/integrations/awsxray/
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: Tracer les requêtes qui passent d'un service AWS à un autre
doc_link: 'https://docs.datadoghq.com/integrations/amazon_xray/'
git_integration_title: amazon_xray
has_logo: true
integration_title: AWS X-Ray
is_public: true
kind: integration
manifest_version: 1
name: amazon_xray
public_title: "Intégration Datadog/AWS\_X-Ray"
short_description: Tracer les requêtes qui passent d'un service AWS à un autre
version: 1
---
## Présentation

AWS X-Ray permet aux développeurs de tracer des applications distribuées qui ont été créées grâce à des produits AWS. Cette intégration fournit des traces pour les fonctions Lambda dans la page de détails des fonctions [sans serveur][1]. Pour en savoir plus sur les fonctions sans serveur, consultez la [documentation dédiée][2].

## Implémentation

### Installation

Pour commencer, [activez l'intégration AWS][3] et ajoutez les autorisations suivantes au document de stratégie dans votre rôle AWS/Datadog :

```
xray:BatchGetTraces,
xray:GetTraceSummaries
```

L'autorisation `GetTraceSummaries` permet d'obtenir la liste des traces récentes, tandis que `BatchGetTraces` renvoie la totalité des traces.

Ensuite, [activez l'intégration X-Ray dans Datadog][4].

Si vous utilisez une clé principale client pour chiffrer les traces, ajoutez la méthode `kms:Decrypt` à la stratégie au sein de laquelle la ressource correspond à la clé principale client utilisée pour X-Ray.

### Activer AWS X-Ray pour vos fonctions

Pour tirer le meilleur parti de l'intégration AWS X-Ray, vous devez l'activer *pour* vos fonctions Lambda et vos instances d'API Gateway, **mais aussi** installer les bibliothèques de tracing *dans* vos fonctions Lambda.

#### Utilisation du plug-in Serverless Framework (conseillé)

Le plug-in [Serverless Framework de Datadog][16] active automatiquement X-Ray pour vos fonctions Lambda et vos instances d'API Gateway. Le plug-in se charge également d'ajouter la [couche Lambda Datadog][15] à toutes vos fonctions Node et Python.

Pour apprendre à utiliser le plug-in Serverless Framework, [lisez cet article de blog][7] et [consultez la documentation][16] (en anglais).

Enfin, [installez et importez la bibliothèque client X-Ray dans votre fonction Lambda](#installer-les-bibliotheques-client-x-ray).

#### Configuration manuelle

1. Accédez à la fonction Lambda dans la console AWS que vous souhaitez instrumenter. Dans la section « Debugging and error handling », cochez la case **Enable active tracing** afin d'activer X-Ray pour cette fonction.
2. Accédez à la [console API Gateway][6]. Sélectionnez votre API ainsi que l'étape. Ensuite, depuis l'onglet **Logs/Tracing** sélectionnez **Enable X-Ray Tracing**. Pour que ces changements prennent effet, accédez à **Resources** dans le volet de navigation sur la gauche et sélectionnez **Actions**. Ensuite, cliquez sur **Deploy API**.

**Remarque :** la couche Lambda Datadog et les bibliothèques client intègrent le X-Ray SDK en tant que dépendance. Vous n'avez donc pas besoin de l'installer dans vos projets.


Enfin, [installez et importez la bibliothèque client X-Ray dans votre fonction Lambda](#installer-les-bibliotheques-client-x-ray).

### Installer les bibliothèques client X-Ray

La bibliothèque client X-Ray vous permet d'analyser vos requêtes HTTP envoyées aux API ainsi que les appels des services DynamoDB, S3, MySQL et PostgreSQL (auto-hébergé, Amazon RDS et Amazon Aurora), SQS et SNS.

Installez la bibliothèque, importez-la dans vos projets Lambda, puis patchez les services que vous souhaitez instrumenter.

{{< tabs >}}
{{% tab "Node.js" %}}

Installer la bibliothèque de tracing X-Ray :

```bash
$ npm install aws-xray-sdk   # pour les utilisateurs de NPM
$ yarn add aws-xray-sdk      # pour les utilisateurs de Yarn
```

Pour instrumenter le SDK AWS :

```js
var AWSXRay = require('aws-xray-sdk-core');
var AWS = AWSXRay.captureAWS(require('aws-sdk'));
```

Pour instrumenter tous les appels HTTP en aval :

```js
var AWSXRay = require('aws-xray-sdk');
AWSXRay.captureHTTPsGlobal(require('http'));
var http = require('http');
```

Pour instrumenter les requêtes PostgreSQL :

```js
var AWSXRay = require('aws-xray-sdk');
var pg = AWSXRay.capturePostgres(require('pg'));
var client = new pg.Client();
```

Pour instrumenter les requêtes MySQL :

```js
var AWSXRay = require('aws-xray-sdk');
var mysql = AWSXRay.captureMySQL(require('mysql'));
...
var connection = mysql.createConnection(config);
```

Pour en savoir plus sur la configuration, la création de sous-segments et l'enregistrement d'annotations, consultez la [documentation X-Ray pour Node.js][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{% /tab %}}
{{% tab "Python" %}}

Installer la bibliothèque de tracing X-Ray :

```bash
$ pip install aws-xray-sdk
```

Pour patcher [toutes les bibliothèques][2] par défaut, ajoutez ce qui suit au fichier contenant vos gestionnaires de fonctions Lambda :

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

Notez que le tracing de `aiohttp` nécessite une [instrumentation spécifique][3].

Pour en savoir plus sur la configuration, la création de sous-segments et l'enregistrement d'annotations, consultez la [documentation X-Ray pour Python][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html

{{% /tab %}}
{{% tab "Go, Ruby, Java, .NET" %}}

Pour tout autre runtime, consultez la documentation sur X-Ray SDK :

 * [X-Ray SDK pour Go][1]
 * [X-Ray SDK pour Ruby][2]
 * [X-Ray SDK pour Java][3]
 * [X-Ray SDK pour .NET et Core][4]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
[4]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{% /tab %}}
{{< /tabs >}}

## Données collectées
L'intégration AWS X-Ray récupère les données de trace d'AWS et ne recueille aucune métrique ni aucun log.

[1]: http://app.datadoghq.com/functions
[2]: https://docs.datadoghq.com/fr/infrastructure/serverless_functions
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[5]: https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python-patching.html
[6]: https://console.aws.amazon.com/apigateway/
[7]: https://www.datadoghq.com/blog/serverless-framework-plugin
[8]: https://github.com/DataDog/serverless-plugin-datadog
[15]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[16]: https://github.com/DataDog/serverless-plugin-datadog


{{< get-dependencies >}}