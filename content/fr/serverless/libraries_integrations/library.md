---
title: Bibliothèque Lambda Datadog
kind: documentation
further_reading:
  - link: /serverless/libraries_integrations/extension/
    tag: Documentation
    text: Extension Lambda Datadog
  - link: https://github.com/DataDog/datadog-lambda-python/blob/master/README.md
    tag: Github
    text: Bibliothèque Lambda Datadog pour Python
  - link: https://github.com/DataDog/datadog-lambda-js/blob/master/README.md
    tag: Github
    text: Bibliothèque Lambda Datadog pour Node.js
  - link: https://github.com/DataDog/datadog-lambda-rb/blob/master/README.md
    tag: Github
    text: Bibliothèque Lambda Datadog pour Ruby
  - link: https://github.com/DataDog/datadog-lambda-go/blob/master/README.md
    tag: Github
    text: Bibliothèque Lambda Datadog pour Go
  - link: https://github.com/DataDog/datadog-lambda-java/blob/master/README.md
    tag: Github
    text: Bibliothèque Lambda Datadog pour Java
aliases:
  - /fr/serverless/datadog_lambda_library/
---
{{< img src="serverless/datadog_lambda_library.png" alt="Bibliothèque Lambda Datadog"  style="width:100%;">}}

La bibliothèque Lambda Datadog est utilisée pour :

- La création en temps réel des [métriques Lambda optimisées][1] portant sur les appels, les erreurs, les démarrages à froid, les coûts estimés, etc.
- L'envoi (synchrone ou asynchrone) de [métriques custom][2]
- L'activation du [tracing distribué et de l'APM Datadog][3] pour Node.js, Python et Ruby

Si vous utilisez la bibliothèque Lambda Datadog pour **Ruby** ou **Java**, vous **devez** également installer et configurer le Forwarder Datadog pour ingérer des traces, des métriques Lambda optimisées ou des métriques custom (de façon asynchrone) depuis vos fonctions Lambda.
Si vous utilisez la bibliothèque Lambda Datadog pour **Python**, **Node** ou **Go**, vous pouvez utiliser l'[extension Lambda Datadog][4] pour ingérer des traces, des métriques Lambda optimisées ou des métriques custom. Il est également possible de continuer à utiliser le Forwarder Datadog.

La bibliothèque Lambda Datadog n'est **PAS** utilisée pour la collecte des éléments suivants :

- Les métriques Lambda provenant de CloudWatch (voir l'[intégration AWS Lambda][5])
- Les traces Lambda provenant de X-Ray (voir l'[intégration AWS X-Ray][6])
- Les logs Lambda provenant de CloudWatch (voir le [Forwarder Datadog][7])

Datadog distribue la bibliothèque Lambda sous la forme d'un package pour Python, Node.js, Ruby, Go et Java. Les packages sont installés par l'intermédiaire des gestionnaires de packages standard, comme pip, npm, gem, maven, etc.

La bibliothèque Lambda Datadog est également disponible sous la forme de [couches Lambda][8] pour Python, Node.js et Ruby.

Pour installer la bibliothèque Lambda Datadog et instrumenter vos applications sans serveur, consultez les [instructions d'installation][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/enhanced_lambda_metrics/
[2]: /fr/serverless/custom_metrics/
[3]: /fr/tracing/
[4]: /fr/serverless/libraries_integrations/extension/
[5]: /fr/integrations/amazon_lambda/
[6]: /fr/integrations/amazon_xray/
[7]: /fr/serverless/forwarder/
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[9]: /fr/serverless/installation/