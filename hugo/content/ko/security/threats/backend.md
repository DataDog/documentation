---
description: CSM 위협 백엔드 이벤트에 대한 JSON 스키마 설명서
disable_edit: true
title: CSM 위협 이벤트 형식
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-agent -->




활동이 [클라우드 보안 관리 위협][1](CSM 위협) [에이전트 표현식][2]과 일치하는 경우, 활동에 대한 모든 관련 컨텍스트가 포함된 CSM 위협 이벤트가 시스템에서 수집됩니다.

이 이벤트는 Datadog로 전송되어 분석됩니다. 분석에 따라 CSM 위협 이벤트는 보안 신호를 트리거하거나 감사, 위협 조사 목적을 위해 이벤트로 저장될 수 있습니다.

CSM 위협 이벤트는 플랫폼에 따라 다음과 같은 JSON 스키마를 포함합니다.

* [리눅스(Linux)][1]
* [윈도우즈(Windows)][2]

[1]: /ko/security/threats/backend_linux
[2]: /ko/security/threats/backend_windows