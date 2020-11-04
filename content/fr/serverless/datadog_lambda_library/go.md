---
dependencies:
- "https://github.com/DataDog/datadog-lambda-go/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Go
---
![build](https://github.com/DataDog/datadog-lambda-go/workflows/build/badge.svg)
[![Code Coverage](https://img.shields.io/codecov/c/github/DataDog/datadog-lambda-go)](https://codecov.io/gh/DataDog/datadog-lambda-go)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![Godoc](https://img.shields.io/badge/godoc-reference-blue.svg)](https://godoc.org/github.com/DataDog/datadog-lambda-go)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-go/blob/master/LICENSE)

La bibliothèque Lambda Datadog pour Go permet de recueillir des métriques Lambda optimisées, d'activer le tracing distribué et d'envoyer des métriques custom à partir de fonctions AWS Lambda.

## Installation

Suivez les instructions d'installation [sur cette page](https://docs.datadoghq.com/serverless/installation/go/).

## Métriques optimisées

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir consulter les métriques optimisées pour votre fonction Lambda dans Datadog.

Consultez la documentation officielle sur les [métriques Lambda optimisées Datadog](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#metriques-lambda-optimisees-transmises-en-temps-reel).

## Métriques custom

Une fois [installée](#installation), vous devriez pouvoir envoyer des métriques custom à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=go#metriques-custom).

## Tracing

Définissez la variable d'environnement `DD_TRACE_ENABLED` sur `true` pour activer le tracing Datadog. Une fois le tracing Datadog activé, la bibliothèque injecte une span représentant l'exécution de Lambda dans l'objet de contexte. Vous pouvez ensuite utiliser le package `dd-trace-go` inclus pour créer des spans supplémentaires à partir du contexte ou transmettre ce dernier à d'autres services. Pour en savoir plus, consultez la [documentation dédiée à dd-trace-go](https://godoc.org/gopkg.in/DataDog/dd-trace-go.v1/ddtrace) (en anglais).

```
import (
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
  httptrace "gopkg.in/DataDog/dd-trace-go.v1/contrib/net/http"
)

func handleRequest(ctx context.Context, ev events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  // Tracer une requête HTTP
  req, _ := http.NewRequestWithContext(ctx, "GET", "https://www.datadoghq.com", nil)
  client := http.Client{}
  client = *httptrace.WrapClient(&client)
  client.Do(req)

  // Créer une span personnalisée
  s, _ := tracer.StartSpanFromContext(ctx, "child.span")
  time.Sleep(100 * time.Millisecond)
  s.Finish()
}
```

Vous pouvez également utiliser la span injectée pour [associer vos logs à vos traces](https://docs.datadoghq.com/tracing/connect_logs_and_traces/go/).

```
func handleRequest(ctx context.Context, ev events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  currentSpan, _ := tracer.SpanFromContext(ctx)
  log.Printf("mon message de log %v", currentSpan)
}
```

Si vous utilisez également AWS X-Ray pour tracer vos fonctions Lambda, vous pouvez définir la variable d'environnement `DD_MERGE_XRAY_TRACES` sur `true`. Datadog se charge alors de fusionner vos traces Datadog et X-Ray afin d'obtenir une seule version unifiée.


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

### DD_TRACE_ENABLED

Définir sur `true` pour lancer le traceur Datadog. Valeur par défaut : `false`.

### DD_MERGE_XRAY_TRACES

Si vous utilisez le tracing X-Ray et Datadog, définissez cette valeur sur `true` pour fusionner les traces X-Ray et Datadog. Valeur par défaut : `false`.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de datadog-lambda-go, la version de Go et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-go/blob/master/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé par Datadog (https://www.datadoghq.com/). Copyright 2020 Datadog, Inc.
