---
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: ドキュメント
  text: Workload Protection ルールの管理
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: ドキュメント
  text: SECL ガイド
title: Workload Protection カスタムルール作成のガイドライン
---
独自の [カスタム Workload Protection Agent ルール][1] を作成することが望ましい場合があります。独自のルールを書く場合、効率を高めるために最適化できる戦略がいくつかあります。

## 属性 {#attributes}

ポリシーがカーネル内で評価され、最大の効果を発揮するように、プロセスまたはファイルアクティビティに関するルールには、常に次のいずれかの属性を使用します。

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**注**: `[event_type]` として可能な値には、`open` と `exec` があります。

## ワイルドカード{#wildcards}

ワイルドカード (`*`) を使う際には、十分に注意してください。たとえば、`open.file.path =~ "*/myfile"` は絶対に使用しないでください。ディレクトリの接頭部としてワイルドカードを使用する必要がある場合は、`open.file.path =~ "*/mydir/myfile")` のように、少なくとも2つのレベルが必要です。

**注**: ワイルドカードを使用する場合は、[演算子][2] にチルダ (`~`) を付加する必要があります。

## 承認者と廃棄者 {#approvers-and-discarders}

Workload Protection では、承認者と廃棄者の概念を使用することにより、ポリシー内のどのルールもトリガーするべきでないイベントを除外します。承認者と廃棄者は、ポリシーレベルでのみイベントを許可または拒否します。これらは個別のルールには作用しません。

承認者は、Datadog Agent の中でカーネルレベルの許可リストとして機能します。たとえば、特定のファイルを開くことは、イベント `open` に対する承認者となり得ますが、承認者のないファイルに対する `open` イベントは除外されます。同じように、廃棄者は Agent 内で拒否リストとして機能します。廃棄者は、ルールに決して一致しないイベントを意図的に除外します。Agent は、実行時に廃棄者を使用してどのイベントを除外するかを学習します。

承認者と廃棄者は、ポリシー全体に基づいて生成されます。このため、あるルールで特定のイベント (たとえば `open` や `exec`) に対して承認者を利用しない場合、ポリシー全体でそのイベントに対して承認者を利用することができず、そのイベントを利用するすべてのルールの効率が悪くなってしまいます。

たとえば、ある1つのルール (`open.file.path == "/etc/shadow"` や `open.file.path == "/etc/secret"` など) を除くあらゆるルールで、明示的なファイル名を使用して `open` イベントを評価し、除外したイベントではワイルドカードを使用 (`open.file.path == "/etc/*"`) したという場合、`open` イベントは承認者を生成しませんが、実行時には廃棄者が生成される可能性があります。

一般に、承認者のほうが強力であり、推奨されます。承認者を使用する場合、Agent は、動的にフィルタリング対象を学習するのではなく、確認が必要なもののみを処理できます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management/#create-a-custom-agent-rule
[2]: /ja/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/#operators