---
aliases:
- /ko/real_user_monitoring/guide/session-replay-getting-started/
description: Session Replay를 사용해 사용자의 웹 브라우징이나 모바일 웹 경험을 캡처하고 시각적으로 재생하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/session-replay-datadog/
  tag: 블로그
  text: Datadog 세션 재생을 사용하여 실시간 사용자 여정 보기
- link: https://www.datadoghq.com/blog/reduce-customer-friction-funnel-analysis/
  tag: 블로그
  text: 퍼널 분석을 사용하여 주요 사용자 흐름을 파악하고 최적화하기
- link: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
  tag: 블로그
  text: Zendesk 및 Datadog Session Replay를 통해 사용자가 경험하는 문제를 시각적으로 재현합니다.
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: 탐색기에서 RUM 데이터 시각화
- link: /integrations/content_security_policy_logs
  tag: 설명서
  text: Datadog으로 CSP 위반 감지 및 집계
title: 세션 재생
---

## 개요

Session Replay는 사용자의 웹 브라우징이나 모바일 앱 경험을 시각적으로 캡처하고 재생할 수 있도록 함으로써 사용자 경험 모니터링을 확장합니다. RUM 성능 데이터와 결합된 Session Replay는 오류 식별/재생산/해결에 유용하며 애플리케이션 사용 패턴과 설계적 결함에 대한 인사이트를 제공합니다.

## Browser Session Replay

Browser Session Replay는 사용자의 웹 브라우징 경험을 캡처하고 시각적으로 재생할 수 있도록 함으로써 사용자 경험 모니터링을 확대합니다. RUM 성능 데이터와 결합하면 Session Replay는 오류 식별/재생산/해결에 유용하며 웹 애플리케이션의 사용량 패턴과 디자인 결함에 대한 인사이트를 제공합니다.

RUM Browser SDK는 [오픈 소스][1]이며 오픈 소스 [rrweb][2] 프로젝트를 활용합니다.

[브라우저를 위한 Session Replay][3]에 대해 자세히 알아보세요.

## 모바일 세션 재생

모바일 세션 재생은 탭, 스와이프, 스크롤과 같은 각 사용자 상호 작용을 시각적으로 재생하여 모바일 애플리케이션에 대한 가시성을 확장합니다. Android 및 iOS의 네이티브 앱에서 사용할 수 있습니다. 애플리케이션에서 사용자 상호 작용을 시각적으로 재생하면 크래시와 오류를 쉽게 재현할 수 있을 뿐만 아니라 UI 개선을 위한 사용자 경험을 파악할 수 있습니다.

[모바일을 위한 Session Replay][4]에 대해 자세히 알아보세요.

## 데이터 보존

기본적으로 세션 재생 데이터는 30일 동안 보존됩니다.

보존 기간을 15개월로 연장하려면 개별 세션 재생에서 _연장 보존_을 활성화하면 됩니다. 이 세션은 비활성 상태여야 합니다(사용자가 경험을 완료한 상태).

연장 보존은 세션 재생에만 적용되며 연관된 이벤트는 포함하지 않습니다. 15개월은 세션이 수집된 시점이 아니라 연장 보존이 활성화된 시점부터 시작됩니다.

언제든지 연장 보존을 비활성화할 수 있습니다. 세션 재생이 아직 기본 보존 기간인 30일 이내인 경우, 초기 30일 기간이 끝나면 재생이 만료됩니다. 30일이 지난 세션 재생에서 연장 보존을 비활성화하면 재생이 즉시 만료됩니다.

{{< img src="real_user_monitoring/session_replay/session-replay-extended-retention.png" alt="연장 보존 사용" style="width:100%;" >}}

보존 기간을 연장하면 어떤 데이터가 보존되는지 알아보려면 다음 다이어그램을 참고하세요.

{{< img src="real_user_monitoring/session_replay/replay-extended-retention.png" alt="보존 기간을 연장했을 때 보존되는 데이터를 보여주는 다이어그램" style="width:100%;" >}}

## 재생 기록

플레이어 페이지에 표시된 **watched** 횟수를 클릭하면 해당 세션 리플레이를 누가 시청했는지 확인할 수 있습니다. 이 기능을 사용하면 녹화 내용을 공유하려고 했던 사람이 이미 해당 내용을 시청했는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/session-replay-playback-history.png" alt="세션 녹화를 본 사람 확인" style="width:100%;" >}}

기록은 플레이어 페이지 또는 [노트북][5]이나 사이드 패널과 같은 내장 플레이어에서 발생한 플레이백만을 포함합니다. 포함된 플레이백은 또한 [감사 트레일][6] 이벤트를 생성합니다. 썸네일 미리 보기는 기록에 포함되지 않습니다.

내 플레이백 기록을 보려면, [내 기록 보기][7] 재생 목록을 확인하세요.

## 플레이리스트

Session Replay 재생 목록을 생성해 발견한 패턴별로 정리할 수 있습니다. [Session Replay 재생 목록][8]을 자세히 알아보세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk
[2]: https://www.rrweb.io/
[3]: /ko/real_user_monitoring/session_replay/browser/
[4]: /ko/real_user_monitoring/session_replay/mobile/
[5]: https://docs.datadoghq.com/ko/notebooks/
[6]: https://docs.datadoghq.com/ko/account_management/audit_trail/
[7]: https://app.datadoghq.com/rum/replay/playlists/my-watch-history
[8]: /ko/real_user_monitoring/session_replay/playlists