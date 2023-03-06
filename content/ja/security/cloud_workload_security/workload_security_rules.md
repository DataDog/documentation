---
aliases:
- /ja/security_platform/cloud_workload_security/workload_security_rules
further_reading:
- link: /security/cloud_workload_security/getting_started
  tag: ドキュメント
  text: クラウドワークロードセキュリティの概要
- link: /security/cloud_workload_security/agent_expressions
  tag: ドキュメント
  text: Agent 式
- link: security/cloud_workload_security/backend
  tag: ドキュメント
  text: クラウドワークロードセキュリティイベント
- link: /security/notifications/variables/
  tag: ドキュメント
  text: セキュリティ通知変数について
kind: documentation
title: クラウドワークロードセキュリティルールの管理
---

## 概要

クラウドワークロードセキュリティ (CWS) を有効にすると、Datadog Agent がシステムアクティビティをアクティブに監視し、一連のルールに照らして評価し、疑わしい挙動を検出します。

Datadog Agent をアップグレードすると、バンドルされた CWS Agent ルールを受け取ることができ、これは[デフォルトのシグナルルール][1]で使用されます。また、独自のカスタム Agent ルールを記述することも可能です。このガイドでは、Agent ルール、その作成方法、およびセキュリティシグナルを生成するためにそれらを使用する方法について説明します。

### Agent ルール

Agent ルールには、Agent が収集するアクティビティを決定する [Agent 式][2]が含まれています。これらのキャプチャされたイベントは、[ルール][3]に記述されたイベントのパターンに基づいて評価されます。

Agent のルール一式をポリシーと呼びます。Datadog では、デフォルトの Agent ポリシーにより、いくつかの[すぐに使える CWS Agent ルール][1]が提供されています。

### Agent 式

Agent 式は、ホストやコンテナ内のアクティビティに基づいた動作を定義します。例えば、「passwd コマンドが実行された」という挙動を検出したい場合、注意すべき属性がいくつかあります。

`passwd` は Unix のユーティリティで、そのファイルは `/usr/bin/passwd` です (最初の実装では仮定されています)。実行イベントには、`exec`、`execve`、`fork`、その他のシステムコールが含まれます。クラウドワークロードセキュリティの環境では、これらのイベントはすべて `exec` というシンボルで識別されます。

**ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。

この例は、デフォルトのクラウドワークロードセキュリティポリシーに存在する、実際のデフォルトルールです。しかし、Agent 式はより高度なことも可能です。例えば、プロセスの先祖にマッチするルールを定義したり、より広範な検出のためにワイルドカードを使用したりすることができます。

例えば、「PHP または Nginx のプロセスが bash を起動したとき」という挙動を検出したい場合、注意すべき属性がいくつかあります。

`bash` は Unix のユーティリティで、そのファイルは `/usr/bin/bash` です (最初の実装では仮定されています)。前の例と同様に、実行を検出するために、ルールに `exec.file.path == "/usr/bin/bash"` を含めます。これにより、ルールは bash の実行だけでなく、PHP や Nginx の子プロセスとしての bash も考慮するようになります。

クラウドワークロードセキュリティにおけるプロセスの祖先のファイル名は、シンボル `process.ancestors.file.name` を持つ属性になります。祖先が Nginx かどうかを確認するには、`process.ancestors.file.name == "nginx"` を追加します。PHP は複数のプロセスで動作しているので、ワイルドカードを使用して、プレフィックスが PHP のすべてのプロセスにルールを展開します。祖先が PHP プロセスかどうかを確認するには、`process.ancestors.file.name =~ "php*"` を追加します。**注**: ワイルドカードを使用する場合は、チルダを使用してください。

まとめると、ルール式は次のようになります: `exec.file.path == “/usr/bin/bash” && (process.ancestors.file.name == “nginx” || process.ancestors.file.name =~ "php*")`

これは、クラウドワークロードセキュリティをそのまま使用した場合のデフォルトルールの一部で、様々なシェル、シェルユーティリティ、Web サーバー、言語エンジンをリストでチェックするものです。等号の右辺は、`[“a”, “b”, “c”, ...]` という形式のリストです。

ある時点で、Agent が使用するための独自のカスタムルールを書きたいと思うかもしれません。以下は、効率的なルールを書くためのガイドラインと、Datadog でカスタムルールを作成する方法に関するステップバイステップの説明です。

## 効率的なルールの書き方のガイドライン

独自のルールを書く場合、効率を高めるために最適化できる戦略がいくつかあります。

### 属性

ポリシーがカーネル内で評価され、最大の効果を発揮するように、プロセスまたはファイルアクティビティに関するルールには、常に次のいずれかの属性を使用します。

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**注**: `[event_type]` は、例えば open や `exec` にすることができます。

ワイルドカード (`*`) は慎重に使用します。例えば、`open.file.path =~ "*/myfile"` は決して使ってはいけません。もし、ディレクトリの前にワイルドカードを使わなければならない場合は、最低でも 2 つのレベルが必要です (`open.file.path =~ "*/mydir/myfile")`)。

### 承認者と廃棄者

クラウドワークロードセキュリティは、ポリシーのどのルールもトリガーしないイベントをフィルターするために、承認者と廃棄者の概念を使用します。承認者と廃棄者は、個々のルールに作用するのではなく、イベントを許可または拒否します。

承認者は、Datadog Agent のカーネルレベルで許可リストとして機能します。例えば、特定のファイルのオープンは、オープンイベントの承認者となり、承認者のいないファイルのオープンイベントは、フィルタリングされます。同様に、廃棄者は Agent の中で拒否リストとして機能します。廃棄者は、ポリシー内のルールにマッチしないイベントを意図的にフィルタリングします。Agent は、実行時に廃棄者でフィルタリングするイベントを学習します。

承認者と廃棄者は、ポリシー全体に基づいて生成されます。このため、あるルールで特定のイベント (open、exec など) に対して承認者を利用しない場合、ポリシー全体でそのイベントに対して承認者を利用することができず、そのイベントを利用するすべてのルールの効率が悪くなってしまいます。

例えば、1 つのルールを除いて、open イベントの評価に明示的なファイル名 (例えば `open.file.path == "/etc/shadow”`) を使用し、その 1 つのイベントでワイルドカード (例えば `open.file.path == "/etc/*”`) を使用すると、open イベントは承認者を生成しませんが、実行中に廃棄者を生成するかもしれません。

一般的に、承認者はより強力で好まれます。承認者を使うことで、Agent は何をフィルターにかけるかを動的に学習するのではなく、見る必要のあるものだけを処理することができます。
### デフォルトのポリシーファイルを作成する

まず、以下の手順で Agent に読み込ませるデフォルトポリシーファイルを作成します。

1. Datadog で、**Setup & Configuration** の下にある [Agent Configuration ページ][4]に移動します。

2. 右上の **Add an Agent Rule** をクリックします。

3. ルールの名前と説明を追加します。

4. [Datadog Agent][1] バージョン 7.36 のみ、CWS ネットワークイベントの収集を有効にするには

    {{< img src="security/cws/workload_security_rules/define_agent_expression.png" alt="Expression フィールドにルールを追加する" >}}

   例えば、不審なコンテナクライアントを監視するには

    ```text
    exec.file.path in ["/usr/bin/docker", "/usr/local/bin/docker",
    "/usr/bin/kubectl", "/usr/local/bin/kubectl"] && container.id != ""
    ```

5. ルールを保存します。これにより、自動的に **Rules** ページに戻ります。

6. 右上の **Download Workload Security Policy** をクリックすると、デフォルトのポリシーファイルがローカルマシンにダウンロードされます。

### ルールを構成する

新しいデフォルトポリシーファイルがダウンロードされたら、[**Rules** ページ][3]に移動します。

1. 右上の **New Rule** ボタンをクリックします。
2. **Rule types** で **Workload Security** を選択します。**Threshold** や **New Value** など、検出方法を選択します。
3. 新しいクラウドワークロードセキュリティルールを構成します。ルールは、例えば `(||, &&)` のように、ブーリアンロジックと組み合わせた複数のルールケースを持つことができます。また、カウンター、グループ化、ロールアップウィンドウを設定することができます。

    {{< img src="security/cws/workload_security_rules/define_runtime_expression.png" alt="式フィールドにルールを追加する" >}}

4. このルールがセキュリティシグナルをトリガーするときのロジックを定義します。例えば、`a>0` は、手順 3 で設定したルールの条件がスライド時間内に一度でも満たされていれば、セキュリティシグナルがトリガーされることを意味します。ルールを関連付ける重大度を選択し、通知する関係者をすべて選択します。

    {{< img src="security/cws/workload_security_rules/rule_cases.png" alt="ルールのトリガー、重大度、通知の設定" >}}

5. ルールのトリガー、重大度、通知を設定します。ルールに名前を付け、Markdown 形式で通知メッセージを追加します。[通知変数][5]を使用して、タグとイベント属性を参照することにより、シグナルの具体的な詳細を提供します。メッセージの後に、複数のタグを追加して、カスタムルールによって生成されたシグナルにさらにコンテキストを与えます。

   **注**: Datadog は、本文に修復ランブックを含めることを推奨しています。テンプレートに記載されているように、実行時にコンテキストに応じたコンテンツを動的に生成するために、置換変数を使用します。

### 環境に合わせたポリシーの構成

お使いの環境に応じて、次のステップを完了します。

{{< tabs >}}
{{% tab "Host" %}}

`default.policy` ファイルをターゲットホストの `{$DD_AGENT}/runtime-security.d` フォルダーにコピーします。このファイルには、ホスト上の `dd-agent` ユーザーの `read` と `write` のアクセス権が最低限与えられていることを確認してください。

**注:** SCP や FTP などのユーティリティを使用する必要がある場合があります。
{{% /tab %}}
{{% tab "Helm" %}}

1. `default.policy` を含む ConfigMap を作成します。例えば、`kubectl create configmap jdefaultpol --from-file=default.policy` とします。

2. `datadog.securityAgent.runtime.policies.configMap` で ConfigMap (`jdefaultpol`) を `values.yaml` に追加します。

    ```yaml
    securityAgent:
      compliance:
        # [...]
      runtime:
        # datadog.securityAgent.runtime.enabled
        # Set to true to enable Security Runtime Module
        enabled: true
        policies:
          # datadog.securityAgent.runtime.policies.configMap
          # Place custom policies here
          configMap: jdefaultpol
      syscallMonitor:
        # datadog.securityAgent.runtime.syscallMonitor.enabled
        # Set to true to enable Syscall monitoring.
        enabled: false
    ```

3. `helm upgrade <RELEASENAME> -f values.yaml --set datadog.apiKey=<APIKEY> datadog/datadog` で Helm チャートをアップグレードします。

   &nbsp;**中:** `default.policy` にさらに変更を加える必要がある場合は、`kubectl edit cm jdefaultpol` を使用するか、`kubectl create configmap jdefaultpol --from-file default.policy -o yaml --dry-run=client | kubectl replace -f -` で configMap を置換してください。


{{% /tab %}}
{{< /tabs >}}

設定を確定するために、[Datadog Agent][6] を再起動します。

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/#cat-workload-security
[2]: /ja/security/cloud_workload_security/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/
[6]: /ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
