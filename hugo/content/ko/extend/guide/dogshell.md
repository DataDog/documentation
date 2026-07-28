---
aliases:
- /ko/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ko/developers/guide/dogshell-quickly-use-datadog-s-api-from-terminal-shell
- /ko/developers/guide/dogshell/
description: 터미널 또는 쉘에서 Datadog의 API 사용
title: Dogshell
---
<div class="alert alert-danger">Dogshell은 더 이상 사용되지 않으며 <a href="/cli/">Pup CLI</a>로 대체되었습니다. 이는 Datadog API와 상호작용하기 위한 포괄적이고 AI 에이전트에 최적화된 CLI입니다.</div>

명령줄에서 Dogshell이라는 래퍼를 사용하여 Datadog API를 사용할 수 있습니다.

## Dogshell 설치 {#install-dogshell}

Dogshell은 공식적으로 지원되는 [`datadogpy` Python 라이브러리][1]와 함께 제공되며, 이는 종종 [`DogStatsD`][2]를 사용하여 Datadog에 데이터를 전송하는 데 사용됩니다. PIP로 라이브러리를 설치하려면 다음 명령을 실행하십시오:

{{< code-block lang="shell" >}}
pip install datadog
{{< /code-block >}}

환경에 따라 라이브러리를 PATH에 추가해야 할 수도 있습니다. 대체 설치 지침은 [`datadogpy` GitHub 저장소][3]를 참조하십시오.

## Dogshell 구성 {#configure-dogshell}

Dogshell은 API 키, 애플리케이션 키 및 Datadog 사이트를 저장하기 위해 `.dogrc`라는 구성 파일을 사용합니다.

Dogshell을 구성하려면:
1. 홈 디렉토리에 `.dogrc` 파일을 생성하십시오:
   {{< code-block lang="shell" >}}
touch ~/.dogrc
{{< /code-block >}}

1. 파일에 다음 내용을 추가하고 `MY_API_KEY`와 `MY_APP_KEY`을 각각 API 키와 애플리케이션 키로 교체하십시오:
   ```conf
   [Connection]
   apikey = MY_API_KEY
   appkey = MY_APP_KEY
   api_host = {{< region-param key="dd_api">}}
   ```

   <div class="alert alert-info">You can create multiple configuration files if you need to run commands against different environments. Use the <code>--config</code> flag to specify the path to an alternative configuration file.</div>

1. Test the `dogshell` command by posting a test metric:
   {{< code-block lang="shell" >}}
dog metric post test_metric 1
{{< /code-block >}}

## Dogshell commands 

Use the `-h` flag for a full list of the available Dogshell commands:

{{< code-block lang="shell" >}}
dog -h
{{< /code-block >}}

You can append the `-h` option to the following commands to get more information on specific Dogshell usage:

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

For additional information, see the [Dogshell code][4].

### Dogshell example 

The following syntax posts a metric to your Datadog account:

{{< code-block lang="shell" disable_copy="true">}}
dog metric post MY_METRIC_NAME METRIC_VALUE --tags "TAG_KEY_1:TAG_VALUE_1,TAG_KEY_2:TAG_VALUE_2"
{{< /code-block >}}

For example, the following command sends a metric named `test_dogshell_metric` to your account with a value of `1.0` and the tags `test:one` and `example:one`:

{{< code-block lang="shell" >}}
dog metric post test_dogshell_metric 1.0 --tags "test:one,example:one"
{{< /code-block >}}

After you run the command, search for `test_dogshell_metric` using the [Metrics Explorer][5].

{{< img src="extend/guide/dogshell_test1.png" alt="Metrics Explorer에서 test_dogshell_metric을 관찰하기" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell
[5]: https://app.datadoghq.com/metric/explorer