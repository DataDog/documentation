---
aliases:
- /ko/developers/faq/powershell-api-examples
- /ko/developers/faq/submitting-metrics-via-powershell
- /ko/developers/metrics/powershell_metrics_submission/
- /ko/metrics/powershell_metrics_submission
title: '메트릭 제출: PowerShell'
---

Datadog는 사용자가 사용하는 언어와 관계없이 API와 에이전트에서 메트릭을 수집할 수 있습니다. 이 페이지는 PowerShell을 사용하는 각각의 예시를 보여줍니다.

## API를 사용해 PowerShell로 메트릭 제출

이 방법은 PowerShell 스크립트를 실행하는 시스템에 설치된 에이전트를 필요로 합니다. POST 요청 시 명시적으로 [API 키][1]와 애플리케이션 키를 패스시켜야 합니다. 

```powershell
# Tested on Windows Server 2012 R2 w/ PSVersion 4.0

function unixTime() {
  Return (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")
}

function postMetric($metric,$tags) {
  $currenttime = unixTime
  $host_name = $env:COMPUTERNAME #optional parameter .

  # Construct JSON
  $points = ,@($currenttime, $metric.amount)
  $post_obj = [pscustomobject]@{"series" = ,@{"metric" = $metric.name;
      "points" = $points;
      "type" = "gauge";
      "host" = $host_name;
      "tags" = $tags}}
  $post_json = $post_obj | ConvertTo-Json -Depth 5 -Compress
  # POST to DD API
  $response = Invoke-RestMethod -Method Post -Uri $url -Body $post_json -ContentType "application/json"
}

# Datadog account, API information and optional parameters
$app_key = "<DATADOG_APPLICATION_KEY>" #provide your valid app key
$api_key = "<DATADOG_API_KEY>" #provide your valid api key
$url_base = "https://app.datadoghq.com/"
$url_signature = "api/v1/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" #optional parameter

# Select what to send to Datadog. In this example, the number of handles opened by process "mmc" is being sent
$metric_ns = "ps1." # your desired metric namespace
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # pass your metric as a parameter to postMetric()
```

## DogStatsD을 사용해 PowerShell로 메트릭 제출

에이전트가 있으면 [DogStatsD][2] 수신기를 사용할 수 있습니다. 다음 예시는 DogStatsD를 사용해 동일한 메트릭을 전송하는 방법을 보여줍니다. API 또는 애플리케이션 키가 이미 로컬에 있으므로 더 이상 해당 키를 지정할 필요가 없습니다. 

```powershell
# Tested on Windows Server 2012 R2 w/ PSVersion 4.0
#           Windows Server 2008 x64 R2 w/ PSVersion 2.0

function dogstatsd($metric) {
    $udpClient = New-Object System.Net.Sockets.UdpClient
    $udpClient.Connect('127.0.0.1', '8125')
    $encodedData=[System.Text.Encoding]::ASCII.GetBytes($metric)
    $bytesSent=$udpClient.Send($encodedData,$encodedData.Length)
    $udpClient.Close()
}
$tags = "|#env:test" # Datadog tag
$temp = Get-Process mmc
$metric = "dogstatsd.ps1." + $temp.Name + ":" + $temp.Handles + "|g" + $tags # metric
dogstatsd($metric)
```

## 예시

`Msxml2.XMLHTTP`을(를) 사용해 PowerShell로 번역된 두 예시로, [Mozilla 설명서][3]에 완전히 문서화되어 있습니다.

### API 호출을 만드는 코드

```powershell
$url_base = "https://app.datadoghq.com/"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"

$http_request = New-Object -ComObject Msxml2.XMLHTTP
$http_request.open($http_method, $url, $false)
$http_request.setRequestHeader("Content-type", "application/json")

$http_request.setRequestHeader("Connection", "close")
$http_request.send($parameters)
$http_request.status
$http_request.responseText
```

### 호스트에 태그 추가

1. API/앱 키를 교체합니다.

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. [호스트 API 설명][4]에 따라 파라미터를 설정합니다.

    ```powershell
    $host_name = "test.host"

    $http_method = "POST"

    $url_signature = "api/v1/tags/hosts/$host_name"

    $parameters = "{
    `"tags`" : [`"environment:production`", `"role:webserver`"]
    }"
    ```

3. [첫 번째 섹션](#the-code-that-makes-the-api-call)에 표시된 코드를 실행합니다.

### 메트릭 게시

1. API/앱 키를 교체합니다.

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. [메트릭 API 설명][5]에 따라 파라미터를 설정합니다.

    ```powershell
    $http_method = "POST"

    $url_signature = "api/v1/series"

    $currenttime = (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")

    $parameters = "{ `"series`" :
    [{`"metric`":`"test.powershell`",
    `"points`":[[$currenttime, 20]],
    `"type`":`"gauge`",
    `"host`":`"test.example.com`",
    `"tags`":[`"environment:test`"]}
    ]
    }"
    ```

3. [첫 번째 섹션](#the-code-that-makes-the-api-call)에 표시된 코드를 실행하세요.

[더 많은 코드 예시는 ncracker/dd_metric GitHub 리포지토리를 참조하세요][6].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ko/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /ko/api/v1/hosts/
[5]: /ko/api/v1/metrics/
[6]: https://github.com/ncracker/dd_metric