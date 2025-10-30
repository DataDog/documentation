<div class="alert alert-info">Instrumenting Java functions through the Datadog CDK construct is only available for AWS CDK apps written in Typescript, Python, and Go.</div>

The [Datadog CDK construct][1] automatically installs Datadog on your functions using Lambda layers. It configures your functions to send metrics, traces, and logs to Datadog through the Datadog Lambda Extension.

{{< tabs >}}

{{% tab "TypeScript" %}}
1. Install the Datadog CDK constructs library

### AWS CDK v1

```sh
npm install datadog-cdk-constructs --save-dev
```

### AWS CDK v2

```sh
npm install datadog-cdk-constructs-v2 --save-dev
```

2. Instrument your Lambda functions

### AWS CDK v1

```typescript
import { Datadog } from "datadog-cdk-constructs";

const datadog = new Datadog(this, "Datadog", {
    javaLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-java" >}},
    extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
    site: "<DATADOG_SITE>",
    apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
});
datadog.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
```

### AWS CDK v2

```typescript
import { DatadogLambda } from "datadog-cdk-constructs-v2";

const datadogLambda = new DatadogLambda(this, "datadogLambda", {
    javaLayerVersion: {{< latest-lambda-layer-version layer="dd-trace-java" >}},
    extensionLayerVersion: {{< latest-lambda-layer-version layer="extension" >}},
    site: "<DATADOG_SITE>",
    apiKeySecretArn: "<DATADOG_API_KEY_SECRET_ARN>"
});
datadogLambda.addLambdaFunctions([<LAMBDA_FUNCTIONS>])
```
{{% /tab %}}

{{% tab "Python" %}}

1. Install the Datadog CDK constructs library

### AWS CDK v1

```sh
pip install datadog-cdk-constructs
```

### AWS CDK v2

```sh
pip install datadog-cdk-constructs-v2
```

2. Instrument your Lambda functions

### AWS CDK v1

```python
from datadog_cdk_constructs import Datadog

datadog = Datadog(self, "Datadog",
    java_layer_version={{< latest-lambda-layer-version layer="dd-trace-java" >}},
    extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
    site="<DATADOG_SITE>",
    api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
  )
datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
```

### AWS CDK v2

```python
from datadog_cdk_constructs_v2 import DatadogLambda

datadog = DatadogLambda(self, "datadogLambda",
    java_layer_version={{< latest-lambda-layer-version layer="dd-trace-java" >}},
    extension_layer_version={{< latest-lambda-layer-version layer="extension" >}},
    site="<DATADOG_SITE>",
    api_key_secret_arn="<DATADOG_API_KEY_SECRET_ARN>",
  )
datadog.add_lambda_functions([<LAMBDA_FUNCTIONS>])
```
{{% /tab %}}

{{% tab "Go" %}}

1. Install the Datadog CDK constructs library

**Note**: Go CDK constructs are only available for AWS CDK v2.

```sh
go get github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v3
```

2. Instrument your Lambda functions

**Note**: Go CDK constructs are only available for AWS CDK v2.

```go
import (
    "github.com/DataDog/datadog-cdk-constructs-go/ddcdkconstruct/v3"
)

datadogLambda := ddcdkconstruct.NewDatadogLambda(
    stack,
    jsii.String("Datadog"),
    &ddcdkconstruct.DatadogLambdaProps{
        JavaLayerVersion:      jsii.Number({{< latest-lambda-layer-version layer="dd-trace-java" >}}),
        ExtensionLayerVersion: jsii.Number({{< latest-lambda-layer-version layer="extension" >}}),
        Site:                  jsii.String("<DATADOG_SITE>"),
        ApiKeySecretArn:       jsii.String("<DATADOG_API_KEY_SECRET_ARN>"),
    })
datadogLambda.AddLambdaFunctions(&[]interface{}{<LAMBDA_FUNCTIONS>}, nil)
```

{{% /tab %}}

{{< /tabs >}}

To fill in the placeholders:
- Replace `<DATADOG_SITE>` with {{< region-param key="dd_site" code="true" >}} (ensure the correct SITE is selected on the right).
- Replace `<DATADOG_API_KEY_SECRET_ARN>` with the ARN of the AWS secret where your [Datadog API key][2] is securely stored. The key needs to be stored as a plaintext string (not a JSON blob). Ensure your Lambda execution role has the `secretsmanager:GetSecretValue` IAM permission in order to read the secret value. For quick testing, you can use `apiKey` instead and set the Datadog API key in plaintext.

More information and additional parameters can be found on the [Datadog CDK documentation][1].

[1]: https://github.com/DataDog/datadog-cdk-constructs
[2]: https://app.datadoghq.com/organization-settings/api-keys
