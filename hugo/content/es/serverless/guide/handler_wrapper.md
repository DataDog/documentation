---
title: Envolver el controlador de Lambda con código
---

Con el fin de instrumentar invocaciones individuales para las funciones de Lambda de Python y Node.js, la librería Lambda de Datadog necesita envolver tu función de controlador de Lambda. Esto lo consigues al definir el controlador de tu función como la función de controlador de Datadog, como `datadog_lambda.handler.handler`, y al configurar la variable de entorno `DD_LAMBDA_HANDLER` con tu función de controlador original de modo que el controlador de Datadog la llame.

**Nota**: Si la configuración de tu función de Lambda no es compatible con la redirección del controlador de Datadog, puedes aplicar la envoltura de Datadog en el código de tu función en su lugar.

1. Sigue las instrucciones de instalación del método **Custom** (Personalizado) para [Python][1] o [Node.js][2] para instalar Datadog Serverless Monitoring.
2. Omite el paso para configurar la función de controlador.
3. Omite el paso para definir la variable de entorno `DD_LAMBDA_HANDLER`.
4. Aplica la envoltura de Datadog en el código de tu función:
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

[1]: /es/serverless/installation/python?tab=custom
[2]: /es/serverless/installation/nodejs?tab=custom
