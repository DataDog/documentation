---
further_reading:
- link: /security/cloud_security_management/setup/agentless_scanning
  tag: Documentación
  text: Configuración de Agentless Scanning
- link: /security/cloud_security_management/setup/agentless_scanning/deployment_methods
  tag: Documentación
  text: Implementación de Agentless Scanning
title: Solución de problemas de Agentless Scanning
---
## Descripción general {#overview}

Si experimenta problemas con Agentless Scanning, utilice las siguientes pautas de solución de problemas. Si necesita más asistencia, comuníquese con [Datadog Support][1].

## No hay resultados después de la implementación {#no-results-after-deployment}

Después de implementar Agentless Scanning, los resultados no aparecen de inmediato. Los primeros resultados suelen aparecer dentro de los 30 minutos posteriores a la implementación. En casos excepcionales, como problemas de configuración de IAM, puede tardar hasta dos horas.

Si no aparecen resultados después de dos horas:

- Verifique que la infraestructura del escáner se haya implementado. En la consola de su proveedor de nube, verifique que las instancias del escáner estén ejecutándose.
- Confirme que [Remote Configuration][3] esté habilitada en la clave de API que utilizó para configurar Agentless Scanning. Los escáneres reciben sus instrucciones de escaneo a través de Remote Configuration.
- Verifique que la integración en la nube esté configurada correctamente. En la página [{{< ui >}}Cloud Security Setup{{< /ui >}}][4], verifique que su cuenta de nube aparezca con Agentless Scanning habilitado.

## GCP: Error al crear el bucket de estado (storage.buckets.create 403) {#gcp-failed-to-create-state-bucket-storagebucketscreate-403}

Si la configuración de GCP Cloud Shell falla en **"{{< ui >}}Setting up Terraform state storage{{< /ui >}}"** con un error como:

```
Failed to create state bucket: datadog-agentless-tfstate-<project>
HTTPError 403: ... does not have storage.buckets.create access to the Google Cloud project.
```

la identidad que ejecuta el script no tiene permiso para crear o administrar buckets de GCS en el proyecto del escáner.

**Corrija (elija una):**

1. **Otorgue permisos de almacenamiento** en el proyecto del escáner al usuario (o cuenta de servicio) que ejecuta el script. Por ejemplo, otorgue **Storage Admin** (`roles/storage.admin`) en ese proyecto, o un rol personalizado que incluya `storage.buckets.create`, `storage.buckets.get` y `storage.buckets.update`.
2. **Reutilice un bucket existente:** Use un bucket que ya exista (créelo con una identidad que tenga permisos de almacenamiento si es necesario), luego establezca `TF_STATE_BUCKET` en ese nombre de bucket al ejecutar el script. El script usará el bucket existente para el estado de Terraform y no intentará crear uno.

## La implementación falla debido a restricciones de creación de VPC{#deployment-fails-due-to-vpc-creation-restrictions}

Si su organización usa Terraform y utiliza Políticas de Control de Servicio (SCP) que restringen la creación de Virtual Private Cloud (VPC), la implementación del escáner falla porque el escáner crea una nueva VPC de forma predeterminada.

Para solucionar esto, use la opción [**custom VPC**][8] durante la configuración para implementar el escáner en una VPC existente en lugar de crear una nueva.

## Las instancias de escáner aparecen como servidores vulnerables{#scanner-instances-appear-as-vulnerable-hosts}

Las instancias de escáner Agentless son instancias EC2 efímeras (o equivalentes) implementadas dentro de su cuenta de la nube para realizar escaneos. Debido a que ejecutan una imagen de sistema operativo estándar (por ejemplo, la versión más reciente de Ubuntu LTS), pueden aparecer en los hallazgos de vulnerabilidades relacionados con paquetes del SO.

Estos hallazgos reflejan vulnerabilidades identificadas en la imagen del SO subyacente y no indican una configuración incorrecta de su entorno.

Si lo desea, puede usar el filtrado basado en etiquetas en [{{< ui >}}Cloud Security Vulnerabilities Explorer{{< /ui >}}][2] para excluir las instancias de escáner administradas por Datadog de sus vistas de vulnerabilidades.

## Los servidores con Datadog Agent no se escanean{#hosts-with-the-datadog-agent-are-not-scanned}

Este es el comportamiento esperado. Agentless Scanning excluye a los servidores que tienen instalado Datadog Agent con [Cloud Security Vulnerabilities][6] habilitado. Esto evita el escaneo duplicado.

Los servidores que tienen instalado Datadog Agent **sin** las funciones de Vulnerabilities habilitadas siguen siendo escaneados por Agentless Scanning.

## Costos inesperados de escaneo entre regiones{#unexpected-cross-region-scanning-costs}

En algunas implementaciones, la transferencia de datos entre regiones puede contribuir a los costos de red del proveedor de la nube, dependiendo de cómo se distribuyan los escáneres y los recursos entre las regiones.

Para optimizar la localidad del tráfico, considere implementar escáneres en regiones que contengan una cantidad significativa de servidores. Como guía general, Datadog recomienda implementar un escáner en cada región que contenga más de 150 servidores.

Consulte [Deploying Agentless Scanning][7] para obtener orientación detallada sobre las topologías de implementación recomendadas.

## No disponible para GovCloud y FIPS {#unavailable-for-govcloud-and-fips}

Agentless Scanning no está disponible en GovCloud y no cumple con FIPS.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: https://app.datadoghq.com/security/csm/vm
[3]: /es/remote_configuration
[4]: https://app.datadoghq.com/security/configuration/csm/setup
[5]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods#enterprise-networking-considerations
[6]: /es/security/cloud_security_management/vulnerabilities
[7]: /es/security/cloud_security_management/setup/agentless_scanning/deployment_methods
[8]: https://github.com/DataDog/terraform-module-datadog-agentless-scanner/tree/main/examples/custom_vpc