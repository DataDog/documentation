---
aliases:
- /es/security/vulnerabilities/troubleshooting/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: Documentación
  text: Configuración de las vulnerabilidades de imágenes de contenedor
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configuración de vulnerabilidades de host
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejorar el flujo de trabajo de solución de problemas con imágenes de contenedor
    en Datadog Container Monitoring
title: Solución de problemas de Cloud Security Management Vulnerabilities
---

## Información general

Si tienes problemas con Cloud Security Management (CSM) Vulnerabilities, utiliza las siguientes directrices de solucionar problemas. Si necesitas más ayuda, ponte en contacto con [el equipo de soporte de Datadog][1].

## Mensajes de error

### Requisitos de espacio en disco

Asegúrate de que tu espacio libre en disco es igual al tamaño de tu imagen de contenedor más grande. Este espacio es necesario para que el Datadog Agent analice la imagen de contenedor en busca de vulnerabilidades (1 GB por defecto).

El error resultante aparece como:
```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

Solución:

- Aumenta el espacio disponible en disco a 1 GB como mínimo. Si tus imágenes superan 1 GB, aumenta el espacio en disco en consecuencia.
- Si todas tus imágenes tienen un tamaño inferior a 1 GB, puedes disminuir el espacio en disco solicitado por defecto al Agent con la variable de entorno: `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` (valor por defecto 1 GB).

### Capas de imagen de contenedor sin comprimir

El escaneo SBOM solo funciona con capas de imagen de contenedor sin comprimir. Ciertas distribuciones de Kubernetes (como AWS EKS, minikube y kind) configuran su tiempo de ejecución de contenedor para descartar las capas sin comprimir, haciendo que el escaneo falle.

El error resultante aparece como:

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

La solución para este problema es establecer la opción de configuración `discard_unpacked_layers=false` en el archivo de configuración de contenedor.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary