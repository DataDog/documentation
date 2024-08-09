---
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: 블로그
  text: Datadog 장애 신호로 사용자의 불편한 점 탐지
- link: https://docs.datadoghq.com/notebooks/
  tag: 설명서
  text: 노트북
title: 사후 검토에 새션 재생을 핵심 도구로 사용하기
---

## 개요

세션 재생은 사용자 분석과 시각적 재생 오류 간의 갭을 메워줍니다. 이 가이드에서는 개발자가 세션 재생을 사후 검토에 시청 자료로 사용하는 방법을 설명합니다.

## RUM을 사용해 일반적인 사용자 문제 파악하기

이 예시에서는 **구매** 버튼을 클릭한 후에 문제를 겪은 사용자가 많다고 가정하겠습니다. [RUM frustration signals dashboard][1]에서 조사해보니 RUM Explorer에 이와 같은 오류 유형이 한 주에 3,000건 발생한 것을 알 수 있었습니다.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/identify-widespread-user-issue-1.png" alt="RUM을 사용해 한 주에 오류 유형이 몇 건 발생했는지 파악" style="width:100%;">}}

## 세션 재생에서 사용자 문제 보기
위 쿼리 세션을 클릭하면 세션 재생을 통해 이 오류가 발생하는 과정을 실시간으로 확인할 수 있고, 사용자가 오류 발생 전과 후에 어떤 동작을 했는지 볼 수 있습니다.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/watch-user-issue.png" alt="세션 재생에서 사용자가 경험한 문제 검토" style="width:100%;">}}

## 노트북에 공유하기
이 문제를 조사 중인 다른 팀 구성원도 컨텍스트를 볼 수 있도록 공유 버튼을 눌러 이 특정 세션 재생을 노트북에 공유할 수 있습니다.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/share-to-notebook.png" alt="사후 조사 노트북에 저장해 세션 재생 영상 공유" style="width:60%;">}}

세션 재생을 노트북으로 보내면 댓글을 추가하고 이 인시던트의 다른 텔레메트리 데이터를 분석하며 사후 검토 과정을 문서화할 수 있습니다.

**참고**: 사후 검토 노트북 템플릿은 [여기][2]에서 볼 수 있습니다.

## 사후 검토 과정 문서화하기
재생을 노트북에 공유한 후에는 조사 과정을 문서화할 수 있습니다.

{{< img src="real_user_monitoring/guide/using-session-replay-in-post-mortems/document-the-post-mortem.png" alt="노트북에서 관련 그래프, 재생에 나타난 동작과 관련한 컨텍스트, 또는 관련 담당자를 댓글에 태그해 추가할 수 있음." style="width:100%;">}}

재생에 있는 동작의 컨텍스트를 추가하거나 문제와 관련된 그래프(예: 영향을 받은 총 사용자 수)를 불러올 수 있습니다.

또 노트북에 댓글을 추가해 이 문제 해결과 관련된 담당자를 태그할 수 있습니다. 이 경우에는 이 기능을 담당하는 제품 매니저를 태그해 백로그에 수정이 추가되었다고 확인해주었습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
[2]: https://app.datadoghq.com/notebook/template/7/postmortem-ir-xxxx-outage-name