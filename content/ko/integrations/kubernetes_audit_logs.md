---
aliases:
- /ko/logs/log_collection/kubernetes_audit_logs
categories:
- log collection
- containers
- orchestration
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_audit_logs.md
description: Kubernetes 클러스터 내의 모든 활동을 추적할 수 있습니다
doc_link: /integrations/kubernetes_audit_logs/
further_reading:
- link: logs/
  tag: 설명서
  text: 로그 관리
- link: https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/
  tag: 블로그
  text: 클러스터 보안 모니터링을 위한 주요 Kubernetes 감사 로그
has_logo: true
integration_id: kubernetes-audit-logs
integration_title: Kubernetes 감사 로그
is_public: true
custom_kind: integration
name: kubernetes_audit_logs
public_title: Datadog-Kubernetes 감사 로그
short_description: 'Kubernetes 클러스터 내부 추적 '
supported_os:
- linux
- mac_os
- windows
title: Kubernetes 감사 로그
---

## 개요

[Kubernetes 감사 로그][1]를 수집하여 Kubernetes API에 대한 모든 서비스 호출을 포함해 Kubernetes 클러스터 내부의 활동을 추적하세요. 여기에는 컨트롤 플레인(내장 컨트롤러, 스케줄러), 노드 데몬(kubelet, kube-proxy 등), 클러스터 서비스(예: 클러스터 자동 크기 조정기), `kubectl` 요청하는 사용자, 그리고 Kubernetes API 자체도 포함됩니다.

Kubernetes 감사 로그 통합을 사용하면 권한 문제를 진단하고, 업데이트해야 하는 RBAC 정책을 식별하며, 전체 클러스터에 영향을 미치는 느린 API 요청을 추적할 수 있습니다. [KubeCon 2019 Datadog 토크][2]를 통해 자세히 살펴보세요.

## 구성

이 통합은 **Agent 6.0이상에서 사용 가능합니다**

### 설정

Kubernetes 감사 로그 설정에 대한 자세한 내용은 [Kubernetes 감사][3]를 참조하세요.

Kubernetes에서 감사 로그를 활성화하려면 

1. Kubernetes에서는 감사 로그가 기본적으로 비활성화되어 있습니다. API 서버 설정에서 이를 활성화하려면 감사 정책 파일 경로를 지정하세요.

    ```conf
    kube-apiserver
      [...]
      --audit-log-path=/var/log/kubernetes/apiserver/audit.log
      --audit-policy-file=/etc/kubernetes/audit-policies/policy.yaml
    ```

2. 감사 로그에서 캡처하려는 API 요청 유형을 지정하려면 `/etc/kubernetes/audit-policies/policy.yaml`에서 정책 파일을 생성하세요. 감사 정책 규칙은 순서대로 평가됩니다. API 서버는 각 작업 유형이나 리소스에 대해 찾은 첫 번째 일치 규칙을 따릅니다. 감사 정책의 예:

```yaml
# /etc/kubernetes/audit-policies/policy.yaml

apiVersion: audit.k8s.io/v1
kind: Policy
rules:
    # 다음 요청에 대한 로그를 만들지 않음
    - level: None
      nonResourceURLs:
          - '/healthz*'
          - '/logs'
          - '/metrics'
          - '/swagger*'
          - '/version'

    # 사양이나 상태에 토큰을 포함하지 않도록 레벨을 Metadata로 제한
    - level: Metadata
      omitStages:
          - RequestReceived
      resources:
          - group: authentication.k8s.io
            resources:
                - tokenreviews

    # 인증 위임에 대한 확대 감사
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          - group: authorization.k8s.io
            resources:
                - subjectaccessreviews

    # 파드 변경 로그를 RequestResponse 레벨에서 작성
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          # 핵심 API 그룹; 필요에 따라 타사 또는 자체 제작 API 서비스 추가
          - group: ''
            resources: ['pods']
            verbs: ['create', 'patch', 'update', 'delete']

    # 다른 모든 로그를 Metadata 레벨에서 작성
    - level: Metadata
      omitStages:
          - RequestReceived
```

이 예제 정책 파일은 특정 유형의 클러스터 변경 작업(업데이트, 패치, 생성, 삭제)에 대해 가장 높은 수준의 세부 정보를 기록하도록 API 서버를 설정합니다. 또한 인증 위임 문제를 해결할 수 있도록 최고 수준의 `subjectaccessreviews` 리소스에 대한 요청을 추적합니다.

`tokenreviews` 리소스와 같은 민감한 데이터가 포함된 엔드포인트에 대해서는 상세 수준을 `Metadata`로 낮추기 원할 수 있습니다. Datadog은 로그에서 `RequestReceived` 단계를 생략합니다.

마지막 섹션에서는 이전 규칙에 명시되지 않은 모든 것에 대해 `Metadata` 레벨에서 로그를 작성하도록 정책을 설정합니다. 감사 로그가 너무 상세한 경우 심각도가 낮은 작업이나 동사(list, watch, get 등 클러스터 상태가 변경되지 않는 작업)를 제외할 수도 있습니다.

### 로그 수집

1. Kubernetes 환경에 [Agent를 설치합니다][1].
2. 로그 수집은 기본적으로 비활성화되어 있습니다. [DaemonSet][4] `env` 섹션에서 활성화하세요.

    ```yaml
    env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: 'true'
    ```

3. Agent가 파일에서 마지막으로 전송된 로그를 알 수 있도록 포인터를 저장하는데 필요한 디렉토리 및 감사 로그 디렉토리를 마운트합니다. 이렇게 하려면 데몬셋 `volumeMounts` 섹션에 다음을 추가하세요.

    ```yaml
     # (...)
        volumeMounts:
          # (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
          - name: auditdir
            mountPath: /var/log/kubernetes/apiserver
          - name: dd-agent-config
            mountPath: /conf.d/kubernetes_audit.d
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/kubernetes/apiserver
          name: auditdir
        - name: dd-agent-config
            configMap:
              name: dd-agent-config
              items:
                - key: kubernetes-audit-log
                  path: conf.yaml
      # (...)
    ```

   이는 감사 로그 파일에서 로그를 수집하도록 Agent를 설정하는 `conf.d` 폴더도 마운트합니다.

4. ConfigMap을 사용하여 해당 파일에서 로그를 수집하도록 Agent를 설정합니다.

    ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
        name: dd-agent-config
        namespace: default
    data:
        kubernetes-audit-log: |-
            logs:
              - type: file
                path: /var/log/kubernetes/apiserver/audit.log
                source: kubernetes.audit
                service: audit
    ```

### 검증

[Agent의 상태 하위 명령을 실행][5]하고 Checks 섹션에서 `Logs`를 찾으세요.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/kubernetes/#installation
[2]: https://www.youtube.com/watch?v=raJRLmGb9Is&t=1s
[3]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
[4]: /ko/agent/kubernetes/log/
[5]: /ko/agent/guide/agent-commands/#agent-status-and-information
[6]: /ko/help/