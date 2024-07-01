---
title: Serverless Compatibility Requirements 
kind: documentation
code_lang: serverless
type: multi-code-lang
code_lang_weight: 90
---

Application Security provides serverless capability for the following platforms and libraries:

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## AWS Lambda
**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|Type               | Threat Detection  |  Software Composition Analysis (SCA)  | Code Security     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | {{< X >}}             |                               |                       |
| .NET      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | beta                          |                       |
| Python    | {{< X >}}             | beta                          |                       |
| Ruby      | {{< X >}}             |                               |                       |
| PHP       |                   |                           |                       |
| Go        | {{< X >}}             |                           |                       |

### Supported trigger types
Threat Detection supports HTTP requests as function input only, as that channel has the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- Function URL

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, fill out this <a href="https://forms.gle/gHrxGQMEnAobukfn7">form</a> to send feedback.</div>


### Additional language specific compatibility information

Node.js
: If you are bundling using webpack or esbuild, [follow the specific bundler instructions][4].

Python
: 

Java
: To fully instrument your serverless application with distributed tracing, your Java Lambda functions must use the Java 8 Corretto (`java8.al2`), Java 11 (`java11`) or Java 17 (`java17`) runtimes with at least 1024MB of memory.
: If you use the Datadog Lambda layers `dd-trace-java:4` (or older) and `Datadog-Extension:24` (or older), follow the instructions in [Upgrade Instrumentation for Java Lambda Functions][3].

Go
: 

.NET
: 


## Google Cloud Run

<div class="alert alert-info">Google Cloud Run support for Application Security serverless is in beta</a>.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|Type               | Threat Detection  |  Software Composition Analysis    | Code Security     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | beta          | beta                              |                       |
| .NET      | beta          | beta                                  |                       |
| Node      | beta          | beta                          |                       |
| Python    | beta          | beta                          |                       |
| Ruby      | beta          |  beta                             |                       |
| PHP       |             |                         |                       |
| Go        | beta          | beta                          |                       |


## Azure App Service

Only *web applications* are supported. Azure Functions are not supported.

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|Type       | OS                 |Threat Detection  |  Software Composition Analysis     | Code Security    |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| Java      | Windows, Linux     | {{< X >}}        | {{< X >}}                          | beta                                     |
| .NET      | Windows, Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | beta                                     |
| Python    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| Ruby      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| PHP       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /serverless/distributed_tracing/
[2]: /serverless/guide/datadog_forwarder_python
[3]: /serverless/guide/upgrade_java_instrumentation
[4]: /serverless/guide/serverless_tracing_and_bundlers/
[5]: /service_management/workflows/
[6]: /security/application_security/threats/inapp_waf_rules/
