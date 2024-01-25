---
title: Compatibility Requirements
kind: documentation
type: multi-code-lang
further_reading:
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Application Security Management"
- link: "/security/application_security/how-appsec-works/"
  tag: "Documentation"
  text: "How Application Security Management Works in Datadog"
---

The following ASM capabilities are supported relative to each language's tracing library:


| ASM capability                   | Java | .NET | Node.js | Python | Go | Ruby | PHP |
| -------------------------------- | ----------------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|----------------------------|
| Threat Detection| 1.8.0 | 2.23.0 | 3.13.1 | 1.9.0   | 1.47.0  | 1.9.0| 0.84.0 |
| Threat Protection | 1.9.0 | 2.26.0 | 3.19.0| 1.10.0  |  v1.50.0|  1.11.0    | 0.86.0   |
| Customize response to blocked requests | 1.11.0 | 2.27.0 | 4.1.0| 1.19.0  |  v1.53.0|  1.15.0    | 0.86.0   |
| Vulnerability Management for Open Source Software (OSS)  | 1.1.4 | 2.16.0 |2.23.0 for Node.js 12+, or 3.10.0 for Node.js 14+ | 1.5.0 | 1.49.0 | 1.11.0 | 0.90.0 |
| Vulnerability Management for Code-level (beta)   |1.15.0| 2.42.0 | 2.32.0 for NodeJS 12+, or 3.19.0 for NodeJS 14+ | private beta | not supported<br/>| not supported| not supported|
| Automatic user activity event tracking | 1.20.0 | 2.32.0 | 2.38.0 for NodeJS 12+, or 3.25.0 for NodeJS 14+, or 4.4.0 for NodeJS 16+ | 1.17.0 | not supported | 1.14.0 | 0.89.0 |

### Supported deployment types
|Type           | Threat Detection support |  Vulnerability Management for OSS support |
| ---           |   ---             |           ----            |
| Docker        | Java </br> .NET </br> Go</br> Ruby </br> PHP</br> Node.js</br> Python|    Java </br> .NET </br>  Go </br> PHP</br>Node.js</br>Python  |
| Kubernetes    | Java </br> .NET</br>Go</br>Ruby</br> PHP</br>Node.js</br>Python |  Java </br> .NET</br>Go </br>PHP</br>Node.js </br>Python|
| Amazon ECS    | Java </br>.NET </br> Go</br>Ruby</br>PHP </br>Node.js</br>Python |  Java </br> .NET</br>Go</br> PHP</br>Node.js</br>Python |
| AWS Fargate   | Java </br> .NET </br>Go</br> Ruby</br>Node.js </br>Python|  Java </br> .NET</br> Go </br>Node.js</br>Python |
| AWS Lambda    | Java </br> .NET </br> Go</br>Node.js</br>Python |  Node.js (beta)                      |
| Azure App Service | Java </br> .NET</br> </br>  | Java </br> .NET  </br>        |


| Type             | Threat Detection support                                       | Vulnerability Management for OSS support                        |
| ---              | :---                                                         | :---                                                            |
| Docker           | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} {{< img src="/integrations_logos/ruby.png" alt="Ruby" style="width:20%;">}}| {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} |
| Kubernetes       | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} </br> | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} |
| Amazon ECS       | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} </br>| {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} |
| AWS Fargate      | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}}</br> | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} |
| AWS Lambda       | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}}</br>| Node.js (beta)                                                  |
| Azure App Service | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}}</br>  | {{< img src="/integrations_logos/java.png" alt="Java" style="width:20%;">}} |



**Note**: Azure App Service is supported for web applications only. ASM doesn't support Azure Functions.

Select your application language for details about framework compatibility and feature support.

{{< partial name="security-platform/appsec-languages.html" >}}

<br>

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

