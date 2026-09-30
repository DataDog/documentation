---
aliases:
- /ko/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ko/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: 터미널 또는 쉘에서 Datadog의 API 사용
title: Dogshell
---

Dogshell이라는 래퍼를 사용하여 명령줄에서 Datadog API를 사용할 수 있습니다.

## Dogshell 설치

Dogshell에는 공식적으로 지원되는 [`datadogpy` Python 라이브러리][1]가 포함되어 있으며, 이 라이브러리는 [`DogStatsD`][2]를 사용하여 Datadog에 데이터를 전송하는 데 자주 사용됩니다. PIP를 사용하여 라이브러리를 설치하려면 다음 명령을 실행하세요.

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

환경에 따라 라이브러리를 PATH에 추가해야 할 수도 있습니다. 다른 설치 지침은 [`datadogpy`GitHub 리포지토리][3]를 참고하세요.

## Dogshell 구성

Dogshell은 API 키, 애플리케이션 키, Datadog 사이트를 저장하기 위해 `.dogrc`라는 구성 파일을 사용합니다.

Dogshell을 구성하는 방법:
1. 홈 디렉터리에서 `.dogrc` 파일을 생성합니다.
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. 다음 내용을 파일에 추가하고, `MY_API_KEY`와 `MY_APP_KEY`를 각각 API 키와 애플리케이션 키로 바꿉니다.
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">여러 환경에 명령을 실행해야 하는 경우 여러 구성 파일을 만들 수 있습니다. <code>--config</code> 플래그를 사용하여 대체 구성 파일의 경로를 지정하세요.</div>

1. 테스트 메트릭을 게시하여 `dogshell` 명령을 테스트합니다.
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell 명령

사용 가능한 Dogshell 명령의 전체 목록을 보려면 `-h` 플래그를 사용하세요.

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

다음 명령에 `-h` 옵션을 추가하면 특정 Dogshell 사용법에 관한 자세한 정보를 얻을 수 있습니다.

* `dog metric`
* `dog event`
* `dog service_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

추가 정보는 [Dogshell 코드][4]를 참고하세요.

### Dogshell 예시

다음 구문은 Datadog 계정에 메트릭을 게시합니다.

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

예를 들어, 다음 명령은 값이 `1.0`이고 `test:one` 및 `example:one` 태그가 있는 `test_dogshell_metric` 메트릭을 계정에 전송합니다.

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

명령을 실행한 후 [Metrics Explorer][5]를 사용하여 `test_dogshell_metric`을 검색하세요.

{{< img src="developers/guide/dogshell_test1.png" alt="Metrics 탐색기에서 test_dogshell_metric 관찰" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer