---
aliases:
- /ko/real_user_monitoring/session_replay/developer_tools
description: 세션 재생에서 사용할 수 있는 개발 툴에 대해 설명합니다.
further_reading:
- link: /real_user_monitoring/session_replay/browser
  tag: 설명서
  text: 브라우저 세션 재생
title: 세션 재생 브라우저 개발 툴
---

## 개요

세션 재생의 브라우저 개발 도구는 애플리케이션의 문제를 해결하는 데 도움이 되는 내장형 디버깅 도구입니다. 브라우저 개발 도구를 사용하기 위해 별도의 설정이 필요하지 않습니다.

## 브라우저 개발 툴

브라우저 개발 툴에 액세스하려면 **Sessions** 탭에서 세션 왼쪽에 있는 **Jump to Replay** 버튼을 클릭하거나 세션을 클릭한 후 [RUM Explorer][1]의 오른쪽 상단 모서리에 있는 **Repay Session**을 클릭합니다.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-1.png" alt="Dev Tools 버튼" style="width:80%;">}}

**Share** 버튼의 오른쪽에 **</> Dev Tools** 버튼이 나타납니다. 성능 데이터, 콘솔 로그, 오류 및 재생에 대한 속성을 볼 수 있습니다.

### 성능

**Performance** 탭에는 세션의 이벤트(예: 액션, 오류, 리소스, 긴 작업 등)와 타임스탬프의 워터폴이 표시됩니다.

**Network**, **Events**, **Timings** 필터를 선택하여 적용하면 표시되는 리소스 및 이벤트 유형의 범위를 변경할 수 있습니다. 또한, 워터폴에 있는 슬라이더를 드래그 앤 드롭하여 시간 범위를 확장할 수도 있습니다.

{{< img src="real_user_monitoring/session_replay/dev_tools/performance-filters-1.mp4" alt="성능 필터" video="true" style="width:60%;">}}

### 콘솔

**Console** 탭에는 [웹 브라우저에서 수집한 모든 로그][2] 및 각 보기에 대한 오류가 표시됩니다.

**Error**, **Warn**, **Info** 및 **Debug**를 클릭하여 심각도에 따라 로그를 필터링합니다. [Log Explorer][3]에서 이러한 로그를 검색하려면 **View in Log Explorer**를 클릭합니다.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-console.png" alt="Log Explorer 버튼에서 콘솔 보기" style="width:50%;">}}

Log Explorer가 미리 채워진 검색 쿼리와 함께 별도의 탭에서 열립니다.

### 오류

**Errors** 탭에는 세션과 관련된 [RUM 오류][4] 및 [오류 추적][5] 문제가 표시됩니다.

{{< img src="real_user_monitoring/session_replay/dev_tools/dev-tools-errors.png" alt="Errors 탭" style="width:70%;">}}

### 속성

**Attributes** 탭에는 세션과 관련된 모든 속성이 표시됩니다. 자세한 내용은 [기본 속성][6]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/explorer/
[2]: /ko/logs/log_collection/javascript/
[3]: /ko/logs/explorer/
[4]: /ko/real_user_monitoring/browser/collecting_browser_errors/
[5]: /ko/real_user_monitoring/error_tracking/
[6]: /ko/real_user_monitoring/browser/data_collected/#default-attributes