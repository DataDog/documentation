---
aliases:
- /ko/real_user_monitoring/guide/session-replay-getting-started/
- /ko/real_user_monitoring/session_replay/
- /ko/product_analytics/session_replay/
- /ko/real_user_monitoring/session_replay/developer_tools
- /ko/real_user_monitoring/session_replay/browser/developer_tools
- /ko/product_analytics/session_replay/browser/developer_tools
description: Session Replay를 사용해 사용자의 웹 브라우징이나 모바일 웹 경험을 캡처하고 시각적으로 재생하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog Session Replay를 사용하여 실시간 사용자 여정 보기
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: 블로그
  text: Zendesk 및 Datadog Session Replay를 통해 사용자가 경험하는 문제를 시각적으로 재현합니다.
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: /integrations/content_security_policy_logs
  tag: 설명서
  text: Datadog으로 CSP 위반 탐지 및 집계
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: 학습 센터
  text: Real User Monitoring(RUM) 소개
title: Session Replay
---
##  개요
 {#overview}

Session Replay는 사용자의 웹 브라우징 또는 모바일 앱 경험을 캡처하고 시각적으로 재생할 수 있도록 하여 사용자 경험 모니터링을 확장합니다. Session Replay는 [RUM][1]과 [Product Analytics][2] 모두에서 제공되며, 오류를 식별하고 재현하며, 사용자 여정을 이해하고, 애플리케이션의 사용 패턴과 디자인 문제에 대한 통찰력을 제공합니다.

##  Browser Session Replay
 {#browser-session-replay}

Browser Session Replay는 사용자의 웹 브라우징 경험을 캡처하고 시각적으로 재생할 수 있도록 하여 사용자 경험 모니터링을 확장합니다. Session Replay를 RUM 성능 데이터와 함께 사용하면 오류 식별, 재현, 해결에 유익하며 웹 애플리케이션의 사용량 패턴과 설계상 위험에 관한 인사이트를 얻을 수 있습니다.

RUM Browser SDK는 [오픈 소스][3]이며 오픈 소스 [rrweb][4] 프로젝트를 활용합니다.

[Session Replay for Browsers][5]에 대해 자세히 알아보세요.

##  Mobile Session Replay
 {#mobile-session-replay}

Mobile Session Replay는 탭, 스와이프 및 스크롤과 같은 각 사용자 상호작용을 시각적으로 재생하여 모바일 애플리케이션에 대한 가시성을 확장합니다. Android와 iOS의 네이티브 앱 모두에서 사용할 수 있습니다. 애플리케이션에서 사용자 상호작용을 시각적으로 재생하면 충돌 및 오류를 재현하고 UI 개선을 위한 사용자 여정을 이해하는 데 더 쉬워집니다.

[Session Replay for Mobile][6]에 대해 자세히 알아보세요.

##  AI 기반 요약 및 스마트 챕터
 {#ai-powered-summaries-and-smart-chapters}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">이 기능은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>{{< /site-region >}}

요약 및 스마트 챕터는 세션을 시청하기 전에 세션에서 발생한 일에 대한 맥락을 제공합니다.

**요약**은 사용자의 의도, 주요 액션, 마찰 신호 및 결과를 설명합니다. 요약의 특정 순간은 하이퍼링크되어 있어 재생에서 해당 지점으로 직접 이동할 수 있습니다. 세션 목록에서 재생 위에 마우스를 올리면 요약을 미리 볼 수 있으며, 재생을 직접 열 수 있습니다. 세션이 이전에 요약된 경우, 재생을 열 때 요약이 즉시 나타납니다.

{{< img src="real_user_monitoring/session_replay/session-replay-ai-summary.png" alt="Session Replay 플레이어의 AI 기반 요약으로, 사용자 의도, 주요 액션, 마찰 신호 및 하이퍼링크된 순간을 보여줍니다." style="width:100%;" >}}

**스마트 챕터**는 재생 타임라인을 사용자 여정의 레이블이 있는 스테이지로 자동으로 분할합니다. 예를 들어, 전자상거래 세션에서는 챕터가 "조명 탐색", "침대 및 의자 쇼핑", "장바구니 검토 및 결제"를 포함할 수 있습니다. 챕터는 타임라인 위에 마우스를 올리면 나타나고 플레이어 컨트롤의 드롭다운에서 볼 수 있어 직접 이동할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/session-replay-smart-chapters.png" alt="사용자 여정의 레이블이 있는 스테이지가 표시된 Session Replay 플레이어의 스마트 챕터 드롭다운" style="width:100%;" >}}

AI 요약 및 스마트 챕터는 최소 네 개의 사용자 액션과 최소 45초의 지속 시간을 가진 세션에 대해 생성됩니다.

## 코멘트
 {#comments}

{{< site-region region="gov,gov2" >}}<div class="alert alert-danger">이 기능은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}}). 이 기능이 필요하면 <a href="/help/">Datadog 지원</a>에 문의하세요.</div>{{< /site-region >}}

Session Replay 코멘트를 통해 팀이 재생 내에서 버그, 사용성 문제 및 기타 관찰 사항에 대해 협업할 수 있습니다.

코멘트를 사용하면 다음을 수행할 수 있습니다.

- 재생 타임라인의 특정 타임스탬프에 코멘트를 추가합니다. 코멘트 마커는 타임라인과 **코멘트** 탭에 나타납니다.
- @멘션을 사용하여 코멘트에서 팀원이나 팀을 언급합니다. 태그된 사용자는 코멘트된 타임스탬프에서 재생을 열 수 있는 링크가 포함된 이메일 알림을 받습니다.
- 모든 코멘트에 대한 링크를 복사하고 외부에 공유합니다. 링크를 클릭하면 해당 코멘트 스레드가 열려 있는 주석이 달린 순간에서 재생이 시작됩니다.
- 재생 내에서 협업하기 위해 스레드 내에서 답변하고 필요에 따라 자신의 코멘트를 편집하거나 삭제합니다.

{{< img src="real_user_monitoring/session_replay/session-replay-comments.png" alt="타임라인에 타임스탬프가 있는 코멘트와 스레드 답변이 열려 있는 코멘트 탭이 있는 Session Replay 플레이어." style="width:100%;" >}}

주의가 필요한 재생을 찾으려면 **나에게 모든 언급** 및 **코멘트된 재생** 기본 재생 목록을 사용하세요. 자세한 내용은 [Session Replay Playlists][7]을 참조하세요.

## 데이터 보존 연장
 {#extend-data-retention}

기본적으로 Session Replay 데이터는 30일 동안 보존됩니다.

Session Replay 데이터 보존 기간을 15개월로 연장하려면 개별 Session Replay에서 _Extended Retention_을 활성화할 수 있습니다. 이 세션은 비활성 상태여야 합니다(사용자가 경험을 완료한 상태).

나중에 Session Replay에 액세스하려면 Datadog에서 URL을 저장하거나 [재생 목록][7]에 추가하는 것을 권장합니다.

Extended Retention은 Session Replay에만 적용되며 관련 이벤트는 포함되지 않습니다. 15개월은 Extended Retention이 활성화될 때 시작되며, 세션이 수집될 때가 아닙니다.

언제든지 Extended Retention을 비활성화할 수 있습니다. Session Replay가 기본 30일 보존 기간 내에 있는 경우, 재생은 초기 30일 기간이 끝날 때 만료됩니다. 30일 이상 된 Session Replay에서 Extended Retention을 비활성화하면 재생이 즉시 만료됩니다.

{{< img src="real_user_monitoring/session_replay/extended-retention-1.png" alt="Extended Retention 활성화" style="width:100%;" >}}

보존 기간을 연장하면 어떤 데이터가 보존되는지 알아보려면 다음 다이어그램을 참고하세요.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention-1.png" alt="Extended Retention으로 유지되는 데이터의 다이어그램" style="width:100%;" >}}

## 재생 기록
 {#playback-history}

플레이어 페이지에 표시된 **시청한** 수를 클릭하면 특정 Session Replay를 누가 시청했는지 확인할 수 있습니다. 이 기능을 통해 공유하려는 녹화를 누가 이미 시청했는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="세션 녹화를 시청한 사람 확인" style="width:100%;" >}}

기록에는 플레이어 페이지 또는 [노트북][8]이나 사이드 패널과 같은 임베디드 플레이어에서 발생한 재생만 포함됩니다. 포함된 재생은 [Audit Trail][9] 이벤트도 생성합니다. 썸네일 미리보기는 기록에 포함되지 않습니다.

재생 기록을 조회하려면 [내 시청 기록][10] 재생 목록을 확인하세요.

## 재생 목록
 {#playlists}

Session Replay의 재생 목록을 만들어서 관찰한 패턴에 따라 정리할 수 있습니다. [Session Replay Playlists][7]에 대해 더 알아보세요.

## 개발자 도구
 {#dev-tools}

개발자 도구는 Session Replay에서 재생 중에 주요 정보를 노출하는 내장 디버깅 패널입니다. 문제를 식별하고, 요청을 추적하며, 성능 병목 현상을 이해하는 데 사용하세요. 이 모든 작업은 문제를 직접 재현하지 않고도 수행할 수 있습니다. 개발자 도구는 [RUM][1] 세션에서 사용할 수 있습니다.

[브라우저][11] 및 [모바일][12]용 개발자 도구에 대해 더 알아보세요.

## 추가 자료
 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/product_analytics/
[3]: https://github.com/DataDog/browser-sdk
[4]: https://www.rrweb.io/
[5]: /ko/session_replay/browser/
[6]: /ko/session_replay/mobile/
[7]: /ko/session_replay/playlists
[8]: /ko/notebooks/
[9]: /ko/account_management/audit_trail/
[10]: /ko/rum/replay/playlists/my-watch-history
[11]: /ko/session_replay/browser/dev_tools/
[12]: /ko/session_replay/mobile/dev_tools/