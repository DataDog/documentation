---
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: 설명서
  text: Cloud SIEM 기본 탐지 규칙을 살펴보세요
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: 설명서
  text: Security Signals Explorer에 대해 알아보기
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: 설명서
  text: 사용자 지정 탐지 규칙 생성
title: Cloud SIEM용 OCI 구성 가이드
---
## 개요 {#overview}

Cloud SIEM은 Datadog에서 처리된 모든 로그에 탐지 규칙을 적용하여 타겟팅된 공격, 위협 인텔리전스에 나열된 IP와의 통신, 보안되지 않은 리소스 수정과 같은 위협을 탐지합니다. 탐지된 위협은 분류할 수 있도록 Security Signals Explorer에 보안 신호로 표시됩니다.

이 가이드에서는 OCI 감사 로그로 위협 탐지를 시작하기 위한 다음 단계를 안내합니다.

1. [Datadog의 OCI 통합 설정](#set-up-datadogs-oci-integration)  
2. [로그 수집 활성화](#enable-log-collection)
3. [Cloud SIEM을 사용하여 보안 신호 분류](#use-cloud-siem-to-triage-security-signals)

## Datadog의 OCI 통합 설정 {#set-up-datadogs-oci-integration}

QuickStart(권장) 또는 Terraform 방법을 사용하여 Datadog의 [OCI 통합][5]을 설정하세요.

## 로그 수집 활성화 {#enable-log-collection}

Datadog OCI 통합 타일에서 로그 수집이 활성화되어 있는지 확인하세요.

{{< img src="security/cloud_siem/guide/oci_config_guide/oci_logs_enabled.png" alt="로그 수집이 활성화된 Datadog의 OCI 통합 타일" style="width:90%;" >}}

## Cloud SIEM을 사용하여 보안 신호 분류 {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM은 OCI 감사 로그를 포함하여 처리된 모든 로그에 기본 제공 탐지 규칙을 적용합니다. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성되며 Security Signals Explorer에서 확인할 수 있습니다.

- [Cloud SIEM Signals Explorer][1]로 이동하여 위협을 확인하고 분류합니다. 자세한 정보는 [보안 신호 조사][2]를 참조하세요.  
- 로그에 적용되는 [기본 제공 탐지 규칙][3]을 확인합니다.  
- 특정 사용 사례에 맞는 위협을 탐지하는 [규칙을 생성][4]합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/siem/signals
[2]: /ko/security/cloud_siem/triage_and_investigate/investigate_security_signals/
[3]: /ko/security/default_rules/#cat-cloud-siem
[4]: /ko/security/detection_rules/#create-detection-rules
[5]: /ko/integrations/oracle-cloud-infrastructure/?tab=createvcnrecommended