---
title: Bibliothèque Lambda Datadog
kind: documentation
further_reading:
  - link: /serverless/datadog_lambda_library/python
    tag: Bibliothèque Lambda Datadog pour Python
    text: Bibliothèque Lambda Datadog pour Python
  - link: /serverless/datadog_lambda_library/nodejs
    tag: Bibliothèque Lambda Datadog pour Node.js
    text: Bibliothèque Lambda Datadog pour Node.js
  - link: /serverless/datadog_lambda_library/ruby
    tag: Bibliothèque Lambda Datadog pour Ruby
    text: Bibliothèque Lambda Datadog pour Ruby
  - link: /serverless/datadog_lambda_library/go
    tag: Bibliothèque Lambda Datadog pour Go
    text: Bibliothèque Lambda Datadog pour Go
  - link: /serverless/datadog_lambda_library/java
    tag: Bibliothèque Lambda Datadog pour Java
    text: Bibliothèque Lambda Datadog pour Java
---
{{< img src="serverless/datadog_lambda_library.png" alt="Bibliothèque Lambda Datadog"  style="width:100%;">}}

La bibliothèque Lambda Datadog est utilisée pour :

- La création en temps réel des [métriques Lambda optimisées][1] portant sur les appels, les erreurs, les démarrages à froid, les coûts estimés, etc.
- L'envoi (synchrone ou asynchrone) de [métriques custom][2]
- L'activation du [tracing distribué et de l'APM Datadog][3] pour Node.js, Python et Ruby

La bibliothèque Lambda Datadog n'est **PAS** utilisée pour la collecte des éléments suivants :

- Les métriques Lambda provenant de CloudWatch (voir l'[intégration AWS Lambda][4])
- Les traces Lambda provenant de X-Ray (voir l'[intégration AWS X-Ray][5])
- Les logs Lambda provenant de CloudWatch (voir le [Forwarder Datadog][6])

Datadog distribue la bibliothèque Lambda sous la forme d'un package pour Python, Node.js, Ruby, Go et Java. Les packages sont installés par l'intermédiaire des gestionnaires de packages standard, comme pip, npm, gem, maven, etc.

La bibliothèque Lambda Datadog est également disponible sous la forme de [couches Lambda][7] pour Python, Node.js et Ruby.

Pour installer la bibliothèque Lambda Datadog et instrumenter vos applications sans serveur, consultez les [instructions d'installation][8].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


[1]: /fr/serverless/enhanced_lambda_metrics/
[2]: /fr/serverless/custom_metrics/
[3]: /fr/tracing/
[4]: /fr/integrations/amazon_lambda/
[5]: /fr/integrations/amazon_xray/
[6]: /fr/serverless/forwarder/
[7]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html
[8]: /fr/serverless/installation/