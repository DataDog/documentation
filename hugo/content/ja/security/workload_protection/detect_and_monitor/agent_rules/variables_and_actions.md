---
description: SECL 変数と Agent ルールのアクションを使用して、イベントをエンリッチし、脅威に対応し、ステートフルな検知ロジックを構築します。
disable_toc: false
title: 変数とアクション
---
ルールアクションは、Workload Protection (ランタイムセキュリティ) ルールを検知の枠を超えて拡張します。ルールがイベントに一致すると、Agent は 1 つ以上のアクションを実行して、イベントをエンリッチし、脅威に対応するか、複数のステップを用いた検知ロジックを構築できます。

アクションは、Agent ポリシーファイル (`.policy`) のルールの `actions` フィールドで定義されます。
<div class="alert alert-info">すべてのアクションは Agent 上の Agent ポリシーファイル (YAML) で構成できますが、ルールの作成時に UI から <code>log</code>、<code>coredump</code>、および <code>network_filter</code> をセットアップすることはできません。
Datadog で Agent ルールを作成する際、 <code>hash</code>、<code>kill</code> (<a href="/security/workload_protection/respond_and_report/#automated-response">自動応答</a>)、および <code>set</code> アクションを構成できます。Security シグナルから、 <code>kill</code> または <code>network_filter</code> を使用して、標的となった脅威に<a href="/security/workload_protection/respond_and_report/#response">手動で</a>適用できます。
</div>

| アクション           | 目的                                               | プラットフォーム       | 強制適用が必要 |
| ---------------- | ----------------------------------------------------- | -------------- | -------------------- |
| `set`            | 他のルールで使用するために状態を変数に保存する      | Linux、Windows | いいえ                   |
| `kill`           | プロセスを終了する                                   | Linux、Windows | はい                  |
| `hash`           | ファイルのハッシュを計算する                              | Linux          | いいえ                   |
| `log`            | Agent ログにメッセージを書き込む                      | Linux、Windows | いいえ                   |
| `coredump`       | フォレンジック状態 (プロセス、マウント、dentry) をキャプチャする       | Linux          | いいえ                   |
| `network_filter` | BPF フィルターに一致するネットワークトラフィックを監視またはドロップする | Linux          | はい                  |


## 構文 {#syntax}

各ルールでは、YAML リストとして複数のアクションを定義できます。各リスト項目には、必ず 1 つのアクションタイプを含める必要があります。

{{< code-block lang="yaml" >}}
rules:
  - id: my_rule
    expression: exec.file.name == "suspicious_binary"
    actions:
      - set:
          name: flagged_process
          value: true
          ttl: 5m
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

### アクションフィルター{#action-filters}

すべてのアクションは、オプションの `filter` フィールドをサポートしています。これは、アクション実行時に評価される SECL 式です。アクションは、ルール式とアクションフィルターの両方が一致した場合にのみ実行されます。


| フィールド    | 必須 | デフォルト                                | 説明                               |
| -------- | -------- | -------------------------------------- | ----------------------------------------- |
| `filter` | いいえ| なし (ルールが一致するたびにアクションが実行されます) | アクション実行時に評価される SECL 式。|


{{< code-block lang="yaml" >}}
rules:
  - id: kill_container_process
    expression: exec.file.name == "malware"
    actions:
      - filter: process.container.id != ""
        kill:
          signal: SIGTERM
          scope: container

{{< /code-block >}}

## `set`: 変数を保存する{#set-store-variables}

`set` を使用して、同じポリシー内のルール間で永続する状態を保存します。定義された変数は、そのポリシー内の他のどのルールからでも参照できます。

### 使用方法{#when-to-use-it}

変数は、Agent ルール作成における最も強力な機能の 1 つです。これらは、単一の SECL 式だけでは表現できない、ステップを用いたステートフルな検知を構築するために不可欠です。

- あるルールでコンテキストを記録し、その変数を参照する後続のルールを一致させることで、ポリシー内のルールを連鎖させます。
- プロセス名、パス、または DNS アクティビティのローリングリストを構築します。

### パラメーター{#parameters}


| フィールド           | 必須                                 | デフォルト                         | 説明                                                                                      |
| --------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `name`          | はい                                      | —                               | 変数名。式内では `${name}` または `${scope.name}` として参照されます。                       |
| `value`         | `value`、`field`、または `expression` |  のいずれか —                               | 静的な値 (文字列、整数、ブール値、または配列)。                                              |
| `field`         | `value`、`field`、または `expression` |  のいずれか —                               | トリガーイベントから値をコピーします (例: `process.file.name`)。                      |
| `expression`    | `value`、`field`、または `expression` |  のいずれか —                               | 結果が保存される SECL 式。型を推論できない場合は `default_value` が必要です。    |
| `default_value` | なし                                       | —                               | `expression` を使用する場合のデフォルト。`value` の型と一致する必要があります。                                |
| `scope`         | なし                                       | グローバル (スコーププレフィックスなし)        | `process`、`container`、または `cgroup`。変数名の前にプレフィックスを付けます (例: `process.my_var`)。|
| `scope_field`   | なし                                       | トリガープロセス PID          | カスタムスコープキー (`process` スコープのみ)。                                                        |
| `append`        | なし                                       | `false`                         | 上書きせずに、リスト変数に追加します。                                               |
| `size`          | なし                                       | `100` (`append`が `true` の場合) | `append`が `true` の場合の最大リスト長。                                                    |
| `ttl`           | なし                                       | 有効期限なし                   | 存続期間 (例: `10s`、`5m`)。変数はこの期間後に期限切れになります。                  |
| `inherited`     | なし                                       | `false`                         | 変数は子プロセスに継承されます (`process`スコープのみ)。                                |
| `private`       | なし                                       | `false`                         | 変数はセキュリティイベントで公開されません。                                                     |


### 例 {#examples}

ブールフラグを設定します。

{{< code-block lang="yaml" >}}
rules:
  - id: flag_suspicious_exec
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: suspicious
          value: true
          ttl: 10m
  - id: detect_follow_up
    expression: open.file.path == "/etc/shadow" && ${suspicious}
{{< /code-block >}}

DNS クエリをローリングリストに収集します。

{{< code-block lang="yaml" >}}
rules:
  - id: collect_dns_queries
    expression: dns.question.name != ""
    actions:
      - set:
          name: queried_domains
          field: dns.question.name
          append: true
          size: 10
          ttl: 10s
          scope: process

{{< /code-block >}}

相関ルールを作成します。

`private`を使用して内部状態を Security イベントから除外します。また、`scope_field` を使用して、イベントをトリガーしたプロセス以外のプロセスに変数をバインドします (例: `cgroup_write`イベントのターゲット)。

{{< code-block lang="yaml" >}}
rules:
  - id: init_correlation_key
    expression: cgroup_write.file.path != "" && ${process.correlation_key} == ""
    actions:
      - set:
          name: correlation_key
          default_value: ""
          expression: '"attack_${builtins.uuid4}"'
          scope: process
          scope_field: cgroup_write.pid
          inherited: true
          private: true
  - id: detect_correlated_file_access
    expression: open.file.path == "/etc/shadow" && ${process.correlation_key} != ""
{{< /code-block >}}

式から値を計算します。
`expression` と `default_value` を使用して変数型を定義し、計算結果を保存します。

{{< code-block lang="yaml" >}}
rules:
  - id: record_exec_context
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: exec_context
          default_value: ""
          expression: '"cmd_${process.pid}_${exec.file.name}"'
          scope: process
          ttl: 5m
{{< /code-block >}}

## `kill`: プロセスを終了する {#kill-terminate-a-process}

`kill` を使用して、悪意のあるアクティビティを積極的に停止します。Agent は、ターゲットのプロセス、コンテナ、または cgroup に POSIX シグナルを送信します。

### Datadog での構成 {#configure-in-datadog}

Agent ポリシーファイルで `kill` アクションを定義することに加え、Datadog でプロセス終了を構成できます。

- **自動:** このセクションで説明されているように、ポリシー内の Agent ルールに `kill` アクションを追加するか、[自動応答][1]を使用します。
- **手動:** Security シグナルから、シグナルサイドパネルの {{< ui >}}Respond{{< /ui >}} の下にある[コンテナまたはプロセスの強制終了][2]を使用します。

どちらのアプローチも、デフォルトで有効になっている [Agent 強制適用][3]が必要です。強制適用と応答アクションの概要については、[脅威への対応][4]を参照してください。

### 使用方法 {#when-to-use-it-1}

- 実行時にクリプトマイニング、リバースシェル、または既知のマルウェアをブロックします。
- プロセスを正常に停止する (`SIGTERM`) か、強制終了します (`SIGKILL`)。

### 要件 {#requirements}

- Agent 構成 (`runtime_security_config.enforcement.enabled`) で強制適用を有効にする必要があります。[高度な構成][5]を参照してください。
- 強制適用がグローバルに無効になっている場合、終了アクションはポリシーの読み込み時に拒否されます。
- サポートされているシグナルには、`SIGKILL`、`SIGTERM`、`SIGHUP`、`SIGINT`、およびその他の標準的な POSIX シグナル名が含まれます。

### パラメーター {#parameters-1}


| フィールド                         | 必須 | デフォルト   | 説明                                                                         |
| ----------------------------- | -------- | --------- | ----------------------------------------------------------------------------------- |
| `signal`                      | はい      | —         | シグナル名 (例: `SIGKILL`、`SIGTERM`)。                                   |
| `scope`                       | いいえ       | `process` | `process`、`container`、または `cgroup`。どのプロセスがシグナルを受信するかを決定します。|
| `disable_container_disarmer`  | いいえ       | `false`   | 自動コンテナ解除セーフガードを無効にします。                                |
| `disable_executable_disarmer` | いいえ       | `false`   | 自動実行ファイル無効化セーフガードを無効にします。                               |


### セーフガード{#safeguards}

Agent には、自動応答中の暴走した kill ループを防ぐための無効化機能が含まれています。設定された期間内に同じコンテナまたは実行ファイルに対して過剰な kill アクションが実行された場合、その期間が終了するまで、そのターゲットに対する後続の kill は抑制されます。

特定のバイナリも、`runtime_security_config.enforcement.exclude_binaries` を通じて強制適用から除外できます。

### 例 {#example}

{{< code-block lang="yaml" >}}
rules:
  - id: block_ping_process
    expression: >-
      exec.file.name == "ping"
    actions:
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

#### Kill アクションレポート {#kill-action-report}

`kill` アクションが実行されると、Agent はトリガーとなった Agent イベントに `agent.rule_actions` でアクションレポートを添付します。これは個別のカスタムイベントではなく、レポートはルールに一致した Security イベントとともにシリアル化されます。`SIGKILL` の場合、Agent はターゲットプロセスが終了するまでイベントの送信を遅延させ、タイミングフィールドが正確になるようにする場合があります。

| フィールド | 説明 |
| ----- | ----------- |
| `type` | 常に `kill` |
| `signal` | POSIX シグナルが送信されました (例: `SIGKILL`、`SIGTERM`) |
| `scope` | `process`、`container`、または `cgroup` |
| `status` | 実行結果: `performed`、`partially_performed`、`error`、`kill_queued`、`kill_aborted`、`rule_disarmed`、または `rule_dismantled` |
| `disarmer_type` | Kill をブロックまたは変更したセーフガード: `container` または `executable` (該当する場合) |
| `created_at` | ターゲットプロセスが作成された時刻 |
| `detected_at` | ルールが一致した時刻 |
| `killed_at` | シグナルが送信された時刻 (該当する場合) |
| `exited_at` | ターゲットプロセスが終了した時刻 (該当する場合) |
| `ttr` | プロセス作成から終了までの経過時間 |

ルールの一致後に `kill` アクションが実行された回数をカウントするには、タグ `rule_id:<rule_id>` および `action_name:kill` を指定して `datadog.runtime_security_config.rules.action_performed` メトリクスを使用します。

## `network_filter`: ネットワークトラフィックの監視またはブロック {#network-filter-monitor-or-block-network-traffic}

`network_filter` を使用して、侵害されたプロセスまたは cgroup の BPF フィルター式に一致するパケットをドロップします。これはホストレベルでのネットワーク分離です。

### Datadog での構成 {#configure-in-datadog-1}

Agent ポリシーファイルで `network_filter` アクションを定義することに加え、Datadog で侵害されたワークロードを分離できます。

- **自動:** このセクションで説明されているように、ポリシー内の Agent ルールに `network_filter` アクションを追加します。ルールが一致すると、Agent は一致するトラフィックを自動的にドロップします。
- **手動:** セキュリティシグナルから、シグナルサイドパネルの {{< ui >}}Respond{{< /ui >}} の下にある [Network isolation][6] を使用します。

### 使用するタイミング{#when-to-use-it-2}

- 悪意のあるプロセスを検出した後に C2 通信を遮断します。
- 侵害されたコンテナからの DNS トラフィックまたは特定のポートのトラフィックをブロックします。

### 要件 {#requirements-1}

- 強制適用を有効にする必要があります。
- Agent 設定で `raw_packet` イベントタイプを有効にする必要があります。
- Linux のみ (eBPF ベースのパケットフィルタリング)。

### パラメーター {#parameters-2}


| フィールド    | 必須 | デフォルト   | 説明                                                    |
| -------- | -------- | --------- | -------------------------------------------------------------- |
| `filter` | はい      | —         | BPF フィルター式 (例: `port 53`、`tcp port 80`)。|
| `policy` | いいえ | `allow`   | `drop` または `allow`。`drop` のみがパケットのドロップを強制します。      |
| `scope`  | いいえ       | `process` | `process` または `cgroup`。                                        |


### 例 {#example-1}

{{< code-block lang="yaml" >}}
rules:
  - id: block_malicious_container_network
    expression: exec.container.id == "046f6a38c8b404a78fb9be56672d554ed5a326f4c568ffb137e16cf3e7e6be43"
    actions:
      - network_filter:
          filter: "dst net 10.0.0.0/8 or dst net 172.16.0.0/12 or dst net 192.168.0.0/16 or dst net 169.254.0.0/16 or dst net 127.0.0.0/8"
          policy: drop
          scope: cgroup

{{< /code-block >}}

### 生のパケットアクションとメトリクス {#raw-packet-action-and-metrics}

#### 生のパケットアクションイベント {#raw-packet-action-event}

カーネルがアクティブなフィルターに一致するパケットをドロップすると、Agent は `rawpacket_action` カスタムイベント (`@agent.rule_id:rawpacket_action`) を発行できます。Agent はドロップされたすべてのパケットに対してイベントを送信できないため、これらのイベントはドロップ量が多い場合にはレート制限されます。イベントペイロードには以下が含まれます。


| フィールド            | 説明                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `packet.dropped` | `true` (ドロップされたパケット用)                                           |
| `packet.layers`  | デコードされたネットワークレイヤー (Ethernet、IP、TCP/UDP など)            |
| `packet.tls`     | 利用可能な場合の TLS コンテキスト                                           |
| `network`        | ドロップされたパケットのネットワークコンテキスト (デバイス、ソース、宛先) |


#### メトリクス {#metrics}

ドロップ数を確実に追跡するには、`datadog.runtime_security_config.network.raw_packet.dropped` メトリクスを使用します。

## `hash`: ファイルハッシュを計算する {#hash-compute-file-hashes}

トリガーイベントで参照されるファイルの暗号化ハッシュでイベントをエンリッチするには、`hash` を使用します。これは、脅威インテリジェンスの照合やフォレンジック分析に役立ちます。

### 使用するタイミング {#when-to-use-it-3}

- バイナリが削除または変更される前に、実行時にハッシュ化します。
- 書き込み用に開かれたファイルをハッシュ化し、既知のマルウェアシグネチャと関連付けます。

### パラメーター {#parameters-3}


| フィールド           | 必須 | デフォルト                                                                      | 説明                                                                                       |
| --------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `field`         | いいえ       | `exec.file` (`exec` ルールの場合); `open.file` (`open` ルールの場合)                   | ハッシュ化するファイルイベントフィールド (例: `exec.file`、`open.file`)。他のイベントタイプで必須です。|
| `max_file_size` | いいえ       | `5242880` (5 MB)、`runtime_security_config.hash_resolver.max_file_size` | ハッシュ化する最大ファイルサイズ (バイト) から。これより大きいファイルはスキップされます。                                     |


### サポートされているアルゴリズム {#supported-algorithms}

ハッシュは Agent のハッシュリゾルバーによって計算され、Agent の構成に応じて `MD5`、`SHA1`、`SHA256`、および `SSDEEP` が含まれる場合があります。結果はファイルイベントの `*.hashes` フィールドに表示されます (例: `exec.file.hashes`)。使用するアルゴリズムを変更するには、`system-probe.yaml` の `runtime_security_config.hash_resolver.hash_algorithms` を更新するか、`DD_RUNTIME_SECURITY_CONFIG_HASH_RESOLVER_HASH_ALGORITHMS` を設定します。すべてのハッシュリゾルバーパラメーターについては、[Workload Protection Agent の構成][5]を参照してください。

### 例 {#example-2}

{{< code-block lang="yaml" >}}
rules:
  - id: hash_dropped_binary
    expression: exec.file.path startswith "/tmp/" && exec.file.name not in ["systemd"]
    actions:
      - hash:
          field: exec.file
          max_file_size: 10485760  # 10 MB

{{< /code-block >}}

## `log`: Agent ログに書き込む {#log-write-to-agent-logs}

ルールがトリガーされたときに、Runtime Security Agent ログに構造化メッセージを出力するには、`log` を使用します。これは、完全なセキュリティシグナルを生成せずに、カスタムルールのデバッグやルールのトリガーの監査を行う場合に役立ちます。

### 使用方法{#when-to-use-it-4}

- 開発中のルールロジックのデバッグ。

### パラメーター {#parameters-4}


| フィールド     | 必須 | デフォルト                    | 説明                                        |
| --------- | -------- | -------------------------- | -------------------------------------------------- |
| `level`   | はい      | —                          | ログレベル: `debug`、`info`、`warning`、または `error`。|
| `message` | いいえ       | `Rule <rule_id> triggered` | カスタムメッセージ。                                   |


### 例 {#example-3}

{{< code-block lang="yaml" >}}
rules:
  - id: log_sensitive_file_access
    expression: open.file.path startswith "/etc/"
    actions:
      - log:
          level: warning
          message: "Suspicious file access detected on sensitive path"

{{< /code-block >}}

## `coredump`: フォレンジック状態のキャプチャ {#coredump-capture-forensic-state}

ルールが一致した時点で Agent の内部状態のスナップショットを取得するには、`coredump` を使用します。ダンプは (無効にされていない限り) gzip 圧縮され、Security イベントに添付されます。

### 使用方法{#when-to-use-it-5}

- 主にデバッグ目的で使用されます。
- トリガーイベントとともに、プロセスツリー、マウントテーブル、dentry キャッシュ状態などの内部コンテキストキャッシュをキャプチャします。

### プラットフォーム {#platform}

Linux のみ。

### パラメーター {#parameters-5}

`process`、`mount`、または `dentry` のいずれか 1 つを `true` に設定する必要があります。


| フィールド            | 必須     | デフォルト                            | 説明                                   |
| ---------------- | ------------ | ---------------------------------- | --------------------------------------------- |
| `process`        | 少なくとも 1 つ | `false`                            | プロセスリゾルバーのスナップショットを含めます。       |
| `mount`          | 少なくとも 1 つ | `false`                            | マウントリゾルバーのスナップショットを含めます。         |
| `dentry`         | 少なくとも 1 つ | `false`                            | dentry リゾルバーのスナップショットを含めます。        |
| `no_compression` | いいえ           | `false` (gzip 圧縮が有効) | ダンプペイロードの gzip 圧縮を無効にします。|


### 例 {#example-4}

{{< code-block lang="yaml" >}}
rules:
  - id: capture_forensic_state
    expression: exec.file.path startswith "/tmp/" && process.container.id != ""
    actions:
      - coredump:
          process: true
          mount: true
          dentry: true
          no_compression: false

{{< /code-block >}}

## アクションの組み合わせ {#combining-actions}

1 つのルールで複数のアクションを連結できます。ルールが一致すると、リストの順序で実行されます。

{{< code-block lang="yaml" >}}
rules:
  - id: detect_and_respond
    expression: exec.file.path == "/tmp/payload"
    actions:
      - set:
          name: payload_seen
          value: true
      - hash:
          field: exec.file
      - log:
          level: info
          message: "Payload executed, hashing and killing"
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

一般的なパターン:


| パターン                 | アクション                                       |
| ----------------------- | --------------------------------------------- |
| 検出 → エンリッチ → アラート | `hash` のみ (シグナルは自動的に送信されます) |
| 検出 → 応答 | `kill` または `network_filter`                    |
| マルチステップ検出    | `set` ルール A 内、参照 `${var}` ルール B 内 |
| カスタムルールのデバッグ      | `log`                                         |


## プラットフォームの概要 {#platform-summary}


| アクション           | Linux | Windows |
| ---------------- | ----- | ------- |
| `set`            | ✅     | ✅       |
| `kill`           | ✅     | ✅       |
| `hash`           | ✅     | ❌       |
| `log`            | ✅     | ✅       |
| `coredump`       | ✅     | ❌       |
| `network_filter` | ✅     | ❌       |


## 検証ルール {#validation-rules}

Agent はポリシーの読み込み時にアクションを検証します。

- **リスト項目ごとに 1 つのアクションタイプ**: `set` と `kill` は同じアクションブロック内に含めることはできません。
- **必須フィールド**: 例: `kill.signal`、`log.level`、`network_filter.filter`。
- **強制ゲート**: `kill` と `network_filter` は強制が有効になっている必要があります。
- **イベントタイプの互換性**: `network_filter` には `raw_packet` イベントタイプが必要です。`hash.field` はルールのイベントタイプと互換性がある必要があります。

[1]: /ja/security/workload_protection/respond_and_report/#automated-response
[2]: /ja/security/workload_protection/investigate_and_triage/security_signals/actions#kill-containers-or-processes
[3]: /ja/security/workload_protection/respond_and_report/#configure-agent-enforcement
[4]: /ja/security/workload_protection/respond_and_report/
[5]: /ja/security/workload_protection/setup/advanced_configuration
[6]: /ja/security/workload_protection/investigate_and_triage/security_signals/actions#network-isolation