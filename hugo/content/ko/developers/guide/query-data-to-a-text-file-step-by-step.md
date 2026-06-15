---
aliases:
- /ko/developers/faq/query-data-to-a-text-file-step-by-step
title: 데이터를 텍스트 파일로 쿼리하는 단계별 과정
---

이 문서에서는 Datadog API를 최대한 활용할 수 있는 환경 설정에 대해 설명하고, [Datadog's 공개 API][1]에서 이벤트, 메트릭 및 모니터를 로컬 파일로 가져오거나 전송하는 방법을 설명합니다.

필수 구성 요소: 파이썬(Python)및 `pip`이 로컬 호스트에 설치됩니다. Windows 사용자에게는 [Windows에 파이썬(Python) 2 설치][2]가 표시됩니다.

1. 터미널을 엽니다.
2. 디렉토리를 확인합니다: macOS의 경우 `pwd`, Windows의 경우 `dir`.
3. 새 폴더를 생성합니다: `mkdir <NAME_OF_THE_FOLDER>`.
4. 폴더를 입력합니다: `cd <NAME_OF_THE_FOLDER>`.
5. [api_query_data.py][3] 스크립트를 3단계에서 생성한 폴더에 다운로드하여 편집합니다:

   a. `<YOUR_DD_API_KEY>`및 `<YOUR_DD_APP_KEY>`을 [Datadog API 및 앱 키][4]로 대체합니다.

   b. `system.cpu.idle`를 가져올 메트릭으로 대체합니다. 메트릭 목록은  [Datadog 메트릭 요약][5]에 표시됩니다.

   c. 필요한 경우`*`를 데이터 필터링할 호스트로 대체합니다. 호스트 목록이 [Datadog 인프라스트럭처 목록][6]에 표시됩니다.

   d. 필요한 경우 데이터를 수집할 시간을 변경합니다. 현재 설정은 3600초 (1시간)입니다. **참고**: 너무 공격적으로 실행하면 [Datadog API 제한][7]에 도달할 수 있습니다.

   e. 파일을 저장하고 위치를 확인합니다.

위의 작업이 완료되면 다음을 수행합니다:

1. 파이썬(Python) 패키지를 설치할 가상 환경을 만드는 것이 가장 좋습니다. 가상 환경 관리자는 [virtualenv][8]입니다.
2. `virtualenv venv`를 실행하여 이전에 만든 디렉토리에 새 가상 환경을 만듭니다.
3. `source venv/bin/activate` (Mac/Linux) 또는 `> \path\to\env\Scripts\activate`(Windows)를 실행하여 환경을 활성화합니다.
4. `pip install datadog`를 실행하여 [Datadog API 패키지][9]를 설치합니다. 이 설정은 파이썬(Python) 파일이 Datadog API와 상호 호환할 수 있도록 합니다.
5. 터미널에서 스크립트를 실행합니다:`python api_query_data.py`.

성공하면 터미널에 데이터가 표시되고, 폴더에 `out.txt`라는 파일이 생성됩니다.

[Datadog API 설명서][1]에서 더 많은 예를 참조하세요.

[1]: /ko/api/
[2]: http://docs.python-guide.org/en/latest/starting/install/win
[3]: /resources/python/api_query_data.py
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://app.datadoghq.com/metric/summary
[6]: https://app.datadoghq.com/infrastructure
[7]: /ko/api/#rate-limiting
[8]: https://virtualenv.pypa.io/en/stable
[9]: https://pypi.org/project/datadog