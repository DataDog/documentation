---
aliases:
- /fr/agent/guide/sync_container_images
description: Synchroniser les images de conteneurs Datadog depuis les registres publics
  vers votre registre privé à l'aide de Crane ou d'outils similaires
title: Synchroniser les images Datadog avec un registre privé
---

Datadog publie des images de conteneurs dans plusieurs registres de conteneurs publics. Bien que cela soit pratique pour de nombreux utilisateurs, certaines organisations peuvent souhaiter utiliser un registre de conteneurs privé. Ce guide explique comment synchroniser les images de conteneurs Datadog vers un registre privé.

{{% container-images-table %}}

## Synchroniser les images vers votre registre privé

### Utiliser Crane

[Crane][1] est un outil créé par Google pour gérer les images et les registres de conteneurs et peut être utilisé pour synchroniser les images entre différents registres de conteneurs. Pour en savoir plus sur Crane, consultez la [documentation Crane][2].

#### Installer Crane

Pour obtenir des instructions détaillées sur l'installation de Crane, consultez le [fichier README.md de Crane][1].

#### Copier une image vers un autre registre à l'aide de Crane

Crane peut copier des images entre différents registres de conteneurs tout en préservant le condensé de l'image.

Cela signifie que la copie conserve le même manifeste et fonctionne avec les images multiplateformes.

Pour copier une image d'un registre vers un autre, utiliser la commande `crane copy`.

```shell
crane copy <REGISTRY>/<SOURCE_IMAGE>:<IMAGE_TAG> <REGISTRY>/<DEST_IMAGE>:<IMAGE_TAG>
```

Vous pouvez utiliser le flag `-n` pour éviter d'écraser un tag existant dans le registre de destination.

Par exemple, pour copier les images par défaut nécessaires à l'opérateur Datadog depuis Docker Hub vers un registre privé :
```shell
AGENT_VERSION=<AGENT_IMAGE_TAG>
OPERATOR_VERSION=<OPERATOR_IMAGE_TAG>
REGISTRY=<REGISTRY_URL>
crane copy gcr.io/datadoghq/operator:$OPERATOR_VERSION $REGISTRY/operator:$OPERATOR_VERSION
crane copy gcr.io/datadoghq/agent:$AGENT_VERSION $REGISTRY/agent:$AGENT_VERSION
crane copy gcr.io/datadoghq/cluster-agent:$AGENT_VERSION $REGISTRY/cluster-agent:$AGENT_VERSION
```

## Utiliser un registre privé

Une fois que vous avez synchronisé les images, vous pouvez utiliser ce guide pour [modifier le registre de conteneurs][3] utilisé par votre environnement.

**Remarque** : si vous utilisez votre registre privé, vous devrez peut-être créer un pull secret pour pouvoir extraire les images.
Pour en savoir plus sur la création d'un pull secret, consultez la [documentation Kubernetes][4].


[1]: https://github.com/google/go-containerregistry/tree/main/cmd/crane
[2]: https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md
[3]: https://docs.datadoghq.com/fr/containers/guide/changing_container_registry
[4]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials