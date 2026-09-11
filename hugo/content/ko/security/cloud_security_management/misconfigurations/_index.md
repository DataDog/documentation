---
algolia:
  tags:
  - cspm
aliases:
- /ko/security_platform/cspm/
- /ko/security/cspm/#glossary
- /ko/security/cspm/
- /ko/security/misconfigurations/
title: 클라우드 보안 관리 설정 오류
---

Cloud Security Management Misconfigurations (CSM Misconfigurations)를 사용하면 클라우드 리소스의 현재 및 과거 보안 상태를 더 쉽게 평가 및 시각화하고, 감사 증거를 자동으로 수정하며, 공격에 취약하게 만드는 잘못된 구성을 교정할 수 있습니다. 잘못된 구성으로 인한 보안 취약점을 지속적으로 드러냄으로써 팀은 업계 표준을 준수하는 동시에 위험을 완화할 수 있습니다.

## 클라우드 리소스 전체에서 잘못된 구성 감지

Datadog의 [즉시 사용 가능한 컴플라이언스 규칙](#manage-out-of-the-box-and-custom-compliance-rules)을 사용하여 모든 클라우드 리소스에서 잘못된 구성을 감지, 우선순위를 지정, 수정함으로써 보안 태세를 강화하고 지속적인 컴플라이언스를 달성할 수 있습니다. 

[Overview 페이지][1]에서 보안 상태의 개요를 자세히 확인하세요. [Misconfigurations Explorer][2]를 사용하여 잘못된 구성의 세부 사항을 조사하고 이전의 구성을 분석합니다.

CSM Misconfigurations는 유형에 따라 15분~4시간 단위로 리소스를 평가합니다. Datadog은 스캔이 완료되자마자 새로운 잘못된 구성을 생성하고 조사 또는 감사 시 사용할 수 있도록 지난 15개월 동안의 모든 잘못된 구성에 대한 전체 기록을 저장합니다.

{{< img src="security/csm/csm_overview_2.png" alt="해결할 중요 보안 이슈 목록을 보여주는 Cloud Security Management의 Security Inbox 개요" width="100%">}}

## 업계 프레임워크 및 벤치마크 컴플라이언스 유지

CSM Misconfigurations에는 보안 전문가 팀이 유지 관리하는 1,000개 이상의 기본 컴플라이언스 규칙이 포함되어 있습니다. 규칙은 PCI 및 SOC2 컴플라이언스 프레임워크와 같은 컴플라이언스 표준 및 업계 벤치마크 내의 제어 및 요구 사항에 매핑됩니다.

[컴플라이언스 보고서][3]를 통해 컴플라이언스 프레임워크의 각 제어에 대해 얼마나 잘 수행하고 있는지 확인할 수 있습니다. 보고서에는 구성 오류가 가장 많이 발생한 리소스, 구성 오류가 통과/실패한 리소스 수에 대한 포괄적인 분석, 심각도가 높은 상위 3개 규칙 오류 등의 세부 정보가 포함됩니다.

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="CSM Misconfigurations 컴플라이언스 프레임워크" width="100%">}}

## 기본 및 맞춤형 컴플라이언스 규칙 관리

[기본 컴플라이언스 규칙][4]은 가장 중요한 위험을 표면화하므로 즉시 해결 조치를 취할 수 있습니다. Datadog은 지속적으로 새로운 기본 규칙을 개발하여 사용자의 계정으로 자동으로 가져옵니다. 각 규칙이 환경을 스캔하는 방법을 정의하고, [사용자 정의 규칙을 생성][6]하고, [실패한 잘못된 구성에 대한 실시간 알림을 설정(#set-up-real-time-notifications)하여 [사용자 맞춤 규칙을 생성합니다][5].

{{< img src="security/cspm/compliance_rules.png" alt="CSM Misconfigurations 컴플라이언스 규칙" width="100%">}}

## 실시간 알림 설정

환경에서 새로운 구성 오류가 감지되면 [실시간 알림을 보내][7] 위험 완화를 위한 조치를 취할 수 있습니다. 알림은 [Slack, 이메일, PagerDuty, 웹후크 등][8]으로 보낼 수 있습니다.

템플릿 변수와 Markdown을 사용하여 [알림 메시지를 사용자 정의합니다][9]. 기존 알림 규칙을 편집, 비활성화 및 삭제하거나 새 규칙을 생성하고 심각도 및 규칙 유형에 따라 알림이 트리거될 수 있도록 사용자에 맞게 로직을  정의합니다.

## 잘못된 구성 검토 및 수정

[Misconfigurations Explorer][10]를 사용하여 세부 사항을 조사합니다. 구성, 리소스에 적용되는 컴플라이언스 규칙, 리소스 소유자 및 환경 내 해당 위치에 대한 추가 컨텍스트를 제공하는 태그 등 리소스에 대한 자세한 정보를 확인합니다. 잘못된 구성이 비즈니스 사용 사례와 일치하지 않거나 허용되는 위험인 경우 최대 무기한으로 [잘못된 구성을 음소거][13]할 수 있습니다.

또한 [Jira 이슈를 생성][15]하여 팀에 할당하고, Terraform 수정을 사용하여 기본 잘못된 구성을 수정하는 코드 변경이 포함된 풀 리퀘스트를 GitHub에서 생성하고, [Workflow Automation][14]을 활용하여 자동화된 워크플로를 생성할 수도 있습니다 (사람의 개입 유무에 관계없이).

{{< img src="security/cspm/misconfigurations_explorer.png" alt="CSM Misconfigurations Explorer 페이지" width="100%">}}

## 시작하기

{{< learning-center-callout header="학습 센터에서 Datadog CSM을 사용하여 클라우드 보안 위험을 감지하고 우선순위를 지정하고 해결해 보세요." btn_title="지금 등록하기" btn_url="https://learn.datadoghq.com/courses/csm-misconfigurations">}}
  Datadog 학습 센터에 다양한 관련 코스가 있습니다. 무료로 등록하여 CSM misconfigurations로 클라우드 환경을 보호하는 방법을 알아보세요.
{{< /learning-center-callout >}}

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_security_management/setup">}}설정 및 구성 완료하기{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}클라우드 보안 관리 시작하기{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}CSM Misconfigurations에 대한 Datadog 역할 권한{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}CSM Misconfigurations에 대한 기본 클라우드 탐지 규칙{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}CSM Misconfigurations에 대한 기본 인프라스트럭처 탐지 규칙{{< /nextlink >}}
  {{< nextlink href="/security/cloud_security_management/misconfigurations/findings">}}잘못된 구성에 대해 자세히 알아보기{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}}Azure 환경의 보안 및 컴플라이언스 상태 모니터링{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}}Google Cloud 환경의 컴플라이언스 및 보안 상태를 개선{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/csm
[2]: https://app.datadoghq.com/security/compliance
[3]: /ko/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[4]: /ko/security/default_rules/#cat-posture-management-cloud
[5]: /ko/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks#view-your-compliance-posture
[6]: /ko/security/cloud_security_management/misconfigurations/custom_rules
[7]: /ko/security/notifications/
[8]: /ko/security/notifications/#notification-channels
[9]: /ko/security/notifications/#detection-rule-notifications
[10]: /ko/security/cloud_security_management/misconfigurations/findings
[11]: /ko/security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /ko/security/cloud_security_management/mute_issues
[14]: /ko/security/cloud_security_management/review_remediate/workflows/
[15]: /ko/security/cloud_security_management/review_remediate/jira?tab=csmmisconfigurations