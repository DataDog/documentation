---
aliases:
- /ja/agent/autodiscovery/ad_identifiers
- /ja/agent/guide/ad_identifiers
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: オートディスカバリーのインテグレーションテンプレートの作成とロード
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Agent オートディスカバリーに含めるコンテナの管理
title: オートディスカバリーコンテナ識別子
---

オートディスカバリーコンテナ識別子、すなわち `ad_identifiers` を使用すると、オートディスカバリー構成ファイルテンプレートを特定のコンテナに適用できます。それにはコンテナイメージの名前を使用する方法と、カスタムのオートディスカバリーコンテナ識別子を使用する方法があります。

カスタム構成ファイル内でオートディスカバリーコンフィギュレーションが定義されているとしても、 `env`、`service`、`version` をタグ付けする標準ラベルは併用できます。コンテナでこれらのラベルを構成する方法の詳細については、[統合サービスタグ付け][1]を参照してください。

**注**: key-value ストア、Docker ラベル、または Kubernetes ポッドアノテーションなどの他のコンフィギュレーションタイプでは、異なる方法を使用してインテグレーション構成テンプレートを対応するコンテナにマッチさせます。それらのコンフィギュレーションタイプの場合、インテグレーション構成テンプレートとコンテナ間のマッチングは、key-value ストア、ラベル、またはアノテーションに含まれる `<CONTAINER_IDENTIFIER>` に基づいて行われます。

## コンテナイメージ名

以下のオートディスカバリー構成テンプレートを特定のコンテナに適用するために、`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` に**コンテナイメージの短い名前**を指定します。

```yaml
ad_identifiers:
  <INTEGRATION_AUTODISCOVERY_IDENTIFIER>

init_config:
  <INIT_CONFIG>

instances:
  <INSTANCES_CONFIG>
```

**例**: 以下の Apache オートディスカバリー構成テンプレートは、`httpd` という名前のコンテナイメージに適用されます。

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

これは、ホスト上の**すべての** `httpd` コンテナイメージにマッチします。1 つのコンテナで `foo/httpd:latest` が実行され、別のコンテナで `bar/httpd:v2` が実行されている場合、Agent は上記のテンプレートを両方のコンテナに適用します。

オートディスカバリーコンテナ識別子に短いイメージの名前を指定すると、Agent はその名前にマッチするイメージの中で、ソースが異なる、またはタグが異なるものを区別できません。

### 複数の識別子

`ad_identifiers` に次のように追加することで、複数のイメージ名を指定できます。

```yaml
ad_identifiers:
  - httpd
  - my-custom-httpd-image
```

## カスタムなオートディスカバリーコンテナ識別子

同じイメージを実行しているコンテナに異なるオートディスカバリー構成テンプレートを適用するには、`<INTEGRATION_AUTODISCOVERY_IDENTIFIER>` として提供するカスタム値を選択します。そして、このカスタム値を含むコンテナに、Docker ラベルまたは Kubernetes アノテーションを適用します。

**例**: 以下の Apache オートディスカバリー構成テンプレートは、`foo` というカスタム名のコンテナイメージを指定します。

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

次に、Docker ラベルまたは Kubernetes アノテーションを適用して、コンテナを `foo` として識別します。

{{< tabs >}}
{{% tab "Docker ラベル" %}}

```yaml
com.datadoghq.ad.check.id: foo
```

**注**: `com.datadoghq.ad.check.id` ラベルはイメージの名前よりも優先されます。

{{% /tab %}}
{{% tab "Kubernetes アノテーション" %}}

```text
ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: <INTEGRATION_AUTODISCOVERY_IDENTIFIER>
```

`<CONTAINER_IDENTIFIER>` をポッド内のコンテナ名で置き換えます。

**注**: Datadog Agent v6.25+ および v7.25 でサポートされています。`ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id` ラベルはイメージ名よりも優先されます。
{{% /tab %}}
{{< /tabs >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging