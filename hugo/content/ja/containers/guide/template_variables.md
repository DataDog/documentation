---
aliases:
- /ja/agent/autodiscovery/template_variables
- /ja/agent/faq/template_variables
- /ja/agent/guide/template_variables
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Kubernetes で Autodiscovery を使用してインテグレーションを構成する
- link: /containers/docker/integrations/
  tag: Documentation
  text: Docker で Autodiscovery を使用してインテグレーションを構成する
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: コンテナと該当するインテグレーションテンプレートとの対応
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent オートディスカバリーに含めるコンテナの管理
title: オートディスカバリーテンプレート変数
---

[Autodiscovery][1] を使用すると、コンテナのような動的リソースに対して静的な設定を行うことができます。

コンテナの値を動的に割り当てるために、以下のテンプレート変数を使用できます:

| テンプレート変数 | 説明 |
| --------------------------  | ---    |
| `"%%host%%"`                | コンテナのネットワーク IP。 |
| `"%%host_<ネットワーク名>%%"` | コンテナが複数のネットワークに接続されている場合、使用すべきネットワーク名を返します。 |
| `"%%port%%"`                | 最も大きい公開ポート (**数値で昇順にソート**)。<br>例えば、ポート `80`、`443`、`8443` を公開するコンテナの場合、`8443` が返されます。 |
| `"%%port_<数値_X>%%"`     | `<NUMBER_X>` ポート (**数値で昇順にソート**)。<br>例えば、コンテナがポート `80`、`443`、`8443` を公開している場合、`"%%port_0%%` はポート `80`、`"%%port_1%%"` は `443` を指します。 |
| `"%%port_<名前>%%"`     | `<NAME>` というポート名に関連付けられたポート。 |
| `"%%pid%%"`                 | `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>` で返されるコンテナのプロセス ID。 |
| `"%%hostname%%"`            | コンテナ設定の `hostname` 値。`"%%host%%"` 変数で信頼できる IP を取得できない場合 (例えば、[ECS awsvpc モード][2]など) のみ、この変数を使用してください。                                       |
| `"%%env_<環境変数>%%"`       | Agent プロセスから見える `$<ENV_VAR>` 環境変数の内容。  |
| `"%%kube_namespace%%"`      | Kubernetes ネームスペース。 |
| `"%%kube_pod_name%%"`       | Kubernetes Pod 名。  |
| `"%%kube_pod_uid%%"`        | Kubernetes Pod UID。   |

**フォールバック**:

* `"%%host%%"` テンプレート変数について: Agent が IP を検出できない場合、このテンプレート変数は `bridge` ネットワークの IP にフォールバックします。
* `"%%host_<NETWORK NAME>%%"` について: 指定した `<NETWORK_NAME>` が見つからない場合、このテンプレート変数は `"%%host%%"` と同様に動作します。

プラットフォームによっては、すべてのテンプレート変数がサポートされているわけではありません。

| プラットフォーム    | オートディスカバリー識別子  | ホスト | ポート | タグ | Pid | Env | ホスト名 | Kube ネームスペース | ポッド名 | ポッド UID |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/containers/autodiscovery
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html