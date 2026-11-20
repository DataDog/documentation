---
aliases:
- /es/security/vulnerabilities/troubleshooting/
further_reading:
- link: /infrastructure/containers/container_images/#enable-sbom-collection
  tag: Documentación
  text: Habilitar la recopilación de SBOM en Cloud Security Vulnerabilities
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: Documentación
  text: Configuración de vulnerabilidades de servidor
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: Blog
  text: Mejore su flujo de trabajo de solución de problemas con Container Images en
    Datadog Container Monitoring
title: Solución de problemas de Cloud Security Vulnerabilities
---
## Descripción general {#overview}

Si experimenta problemas con Cloud Security Vulnerabilities, utilice las siguientes pautas de solución de problemas. Si necesita más asistencia, comuníquese con [soporte de Datadog][1].

## Mensajes de error {#error-messages}

### Requisitos de espacio en disco {#disk-space-requirements}

Asegúrese de que su espacio libre en disco sea igual al tamaño de su imagen de contenedor más grande. Este espacio es necesario para que Datadog Agent escanee la imagen del contenedor en busca de vulnerabilidades (1 GB de forma predeterminada).

El error resultante aparece como:

```sh
Error: failed to check current disk usage: not enough disk space to safely collect sbom, 192108482560 available, 1073741824000 required
```

Solución alternativa: 

- Aumente el espacio en disco disponible a al menos 1 GB. Si sus imágenes son mayores de 1 GB, aumente su espacio en disco en consecuencia.
- Si todas sus imágenes son menores de 1 GB, puede disminuir el espacio en disco que solicita Agent de forma predeterminada con la variable de entorno: `DD_SBOM_CONTAINER_IMAGE_MIN_AVAILABLE_DISK` (valor predeterminado: 1 GB).

### Capas de imagen de contenedor sin comprimir {#uncompressed-container-image-layers}

El escaneo de SBOM solo funciona con capas de imagen de contenedor sin comprimir. Ciertas distribuciones de Kubernetes (como AWS EKS, minikube y kind) configuran su entorno de ejecución de contenedores para descartar las capas sin comprimir, lo que provoca que el escaneo falle.

El error resultante aparece como:

```sh
ERROR | (pkg/workloadmeta/collectors/internal/containerd/image_sbom_trivy.go:80 in func2) | Failed to generate SBOM for containerd image: unable to marshal report to sbom format, err: analyze error: failed to analyze layer:  : unable to get uncompressed layer
```

La solución alternativa para este problema es establecer la opción de configuración:
- Para containerd: establezca `discard_unpacked_layers=false` en el archivo de configuración de containerd.
- Para Helm: establezca `datadog.sbom.containerImage.uncompressedLayersSupport: true` en su archivo `values.yaml`.
- Para Datadog Operator: establezca `features.sbom.containerImage.uncompressedLayersSupport` en `true` en su CRD de DatadogAgent.

### Transmisión de imágenes de GKE {#gke-image-streaming}

Datadog no admite la transmisión de imágenes con Google Kubernetes Engine (GKE). Si tiene esa opción habilitada en GKE, Agent no puede generar SBOM de contenedores.

El error resultante aparece como:

```sh
unable to mount containerd image, err: unable to scan image named: {image-name}, image is not unpacked
```

La solución alternativa para este problema es deshabilitar la transmisión de imágenes en GKE. Para obtener más información, consulte la sección [Disable Image streaming][5] de la documentación de GKE.

## Deshabilitar Cloud Security Vulnerabilities {#disable-cloud-security-vulnerabilities}

En el archivo `datadog-values.yaml` de Agent, establezca las siguientes opciones de configuración en `false`:

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

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/
[2]: /es/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/metric/catalog
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable