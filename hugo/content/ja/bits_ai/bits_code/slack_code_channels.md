---
description: Slack で一時的なコードチャンネルを作成し、作業する方法を学びましょう。これらのチャンネルでは、Bits Code の操作、コード差分の表示、PR
  の作成が可能です。
further_reading:
- link: /bits_ai/bits_code/
  tag: ドキュメント
  text: Bits Code
- link: /bits_ai/bits_chat/#slack
  tag: ドキュメント
  text: Slack での Bits Chat
- link: /integrations/slack/
  tag: ドキュメント
  text: Slack インテグレーション
- link: https://slack.com/features/code-channels
  tag: Slack ドキュメント
  text: コードチャンネル
title: Bits Code を使用した Slack でのコードチャンネル
---
## 概要 {#overview}

コードチャンネルとは、特定のタスクについてコーディングエージェントと作業を行うための、専用かつ一時的な Slack チャンネルです。Slack で [Bits Chat][1] にコード変更を依頼すると、[Bits Code][3] はそのタスク用のコードチャンネルを作成します。あなたとチームは、元の会話を煩雑にすることなく、そのチャンネル上で作業の進捗を追跡したり、作業を誘導したり、結果をレビューしたりすることが可能です。

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel.png" alt="Bits Code との会話と、提案されたコード変更の差分表示が並んで表示されている Slack のコードチャンネル" style="width:100%;" >}}

コードチャンネルの詳細については、「[Slack ドキュメント][6]」をご覧ください。

## コードチャンネルを作成する {#create-a-code-channel}

[Bits Code をセットアップし、コードチャンネルを有効化][4]した後、Slack で `@Datadog` にメンションを送り、行いたいコード変更について説明することで、コードチャンネルを作成できます。Bits Chat がそのリクエストにコード変更が必要だと判断した場合、タスクは Bits Code に引き継がれ、Bits Code がコードチャンネルを作成します。Bits は、最初にプロンプトが入力された場所に、新しいコードチャンネルへのリンクを投稿します。

{{< img src="bits_ai/dev_agent/slack_code_channels/code_channel_creation.png" alt="@Datadog にメンションする Slack メッセージと、それに続いて作成されたコードチャンネルを示すカード" style="width:100%;" >}}

Bits Code は、最初のリクエストに基づいてコードチャンネルに自動的に名前を付けます。作成されたコードチャネルは、Slack サイドバーの専用の {{< ui >}}Code channels{{< /ui >}} セクションで確認できます。

### 権限とアクセス{#permissions-and-access}

`@Datadog` を呼び出したユーザーのみが、新しいコードチャンネルに自動的に追加されます。コードチャネルの公開範囲は、作成元のチャンネルの公開範囲を引き継ぎます (つまり、パブリックチャンネルで `@Datadog` にメンションした場合、作成されるコードチャンネルもパブリックになります)。

<div class="alert alert-warning">Bits Code は、 <code>@Datadog</code> @Datadog を入力してチャネルを作成したユーザーの権限を使用して、ソースコードリポジトリにアクセスします。また、チャネル内のすべてのユーザーに関する Datadog テレメトリ (<a href="/account_management/rbac/data_access/">Data Access Control</a> の制限が適用された状態) にもアクセスできます。Bits Code は、これらのリポジトリデータやテレメトリをコードチャネル内に表示する場合があります。コードチャンネルの作成者には、コードチャンネルを表示できるすべてのユーザーがその内容を表示する権限を持っていること、およびコードチャンネルに参加できるすべてのユーザーが Bits Code を操作する権限を持っていることを確認する責任があります。</div>

エージェントを操作するユーザーは、Slack と連携された Datadog アカウントを持っている必要があります。(Datadog アカウントを連携せずにコードチャネルに投稿した場合、Bits はそのメッセージを無視します。)

## コードチャンネルでの作業 {#work-in-a-code-channel}

ほかの Slack チャンネルで Bits Chat からの応答が必要な場合は、毎回 `@` でメンションする必要があります。コードチャンネルの動作は異なります。コードチャンネルでは、Bits Code が投稿されたすべてのメッセージを監視しています。それで、エージェントを操作し続けるために、`@Datadog` に再度メンションする必要はありません。

Bits Code が動作すると、コードチャンネルには以下が表示されます。

- 提案されたコード変更の差分の表示
- タスクに関連する場合の Datadog グラフウィジェット
- 変更からプルリクエストを開くための {{< ui >}}Create PR{{< /ui >}} ボタン

Bits Code がコードの差分を生成した後、コードチャンネル内で特定の行に直接コメントできます。

{{< img src="bits_ai/dev_agent/slack_code_channels/commenting_on_code.png" alt="特定のコード行に対する質問の作成" style="width:100%;" >}}

各コードチャンネルでの作業は、Datadog の [Bits Code セッション][2]にも反映されます。これを表示するには、コードチャンネルの右下隅にある [{{< ui >}}</> Code session{{< /ui >}}] をクリックします。

コードチャンネルでの作業方法の詳細については、「[Slack ドキュメント][6]」をご覧ください。

### コードチャンネルにおける自動プッシュの仕組み {#how-auto-push-works-in-code-channels}

[自動プッシュ設定][7]が {{< ui >}}Always allow auto-push{{< /ui >}} に設定されている場合、Bits Code は人間がボタンをクリックしなくても、エージェントとして変更をプッシュできます。エージェントとしてプッシュする際、Bits はコードチャンネル作成者のソースコードIDを使用してコミットとプルリクエストを作成します。

Bits Code がコードチャンネルからエージェントとしてコードをプッシュできるのは、チャンネル作成者およびチャンネルでメッセージを送信したすべてのユーザーが、Datadog に以下の権限を持つソース管理アカウントを連携している場合に限られます。

- チャンネル内でプルリクエストが行われているすべてのリポジトリ、および変更を受け取るすべてのリポジトリに対する書き込みアクセス権
- チャンネルに紐付けられたその他すべてのリポジトリに対する読み取りアクセス権

（これらの権限は、チャンネルに参加していてもメッセージを送信していないユーザーについては確認されません。）

コードチャンネルでメッセージを送信したユーザーの中に必要なリポジトリ権限を持っていないユーザーがいる場合、または Bits がその権限を確認できない場合、Bits は変更をエージェントとしてプッシュしません。この場合、必要な権限を持つユーザーであれば、引き続き {{< ui >}}Create PR{{< /ui >}} または {{< ui >}}Update PR{{< /ui >}} をクリックできます。これらのボタンは、そのユーザー単独の権限のみを、コードチャンネルに紐付けられたリポジトリ全体に対してチェックします。{{< ui >}}Create PR{{< /ui >}} をクリックしたユーザーが、作成されるプルリクエストまたはマージリクエストの作成者となります。

## 制限事項 {#limitations}

[Bits Code の制限][5]全般が、コードチャンネルにも適用されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_chat/#slack
[2]: /ja/bits_ai/bits_code/#sessions
[3]: https://app.datadoghq.com/code
[4]: /ja/bits_ai/bits_code/setup/
[5]: /ja/bits_ai/bits_code/#limitations
[6]: https://slack.com/help/articles/54310833022355-Build-with-AI-as-a-team-using-Slack-Code
[7]: /ja/bits_ai/bits_code/setup/#enable-auto-push