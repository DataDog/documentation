---
aliases:
- /ko/Agent/guide/sync_container_images
title: Datadog 이미지를 비공개 레지스트리와 동기화하기
---

Datadog는 여러 개의 공개 컨테이너 레지스트리에 컨테이너 이미지를 게시합니다. 이는 많은 사용자에게 편의를 제공하지만 일부 조직은 비공개 컨테이너 레지스트리를 사용하길 원할 수 있습니다. 이 가이드에서는 Datadog 컨테이너 이미지를 비공개 레지스트리에 동기화하는 방법을 설명합니다.

{{% container-images-table %}}

## 비공개 레지스트리에 이미지 동기화

### Crane 사용하기

[Crane][1]은 컨테이너 이미지 및 레지스트리를 관리하기 위해 Google에서 만든 도구입니다. 서로 다른 컨테이너 레지스트리 간 이미지를 동기화하는 데 사용할 수 있습니다. Crane에 대한 자세한 내용은 [Crane 설명서][2]를 참조하세요.

#### Crane 설치

Crane 설치 방법과 관련한 자세한 지침은 [Crane README.md][1]를 참조하세요.

#### Crane을 사용하여 이미지를 다른 레지스트리로 복사하기

Crane은 이미지의 다이제스트를 보존하면서 서로 다른 컨테이너 레지스트리 간에 이미지를 복사할 수 있습니다.

즉, 사본은 동일한 매니페스트를 유지하며 멀티플랫폼의 이미지와 함께 사용할 수 있습니다.

한 레지스트리에서 다른 레지스트리로 이미지를 복사하려면 `crane copy` 명령을 사용합니다.

```shell
crane copy <REGISTRY>/<SOURCE_IMAGE>:<IMAGE_TAG> <REGISTRY>/<DEST_IMAGE>:<IMAGE_TAG>
```

`-n` 플래그를 사용하여 대상 레지스트리의 기존 태그를 덮어쓰지 않도록 할 수 있습니다.

예를 들어 Docker 허브에서 Datadog Operator에 필요한 기본 이미지를 비공개 레지스트리로 복사할 수 있습니다.
```shell
AGENT_VERSION=<AGENT_IMAGE_TAG>
OPERATOR_VERSION=<OPERATOR_IMAGE_TAG>
REGISTRY=<REGISTRY_URL>
crane copy gcr.io/datadoghq/operator:$OPERATOR_VERSION $REGISTRY/operator:$OPERATOR_VERSION
crane copy gcr.io/datadoghq/agent:$AGENT_VERSION $REGISTRY/agent:$AGENT_VERSION
crane copy gcr.io/datadoghq/cluster-agent:$AGENT_VERSION $REGISTRY/cluster-agent:$AGENT_VERSION
```

## 비공개 레지스트리를 사용하는 방법

이미지를 동기화하면 이 가이드를 사용하여 환경에서 사용하는 [컨테이너 레지스트리를 변경][3]할 수 있습니다.

**참고**: 비공개 레지스트리를 사용하는 경우 이미지를 가져오려면 풀 시크릿(Pull Secret)을 생성해야 할 수 있습니다.
풀 시크릿을 생성하는 방법에 대한 자세한 내용은 [Kubernetes 설명서][4]를 참조하세요.


[1]: https://github.com/google/go-containerregistry/tree/main/cmd/crane
[2]: https://github.com/google/go-containerregistry/blob/main/cmd/crane/doc/crane.md
[3]: https://docs.datadoghq.com/ko/containers/guide/changing_container_registry
[4]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials