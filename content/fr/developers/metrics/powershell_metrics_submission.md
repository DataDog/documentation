---
title: "Envoi de métriques\_: PowerShell"
kind: documentation
aliases:
  - /fr/developers/faq/powershell-api-examples
  - /fr/developers/faq/submitting-metrics-via-powershell
---
Datadog peut recueillir des métriques via l'Agent ou via l'API, et ce quel que soit le langage que vous utilisez. Cette page présente des exemples d'utilisation de chaque méthode avec PowerShell.

## Envoyer des métriques avec PowerShell via l'API

Cette méthode ne nécessite pas l'installation de l'Agent sur le système qui exécute le script PowerShell. Vous devez directement transmettre votre clé d'API ainsi qu'une clé d'application lors de l'envoi de votre requête POST. Commencez par [récupérer votre clé d'API depuis l'application Datadog][1].

```powershell
# Testé sous Windows Server 2012 R2 avec PS version 4.0

function unixTime() {
  Return (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")
}

function postMetric($metric,$tags) {
  $currenttime = unixTime
  $host_name = $env:COMPUTERNAME #paramètre facultatif

  # Construire le JSON
  $points = ,@($currenttime, $metric.amount)
  $post_obj = [pscustomobject]@{"series" = ,@{"metric" = $metric.name;
      "points" = $points;
      "type" = "gauge";
      "host" = $host_name;
      "tags" = $tags}}
  $post_json = $post_obj | ConvertTo-Json -Depth 5 -Compress
  # POST vers l'API DD
  $response = Invoke-RestMethod -Method Post -Uri $url -Body $post_json -ContentType "application/json"
}

# Compte Datadog, détails de l'API et paramètres facultatifs
$app_key = "<CLÉ_APPLICATION_DATADOG>" # spécifier une clé d'application valide
$api_key = "<CLÉ_API_DATADOG>" # spécifier une clé d'api valide
$url_base = "https://app.datadoghq.com/"
$url_signature = "api/v1/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" # paramètre facultatif

# Sélectionner les données à envoyer à Datadog. Dans cet exemple, on envoie le nombre de handles ouverts par le processus mmc
$metric_ns = "ps1." # l'espace de nommage de métrique de votre choix
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # transmettre votre métrique en tant que paramètre à postMetric()
```

## Envoi de métriques avec PowerShell via DogStatsD

L'utilisation de l'Agent vous permet de tirer parti de son service d'écoute, appelé [DogStatsD][2]. L'exemple suivant vous montrera comment envoyer la même métrique que précédemment via DogStatsD. Notez qu'avec cette méthode, vous n'avez pas besoin de spécifier votre clé d'API ou votre clé d'application : elles sont déjà définies dans votre fichier `datadog.yaml` local.

```powershell
# Testé sous Windows Server 2012 R2 avec PS version 4.0
#           Windows Server 2008 x64 R2 avec PS version 2.0

function dogstatsd($metric) {
    $udpClient = New-Object System.Net.Sockets.UdpClient
    $udpClient.Connect('127.0.0.1', '8125')
    $encodedData=[System.Text.Encoding]::ASCII.GetBytes($metric)
    $bytesSent=$udpClient.Send($encodedData,$encodedData.Length)
    $udpClient.Close()
}
$tags = "|#env:test" # Tag Datadog
$temp = Get-Process mmc
$metric = "dogstatsd.ps1." + $temp.Name + ":" + $temp.Handles + "|g" + $tags # metric
dogstatsd($metric)
```

## Exemples

Voici deux exemples traduits en tant que script PowerShell. Ils utilisent l'objet `Msxml2.XMLHTTP`, qui est entièrement documenté sur le [site de Mozilla][3] :

### Le code qui envoie l'appel d'API

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

### Ajouter des tags à un host

1. Spécifiez votre clé d'API et votre clé d'application :

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Définissez vos paramètres selon la [description de l'API Hosts][4] :

    ```powershell
    $host_name = "test.host"

    $http_method = "POST"

    $url_signature = "api/v1/tags/hosts/$host_name"

    $parameters = "{
    `"tags`" : [`"environment:production`", `"role:webserver`"]
    }"
    ```

3. Exécutez le code présenté dans la [première section](#le-code-qui-envoie-l-appel-d-api).

### Envoyer une métrique

1. Spécifiez votre clé d'API et votre clé d'application :

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. Définissez vos paramètres selon la [description de l'API Metrics][5] :

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

3. Exécutez le code présenté dans la [première section](#le-code-qui-envoie-l-appel-d-api).

[Consultez le référentiel GitHub ncracker/dd_metric pour découvrir d'autres exemples de code][6].

[1]: https://app.datadoghq.com/account/settings#api
[2]: /fr/developers/metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /fr/api/v1/hosts/
[5]: /fr/api/v1/metrics/
[6]: https://github.com/ncracker/dd_metric