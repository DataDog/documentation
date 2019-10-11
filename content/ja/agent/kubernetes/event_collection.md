---
title: Kubernetes イベント収集
kind: documentation
aliases:
  - /ja/integrations/faq/gathering-kubernetes-events
---
Agent 5 と同様に、Agent 6 は Kubernetes API サーバーからイベントを収集できます。

`datadog.yaml` ファイルで、`collect_kubernetes_events` 変数を `true` に設定します。起動時に解決される環境変数 `DD_COLLECT_KUBERNETES_EVENTS` を使用して、これを行うこともできます。

注: この機能を有効にするには、Agent にいくつかの権限を付与する必要があります。[RBAC][1] のセクションを参照してください。

[ConfigMap][2] を使用して、`event.tokenKey` と `event.tokenTimestamp` を格納できます。ConfigMap は、Agent も含めて、リソースと同じネームスペースにデプロイする必要があります。リソースのネームスペースは、`DD_KUBE_RESOURCES_NAMESPACE` を使用して構成できます。

`kubectl create configmap datadogtoken --from-literal="event.tokenKey"="0"` を実行できます。`manifests/datadog_configmap.yaml` にあるサンプルを使用することもできます。

ConfigMap の使用時に、([リーダー選出][3]によって) イベント収集を担当する Agent が停止した場合は、次に選出されたリーダーが ConfigMap を使用して最後に取得されたイベントを特定します。これにより、収集したイベントの重複を避けると共に、API サーバーの負荷を軽減します。

## リーダー選出

Agent 6 は、Kubernetes イベントコレクターと Kubernetes クラスター関連チェック (Control Plane サービスチェック) 用に、組み込みのリーダー選出オプションをサポートしています。

この機能は `Endpoints` に依存します。`DD_LEADER_ELECTION` 環境変数を `true` に設定することで、リーダー選出を有効にできます。デプロイの前に、Agent に一連のアクションを許可しておく必要があります。詳細については、[RBAC][1] のセクションを参照してください。これらの RBAC エンティティは、オプションを設定する前に作成する**必要がある**ことに注意してください。

Agent は、Kubernetes を通して Datadog DaemonSet のメンバーの中からリーダー選出を行うことで互いに調整し、いつの時点でも 1 つのリーダー Agent インスタンスだけがイベントを収集するようにします。

この機能は、デフォルトでは無効です。イベント収集を有効にするとこの機能も有効になり、イベント収集の重複や API サーバーへの負荷を避けることができます。

`leaderLeaseDuration` は、1 つのリーダーが選出された状態を維持する時間です。この時間はデフォルトでは 60 秒で、30 秒より長くする必要があります。この時間が長いほど、Agent が API サーバーにリクエストを行う頻度が減ります。ただし、リーダーが停止した場合には、リースの有効期限が切れて新しいリーダーに代わるまでに、いくつかのイベントが失われる可能性が高まります。
`leaderLeaseDuration` は、環境変数 `DD_LEADER_LEASE_DURATION` を使用して構成できます。

[1]: /ja/agent/kubernetes#rbac
[2]: /ja/agent/kubernetes/integrations#configmap
[3]: /ja/agent/kubernetes/event_collection#leader-election