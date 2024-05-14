---
aliases:
- /ko/developers/faq/can-i-call-scripts-and-generate-events-from-their-results
- /ko/dashboards/faq/how-do-i-track-cron-jobs
description: Dogwrap을 사용하여 명령 호출 및 결과로부터 이벤트 생성
kind: 가이드
title: Dogwrap
---

Dogwrap 명령줄 도구를 사용하여 명령을 호출하고 결과로부터 이벤트를 생성할 수 있습니다. Dogwrap을 사용하려면 [Datadog 파이썬(Python) 라이브러리][1]을 설치합니다:

pip로부터 설치하기:

```text
pip install datadog
```

소스로부터 설치하기:

1. [DataDog/datadogpy][1] 리포지토리를 복제합니다.
2. 루트 폴더 내에서 `python setup.py install`를 실행합니다.

유효한 최소 `dogwrap`명령의 레이아웃은 다음과 같습니다:

{{< site-region region="us,gov,ap1" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us3 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s us5 "<COMMAND>"
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```bash
dogwrap -n <EVENT_TITLE> -k <DATADOG_API_KEY> -s eu "<COMMAND>"
```
{{< /site-region >}}

**참고**: `dogwrap` 명령은 기본적으로 US Datadog 사이트로 데이터를 보냅니다. 다른 사이트로 데이터를 보내야 하는 경우 `eu`, `us3`, `us5` 등과 같이 대상 사이트를 지정하는 `-s` 옵션을 포함해야 합니다.

다음 플레이스홀더 사용:

* `<EVENT_TITLE>`: Datadog에 표시할 이벤트의 제목입니다.
* `<DATADOG_API_KEY>`: [조직과 연결된 Datadog API 키입니다][2].
* `<COMMAND>`: 이벤트를 래핑하고 생성하는 명령입니다. 호출된 명령어를 따옴표로 묶어서 파이썬(Python)이 명령줄 인수가 래핑된 명령어가 아닌 파이썬(Python) 명령어에 속한다고 혼동하지 않도록 합니다.

**참고**: Dogwrap 도움 명령 `dogwrap --help`을 사용하여 사용 가능한 모든 옵션을 검색합니다.

`cron`은 `dogwrap`의 실제 예시입니다. 매일 Postgres 테이블을 vacuuming하는 cron 스크립트를 가지고 있다면:

```bash
0 0 * * * psql -c 'vacuum verbose my_table' >> /var/log/postgres_vacuums.log 2>&1
```

Vacuuming은 특히 리소스를 많이 사용하므로 실행할 때마다 메트릭 및 기타 이벤트를  vacuums와 연관시키기 위해  Datadog 이벤트가 필요할 수 있습니다:

```bash
dogwrap -n "Vacuuming mytable" -k $DATADOG_API_KEY --submit_mode errors "psql -c 'vacuum verbose my_table' 2>&1 /var/log/postgres_vacuums.log"
```

스크립트가 끝날 때 명령을 호출하고 종료 코드가 0이 아닌 종료 코드(예: 오류)와 함께 종료되면 Datadog 이벤트를 보냅니다. `--submit_mode all`을 사용하면 이 명령을 실행할 때마다 이벤트가 전송됩니다.

[1]: https://github.com/DataDog/datadogpy
[2]: https://app.datadoghq.com/organization-settings/api-keys