---
aliases:
- /ja/agent/autodiscovery/ad_identifiers
- /ja/agent/guide/ad_identifiers
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Docker
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent オートディスカバリーに含めるコンテナの管理
title: オートディスカバリーコンテナ識別子
---

このドキュメントでは、特定のコンテナに [オートディスカバリー][1] 構成テンプレートを適用する方法を説明します。`ad_identifiers` パラメーターは、コンテナ イメージ名またはカスタム識別子と一致させることができます。

## コンテナ イメージ名

次のオートディスカバリー構成テンプレートを特定のコンテナに適用するには、`<AUTODISCOVERY_IDENTIFIER>` を [短い][2] コンテナ イメージ名に置き換えてください:

```yaml
ad_identifiers:
  <AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**例**: 次の Apache オートディスカバリー構成テンプレートは、`httpd` という名前のコンテナ イメージに適用されます:

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

これは、ホスト上の **すべての** `httpd` コンテナ イメージに一致します。`foo/httpd:latest` を実行しているコンテナと `bar/httpd:v2` を実行しているコンテナがある場合でも、Agent は上記のテンプレートを両方のコンテナに適用します。

短いイメージ名をオートディスカバリーのコンテナ識別子として使用する場合、Agent は異なるソースやタグで同じ名前のイメージを区別できません。

### 複数の識別子

`ad_identifiers` に次のように追加することで、複数のイメージ名を指定できます。

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

これは、ホスト上で `httpd` **または** `my-custom-httpd-image` に一致する **すべての** コンテナ イメージに適用されます。

## カスタムなオートディスカバリーコンテナ識別子

同じイメージを実行するコンテナに別々の構成テンプレートを適用したい場合は、カスタム コンテナ識別子を使用してください。

1. Docker ラベルまたは Kubernetes アノテーションを使用して、コンテナにカスタム コンテナ識別子を付与します。

   **例**:
   `foo` としてコンテナを識別する Docker ラベルまたは Kubernetes アノテーションを適用します:

   {{< tabs >}}
   {{% tab "Docker label" %}}

   ```yaml
   LABEL com.datadoghq.ad.check.id="foo"
   ```

   **注**: `com.datadoghq.ad.check.id` ラベルはイメージ名より優先されます。

   {{% /tab %}}
   {{% tab "Kubernetes annotation" %}}

   ```text
   ad.datadoghq.com/<CONTAINER_NAME>.check.id: 'foo'
   ```

   `<CONTAINER_NAME>` をポッド内のコンテナ名に置き換えてください。

   **注**: Datadog Agent v6.25+ および v7.25 でサポートされています。`ad.datadoghq.com/<CONTAINER_NAME>.check.id` ラベルはイメージ名より優先されます。
   {{% /tab %}}
   {{< /tabs >}}

2. このカスタム値をオートディスカバリー構成テンプレート内で参照します。

   **例**:
   次の Apache オートディスカバリー構成テンプレートは、`foo` というカスタム名のコンテナ イメージを指定します:

   ```yaml
   ad_identifiers:
     - foo
   init_config:
   instances:
     - apache_status_url: http://%%host%%/server-status?auto
   logs:
     source: apache
     service: webapp
   ```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/autodiscovery
[2]: /ja/glossary/#short-image