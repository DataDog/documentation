---
title: 'メトリクス送信: PowerShell'
kind: documentation
aliases:
  - /ja/developers/faq/powershell-api-examples
  - /ja/developers/faq/submitting-metrics-via-powershell
---
Datadog は、使用する言語に関係なく、Agent および API を介してメトリクスを収集できます。このページでは、PowerShell を使用した両方の例を示します。

## API 経由で PowerShell を使用してメトリクスを送信する

この方法では、PowerShell スクリプトを実行しているシステムに Agent をインストールする必要はありません。POST リクエストを行う際には、API キーとアプリケーションキーを明示的に渡す必要があります。まず、[Datadog アプリケーションから API キーを取得][1]します。

```powershell
# PSVersion 4.0 を備えた Windows Server 2012 R2 でテスト

function unixTime() {
  Return (Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")
}

function postMetric($metric,$tags) {
  $currenttime = unixTime
  $host_name = $env:COMPUTERNAME #オプションのパラメーター

  # JSONを構築
  $points = ,@($currenttime, $metric.amount)
  $post_obj = [pscustomobject]@{"series" = ,@{"metric" = $metric.name;
      "points" = $points;
      "type" = "gauge";
      "host" = $host_name;
      "tags" = $tags}}
  $post_json = $post_obj | ConvertTo-Json -Depth 5 -Compress
  # DD API への POST
  $response = Invoke-RestMethod -Method Post -Uri $url -Body $post_json -ContentType "application/json"
}

# Datadog アカウント、API 情報、オプションのパラメーター
$app_key = "<DATADOG_アプリケーションキー>" #有効なアプリキーを指定します
$api_key = "<DATADOG_API_キー>" #有効な API キーを指定します
$url_base = "https://app.datadoghq.com/"
$url_signature = "api/v1/series"
$url = $url_base + $url_signature + "?api_key=$api_key" + "&" + "application_key=$app_key"
$tags = "[env:test]" #オプションのパラメーター

# Datadog に送信するものを選択します。この例では、プロセス "mmc" によって開かれたハンドルの数を送信します
$metric_ns = "ps1." # 目的のメトリクスネームスペース
$temp = Get-Process mmc
$metric = @{"name"=$metric_ns + $temp.Name; "amount"=$temp.Handles}
postMetric($metric)($tags) # メトリクスをパラメーターとして postMetric() に渡します
```

## DogStatsD 経由で PowerShell を使用してメトリクスを送信する

Agent を使用すると、その [DogStatsD][2] リスナーを利用できます。次の例は、DogStatsD を介して同じメトリクスを送信する方法を示しています。API またはアプリケーションキーはローカルの `datadog.yaml` に既に存在するため、指定する必要がなくなったことに注意してください。

```powershell
# PSVersion 4.0 を備えた Windows Server 2012 R2 でテスト
#           PSVersion 2.0 搭載 Windows Server 2008 x64 R2

function dogstatsd($metric) {
    $udpClient = New-Object System.Net.Sockets.UdpClient
    $udpClient.Connect('127.0.0.1', '8125')
    $encodedData=[System.Text.Encoding]::ASCII.GetBytes($metric)
    $bytesSent=$udpClient.Send($encodedData,$encodedData.Length)
    $udpClient.Close()
}
$tags = "|#env:test" # Datadog tag
$temp = Get-Process mmc
$metric = "dogstatsd.ps1." + $temp.Name + ":" + $temp.Handles + "|g" + $tags # メトリクス
dogstatsd($metric)
```

## 例

こちらは `Msxml2.XMLHTTP` を使用して PowerShell で翻訳された 2 つの例で、[Mozilla のドキュメントページ][3]で完全に文書化されています。

### API 呼び出しを行うコード

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

### ホストへのタグの追加

1. API/アプリキーを自分のものに置き換えます。

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. [ホスト API の説明][4]に従ってパラメーターを設定します。

    ```powershell
    $host_name = "test.host"

    $http_method = "POST"

    $url_signature = "api/v1/tags/hosts/$host_name"

    $parameters = "{
    `"tags`" : [`"environment:production`", `"role:webserver`"]
    }"
    ```

3. [最初のセクション](#the-code-that-makes-the-api-call)に示されているコードを実行します。

### メトリクスをポスト

1. API/アプリキーを自分のものに置き換えます。

    ```powershell
    $api_key = "<DATADOG_API_KEY>"
    $app_key = "<DATADOG_APPLICATION_KEY>"
    ```

2. [メトリクス API の説明][5]に従ってパラメーターを設定します。

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

3. [最初のセクション](#the-code-that-makes-the-api-call)に示されているコードを実行します。

[その他のコード例については、ncracker/dd_metric GitHub リポジトリを参照してください][6]。

[1]: https://app.datadoghq.com/account/settings#api
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /ja/api/v1/hosts/
[5]: /ja/api/v1/metrics/
[6]: https://github.com/ncracker/dd_metric