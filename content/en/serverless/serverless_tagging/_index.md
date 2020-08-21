---
title: Serverless Tagging
kind: documentation
---

{{< img src="serverless/serverless_tagging.mp4" video="true" alt="Unified Serverless Tagging" >}}

## Overview

Any tag applied to your AWS Lambda function automatically becomes a new dimension on which you can slice and dice your traces.

Tags are especially powerful when consistent across the Datadog platform. First-class support is offered for the following tags: `env`, `service`, and `version`.

With these three tags, you can:

- Navigate seamlessly across traces, metrics, and logs with consistent tags
- View service data based on environment or version in a unified fashion within the Datadog app

There are a few best practices Datadog recommends for tagging in your serverless environment to keep tags consistent across your traces, metrics, and logs.


## Directly tag your serverless functions

To surface tags from your Lambda functions across metrics, traces, and logs, Datadog recommends that you directly tag your Lambda functions with the appropriate `env` and `service`. Below are some sample tagging configurations for common serverless developer tools:

{{< tabs >}}
{{% tab "Serverless Framework" %}}

If you are using the Serverless Framework, you can choose one of several options to apply tags across Datadog:

1- Tags directly added at the provider scope will be applied across Datadog:

```yaml
provider:
  name: aws
  runtime: nodejs12.x
  tags:
	service: shopist-cart-confirmation
  	env: prod
  	version: 1.01
```

2- Tags directly added on each individual Lambda resource will be applied across Datadog:

```yaml
functions:
  confirmCart:
    handler: cart.confirm
    tags:
      service: shopist-cart-confirmation
      env: prod
      version: 1.01
    events:
      - http:
          path: ping
          method: get

```

3- If you are using the Datadog Serverless Framework Plugin, native Serverless Framework `service` and `stage` tags will be surfaced as `service` and `env` across Datadog:

```yaml
service: shopist-cart-confirmation

provider:
  name: aws
  runtime: nodejs12.x
  stage: prod
```

{{% /tab %}}
{{% tab "AWS SAM" %}}

If you are using the AWS SAM, you can choose one of several options to apply tags across Datadog:


1- Tags directly added on each individual Lambda resource will be applied across Datadog:

```yaml
Resources:
  confirmCart:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/handlers/cart.confirm
      Tags:
      	env: prod
      	service: shopist-cart-confirmation
```

2- If you are using the Datadog CloudFormation Macro, tags directly added in the `Transform` scope will be applied across Datadog:

```yaml
Transform:
  - AWS::Serverless-2016-10-31
  - Name: DatadogServerless
    Parameters: 
        nodeLayerVersion: 25
        forwarderArn: "arn:aws:lambda:us-east-1:000000000000:function:datadog-forwarder"
        stackName: !Ref "AWS::StackName"
        service: "shopist-cart-confirmation"
        env: "prod"
```

{{% /tab %}}
{{< /tabs >}}


### Import Resource Tags from your Serverless Functions

We strongly recommend you enable the `DdFetchLambdaTags` option on the Datadog Forwarder. Setting the parameter `DdFetchLambdaTags` to `true` on the Forwarder CloudFormation stack to ensure your traces are tagged with the resource tags on the originating Lambda function. Lambda function resource tags are automatically surfaced to X-Ray traces in Datadog without any additional configuration.

## Organize your Service Map

{{< img src="serverless/serverless_service_map.png" alt="Service Map" >}}

### The env tag

Use `env` to separate out your staging, development, and production environments. This works for any kind of infrastructure, not just for your serverless functions. As an example, you could tag your production EU Lambda functions with `env:prod-eu`.

By default, AWS Lambda functions are tagged with `env:none` in Datadog. Add your own tag to override this.

### The service tag

Add the `service` tag in order to group related Lambda functions into a service. The Service Map and Services List use this tag to show relationships between services and the health of their monitors. Services are represented as individual nodes on the Service Map.

The default behavior for new Datadog customers is for all Lambda functions to be grouped under the `aws.lambda` service, and represented as a single node on the Service map. Tag your functions by service to override this.

**Note:** For some Datadog customers, each Lambda function is treated as its own service. Add your own tag to override this, or reach out to Datadog Support if you would like to your account to adopt the new behavior.
