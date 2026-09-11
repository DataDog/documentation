---
aliases:
- /ko/security_platform/cspm/configuration_rules
- /ko/security/cspm/configuration_rules
- /ko/security/cspm/detection_rules
- /ko/security/cspm/compliance_rules
- /ko/security/misconfigurations/compliance_rules
further_reading:
- link: /security/cloud_security_management/misconfigurations
  tag: 설명서
  text: CSM Misconfigurations 시작하기
- link: /security/cloud_security_management/misconfigurations/custom_rules/
  tag: 설명서
  text: 커스텀 규칙
- link: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks/
  tag: 설명서
  text: Misconfigurations Reports
title: CSM Misconfigurations 컴플라이언스 규칙 관리
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) [기본 컴플라이언스 규칙][1]은 클라우드 리소스의 구성을 평가하고 잠재적인 구성 오류를 식별하여 즉시 해결 조치를 취할 수 있도록 합니다.

컴플라이언스 규칙은 모든 Datadog Security 컴플라이언스 규칙과 동일한 [조건부 논리][2]를 따릅니다. CSM Misconfigurations의 경우 각 규칙은 하나 이상의 [컴플라이언스 프레임워크 또는 업계 벤치마크][4] 내의 제어에 매핑됩니다.

CSM Misconfigurations는 다음 규칙 유형을 사용하여 클라우드 인프라스트럭처 구성을 검증합니다.

- [**클라우드 구성**][1]: 이 컴플라이언스 규칙은 클라우드 환경 내의 리소스 구성을 분석합니다. 예를 들어, [Cloudfront distribution is encrypted][3] 규칙은 Amazon CloudFront 배포 구성의 암호화된 상태를 평가합니다.
- [**인프라스트럭처 구성**][5]: 이 컴플라이언스 규칙은 Docker 및 Kubernetes에 대한 CIS 컴플라이언스 벤치마크에 정의된 대로 컨테이너 및 Kubernetes 클러스터를 분석하여 구성 문제를 찾습니다. 예를 들어, [/etc/default/docker file permissions are set to 644 or more restrictively][6] 규칙은 호스트에서 실행되는 Docker 파일 권한을 평가합니다.

## 기본 컴플라이언스 규칙 살펴보기

클라우드 공급자별로 기본 컴플라이언스 규칙을 필터링하려면:

1. [**Misconfiguration Rules**][13] 페이지로 이동합니다.
2. **Tag** 패싯에서 다음 값 중 하나를 선택합니다.
    - **AWS**: cloud_provider:aws
    - **Azure**: cloud_provider:azure
    - **Google Cloud**: cloud_provider:gcp
    - **Docker**: framework:cis-docker
    - **Kubernetes**: framework:cis-kubernetes

## 각 규칙에 따라 환경을 검사하는 방법을 사용자 정의합니다.

클라우드 구성 쿼리를 직접 사용자 정의하는 것은 현재 지원되지 않지 않습니다. 하지만 각 규칙에 따라 환경을 검사하는 방법을 사용자 정의할 수 있습니다.

[Rules][13] 페이지에서 규칙을 선택하여 세부정보 페이지를 엽니다. **Exclude benign activity with suppression queries**에서 규칙이 환경을 스캔하는 방법에 대한 필터링 논리를 설정합니다.

예를 들어 **This rule will not generate a misconfiguration if there is a match with any of the following suppression queries** 기능을 사용하여 `env:staging`로 태그가 지정된 리소스를 제외할 수 있습니다. **Only generate a misconfiguration if there is a match with any of the following queries** 기능을 사용하여 특정 규칙의 범위를 `compliance:pci` 태그가 지정된 리소스로 제한할 수도 있습니다.

규칙을 설정한 후 페이지 하단의 **Update Rule**를 클릭하여 변경사항을 적용합니다.

{{< img src="security/cspm/frameworks_and_benchmarks/never-trigger-misconfiguration.png" alt="규칙 범위에 포함하거나 제외할 태그를 선택하여 환경 검사 방법을 사용자 정의하세요" >}}

## 컴플라이언스 규칙에 대한 알림 대상 설정

알림 대상을 추가해 환경에서 새로운 구성 오류가 감지되면 실시간 알림을 보낼 수 있습니다. 사용 가능한 알림 옵션은 다음과 같습니다.

- [Slack][14]
- [Jira][15]
- [PagerDuty][16]
- [ServiceNow][17]
- [Microsoft Teams][18]
- [Webhooks][19]
- 이메일

[Rules][13] 페이지에서 규칙을 선택하여 세부정보 페이지를 엽니다. **Set severity and notifications** 섹션에서 각 규칙 사례에 대해 0개 이상의 알림 대상을 구성합니다. 미리 설정된 심각도는 수정할 수 없습니다. 컴플라이언스 규칙에 대한 알림 구성 지침은 [Notifications][7]를 참조하세요.

또는 심각도, 규칙 유형, 규칙 태그, 신호 속성 및 신호 태그와 같은 파라미터를 기반으로 여러 컴플라이언스 규칙에 걸쳐 있는 [알림 규칙][21]을 만듭니다. 이를 통해 개별 컴플라이언스 규칙에 대한 알림 기본 설정을 수동으로 편집할 필요가 없습니다.

**참고**: 알림이 활성화된 규칙에 대해 잘못된 구성이 감지되면 실패한 구성이 [Signals Explorer][22]에도 나타납니다.

{{< img src="security/cspm/frameworks_and_benchmarks/notification-2.png" alt="규칙 세부정보 페이지의Set severity and notifications 섹션" >}}

## 커스텀 규칙 만들기

커스텀 규칙을 생성하여 환경에 적용되는 규칙을 확장하고 보안 상태를 평가할 수 있습니다. 또한 기본 감지 규칙을 복제하고 사본을 편집할 수도 있습니다(Google Cloud에만 해당). 자세한 내용은 [커스텀 규칙][20]을 참조하세요.

## 사용되지 않는 규칙

고품질의 성능을 유지하기 위해 모든 컴플라이언스 규칙에 대한 정기적인 감사가 수행됩니다. 더 이상 사용되지 않는 규칙은 개선된 규칙으로 대체됩니다.

사용되지 않는 규칙은 다음 프로세스를 통해 결정됩니다.

1. 규칙에 사용되지 않는 날짜 경고가 있습니다. UI의 다음 위치에서 이 경고가 표시됩니다.
    - 신호 사이드 패널의 **Rule Details > Playbook** 섹션
    - Misconfigurations 사이드 패널
    - 해당 특정 규칙에 대한 [규칙 편집기][23]
2. 규칙이 더 이상 사용되지 않으면 규칙이 삭제되기까지 15개월의 기간이 있습니다. 이는 신호 유지 기간이 15개월이기 때문입니다. 이 시간 동안 UI에서 [규칙 복제][23]를 통해 규칙을 다시 활성화할 수 있습니다.
3. 규칙이 삭제된 후에는 복제하여 재활성화할 수 없습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/default_rules/#cat-csm-misconfigurations-cloud
[2]: /ko/security/detection_rules/
[3]: https://docs.datadoghq.com/ko/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /ko/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[5]: /ko/security/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/ko/security_monitoring/default_rules/cis-docker-1.2.0-3.22/
[7]: /ko/security/notifications/
[13]: https://app.datadoghq.com/security/configuration/compliance/rules
[14]: /ko/integrations/slack/
[15]: /ko/integrations/jira/
[16]: /ko/integrations/pagerduty
[17]: /ko/integrations/servicenow/
[18]: /ko/integrations/microsoft_teams/
[19]: /ko/integrations/webhooks/
[20]: /ko/security/cloud_security_management/misconfigurations/custom_rules/
[21]: /ko/security/notifications/rules/
[22]: /ko/security/cloud_security_management/misconfigurations/signals_explorer/
[23]: /ko/security/detection_rules/#clone-a-rule