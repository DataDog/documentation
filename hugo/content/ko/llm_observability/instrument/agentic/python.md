---
aliases:
- /ko/llm_observability/instrumentation/agentic/python/
title: Python 애플리케이션 에이전틱 계측
---
## 계측 {#instrumentation}

1. 설치된 `ddtrace` 버전을 검사하고, 필요한 계측 API를 지원하는 경우 해당 버전을 재사용합니다. 업데이트가 필요한 경우 그 이유를 설명하고 기존 종속성을 변경하기 전에 문의해 주세요. 선택적 프롬프트 관리(Prompt Management)에만 필요한 업데이트는 별도의 결정 사항이며 호환되는 SDK를 사용한 계측을 차단하지 않습니다.

    `ddtrace`가 설치되어 있지 않은 경우 애플리케이션의 기존 패키지 관리자를 사용하여 설치하세요.

    ```bash
    pip install ddtrace # pip
    poetry add ddtrace # poetry
    uv add ddtrace # uv
    ```

2. Agent Observability 패키지를 초기화합니다.

    `ddtrace.auto`를 통해 Agent Observability SDK를 초기화합니다. 이는 환경 변수나 구성 로드 가져오기를 제외하고, 애플리케이션 진입점에서 첫 번째 가져오기로 수행되어야 **합니다**.

    **참고**: 불필요한 주석을 추가하지 마세요.

    ```python
    from dotenv import load_dotenv
    load_dotenv() # this might load DD_ environment variables

    import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

    # ... remaining application logic
    ```