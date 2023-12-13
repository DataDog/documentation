---
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: 설명서
  text: 지속적인 프로파일러 시작하기
- link: /integrations/guide/source-code-integration/
  tag: 설명서
  text: 소스 코드 통합에 대해 알아보기
- link: /continuous_integration/static_analysis/?tab=githubactions
  tag: 설명서
  text: 정적 분석에 대해 알아보기
- link: https://www.jetbrains.com/lp/toolbox/
  tag: 외부 사이트
  text: JetBrains Toolbox에 대해 알아보기
is_beta: true
kind: 설명서
title: IntelliJ 플랫폼용 Datadog 플러그인
---

## 개요

IntelliJ 플랫폼용 Datadog 플러그인은 IDEA, GoLand, PyCharm에서 사용 가능하며, 실시간 관측 데이터를 기반으로 IDE에서 의미 있는 코드 수준의 인사이트를 제공하여 소프트웨어 성능 향상에 도움을 줍니다.

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="IDEA에서 열린 Datadog 도구 창" style="width:100%;" >}}

**Code Insights** 보기를 통해 다음과 같은 정보를 얻을 수 있습니다:
- [오류 추적][6]에서 발생하는 문제
- 애플리케이션 보안 관리의 [취약성][8] 보고서
- CI 가시성이 감지한 [불안정한 테스트][9]
- [Watchdog Insights][10]의 프로파일링 인사이트

**지속적인 프로파일러**는 다음과 같은 코드라인을 강조 표시하여 지연 시간을 줄이고 클라우드 비용을 절감할 수 있도록 도와줍니다:
- CPU 사용량이 가장 많음
- 가장 많은 메모리 할당
- 잠금, 디스크 I/O 및 소켓 I/O에 가장 많은 시간 사용

**로그 탐색** 지원 기능을 통해 작업 중인 컨텍스트와 일치하는 보기로 Datadog 로그 탐색기를 열 수 있습니다.


**CI 테스트 실행** 기능은 Continuous Integration Visibility Explorer를 열어 선택한 테스트에 대한 최근 실행을 표시합니다.

**정적 분석** 통합은 사전 정의된 규칙에 따라 코드를 로컬에서 분석하여 변경 사항을 커밋하기 전에 문제를 감지하고 수정합니다.

## 필수 요건

- **Datadog 계정**: 플러그인에는 Datadog 계정이 필요합니다([정적 분석][13] 기능을 사용하는 경우 제외). Datadog을 처음 사용하는 경우 [Datadog 웹사이트][3]로 이동하여 Datadog의 통합 가시성 도구 대해 자세히 알아보고 무료 평가판에 등록하세요.
- **지속적인 프로파일러**: 프로파일링 데이터와 인사이트를 표시하려면 플러그인에서 서비스에 대해 지속적인 프로파일러를 설정해야 합니다. 자세한 내용은 [지속적인 프로파일러 시작하기][2]를 참조하세요.
- **JetBrains Toolbox**: 플러그인과 함께 [View in IDE](#view-in-ide) 기능을 사용하려면 개발자의 컴퓨터에 [JetBrains Toolbox][7]가 설치되어 있어야 합니다.

## 설정

### Datadog 플러그인 설치

1. **Plugins**를 클릭하고 `Datadog`을 검색합니다.
1. **Install**을 클릭해 IDE에 플러그인을 다운로드하고 설치합니다.
1. Datadog이 타사 플러그인이라는 알림이 표시되면 **Accept**를 클릭합니다.
1. **Restart IDE**를 클릭합니다.

{{< img src="/developers/ide_integrations/idea/marketplace.png" alt="Datadog 플러그인" style="width:100%;" >}}

또는 [JetBrains 마켓플레이스][4]에서 플러그인을 설치할 수도 있습니다.

<span id="datadog_plugin_install_button"></span>

### Datadog에 로그인

Datadog 플러그인을 설치하고 IDE를 다시 시작한 후 Datadog에 로그인합니다:
1. IDE에서 파일 또는 프로젝트를 연 후 **Datadog** 도구 창을 클릭합니다.
1. **Log in...**을 클릭합니다.
1. 브라우저 창이 열리면 해당 사이트와 조직을 선택하고 플랫폼에 대한 액세스를 승인합니다.

**참고**: 대부분의 사용자는 한 번의 로그인만으로 충분합니다. 다중 조직 설정을 사용하는 경우 올바른 계정이 활성화되어 있는지 확인하세요. IDE에서 어떤 로그인을 사용하고 있는지 알아보려면 **Settings** -> **Tools** -> **Datadog**을 클릭하고 어떤 계정이 활성화되어 있는지 확인하세요.

### 서비스 연결

Datadog 플랫폼에서 관련 데이터를 제공하려면 프로젝트에 관련된 서비스를 추가하세요.
1. IDE에서 프로젝트를 연 상태에서 **Datadog** 도구 창을 열고 **Options** 메뉴에서 **Manage Linked Services...**를 선택합니다.
1. 설정 대화 상자가 열리면 더하기 아이콘(**+**)을 클릭합니다.
1. 현재 프로젝트에 추가하고자 하는 서비스를 검색해 선택합니다.

서비스를 제거하려면 **Services** 테이블에서 선택한 후 빼기 아이콘(**-**)을 클릭합니다.

<div class="alert alert-info">프로젝트를 닫아도 연결된 서비스의 이름은 프로젝트와 함께 유지됩니다.</div>

## Code Insights
**Code Insights** 탭에는 현재 프로젝트와 관련된 Datadog 플랫폼에서 생성한 인사이트가 표시되며, 인사이트는 성능, 안정성, 보안의 세 가지 범주로 분류됩니다.

{{< img src="/developers/ide_integrations/idea/code-insights.png" alt="Code Insights 탭" style="width:100%;" >}}

Code Insights에는 각 문제에 대한 상세한 설명과 다음 링크가 포함됩니다:
- 관련 소스 코드 위치
- 추가 정보를 위한 Datadog 플랫폼

개별 인사이트를 해제하고 필터를 설정하여 관심 있는 인사이트 카테고리를 볼 수 있습니다.

## 지속적인 프로파일러

**Continuous Profiler** 탭은 선택한 환경에서 특정 기간 동안 집계된 서비스에 대한 프로파일링 정보를 표시합니다. 사용 가능한 보기는 다음과 같습니다.
- [상위 목록](#top-list): 현재 프로파일링 측정값에서 리소스를 가장 많이 사용하는 메서드 목록 표시.
- [불꽃 그래프](#flame-graph): 프로필에서 스택 트레이스를 표시하는 불꽃 그래프.

프로파일링 데이터에서 다음 파라미터를 지정할 수 있습니다.
- 표시할 프로필 유형
- 서비스가 실행 중인 환경
- 프로필 샘플을 집계하는 시간대

사용 가능한 프로파일링 유형은 보통 **CPU Time**과 ***Allocated Memory**와 같은 옵션을 포함하나 플랫폼에 따라 결정되며 언어에 따라 다릅니다.

### 상위 목록

**Top List** 하위 탭에서는 Datadog 서버에서 집계된 프로필 데이터를 바탕으로 가장 많은 리소스를 소비하는 메서드를 보여줍니다. **Top List**는 리소스 소비 관점에서 주목할 만한 메서드를 요약하여 표시하도록 설계되었습니다.

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="상위 목록 보기" style="width:100%;" >}}

- 목록에서 항목을 두 번 클릭하거나 컨텍스트 메뉴에서 **Jump to Source**를 선택하면 메서드가 정의된 위치를 보여주는 소스 코드 편집기가 열립니다.
- 메서드를 시각화한 불꽃 그래프를 보려면 컨텍스트 메뉴에서 **Search in Flame Graph**를 선택합니다.

#### 호출 트리

**Top List** 오른쪽에 있는 호출 트리에는 선택한 메서드로 연결되는(및 해당 메서드에서 나오는) 경로가 표시됩니다.

기본 **Caller Hierarchy** 보기에는 대상 방식의 호출자(또는 선행자)와 이들이 호출 스택에 나타나는 빈도가 표시됩니다. 수신자(또는 후속자)를 보려면 도구 모음에서 **Callee Hierarchy** 버튼을 클릭하세요.

호출 트리에서 메서드를 마우스 오른쪽 버튼으로 클릭하면 소스 편집기나 불꽃 그래프로 이동할 수 있는 옵션이 표시됩니다.

### 불꽃 그래프

불꽃 그래프는 샘플 기간 동안 스택 트레이스와 상대 빈도를 보여주는 프로파일링 샘플의 시각화입니다. Datadog 플러그인은 요청된 기간에서 여러 개별 프로필을 수집하여 집계합니다. 각 개별 프로필은 요청된 시간 프레임 내에서 60초 간격을 다룹니다.

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="지난 한 시간 동안의 CPU 시간을 보여주는 불꽃 그래프" style="width:100%;" >}}

프로필 유형, 시간대, 환경을 바꿀 때마다 Datadog 플러그인에서는 새 불꽃 그래프를 생성합니다.

다양한 방법으로 불꽃 그래프를 탐색할 수 있습니다.
- 프레임을 더블 클릭하면 해당 메서드와 샘플링 기간 동안 호출한 모든 메서드에 집중할 수 있습니다.
- 미니맵을 사용하여 그래프를 이동합니다.
- 메서드를 마우스 오른쪽 버튼으로 클릭하고 **Jump to Source**를 선택하여 소스 코드의 해당 지점으로 이동합니다.

메서드 위에 마우스 커서를 올리면 다음 정보를 포함한 툴팁이 표시됩니다:
- 클래스 이름 및 메서드 서명
- 패키지 이름
- 프로파일링 메트릭 값 및 백분율 분석

프로파일링 샘플에는 스택 트레이스와 줄 번호 정보가 표시됩니다. **Separate Flame Graph by** 버튼을 사용해 메서드별이나 줄 번호별로 프레임을 분리할 수 있습니다.

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="툴팁 버튼을 사용하여 메서드 또는 줄 번호별로 프레임을 구분" style="width:40%;" >}}

### 소스 하이라이팅

Continuous Profiler 탭이 활성화되면 플러그인은 소스 코드 편집기 여백에 코드 하이라이트를 추가합니다. Top Methods의 경우 편집기 여백에 아이콘이 나타나고, 활성 프로파일링 데이터를 기반으로 코드에 라인 레벨의 하이라이트가 나타납니다.
- 아이콘에 마우스 커서를 올리면 더 자세한 정보가 표시됩니다.
- 아이콘을 클릭하여 상위 목록 Profiling 탭을 열거나 Datadog에서 Profiling을 열 수 있습니다.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Datadog 아이콘을 클릭하여 탭 또는 Datadog에서 프로파일링 데이터를 엽니다" style="width:100%;" >}}

활성 Profiling 탭은 선택한 프로파일의 메트릭으로 주석이 달린 프로젝트 트리 보기에도 영향을 미칩니다:
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="프로필 탭의 프로필 메트릭으로 주석이 달린 프로젝트 트리" style="width:60%;" >}}

## 로그 탐색

Java, Go 및 Python 소스 파일에서 직접 Datadog 플랫폼의 [Log Explorer][5]로 이동할 수 있습니다. 소스 코드의 로그 문 다음에 있는 **View Logs** 링크를 찾으세요.

{{< img src="/developers/ide_integrations/idea/logs-navigation.png" alt="로그 보기 링크를 표시하는 소스 파일." style="width:100%;" >}}

이 링크를 클릭하면 로거 이름, 로그 수준 및 로그 메시지와 최대한 일치하는 쿼리가 포함된 **Log Explorer**가 열립니다.

## CI 테스트 실행
소스 파일에서 직접 탐색하여 [Continuous Integration Visibility Explorer][12]에서 최근 테스트 실행을 볼 수 있습니다. 소스 코드에서 테스트 메서드 선언 다음에 나오는 **View Test Runs** 링크를 찾으세요.

{{< img src="/developers/ide_integrations/idea/ci-navigation.png" alt="테스트 실행 보기 링크를 표시하는 소스 파일." style="width:100%;" >}}

링크를 클릭하면 하나의 테스트 사례에 대한 최근 기록을 보여주는 **Test Runs** 탭이 열립니다.

## IDE에서 보기

**View in IntelliJ/GoLand/PyCharm** 기능은 Datadog 플랫폼에서 Java, Go 및 Python 소스 파일로 직접 연결되는 링크를 제공합니다. 플랫폼에 표시된 스택 트레이스의 프레임 옆에 있는 버튼을 찾습니다(예: [Error Tracking][6]).

{{< img src="/developers/ide_integrations/idea/view-in-idea.png" alt="IntelliJ 버튼에서 보기를 표시하는 Datadog 플랫폼의 스택 트레이스." style="width:100%;" >}}

<div class="alert alert-info">이 기능에는 두 가지 전제 조건이 있습니다. (1) 서비스에 맞게 소스 코드 통합이 설정되어 있고 (2) 개발 컴퓨터에 JetBrains Toolbox가 설치되어 있습니다.</div>

## 정적 분석
Datadog 플러그인은 소스 파일을 편집할 때 [정적 분석][13] 규칙을 실행합니다. 이를 통해 변경 사항을 커밋하기 전에 코드의 유지 관리 문제, 버그 또는 보안 취약성과 같은 문제를 감지하고 수정합니다.

정적 분석은 다양한 프로그래밍 언어에 대한 검색을 지원합니다. 전체 목록은 [정적 분석 규칙][14]을 참조하세요. 지원되는 언어에 속하는 파일 형식의 경우 JetBrains 검사 시스템을 사용하여 소스 코드 편집기에 문제가 표시되며 제안된 수정 사항을 직접 적용할 수 있습니다.

{{< img src="/developers/ide_integrations/idea/static-analysis-issue.png" alt="정적 분석 규칙 위반 및 권장 수정 사항." style="width:100%;" >}}

또한, 이 기능을 통해 감지된 모든 문제는 표준 **Problems** 보기에 표시됩니다.

### 시작하기
소스 파일(Python및 Docker 파일이 지원됨) 편집을 시작하면, 플러그인은 소스 리포지토리의 루트에서 `static-analysis.datadog.yml`을 확인합니다. 필요한 경우 생성하라는 메시지가 표시됩니다.

{{< img src="/developers/ide_integrations/idea/static-analysis-onboard.png" alt="온보딩을 위한 배너." style="width:100%;" >}}

설정 파일이 생성되면 정적 분석기가 백그라운드에서 자동으로 실행됩니다.

<div class="alert alert-info">소스 파일이 로컬로 분석되기 때문에 정적 분석 기능에는 Datadog 계정이 필요 없습니다.</div>

## 의견

[토론 포럼][1]에서 피드백을 제공하거나  [team-ide-integration@datadoghq.com][11]로 이메일을 보낼 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // #yourelement를 사용자 웹페이지의 실제 element id로 변경하세요
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /ko/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog
[5]: /ko/logs/explorer/
[6]: /ko/tracing/error_tracking/
[7]: https://www.jetbrains.com/lp/toolbox/
[8]: /ko/security/application_security/vulnerability_management/
[9]: /ko/continuous_integration/guides/flaky_test_management/
[10]: /ko/watchdog/insights
[11]: mailto:team-ide-integration@datadoghq.com
[12]: /ko/continuous_integration/explorer/?tab=testruns
[13]: /ko/continuous_integration/static_analysis/?tab=githubactions
[14]: /ko/continuous_integration/static_analysis/rules/