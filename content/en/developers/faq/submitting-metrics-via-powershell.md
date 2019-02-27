---
title: Submitting Metrics via PowerShell
kind: faq
aliases:
  - /developers/faq/powershell-api-examples

---

Datadog can collect metrics via the Agent as well as via the API independently of which language you decide to use. This page gives examples of both using PowerShell.

## Submitting metrics with PowerShell via the API

This method doesn't require you to have the Agent installed on the system running the PowerShell script. This does, however, mean you have to explicitly pass your API key as well as an application key when making the POST request. [Fetch you API key from the Datadog application][1]

```
# Tested on Windows Server 2012 R2 w/ PSVersion 4.0

function unixTime() {
  Return (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")
}

function postMetric($metric,$tags) {
  $currenttime = unixTime
  $host_name = $env:COMPUTERNAME #optional param .

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

# Datadog account, API information and optional params
$app_key = "<YOUR_APP_KEY_HERE>" #provide your valid app key
$api_key = "<YOUR_API_KEY_HERE>" #provide your valid api key
$url_base = "https://app.datadoghq.com/"
$url_signature = "api/v1/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" #optional param

# Select what to send to Datadog. In this example we send the number of handles opened by process "mmc"
$metric_ns = "ps1." # your desired metric namespace
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # pass your metric as a param to postMetric()
```

## Submitting metrics with PowerShell via DogStatsD

Having the Agent enables you to make use of its [DogStatsD][2] listener. The following example shows how you could send the same metric via DogStatsD. Notice that you no longer need to specify the API or application keys; this is information that's already in your local `datadog.yaml`.

```

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

Here are two examples translated in Powershell, using Msxml2.XMLHTTP, fully documented [on Mozilla's documentation page][2]: 

### The code that makes the API call

```
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

    ```
    $api_key = "<YOUR_API_KEY>" 
    $app_key = "<YOUR_APP_KEY>"
    ```

2. Set up your parameters according to [the description in the host API][7]:

    ```
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

    ```
    $api_key = "<YOUR_API_KEY>" 
    $app_key = "<YOUR_APP_KEY>"
    ```

2. Set up parameters according to [description in the metrics API][4]:

    ```
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

3. Execute the code presented in the [first section](#the-code-that-makes-the-api-call).

[See here for more code examples][5].


[1]: https://app.datadoghq.com/account/settings#api
[2]: /developers/dogstatsd
[3]: /developers/faq/powershell-api-examples
[4]: /api/#metrics
[5]: https://github.com/ncracker/dd_metric
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: /api/#hosts
