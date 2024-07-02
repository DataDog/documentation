---
title: Autodiscovery Template Variables
aliases:
 - /agent/autodiscovery/template_variables
 - /agent/faq/template_variables
 - /agent/guide/template_variables
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Create and load an Autodiscovery integration template
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: Match a container with the corresponding integration template
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Manage which container to include in the Agent Autodiscovery
---

コンテナの値を動的に割り当てるために、オートディスカバリーを構成するときに次のテンプレート変数を使用します。

| テンプレート変数           | 説明                                                                                                                                                                                                 |
| --------------------------  | ---                                                                                                                                                                                                         |
| `"%%host%%"`                | ネットワークを自動検出します。単一ネットワークコンテナの場合は、対応する IP を返します。                                                                                                                   |
| `"%%host_<ネットワーク名>%%"` | 複数のネットワークにアタッチするときに使用するネットワーク名を指定します。                                                                                                                                      |
| `"%%port%%"`                | 公開ポートを**数値として昇順にソート**した場合に最大のポートが使用されます。<br>たとえば、ポート `80`、`443`、`8443` を公開しているコンテナの場合は、`8443` が返されます。                                    |
| `"%%port_<数値_X>%%"`     | ポートを数値として昇順にソートした場合に `<数値_X>` ポートが使用されます。<br>たとえば、ポート `80`、`443`、`8443` を公開しているコンテナの場合は、`"%%port_0%%` はポート `80`、`"%%port_1%%"` は `443` を表示します。 |
| `"%%port_<名前>%%"`     | ポート名 `<名前>` に関連付けられたポートを使用します。                                                                                                                                                           |
| `"%%pid%%"`                 | `docker inspect --format '{{.State.Pid}}' <コンテナ名>` から返されたコンテナプロセス ID を取得します。                                                                                              |
| `"%%hostname%%"`            | コンテナ構成から `hostname` 値を取得します。`"%%host%%"` 変数で信頼性のある IP を取得できない場合にのみ使用してください ([ECS awsvpc モード][1]など)。                                       |
| `"%%env_<環境変数>%%"`       | **Agent プロセスから参照される** `$<環境変数>` 環境変数の内容を使用します。                                                                                                                |
| `"%%kube_namespace%%"`      | Kubernetes のネームスペースを自動検出する |
| `"%%kube_pod_name%%"`       | Kubernetes のポッド名を自動検出する  |
| `"%%kube_pod_uid%%"`        | Kubernetes のポッド UID を自動検出する   |

**フォールバック**:

* `"%%host%%"` テンプレート変数の場合: Agent がそれを見つけられない場合、このテンプレート変数は `bridge` ネットワーク IP にフォールバックします。
* `"%%host_<ネットワーク名>%%"` の場合: 指定された `<ネットワーク名>` が見つからなかった場合、このテンプレート変数は `"%%host%%"` のように動作します。

プラットフォームによっては、すべてのテンプレート変数がサポートされているわけではありません。

| プラットフォーム    | オートディスカバリー識別子  | ホスト | ポート | タグ | Pid | Env | ホスト名 | Kube ネームスペース | ポッド名 | ポッド UID |
| ----------- | ---                         | ---  | ---  | --- | --- | --- | ---      | ---            | ---      | ---     |
| Docker      | ✅                          | ✅   | ✅   | ✅  | ✅  | ✅  | ✅      | ❌      | ❌      | ❌      |
| ECS Fargate | ✅                          | ✅   | ❌   | ✅  | ❌  | ✅  | ❌      | ❌      | ❌      | ❌      |
| Kubernetes  | ✅                          | ✅   | ✅   | ✅  | ❌  | ✅  | ❌      | ✅      | ✅      | ✅      |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-networking.html
