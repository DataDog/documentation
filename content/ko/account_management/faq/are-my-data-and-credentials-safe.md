---
kind: faq
title: 내 데이터와 자격 증명은 안전한가요?
---

* 트래픽은 항상 에이전트에서 Datadog로 흐릅니다. Datadog에서 에이전트로 데이터가 흐르는 세션은 없습니다.
* 모든 트래픽은 SSL을 통해 전송됩니다.
* Datadog로 가는 통신은 HTTPS를 통합니다.
* [라이선스 계약 전체 보기][1]
* 오픈 소스 소프트웨어 라이선스에 따른 [Datadog 에이전트 소스 코드][2]
* Datadog 에이전트와 기타 구성 요소 설치 과정에서 관리자나 루트 수준 자격 증명을 묻는 프롬트가 나타날 수 있습니다. 이 비밀번호는 설치 과정을 완료에만 사용되며, Datadog에서는 자격 증명을 저장하지 않습니다. 설치 과정을 보고 싶을 경우 [에이전트 설치 페이지][3]에서 단계별 지침을 참고하세요.

[1]: https://github.com/DataDog/datadog-agent/blob/master/LICENSE
[2]: https://github.com/DataDog/datadog-agent
[3]: https://app.datadoghq.com/account/settings/agent/latest