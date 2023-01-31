---
dependencies:
- "https://github.com/DataDog/datadog-lambda-python/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Python
---
![Build](https://github.com/DataDog/datadog-lambda-python/workflows/build/badge.svg)
[![PyPI](https://img.shields.io/pypi/v/datadog-lambda)](https://pypi.org/project/datadog-lambda/)
![PyPI - Version de Python](https://img.shields.io/pypi/pyversions/datadog-lambda)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-python/blob/main/LICENSE)

La bibliothèque Lambda Datadog pour Python (2.7, 3.6, 3.7 et 3.8) permet de recueillir des métriques Lambda optimisées, d'activer le tracing distribué et d'envoyer des métriques custom à partir de fonctions Lambda AWS.

**REMARQUE IMPORTANTE :** AWS Lambda doit faire l'objet d'un [changement majeur](https://aws.amazon.com/blogs/compute/upcoming-changes-to-the-python-sdk-in-aws-lambda/) le **31 mars 2021**. Si vous utilisez la version 7 ou une version antérieure de la couche Lambda Python Datadog, installez la dernière version.

## Installation

Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation/python/), et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog.

## Métriques custom

Une fois [installée](#installation), vous devriez pouvoir envoyer des métriques personnalisées à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions Lambda AWS](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#metriques-custom).

## Tracing

Une fois [installée](#installation), vous devriez voir les traces de vos fonctions dans Datadog, et les logs de vos fonctions devrait être automatiquement connectés aux traces.

Pour en savoir plus sur la collecte de traces, consultez la documentation sur la [collecte de traces à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#collecte-de-traces).

Pour en savoir plus sur l'association de vos traces à vos logs, consultez la page [Associer vos logs Python à vos traces](https://docs.datadoghq.com/tracing/connect_logs_and_traces/python/).

Pour en savoir plus sur le traceur, consultez la [documentation officielle du client de tracing Datadog](http://pypi.datadoghq.com/trace/docs/index.html) (en anglais).

## Métriques optimisées

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir consulter des métriques optimisées pour votre fonction Lambda dans Datadog.

Consultez la documentation officielle sur les [métriques Lambda optimisées de Datadog](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=python#metriques-lambda-optimisees-transmises-en-temps-reel).

## Variables d'environnement

### DD_FLUSH_TO_LOG

Définissez cette variable sur `true` (conseillé) pour envoyer vos métriques custom de façon asynchrone (l'exécution de votre fonction Lambda n'est pas retardée) via CloudWatch Logs avec l'aide du [Forwarder Datadog](https://github.com/DataDog/datadog-serverless-functions/tree/main/aws/logs_monitoring). Valeur par défaut : `false`. Si vous définissez cette variable sur `false`, vous devrez configurer `DD_API_KEY` et `DD_SITE`.

### DD_API_KEY

Si `DD_FLUSH_TO_LOG` est défini sur `false` (non conseillé), la clé d'API Datadog doit être définie en configurant l'une des variables d'environnement suivantes :

- DD_API_KEY : la clé d'API Datadog en texte brut (non conseillé).
- DD_KMS_API_KEY : la clé d'API avec chiffrement KMS ; nécessite l'autorisation `kms:Decrypt`.
- DD_API_KEY_SECRET_ARN : l'ARN du secret qui récupère la clé d'API auprès du gestionnaire de secrets ; nécessite l'autorisation `secretsmanager:GetSecretValue` (et `kms:Decrypt` si une clé CMK gérée par le client est utilisée).
- DD_API_KEY_SSM_NAME : le nom de paramètre utilisé pour récupérer la clé d'API à partir de Systems Manager Parameter Store ; nécessite l'autorisation `ssm:GetParameter` (et `kms:Decrypt` si une SecureString avec une clé CMK gérée par le client est utilisée).

Vous pouvez également fournir ou remplacer la clé d'API lors de l'exécution (non conseillé)

```python
# Remplacez la clé d'API DD après importation des packages datadog_lambda
à partir de l'API d'importation Datadog
api._api_key = "MA_CLÉ_API"
```

### DD_SITE

Si `DD_FLUSH_TO_LOG` est définie sur `false` (non conseillé) et que vos données doivent être envoyées au site européen de Datadog, vous devez définir `DD_SITE` sur `datadoghq.eu`. Valeur par défaut : `datadoghq.com`.

### DD_LOGS_INJECTION

Injecter un ID de trace Datadog dans les logs pour la [corrélation](https://docs.datadoghq.com/tracing/connect_logs_and_traces/python/). Défini par défaut sur `true`.

### DD_LOG_LEVEL

Définir sur `debug` pour activer les logs de debugging à partir de la bibliothèque Lambda Datadog. Valeur par défaut : `info`.

### DD_ENHANCED_METRICS

Générer des métriques d'intégration Lambda Datadog optimisées, telles que `aws.lambda.enhanced.invocations` et `aws.lambda.enhanced.errors`. Valeur par défaut : `true`.

### DD_LAMBDA_HANDLER

Votre gestionnaire Lambda d'origine.

### DD_TRACE_ENABLED

Définir sur `true` pour lancer le traceur Datadog. Valeur par défaut : `false`.

### DD_MERGE_XRAY_TRACES

Définir sur `true` pour fusionner la trace X-Ray et la trace Datadog lorsque les tracings X-Ray et Datadog sont tous les deux utilisés. Valeur par défaut : `false`.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de la bibliothèque Lambda Datadog, la version de Python et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.
