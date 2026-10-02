---
aliases:
- /ja/security/workload_protection/agent_expressions
- /ja/security/threats/agent_expressions
- /ja/security/workload_protection/secl_auth_guide
- /ja/security/workload_protection/guide/custom-rules-guidelines
description: Datadog Security Language (SECL) を使用して、Workload Protection Agent ルール式を作成します。
disable_toc: false
title: SECL ガイド
---
Datadog SECL は、Datadog Workload Protection 内で Agent 式やポリシーを作成するときに使用されるカスタムドメイン固有言語です。セキュリティチームは SECL を使用して、条件や演算子、またはセキュリティエージェントがホスト、コンテナ、アプリケーション、クラウドインフラストラクチャー全体で監視できるパターンを指定してリアルタイムの脅威検出ルールを定義できます。

## SECL ルールの仕組み {#how-secl-rules-fit-together}

SECL はローカルフィルターのようなものです。各ホスト上の Agent 内で実行され、カーネルイベントや OS イベントを監視します。イベントが SECL 式と一致すると、Agent は検知を報告します。

Datadog の脅威検出ルールはバックエンドロジックとして機能します。このルールは (`@agent.rule_id` を使用して) 1 つ以上の Agent ルールを組み合わせ、しきい値を追加し、ノイズを抑制し、アラートのルーティング方法を決定します。

要約すると、Agent ルールは未加工の動作を検出し、検出ルールはそれをエンドツーエンドの攻撃ストーリーに変えます。

<div class="alert alert-info">このガイドではルール式を手動で作成する方法を説明しますが、Workload Protection には、Agent ルールと検出ルールを同時に作成する手順を案内する [<b>Assisted rule creator</b>] (ルール作成支援機能) ウィザードも用意されています。<a href="/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-the-custom-agent-and-detection-rules-together">カスタム Agent ルールと検出ルールを同時に作成する</a>を参照してください。</div>

## SECL 式の構文 {#secl-expression-syntax}

SECL 式の標準的な形式は次のとおりです。

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

この形式を用いた Linux システム向けの例となるルールは、次のようになります。

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]
{{< /code-block >}}

### 演算子 {#operators}

SECL 演算子は、イベント属性を組み合わせて完全な式を作成するために使用されます。以下の演算子が利用可能です。

| SECL 演算子         |  定義                              | Agent バージョン |
|-----------------------|------------------------------------------|---------------|
| `==`                  | 等しい                                    | 7.27          |
| `!=`                  | 等しくない                                | 7.27          |
| `>`                   | 大なり                                  | 7.27          |
| `>=`                  | 以上                         | 7.27          |
| `<`                   | 小なり                                   | 7.27          |
| `<=`                  | 以下                          | 7.27          |
| `!` または `not`          | 否定                                      | 7.27          |
| `^`                   | バイナリ否定 | 7.27          |
| `in [elem1, ...]`     | 要素がリストに含まれている             | 7.27          |
| `not in [elem1, ...]` | 要素がリストに含まれていない         | 7.27          |
| `=~`                  | 一致する文字列                          | 7.27          |
| `!~`                  | 一致しない文字列                      | 7.27          |
| `&`                   | バイナリ AND                               | 7.27          |
| `\|`                  | バイナリ OR                                | 7.27          |
| `&&` または `and`         | 論理 AND                              | 7.27          |
| `\|\|` または `or`        | 論理 OR                               | 7.27          |
| `in CIDR`             | 要素が IP 範囲にある               | 7.37          |
| `not in CIDR`         | 要素が IP 範囲にない           | 7.37          |
| `allin CIDR`          | すべての要素が IP 範囲にある     | 7.37          |
| `in [CIDR1, ...]`     | 要素が IP 範囲にある              | 7.37          |
| `not in [CIDR1, ...]` | 要素が IP 範囲にない          | 7.37          |
| `allin [CIDR1, ...]`  | すべての要素が IP 範囲にある    | 7.37          |

### パターンと正規表現 {#patterns-and-regular-expressions}

SECL 式ではパターンまたは正規表現を使用できます。これらは `in`、`not in`、`=~`、および `!~` 演算子とともに使用できます。

| 形式           |  例             | サポート対象フィールド   | Agent のバージョン |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | All                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | 次を除くすべて: `.path` | 7.27          |

`.path` フィールドのパターンは Glob として使用されます。`*` は同じレベルのファイルやフォルダに一致します。7.34 で導入された `**` は、すべてのファイルとサブフォルダに一致させるためにパスの末尾に使用できます。

### 期間 {#durations}

SECL を使用して期間に基づくルールを作成できます。これは、特定の期間中に発生するイベントに対してトリガーされます。たとえば、プロセスを作成してから一定時間が経過した後でシークレットファイルへのアクセスがあったイベントでトリガーします。
このようなルールは次のように記述できます。

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s
{{< /code-block >}}

期間は単位サフィックスが付いた数値です。サポートされているサフィックスは "s"、"m"、"h" です。

### プラットフォーム固有の構文 {#platform-specific-syntax}

SECL 式は複数のプラットフォームをサポートしています。以下のドキュメントを参照して、各プラットフォームで使用可能な属性とヘルパーを確認できます。

- [Linux][1]
- [Windows][2]

## ルール作成のヒント {#rule-authoring-tips}

- 常にオペレーティングシステム (OS) を設定します。
- ノイズを減らすため、祖先にアンカーを設定します。`process.ancestors.file.name` を使用します。
- 期間 (例: `> 5s`、`10m`、`2h`) を使用して短い実行ウィンドウをターゲットにします。
- 可能な限り完全一致 (`==`) を使用します。これにより、ノイズが最も少なくなります。
- リストメンバーシップ (`in [...]`) は、許可リストや制御された値セットに最適です。
- パスファミリーには glob 一致 (`~"/path/*"`) を使用します。これは正規表現よりも安全で高速です。
- glob やリストが使用できない場合にのみ、正規表現 (`=~`) を使用してください。正規表現は可能な限り限定的にしてください。目安として、`==` または `in [...]` から始めてください。正規表現は最後の手段としてのみ使用してください。
- 否定 (`not in [...]`、`!~`) を使用して、例外 (信頼できるツールなど) を明示的に除外します。
- ネットワーク境界には CIDR 演算子 (`in CIDR`、`not in CIDR`) を使用します。
- ルールには動作に基づいた名前を付けます。形式は *What + Who + Context* に従います。
- 十分にタグ付けします (`team`、`app`、`env`、`MITRE`、`severity`)。

### 一般的な誤りを避けてください {#avoid-common-mistakes}

| パターン                   | 説明                                 |
| ------------------------- | -------------------------------------------- |
| `open.file.path == "/etc/passwd"`、`exec.comm != ""` | 広すぎます。多数の有効なユースケースに一致します。 |
| `container.id != ""`      | より具体的なフィールドでスコープを絞った場合にのみ有用です。|

## ライブラリの例 {#example-library}

<div class="alert alert-info">より詳細な例については、Agent に標準で同梱されているデフォルトポリシーを参照してください。<a href="https://github.com/DataDog/security-agent-policies/blob/master/runtime/default.policy">Workload Protection のデフォルトポリシー</a>を参照してください。</div>

Agent ポリシーファイルでは、各ルールに `id` と `expression` が含まれています。オプションの `actions` を追加することもできます。詳細については、[変数とアクション][3] を参照してください。

### Linux {#linux}

#### 機密ファイルへのアクセス (安全なツールを許可リストに登録){#access-to-sensitive-files-allowlist-safe-tools}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: access_sensitive_files
    expression: >-
      open.file.path in ["/etc/shadow", "/etc/sudoers"] &&
      process.file.path not in ["/usr/sbin/vipw", "/usr/sbin/visudo"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### bash を起動する NGINX または PHP{#nginx-or-php-spawning-bash}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: nginx_php_spawn_bash
    expression: >-
      exec.file.path == "/usr/bin/bash" &&
      (
        process.ancestors.file.name == "nginx" ||
        process.ancestors.file.name =~ "php*"
      )
    filters:
      - os == "linux"
{{< /code-block >}}

#### コンテナからの不審な IMDS アクセス{#suspicious-imds-access-from-container}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: suspicious_imds_access
    expression: >-
      connect &&
      network.destination.ip in ["169.254.169.254"] &&
      container.id != ""
    filters:
      - os == "linux"
{{< /code-block >}}

#### メンテナンスウィンドウ外でのカーネルモジュールのロード{#kernel-module-loads-outside-maintenance-window}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: kernel_module_load
    expression: >-
      load_module &&
      process.user != "root" &&
      process.ancestors.file.name not in ["modprobe", "insmod"]
    filters:
      - os == "linux"
{{< /code-block >}}

#### 起動直後の機密ファイルの読み取り{#sensitive-file-read-shortly-after-start}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: sensitive_file_read_after_start
    expression: >-
      open.file.path == "/etc/secret" &&
      process.file.name == "java" &&
      process.created_at > 5s
    filters:
      - os == "linux"
{{< /code-block >}}

#### 企業外 IP へのアウトバウンド通信 (CIDR 許可リスト){#outbound-to-non-corporate-ips-cidr-allowlist}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: outbound_non_corporate_ips
    expression: >-
      connect &&
      network.destination.ip not in [10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12]
    filters:
      - os == "linux"
{{< /code-block >}}

### Windows {#windows}

#### 実行キーによるレジストリの永続化{#registry-persistence-through-a-run-key}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: registry_run_key_persistence
    expression: >-
      set_key_value &&
      open_key.registry.key_path =~ "*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*"
    filters:
      - os == "windows"
{{< /code-block >}}

#### 署名のないバイナリによる PowerShell の起動{#unsigned-binary-launching-powershell}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: unsigned_binary_powershell
    expression: >-
      exec.file.path =~ "*\\WindowsPowerShell\\v1.0\\powershell.exe" &&
      process.parent.file.path !~ "*\\Program Files*" &&
      process.user_sid != "S-1-5-18"
    filters:
      - os == "windows"
{{< /code-block >}}

### クロスプラットフォーム{#cross-platform}

#### 暗号通貨マイナーのインジケーター{#crypto-miner-indicators}

{{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
rules:
  - id: crypto_miner_indicators
    expression: >-
      exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
      exec.args in [~"*stratum+tcp*", ~"*nicehash*", ~"*yespower*"]
{{< /code-block >}}

[1]: /ja/security/workload_protection/linux_expressions
[2]: /ja/security/workload_protection/windows_expressions
[3]: /ja/security/workload_protection/detect_and_monitor/agent_rules/variables_and_actions