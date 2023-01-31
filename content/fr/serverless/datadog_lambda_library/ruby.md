---
dependencies:
- "https://github.com/DataDog/datadog-lambda-rb/blob/master/README.md"
kind: documentation
title: Bibliothèque Lambda Datadog pour Ruby
---
![build](https://github.com/DataDog/datadog-lambda-rb/workflows/build/badge.svg)
[![RubyGem](https://img.shields.io/gem/v/datadog-lambda)](https://rubygems.org/gems/datadog-lambda)
[![Slack](https://img.shields.io/badge/slack-%23serverless-blueviolet?logo=slack)](https://datadoghq.slack.com/channels/serverless/)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-lambda-rb/blob/main/LICENSE)

La bibliothèque Lambda Datadog pour Ruby (2.5 et 2.7) permet de recueillir des métriques Lambda optimisées, d'activer le tracing distribué et d'envoyer des métriques custom à partir de fonctions AWS Lambda.

## Installation

Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation/ruby/), et consultez les métriques optimisées, les traces et les logs de votre fonction dans Datadog.

## Métriques custom

Une fois la bibliothèque [installée](#installation), vous devriez pouvoir envoyer des métriques custom à partir de votre fonction Lambda.

Consultez les instructions relatives à l'[envoi de métriques custom à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=ruby#metriques-custom).

## Tracing

Une fois la bibliothèque [installée](#installation), vous devriez voir les traces de vos fonctions dans Datadog, et les logs de vos fonctions devraient être automatiquement associés aux traces.

Pour en savoir plus sur la collecte de traces, consultez la documentation sur la [collecte de traces à partir de fonctions AWS Lambda](https://docs.datadoghq.com/integrations/amazon_lambda/?tab=ruby#collecte-de-traces).

Pour en savoir plus sur le traceur, consultez la [documentation officielle du client de tracing Datadog](https://github.com/DataDog/dd-trace-rb/blob/main/docs/GettingStarted.md).

Pour en savoir plus sur l'association de vos traces à vos logs, consultez la page [Associer vos logs à vos traces](https://docs.datadoghq.com/tracing/connect_logs_and_traces/ruby/).

## Variables d'environnement

### DD_LOG_LEVEL

Définir sur `debug` pour activer les logs de debugging à partir de la bibliothèque Lambda Datadog. Valeur par défaut : `info`.

### DD_ENHANCED_METRICS

Générer des métriques d'intégration Lambda Datadog optimisées, telles que `aws.lambda.enhanced.invocations` et `aws.lambda.enhanced.errors`. Valeur par défaut : `true`.

### DD_MERGE_DATADOG_XRAY_TRACES

Définir sur `true` pour fusionner la trace X-Ray et la trace Datadog lorsque les tracings X-Ray et Datadog sont tous les deux utilisés. Valeur par défaut : `false`.

## Ouvrir un ticket

Si vous rencontrez un bug avec ce package, faites-le nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, indiquez la version de la couche Lambda Datadog, la version de Ruby et la stack trace, si possible. Indiquez aussi les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request en suivant la [procédure](https://github.com/DataDog/dd-lambda-layer-rb/blob/main/CONTRIBUTING.md).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé chez Datadog (https://www.datadoghq.com/). Copyright 2019 Datadog, Inc.
