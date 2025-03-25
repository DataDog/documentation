---
aliases:
- /ko/guides/basic_agent_usage/
- /ko/agent/faq/where-is-the-configuration-file-for-the-agent/
- /ko/agent/faq/log-location
further_reading:
- link: /agent/faq/how-datadog-agent-determines-the-hostname/
  tag: FAQ
  text: Datadog에서 에이전트 호스트 이름을 결정하는 방법
- link: /agent/configuration/agent-commands/
  tag: FAQ
  text: 모든 에이전트 명령 목록
- link: /agent/configuration/agent-configuration-files/
  tag: FAQ
  text: 전체 에이전트 구성 파일의 위치
- link: https://www.datadoghq.com/blog/engineering/performance-improvements-in-the-datadog-agent-metrics-pipeline/
  tag: 블로그
  text: Datadog 에이전트 메트릭 파이프라인의 성능 개선
title: 에이전트 기본 사용량
---

{{< partial name="platforms/platforms.html" links="platforms" >}}

## 에이전트 관리

Datadog 에이전트 관리자 GUI를 사용하거나 명령줄로 에이전트 설치를 관리합니다.

### Datadog 에이전트 관리자 GUI

<div class="alert alert-info">에이전트 GUI는 32비트 윈도우즈(Windows) 플랫폼을 지원하지 않습니다.</div>

다음에 Datadog 에이전트 관리자 GUI를 사용합니다.
- 에이전트용 상태 정보 보기
- 모든 실행 상태 점검하기
- 에이전트 로그 보기
- 에이전트 구성 파일(`datadog.yaml`) 편집
- 에이전트 점검 추가 또는 수정하기
- 플레어 전송

Datadog 에이전트 관리자 GUI는 Windows 및 macOS에서 기본값으로 활성화되며 포트 `5002`에서 실행됩니다. 기본 웹 브라우저에서 `datadog-agent launch-gui` 명령으로 GUI를 열 수 있습니다.

`datadog.yaml` 설정 파일에서 GUI 기본 포트를 변경할 수 있습니다. GUI를 비활성화하려면 포트 값을 `-1`로 설정합니다. Linux에서는 GUI가 기본값으로 비활성화되어 있습니다.

GUI 요구 사항:
- 브라우저에서 쿠키를 활성화한 상태여야 합니다. GUI는 브라우저에서 토큰을 생성하고 저장하는데, 이를 활용해 GUI 서버와의 모든 커뮤니케이션을 인증합니다.
- GUI를 시작하려면 사용자에게 필요 권한이 있어야 합니다. `datadog.yaml`을 열 수 있으면 GUI를 사용할 수 있습니다.
- 보안상의 이유로 **오직** 로컬 네트워크 인터페이스(`localhost`/`127.0.0.1`)에서만 GUI에 액세스할 수 있으므로 에이전트가 실행 중인 호스트에서 작업해야 합니다. VM이나 컨테이너에서 에이전트를 실행하고 호스트 시스템에서 액세스할 수 없습니다.

### 명령줄 인터페이스

에이전트 6 이상 버전부터 에이전트 명령줄 인터페이스는 하위 명령을 기반으로 합니다. 에이전트 하위 명령 전체 목록을 확인하려면 [에이전트 명령][2]을 참조하세요.

## Datadog 에이전트 더 자세히 알아보기

### 에이전트 업데이트

지정된 호스트의 부차 버전 두 개 사이에 Datadog 에이전트 코어를 수동으로 업데이트하려면 [플랫폼에 해당하는 설치 명령][7]을 실행합니다.

**참고**: 특정 에이전트 통합을 수동으로 업데이트하려면 [통합 관리 지침][8]을 참고하세요.

### 구성 파일

[에이전트 파일 설명서][9]를 참고하세요.

### Datadog 사이트

[에이전트 주 구성 파일][10] `datadog.yaml`를 편집해 `site` 파라미터를 설정하세요(기본값인 `datadoghq.com`로 설정).

```yaml
site: {{< region-param key="dd_site" >}}
```

**참고**: `site` 파라미터에 관한 자세한 내용은 [Datadog 사이트 설명서 시작하기][11]를 참고하세요.

### 로그 위치

[에이전트 로그 파일 설명서][12]를 참고하세요.

## 에이전트 오버헤드

다음은 Datadog 에이전트 리소스 소비량 예시입니다. Aamzon EC2 머신 `c5.xlarge` 인스턴스(4 VCPU/ 8GB RAM)에 테스트가 생성되고 유사한 리소싱의 ARM64 기반 인스턴스 비교 성능을 볼 수 있습니다. 에이전트를 모니터링하기 위해 기본 `datadog-agent`가 프로세스 점검으로 실행 중입니다. 통합을 더 활성화하면 에이전트 리소스 소비량이 늘어날 수 있습니다.
JMX 점검을 활성화하면 모니터링 중인 JVM으로 노출되는 빈의 개수에 따라 에이전트의 메모리 사용량이 늘어납니다. 트레이스 및 프로세스 에이전트를 활성화하면 리소스 사용량도 늘어납니다.

* 에이전트 테스트 버전: 7.34.0
* CPU: CPU 평균 사용량의  ~0.08%
* 메모리: RMA 사용량의 ~130MB(RSS 메모리)
* 네트워크 대역폭: ~140 B/s ▼ | 800 B/s ▲
* 디스크:
  * Linux 830MB~880MB(분포에 따라 결정됨)
  * Windows: 870MB

**로그 수집*:

아래는 파일 하나에서 [HTTP 포워더][6]를 활성화하여 **초당 로그 110KB**을 수집해 얻은 결과입니다. 리소스 사용량의 변화를 사용할 수 있는 여러 압축 수준에서 보여줍니다.

{{< tabs >}}
{{% tab "HTTP 압축 수준 6" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: CPU 평균 사용량의 ~1.5%
* Memory: RAM 사용량의 ~95MB
* 네트워크 대역폭: ~ 14KB/s ▲

{{% /tab %}}
{{% tab "HTTP 압축 수준 1" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: CPU 평균 사용량의 ~1%
* 메모리: RAM 사용량의 ~95MB
* 네트워크 대역폭: ~20 KB/s ▲

{{% /tab %}}
{{% tab "HTTP 비압축" %}}

* 에이전트 테스트 버전: 6.15.0
* CPU: CPU 평균 사용량의 ~0.7%
* 메모리: RAM 사용량의 ~90MB(RSS 메모리)
* 네트워크 대역폭: ~200 KB/s ▲

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/troubleshooting/send_a_flare/
[2]: /ko/agent/configuration/agent-commands/
[6]: /ko/agent/logs/log_transport/?tab=https#enforce-a-specific-transport
[7]: https://app.datadoghq.com/account/settings/agent/latest
[8]: /ko/agent/guide/integration-management/
[9]: /ko/agent/configuration/agent-configuration-files/
[10]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[11]: /ko/getting_started/site/
[12]: /ko/agent/configuration/agent-log-files/