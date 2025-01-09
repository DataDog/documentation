---
further_reading:
- link: service_management/events/correlation/triage_and_notify
  tag: 설명서
  text: 사례 심사 및 알림에 대해 더 알아보기
title: 지능형 상관 관계
---

{{< callout url="http://d-sh.io/eventmanagement" btn_hidden="false" header="베타 서비스 참여하기">}}
지능형 상관 관계 베타 서비스에 참여해 구성 설정 없이 자동으로 이벤트의 상관 관계를 수립해 보세요. 
{{< /callout >}}
## 개요

지능형 상관 관계 기능은 모델링에 기계 학습 기능을 활용합니다. 이를 통해 Datadog 내에서 수집한 기본 텔레메트리와 추론을 사용해 사용자 대신 자동으로 상관 관계를 수립합니다.
## 지능형 상관 관계 미리 보기

시작 방법:
1. [Correlation][1] 페이지로 이동하세요.
1. 여기에서 내 조직에 생성된 지능형 상관 관계를 미리 볼 수 있습니다.
1. 특정 팀이 심사하는 방법에 맞게 보기를 생성하고 사용자 지정하세요. 예를 들어 데이터베이스 팀에 맞는 보기를 하나 생성하고 모바일 팀에 맞는 보기를 별도로 생성할 수 있습니다.


{{< img src="service_management/events/correlation/intelligent/intelligent_config.png" alt="지능형 상관 관계 구성" style="width:100%;" >}}


## 첫 사례 수신

{{< img src="service_management/events/correlation/intelligent/intelligent_project.png" alt="Event Management - Intelligent Correlation" style="width:100%;" >}}

 [Case Management][2]로 이동해 이름이 **Event Management - Intelligent Correlation**인 프로젝트를 찾으세요. 이 프로젝트에서 내가 이전에 생성한 보기와 지능형 상관 관계 기능으로 생성된 사례를 보기를 확인할 수 있습니다.

지능형 상관 관계에서는 관련 알림을 찾으면 자동으로 사례를 생성합니다.
{{< img src="service_management/events/correlation/intelligent/intelligent_correlation.png" alt="지능형 상관 관계 기능으로 생성된 케이스 상세 페이지, Investigation 탭에 관련 알림을 표시" style="width:100%;" >}}




## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/correlation
[2]: https://app.datadoghq.com/cases