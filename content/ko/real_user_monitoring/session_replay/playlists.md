---
aliases: null
description: Session Replay 정리를 위해 재생 목록을 만들고 사용하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/session_replay
  tag: 설명서
  text: 세션 리플레이
- link: https://www.datadoghq.com/blog/Datadog-rum-session-replay-playlists/
  tag: 블로그
  text: Datadog RUM의 재생 목록으로 관련 세션 재생을 구성하고 분석하세요.
title: Session Replay 재생 목록
---

## 개요

재생 목록은 폴더와 같은 구조로 집계할 수 있는 세션 다시보기 모음입니다. 재생 목록을 다음과 같은 목적으로 사용할 수 있습니다.

- 특정 Session Replay에서 관찰된 패턴을 정리하고 그에 따라 레이블을 지정합니다.
- 재생목록을 살펴보고 각 그룹에 대한 내용을 한눈에 파악하세요.
- 특정 Session Replay를 검색하는 시간 절감

## 시작하기

재생 목록은 [재생 목록 페이지][1]에서 직접 만들거나 개별 세션 다시보기에서 만들 수 있습니다.

**재생 목록 페이지**에서 직접 만드는 방법:

1. Datadog에서 [**디지털 경험 > Session Replay > 재생 목록**][1]으로 이동합니다.
2. **새 재생 목록**을 클릭합니다.
3. 재생 목록에 이름과 설명을 입력합니다. 그런 다음 RUM에서 세션 재생을 탐색하여 재생 목록에 추가할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-1.png" alt="새 재생 목록 만들기" style="width:60%;">}}

개별 Session Replay에서 생성하는 방법:

1. 저장하려는 리플레이를 엽니다.
2. 상단의 **재생 목록에 저장** 버튼을 클릭합니다.
3. 기존 재생 목록에 레코딩을 추가하거나 아래 비디오에서와 같이 새로운 재생 목록을 만듭니다.

   {{< img src="real_user_monitoring/session_replay/playlists/playlist-individual-session-replay.mp4" alt="개별 레코딩에서 새 재생 목록 만들기" video="true" width="90%" >}}

Session Replays 확인 후 눈에 띄는 동작이 발견되면 **재생 목록에 저장**을 클릭하여 새 재생 목록을 만들거나 해당 특정 Session Replay를 기존 재생 목록에 추가할 수 있습니다.

{{< img src="real_user_monitoring/session_replay/playlists/playlists-build-new-playlist.mp4" alt="새로운 재생 목록 빌드" video="true" width="90%" >}}

## 사용 사례

팀에서는 다양한 방법으로 재생 목록을 사용할 수 있습니다. 다음은 시작하기 위한 몇 가지 아이디어입니다.

- 한 세션에서 오류를 발견한 후에는 해당 오류 패턴이 있는 다른 세션을 찾아서 함께 그룹화할 수 있습니다.
- UI를 업데이트할 때 사용자가 새로운 흐름에서 혼란을 느낄 수 있는 세션에 대한 재생 목록을 만들 수 있습니다.
- 수익 창출 버튼에 대한 분노 클릭과 같은 고유한 동작이 있는 세션 그룹을 북마크하려면 RUM에 쿼리를 작성하고 관련된 모든 세션을 재생 목록에 저장하면 됩니다. 

## 트러블슈팅

### Session Replay를 재생 목록에 저장하면 오류가 발생합니다.

재생 목록의 모든 Session Replay는 완료된 세션이어야 합니다. 재생 목록에 추가할 수 있는 Session Replay를 찾으려면 아래 쿼리를 복사하여 RUM 탐색기에 붙여넣으세요.

```@session.is_active:false @session.type:user @session.has_replay:true```

이 쿼리는 리플레이가 첨부되어 있고 신서틱(Synthetic) 세션이 아닌 실제 사용자 상호 작용에서 발생한 완료된 세션을 검색하도록 합니다.

### 재생 목록을 만들면 오류가 발생합니다.
재생 목록을 만들 수 있는 적절한 역할과 권한이 있는지 확인하세요. 재생 목록 쓰기 권한으로 다음을 수행할 수 있습니다:

- 재생 목록 만들기
- 재생 목록 편집
- 재생 목록 삭제
- 재생 목록에 세션 추가
- 재생 목록에서 세션 제거

또한 Session Replay 읽기 권한으로 다음을 수행할 수 있습니다.

- 재생 목록 보기
- 재생 목록에서 세션 보기

### 재생 목록에서 재생 영상을 기본 Session Replay 보존 기간인 30일보다 더 오래 보관하기

기본적으로 Session Replay 보존 기간은 30일입니다. [보존 기간 연장][2]을 사용하면 개별 Session Replay의 보존 기간을 최대 15개월까지 연장할 수 있습니다. 재생 목록에 Session Replay를 추가하면 해당 재생 영상의 보존 기간이 자동으로 연장됩니다. 개별 세션 다시 보기의 보관 기간 연장은 언제든지 취소할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/replay/playlists
[2]: /ko/real_user_monitoring/session_replay/#retention