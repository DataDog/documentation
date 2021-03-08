---
title: Activer les traces AWS X-Ray
kind: documentation
description: Tracer vos fonctions Lambda avec AWS X-Ray
aliases:
  - /fr/tracing/serverless_functions/enable_aws_xray/
---
## Activer AWS X-Ray

**Prérequis :** [installez l'intégration AWS][1].

1. Assurez-vous que le document de stratégie de votre rôle AWS/Datadog comporte les autorisations suivantes :

```text
xray:BatchGetTraces,
xray:GetTraceSummaries
```

    L'autorisation `BatchGetTraces` renvoie la totalité des traces, tandis que `GetTraceSummaries` permet d'obtenir la liste des traces récentes.

2. [Activez l'intégration X-Ray dans Datadog][2].

3. Si vous utilisez une clé principale client pour chiffrer les traces, ajoutez la méthode `kms:Decrypt` à la stratégie au sein de laquelle la ressource correspond à la clé principale client utilisée pour X-Ray.

**Remarque** : l'activation de l'intégration AWS X-Ray augmente le nombre de spans indexées utilisées, ce qui peut avoir une incidence sur votre facturation.

### Activer AWS X-Ray pour vos fonctions

Pour tirer le meilleur parti de l'intégration AWS X-Ray :

- Activez-la pour vos fonctions Lambda et vos instances d'API Gateway, soit en utilisant le plugin Serverless Framework soit manuellement.
- Installez les bibliothèques de tracing dans vos fonctions Lambda.

#### Utilisation du plug-in Serverless Framework (conseillé)

Le plug-in [Serverless Framework de Datadog][3] active automatiquement X-Ray pour vos fonctions Lambda et vos instances d'API Gateway. Le plug-in se charge également d'ajouter la [couche Lambda Datadog][4] à toutes vos fonctions Node.js et Python.

Pour apprendre à utiliser le plug-in Serverless Framework, [lisez cet article de blog][5] et [consultez la documentation][3] (en anglais).

Enfin, [installez et importez la bibliothèque client X-Ray dans votre fonction Lambda](#installer-les-bibliotheques-client-x-ray).

#### Configuration manuelle

Si vous n'utilisez pas Serverless Framework pour déployer votre application sans serveur, suivez ces instructions pour une configuration manuelle :

1. Accédez à la fonction Lambda dans la console AWS que vous souhaitez instrumenter. Dans la section « Debugging and error handling », cochez la case **Enable active tracing** afin d'activer X-Ray pour cette fonction.
2. Accédez à la [console API Gateway][6]. Sélectionnez votre API ainsi que l'étape.
3. Ensuite, depuis l'onglet **Logs/Tracing**, sélectionnez **Enable X-Ray Tracing**.
4. Pour que ces changements prennent effet, accédez à **Resources** dans le volet de navigation sur la gauche et sélectionnez **Actions**. Ensuite, cliquez sur **Deploy API**.

**Remarque :** la couche Lambda Datadog et les bibliothèques client intègrent le X-Ray SDK en tant que dépendance. Vous n'avez donc pas besoin de l'installer dans vos projets.

Enfin, [installez et importez la bibliothèque client X-Ray dans votre fonction Lambda](#installer-les-bibliotheques-client-x-ray).

#### Installer les bibliothèques client X-Ray

La bibliothèque client X-Ray vous permet d'analyser vos requêtes HTTP envoyées aux API ainsi que les appels des services DynamoDB, S3, MySQL et PostgreSQL (auto-hébergé, Amazon RDS et Amazon Aurora), SQS et SNS.

Installez la bibliothèque, importez-la dans vos projets Lambda, puis patchez les services que vous souhaitez instrumenter.

{{< programming-lang-wrapper langs="nodejs,python,go,ruby,java,.NET" >}}

{{< programming-lang lang="nodejs" >}}

Installer la bibliothèque de tracing X-Ray :

```bash

npm install aws-xray-sdk

# pour les utilisateurs de Yarn
yarn add aws-xray-sdk
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
//...
var connection = mysql.createConnection(config);
```

Pour en savoir plus sur la configuration, la création de sous-segments et l'enregistrement d'annotations, consultez la [documentation X-Ray pour Node.js][1].

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-nodejs.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

Installer la bibliothèque de tracing X-Ray :

```bash
pip install aws-xray-sdk
```

Pour patcher [toutes les bibliothèques][1] par défaut, ajoutez ce qui suit au fichier contenant vos gestionnaires de fonctions Lambda :

```python
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()
```

Notez que le tracing de `aiohttp` nécessite une [instrumentation spécifique][2].

Pour en savoir plus sur la configuration, la création de sous-segments et l'enregistrement d'annotations, consultez la [documentation X-Ray pour Python][3].


[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-patching.html
[2]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python-httpclients.html
[3]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-python.html
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}
Consultez la ressource suivante :
- [SDK X-Ray pour Go][1]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-go.html
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
Consultez la ressource suivante :
- [SDK X-Ray pour Ruby][1]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-ruby.html
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

Consultez la ressource suivante :
- [SDK X-Ray pour Java][1]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-java.html
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Consultez la ressource suivante :
- [SDK X-Ray pour .NET][1]

[1]: https://docs.aws.amazon.com/en_pv/xray/latest/devguide/xray-sdk-dotnet.html
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: integrations/amazon_web_services/#setup
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_xray
[3]: https://github.com/DataDog/serverless-plugin-datadog
[4]: https://docs.datadoghq.com/fr/integrations/amazon_lambda/?tab=python#installing-and-using-the-datadog-layer
[5]: https://www.datadoghq.com/blog/serverless-framework-plugin
[6]: https://console.aws.amazon.com/apigateway/