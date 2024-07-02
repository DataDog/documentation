---
title: Guidelines for Writing Custom CSM Threats Rules
further_reading:
- link: /security/threats/workload_security_rules
  tag: Documentation
  text: Managing CSM Threats Rules
- link: /security/threats/agent_expressions
  tag: Documentation
  text: Agent Expression Syntax
---

ある時点で、独自の[カスタム Cloud Security Management Threats (CSM Threats) Agent ルール][1]を書きたいと思うことがあるかもしれません。独自のルールを書く場合、効率のために最適化するために使用できる戦略がいくつかあります。

## 属性

ポリシーがカーネル内で評価され、最大の効果を発揮するように、プロセスまたはファイルアクティビティに関するルールには、常に次のいずれかの属性を使用します。

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**注**: `[event_type]` に指定できる値は、`open` または `exec` です。

## ワイルドカード

ワイルドカード (`*`) は慎重に使用します。例えば、`open.file.path =~ "*/myfile"` は決して使ってはいけません。もし、ディレクトリの前にワイルドカードを使わなければならない場合は、最低でも 2 つのレベルが必要です (`open.file.path =~ "*/mydir/myfile")`)。

**注**: ワイルドカードを使用する場合は、[演算子][2]にチルダ (`~`) を付加する必要があります。

## 承認者と廃棄者

CSM Threats は、ポリシー内のどのルールもトリガーすべきでないイベントをフィルターするために、承認者と廃棄者という概念を使用します。承認者と廃棄者は、ポリシーレベルでのみイベントを許可または拒否します。個々のルールに作用するわけではありません。

承認者は、Datadog Agent のカーネルレベルで許可リストとして機能します。例えば、特定のファイルのオープンは、`open` イベントの承認者となり、承認者のいないファイルの `open` イベントは、フィルタリングされます。同様に、廃棄者は Agent の中で拒否リストとして機能します。廃棄者は、ルールにマッチしないイベントを意図的にフィルタリングします。Agent は、実行時に廃棄者でフィルタリングするイベントを学習します。

承認者と廃棄者は、ポリシー全体に基づいて生成されます。このため、あるルールで特定のイベント (たとえば `open` や `exec`) に対して承認者を利用しない場合、ポリシー全体でそのイベントに対して承認者を利用することができず、そのイベントを利用するすべてのルールの効率が悪くなってしまいます。

例えば、1 つのルールを除いて、`open` イベントの評価に明示的なファイル名 (`open.file.path == "/etc/shadow"`、`open.file.path == "/etc/secret"` など) を使用し、その 1 つのイベントでワイルドカード (`open.file.path == "/etc/*"`) を使用すると、`open` イベントは承認者を生成しませんが、実行中に廃棄者を生成するかもしれません。

一般的に、承認者はより強力で好まれます。承認者を使うことで、Agent は何をフィルターにかけるかを動的に学習するのではなく、見る必要のあるものだけを処理することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/threats/workload_security_rules
[2]: /security/threats/agent_expressions/#operators