---
aliases:
- /fr/serverless/datadog_lambda_library/extension
dependencies:
- https://github.com/DataDog/datadog-lambda-extension/blob/main/README.md
title: Extension Lambda Datadog
---
[![Slack](https://chat.datadoghq.com/badge.svg?bg=632CA6)](https://chat.datadoghq.com/)
[![Licence](https://img.shields.io/badge/license-Apache--2.0-blue)](https://github.com/DataDog/datadog-agent/blob/master/LICENSE)

**Remarque :** ce référentiel comprend des notes de version, des problèmes, des instructions et des scripts liés à l'extension Lambda Datadog. L'extension est une version spéciale de l'Agent Datadog. Le code source est disponible sur [cette page](https://github.com/DataDog/datadog-agent/tree/main/cmd/serverless).

L'extension Lambda Datadog est une extension Lambda AWS qui prend en charge l'envoi de métriques custom, de traces et de logs de manière asynchrone pendant l'exécution de votre fonction Lambda AWS.

## Installation

Suivez les [instructions d'installation](https://docs.datadoghq.com/serverless/installation) et visualisez les métriques optimisées, traces et logs de votre fonction dans Datadog.

## Mise à niveau
Pour effectuer une mise à niveau, modifiez la version de l'extension Datadog dans les configurations de vos couches Lambda ou dans votre Dockerfile (pour les fonctions Lambda déployées en tant qu'images de conteneur). Consultez les dernières [versions](https://github.com/DataDog/datadog-lambda-extension/releases) et les changelogs correspondants avant de procéder à la mise à niveau.

## Configurations

Suivez les [instructions de configuration](https://docs.datadoghq.com/serverless/configuration) pour taguer vos données de télémétrie, capturer les charges utiles de vos requêtes et réponses, filtrer ou nettoyer les informations sensibles des logs ou des traces, etc.

## Performances

L'extension Lambda Datadog alourdit légèrement votre fonction Lambda lors des démarrages à froid (l'initialisation prend donc plus de temps). Datadog optimise continuellement les performances de l'extension Lambda et vous conseille de toujours utiliser la dernière version.

Vous remarquerez peut-être que la durée d'exécution annoncée de votre fonction Lambda est plus longue qu'auparavant. Cela s'explique par le fait que l'extension Lambda Datadog doit renvoyer des données via l'API Datadog. Bien que le temps passé à transmettre ces données soit pris en compte dans la durée de la fonction, cette opération a lieu *après* le renvoi de la réponse de votre fonction au client par AWS. En d'autres termes, votre fonction Lambda *ne subit en réalité aucun ralentissement*. Consultez cet [article du blog d'AWS](https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/) pour en savoir plus. Pour surveiller les performances réelles de votre fonction et ne pas inclure la durée ajoutée par l'extension Datadog, utilisez la métrique `aws.lambda.enhanced.runtime_duration`.

Par défaut, l'extension renvoie les données à Datadog à la fin de chaque invocation (par exemple, les démarrages à froid déclenchent toujours un renvoi). Cela permet d'éviter les retards de transmission des données pour les applications à faible trafic qui effectuent des invocations de façon sporadique, les tâches cron et les tests manuels. Dès que l'extension détecte un pattern d'invocation régulier et fréquent (plus d'une fois par minute), elle regroupe les données de plusieurs invocations et transmet les données de façon périodique au début de l'invocation. Cela signifie que *plus votre fonction est occupée, plus la durée d'exécution moyenne par invocation sera faible*. En d'autres termes, pour les applications à faible trafic, les données sont renvoyées avec une certaine latence, mais les coûts associés sont généralement négligeables. Pour les applications à trafic élevé, les données sont renvoyées sans latence perceptible.

Pour les fonctions Lambda déployées dans une région éloignée du site Datadog (par exemple, une fonction Lambda déployée sur eu-west-1 transmettant des données au site US1 Datadog), la latence réseau peut entraîner une augmentation de la durée.

## Créer un ticket

Si vous rencontrez un bug avec ce package, faites-le-nous savoir. Avant de créer un ticket, vérifiez que le problème n'a pas déjà été signalé dans les tickets existants pour éviter les doublons.

Lorsque vous créez un ticket, fournissez la version de l'extension ainsi que la stack trace, si possible. Indiquez également les étapes à reproduire le cas échéant.

Vous pouvez également créer un ticket pour demander l'ajout d'une fonctionnalité.

## Contributions

Si vous rencontrez un problème avec ce package et que vous avez un correctif, n'hésitez pas à faire une pull request conformément aux [procédures](https://github.com/DataDog/datadog-agent/blob/master/docs/dev/contributing.md).

## Communauté

Si vous avez des commentaires ou des questions concernant les fonctionnalités, rejoignez le canal `#serverless` de la [communauté Slack Datadog](https://chat.datadoghq.com/).

## Licence

Sauf indication contraire, tous les fichiers de ce référentiel sont distribués sous licence Apache version 2.0.

Ce produit inclut un logiciel développé par Datadog (https://www.datadoghq.com/). Copyright 2021 Datadog, Inc.