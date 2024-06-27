---
aliases:
- /ja/logs/log_collection/kubernetes_audit_logs
categories:
- ログの収集
- コンテナ
- オーケストレーション
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_audit_logs.md
description: Kubernetes クラスター内で起きるすべてのことを追跡
doc_link: /integrations/kubernetes_audit_logs/
further_reading:
- link: logs/
  tag: ドキュメント
  text: ログ管理
- link: https://www.datadoghq.com/blog/key-kubernetes-audit-logs-for-monitoring-cluster-security/
  tag: ブログ
  text: クラスターセキュリティを監視するための主要な Kubernetes 監査ログ
has_logo: true
integration_id: kubernetes-audit-logs
integration_title: Kubernetes 監査ログ
is_public: true
kind: インテグレーション
name: kubernetes_audit_logs
public_title: Datadog-Kubernetes 監査ログ
short_description: Kubernetes クラスターの内部を追跡
supported_os:
- linux
- mac_os
- windows
title: Kubernetes 監査ログ
---

## 概要

[Kubernetes 監査ログ][1]を収集すると、任意のサービスで作成される Kubernetes API へのあらゆる呼び出しをはじめ、Kubernetes クラスター内で起こるすべてのことを追跡できます。たとえば、Control Plane（ビルトインコントローラ、スケジューラ）、ノードのデーモン（kubelet、kube-proxy、その他）、クラスターサービス（クラスターのオートスケーラーなど）、ユーザーが作成する `kubectl` リクエスト、さらに Kubernetes API 自体も追跡できます。

Kubernetes 監査ログインテグレーションを使用すると、アクセス許可の問題を診断したり、更新すべき RBAC ポリシーを特定したり、クラスター全体に影響を与えるほどレスポンスの遅い API リクエストを追跡したりできます。これらのトピックについて詳しくは、[KubeCon 2019 での Datadog による講演を参照してください][2]。

## セットアップ

このインテグレーションは **Agent 6.0 以上**で使用可能です。

### コンフィギュレーション

Kubernetes 監査ログの設定について詳しくは、[Kubernetes Auditing][3] を参照してください。

Kubernetes で監査ログを有効にするには

1. Kubernetes の監査ログはデフォルトで無効になっています。監査ログを API サーバーコンフィギュレーションで有効にするには、監査ポリシーファイルのパスを以下のように指定します。

    ```conf
    kube-apiserver
      [...]
      --audit-log-path=/var/log/kubernetes/apiserver/audit.log
      --audit-policy-file=/etc/kubernetes/audit-policies/policy.yaml
    ```

2. ポリシーファイルを `/etc/kubernetes/audit-policies/policy.yaml` に作成し、監査ログに取得する API リクエストのタイプを指定します。監査ポリシー規則は上から順に評価されます。API サーバーは操作やリソースのタイプ別に規則を探し、一致する最初の規則に従います。監査ポリシーの例を以下に示します。

```yaml
# /etc/kubernetes/audit-policies/policy.yaml

apiVersion: audit.k8s.io/v1
kind: Policy
rules:
    # 以下のリクエストのログは作成しない
    - level: None
      nonResourceURLs:
          - '/healthz*'
          - '/logs'
          - '/metrics'
          - '/swagger*'
          - '/version'

    # 仕様やステータスにトークンを含めないようにレベルを Metadata に制限する
    - level: Metadata
      omitStages:
          - RequestReceived
      resources:
          - group: authentication.k8s.io
            resources:
                - tokenreviews

    # 認証委任の監査を拡張
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          - group: authorization.k8s.io
            resources:
                - subjectaccessreviews

    # ポッド変更のログを RequestResponse レベルで作成
    - level: RequestResponse
      omitStages:
          - RequestReceived
      resources:
          # コア API グループ; 必要に応じてサードパーティまたは自作の API サービスを追加
          - group: ''
            resources: ['pods']
            verbs: ['create', 'patch', 'update', 'delete']

    # その他すべてのログを Metadata レベルで作成
    - level: Metadata
      omitStages:
          - RequestReceived
```

このポリシーの例では、特定のタイプの操作（更新、パッチ、作成、削除）によってクラスターが変更された場合に、最高レベルの詳細なログが API サーバーによって作成されます。また、`subjectaccessreviews` リソースへのリクエストも最高レベルで追跡され、認証委任の問題を解決するために役立てることができます。

機密性の高いデータ（`tokenreviews` リソースなど）を含むエンドポイントに対しては、ログの詳細レベルを `Metadata` まで下げることをお勧めします。これにより、`RequestReceived` のステージもログから省略されます。

最後のセクションでは、先行する規則で明示されていないすべてのことに対し、`Metadata` レベルでログを作成するようにポリシーが構成されます。監査ログがあまりに詳細な場合は、重要度の低いアクションや動詞（list、watch、get などクラスターの状態が変化しない操作）を除外することもできます。

### ログの収集

1. Kubernetes 環境に [Agent をインストール][1]します。
2. ログの収集はデフォルトで無効になっています。[DaemonSet][4] の `env` セクションでこれを有効にします。

    ```yaml
    env:
        # (...)
        - name: DD_LOGS_ENABLED
          value: 'true'
    ```

3. 監査ログのディレクトリと、Agent が使用するディレクトリをマウントし、ポインタを格納して、最後に送信されたログをそのファイルから特定できるようにします。それには、daemonset の `volumeMounts` セクションに以下を追加します。

    ```yaml
     # (...)
        volumeMounts:
          # (...)
          - name: pointdir
            mountPath: /opt/datadog-agent/run
          - name: auditdir
            mountPath: /var/log/kubernetes/apiserver
          - name: dd-agent-config
            mountPath: /conf.d/kubernetes_audit.d
      # (...)
      volumes:
        # (...)
        - hostPath:
            path: /opt/datadog-agent/run
          name: pointdir
        - hostPath:
            path: /var/log/kubernetes/apiserver
          name: auditdir
        - name: dd-agent-config
            configMap:
              name: dd-agent-config
              items:
                - key: kubernetes-audit-log
                  path: conf.yaml
      # (...)
    ```

      これにより、Agent が監査ログファイルからログを収集するよう構成するための `conf.d` フォルダもマウントされます。

4. ConfigMap を使用し、そのファイルからログを収集するように Agent を構成します。

    ```yaml
    kind: ConfigMap
    apiVersion: v1
    metadata:
        name: dd-agent-config
        namespace: default
    data:
        kubernetes-audit-log: |-
            logs:
              - type: file
                path: /var/log/kubernetes/apiserver/audit.log
                source: kubernetes.audit
                service: audit
    ```

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `Logs` を探します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/#installation
[2]: https://www.youtube.com/watch?v=raJRLmGb9Is&t=1s
[3]: https://kubernetes.io/docs/tasks/debug-application-cluster/audit/
[4]: /ja/agent/kubernetes/log/
[5]: /ja/agent/guide/agent-commands/#agent-status-and-information
[6]: /ja/help/