---
aliases:
- /ko/security_platform/guide/aws-config-guide-for-cloud-siem
- /ko/security_platform/cloud_siem/guide/aws-config-guide-for-cloud-siem
further_reading:
- link: /security/default_rules/#cat-cloud-siem-log-detection
  tag: 설명서
  text: Cloud SIEM 기본 탐지 규칙 살펴보기
- link: /security/cloud_siem/triage_and_investigate/investigate_security_signals
  tag: 설명서
  text: 보안 신호 탐색기 알아보기
- link: /security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule
  tag: 설명서
  text: 사용자 지정 탐지 규칙 생성
- link: /getting_started/integrations/aws/
  tag: 설명서
  text: AWS로 시작
- link: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
  tag: 설명서
  text: Datadog Lambda 함수를 사용하여 AWS 서비스 로그 전송
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: https://learn.datadoghq.com/courses/cloud-siem-configure-aws
  tag: 학습 센터
  text: AWS용 Cloud SIEM 구성
title: Cloud SIEM용 AWS 설정 가이드
---
## 개요 {#overview}

Cloud SIEM은 Datadog에서 처리된 모든 로그에 탐지 규칙을 적용하여 표적 공격, 시스템과 통신하는 위협 인텔리전스 목록에 등록된 IP, 안전하지 않은 구성과 같은 위협을 탐지합니다. 탐지된 위협은 분류할 수 있도록 [Security Signals Explorer][1]에 보안 신호로 표시됩니다.

이 가이드는 AWS CloudTrail 로그로 위협 탐지를 시작할 수 있도록 다음 단계를 안내합니다.

1. [Datadog의 AWS 통합 설정](#set-up-aws-integration-using-cloudformation)
2. [AWS CloudTrail 로그 활성화](#enable-aws-cloudtrail-logging)
3. [AWS CloudTrail 로그를 Datadog으로 전송](#send-aws-cloudtrail-logs-to-datadog)
4. [Cloud SIEM을 사용하여 보안 신호 분류](#use-cloud-siem-to-triage-security-signals)

## CloudFormation을 사용하여 AWS 통합 설정 {#set-up-aws-integration-using-cloudformation}

{{% cloud-siem-aws-setup-cloudformation %}}

## AWS CloudTrail 로깅 활성화 {#enable-aws-cloudtrail-logging}

{{% cloud-siem-aws-cloudtrail-enable %}}

## AWS CloudTrail 로그를 Datadog으로 전송 {#send-aws-cloudtrail-logs-to-datadog}

{{% cloud-siem-aws-cloudtrail-send-logs %}}

## Cloud SIEM을 사용하여 보안 신호 분류 {#use-cloud-siem-to-triage-security-signals}

Cloud SIEM은 방금 설정한 CloudTrail 로그를 포함하여 처리된 모든 로그에 기본 제공 탐지 규칙을 적용합니다. 탐지 규칙으로 위협이 탐지되면 보안 신호가 생성되며 Security Signals Explorer에서 확인할 수 있습니다.

- [Cloud SIEM Signals Explorer][9]로 이동하여 위협을 확인하고 분류합니다. 자세한 내용은 [Security Signals Explorer][10]를 참조하세요.
- [AWS CloudTrail 대시보드][11]를 사용하여 비정상적인 활동을 조사할 수도 있습니다.
- 로그에 적용되는 [기본 제공 탐지 규칙][12]을 확인합니다.
- 특정 사용 사례에 맞는 위협을 탐지하는 [새 규칙][13]을 생성합니다.

Cloud SIEM은 처리된 모든 로그에 탐지 규칙을 적용하므로, 위협 탐지를 위해 [Kubernetes 감사 로그][15] 및 기타 소스에서 로그를 수집하는 방법에 대한 [인앱 지침][14]을 참조하세요. 또한 다양한 [AWS 서비스][16]의 로그를 S3 버킷에 기록하도록 설정하고, 위협 모니터링을 위해 해당 로그를 Datadog으로 전송할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/signals?query=%40workflow.rule.type%3A%22Log%20Detection%22
[9]: https://app.datadoghq.com/security/siem/signals?query=%40workflow.rule.type%3A%28%22Log%20Detection%22%29%20&column=time&order=desc
[10]: /ko/security/cloud_siem/triage_and_investigate/investigate_security_signals
[11]: https://app.datadoghq.com/dash/integration/30459/aws-cloudtrail
[12]: https://docs.datadoghq.com/ko/security/default_rules/#cat-cloud-siem
[13]: https://docs.datadoghq.com/ko/security/detection_rules/
[14]: https://app.datadoghq.com/security/configuration?detect-threats=apache&secure-cloud-environment=amazon-web-services&secure-hosts-and-containers=kubernetes&selected-products=security_monitoring
[15]: https://docs.datadoghq.com/ko/integrations/kubernetes_audit_logs/
[16]: https://docs.datadoghq.com/ko/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service