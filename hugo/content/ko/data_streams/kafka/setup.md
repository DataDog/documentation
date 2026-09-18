---
description: Kafka 콘솔을 설정합니다(필수 구성 요소, Agent 구성, Kafka 메시지 검사에 필요한 추가 단계 포함).
title: Kafka 콘솔 설정
---
이 페이지에서는 Kafka 콘솔에 대한 필수 구성 요소와 설정 단계를 다룹니다.

## 전제 조건 {#prerequisites}

### Datadog Agent 버전 {#datadog-agent-version}

Datadog Agent 버전 7.78 이상이 필요합니다.

### ACL 권한 {#acl-permissions}

Kafka 클러스터에서 ACL을 사용하는 경우 Datadog Agent 사용자에게는 다음과 같은 최소 권한이 필요합니다.

| 리소스 이름 | 리소스 유형 | 작업        |
|---------------|---------------|------------------|
| `kafka-cluster` | `CLUSTER`   | `Describe`       |
| `kafka-cluster` | `CLUSTER`   | `DescribeConfigs` |
| `*`           | `TOPIC`       | `Describe`       |
| `*`           | `TOPIC`       | `DescribeConfigs` |
| `*`           | `GROUP`       | `Describe`       |

## 설정 {#setup}

[Kafka 콘솔 설정 페이지][1]로 이동하여 {{< ui >}}Get Started{{< / ui >}}를 클릭하세요. 그런 다음 환경을 선택하고 지침을 따르세요. 지원이 필요한 경우 {{< ui >}}Request a pairing session{{< /ui >}}을 선택하세요.

{{< img src="data_streams/kafka_setup-2.png" alt="환경 선택, 보안 프로토콜, 스키마 레지스트리 옵션 및 Kubernetes 구성 지침을 보여주는 Kafka 콘솔 설정 대화 상자" >}}

설정 페이지에서 환경별 구성 지침을 제공합니다. {{< ui >}}Copy for AI{{< /ui >}}를 사용하여 지침을 AI 에이전트에 직접 복사할 수 있습니다.

## 메시지 검사 활성화 {#enable-message-inspection}

이 섹션은 {{< ui >}}Messages{{< /ui >}} 섹션에서 Kafka 메시지 페이로드를 조회하려는 경우에만 적용됩니다. 메시지 검사를 사용할 계획이 없다면 건너뛰세요.

### 추가 ACL 권한 {#additional-acl-permission}

[필수 구성 요소](#acl-permissions)에 나열된 ACL 권한 외에도 Datadog Agent 사용자에게는 토픽에 대한 `READ` 권한이 필요합니다.

| 리소스 이름 | 리소스 유형 | 작업 |
|---------------|---------------|-----------|
| `*`           | `TOPIC`       | `Read`    |

`*` 리소스 이름은 모든 토픽에 대한 `Read` 액세스 권한을 부여합니다. Agent를 특정 토픽으로 제한하려면 `*`를 해당 토픽 이름으로 바꾸세요.

### Remote Configuration {#remote-configuration}

[원격 구성][3]은 다음 세 가지 수준에서 활성화되어야 합니다.

1. [조직 수준][5]
2. [Agent 수준][10]
3. [API 키 수준][11]

### 사용자 권한 {#user-permission}

Kafka 메시지를 조회하려면 사용자에게 `Data Streams Monitoring Capture Messages` 권한이 있어야 합니다.

[{{< ui >}}Profile{{< /ui >}} 페이지][7]에서 현재 권한을 확인할 수 있습니다. 권한을 활성화하려면 [{{< ui >}}Roles{{< /ui >}} 페이지][8]에서 기존 역할을 편집하거나 역할을 생성하세요. 역할을 수정할 권한이 없는 경우 조직 관리자에게 문의하세요.

{{% collapse-content title="역할 생성 및 사용자 할당" level="h4" expanded=false %}}

#### 1. 역할 생성 {#1-create-a-role}

1. Datadog의 [{{< ui >}}Roles{{< /ui >}} 페이지][8]로 이동합니다.
2. 오른쪽 상단 모서리에 있는 {{< ui >}}+ New Role{{< /ui >}}을 클릭합니다.
   <div class="alert alert-info">
   '+ New Role' 버튼 대신 'Read Only'가 표시되면 역할을 생성할 권한이 없습니다. 도움이 필요하면 Datadog 관리자에게 문의하세요.
   </div>
3. 역할을 설명하는 이름(예: 'Data Streams Messages Access')을 입력합니다.
4. {{< ui >}}Search Permissions{{< /ui >}} 필드에 `Data Streams Monitoring Capture Messages`를 입력합니다.
5. 검색 결과에서 권한을 선택하여 이 역할에 대해 활성화합니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
7. 역할 목록에서 역할을 검색하여 성공적으로 생성되었는지 확인합니다.

#### 2. 사용자에게 역할 할당 {#2-assign-the-role-to-users}

1. Datadog의 [{{< ui >}}Users{{< /ui >}} 페이지][9]로 이동합니다.
2. 역할을 할당할 사용자를 찾아 클릭합니다.
3. 사용자 세부 정보 패널에서 이름 옆의 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
   <div class="alert alert-info">
   {{< ui >}}Edit{{< /ui >}} 버튼이 보이지 않으면 사용자 역할을 수정할 수 있는 관리자 권한이 필요합니다. Datadog 관리자에게 문의하세요.
   </div>
4. 열리는 모달에서 {{< ui >}}Roles{{< /ui >}} 섹션을 찾습니다.
5. 새로 생성한 역할을 사용자에게 추가합니다.
6. {{< ui >}}Save{{< /ui >}}를 클릭합니다.
7. {{< ui >}}User updated{{< /ui >}} 확인 메시지가 나타나는지 확인하여 변경 사항이 성공적으로 적용되었는지 확인합니다.

{{% /collapse-content %}}

[1]: https://app.datadoghq.com/data-streams/kafka/setup
[3]: /ko/remote_configuration/
[5]: https://app.datadoghq.com/organization-settings/remote-config
[7]: https://app.datadoghq.com/personal-settings/profile
[8]: https://app.datadoghq.com/organization-settings/roles
[9]: https://app.datadoghq.com/organization-settings/users
[10]: /ko/remote_configuration/#enable-remote-configuration
[11]: /ko/account_management/api-app-keys/