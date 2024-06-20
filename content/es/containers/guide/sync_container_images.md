---
aliases:
- /es/agent/guide/sync_container_images
kind: guía
title: Sincroniza las imágenes de Datadog con un registro privado.
---

Datadog publica imágenes de contenedores en múltiples registros de contenedores públicos. Aunque esto resulta conveniente para muchos usuarios, es posible que algunas organizaciones prefieran utilizar un registro de contenedores privado. Esta guía te explica cómo sincronizar las imágenes de contenedores de Datadog con un registro privado.

{{% container-images-table %}}

## Sincronizar imágenes con tu registro privado

### Uso de Crane

[Crane][1] es una herramienta creada por Google para gestionar imágenes y registros de contenedores, que puede utilizarse para sincronizar imágenes entre diferentes registros de contenedores. Para obtener más información sobre Crane, consulta la [documentación de Crane][2].

#### Instalar Crane

Para obtener instrucciones detalladas sobre cómo instalar Crane, consulta el [README.md de Crane][1].

#### Copiar una imagen a otro registro utilizando Crane

Crane puede copiar imágenes entre distintos registros de contenedores, conservando el compendio de la imagen.

Esto significa que la copia retiene el mismo manifiesto y funciona con imágenes multi-plataforma.

Para copiar una imagen de un registro a otro, utiliza el comando `crane copy`.

```shell
crane copy <REGISTRY>/<SOURCE_IMAGE>:<IMAGE_TAG> <REGISTRY>/<DEST_IMAGE>:<IMAGE_TAG>
```

Puedes utilizar el marcador `-n` para evitar sobrescribir una etiqueta (tag) existente en el registro de destino.

Por ejemplo, para copiar las imágenes por defecto necesarias para el Datadog Operator desde Docker Hub a un registro privado:
```shell
AGENT_VERSION=<AGENT_IMAGE_TAG>
OPERATOR_VERSION=<OPERATOR_IMAGE_TAG>
REGISTRY=<REGISTRY_URL>
crane copy gcr.io/datadoghq/operator:$OPERATOR_VERSION $REGISTRY/operator:$OPERATOR_VERSION
crane copy gcr.io/datadoghq/agent:$AGENT_VERSION $REGISTRY/agent:$AGENT_VERSION
crane copy gcr.io/datadoghq/cluster-agent:$AGENT_VERSION $REGISTRY/cluster-agent:$AGENT_VERSION
```

## Para utilizar un registro privado

Una vez sincronizadas las imágenes, puedes utilizar esta guía para [cambiar el registro del contenedor][3] utilizado por tu entorno.

**Nota**: Si utilizas tu registro privado, es posible que necesites crear un secreto pull para extraer las imágenes.
Para obtener más información sobre cómo crear un secreto pull, consulta la [documentación de Kubernetes][4].


[1]: https://github.com/google/go-containerregistry/tree/main/cmd/crane
[2]: https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md
[3]: https://docs.datadoghq.com/es/containers/guide/changing_container_registry
[4]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials