---
description: Bits Investigation を使用して Error Tracking の問題を調査し、エラーの根本原因と影響を特定します。
further_reading:
- link: /bits_ai/bits_investigation/
  tag: ドキュメント
  text: Bits Investigation について
- link: /bits_ai/bits_investigation/chat_bits_investigation/
  tag: ドキュメント
  text: Bits Investigation とチャットする
- link: /bits_ai/bits_code/
  tag: ドキュメント
  text: Bits Code でコードの修正を生成する
- link: /source_code/
  tag: ドキュメント
  text: ソースコードインテグレーションを設定する
title: Bits AI でエラーを調査する
---
{{< callout url="#" btn_hidden="true" header="プレビュー" >}}
Error Tracking の Bits Investigation はプレビュー版です。
{{< /callout >}}

## 概要{#overview}

[Bits Investigation][1] は、本番環境で発生した問題を調査する自律型 AI エージェントです。Error Tracking の問題から調査を開始すると、Bits はスタックトレースや関連するテレメトリを含むエラーを分析します。[ソースコードインテグレーション][3]を設定すると、Bits はソースコードも分析します。その後、問題の可能性が高い根本原因と影響を報告します。

Error Tracking からトリガーされたすべての調査を一覧表示するには、[Investigations][9] を開き、{{< ui >}}Source{{< /ui >}}: {{< ui >}}Error Tracking Issue{{< /ui >}} でフィルタリングします。

## 前提条件 {#prerequisites}

- 調査を表示するには、[{{< ui >}}Bits Investigations Read{{< /ui >}} 権限][2]が必要です。調査を開始するには、[{{< ui >}}Bits Investigations Write{{< /ui >}} 権限][2]が必要です。
- エラー発生時に実行されていたコードを Bits が読み取れるようにするには、[ソースコードインテグレーション][3]を設定してください。Bits はソースコードへのアクセス権がなくても調査できますが、根本原因分析の精度は低下します。
- コードの修正を生成するには、リポジトリへの書き込みアクセス権と [{{< ui >}}Bits Code Write{{< /ui >}} 権限][2]が必要な [Bits Code][8] を設定してください。

## Error Tracking の問題を調査する {#investigate-an-error-tracking-issue}

Bits Investigation で Error Tracking の問題を調査するには、

1. [Error Tracking エクスプローラー][4]で問題をクリックして、問題パネルを開きます。
1. {{< ui >}}Review{{< /ui >}} タブで、{{< ui >}}Bits Investigation{{< /ui >}} バナー内の [{{< ui >}}Investigate this issue{{< /ui >}}] をクリックします。

   {{< img src="error_tracking/bits_investigation/start_investigation.png" alt="Error Tracking の問題の [Review] タブにある [Bits Investigation] バナーと、[Investigate this issue] ボタン。" style="width:100%;" >}}

   調査の実行中、バナーにはその進捗状況と、誰が調査を開始したかが表示されます。調査には通常数分かかります。
1. 調査が完了したら、バナーで調査結果を確認します。

   - **根本原因**: Bits が収集した証拠に基づいた、エラーの最も可能性の高い原因。
   - **影響**: エラーがユーザーとサービスに与える影響。

   完了した調査の場合、バナーには根本原因と影響が並べて表示されます。

   {{< img src="error_tracking/bits_investigation/investigation_summary.png" alt="Error Tracking の問題の [Review] タブ。Bits Investigation によって特定された根本原因と影響が表示されています。" style="width:100%;" >}}

   利用可能なデータが結論を裏付けるのに不十分な場合、Bits は調査を「結論が出ない」とマークします。
1. (オプション) 調査の全容を確認するには、バナー内の [{{< ui >}}View Investigation{{< /ui >}}] をクリックします。

   調査ページには、結論、推奨される次のステップ、および証拠のタイムラインが表示されます。

   {{< img src="error_tracking/bits_investigation/investigation_report.png" alt="Error Tracking の問題の Bits Investigation ページ。結論、根本原因、影響、推奨される次のステップ、およびタイムラインが表示されています。" style="width:100%;" >}}

調査に関する追加の質問をするには、Bits Chat を使用してください。詳細については、[Bits Investigation とのチャット][6]を参照してください。

Bits がどのように結論に至るか、また調査のステップを確認する方法の詳細については、問題の調査に関する [Bits による調査方法][5]を参照してください。

## コード内の問題を修正する {#fix-the-issue-in-code}

根本原因がコードにある場合、Bits Investigation は [Bits Code][7] を使用して修正を生成します。修正は、調査ページの推奨される次のステップとして、変更の概要とその差分とともに表示されます。

コード修正の次のステップには、プルリクエストを作成するか、修正作業を継続するためのアクションが含まれています。

{{< img src="error_tracking/bits_investigation/code_fix_next_step.png" alt="Bits Code によって生成されたコード修正を含む推奨される次のステップ。概要、差分、[Create PR] ボタン、および [View in Bits Code] ボタンが表示されています。" style="width:100%;" >}}

次のステップから、以下の操作を実行できます。

- [{{< ui >}}Create PR{{< /ui >}}] をクリックして、修正を含むプルリクエストを作成します。
- [{{< ui >}}View Full Diff{{< /ui >}}] をクリックして、変更されたすべてのファイルを確認します。
- [{{< ui >}}View in Bits Code{{< /ui >}}] をクリックして、Bits Code セッションで修正を繰り返し改善します。

Bits Code が変更を自動的にマージすることはありません。生成されたコードをマージする前に、レビューおよびテストを行ってください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_investigation/
[2]: /ja/account_management/rbac/permissions/#bits-ai
[3]: /ja/source_code/
[4]: https://app.datadoghq.com/error-tracking
[5]: /ja/bits_ai/bits_investigation/investigate_issues/#how-bits-investigates
[6]: /ja/bits_ai/bits_investigation/chat_bits_investigation/
[7]: /ja/bits_ai/bits_code/
[8]: /ja/bits_ai/bits_code/setup/
[9]: https://app.datadoghq.com/bits-ai/investigations