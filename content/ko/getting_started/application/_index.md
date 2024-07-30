---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-101-dev
  tag: 학습 센터
  text: 'Datadog 101: 개발자'
- link: https://learn.datadoghq.com/courses/dd-101-sre
  tag: 학습 센터
  text: 'Datadog 101: 사이트 안정성 엔지니어'
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 Datadog의 탄탄한 기반을 구축하세요.
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: 블로그
  text: Datadog 빠른 이동 메뉴 소개
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: 블로그
  text: Datadog을 구동하는 설계 시스템, DRUIDS
title: Datadog 시작하기
---

{{< learning-center-callout header="Try Datadog Foundation in the Learning Center" btn_title="지금 등록" btn_url="https://learn.datadoghq.com/courses/Datadog-foundation">}}
실제 클라우드 컴퓨팅 용량과 Datadog 평가판 계정 없이 학습해 보세요. 서비스 , 로그, 메트릭, 통합, 대시보드 활용을 가속화할 수 있는 실질적인 교육 과정을 시작해 보세요.
{{< /learning-center-callout >}}

## 개요

이번 가이드에서는 [Datadog 사이트][1]에서 사용할 수 있는 기능을 대략적으로 소개해드리겠습니다.

Datadog 사이트 탐색은 브라우저의 너비에 따라 달라집니다. 최대 세 가지 유형의 탐색을 사용할 수 있습니다. 탐색 유형을 변경하려면 브라우저 너비를 조정합니다.

## 통합

{{< img src="getting_started/application/integrations-2024.png" alt="통합" >}}

- Datadog [공식 지원 대상][2]인 통합은 {{< translate key="integration_count" >}}개입니다.
- 커스텀 통합은 [Datadog API][3]로 사용할 수 있습니다.
- Agent는 [오픈 소스][4]입니다.
- 통합을 설정한 후에는 데이터센터에 있는 데이터든, 온라인 서비스의 데이터든 모든 데이터가 Datadog에서 동일하게 처리됩니다.

## 대시보드

[대시보드][12]는 실시간 성능 메트릭이 포함된 그래프를 보여줍니다.

- [스크린보드][13]에 있는 모든 그래프는 동일한 마우스 조작으로 볼 수 있습니다.
- 세로 줄은 이벤트입니다. 이를 통해 컨텍스트에 메트릭을 할당할 수 있습니다.
- 그래프를 클릭하고 드래그해 특정 타임프레임을 확대할 수 있습니다.
- 그래프 위에 커서를 두면 이벤트 스트림(Event Stream)이 함께 움직입니다.
- 영역, 호스트 또는 총 사용량을 표시합니다.
- Datadog는 그래프의 JSON 편집기를 공개합니다. 이를 통해 [수식][14]과 [함수][15]를 메트릭에 적용할 수 있습니다.
- 스트림에 표시되는 그래프 스냅샷을 공유합니다.
- 그래프는 iframe에 삽입할 수 있습니다. 이를 통해 데이터나 기타 정보에 대한 액세스 권한을 부여하지 않고도 제3자에게 실시간 그래프에 대한 액세스 권한을 부여할 수 있습니다.

## 모니터

[모니터][16]는 메트릭 기준치, 통합 가용성, 네트워크 엔드포인트 등에 따라 경고와 알림을 표시합니다.

- Datadog에 보고되는 메트릭을 사용할 수 있습니다.
- 디바이스, 호스트 등을 기준으로 다중 알림을 설정하세요.
- 경고 메시지에 `@`를 사용해 해당하는 관계자에게 직접 알림을 보냅니다.
- 다운타임 일정을 설정하면 시스템 작동 중단이나 오프라인 점검 시 등에 알림을 정지시킬 수 있습니다.

## 이벤트

이벤트 익스플로러[Event Explorer][10]는 인프라스트럭처와 서비스에서 생성된 최근 이벤트들을 보여줍니다.

이벤트는 다음을 포함합니다.

- 코드 배포
- 서비스 상태 변경
- Configuration 변경
- 모니터 알람 

이벤트 익스플로러는 Agent와 설치된 integration을 통해 이벤트를 수집합니다.

또한, Datadog API, custom Agent check, DogstatsD 또는 Events email API를 통해서 커스텀 이벤트들을 전송할 수 있습니다.

이벤트 익스플로러에서 이벤트를 검색하시고자 하신다면 query 또는 facet 기능을 통해서 이벤트를 필터링할 수 있습니다. 또는 attribute를 통해 이벤트들을 그룹핑 또는 필터링하고 event analytics를 이용해 시각화 해보세요.

## 인프라스트럭처

- 모든 머신은 [인프라스트럭처 목록][7]에 표시됩니다.
- 각 머신에 적용된 태그를 확인할 수 있습니다. 태그 지정은 어느 머신이 특정 목적을 수행하는지 표시할 때 유용합니다.
- Datadog는 서버를 카테고리별로 자동 분류합니다. 새 머신에 태그가 지정된 경우, 이전에 해당 태그에 설정된 내용에 따라 머신의 상태를 즉시 확인할 수 있습니다. [태그 지정에 대해 더 자세히 알아보세요][8].

## 호스트 맵

{{< img src="getting_started/application/host_map_2024.png" alt="호스트 맵 개요" >}}

[호스트 맵][9]은 인프라스트럭처 메뉴에서 찾을 수 있으며, 다음과 같은 기능을 지원합니다.

- 빠르게 환경을 시각화
- 아웃라이어(outlier) 식별
- 사용 패턴 탐지
- 리소스 최적화

자세한 내용은 [호스트 맵][9] 가이드에서 참조해주세요.

## 서버리스

[서버리스][20]는 사용자가 이벤트 기반 코드를 작성하고 클라우드 제공업체에 업로드하도록 해줍니다. 여기서 클라우드 공급업체는 기초 컴퓨팅 리소스 전체를 관리합니다. Datadog 서버리스(Serverless)는 서버리스 애플리케이션을 실행하는 AWS Lambda 함수에서 메트릭, 트레이스, 로그를 하나의 화면으로 정리하여 표시합니다. 따라서 오류, 높은 지연시간 또는 cold start 문제가 발생한 함수를 필터링하여 성능을 최적화할 수 있습니다.

## APM & Continuous Profiler

[Datadog 애플리케이션 성능 모니터링][6] (APM 또는 트레이싱)을 이용하면 로그 및 인프라스트럭처의 모니터링과 함께, 요청량 및 지연 시간 등 주요 메트릭을 모니터링하기 위해 자동으로 생성된 대시보드부터 개별 요청의 상세한 트레이스에 이르기까지 애플리케이션 성능에 대한 심층적인 인사이트를 제공합니다. 애플리케이션에 대해 요청이 진행되면 Datadog는 분산화 시스템 전체에서 트레이스를 확인할 수 있습니다. 따라서, 요청 사항과 관련해 어떤 일이 일어나고 있는지 체계적인 데이터를 정확하게 표시할 수 있습니다.

## 네트워크 성능 모니터링 

{{< img src="getting_started/npm.png" alt="NPM" >}}

Datadog [Network Performance Monitoring][17](NPM)을 사용하면 컨테이너부터 호스트, 서비스, 가용성 영역까지 Datadog에서 태그가 지정된 오브젝트 전체의 네트워크 트래픽을 시각화할 수 있습니다. NPM은 데이터센터부터 팀, 개별 컨테이너까지 무엇이든 그룹화합니다. 또한 태그를 사용하고, 송신자와 수신자별로 트래픽을 필터링합니다. 다음으로 필터는 플로우에 집약되며, 각각 커스텀 가능한 네트워크 페이지와 네트워크 맵을 통해서 하나의 송신자와 수신자간의 트래픽을 나타냅니다. 각 플로우에는 처리량, 대역폭, 재송신 횟수 및 IP, 포트, PID 레벨까지의 송신자/수신자 정보를 비롯한 네트워크 메트릭이 포함됩니다. 다음으로는 트래픽량이나 TCP 재송신 등의 주요 메트릭을 보고합니다.

## 합성 모니터링

Datadog [신서틱(Synthetic) 모니터링][22]을 사용하면 애플리케이션과 모니터링 시스템 계층의 모든 내외부 네트워크 엔드포인트에서 사용자 트랜잭션을 선제적으로 시뮬레이션하는 API 및 브라우저 테스트를 생성하고 실행할 수 있습니다. 오류를 감지하고, 회귀를 식별하고, 롤백을 자동화하여 프로덕션 환경에서 문제가 발생하는 것을 방지할 수 있습니다.

## RUM & 세션 재생

Datadog [Real User Monitoring][18] (RUM)을 사용하면 개별 사용자의 실시간 활동과 경험을 시각화하고 분석할 수 있습니다. [Session Replay][19]는 사용자의 웹 브라우징 세션을 포착하고 확인하여 사용자 행동을 더욱 상세하게 파악하도록 지원합니다. RUM Explorer에서 로드 시간, 프론트엔드 오류, 페이지 의존 관계를 시각화하여 비즈니스 메트릭과 애플리케이션 메트릭을 연계하고 하나의 대시보드에서 애플리케이션, 인프라스트럭처, 비즈니스 메트릭을 사용하여 신속하게 문제를 해결할 수 있습니다.

## 클라우드 SIEM

Datadog [Cloud SIEM][21](보안 정보 및 이벤트 관리)는 자동으로 애플리케이션과 인프라스트럭처의 위협 요소를 감지합니다. 예를 들어 타겟팅 공격, 위협 인텔리전스 목록과 일치하며 사용자 시스템과 소통 중인 IP, 또는 불안정한 설정 등을 탐지해냅니다. Datadog는 이러한 위협 요소를 보안 시그널(Security Signal)로 처리하며, 보안 익스플로러(Security Explorer)에서 상관 관계를 파악하여 분류합니다.

## 로그 관리

[Datadog 로그 관리][5]를 사용하면 애플리케이션과 인프라스트럭처를 통해 생성된 모든 로그를 전송하고 처리할 수 있습니다. 인덱스를 생성하지 않고 라이브 테일(Live Tail)을 사용하여 실시간으로 로그를 관찰할 수 있습니다. 애플리케이션과 인프라스트럭처에서 모든 로그를 가져오고, 필터를 적용해 동적으로 인덱스로 정리할 대상을 결정하거나 이를 아카이브에 저장할 수도 있습니다.


## 모바일 Datadog

[Apple App Store][24]와 [Google Play Store][25]에서 다운로드 가능한 [Datadog 모바일 앱][23]을 사용하면 대기 중인 엔지니어와 비즈니스 사용자에게 주요 데이터를 제공해, 서비스 상태를 추적하고 노트북을 열지 않고도 문제를 빠르게 선별할 수 있습니다. 모바일 기기에서 바로 소속 조직의 대시보드, 모니터, 인시던트, SLO 등에 액세스할 수 있습니다.

{{< img src="getting_started/application/mobile-app-store-screens.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="iOS 모바일 앱">}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /ko/api/
[4]: https://github.com/DataDog/datadog-agent
[5]: /ko/logs/
[6]: /ko/tracing/
[7]: /ko/infrastructure/
[8]: /ko/getting_started/tagging/
[9]: /ko/infrastructure/hostmap/
[10]: /ko/service_management/events/
[11]: /ko/service_management/events/explorer/analytics
[12]: /ko/dashboards/
[13]: /ko/dashboards/#screenboards
[14]: /ko/dashboards/functions/arithmetic/
[15]: /ko/dashboards/functions/
[16]: /ko/monitors/
[17]: /ko/network_monitoring/performance/
[18]: /ko/real_user_monitoring/
[19]: /ko/real_user_monitoring/session_replay/browser/
[20]: /ko/serverless
[21]: /ko/security/cloud_siem/
[22]: /ko/synthetics/
[23]: /ko/service_management/mobile/
[24]: https://apps.apple.com/app/datadog/id1391380318
[25]: https://play.google.com/store/apps/details?id=com.datadog.app