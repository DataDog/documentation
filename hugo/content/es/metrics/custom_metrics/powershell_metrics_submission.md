---
aliases:
- /es/developers/faq/powershell-api-examples
- /es/developers/faq/submitting-metrics-via-powershell
- /es/developers/metrics/powershell_metrics_submission/
- /es/metrics/powershell_metrics_submission
further_reading:
- link: /api/latest/metrics/
  tag: API
  text: Endpoints de API de métricas
title: 'Envío de métricas: PowerShell'
---

Datadog puede recopilar métricas tanto del Agent como de la API, independientemente del lenguaje que decidas utilizar. Esta página ofrece ejemplos de ambos casos con el uso de PowerShell.

## Envío de métricas PowerShell con la API

Este método no requiere tener instalado el Agent en el sistema que ejecuta el script PowerShell. Tienes que pasar explícitamente tu [clave de API][1], así como una clave de aplicación, al realizar la solicitud POST.

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

## Envío de métricas PowerShell con DogStatsD

El Agent te permite utilizar su escuchador [DogStatsD][2]. El siguiente ejemplo muestra cómo podrías enviar la misma métrica con DogStatsD. Fíjate que no necesitas especificar la API o las claves de aplicación, ya que están en tu `datadog.yaml` local.

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

## Ejemplos

Aquí hay dos ejemplos traducidos en PowerShell, utilizando `Msxml2.XMLHTTP`, completamente documentados [en la documentación de Mozilla][3]):

### Código que realiza la llamada a la API

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

### Añadir etiquetas (tags) a un host

1. Sustituye la clave de API/aplicación por la tuya:

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Configura tus parámetros de acuerdo con [la descripción en la API host][4]:

    ```powershell
    $host_name = "test.host"

    $http_method = "POST"

    $url_signature = "api/v1/tags/hosts/$host_name"

    $parameters = "{
    `"tags`" : [`"environment:production`", `"role:webserver`"]
    }"
    ```

3. Ejecuta el código presentado en la [primera sección](#the-code-that-makes-the-api-call).

### Publicar una métrica

1. Sustituye la clave de API/aplicación por la tuya:

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Configura los parámetros según la [descripción en la API de métricas][5]:

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

3. Ejecuta el código presentado en la [primera sección](#the-code-that-makes-the-api-call).

[Consulta el repositorio GitHub de métricas ncracker/dd para ver más ejemplos de código][6].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /es/api/latest/hosts/
[5]: /es/api/latest/metrics/
[6]: https://github.com/ncracker/dd_metric