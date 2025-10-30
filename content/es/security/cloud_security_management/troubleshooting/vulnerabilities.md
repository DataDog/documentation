---
aliases:
- /es/security/vulnerabilities/troubleshooting/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentación
  text: Activar la recopilación de SBOM en Vulnerabilidades de Cloud Security
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configuración de vulnerabilidades de host
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejorar el flujo de trabajo de solución de problemas con imágenes de contenedor
    en Datadog Container Monitoring
title: Solucionar problemas de Vulnerabilidades de Cloud Security
---

## Información general

Si tienes problemas con vulnerabilidades de Cloud Security, utiliza las siguientes directrices para solucionar problemas. Si necesitas más ayuda, ponte en contacto con [Asistencia técnica de Datadog][1].

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

La solución a este problema es configurar la opción configuración:
- Para containerd: configura `discard_unpacked_layers=false` en el archivo de configuración de containerd.
- Para Helm: configura `datadog.sbom.containerImage.uncompressedLayersSupport: true` en tu archivo `values.yaml`.
- Para el operador Datadog: configura `features.sbom.containerImage.uncompressedLayersSupport` en `true` en tu Datadog Agent CRD.

### Transmisión de imágenes GKE

Datadog no admite la transmisión de imágenes con Google Kubernetes Engine (GKE). Si tienes activada esa opción en GKE, tu Agent no podrá generar SBOM de contenedor.

El error resultante aparece como:

```sh
unable to mount containerd image, err: unable to scan image named: {image-name}, image is not unpacked
```

La solución para este problema es desactivar la transmisión de imágenes en GKE. Para obtener más información, consulta la sección [Desactivar la transmisión de imágenes][5] de la documentación de GKE.

## Desactivar las vulnerabilidades de Cloud Security

En el archivo `datadog-values.yaml` del Agent, configura los siguientes parámetros de configuración en `false`:

```
# datadog-values.yaml file
datadog:
  sbom:
    containerImage:
      enabled: false

      # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
      # uncompressedLayersSupport: true

    # Enables Host Vulnerability Management
    host:
      enabled: false

    # Enables Container Vulnerability Management
    # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
      containerImageCollection:
        enabled: false
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/summary
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable