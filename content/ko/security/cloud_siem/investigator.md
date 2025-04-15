---
aliases:
- /ko/security_platform/cloud_siem/cloud_security_investigator/
- /ko/security_platform/cloud_siem/cloud_siem_investigator/
- /ko/security_platform/cloud_siem/investigator/
- /ko/security/cloud_siem/cloud_security_investigator/
- /ko/security/cloud_siem/cloud_siem_investigator/
further_reading:
- link: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
  tag: 설명서
  text: Cloud SIEM용 AWS 구성
- link: /cloud_siem/explorer/
  tag: 설명서
  text: 보안 시그널 익스플로러 알아보기
- link: https://www.datadoghq.com/blog/visualize-cloud-activity-datadog-cloud-siem-investigator/
  tag: 블로그
  text: Datadog Cloud SIEM Investigator로 클라우드 환경 활동 시각화
title: Investigator
---

## 개요

보안 신호가 사용자 또는 리소스의 의심스러운 활동에 대해 경고 시 이를 조사할 때 자주 묻는 질문입니다.

- 사용자가 다른 계정에 액세스하고 있나요?
- 특정 기간에 사용자가 취한 다른 조치는 무엇인가요?
- 사용자가 리소스에 대해 취한 모든 작업은 무엇인가요?
- 어떤 사용자가 이 리소스와 상호작용했나요?

예를 들어, 누군가가 Amazon S3 버킷의 구성을 모든 사람이 액세스할 수 있도록  변경했습니다. 하지만 위임된 역할에 의해 해당 작업이 수행되었다는 보안 신호를 받았다고 가정해 보겠습니다. 크리덴셜이 유출되었을 수 있으므로 누가 이러한 조치를 취했는지, 최근에 어떤 다른 활동을 했는지 조사해야 합니다.

Cloud SIEM Investigator는 엔터티 간에 피벗할 수 있는 그래픽 인터페이스를 제공하므로 사용자 행동과 환경에 미치는 영향을 확인할 수 있습니다.


## 활동 시각화 및 조사

{{< tabs >}}
{{% tab "AWS" %}}

1. **Security** > **Cloud SIEM**으로 이동하여 [**Investigator**][1] 탭을 클릭합니다.

2. **In** 필드 드롭다운 메뉴에서 엔터티 유형을 선택합니다.

3. 엔터티를 선택하거나 **Investigate**필드에 특정 엔터티 이름을 입력하여 해당 엔터티와 관련된 활동의 다이어그램을 확인합니다.

4. 노드를 클릭하고 **View related logs** 또는 **View in Log Explorer**를 선택하면 관련 로그를 볼 수 있습니다. 작업별로 필터링하려면 **and filter by** 드롭다운 메뉴를 사용하세요.

[1]: https://app.datadoghq.com/security/investigator/aws

{{% /tab %}}

{{% tab "GCP" %}}

1. **Security** > **Cloud SIEM**으로 이동하여 **Investigator** 탭을 클릭한 후 [**GCP**][1] 탭을 클릭합니다.

2. **In** 필드 드롭다운 메뉴에서 엔터티 유형을 선택합니다.

3. 엔터티를 선택하거나 **Investigate**필드에 특정 엔터티 이름을 입력하여 해당 엔터티와 관련된 활동의 다이어그램을 확인합니다.

4. 노드를 클릭하고 **View related logs** 또는 **View in Log Explorer**를 선택하면 관련 로그를 볼 수 있습니다. 작업별로 필터링하려면 **and filter by** 드롭다운 메뉴를 사용하세요.

[1]: https://app.datadoghq.com/security/investigator/gcp
{{% /tab %}}

{{% tab "Azure" %}}

1. **Security** > **Cloud SIEM**으로 이동하여 **Investigator** 탭을 클릭한 후 [**Azure*][1] 탭을 클릭합니다.

2. **In** 필드 드롭다운 메뉴에서 엔터티 유형을 선택합니다.

3. 엔터티를 선택하거나 **Investigate**필드에 특정 엔터티 이름을 입력하여 해당 엔터티와 관련된 활동의 다이어그램을 확인합니다.

4. 노드를 클릭하고 **View related logs** 또는 **View in Log Explorer**를 선택하면 관련 로그를 볼 수 있습니다. 작업별로 필터링하려면 **and filter by** 드롭다운 메뉴를 사용하세요.

[1]: https://app.datadoghq.com/security/investigator/azure
{{% /tab %}}

{{< /tabs >}}

보안 신호에서 직접 Cloud SIEM Investigator로 이동할 수도 있습니다. 보안 신호 패널에서 **Investigate user activity**(여기서 `user`는 문제가 있는 사용자 ID)를 클릭하면 특정 사용자 ID로 필터링된 Investigator 보기가 표시됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}