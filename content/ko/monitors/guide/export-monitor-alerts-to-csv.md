---
aliases:
- /ko/monitors/faq/how-can-i-export-alert-history
kind: 가이드
title: 모니터링 경고를 CSV로 내보내기
---

지난 6개월(182일) 동안의 CSV를 생성하는 [시간별 모니터 데이터][1]를 통해 모니터 경고 내역을 다운로드합니다. 이 CSV는 실시간이 **아닙니다**. 매주 월요일 오전 11:59 UTC에 업데이트됩니다.

**참조**:

- 이 기능은 Datadog US 사이트에서만 지원됩니다.
- CSV 파일에 액세스하려면 조직의 관리자여야 합니다.

{{< site-region region="us" >}}

curl을 사용하여 CSV를 가져오려면 다음을 사용하세요.

```shell
api_key=<DATADOG_API_KEY>
app_key=<DATADOG_APPLICATION_KEY>

curl -G \
    "https://app.datadoghq.com/report/hourly_data/monitor" \
    -d "api_key=${api_key}" \
    -d "application_key=${app_key}" \
```

응답 예시:

```text
hour,host_name,alert_name,user,cnt

2022-10-23 20,example_host_name,"Host name: {{host.name}} Name name: {{name.name}}",<user_email>,67
```
{{< /site-region >}}

{{< site-region region="eu,gov,us3,us5,ap1" >}}

해당 기능은 지원되지 않습니다.

{{< /site-region >}}

[1]: https://app.datadoghq.com/report/hourly_data/monitor