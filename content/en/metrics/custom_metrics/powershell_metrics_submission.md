---
title: "Metric submission: PowerShell"
aliases:
  - /developers/faq/powershell-api-examples
  - /developers/faq/submitting-metrics-via-powershell
  - /developers/metrics/powershell_metrics_submission/
  - /metrics/powershell_metrics_submission
further_reading:
- link: "/api/latest/metrics/"
  tag: "API"
  text: "Metrics API Endpoints"
---

Datadog can collect metrics from the Agent as well as from the API independently of which language you decide to use. This page gives examples of both using PowerShell.

## Submitting metrics with PowerShell with the API

This method doesn't require you to have the Agent installed on the system running the PowerShell script. You have to explicitly pass your [API key][1] as well as an application key when making the POST request.

```powershell
# This script sends a custom metric to Datadog v2 API from PowerShell.
# Tested on Windows 10 Pro (version 10.0.1945) with PSVersion 5.1 (Build 19041, Revision 5486)

function Send-DatadogMetric {
    param(
        [Parameter(Mandatory=$true)]
        [string]$MetricName,

        [Parameter(Mandatory=$true)]
        [int]$MetricValue,

        [Parameter(Mandatory=$false)]
        [string[]]$Tags = @()
    )

    # ==================================
    # 1) Set Datadog API keys (v2)
    # ================================== 
    # - $url: The API endpoint for sending metric data to Datadog.
    #   By default, it is set to the US1 data center. If you are 
    #   operating in a different region, update this URL accordingly:
    #     * EU:         https://api.datadoghq.eu/api/v2/series
    #     * US3:        https://api.us3.datadoghq.com/api/v2/series
    #     * US5:        https://api.us5.datadoghq.com/api/v2/series
    #     * AP1:        https://api.ap1.datadoghq.com/api/v2/series
    #     * AP2:        https://api.ap2.datadoghq.com/api/v2/series
    #     * US1-FED:    https://api.ddog-gov.com/api/v2/series
    $api_key = "<DATADOG_API_KEY>"          #provide your valid api key
    $app_key = "<DATADOG_APPLICATION_KEY>"  #provide your valid app key
    $url     = "https://api.datadoghq.com/api/v2/series" # Default endpoint for US1; update based on your Datadog data center

    # ==================================
    # 2) Request headers
    # ==================================
    $headers = @{
        "DD-API-KEY"         = $api_key
        "DD-APPLICATION-KEY" = $app_key
        "Content-Type"       = "application/json"
    }

    # ==================================
    # 3) Build JSON payload for v2
    # ==================================
    # Current time in epoch seconds
    $currentTime = [int](Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")


    # The body for the /api/v2/series endpoint
    $body = @{
        "series" = @(
            @{
                "metric" = $MetricName
                "points" = @(
                    @{
                        "timestamp" = $currentTime
                        "value"     = $MetricValue
                    }
                )
                "type"  = 1                 # (1) count, (2) rate, (3) gauge
                "tags"  = $Tags             # optional parameter should be an array of tags
            }
        )
    }

    # Convert hash to JSON
    $jsonBody = $body | ConvertTo-Json -Depth 5 -Compress

    # ==================================
    # 4) Send the POST request
    # ==================================
    $response = Invoke-RestMethod -Method Post -Uri $url -Headers $headers -Body $jsonBody

    Write-Host "Datadog response: $($response | ConvertTo-Json -Depth 5)"
}


# ----------------------------
# Example Usage:
# ----------------------------
# This sends a custom count metric called "my.custom.metric" with a value of 42
# and adds "env:test" + "version:1.0" + host as tags.
Send-DatadogMetric -MetricName "my.custom.metric" `
                   -MetricValue 42 `
                   -Tags @("env:test","version:1.0", "host:$env:COMPUTERNAME")
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

    $url_signature = "api/v1/tags/hosts/$host_name"

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

    $url_signature = "api/v2/series"

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /api/latest/hosts/
[5]: /api/latest/metrics/
[6]: https://github.com/ncracker/dd_metric
