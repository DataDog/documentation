---
aliases:
- /es/security_platform/application_security/getting_started/nodejs
- /es/security/application_security/getting_started/nodejs
- /es/security/application_security/enabling/tracing_libraries/threat_detection/nodejs/
- /es/security/application_security/threats/setup/threat_detection/nodejs
- /es/security/application_security/threats_detection/nodejs
- /es/security/application_security/setup/aws/fargate/nodejs
further_reading:
- link: /security/application_security/add-user-info/
  tag: Documentación
  text: Añadir información del usuario a trazas (traces)
- link: https://github.com/DataDog/dd-trace-js
  tag: Código fuente
  text: Código fuente de la biblioteca Node.js de Datadog
- link: /security/default_rules/?category=cat-application-security
  tag: Documentación
  text: Reglas de protección de aplicaciones y API predefinidas
- link: /security/application_security/troubleshooting
  tag: Documentación
  text: Solucionar problemas con la protección de aplicaciones y API
title: Activar App and API Protection para Node.js
---
{{< partial name="app_and_api_protection/callout.html" >}}

{{% aap/aap_and_api_protection_nodejs_overview showSetup="false" %}}

## Entornos

### Hosts
{{< appsec-integrations >}}
{{< appsec-integration name="Linux" avatar="linux" link="./linux" >}}
{{< appsec-integration name="macOS" avatar="apple" link="./macos" >}}
{{< appsec-integration name="Windows" avatar="windows" link="./windows" >}}
{{< /appsec-integrations >}}

### Plataformas de nube y contenedores
{{< appsec-integrations >}}
{{< appsec-integration name="Docker" avatar="docker" link="./docker" >}}
{{< appsec-integration name="Kubernetes" avatar="kubernetes" link="./kubernetes" >}}
{{< /appsec-integrations >}}

### AWS
{{< appsec-integrations >}}
{{< appsec-integration name="AWS Fargate" avatar="aws-fargate" link="./aws-fargate" >}}
{{< /appsec-integrations >}}

## Recursos adicionales

- [Guía de resolución de problemas](./troubleshooting)
- [Información de compatibilidad(./compatibility)