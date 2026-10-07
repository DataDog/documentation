---
aliases:
- /ko/security/cloud_security_management/guide/jira
further_reading:
- link: /security/cloud_security_management/guide
  tag: 설명서
  text: Cloud Security Management 가이드
- link: /integrations/jira/
  tag: 설명서
  text: Datadog Jira 통합
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM 신원 위험
  url: /security/cloud_security_management/identity_risks/
title: Cloud Security Management 이슈에 대한 Jira Issue 생성
---

{{< product-availability >}}

[Jira 통합][1]을 사용하여 CSM(클라우드 보안 관리) 보안 문제의 영향을 받는 리소스에 대한 Jira issue를 생성합니다. 클라우드 보안 관리용 Jira는 [CSM Misconfigurations][3] 및 [CSM Identity Risks][4]에 사용할 수 있습니다.

**참조**:
- Jira Issue를 생성하려면 `security_monitoring_findings_write` 권한이 있어야 합니다. Datadog의 기본 역할과 CSM에 사용가능한 역할 기반 액세스 제어 권한에 대한 내용은 [Role Based Access Control][2]를 참조하세요.
- 현재는 발견 사항당 하나의 Jira issue만 생성할 수 있습니다.

## Jira 통합 구성

CSM 보안 문제에 대한 Jira Issue를 생성하려면 [Jira 통합][5]을 구성해야 합니다. 자세한 지침은 [Jira][1] 통합 문서를 참조하세요.

## 영향을 받은 리소스에 대한 Jira Issue 생성

{{< tabs >}}

{{% tab "CSM Misconfigurations" %}}

잘못된 구성으로 인해 영향을 받은 하나 이상의 리소스에 대해 Jira Issue를 생성하려면:

1. [Misconfigurations Explorer][1]에서 잘못된 구성을 선택합니다.
2. **Resources Impacted**에서 하나 이상의 발견 사항을 선택합니다.
3. 상단에 있는 **Actions** 드롭다운 메뉴에서 *Create Jira Issue**를 클릭합니다.
4. 단일 이슈를 생성할지 아니면 여러 이슈(리소스당 하나의 이슈)를 생성할지 선택합니다.
5. Jira 계정을 선택합니다.
6. 이슈를 할당하려는 Jira 프로젝트를 선택합니다.
7. 사용 가능한 옵션에서 이슈 유형을 선택합니다. 이슈 유형에 따라 추가 정보를 입력해야 할 수도 있습니다.
8. **Create Issue**를 클릭합니다.

독립형 이슈 사이드 패널에서 Jira Issue를 생성할 수도 있습니다.

1. [Misconfigurations Explorer][1]에서 Group By 필터를 **Resources**로 설정합니다.
2. 리소스를 선택합니다.
3. **Misconfigurations** 탭에서 잘못된 구성을 선택합니다.
4. **Create Jira Issue**를 클릭합니다.
5. Jira 계정을 선택합니다.
6. 이슈를 할당하려는 Jira 프로젝트를 선택합니다.
7. 사용 가능한 옵션에서 이슈 유형을 선택합니다. 이슈 유형에 따라 추가 정보를 입력해야 할 수도 있습니다.
8. **Create Issue**를 클릭합니다.

Issue를 생성하면 Jira Issue에 대한 링크가 사이드 패널에 표시됩니다.

[1]: https://app.datadoghq.com/security/compliance

{{% /tab %}}

{{% tab "CSM Identity Risks" %}}

ID 위험의 영향을 받는 하나 이상의 리소스에 대해 Jira Issue를 생성하려면:

1. [Identity Risks Explorer][1]에서 ID 위험을 클릭합니다. 
2. **Resources Impacted**에서 하나 이상의 발견 사항을 선택합니다.
3. 상단에 있는 **Actions** 드롭다운 메뉴에서 *Create Jira Issue**를 클릭합니다.
4. 단일 이슈를 생성할지 아니면 여러 이슈(리소스당 하나의 이슈)를 생성할지 선택합니다.
5. Jira 계정을 선택합니다.
6. 이슈를 할당하려는 Jira 프로젝트를 선택합니다.
7. 사용 가능한 옵션에서 이슈 유형을 선택합니다. 이슈 유형에 따라 추가 정보를 입력해야 할 수도 있습니다.
8. **Create Issue**를 클릭합니다.

독립형 이슈 사이드 패널에서 Jira Issue를 생성할 수도 있습니다.

1. [Identity Risks Explorer][1]에서 Group By 필터를 **Resources**로 설정합니다.
2. 리소스를 선택합니다.
3. **Misconfigurations** 탭에서 ID 위험을 선택합니다.
4. **Create Jira Issue**를 클릭합니다.
5. Jira 계정을 선택합니다.
6. 이슈를 할당하려는 Jira 프로젝트를 선택합니다.
7. 사용 가능한 옵션에서 이슈 유형을 선택합니다. 이슈 유형에 따라 추가 정보를 입력해야 할 수도 있습니다.
8. **Create Issue**를 클릭합니다.

Issue를 생성하면 Jira Issue에 대한 링크가 사이드 패널에 표시됩니다.

[1]: https://app.datadoghq.com/security/identities

{{% /tab %}}

{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/jira/
[2]: /ko/account_management/rbac/permissions/#cloud-security-platform
[3]: /ko/security/cloud_security_management/misconfigurations/
[4]: /ko/security/cloud_security_management/identity_risks/
[5]: https://app.datadoghq.com/integrations/jira?search=jira