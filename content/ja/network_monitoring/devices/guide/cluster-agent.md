---
title: クラスター Agent のある NDM
kind: ガイド
aliases:
  - /ja/network_performance_monitoring/devices/guide/cluster-agent/
further_reading:
  - link: /agent/cluster_agent
    tag: Documentation
    text: Kubernetes 対応の Cluster Agent
  - link: /agent/cluster_agent/clusterchecks
    tag: Documentation
    text: クラスターチェック
---
Kubernetes 環境では、Network Device Monitoring (NDM) のオートディスカバリー論理を[クラスターチェック][2]のソースとして使用するよう [Datadog Cluster Agent][1] (DCA) を構成することが可能です。

Agent のオートディスカバリーを DCA と組み合わせると非常にスケーラブルになり、大量のデバイスを監視することができます。

## セットアップ

### インストール

1. [DCA][1] がインストールされていることを確認します。

2. Datadog Helm リポジトリを追加して Datadog `helm-chart` を使用し、NDM オートディスカバリで DCA をセットアップします。

    ```
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

3. 次に、`datadog-monitoring` をインストールし、[Datadog API キー][3]を設定します。

    ```
    helm install datadog-monitoring --set datadog.apiKey=<YOUR_DD_API_KEY> -f cluster-agent-values.yaml datadog/datadog
    ```

### コンフィギュレーション

以下は、`cluster-agent-values.yaml` の例です。

{{< code-block lang="yaml" filename="cluster-agent-values.yaml" >}}
datadog:
  ## @param apiKey - 文字列 - 必須
  ## Agent を実行する前に、これを Datadog API キーに設定します。
  ## ref: https://app.datadoghq.com/account/settings#agent/kubernetes
  #
  apiKey: <DATADOG_API_KEY>

  ## @param clusterName - 文字列 - 任意
  ## 一意のクラスター名を設定すると、ホストおよびクラスターチェックを容易にスコーピングできます
  ## 一意の名前を設定します。ドット区切りのトークンで、トークンは以下の制限を満たし、かつ 40 文字以内である必要があります。
  ## * 英字小文字、数字、ハイフンのみ。
  ## * 文字が先頭であること。
  ## * 数字または文字が末尾であること。
  ## GKE のルールと比較すると、GKE では許可されないドットが許可されています。
  ## https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1beta1/projects.locations.clusters#Cluster.FIELDS.name
  #
  clusterName: my-snmp-cluster

  ## @param clusterChecks - オブジェクト - 必須
  ## cluster-agents および daemonset の両方でクラスターチェックを有効にします
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/clusterchecks/
  ## Kube サービスのアノテーションを介したオートディスカバリーは自動的に有効です
  #
  clusterChecks:
    enabled: true

  ## @param タグ  - key:value 要素のリスト - 任意
  ## この Agent により収集されるすべてのメトリクス、イベント、サービスチェックにアタッチされるタグのリスト。
  ##
  ## タグ付けに関する詳細: https://docs.datadoghq.com/tagging/
  #
  tags:
    - 'env:test-snmp-cluster-agent'

## @param clusterAgent - オブジェクト - 必須
## これが、クラスターワイドのメトリクスをよりクリーンに扱い、懸念を分離して
## RBAC を向上し、外部メトリクス API を実装する Datadog Cluster Agent の実装で、
## Datadog のメトリクスに基づき HPA をオートスケールできます
## ref: https://docs.datadoghq.com/agent/kubernetes/cluster/
#
clusterAgent:
  ## @param enabled - boolean - 必須
  ## Datadog Cluster Agent を有効にするには、これを true に設定します
  #
  enabled: true

  ## @param confd - オブジェクトのリスト - 任意
  ## 追加のクラスターチェックコンフィギュレーションを提供します
  ## 各キーは /conf.d のファイルになります
  ## ref: https://docs.datadoghq.com/agent/autodiscovery/
  #
  confd:
     # 静的チェック
     http_check.yaml: |-
       cluster_check: true
       instances:
         - name: 'Check Example Site1'
           url: http://example.net
         - name: 'Check Example Site2'
           url: http://example.net
         - name: 'Check Example Site3'
           url: http://example.net
     # `snmp_listener` がインスタンスのコンフィグを作成するために必要なオートディスカバリーのテンプレート
     snmp.yaml: |-
      cluster_check: true
      ad_identifiers:
        - snmp
      init_config:
      instances:
        -
          ## @param ip_address - 文字列 - 任意
          ## 監視するデバイスの IP アドレス。
          #
          ip_address: "%%host%%"

          ## @param port - 整数 - 任意 - default: 161
          ## デフォルトの SNMP ポート。
          #
          port: "%%port%%"

          ## @param snmp_version - 整数 - 任意 - デフォルト: 2
          ## SNMP v1 を使用する場合は snmp_version を 1 に設定 (必須)
          ## SNMP v3 を使用する場合は snmp_version を 3 に設定 (必須)
          #
          snmp_version: "%%extra_version%%"

          ## @param timeout - 整数 - 任意 - デフォルト: 5
          ## タイムアウト前の秒数。
          #
          timeout: "%%extra_timeout%%"

          ## @param retries - 整数 - 任意 - デフォルト: 5
          ## 失敗前の試行回数。
          #
          retries: "%%extra_retries%%"

          ## @param community_string - 文字列 - 任意
          ## SNMP v1 & v2 にのみ有用。
          #
          community_string: "%%extra_community%%"

          ## @param user - 文字列 - 任意
          ## SNMP デバイスに接続する USERNAME。
          #
          user: "%%extra_user%%"

          ## @param authKey - 文字列 - 任意
          ## 認証タイプに使用する認証キー。
          #
          authKey: "%%extra_auth_key%%"

          ## @param authProtocol - 文字列 - 任意
          ## SNMP デバイスに接続する際に使用する認証タイプ。
          ## 以下のいずれか: MD5、SHA、SHA224、SHA256、SHA384、SHA512。
          ## `authKey` が指定されている場合はデフォルトで MD5。
          #
          authProtocol: "%%extra_auth_protocol%%"

          ## @param privKey - 文字列 - 任意
          ## プライバシータイプに使用するプライバシータイプキー。
          #
          privKey: "%%extra_priv_key%%"

          ## @param privProtocol - 文字列 - 任意
          ## SNMP デバイスに接続する際に使用するプライバシータイプ。
          ## 以下のいずれか: DES、3DES、AES、AES192、AES256、AES192C、AES256C。
          ## `privKey` が指定されている場合はデフォルトで DES。
          #
          privProtocol: "%%extra_priv_protocol%%"

          ## @param context_engine_id - 文字列 - 任意
          ## コンテキストエンジンの ID; 通常は不要。
          ## (任意の SNMP v3 のみパラメーター)
          #
          context_engine_id: "%%extra_context_engine_id%%"

          ## @param context_name - 文字列 - 任意
          ## コンテキストの名前 (任意の SNMP v3 のみパラメーター)
          #
          context_name: "%%extra_context_name%%"

          ## @param tags - key:value 要素のリスト - 任意
          ## このインテグレーションにより送信されるすべてのメトリクス、イベント、サービスチェックに会った知されるタグのリスト。
          ##
          ## タグ付けに関する詳細: https://docs.datadoghq.com/tagging/
          #
          tags:
            # デバイスが属するオートディスカバリーのサブネット。
            # Agent のオートディスカバリーによりサブネット名をパスするために使用。
            - "autodiscovery_subnet:%%extra_autodiscovery_subnet%%"


  ## @param datadog-cluster.yaml - オブジェクト - 任意
  ## Datadog Cluster Agent のコンフィグにカスタムコンテンツを指定します (datadog-cluster.yaml)。
  #
  datadog_cluster_yaml:
    listeners:
      - name: snmp

    # すべての `snmp_listener` コンフィグはこちらを参照: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
    snmp_listener:
      workers: 2
      discovery_interval: 10
      configs:
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: cisco_icm
        - network: 192.168.1.16/29
          version: 2
          port: 1161
          community: f5
{{< /code-block >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/agent/cluster_agent
[2]: /ja/agent/cluster_agent/clusterchecks
[3]: https://app.datadoghq.com/account/settings#api