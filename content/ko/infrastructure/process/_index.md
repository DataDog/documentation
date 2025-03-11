---
aliases:
- /ko/guides/process
- /ko/graphing/infrastructure/process/
further_reading:
- link: https://www.datadoghq.com/blog/live-process-monitoring/
  tag: 블로그
  text: Datadog으로 프로세스 모니터링하기
- link: /infrastructure/process/generate_process_metrics/
  tag: 설명서
  text: 메트릭으로 프로세스 데이터 보존 기간 늘리기
- link: /infrastructure/livecontainers
  tag: 그래프화
  text: 환경 전반의 모든 컨테이너에 대한 실시간 가시성 확보
- link: https://www.datadoghq.com/blog/monitor-third-party-software-with-live-processes/
  tag: 블로그
  text: 소프트웨어 성능 및 리소스 소비와 저장한 보기의 상관 관계
- link: https://www.datadoghq.com/blog/process-level-data/
  tag: 블로그
  text: 프로세스 수준 앱과 네트워크 데이터로 빠른 문제 해결
title: 실시간 프로세스
---

## 도입

Datadog의 실시간 프로세스를 이용하면 인프라스트럭처에서 실행되는 프로세스를 실시간으로 볼 수 있습니다. 구체적으로는 다음과 같습니다:

* 실행 중인 프로세스를 한 곳에서 볼 수 있습니다.
* 프로세스 수준에서 호스트와 컨테이너의 리소스 소비를 세분화할 수 있습니다.
* 특정 호스트, 특정 영역에서 실행 중이거나 특정 워크로드를 실행 중인 프로세스에 대해 쿼리할 수 있습니다.
* 2초 단위로 시스템 메트릭을 사용하여 실행 중인 내부 및 타사 소프트웨어의 성능을 모니터링할 수 있습니다.
* 대시보드 및 노트북에 컨텍스트를 추가할 수 있습니다.

{{< img src="infrastructure/process/live_processes_main.png" alt="실시간 프로세스 개요" >}}

## 설치

에이전트 5를 사용하는 경우 [구체적인 설치 프로세스][1]를 따르세요. 에이전트 6이나 7을 사용하는 경우 [아래 지침을 따르세요][2].

{{< tabs >}}
{{% tab "Linux/Windows" %}}

Datadog 에이전트를 설치한 후, 다음 매개 변수를 `"true"`로 설정해 [에이전트 주요 설정 파일][1]을 편집하여 실시간 프로세스 수집을 활성화합니다:

```yaml
process_config:
  process_collection:
    enabled: "true"
```

추가로 일부 설정 옵션을 환경 변수로 설정할 수 있습니다. 

**참고**: 환경 변수로 설정한 옵션은 설정 파일에 정의된 설정을 다시 정의합니다.

설정을 완료한 후 [에이전트를 재시작][2]하세요.


[1]: /ko/agent/guide/agent-configuration-files/
[2]: /ko/agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "도커(Docker)" %}}

[도커 에이전트][1]의 지침에 따라 다음 속성을 전달하고, 다른 커스텀 설정을 적절히 추가합니다:

```text
-v /etc/passwd:/etc/passwd:ro
-e DD_PROCESS_AGENT_ENABLED=true
```

**참고**:

- 표준 설치에서 컨테이너 정보를 수집하려면 `dd-agent` 유저가 `docker.sock`에 액세스할 수 있는 권한이 있어야 합니다.
- 컨테이너로 에이전트를 실행해도 호스트 프로세스를 수집할 수 있습니다.


[1]: /ko/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "쿠버네티스(Kubernetes)" %}}

데몬셋을 생성하는 데 사용하는 [dd-agent.yaml][1] 매니페스트에 다음 환경 변수, 볼륨 마운트, 볼륨을 추가하세요:

```yaml
 env:
    - name: DD_PROCESS_AGENT_ENABLED
      value: "true"
  volumeMounts:
    - name: passwd
      mountPath: /etc/passwd
      readOnly: true
  volumes:
    - hostPath:
        path: /etc/passwd
      name: passwd
```

더 자세한 내용은 표준 [데몬셋 설치][2]와 [도커 에이전트][3] 정보 페이지를 참조하세요. 

**참고**: 컨테이너로 에이전트를 실행해도 호스트 프로세스를 수집할 수 있습니다.


[1]: https://app.datadoghq.com/account/settings#agent/kubernetes
[2]: /ko/agent/kubernetes/
[3]: /ko/agent/docker/#run-the-docker-agent
{{% /tab %}}
{{% tab "Helm" %}}

[datadog-values.yaml][1] 파일을 다음 프로세스 수집 설정으로 업데이트하고, Datadog 헬름 차트를 업그레이드합니다:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
```


[1]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
{{< /tabs >}}

{{< /tabs >}}

### I/O 통계

상승된 권한으로 실행되는 Datadog 시스템 프로브를 이용해 I/O와 열린 파일 통계를 수집할 수 있습니다. 시스템 프로브의 프로세스 모듈을 활성화하려면 다음 설정을 이용하세요:

1. 시스템 프로브 예제 설정을 복사합니다:

   ```shell
   sudo -u dd-agent install -m 0640 /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
   ```

2. `/etc/datadog-agent/system-probe.yaml`을 편집해 프로세스 모듈을 활성화합니다:

   ```yaml
   system_probe_config:
     process_config:
       enabled: true
   ```

5. [에이전트를 재시작합니다][12]:

   ```shell
   sudo systemctl restart datadog-agent
   ```

   **참고**: `systemctl` 명령이 시스템에서 사용 불가할 경우, 다음 명령을 대신 실행합니다:`sudo service datadog-agent restart`


### 프로세스 인수 스크러빙

에이전트는 실시간 프로세스 페이지에서 민감한 데이터를 숨기기 위해 프로세스 명령줄에 있는 민감한 인수를 스크러빙합니다. 이 기능은 기본적으로 활성화되어 있으며 다음 단어와 일치하는 프로세스 인수가 있으면 값이 숨겨집니다.

```text
"password", "passwd", "mysql_pwd", "access_token", "auth_token", "api_key", "apikey", "secret", "credentials", "stripetoken"
```

**참고**: 일치를 확인할 때 **대소문자 구분을 하지 않습니다**.

{{< tabs >}}
{{% tab "Linux/Windows" %}}

`process_config` 섹션 아래에 있는 `datadog.yaml` 파일 내 `custom_sensitive_words` 필드를 이용해 기본 목록과 병합할 목록을 정의합니다. 와일드카드 (`*`)를 사용해 원하는 일치 범위를 정의하세요. 단, 단일 와일드카드(`'*'`)는 민감한 단어로 사용할 수 없습니다.

```yaml
process_config:
    scrub_args: true
    custom_sensitive_words: ['personal_key', '*token', 'sql*', '*pass*d*']
```

**참고**: `custom_sensitive_words` 내의 단어에는 영숫자, 밑줄, 와일드카드(`'*'`)만 포함할 수 있습니다. 와일드카드만 있는 민감한 단어는 지원되지 않습니다.

다음 이미지는 위의 설정을 사용해 인수가 숨겨진 실시간 프로세스 페이지의 한 프로세스를 보여줍니다.

{{< img src="infrastructure/process/process_arg_scrubbing.png" alt="프로세스 인수 스크러빙" style="width:100%;">}}

프로세스 인수 스크러빙을 완전히 비활성화하려면 `scrub_args`를 `false`로 설정합니다.

프로세스에서 **모든** 인수를 삭제하려면 `datadog.yaml` 설정 파일에서 `strip_proc_arguments` 플래그를 활성화합니다:

```yaml
process_config:
    strip_proc_arguments: true
```

{{< /tabs >}}

{{% tab "Helm" %}}

헬름 차트를 이용해 목록을 정의할 수 있으며 이 목록은 기본 목록과 병합됩니다. 환경 변수 `DD_SCRUB_ARGS`와 `DD_CUSTOM_SENSITIVE_WORDS`를 `datadog-values.yaml` 파일에 추가하고, Datadog 헬름 차트를 업그레이드합니다:

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_SCRUB_ARGS 
                  value: "true"
                - name: DD_CUSTOM_SENSITIVE_WORDS
                  value: "personal_key,*token,*token,sql*,*pass*d*" 
```


와일드카드(`*`)를 사용해 원하는 일치 범위를 정의하세요. 단일 와일드카드(`'*'`)는 민감한 단어로 사용할 수 없습니다.

프로세스 인수 스크러빙을 완전히 비활성화하려면 `DD_SCRUB_ARGS`를 `false`로 설정합니다.

또는 `datadog-values.yaml` 파일에서 `DD_STRIP_PROCESS_ARGS` 변수를 활성화함으로써 프로세스에서  **모든** 인수를 스크러빙할 수 있습니다.

```yaml
datadog:
    # (...)
    processAgent:
        enabled: true
        processCollection: true
    agents:
        containers:
            processAgent:
                env:
                - name: DD_STRIP_PROCESS_ARGS
                  value: "true" 
```

{{% /tab %}}
{{< /tabs >}}


## 쿼리

### 프로세스 범위 지정

프로세스는 기본적으로 카디널리티가 높은 개체입니다. 텍스트와 태그 필터를 사용해 범위를 좁혀 관련 프로세스를 볼 수 있습니다.

#### 텍스트 필터

검색 창에 텍스트 스트링을 입력하면 유사 스트링 검색을 통해 명령줄이나 경로에 해당 텍스트 스트링을 포함하고 있는 프로세스를 쿼리합니다. 결과를 보려면 두 글자 이상의 문자열을 입력하세요. 아래 Datadog 데모 환경은 `postgres /9.` 스트링을 필터링한 결과를 보여줍니다.

**참고**: `/9.`와 명령 경로와 일치하며, `postgres`는 명령과 일치합니다. 

{{< img src="infrastructure/process/postgres.png" alt="Postgres" style="width:80%;">}}

여러 개의 스트링 검색을 하나의 복잡한 쿼리로 결합하려면 다음 부울 연산자 중 하나를 사용하세요:

`AND`
: **교집합**: 선택한 이벤트에 두 단어가 모두 있음(아무것도 추가하지 않을 경우, AND가 기본적으로 사용됨) <br> **예**: `java AND elasticsearch`

`OR`
: **합집합**: 선택한 이벤트에 두 단어 중 하나가 있음 <br> **예**: `java OR python`

`NOT` / `!`
: **제외**: 이벤트에 해당 단어가 없음.  `NOT` 또는 `!` 문자를 사용해 동일한 결과를 얻을 수 있음<br> **예**: `java NOT elasticsearch` 또는 `java !elasticsearch`

괄호를 사용해 연산자를 함께 묶을 수 있습니다. 예를 들어 `(NOT (elasticsearch OR kafka) java) OR python`와 같이 사용할 수 있습니다.

#### 태그 필터

`host`, `pod`, `user`, `service`와 같은 Datadog [태그][3]를 사용해 프로세스를 필터링할 수 있습니다. 검색 창에 태그 필터를 직접 입력하거나 페이지 왼편에 있는 패싯 패널에서 선택해 사용할 수 있습니다.

Datadog은 `command` 태그를 자동으로 생성하기 때문에 다음을 필터링할 수 있습니다:

- `command:mongod` 및 `command:nginx`와 같은 타사 소프트웨어 
- `command:docker` 및 `command:kubelet`와 같은 컨테이너 관리 소프트웨어
- `command:ssh` 및 `command:CRON`와 같은 일반 워크로드

### 프로세스 집계

[태그][3]를 이용해 더욱 효율적으로 검색해 보세요. 기존의 모든 호스트 수준 태그와 더불어 프로세스에는 `user` 태그가 사용됩니다.

또한, ECS 컨테이너의 프로세스에는 다음 태그가 사용됩니다:

- `task_name`
- `task_version`
- `ecs_cluster`

쿠버네티스 컨테이너의 프로세스에는 다음 태그가 사용됩니다:

- `pod_name`
- `kube_pod_ip`
- `kube_service`
- `kube_namespace`
- `kube_replica_set`
- `kube_daemon_set`
- `kube_job`
- `kube_deployment`
- `Kube_cluster`

[통합 서비스 태깅][4] 설정을 가지고 있다면 `env`, `service`, `version` 태그가 자동으로 사용됩니다.
이와 같은 태그를 사용하면 APM, 로그, 메트릭, 프로세스 데이터를 함께 묶을 수 있습니다.
**참고**: 이 설정은 컨테이너화된 환경에만 적용됩니다.

## 산점도

산점도 분석을 이용해 두 개의 메트릭을 비교하면 컨테이너의 성능을 더 깊게 이해할 수 있습니다.

[프로세스 페이지][5]에서 산점도 분석으로 이동하려면 _그래프 요약 보기_버튼을 클릭해 "산점도" 탭을 선택하세요:

{{< img src="infrastructure/process/scatterplot_selection.png" alt="산점도 선택" style="width:60%;">}}

기본적으로 그래프는 `command` 태그 키로 그룹화됩니다. 각 점의 크기는 해당 그룹의 프로세스 수를 나타내며, 점을 클릭하면 해당 그룹에 기여하는 개별 PID와 컨테이너를 볼 수 있습니다.

산점도 분석 상단에 있는 쿼리를 이용해 산점도 분석을 조정할 수 있습니다:

- 표시할 메트릭 선택
- 메트릭 두 개를 집계할 방법 선택
- X와 Y축 배율 선택 (_Linear_/_Log_)

{{< img src="infrastructure/process/scatterplot.png" alt="컨테이너 검사" style="width:80%;">}}

## 프로세스 모니터

[실시간 프로세스 모니터][6]를 사용해 호스트나 태그 전반의 프로세스 그룹 수를 기반으로 알림을 생성할 수 있습니다. [모니터 페이지][7]에서 프로세스 알림을 설정하면 됩니다. 더 자세한 내용은 [실시간 프로세스 모니터 설명서][6]를 참고하세요.

{{< img src="infrastructure/process/process_monitor.png" alt="프로세스 모니터" style="width:80%;">}}

## 대시보드 및 노트북 프로세스

[시계열 위젯][8]을 사용해 대시보드와 노트북에서 프로세스 메트릭을 그래프화할 수 있습니다. 다음 단계를 따라 설정하세요:
1. 프로세스를 데이터 소스로 선택합니다.
2. 검색 창에서 텍스트 스트링으로 필터링합니다.
3. 그래프로 표시할 프로세스 메트릭을 선택합니다.
4. `From` 필드에서 태그를 활용해 필터링합니다.

{{< img src="infrastructure/process/process_widget.png" alt="프로세스 위젯" style="width:80%;">}}

## 타사 소프트웨어 모니터링

### 자동 탐지된 통합

Datadog은 프로세스 수집을 통해 호스트에서 실행하는 기술을 자동 검색합니다. 이를 통해 해당 기술을 모니터링하는 데 도움이 되는 Datadog 통합을 식별합니다. 자동 검색된 통합은 [통합 검색][1]에 표시됩니다.

{{< img src="getting_started/integrations/ad_integrations.png" alt="자동 탐지된 통합" >}}

각 통합은 두 가지 상태 유형 중 하나에 해당합니다.

- **+ Detected**: 이 통합을 실행하는 호스트가 활성화하지 않은 통합입니다.
- **✓ Partial Visibility**: 일부 호스트가 활성화했지만, 모든 관련 호스트에서 실행되지는 않는 통합입니다.

통합을 실행하고 있지만 통합을 활성화하지 않은 호스트는 통합 타일의 **Hosts** 탭에 표시됩니다.

### 통합 보기

{{< img src="infrastructure/process/integration_views.png" alt="통합 보기" >}}

실시간 프로세스는 타사 소프트웨어 검색 후 해당 소프트웨어의 성능을 분석하는 데 도움이 됩니다.
1. 시작하려면 페이지 우측 상단에 있는 *보기*를 클릭해 Nginx, Redis, Kafka와 같은 사전 설정 옵션이 있는 목록을 여세요.
2. 보기를 선택하여 해당 소프트웨어를 실행하는 프로세스로만 페이지의 범위를 지정합니다.
3. 크기가 큰 프로세스를 검사할 때 *통합 메트릭* 탭으로 이동해 기본 호스트 소프트웨어의 상태를 분석합니다. 관련 Datadog 통합을 이미 활성화한 상태라면 통합에서 수집한 성능 메트릭 모두를 확인하여 호스트 수준과 소프트웨어 수준 문제를 구분할 수 있습니다. 예를 들어, 프로세스 CPU와 MySQL 쿼리 지연 시간이 서로 연관되어 급증하는 것을 보면 전체 테이블 스캔과 같은 집중적인 작업으로 인해 동일한 기본 리소스에 의존하는 다른 MySQL 쿼리의 실행이 지연되고 있음을 나타낼 수 있습니다.

페이지 상단에 있는 *+저장* 버튼을 눌러 통합 보기나 다른 커스텀 쿼리를 사용자 지정(예를 들어, 호스트별로 Nginx 프로세스 쿼리를 집계할 때)할 수 있습니다. 그러면 쿼리, 선택한 테이블 열, 시각화 설정이 저장됩니다. 저장된 보기를 생성하면 추가 설정 없이 빠르게  프로세스에 액세스할 수 있고 팀원과 프로세스 데이터를 공유할 수 있습니다.

## 플랫폼 전반의 프로세스

{{< img src="infrastructure/process/process_platform.mp4" alt="플랫폼 전반의 프로세스" video=true >}}

### 실시간 컨테이너

실시간 프로세스는 각 컨테이너에서 실행되는 프로세스를 모니터링하여 컨테이너 배포 상황을 보여줍니다. [실시간 컨테이너][9] 페이지에서 컨테이너를 클릭하면 실행하는 명령과 리소스 사용 등 프로세스 트리를 확인할 수 있습니다. 이 데이터를 다른 컨테이너 메트릭과 함께 사용해 컨테이너 실패나 배포 실패의 근본 원인을 진단할 수 있습니다.

### APM

[APM 트레이스][10]에서 서비스 스팬을 클릭하면 기본 인프라스트럭처에서 실행하는 프로세스를 확인할 수 있습니다. 서비스 스팬 프로세스는 요청 시점에서 서비스를 실행하는 호스트나 포드와 상관 관계가 있습니다. CPU와 RSS 메모리와 같은 프로세스 메트릭을 코드 수준 오류와 함께 분석해 특정 애플리케이션 문제나 일반적인 인프라스트럭처 문제를 구분할 수 있습니다. 프로세스를 클릭하면 실시간 프로세스 페이지로 이동합니다. 서버리스와 브라우저 트레이스에는 관련 프로세스가 지원되지 않습니다.

### 네트워크 성능 모니터링

[네트워크 개요][11]에서 종속성을 검사할 때, 서비스 간 통신과 같은 엔드포인트의 기본 인프라스트럭처에서 실행 중인 프로세스를 확인할 수 있습니다. 프로세스 메타데이터를 이용해 네트워크 연결 불량 (TCP 재전송 수가 높은 경우)이나 긴 네트워크 호출 대기 시간 (TCP 왕복 시간이 높은 경우)이 엔드포인트 리소스를 소비하는 과중한 작업량 때문인지, 이 때문에 통신 상태와 효율성에 영향을 미치는지 확인할 수 있습니다.

## 실시간 모니터링

실시간 프로세스로 활발히 작업하는 동안 메트릭은 2초마다 수집됩니다. 이는 CPU와 같이 변동이 큰 메트릭에 중요한 역할을 합니다. 기록을 위한 백그라운드에서는 메트릭이 10초마다 수집됩니다.

## 추가 정보

- 30분 후에는 실시간 (2초) 데이터 수집 기능이 꺼집니다. 실시간 수집을 재개하려면 페이지를 새로 고침 하세요.
- 컨테이너 배포에서 각 프로세스의 사용자 이름을 수집하려면 `docker-dd-agent`에 마운트된 `/etc/passwd` 파일이 필요합니다. 이 파일은 공용이며 프로세스 에이전트는 사용자 이름 외 다른 필드를 사용하지 않습니다. `user` 메타데이터 필드를 제외한 모든 기능은 이 파일에 대한 액세스 없이 작동합니다. **참고**: 실시간 프로세스는 호스트 `passwd` 파일만을 사용하며, 컨테이너 내에서 생성된 사용자에 대해 사용자 이름을 확인하지 않습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/agent/faq/agent-5-process-collection/
[2]: /ko/agent/
[3]: /ko/getting_started/tagging/
[4]: /ko/getting_started/tagging/unified_service_tagging
[5]: https://app.datadoghq.com/process
[6]: /ko/monitors/types/process/
[7]: https://app.datadoghq.com/monitors#create/live_process
[8]: /ko/dashboards/widgets/timeseries/#pagetitle
[9]: /ko/infrastructure/livecontainers/
[10]: /ko/tracing/
[11]: /ko/network_monitoring/performance/network_page
[12]: /ko/agent/guide/agent-commands/#restart-the-agent