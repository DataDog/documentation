---
further_reading:
- link: /tracing/trace_collection/library_config/java/
  tag: ドキュメント
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/java/
  tag: ドキュメント
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/java/
  tag: ドキュメント
  text: Supported Java frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/java/
  tag: ドキュメント
  text: Manually configuring traces and spans
- link: https://github.com/DataDog/dd-trace-java
  tag: ソースコード
  text: Tracing library open source code repository
- link: /containers/cluster_agent/troubleshooting/
  tag: ドキュメント
  text: Troubleshooting the Datadog Cluster Agent
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: ブログ
  text: Use library injection to auto-instrument and trace your Kubernetes applications
    with Datadog APM
title: Tutorial - Enabling Tracing for a Java Application with the Admission Controller
---

## 概要

このチュートリアルでは、Datadog Admission Controller を使用して Java アプリケーションのトレースを有効にする手順を説明します。

ホスト、コンテナ、クラウドインフラストラクチャー、他の言語で書かれたアプリケーションなど、他のシナリオについては、他の[トレース有効化のチュートリアル][1]を参照してください。

Java の一般的なトレース設定ドキュメントについては、[Java アプリケーションのトレース][2]を参照してください。

### 前提条件

- Datadog のアカウントと[組織の API キー][3]
- Git
- Docker
- Curl
- Kubernetes v1.14+

## サンプルアプリケーションのインストール

このチュートリアルでは、Datadog Admission Controller でアプリをインスツルメンテーションする方法を説明するために、Spring でビルドした Java アプリを使用します。アプリのコードは [springblog GitHub リポジトリ][4]にあります。

始めるには、リポジトリを複製します。

{{< code-block lang="shell" >}}
git clone https://github.com/DataDog/springblog.git
{{< /code-block >}}

このリポジトリには、Docker と Kubernetes 内で実行できるようにあらかじめ構成されたマルチサービスの Java アプリケーションが含まれています。サンプルアプリは REST を使った基本的な Spring アプリです。

## サンプルアプリケーションの起動と実行

1. springblog リポジトリの `/k8s` サブディレクトリに移動します。
   {{< code-block lang="shell" >}}
cd springblog/k8s/{{< /code-block >}}

2. `depl.yaml` ファイルを使用してワークロードをデプロイします。
   {{< code-block lang="shell" >}}
kubectl apply -f ./depl.yaml{{< /code-block >}}

3. 以下のコマンドで実行されていることを確認します。
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    このように表示されるはずです。

    ```
    NAME                                       READY   STATUS        RESTARTS        AGE
    springback-666db7b6b8-dzv7c                1/1     Terminating   0               2m41s
    springfront-797b78d6db-p5c84               1/1     Terminating   0               2m41s
    ```

   サービスが開始され、8080 番ポートをリッスンします。このサービスは `/upstream` エンドポイントを公開します。

4. 以下の curl コマンドを実行して、通信が行われていることを確認します。
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream
Quote{type='success', values=Values{id=6, quote='Alea jacta est'}}{{< /code-block >}}

5. アプリケーションを停止するには、`springblog/k8s` ディレクトリからこのコマンドを実行して、トレースを有効にします。
   {{< code-block lang="shell" >}}
kubectl delete -f ./depl-with-lib-inj.yaml{{< /code-block >}}

## Datadog Admission Controller でアプリをインスツルメンテーションする

アプリケーションを動作させたら、Datadog Admission Controller を使用してインスツルメンテーションを行います。コンテナ化された環境では、このプロセスは一般的に以下の通りです。

1. [Datadog Cluster Agent][5] をインストールします。
2. ポッド定義に[統合サービスタグ付け][6]を追加します。
3. ライブラリ挿入のためにポッドに[アノテーション][7]を付けます。
4. [ラベル][8]をポッドに貼って、Datadog Admission Controller にポッドの変異を指示します。

トレーシングライブラリは自動的に挿入されるので、追加する必要はありません。アプリを再デプロイする必要はありません。チュートリアルのこのセクションでは、Datadog 変数を追加し、アプリの新しいイメージまたはバージョンをデプロイするプロセスを説明します。

1. `k8s` サブディレクトリから、以下のコマンドを使用して、`values-with-lib-inj.yaml` コンフィギュレーションファイルと [Datadog API キー](/account_management/api-app-keys/)を指定して、Datadog Cluster Agent をインストールします。
   {{< code-block lang="shell" >}}
helm install datadog-agent -f values-with-lib-inj.yaml --set datadog.site='datadoghq.com' --set datadog.apiKey=$DD_API_KEY datadog/datadog{{< /code-block >}}
   <div class="alert alert-warning">より詳細な情報については、<a href="/containers/kubernetes/installation/?tab=helm" target="_blank">Helm を使用した Kubernetes への Datadog Agent のインストール</a>をお読みください</div>

2. Datadog Cluster Agent が実行しているかどうかは、以下のコマンドで確認できます。
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    このように表示されるはずです。

    ```
    NAME                                                READY   STATUS    RESTARTS  AGE
    datadog-agent-4s8rb                                 3/3     Running   0         30s
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0         30s
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0         30s
    ```

3. 以下のブロックを [`depl.yaml` ファイル][9]に追加して、[統合サービスタグ付け][6]をポッドに追加します。
   {{< code-block lang="yaml" >}}
labels:
  tags.datadoghq.com/env: "dev"
  tags.datadoghq.com/service: "springfront"
  tags.datadoghq.com/version: "12"{{< /code-block >}}

4. 以下のアノテーションをポッドに追加して、Java トレーシングライブラリをアプリコンテナに挿入するように Datadog Admission Controller を構成します。
   {{< code-block lang="yaml" >}}
annotations:
  admission.datadoghq.com/java-lib.version: "latest"{{< /code-block >}}

   このアノテーションは Java トレーシングライブラリの最新バージョンを指定します。`"v1.5.0"` のようにライブラリの特定のバージョンを参照することもできます。

    最終的なポッドの定義は下の抜粋のようになります。サンプルリポジトリにある完全な [YAML ファイル][10]も参照してください。アプリをインスツルメンテーションするために追加した指示がハイライトされています。

    {{< highlight yaml "hl_lines=6-8 24-28" >}}
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: springfront
    labels:
        tags.datadoghq.com/env: "dev"
        tags.datadoghq.com/service: "springfront"
        tags.datadoghq.com/version: "12"
    spec:
    replicas: 1
    selector:
        matchLabels:
        name: springfront
    minReadySeconds: 15
    strategy:
        type: RollingUpdate
        rollingUpdate:
        maxUnavailable: 1
        maxSurge: 1
    template:
        metadata:
        labels:
            name: springfront
            tags.datadoghq.com/env: "dev"
            tags.datadoghq.com/service: "springfront"
            tags.datadoghq.com/version: "12"
        annotations:
            admission.datadoghq.com/java-lib.version: "latest"
    {{< /highlight >}}

5. 以下のコマンドでサンプルアプリを実行します。
   {{< code-block lang="shell" >}}
kubectl apply -f depl-with-lib-inj.yaml{{< /code-block >}}

6. 以下のコマンドを実行して、アプリと Agent が実行されていることを確認します。
   {{< code-block lang="shell" >}}
kubectl get pods{{< /code-block >}}

    このように表示されるはずです。

    ```
    NAME                                                READY   STATUS    RESTARTS   AGE
    datadog-agent-4s8rb                                 3/3     Running   0          28m
    datadog-agent-cluster-agent-5666cffc44-d8qxk        1/1     Running   0          28m
    datadog-agent-kube-state-metrics-86f46b8484-mlqp7   1/1     Running   0          28m
    springback-666db7b6b8-sb4tp                         1/1     Running   0          27m
    springfront-797b78d6db-mppbg                        1/1     Running   0          27m
    ```

7. 以下のコマンドを実行すると、ポッドの詳細が表示されます。
   {{< code-block lang="shell" >}}
kubectl describe pod springfront{{< /code-block >}}

   このように表示されるはずです。

    ```
    Events:
    Type    Reason     Age   From               Message
    ----    ------     ----  ----               -------
    Normal  Scheduled  32s   default-scheduler  Successfully assigned default/springfront-797b78d6db-jqjdl to docker-desktop
    Normal  Pulling    31s   kubelet            Pulling image "gcr.io/datadoghq/dd-lib-java-init:latest"
    Normal  Pulled     25s   kubelet            Successfully pulled image "gcr.io/datadoghq/dd-lib-java-init:latest" in 5.656167878s
    Normal  Created    25s   kubelet            Created container datadog-lib-java-init
    Normal  Started    25s   kubelet            Started container datadog-lib-java-init
    Normal  Pulling    25s   kubelet            Pulling image "pejese/springfront:v2"
    Normal  Pulled     2s    kubelet            Successfully pulled image "pejese/springfront:v2" in 22.158699094s
    Normal  Created    2s    kubelet            Created container springfront
    Normal  Started    2s    kubelet            Started container springfront
    ```

   ご覧のように、ポッドに init コンテナが追加されます。このコンテナには、ボリュームマウントへの Datadog の Java トレーシングライブラリが含まれています。また、`JAVA_TOOL_OPTIONS` は `javaagent` を含むように変更されています。そして Datadog 固有の環境変数がコンテナに追加されます。

    ```
    Environment:
    DD_ENV:              dev
    DD_VERSION:          12
    DD_SERVICE:          springfront
    DD_ENTITY_ID:         (v1:metadata.uid)
    DD_TRACE_AGENT_URL:  unix:///var/run/datadog/apm.socket
    URL:                 http://springback:8088
    JAVA_TOOL_OPTIONS:    -javaagent:/datadog-lib/dd-java-agent.jar
    Mounts:
    /datadog-lib from datadog-auto-instrumentation (rw)
    /var/run/datadog from datadog (rw)
    /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-qvmtk (ro)
    ```

8. ポッドのログを確認して、Datadog トレーシングライブラリがポッドに挿入されていることを確認します。例:
   {{< code-block lang="shell" >}}
kubectl logs -f springfront-797b78d6db-jqjdl{{< /code-block >}}

    このように表示されるはずです。

    ```
    Defaulted container "springfront" out of: springfront, datadog-lib-java-init (init)
    Picked up JAVA_TOOL_OPTIONS:  -javaagent:/datadog-lib/dd-java-agent.jar
    ```

## Datadog で APM トレースを表示

1. 次のコマンドを実行します。
   {{< code-block lang="shell" >}}
curl localhost:8080/upstream{{< /code-block >}}

2. Datadog の UI を開き、[サービスカタログ][11]の下に 2 つのサービスがレポートされていることを確認します。
   {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-catalog.png" alt="サービスカタログのスプリングバックとスプリングフロントサービス。" style="width:100%;" >}}

3. トレースを探索し、関連するサービスマップを参照します。
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-traces.png" alt="サービスを表すフレームグラフ。" style="width:100%;" >}}
    {{< img src="tracing/guide/tutorials/tutorial-admission-controller-service-map.png" alt="サービスを表すサービスマップ。" style="width:100%;" >}}

## 環境のクリーンアップ

以下のコマンドで環境をクリーンアップします。

{{< code-block lang="shell" >}}
kubectl delete -f depl-with-lib-inj.yaml
{{< /code-block >}}

Admission Controller を使用したライブラリ挿入は、サービスインスツルメンテーションを簡素化し、アプリケーションを変更または再構築することなく APM トレースを表示することができます。詳しくは、[Datadog ライブラリ挿入][12]を参照してください。

## トラブルシューティング
期待通りのトレースが受信できない場合は、Java トレーサーのでデバッグモードを設定してください。詳しくは[デバッグモードの有効化][13]をお読みください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/#enabling-tracing-tutorials
[2]: /ja/tracing/trace_collection/dd_libraries/java
[3]: /ja/account_management/api-app-keys
[4]: https://github.com/DataDog/springblog
[5]: /ja/containers/cluster_agent
[6]: /ja/getting_started/tagging/unified_service_tagging
[7]: /ja/tracing/trace_collection/library_injection_local
[8]: /ja/tracing/trace_collection/library_injection_local
[9]: https://github.com/DataDog/springblog/blob/main/k8s/depl.yaml
[10]: https://github.com/DataDog/springblog/blob/main/k8s/depl-with-lib-inj.yaml
[11]: https://app.datadoghq.com/services
[12]: /ja/tracing/trace_collection/admission_controller
[13]: /ja/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode