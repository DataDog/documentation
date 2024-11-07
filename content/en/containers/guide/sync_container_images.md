---
title: Synchronize Datadog's images with a private registry
aliases:
 - /agent/guide/sync_container_images
---

Datadog publishes container images in multiple public container registries. While this is convenient for many users, some organizations may want to use a private container registry. This guide explains how to synchronize Datadog's container images to a private registry.

{{% container-images-table %}}

## Synchronize images to your private registry

### Using Crane

[Crane][1] is a tool made by Google to manage container images and registries and can be used to synchronize images between different container registries. For more information about Crane, see the [Crane documentation][2].

#### Install Crane

For detailed instructions on how to install Crane, see the [Crane README.md][1].

#### Copy an image to another registry using Crane

Crane can copy images between different container registries while preserving the image's digest.

This means that the copy keeps the same manifest and works with multi-platform images.

To copy an image from one registry to another, use the `crane copy` command.

```shell
crane copy <REGISTRY>/<SOURCE_IMAGE>:<IMAGE_TAG> <REGISTRY>/<DEST_IMAGE>:<IMAGE_TAG>
```

You can use the `-n` flag to avoid overwriting an existing tag in the destination registry.

For example, to copy the default images needed for the Datadog Operator from Docker Hub to a private registry:
```shell
AGENT_VERSION=<AGENT_IMAGE_TAG>
OPERATOR_VERSION=<OPERATOR_IMAGE_TAG>
REGISTRY=<REGISTRY_URL>
crane copy gcr.io/datadoghq/operator:$OPERATOR_VERSION $REGISTRY/operator:$OPERATOR_VERSION
crane copy gcr.io/datadoghq/agent:$AGENT_VERSION $REGISTRY/agent:$AGENT_VERSION
crane copy gcr.io/datadoghq/cluster-agent:$AGENT_VERSION $REGISTRY/cluster-agent:$AGENT_VERSION
```

## How to use a private registry

Once you've synchronized the images, you can use this guide to [change the container registry][3] used by your environment.

**Note**: If using your private registry, you might need to create a pull secret to be able the pull the images.
For more information about creating a pull secret, see the [Kubernetes documentation][4].


[1]: https://github.com/google/go-containerregistry/tree/main/cmd/crane
[2]: https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md
[3]: https://docs.datadoghq.com/containers/guide/changing_container_registry
[4]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
