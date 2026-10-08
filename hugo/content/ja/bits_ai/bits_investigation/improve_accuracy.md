---
description: Bits Investigation を構成して、より正確な調査を行うためのベストプラクティスを学びます。
further_reading:
- link: /bits_ai/bits_investigation/knowledge_sources/
  tag: ドキュメント
  text: ナレッジソース
- link: /bits_ai/bits_investigation/configure/
  tag: ドキュメント
  text: Integrations と設定
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: ドキュメント
  text: Bits Investigation とチャットする
title: Bits Investigation の精度を向上させる
---
## 概要 {#overview}

Bits Investigation は、テレメトリ、インテグレーション、ソースコード、メモリを論理的に分析し、その時点で利用可能なすべての情報を調査します。

ただし、技術アーキテクチャ、タグ付け、エスカレーションパス、組織独自のナレッジは組織によってそれぞれ異なるため、最良の結果を得るには、組織に合わせて Bits Investigation を調整する必要があります。

このガイドでは、精度に最も大きな影響を与える慣習について説明します。
- [ナレッジソースを強化する](#strengthen-your-knowledge-sources)
- [重要なモニターで自動調査を有効にする](#enable-auto-investigate-on-your-critical-monitors)
- [外部ツールとドキュメントを接続する](#connect-external-tools-and-documentation)
- [Bits Chat で変更をテストする](#test-your-changes-with-bits-chat)

## ナレッジソースを強化する{#strengthen-your-knowledge-sources}

Bits Investigation は、調査中に `bits.md`、モニターのメッセージ、モニターのランブック、過去のフィードバックという 4 つの場所から情報を読み取ります。各情報が具体的であるほど、将来の調査の精度が高まります。まず Bits Investigation を使用して、その結果を観察します。こうすると、どこを集中的に調整すべきかの方向性が定まります。

### 具体的なルールを作成する {#write-specific-rules}

Bits Investigation は、すべての調査で[`bits.md`][1] を読み取ります。一般的な説明ではなく、具体的なルールを作成してください。説明は Bits がテレメトリからすでに推論できることを繰り返すだけですが、ルールはツール間での命名の不一致など、Bits が単独では推論できないことを解決します。

| 良い例 | 改善が必要な例 |
|------|--------------------|
| 「課金チームのアラートはサービスに `billing-svc` とタグ付けしていますが、APM とログは `billing_service` を使用しています。これらを同じサービスとして扱ってください。」| 「チェックアウトは当社の決済サービスです。」|

以下の項目に優先的に対処します。
- **システム間の名前の対応付け**: サービス、環境、またはチームが同じでも、モニター、APM、ログ、接続されているチケット発行システムの名前が異なることがよくあります。この対応付け書き留めておきます。
- **既知のノイズ**: 週次の再インデックスジョブや負荷テストなど、インシデントのように見えるが定型タスクであるパターン。これらを、それらが本当の問題と見なされる状況と共に文書化します。
- **スコープが曖昧なルール**: 環境やリージョンが指定されていないアラートは曖昧です。Bits が想定すべきデフォルトを定義してください。

完全なサンプルファイルについては、「[ナレッジソース][1]」を参照してください。

### 自己完結型のモニターにする {#make-your-monitors-self-sufficient}

Bits は調査時にモニターメッセージを読み取ります。Bits が、ユーザーが後から手動でコンテキストを入力しなくても、メッセージのみで調査を行えるようにモニターを構成してください。

モニターメッセージに以下を追加します。
- 最初に確認するダッシュボード、ログクエリ、またはノートブック (プレーン URL で動作します。形式設定は不要です)。
- 1 つ以上のリンクが必要な場合は、プレーンリンクの代わりにノートブックを使用します。ノートブックでは、ライブ Datadog クエリと併せてマークダウンがサポートされます。
- 通常影響を受けるダウンストリームサービスまたは依存関係。

また、`service` により、モニタークエリにスコープを設定するか、グループ化します。これにより、Bits が適切なサービスの APM、ログ、RUM、および[カタログ][2]に注目するようになります。`service` タグが付けられていない場合、Bits はモニター名のような弱いシグナルに反応します。

モニターメッセージを定期的に見直してください。古いランブックリンクは、Bits が誤ったダッシュボードや廃止されたサービスに注目する原因となるため、リンクがない場合より問題です。

### 調査に関するフィードバックを提供する {#give-feedback-on-investigations}

調査の最後に、結論が正しかったかどうかを Bits に伝えます。間違っていたことだけでなく、正しかったことも伝えてください。肯定的なフィードバックも、Bits が再利用するメモリとなります。Bits が間違った判断をした場合は、実際の根本原因、関連するサービスやメトリクスを明示し、それを証明するテレメトリへのリンクを提示します。「それは間違っています」と伝えるだけでは、Bits は何も変更できません。

肯定的なフィードバックと修正の両方が**メモリ**となり、Bits は将来の類似の調査においてそれらを選択的に再利用します。[[Monitor Management] (モニター管理)][8] ページの [{{< ui >}}Memories{{< /ui >}}] (メモリ) 列でそれらを確認するか削除し、古い修正内容が現在も有効であるか (サービス名が変更されている、問題の原因が修正されたなど) を定期的にチェックしてください。

## 重要なモニターで自動調査を有効にする {#enable-auto-investigate-on-your-critical-monitors}

[[Supported Monitors] (サポートされるモニター)][8] ページで、調査を実行する価値があり、そのコンテキストを正確に保つための帯域幅があるモニターに [{{< ui >}}Auto-Investigate{{< /ui >}}] (自動調査) のスコープを設定します。

- 実際のインシデントを表している可能性が最も高いモニターを [`priority:p1`][9] (または`p2`) でフィルタリングします。
- すでにユーザーやチャンネルに通知しているモニターを [`notification:*`][10] でフィルタリングします。

このフィルタリングされたリストに対し、[{{< ui >}}Auto-Investigate{{< /ui >}} を有効にします][13]。自動調整をすべてのモニターで有効にすると、ノイズが多く、優先度の低いアラートに調査が分散され、実際に重要なシグナルが埋もれてしまいます。また、それらのアラートすべてに対する `bits.md` のルール、ランブック、フィードバックを管理することは現実的に不可能です。

## 外部ツールとドキュメントを接続する {#connect-external-tools-and-documentation}

Bits Investigation は、アクセス可能なテレメトリとドキュメントに基づいてのみ推論を行えます。これらのソースを接続することで、以下を活用できるようになります。

- **Confluence**: [Confluence アカウントを接続][3]し、モニターメッセージに関連ページをリンクします。Bits は、そのページからテレメトリリンクとトラブルシューティング手順を抽出します。アカウントのクローリングを有効にすると、[Bits Chat][4] がリンクされているページだけでなく、Confluence スペース全体を直接検索できるようになります。
- **ソースコード**: [GitHub][5] を接続し、[APM テレメトリに Git 情報をタグ付けする][6]ことで、Bits がリグレッションの原因となったコミットやデプロイにリグレッションを関連付けられるようになります。これにより、Bits Code が調査を引き継ぎ、修正案を提示することも可能になります。
- **その他の監視可能性ツール**: Grafana、Dynatrace、Splunk、Sentry、または ServiceNow を接続します (テレメトリが存在する場合)。「[サードパーティの監視可能性および SCM プラットフォームとの統合][7]」を参照してください。

調査結果の送信先として Slack、Microsoft Teams、その他の宛先を設定するには、「[ITSM およびコラボレーションプラットフォームに調査結果を送信する][12]」を参照してください。

## Bits Chat で変更をテストする {#test-your-changes-with-bits-chat}

`bits.md`、モニターメッセージ、またはスキルに変更を加えたら、実際の調査で確認する前に、[Bits Chat][4] を使用して変更が適用されていることを確認してください。Chat は同じナレッジソースを利用するため、完全な調査の実行を待たずに変更をチェックできます。また、Bits Chat に直接、`bits.md`、ランブック、またはスキルの改善方法に関する提案を尋ねることもできます。

| 目標 |  プロンプトの例 |
|------|-----------------|
| `bits.md` 命名規則をチェックする | `If I ask about billing-svc, what service does that map to in APM and logs?` |
| ノイズパターンをチェックする | `Is a spike in reindex job duration on Sundays something I should worry about for <service>?` |
| ランブックまたは Confluence ページをチェックする | `What does our documentation say about diagnosing <service> issues?` |
| スキルをチェックする | スキルをトリガーする質問をして、回答が手順どおりであるかを確認します。|
| 過去の修正をチェックする | 関連する質問 (例: `What's your read on memory pressure on <service>?`) をして、修正が参照されているかを確認します。|

自分の変更内容が回答に反映されていない場合は、`bits.md` エントリがルールなのか単なる説明なのか、インテグレーションが適切な権限に接続されているか、リンクが古くなっていないかをチェックしてください。具体的な問題を修正したら、同じプロンプトで再テストします。

まだ修正を考えていない問題を明らかにするには、実際の調査後に次のように質問します: `What information would have made this investigation faster or more accurate?`

Chat に変更内容が反映されたら、既知の調査を再実行して、結論自体が改善されていることを確認します。Chat と Investigations は、ナレッジを常に同様に利用するとは限りません。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_investigation/knowledge_sources/
[2]: /ja/internal_developer_portal/catalog/
[3]: https://app.datadoghq.com/integrations/confluence
[4]: /ja/bits_ai/bits_investigation/chat_bits_investigation/
[5]: /ja/integrations/github/
[6]: /ja/source_code/service-mapping
[7]: /ja/bits_ai/bits_investigation/configure/#integrate-with-third-party-observability-and-scm-platforms
[8]: https://app.datadoghq.com/bits-ai/monitors/supported
[9]: https://app.datadoghq.com/bits-ai/monitors/supported?q=priority%3Ap1&auto_only=false
[10]: https://app.datadoghq.com/bits-ai/monitors/supported?q=notification%3A%2A&auto_only=false
[12]: /ja/bits_ai/bits_investigation/configure/#send-investigation-findings-to-itsm-and-collaboration-platforms
[13]: /ja/bits_ai/bits_investigation/investigate_issues/#enable-automatic-investigations