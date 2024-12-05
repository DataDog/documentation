---
aliases:
- /ja/agent/autodiscovery/template_variables
- /ja/agent/faq/template_variables
- /ja/agent/guide/template_variables
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Kubernetes
- link: /containers/docker/integrations/
  tag: Documentation
  text: Configure integrations with Autodiscovery on Docker
- link: /agent/guide/ad_identifiers/
  tag: Documentation
  text: コンテナと該当するインテグレーションテンプレートとの対応
- link: /agent/guide/autodiscovery-management/
  tag: ドキュメント
  text: Agent オートディスカバリーに含めるコンテナの管理
title: オートディスカバリーテンプレート変数
---

[Autodiscovery][1] enables you to set static configurations for dynamic resources like containers.

You can use the following template variables to dynamically assign your container's values:

| テンプレート変数 | 説明 |
| --------------------------  | ---    |
| `"%%host%%"`                | The container's network IP. |
| `"%%host_<ネットワーク名>%%"` | When the container is attached to multiple networks, returns the network name to use. |
| `"%%port%%"`                | The highest exposed port **sorted numerically and in ascending order**.<br>For example, returns `8443` for a container that exposes ports `80`, `443`, and `8443`. |
| `"%%port_<数値_X>%%"`     | The `<NUMBER_X>` port **sorted numerically and in ascending order**.<br>For example, if a container exposes ports `80`, `443`, and `8443`, `"%%port_0%%` refers to port `80`, and `"%%port_1%%"` refers to `443`. |
| `"%%port_<名前>%%"`     | The port associated with the port name `<NAME>`. |
| `"%%pid%%"`                 | The container process ID, as returned by `docker inspect --format '{{.State.Pid}}' <CONTAINER_NAME>`. |
| `"%%hostname%%"`            | The `hostname` value from the container configuration. Only use this variable if the `"%%host%%"` variable cannot fetch a reliable IP (for example, in [ECS awsvpc mode][2]).                                       |
| `"%%env_<環境変数>%%"`       | The contents of the `$<ENV_VAR>` environment variable **as seen by the Agent process**.  |
| `"%%kube_namespace%%"`      | The Kubernetes namespace. |
| `"%%kube_pod_name%%"`       | The Kubernetes pod name.  |
| `"%%kube_pod_uid%%"`        | The Kubernetes pod UID.   |

**フォールバック**:

* For the `"%%host%%"` template variable: in case the Agent is not able to find the IP, this template variable falls back to the `bridge` network IP.
* For the `"%%host_<NETWORK NAME>%%"`: if the `<NETWORK_NAME>` specified is not found, this template variable behaves like `"%%host%%"`.

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