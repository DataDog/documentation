---
dependencies:
- "https://github.com/DataDog/datadog-lambda-go/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Go
---
[![CircleCI](https://img.shields.io/circleci/build/github/DataDog/datadog-lambda-go)](https://circleci.com/gh/DataDog/datadog-lambda-go)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-go)](https://codecov.io/gh/DataDog/datadog-lambda-go)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![Godoc](https://img.shields.io/badge/godoc-reference-blue.svg)](https://godoc.org/github.com/DataDog/datadog-lambda-go)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-go/blob/master/LICENSE)

La bibliothèque Lambda Datadog pour Go permet de recueillir des métriques Lambda optimisées, d'activer le tracing distribué et d'envoyer des métriques custom à partir de fonctions AWS Lambda.

## Installation

Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation/go/), et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog.

## Métriques optimisées

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir consulter les métriques optimisées pour votre fonction Lambda dans Datadog.

Consultez la documentation officielle sur les [métriques Lambda optimisées Datadog](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#metriques-lambda-optimisees-transmises-en-temps-reel).

## Métriques custom

Une fois [installée](#installation), vous devriez pouvoir envoyer des métriques custom à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#metriques-custom).

## Tracing

Utilisez `ddlambda.AddTraceHeaders(ctx, req)` afin d'injecter les en-têtes de tracing Datadog dans les requêtes sortantes.

```go
  req, err := http.NewRequest("GET", "http://example.com/status", nil)
  // Utilisez le même objet Context que celui attribué à votre gestionnaire Lambda.
  // Si vous ne souhaitez pas passer le contexte dans votre hiérarchie d'appels, vous pouvez utiliser ddlambda.GetContext()
  ddlambda.AddTraceHeaders(ctx, req)

  client := http.Client{}
  client.Do(req)
}
```


## Variables d'environnement

### DD_FLUSH_TO_LOG

Définissez cette variable sur `true` (conseillé) pour envoyer vos métriques custom de façon asynchrone (l'exécution de votre fonction Lambda n'est pas retardée) via CloudWatch Logs avec l'aide du [Forwarder Datadog](https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/logs_monitoring). Définie sur `false` par défaut. Si elle est définie sur `false`, vous devrez configurer `DD_API_KEY` et `DD_SITE`.

### DD_API_KEY

Si `DD_FLUSH_TO_LOG` est définie sur `false` (non conseillé), la clé d'API Datadog doit être définie.

### DD_SITE

Si `DD_FLUSH_TO_LOG` est définie sur `false` (non conseillé) et que vos données doivent être envoyées au site européen de Datadog, vous devez définir `DD_SITE` sur `datadoghq.eu`. Valeur par défaut : `datadoghq.com`.

### DD_LOG_LEVEL

Définir sur `debug` pour activer les logs de debugging à partir de la bibliothèque Lambda Datadog. Valeur par défaut : `info`.

### DD_ENHANCED_METRICS

Générer des métriques d'intégration Lambda Datadog optimisées, telles que `aws.lambda.enhanced.invocations` et `aws.lambda.enhanced.errors`. Valeur par défaut : `true`.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de datadog-lambda-go, la version de Go et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-go/blob/master/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2020 Datadog, Inc.
