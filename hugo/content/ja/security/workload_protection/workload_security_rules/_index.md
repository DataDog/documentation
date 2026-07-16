---
aliases:
- /ja/security_platform/cloud_workload_security/workload_security_rules
- /ja/security/cloud_workload_security/workload_security_rules
- /ja/security/threats/workload_security_rules
title: Workload Protection の検出ルール
---

このトピックでは、Workload Protection がシステムのアクティビティを積極的に監視し、すぐに使えるルール セットに照らして評価することで、疑わしい挙動を検出する方法を説明します。

## Active Protection で脅威を積極的にブロック

デフォルトでは、Agent のすぐに使える暗号マイニングの脅威検出ルールがすべて有効になっており、脅威を積極的に監視しています。

[Active Protection][12] を使用すると、Datadog Agent の脅威検出ルールによって特定された暗号マイニングの脅威を積極的にブロックし、終了させることができます。

## Workload Protection のルールの構成

Workload Protection のルールは、Agent ルールと脅威検出ルールの 2 つのコンポーネントで構成されます。

- **Agent ルール:** [Agent ルール][9]は、Agent を実行しているホスト上で評価されます。Workload Protection はまず、Datadog Agent で観測したアクティビティを Agent 式に照らして評価し、収集対象を決定します。Agent 式には Datadog の [Security Language (SECL)][2] を使用します。<br><br>

  例えば、*Agent ルール*の式 `cryptominer_args` は次のようになります。

  ```text
  exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
  exec.args in [
      ~"*stratum+tcp*",
      ~"*stratum+ssl*",
      ~"*stratum1+tcp*",
      ~"*stratum1+ssl*",
      ~"*stratum2+tcp*",
      ~"*stratum2+ssl*",
      ~"*nicehash*",
      ~"*yespower*"
  ]
  ```
- **脅威検出ルール:** [脅威検出ルール][3]は、Datadog バックエンドで評価されます。脅威検出ルールは既存の Agent ルールと追加の式パラメーターで構成されます。<br><br>

  以下は、*脅威検出ルール* `Process arguments match cryptocurrency miner` です。このルールは、Agent ルール `cryptominer_args` と `windows_cryptominer_process` を `@agent.rule_id` で識別し、追加の式パラメーターを使用します。

  ```text
  @agent.rule_id:(cryptominer_args || windows_cryptominer_process)
  -@process.executable.path:"/usr/bin/grep"
  ```

### Workload Protection のルール パイプライン

Workload Protection はイベントを評価する際に、次のパイプラインを使用します。

1. Agent ルールは Agent ホスト上のシステムアクティビティを評価します。
2. アクティビティが Agent ルールの式に一致すると、Agent は検出イベントを生成し、それを Datadog バックエンドに渡します。
3. Datadog バックエンドは、検出イベントを評価し、イベントを送信した Agent ルールを使用する脅威検出ルールに一致するかどうかを確認します。
4. 一致するものがあれば、シグナルが生成され、[シグナル][8]に表示されます。
5. シグナルの重大度、検出ルールタイプ、タグ、および属性に一致するすべての [通知ルール][10]がトリガーされます。

次の図は、このパイプラインを示しています。

{{< img src="security/cws/threat_detection_pipeline_2.png" alt="Workload Protection の検出パイプライン" style="width:100%;" >}}

### 設計によるリソースの節約

Workload Protection の検出ルールは複雑で、複数のデータ ポイントを相関させ、時には異なるホストにまたがり、サード パーティ データも含みます。すべてのルールを Agent を実行しているホストで評価すると、この複雑さのために Agent ホスト側で多大な計算リソースを要します。

Datadog は、ルールを少数に抑えて Agent を軽量に保つことで、この問題を解決します。大半のルールは Datadog バック エンド側の脅威検出ルールで処理します。

Agent がルールに一致するイベントを観測した場合のみ、Datadog バックエンドに検出を送信します。Datadog バックエンドは、検出を評価し、それが脅威検出ルール式に一致するかどうかを判断します。一致した場合のみ、Datadog バックエンドはシグナルを作成します。

### カスタムルールの設計

カスタムルールを使用する際には、脅威検出ルールが Agent ルールに依存していることを理解することが重要です。カスタムルールは、Datadog のすぐに使えるルールでは検出されないイベントを検出するのに役立ちます。

次の 2 つのユースケースがあります。

- **既存の Agent ルールを使用して脅威検出ルールを作成する:** 既存の Agent ルールを使用する脅威検出ルールを作成するには、Agent ルールを参照し、必要な追加の式パラメーターを追加する脅威検出ルールを作成するだけで済みます。
- **新しい Agent ルールを使用して脅威検出ルールを作成する:** 現在の Agent ルールがサポートしていないイベントを検出するには、そのイベントを検出するカスタム Agent ルールを作成し、そのカスタム Agent ルールを使用するカスタム脅威検出ルールを作成します。

詳細については、[Workload Protection の検出ルール][11]を参照してください。

## Agent ルール概要

Agent ルールには、Agent が収集するアクティビティを決定する [Agent 式](#agent-expressions)が含まれます。Agent ルールのフルセットは、ポリシーと呼ばれます。Datadog は、デフォルトの Agent ポリシーによって駆動されるいくつかの[すぐに使える Agent ルール][6]を提供します。

[Workload Protection][7] を有効化しておくと、新規および更新済みの Workload Protection Agent ルールがリリース時に自動配信されます。これらのバンドル済み Agent ルールは、[デフォルトの検出ルール][1]で使用されます。

<!-- <div class="alert alert-info">Workload Protection のリモート構成はプレビュー中です。フィードバックや質問がございましたら、<a href="/help">Datadog サポート</a>までお寄せください。</div> -->

### Agent 式

Agent 式は、[Datadog の Security Language (SECL)][2] を使用して、以下の例に示すように、ホストやコンテナでのアクティビティに基づく動作を定義します。

#### `passwd` コマンドが実行されたときの検出

`passwd` コマンドが実行されたことを検出するためには、いくつかの属性に注意する必要があります。

ほとんどの Linux ディストリビューションでは、`passwd` ユーティリティは `/usr/bin/passwd` にインストールされています。実行イベントには、`exec`、`execve`、`fork` などのシステム コールが含まれます。Workload Protection の環境では、これらのイベントはすべて `exec` というシンボルで識別されます。

**ファイル整合性監視**により、ホストやコンテナ上の主要なファイルやディレクトリの変更をリアルタイムに監視します。

`passwd` コマンド ルールは、デフォルトの Workload Protection Agent ポリシーにすでに含まれています。一方、Agent 式はより高度に記述でき、プロセスの祖先にマッチするルールを定義したり、より広い検出のためにワイルド カードを使用したりできます。

#### PHP や Nginx のプロセスが Bash を起動したことを検出する

PHP や Nginx のプロセスが Bash を起動したことを検出するためには、いくつかの属性に注意する必要があります。

ほとんどの Linux ディストリビューションでは、Bash は `/usr/bin/bash` にインストールされています。前の例と同様に、実行を検出するには、ルールに `exec.file.path == "/usr/bin/bash"` を含めます。これにより、ルールが Bash の実行、および PHP や Nginx の子プロセスとしての Bash の実行を考慮していることが確認できます。

Workload Protection におけるプロセスの祖先のファイル名は、シンボル `process.ancestors.file.name` を持つ属性です。祖先が Nginx かどうかを確認するには、`process.ancestors.file.name == "nginx"` を追加します。PHP は複数のプロセスで動作するため、ワイルド カードを使用して、プレフィックス `php` を持つ任意のプロセスまでルールを拡張します。祖先が PHP プロセスかどうかを確認するには、`process.ancestors.file.name =~ "php*"` を追加します。

まとめると、ルール式は次のようになります: `exec.file.path == "/usr/bin/bash" && (process.ancestors.file.name == "nginx" || process.ancestors.file.name =~ "php*")`

## 検出ルール概要

検出ルールは、イベントがログとして送信された後、Datadog のバックエンドで実行されます。そして、[検出ルール][3]に記述されたイベントのパターンに基づいて、ログが評価されます。パターンが検出ルールに一致した場合、[セキュリティシグナル][8]が生成されます。Datadog は継続的に新しい検出ルールを開発しており、そのルールはお客様のアカウントに自動的にインポートされます。


[1]: /ja/security/default_rules/#cat-workload-security
[2]: /ja/security/workload_protection/agent_expressions
[3]: https://app.datadoghq.com/security/configuration/rules?product=cws
[4]: https://app.datadoghq.com/security/configuration/agent-rules
[5]: /ja/security/notifications/variables/
[6]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[7]: https://app.datadoghq.com/security/configuration/workload/setup
[8]: /ja/security/workload_protection/security_signals
[9]: https://app.datadoghq.com/security/configuration/workload/agent-rules
[10]: https://app.datadoghq.com/security/configuration/notification-rules
[11]: /ja/security/workload_protection/workload_security_rules/custom_rules
[12]: /ja/security/workload_protection/guide/active-protection