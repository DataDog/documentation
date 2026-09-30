---
aliases:
- /ko/sensitive_data_scanner/setup
description: Sensitive Data Scanner를 설정하여 텔레메트리 데이터, Agent Observability 트레이스, Amazon
  S3 클라우드 스토리지 및 코드 리포지토리 전반에서 민감한 데이터를 탐지하고 마스킹합니다.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: 설명서
  text: Sensitive Data Scanner
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: 설명서
  text: 스캔 규칙에 대해 자세히 알아보기
- link: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
  tag: 설명서
  text: 민감한 데이터 발견 사항을 조사합니다.
- link: /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
  tag: 설명서
  text: 민감한 데이터를 위한 모니터를 생성합니다.
title: Sensitive Data Scanner 설정
---
## 개요 {#overview}

스캔하려는 각 데이터 소스에 대해 Sensitive Data Scanner를 설정하십시오. 각 소스는 고유한 설정 프로세스를 사용하므로, 필요한 소스만 구성하면 됩니다.

- **텔레메트리 데이터:** 로그, APM 스팬, RUM 이벤트 및 이벤트 관리(Event Management)의 이벤트를 스캔합니다. 설정 방법은 [텔레메트리 Data][1]를 참조하십시오. 로그가 네트워크를 떠나기 전에 스캔하려면 [Observability Pipelines용 Sensitive Data Scanner 프로세서][5]를 사용하십시오.
- **Agent Observability 데이터:** LLM 트레이스, 프롬프트 및 완성본을 스캔합니다. [Agent Observability 설정 페이지][3]에서 스캔을 구성하십시오.
- **클라우드 스토리지 데이터:** Amazon S3 버킷을 스캔합니다. 설정 방법은 [Cloud Storage][2]를 참조하십시오.
- **코드 리포지토리:** 소스 코드에 노출된 시크릿을 탐지합니다. 설정 방법은 [Secret Scanning][4]를 참조하십시오.
- **AI Guard 평가:** AI Guard가 평가하는 대화에서 자격 증명 및 PII와 같은 민감한 데이터를 스캔합니다. Sensitive Data Scanner 구성 페이지의 [AI Guard 탭][6]에서 스캔 규칙을 구성하십시오.

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /ko/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /ko/security/code_security/secret_scanning/
[5]: /ko/observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard