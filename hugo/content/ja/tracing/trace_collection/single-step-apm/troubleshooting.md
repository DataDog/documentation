---
aliases:
- /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: ドキュメント
  text: シングルステップ APM インスツルメンテーション
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: ラーニングセンター
  text: ホスト上の APM インスツルメンテーションのトラブルシューティング
title: シングルステップ APM のトラブルシューティング
---
## 概要 {#overview}

シングルステップインスツルメンテーション (SSI) は、アプリケーションプロセスに Datadog SDK を自動的に読み込むことで、アプリケーションのインスツルメンテーションを支援します。SSI は、Linux ホスト、Kubernetes や Docker などのコンテナ環境で実行されているアプリケーション、および Windows IIS によって提供される .NET アプリケーションに対応しており、アプリケーションの依存関係や画像を変更する必要がありません。SSI で APM を有効にする際に問題が発生した場合は、このガイドを使用して一般的な問題をトラブルシューティングし、解決します。追加のサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## トラブルシューティング方法 {#troubleshooting-methods}

Fleet Automation で Datadog UI のインジェクションの問題を調査するか、コンテナレベルで手動で調査できます。インジェクターが各プロセスに対してどのような判断を下したかを詳しく確認するには、[インジェクターデバッグログ](#injector-debug-logs)を参照してください。

### Datadog Fleet Automation でインジェクションをトラブルシューティングする {#troubleshoot-injection-in-datadog-fleet-automation}


Fleet Automation は、SSI に対して 2 種類のインスツルメンテーションインサイトを提供します。
- **プロセスレベルのインサイト**は、個々のホストまたはコンテナのインスツルメンテーションステータスと SDK インストールの詳細を表示します。
- **Kubernetes クラスターインサイト**では、クラスター全体のインスツルメンテーションを大まかに確認でき、SSI の構成およびインジェクションがどのように大規模に適用されているかを把握できます。

これらのビューを組み合わせることで、プロセスとクラスターの両方の観点からインジェクションの問題を診断できます。

#### 前提条件 {#prerequisites}

この機能は以下で利用可能です。

- **言語**: Python、Java、Node.js、PHP、.NET
- **環境**: Linux ホスト、コンテナ、Kubernetes
- Datadog Agent v7.68.2 以上

#### プロセスレベルのインサイトを表示する {#view-process-level-insights}

プロセスレベルのインサイトを使用して、SSI がアプリケーションプロセスに正しく適用されているかどうかを確認し、インジェクションの障害を特定します。

1. [Fleet Automation][9] に移動します。
1. ファセットを使用して、関連するホストに絞り込みます。
   - `single_step_instrumentation` は、SSI が有効または無効になっているホストを表示します。
   - `single_step_instrumentation_status` は、サービスインスツルメンテーションで問題が発生したホストを表示します。
1. ホストを選択して、Agent の詳細パネルを開きます。
1. Agent パネルで、{{< ui >}}Services{{< /ui >}} タブに移動します。
1. ホストで SSI が有効になっている場合、タブには以下が表示されます。
   - 「シングルステップインスツルメンテーションはこのホスト上で有効になっています」というメッセージが表示されたバナー。
   - トラブルシューティングが必要な問題がある場合の {{< ui >}}SDK Installations{{< /ui >}} セクション。

#### Kubernetes クラスターインサイトを表示する {#view-kubernetes-cluster-insights}

クラスターレベルのインサイトを使用して、Kubernetes クラスター全体で SSI がどのように構成され機能しているかを把握します。これらのインサイトは、個々のプロセスを超えてトラブルシューティングを拡張し、クラスターレベルでワークロードにインスツルメンテーションがどのように適用されているかを示します。

1. [{{< ui >}}Fleet Automation{{< /ui >}}][9] > {{< ui >}}View Agents{{< /ui >}} に移動し、右上隅の {{< ui >}}Kubernetes Clusters{{< /ui >}} を選択します。
1. クラスターを選択して、以下を含む詳細を表示します。
   - クラスターが Helm または Datadog Operator のどちらによって管理されているか
   - Cluster Agent および Node Agent のバージョン
   - 各ホストで実行されているインテグレーションとサービス
1. {{< ui >}}Single Step Instrumentation{{< /ui >}} タブを開いて、以下を確認します。
   - クラスターの SSI 構成 (YAML ビュー)
   - クラスター構成または Pod レベルのアノテーションに基づいて、インスツルメンテーションの対象として識別された Pod
   - インスツルメンテーションが成功したかどうかを含む、対象となる各 Pod のステータス
   - 言語とバージョンを含む、各 Pod に挿入された SDK
   - インスツルメンテーションが適用された各ワークロードがトレースを生成しているかどうか 
1. ステータスアイコンにカーソルを合わせると、インスツルメンテーションまたはトレース収集の状態に関する詳細が表示されます。

{{< img src="tracing/trace_collection/k8s-ssi-tab.png" alt="SSI 構成 yaml とインスツルメントされた Pod のリストが表示されている、Kubernetes クラスターのシングルステップインスツルメンテーションタブ" style="width:100%;" >}}

### アプリケーションコンテナのインジェクションを手動で検証する {#manually-verify-injection-in-the-application-container}

Datadog UI にインスツルメンテーションの問題が表示されない場合、または単一のサービスやコンテナのトラブルシューティングを行う場合は、インジェクションが想定どおりに行われたかどうかを手動で確認できます。この方法は、一元的な可視性が制限されている環境でデバッグする場合や、特定のサービスがトレースを報告していない場合に役立ちます。

コンテナレベルでのインジェクションを確認するには、以下を確認します。

1. `/etc/ld.so.preload` に以下のエントリが含まれていること。
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ``` 
2. `LD_PRELOAD` 環境変数が同じ値に設定されていること。
3. ディレクトリ `/opt/datadog-packages/datadog-apm-inject` が存在し、`stable` および `$version` サブディレクトリが含まれていること。
4. 言語固有のディレクトリが存在すること (例: Java の場合は `/opt/datadog/apm/library/java/`)。

手動検証中にデバッグログを有効にするには、以下の手順を実行します。

1. Pod の仕様で以下のように設定します。
 
   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
   env:
     - name: DD_TRACE_DEBUG    # debug logging for the SDK
       value: "true"
     - name: DD_APM_INSTRUMENTATION_DEBUG    # debug logging for the injector
       value: "true"
   {{< /code-block >}}
   
2. Pod を削除して、インジェクション中にデバッグログを有効にします。


## インジェクターのデバッグログ {#injector-debug-logs}

インジェクターのデバッグログには、各プロセスに対してインジェクターがどのような判断を下したか (インジェクションが成功したか、拒否されたか、スキップされたか、およびその理由) が表示されます。[Fleet Automation](#troubleshoot-injection-in-datadog-fleet-automation) で障害の原因が特定できない場合、ホストまたはコンテナレベルで診断を行う場合、あるいは [Datadog サポート][1]に情報を提供する場合は、これらを有効にします。

インジェクターのデバッグログは、トレーサーのデバッグログとは別です。インジェクターのログを使用して、トレーサーがインジェクションされたかどうか、またどのようにインジェクションされたかを診断します。インジェクション後は、[トレーサーのデバッグログ][13]を使用して、プロセス内で実行されているトレーサーを診断します。

### デバッグモードを有効にする {#enable-debug-mode}

インスツルメントするプロセスに以下の環境変数を設定します。

```
DD_APM_INSTRUMENTATION_DEBUG=true
```

これにより、インジェクターのログレベルが `DEBUG` に引き上げられ、`stderr` がログシンクとして追加されます。

この変数は、インジェクションされたプロセスが継承する環境で設定する必要があります。

#### ホスト {#host}

プロセスを開始する前に、変数をエクスポートします。

```sh
export DD_APM_INSTRUMENTATION_DEBUG=true
./my-service
```

#### Docker {#docker}

アプリケーションコンテナに環境変数を追加します。

```sh
docker run -e DD_APM_INSTRUMENTATION_DEBUG=true my-image
```

デバッグ出力はコンテナログに表示されます (`docker logs <container>`)。

#### Kubernetes {#kubernetes}

Pod テンプレートのコンテナ仕様に変数を追加します。

{{< code-block lang="yaml" disable_copy="true" >}}
spec:
  containers:
    - name: my-app
      env:
        - name: DD_APM_INSTRUMENTATION_DEBUG
          value: "true"
{{< /code-block >}}

または、以下の Pod アノテーションを追加して、コンテナ仕様を編集せずにデバッグモードを有効にします。

{{< code-block lang="yaml" disable_copy="true" >}}
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.debug: "true"
{{< /code-block >}}

デバッグ出力は、アプリケーション Pod ログに表示されます (`kubectl logs <pod>`)。

### デバッグログを確認する {#review-debug-logs}

#### ログの場所 {#where-to-find-the-logs}

デバッグモードが有効な場合、インジェクターはインスツルメントされたプロセスの `stderr` に書き込みます。

| 環境 | 探す場所 |
| --- | --- |
| ホストまたはシェル | プロセスのターミナル、またはその `stderr` がリダイレクトされている場所 |
| Docker | `docker logs <container>` |
| Kubernetes | `kubectl logs <pod>` (Cluster Agent ではなく、アプリケーション Pod) |

**注**: デバッグ出力を `stderr` ではなくファイルに送信するには、`DD_APM_INSTRUMENTATION_OUTPUT_PATHS` を絶対パスに設定してください。

#### インジェクションの成功 {#successful-injection}

インジェクションが発生したことを確認するには、実行可能ファイルがランタイムと一致するログブロックを探します。次の例は、Node.js のインジェクションの成功例です。

```
<DEBUG> ... [linux/process.c:405] process_exe: 'node'
<DEBUG> ... [linux/process.c:443] Main executable path: '/usr/local/bin/node'
<DEBUG> ... [workload_selection.c:147] Workload selection allowed injection: continuing
<DEBUG> ... [workload_selection.c:90] Succesfully loaded policy: 'requirements.bin from SDK policies' from '/opt/datadog-packages/datadog-apm-inject/0.67.0/requirements/nodejs/requirements.bin' [size: 3864]
<DEBUG> ... [languages.c:71] detected language: 'nodejs'
<DEBUG> ... [languages.c:72] detected language version: '20.20.2'
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TELEMETRY_FORWARDER_PATH=/opt/datadog-packages/datadog-apm-inject/0.67.0/inject/process
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TAGS=_dd.injection.mode:k8s
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_INJECTION_ENABLED=tracer
<DEBUG> ... [linux/env_injector.c:38] injection config: NODE_OPTIONS=--require /opt/datadog/apm/library/js/node_modules/dd-trace/init.js
<INFO>  ... [./libinject.c:81] injection duration: 1.066500 ms
<DEBUG> ... [injection_metadata.c:101] sending injection-metadata telemetry: result='0', result_reason='injection completed successfully'
<DEBUG> ... [./libinject.c:231] injector finished
```

| ログ行 | 意味 |
| --- | --- |
| `process_exe: '<exe>'` / `Main executable path: '<path>'` | 評価対象プロセス。|
| `Workload selection allowed injection: continuing` | ポリシーによりインジェクションが許可されました。|
| `Succesfully loaded policy: 'requirements.bin...'` | 検出されたランタイムの言語要件ポリシーが読み込まれました。|
| `detected language: '<lang>'` / `detected language version: '<version>'` | ランタイムが識別され (`nodejs`、`java`、`python`、`ruby`、`dotnet`、`php`)、そのバージョンが読み取られました。|
| `injection config: <VAR>=<value>` | インジェクターが設定した各環境変数。`DD_INJECTION_ENABLED=tracer` と、言語固有の変数 (例: `NODE_OPTIONS` または `JAVA_TOOL_OPTIONS`) が表示されていれば、トレース SDK が読み込まれたことが確認できます。|
| `injection duration: <N> ms` | インジェクションが完了し、経過時間が表示されます。|
| `injection completed successfully` (`result='0'`) | インジェクターがテレメトリにインジェクションの成功を報告しました。`result` がゼロ以外で、`result_reason` が異なる場合は、失敗を示しています。|
| `injector finished` | インジェクターのコンストラクターが返されました。|

#### 一般的なログメッセージ {#common-log-messages}

**インジェクションが無効**

`DD_INSTRUMENT_SERVICE_WITH_APM=false` の場合、またはその他の理由でインジェクションが無効になっている場合:

```
<DEBUG> ... [libinject.c:115] disabled flag set, not injecting
```

インジェクターは読み込まれましたが、意図的にインジェクションがスキップされました。`DD_INSTRUMENT_SERVICE_WITH_APM=false` を削除するか、`true` に設定してインジェクションを許可してください。

**ランタイムが検出されていない**

プロセスがサポート対象の言語ランタイムではない場合:

```
<DEBUG> ... [libinject.c:175] No known runtime was detected - not injecting!
```

インジェクターは実行されましたが、そのプロセスはインスツルメントの対象ではありません (`nodejs`、`java`、`python`、`ruby`、`dotnet`、`php`)。これは、アプリケーション以外のプロセスでは想定内です。

**ワークロードの選択が拒否された**

```
<DEBUG> ... [workload_selection.c:149] Workload selection denied injection
```

ポリシーにより、このプロセスのインジェクションが防止されました。前の `Evaluating '<policy-name>'` 行は、どのルールが一致したか、および比較された値を示します。

**再実行が検出された**

```
<DEBUG> ... [libinject.c:102] Re-exec detected!
```

インジェクションされた環境変数を有効にするために、プロセスが自ら再実行しました。これは想定される動作です。インジェクションは再実行されたプロセスで継続され、そのプロセスは独自のデバッグ行を生成します。

## インジェクションに影響を与える構成オプション {#configuration-options-that-affect-injection}

インジェクションの動作をブロックまたは変更できる構成メカニズムがいくつかあります。

### ストレージ要件 {#storage-requirements}

SSI は、各ホストに言語 SDK とインジェクターパッケージをダウンロードします。必要なディスク容量は、使用されている言語の数とインスツルメントされる Pod の数によって異なります。大まかな見積もりは以下のとおりです。

<div style="text-align:center;">
  <pre><code>[sum of the language library sizes]
+
[injector package size] * [number of injected pods per host]</code></pre>
</div>

ライブラリパッケージは頻繁に更新され、新しい言語バージョンのサポートが追加されるとサイズが大きくなる可能性があるため、ディスク使用率は時間の経過とともに変化する可能性があります。環境のディスク容量が限られている場合は、パッケージサイズを監視し、インジェクションの失敗を避けるために追加容量を確保してください。

### インジェクターのバージョン {#injector-version}

インジェクターのバージョンを設定するには、以下を実行します。
- クラスターレベルで:
  
  `datadog.apm.instrumentation.injector.imageTag` の下にある `values.yaml` で設定します。

- Pod レベルで:
 
  アノテーション `admission.datadoghq.com/apm-inject.version` で設定します。


ホストまたは Docker インジェクションの場合、`auto_inject` バージョンの変更は推奨されません。

### 許可リストと拒否リスト {#allow-and-deny-lists}

#### デフォルトの拒否リスト {#default-deny-list}

Datadog は、特定のプロセス (IDE やデータベースなど) へのインジェクションを防ぐために内部拒否リストを保持します。プロセスコマンドまたはエントリーポイントがこのリストにある場合、インジェクターはインジェクションプロセスをスキップします。 

#### Linux インスツルメンテーションルール {#linux-instrumentation-rules}

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="プレビューに参加しましょう。">}}
インスツルメンテーションルールは、限定的なプレビューとして Linux ベースのアプリで利用可能です。プロセスインジェクションの許可または拒否ルールを設定するには、プレビューアクセスにサインアップしてください。
{{< /callout >}}

#### Kubernetes インスツルメンテーションルール {#kubernetes-instrumentation-rules}

インスツルメンテーションルールにより、Kubernetes ラベルとセレクターに基づいたインジェクションが可能になります。検討するルール:

1. `disabledNamespaces` が常に優先されます。
2. Pod が初期化されると、ターゲットリストが上から順にチェックされます。最初に一致したルールのみが Pod ごとに適用されます。

#### セキュリティスキャナーによってフラグが立てられるインジェクションコンテナ {#injection-container-flagged-by-security-scanners}

`apm-inject` コンテナが起動時に実行する実行可能ファイルは悪意のあるソフトウェアに見える可能性があるため、セキュリティツールによってフラグが立てられる場合があります。

このコンテナの動作は想定内かつ安全です。この実行可能ファイルは、自動インスツルメンテーションのための環境を構成します。

Datadog はセキュリティのベストプラクティスを遵守しており、このコンテナを許可リストに追加するためにセキュリティベンダーと連携しています。

### 厳格な Pod セキュリティ設定が適用された環境 {#environments-with-strict-pod-security-settings}

Pod セキュリティルールによって Datadog init コンテナがブロックされると、次のようなエラーが表示されることがあります。

```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

これを解決するには、以下の Cluster Agent オプションのいずれかを設定します。
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

値には、Datadog init コンテナに必要なセキュリティコンテキストを適用する JSON 文字列を指定する必要があります。 

### カスタムインスツルメンテーション {#custom-instrumentation}

カスタムインスツルメンテーションを使用する場合でも SDK のインポートが必要です。カスタムスパンを定義するための .NET の `DD_TRACE_METHODS` のような構成変数は引き続き利用可能です。

## 一般的なトラブルシューティング {#general-troubleshooting}

### DD_TRACE_ENABLED=false を設定しても SSI が実行され続ける {#ssi-continues-running-after-setting-dd-trace-enabledfalse}

`DD_TRACE_ENABLED=false` を設定しても、SSI による SDK の読み込みは防止されません。[インジェクター][11]は SDK が環境変数を評価する前に実行されるため、SDK レベルの環境変数は SSI に影響を与えません。SSI を無効化または削除するには、お使いのプラットフォームの [SSI セットアップページ][12]を参照してください。

## 環境固有のトラブルシューティング {#environment-specific-troubleshooting}

### ホストおよび Docker 環境 {#host-and-docker-environments}

#### ホストインジェクションが既存のプロセスに適用されない {#host-injection-does-not-apply-to-existing-processes}

プリロードライブラリは、新しく起動されたプロセスにのみインジェクションを行います。インスツルメンテーションを適用するには、新しいシェルセッションを開始するか、ログアウトしてから再度ログインします。

**注:** Docker ベースのインジェクションにはこの制限はありません。

#### 小さなインスタンスタイプでインジェクションが失敗する {#injection-fails-on-small-instance-types}

プリロードライブラリは、アナライザーが作業を完了するために 1 秒間の猶予を与えます。複数のサービスを実行している小さな VM インスタンス (例: `t2.micro`) では、この制限時間を超える可能性があります。この問題を解決するには、`t2.small` のようなより大きなインスタンスサイズを使用します。

#### Agent ファイルを手動でアンインストールした後のエラー {#errors-after-manual-uninstallation-of-agent-files}

Agent ファイルを手動で削除すると、次のようなエラーが表示されることがあります。

```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

SSI を適切にアンインストールするには、プラットフォーム固有の手順に従います。

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][4]

#### ルートレス Docker で機能しないインジェクション {#injection-not-working-with-rootless-docker}

ルートレス Docker を使用する場合は、`/etc/datadog-agent/inject/docker_config.yaml` 内の `docker_socket` を、現在のユーザーが使用する Docker ソケットのパス (通常は `/run/user/$UID/docker.sock`) に設定します。再起動は不要です。

#### 静的にリンクされたランチャーでインジェクションが失敗する {#injection-fails-with-statically-linked-launchers}

カスタムランチャーが静的にリンクされている場合 (Go で一般的)、プリロードライブラリが呼び出されないことがあります。以下の場合はインジェクションが成功することがあります。
- ランチャーのコマンドラインに言語名が含まれている
- ランチャーが動的にリンクされた中間プログラムを実行する

ただし、静的にリンクされたバイナリからの直接的なプロセス起動にはインジェクションされません。

### Kubernetes 環境 {#kubernetes-environments}

Datadog Admission Controller は、アプリケーション Pod が作成される前にデプロイおよび構成されている必要があります。既存の Pod を変更することはできません。

Admission Controller の問題をトラブルシューティングするには、以下を実行します。

1. Cluster Agent の Pod の健全性をチェックします。
   ```
   kubectl get pods
   kubectl get deployments
   ```
1. Cluster Agent のリーダーのログで、Admission Controller の起動の成功を示す `INFO` メッセージをチェックします。例:

   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. 以下のいずれかの方法で、Admission Controller のステータスをチェックします。

   - Cluster Agent の Pod 内で `agent status` を実行し、現在のステータスの出力内容を取得します。
   - 事後的にトラブルシューティングを行う場合は、フレア内の `status.log` をチェックします。フレアが生成されると、システムは `agent status` を実行し、その出力を `status.log` に保存します。

   いずれの場合も、Admission Controller セクションと Webhooks セクションを見つけて、以下を確認します。
   - 想定されるすべての `MutatingWebhookConfiguration` リソースがリストされていること (自動インスツルメンテーション、構成インジェクション、タグインジェクション用)。
   - Webhook 構成が正しいシークレットを参照していること。
   - CA バンドルのダイジェストが構成間で一致していること。

1. `telemetry.log` または以下のコマンドの出力で、インジェクション試行を検査します。

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```

   言語ごとのインジェクション試行を確認するには、`admission_webhooks_library_injection_attempts` を探します。

#### DatadogInstrumentation 構成が適用されていない {#datadoginstrumentation-configuration-is-not-applied}

SSI を有効にするために `DatadogInstrumentation` リソースを使用している場合:

1. Agent と Cluster Agent が v7.85 以降であり、CRD に `spec.config.apm` が含まれていることを確認します。Datadog Operator v1.31 以降には、APM スキーマが含まれます。

   ```shell
   kubectl explain datadoginstrumentation.spec.config.apm
   ```

1. リソース条件を検査します。

   ```shell
   kubectl describe datadoginstrumentation <RESOURCE_NAME> -n <WORKLOAD_NAMESPACE>
   ```

   理由が `Configured` である `APMReady=True` を確認します。`UnsupportedLanguage` または `InvalidTracerConfig` の理由は、構成を修正する必要があることを示しています。SDK 言語識別子がサポートされている必要があり、`ddTraceConfigs` の名前は `DD_` で始まる必要があります。

1. リソースとワークロードが同じネームスペースにあることを確認し、`targetRef` がサポート対象ワークロードの API バージョン、種類、および名前と一致していることを確認します。
1. DDI コントローラーと Admission Controller が有効になっていることを確認します。アドミッションのオプトインラベルがない Pod については、`DatadogAgent` リソースで `features.admissionController.mutateUnlabelled: true` を設定します。ネームスペースの除外と、Pod の `admission.datadoghq.com/enabled` ラベルをチェックします。
1. DDI よりも優先される Pod の SDK 選択アノテーションがないかチェックします。構成を適用した後、ワークロードの Pod を置き換えます。`APMReady=True` は構成が受け入れられたことを確認するものであり、実行中の Pod がインスツルメントされたことを確認するものではありません。

セットアップの手順と優先順位のルールについては、[DatadogInstrumentation で APM を有効にする][14]を参照してください。

#### 失敗したミューテーション {#failed-mutations}

Cluster Agent は通常、`admission/server.go` に起因するインジェクションの失敗に関する警告やエラーを記録します。例えば、`valueFrom` を使用して `JAVA_TOOL_OPTIONS` が設定されている場合、警告が表示されることがあります。

詳細なデバッグには、メトリクス `datadog.cluster_agent.admission_webhooks.library_injection_errors` を使用します。

##### 言語アノテーションを適用できない {#language-annotation-cannot-be-applied}

セットアップ中、SSI はサービスのアプリケーション言語を検出し、`internal.dd.datadoghq.com/service-name.detected_langs` の形式でサービスラベルを適用します。ラベルを適用できない場合、インジェクションは失敗します。

サービス名が Kubernetes の文字列制限 ([63 文字][6]) を超えているために、ラベル付けエラーが発生することがあります。例:

```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

サービスタグが [Unified Service Tagging][8] によって明示的に設定されていない場合、デフォルトのイメージ名が使用されるため、文字列の長さ制限に違反しやすくなります。

##### インジェクションは成功したようだが、トレースが見つからない {#injection-appears-successful-but-traces-are-missing}

ログに問題がないにもかかわらずトレースが欠落している場合は、アプリケーション側の構成が誤っている可能性があります。以下を確認します。
- 必要なアノテーションとラベルが存在すること。
- [Unified Service Tagging][8] が正しく設定されていること。
- インスツルメンテーションルールの許可/拒否リストが適切に定義されていること。

## 言語固有のトラブルシューティング {#language-specific-troubleshooting}

### Java {#java}

#### `JAVA_TOOL_OPTIONS` が長すぎる {#java-tool-options-is-too-long}

`JAVA_TOOL_OPTIONS` 環境変数には、JVM によって強制される 1024 文字の制限があります。インジェクション中、Datadog はこの変数に `-javaagent` フラグを追加してトレースを有効にします。結合された値が制限を超えると、JVM は警告を出力して変数を無視するため、インジェクションは実行されません。

この問題を回避するには、影響を受けるプロセスをインジェクションの対象から除外します。

####  `JAVA_TOOL_OPTIONS`プログラムの出力を変更する {#java-tool-options-changes-program-output}

`JAVA_TOOL_OPTIONS` が設定されている場合、JVM は `Picked up JAVA_TOOL_OPTIONS: -Xmx1024m` のようなメッセージを stdout に出力します。プロセスがこの出力を読み取って依存している場合、影響を受ける可能性があります。

バージョン 0.12.2 以降、その出力を解析するプロセスへの干渉を避けるため、`java -version` のインジェクションはスキップされます。

#### 複数の Java サイトが同じサービス名で報告される {#multiple-java-sites-report-under-the-same-service-name}

デフォルトでは、Single Step は `DD_SERVICE` 環境変数を設定します。これにより、同じサーバー (Tomcat や WebLogic など) で実行されているすべての Web アプリケーションに単一のサービス名が適用されます。その結果、すべてのサイトが同じ名前で報告されます。

各サイトが独自の名前で報告されるように **split-by-tags** を有効にするには、以下のいずれかのオプションを使用します。
- JVM システムプロパティ: `-Ddd.trace.split-by-tags=servlet.context`
- 環境変数: `DD_TRACE_SPLIT_BY_TAGS=servlet.context`

#### トレーサーがすでに存在する {#tracer-already-exists}

SSI は、`-javaagent` オプションやその他のトレーシング構成をすでに使用しているアプリケーションにはインジェクションを行いません。

### Ruby {#ruby}

Ruby のインジェクションは `Gemfile` を変更して Datadog SDK を追加します。インジェクションのサポートが後で削除された場合、依存関係がなくなるため、アプリケーションが起動しなくなる可能性があります。

これを解決するには、元の `Gemfile` を復元します。インジェクションを削除した後も APM を使用する場合は、`bundle install` を実行して gem をダウンロードします。

### Python {#python}

バージョン 2.7.5 以下には、システムライブラリと競合する可能性がある事前パッケージ化された protobuf 依存関係が含まれています。

### .NET {#net}

#### SSI は適用されているが、.NET トレースが Agent にリーチしていない {#ssi-is-applied-but-no-net-traces-reach-the-agent}

SSI アノテーションと init コンテナが Pod に存在しているにもかかわらず .NET トレースがリーチしていない場合は、別のプロファイラーが優先されている可能性があります。メインコンテナで `CORECLR_PROFILER` をチェックします。値が `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` (Datadog .NET tracer の CLSID) でない場合、Datadog ではなく別のプロファイラーが読み込まれています。

競合している `CORECLR_*` 環境変数 (および他のプロファイラーを参照している `LD_PRELOAD` エントリ) を、それらを注入したソース (別のベンダーのオペレーター、init コンテナ、Pod テンプレート、または Helm 値) から削除します。その後、Pod をロールします。[.NET CLR プロファイリング API は、プロセスごとに 1 つのサブスクライバーのみを許可します][10]。

## サポート用の診断情報を収集する {#collect-diagnostic-information-for-support}

インジェクションの問題についてサポートに問い合わせる際は、トラブルシューティングのために以下の情報を収集してください。

1. ホストインジェクション、Docker インジェクション、またはその両方を使用していますか。
1. `/opt/datadog-packages/datadog-apm*` ディレクトリが存在することを確認します。
1. ホストインジェクションの場合は、`/etc/ld.so.preload` の存在と権限をチェックします。

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   これは、`root` が所有し、`644` 権限 (`-rw-r--r--`) を持つ必要があります。

1. インジェクターのデバッグログを有効にし、出力を収集します。手順については、[インジェクターデバッグログ](#injector-debug-logs)を参照してください。

1. Agent フレアを提供します。

### Kubernetes ベースのインジェクションに関する追加情報 {#additional-information-for-kubernetes-based-injection}

Kubernetes 環境でのインジェクションのトラブルシューティングを行う場合は、以下の情報を収集してください。

- Cluster Agent のデプロイに使用した方法 (例: Helm、Datadog Operator、または kubectl コマンド)。
- アプリケーション Pod のデプロイメントファイル。
- Node Agent と Cluster Agent の両方からのフレア (できれば `DEBUG` モードを有効にした状態)。
- 以下の出力:
  ```
  kubectl describe pod <app pod>
  ```
- アプリケーション Pod によるインジェクターのデバッグログ (Cluster Agent からのログではない)。手順については、[インジェクターデバッグログ](#injector-debug-logs)を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[2]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[3]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[4]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[5]: /ja/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[6]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[7]: https://datatracker.ietf.org/doc/html/rfc1035
[8]: /ja/getting_started/tagging/unified_service_tagging/
[9]: https://app.datadoghq.com/fleet
[10]: /ja/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[11]: /ja/tracing/guide/injectors/
[12]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm/#instrument-sdks-across-applications
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/
[14]: /ja/tracing/trace_collection/single-step-apm/kubernetes/?tab=datadoginstrumentationcrdrecommended#enable-apm-with-datadoginstrumentation