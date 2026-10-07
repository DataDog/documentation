---
aliases:
- /ko/dora_metrics/change_failure_detection/
description: 롤백, 되돌리기 PR, 사용자 지정 PR 필터를 사용하여 DORA Metrics에서 변경 실패 탐지를 구성하는 방법을 알아보세요.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: 설명서
  text: DORA Metrics에 대해 알아보기
- link: /delivery_performance/dora_metrics/setup/
  tag: 설명서
  text: DORA Metrics용 데이터 소스 설정
title: 변경 실패 탐지
---
{{< jqmath-vanilla >}}

## 개요 {#overview}

Datadog 변경 실패 탐지 기능은 이전에 실패한 배포를 수정하는 배포를 자동으로 식별합니다. 이 기능은 변경 실패를 수정 배포에 연결하여 제공 성능에 대한 완전한 보기를 제공함으로써 팀이 릴리스 속도와 운영 안정성 사이의 균형을 유지하도록 돕습니다.

**변경 실패**는 프로덕션에서 문제를 발생시켜 수정 작업이 필요하게 만드는 배포입니다. 변경 실패는 다음 메트릭을 계산하는 데 사용됩니다.

- [변경 실패율][2]
: 프로덕션에서 문제를 발생시키는 배포의 비율로, 다음과 같이 계산합니다.

 $$\text"변경 실패율" = \text"변경 실패 횟수" / \text"총 배포 횟수"$$

- [실패한 배포 복구 시간][3]
: 실패한 배포와 롤백 또는 롤포워드 배포를 통한 해당 배포의 수정 사이에 지난 중앙값 기간입니다.

변경 실패 탐지 기능은 다음과 같은 두 가지 유형의 수정 배포를 식별합니다.
- **롤백**: 이전에 배포된 버전이 다시 배포되면 자동으로 탐지됩니다.
- **롤포워드**: 메타데이터 패턴(예: 되돌리기 PR 및 핫픽스 레이블)과 일치하는 사용자 지정 규칙을 통해 탐지됩니다.


## 롤백 {#rollbacks}

롤백은 실패했거나 잘못된 변경 후 시스템을 복원하기 위해 이전에 배포된 버전이 다시 배포될 때 발생합니다.

### 롤백 분류 작동 방식 {#how-rollback-classification-works}

배포는 이전에 배포된 버전과 일치하지만 바로 이전 배포와는 다른 버전을 배포할 때 롤백으로 분류됩니다.

- Git 메타데이터가 있는 경우, 커밋 SHA를 기준으로 일치 여부를 확인합니다.
- Git 메타데이터가 없는 경우, 버전 태그를 기준으로 일치 여부를 확인합니다.

롤백이 탐지되면 변경 실패가 롤백 대상(되돌아간 버전) 이후의 첫 번째 배포입니다.

### 예시: 롤백 탐지 {#example-rollback-detection}

V1 → V2 → V3 → V1 시퀀스의 경우, 롤백 대상은 원본 V1이므로 V2가 변경 실패로, V1은 롤백 배포로 표시됩니다.

{{< img src="delivery_performance/dora_metrics/rollback_example.png" alt="탐지된 롤백 배포의 예시" style="width:100%;" >}}

**참고**: 동일한 버전을 연속으로 다시 배포하는 것(예: V1 → V1)은 롤백으로 간주되지 않습니다.

## 롤포워드 {#rollforwards}

롤포워드는 실패했거나 잘못된 변경을 수정하거나 재정의하기 위해 새로운 배포가 진행될 때 발생합니다. 이전 버전을 다시 배포하는 롤백과 달리, 롤포워드는 문제를 수정하기 위해 새 코드를 배포합니다. 여기에는 새 릴리스를 통해 이전 동작을 복원하는 풀 요청 되돌리기가 포함될 수 있습니다.

롤포워드는 배포 메타데이터 패턴과 일치하는 사용자 지정 규칙을 통해 탐지됩니다. 사용자 지정 규칙은 [DORA Settings 페이지][1]에서 구성됩니다.

## 사용자 지정 규칙 {#custom-rules}

리포지토리 또는 릴리스 메타데이터를 기반으로 롤포워드 배포를 자동으로 분류하도록 사용자 지정 규칙을 정의할 수 있습니다. 규칙은 다음과 같은 두 가지 방식으로 작동할 수 있습니다.
- **배포 연결**: 공유된 변수 값(예: PR 번호 또는 버전)을 통해 배포 일치 여부를 확인합니다.
- **정적 패턴**: 변수 없이 메타데이터 패턴(예: 레이블 또는 브랜치 이름) 일치 여부를 확인합니다.

### 실패한 배포에 연결된 규칙 {#rules-linked-to-failed-deployments}

이 규칙을 사용하여 이전에 실패한 특정 배포에 연결되어야 하는 롤포워드 배포를 식별하세요. 이 규칙은 공유된 참조를 통해 배포 일치 여부를 확인하기 위해 변수가 포함된 정규 표현식(정규식) 패턴을 사용합니다.

다음 변수 중 하나를 포함하는 정규식 규칙을 입력할 수 있습니다.
| 변수      | 설명            |
|---------------|-----------------------|
| `$pr_title`   | PR 제목 일치 여부를 확인합니다.     |
| `$pr_number`  | PR 번호 일치 여부를 확인합니다.    |
| `$version`    | 버전 태그 일치 여부를 확인합니다.  |

#### 변수 기반 분류의 작동 방식 {#how-variable-based-classification-works}

규칙이 배포와 일치하면 다음 액션이 발생합니다.
1. 현재 배포에서 변수 값이 추출됩니다.
2. 시스템이 동일한 추출된 값을 가진 이전 배포를 찾습니다.
3. 현재 배포가 해당 이전 배포에 연결된 롤포워드로 표시됩니다.
4. 이전 배포가 변경 실패로 표시됩니다.

이 규칙은 실패한 배포를 공유된 커밋 SHA, 버전 태그 또는 PR 참조로 식별할 수 있을 때 가장 잘 작동합니다.

#### 예시: 풀 요청 되돌리기 {#example-revert-pull-requests}

풀 요청 되돌리기는 일반적인 복구 패턴입니다. 예를 들어, `Revert "Add feature X"`라는 제목의 PR은 원본 PR을 참조합니다.

```
Revert "$pr_title"
```

PR 제목이 이 패턴과 일치하면 다음 액션이 발생합니다.
1. 시스템이 되돌리기 PR에서 원본 PR 제목(`$pr_title`의 값)을 추출합니다.
2. 시스템이 해당 원본 PR 제목을 포함하는 이전 배포를 찾습니다.
3. 되돌리기를 포함하는 현재 배포가 롤포워드로 표시됩니다.
4. 이전 배포가 변경 실패로 표시됩니다.

**참고**: 원본 PR이 이전 배포에서 발견되지 않거나 원본 PR과 해당 되돌리기가 모두 동일한 배포에 있는 경우 분류가 적용되지 않습니다.

### 정적 규칙 {#static-rules}

정적 규칙은 변수를 사용하지 않고 메타데이터 패턴을 기반으로 롤포워드 배포를 분류합니다. 이 규칙은 광범위한 수정 지표와의 일치 여부를 확인합니다.

특정 유형의 메타데이터와 일치하는 정규식 규칙을 정의할 수 있습니다. 다음 표에서는 사용할 수 있는 몇 가지 예시 패턴을 보여주지만 프로세스에 맞게 조정할 수 있습니다.

| 메타데이터 유형    | 예시 정규식 패턴   | 설명                         |
|------------------|------------------------|-------------------------------------|
| **PR 제목**         | `.*rollforward.*`      | `rollforward`   |를 포함하는 PR 제목과의 일치 여부를 확인합니다.
| **PR 레이블**         | `.*hotfix.*`           | `hotfix`        |를 포함하는 PR 레이블과의 일치 여부를 확인합니다.
| **PR 브랜치 이름**      | `recovery/.*`          | `recovery/`|로 시작하는 브랜치 이름과의 일치 여부를 확인합니다.
| **커밋 메시지**      | `^Revert ".*"$ `          | `Revert`로 시작하고 `"`|로 끝나는 커밋 메시지와의 일치 여부를 확인합니다.
| **버전 태그**      | `.*_hotfix`            | `_hotfix`   |로 끝나는 버전 태그와의 일치 여부를 확인합니다.

#### 정적 규칙 분류의 작동 방식 {#how-static-rule-classification-works}

정적 규칙이 배포와 일치하면 다음 액션이 발생합니다.
1. 현재 배포가 롤포워드로 표시됩니다.
2. 바로 이전 배포가 변경 실패로 표시됩니다.

핫픽스 레이블, 브랜치 접두사 또는 버전 태그 규칙과 같은 광범위한 수정 지표에 정적 규칙을 사용하세요.


### 기본 규칙 {#default-rules}

Datadog은 자동으로 활성화되는 기본 규칙을 제공합니다.

- **되돌리기 PR**: 되돌리기 명명 규칙(예: 이전 PR을 참조하는 'Revert')을 따르는 PR 제목은 롤포워드로 처리됩니다. 원본 변경이 포함된 이전 배포는 위에 설명된 변수 기반 연결 규칙을 사용하여 변경 실패로 표시됩니다.
- **핫픽스 지표**: 'hotfix'가 포함된 PR 레이블, 제목 또는 브랜치 이름은 롤포워드로 처리되며, 이전 배포는 변경 실패로 표시됩니다.

이 기본 규칙은 [DORA Metrics 설정][1] 페이지에서 완전히 구성할 수 있습니다. 이 규칙은 일반적인 신호가 롤포워드 활동일 가능성이 높은 것으로 해석하는 의견형 시작점으로 의도되었습니다. 필요에 따라 패턴(예: 명명 규칙, 레이블 또는 버전 태그)을 조정하여 자체 워크플로를 반영하고 시간이 지나면서 정확도를 높여야 합니다.

## 배포 상태 업데이트 {#update-deployment-status}

자동 탐지 및 사용자 지정 규칙을 통해 대부분의 사례가 처리되지만 여전히 배포 상태를 수동으로 업데이트하여 변경 실패로 표시하거나 변경 실패를 안정 상태로 표시할 수 있습니다.

### 배포 상태를 업데이트해야 하는 경우 {#when-to-update-deployment-status}

다음 시나리오에서 배포 상태를 수동으로 업데이트하는 것을 고려하세요.
- 배포로 인해 프로덕션 문제가 발생했지만 변경 실패로 탐지되지 않은 경우
- 배포가 변경 실패로 잘못 분류된 경우(오탐)
- 보고를 위해 올바른 상태를 즉시 반영해야 하는 경우

### API를 통한 상태 업데이트 {#update-status-through-the-api}

[DORA Metrics API][4]를 사용하여 프로그래밍 방식으로 배포 상태를 업데이트하세요. 다음 예시에서는 배포를 변경 실패로 표시하고 롤백 수정에 연결합니다.

```shell
curl -X PATCH "https://api.datadoghq.com/api/v2/dora/deployment/{deployment_id}" \
-H "Accept: application/json" \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_API_KEY}" \
-d @- << EOF
{
  "data": {
    "attributes": {
      "change_failure": true,
      "remediation": {
        "id": "eG42zNIkVjM",
        "type": "rollback"
      }
    },
    "id": "z_RwVLi7v4Y",
    "type": "dora_deployment_patch_request"
  }
}
EOF
```

`remediation` 필드는 선택 사항이지만 실패한 배포 복구 시간을 계산하려면 필요합니다.

### UI를 통한 상태 업데이트 {#update-status-through-the-ui}

Datadog UI에서 배포 상태를 업데이트하려면 다음 단계를 따르세요.

1. {{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}DORA Metrics{{< /ui >}}로 이동하고 [{{< ui >}}View Deployments{{< /ui >}}][5]를 클릭합니다.
2. 배포를 클릭하여 배포 세부 정보 패널을 엽니다.
3. 배포 세부 정보 패널의 드롭다운에서 {{< ui >}}Deployment status{{< /ui >}}를 선택하여 배포를 failed 또는 stable로 표시합니다.

{{< img src="delivery_performance/dora_metrics/deployment_status_update.mp4" alt="Datadog UI에서 배포의 변경 실패 상태 업데이트" video="true" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/settings/dora
[2]: /ko/delivery_performance/dora_metrics/calculation/#change-failure-rate
[3]: /ko/delivery_performance/dora_metrics/calculation/#failed-deployment-recovery-time
[4]: /ko/api/latest/dora-metrics/#patch-a-deployment-event
[5]: https://app.datadoghq.com/ci/dora?detail=deployments