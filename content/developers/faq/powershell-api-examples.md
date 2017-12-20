---
title: Powershell api examples
kind: faq
customnav: main_references
---

[Datadog api](/api) docs has shell examples only for Unix.

Here are two examples translated in Powershell, using Msxml2.XMLHTTP, fully documented [on mozilla documentation page](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest): 

## The code that makes the api call

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

## Add tags to a host

1. Replace the api/app key with yours
```
$api_key = "9775a026f1ca7d1c6c5af9d94d9595a4" 
$app_key = "87ce4a24b5553d2e482ea8a8500e71b8ad4554ff"
```

2. Set up your parameters according to [description in the host API](/api/#hosts), shell tab
```
$host_name = "test.host"

$http_method = "POST"

$url_signature = "api/v1/tags/hosts/$host_name" 

$parameters = "{ 
`"tags`" : [`"environment:production`", `"role:webserver`"] 
}"
```

3. Execute the code presented in this [section](#the-code-that-makes-the-api call).

## Post a metric

1. Replace the api/app key with yours
```
$api_key = "9775a026f1ca7d1c6c5af9d94d9595a4" 
$app_key = "87ce4a24b5553d2e482ea8a8500e71b8ad4554ff"
```

3. Set up parameters according to [description in the metrics API](/api/#metrics), shell tab
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

3. Execute the code presented in this [section](#the-code-that-makes-the-api call).