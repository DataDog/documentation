---
aliases:
- /kr/getting_started/tracing/distributed-tracing
further_reading:
- link: /tracing/setup/
  tag: 설명서
  text: 애플리케이션 언어를 선택해주세요
- link: /tracing/visualization/
  tag: 설명서
  text: APM UI 사용하기
- link: https://learn.datadoghq.com/enrol/index.php?id=4
  tag: 학습 센터
  text: 도커(Docker)로 애플리케이션 성능 모니터링하는 방법 알아보기
kind: 설명서
title: 트레이싱 시작하기
---

## 개요

Datadog의 애플리케이션 성능 모니터링(APM 또는 '트레이싱'이라고 합니다)을 사용하면 백엔드 애플리케이션 코드에서 [트레이스][1]를 수집할 수 있습니다. 이번 초보자용 가이드에서는 첫 트레이스를 Datadog로 가져오는 방법을 설명해드리겠습니다.

**참조**: Datadog APM은 다양한 언어와 프레임워크로 사용할 수 있습니다. 자세한 내용은 [애플리케이션의 인스트루먼테이션][2] 문서를 참조하세요.

## Datadog 계정

계정이 없다면 [Datadog 계정][3]을 만들어주시기 바랍니다.

## Datadog Agent

Datadog Agent를 설치하기 전에, 다음 명령어를 사용해 [Vagrant Ubuntu 16.04 가상머신][4]을 설치하세요. Vagrant를 더 자세히 알아보려면 [시작하기][5] 페이지를 참조하시기 바랍니다.

```text
vagrant init ubuntu/xenial64
vagrant up
vagrant ssh
```

호스트 상에 Datadog Agent를 설치하려면  [Datadog API 키][7]와 함께 업데이트된 [원라인 설치 명령어][6]를 사용하세요.

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
```

### 검증

[상태 명령어][8]를 사용해 Agent가 실행 중인지 확인합니다.

```shell
sudo datadog-agent status
```

몇 분 후, Datadog의 [인프라스트럭처 목록][9]을 확인하여 Agent가 계정에 연결되었는지 검증하세요.

## Datadog APM

### 앱 내의 설명을 따라주세요(권장)

나머지 단계에서, Datadog 사이트의 [빠른 시작 안내][10]에 따라 최고의 경험을 누릴 수 있습니다. 예:

- 배포 설정(이번 경우는 호스트 기반의 배포)을 다루는 단계별 안내를 따릅니다.
- 동적으로 `service`, `env`, `version` 태그를 설정하세요.
- 설정 중에 Continuous Profiler, 트레이스의 100% 수집, 트레이스 ID 삽입을 활성화합니다.


### 애플리케이션 성능 모니터링(APM) 활성화

최신 버전의 Agent v6와 v7에서는 APM이 기본으로 활성화되어 있습니다. Agent의 [`datadog.yaml` 설정 파일][11]에서 확인할 수 있습니다.

```yaml
# apm_config:
##   Whether or not the APM Agent should run
#   enabled: true
```

`trace-agent.log`에서도 확인할 수 있습니다.

```shell
# /var/log/datadog/trace-agent.log:
2019-03-25 20:33:18 INFO (run.go:136) - trace-agent running on host ubuntu-xenial
2019-03-25 20:33:18 INFO (api.go:144) - listening for traces at http://localhost:8126
2019-03-25 20:33:28 INFO (api.go:341) - no data received
2019-03-25 20:34:18 INFO (service.go:63) - total number of tracked services: 0
```

### 환경 이름

최적의 경험을 누리려면 환경 변수 `DD_ENV`를 사용하여, 서비스 트레이서를 통해 `env`를 설정하시길 권장합니다.

또한 트레이서에서 로그 삽입이 활성화된 경우 `env`는 트레이스와 로그 전체에 일관적으로 적용됩니다. 이 부분을 자세히 알고 싶으신 분은 [통합형 서비스 태그 지정][12] 설명을 참조하시기 바랍니다.

또는 `datadog.yaml`을 갱신하여 환경에 이름을 붙이고 `apm_config`에서 `env`를 설정할 수 있습니다. APM의 `env` 설정을 자세히 알아보려면 [범위 설정용 주요 태그 지정 가이드][13]를 참조해주세요.

## APM 애플리케이션

### 설치

애플리케이션을 설정하기 전에 우분투(Ubuntu) 가상머신에 `pip`, `flask`, `ddtrace`를 설치하세요.

```shell
sudo apt-get install python-pip
pip install flask
pip install ddtrace
```

### 생성

우분투 가상머신에서 다음 콘텐츠로 `hello.py` 애플리케이션을 생성하세요.

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def index():
    return 'hello world'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050)
```

### 실행

`ddtrace`를 사용하여 `hello.py`를 실행합니다. 이는 Datadog에서 애플리케이션을 자동으로 계측합니다.

```shell
export DD_SERVICE=hello
ddtrace-run python hello.py
```

이제 다음과 유사한 출력값을 보게 됩니다.

```shell
* Serving Flask app "hello" (lazy loading)
  ...
* Running on http://0.0.0.0:5050/ (Press CTRL+C to quit)
```

### 테스트

애플리케이션을 테스트하고 `curl`을 사용하여 Datadog에 트레이스를 보냅니다. 애플리케이션이 (위에서 보여드린 바와 같이) 현재 실행 중일 것입니다. 별도의 명령 프롬프트에서 다음을 실행하세요.

```text
vagrant ssh
curl http://0.0.0.0:5050/
```

이제 다음과 같은 출력값이 표시됩니다.

```text
hello world
```

몇 분 지나면 Datadog의 `hello` 서비스 아래에 트레이스가 표시됩니다. [서비스 페이지[14] 또는 [트레이스 목록][15]을 확인해주세요.

{{< img src="getting_started/tracing-services-list.png" alt="Tracing Services List" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/tracing/#terminology
[2]: https://docs.datadoghq.com/kr/tracing/setup/
[3]: https://www.datadoghq.com
[4]: https://app.vagrantup.com/ubuntu/boxes/xenial64
[5]: https://www.vagrantup.com/intro/getting-started
[6]: https://app.datadoghq.com/account/settings#agent/ubuntu
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: /kr/agent/guide/agent-commands/#agent-information
[9]: https://app.datadoghq.com/infrastructure
[10]: https://app.datadoghq.com/apm/docs
[11]: /kr/agent/guide/agent-configuration-files/#agent-main-configuration-file
[12]: /kr/getting_started/tagging/unified_service_tagging
[13]: /kr/tracing/guide/setting_primary_tags_to_scope/
[14]: https://app.datadoghq.com/apm/services
[15]: https://app.datadoghq.com/apm/traces