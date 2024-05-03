---
kind: 가이드
title: Amazon EKS 감사 로그용 로그 수집
---

## 개요

클러스터 관리자는 Amazon EKS 감사 로그를 통해 EKS 클러스터의 작업에 관한 인사이트를 얻을 수 있습니다. Amazon EKS 감사 로그 수집을 활성화하면 [Datadog Cloud SIEM][1]을 설정해 사용할 수 있고, 이를 통해 원치 않는 작업이나 위험이 발생할 때 즉각적으로 EKS 클러스터 내에서 모니터링할 수 있습니다.

## 구성

### Amazon EKS 감사 로그

#### 새 클러스터

1. Amazon EKS 클러스터가 없는 경우, [Amazon EKS 클러스터 생성][2] 설명서에 따라 생성하세요.
1. 설정 중, 구성 로깅 페이지에서 **Audit logs**를 활성화하세요

#### 기존 클러스터

1. 이미 Amazon EKS 클러스터를 구성한 상태라면 [Amazon EKS 콘솔][2]로 들어가 클러스터를 탐색하세요.
1. 내 KES 클러스터를 클릭하세요.
1. **Logging** 탭을 클릭하세요.
1. **Manage logging* 버튼을 클릭하세요
1. **Audit** 옵션을 **Enabled**로 토글하고 **Save changes** 버튼을 클릭하세요

### Datadog AWS 통합

그 후 AWS 통합을 설정하세요. [AWS 통합 설정][3] 설명서를 따르세요

### Datadog Forwarder

AWS 통합 설정을 완료한 후 Datadog Forwarder를 설치하고 구성하세요. [Datadog Forwarder 설치][4] 설명서를 따르세요.

**참고**: [설정 트리거][5] 단계에 Lambda ARN이 필요합니다. 내 Lambda ARN을 보려면 AWS 콘솔에서 [Lambda > Functions > `Your_Function_Name`][6]으로 이동하세요. Function 개요 아래에 Function ARN이 있습니다.

## Log Explorer

Amazon EKS 감사 로그, Datadog AWS 통합, Datadog Forwarder를 모두 설정하고 나면 [Datadog Log Explorer][7]에서 EKS 감사 로그를 볼 수 있습니다.

**참고**: Log Explorer로 로그를 스트리밍하는 데 몇 초 정도 걸릴 수 있습니다. 

Log Explorer에서 EKS 감사 로그만 보려면 Log Explorer 검색 창에 `source:kubernetes.aduit`를 쿼리하거나 패싯 패널의 **Source** 아래에서 `kubernetes.audit` 패싯을 선택해 EKS 감사 로그를 필터링할 수 있습니다.

## Cloud SIEM

Datadog Cloud SIEM을 사용해 EKS 클러스터에 발생할 수 있는 잠재적 구현 실수나 대상 공격을 감지할 수 있습니다.

Cloud SIEM으로 Amazon EKS 감사 로그를 모니터링하려면 Cloud SIEM을 설정하고 구성 이상이나 위협이 감지될 때 [Security Signals Explorer][10]에 [보안 신호][9]를 생성하는 커스텀 [로그 탐지 규칙][8]을 만드세요.

### 구성

Cloud SIEM을 설정하고 구성합니다. 인앱 [Cloud SIEM 설정 및 구성 지침][1]을 참고하세요.

Cloud SIEM을 설정하고 구성한 뒤, 새 Cloud SIEM 규칙을 처음부터 만들거나 Log Explorer에서 새 규칙으로 쿼리를 내보냅니다. 

### 보안 모니터링 규칙 검토

내 환경에서 위협을 탐지하려면 기본 [Cloud SIEM 탐지 규칙][1]을 참고하세요. 이 같은 규칙을 검색, 편집, 복제하는 자세한 방법은 [탐지 규칙 생성 및 관리][12]를 참고하세요.

### 새 Cloud SIEM 규칙 생성

규칙을 만들려면 인앱에서 [규칙 설정 및 구성][13] 페이지로 이동하세요. 설정을 완료하려면 [로그 탐지 규칙 설명서][14]를 참고하세요.

### Log Explorer에서 규칙으로 쿼리 내보내기

1. Log Explorer에서 검색 창에 쿼리를 생성합니다. 예를 들어 `source:kubernetes.audit @objectRef.resource:pods @objectRef.subresource:exec @http.method:create @http.status_code:[101 TO 299]`로 필터링합니다.
1. **Export** 버튼을 클릭하고 **Export to detection rule**을 선택하세요.
1. 이 기능을 사용하면 쿼리를 내보내고 Log Detection 규칙 설정 단계 2에서 정의할 수 있습니다. 탐지 방법을 선택하세요. 이 때 **New Value**를 선택하세요. Detect new value 드롭다운 메뉴에서 `@usr.name`를 선택하세요. 이렇게 설정하면 사용자가 Pod에서 처음으로 실행할 때 알림을 보냅니다. Datadog에서는 알림을 처음에 한 번 보낸 후 같은 사용자에게 다시 알림을 보내지 않습니다. 이 방법 대신 이벤트가 사용자 정의 임계값을 초과할 경우에 이를 감지하는 **threshold rule**을 탐지 방법으로 사용할 수도 있습니다.
1. 규칙 구성에 관한 나머지 단계를 마저 완료하려면 [로그 탐지 설명서][14]를 따르세요.

[1]: /ko/security/cloud_siem/
[2]: https://docs.aws.amazon.com/eks/latest/userguide/create-cluster.html
[3]: /ko/integrations/amazon_web_services/?tab=roledelegation#setup
[4]: /ko/logs/guide/forwarder/
[5]: /ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#set-up-triggers
[6]: https://console.aws.amazon.com/lambda/home#/functions
[7]: https://app.datadoghq.com/logs
[8]: /ko/security/cloud_siem/log_detection_rules/
[9]: /ko/getting_started/cloud_siem/#phase-2-signal-exploration
[10]: https://app.datadoghq.com/security
[11]: /ko/security/default_rules/#cat-cloud-siem
[12]: /ko/security/detection_rules/#creating-and-managing-detection-rules
[13]: https://app.datadoghq.com/security/configuration/rules/new?product=siem
[14]: /ko/security/cloud_siem/log_detection_rules/?tab=threshold#choose-a-detection-method