---
title: Kubernetes と Docker でオートディスカバリーを使用する
kind: documentation
aliases:
  - /ja/guides/servicediscovery/
  - /ja/guides/autodiscovery/
further_reading:
  - link: /agent/autodiscovery/integrations
    tag: ドキュメント
    text: オートディスカバリーのインテグレーションテンプレートの作成とロード
  - link: /agent/autodiscovery/ad_identifiers
    tag: Documentation
    text: コンテナと該当するインテグレーションテンプレートとの対応
  - link: /agent/autodiscovery/management
    tag: Documentation
    text: Agent オートディスカバリーに含めるコンテナの管理
  - link: /agent/autodiscovery/tag
    tag: Documentation
    text: アプリケーションのタグの動的割り当てと収集
  - link: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
    tag: faq
    text: ECS Fargate のインテグレーションセットアップ
---
## QuickStart

このページは、Agent 6 のオートディスカバリーについて説明しています。[Agent 5 のオートディスカバリーを設定する方法については、こちらのガイドを参照してください。][1]

以下の 5 分間のビデオでは、Datadog Agent v6 のオートディスカバリー機能の概要を説明しています。

{{< wistia mlxx0j6txw >}}

## オートディスカバリーの動作

従来の非コンテナ環境では、Datadog Agent の設定は、それが実行される環境と同じく静的です。Agent は、起動時にディスクからチェック構成を読み取り、実行中は構成されているすべてのチェックを継続的に実行します。
構成ファイルは静的です。構成ファイル内で構成されているネットワーク関連オプションは、監視対象サービスのインスタンス (10.0.0.61:6379 の Redis インスタンスなど) を特定するために使用されます。Agent チェックが目的のサービスに接続できない場合は、ユーザーによって問題が解決されるまで、メトリクスは提供されません。Agent チェックは、管理者が監視対象サービスを回復させるかチェックの構成を修正するまで、失敗した接続を再試行します。

**オートディスカバリーを有効にした場合、Agent は異なる方法でチェックを実行**

Datadog Agent オートディスカバリーの全体的なプロセスは以下のとおりです。

1. **インテグレーションテンプレートの作成とロード**: オートディスカバリーを有効にして Agent を起動すると、Agent はすべての[使用可能なテンプレートソース][2]から、インテグレーションテンプレートを[オートディスカバリーコンテナ識別子][3]と共にロードします。静的な構成ファイルは、ホストやポートのように常に変化するネットワークエンドポイントからデータを収集するチェックには適していません。そのため、オートディスカバリーではインテグレーションテンプレート構成に[**テンプレート変数**][4]が使用されます。このインテグレーションテンプレート構成は、主に以下の 5 つの方法で Agent にロードできます。

  * [Agent に付属のオートディスカバリー構成ファイルの使用][5]
  * [Agent 内にマウントされた構成ファイルの使用][6]
  * [key-value ストアの使用][7]
  * [Kubernetes アノテーションの使用][8]
  * [Docker ラベルの使用][9]

2. **特定のコンテナへのインテグレーションテンプレートの適用**: 従来の Agent 設定とは異なり、Agent は常にすべてのチェックを実行するわけではありません。Agent は、Agent と同じホスト上で実行されているすべてのコンテナおよび該当するロードされたインテグレーションテンプレートを調査して、有効にするチェックを決定します。次に、Agent は Kubernetes/Docker のイベント (コンテナの作成、廃棄、起動、停止) を監視し、イベント発生時に静的チェック構成を有効化、無効化、または再生成します。Agent は、実行中のコンテナを調査する際に、ロードしたいずれかのインテグレーションテンプレートのいずれかの[オートディスカバリーコンテナ識別子][3]にそのコンテナが一致するかどうかをチェックします。一致が見つかると、Agent はそれぞれについて、一致したコンテナの特定の値を[テンプレート変数][10]に代入することにより、静的チェック構成を生成します。さらに、その静的構成を使用してチェックを有効にします。

## 設定方法

Agent をホストでバイナリとして実行している場合は、[Agent](?tab=agent) タブの説明に従ってオートディスカバリーを有効化してください。Agent をコンテナとして実行している場合は、[コンテナ化 Agent](?tab=containerizedagent) タブの説明に従ってオートディスカバリーを有効化してください。

### Docker オートディスカバリー

{{< tabs >}}
{{% tab "Agent" %}}

Docker コンテナに対してオートディスカバリーを有効にするには、[Agent の `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
listeners:
  - name: docker
config_providers:
  - name: docker
    polling: true
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

Docker コンテナに対してオートディスカバリーを自動的に有効にするには、`/var/run/docker.sock` をコンテナ化 Agent にマウントします。

{{% /tab %}}
{{< /tabs >}}

### Kubernetes オートディスカバリー

{{< tabs >}}
{{% tab "Agent" %}}

Kubernetes 内のコンテナに対してオートディスカバリーを有効にするには、[Agent の `datadog.yaml` 構成ファイル][1]に次の構成ブロックを追加します。

```yaml
listeners:
  - name: kubelet
config_providers:
  - name: kubelet
    polling: true
  # 以前の Docker ラベル構成テンプレートをサポートするために必要
  - name: docker
    polling: true
```

[1]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "Containerized Agent" %}}

Kubernetes 内のコンテナに対してオートディスカバリーを有効にするには、コンテナ化 Agent を起動するときに次の環境変数を追加します。

```
KUBERNETES=true
```

{{% /tab %}}
{{< /tabs >}}

**注**: Kubernetes ユーザーは、[CRI インテグレーション][11]と [CRI-O インテグレーション][12]のどちらも使用できます。

### ECS Fargate オートディスカバリー

{{< tabs >}}
{{% tab "Agent" %}}

ECS Fargate は、ホストでバイナリとして実行している Datadog Agent では監視できません。[コンテナ化 Agent](?tab=containerizedagent#ecs-fargate-autodiscovery) タブの説明を参照してください。

{{% /tab %}}
{{% tab "Containerized Agent" %}}

ECS Fargate 内のコンテナに対してオートディスカバリーを有効にするには、コンテナ化 Agent を起動するときに次の環境変数を追加します。

```
ECS_FARGATE=true
```

{{% /tab %}}
{{< /tabs >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/faq/agent-5-autodiscovery
[2]: /ja/agent/autodiscovery/integrations
[3]: /ja/agent/autodiscovery/ad_identifiers
[4]: /ja/agent/autodiscovery/template_variables
[5]: /ja/agent/autodiscovery/auto_conf
[6]: /ja/agent/autodiscovery/integrations/?tab=file#configuration
[7]: /ja/agent/autodiscovery/integrations/?tab=keyvaluestore#configuration
[8]: /ja/agent/autodiscovery/integrations/?tab=kubernetespodannotations#configuration
[9]: /ja/agent/autodiscovery/integrations/?tab=dockerlabel#configuration
[10]: /ja/agent/autodiscovery/template_variables
[11]: /ja/integrations/cri
[12]: /ja/integrations/crio