---
description: Bits AI および外部の AI エージェントに、組織固有のドメイン知識や指示を与える再利用可能なスキルを作成します。
further_reading:
- link: /bits_ai/bits_chat/
  tag: ドキュメント
  text: Bits Chat
- link: /actions/agents/
  tag: ドキュメント
  text: Bits Agent Builder
- link: /mcp_server/
  tag: ドキュメント
  text: Datadog MCP Server
title: スキルライブラリ
---
## 概要{#overview}

スキルライブラリを使用して、AI エージェント向けの再利用可能なドメイン知識と指示を定義します。スキルを使用すると、プロンプトごとに同じ情報を繰り返す必要がなくなり、エージェントにタスク固有のコンテキストを与えることができます。

たとえば、組織のインシデント対応プロセス、サービスオーナーシップの慣習、または調査を要約するための要件を説明するスキルを作成します。

スキルは、[Bits Chat][1]、[Bits Agent Builder][2]、Slack 用 Datadog アプリ、および外部エージェント ([Datadog MCP Server][3] を介して接続する Claude Code、Codex、Cursor など) と連携します。

## スキルを作成する{#create-a-skill}

スキルライブラリで直接スキルを作成するか、Bits Chat に作成を依頼します。

### スキルライブラリでスキルを作成する {#create-a-skill-in-the-skills-library}

1. Datadog で [{{< ui >}}Skills Library{{< /ui >}}][4] (スキルライブラリ) を開きます。
2. スキルを作成するか、既存の `SKILL.md` ファイルをインポートします。
3. エージェントが従うべきドメイン知識と指示を追加します。
4. スキルの可視性を選択します。
    - **Private** (プライベート): スキルを非公開にします。
    - **Public** (パブリック): スキルを Datadog 組織と共有します。
5. スキルを保存します。

焦点を絞った指示を使用し、スキルにわかりやすい名前を付けます。名前を明確にすることで、スキルを見つけすくなり、またスラッシュコマンドで呼び出しやすくなります。

### Bits Chat でスキルを作成する {#create-a-skill-with-bits-chat}

Bits Chat にスキルを作成するよう依頼します。

```text
Create a new Skills Library skill
```

既存の Bits Chat 会話のコンテキストからスキルを作成するには、次のように入力します。

```text
Turn this conversation into a skill
```

既存の Slack スレッドからスキルを作成することもできます。スレッドで次のように入力します。

```text
@Datadog turn this conversation into a skill
```

## Bits Chat でスキルを使用する{#use-a-skill-in-bits-chat}

Bits Chat でスキルを利用できるようにするには:

1. Bits Chat で [**Settings**] (設定) を開きます。
2. [**Skills**] (スキル) を選択します。
3. スキルを有効にします。

スキルを有効にすると、そのスキルがリクエストに関連する場合、Bits Chat は自動的にそれを使用します。

スキルを明示的に呼び出すには、会話でスラッシュコマンドを入力します。

```text
/my-skill
```

スキルを呼び出した後、同じメッセージに追加のコンテキストを含めるか、または会話を続けることができます。

## Bits Agent Builder でスキルを使用する{#use-a-skill-in-bits-agent-builder}

エージェントの構成で、エージェントが必要とする各スキルを選択します。エージェントは選択されたスキルを自動的に読み込みます。

会話内でスキルを明示的に呼び出すには、スキルのスラッシュコマンドを入力します。

```text
/my-skill
```

エージェントの作成とテストの詳細については、[Bits Agent Builder][2] を参照してください。

## Slack でスキルを使用する{#use-a-skill-in-slack}

Slack 用 Datadog アプリを接続した後で、`@Datadog` をメンションし、スキルのスラッシュコマンドを追加します。

```text
@Datadog /my-skill
```

コマンドの後に、タスク固有の詳細を追加します。

## 外部エージェントでスキルを使用する{#use-skills-with-an-external-agent}

Datadog MCP Server に接続する外部 AI エージェントは、スキルライブラリからスキルを検出して読み込むことができます。

Datadog MCP Server は以下のツールを提供します。

- `list_datadog_skills()`: エージェントが利用可能なスキルを一覧表示します。
- `load_datadog_skill()`: 選択したスキルをエージェントのコンテキストに読み込みます。

一般的な外部エージェントのワークフローは以下のとおりです。

1. エージェントを Datadog MCP Server に接続します。
2. `list_datadog_skills()` または MCP リソースを使用して、利用可能なスキルを検出します。
3. `load_datadog_skill()` を使用してタスクに必要なスキルを読み込みます。
4. エージェントに対し、読み込まれた指示と知識を使用してタスクを完了するように指示します。

接続手順については、[Datadog MCP Server][3] のドキュメントを参照してください。

## 可用性 {#availability}

スキルライブラリは、Bits Chat、Bits Agent Builder、Slack、および Datadog MCP Server を通じて接続する外部エージェントで利用可能です。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_chat/
[2]: /ja/actions/agents/
[3]: /ja/mcp_server/
[4]: https://app.datadoghq.com/actions/skills