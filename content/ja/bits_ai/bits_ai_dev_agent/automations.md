---
description: スケジュールに従って、または Datadog の信号に応じてセッションを実行する Bits Code の自動化を作成します。
disable_toc: false
further_reading:
- link: /bits_ai/bits_ai_dev_agent/
  tag: ドキュメント
  text: Bits Code
title: 自動化
---
## 概要 {#overview}
例えば新しい Code Security の所見があった場合や定期的なスケジュールに基づいて、トリガーが起動したときに、Bits Code が[セッション][1]を開始し、その結果をプルリクエストまたは Slack 通知として配信する自動化を作成します。

{{< img src="bits_ai/dev_agent/automations/list.png" alt="[Automate with Bits] (Bits で自動化) というタイトルの下に、[Name] (名前)、[Author] (作成者)、[Last Run] (最後の実行) のような列と4つの行を持つテーブルがあります。" style="width:100%;" >}}

Bits Code の自動化で、次のことができます。

- 手動で各セッションを開始することなく、スケジュールに従ってコード修正を生成する。
- 新しい APM 推奨、不安定なテスト、または Code Security の所見など、他の Datadog 製品からの信号に対して Bits Code に応答させる。
- 結果として得られたコード変更を直接プルリクエストにルーティングしたり、Slack でチームに通知したりする。

## 前提条件 {#prerequisites}
Bits Code の自動化を設定するには、次のすべての条件を満たしていなければなりません。
- Datadog に **Bits Code 書き込み** (`bits_dev_write`) 権限がある。
- Bits Codeの[セットアップ][2]を完了している。
- 自動化が [Slack通知を出力する](#slack-message-output)予定の場合、[Slack インテグレーション][4]がセットアップされている。

## 自動化を作成する {#create-an-automation}
[カスタム自動化を作成する](#create-a-custom-automation)ことも、[Datadog が提供する自動化テンプレートを使用する](#create-an-automation-from-a-template)こともできます。

{{< img src="bits_ai/dev_agent/automations/custom_prompt_creation_form.png" alt="[Automate with Bits] (Bits で自動化) というタイトルの下に、「カスタムプロンプト」や「毎週」などのフィールドを持つフォームが表示されます。" style="width:100%;" >}}

デフォルトで、新しく作成された自動化は**アクティブ**になり、**マイ自動化**リストに表示されます。

### カスタム自動化を作成する{#create-a-custom-automation}
Bits Code のカスタム自動化を作成するには:
1. Datadog で、**Bits AI** > **Bits Code** > [**自動化**][3] に移動します。
1. [**New Automation**] (新しい自動化) をクリックします。
1. [**Automation name**] (自動化名) フィールドに、自動化を説明する名前を入力してください。
1. [**Trigger**] (トリガー) セクションで、[トリガー](#triggers)を設定します。
1. [**Output**] (出力) セクションで、1 つ以上の[出力](#outputs)を設定します。
1. [**Create Automation**] (自動化を作成) または [**Create & run now**] (作成して今すぐ実行) をクリックします。

### テンプレートから自動化を作成する{#create-an-automation-from-a-template}
[**Automation Templates**] (自動化テンプレート) セクションに、Datadog 提供の自動化テンプレートがあります。これには次のものが含まれる場合があります:

- **APM 推奨に基づいて PR を作成**: 特定のサービスに対する APM 推奨に基づいてプルリクエストを生成します。
- **リポジトリの頻繁なエラーを修正**: [**カスタムプロンプト**](#custom-prompt-trigger)トリガーを使用して、Bits Code に過去 24 時間のログをスキャンさせ、最も頻繁なエラーを見つけて、修正を含むプルリクエストを開かせます。

テンプレートタイルをクリックすると、新しい自動化フォームに移動します。自動化を作成する前に、[出力](#outputs)を設定する必要があります。

## トリガー{#triggers}
トリガーは、自動化が実行されるタイミングと Bits Code が処理する対象を定義します。トリガーは、以下のコンポーネントの内最大3つで構成されます:

- [製品所見](#product-finding-trigger): Error Tracking の問題など、Datadog 内からの信号
- [カスタムプロンプト](#custom-prompt-trigger): 選択したリポジトリに対して何をするかを Bits Code に指示する自由形式の指示
- [スケジュール](#schedule-trigger): 毎日または特定の曜日など、定期的な時間間隔

[**Add Trigger**] (トリガーを追加) をクリックして、コンポーネントを追加します。製品所見をスケジュールと組み合わせることも、カスタムプロンプトをスケジュールと組み合わせることも、製品所見を単独で使用することもできます。

自動化が特定の期間に作成できる Bits Code セッションの数を制限する (例えば、`5 runs per Week`) には、[**トリガーを追加**] > [**Set max runs**] (最大実行回数を設定) をクリックします。1 回の自動化実行で、複数のセッションが生成されることがあります。この設定を使用して、自動化が生成するプルリクエストや通知の量を制御します。

### 製品所見トリガー {#product-finding-trigger}
所見トリガーは、別の Datadog 製品 (例えば、Error Tracking や Code Security) での新しい問題に反応して自動化を実行します。製品所見トリガーは単独で使用することができ、この場合は新しい所見があるたびに自動化が実行されます。または、[スケジュール](#schedule-trigger)と、あなたが ([**New findings within**] (新しい所見の範囲) フィールド内で) 定義するルックバックウィンドウと一緒に使用することもできます。

<div class="alert alert-info">製品所見トリガーを単独で使用する (新しい所見を即座に修正するため) ことは一般的ですが、スケジュールとルックバックウィンドウと組み合わせると、特定の時間帯に見られる新しい所見を監視することができます。例えば、デプロイが毎週水曜日に行われる場合、毎週木曜日に APM 推奨トリガーを実行し、24 時間のルックバックを行うように設定することができます。</div>

製品所見トリガーをセットアップする際には、製品によって異なる追加のフィルターを設定できます。例えば、次のようにします。
  - **不安定なテスト**は、**リポジトリ**、**ブランチ** (デフォルトはリポジトリのデフォルトブランチ)、および**ステータス**によるフィルタリングをサポートしています。
  - **Code Security (SAST)** は、**リポジトリ**、**重大度**、**修正ルール**、および **Bits AI によって偽陽性として特定された所見を除外する**トグルをサポートしています。

<div class="alert alert-warning">自動化をトリガーする所見はそれぞれ、単一のセッションに関連付けられています。複数の所見を 1 つのセッションまたはプルリクエストで修正することはできません。</div>

### カスタムプロンプトトリガー {#custom-prompt-trigger}
カスタムプロンプトは、自動化が実行されるたびに、選択したリポジトリに対して何を行うかを自由形式のテキストで Bits Code に指示します。特定の Datadog シグナルに関連付けられない定期的なメンテナンスタスク (依存関係の更新やドキュメントの更新など) には、カスタムプロンプトを使用してください。

### スケジュールトリガー {#schedule-trigger}
スケジュールトリガーは、自動化が実行されるタイミングを制御します。これは、[製品所見](#product-finding-trigger)または[カスタムプロンプト](#custom-prompt-trigger)と組み合わせて使用できます。スケジュールを設定する際には、次の中から選択できます。
  - **毎…**: 事前設定された間隔を選択します (例えば、`Every day at 09:00 am`)。
  - **カスタムスケジュール**: 特定の曜日と時刻を選択します (例えば、`Mo, We, Fr at 03:00 pm`)。

## 出力 {#outputs}
出力は、[セッション][1]が完了した後に Bits Code が何を行うかを定義します。自動化には、[プルリクエストを開く](#pull-request-output)や[Slack 通知を生成する](#slack-message-output)など、1 つ以上の出力を設定できます。

### プルリクエスト出力 {#pull-request-output}
自動化が次を行うように設定できます。
- **PR を作成する**: 提案された変更を含むプルリクエストを開きます。
- **PR をドラフトする**: 提案された変更を含むドラフトプルリクエストを開きます。

Bits Code 自動化の作成者が、生成されるすべてのプルリクエストの作成者になります。

### Slack メッセージ出力 {#slack-message-output}
[セッション][1]とコード変更を要約した Slack メッセージを送信するように自動化を構成できます。Slack 出力に加えてプルリクエスト出力を使用する場合、Bits Code は Slack メッセージにプルリクエストへのリンクを含めます。

Slack メッセージ出力を追加すると、Bits Code はデフォルトで、影響を受けるサービス用に[カタログ][5]内で設定されたチャンネルへメッセージを送信します。フォールバック Slack チャンネルを設定して、カタログでチャンネルが設定されていない場合に使用するようにできます。

## 自動化を管理する {#manage-automations}
作成した自動化は、[**自動化**][3]の [**マイ自動化**] タブで確認できます。[**すべて**] に切り替えると、組織内のすべての人が作成した自動化を確認できます。

任意の自動化を一時停止または再開できますが、編集または削除できるのは自分が作成した自動化のみです。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/bits_ai/bits_ai_dev_agent/#sessions
[2]: /ja/bits_ai/bits_ai_dev_agent/setup/
[3]: https://app.datadoghq.com/code/automations
[4]: /ja/integrations/slack/
[5]: /ja/internal_developer_portal/catalog/