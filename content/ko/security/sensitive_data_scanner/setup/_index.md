---
aliases:
- /ko/sensitive_data_scanner/setup
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: 설명서
  text: 스캔 규칙에 대해 자세히 알아보기
title: 설정
---
## 개요 {#overview}

Sensitive Data Scanner를 설정하여 다음 데이터를 스캔할 수 있습니다.

- 텔레메트리 데이터: 로그, APM 스팬, RUM 이벤트 및 Event Management의 이벤트에서 민감한 데이터를 식별합니다. 설정 방법은 [텔레메트리 데이터 설정][1]을 참조하세요.
- Agent Observability 데이터: LLM 트레이스, 프롬프트 및 완료에서 민감한 데이터를 식별합니다. 스캔을 구성하려면 [Agent Observability Settings 페이지][3]로 이동합니다.
- 클라우드 스토리지 데이터: Amazon S3 버킷에서 민감한 데이터를 식별합니다. 설정 방법은 [클라우드 스토리지 설정][2]을 참조하세요.
- 코드 리포지토리: 소스 코드에 노출된 시크릿을 탐지합니다. 설정 방법은 [Secret Scanning][4]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /ko/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /ko/security/code_security/secret_scanning/