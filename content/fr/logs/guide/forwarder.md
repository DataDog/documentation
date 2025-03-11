---
aliases:
- /fr/serverless/troubleshooting/installing_the_forwarder/
- /fr/serverless/forwarder/
- /fr/serverless/libraries_integrations/forwarder/
dependencies:
- https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md
title: Forwarder Datadog
---

Le Forwarder Datadog est une fonction AWS Lambda qui envoie des logs, des métriques custom et des traces depuis votre environnement à Datadog. Le Forwarder peut :

- Transmettre les logs CloudWatch, ELB, S3, CloudTrail, VPC, SNS et CloudFront à Datadog
- Transmettre les événements S3 à Datadog
- Transmettre les événements des flux de données Kinesis à Datadog (seuls les logs CloudWatch sont pris en charge)
- Transmettre les métriques custom de fonctions AWS Lambda à l'aide de CloudWatch Logs
- Transmettre les traces de fonctions AWS Lambda à l'aide de CloudWatch Logs
- Générer et envoyer des métriques Lambda optimisées (`aws.lambda.enhanced.*`) parsées depuis le log AWS REPORT : `duration`, `billed_duration`, `max_memory_used`, `timeouts`, `out_of_memory` et `estimated_cost`

Pour en savoir plus sur l'envoi de logs de services AWS avec le Forwarder Datadog, consultez le guide [Envoyer des logs de services AWS avec la fonction Lambda Datadog](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Installation

Datadog vous conseille d'utiliser [CloudFormation](#cloudformation) pour installer automatiquement le Forwarder. Vous pouvez également effectuer l'installation avec [Terraform](#terraform) ou [manuellement](#installation-manuelle).

Une fois installé, vous pouvez abonner le Forwarder à des sources de logs, tels que des compartiments S3 ou des groupes de logs CloudWatch, en suivant ces [instructions](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#configurer-des-declencheurs).

<!-- xxx tabs xxx -->
<!-- xxx tab "CloudFormation" xxx -->

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Connectez-vous à votre compte ou rôle administrateur AWS et déployez la stack CloudFormation en cliquant sur le bouton ci-dessus.
2. Renseignez le paramètre `DdApiKey` et sélectionnez le `DdSite` adéquat. Tous les autres paramètres sont facultatifs.
3. Cliquez sur **Create stack** et attendez que la création soit terminée.
4. La fonction Lambda du Forwarder installée se trouve sous l'onglet « Resources » de la stack avec l'ID logique `Forwarder`.
5. [Configurez des déclencheurs sur le Forwarder installé](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#configurer-des-declencheurs).
6. Répétez les étapes précédents dans une autre région si vous opérez dans plusieurs régions AWS.

**Remarque :** si vous aviez déjà activé votre intégration AWS à l'aide du [modèle CloudFormation suivant](https://github.com/DataDog/cloudformation-template/tree/master/aws) depuis la page de l'intégration AWS dans Datadog, votre compte devrait déjà bénéficier d'une fonction Forwarder Lambda Datadog.  
**Remarque :** le bloc de code de la fonction Lambda du Forwarder Datadog est vide, la logique étant implémentée via une couche Lambda.

<!-- xxz tab xxx -->
<!-- xxx tab "Terraform" xxx -->

### Terraform

Installez le Forwarder en utilisant la ressource Terraform [aws_cloudformation_stack](https://www.terraform.io/docs/providers/aws/r/cloudformation_stack) comme wrapper du modèle CloudFormation fourni.

Datadog vous conseille de créer deux configurations Terraform distinctes :

- Utilisez la première pour stocker la [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys) dans AWS Secrets Manager, et récupérez l'ARN du secret depuis la sortie générée.
- Ensuite, créez une autre configuration pour le Forwarder et spécifiez l'ARN des secrets via le paramètre `DdApiKeySecretArn`.

En séparant les configurations de la clé d'API et du Forwarder, vous n'aurez pas à spécifier la clé d'API Datadog lorsque vous mettez à jour le Forwarder.

Pour les futures mises à jour ou mises à niveau du Forwarder, vous devrez à nouveau appliquer la configuration du Forwarder.

#### Exemple de configuration

```tf
# Stocker la clé d'API Datadog dans AWS Secrets Manager
variable "dd_api_key" {
  type        = string
  description = "Datadog API key"
}

resource "aws_secretsmanager_secret" "dd_api_key" {
  name        = "datadog_api_key"
  description = "Encrypted Datadog API Key"
}

resource "aws_secretsmanager_secret_version" "dd_api_key" {
  secret_id     = aws_secretsmanager_secret.dd_api_key.id
  secret_string = var.dd_api_key
}

output "dd_api_key" {
  value = aws_secretsmanager_secret.dd_api_key.arn
}
```

```tf
# Forwarder Datadog pour envoyer les logs depuis S3 et CloudWatch, ainsi que les données d'observabilité issues des fonctions Lambda à Datadog.
# https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring
resource "aws_cloudformation_stack" "datadog_forwarder" {
  name         = "datadog-forwarder"
  capabilities = ["CAPABILITY_IAM", "CAPABILITY_NAMED_IAM", "CAPABILITY_AUTO_EXPAND"]
  parameters   = {
    DdApiKeySecretArn  = "REMPLACER PAR L'ARN DU SECRET",
    DdSite             = "{{< region-param key="dd_site" code="true" >}}",
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

<!-- xxz tab xxx -->
<!-- xxx tab "Méthode manuelle" xxx -->

### Méthode manuelle

Si vous ne parvenez pas à installer le Forwarder à l'aide du modèle CloudFormation fourni, vous pouvez l'installer manuellement en suivant les étapes ci-dessous. N'hésitez pas à ouvrir un ticket ou à effectuer une pull request si vous pensez que nous pouvons vous aider à faire fonctionner le modèle dans votre environnement.

1. Créez une fonction Lambda en Python 3.8 avec `aws-dd-forwarder-<VERSION>.zip`. Les dernières versions sont disponibles [ici](https://github.com/DataDog/datadog-serverless-functions/releases).
2. Enregistrez votre [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys) dans AWS Secrets Manager, définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` avec l'ARN du secret sur la fonction Lambda, puis ajoutez l'autorisation `secretsmanager:GetSecretValue` au rôle d'exécution de la fonction Lambda.
3. Si vous souhaitez transmettre des logs depuis des compartiments S3, ajoutez l'autorisation `s3:GetObject` au rôle d'exécution de la fonction Lambda.
4. Définissez la variable d'environnement `DD_ENHANCED_METRICS` sur `false` pour le Forwarder. De cette façon, le Forwarder ne génèrera pas de métriques optimisées mais transmettra quand même les métriques custom des autres fonctions Lambda.
5. Certains comptes AWS sont configurés de sorte que les déclencheurs n'entraîneront pas la création automatique de stratégies basées sur les ressources, qui permettent aux groupes de logs CloudWatch d'invoquer le Forwarder.
   Consultez la documentation [CloudWatchLogPermissions](https://github.com/DataDog/datadog-serverless-functions/blob/029bd46e5c6d4e8b1ae647ed3b4d1917ac3cd793/aws/logs_monitoring/template.yaml#L680) pour connaître les autorisations requises pour que le Forwarder soit invoqué par les événements de log CloudWatch.

6. Configurez des [déclencheurs](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#configurer-des-declencheurs).
7. Créez un compartiment S3 et définissez la variable d'environnement `DD_S3_BUCKET_NAME` sur le nom du compartiment. Accordez également les autorisations `s3:GetObject`, `s3:PutObject` et `s3:DeleteObject` au rôle d'exécution de la fonction Lambda pour ce compartiment. Ce compartiment est utilisé pour stocker le cache des tags Lambda.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### Installer une nouvelle version

1. Localisez la stack CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder). Si vous avez installé le Forwarder avec la [stack d'intégration Datadog/AWS](https://github.com/Datadog/cloudformation-template/tree/master/aws), veillez à mettre à jour la stack du Forwarder imbriquée au lieu de la stack racine.
2. Localisez la fonction Lambda du Forwarder dans l'onglet « Resources » de la stack CloudFormation, puis accédez à sa page de configuration. Notez la valeur du tag `dd_forwarder_version`, par exemple `3.3.0`, pour être en mesure de revenir à cette version en cas de problème avec la nouvelle.
3. Mettez à jour la stack à l'aide du modèle `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml`. Vous pouvez remplacer `latest` par une version spécifique, telle que `3.0.2.yaml`, si vous le souhaitez. Veillez à passer en revue les changesets avant d'appliquer la mise à jour.

### Installer le Forwarder +3.49.0 depuis une version plus ancienne

Depuis la version 3.49.0, la fonction Lambda impose désormais l'utilisation de **Python 3.8**. Si vous installez le Forwarder 3.49.0+ depuis une version plus ancienne, assurez-vous que la fonction Lambda AWS est configurée pour utiliser Python 3.8.

### Installer le Forwarder +3.0.0 depuis une version plus ancienne

Depuis la version 3.0.0, la fonction Lambda du Forwarder est gérée par CloudFormation. Pour passer d'une ancienne installation à la version 3.0.0 ou une version ultérieure, suivez les étapes ci-dessous.

1. Installez un nouveau Forwarder en suivant les instructions d'[installation](#installation).
2. La fonction Lambda du Forwarder installée se trouve sous l'onglet « Resources » de la stack avec l'ID logique `Forwarder`.
3. Migrez manuellement quelques déclencheurs (filtre d'abonnement aux groupes de logs CloudWatch et notification en cas d'événement de compartiment S3) de l'ancien Forwarder vers le nouveau.
4. Assurez-vous que le nouveau Forwarder fonctionne comme prévue, c'est-à-dire qu'il est régulièrement invoqué et sans erreurs.
5. Vérifiez que les logs des déclencheurs (sources) migrés s'affichent dans le Log Explorer de Datadog et semblent corrects.
6. Migrez tous les déclencheurs vers le nouveau Forwarder.
   - Si Datadog gérait les déclencheurs [automatiquement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-automatiquement), mettez à jour l'ARN de la fonction Lambda du Forwarder depuis l'onglet **Log Collection** de la page de l'intégration AWS.
   - Si les déclencheurs étaient gérés [manuellement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-manuellement), vous devrez les migrer manuellement (ou avec un script).
7. Assurez-vous que le nombre d'invocations de l'ancienne fonction Lambda du Forwarder passe à zéro.
8. Supprimez l'ancienne fonction Lambda du Forwarder lorsque tout vous semble correct.
9. Si vous avez d'anciennes fonctions Lambda de Forwarder installées dans plusieurs comptes et régions AWS, répétez les étapes ci-dessus pour chaque combinaison de compte et de région.

### Supprimer

Pour supprimer sans risque le Forwarder et d'autres ressources AWS créées par la stack CloudFormation du Forwarder, suivez les étapes ci-dessous.

1. Localisez la stack CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder). Vous pouvez également la retrouver à l'aide de la console de gestion de la fonction Lambda : cliquez sur le lien inclus dans le message « This function belongs to an application. Click here to manage it. », puis accédez à l'onglet « Deployments » sur la page de l'application.
2. Supprimez la stack CloudFormation.

### Modifier les paramètres du Forwarder

1. Localisez la stack CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder).
2. Mettez à jour la stack à l'aide du modèle actuel.
3. Modifiez les valeurs des paramètres.

**Remarque :** Datadog vous conseille de définir les paramètres de votre Forwarder via CloudFormation, au lieu de modifier directement la fonction Lambda. Vous trouverez une description des paramètres dans le fichier [template.yaml](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml) et dans l'interface de création de stack CloudFormation lorsque vous lancez la stack. N'hésitez pas à effectuer une pull request pour permettre la modification d'autres paramètres à l'aide du modèle.

## Dépannage

N'oubliez pas de vérifier si votre problème n'a pas déjà été corrigé dans les [nouvelles versions](https://github.com/DataDog/datadog-serverless-functions/releases).

Définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` au niveau de la fonction Lambda du Forwarder pour activer temporairement la journalisation détaillée (n'oubliez pas de la désactiver ultérieurement). Les logs de debugging devraient vous indiquer la charge utile d'événement précise que la fonction Lambda reçoit, ainsi que la charge utile des données (log, métrique ou trace) qui est envoyée à Datadog.

Vous pouvez également configurer une journalisation supplémentaire ou ajouter du code afin d'étudier plus précisément le problème. Pour obtenir des instructions afin d'intégrer des changements locaux dans le code du Forwarder, consultez la section [Contributions](#contributions).

Si votre problème persiste, créez un ticket auprès de l'[assistance Datadog](https://www.datadoghq.com/support/) en fournissant une copie des logs de debugging.

## Contributions

Nous apprécions grandement les pull requests. Voici quelques conseils à ce sujet.

1. Si vous souhaitez échanger sur une fonctionnalité ou sur une correction de bug avant son implémentation, rendez-vous sur le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).
1. Pour effectuer un fork, dupliquer une branche ou en créer une :
   ```bash
   git clone git@github.com:<your-username>/datadog-serverless-functions.git
   git checkout -b <my-branch>
   ```
1. Modifiez le code.
1. Intégrez vos changements locaux :
   ```bash
   cd aws/logs_monitoring
   ./tools/build_bundle.sh <SEMANTIC_VERSION> # any unique version is fine
   ```
1. Mettez à jour votre Forwarder de test en ajoutant le code modifié, puis effectuez des tests :
   ```bash
   # Upload in the AWS Lambda console if you don't have AWS CLI
   aws lambda update-function-code \
       --region <AWS_REGION>
       --function-name <FORWARDER_NAME> \
       --zip-file fileb://.forwarder/aws-dd-forwarder-<SEMANTIC_VERSION>.zip
   ```
1. Exécutez les tests d'unité :
   ```
   python -m unittest discover . # for code in Python
   ./trace_forwarder/scripts/run_tests.sh # for code in Go
   ```
1. Exécutez les tests d'intégration :

   ```bash
   ./tools/integration_tests/integration_tests.sh

   # to update the snapshots if changes are expected
   ./tools/integration_tests/integration_tests.sh --update
   ```

1. Si vos changements ont une incidence sur le modèle CloudFormation, exécutez le test d'installation en fonction de votre propre compte AWS :
   ```bash
   ./tools/installation_test.sh
   ```
1. Effectuez un push vers votre fork et [envoyez une pull request][https://github.com/nom-utilisateur/datadog-serverless-functions/compare/datadog:master...master].

## Réglages avancés

### Envoyer des logs à plusieurs destinations

Si vous devez envoyer des logs à plusieurs organisations Datadog ou à d'autres destinations, configurez le paramètre CloudFormation `AdditionalTargetLambdaARNs` afin que le Forwarder Datadog puisse copier les logs entrants dans les fonctions Lambda spécifiées. Ces dernières seront appelées de façon asynchrone avec le même `event` que celui reçu par le Forwarder Datadog.

### Prise en charge d'AWS PrivateLink

Vous pouvez exécuter le Forwarder dans un sous-réseau privé de VPC et envoyer les données à Datadog via AWS PrivateLink. Notez qu'AWS PrivateLink peut uniquement être configuré avec les [sites Datadog](https://docs.datadoghq.com/getting_started/site/) hébergés sur AWS (c'est-à-dire datadoghq.com et non datadoghq.eu).

1. Suivez les [instructions](https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#creer-l-endpoint-de-votre-vpc) pour ajouter les endpoints `api`, `http-logs.intake` et `trace.agent` Datadog à votre VPC.
2. Suivez les [instructions](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint) pour ajouter les endpoints AWS Secrets Manager et S3 à votre VPC.
3. Lorsque vous installez le Forwarder avec le modèle CloudFormation :
   1. Définissez `UseVPC` sur `true`
   2. Définissez `VPCSecurityGroupIds` et `VPCSubnetIds` en fonction des paramètres de votre VPC
   3. Définissez `DdFetchLambdaTags` sur `false`, car l'API de tagging de groupes de ressources AWS ne prend pas en charge PrivateLink

#### DdUsePrivateLink est obsolète

L'option `DdUsePrivateLink` a été rendue obsolète à partir de la [v3.41.0](https://github.com/DataDog/datadog-serverless-functions/releases/tag/aws-dd-forwarder-3.41.0). Cette option était auparavant utilisée pour demander au Forwarder d'utiliser un ensemble spécial d'endpoints PrivateLink pour l'admission des données, à savoir `pvtlink.api.datadoghq.com`, `api-pvtlink.logs.datadoghq.com` et `trace-pvtlink.agent.datadoghq.com`. À partir de la v3.41.0, le Forwarder peut envoyer les données à Datadog via PrivateLink en utilisant les noms DNS normaux des endpoints d'admission, à savoir `api.datadoghq.com`, `http-intake.logs.datadoghq.com` et `trace.agent.datadoghq.com`. L'option `DdUsePrivateLink` n'est donc plus nécessaire.

Si vous avez un ancien déploiement du Forwarder avec l'option `DdUsePrivateLink` définie sur `true`, vos endpoints PrivateLink configurés risquent par conséquent de ne pas correspondre à [ceux documentés dans Datadog](https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#creer-l-endpoint-de-votre-vpc). Bien que les anciens endpoints PrivateLink aient été supprimés de la documentation, ils restent fonctionnels. Aucune modification n'est nécessaire si vous mettez à jour votre Forwarder : l'option `DdUsePrivateLink` peut rester activée, et vous pouvez continuer à utiliser les anciens endpoints. Si vous souhaitez toutefois passer aux nouveaux endpoints, assurez-vous de suivre les instructions mises à jour ci-dessus pour

1. configurer les nouveaux endpoints `api.datadoghq.com`, `http-intake.logs.datadoghq.com` et `trace.agent.datadoghq.com`.
2. Définissez `DdUseVPC` sur `true`
3. Définissez `DdUsePrivateLink` sur `false`

### VPC AWS et prise en charge des proxies

Si vous devez déployer le Forwarder sur un VPC sans accès direct à l'Internet public et que vous ne pouvez pas utiliser AWS PrivateLink pour vous connecter à Datadog (par exemple, si votre organisation est hébergée sur le site européen de Datadog, datadoghq.eu), vous pouvez faire passer vos données par un proxy.

1. Sauf si le Forwarder est déployé sur un sous-réseau public, suivez [ces instructions](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint) pour ajouter des endpoints pour Secrets Manager et S3 au VPC et ainsi permettre au Forwarder d'accéder à ces services.
2. Mettez à jour votre proxy en appliquant les configurations suivantes ([HAProxy](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt) ou [Nginx](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt)). Si vous utilisez un autre proxy ou un proxy Web, mettez le domaine Datadog (p. ex. .datadoghq.com) sur liste blanche.
3. Si vous utilisez le modèle CloudFormation pour installer le Forwarder, définissez `DdUseVPC`, `VPCSecurityGroupIds` et `VPCSubnetIds`.
4. Assurez-vous que l'option `DdFetchLambdaTags` est désactivée, car AWS VPC ne propose pas encore d'endpoint pour l'API de tagging de groupes de ressources.
5.

- Si vous utilisez HAProxy ou Nginx

  - Définissez `DdApiUrl` sur `http://<host_proxy>:3834` ou `https://<host_proxy>:3834`.
  - Définissez `DdTraceIntakeUrl` sur `http://<host_proxy>:3835` ou `https://<host_proxy>:3835`.
  - Définissez `DdUrl` sur `<host_proxy>` et `DdPort` sur `3837`.

- Si vous utilisez un proxy Web

  - Définissez `DdHttpProxyURL` sur l'endpoint de votre proxy, par exemple `http://<host_proxy>:<port>` ou, si votre proxy nécessite un identifiant et un mot de passe, `http://<identifiant>:<motdepasse>@<host_proxy>:<port>`

7. Définissez `DdNoSsl` sur `true` si vous vous connectez au proxy via `http`.
8. Définissez `DdSkipSslValidation` sur `true` si vous vous connectez au proxy via `https` avec un certificat auto-signé.

### Signature du code

Le Forwarder Datadog est signé par Datadog. Si vous souhaitez vérifier l'intégrité du Forwarder, utilisez la méthode d'installation manuelle. [Créez une configuration de signature de code](https://docs.aws.amazon.com/lambda/latest/dg/configuration-codesigning.html#config-codesigning-config-console) qui inclut l'ARN du profil de signature de Datadog (`arn:aws:signer:us-east-1:464622532012:/signing-profiles/DatadogLambdaSigningProfile/9vMI9ZAGLc`) et associez-la à la fonction Lambda du Forwarder avant d'importer le fichier .zip du Forwarder.

## Paramètres CloudFormation

### Obligatoire

`DdApiKey`
: Votre [clé d'API Datadog](https://app.datadoghq.com/organization-settings/api-keys). Cette-ci peut être récupérée dans Datadog, via Organization Settings > API Keys. La clé d'API est stockée dans AWS Secrets Manager. Si vous stockez déjà une clé d'API Datadog dans Secrets Manager, utilisez plutôt le paramètre `DdApiKeySecretArn`.

`DdApiKeySecretArn`
: L'ARN du secret stockant la clé d'API Datadog, si l'ARN est déjà stocké dans Secrets Manager. Vous devez stocker le secret en texte brut, plutôt que sous la forme d'une paire key/value.

`DdSite`
: le site Datadog vers lequel envoyer vos métriques et logs. Valeurs acceptées : `datadoghq.com`, `datadoghq.eu`, `us3.datadoghq.com`, `us5.datadoghq.com` et `ddog-gov.com`.

### Fonction Lambda (facultatif)

`FunctionName`
: Le nom de la fonction Lambda du Forwarder Datadog. Veillez à ne pas le modifier lorsque vous mettez à jour une stack CloudFormation existante, sous peine de remplacer la fonction du Forwarder existante et de perdre tous vos déclencheurs.

`MemorySize`
: La quantité de mémoire allouée à la fonction Lambda du Forwarder Datadog.

`Timeout`
: Le délai d'expiration de la fonction Lambda du Forwarder Datadog.

`ReservedConcurrency`
: La simultanéité réservée pour la fonction Lambda du Forwarder Datadog. Si ce paramètre est vide, aucune simultanéité réservée ne sera appliquée à la fonction.

`LogRetentionInDays`
: La durée de rétention des logs CloudWatch générés par la fonction Lambda du Forwarder Datadog.

### Transmission de logs (facultatif)

`DdTags`
: Ajoute des tags personnalisés aux logs transmis. Ces tags doivent être séparés par des virgules dans une chaîne, sans virgule finale. Exemple : `env:prod,stack:classic`.

`DdMultilineLogRegexPattern`
: Utilise l'expression régulière spécifiée pour détecter une nouvelle ligne de log dans les logs multiligne provenant de S3. Exemple : l'expression `\d{2}\/\d{2}\/\d{4}` détecte les logs multiligne qui commencent par le pattern « 11/10/2014 ».

`DdUseTcp`
: Par défaut, le Forwarder envoie les logs via HTTPS sur le port 443. Pour envoyer les logs via une connexion TCP avec chiffrement SSL, définir ce paramètre sur true.

`DdNoSsl`
: Désactive le SSL lors de la transmission de logs. Définir sur true lorsque les logs doivent passer par un proxy.

`DdUrl`
: L'URL de l'endpoint vers lequel transmettre les logs. Utile lorsque les logs doivent passer par un proxy.

`DdPort`
: Le port de l'endpoint vers lequel transmettre les logs. Utile lorsque les logs doivent passer par un proxy.

`DdSkipSslValidation`
: Envoie les logs via HTTPS, mais sans valider le certificat fourni par l'endpoint. Le trafic entre le Forwarder et l'endpoint d'admission des logs sera toujours chiffré, mais la validité du certificat SSL de destination ne sera pas vérifiée.

`DdUseCompression`
: Définir sur false pour désactiver la compression des logs. Valide uniquement en cas d'envoi des logs via HTTP.

`DdCompressionLevel`
: Définit le niveau de compression entre 0 (aucune compression) et 9 (compression la plus élevée). Le niveau de compression par défaut est de 6. Un niveau de compression plus élevé peut permettre de réduire la quantité de trafic réseau sortant, mais le temps d'exécution du Forwarder sera plus élevé.

`DdForwardLog`
: Définir sur false pour désactiver la transmission des logs, mais continuer à transmettre d'autres données d'observabilité, telles que les métriques et les traces des fonctions Lambda.

`DdFetchLambdaTags`
: Permet au Forwarder de récupérer les tags Lambda à l'aide d'appels d'API GetResources et de les appliquer aux logs, aux métriques et aux traces. Si vous définissez ce paramètre sur true, l'autorisation `tag:GetResources` sera automatiquement ajoutée au rôle IAM d'exécution de la fonction Lambda.

`DdFetchLogGroupTags`
: Permet au Forwarder de récupérer les tags d'un groupe de logs via ListTagsLogGroup et de les appliquer à des logs, des métriques et des traces. Si ce paramètre est défini sur true, l'autorisation `logs:ListTagsLogGroup` sera automatiquement ajoutée au rôle IAM d'exécution de la fonction Lambda.

### Nettoyage des logs (facultatif)

`RedactIp`
: Remplace le texte correspondant à `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` par `xxx.xxx.xxx.xxx`.

`RedactEmail`
: Remplace le texte correspondant à `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` par `xxxxx@xxxxx.com`.

`DdScrubbingRule`
: Remplace le texte correspondant à l'expression régulière spécifiée par `xxxxx` (par défaut) ou par `DdScrubbingRuleReplacement` (si ce paramètre est spécifié). La règle de nettoyage des logs est appliquée à l'intégralité du log au format JSON, y compris aux métadonnées ajoutées automatiquement par la fonction Lambda. Chaque pattern correspondant est remplacé jusqu'à ce qu'aucune correspondance ne soit trouvée dans chaque log. Remarque : l'utilisation d'une expression régulière inefficace, comme `.*`, peut ralentir la fonction Lambda.

`DdScrubbingRuleReplacement`
: Remplace le texte correspondant au paramètre DdScrubbingRule par le texte spécifié.

### Filtrage des logs (facultatif)

`ExcludeAtMatch`
: N'envoie pas les logs correspondant à l'expression régulière spécifiée. Si un log correspond à la fois à ExcludeAtMatch et à IncludeAtMatch, celui-ci est exclu.

`IncludeAtMatch`
: Envoie uniquement les logs correspondant à l'expression régulière spécifiée et qui ne sont pas exclus par `ExcludeAtMatch`.

Les règles de filtrage sont appliquées à l'intégralité du log au format JSON, y compris aux métadonnées automatiquement ajoutées par le Forwarder. Toutefois, il n'est pas possible d'utiliser les transformations effectuées par les [pipelines de logs](https://docs.datadoghq.com/logs/processing/pipelines/) après l'envoi des logs à Datadog pour filtrer les logs dans le Forwarder. L'utilisation d'une expression régulière inefficace, comme `.*`, peut ralentir le Forwarder.

Voici des exemples d'expressions régulières pouvant être utilisées pour filtrer les logs :

- Inclure (ou exclure) les logs de la plateforme Lambda : `"(START|END) RequestId:\s`. Remarque : le caractère `"` initial est requis pour inclure le début du message de log, qui est dans un blob JSON (`{"message": "START RequestId...."}`). Datadog vous conseille de conserver les logs `REPORT`, car ils sont utilisés pour renseigner la liste des invocations dans les vues des fonctions sans serveur. 
- Pour inclure uniquement les messages d'erreur CloudTrail : `errorMessage`
- Pour inclure uniquement les logs contenant un code d'erreur HTTP 4XX ou 5XX : `\b[4|5][0-9][0-9]\b`
- Pour inclure uniquement les logs CloudWatch pour lesquels le champ `message` contient une paire key/value au format JSON spécifique : `\\"awsRegion\\":\\"us-east-1\\"`
  - Le champ de message d'un événement de log CloudWatch est encodé en tant que chaîne. Ainsi, `{"awsRegion": "us-east-1"}` est encodé en tant que `{\"awsRegion\":\"us-east-1\"}`.
    L'expression que vous indiquez doit donc inclure des caractères d'échappement (`\`) supplémentaires.

Pour tester différentes expressions sur vos logs, activez les [logs de debugging](#depannage).

### Paramètres avancés (facultatif)

`SourceZipUrl`
:  Modifier uniquement ce paramètre si vous êtes certain de ce que vous faites. Permet de remplacer l'emplacement par défaut du code source de la fonction.

`PermissionBoundaryArn`
: L'ARN de la stratégie utilisée pour définir les limites d'autorisations.

`DdUsePrivateLink` (OBSOLÈTE)
: Définir sur true pour activer l'envoi des logs et des métriques via AWS PrivateLink. Voir le site https://dtdg.co/private-link.

`DdHttpProxyURL`
: Définit les variables d'environnement de proxy Web standard, HTTP_PROXY et HTTPS_PROXY. Il s'agit des endpoints d'URL exposés par votre serveur proxy. N'utilisez pas ce paramètre avec AWS Private Link. Assurez-vous également de définir DdSkipSslValidation sur true.

`DdNoProxy`
: Définit la variable d'environnement de proxy Web standard NO_PROXY. Correspond à une liste des noms de domaine à exclure du proxy Web, séparés par des virgules.

`VPCSecurityGroupIds`
: Liste des identifiants des groupes de sécurité du VPC, séparés par des virgules. À utiliser lorsque AWS PrivateLink est activé.

`VPCSubnetIds`
: Liste des identifiants des sous-réseaux du VPC, séparés par des virgules. À utiliser lorsque AWS PrivateLink est activé.

`AdditionalTargetLambdaARNs`
: Liste des ARN de Lambda qui seront appelés de façon asynchrone avec le même `event` que celui reçu par le Forwarder Datadog. Les ARN doivent être séparés par des virgules.

`InstallAsLayer`
: Indique si le flux d'installation en tant que couche doit être utilisé ou non. Définissez ce paramètre sur false pour utiliser notre flux d'installation traditionnel, qui installe une deuxième fonction chargée de copier le code du Forwarder de GitHub vers un compartiment S3. Valeur par défaut : true.

`LayerARN`
: ARN de la couche contenant le code du Forwarder. Si ce paramètre est vide, le script utilise la version de la couche avec laquelle le Forwarder a été publié. Valeur par défaut : vide.

## Autorisations

Pour déployer la stack CloudFormation avec les options par défaut, vous devez disposer des autorisations ci-dessous afin d'être en mesure d'enregistrer votre clé d'API Datadog en tant que secret, de créer un compartiment S3 pour stocker le code du Forwarder (fichier zip), et de créer des fonctions Lambda (y compris des rôles d'exécution et des groupes de logs).

**Déclarations IAM** :

```json
{
  "Effect": "Allow",
  "Action": [
    "cloudformation:*",
    "secretsmanager:CreateSecret",
    "secretsmanager:TagResource",
    "s3:CreateBucket",
    "s3:GetObject",
    "s3:PutEncryptionConfiguration",
    "s3:PutBucketPublicAccessBlock",
    "iam:CreateRole",
    "iam:GetRole",
    "iam:PassRole",
    "iam:PutRolePolicy",
    "iam:AttachRolePolicy",
    "lambda:CreateFunction",
    "lambda:GetFunction",
    "lambda:GetFunctionConfiguration",
    "lambda:GetLayerVersion",
    "lambda:InvokeFunction",
    "lambda:PutFunctionConcurrency",
    "lambda:AddPermission",
    "lambda:TagResource",
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

Les capacités suivantes sont requises lorsque vous créez une stack CloudFormation :

- CAPABILITY_AUTO_EXPAND, car le modèle du Forwarder utilise des macros (notamment la macro [AWS SAM](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html)).
- CAPABILTY_IAM/NAMED_IAM, car le Forwarder crée des rôles IAM.

La stack CloudFormation crée les rôles IAM suivants :

- ForwarderRole : le rôle d'exécution utilisé par la fonction Lambda du Forwarder pour lire les logs depuis S3, récupérer votre clé d'API Datadog depuis Secrets Manager, et écrire ses propres logs.

**Déclarations IAM** :

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::*",
    "Effect": "Allow"
  },
  {
    "Action": ["secretsmanager:GetSecretValue"],
    "Resource": "<ARN de DdApiKeySecret>",
    "Effect": "Allow"
  }
]
```

- `ForwarderZipCopierRole` : le rôle d'exécution utilisé par la fonction Lambda ForwarderZipCopier pour télécharger le fichier zip de déploiement du Forwarder dans un compartiment S3.

**Déclarations IAM** :

```json
[
  {
    "Effect": "Allow",
    "Action": [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ],
    "Resource": "*"
  },
  {
    "Action": ["s3:PutObject", "s3:DeleteObject"],
    "Resource": "<Compartiment S3 dans lequel stocker le zip du Forwarder>",
    "Effect": "Allow"
  },
  {
    "Action": ["s3:ListBucket"],
    "Resource": "<Compartiment S3 dans lequel stocker le zip du Forwarder>",
    "Effect": "Allow"
  }
]
```