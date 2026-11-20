---
description: Datadog Cloud SIEM으로 클러스터 작업을 모니터링할 수 있도록 Amazon EKS 감사 로그에 대한 로그 수집을
  활성화하세요.
title: Amazon EKS 감사 로그용 로그 수집
---
## 개요 {#overview}

클러스터 관리자는 Amazon EKS 감사 로그를 통해 EKS 클러스터의 작업에 관한 인사이트를 얻을 수 있습니다. Amazon EKS 감사 로그 수집을 활성화하면 [Datadog Cloud SIEM][1]을 설정해 사용할 수 있고, 이를 통해 원치 않는 작업이나 위협이 발생할 때 즉각적으로 EKS 클러스터 내에서 모니터링할 수 있습니다.

## 설정 {#setup}

### Amazon EKS 감사 로그 {#amazon-eks-audit-logs}

#### 새 클러스터 {#new-cluster}

1. Amazon EKS 클러스터가 없는 경우, [Amazon EKS 클러스터 생성][2] 설명서에 따라 생성합니다.
1. 설정 중, 구성 로깅 페이지에서 **Audit logs**를 활성화합니다.

#### 기존 클러스터 {#existing-cluster}

1. 이미 Amazon EKS 클러스터를 구성했다면 [Amazon EKS 콘솔][2]에서 해당 클러스터로 이동합니다.
1. EKS 클러스터를 클릭합니다.
1. **Logging** 탭을 클릭합니다.
1. **Manage logging** 버튼을 클릭합니다.
1. **Audit** 옵션을 **Enabled**로 전환하고 **Save changes** 버튼을 클릭합니다.

### Datadog AWS 통합 {#datadog-aws-integration}

다음으로 AWS 통합을 설정합니다. [AWS 통합 설정][3] 설명서를 따르세요.

### Datadog Forwarder {#datadog-forwarder}

AWS 통합 설정이 완료되면 Datadog Forwarder를 설치하고 구성합니다. [Datadog Forwarder 설치][4] 설명서를 따르세요.

**참고**: [트리거 설정][5] 단계에는 Lambda ARN이 필요합니다. AWS 콘솔에서 [Lambda > Functions > `Your_Function_Name`][6]으로 이동하면 Lambda ARN을 확인할 수 있습니다. Function ARN은 Function 개요에 나열되어 있습니다.

## Log Explorer {#log-explorer}

Amazon EKS 감사 로그, Datadog AWS 통합, Datadog Forwarder를 모두 설정하고 나면 [Datadog Log Explorer][7]에서 EKS 감사 로그를 볼 수 있습니다.

**참고**: 로그가 Log Explorer로 스트리밍되기 시작하는 데 몇 초 정도 걸릴 수 있습니다.

Log Explorer에서 EKS 감사 로그만 보려면 Log Explorer 검색창에서 `source:kubernetes.audit`을 쿼리하거나 패싯 패널의 **Source** 아래에서 `kubernetes.audit` 패싯을 선택하여 EKS 감사 로그로 필터링할 수 있습니다.

## Cloud SIEM {#cloud-siem}

Datadog Cloud SIEM을 사용해 EKS 클러스터에 발생할 수 있는 잠재적 구성 이상이나 타겟팅된 공격을 탐지할 수 있습니다.

Cloud SIEM으로 Amazon EKS 감사 로그를 모니터링하려면 Cloud SIEM을 설정하고 구성 이상이나 위협이 탐지될 때 [Security Signals Explorer][10]에 [보안 신호][9]를 생성하는 사용자 지정 [로그 탐지 규칙][8]을 만드세요.

### 설정 {#setup-1}

Cloud SIEM을 설정하고 구성합니다. 인앱 [Cloud SIEM 설정 및 구성 지침][1]을 참조하세요.

Cloud SIEM을 설정하고 구성한 뒤, 새 Cloud SIEM 규칙을 처음부터 만들거나 Log Explorer에서 새 규칙으로 쿼리를 내보냅니다.

### 보안 모니터링 규칙 검토 {#review-security-monitoring-rules}

환경 내 위협을 탐지하는 기본 제공 [Cloud SIEM 탐지 규칙][11]을 확인하세요. 이러한 규칙을 검색, 편집, 복제하는 방법에 대한 자세한 내용은 [탐지 규칙 생성 및 관리][12]를 참조하세요.

### 새 Cloud SIEM 규칙 생성 {#create-a-new-cloud-siem-rule}

규칙을 생성하려면 인앱 [규칙 설정 및 구성][13] 페이지로 이동하세요. 설정을 완료하려면 [로그 탐지 규칙 설명서][14]를 참조하세요.

### Log Explorer에서 쿼리를 규칙으로 내보내기 {#export-a-query-to-a-rule-in-log-explorer}

1. Log Explorer의 검색창에서 쿼리를 생성합니다. 예를 들어 `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`를 기준으로 필터링합니다.
1. **Export** 버튼을 클릭하고 **Export to detection rule**을 선택합니다.
1. 이 기능은 쿼리를 내보내며, 로그 탐지 규칙 설정의 두 번째 단계에서 이를 정의할 수 있습니다. 탐지 방법을 선택하세요. 이 경우 **New Value**를 선택합니다. 'Detect new value' 드롭다운 메뉴에서 `@usr.name` 속성을 선택하세요. 이렇게 하면 사용자가 포드에서 처음으로 실행할 때 경보를 받게 보냅니다. 첫 번째 경보 이후에는 Datadog이 동일한 사용자에 대해 다시 경고하지 않습니다. 또는 이러한 이벤트가 사용자 정의 임계값을 초과할 때를 탐지하려면 탐지 방법으로 **임계값 규칙**을 사용합니다.
1. 규칙 구성의 나머지 단계를 완료하는 방법은 [로그 탐지 규칙 설명서][14]를 참조하세요.

[1]: /ko/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /ko/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /ko/logs/guide/forwarder/
[5]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/
[9]: /ko/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /ko/security/default_rules/#cat-cloud-siem
[12]: /ko/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /ko/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule/#create-a-rule