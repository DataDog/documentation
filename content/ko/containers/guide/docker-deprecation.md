---
aliases:
- /ko/agent/guide/docker-deprecation
title: 쿠버네티스(Kubernetes)의 도커(Docker) 지원 중단
---

쿠버네티스가 버전 1.20부터 런타임 도커 지원을 중단합니다. 일부 클라우드 제공업체 역시 이미지에서 도커 지원을 중단합니다.

- AKS 1.19는 [도커 지원을 중단하며 기본 설정으로 containerd를 사용합니다][1].

- GKE 1.19는 [도커 지원을 중단하고 새 노드에서 기본 설정으로 containerd를 사용합니다][2].

- EKS 1.22는 [도커 지원을 중단하며 기본 설정으로 containerd를 사용합니다][3].

- OKE 1.20은 [도커 지원을 중단하며 기본 설정으로 CRI-O를 사용합니다][3].

도커를 지원 중단한 버전의 쿠버네티스를 사용하는 경우 도커 소켓이 존재하지 않거나, 쿠버네티스를 통해 실행하는 컨테이너에 대한 정보가 없어 도커 점검이 작동하지 않습니다. 도커 런타임에 대한 자세한 내용은 [kubernetes.io][5]에서 확인할 수 있습니다. 즉, 사용하고 있는 컨테이너의 런타임을 바탕으로 [containerd][6] 또는 [CRI-O][7] 점검을 활성화해야 합니다. 새로운 컨테이너 런타임에서 수집된 컨테이너 메트릭은 도커 메트릭을 대체합니다.

Datadog Agent 버전 7.27 이상을 사용하고 있다면 실행 환경을 Agent에서 자동 탐지하므로 설정을 변경할 필요가 없습니다.

**Agent v7.27 이하의 버전을 사용한다면 컨테이너 런타임 소켓 경로를 지정해야 합니다.**

**참조**: 메트릭 이름이 변경되므로(예: `docker.*`에서 `containerd.*`로), 기존 모니터링, 대시보드, SLO를 업데이트해야 할 수 있습니다.

{{< tabs >}}
{{% tab "Helm" %}}
[Helm 파트][1]에서 `datadog.criSocketPath` 파라미터를 사용해 컨테이너 런타임 소켓 경로를 설정하세요.

예시:

```
criSocketPath:  /var/run/containerd/containerd.sock
```

[1]: https://github.com/DataDog/helm-charts/blob/d8817b4401b75b1a064481da989c451633249ea9/charts/datadog/values.yaml#L262-L263
{{% /tab %}}
{{% tab "DaemonSet" %}}

도커 소켓 레퍼런스와 도커 소켓 볼륨 마운트를 전부 제거하세요.

환경 변수 `DD_CRI_SOCKET_PATH`를 사용해 컨테이너 런타임 소켓 경로를 지정합니다. 전용 컨테이너를 사용한다면 모든 Agent 컨테이너를 설정하세요.

```
env:
  - name: DD_CRI_SOCKET_PATH
    value: /var/run/containerd/containerd.sock
```

소켓을 호스트에서 Agent 컨테이너로 마운트합니다.

```
volumeMounts:
  - name: containerdsocket
    mountPath: /var/run/containerd/containerd.sock
  - mountPath: /host/var/run
    name: var-run
    readOnly: true
volumes:
  - hostPath:
      path: /var/run/containerd/containerd.sock
    name: containerdsocket
  - hostPath:
      path: /var/run
    name: var-run
```

{{% /tab %}}
{{< /tabs >}}

[1]: https://github.com/Azure/AKS/releases/tag/2020-11-16
[2]: https://cloud.google.com/kubernetes-engine/docs/release-notes#December_08_2020
[3]: https://aws.amazon.com/blogs/containers/amazon-eks-1-21-released/
[4]: https://docs.oracle.com/en-us/iaas/releasenotes/changes/52d34150-0cb8-4a0f-95f3-924dec5a3c83/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/check-if-dockershim-deprecation-affects-you/#role-of-dockershim
[6]: /ko/integrations/containerd/
[7]: /ko/integrations/crio/