---
title: Serverless Glossary
kind: documentation
---

This glossary focuses on terms and concepts specific to serverless architectures, cloud platform providers, and Datadog Serverless monitoring. 

### General serverless concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Serverless          | A development model in which a cloud provider allocates backend resources on demand. This paradigm enables developers to build, run, and deploy applications and services without having to manage infrastructure.                              |
| Function          | In a serverless paradigm, a function is a self-contained application that runs in the cloud.                             |
| Cloud-based development          | A workflow where developers run their code in the cloud during the development process, instead of just on their local machines. Generally, building serverless applications requires cloud-based development.                                |
| Cold start          | The first time you invoke a particular function, it may take a longer time to run than in subsequent invocations. This phenomenon is known as a cold start, and may be caused by different factors: for instance, the cloud provider may need some time to provision underlying resources.                                |
| Event-driven architecture          | An architectural pattern in which events drive communication between decoupled services.                                 |
| Function-as-a-Service (FaaS)          | A subset of serverless functions. FaaS refers explicitly to event-driven paradigms.                               |

## Cloud-specific concepts

Datadog Serverless provides monitoring for serverless applications in multiple cloud environments. 

{{< tabs >}}
{{% tab "AWS Lambda" %}}

AWS Lambda is the FaaS platform provided by Amazon Web Services. See the [AWS Lambda documentation][1] for more details.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Amazon Resource Name (ARN)         | A naming convention for resources in AWS.                              |
| AWS CloudFormation          | An AWS service that uses templates to create and delete AWS resources. You can create and delete collections of resources as a unit; these collections are called "stacks."                               |
| AWS Identity and Access Management (IAM)         | An AWS service for managing users and user permissions in AWS.                       |
| AWS Lambda          | AWS's FaaS offering. Alternately, "a Lambda" is often used as a shorthand for "a Lambda function".                      |
| Step Functions          | Step Functions is a service provided by AWS which offers a way of orchestrating common workflows composed of multiple Lambda functions or cloud service events, without needing to write plumbing code to handle the workflow state and retry logic, etc.                     |
| Deployment package | Lambda function code can be deployed using a deployment package: either a ZIP archive that contains the function code and dependencies, or a container image that is compatible with the [Open Container Initiative (OCI)][2] specification. |
| Edge location         | An AWS data center used to perform service-specific operations.                      |
| Event | A JSON document that contains data for a Lambda function to process. |
| Lambda function | A serverless function in Lambda. Each function had code to process events and can be invoked to run. |
| Lambda layer | A ZIP archive that contains additional code—for example, libraries, a custom runtime, configuration files, or other dependencies. You can use Lambda layers to use libraries in your serverless functions without having to include these libraries in your deployment package. |
| Managed policy | An IAM policy that can be attached to multiple users, groups, and roles. These can be created and managed by AWS or by a customer.|
| Resource | An S3 bucket, EC2 instance, IAM user, or other entity that can be used in AWS. |
| Resource property| When including a resource in an AWS CloudFormation stack, each resource can have one or more associated properties. |
| Serverless Application Model (SAM)          | SAM is an Infrastructure as Code framework developed by AWS specifically focused on serverless applications.                                |



### Datadog serverless for AWS Lambda concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Enhanced Lambda metrics][3] | Enhanced Lambda metrics give you a view above and beyond the default Lambda metrics enabled with the AWS Lambda integration. These metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace, and are Datadog’s best practice for setting real-time monitors on your serverless application health.|
| [Lambda library][4]       | The Datadog Lambda library collects data (enhanced Lambda metrics, traces, etc.) from your Lambda function runtime. The Lambda library then submits this data either to logs (for the [Forwarder][5] to pick up) or to the [Lambda extension][6].                         |
| [Forwarder][5]          | An AWS Lambda function that parses and ships serverless monitoring data from CloudWatch logs to Datadog.                                |
| [Lambda extension][6]          | A lightweight Datadog Agent that runs within the Lambda execution environment and ships serverless monitoring data to Datadog with minimal performance overhead. |
| [Serverless CLI][7]         | The CLI enables instrumentation by modifying existing Lambda functions' configuration. It is the quickest way to get started with Datadog serverless monitoring.                             |
| [Serverless Insights][8] | Datadog automatically generates suggestions to resolve errors and performance problems and optimizes cost for your serverless applications.|
| [Serverless Macro][1] | The Datadog Serverless CloudFormation macro automatically configures ingestion of metrics, traces, and logs.|
| [Serverless Plugin][11] | Automatically enables instrumentation for your Python and Node.js applications. The plugin installs the [Lambda library][4] and [Lambda extension][6] as Lambda layers. |
| [Trace merging][9]        | Serverless trace merging is required to see a single, connected trace when you configure both Datadog’s tracing libraries (`dd-trace`) and AWS X-Ray tracing libraries in your application.                         |
| [Trace propagation][10]        | Additional instrumentation is sometimes required to see a single, connected trace in Node and Python serverless applications asynchronously triggering Lambda functions.                        |



[1]: https://docs.aws.amazon.com/lambda/index.html
[2]: https://opencontainers.org/
[3]: /serverless/enhanced_lambda_metrics
[4]: /serverless/libraries_integrations/library/
[5]: /serverless/libraries_integrations/forwarder/
[6]: /serverless/libraries_integrations/extension/
[7]: /serverless/libraries_integrations/cli
[8]: /serverless/troubleshooting/insights/
[9]: /serverless/distributed_tracing/serverless_trace_merging
[10]: /serverless/distributed_tracing/serverless_trace_propagation
{{% /tab %}}
{{% tab "Azure Functions" %}}

Azure Functions is the FaaS platform provided by Microsoft Azure. See the [Microsoft Azure Functions documentation][11] for more details.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Azure Functions          | Microsoft's FaaS offering.                          |
| Azure App Service          | A hosting service for building web applications, services, and APIs.                               |
| Azure Resource Manager (ARM) template          | A JSON document that defines the infrastructure and configuration for your project.                         |


### Datadog serverless for Azure Functions concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Azure App Service view][12]      | Datadog's offering for monitoring Azure App Services resources.                            |


[11]: https://docs.microsoft.com/en-us/azure/azure-functions/
[12]: https://app.datadoghq.com/functions
{{% /tab %}}
{{% tab "Google Cloud Functions" %}}

Cloud Functions is Google's serverless execution environment. See the [Google Cloud Functions documentation][13] for more details.

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cloud Functions          | Google's FaaS offering.                          |

[13]: https://cloud.google.com/functions/docs
{{% /tab %}}
{{< /tabs >}}
