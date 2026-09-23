---
description: Data Access Control을 사용하여 Agent Observability 프로젝트와 그 안의 모든 항목에 대한 액세스를
  특정 팀이나 역할로 제한하세요.
further_reading:
- link: /account_management/rbac/data_access/
  tag: 설명서
  text: Data Access Control
- link: /llm_observability/data_governance/
  tag: 설명서
  text: Data Governance
- link: /account_management/rbac/permissions/#access-management
  tag: 설명서
  text: 액세스 관리 권한
title: Agent Observability의 Data Access Control
---
## 개요 {#overview}

Agent Observability 프로젝트에는 데이터셋 프롬프트 및 예상 출력, 실험 실행의 트레이스, 평가 결과, 주석 대기열에서 검토 중인 트레이스 등 민감한 자료가 포함될 수 있습니다. [Data Access Control][1]을 사용하면 지정한 팀이나 역할만 프로젝트를 볼 수 있도록 제한할 수 있습니다.

프로젝트가 제한되면 액세스 권한을 부여받은 팀이나 역할 외의 사용자는 다음 작업을 수행할 수 없습니다.

- 목록 뷰나 검색 결과에서 프로젝트 또는 프로젝트의 실험, 데이터셋, 주석 대기열 조회
- 입력 및 예상 출력을 포함한 프로젝트의 데이터셋 레코드 읽기
- 프로젝트의 실험 실행에서 생성된 평가 메트릭 읽기
- 해당 실행에서 생성된 스팬 읽기(SDK를 통해 실행된 실험 제외, [제한 사항](#limitations) 참조)
- 검토 중인 트레이스와 적용된 레이블을 포함한 프로젝트의 주석 대기열 읽기
- 이전에 획득한 ID가 있더라도 프로젝트 내부 항목 생성, 수정 또는 삭제

해당 팀이나 역할에 속하지 않은 사용자가 프로젝트나 프로젝트 내부 항목에 대한 직접 링크를 열면 *찾을 수 없음* 응답을 받게 됩니다.

제한 사항은 Datadog UI 및 API에 적용됩니다. 애플리케이션 키는 해당 키를 소유한 사용자와 동일한 제한을 받습니다.

## 전제 조건 {#prerequisites}

- 조직에 Data Access Control이 구성되어 있습니다. [Data Access Control][1]을 참조하세요.
- Datadog Admin 역할 또는 [`user_access_manage` 권한][2]을 포함하는 다른 역할을 보유하고 있습니다.
- 제한하려는 프로젝트가 Agent Observability에 이미 존재합니다.

## UI에서 프로젝트 제한 {#restrict-a-project-in-the-ui}

<div class="alert alert-info">Datadog이 재설계된 Access Control 페이지를 출시하고 있습니다. 조직에는 <strong>Data Access Controls</strong> 페이지 또는 재설계된 <strong>Access Control</strong> 페이지 중 하나가 있습니다. 1단계의 링크를 클릭하면 보유한 페이지로 이동하며, 두 페이지 모두 동일한 제한을 구성합니다.</div>

1. [Organization Settings > Data Access Controls][3]로 이동합니다.
2. 데이터의 하위 집합에 적용되는 제한을 생성합니다.
   - Data Access Controls 페이지에서 **New Restricted Dataset**을 클릭합니다.
   - Access Control 페이지에서 **New Policy > Sensitive Data Partition**을 클릭합니다.
3. 보호하는 프로젝트를 식별할 수 있는 이름(예: `Experiments - Fraud Detection`)을 지정합니다.
4. **Agent Observability** 제품에 필터를 추가한 다음 프로젝트를 지정합니다.
   - Access Control 페이지의 값 목록에서 프로젝트를 선택합니다. 목록에는 두 그룹, 즉 사용자의 프로젝트와 Agent Observability로 트레이스를 전송하는 애플리케이션이 있습니다. 프로젝트 그룹에서 선택하세요.
       
       <div class="alert alert-warning"><ul><li>프로젝트 이름을 직접 입력하면 일부만 입력하거나 오타가 있는 경우를 포함해 어떤 Experiments 데이터와도 일치하지 않습니다. 프로젝트는 모든 사용자에게 계속 표시되며 제한이 작동하는 것처럼 보입니다.</li><li>이미 다른 Restricted Dataset에 포함된 프로젝트는 목록에 나타나지 않습니다. 프로젝트는 한 번에 하나의 Restricted Dataset에만 속할 수 있습니다.</li></ul></div>
   
   - Data Access Controls 페이지에서 프로젝트 ID를 `ml_app` 값으로 입력합니다. [프로젝트 ID 찾기](#find-a-projects-id)를 참조하세요.

5. 프로젝트에 대한 액세스 권한을 유지해야 하는 팀이나 역할에 액세스 권한을 부여합니다. 하나의 Restricted Dataset에는 최대 50개의 팀 또는 역할을 연결할 수 있습니다.
6. Restricted Dataset을 저장합니다.

**참고**: 필터 키가 잠겨 있을 수 있습니다. Agent Observability는 애플리케이션과 프로젝트 모두에 대해 하나의 태그 키인 `ml_app`를 사용하며, Data Access Control은 텔레메트리 유형당 하나의 태그 키를 허용합니다. 조직에 이미 Agent Observability Restricted Dataset이 있는 경우, 새 Restricted Dataset도 동일한 키를 재사용합니다.

제한 사항은 저장되는 즉시 적용됩니다. 프로젝트와 해당 실험, 데이터셋, 데이터셋 레코드, 주석 대기열은 생성 시점과 관계없이 즉시 숨겨집니다. 스팬 및 평가 메트릭에는 [제한 사항](#limitations)의 예외가 적용됩니다.

## API를 통해 프로젝트 제한 {#restrict-a-project-through-the-api}

Data Access Control [Datasets API][5]를 사용하여 제한을 생성할 수도 있습니다. `ml_obs` 제품 필터는 프로젝트 ID를 `ml_app` 값으로 사용합니다.

```json
{
  "data": {
    "type": "dataset",
    "attributes": {
      "name": "Experiments - Fraud Detection",
      "product_filters": [
        {
          "product": "ml_obs",
          "filters": ["ml_app:3547f4ac-3af4-4733-9a70-8fe596e1e76d"]
        }
      ],
      "principals": ["team:f771276e-0847-4c24-a277-6744f8520bb4"]
    }
  }
}
```

## 주석 대기열 {#annotation-queues}

프로젝트에 속한 주석 대기열은 해당 프로젝트의 제한 사항을 상속합니다. 프로젝트를 제한하면 해당 대기열, 검토를 위해 보관 중인 트레이스, 검토자가 적용한 레이블, 각 대기열의 레이블 스키마가 숨겨집니다. 권한이 부여된 팀이나 역할 외의 사용자는 대기열을 주석 처리, 편집 또는 삭제할 수 없으며, 주석 처리된 상호 작용을 데이터셋이나 CSV로 내보낼 수 없습니다.

대기열 자체의 [액세스 설정][7]은 별개입니다. 검토자 및 담당자 제한은 사용자가 이미 볼 수 있는 대기열을 누가 주석 처리할 수 있는지 제어합니다. Data Access Control은 대기열을 볼 수 있는 사람을 제어합니다.

생성하는 모든 주석 대기열은 프로젝트에 속해야 합니다. 이 요구 사항이 적용되기 전에 생성된 대기열은 프로젝트가 없을 수 있습니다. [제한 사항](#limitations)을 참조하세요.

## 프로젝트 ID 찾기 {#find-a-projects-id}

Data Access Controls 페이지와 Datasets API는 프로젝트 이름이 아닌 프로젝트 ID를 `ml_app` 값으로 사용합니다. Experiments의 프로젝트 URL에서 프로젝트 ID를 확인하거나, 프로젝트 목록을 조회할 때 [Experiments API][4]에서 반환되는 `id` 필드에서 확인하세요.

## 액세스 권한 부여 및 취소{#grant-and-revoke-access}

Restricted Dataset에서 팀 또는 역할을 편집하여 액세스 권한을 부여하세요. 팀 또는 역할을 제거하면 즉시 적용됩니다. Restricted Dataset을 삭제하면 제한이 완전히 제거되며, 프로젝트는 Agent Observability 읽기 액세스 권한이 있는 조직의 모든 사용자에게 다시 표시됩니다.

관리자라고 해서 제한에서 예외가 되는 것은 아닙니다. `user_access_manage` 권한을 사용하면 Restricted Dataset을 작성하고 편집할 수 있지만, 제한된 프로젝트에 대한 액세스는 팀 및 역할 소속 여부에만 따릅니다. 권한이 부여된 팀이나 역할에 속하지 않은 관리자는 다른 사용자와 마찬가지로 해당 프로젝트를 찾을 수 없다는 응답을 받습니다.

## 제한 사항 {#limitations}

- **SDK를 통해 실행된 실험의 스팬은 프로젝트의 Restricted Dataset에 의해 제한되지 않습니다.** 이러한 스팬은 프로젝트가 아닌 실험을 실행한 애플리케이션에 귀속됩니다. 프로젝트의 Restricted Dataset은 프로젝트와 해당 데이터셋, 데이터셋 레코드, 평가 메트릭을 숨기지만, 해당 스팬의 입력과 출력은 숨기지 않습니다. 해당 스팬까지 제한하려면 동일한 Restricted Dataset에 애플리케이션의 `ml_app` 값에 대한 두 번째 필터를 추가하세요.
- **수집 시 프로젝트로 태그가 지정되지 않은 스팬 및 평가 메트릭은 제한되지 않습니다.** 수집 시점에 프로젝트가 이러한 이벤트에 태그로 연결되며, 과거 이벤트에는 태그가 다시 지정되지 않습니다. 태그가 지정된 이벤트는 제한이 저장되는 즉시 숨겨집니다. 목록 보기, 메타데이터 및 데이터셋 레코드는 생성 시점과 관계없이 숨겨집니다.
- **관리형 프롬프트는** Data Access Control에서 지원되지 않습니다. 지원되는 텔레메트리의 전체 목록은 [Data Access Control][1]을 참조하세요.
- **프로젝트에 속하지 않은 주석 대기열은 Agent Observability 읽기 액세스 권한이 있는 모든 사용자에게 표시되며,** Restricted Dataset으로도 이를 숨길 수 없습니다. 대기열을 프로젝트로 이동하거나 프로젝트에서 다시 생성하여 제한을 적용하세요.
- **Restricted Dataset이 없는 프로젝트는 Agent Observability 읽기 액세스 권한이 있는 모든 사용자에게 표시됩니다**. 조직에서 Agent Observability에 대해 [Strict Mode][6]를 활성화하지 않은 경우, Data Access Control은 기본적으로 허용적입니다. 값이 프로젝트와 일치하지 않는 Restricted Dataset은 아무것도 제한하지 않습니다. 권한이 부여된 팀 또는 역할 외의 사용자를 통해 새 제한이 제대로 적용되는지 확인하세요.
- **[Strict Mode][6]에서는 Restricted Dataset이 프로젝트 ID를 지정하는 경우에만 프로젝트가 표시됩니다.** 애플리케이션 이름인 `ml_app` 값은 Experiments에서 어떠한 액세스 권한도 부여하지 않으므로, 다른 Restricted Dataset에 지정된 팀과 역할을 포함하여 모든 사용자에게 프로젝트가 숨겨진 상태로 유지됩니다. [프로젝트 ID 찾기](#find-a-projects-id)를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/rbac/data_access/
[2]: /ko/account_management/rbac/permissions/#access-management
[3]: https://app.datadoghq.com/organization-settings/data-access-controls/
[4]: /ko/llm_observability/improve/experiments/api/
[5]: /ko/api/latest/datasets/
[6]: /ko/account_management/rbac/data_access/#strict-mode
[7]: /ko/llm_observability/investigate/annotation_queues/#managing-queue-access