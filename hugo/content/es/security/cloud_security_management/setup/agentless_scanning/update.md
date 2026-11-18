---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning/enable
  tag: Documentación
  text: Habilitación de Agentless Scanning
- link: /security/cloud_security_management/agentless_scanning
  tag: Documentación
  text: Escaneo Agentless de Cloud Security
title: Actualización de Agentless Scanning
---
Las instancias del escáner se reemplazan cada 24 horas e instalan la última versión de parche de la versión del escáner fijada en su despliegue. Actualice su implementación para obtener nuevas versiones del escáner, cambios en los permisos y correcciones de infraestructura.

## Actualizar la pila de CloudFormation {#update-the-cloudformation-stack}

Datadog recomienda actualizar la pila de CloudFormation periódicamente para que pueda acceder a nuevas funciones y correcciones de errores a medida que se lanzan.

1. Inicie sesión en su consola de AWS y vaya a la página CloudFormation Stacks.
1. Expanda la pila principal {{< ui >}}DatadogIntegration{{< /ui >}} para revelar sus subpilas anidadas. Seleccione la subpila {{< ui >}}DatadogIntegration-DatadogAgentlessScanning-...{{< /ui >}}, haga clic en {{< ui >}}Update{{< /ui >}} y, luego, haga clic en {{< ui >}}Update nested stack{{< /ui >}}.
1. Haga clic en {{< ui >}}Replace existing template{{< /ui >}}.
1. En la siguiente URL de S3: `https://datadog-cloudformation-template-quickstart.s3.amazonaws.com/aws/<VERSION>/datadog_agentless_scanning.yaml`, reemplace `<VERSION>` con la versión que se encuentra en [aws_quickstart/version.txt][1]. Pegue esa URL en el campo {{< ui >}}Amazon S3 URL{{< /ui >}}.
1. Haga clic en {{< ui >}}Next{{< /ui >}} para avanzar por las siguientes páginas sin modificarlas y, luego, envíe el formulario.

## Actualizar el módulo de Terraform {#update-the-terraform-module}

Actualice la referencia `source` de los módulos de Agentless Scanner a la versión más reciente. Puede encontrar la versión más reciente en [GitHub Releases][2].

Para ver ejemplos de uso, consulte el [repositorio de GitHub][3].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/cloudformation-template/blob/master/aws_quickstart/version.txt
[2]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/releases
[3]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples