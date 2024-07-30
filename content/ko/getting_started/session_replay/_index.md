---
further_reading:
- link: /real_user_monitoring/session_replay/
  tag: 설명서
  text: 세션 재생
- link: /real_user_monitoring/session_replay/mobile/
  tag: 설명서
  text: 모바일 세션 재생
- link: https://www.datadoghq.com/knowledge-center/session-replay/
  tag: 학습 센터
  text: 세션 재생 개요
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog 세션 재생을 사용해 실사용자 이동 경로 보기
- link: /real_user_monitoring/browser/troubleshooting/
  tag: 설명서
  text: 문제 해결
title: 세션 재생 시작하기
---

{{< img src="/getting_started/session_replay/preview.mp4" alt="Preview of Session Replay" style="width:100%" video=true >}}

## 개요

세션 재생은 애플리케이션에서 사용자 세션을 재생성하는 시각적 도구로, 고객이 실제로 제품과 어떻게 상호 작용하는지 자세히 볼 수 있는 비디오와 같은 보기를 제공합니다. 세션 재생은 클릭 개수, 바운스 레이트, 페이지 보기 메트릭과 같은 기존의 정량적 데이터를 사용자의 작업을 분석하는 데 필요한 정성적인 컨텍스트로 강화시킵니다.

이 페이지에서는 Datadog에서 세션 재생을 시작하는 과정을 안내합니다. 아직 계정이 없다면, [Datadog 계정 만들기][1]를 클릭하세요.

## 세션 재생 설정하기

세션 재생은 브라우저 애플리케이션과 모바일 앱에서 사용할 수 있습니다. 이 가이드에서 안내된 예시에서는 브라우저 앱에서 세션 재생을 사용합니다.

세션 재생을 위해 데이터 수집을 시작하는 방법:

1. RUM 애플리케이션을 생성해 [Datadog RUM 브라우저 모니터링][7]을 설정합니다(재생 녹화에 액세스하려면 **Session Replay Enabled**로 전환해야 함).
2. **Client Token**을 생성합니다.
3. RUM 애플리케이션을 생성할 때 생성된 설정 코드를 애플리케이션 소스에 삽입하여 RUM 브라우저 SDK를 초기화합니다.

Datadog에서 데이터를 수집하기 시작할 때까지 애플리케이션은 **RUM 애플리케이션** 페이지에서 `pending`으로 표시됩니다.

세션 재생 데이터 수집과 관한 자세한 내용은 [RUM 설정 설명서][2]를 참고하세요. 모바일 앱에서 세션 재생 설정에 대한 내용은 [모바일 세션 재생][3]을 참고하세요.

## 특정 세션 재생 찾기

세션 재생 데이터를 수집하려면 [RUM 탐색기][4]로 이동한 후 **Session Replay available**를 선택하면 재생 데이터가 첨부된 모든 세션을 볼 수 있습니다. 이 데이터를 **List**, **Timeseries** 또는 기타 형식으로 시각화할 수 있습니다.

{{< img src="/getting_started/session_replay/session-replay-available.png" alt="세션 재생 사용 버튼, 시각화 옵션" style="width:100%" >}}

모바일 기기에서 고객이 애플리케이션에 문제가 발생했다고 가정하면 **facets**를 사용하여 세션을 필터링할 수 있습니다. 이 경우 [패싯][5]으로 필터링하면 특정 사용자나 디바이스 유형과 같은 특정 정보를 검색하는 데 도움이 됩니다.

{{< img src="/getting_started/session_replay/facets-views.png" alt="패싯으로 필터링" style="width:100%" >}}

애플리케이션에서 발생하는 특정 오류를 포함해 모든 세션이 표시되어 있는 [저장된 보기][6]가 있는지 확인해 보세요. 문제가 발생하는 영역을 알고 있고 사용자가 문제를 경험하는 세션 재생을 보고 싶을 경우 이 보기를 불러오면 큰 도움이 됩니다.

{{< img src="/getting_started/session_replay/pinned-views.png" alt="뷰 드롭다운" style="width:100%" >}}

## 사용자 경로 조사

세션 재생은 왼쪽에 있는 비디오로 보이고 표준 비디오 탐색 도구가 있습니다. 재생을 클릭하여 처음부터 보기를 시작하고, 해당 사용자가 한 작업을 모두 볼 수 있습니다.

**User Journey**는 페이지 오른쪽에 있는 이벤트 타임라인으로 목록에서 이벤트를 클릭하면 사용자 여정의 모든 순간을 탐색할 수 있고, **Session Breakdown**을 클릭하면 각 보기에서 발생하는 모든 동작 및 오류를 추적할 수 있습니다.

{{< img src="/getting_started/session_replay/user-journey.png" alt="사용자 여정 패널" style="width:100%" >}}

**Events**를 선택해 다음 이벤트 유형을 기준으로 사용자 이동 목록을 필터링합니다.

- **View**
- **Action**
- **Error**
- **Frustration Signal**

사용자 이동 과정에서 특정 시간 또는 보기에 마우스를 올려 **Details**를 선택하면 재생을 떠나지 않고 코어 웹 바이탈 및 기타 관련 정보를 확인할 수 있습니다.

{{< img src="/getting_started/session_replay/details-panel.png" alt="추가 상세 정보 패널">}}

Detail 페이지에서 워터폴 보기를 확장해 보다 자세한 정보를 얻을 수 있습니다.

{{< img src="/getting_started/session_replay/performance-waterfall.png" alt="성능 워터폴 확장">}}

## 개발자 도구를 사용한 트러블슈팅

세션 재생에 있는 [브라우저 개발 툴][8]을 열어 현재 재생과 관련된 애플리케이션의 성능, 콘솔 로그, 오류, 애플리케이션, 사용자 속성을 살펴볼 수 있습니다.

{{< img src="/getting_started/session_replay/dev-tools.png" alt="개발 도구 콘솔" style="width:100%" >}}

## 상관 데이터로 피벗

세션 재생은 애플리케이션의 메트릭, 트레이스, 로그와 통합되어 디버깅 문제와 관련해 유용한 컨텍스트를 제공합니다. 세션 재생과 함께 애플리케이션 성능 모니터링(APM)과 오류 추적을 사용하면 스택의 발생 위치에 관계없이 사용자가 직면한 문제의 근본 원인을 조사할 수 있습니다.

### 애플리케이션 성능 모니터링(APM) 트레이스을 통한 요청 성능 조사

세션 재생과 관련된 [애플리케이션 성능 모니터링(APM) 트레이스][9]를 사용하면 프론트엔드 및 백엔드 문제 전반에 걸쳐 엔드 투 엔드 가시성을 제공하고 코드 및 인프라스트럭처가 사용자 환경에 어떤 영향을 미치는지 확인할 수 있습니다. 전체 스택 트레이스를 사용하면 애플리케이션의 프론트엔드 또는 백엔드에서 오류가 발생하는지 확실하지 않은 경우 유용합니다.

트레이스로 재생을 선택하면 요청과 함께 요청을 실행하기 위해 호출한 백엔드 종속성 및 서비스를 특정 페이지에서 볼 수 있습니다.

{{< img src="/getting_started/session_replay/traces-view.png" alt="트레이스 패널" style="width:100%" >}}

**View Trace in APM**를 선택하면 트레이스와 관련된 오류 및 로그를 포함한 보다 자세한 정보를 볼 수 있습니다.

{{< img src="/getting_started/session_replay/APM.png" alt="상세한 정보가 나와 있는 APM 페이지" style="width:100%" >}}

### 오류 트레이스를 사용한 오류 조사

[오류 추적][10]은 문제를 디버깅하고 근본 원인을 파악하는 데 도움이 됩니다. 오류 발생과 관련한 알림을 받고, 오류를 발생시킨 코드의 정확한 줄을 볼 수 있고, 피벗을 사용해 오류가 발생한 사용자 세션을 볼 수 있습니다.

**Errors** 탭에서 오류를 선택하여 오류가 발생한 시간과 메시지를 확인하고 **Error tracking**에서 문제 발생을 클릭해 세션과 관련된 자세한 내용과 특성을 확인할 수 있습니다.

{{< img src="/getting_started/session_replay/error-tracking.png" alt="오류 추적 패널" style="width:100%" >}}

## 다음 단계

### 세션 재생에서 신서틱 브라우저 테스트 생성

세션 재생에서 사용자가 실행한 단계의 정확한 순서를 바탕으로 [신서틱 브라우저 테스트 생성] [11]을 실행할 수 있습니다. Datadog는 사용자가 정의한 자동화된 일정에 따라 신서틱 테스트를 실행하여 사용자의 행동을 시뮬레이션하고 실패한 테스트를 사용자에게 보고하기 때문에 문제가 발생하기 전에 미리 예방할 수 있습니다.

신서틱 브라우저 테스트에서 세션 재생을 캡처하려면 이벤트 타임라인 위의 **Generate Synthetic Browser Test**를  클릭합니다.

{{< img src="/getting_started/session_replay/browser-test.png" alt="브라우저 테스트 생성 팝업 창" style="width:100%" >}}

테스트 결과 관리, 실행, 해석과 관련한 자세한 내용은 [신서틱 브라우저 테스트][12]를 참고하세요.

### 팀과 공유

페이지 상단에 있는 **Share** 드롭다운을 선택해 팀과 재생을 공유할 수 있습니다. 특정 시간 구간을 재생해 팀에게 구체적인 시간과 보기를 지정해 공유할 수도 있습니다.

{{< img src="/getting_started/session_replay/share.png" alt="재생 팝업 공유" style="width:100%" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/?_gl=1*2g30ya*_gcl_au*OTEwMTA2MjI5LjE2OTIxMDc1MzA.*_ga_KN80RDFSQK*MTY5NDAwODQ4OS40OC4xLjE2OTQwMDg2MzcuMC4wLjA.
[2]: /ko/real_user_monitoring/#get-started
[3]: /ko/real_user_monitoring/session_replay/mobile/
[4]: https://app.datadoghq.com/rum/sessions
[5]: /ko/real_user_monitoring/explorer/search/#facets
[6]: /ko/real_user_monitoring/explorer/saved_views/
[7]: /ko/real_user_monitoring/browser/#setup
[8]: /ko/real_user_monitoring/session_replay/developer_tools
[9]: /ko/real_user_monitoring/connect_rum_and_traces
[10]: /ko/real_user_monitoring/error_tracking/
[11]: /ko/synthetics/guide/rum-to-synthetics/
[12]: /ko/synthetics/browser_tests/