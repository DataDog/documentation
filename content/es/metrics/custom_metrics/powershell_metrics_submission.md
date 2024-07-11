---
aliases:
- /es/developers/faq/powershell-api-examples
- /es/developers/faq/submitting-metrics-via-powershell
- /es/developers/metrics/powershell_metrics_submission/
- /es/metrics/powershell_metrics_submission
title: 'Envío de métricas: PowerShell'
---

Datadog puede recopilar métricas tanto del Agent como de la API, independientemente del lenguaje que decidas utilizar. Esta página ofrece ejemplos de ambos casos utilizando PowerShell.

## Envío de métricas con PowerShell con la API

Este método no requiere tener instalado el Agent en el sistema que ejecuta el script PowerShell. Tienes que pasar explícitamente tu [clave de API][1], así como una clave de aplicación, al realizar la solicitud POST.

```powershell
# Probado en Windows Server 2012 R2 c/ PSVersión 4.0

function unixTime() {
  Return (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")
}

function postMetric($metric,$tags) {
  $currenttime = unixTime
  $host_name = $env:COMPUTERNAME #parámetro opcional.

  # Constructo JSON
  $points = ,@($currenttime, $metric.amount)
  $post_obj = [pscustomobject]@{"series" = ,@{"metric" = $metric.name;
      "points" = $points;
      "type" = "gauge";
      "host" = $host_name;
      "tags" = $tags}}
  $post_json = $post_obj | ConvertTo-Json -Depth 5 -Compress
  # PUBLICAR a DD API
  $response = Invoke-RestMethod -Method Post -Uri $url -Body $post_json -ContentType "application/json"
}

# Cuenta Datadog, información de la API y parámetros opcionales
$app_key = "<DATADOG_APPLICATION_KEY>" #proporciona tu clave de API válida
$api_key = "<DATADOG_API_KEY>" #proporciona tu clave de API válida
$url_base = "https://app.datadoghq.com/"
$url_signature = "api/v1/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" #parámetro opcional

# Selecciona qué se envía a Datadog. En este ejemplo, se envía el número de manejadores abiertos por proceso "mmc" 
$metric_ns = "ps1." # tu nombre de espacio de métrica deseado
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # pasa tu métrica como parámetro a postMetric()
```

## Envío de métricas con PowerShell con DogStatsD

El Agent te permite hacer uso de su escuchador [DogStatsD][2]. El siguiente ejemplo muestra cómo podrías enviar la misma métrica con DogStatsD. Fíjate que ya no necesitas especificar la API o las claves de aplicación porque ya están en tu `datadog.yaml` local.

```powershell
# Probado en Windows Server 2012 R2 c/ PSVersión 4.0
#           Windows Server 2008 x64 R2 c/ PSVersión 2.0

function dogstatsd($metric) {
    $udpClient = New-Object System.Net.Sockets.UdpClient
    $udpClient.Connect('127.0.0.1', '8125')
    $encodedData=[System.Text.Encoding]::ASCII.GetBytes($metric)
    $bytesSent=$udpClient.Send($encodedData,$encodedData.Length)
    $udpClient.Close()
}
$tags = "|#env:test" # Etiqueta Datadog 
$temp = Get-Process mmc
$metric = "dogstatsd.ps1." + $temp.Name + ":" + $temp.Handles + "|g" + $tags # métrica
dogstatsd($metric)
```

## Ejemplos

Aquí hay dos ejemplos traducidos en PowerShell, utilizando `Msxml2.XMLHTTP`, completamente documentado [en la documentación de Mozilla][3]):

### El código que realiza la llamada a la API

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

### Añadir etiquetas a un host

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

3. Ejecuta el código presentado en la [primera sección](#the-code-that-makes-the-api-call).

[Consulta el repositorio GitHub de métricas ncracker/dd para ver más ejemplos de código][6].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /es/api/v1/hosts/
[5]: /es/api/v1/metrics/
[6]: https://github.com/ncracker/dd_metric