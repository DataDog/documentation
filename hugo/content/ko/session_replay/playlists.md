---
aliases:
- /ko/real_user_monitoring/session_replay/playlists
- /ko/product_analytics/session_replay/playlists
description: Session Replay 정리를 위해 재생 목록을 만들고 사용하는 방법을 알아보세요.
further_reading:
- link: /session_replay
  tag: 문서
  text: Session Replay
- link: https://www.datadoghq.com/blog/datadog-rum-session-replay-playlists/
  tag: 블로그
  text: Datadog의 재생 목록으로 관련 Session Replay 구성 및 분석하기
title: Session Replay 재생 목록
---
## 개요 {#overview}

재생 목록은 폴더와 같은 구조로 집계할 수 있는 Session Replay 모음입니다. 재생 목록을 사용하여 다음을 수행할 수 있습니다.

- 특정 Session Replay에서 관찰된 패턴을 정리하고 그에 따라 레이블 지정
- 재생 목록을 빠르게 살펴보고 각 그룹의 내용을 한눈에 파악
- 특정 Session Replay를 검색하는 시간 절약

## 시작 {#getting-started}

재생 목록은 [Playlist 페이지][1]에서 직접 만들거나 개별 Session Replay에서 생성할 수 있습니다.

Session Replay를 조회한 후 눈에 띄는 동작이 발견되면 {{< ui >}}Save to Playlist{{< /ui >}}를 클릭하여 새 재생 목록을 만들거나 해당 Session Replay를 기존 재생 목록에 추가할 수 있습니다.

{{< ui >}}Playlist page{{< /ui >}}에서 직접 생성하려면 다음 단계를 따르세요.

1. Datadog에서 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1]로 이동합니다.
2. {{< ui >}}New Playlist{{< /ui >}}를 클릭합니다.
3. 재생 목록에 이름과 설명을 지정합니다. 그런 다음 RUM에서 Session Replay를 탐색하여 재생 목록에 추가할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="새 재생 목록 만들기" style="width:60%;">}}

개별 Session Replay에서 생성하는 방법은 다음과 같습니다.

1. 저장하려는 Session Replay를 엽니다.
2. 상단의 {{< ui >}}Share{{< /ui >}} 버튼을 클릭한 다음 {{< ui >}}Save to Playlist{{< /ui >}}를 선택합니다.

      {{< img src="real_user_monitoring/session_replay/playlists/share-playlist.png" alt="개별 레코딩에서 새 재생 목록 만들기" style="width:90%;">}}
3. 기존 재생 목록에 레코딩을 추가하거나 새 재생 목록을 만듭니다.

## 기본 재생 목록 {#default-playlists}

세 가지 기본 재생 목록을 통해 Session Replay를 검토할 수 있습니다.

- {{< ui >}}My Watch History{{< /ui >}}: 이전에 시청한 Session Replay입니다.
- {{< ui >}}All mentions to me{{< /ui >}}: 팀원이 댓글에서 나를 @멘션한 Session Replay로, 어떤 조사에 내 의견이 필요한지 확인할 수 있습니다.
- {{< ui >}}Commented replays{{< /ui >}}: 조직 내에서 댓글이 하나 이상 있는 모든 Session Replay로, 사용자 또는 팀이 댓글을 남긴 세션을 검토할 수 있습니다.

세 가지 재생 목록 모두 [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Session Replay{{< /ui >}} > {{< ui >}}Playlists{{< /ui >}}][1]에서 확인할 수 있습니다.

## 사용 사례 {#use-cases}

팀에서 재생 목록을 다양한 방식으로 활용할 수 있습니다. 시작하기 위한 몇 가지 아이디어는 다음과 같습니다.

- 한 세션에서 오류를 발견한 후에는 해당 오류 패턴이 있는 다른 세션을 찾아서 함께 그룹화할 수 있습니다
- UI를 업데이트할 때 사용자가 새로운 흐름에서 혼란을 느낄 수 있는 세션에 대한 재생 목록을 만들 수 있습니다
- 수익 창출 버튼에 대한 분노 클릭과 같은 고유한 동작이 있는 세션 그룹을 북마크하려면 RUM에 쿼리를 작성하고 관련 세션을 모두 재생 목록에 저장하세요. 

## 문제 해결 {#troubleshooting}

### Session Replay를 재생 목록에 저장할 때 발생하는 오류 {#saving-a-session-replay-to-a-playlist-leads-to-an-error}

재생 목록에 포함된 모든 Session Replay는 완료된 세션이어야 합니다. 재생 목록에 추가할 수 있는 Session Replay를 찾으려면 아래 쿼리를 복사하여 RUM 탐색기에 붙여넣으세요.

```@session.is_active:false @session.type:user @session.has_replay:true```

이 쿼리는 리플레이가 첨부되어 있고 Synthetic 세션이 아닌 실제 사용자 상호 작용에서 발생한 완료된 세션을 검색하도록 합니다.

### 재생 목록 생성 시 오류 발생 {#creating-a-playlist-leads-to-an-error}
재생 목록을 만들 수 있는 적절한 역할 및 권한이 있는지 확인하세요. 재생 목록 쓰기 권한으로 다음 작업을 수행할 수 있습니다.

- 재생 목록 생성
- 재생 목록 편집
- 재생 목록 삭제
- 재생 목록에 세션 추가
- 재생 목록에서 세션 제거

또한 Session Replay 읽기 권한으로 다음을 수행할 수 있습니다.

- 재생 목록 조회
- 재생 목록에서 Session Replay 조회

### 재생 목록에서 Session Replay를 기본 Session Replay 보존 기간인 30일보다 더 오래 보관하기 {#keeping-replays-in-a-playlist-for-longer-than-the-default-30-day-session-replay-retention-period}

기본적으로 Session Replay 보존 기간은 30일입니다. [연장 보존][2]을 사용하면 개별 Session Replay의 보존 기간을 최대 15개월까지 연장할 수 있습니다. `rum_extend_retention` [권한][3]이 있는 경우, Session Replay를 재생 목록에 추가하면 해당 Session Replay의 보존 기간이 자동으로 연장됩니다. 이 권한이 없으면 Session Replay를 재생 목록에 추가해도 보존 기간이 연장되지 않습니다. 개별 Session Replay에 대한 연장 보존은 언제든지 취소할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /ko/session_replay/#retention
[3]: /ko/account_management/guide/secure-configuration/#synthetic-monitoring-and-rum