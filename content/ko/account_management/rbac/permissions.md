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

권한은 사용자가 특정 리소스에 대해 갖는 액세스 유형을 정의합니다. 일반적으로 권한은 사용자에게 개체를 읽고, 편집하고, 삭제할 수 있는 권한을 부여합니다. 권한은 세 가지 기본 역할과 커스텀 역할을 포함하여 모든 역할의 액세스 권한의 기초가 됩니다.

### 기본 역할

기본적으로 기존 사용자는 세 가지 기본 제공 역할 중 하나에 연결됩니다:

- Datadog 관리자
- Datadog 표준
- Datadog 읽기 전용

이러한 역할 중 하나를 가진 모든 사용자는 [개별적으로 읽기 제한][1] 리소스를 제외한 모든 데이터 유형을 읽을 수 있습니다. 관리자 및 표준 사용자는 애셋에 대한 쓰기 권한이 있습니다. 관리자 사용자는 사용자 관리, 조직 관리, 청구 및 사용량과 관련된 중요한 애셋에 대해 추가적인 읽기 및 쓰기 권한을 가집니다.

### 커스텀 역할

커스텀 역할을 만들어 권한을 새 역할에 결합합니다. 커스텀 역할을 사용하면 청구 관리자와 같은 페르소나를 정의한 다음 해당 역할에 적절한 권한을 할당할 수 있습니다. 역할을 생성한 후, [Datadog에서 역할 업데이트][2]를 통해 직접 또는 [Datadog 권한 API][3]를 통해 이 역할에 권한을 할당하거나 제거합니다.

**참고**: 사용자에게 새 커스텀 역할을 추가할 때, 새 역할 권한을 적용하려면 해당 사용자와 연결된 기본 제공 Datadog 역할을 제거해야 합니다.

## 권한 목록

다음 표에는 Datadog에서 사용 가능한 모든 권한의 이름, 설명 및 기본 역할이 나와 있습니다. 각 애셋 유형에는 해당 읽기 및 쓰기 권한이 있습니다.

각 기본 제공 역할은 덜 강력한 역할로부터 모든 권한을 상속받습니다. 따라서 Datadog 표준 역할은 기본 역할로 Datadog 읽기 전용과 함께 표에 나열된 모든 권한을 갖습니다. 또한 Datadog 관리자 역할에는 Datadog 표준 역할과 Datadog 읽기 전용 역할의 모든 권한이 포함됩니다.

{{% permissions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /ko/account_management/rbac/granular_access
[2]: /ko/account_management/users/#edit-a-user-s-roles
[3]: /ko/api/latest/roles/#list-permissions