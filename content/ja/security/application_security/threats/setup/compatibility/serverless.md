---
code_lang: serverless
code_lang_weight: 90
title: サーバーレス互換性要件
type: multi-code-lang
---

Application Security provides serverless capability for the following platforms and libraries:

{{< partial name="security-platform/appsec-libraries-serverless.html" >}}</br>

## AWS Lambda
**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|タイプ               | Threat Detection  |  Software Composition Analysis (SCA)  | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | {{< X >}}             |                               |                       |
| .NET      | {{< X >}}             |                                   |                       |
| Node      | {{< X >}}             | Preview                           |                       |
| Python    | {{< X >}}             | Preview                           |                       |
| Ruby      | {{< X >}}             |                               |                       |
| PHP       |                   |                           |                       |
| Go        | {{< X >}}             |                           |                       |

### 対応するトリガータイプ
Threat Detection supports HTTP requests as function input only, as that channel has the highest likelihood of attackers exploiting a serverless application. HTTP requests typically come from AWS services such as:
- Application Load Balancer (ALB)
- API Gateway v1 (Rest API)
- API Gateway v2 (HTTP API)
- 関数 URL

<div class="alert alert-info">If you would like to see support added for any of the unsupported capabilities, fill out this <a href="https://forms.gle/gHrxGQMEnAobukfn7">form</a> to send feedback.</div>


### Additional language specific compatibility information

Node.js
: webpack や esbuild を使ってバンドルしている場合は、[特定のバンドラーの指示に従ってください][4]。

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

<div class="alert alert-info">Google Cloud Run support for Application Security serverless is in Preview</a>.</div>

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|タイプ               | Threat Detection  |  Software Composition Analysis    | コードセキュリティ     |
| ---       |   ---                     |           ----                    |           ----                            |
| Java          | Preview           | Preview                               |                       |
| .NET      | Preview           | Preview                                   |                       |
| Node      | Preview           | Preview                           |                       |
| Python    | Preview           | Preview                           |                       |
| Ruby      | Preview           |  Preview                              |                       |
| PHP       |             |                         |                       |
| Go        | Preview           | Preview                           |                       |


## Azure App Service

Only *web applications* are supported. Azure Functions are not supported.

**Note**: Threat Protection through Remote Configuration is not supported. Use [Workflows][5] to block IPs in your [WAF][6].

|タイプ       | OS                 |Threat Detection  |  Software Composition Analysis     | コードセキュリティ    |
|-----------|--------------------|------------------|------------------------------------|------------------------------------------|
| Java      | Windows、Linux     | {{< X >}}        | {{< X >}}                          | Preview                                      |
| .NET      | Windows、Linux     | {{< X >}}        | {{< X >}}                          |                                          |
| Node      | Linux              | {{< X >}}        | {{< X >}}                          | Preview                                      |
| Python    | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| Ruby      | Linux              | {{< X >}}        | {{< X >}}                          |                                          |
| PHP       | Linux              |                  | {{< X >}}                          |                                          |


[1]: /ja/serverless/distributed_tracing/
[2]: /ja/serverless/guide/datadog_forwarder_python
[3]: /ja/serverless/guide/upgrade_java_instrumentation
[4]: /ja/serverless/guide/serverless_tracing_and_bundlers/
[5]: /ja/service_management/workflows/
[6]: /ja/security/application_security/threats/inapp_waf_rules/