---
aliases:
- /ko/graphing/dashboards/widgets
- /ko/graphing/faq/widgets
- /ko/graphing/widgets
description: 다양한 차트 유형과 디스플레이를 사용하여 인프라 전반의 데이터를 시각화하고 상관관계를 분석할 수 있는 대시보드 빌딩 블록입니다.
further_reading:
- link: /dashboards/
  tag: 설명서
  text: 대시보드에 대해 자세히 알아보기
- link: /dashboards/widgets/configuration
  tag: 설명서
  text: 위젯 구성 옵션 및 모범 사례 알아보기
- link: /dashboards/widgets/types/
  tag: 설명서
  text: 사용 가능한 모든 위젯 유형 살펴보기
title: 위젯
---
## 개요 {#overview}

대시보드 위젯은 데이터를 시각적으로 표현하는 요소입니다. 위젯은 [대시보드][2]의 기본 구성 요소로 사용되며, 인프라 전반의 데이터를 시각화하고 상호 연관성을 분석할 수 있도록 지원합니다. 위젯에는 그래프, 이미지, 로그, 상태 정보 등 다양한 유형의 정보가 포함될 수 있으며, 이를 통해 시스템 및 환경 전반에 대한 개요를 확인할 수 있습니다.

## 시작하기 {#get-started}

데이터와 관련된 위젯을 가장 빠르게 도입하는 방법은 [사전 설정 목록][1]에 있는 대시보드를 복제하는 것입니다. 이 목록에는 조직의 다른 사용자가 만든 대시보드와 설치된 통합에 대한 기본 제공 템플릿이 포함되어 있습니다. 대시보드를 복제한 후에는 사용 사례에 맞게 위젯을 사용자 지정할 수 있습니다.


{{< whatsnext desc="위젯 학습에 도움이 되는 추가 가이드 및 과정:" >}}
   {{< nextlink href="/getting_started/dashboards/" >}}<u>대시보드 시작하기</u>: 위젯을 사용하여 대시보드를 구축하는 방법 안내{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}<u>대시보드 그래프 위젯</u>: 그래프 위젯 생성, 구성 및 사용 방법을 설명하는 학습 센터 과정{{< /nextlink >}}
   {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}<u>대시보드 소개</u>: 샌드박스 환경에서 대시보드를 구축하는 방법을 설명하는 학습 센터 과정{{< /nextlink >}}
{{< /whatsnext >}}

### 대시보드에 위젯 추가 {#add-a-widget-to-your-dashboard}

대시보드에서 위젯을 사용하려면 다음 단계를 수행합니다.

1. Datadog의 [Dashboard List][1]로 이동합니다.
2. {{< ui >}}New Dashboard{{< /ui >}}를 클릭하거나 기존 대시보드를 선택하여 편집합니다.
3. {{< ui >}}Add Widget{{< /ui >}}을 클릭합니다. 시계열, 막대 차트, 표 또는 이벤트 스트림 등 다양한 위젯 유형 중에서 선택합니다.
4. 위젯 구성:
    - 데이터 소스 선택: 메트릭, 로그, 트레이스 또는 기타 데이터 소스를 선택합니다.
    - 시각화 사용자 지정: 필요에 따라 표시 설정, 단위 및 시간 프레임을 조정합니다.
    - 컨텍스트 추가: 사용자 지정 링크, 조건부 서식 및 그룹화를 사용하여 추가 인사이트를 제공합니다.
5. 대시보드를 저장한 후 팀과 공유하거나 필요에 따라 외부에 공유할 수 있습니다.

[위젯 구성][3]에서 자세한 내용을 확인하고 사용 가능한 [위젯 유형][4]을 둘러보세요.

### 탭으로 위젯 정리 {#organize-widgets-with-tabs}

대시보드가 커질수록 탭을 사용하여 위젯을 이름이 지정된 섹션으로 그룹화할 수 있습니다. 편집 모드에서 위젯의 공유 메뉴를 열고 **Move to tab**을 선택하여 기존 탭에 할당하거나 새 탭을 생성합니다. 탭은 대시보드 상단에 탐색 모음으로 표시되므로 사용자가 필요한 섹션으로 바로 이동할 수 있습니다. 자세한 내용은 [Tabs][5]를 참조하세요.

## 데이터 소스 {#data-sources}

위젯은 다음을 포함한 여러 Datadog 데이터 소스의 데이터를 시각화할 수 있습니다.

- **APM Traces**: 애플리케이션 성능 모니터링 데이터
- **Events**: 사용자 지정 이벤트, 배포 및 주석
- **Logs**: 로그 이벤트, 로그 분석 및 로그 기반 메트릭
- **Metrics**: 인프라, 애플리케이션 및 사용자 지정 메트릭
- **RUM**: Real User Monitoring 및 Synthetic 테스트 데이터
- **SLOs**: Service Level Objectives 및 오류 예산
- **Security**: 보안 신호 및 규정 준수 데이터

## 일반적인 사용 사례 {#common-use-cases}

{{% collapse-content title="Infrastructure Monitoring" level="h4" expanded=false %}}
- CPU, 메모리 및 네트워크 메트릭을 시간에 따라 추적하려면 **시계열** 위젯을 사용합니다.
- 인프라 전반의 리소스 사용량을 시각화하려면 **호스트맵** 위젯을 사용합니다.
- 리소스를 가장 많이 사용하는 호스트 또는 서비스를 식별하려면 **상위 목록** 위젯을 사용합니다.
{{% /collapse-content %}}

{{% collapse-content title="애플리케이션 성능" level="h4" expanded=false %}}
- 응답 시간, 오류율 및 처리량을 추적하려면 **시계열** 위젯을 사용합니다.
- 서비스 상태를 상위 수준에서 확인하려면 **서비스 요약** 위젯을 사용합니다.
- 서비스 종속성과 데이터 흐름을 시각화하려면 **토폴로지 맵** 위젯을 사용합니다.
{{% /collapse-content %}}

{{% collapse-content title="비즈니스 인텔리전스" level="h4" expanded=false %}}
- 핵심 성과 지표(KPI) 및 비즈니스 메트릭을 표시하려면 **쿼리 값** 위젯을 사용합니다.
- 애플리케이션 내 사용자 전환 과정을 추적하려면 **퍼널** 위젯을 사용합니다.
- 사용자 참여도 및 이탈을 분석하려면 **보존** 위젯을 사용합니다.
{{% /collapse-content %}}

{{% collapse-content title="Incident Response" level="h4" expanded=false %}}
- 경보 이력 및 추세를 표시하려면 **경보 그래프** 위젯을 사용합니다.
- 인프라 전반의 현재 경보 상태를 확인하려면 **모니터 요약** 위젯을 사용합니다.
- 실시간 이벤트 모니터링을 위해 **이벤트 스트림** 위젯을 사용합니다.
{{% /collapse-content %}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/dashboard/lists/preset/1
[2]: /ko/dashboards/
[3]: /ko/dashboards/widgets/configuration/
[4]: /ko/dashboards/widgets/types/
[5]: /ko/dashboards/configure/#tabs