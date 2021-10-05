---
title: オペレーターコンフィギュレーション
kind: faq
further_reading:
  - link: agent/kubernetes/log
    tag: Documentation
    text: Datadog と Kubernetes
---
## すべてのコンフィギュレーションオプション

次の表は `DatadogAgent` リソースの構成可能なパラメーターの一覧です。
たとえば、`agent.image.name`  の値を設定する場合、
`DatadogAgent` リソースは次のようになります。

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
```

`agent.additionalAnnotations`
: `AdditionalAnnotations` は、Agent ポッドに追加されるアノテーションを提供します。

`agent.additionalLabels`
: `AdditionalLabels` は、クラスターチェックランナーポッドに追加されるラベルを提供します。

`agent.apm.enabled`
: これを有効にすると、ポート 8126 で APM とトレースが有効になります。[Datadog Docker のドキュメント][1]を参照してください。

`agent.apm.env`
: Datadog Agent は、多くの[環境変数][2]をサポートしています。

`agent.apm.hostPort`
: ホストで公開するポートの数。指定する場合、これは有効なポート番号 0 < x < 65536 である必要があります。`HostNetwork` を指定する場合、これは `ContainerPort` と一致する必要があります。ほとんどのコンテナはこれを必要としません。

`agent.apm.resources.limits`
: 制限は、許可されるコンピューティングリソースの最大量を表します。詳細については、[Kubernetes のドキュメント][3]を参照してください。

`agent.apm.resources.requests`
: `Requests` は、必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。詳細については、[Kubernetes のドキュメント][3]を参照してください。

`agent.config.checksd.configMapName`
: ディレクトリのマウントに使用される ConfigMap の名前。

`agent.config.collectEvents`
: Kubernetes API からのイベント収集の開始を有効にします。[イベント収集のドキュメントを参照してください][4]。

`agent.config.confd.configMapName`
: ディレクトリのマウントに使用される ConfigMap の名前。

`agent.config.criSocket.criSocketPath`
: コンテナランタイムソケットへのパス (Docker と異なる場合)。これは、Agent 6.6.0 以降でサポートされています。

`agent.config.criSocket.dockerSocketPath`
: Docker ランタイムソケットへのパス。

`agent.config.ddUrl`
: Agent データを送信する Datadog インテークサーバーのホスト。Agent がカスタム URLにデータを送信する必要がある場合にのみ、このオプションを設定してください。`site` で定義されたサイト設定をオーバーライドします。

`agent.config.dogstatsd.dogstatsdOriginDetection`
: コンテナのタグ付けの発信点検出を有効にします。[Unix ソケット発信点検出ドキュメント][5]を参照してください。

`agent.config.dogstatsd.useDogStatsDSocketVolume`
: Unix ドメインソケットを介して DogStatsD を有効にします。[Unix ソケットのドキュメントを参照してください][6]。

`agent.config.env`
: Datadog Agent は、多くの[環境変数][2]をサポートしています。

`agent.config.hostPort`
: ホストで公開するポートの数。指定する場合、これは有効なポート番号 0 < x < 65536 である必要があります。`HostNetwork` を指定する場合、これは `ContainerPort` と一致する必要があります。ほとんどのコンテナはこれを必要としません。

`agent.config.leaderElection`
: イベント収集のリーダー選出メカニズムを有効にします。

`agent.config.logLevel`
: ロギングの詳細度を設定します。有効なログレベルは、`trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` です。

`agent.config.podAnnotationsAsTags`
: Kubernetes アノテーションの Datadog タグへのマッピングを提供します。`<KUBERNETES_ANNOTATIONS>: <DATADOG_TAG_KEY>`  

`agent.config.podLabelsAsTags`
: Kubernetes ラベルの Datadog タグへのマッピングを提供します。`<KUBERNETES_LABEL>: <DATADOG_TAG_KEY>`      

`agent.config.resources.limits`
: 許可されるコンピューティングリソースの最大量を表します。[Kubernetes のドキュメントを参照してください][3]。

`agent.config.resources.requests`
: 必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。[Kubernetes のドキュメント][3]を参照してください。

`agent.config.securityContext.allowPrivilegeEscalation`
: プロセスがその親プロセスよりも多くの特権を取得できるかどうかを制御します。このブール値は、コンテナプロセスに `no_new_privs` フラグを設定するかどうかを直接制御します。`AllowPrivilegeEscalation` は、コンテナが両方とも `Privileged` として実行され、`CAP_SYS_ADMIN` を持っている場合に常に true になります。

`agent.config.securityContext.capabilities.add`
: 機能追加。

`agent.config.securityContext.capabilities.drop`
: 機能削除。

`agent.config.securityContext.privileged`
: コンテナを特権モードで実行します。特権コンテナ内のプロセスは、基本的にホスト上のルートと同等です。デフォルトは `false` です。

`agent.config.securityContext.procMount`
: `procMount` は、コンテナに使用する proc マウントのタイプを示します。デフォルトは `DefaultProcMount` で、読み取り専用パスとマスクされたパスにコンテナランタイムのデフォルトを使用します。これには、`ProcMountType` 機能フラグを有効にする必要があります。

`agent.config.securityContext.readOnlyRootFilesystem`
: このコンテナに読み取り専用のルートファイルシステムがあるかどうか。デフォルトは `false` です。

`agent.config.securityContext.runAsGroup`
: コンテナプロセスのエントリポイントを実行するための GID。設定されていない場合、実行時のデフォルトを使用します。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.config.securityContext.runAsNonRoot`
: コンテナをルート以外のユーザーとして実行する必要があることを示します。true の場合、Kubelet は実行時にイメージを検証して、イメージが UID 0 (ルート) として実行されないことを確認し、実行される場合はコンテナの開始に失敗します。未設定または false の場合、そのような検証は実行されません。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.config.securityContext.runAsUser`
: コンテナプロセスのエントリポイントを実行するための UID。指定されていない場合、デフォルトは画像メタデータで指定されたユーザーです。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.config.securityContext.seLinuxOptions.level`
: コンテナに適用される SELinux レベルのラベル。

`agent.config.securityContext.seLinuxOptions.role`
: コンテナに適用される SELinux ロールラベル。

`agent.config.securityContext.seLinuxOptions.type`
: コンテナに適用される SELinux タイプラベル。

`agent.config.securityContext.seLinuxOptions.user`
: コンテナに適用される SELinux ユーザーラベル。

`agent.config.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` は、[GMSA アドミッション Webhook][7] が `GMSACredentialSpecName` フィールドで指定された GMSA 資格情報仕様の内容をインライン化する場所です。このフィールドはアルファレベルで、WindowsGMSA 機能フラグを有効にするサーバーによってのみ尊重されます。

`agent.config.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` は、使用する GMSA 資格情報仕様の名前です。このフィールドはアルファレベルで、WindowsGMSA 機能フラグを有効にするサーバーによってのみ尊重されます。

`agent.config.securityContext.windowsOptions.runAsUserName`
: コンテナプロセスのエントリポイントを実行するための Windows の `UserName`。指定されていない場合、デフォルトは画像メタデータで指定されたユーザーです。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。このフィールドはベータレベルで、`WindowsRunAsUserName` 機能フラグで無効にできます。     

`agent.config.tags`
: この Agent により収集されるすべてのメトリクス、イベント、サービスチェックにアタッチされるタグのリスト。[タグ付けドキュメント][8]を参照してください。

`agent.config.tolerations`
: 指定されている場合、Agent ポッドの許容範囲。

`agent.config.volumeMounts`
: Datadog Agent コンテナに追加のボリュームマウントを指定します。

`agent.config.volumes`
: Datadog Agent コンテナに追加のボリュームを指定します。

`agent.customConfig.configData`
: コンフィギュレーションファイルの内容に対応します。

`agent.customConfig.configMap.fileKey`
: コンフィギュレーションファイルの内容を格納するために ConfigMap.Data で使用されるキーに対応します。

`agent.customConfig.configMap.name`
: ConfigMap に名前を付けます。

`agent.daemonsetName`
: 作成または移行元の DaemonSet の名前。

`agent.deploymentStrategy.canary.duration`
: 

`agent.deploymentStrategy.canary.paused`
: 

`agent.deploymentStrategy.canary.replicas`
: 

`agent.deploymentStrategy.reconcileFrequency`
: ExtendDaemonSet の調整頻度。

`agent.deploymentStrategy.rollingUpdate.maxParallelPodCreation`
: 並行して作成されるポッドの最大数。デフォルト値は 250 です。

`agent.deploymentStrategy.rollingUpdate.maxPodSchedulerFailure`
: `maxPodSchedulerFailure` は、スケジューラーの障害 (リソースの制約) が原因でノードでスケジュールされたポッドの最大数です。値は、絶対数 (例: 5) または更新開始時の DaemonSet ポッドの総数のパーセンテージ (例: 10%) にすることができます。絶対値。

`agent.deploymentStrategy.rollingUpdate.maxUnavailable`
: 更新中に使用できなくなる可能性のある DaemonSet ポッドの最大数。値は、絶対数 (例: 5) または更新開始時の DaemonSet ポッドの総数のパーセンテージ (例: 10%) にすることができます。絶対数は、切り上げによるパーセンテージから計算されます。これを 0 にすることはできません。デフォルト値は 1 です。

`agent.deploymentStrategy.rollingUpdate.slowStartAdditiveIncrease`
: 値は、絶対数 (例: 5) または更新開始時の DaemonSet ポッドの総数のパーセンテージ (例: 10%) にすることができます。デフォルト値は 5 です。

`agent.deploymentStrategy.rollingUpdate.slowStartIntervalDuration`
: 期間間隔。デフォルト値は 1 分です。

`agent.deploymentStrategy.updateStrategyType`
: DaemonSet に使用される更新戦略。

`agent.dnsConfig.nameservers`
: DNS ネームサーバーの IP アドレスのリスト。これは、`dnsPolicy` から生成されたベースネームサーバーに追加されます。重複するネームサーバーは削除されます。

`agent.dnsConfig.options`
: DNS リゾルバーオプションのリスト。これらは、`dnsPolicy` から生成された基本オプションとマージされます。重複したエントリは削除されます。`options` で指定された解決オプションは、ベースの `dnsPolicy` に表示されるものをオーバーライドします。

`agent.dnsConfig.searches`
: ホスト名ルックアップ用の DNS 検索ドメインのリスト。これは、`dnsPolicy` から生成された基本検索パスに追加されます。重複する検索パスは削除されます。

`agent.dnsPolicy`
: ポッドの DNS ポリシーを設定します。デフォルトは `ClusterFirst` です。有効な値は、`ClusterFirstWithHostNet`、`ClusterFirst`、`Default`、または `None` です。`dnsConfig` で指定された DNS パラメータは、`dnsPolicy` で選択されたポリシーとマージされます。DNS オプションを `hostNetwork` と一緒に設定するには、`dnsPolicy` を `ClusterFirstWithHostNet` に明示的に指定する必要があります。

`agent.env`
: すべての Datadog Agent の環境変数。[Docker 環境変数のドキュメントを参照してください][2]。

`agent.hostNetwork`
: このポッドに要求されたホストネットワーク。ホストのネットワークネームスペースを使用します。このオプションを設定する場合は、使用するポートを指定する必要があります。デフォルトは `false` です。

`agent.hostPID`
: ホストの PID ネームスペースを使用します。オプション: デフォルトは `false` です。

`agent.image.name`
: 使用するイメージを定義します。Datadog Agent 6 には `gcr.io/datadoghq/agent:latest` を使用します。スタンドアロンの Datadog Agent DogStatsD に `datadog/dogstatsd:latest` を使用します。Datadog Cluster Agent には `gcr.io/datadoghq/cluster-agent:latest` を使用します。

`agent.image.pullPolicy`
: Kubernetes プルポリシー。`Always`、`Never`、または `IfNotPresent` を使用します。

`agent.image.pullSecrets`
: Docker レジストリの資格情報を指定します。[Kubernetes のドキュメントを参照してください][9]。

`agent.log.containerCollectUsingFiles`
: コンテナランタイム API を使用する代わりに、`/var/log/pods` 内のファイルからログを収集します。これは通常、ログを収集する最も効率的な方法です。[ログ収集][10]のドキュメントを参照してください。デフォルト: `true`。

`agent.log.containerLogsPath`
: コンテナログパスからのログ収集を許可します。Docker ランタイムを使用しない場合は、別のパスに設定してください。[Kubernetes のドキュメント][11]を参照してください。デフォルトは `/var/lib/docker/containers` です。

`agent.log.enabled`
: これを有効にすると、Datadog Agent のログ収集がアクティブになります。[ログ収集][10]のドキュメントを参照してください。

`agent.log.logsConfigContainerCollectAll`
: これを有効にすると、すべてのコンテナのログ収集が可能になります。[ログ収集][10]のドキュメントを参照してください。

`agent.log.openFilesLimit`
: Datadog Agent が調整するログファイルの最大数を設定します。この制限を増やすと、Agent のリソース消費が増える可能性があります。[ログ収集][10]のドキュメントを参照してください。デフォルトは 100 です。

`agent.log.podLogsPath`
: ポッドログパスからのログ収集を許可するには、これを設定します。デフォルトは `/var/log/pods` です。

`agent.log.tempStoragePath`
: このパス (常にホストからマウントされます) は、処理されたログファイルに関する情報を格納するために Datadog Agent によって使用されます。Datadog Agent を再起動すると、適切なオフセットからログファイルのテーリングを開始できます。デフォルトは `/var/lib/datadog-agent/logs` です。

`agent.priorityClassName`
: 指定されている場合、ポッドの優先度を示します。`system-node-critical` と `system-cluster-critical` は、最高の優先度を示す 2 つの特別なキーワードで、前者が最高の優先順位です。その他の名前は、その名前で `PriorityClass` オブジェクトを作成して定義する必要があります。指定しない場合、ポッドの優先度はデフォルトになり、デフォルトがない場合はゼロになります。

`agent.process.enabled`
: これを有効にすると、ライブプロセス監視がアクティブになります。 注: `/etc/passwd` は、ユーザー名を解決できるように自動的にマウントされます。[プロセスのドキュメントを参照してください][12]。

`agent.process.env`
: Datadog Agent は、多くの[環境変数][3]をサポートしています。

`agent.process.resources.limits`
: 許可されるコンピューティングリソースの最大量を表します。[Kubernetes のドキュメント][3]を参照してください。

`agent.process.resources.requests`
: 必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。[Kubernetes のドキュメント][3]を参照してください。

`agent.rbac.create`
: RBAC リソースの作成を構成するために使用されます。

`agent.rbac.serviceAccountName`
: 使用するサービスアカウント名を設定するために使用されます。フィールド `Create` が true の場合は無視されます。

`agent.systemProbe.appArmorProfileName`
: AppArmor プロファイルを指定します。

`agent.systemProbe.bpfDebugEnabled`
: カーネルデバッグのログ。

`agent.systemProbe.conntrackEnabled`
: システムプローブ Agent が netlink/conntrack サブシステムに接続して、接続データに NAT 情報を追加できるようにします。[Conntrack のドキュメントを参照してください][13]。

`agent.systemProbe.debugPort`
: システムプローブ Agent の pprof と expvar を公開するポートを指定します。

`agent.systemProbe.enabled`
: これを有効にすると、ライブプロセス監視がアクティブになります。 注: `/etc/passwd` は、ユーザー名を解決できるように自動的にマウントされます。[プロセスのドキュメントを参照してください][12]。

`agent.systemProbe.env`
: Datadog SystemProbe は、多くの[環境変数][2]をサポートしています。

`agent.systemProbe.resources.limits`
: 許可されるコンピューティングリソースの最大量を表します。[Kubernetes のドキュメント][3]を参照してください。

`agent.systemProbe.resources.requests`
: 必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。[Kubernetes のドキュメント][3]を参照してください。

`agent.systemProbe.secCompCustomProfileConfigMap`
: カスタム SecComp プロファイルを含む既存の ConfigMap を指定します。

`agent.systemProbe.secCompProfileName`
: seccomp プロファイルを指定します。

`agent.systemProbe.secCompRootPath`
: seccomp プロファイルのルートディレクトリを指定します。

`agent.systemProbe.securityContext.allowPrivilegeEscalation`
: プロセスがその親プロセスよりも多くの特権を取得できるかどうかを制御します。このブール値は、コンテナプロセスに `no_new_privs` フラグを設定するかどうかを直接制御します。`AllowPrivilegeEscalation` は、コンテナが 1) `Privileged` として実行され、2) `CAP_SYS_ADMIN` を持っている場合に常に true になります。

`agent.systemProbe.securityContext.capabilities.add`
: 機能追加。

`agent.systemProbe.securityContext.capabilities.drop`
: 機能削除。

`agent.systemProbe.securityContext.privileged`
: コンテナを特権モードで実行します。特権コンテナ内のプロセスは、基本的にホスト上のルートと同等です。デフォルトは false です。

`agent.systemProbe.securityContext.procMount`
: コンテナに使用する proc マウントのタイプを示します。デフォルトは `DefaultProcMount` で、読み取り専用パスとマスクされたパスにコンテナランタイムのデフォルトを使用します。これには、`ProcMountType` 機能フラグを有効にする必要があります。

`agent.systemProbe.securityContext.readOnlyRootFilesystem`
: このコンテナに読み取り専用のルートファイルシステムがあるかどうか。デフォルトは `false` です。

`agent.systemProbe.securityContext.runAsGroup`
: コンテナプロセスのエントリポイントを実行するための GID。設定されていない場合、実行時のデフォルトを使用します。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.systemProbe.securityContext.runAsNonRoot`
: コンテナをルート以外のユーザーとして実行する必要があることを示します。true の場合、Kubelet は実行時にイメージを検証して、イメージが UID 0 (ルート) として実行されないことを確認し、実行される場合はコンテナの開始に失敗します。未設定または false の場合、そのような検証は実行されません。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.systemProbe.securityContext.runAsUser`
: コンテナプロセスのエントリポイントを実行するための UID。指定されていない場合、デフォルトは画像メタデータで指定されたユーザーです。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。

`agent.systemProbe.securityContext.seLinuxOptions.level`
: コンテナに適用される SELinux レベルのラベル。

`agent.systemProbe.securityContext.seLinuxOptions.role`
: コンテナに適用される SELinux ロールラベル。

`agent.systemProbe.securityContext.seLinuxOptions.type`
: コンテナに適用される SELinux タイプラベル。

`agent.systemProbe.securityContext.seLinuxOptions.user`
: コンテナに適用される SELinux ユーザーラベル。

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpec`
: `GMSACredentialSpec` は、[GMSA アドミッション Webhook][7] が `GMSACredentialSpecName` フィールドで指定された GMSA 資格情報仕様の内容をインライン化する場所です。このフィールドはアルファレベルで、WindowsGMSA 機能フラグを有効にするサーバーによってのみ尊重されます。

`agent.systemProbe.securityContext.windowsOptions.gmsaCredentialSpecName`
: `GMSACredentialSpecName` は、使用する GMSA 資格情報仕様の名前です。このフィールドはアルファレベルで、WindowsGMSA 機能フラグを有効にするサーバーによってのみ尊重されます。

`agent.systemProbe.securityContext.windowsOptions.runAsUserName`
: Windows の `UserName` を使用して、コンテナプロセスのエントリポイントを実行します。指定されていない場合、デフォルトは画像メタデータで指定されたユーザーです。`PodSecurityContext` で設定することもできます。`SecurityContext` と `PodSecurityContext` の両方に設定されている場合、`SecurityContext` で指定された値が優先されます。このフィールドはベータレベルで、`WindowsRunAsUserName` 機能フラグで無効にできます。     

`agent.useExtendedDaemonset`
: Agent のデプロイには ExtendedDaemonset を使用します。デフォルト値は false です。

`clusterAgent.additionalAnnotations`
: `AdditionalAnnotations` は、Cluster Agent ポッドに追加されるアノテーションを提供します。

`clusterAgent.additionalLabels`
: `AdditionalLabels` は、クラスターチェックランナーポッドに追加されるラベルを提供します。

`clusterAgent.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定されたアフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する `matchExpressions` に一致する場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterAgent.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: 必須。ノードセレクター用語のリスト。用語は `OR` されています。

`clusterAgent.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定されたアフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する `podAffinityTerm` に一致するポッドを持つ場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterAgent.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: このフィールドで指定されたアフィニティ要件がスケジュール時に満たされない場合、ポッドはノードにスケジュールされません。このフィールドで指定されたアフィニティ要件がポッド実行中のある時点で満たされない場合 (ポッドラベルの更新など)、システムは最終的にポッドをノードから削除しようとする場合としない場合があります。複数の要素がある場合、各 `podAffinityTerm` に対応するノードのリストが交差します。つまり、すべての条件が満たされる必要があります。

`clusterAgent.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定された非アフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` 非アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する `podAffinityTerm` に一致するポッドを持つ場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterAgent.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: このフィールドで指定された非アフィニティ要件がスケジュール時に満たされない場合、ポッドはノードにスケジュールされません。このフィールドで指定された非アフィニティ要件がポッド実行中のある時点で満たされない場合 (ポッドラベルの更新など)、システムは最終的にポッドをノードから削除しようとする場合としない場合があります。複数の要素がある場合、各 podAffinityTerm に対応するノードのリストが交差します。つまり、すべての条件が満たされる必要があります。

`clusterAgent.config.admissionController.enabled`
: アドミッションコントローラーを有効にして、APM/DogStatsD コンフィギュレーションと標準タグ (env、service、version) をポッドに自動的に挿入できるようにします。

`clusterAgent.config.admissionController.mutateUnlabelled`
: ポッドラベル `admission.datadoghq.com/enabled="true"` を使用せずにコンフィギュレーションの挿入を有効にします

`clusterAgent.config.admissionController.serviceName`
: Webhook サービス名に対応します。

`clusterAgent.config.clusterChecksEnabled`
: Cluster Agent と DaemonSet の両方でクラスターチェックとエンドポイントチェック機能を有効にします。[クラスターチェック][14]のドキュメントを参照してください。Kube Service アノテーションによるオートディスカバリーは自動的に有効になります。

`clusterAgent.config.confd.configMapName`
: ディレクトリのマウントに使用される ConfigMap の名前。

`clusterAgent.config.env`
: Datadog Agent は、多くの[環境変数][2]をサポートしています。

`clusterAgent.config.externalMetrics.enabled`
: `metricsProvider` を有効にして、Datadog のメトリクスに基づいてスケーリングできるようにします。

`clusterAgent.config.externalMetrics.port`
: 指定した場合、`metricsProvider` 外部メトリクスサービスポートを構成します。

`clusterAgent.config.externalMetrics.useDatadogMetrics`
: DatadogMetrics CRD の使用を有効にします (任意のクエリでスケーリングできるようにします)。

`clusterAgent.config.logLevel`
: ロギングの詳細度を設定します。有効なログレベルは、`trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` です。

`clusterAgent.config.resources.limits`
: 許可されるコンピューティングリソースの最大量を表します。[Kubernetes のドキュメント][3]を参照してください。

`clusterAgent.config.resources.requests`
: 必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。[Kubernetes のドキュメント][3]を参照してください。

`clusterAgent.config.volumeMounts`
: Datadog Cluster Agent コンテナに追加のボリュームマウントを指定します。

`clusterAgent.config.volumes`
: Datadog Cluster Agent コンテナに追加のボリュームを指定します。

`clusterAgent.customConfig.configData`
: コンフィギュレーションファイルの内容に対応します。

`clusterAgent.customConfig.configMap.fileKey`
: コンフィギュレーションファイルの内容を格納するために `ConfigMap.Data` で使用されるキーに対応します。

`clusterAgent.customConfig.configMap.name`
: ConfigMap に名前を付けます。

`clusterAgent.deploymentName`
: 作成または移行元の Cluster Agent デプロイの名前。

`clusterAgent.image.name`
: 使用するイメージを定義します。Datadog Agent 6 には `gcr.io/datadoghq/agent:latest` を使用します。スタンドアロンの Datadog Agent DogStatsD には `datadog/dogstatsd:latest` を使用します。Datadog Cluster Agent には `gcr.io/datadoghq/cluster-agent:latest` を使用します。

`clusterAgent.image.pullPolicy`
: Kubernetes プルポリシー。`Always`、`Never`、または `IfNotPresent` を使用します。

`clusterAgent.image.pullSecrets`
: Docker レジストリの資格情報を指定します。[Kubernetes のドキュメントを参照してください][9]。

`clusterAgent.nodeSelector`
: ポッドがノードに収まるために true でなければならないセレクター。そのノードでスケジュールされるポッドのノードのラベルと一致する必要があるセレクター。[Kubernetes のドキュメント][15]を参照してください。

`clusterAgent.priorityClassName`
: 指定されている場合、ポッドの優先度を示します。`system-node-critical` と `system-cluster-critical` は、最高の優先度を示す 2 つの特別なキーワードで、前者が最高の優先順位です。その他の名前は、その名前で `PriorityClass` オブジェクトを作成して定義する必要があります。指定しない場合、ポッドの優先度はデフォルトになり、デフォルトがない場合はゼロになります。

`clusterAgent.rbac.create`
: RBAC リソースの作成を構成するために使用されます。

`clusterAgent.rbac.serviceAccountName`
: 使用するサービスアカウント名を設定するために使用されます。フィールド `Create` が true の場合は無視されます。

`clusterAgent.replicas`
: Cluster Agent レプリカの数。

`clusterAgent.tolerations`
: 指定されている場合、Cluster Agent ポッドの許容範囲。

`clusterChecksRunner.additionalAnnotations`
: クラスターチェックランナーポッドに追加されるアノテーションを提供します。

`clusterChecksRunner.additionalLabels`
: クラスターチェックランナーポッドに追加されるラベルを提供します。

`clusterChecksRunner.affinity.nodeAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定されたアフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する matchExpressions に一致する場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterChecksRunner.affinity.nodeAffinity.requiredDuringSchedulingIgnoredDuringExecution.nodeSelectorTerms`
: 必須。ノードセレクター用語のリスト。用語は `OR` されています。

`clusterChecksRunner.affinity.podAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定されたアフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する `podAffinityTerm` に一致するポッドを持つ場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterChecksRunner.affinity.podAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: このフィールドで指定されたアフィニティ要件がスケジュール時に満たされない場合、ポッドはノードにスケジュールされません。このフィールドで指定されたアフィニティ要件がポッド実行中のある時点で満たされない場合 (ポッドラベルの更新など)、システムは最終的にポッドをノードから削除しようとする場合としない場合があります。複数の要素がある場合、各 `podAffinityTerm` に対応するノードのリストが交差します。つまり、すべての条件が満たされる必要があります。

`clusterChecksRunner.affinity.podAntiAffinity.preferredDuringSchedulingIgnoredDuringExecution`
: スケジューラーは、このフィールドで指定された非アフィニティ式を満たすノードにポッドをスケジュールすることを優先しますが、1 つ以上の式に違反するノードを選択する場合があります。最も優先されるノードは、重みの合計が最大のノードです。つまり、すべてのスケジューリング要件 (リソース要求、`requiredDuringScheduling` 非アフィニティ式など) を満たすノードごとに、このフィールドの要素を反復処理し、ノードが対応する `podAffinityTerm` に一致するポッドを持つ場合は合計に「重み」を追加して合計を計算します。合計が最も高いノードが最も優先されます。

`clusterChecksRunner.affinity.podAntiAffinity.requiredDuringSchedulingIgnoredDuringExecution`
: このフィールドで指定された非アフィニティ要件がスケジュール時に満たされない場合、ポッドはノードにスケジュールされません。このフィールドで指定された非アフィニティ要件がポッド実行中のある時点で満たされない場合 (ポッドラベルの更新など)、システムは最終的にポッドをノードから削除しようとする場合としない場合があります。複数の要素がある場合、各 podAffinityTerm に対応するノードのリストが交差します。つまり、すべての条件が満たされる必要があります。

`clusterChecksRunner.config.env`
: Datadog Agent は、多くの[環境変数][2]をサポートしています。

`clusterChecksRunner.config.logLevel`
: ロギングの詳細度を設定します。有効なログレベルは、`trace`、`debug`、`info`、`warn`、`error`、`critical`、`off` です。

`clusterChecksRunner.config.resources.limits`
: 制限は、許可されるコンピューティングリソースの最大量を表します。[Kubernetes のドキュメント][3]を参照してください。

`clusterChecksRunner.config.resources.requests`
: 必要なコンピューティングリソースの最小量を表します。コンテナの `requests` が省略されている場合、明示的に指定されている場合はデフォルトで `limits` になり、それ以外の場合は実装定義の値になります。[Kubernetes のドキュメント][3]を参照してください。

`clusterChecksRunner.config.volumeMounts`
: Datadog クラスターチェックランナーコンテナに追加のボリュームマウントを指定します。

`clusterChecksRunner.config.volumes`
: Datadog クラスターチェックランナーコンテナに追加のボリュームを指定します。

`clusterChecksRunner.customConfig.configData`
: コンフィギュレーションファイルの内容に対応します。

`clusterChecksRunner.customConfig.configMap.fileKey`
: コンフィギュレーションファイルの内容を格納するために `ConfigMap.Data` で使用されるキーに対応します。

`clusterChecksRunner.customConfig.configMap.name`
: ConfigMap に名前を付けます。

`clusterChecksRunner.deploymentName`
: 作成または移行元のクラスターチェックデプロイの名前。

`clusterChecksRunner.image.name`
: 使用するイメージを定義します。Datadog Agent 6 には `gcr.io/datadoghq/agent:latest` を使用します。スタンドアロンの Datadog Agent DogStatsD には `datadog/dogstatsd:latest` を使用します。Datadog Cluster Agent には `gcr.io/datadoghq/cluster-agent:latest` を使用します。

`clusterChecksRunner.image.pullPolicy`
: Kubernetes プルポリシー。`Always`、`Never`、または `IfNotPresent` を使用します。

`clusterChecksRunner.image.pullSecrets`
: Docker レジストリの資格情報を指定することができます。[Kubernetes のドキュメント][9]を参照してください。

`clusterChecksRunner.nodeSelector`
: ポッドがノードに収まるために true でなければならないセレクター。そのノードでスケジュールされるポッドのノードのラベルと一致する必要があるセレクター。[Kubernetes のドキュメント][15]を参照してください。

`clusterChecksRunner.priorityClassName`
: 指定されている場合、ポッドの優先度を示します。`system-node-critical` と `system-cluster-critical` は、最高の優先度を示す 2 つの特別なキーワードで、前者が最高の優先順位です。その他の名前は、その名前で `PriorityClass` オブジェクトを作成して定義する必要があります。指定しない場合、ポッドの優先度はデフォルトになり、デフォルトがない場合はゼロになります。

`clusterChecksRunner.rbac.create`
: RBAC リソースの作成を構成するために使用されます。

`clusterChecksRunner.rbac.serviceAccountName`
: 使用するサービスアカウント名を設定するために使用されます。フィールド `Create` が true の場合は無視されます。

`clusterChecksRunner.replicas`
: Cluster Agent レプリカの数。

`clusterChecksRunner.tolerations`
: 指定されている場合、クラスターチェックポッドの許容範囲。

`clusterName`
: 一意のクラスター名を設定すると、ホストおよびクラスターチェックランナーを容易にスコーピングできます。

`credentials.apiKey`
: Agent を実行する前に、これを Datadog API キーに設定します。

`credentials.apiKeyExistingSecret`
: 非推奨。API キーを既存のシークレットに渡すには、代わりに `apiSecret` を検討してください。設定されている場合、このパラメータは `apiKey` よりも優先されます。

`credentials.apiSecret.keyName`
: 使用するシークレットのキー。

`credentials.apiSecret.secretName`
: シークレットの名前。

`credentials.appKey`
: `clusterAgent.metricsProvider.enabled = true` を使用している場合は、メトリクスへの読み取りアクセス用に Datadog アプリケーションキーを設定する必要があります。

`credentials.appKeyExistingSecret`
: 非推奨。API キーを既存のシークレットに渡すには、代わりに `appSecret` を検討してください。設定されている場合、このパラメータは `appKey` よりも優先されます。

`credentials.appSecret.keyName`
: 使用するシークレットのキー。

`credentials.appSecret.secretName`
: シークレットの名前。

`credentials.token`
: ノード Agent と Cluster Agent 間の事前共有キー。これは、32 文字以上の a-z A-z である必要があります。

`credentials.useSecretBackend`
: Agent シークレットバックエンド機能を使用して、さまざまなコンポーネント (Agent、クラスター、クラスターチェック) に必要なすべての資格情報を取得します。`useSecretBackend:true` の場合、他の資格情報パラメータは無視されます。デフォルト値は false です。

`site`
: Agent データの Datadog インテークのサイトを設定します:  {{< region-param key="dd_site" code="true" >}}。デフォルトは `datadoghq.com` です。




[1]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[2]: https://docs.datadoghq.com/ja/agent/docker/?tab=standard#environment-variables
[3]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/event_collection/
[5]: https://docs.datadoghq.com/ja/developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[6]: https://docs.datadoghq.com/ja/developers/dogstatsd/unix_socket/
[7]: https://github.com/kubernetes-sigs/windows-gmsa
[8]: https://docs.datadoghq.com/ja/tagging/
[9]: https://kubernetes.io/docs/concepts/containers/images/#specifying-imagepullsecrets-on-a-pod
[10]: https://docs.datadoghq.com/ja/agent/basic_agent_usage/kubernetes/#log-collection-setup
[11]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest
[12]: https://docs.datadoghq.com/ja/graphing/infrastructure/process/#kubernetes-daemonset
[13]: http://conntrack-tools.netfilter.org/
[14]: https://docs.datadoghq.com/ja/agent/cluster_agent/clusterchecks/
[15]: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/