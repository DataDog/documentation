---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentación
  text: Activación de de Agentless Scanning
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Cloud Security Agentless Scanning
title: Actualización de Agentless Scanning
---

## Actualizar el stack tecnológico de CloudFormation

Datadog recomienda actualizar el stack tecnológico de CloudFormation con regularidad para poder acceder a las nuevas funciones y correcciones de errores a medida que se publiquen.

1. Inicia sesión en tu consola de AWS y ve a la página de Stacks tecnológicos de CloudFormation.
1. Expande el stack tecnológico principal **DatadogIntegration** para mostrar tus substacks tecnológicos anidados. Selecciona el substack tecnológico **DatadogIntegration-DatadogAgentlessScanning-...**, haz clic en **Update** (Actualizar) y, a continuación, en **Update nested stack** (Actualizar stack tecnológico anidado).
1. Haz clic en **Replace existing template** (Reemplazar plantilla existente).
1. En la siguiente URL de S3: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, sustituye `<VERSION>` por la versión que se encuentra en [aws_quickstart/version.txt][1]. Pega esa URL en el campo **Amazon S3 URL** (URL de Amazon S3).
1. Pulsa **Next** (Siguiente) para avanzar por las siguientes páginas sin modificarlas y, a continuación, envía el formulario.

## Actualizar el módulo de Terraform

Actualiza la referencia `source` para los módulos del escáner sin agent a la última versión. Puedes encontrar la última versión en [GitHub Releases][2].

Para ver ejemplos de uso, consulta el [repositorio de GitHub][3].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples