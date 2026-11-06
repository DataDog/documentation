---
further_reading:
- link: /security/ai_guard/setup/
  tag: ドキュメント
  text: AI Guard のセットアップ
- link: /security/ai_guard/setup/sdk/
  tag: ドキュメント
  text: AI Guard SDK
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: ドキュメント
  text: 機密データのスキャンルール
title: 機密データのリダクション
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

AI Guard は Sensitive Data Scanner を使用して、AI Guard によって評価されるメッセージ内の個人情報 (PII)、資格情報、シークレットなどの機密データを識別します。一致したデータは、モデルに送信される前に、ハッシュ化、カスタムテキストへの置換、または部分的な編集を行うことができます。一致ごとにラベルまたは `****` に置換するには、**Redact** アクションを使用し、置換テキストとして値を入力してください。

<div class="alert alert-warning">機密データのリダクションは、手動の SDK 統合でのみサポートされています。OpenAI や Anthropic などの自動インストルメンテーションはまだサポートされていません。これらは機密データスキャナーの検出結果を報告しますが、アプリケーションがモデルに送信するメッセージのリダクションは行いません。機密データのリダクションを行うには、SDK を直接呼び出し、評価によって返されたリダクション済みの会話を転送してください。<a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a> を参照してください。</div>

## サポートされている SDK バージョン {#supported-sdk-versions}

| 言語   | 最小バージョン     |
|------------|---------------------|
| Python     | dd-trace-py 4.14.0  |
| JavaScript | dd-trace-js 6.13.0  |
| Java       | 間もなく対応         |
| Ruby       | 間もなく対応         |

## セットアップ {#setup}

機密データのリダクションを有効にするには、AI Guard のリダクションルールを構成し、サービスで機密データスキャンを有効にして、AI Guard が返す置換を適用してください。

### 1. リダクションルールを構成する {#1-configure-redaction-rules}

AI Guard の Sensitive Data Scanner ルールは、組織レベルで構成されています。AI Guard がリダクションを行うデータとその置換方法を選択するには、以下を実行します。

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}Sensitive Data Scanner{{< /ui >}} > {{< ui >}}Configuration{{< /ui >}} > [{{< ui >}}AI Guard{{< /ui >}}][1] に移動します。
1. AI Guard スキャングループを作成または編集し、検出する機密データのルールを有効にします。

{{< img src="security/ai_guard/ai_guard_sds_configuration.png" alt="Sensitive Data Scanner 構成ページの AI Guard タブ" style="width:100%;" >}}

{{< ui >}}Action on Match{{< /ui >}} で、ルールが機密データに一致した場合の動作を選択します。

{{< img src="security/ai_guard/ai_guard_action_on_match_options.png" alt="Match オプションでの Sensitive Data Scanner アクション: Hash、Redact、Partially Redact、Mask、No Action" style="width:100%;" >}}

- **Hash**: 一致した値全体をハッシュ化されたトークンに永続的に置き換えます。
- **Redact**: 一致した値全体を、指定した置換テキストに永続的に置き換えます。
- **Partially Redact**: 一致した値の一部のみを永続的に隠します。
- **Mask**: Datadog 内で一致した値を非表示にしますが、基になる値は保持されるため、権限を持つユーザーはそれを表示できます。
- **No Action**: 一致した値を変更せずにそのままにします。

モデルに送信される前に機密データを正確な値に置き換えるには、**Redact** を選択し、`[sensitive_data]` や `****` などの置換テキストを入力します。

{{< img src="security/ai_guard/ai_guard_redact_replacement_text.png" alt="カスタム置換テキストフィールドで選択された Redact アクション" style="width:100%;" >}}

タグは検出結果を分類しますが、一致したコンテンツを変更することはしません。

<div class="alert alert-info">この設定は組織全体に適用されます。このルールは、機密データスキャンが有効になっているサービスにのみ適用されます。</div>

### 2. サービスの機密データスキャンを有効にする {#2-enable-sensitive-data-scanning-for-a-service}

AI Guard の Sensitive Data Scanner ルールを有効にするだけでは不十分です。ルールを有効にした後、保護する AI Guard サービスでも機密データスキャンを有効にする必要があります。

1. {{< ui >}}Security{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Services{{< /ui >}}][2] に移動します。
1. デフォルトのポリシー、または保護するサービスと環境のポリシーを編集します。
1. {{< ui >}}Sensitive data scanning{{< /ui >}} で、以下のいずれかのオプションを選択し、ポリシーを保存します。
   - {{< ui >}}Disabled{{< /ui >}}: AI Guard は機密データのリクエストをスキャンしません。
   - {{< ui >}}Scanning{{< /ui >}}: AI Guard はリクエストをスキャンして機密データを検出し、その検出結果を AI Guard スパンに報告しますが、メッセージは変更せずに返します。
   - {{< ui >}}Scanning and redacting{{< /ui >}}: AI Guard はリクエストをスキャンして機密データを検出し、各ルールに設定されたアクションに従って一致をリダクションします。

{{< img src="security/ai_guard/ai_guard_sensitive_data_scanning.png" alt="機密データスキャン用の無効、スキャン、スキャンおよびリダクションオプションを備えた AI Guard サービスポリシー" style="width:100%;" >}}

このサービスポリシーにより、そのサービスに対する Sensitive Data Scanner の構成全体を有効または無効にできます。どのデータの検出およびリダクションを行うかは、[Sensitive Data Scanner の AI Guard 設定ページ][1]で設定します。

{{< ui >}}Scanning and redacting{{< /ui >}} が有効な場合、AI Guard は評価対象の会話の最後のメッセージのリダクションを行います。

<div class="alert alert-info">会話のコンテキストは段階的に構築されるため、AI Guard は会話履歴を再スキャンしません。アプリケーション内のメッセージをリダクション済みのバージョンに置き換えることは、SDK 実装側の責任となります。<a href="/security/ai_guard/setup/sdk/">AI Guard SDK</a> を参照してください。</div>

### 3. SDK を使用してリダクションの置換を適用する {#3-apply-redaction-replacements-with-the-sdk}

SDK がメッセージを評価する際、評価レスポンスには、設定されたルールによって変更された各値の完全にリダクションされた置換データとそのパスが含まれます。SDK はこれらの置換を評価対象の会話のコピーに適用し、評価結果とともに返します。その会話をモデルに転送し、アプリケーションの状態に保持することで、機密データがアプリケーション外に流出したり、次のターンで再導入されたりしないようにします。

AI Guard は各評価呼び出しにおいて最後のメッセージのみをスキャンし、それ以前のメッセージはコンテキストとして使用します。これには、評価される最後のメッセージである場合、ユーザープロンプト、アシスタントの応答、ツール呼び出しの引数、またはツール呼び出しの結果が含まれます。会話内の以前のメッセージは再スキャンされないため、結果には渡された会話全体のうち最後のメッセージのみがリダクションされた状態で含まれます。置換を適用しても、アプリケーションが所有するメッセージオブジェクトは変更されません。

リダクションされた会話を読み取る方法は、SDK の言語によって異なります。

- [Python][3]
- [JavaScript][4]
- [Java][5]

検出とレポートを維持したままトレーサーのリダクションをオフにするには、アプリケーション環境で `DD_AI_GUARD_REDACTION_ENABLED=false` を設定してください。評価は引き続き実行され、検出結果も報告されますが、SDK はメッセージを変更せずに返します。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard
[2]: https://app.datadoghq.com/security/ai-guard/settings/services
[3]: /ja/security/ai_guard/setup/sdk/?prog_lang=python#example-apply-sensitive-data-redaction-python
[4]: /ja/security/ai_guard/setup/sdk/?prog_lang=node_js#example-apply-sensitive-data-redaction-node-js
[5]: /ja/security/ai_guard/setup/sdk/?prog_lang=java#example-apply-sensitive-data-redaction-java