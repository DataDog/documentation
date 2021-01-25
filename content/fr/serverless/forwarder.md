---
aliases:
  - /fr/serverless/troubleshooting/installing_the_forwarder/
dependencies:
  - 'https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/README.md'
kind: documentation
title: Forwarder Datadog
---
Le Forwarder Datadog est une fonction AWS Lambda qui envoie des logs, des métriques custom et des traces depuis votre environnement à Datadog. Le Forwarder peut :

- Transmettre les logs CloudWatch, ELB, S3, CloudTrail, VPC, SNS et CloudFront à Datadog
- Transmettre les événements S3 à Datadog
- Transmettre les événements des flux de données Kinesis à Datadog (seuls les logs CloudWatch sont pris en charge)
- Transmettre les métriques custom de fonctions AWS Lambda à l'aide des logs CloudWatch
- Transmettre les traces de fonctions AWS Lambda à l'aide des logs CloudWatch
- Générer et envoyer des métriques Lambda optimisées (`aws.lambda.enhanced.*`) parsées depuis le log AWS REPORT : duration, billed_duration, max_memory_used, timeouts, out_of_memory et estimated_cost

Pour en savoir plus sur l'envoi de logs de services AWS avec le Forwarder Datadog, consultez [cette page](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/).

## Installation

Datadog vous conseille d'utiliser [CloudFormation](#cloudformation) pour installer automatiquement le Forwarder. Vous pouvez également effectuer l'installation avec [Terraform](#terraform) ou [manuellement](#installation-manuelle).

Une fois installé, vous pouvez abonner le Forwarder à des sources de logs, tels que des compartiments S3 ou des groupes de logs CloudWatch, en suivant ces [instructions](https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#configurer-des-declencheurs).

<!-- xxx tabs xxx -->
<!-- xxx tab "Cloud Formation" xxx -->

### CloudFormation

[![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?stackName=datadog-forwarder&templateURL=https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml)

1. Connectez-vous à votre compte/rôle administrateur AWS et déployez la pile CloudFormation en cliquant sur le bouton ci-dessus.
2. Renseignez le paramètre `DdApiKey` et sélectionnez le `DdSite` adéquat. Tous les autres paramètres sont facultatifs.
3. Cliquez sur **Create stack** et attendez que la création soit terminée.
4. La fonction Lambda du Forwarder installée se trouve sous l'onglet « Resources » de la pile avec l'ID logique `Forwarder`.
5. Définissez des déclencheurs sur le Forwarder installé. Vous pouvez le faire [automatiquement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-automatiquement) ou [manuellement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-manuellement).
6. Répétez les étapes précédents dans une autre région si vous opérez dans plusieurs régions AWS.

<!-- xxz tab xxx -->
<!-- xxx tab "Terraform" xxx -->

### Terraform

Installez le Forwarder en utilisant la ressource Terraform [aws_cloudformation_stack](https://www.terraform.io/docs/providers/aws/r/cloudformation_stack.html) comme wrapper du modèle CloudFormation fourni.

Datadog vous conseille de créer deux configurations Terraform distinctes :

- Utilisez la première pour stocker la clé d'API Datadog dans AWS Secrets Manager, et récupérez l'ARN du secret depuis la sortie générée.
- Ensuite, créez une autre configuration pour le Forwarder et spécifiez l'ARN des secrets via le paramètre `DdApiKeySecretArn`.

En séparant les configurations de la clé d'API et du Forwarder, vous n'aurez pas à spécifier la clé d'API Datadog lorsque vous mettez à jour le Forwarder.

**Remarque :** le modèle CloudFormation exige de spécifier le paramètre `DdApiKey`, vous devez donc définir une valeur fictive (n'importe laquelle) pour appliquer votre configuration. Pour mettre à jour ou mettre à niveau le Forwarder ultérieurement, appliquez la configuration du Forwarder à nouveau.

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
    DdApiKey           = "this_value_is_not_used"
    DdApiKeySecretArn  = "REMPLACER PAR L'ARN DU SECRET"
    FunctionName       = "datadog-forwarder"
  }
  template_url = "https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml"
}
```

<!-- xxz tab xxx -->
<!-- xxx tab "Méthode manuelle" xxx -->

### Méthode manuelle

Si vous ne parvenez pas à installer le Forwarder à l'aide du modèle CloudFormation fourni, vous pouvez l'installer manuellement en suivant les étapes ci-dessous. N'hésitez pas à ouvrir un ticket ou à effectuer une pull request si vous pensez que nous pouvons vous aider à faire fonctionner le modèle dans votre environnement.

1. Créez une fonction Lambda en Python 3.7 avec `aws-dd-forwarder-<VERSION>.zip`. Les dernières versions sont disponibles [ici](https://github.com/DataDog/datadog-serverless-functions/releases).
2. Enregistrez votre clé d'API Datadog dans AWS Secrets Manager, définissez la variable d'environnement `DD_API_KEY_SECRET_ARN` avec l'ARN du secret sur la fonction Lambda, puis ajoutez l'autorisation `secretsmanager:GetSecretValue` au rôle d'exécution de la fonction Lambda.
3. Si vous souhaitez transmettre des logs depuis des compartiments S3, ajoutez l'autorisation `s3:GetObject` au rôle d'exécution de la fonction Lambda.
4. Définissez la variable d'environnement `DD_ENHANCED_METRICS` sur `false` pour le Forwarder. De cette façon, le Forwarder ne génèrera pas de métriques optimisées mais transmettra quand même les métriques custom des autres fonctions Lambda.
5. Configurez des [déclencheurs](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#envoyer-des-logs-de-service-aws-a-datadog).
6. Créez un compartiment S3 et définissez la variable d'environnement `DD_S3_BUCKET_NAME` sur le nom du compartiment. Accordez également les autorisations `s3:GetObject`, `s3:PutObject` et `s3:DeleteObject` au rôle d'exécution de la fonction Lambda pour ce compartiment. Ce compartiment est utilisé pour stocker le cache des tags Lambda.

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

## Envoyer des logs à d'autres fonctions Lambda

Vous pouvez envoyer des logs à d'autres fonctions Lambda à l'aide du paramètre CloudFormation `AdditionalTargetLambdaARNs`. Ces fonctions Lambda supplémentaires seront appelées de façon asynchrone avec le même `event` que celui reçu par le Forwarder Datadog.

## Prise en charge d'AWS PrivateLink

Vous pouvez exécuter le Forwarder dans un VPC en utilisant AWS PrivateLink pour vous connecter à Datadog. Notez qu'AWS PrivateLink ne peut être configuré que si votre organisation Datadog utilise le site américain de Datadog (c'est-à-dire datadoghq.com et non datadoghq.eu).

1. Suivez les [instructions de configuration](https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#creer-l-endpoint-de-votre-vpc) pour ajouter un endpoint à votre VPC pour le service **API** de Datadog.
2. Suivez la [même procédure](https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#creer-l-endpoint-de-votre-vpc) pour ajouter un second endpoint à votre VPC pour le service **Logs** de Datadog.
3. Suivez encore une fois la [même procédure](https://docs.datadoghq.com/agent/guide/private-link/?tab=logs#creer-l-endpoint-de-votre-vpc) pour ajouter un troisième endpoint à votre VPC pour le service **Traces** de Datadog.
4. Sauf si le Forwarder est déployé sur un sous-réseau public, suivez [ces instructions](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint) pour ajouter des endpoints pour Secrets Manager et S3 au VPC et ainsi permettre au Forwarder d'accéder à ces services.
5. Si vous utilisez le modèle CloudFormation pour installer le Forwarder, définissez `DdUsePrivateLink`, `VPCSecurityGroupIds` et `VPCSubnetIds`.
6. Assurez-vous que l'option `DdFetchLambdaTags` est désactivée, car AWS VPC ne propose pas encore d'endpoint pour l'API de tagging de groupes de ressources.

## AWS VPC et prise en charge des proxies

Si vous devez déployer le Forwarder sur un VPC sans accès direct à l'Internet public et que vous ne pouvez pas utiliser AWS PrivateLink pour vous connecter à Datadog (par exemple, si votre organisation est hébergée sur le site européen de Datadog, datadoghq.eu), vous pouvez faire passer vos données par un proxy.

1. Sauf si le Forwarder est déployé sur un sous-réseau public, suivez [ces instructions](https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html#create-interface-endpoint) pour ajouter des endpoints pour Secrets Manager et S3 au VPC et ainsi permettre au Forwarder d'accéder à ces services.
2. Mettez à jour votre proxy avec les configurations suivantes ([HAProxy](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/haproxy.txt) ou [Nginx](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/proxy_conf/nginx.txt)).
3. Si vous utilisez le modèle CloudFormation pour installer le Forwarder, définissez `DdUseVPC`, `VPCSecurityGroupIds` et `VPCSubnetIds`.
4. Assurez-vous que l'option `DdFetchLambdaTags` est désactivée, car AWS VPC ne propose pas encore d'endpoint pour l'API de tagging de groupes de ressources.
5. Définissez `DdApiUrl` sur `http://<proxy_host>:3834` ou `https://<proxy_host>:3834`.
6. Définissez `DdTraceIntakeUrl` sur `http://<proxy_host>:3835` ou `https://<proxy_host>:3835`.
7. Définissez `DdUrl` sur `<proxy_host>` et `DdPort` sur `3837`.
8. Définissez `DdNoSsl` sur `true` si vous vous connectez au proxy via `http`.
9. Définissez `DdSkipSslValidation` sur `true` si vous vous connectez au proxy via `https` avec un certificat auto-signé.

## Dépannage

Définissez la variable d'environnement `DD_LOG_LEVEL` sur `debug` au niveau de la fonction Lambda du Forwarder pour activer temporairement le logging détaillé (n'oubliez pas de le désactiver ensuite). Si les logs de debugging ne vous aident pas, contactez l'[assistance Datadog](https://www.datadoghq.com/support/). Essayez également de mettre à jour le Forwarder vers la dernière version si vous ne l'avez pas déjà fait.

### Installer une nouvelle version

1. Localisez la pile CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder). Si vous avez installé le Forwarder avec la [pile d'intégration Datadog/AWS](https://github.com/Datadog/cloudformation-template/tree/master/aws), veillez à mettre à jour la pile du Forwarder imbriquée au lieu de la pile racine.
2. Localisez la fonction Lambda du Forwarder dans l'onglet « Resources » de la pile CloudFormation, puis accédez à sa page de configuration. Notez la valeur du tag `dd_forwarder_version`, par exemple `3.3.0`, pour être en mesure de revenir à cette version en cas de problème avec la nouvelle.
3. Mettez à jour la pile à l'aide du modèle `https://datadog-cloudformation-template.s3.amazonaws.com/aws/forwarder/latest.yaml`. Vous pouvez remplacer `latest` par une version spécifique, telle que `3.0.2.yaml`, si vous le souhaitez. Veillez à passer en revue les changesets avant d'appliquer la mise à jour.

### Installer le Forwarder +3.0.0 depuis une version plus ancienne

Depuis la version 3.0.0, la fonction Lambda du Forwarder est gérée par CloudFormation. Pour passer d'une ancienne installation à la version 3.0.0 ou une version ultérieure, suivez les étapes ci-dessous.

1. Installez un nouveau Forwarder en suivant les instructions d'[installation](#installation).
2. La fonction Lambda du Forwarder installée se trouve sous l'onglet « Resources » de la pile avec l'ID logique `Forwarder`.
3. Migrez manuellement quelques déclencheurs (filtre d'abonnement aux groupes de logs CloudWatch et notification en cas d'événement de compartiment S3) de l'ancien Forwarder vers le nouveau.
4. Assurez-vous que le nouveau Forwarder fonctionne comme prévue, c'est-à-dire qu'il est régulièrement invoqué et sans erreurs.
5. Vérifiez que les logs des déclencheurs (sources) migrés s'affichent dans le Log Explorer de Datadog et semblent corrects.
6. Migrez tous les déclencheurs vers le nouveau Forwarder.
   - Si Datadog gérait les déclencheurs [automatiquement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-automatiquement), mettez à jour l'ARN de la fonction Lambda du Forwarder dans l'onglet « Collecte Logs » du carré d'intégration AWS.
   - Si les déclencheurs étaient gérés [manuellement](https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#definir-des-declencheurs-manuellement), vous devrez les migrer manuellement (ou avec un script).
7. Assurez-vous que le nombre d'invocations de l'ancienne fonction Lambda du Forwarder passe à zéro.
8. Supprimez l'ancienne fonction Lambda du Forwarder lorsque tout vous semble correct.
9. Si vous avez d'anciennes fonctions Lambda de Forwarder installées dans plusieurs comptes et régions AWS, répétez les étapes ci-dessus pour chaque combinaison de compte et de région.

### Supprimer

Pour supprimer sans risque le Forwarder et d'autres ressources AWS créées par la pile CloudFormation du Forwarder, suivez les étapes ci-dessous.

1. Localisez la pile CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder). Vous pouvez également la retrouver à l'aide de la console de gestion de la fonction Lambda : cliquez sur le lien inclus dans le message « This function belongs to an application. Click here to manage it. », puis accédez à l'onglet « Deployments » sur la page de l'application.
2. Supprimez la pile CloudFormation.

### Modifier les paramètres du Forwarder

1. Localisez la pile CloudFormation [datadog-forwarder (si vous ne l'avez pas renommée)](https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder).
2. Mettez à jour la pile à l'aide du modèle actuel.
3. Modifiez les valeurs des paramètres.

**Remarque :** Datadog vous conseille de définir les paramètres de votre Forwarder via CloudFormation, au lieu de modifier directement la fonction Lambda. Vous trouverez une description des paramètres dans le fichier [template.yaml](https://github.com/DataDog/datadog-serverless-functions/blob/master/aws/logs_monitoring/template.yaml) et dans l'interface de création de pile CloudFormation lorsque vous lancez la pile. N'hésitez pas à effectuer une pull request pour permettre la modification d'autres paramètres à l'aide du modèle.

## Autorisations

Pour déployer la pile CloudFormation avec les options par défaut, vous devez disposer des autorisations ci-dessous afin d'être en mesure d'enregistrer votre clé d'API Datadog en tant que secret, de créer un compartiment S3 pour stocker le code du Forwarder (fichier zip), et de créer des fonctions Lambda (y compris des rôles d'exécution et des groupes de logs).

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
    "logs:CreateLogGroup",
    "logs:DescribeLogGroups",
    "logs:PutRetentionPolicy"
  ],
  "Resource": "*"
}
```

Les capacités suivantes sont requises lorsque vous créez une pile CloudFormation :

- CAPABILITY_AUTO_EXPAND, car le modèle du Forwarder utilise des macros (notamment la macro [AWS SAM](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/transform-aws-serverless.html)).
- CAPABILTY_IAM/NAMED_IAM, car le Forwarder crée des rôles IAM.

La pile CloudFormation crée les rôles IAM suivants :

- ForwarderRole : le rôle d'exécution utilisé par la fonction Lambda du Forwarder pour lire les logs depuis S3, récupérer votre clé d'API Datadog depuis Secrets Manager, et écrire ses propres logs.

**Déclarations IAM**

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

## Paramètres CloudFormation

### Obligatoire

- `DdApiKey` : votre clé d'API Datadog. Pour l'obtenir, accédez à Integrations > APIs > API Keys.
  La clé d'API sera stockée dans AWS Secrets Manager.
- `DdSite` : le site Datadog vers lequel envoyer vos métriques et logs. Doit être défini sur `datadoghq.com`
  ou `datadoghq.eu`

### Fonction Lambda (facultatif)

- `FunctionName` : le nom de la fonction Lambda du Forwarder Datadog. Veillez à ne pas le modifier lorsque vous mettez à jour une
  pile CloudFormation existante, sous peine de remplacer la fonction du Forwarder existante et de
  perdre tous vos déclencheurs.
- `MemorySize` : la quantité de mémoire allouée à la fonction Lambda du Forwarder Datadog.
- `Timeout` : le délai d'expiration de la fonction Lambda du Forwarder Datadog.
- `ReservedConcurrency` : la simultanéité réservée pour la fonction Lambda du Forwarder Datadog.
- `LogRetentionInDays` : la durée de rétention des logs CloudWatch générés par la fonction Lambda
  du Forwarder

### Transfert des logs (facultatif)

- `DdTags` : ajouter des tags personnalisés aux logs transférés. Ces tags doivent être séparés par des virgules dans une chaîne, sans virgule finale. Ex. :
  `env:prod,stack:classic`
- `DdMultilineLogRegexPattern` : utiliser l'expression régulière spécifiée pour détecter une nouvelle ligne de log
  dans les logs multiligne provenant de S3. Ex. : utiliser l'expression `\d{2}\/\d{2}\/\d{4}` pour les logs multiligne qui commencent par
  l'expression "11/10/2014".
- `DdUseTcp` : par défaut, le Forwarder envoie les logs via HTTPS sur le port 443. Pour envoyer les logs via une
  connexion TCP avec chiffrement SSL, définir ce paramètre sur true.
- `DdNoSsl` : désactiver le SSL lors du transfert des logs. Définir sur true lorsque les logs doivent passer par un proxy.
- `DdUrl` : l'URL de l'endpoint vers lequel transmettre les logs. Utile lorsque les logs doivent passer par un proxy.
- `DdPort` : le port de l'endpoint vers lequel transmettre les logs. Utile lorsque les logs doivent passer par un proxy.
- `DdSkipSslValidation` : envoyer les logs via HTTPS, mais SANS valider le certificat fourni par
  l'endpoint. Le trafic entre le Forwarder et l'endpoint d'admission des logs sera toujours chiffré,
  mais la validité du certificat SSL de destination ne sera pas vérifiée.
- `DdUseCompression` : définir sur false pour désactiver la compression des logs. Valide uniquement en cas d'envoi des logs via HTTP.
- `DdCompressionLevel` : définir le niveau de compression entre 0 (aucune compression) et 9 (compression la plus élevée).
  Le niveau de compression par défaut est de 6. Un niveau de compression plus élevé peut permettre de
  réduire la quantité de trafic sortant, mais le temps d'exécution du Forwarder sera plus
  long.
- `DdForwardLog` : définir sur false pour désactiver le transfert des logs mais continuer à transférer les autres
  données d'observabilité, telles que les métriques et les traces des fonctions Lambda.
- `DdFetchLambdaTags` : laisser le Forwarder récupérer les tags de Lambda à l'aide d'appels d'API GetResources et les appliquer
  aux logs, aux métriques et aux traces. Si défini sur true, l'autorisation `tag:GetResources` sera
  automatiquement ajoutée au rôle IAM d'exécution de la fonction Lambda.

### Nettoyage des logs (facultatif)

- `RedactIp` : remplacer le texte correspondant à `\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}` par `xxx.xxx.xxx.xxx`.
- `RedactEmail` : remplacer le texte correspondant à `[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+` par
  `xxxxx@xxxxx.com`
- `DdScrubbingRule` : remplacer le texte correspondant à l'expression régulière spécifiée par `xxxxx` (par défaut) ou par
  `DdScrubbingRuleReplacement` (lorsque spécifié). La règle de nettoyage des logs est appliquée à l'intégralité du log au format
  JSON, y compris aux métadonnées ajoutées automatiquement par la fonction Lambda. Chaque expression
  correspondante est remplacée jusqu'à ce qu'aucune correspondance ne soit trouvée dans chaque log. Remarque : l'utilisation d'une expression régulière inefficace,
  comme  `.*`, peut ralentir la fonction Lambda.
- `DdScrubbingRuleReplacement` : remplacer le texte correspondant au paramètre DdScrubbingRule par le texte spécifié.

### Filtrage des logs (facultatif)

- `ExcludeAtMatch` : ne PAS envoyer les logs correspondant à l'expression régulière spécifiée. Si un log correspond à la fois
  à ExcludeAtMatch et à IncludeAtMatch, celui-ci est exclu. Les règles de filtrage sont appliquées à l'intégralité
  du log au format JSON, y compris aux métadonnées automatiquement ajoutées par la fonction. Remarque : l'utilisation
  d'une expression régulière inefficace, comme  `.*`, peut ralentir la fonction Lambda.
- `IncludeAtMatch` : envoyer uniquement les logs correspondant à l'expression régulière spécifiée et qui ne sont pas exclus par
  ExcludeAtMatch. Remarque : l'utilisation d'une expression régulière inefficace, comme `.*`, peut ralentir la fonction Lambda.

### Paramètres avancés (facultatif)

- `SourceZipUrl` : modifier UNIQUEMENT si vous savez ce que vous faites. Permet de remplacer l'emplacement par défaut du
  code source de la fonction.
- `PermissionBoundaryArn` : ARN de la stratégie utilisée pour définir les limites d'autorisations.
- `DdApiKeySecretArn` : ARN du secret dans lequel est stocké la clé d'API Datadog, si elle est déjà
  stockée dans Secrets Manager. Vous devez quand même spécifier une valeur fictive pour DdApiKey afin de satisfaire
  l'exigence, même si cette valeur ne sera pas utilisée.
- `DdUsePrivateLink` : définir sur true pour activer l'envoi des logs et des métriques via AWS PrivateLink. Voir
  https://dtdg.co/private-link.
- `VPCSecurityGroupIds` : liste des identifiants des groupes de sécurité du VPC, séparés par des virgules. À utiliser lorsque AWS PrivateLink est
  activé.
- `VPCSubnetIds` : liste des identifiants des sous-réseaux du VPC, séparés par des virgules. À utiliser lorsque AWS PrivateLink est activé.
- `AdditionalTargetLambdaARNs` : liste des ARN de Lambda qui seront appelés de façon asynchrone avec le même `event` que celui reçu par le Forwarder Datadog. Les ARN doivent être séparés par des virgules.