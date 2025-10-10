---
algolia:
  category: 설명서
  rank: 80
  subcategory: Datadog 역할 권한 허용
aliases:
- /ko/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: 설명서
  text: 역할 생성, 갱신, 삭제 방법을 알아봅니다
- link: /api/v2/roles/#list-permissions
  tag: 설명서
  text: Permission API로 역할 권한 허용 관리하기
title: Datadog 역할 권한 허용
---

## 개요

권한은 사용자가 특정 리소스에 액세스할 수 있는 유형을 정의합니다. 일반적으로 권한은 사용자가 개체를 읽고, 편집하고, 삭제할 수 있는 권한을 부여합니다. 권한은 관리되는 세 가지 관리 역할과 커스텀 역할을 포함해 모든 역할에 대한 액세스 권한을 아우르는 개념입니다.

### 민감한 권한

일부 Datadog 권한은 더욱 특별한 기능에 액세스할 수 있는 기능을 제공합니다. 다음과 같은 내용을 숙지하는 것이 좋습니다.

- 조직 설정 변경 액세스
- 잠재적으로 민감한 데이터를 읽기 위한 액세스
- 권한 있는 작업을 수행하기 위한 액세스 권한

민감한 권한은 역할 및 권한 인터페이스에서 플래그를 지정하여 더 면밀한 조사가 필요할 수 있음을 나타냅니다. 역할을 구성하는 관리자는 이러한 권한에 특히 주의를 기울이고 어떤 권한이 역할과 사용자에게 할당되었는지 확인하는 것이 좋습니다.

### 관리 역할

기본적으로 기존 사용자는 세 가지 관리 역할 중 하나에 연결됩니다.

- Datadog 관리자
- Datadog 표준
- Datadog 읽기 전용

이러한 역할 중 하나를 가진 모든 사용자는 [개별적으로 읽기 제한][1] 리소스를 제외한 모든 데이터 유형을 읽을 수 있습니다. 관리자 및 표준 사용자는 자산에 대한 쓰기 권한이 있습니다. 관리자 사용자는 사용자 관리, 조직 관리, 빌링, 사용량과 관련된 민감한 자산에 대해 추가적인 읽기 및 쓰기 권한을 갖습니다.

관리 역할은 Datadog에서 만들고 유지 관리합니다. 새로운 기능이 추가되거나 권한이 변경되면 Datadog에서 해당 권한을 자동으로 업데이트할 수 있습니다. 사용자는 관리 역할을 직접 수정할 수는 없지만 관리 역할을 복제하여 특정 권한을 가진 [커스텀 역할](#custom-roles)을 만들 수는 있습니다. 필요한 경우 사용자는 자신의 계정에서 관리되는 역할을 삭제할 수 있습니다.

### 커스텀 역할

커스텀 역할을 만들어 권한을 새 역할에 결합합니다. 커스텀 역할을 사용하면 페르소나(예: 빌링 관리자)를 정의한 다음 해당 역할에 적절한 권한을 할당할 수 있습니다. 역할을 만든 후에는 [Datadog 역할 업데이트][2]에서 직접 또는 [Datadog 권한 API][3]을 통해 이 역할에 권한을 할당하거나 제거합니다.

**참고**: 사용자에게 새 커스텀 역할을 추가할 때는 해당 사용자와 연결된 관리되는 Datadog 역할을 제거해야 새 역할 권한을 적용할 수 있습니다.

## 권한 목록

다음 표에는 Datadog에서 사용 가능한 모든 권한의 이름, 설명 및 기본 역할이 나열되어 있습니다. 각 자산 유형에는 해당 읽기 및 쓰기 권한이 있습니다.

각 관리 역할은 더 낮은 수준의 역할로부터 모든 권한을 상속받습니다. 따라서 Datadog 표준 역할은 Datadog 읽기 전용을 기본 역할로 하여 표에 나열된 모든 권한을 갖습니다. 또한 Datadog 관리 역할에는 Datadog 표준 역할과 Datadog 읽기 전용 역할의 모든 권한이 포함됩니다.

{{% permissions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/account_management/rbac/granular_access
[2]: /ko/account_management/users/#edit-a-user-s-roles
[3]: /ko/api/latest/roles/#list-permissions