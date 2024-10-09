---
title: "Metric submission: PowerShell"
aliases:
  - /developers/faq/powershell-api-examples
  - /developers/faq/submitting-metrics-via-powershell
  - /developers/metrics/powershell_metrics_submission/
  - /metrics/powershell_metrics_submission
---

Datadog can collect metrics from the Agent as well as from the API independently of which language you decide to use. This page gives examples of both using PowerShell.

## Submitting metrics with PowerShell with the API

This method doesn't require you to have the Agent installed on the system running the PowerShell script. You have to explicitly pass your [API key][1] as well as an application key when making the POST request.

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
$url_signature = "api/latest/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" #optional parameter

# Select what to send to Datadog. In this example, the number of handles opened by process "mmc" is being sent
$metric_ns = "ps1." # your desired metric namespace
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # pass your metric as a parameter to postMetric()
```

## Submitting metrics with PowerShell with DogStatsD

Having the Agent enables you to make use of its [DogStatsD][2] listener. The following example shows how you could send the same metric with DogStatsD. Notice that you no longer need to specify the API or application keys because it's already in your local `datadog.yaml`.

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

## Examples

Here are two examples translated in PowerShell, using `Msxml2.XMLHTTP`, fully documented [on Mozilla's documentation][3]):

### The code that makes the API call

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

### Add tags to a host

1. Replace the API/app key with yours:

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Set up your parameters according to [the description in the host API][4]:

    ```powershell
    $host_name = "test.host"

    $http_method = "POST"

    $url_signature = "api/latest/tags/hosts/$host_name"

    $parameters = "{
    `"tags`" : [`"environment:production`", `"role:webserver`"]
    }"
    ```

3. Execute the code presented in the [first section](#the-code-that-makes-the-api-call).

### Post a metric

1. Replace the API/app key with yours:

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Set up parameters according to [description in the metrics API][5]:

    ```powershell
    $http_method = "POST"

    $url_signature = "api/latest/series"

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

3. Execute the code presented in the [first section](#the-code-that-makes-the-api-call).

[See the ncracker/dd_metric GitHub repository for more code examples][6].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /api/latest/hosts/
[5]: /api/latest/metrics/
[6]: https://github.com/ncracker/dd_metric
