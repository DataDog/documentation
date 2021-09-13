---
title: Datadog Serverless for AWS Lambda Glossary
kind: documentation
---

### General serverless concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Serverless          | Serverless is a model that involves a cloud provider allocating backend resources on-demand. This paradigm enables you to build, run, and deploy applications and services without having to manage infrastructure.                              |
| Function          | In a serverless paradigm, a function is a self-contained application.                                 |
| Cloud-based development          | A workflow where developers run their code in the cloud during the development process, instead of just on their local machines. Generally, building serverless applications requires cloud-based development.                                |
| Cold start          | The first time you invoke a cloud function, it may take a longer time to complete than subsequent invocations. This phenomenon is called a cold start, and may be caused by factors such as the cloud provider needing time to provision underlying resources.                                 |
| Event-driven architecture          | An architectural pattern whereby events are used to communicate between decoupled services.                                 |
| FaaS          | Function-as-a-Service is a mechanism for running custom code in the cloud without first needing to provision a dedicated server to host the code. Implementations of FaaS include AWS Lambda, Google Cloud Functions and Microsoft Azure Functions.                                |
| Per usage pricing         | Per usage pricing is when a cloud customer is charged based on how many times they used a specific service and not based on a fixed time period                              |

### AWS Lambda concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lambda          | AWS's FaaS offering. AWS Lambdas are small snippets of code that run when ‘triggered’ without any need to configure a server to host the code.                        |
| Lambda Layer | A layer is a ZIP archive that contains libraries, a custom runtime, or other dependencies. With layers, you can use libraries in your function without needing to include them in your deployment package.|
| ARN         | An Amazon Resource Name (ARN) is a file naming convention used to identify a particular resource in the Amazon Web Services (AWS) public cloud.                                 |
| Serverless Application Model (SAM)          | SAM is an Infrastructure as Code framework developed by AWS specifically focused on serverless applications.                                |
| Step Functions          | Step Functions is a service provided by AWS which offers a way of orchestrating common workflows composed of multiple Lambda functions or cloud service events, without needing to write plumbing code to handle the workflow state and retry logic, etc.                     |
| CloudFormation          | CloudFormation uses templates to represent your stack, which are written in the Serverless Application Model (SAM) format.                              |
| Edge location         | Edge locations are AWS data centers designed to deliver services with the lowest latency possible.                       |

### Datadog serverless for AWS Lambda concepts

| Concept                         | Description                                                                                                                                                                                                          |
|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Enhanced Lambda metrics | Enhanced Lambda metrics give you a view above and beyond the default Lambda metrics enabled with the AWS Lambda integration. These metrics are distinguished by being in the `aws.lambda.enhanced.*` namespace, and are Datadog’s best practice for setting real-time monitors on your serverless application health.|
| Lambda library       | The Datadog Lambda Library is responsible for generating real-time enhanced Lambda metrics, submitting custom metrics, and enabling APM and Distributed Tracing for Node.js, Python, and Ruby                          |
| Forwarder          | The Datadog Forwarder is an AWS Lambda function that ships logs, custom metrics, and traces from your environment to Datadog.                                |
| Lambda extension          | The Datadog Lambda extension pushes real-time enhanced Lambda metrics, custom metrics, and traces from the Datadog Lambda Library to Datadog. It also forwards logs from your Lambda function to Datadog.                              |
| Datadog Serverless CLI         | The CLI enables instrumentation by modifying existing Lambda functions' configuration. It is the quickest way to get started with Datadog serverless monitoring.                             |
| Trace merging        | Serverless trace merging is required to see a single, connected trace when you configure both Datadog’s tracing libraries (`dd-trace`) and AWS X-Ray tracing libraries in your application.                         |
| Trace propagation        | Additional instrumentation is sometimes required to see a single, connected trace in Node and Python serverless applications asynchronously triggering Lambda functions. (TK)                           |
