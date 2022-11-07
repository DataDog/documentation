---
aliases:
- /kr/account_management/faq/managing-global-role-permissions
disable_toc: true
further_reading:
- link: /account_management/rbac/
  tag: 설명서
  text: 역할 생성, 갱신, 삭제 방법을 알아봅니다
- link: /api/v2/roles/#list-permissions
  tag: 설명서
  text: Permission API로 역할 권한 허용 관리하기
kind: 설명서
title: Datadog 역할 권한 허용
---

역할을 생성한 다음 [Datadog에서 역할을 업데이트][1]하거나 또는[Datadog Permission API][2]를 이용해 바로 권한을 부여/삭제할 수 있습니다. 아래의 이용 가능한 권한 목록을 참조하세요.

## 개요

### 일반 권한

일반 권한은 역할에 대해 기본적인 수준의 액세스를 부여합니다. [고급 권한](#advanced-permissions)은 기본 권한을 보강하기 위해 특별히 정의된 권한입니다.

{{< permissions group="일반" >}}

**참조**: `read-only` 권한은 없다는 점에 유의하세요. 역할에 `standard` 권한이 없는 경우 읽기 전용으로 정의되기 때문입니다.

### 고급 권한

기본적으로 기존 사용자는 바로 사용할 수 있는 역할 세 가지 중 하나를 배정받습니다. 역할은 다음과 같습니다:

- Datadog 관리자(Admin)
- Datadog 스탠다드(Standard)
- Datadog 읽기 전용(Read-Only.)

모든 사용자는 전체 데이터 유형을 읽을 수 있습니다. 관리자 및 스탠다드 사용자는 애셋에 대하여 쓰기 권한을 갖습니다.

**참조**: 새로운 커스텀 역할을 사용자에게 추가하는 경우, 바로 사용할 수 있도록 준비된 Datadog 역할은 해제하시기 바랍니다. 이렇게 해야 새로운 역할의 권한 부여가 실행됩니다.

일반 권한 부여에 더불어 특정 애셋이나 데이터 유형을 대상으로 한층 세밀하게 권한 부여를 정의할 수 있습니다. 권한은 전체(글로벌) 범위로 적용할 수도 있고, 특정 요소의 하위 세트에만 적용하도록 범위를 지정할 수도 있습니다. 아래에서 옵션의 자세한 설명과 각 사용 가능한 권한이 미치는 영향을 참조하시기 바랍니다.

{{% permissions %}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Log Rehydration은 Datadog, Inc.의 상표입니다.

[1]: /kr/account_management/users/#edit-a-user-s-roles
[2]: /kr/api/latest/roles/#list-permissions