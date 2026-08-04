---
description: 로그 Live Tail 오류 또는 문제 해결하기
title: Live Tail 문제 해결
---

Live Tail 페이지에 오류가 표시되거나 로그가 로드되지 않는 경우 다음 문제 해결 단계를 시도해 보세요.

* 브라우저에서 시크릿 모드로 Live Tail 보기를 열고 로그를 볼 수 있는지 확인합니다.
* 다른 브라우저를 사용해 보고 Live Tail에서 로그를 로드하는지 확인하세요.
* 다른 팀원들이 Live Tail 보기에서 로그를 볼 수 있는지 확인하세요.
* Live Tail 로그를 로딩하는 것을 차단할 수 있는 네트워크 제한, VPN 구성 또는 안티바이러스 소프트웨어가 있는지 확인하세요.
    - 로컬 또는 회사 네트워크가 `live.logs.datadoghq.com`에서 인바운드 트래픽을 허용하는지 확인합니다.
    - [IP 범위][1] 엔드포인트에서 Datadog IP 접두사를 찾습니다.

## 트레이스 요청

Traceroute는 패킷이 소스에서 목적지까지 이동하는 경로를 테스트할 수 있도록 해주는 도구입니다. `traceroute`를 사용하여 Live Tail 로딩을 중단시킬 수 있는 클라이언트 측 네트워크 문제를 식별할 수 있습니다.

Linux 또는 MacOS에서 Live Tail 로그의 경로를 점검하려면 다음 명령을 실행합니다.
{{< code-block lang="shell">}}
traceroute live.logs.datadoghq.com
{{< /code-block >}}

어느 시점에서든 요청 시간이 초과되면 클라이언트와 Datadog 서버 사이의 어딘가에서 요청이 차단되었다는 의미입니다. 이 문제를 해결하려면 네트워크 관리 팀에 문의하세요.

단계 경로에 `* * *`이 표시되면 호스트가 추적 경로에 응답하지 않았거나 라우터가 해당 프로토콜에 응답하지 않았음을 나타낼 수 있습니다. `* * *` 패턴이 항상 시간 초과를 나타내는 것은 아닙니다. `-I` 옵션을 사용하여 검색 프로토콜을 ICMP/PING으로 변경하면 더 자세한 결과를 얻을 수 있습니다.

## 브라우저 및 DNS 캐시 지우기

### 브라우저 캐시

브라우저 캐시를 지우면 Live Tail 문제를 해결하는 데 도움이 될 수 있습니다. 예를 들어 Google Chrome에서 캐시를 지우려면 [Google 계정 도움말][2]을 참조하세요.

### DNS 캐시

DNS 캐시를 지우면 Live Tail 문제가 해결될 수 있습니다.

Google Chrome을 사용하여 DNS 캐시를 지우는 방법:
1. Google Chrome 브라우저를 실행합니다.
1. 주소 창에 `chrome://net-internals/#dns` 를 입력한 다음 Enter를 클릭합니다.
1. **Clear host cache**를 클릭합니다.

## 브라우저 플러그인 및 확장 프로그램 확인

광고 차단기를 포함한 브라우저 플러그인 및 확장 프로그램은 때때로 Live Tail을 방해합니다.
- 브라우저 또는 운영 체제에 광고 차단 앱이 설치되어 있는지 확인하세요. 발견한 광고 차단 앱을 제거하거나 비활성화한 다음 Live Tail에서 로그를 볼 수 있는지 확인합니다.
- 브라우저 플러그인 및 확장 프로그램을 일시 중지, 중지, 또는 제거합니다.

## 액세스 확인

[`logs_live_tail`][3] 권한이 있는 역할이 자신에게 할당되어 있는지 확인합니다. 자세한 내용은 [Datadog 역할 및 권한][4]을 참조하세요.

관리자가 Datadog 조직에서 [로그 제한 쿼리(RBAC)][5]를 구성했는지 확인합니다. Live Tail 에서 쿼리하려는 로그에 액세스하는 데 필요한 권한이 없는 경우 로그가 표시되지 않습니다. 이러한 로그에 액세스할 수 있어야 한다고 생각되면 Datadog 계정 관리자에게 문의하여 필요한 권한을 부여하세요.

{{< img src="logs/explorer/live_tail/logs_rbac_page.png" alt="로그 RBAC 페이지" style="width:100%;" >}}

## 지원 티켓 생성

위의 문제 해결 단계로 Live Tail 문제가 해결되지 않는 경우, [지원 티켓][6]을 작성하세요. 가능하면 지원 티켓에 다음 정보를 포함하세요.

### 운영 체제 및 브라우저 상세 정보

- 브라우저 이름 및 버전
- 플러그인 및/또는 확장 프로그램
- 운영 체제 이름 및 버전

### HAR 파일

Google Chrome에서 HAR 파일을 생성하려면 [웹 세션 트래픽 캡처][7]를 참조하세요.

지원 티켓에 HAR 파일을 첨부하세요.

### 스크린샷 및 녹화
- 브라우저 콘솔의 스크린샷을 찍습니다.
    - Google Chrome에서 [개발자 도구][8]를 참조하여 브라우저 콘솔을 엽니다.
- 문제의 동작을 보여주는 간단한 동영상을 녹화합니다.

[1]: https://ip-ranges.datadoghq.com
[2]: https://support.google.com/accounts/answer/32050?hl=en&co=GENIE.Platform%3DDesktop
[3]: /ko/logs/guide/logs-rbac-permissions/?tab=ui#logs_live_tail
[4]: /ko/account_management/rbac/permissions/
[5]: /ko/logs/guide/logs-rbac/?tab=ui
[6]: https://help.datadoghq.com/hc/en-us/requests/new
[7]: https://support.google.com/admanager/answer/10358597?hl=en
[8]: https://developer.chrome.com/docs/devtools/open