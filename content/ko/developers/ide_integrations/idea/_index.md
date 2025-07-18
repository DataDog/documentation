---
disable_toc: false
further_reading:
- link: /account_management/api-app-keys/
  tag: 설명서
  text: API와 애플리케이션 키에 대해 자세히 알아보세요.
- link: /getting_started/profiler/
  tag: 설명서
  text: Continuous Profiler 시작하기
is_beta: true
kind: 설명서
title: IntelliJ IDEA용 Datadog 플러그인
---

{{< callout url="#" btn_hidden="true">}}
   IntelliJ IDEA용 Datadog 플러그인은 공용 베타 버전입니다. Java 서비스에서 <a href="https://docs.datadoghq.com/profiler/#pagetitle">Continuous Profiler</a>를 사용하는 Java 개발자를 위한 플러그인입니다. 플러그인이 예상치 않게 중지되면 플러그인 업데이트가 있는지 확인하거나 <a href=#feedback>관련 팀에 문의하세요</a>.
{{< /callout >}}

## 개요

IntelliJ IDEA용 Datadog 플러그인을 사용하면 IDE에서 실시간으로 데이터를 볼 수 있고 코드 수준에서 유용한 인사이트를 제공하기 때문에 소프트웨어 성능을 개선하는 데 도움이 됩니다. 플러그인을 Continuous Profiler와 함께 사용하면 다음 코드 줄을 강조 표시해 대기 시간을 줄이고 클라우드 비용을 낮출 수 있습니다:
- CPU를 가장 많이 소비하는 것
- 메모리 할당량이 가장 높은 것
- 잠금, 디스크 I/O, 소켓 I/O 등에 시간을 가장 많이 소비하는 것

{{< img src="/developers/ide_integrations/idea/overview1.png" alt="IDEA에서 열린 Datadog 도구 창" style="width:100%;" >}}

코드 강조 표시 외에도 Intellij IDEA용 Datadog 플러그인을 다음 용도로 사용할 수 있습니다:
- **상위 목록** 보기를 통해 리소스 소비량이 가장 많은 메서드를 확인합니다.
- **Flame 그래프** 보기를 통해 집계된 프로필 데이터를 시각화합니다.
- 상위 목록과 Flame 그래프에서 코드와 관련된 줄로 바로 이동합니다.
- 메서드 이름과 줄 번호별로 리소스 소비를 분석합니다.

## 요건

- **Datadog 계정**: 이 플러그인을 사용하려면 Datadog 계정이 있어야 합니다. Datadog 사용이 처음이라면, [Datadog 웹 사이트][3]에서 Datadog의 도구를 살펴보고, 무료 체험을 신청해 보세요.
- **Continuous Profiling**: 코드 수준 인사이트를 표시하려면 Java 서비스에서 Continuous Profiling을 사용할 수 있어야 합니다. 더 자세한 내용은 [Continuous Profiler 시작하기][2]를 참고하세요.

## 설정

### Datadog 플러그인 설치

1. **플러그인**을 클릭하고 `Datadog`을 검색합니다.
1. **설치**를 클릭해 IDE에 플러그인을 다운로드하고 설치합니다.
1. Datadog가 타사 플러그인이라는 알림이 표시되면 **수락**을 클릭합니다.
1. **IDE 재시작**을 클릭해 IDEA를 재시작합니다.

{{< img src="/developers/ide_integrations/idea/datadog-plugin1.png" alt="Datadog 플러그인" style="width:100%;" >}}

또는 [Jetbrains Marketplace][4]에서 플러그인을 설치할 수도 있습니다.

<span id="datadog_plugin_install_button"></span>

### Datadog에 로그인

Datadog 플러그인을 설치하고 IDEA를 재시작한 후, Datadog에 로그인합니다.
1. IDEA에서 파일이나 프로젝트를 연 상태에서 **Datadog** 도구 창을 클릭합니다.
1. **로그인...**을 클릭합니다.
1. 브라우저 창이 열리면 내 사이트와 조직을 선택하고 플랫폼에 대한 액세스 권한을 부여합니다.

**참고**: 일반적으로 로그인은 한 번만 하면 됩니다. 다중 조직 설정을 사용하는 경우, 올바른 계정이 활성화되어 있는지 확인하세요. 어떤 IDEA 로그인을 사용하는 중인지 확인하려면  **기본 설정** -> **도구** -> **Datadog**을 클릭하고 어떤 계정이 활성화되어 있는지 확인합니다.

### 서비스 연결

프로젝트에 관련 서비스를 추가하여 Datadog 플랫폼에 관련 데이터를 제공합니다:
1. IDEA에서 프로젝트를 열고 **Datadog** 도구 창에서 더하기 아이콘(**+**)을 클릭합니다.
1. 현재 프로젝트에 추가하고자 하는 서비스를 검색 및 선택합니다.

서비스를 제거하려면 **서비스** 테이블에서 선택하고 빼기 아이콘(**-**)을 클릭합니다.

<div class="alert alert-info">프로젝트를 닫아도 연결된 서비스 이름은 남아있습니다.</div>

## 플러그인 사용

프로젝트에 서비스를 추가한 후 서비스를 마우스 오른쪽 버튼으로 클릭하고 **프로파일링 열기**를 클릭해 서비스 프로파일링 탭을 엽니다. 프로파일링 탭에는 서비스 하나에 대한 데이터만 표시됩니다. 그러나 여러 탭을 동시에 열 수 있습니다.

프로파일링 탭에는 선택한 환경에 있는 서비스의 Continuous Profiling 정보를 특정한 시간 프레임에서 집계하여 보여줍니다. 다음과 같은 정보를 볼 수 있습니다:
- [상위 목록](#top-list): 현재 프로파일링 측정값에서 가장 리소스 집약적인 메서드 목록 표시.
- [Flame 그래프](#flame-graph): 프로필 스택 트레이스를 표시하는 Flame 그래프.

프로파일링 데이터에서 다음 파라미터를 구체화할 수 있습니다:
- 표시할 프로필 유형
- 서비스가 실행 중인 환경
- 프로필 샘플을 집계하는 시간대

사용할 수 있는 프로파일링 유형은 보통 **CPU 시간**과 **할당된 메모리**와 같은 옵션이 있으나, 플랫폼에 따라 결정되며 언어에 따라 다릅니다.

## 상위 목록

**상위 목록** 하위 탭에서는 Datadog 서버에서 집계된 프로필 데이터를 바탕으로 가장 많은 리소스를 소비하는 메서드를 보여줍니다. **상위 목록**은 리소스 소비 관점에서 주목할 만한 메서드를 요약하여 표시하도록 설계되었습니다.

{{< img src="/developers/ide_integrations/idea/top-list1.png" alt="상위 목록 보기" style="width:100%;" >}}

- 목록에서 항목을 두 번 클릭하거나 컨텍스트 메뉴에서 **소스로 이동**을 선택하면 메서드가 정의되어 있는 위치가 표시된 소스 코드 편집기가 열립니다.
- 메서드를 시각화한 Flame 그래프를 보려면 컨텍스트 메뉴에서 **Flame 그래프에서 검색**을 선택합니다.

### 호출 트리

메서드 목록 오른쪽에 있는 호출 트리에서는 선택된 메서드가 오고 가는 경로를 확인할 수 있습니다.

{{< img src="/developers/ide_integrations/idea/call-tree1.png" alt="메서드 호출 트리" style="width:100%;" >}}

기본 **호출자 계층 구조** 보기에서는 대상 메서드의 호출자(또는 선행 작업)와 호출 스택에서 등장하는 빈도를 확인할 수 있습니다.

피호출자 (또는 후속자)를 보려면 **피호출자 계층 구조**를 클릭하세요.

{{< img src="/developers/ide_integrations/idea/callee-hierarchy.png" alt="피호출자 계층 구조" style="width:100%;" >}}

호출 트리에서 메서드를 마우스 오른쪽 버튼으로 클릭하면 소스 편집기나 Flame 그래프로 이동할 수 있는 옵션이 표시됩니다.

## Flame 그래프

Flame 그래프는 샘플 기간 동안의 스택 트레이스와 상대적 빈도를 보여주는 시각화된 프로파일링 샘플입니다. Datadog 플러그인에서는 요청한 시간대에 수집한 데이터를 집계하며, 다양한 개별 프로필을 함께 집계합니다. 각 개별 프로필은 요청된 시간대 내에서 60초 간격으로 표시됩니다.

{{< img src="/developers/ide_integrations/idea/flamegraph1.png" alt="지난 4시간 동안의 CPU 시간을 보여주는 Flame 그래프" style="width:100%;" >}}

프로필 유형, 시간대, 환경을 바꿀 때마다 Datadog 플러그인에서는 새 Flame 그래프를 생성합니다.

다양한 방법으로 Flame 그래프를 탐색할 수 있습니다.
- 프레임을 두 번 클릭하면 해당 메서드와 샘플링 기간 동안 호출한 모든 메서드에 집중할 수 있습니다.
- 미니맵을 사용하여 그래프를 이동합니다.
- 메서드를 마우스 오른쪽 단추로 클릭하고 **소스로 이동**을 선택하면 해당 소스 코드 지점으로 이동합니다.

메서드 위에 커서를 올리면 다음 정보를 포함한 도구 설명이 표시됩니다:
- 클래스 이름 및 메서드 서명
- 패키지 이름
- 프로파일링 메트릭 값 및 백분율 분석

프로파일링 샘플에는 스택 트레이스와 줄 번호 정보가 표시됩니다. **항목별로 Flame 그래프 구분** 버튼을 사용해 메서드별이나 줄 번호별로 프레임을 분리할 수 있습니다.

{{< img src="/developers/ide_integrations/idea/separate-flamegraph-by.png" alt="툴팁 버튼을 사용하여 메서드 또는 줄 번호별로 프레임을 구분" style="width:40%;" >}}

## Datadog Insights

프로파일링 탭이 활성화되어 있으면 Datadog Insights에서 소스 코드 편집기 여백에 코드 강조 표시를 합니다. Datadog 플러그인에서 편집기 여백에 아이콘을 표시하고 활성화된 프로파일링 데이터를 기반으로 코드를 강조 표시합니다.
- 아이콘에 커서를 올리면 더 자세한 정보가 표시됩니다.
- 아이콘을 클릭하여 프로파일링 탭 상위 목록을 열거나 Datadog에서 프로파일링을 열 수 있습니다.
  {{< img src="/developers/ide_integrations/idea/interest-options.png" alt="Datadog 아이콘을 클릭하여 탭 또는 Datadog에서 프로파일링 데이터를 엽니다" style="width:100%;" >}}

활성화된 프로파일링 탭은 선택한 프로필의 메트릭으로 주석이 달린 IDEA 프로젝트 트리 보기에도 영향을 줍니다:
{{< img src="/developers/ide_integrations/idea/project-tree-view.png" alt="프로필 탭에서 프로필 메트릭으로 주석이 달린 프로젝트 트리" style="width:60%;" >}}

## 피드백

플러그인에 대한 여러분의 의견을 알려주세요! [토론 포럼][1]에 의견을 남기시거나`team-ide-integration@datadoghq.com`으로 이메일을 보내주세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

<script src="https://plugins.jetbrains.com/assets/scripts/mp-widget.js"></script>
<script>
  // #yourelement는 사용자 웹페이지의 실제 element id로 변경하세요
  MarketplaceWidget.setupMarketplaceWidget('install', 19495, "#datadog_plugin_install_button");
</script>

[1]: https://github.com/DataDog/datadog-for-intellij/discussions
[2]: /ko/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://plugins.jetbrains.com/plugin/19495-datadog