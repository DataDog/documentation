---
aliases:
- /ko/developers/faq/dogshell-quickly-use-datadog-s-api-from-terminal-shell
description: 터미널 또는 쉘에서 Datadog의 API 사용
kind: 가이드
title: Dogshell
---

`dogshell`이라고 하는 래퍼를 사용하여 터미널/쉘에서 바로 Datadog API를 사용할 수 있습니다.

## 설정:

Dogshell은 공식적으로 지원되는 [datadogpy Python 라이브러리][1]와 함께 제공되며, [DogStatsD][2]를 사용하여 Datadog으로 데이터를 전송하는 데 자주 사용됩니다. 설치 지침은 [datadogpy GitHub 리포지토리][3]를 참조하세요.

라이브러리를 설치한 후에는 터미널/쉘에서 `dog`명령을 사용할 수 있지만 "초기화"를 해야 합니다. 초기화를 위해 API와 애플리케이션 키를 제공하여 계정과 데이터를 주고받을 수 있도록 합니다. `dog`명령을 처음 실행할 때 초기화 필요를 인식하고, 2단계 프로세스를 안내합니다.

초기화 설정을 트리거하는 `dog`명령의 한 예로 다음을 실행할 수 있습니다(이전의 dog 명령이 작동하더라도):

```text
dog metric post test_metric 1
```

`.dogrc`파일이 아직 생성되지 않은 경우(아직 초기화되지 않은 경우) 다음과 같은 내용을 반환합니다:

```text
~/.dogrc does not exist. Would you like to create it? [Y/n]
```

"Y"를 제출하면 다음과 같이 응답합니다:

```text
What is your api key? (Get it here: https://app.datadoghq.com/organization-settings/api-keys)
```

API 키를 붙여넣은 후 다음을 수행할 수 있습니다:

```text
What is your application key? (Generate one here: https://app.datadoghq.com/organization-settings/api-keys)
```

애플리케이션 키를 붙여넣으면 다음과 같이 끝납니다: 

```text
Wrote ~/.dogrc.
```

그런 다음 `dog`명령을 사용하여 터미널/쉘에서 Datadog API를 빠르게 사용합니다. `dog`명령에 대한 자세한 도움말 및 정보를 보려면 `dog -h`를 실행합니다.

`.dogrc`파일을 직접 작성하려면 이 파일의 내용은 다음과 같아야 합니다:

{{< site-region region="us" >}}
```text
[Connection]
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us3" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us3.datadoghq.com
```
{{< /site-region >}}
{{< site-region region="us5" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://us5.datadoghq.com
{{< /site-region >}}
{{< site-region region="eu" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://datadoghq.eu
```
{{< /site-region >}}
{{< site-region region="gov" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ddog-gov.com
```
{{< /site-region >}}
{{< site-region region="ap1" >}}
```text
apikey = <DATADOG_API_KEY>
appkey = <YOUR_APPLICATION_KEY>
api_host = https://ap1.datadoghq.com
```
{{< /site-region >}}

이 기능은 파일을 많은 서버에 프로그래밍 방식으로 푸시해 모든 서버에서`dog` 명령을 실행하려는 경우 유용합니다.

## Dogshell 명령

 [Dogshell의 코드 찾기][4]를 참고하세요. Dogshell을 설치하고 초기화한 후에는 다음 명령에 `-h` 옵션을 추가하여 특정 Dogshell 사용에 대한 자세한 정보를 얻을 수 있습니다:

* `dog metric`
* `dog event`
* `dog status_check`
* `dog monitor`
* `dog downtime`
* `dog timeboard`
* `dog screenboard`
* `dog dashboard`
* `dog host`
* `dog tag`
* `dog search`
* `dog comment`

**참고**: `dogshell` 명령은 기본적으로 Datadog US1에 데이터를 보냅니다. 다른 사이트로 데이터를 보내야 하는 경우 `--api_host` 옵션을 사용하거나 `.dogrc` 파일에 api_host를 지정하여 전송할 수 있습니다.

### 사용 중인 Dogshell

다음을 사용하여 Datadog 계정에 메트릭을 게시할 수 있습니다:

```text
dog metric post <METRIC_NAME> <METRIC_VALUE> --tags "<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_KEY_2>:<TAG_VALUE_2>"
```

예를 들어, 다음 명령은 `test_dogshell_metric`이라는 메트릭을 값이 1.0인 계정과 태그 `test:one` 및 `another_test`에 전송합니다:

```text
dog metric post test_dogshell_metric 1.0 --tags "test:one,another_test"
```

Dogshell에서 메트릭 전송에 대한 자세한 내용은 다음을 실행하여 확인하세요:

```text
dog metric post -h
```

{{< img src="developers/faq/dogshell_test.png" alt="dogshell_test" >}}

[1]: https://github.com/DataDog/datadogpy
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://github.com/DataDog/datadogpy#installation
[4]: https://github.com/DataDog/datadogpy/tree/master/datadog/dogshell