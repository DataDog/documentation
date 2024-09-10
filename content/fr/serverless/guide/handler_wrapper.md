---
title: Incorporer la fonction Lambda du gestionnaire dans le code
---

Afin d'instrumenter des invocations individuelles avec les fonctions Lambda Python et Node.js, la bibliothèque Lambda Datadog doit être utilisée comme wrapper autour de la fonction Lambda de votre gestionnaire. Pour ce faire, définissez le gestionnaire de votre fonction sur la fonction du gestionnaire Datadog, par exemple `datadog_lambda.handler.handler`, et définissez la variable d'environnement `DD_LAMBDA_HANDLER` avec la fonction du gestionnaire d'origine qui doit être appelée par le gestionnaire Datadog.

Si votre configuration de la fonction Lambda est incompatible avec la redirection du gestionnaire Datadog, vous pouvez également appliquer le wrapper Datadog dans le code de votre fonction.

1. Suivez les instructions d'installation **personnalisées** pour [Python][1] ou [Node.js][2] afin d'installer la surveillance sans serveur de Datadog.
2. Ignorez l'étape de configuration de la fonction du gestionnaire.
3. Ignorez l'étape de définition de la variable d'environnement `DD_LAMBDA_HANDLER`.
4. Appliquez le wrapper Datadog dans le code de votre fonction :
    ```python
    # for python
    from datadog_lambda.wrapper import datadog_lambda_wrapper

    @datadog_lambda_wrapper
    def my_lambda_handle(event, context):
        # your function code
    ```

    ```js
    // for node.js
    const { datadog } = require("datadog-lambda-js");
    const tracer = require("dd-trace").init({
      // optional tracer options
    });

    module.exports.myHandler = datadog(myHandler, {
      // my function code
    }, {
      // optional datadog config, e.g., custom trace context extractor
      traceExtractor: () => {},
    });
    ```

[1]: /fr/serverless/installation/python?tab=custom
[2]: /fr/serverless/installation/nodejs?tab=custom