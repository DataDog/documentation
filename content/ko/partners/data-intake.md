---
description: Datadog로 데이터를 피드하는 방법과 사용자나 클라이언트 환경에 있어야 할 필수 구성 요소를 알아봅니다.
private: true
title: 데이터 수집
---

기초 작업을 마쳤으면 이제 Datadog로 데이터를 받아야 합니다.

이 단계의 주 목적은 사용자나 클라이언트에게 바로 가치를 제공할 수 있도록 데이터를 모으는 것입니다. 그러나 장기적으로 다음과 같은 질문을 통해 지속적으로 환경 변화를 평가하는 상시 프로세스로 이 단계를 봐야 합니다.
- 사용자 또는 클라이언트가 새 기술을 도입했나요?
- 사용자 또는 클라이언트가 새 프로세스를 도입했나요?
- Datadog에서 사용자가 사용할 수 있는 새 제품을 출시했나요?

이 같은 질문을 정기적으로 해보고 필요한 텔레메트리가 모두 Datadog로 수집되는지 확인하세요.

## 통합

통합을 이용해 클라이언트에게 바로 가치를 제공할 수 있습니다. Datadog에서는 {{< translate key="integration_count" >}}개의 통합 서비스를  제공하기 때문에 폭넓은 기술에서 메트릭과 로그를 수집할 수 있습니다.

통합에는 다음과 같은 세 가지 카테고리가 있습니다.
- 클라우드 서비스 통합
- Datadog 에이전트 및 에이전트 기반 통합
- API/라이브러리 통합 및 커스텀 점검

다른 통합 유형에 관한 자세한 정보는 [통합 소개][1]를 참고하세요.

## 클라우드 서비스 통합

클라우드 서비스나 "크롤러' 기반 통합은 인증된 연결을 통해 API를 이용하여 클라우드 서비스에서 인프라스트럭처 정보, 메트릭, 로그, 이벤트를 수집합니다.

클라우드 서비스 통합을 설정하는 시간은 몇 분 정도면 충분하며, 메트릭과 이벤트가 Datadog로 전송되어 바로 가치 제공에 활용할 수 있습니다.

**참고**: 클라우드 서비스 통합을 이용하면 대량으로 데이터가 생성될 수 있고, 이는 Datadog와 클라우드 서비스 청구 요금에 영향을 미칠 수 있습니다.

대부분의 시나리오에서 클라우드 서비스 통합을 사용하더라도 인프라스트럭처 전체를 이해하는 데는 부족할 수 있고, 특히 이와 같은 환경에서 실행 중인 애플리케이션을 이해하는 데는 더욱 그러합니다. Datadog에서는 클라우드 서비스 통합과 함께 다른 데이터 수집 방법을 모두 활용하기를 권장합니다.

클라우드 환경 모니터링에 대해 알아보려면 다음을 참고하세요.
- [클라우드 모니트링][2](전자책)
- [AWS 클라우드 모니터링 소개][3](블로그)
- [Google 클라우드 모니터링 소개][4](블로그)
- [Azure 클라우드 모니터링 소개][5](블로그)

## Datadog 에이전트 및 에이전트 기반 통합

Datadog 에이전트는 호스트에서 실행되는 소프트웨어로, 이벤트와 메트릭을 수집해 Datadog로 전송합니다. 에이전트는 일반적으로 사용하는 플랫폼에서 모두 사용할 수 있고, 실행 중인 호스트에 관한 다양한 메트릭(CPU, 메모리, 디스크, 네트워크 메트릭 등)을 수집할 수 있습니다. 그러나 에이전트의 강점은 통합에서 발휘됩니다.

에이전트 기반 통합을 사용하면 에이전트를 통해 애플리케이션 및 호스트나 
호스트 내 컨테이너에서 직접 실행 중인 기술에서 에이전트가 메트릭, 로그, 트레이스, 
이벤트를 수집할 수 있습니다.

통합 및 Datadog 에이전트와 관련한 자세한 정보는 다음을 참고하세요.
- [Datadog 통합 목록][6]
- [Datadog 에이전트][7]
- [에이전트 시작하기][8]

## API/라이브러리 통합 및 커스텀 점검

Datadog에서는 규모와 기능 확장성에 초점을 두고 여러 API와 SDK를 제공해 다음과 같은 상황에서도 플랫폼을 확장할 수 있도록 합니다.
- 보안이나 기타 제한으로 인해 에이전트를 설치할 수 없는 경우(예: IoT 디바이스).
- Datadog 에이전트와 통합이 사용 중인 기술과 요구 사항을 충족하지 않을 경우.

이와 같은 경우, API를 사용하면 관련 텔레메트리를 클라이언트가 사용하는 가시성 플랫폼으로 캡처해 보낼 수 있습니다.

서비스 공급자로서 중요하게 볼 API 영역에는 세 개가 있습니다.
- 데이터 수집용 공용 API
- 커스텀 점검
- 에이전트의 데이터 수집용 로컬 API

### 데이터 수집용 공용 API

클라우드 서비스 통합이나 에이전트를 사용할 수 없을 경우, 데이터 수집을 위해 다음 API를 유용하게 사용할 수 있습니다.

- 로그를 Datadog의 [로그 수집 엔드포인트][9]로 바로 전송할 수 있음.
- 메트릭을 Datadog의 [메트릭 API][10]로 바로 전송할 수 있음.
- 이벤트를 Datadog의 [이벤트 API][1]로 바로 전송할 수 있음.
- 트레이스를 Datadog의 [트리이스/스팬 API][12]로 바로 전송할 수 있음.

### 커스텀 점검

Datadog에서 {{< translate key="integration_count" >}}개의 통합 서비스를 제공하고 있지만, 클라이언트가 커스텀 애플리케이션을 사용 중이라면 기존 통합을 사용하지 못할 수 있습니다. 클라이언트가 에이전트를 사용해 커스텀 점검을 하면 이 같은 애플리케이션을 모니터링할 수 있습니다.

자세한 정보는 [커스텀 점검][13]을 참고하세요.

### 에이전트의 데이터 수집용 로컬 API

Datadog 에이전트 번들에는 DogStatsD가 포함되어 있는데, DogStatsD는 메트릭 집계 서비스로 UDP를 사용해 데이터를 수용합니다. 커스텀 점검이 내 사용 사례에 맞지 않고 애플리케이션에 사용할 기존 통합도 없는 경우, DogStatsD가 좋은 대안이 될 수 있습니다. 예를 들어 DogStatsD를 사용해 자체 로그 파일이 없는 크론(cron) 작업에서 이벤트와 메트릭 데이터를 수집할 수 있습니다.

DogStatsD 엔드포인트를 사용하거나 Datadog 클라이언트 라이브러리를 사용해 메트릭과 이벤트를 DogStatsD로 전송할 수 있습니다.

자세한 정보는 다음을 참고하세요.
- [이벤트 제출][14]
- [커스텀 메트릭 제출][15]
- [라이브러리][16]
- [API 레퍼런스][17]

## 태깅 전략

Datadog 기능을 최대한을 활용하려면 태깅 전략을 효과적으로 사용해야 합니다.

태그는 데이터에 연결된 레이블로, Datadog 전반에서 데이터를 필터링 및 그룹화하고 상관 관계를 정의하는 데 사용됩니다. 태깅을 통해 Datadog 내 여러 텔레메트리 유형을 한 데 묶고, 메트릭, 트레이스, 로그 간 상관 관계를 발견하고 작업을 요청할 수 있습니다. 예약된 태그 키로 이 같은 작업을 실행할 수 있습니다.

초반에 일관된 태깅 전략을 수립하면 성공적으로 Datadog를 구현할 수 있을 뿐만 아니라 클라이언트에게 제공할 수 있는 가치도 최대화할 수 있습니다.

태깅에 대해서는 다음 사항을 고려하세요.
- **기술**: 팀이나 클라이언트 간 같은 기술을 사용하고 있는지 비교할 수 있습니다.
- **환경**: 테스트, 프로덕션, 기타 환경 간 성능을 비교할 수 있습니다.
- **위치**: 특정 데이터 센터나 클라우드 서비스 공급자 가용 영역과 관련한 문제를 이해할 수 있습니다.
- **비즈니스 서비스**: 기술과 무관하게 비즈니스 서비스의 구성 요소를 필터링할 수 있습니다.
- **역할**: 비즈니스 서비스에서 엔터티가 어떤 역할을 수행하는지 이해할 수 있습니다.
- **책임**: 담당 팀의 리소스 모두를 필터링할 수 있어 다른 사용자와 팀이 특정 서비스에 대해 책임이 있는 팀을 확인할 수 있습니다.

태그를 효율적으로 활용하려면 [태그 시작하기][18]를 참고하세요.

태깅과 태깅 전략에 관한 자세한 정보는 다음을 참고하세요.
- [인프라스트럭처 및 애플리케이션 태깅 모범 사례][19](블로그)
- [태깅 모범 사례][20](교육)
- [통합 서비스 태깅][21]
- [쿠버네티스 태그 추출][22]
- [AWS 태깅][23](AWS 설명서)
- [서버리스 태깅][24]
- [라이브 컨테이너 태깅][25]

## 에이전트 출시

다음은 에이전트 출시와 관련한 핵심 단계입니다.
- 에이전트 배포 사전 필수 조건
- 기존 인프라스트럭처로 첫 에이전트 배포
- 새 인프라스트럭처 프로비저닝
- 연속 프로비저닝 절차 모니터링

### 에이전트 배포 사전 필수 조건

플랫폼과 운영 체제에 따라 에이전트 사전 필수 조건이 다를 수 있습니다. [공식 에이전트 설명서][7]를 참고해 요구 조건을 미리 알아두세요.

플랫폼 전체에서 공통적으로 필요한 조건은 네트워크 연결입니다. 트래픽은 항상 에이전트에서 시작해 Datadog로 흐릅니다. Datadog에서 시작해 에이전트로 가는 세션은 없습니다. 몇몇 예외를 제외하고, 에이전트 배포에 인바운드 연결(로컬 방화벽을 통해 제한됨)은 중요하지 않습니다.

에이전트가 올바로 작동하려면 트래픽을 SSL 및 443/tcp를 통해 Datadog 서비스로 전송해야 합니다. 에이전트에서 사용하는 포트 전체 목록을 보려면 [네트워크 트래픽][26]을 참고하세요.

일부 환경에서 특정 에이전트 버전의 엔드포인트가 유지보수 문제를 일으킬 수 있는데, 이 경우 Datadog에서 버전에 영향을 받지 않는 엔드포인트를 제공할 수 있습니다. 버전에 영향을 받지 않는 엔드포인트가 필요한 경우 Datadog 지원팀에 문의하세요.

#### 에이전트 프록시

클라이언트 환경 대다수의 경우, 에이전트에서 Datadog로 직접 연결을 형성하는 것이 불가능하거나 좋은 방법이 아닐 수 있습니다. Datadog에서는 연결을 형성할 때 사용할 수 있는 다양한 에이전트 트래픽 프록시 옵션을 제공합니다.

자세한 정보는 [에이전트 프록시 구성][27]을 참고하세요.

### 에이전트 배포, 업그레이드, 구현

Datadog 에이전트를 사용자나 클라이언트 인프라스트럭처로 배포하는 데는 다양한 방법이 있습니다. 서비스 공급자 대부분이 이미 자체 구성 관리 도구를 갖추고 있기 때문에 에이전트의 경우에도 기존 도구를 사용하는 것이 좋습니다.

다음은 구성 관리 도구를 사용해 Datadog 에이전트를 관리하는 예시이니 참고하세요.
- [Chef로 Datadog 에이전트 배포하기][28](블로그)
- [Puppet + Datadog: 자동 + 시스템 모니터링하기][7](블로그)
- [CloudFormation으로 Datadog 배포 및 구현하기][29](블로그)
- [Ansible을 사용해 Datadog 자동 구성하기][30](비디오)
- [Ansible 동적 인벤토리가 있는 AWS 호스트에서 Datadog 에이전트를 배포하는 방법][31](블로그)

Datadog 리포지토리를 사용하지 않을 계획이라면 [공용 GitHub 리포지토리][32]에서 최신 에이전트 릴리즈를 찾을 수 있습니다. 배포하기 전에 에이전트 패키지의 [분포 채널을 인증][33]하는 것이 좋습니다.

### 연속 프로비저닝 절차 모니터링

Datadog를 배포할 때 구성 관리 도구를 사용하는 것이 좋으며, Datadog를 활용해 이 같은 도구가 제대로 작동하는지도 모니터링할 수 있습니다. 다음 예시를 참고하세요.
- [시스템 문제 알아보기: Datadog로 Chef 모니터링][34](블로그)
- [Ansible + Datadog: 자동화를 모니터링, 모니터링을 자동화][35](블로그)

## 다음 단계

Datadog로 데이터가 들어오기 시작하면 클라이언트에게 [가치를 제공][36]하는 것에 집중할 수 있습니다.


[1]: /ko/getting_started/integrations/
[2]: https://www.datadoghq.com/pdf/monitoring-in-the-cloud-ebook.pdf
[3]: https://www.datadoghq.com/solutions/aws/
[4]: https://www.datadoghq.com/solutions/gcp/
[5]: https://www.datadoghq.com/solutions/azure/
[6]: /ko/integrations/
[7]: /ko/agent/
[8]: /ko/getting_started/agent/
[9]: /ko/getting_started/logs
[10]: /ko/api/latest/metrics
[11]: /ko/api/latest/events
[12]: /ko/api/latest/tracing/
[13]: /ko/developers/custom_checks/
[14]: /ko/service_management/events/guides/dogstatsd/
[15]: /ko/metrics/custom_metrics/
[16]: /ko/developers/community/libraries/#api-and-dogstatsd-client-libraries
[17]: /ko/api/latest/
[18]: /ko/getting_started/tagging/
[19]: https://www.datadoghq.com/blog/tagging-best-practices/
[20]: https://learn.datadoghq.com/courses/tagging-best-practices
[21]: /ko/getting_started/tagging/unified_service_tagging?tab=kubernetes
[22]: /ko/agent/kubernetes/tag/
[23]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[24]: /ko/serverless/serverless_tagging/?tab=serverlessframework#overview
[25]: /ko/infrastructure/livecontainers
[26]: /ko/agent/configuration/network/
[27]: /ko/agent/configuration/proxy/
[28]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[29]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[30]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[31]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /ko/data_security/agent/#agent-distribution
[34]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[35]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[36]: /ko/partners/delivering-value/