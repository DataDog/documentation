---
description: Datadog CD Visibility에서 Argo CD 배포를 모니터링하는 방법을 알아보세요.
further_reading:
- link: /continuous_delivery/deployments
  tag: 문서
  text: Deployment Visibility에 대해 알아보기
- link: /continuous_delivery/explorer
  tag: 문서
  text: 배포 실행을 쿼리하고 시각화하는 방법 알아보기
is_beta: true
title: Argo CD 배포 모니터링
---
{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLScNhFEUOndGHwBennvUp6-XoA9luTc27XBwtSgXhycBVFM9yA/viewform?usp=sf_link" btn_hidden="false" header="미리 보기에 참여하세요!" >}}
Argo CD용 CD Visibility는 미리 보기로 제공되고 있습니다. 이 기능에 관심이 있다면 양식을 작성하여 액세스 권한을 요청하세요.
{{< /callout >}}

## 개요 {#overview}

[Argo CD][1]는 Kubernetes용 선언적 GitOps Continuous Delivery(CD) 도구입니다. 이 도구는 Git 리포지토리를 사용하여 원하는 애플리케이션 상태를 정의하는 GitOps 패턴을 따르며, 지정된 대상 환경에 애플리케이션 배포를 자동화합니다.

Datadog CD Visibility는 [Argo CD Notifications][2]을 사용하여 Argo CD와 통합됩니다. Argo CD Notifications는 두 가지 주요 구성 요소로 이루어져 있습니다.
1. [Triggers][3]: 알림을 _언제_ 보낼지 정의합니다.
2. [Templates][4]: 알림으로 _무엇을_ 보낼지 정의합니다.

## 최소 설정 {#minimal-setup}

아래 설정은 Argo CD의 [Webhook notification service][5]를 사용하여 Datadog으로 알림을 전송합니다.

먼저 `argocd-notifications-secret` 시크릿의 `dd-api-key` 키 값으로 [Datadog API 키][11]를 추가합니다. `argocd-notifications-secret` 수정에 대한 자세한 내용은 [Argo CD 가이드][2]를 참조하세요.

Argo CD 설치 방식에 따라 다음 설정 방법 중 하나를 선택합니다.

- **일반 설정(kubectl apply)**: `kubectl apply`를 사용하는 표준 Argo CD 설치용
- **Helm**: Helm 기반 Argo CD 배포용

### 일반 설정(kubectl apply) {#regular-setup-kubectl-apply}

`argocd-notifications-cm` ConfigMap을 수정하여 Datadog으로 알림을 전송할 알림 서비스, 템플릿 및 트리거를 생성합니다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
data:
  service.webhook.cd-visibility-webhook: |
    url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
    headers:
    - name: "DD-CD-PROVIDER-ARGOCD"
      value: "true"
    - name: "DD-API-KEY"
      value: $dd-api-key
    - name: "Content-Type"
      value: "application/json"
  template.cd-visibility-template: |
    webhook:
      cd-visibility-webhook:
        method: POST
        body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  trigger.cd-visibility-trigger: |
    - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
    - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
      send: [cd-visibility-template]
```

### Helm 설정 {#helm-setup}

Helm을 사용하여 Argo CD를 설치한 경우, `values.yaml`에 다음 구성을 추가합니다.

```yaml
notifications:
  notifiers:
    service.webhook.cd-visibility-webhook: |
      url: https://webhook-intake.{{< region-param key="dd_site" code="true" >}}/api/v2/webhook
      headers:
        - name: "DD-CD-PROVIDER-ARGOCD"
          value: "true"
        - name: "Content-Type"
          value: "application/json"
        - name: "DD-API-KEY"
          value: $dd-api-key
  templates:
    template.cd-visibility-template: |
      webhook:
        cd-visibility-webhook:
          method: POST
          body: |
            {
              "app": {{toJson .app}},
              "context": {{toJson .context}},
              "service_type": {{toJson .serviceType}},
              "recipient": {{toJson .recipient}},
              "commit_metadata": {{toJson (call .repo.GetCommitMetadata .app.status.operationState.syncResult.revision)}}
            }
  triggers:
    trigger.cd-visibility-trigger: |
      - when: app.status.operationState.phase in ['Succeeded', 'Failed', 'Error'] and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
      - when: app.status.operationState.phase == 'Running' and app.status.health.status in ['Healthy', 'Degraded']
        send: [cd-visibility-template]
```

### 구성 요약 {#configuration-summary}

다음 리소스가 추가되었습니다.
1. `cd-visibility-webhook` 서비스는 Datadog 데이터 수집 엔드포인트를 대상으로 하며, 요청에 적합한 헤더를 구성합니다. `DD-API-KEY` 헤더는 `argocd-notifications-secret`에 이전에 추가된 `dd-api-key` 항목을 참조합니다.
2. `cd-visibility-template`은 `cd-visibility-webhook` 서비스에 대한 요청으로 무엇을 보낼지 정의합니다.
3. `cd-visibility-trigger`는 알림을 전송할 시점을 정의하며 `cd-visibility-template`을 참조합니다.

`commit_metadata` 필드는 선택 사항이며, Git 정보를 추가하여 배포 데이터를 보강하는 데 사용할 수 있습니다. 다음 경우에는 이 필드를 이전 줄의 쉼표와 함께 제거해야 합니다.
- 이미 리포지토리 정보를 Datadog에 동기화하고 있는 경우입니다([Datadog에 리포지토리 메타데이터 동기화][20] 참조).
- Argo CD 애플리케이션 소스에 정의된 커밋 SHA가 없는 경우입니다(예: Helm 리포지토리를 사용하는 경우).

알림 서비스, 트리거 및 템플릿을 ConfigMap에 추가한 후에는 모든 Argo CD 애플리케이션을 해당 통합에 구독시킬 수 있습니다.
Argo CD UI에서 애플리케이션의 주석을 수정하거나, 애플리케이션 정의에 다음 주석을 적용하여 수정합니다.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_service: <YOUR_SERVICE>
    dd_customtags: "region:us1-east, team:backend"
```

위 코드 조각의 내용은 다음과 같습니다.
1. notifications 주석을 사용하면 Argo CD 애플리케이션이 위에서 생성한 알림 설정을 구독합니다. 애플리케이션 구독에 대한 자세한 내용은 [Argo CD 공식 가이드][12]를 참조하세요.
2. `dd_env` 주석을 사용하여 애플리케이션의 환경을 구성할 수 있습니다. 위의 `YOUR_ENV`를 애플리케이션이 배포될 환경
   (예: `staging` 또는 `prod`)으로 바꾸세요. 이 주석을 설정하지 않으면
   환경은 기본적으로 `none`으로 설정됩니다.
3. `dd_service` 주석을 사용하여 애플리케이션의 서비스를 구성할 수 있습니다. 위의 `YOUR_SERVICE`를 Argo CD 애플리케이션이 배포하는 서비스
   (예: `transaction-service`)로 바꾸세요. 이 주석을 사용하면 서비스
   이름이 애플리케이션에서 생성된 모든 배포 실행에 추가됩니다. 또한 서비스가
   [Catalog][13]에 등록되어 있으면 팀 이름도 모든 배포 실행에 추가됩니다. Argo CD
   애플리케이션이 둘 이상의 서비스를 배포하도록 구성된 경우 [여러 서비스를 배포하는 Argo CD 애플리케이션에 태그 지정](#tag-an-argo-cd-application-deploying-multiple-services)을 참조하세요.
4. `dd_customtags` 주석을 사용하여 이 Argo CD 애플리케이션에 대해 생성된 배포 실행에 사용자 지정 태그를 필요시 추가할 수 있습니다.
   값은 `key:value` 쌍으로 구성된 태그를 쉼표로 구분한 목록으로 설정해야 합니다.

위의 주석을 추가하여 Argo CD 애플리케이션을 구독하면 애플리케이션의 새 배포가 Datadog에 나타나기 시작합니다.

아래의 [권장 설정](#recommended-setup) 섹션에는 CD Visibility에서 보고하는 모니터링 정보를 개선하기 위한 권장 조치가 포함되어 있습니다.

## 권장 설정 {#recommended-setup}

### 리소스가 정상 상태에 도달할 때까지 대기하도록 소요 시간 변경 {#change-duration-to-wait-for-resources-health}
배포 이벤트에 보고된 기간은 Argo CD의 동기화 기간과 일치합니다. 그러나 동기화 기간은 일반적으로 Argo CD가 Git 리포지토리 상태와 Kubernetes 클러스터 상태를 동기화하는 데 소요된 시간을 나타냅니다.
즉, 동기화 후 발생하는 과정(예: Kubernetes 리소스가 시작되는 데 소요된 시간)은 소요 시간에 포함되지 않습니다.

보고되는 소요 시간에 리소스의 시작부터 정상 상태 도달까지 걸리는 시간을 반영하려면 Argo CD 애플리케이션에서 모니터링하는 새로운 no-op 리소스에 [PostSync Hook][19] 주석을 지정하여 추가합니다.
PostSync Hook은 모든 리소스가 Healthy 상태에 도달한 후 실행되며, Argo CD 동기화는 PostSync Hook 결과를 기다렸다가 애플리케이션 상태를 Healthy로 업데이트합니다.

아래는 간단한 `echo` 명령어를 실행하는 PostSync Hook Job의 예시입니다.

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: cdvisibility-postsync-job # Ensures that the Argo CD sync duration waits for resources health
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      containers:
        - name: noop-echo
          image: alpine:latest
          command: ["echo", "all the sync resources have reached a healthy state"]
      restartPolicy: Never
  backoffLimit: 0
```

### 배포와 CI 파이프라인 연결 {#correlate-deployments-with-ci-pipelines}

기본적으로 배포 이벤트에 보고된 Git 메타데이터는 Argo CD가 모니터링하는 리포지토리와 연결됩니다. 하지만 일반적으로 다음과 같이 설정합니다.
- 소스 코드를 저장하는 애플리케이션 리포지토리와 Kubernetes 매니페스트를 저장하는 구성 리포지토리를 별도로 둡니다. 그런 다음 [Argo CD 모범 사례 페이지][17]에 설명된 대로 구성 리포지토리를 모니터링하도록 Argo CD를 구성합니다.
- 애플리케이션 리포지토리에서 변경 사항이 발생하면 구성 리포지토리를 업데이트하는 자동화된 커밋을 수행합니다(예: Kubernetes 리소스의 현재 이미지 변경).

다음 다이어그램은 이러한 유형의 설정 예시를 보여줍니다.

{{< img src="ci/diagram_argo-cd-deployment_240910.png" alt="Git을 사용한 Argo CD 배포 트리거" style="width:100%;">}}

<div class="alert alert-info">이미지 연결을 위해서는 Argo CD v3.1.0 이상이 필요합니다.</div>

[`datadog-ci deployment correlate-image` 명령어][14]를 사용하여 이미지를 애플리케이션 리포지토리 커밋과 연결할 수 있습니다. Argo CD 배포가 발생하면 배포 이벤트의 구성 커밋 정보가 배포된 이미지를 확인하여 관련 애플리케이션 리포지토리 커밋을 찾을 수 있는 경우 해당 커밋 정보로 대체됩니다.

이 연결을 활성화하려면 Argo CD 애플리케이션에 `dd_k8s_cluster` 주석을 추가하고 애플리케이션이 배포되는 Kubernetes 클러스터의 이름을 지정해야 합니다. 이 이름은 [Datadog Kubernetes 제품][16]에 보고된 이름과 일치해야 합니다. 이미지 이름에는 관련 서비스 이름도 포함되어야 합니다. 이는 배포 시 관련 없는 이미지를 제외하는 데 도움이 됩니다.

다음은 나중에 Argo CD에 의해 배포될 이미지를 생성할 때 명령어를 실행하는 방법에 대한 예시입니다.

```yaml
 steps:
    - name: Correlate image with Datadog
      shell: bash
      run: |
        echo "Correlating image: ${{ inputs.image-name }} with Datadog"
        datadog-ci deployment correlate-image --image ${{ inputs.image-name }} --repository-url ${{ inputs.repository-url }} --commit-sha ${{ inputs.commit-sha }}
        echo "Successfully correlated ${{ inputs.image-name }} with Datadog"
```


이 명령어는 배포 리소스의 이미지를 연결합니다. Datadog이 배포를 수신했을 때 여러 이미지가 존재하고 그중 둘 이상의 이미지가 연결되어 있는 경우, Datadog은 서비스 이름이 포함된 이미지를 선택합니다. 이 연결 기능은 배포 리소스에만 적용됩니다.



#### 유효성 검사 {#validation}

명령이 올바르게 실행되었다면 배포에는 구성 리포지토리가 아닌 애플리케이션 리포지토리의 Git 메타데이터가 포함됩니다. 또한 배포 실행 보기에는 관련 CI 파이프라인 트레이스를 표시하는 새로운 {{< ui >}}Pipeline{{< /ui >}} 탭이 추가됩니다.

## 여러 서비스를 배포하는 Argo CD 애플리케이션에 태그 지정 {#tag-an-argo-cd-application-deploying-multiple-services}

Argo CD 애플리케이션이 둘 이상의 서비스를 배포하는 경우, Datadog은 애플리케이션 동기화에서 배포된 서비스를 자동으로 추론할 수 있습니다. Datadog은 수정된 Kubernetes 리소스를 기반으로 서비스를 추론합니다.

<div class="alert alert-danger">
<a href="https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/#server-side-apply">Server-Side Apply</a>가 사용되는 경우 자동 서비스 검색은 지원되지 않습니다.
</div>

자동 서비스 태그 지정을 활성화하려면 [Datadog Agent를 사용하여 Kubernetes 인프라를 모니터링][15]해야 하며, Kubernetes 리소스에 다음 레이블이 있어야 합니다.
- `tags.datadoghq.com/service`(필수): 이 리소스의 Datadog 서비스를 지정합니다. 자세한 내용은 [Unified Service Tagging][18]을 참조하세요.
- `team` (선택 사항): 이 리소스의 Datadog 팀을 지정합니다. 이 레이블이 생략되면 서비스 레이블을 기반으로 [Catalog][13]에서 팀이 자동으로 검색됩니다.

`Deployment`, `Rollout`, `ReplicaSet`, `StatefulSet`, `Service`, `DaemonSet`, `Pod`, `Job` 및 `CronJob` 종류의 Kubernetes 리소스만 해당됩니다.

Argo CD 애플리케이션에 다음 주석을 추가합니다.
- `dd_multiservice`: `true`. 이 주석은 변경된 Kubernetes 리소스를 기반으로 Datadog이 동기화 중에 배포된 서비스를 자동으로 추론할지 여부를 지정합니다.
- `dd_k8s_cluster`: Argo CD 애플리케이션이 배포되는 Kubernetes 클러스터의 이름으로 설정합니다. 이 이름은 [Datadog Kubernetes 제품][16]에 보고된 이름과 일치해야 합니다.

예시는 다음과 같습니다.

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  annotations:
    notifications.argoproj.io/subscribe.cd-visibility-trigger.cd-visibility-webhook: ""
    dd_env: <YOUR_ENV>
    dd_multiservice: true
    dd_k8s_cluster: example-cluster
```

## Datadog에서 배포 시각화 {#visualize-deployments-in-datadog}

[**Deployments**][6] 및 [**Executions**][7] 페이지에는 배포가 완료된 후 데이터가 표시됩니다. 자세한 내용은 [CD Visibility 배포 살펴보기][10]를 참조하세요.

## 문제 해결 {#troubleshooting}

알림이 전송되지 않으면 `argocd-notification-controller` 포드의 로그를 확인하세요. 컨트롤러는 알림을 전송할 때(예: `Sending notification ...`)와 수신자에게 알림을 전송하지 못했을 때
(예: `Failed to notify recipient ...`) 로그를 기록합니다. 추가적인 문제 해결 시나리오는 [공식 Argo CD 문서][8]를 참조하세요.

### Argo CD와 Datadog 간의 상태 불일치 {#status-discrepancies-between-argo-cd-and-datadog}

Argo CD에서는 성공으로 표시되지만 Datadog에서는 오류로 표시되는 등 배포 상태가 보고되는 방식에 불일치가 있을 수 있습니다. 주요 차이점은 각 플랫폼이 배포 성공을 평가하는 방식에 있습니다.
- **Argo CD**는 리소스의 런타임 상태와 관계없이 Kubernetes 매니페스트에 변경 사항을 적용할 수만 있다면 동기화를 성공으로 간주합니다.
- **Datadog CD Visibility**는 배포 결과를 더 포괄적으로 평가합니다. 동기화 중에 수정된 리소스 중 하나라도 성능 저하 상태에 빠지면(예: 잘못된 이미지 또는 구성 문제로 인해), Argo CD에서 배포를 성공으로 보고하더라도 Datadog에서는 배포가 실패했거나 성능이 저하된 것으로 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://argo-cd.readthedocs.io/en/stable/
[2]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/
[3]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/triggers/
[4]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/templates/
[5]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/services/webhook/
[6]: https://app.datadoghq.com/ci/deployments
[7]: https://app.datadoghq.com/ci/deployments/executions
[8]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/troubleshooting/
[9]: /ko/continuous_delivery/search
[10]: /ko/continuous_delivery/explorer
[11]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://argo-cd.readthedocs.io/en/stable/operator-manual/notifications/subscriptions/
[13]: /ko/internal_developer_portal/catalog/
[14]: https://github.com/DataDog/datadog-ci/tree/master/packages/plugin-deployment#correlate
[15]: /ko/containers/kubernetes
[16]: https://app.datadoghq.com/orchestration/explorer
[17]: https://argo-cd.readthedocs.io/en/stable/user-guide/best_practices/#separating-config-vs-source-code-repositories
[18]: /ko/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[19]: https://argo-cd.readthedocs.io/en/stable/user-guide/resource_hooks/#resource-hooks
[20]: /ko/continuous_delivery/features/code_changes_detection#synchronize-repository-metadata-to-datadog