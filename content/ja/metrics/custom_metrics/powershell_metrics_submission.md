---
aliases:
- /ja/developers/faq/powershell-api-examples
- /ja/developers/faq/submitting-metrics-via-powershell
- /ja/developers/metrics/powershell_metrics_submission/
- /ja/metrics/powershell_metrics_submission
further_reading:
- link: /api/latest/metrics/
  tag: API
  text: メトリクス API エンドポイント
title: 'メトリクス送信: PowerShell'
---

Datadog は、使用する言語に関係なく、Agent および API からメトリクスを収集できます。このページでは、PowerShell を使用した両方の例を示します。

## API で PowerShell を使用してメトリクスを送信する

この方法では、PowerShell スクリプトを実行しているシステムに Agent をインストールする必要はありません。POST リクエストを行う際には、API キーとアプリケーションキーを明示的に渡す必要があります。

```powershell
# このスクリプトは PowerShell から Datadog v2 API にカスタム メトリクスを送信します。
# Windows 10 Pro (version 10.0.1945) と PSVersion 5.1 (Build 19041, Revision 5486) で動作確認済み

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
    # 1) Datadog API キー (v2) の設定
    # ================================== 
    # - $url: メトリクス データを Datadog に送信するための API エンドポイント。
    # 既定では US1 データ センター向けに設定されています。別のリージョンで運用している場合は、
    # 利用しているリージョンに合わせてこの URL を更新してください:
    #     * EU:         https://api.datadoghq.eu/api/v2/series
    #     * US3:        https://api.us3.datadoghq.com/api/v2/series
    #     * US5:        https://api.us5.datadoghq.com/api/v2/series
    #     * AP1:        https://api.ap1.datadoghq.com/api/v2/series
    #     * AP2:        https://api.ap2.datadoghq.com/api/v2/series
    #     * US1-FED:    https://api.ddog-gov.com/api/v2/series
    $api_key = "<DATADOG_API_KEY>"          # 有効な API キーを指定してください
    $app_key = "<DATADOG_APPLICATION_KEY>"  # 有効なアプリケーション キーを指定してください
    $url     = "https://api.datadoghq.com/api/v2/series" # US1 向けの既定エンドポイント。利用している Datadog データ センターに合わせて更新してください

    # ==================================
    # 2) リクエスト ヘッダー
    # ==================================
    $headers = @{
        "DD-API-KEY"         = $api_key
        "DD-APPLICATION-KEY" = $app_key
        "Content-Type"       = "application/json"
    }

    # ==================================
    # 3) v2 用の JSON ペイロードを作成
    # ==================================
    # 現在時刻 (epoch 秒)
    $currentTime = [int](Get-Date -date ((get-date).ToUniversalTime()) -UFormat %s) -Replace("[,\.]\d*", "")


    # /api/v2/series エンドポイント向けのボディ
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
                "type"  = 1                 # (1) count, (2) rate, (3) gauge を指定
                "tags"  = $Tags             # オプション: タグの配列を指定します
            }
        )
    }

    # ハッシュ テーブルを JSON に変換
    $jsonBody = $body | ConvertTo-Json -Depth 5 -Compress

    # ==================================
    # 4) POST リクエストを送信
    # ==================================
    $response = Invoke-RestMethod -Method Post -Uri $url -Headers $headers -Body $jsonBody

    Write-Host "Datadog 応答: $($response | ConvertTo-Json -Depth 5)"
}


# ----------------------------
# 使用例:
# ----------------------------
# "my.custom.metric" というカスタム count メトリクスを値 42 で送信し、
# タグとして "env:test" と "version:1.0"、さらに host を付与します。
Send-DatadogMetric -MetricName "my.custom.metric" `
                   -MetricValue 42 `
                   -Tags @("env:test","version:1.0", "host:$env:COMPUTERNAME")
```

## DogStatsD で PowerShell を使用してメトリクスを送信する

Agent を使用すると、その [DogStatsD][2] リスナーを利用できます。次の例は、DogStatsD で同じメトリクスを送信する方法を示しています。API またはアプリケーションキーはローカルの `datadog.yaml` に既に存在するため、指定する必要がなくなったことに注意してください。

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

こちらは `Msxml2.XMLHTTP` を使用して PowerShell で翻訳された 2 つの例で、[Mozilla のドキュメント][3]で完全に文書化されています。

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

### ホストにタグを追加

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

3. [最初のセクション](#the-code-that-makes-the-api-call)に示されているコードを実行します。

[その他のコード例については、ncracker/dd_metric GitHub リポジトリを参照してください][6]。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[4]: /ja/api/latest/hosts/
[5]: /ja/api/latest/metrics/
[6]: https://github.com/ncracker/dd_metric