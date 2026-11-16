---
description: Exabeam - Windows 팩에 대해 자세히 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-exabeam-packs/
  tag: 블로그
  text: Observability Pipelines를 사용하여 중요한 보안 로그를 처리하고 Exabeam으로 라우팅하기
title: Exabeam - Windows
---
## 개요 {#overview}

{{< img src="observability_pipelines/packs/exabeam_windows.png" alt="Exabeam - Windows 팩" style="width:25%;" >}}

이 팩은 Exabeam으로 전송된 Windows 이벤트 로그를 처리하고 Exabeam 파서에서 사용하는 코드에 해당하는 로그만 남기도록 필터링하며, 구문 분석을 위해 원시 XML은 그대로 유지합니다.

이 팩의 기능은 다음과 같습니다.

- 원시 XML 유지
- Sysmon 및 PowerShell 로그 유지
- 사용하지 않는 Security 코드 삭제

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}