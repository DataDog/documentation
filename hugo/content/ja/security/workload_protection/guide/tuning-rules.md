---
aliases:
- /ja/security_platform/cloud_workload_security/guide/tuning-rules/
- /ja/security_platform/cloud_security_management/guide/
- /ja/security/cloud_security_management/guide/tuning-rules
description: 検出カバレッジを損なうことなく、Workload Protectionのノイズを低減するシグナル抑制を構築するためのベストプラクティス。
title: Workload Protection のセキュリティシグナルを調整するためのベストプラクティス
---
Workload Protectionは、ワークロードレベルで発生する疑わしいアクティビティを監視します。しかし、ユーザー環境の特定の設定が原因で、良性のアクティビティが悪意のあるものとしてフラグが立てられる場合があります。良性の予期されたアクティビティがシグナルをトリガーしている場合、そのアクティビティに対するトリガーを抑制してノイズを制限できます。

このガイドでは、シグナル抑制を微調整するためのベストプラクティスのための考察とステップを説明します。

## 抑制戦略 {#suppression-strategy}

良性のパターンを抑制する前に、検出アクティビティのタイプに基づいてシグナルの共通特性を特定してください。属性の組み合わせが具体的であればあるほど、抑制はより正確になります。

リスク管理の観点からは、より少ない属性に基づいて抑制を行うと、実際の悪意のあるアクティビティを見逃す可能性が高まります。悪意のある動作のカバレッジを損なうことなく効果的に抑制を微調整するために、アクティビティタイプごとに分類された、以下の一般的な主要属性のリストを検討してください。

### プロセスアクティビティ {#process-activity}

共通キー:
- `@process.args`
- `@process.executable.name`
- `@process.group`
- `@process.args`
- `@process.envs`
- `@process.parent.comm`
- `@process.parent.args`
- `@process.parent.executable.path`
- `@process.executable.user`
- `@process.ancestors.executable.user`
- `@process.ancestors.executable.path`
- `@process.ancestors.executable.envs`

プロセスが正当なものかどうかを判断するには、プロセスツリーでその親プロセスを確認してください。プロセスツリーは、プロセスをその起源まで遡り、実行フローのコンテキストを提供します。これは、現在のプロセスに至るまでの一連のイベントを理解するのに役立ちます。

通常、親プロセスと不要なプロセスの属性の両方に基づいて抑制すれば十分です。

組み合わせ例:
- `@process.args`
- `@process.executable.group`
- `@process.parent.executable.comm`
- `@process.parent.executable.args`
- `@process.user`

広い時間軸で抑制する場合は、値が変わると抑制が効かなくなるため、一時的な値を引数に持つプロセスの使用は避けてください。

例えば、特定のプログラムは、再起動時や実行時に一時ファイル（`/tmp`）を使用します。これらの値に基づいて抑制を構築しても、同様のアクティビティが検出された場合には効果がありません。

コンテナ上の特定のアクティビティから発生するすべてのシグナルのノイズを完全に抑制したいとします。コンテナを起動するプロセスを開始するプロセスツリー内の完全なコマンドを選択します。実行中、そのプロセスはコンテナが存在する限り存在するファイルにアクセスします。ターゲットとする動作がワークロードのロジックに関連している場合、一時的なプロセスインスタンスに基づく抑制定義は、他のコンテナでの同様のアクティビティを除外するための調整には効果がありません。

### ファイルアクティビティ {#file-activity}

ワークロード、該当ファイル、ファイルにアクセスするプロセスに関する識別情報を反映した属性に基づいて、ファイルアクティビティ関連の抑制を絞り込むことができます。

共通キー:
- ワークロードタグ:
  - `kube_container_name`
  - `kube_service`
  - `host`
  - `env`
- プロセス:
  - `@process.args`
  - `@process.executable.path`
  - `@process.executable.user`
  - `@process.group`
  - `@process.args`
  - `@process.parent.comm`
  - `@process.parent.args`
  - `@process.parent.executable.path`
  - `@process.user`
- ファイル:
  - `@file.path`
  - `@file.inode`
  - `@file.mode`

シグナルを調査する際に実際の悪意のあるアクティビティを特定するには、プロセスがファイルにアクセスおよび変更しているコンテキストが予期されたものであるかを確認してください。インフラストラクチャー全体でファイルに対する意図した動作が抑制されるのを避けるため、常に上記にリストされている共通キーから関連するすべてのコンテキスト情報を収集する組み合わせを持つ必要があります。

組み合わせ例:
  - `@process.args`
  - `@process.executable.path`
  - `@process.user`
  - `@file.path`
  - `kube_service `
  - `host`
  - `kube_container_name`

### ネットワーク DNS ベースのアクティビティ {#network-dns-based-activity}

ネットワークアクティビティ監視はDNSトラフィックをチェックし、サーバーネットワークを侵害する可能性のある不審な動作を検出することを目的としています。特定のIPからDNSサーバーへのクエリをチェックする際、プライベートネットワークIPやクラウドネットワークIPなど、既知のIPアドレスセットからの正常なアクセスに対してトリガーされる可能性があります。

共通キー:
- プロセス:
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- ネットワーク/DNS 関連:
  - `@dns.question.name`
  - `@network.destination.ip/port`
  - `@network.ip/port`

ローカルアプリケーションが DNS 名を解決するために接続を行う場合、最初にチェックしたい特性は、DNS クエリと同様にルックアップを開始した IP のリストです。

組み合わせ例:
  - `@network.ip/port`
  - `@network.destination.ip/port`
  - `@dns.question.*`

### カーネルアクティビティ {#kernel-activity}

カーネル関連のシグナルでは、ノイズは通常、ワークロードのロジックや特定のカーネルバージョンに関連する脆弱性に起因します。何を抑制するかを決定する前に、以下の属性を検討してください。

共通キー:
- プロセス
  - `@process.args`
  - `@process.executable.group`
  - `@process.executable.path`
  - `@process.parent.executable.comm`
  - `@process.parent.executable.args`
  - `@process.user`
- ファイル
  - `@file.path `
  - `@file.inode`
  - `@file.mode`

このタイプのアクティビティに対する組み合わせの定義は、ファイルまたはプロセスのアクティビティに似ていますが、攻撃に使用されるシステムコールに関連するいくつかの特異性が追加されています。

例えば、Dirty Pipeエクスプロイトは権限昇格の脆弱性です。この攻撃を使用してローカルユーザーがシステム上で権限を昇格させると重大な問題となるため、rootユーザーが予期されたプロセスを実行することによって発生するノイズを抑制することは理にかなっています。
- `@process.executable.user`
- `@process.executable.uid`

さらに、一部のマシンがパッチ適用済みのカーネルバージョン（例えば、Dirty Pipeの脆弱性に対してパッチが適用されたLinuxバージョン5.16.11、5.15.25、および5.10）を実行している場合でも、シグナルが作成されることに気づくかもしれません。この場合、`host`、`kube_container_name`、または`kube_service`のようなワークロードレベルタグを組み合わせに追加してください。ただし、ワークロードレベルの属性やタグを使用する場合、それが広範囲の候補に適用され、検出対象範囲とカバレッジが減少することに注意してください。それを防ぐために、ワークロードレベルタグをプロセスベースまたはファイルベースの属性と常に組み合わせて、より詳細な抑制基準を定義してください。