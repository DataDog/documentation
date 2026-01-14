---
aliases:
- /ja/tracing/proxies
- /ja/tracing/setup_overview/proxy_setup/
code_lang: kong
code_lang_weight: 40
further_reading:
- link: https://docs.konghq.com/gateway/latest/
  tag: 外部サイト
  text: Kong Web サイト
- link: https://github.com/DataDog/kong-plugin-ddtrace/
  tag: ソースコード
  text: Kong 用 Datadog APM プラグイン
title: Kong のインスツルメンテーション
type: multi-code-lang
---

Datadog APM は、[Kong Gateway][1] で [kong-plugin-ddtrace][2] プラグインを利用して利用できます。

## インストール

プラグインは `luarocks` を使ってインストールします。
```
luarocks install kong-plugin-ddtrace
```

Kong Gateway はバンドルされているプラグインではないので、有効にする前に構成する必要があります。有効にするには、環境変数 `KONG_PLUGINS` に `bundled` と `ddtrace` を含めるか、`/etc/kong/kong.conf` に `plugins=bundled,ddtrace` を設定してください。次に、Kong Gateway を再起動すると変更が適用されます。

```
# KONG_PLUGINS 環境変数を設定するか、/etc/kong/kong.conf を編集して ddtrace プラグインを有効にします
export KONG_PLUGINS=bundled,ddtrace
kong restart
```

## 構成

プラグインは、グローバルまたは Kong Gateway の特定のサービスで有効にすることができます。

```
# グローバルに有効
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace'
# 特定のサービスのみ有効
curl -i -X POST --url http://localhost:8001/services/example-service/plugins/ --data 'name=ddtrace'
```

プラグイン内のサービス名や環境などを設定するためのオプションが用意されています。
以下の例では、`prod` 環境に `mycorp-internal-api` というサービス名を設定しています。
```
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace' --data 'config.service_name=mycorp-internal-api' --data 'config.environment=prod'
```

その他の構成オプションは、[kong-plugin-ddtrace][3] のプラグインドキュメントに記載されています。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.konghq.com/gateway/latest/
[2]: https://github.com/DataDog/kong-plugin-ddtrace
[3]: https://github.com/DataDog/kong-plugin-ddtrace#configuration