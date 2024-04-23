---
kind: faq
title: Windows 상태 기반 검사
---
이 가이드에서는 Windows에서 상태 기반 검사를 생성하는 워크플로를 간략하게 설명합니다.

1. Agent Manager를 사용하여 Agent 설정:  Agent Manager에서 "Windows 서비스" 설정을 편집합니다.

2. Agent Manager를 사용하여 [Agent 재시작][1] (또는 서비스 재시작)

3. Agent Manager의 정보 페이지를 확인하고 통합 검사를 통과했는지 확인합니다. 다음과 유사한 섹션이 표시되어야 합니다.

    ```
    Checks
    ======

    [...]

    windows_service
    ---------------
        - instance #0 [OK]
        - Collected 0 metrics 0 events & 1 service check
    ```

4. [Datadog 애플리케이션 전용 페이지][2]에서 "Install"을 클릭하여 통합을 설치합니다.

5. 통합 모니터를 생성하려면 [해당 단계][3]를 따릅니다.

이제 Windows 서비스 통합을 기반으로 하는 모니터가 생성되었습니다.


[1]: /ko/agent/guide/agent-commands/#start-stop-restart-the-agent
[2]: https://app.datadoghq.com/account/settings#integrations/windows_service
[3]: /ko/monitors/types/integration/