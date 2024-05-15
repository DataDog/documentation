---
app_id: nginx
app_uuid: b98a5a97-1d65-4f74-9d1a-b2c1be85a470
assets:
  dashboards:
    NGINX Plus base overview: assets/dashboards/plus_overview.json
    NGINX-Metrics: assets/dashboards/NGINX-Metrics_dashboard.json
    NGINX-Overview: assets/dashboards/NGINX-Overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - nginx.net.connections
      - nginx.connections.active
      metadata_path: metadata.csv
      prefix: nginx.
    process_signatures:
    - 'nginx: マスタープロセス'
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31
    source_type_name: Nginx
  logs:
    source: nginx
  monitors:
    '[NGINX] 4xx Errors higher than usual': assets/monitors/4xx.json
    '[NGINX] 5xx Errors higher than usual': assets/monitors/5xx.json
    '[NGINX] Upstream peers fails': assets/monitors/upstream_peer_fails.json
  saved_views:
    4xx_errors: assets/saved_views/4xx_errors.json
    5xx_errors: assets/saved_views/5xx_errors.json
    bot_errors: assets/saved_views/bot_errors.json
    nginx_processes: assets/saved_views/nginx_processes.json
    status_code_overview: assets/saved_views/status_code_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nginx/README.md
display_on_public_website: true
draft: false
git_integration_title: nginx
integration_id: nginx
integration_title: Nginx
integration_version: 6.3.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: nginx
public_title: Nginx
short_description: 接続およびリクエストのメトリクスを監視。NGINX Plus でさらに多くのメトリクスを取得できます。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::構成 & デプロイ
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 接続およびリクエストのメトリクスを監視。NGINX Plus でさらに多くのメトリクスを取得できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nginx
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![NGINX のデフォルトのダッシュボード][1]

## 概要

Datadog Agent は NGINX インスタンスから、次のような多数のメトリクスを収集できます (一例)。

- 合計リクエスト数
- 接続数 (許可された接続、処理された接続、アクティブな接続など)

NGINX の商用版である NGINX Plus のユーザーの場合、Agent は、NGINX Plus が提供する次のような数多くのメトリクスを収集できます。

- エラー (4xx コード、5xx コードなど)
- 上流サーバー (アクティブな接続、5xx コード、健全性チェックなど)
- キャッシュ (サイズ、ヒット数、ミス数など)
- SSL (ハンドシェイクやハンドシェイクの失敗など)

## 計画と使用

### インフラストラクチャーリスト

NGINX チェックは、ローカルの NGINX ステータスエンドポイントからメトリクスを取得するため、`nginx` バイナリが NGINX ステータスモジュールと共にコンパイルされている必要があります。

- [スタブステータスモジュール][2] - オープンソース NGINX 用
- [HTTP ステータスモジュール][3] - NGINX Plus 専用

#### NGINX オープンソース

オープンソース NGINX を使用している場合は、インスタンスにスタブステータスモジュールが含まれていないことがあります。**コンフィグレーション**を行う前に、`nginx` バイナリにモジュールが含まれているかを確認してください。

```shell
$ nginx -V 2>&1| grep -o http_stub_status_module
http_stub_status_module
```

コマンドの出力に `http_stub_status_module` が含まれていない場合は、このモジュールを含む NGINX パッケージをインストールする必要があります。独自の NGINX をコンパイルして、コンパイル時にモジュールを有効化することもできますが、最新の Linux ディストリビューションで提供されている代替 NGINX パッケージには、外部モジュールのさまざまな組み合わせが組み込まれています。ご使用のオペレーティングシステムの NGINX パッケージをチェックして、スタブステータスモジュールが含まれているパッケージを探してください。

#### NGINX Plus

リリース 13 より前の NGINX Plus パッケージにはHTTP ステータスモジュールが含まれています。リリース 13 以降の NGINX Plus では、このステータスモジュールは非推奨になり、代わりに新しい Plus API を使用する必要があります。詳細については、[こちらのお知らせ][4]を参照してください。

#### NGINX の準備

{{< tabs >}}
{{% tab "ホスト" %}}

各 NGINX サーバーで、他の NGINX 構成ファイルが含まれているディレクトリ (`/etc/nginx/conf.d/` など) に `status.conf` ファイルを作成します。

```conf
server {
  listen 81;
  server_name localhost;

  access_log off;
  allow 127.0.0.1;
  deny all;

  location /nginx_status {
    # ステータスモジュールを選択します

    # オープンソース NGINX を自由に利用できます
    stub_status;

    # バージョン 1.7.5 以前の オープンソース NGINX で使用します
    # stub_status on;

    # NGINX Plus でのみ使用できます
    # status;

   # バージョン情報を取得できるようにします
   server_tokens on;
  }
}
```

**NGINX Plus**

NGINX Plus ユーザーは、`stub_status` を使用することもできますが、このモジュールで提供されるメトリクスは少ないため、`status` の使用をお勧めします。

NGINX Plus リリース 15 以降では、`status` モジュールは非推奨です。代わりに [http_api_module][1] を使用してください。たとえば、メインの NGINX 構成ファイル (`/etc/nginx/conf.d/default.conf`) で `/api` エンドポイントを有効にするには、以下のようにします。

```conf
server {
  listen 8080;
  location /api {
    api write=on;
  }
}
```

NGINX Plus を使用してさらに詳細なメトリクス (毎秒の 2xx / 3xx / 4xx / 5xx 応答数など) を取得するには、監視するサーバーで `status_zone` を設定します。たとえば、以下のとおりです。

```conf
server {
  listen 80;
  status_zone <ゾーン名>;
  ...
}
```

NGINX をリロードして、status または API エンドポイントを有効にします。完全な再起動は必要ありません。

```shell
sudo nginx -t && sudo nginx -s reload
```
[1]: https://nginx.org/en/docs/http/ngx_http_api_module.html
{{% /tab %}}
{{% tab "Kubernetes" %}}

以下のスニペットを構成 ConfigMaps に追加し、別のポートでメトリクスエンドポイントを公開します。

```yaml
kind: ConfigMap
metadata:
  name: nginx-conf
data:
[...]
  status.conf: |
    server {
      listen 81;

      location /nginx_status {
        stub_status on;
      }

      location / {
        return 404;
      }
    }
```

次に、NGINX ポッドで `81` エンドポイントを公開し、そのファイルを NGINX 構成フォルダーにマウントします。

```yaml
spec:
  containers:
    - name: nginx
      ports:
        - containerPort: 81
      volumeMounts:
        - mountPath: /etc/nginx/conf.d/status.conf
          subPath: status.conf
          readOnly: true
          name: "config"
  volumes:
    - name: "config"
      configMap:
          name: "nginx-conf"
```


{{% /tab %}}
{{< /tabs >}}

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[Docker](?tab=docker#docker)、[Kubernetes](?tab=kubernetes#kubernetes)、または [ECS](?tab=ecs#ecs) セクションを参照してください。

##### メトリクスの収集

1. [NGINX メトリクス](#metrics)の収集を開始するには、`nginx.d/conf.yaml` ファイルで `nginx_status_url` パラメーターを `http://localhost:81/nginx_status/` に設定します。使用可能なすべての構成オプションの詳細については、[サンプル nginx.d/conf.yaml][1] を参照してください。

    **NGINX Plus**:

      - NGINX Plus リリース 13 以降の場合は、`nginx.d/conf.yaml` 構成ファイルでパラメーター `use_plus_api` を `true` に設定します。
      - ストリーム統計 API 呼び出しは、NGINX Plus のデフォルトで含まれています。これを無効にしたい場合は、`nginx.d/conf.yaml` コンフィギュレーションファイルでパラメーター `use_plus_api_stream` を `false` に設定します。
      - `http_api_module` を使用する場合は、`nginx.d/conf.yaml` 構成ファイルでパラメーター `nginx_status_url` をサーバーの `/api` の場所に設定します。以下に例を示します。

          ```yaml
          nginx_status_url: http://localhost:8080/api
          ```

2. オプション - NGINX の `vhost_traffic_status module` を使用する場合は、`nginx.d/conf.yaml` 構成ファイルでパラメーター `use_vts` を `true` に設定します。

3. [Agent を再起動][2]すると、Datadog への NGINX メトリクスの送信が開始されます。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. NGINX のログの収集を開始するには、次の構成ブロックを `nginx.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: nginx
       source: nginx

     - type: file
       path: /var/log/nginx/error.log
       service: nginx
       source: nginx
   ```

    `service` パラメーターと `path` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル nginx.d/conf.yaml][1] を参照してください。

3. [Agent を再起動します][2]。

**注**: NGINX のデフォルトのログ形式には、リクエスト応答時間が含まれていません。これをログに含めるには、NGINX 構成ファイル (`/etc/nginx/nginx.conf`) の `http` セクションに以下の構成ブロックを追加して、NGINX のログ形式を更新します。

```conf
http {
    #推奨ログフォーマット
    log_format nginx '\$remote_addr - \$remote_user [\$time_local] '
                  '"\$request" \$status \$body_bytes_sent \$request_time '
                  '"\$http_referer" "\$http_user_agent"';

    access_log /var/log/nginx/access.log;
}
```

[1]: https://github.com/DataDog/integrations-core/blob/master/nginx/datadog_checks/nginx/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

コンテナで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:81/nginx_status/"}]'
```

**注**: このインスタンスは NGINX オープンソースでのみ機能します。NGINX Plus を使用している場合は、対応するインスタンス構成をインライン化します。

#### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"nginx","service":"nginx"}]'
```

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#installation
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### ガイド

このチェックを、Kubernetes で実行している Agent に構成します。

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][2]を使用してテンプレートを構成することもできます。

**Annotations v1** (Datadog Agent < v7.36 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.check_names: '["nginx"]'
    ad.datadoghq.com/nginx.init_configs: '[{}]'
    ad.datadoghq.com/nginx.instances: |
      [
        {
          "nginx_status_url":"http://%%host%%:81/nginx_status/"
        }
      ]
  labels:
    name: nginx
```

**Annotations v2** (Datadog Agent v7.36+ 向け)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.checks: |
      {
        "nginx": {
          "init_config": {},
          "instances": [
            {
              "nginx_status_url":"http://%%host%%:81/nginx_status/"
            }
          ]
        }
      }
  labels:
    name: nginx
```

**注**: このインスタンスは NGINX オープンソースでのみ機能します。NGINX Plus を使用している場合は、対応するインスタンス構成をインライン化します。

#### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

次に、[ログインテグレーション][4]をポッドアノテーションとして設定します。または、[ファイル、コンフィギュレーションマップ、または Key-Value ストア][5]を使用してこれを構成することもできます。

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  annotations:
    ad.datadoghq.com/nginx.logs: '[{"source":"nginx","service":"nginx"}]'
  labels:
    name: nginx
```

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
[4]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

このチェックを、ECS で実行している Agent に構成するには:

##### メトリクスの収集

アプリケーションのコンテナで、[オートディスカバリーのインテグレーションテンプレート][1]を Docker ラベルとして設定します。

```json
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"nginx\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"nginx_status_url\":\"http://%%host%%:81/nginx_status/\"}]"
    }
  }]
}
```

**注**: このインスタンスは NGINX オープンソースでのみ機能します。NGINX Plus を使用している場合は、対応するインスタンス構成をインライン化します。

##### 収集データ


Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[ECS ログ収集][2]を参照してください。

次に、[ログインテグレーション][3]を Docker ラベルとして設定します。

```yaml
{
  "containerDefinitions": [{
    "name": "nginx",
    "image": "nginx:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"nginx\",\"service\":\"nginx\"}]"
    }
  }]
}
```

[1]: https://docs.datadoghq.com/ja/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/ja/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/ja/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `nginx` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "nginx" >}}


オープンソース NGINX のユーザーは、ここに示したメトリクスのすべてを利用できるわけではありません。各モジュールで提供されるメトリクスを確認するには、[スタブステータス][2] (オープンソース NGINX) と [HTTP ステータス][3] (NGINX Plus) のモジュールリファレンスを比較してください。

オープンソース NGINX と NGINX Plus では名前が異なるメトリクスがいくつかありますが、それらは同じメトリクスです。

| NGINX                          | NGINX Plus                   |
| ------------------------------ | ---------------------------- |
| `nginx.net.connections`        | `nginx.connections.active`   |
| `nginx.net.conn_opened_per_s`  | `nginx.connections.accepted` |
| `nginx.net.conn_dropped_per_s` | `nginx.connections.dropped`  |
| `nginx.net.request_per_s`      | `nginx.requests.total`       |

次のメトリクスは、正確には同じメトリクスではありませんが、関連はあります。

| NGINX               | NGINX Plus               |
| ------------------- | ------------------------ |
| `nginx.net.waiting` | `nginx.connections.idle` |

最後に、次のメトリクスには対応するメトリクスがありません。

| エラー予算アラート              | 説明                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `nginx.net.reading` | nginx がリクエストヘッダーを読み取っている現在の接続数。              |
| `nginx.net.writing` | nginx がクライアントへの応答を書き込んでいる現在の接続数。 |

### ヘルプ

NGINX チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "nginx" >}}


## ヘルプ

- [あるはずのタイムスタンプがログに含まれないのはなぜですか？][6]

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [NGINX の監視方法][8]
- [NGINX メトリクスの収集方法][9]
- [Datadog を使用した NGINX の監視方法][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/nginx/images/nginx_dashboard.png
[2]: https://nginx.org/en/docs/http/ngx_http_stub_status_module.html
[3]: https://nginx.org/en/docs/http/ngx_http_status_module.html
[4]: https://www.nginx.com/blog/nginx-plus-r13-released
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/logs/faq/why-do-my-logs-not-have-the-expected-timestamp/
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/how-to-monitor-nginx
[9]: https://www.datadoghq.com/blog/how-to-collect-nginx-metrics/index.html
[10]: https://www.datadoghq.com/blog/how-to-monitor-nginx-with-datadog/index.html