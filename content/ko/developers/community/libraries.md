---
aliases:
- /ko/libraries/
- /ko/developers/faq/monitoring-akka/
- /ko/developers/libraries/
title: 라이브러리
---

## API 및 DogStatsD 클라이언트 라이브러리

다음 표에는 Datadog 공식 및 커뮤니티 기여 API, 그리고 [DogStatsD][1] 클라이언트 라이브러리가 나열되어 있습니다. 일부 라이브러리는 API와 DogStatsD를 모두 지원하지만 대부분의 라이브러리는 둘 중 하나만 지원합니다. 

{{< classic-libraries-table >}}

## 애플리케이션 성능 모니터링(APM) & 연속 프로파일러 클라이언트 라이브러리

다음 표에는 Datadog 공식 및 커뮤니티 기여 [트레이스][2] 클라이언트 라이브러리가 나열되어 있습니다.

{{< tracing-libraries-table >}}

## 서버리스 클라이언트 라이브러리

다음 표에는 Datadog 공식 및 커뮤니티 기여 [서버리스][3] 클라이언트 라이브러리가 나열되어 있습니다.

{{< serverless-libraries-table >}}

## 로그 관리 클라이언트 라이브러리

다음 표에는 Datadog 공식 및 커뮤니티 기여 로그 관리 클라이언트 라이브러리가 나열되어 있습니다.

{{< log-libraries-table >}}

## Datadog 클라이언트 커뮤니티 라이브러리

### 대시보드 백업

Datadog [APIs][4]를 사용하면 스크립트를 작성하여 대시보드 정의를 코드로 백업할 수 있습니다. 다음 프로젝트를 통해 백업 수행 사례를 살펴보세요: 

| 언어   | 라이브러리          | 작성자          |
|------------|------------------|-----------------|
| 자바스크립트 | [dog-watcher][5] | [Brightcove][6] |
| Ruby       | [doggy][7]       | [Shopify][8]    |
| Ruby       | [kennel][9]      | [Zendesk][10]    |

### 모니터 관리

Datadog [API][4]를 사용하여 모니터를 유지, 관리 또는 백업할 수 있는 여러 커뮤니티 프로젝트가 있습니다:

| 언어  | 라이브러리          | 작성자               |
|-----------|------------------|----------------------|
| 파이썬(Python)    | [DogPush][11]              | [TrueAccord][12]     |
| Ruby      | [barkdog][13]              | [codenize-tools][14] |
| Ruby      | [interferon][15]           | [Airbnb][16]         |
| Ruby      | [dogwatch][17]             | [Rapid7][18]         |
| Terraform | [Terraform][19]            | [Terraform][20]      |
| 테라폼 | [datadog-to-terraform][21] | [Intercom][22]       |

## 커뮤니티 통합

### Ansible

공식 Ansible 통합 외에도, [ansible-modules-extras][24] 리포지토리의 [모니터링 섹션][23]에는 Datadog과 상호 작용하는 모듈이 포함되어 있습니다.

### Aptible

Enclave는 메트릭을 Datadog 계정으로 전달합니다. [자세히 알아보려면 Aptible 도움말 센터를 참조하세요][25].

### CLI 관리

대시보드 및 모니터를 백업/복원하고 명령줄 인터페이스를 통해 사용자를 설정하는 [도구 세트][27]입니다.

### Consul

[Consul 라이브러리][28]를 이용해 [DogStatsD][1]에서 Datadog에 Consul 서비스 개수를 게시합니다. 

### Dogscaler

[Dogscaler][29]를 사용하여 Datadog 쿼리 결과를 기반으로 오토 스케일링 그룹을 확장합니다.

### FreeSwitch

이는 [FreeSwitch ESL][30] 애플리케이션이 DogStatsD API를 사용하여 Datadog으로 통계를 내보내기 위한 것으로, [WiMacTel][31]에서 작성되었습니다.

### 헤로쿠(Heroku)

헤로쿠(Heroku)는 로그를 통해 다이노 메트릭을 방출합니다. 이러한 로그를 메트릭으로 변환하여 Datadog으로 전송하려면 다음 로그 드레인 중 하나를 사용합니다.. Datadog으로 헤로쿠(Heroku) 로그를 보내려면, [헤로쿠(Heroku) 로그 수집][34]을 참조하세요.

* [Oz][36]가 NodeJS로 작성한 [헤로쿠(Heroku) Datadog 로그 드레인] [35]
* [Apiary][38]가 Go로 작성한 [헤로쿠(Heroku) Datadog 로그 드레인] [37].

헤로쿠(Heroku)에서 PHP 트레이서 또는 프로파일러를 사용하려면 다음 빌드팩을 사용하세요.

* [헤로쿠(Heroku) Datadog PHP 트레이서 및 프로파일러 빌드팩][65]은 [SpeedCurve][66]에서 유지 관리합니다.

### Jira

Jira의 데이터를 폴링하여 Datadog에 메트릭으로 업로드하는 [도구][39]입니다.

### K6

K6는 Load Impact에서 개발한 로드 및 성능 회귀 테스트 도구이며, [DogStatsD][1]을 사용하여 테스트 결과를 Datadog으로 전송할 수 있습니다. 이 기능을 활성화하려면 [튜토리얼][40]을 참조하세요.

### LaunchDarkly

Datadog 이벤트로 변경 내용을 기록하는 [LaunchDarkly][41] 웹 훅 핸들러입니다.

### 로그스태시(Logstash) 출력

* [Datadog를 위한 로그스태시(Logstash) 출력][42]
* [DogStatsD를 위한 로그스태시(Logstash) 출력][43]

### Moogsoft

Datadog 알림을 수집하는 Moogsoft [listener][44]

### NGINX LUA

* LUA 스크립트의 [nginx_lua_dataadog][46] 모듈을 사용하여 NGINX 설정에서 직접 [커스텀 메트릭][45]을 내보냅니다.
* [lua-resty-DogStatsD][47]은 [mediba inc][48]([Dailymotion][49]에 의해 갈라져나옴)에 의해 개발된 확장으로, [DogStatsD][1] 프로토콜을 통해 메트릭, 이벤트 및 서비스 점검을 내보낼 수 있습니다. `lua-resty-dogstatsd`은 GPLv3로 릴리스되며 Nginx 코소켓 API에 의존합니다.

### OpenVPN

* OpenVPN [대역폭 사용량][50] 및 활성 연결 수를 Datadog에 보냅니다.
* OpenVPN [라이센스 정보][51]를 Datadog으로 전송합니다.

### Phusion Passenger

[Stevenson Jean-Pierre][53]에 의해 작성된 [passenger-datadog-monitor][52]을 사용하여 Pusion의 Passenger 서버에서 상태 메트릭을 전송합니다.

### Pid-stats

[GitterHQ][55]에 의해 생성된 [라이브러리][54]를 사용하면 주어진 pid 파일에 대해 StatsD로부터 프로세스 정보를 생성할 수 있습니다. 

### SaltStack

* [Datadog SaltStack Formula][56]
* [Luca Cipriani][58]에 의해 작성된 [Datadog SaltStack][57].

### Sensu

메트릭과 이벤트 모두 Datadog으로 자동 전송하려면 Sensu [핸들러][59]를 사용하세요. 

### StackStorm

StackStorm Datadog [통합 팩][60]은 Datadog에 대한 작업 통합을 제공합니다.

### Winston

Winston Datadog [전송][61].

## 커뮤니티 에이전트 포트

### FreeBSD

[FreeBSD dd-agent 포트][62]

### NixOS

[dd-agent nixpkg][63]

Datadog 라이브러리를 작성한 후 이 페이지에 추가하려면 [opensource@datadoghq.com][64]으로 이메일을 보내주세요.

[1]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /ko/tracing/
[3]: /ko/serverless/
[4]: /ko/api/
[5]: https://github.com/brightcove/dog-watcher
[6]: https://www.brightcove.com
[7]: https://github.com/Shopify/doggy
[8]: https://www.shopify.com
[9]: https://github.com/grosser/kennel
[10]: https://www.zendesk.com
[11]: https://github.com/trueaccord/DogPush
[12]: https://github.com/trueaccord
[13]: https://github.com/codenize-tools/barkdog
[14]: https://github.com/codenize-tools
[15]: https://github.com/airbnb/interferon
[16]: https://github.com/airbnb
[17]: https://github.com/rapid7/dogwatch
[18]: https://github.com/rapid7
[19]: https://www.terraform.io/docs/providers/datadog/r/monitor.html
[20]: https://www.terraform.io
[21]: https://github.com/intercom/datadog-to-terraform
[22]: https://github.com/intercom
[23]: https://docs.ansible.com/ansible/2.9/modules/list_of_monitoring_modules.html
[24]: https://github.com/ansible/ansible-modules-extras
[25]: https://www.aptible.com/documentation/enclave/reference/metrics/metric-drains/datadog.html
[27]: https://github.com/keirans/datadog-management
[28]: https://github.com/zendesk/consul2dogstats
[29]: https://github.com/cvent/dogscaler
[30]: https://github.com/wimactel/FreeSwitch-DataDog-Metrics
[31]: https://github.com/wimactel
[34]: /ko/logs/guide/collect-heroku-logs/
[35]: https://github.com/ozinc/heroku-datadog-drain
[36]: https://web.oz.com/
[37]: https://github.com/apiaryio/heroku-datadog-drain-golang
[38]: https://apiary.io
[39]: https://bitbucket.org/atlassian/jiradog/src/master/
[40]: https://blog.loadimpact.com/how-to-send-k6-metrics-to-datadog
[41]: https://github.com/meetup/launch-dogly
[42]: https://www.elastic.co/guide/en/logstash/current/plugins-outputs-datadog.html
[43]: https://github.com/brigade/logstash-output-dogstatsd
[44]: https://docs.moogsoft.com/AIOps.6.2.0/Datadog-Solution-Pak_13737047.html
[45]: /ko/metrics/custom_metrics/
[46]: https://github.com/simplifi/ngx_lua_datadog
[47]: https://github.com/dailymotion/lua-resty-dogstatsd
[48]: http://www.mediba.jp
[49]: https://www.dailymotion.com/us
[50]: https://github.com/byronwolfman/dd-openvpn
[51]: https://github.com/denniswebb/datadog-openvpn
[52]: https://github.com/Sjeanpierre/passenger-datadog-monitor
[53]: https://github.com/Sjeanpierre
[54]: https://github.com/gitterHQ/pid-stats
[55]: https://github.com/gitterHQ
[56]: https://github.com/DataDog/datadog-formula
[57]: https://gist.github.com/mastrolinux/6175280
[58]: https://gist.github.com/mastrolinux
[59]: https://github.com/sensu-plugins/sensu-plugins-datadog
[60]: https://github.com/StackStorm-Exchange/stackstorm-datadog
[61]: https://github.com/sparkida/winston-datadog
[62]: https://github.com/urosgruber/dd-agent-FreeBSD
[63]: https://github.com/NixOS/nixpkgs/tree/master/pkgs/tools/networking/dd-agent
[64]: mailto:opensource@datadoghq.com
[65]: https://github.com/SpeedCurve-Metrics/heroku-buildpack-php-ddtrace
[66]: https://www.speedcurve.com/