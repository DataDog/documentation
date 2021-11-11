---
title: オートディスカバリーコンテナ識別子
kind: ドキュメント
aliases:
  - /ja/agent/autodiscovery/ad_identifiers
further_reading:
  - link: /agent/kubernetes/integrations/
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/guide/autodiscovery-management/
    tag: ドキュメント
    text: Agent オートディスカバリーに含めるコンテナの管理
---
オートディスカバリーコンテナ識別子、すなわち `ad_identifiers` を使用すると、オートディスカバリーコンフィギュレーションファイルテンプレートを特定のコンテナに適用できます。それには[コンテナイメージの短い名前](#short-image-container-identifiers)を使用する方法と、[カスタムなオートディスカバリーコンテナ識別子](#custom-autodiscovery-container-identifiers)を使用する方法があります。

**注**: 他のコンフィギュレーションタイプ（key-value ストア、Docker ラベル、または Kubernetes ポッドアノテーション）の場合、インテグレーションのコンフィギュレーションテンプレートとコンテナとのマッチングには、key-value ストア、ラベル、またはアノテーションコンフィギュレーションに含まれる `<CONTAINER_IDENTIFIER>` が使用されます。

## ショートイメージによるコンテナ識別子

以下のオートディスカバリーコンフィギュレーションテンプレートを特定のコンテナに適用するために、`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` に**コンテナイメージの短い名前**を指定します。

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

たとえば、以下の Apache オートディスカバリーコンフィギュレーションテンプレートを Agent に使用するとします。

```yaml
ad_identifiers:
  - httpd
init_config:
instances:
  - apache_status_url: http://%%host%%/server-status?auto
logs:
  source: apache
  service: webapp
```

これにより、ホスト上の**すべての** `httpd` コンテナがマッチします。あるコンテナが `library/httpd:latest` で稼働し、別のコンテナが `<WHATEVER>/httpd:v2` で稼働しているとすると、Agent は上記のテンプレートを両方のコンテナに適用します。これはたとえば、コンテナイメージに `library/httpd:latest` ではなく `httpd` という短い名前を指定しているからです。

オートディスカバリーコンテナ識別子に短いイメージの名前を指定すると、**Agent はその名前にマッチするイメージの中で、ソースが異なる、またはタグが異なるものを区別できません。**

## 標準ラベルからタグを追加

カスタム構成ファイル内でオートディスカバリーコンフィギュレーションが定義されているとしても、 `env`、`service`、`version` をタグ付けする標準ラベルは併用できます。

既存のコンテナでこれらのラベルを構成する方法については、[統合サービスタグ付け][1]を参照してください。

### 複数の識別子

`ad_identifiers` に次のように追加することで、複数のイメージ名を指定できます。

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## カスタムなオートディスカバリーコンテナ識別子

同じイメージを実行しているコンテナに異なるオートディスカバリーコンフィギュレーションテンプレートを適用するには、カスタムな値の `<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` を使用し、それを `com.datadoghq.ad.check.id` ラベルで指定してコンテナを識別します。以下のコンフィギュレーションファイルを使用する場合、

```text
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

以下のラベルをこのオートディスカバリーコンフィギュレーションテンプレートに追加することで、コンテナを特定できます。

```text
com.datadoghq.ad.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

**注**: `com.datadoghq.ad.check.id` ラベルはイメージの名前よりも優先されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging