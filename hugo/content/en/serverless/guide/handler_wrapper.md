---
title: Wrap Your Lambda Handler in Code
---

For Python and Node.js Lambda functions, in order to instrument individual invocations, the Datadog Lambda library needs to wrap around your Lambda handler function. This is achieved by setting your function's handler to the Datadog handler function, such as `datadog_lambda.handler.handler`, and setting the environment variable `DD_LAMBDA_HANDLER` with your original handler function to be called by the Datadog handler.

If your Lambda function configuration is incompatible with the Datadog handler redirection, you can apply the Datadog wrapper in your function code instead.

1. Follow the **Custom** installation instructions for [Python][1] or [Node.js][2] to install the Datadog serverless monitoring.
2. Skip the step to configure the handler function.
3. Skip the step to set the environment variable `DD_LAMBDA_HANDLER`.
4. Apply the Datadog wrapper in your function code:
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
    
[1]: /serverless/installation/python?tab=custom
[2]: /serverless/installation/nodejs?tab=custom
