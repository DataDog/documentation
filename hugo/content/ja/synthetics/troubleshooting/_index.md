---
description: Synthetic Monitoring の一般的な問題のトラブルシューティング。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic テストを管理する
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストを構成する
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: API テストを構成する
- link: /synthetics/private_locations/
  tag: ドキュメント
  text: プライベートロケーションを作成する
title: Synthetic Monitoring のトラブルシューティング
---
## 概要 {#overview}

このページは、Datadog Synthetic Monitoring のセットアップと構成に関する一般的な問題をトラブルシューティングに使用します。さらにサポートが必要な場合は、[Datadog サポート][1]にお問い合わせください。

## 一般的なエラーメッセージ{#common-error-messages}

このテーブルを使用して、一般的なエラーのトラブルシューティング手順を見つけてください。

| エラーメッセージ                                  | 参照セクション |
|------------------------------------------------|-------------|
| `self-signed certificate in certificate chain` | [「プライベートロケーション」→「証明書」](?tab=windows#self-signed-certificate-errors) |
| `401 Unauthorized`                           | [「API およびブラウザテスト」→「Unauthorized」](#api-and-browser-tests) |
| `Element not found`                            | [「テスト実行」→「要素選択の問題」](#element-detection-warning-in-browser-test-steps) |
| `Unsupported browser version`                  | [「プライベートロケーション」→「ブラウザの互換性」](?tab=common#requirements-for-browser-tests-running-on-private-location) |
| `Failed to load resource: ERR_INVALID_ARGUMENT` | [「プライベートロケーション」→「Chrome 149 の問題」](?tab=common#chrome-149-issue-on-private-locations) |


## API テスト{#api-tests}

### ネットワークタイミングのばらつき{#network-timings-are-varied}

API テストの[タイミングメトリクス][2]に急激なスパイクや全体的な増加が見られる場合、通常はリクエストにボトルネックや遅延が発生していることを示しています。詳細については、「[API テストのタイミングとばらつき][3]」を参照してください。

## ブラウザテスト{#browser-tests}

### 記録{#recording}

#### ウェブサイトが iframe に読み込まれない{#the-website-is-not-loading-in-the-iframe}

[Datadog 拡張機能][4]をインストールした後も、ブラウザテストのレコーダーの iframe にウェブサイトが表示されない場合、「`Your website does not support being loaded through an iframe`」というメッセージが表示されることがあります。これは、Content Security Policy (CSP) や `X-Frame-Options` のような関連するセキュリティヘッダーなど、アプリケーションのセキュリティ設定が iframe の読み込みをブロックしていることを示しています。

同様に、iframe での記録中にログインが失敗する場合、CSP ルールやその他のセキュリティ構成のためにアプリケーションで特定のリクエストがブロックされている可能性があります。場合によっては、ログインフローが iframe 内で読み込まれたウェブアプリケーションから開始されると、CSRF トークンが失われる可能性があり、その問題によってログインが失敗することもあります。

**解決策**: [{{< ui >}}Open in Popup{{< /ui >}}] をクリックして、iframe ではなく別のウィンドウでユーザージャーニーを記録してください。 

#### 特定のアプリケーションのみがiframe内で読み込まれる{#only-certain-applications-load-in-the-iframe}

アプリケーションや環境によって、CSP 構成やその他のセキュリティ制限は異なります。iframe の読み込みを許可するものもあれば、セキュリティ上の理由でブロックするものもあります。

**解決策**: [{{< ui >}}Open in Popup{{< /ui >}}] をクリックして、iframe ではなく別のウィンドウでユーザージャーニーを記録してください。

#### HTTP リクエストの警告バナーが iframe 内に表示される{#http-requests-warning-banner-appears-in-iframe}

この警告は、`http` ページで記録しようとしたときに表示されます。レコーダーの iframe は `https` ページのみをサポートしています。

**解決策**: ページをポップアップウィンドウで開くか、`https` を使用するよう URL を変更してください。

#### iframe とポップアップのどちらでもウェブサイトが読み込まれず記録ができない{#website-fails-to-load-and-recording-doesnt-work-in-iframe-or-pop-up}

[Datadog 拡張機能][4]をインストールした後もブラウザテストのレコーダーの iframe にウェブサイトが表示されず、iframe とポップアップの両方のモードで記録が失敗することがあります。

   {{< img src="synthetics/recording_iframe.mp4" alt="ブラウザテストのステップの記録に関する問題" video="true" width="100%" >}}

   **解決策**: [`On specific sites`] セクションでウェブサイトを指定するか、[`On all sites`] を選んで、[Datadog 拡張機能][5]に適切な権限があることを確認してください。

   {{< img src="synthetics/extension.mp4" alt="すべてのサイトでデータへのアクセスを拡張機能に許可する" video="true" width="100%" >}}

#### アプリケーションでステップの記録が失敗する{#recording-steps-fails-on-application}

Chromeブラウザのポリシーにより、拡張機能で正常に記録できない場合があります。

**解決策**: `chrome://policy`で、レコーダーをブロックしている可能性のある [`ExtensionSettings`][6] などの拡張機能関連の設定を確認してください。

#### レコーダーにログインページが表示されない{#login-page-not-visible-in-recorder}

レコーダーの iframe またはポップアップでは、デフォルトで現在のブラウザセッションが使用されます。アプリケーションにすでにログインしている場合、ログインページをスキップしてログイン後のビューに直接移動するため、認証ステップを記録できないことがあります。

**解決策**: 現在のセッションからログアウトせずにログインステップを記録するには、レコーダーの {{< ui >}}incognito mode{{< /ui >}} を使用してください。

{{< img src="synthetics/incognito_mode.mp4" alt="シークレットモードを使用したブラウザテスト" video="true" width="100%" >}}

{{< ui >}}Incognito mode{{< /ui >}} は、ブラウザの履歴、Cookie、ログインデータを無視する分離されたセッションを作成します。これにより、初めてウェブサイトにアクセスする場合と同様に、ログインステップを最初から記録できます。

### テスト結果{#test-results}

#### モバイルおよびタブレットのブラウザテストが継続的に失敗する{#mobile-and-tablet-browser-tests-consistently-fail}

**レスポンシブ**ウェブサイトは、デバイスによって DOM 構造が大きく異なる場合があります。ウェブサイトの DOM が、{{< ui >}}Laptop Large{{< /ui >}} の場合と {{< ui >}}Tablet{{< /ui >}} または {{< ui >}}Mobile Small{{< /ui >}} のビューポートで大きく異なるという具合です。

{{< ui >}}Laptop Large{{< /ui >}} で記録されたステップは、より小さいビューポートでは機能しない場合があり、モバイルおよびタブレットのテストが失敗する原因となります。

{{< img src="synthetics/device_failures.png" alt="モバイル・タブレットデバイスでの失敗" style="width:100%;" >}}

**解決策**: 記録されるステップが対象のビューポートに対応するよう、デバイスごとにテストを作成してください。

モバイルまたはタブレットのビューポート用の記録には、[{{< ui >}}Start Recording{{< /ui >}}] をクリックする前に、レコーダーのドロップダウンで [{{< ui >}}Mobile Small{{< /ui >}}] または [{{< ui >}}Tablet{{< /ui >}}] を選択してください。

{{< img src="synthetics/record_device.png" alt="モバイル・タブレットでのステップの記録" style="width:100%;" >}}

**注**: ブラウザテストは**ヘッドレス**モードで実行され、モバイルデザインの検出に使われる `touch` イベントなど、一部の機能はサポートされません。

#### ブラウザテストステップにおける要素検出の警告{#element-detection-warning-in-browser-test-steps}

ブラウザテストステップで [`None or multiple elements detected`] という警告が表示されることがあります。

{{< img src="synthetics/step_warning.png" alt="ユーザーロケーターステップの警告" style="width:100%;" >}}

これは、ユーザーロケーターが複数の要素をターゲットにしているか、または何もターゲットにしていないため、テストがどの要素を操作すべきか判断できないことを示しています。

**解決策**: 記録を編集し、問題のあるステップの詳細オプションを開き、テストページに移動して [{{< ui >}}Test{{< /ui >}}] をクリックしてください。これにより、特定された要素が強調表示されるか、エラーが表示されます。ユーザーロケーターを調整して、単一の固有の要素をターゲットにしてください。

{{< img src="synthetics/fix_user_locator.mp4" alt="ユーザーロケーターエラーの修正" video="true" width="100%" >}}

#### CSS の pointer プロパティの制限{#css-pointer-property-limitations}

自動化されたブラウザは、CSSの `pointer` メディア機能をエミュレートできません。デバイスの種類 (ノートパソコン、タブレット、モバイル) に関係なく、すべてのブラウザテストで `pointer: none` を使用します。

### リソースの所要時間{#resource-duration}

#### リソースの所要時間がステップの所要時間を超えている{#resource-duration-exceeds-step-duration}

読み込み時間が長いリソースは、複数のテストステップにまたがる可能性があります。Datadog は、特定のステップ中に開始されたすべてのリソースを返しますが、次のステップに進む前に重要なネットワーク呼び出しが完了するまで約 20 秒の猶予を与えます。

Synthetics ワーカーは、階層的なタイムアウトを使用して速度と信頼性のバランスを調整します。したがって、[ステップの所要時間][14]を使用して、Webアプリケーションのパフォーマンスを測定することは推奨されません。これは、信頼性の高いテスト実行に必要な時間を反映しています。

## API テストおよびブラウザテスト{#api-and-browser-tests}

### Unauthorized エラー{#unauthorized-errors}

Synthetic Monitoring テストにおける 401 エラーは、通常、認証の失敗を示します。エンドポイントに対して通常使用している認証方法 (Datadog以外) と同じものを使用し、それを Synthetic テスト構成で再現してください。

* エンドポイントは**ヘッダーベースの認証**を使用していますか。
  * **基本認証**: 関連する認証情報を [HTTP][7] または[ブラウザテスト][8]の {{< ui >}}Advanced options{{< /ui >}} に指定します。
  * **トークンベースの認証**: 最初の [HTTP テスト][7]でトークンを抽出し、そのテストのレスポンスをパースして[グローバル変数][9]を作成します。次に、認証トークンを必要とする 2 回目の [HTTP][7] または[ブラウザテスト][10]で、その変数を再注入します。
  * **セッションベースの認証**: [HTTP][7] または[ブラウザテスト][8]の {{< ui >}}Advanced options{{< /ui >}} に必要なヘッダーまたは Cookie を追加します。
  
* エンドポイントは**クエリパラメーター認証** (URL パラメーターへの API キーの追加など) を使用していますか。

* エンドポイントは **IP ベースの認証**を使用していますか。この場合は、ファイアウォールまたはセキュリティ設定で [Synthetic Monitoring IP 範囲][11]を許可してください。

### Forbidden エラー{#forbidden-errors}

Synthetic Monitoring テストで `403 Forbidden` エラーが発生する場合、通常は Web サーバーまたはファイアウォールが Synthetic トラフィックをブロックしていることを意味します。[Synthetic Monitoring IP 範囲][11]を許可し、Synthetic リクエストをその `user-agent` ヘッダーで識別してください。API テストの場合は `Datadog/Synthetics`、ブラウザテストの場合は `DatadogSynthetics` で終わる値となります。Synthetic テストは `Sec-Datadog` ヘッダーを送信しなくなったため、これに依存している許可リストは更新してください。その他の識別子については、「[Synthetic ボットを識別する][18]」を参照してください。

### 通知が届かない{#missing-notifications}

Synthetic テストは、デフォルトでは[再通知][12]を行いません。状態遷移 (テストのアラート発生や復旧など) が発生した後に通知ハンドル (メールアドレスや Slack ハンドル) を追加しても、その遷移に対する通知は送信されません。通知が送信されるのは、変更後の遷移に対してのみです。

## モバイルテスト{#mobile-tests}

### デバイスの記録を開始できない{#unable-to-launch-a-device-recording}

起動時にセキュリティチェック (USB デバッグの検証など) を行うアプリケーションでは、記録ができない場合があります。最適なテスト記録を行うためには、これらのセキュリティチェックを行わないバージョンのアプリケーションをアップロードしてください。

### 記録および実行中のアプリ機能の問題{#app-functionality-issues-during-recording-and-execution}

iOS アプリの再署名プロセスにより、記録中または実行中にアプリの機能が正しく動作しない場合があります。デバイスの信頼を確保するために必要なこのプロセスにより、重要な iOS エンタイトルメント (Contacts、Camera、Keychain、Photos、Health Kit、Home Kit など) が削除される場合があります。

**解決策**: iOSアプリを配布する際は、Ad Hocまたは開発用プロビジョニングプロファイルを使用して、エンタイトルメント関連の問題を最小限に抑え、互換性を向上させてください。

## Network Pathテスト{#network-path-tests}

### [Locations & Agents] に Datadog Agent がオプションとして表示されない{#datadog-agent-not-listed-as-an-option-in-locations-agents}

テスト作成時に Datadog Agent が選択可能なオプションとして表示されない場合は、すべての前提条件を満たしていること、およびセットアップ手順を完了していることを確認してください。詳しくは [Agent 構成][16]をお読みください。

### Datadog Agent のスケジュールされたテストが期待されるスケジュールで実行されない{#scheduled-tests-from-the-datadog-agent-is-not-running-at-the-expected-schedule}

大規模または高負荷の環境では、Datadog Agent に同時実行を処理するための十分なワーカーがない場合、スケジュールされたテストが期待される間隔で実行されないことがあります。パフォーマンスを最適化し、一貫したスケジュールを維持するには、[ワーカーの数を増やし][17]、Agent に割り当てられたテストの合計数以上になるようにしてください。

### Datadog Agent から実行されたテストの結果が見つからない{#missing-test-results-executed-from-the-datadog-agent}

Datadog UI にテスト結果が表示されない場合、Datadog Agent はテスト結果を処理する Synthetics インテーク (https://http-synthetics.datadoghq.com) にテスト結果を送信していません。Datadog Agent からこのインテークへのアウトバウンドネットワークトラフィックが許可されていることを確認してください。

Datadog Agent がプロキシの背後で実行されている場合は、Synthetics フォワーダーがプロキシ経由でトラフィックを送信するように構成されていることを確認してください。たとえば、以下のようにします。

```
synthetics: 
  collector: 
    enabled: true
synthetics.forwarder.dd_url: http://my-proxy.com:<proxy-port>
```
さらに、プロキシ自体が Synthetics インテークへのアウトバウンドネットワークトラフィックを許可するように構成されていることを確認してください。

## プライベートロケーション{#private-locations}

{{< tabs >}}
{{% tab "共通" %}}

### 403 エラーのためプライベートロケーションがテストを取得できない{#private-location-unable-to-fetch-tests-due-to-403-error}

プライベートロケーションが Datadog からテストを取得しようとすると、このエラーが表示されます。

```
Queue error - onFetchMessagesLongPolling - Got 403 in request - {"errors":["Expired/not yet valid signature"]}
Error: Got 403 in request - {"errors":["Expired/not yet valid signature"]}
    at Function.QueueError.fromHTTPError (dist/build/index.js:259354:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:258914:48)
```

**原因**：ログに、プライベートロケーションがテストを取得するために Synthetics インテークへの接続には成功したものの、認証の問題により Datadog からの 403 応答でリクエストが失敗したことが示されています。具体的には、リクエスト署名が期限切れであるか、まだ有効ではないと判断されました。プライベートロケーションと Datadog 間の通信は、Datadog Signature v1 ([AWS Signature v4][105] と同じ署名プロセスに基づく) を使用して保護されています。各リクエストにタイムスタンプが含まれることで、認証と整合性の両方が確保されます。プライベートロケーションをホストしているサーバーのシステムクロックが同期していない場合、タイムスタンプが許容範囲外となり、署名の検証が失敗します。

**解決策**: プライベートロケーションをホストしているサーバーの時刻が正確に同期されていることを確認してください。NTP (Network Time Protocol) サービスを使用している場合は、これらのサービスが正しく構成され、適切に機能していることを確認し、システムクロックがタイムソースと同期できない原因となる構成ミスに対処してください。

### ブラウザテストで `Page crashed` エラーが発生する{#browser-tests-show-page-crashed-errors}

ページがクラッシュする場合、通常はプライベートロケーションのワーカーでリソースが枯渇していることを示しています。プライベートロケーションのワーカーに[十分なメモリリソース][101]があることを確認してください。

### テストの実行速度が予想より遅い{#test-execution-is-slower-than-expected}

テストの実行速度が遅い場合、通常はプライベートロケーションのワーカーでリソースが枯渇していることを示しています。プライベートロケーションのワーカーに[十分な CPU リソース][103]があることを確認してください。

### ブラウザテストの実行に時間がかかりすぎる{#my-browser-tests-are-taking-too-long-to-run}

プライベートロケーションのデプロイメントで[メモリ不足の問題][102]が発生していないことを確認してください。[ディメンショニングガイドライン][101]に従ってワーカーインスタンスのスケーリングをすでに試している場合は、[Datadogサポート][104]にお問い合わせください。

### プライベートロケーションでブラウザテストを実行するための要件{#requirements-for-browser-tests-running-on-private-location}

ブラウザテストでは、ブラウザプロセスの起動 (テスト実行開始時) と強制終了 (テスト実行終了時) を行うための昇格された権限が必要です。プライベートロケーションが昇格された権限を制限するセキュリティコンテキストで構成されている場合、ブラウザテストが実行されると、プライベートロケーションはエラーログを出力します。報告されるログは、テスト実行用に選択されたブラウザによって異なります。Chrome/Edge で実行されたテストでは、次のエラーが報告されます。

```
Critical error in startBrowser: Failed to launch the browser process!
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

**Firefox のエラー：**

```
Impossible to spawn Firefox: binary is not a Firefox executable
sudo: The "no new privileges" flag is set, which prevents sudo from running as root.
sudo: If sudo is running in a container, you may need to adjust the container configuration to disable the flag.
```

### プライベートロケーションで実行される ICMP テストの要件{#requirements-for-icmp-tests-running-on-private-location}

ICMP テストは `ping` コマンドを使用して、ネットワークルートとホストの接続性を評価します。`ping` コマンドは ICMP パケットを送信するために raw ソケットを開き、`NET_RAW` 機能が必要です。コンテナのセキュリティコンテキストでこの機能が削除されている場合、プライベートロケーションで ICMP テストが正常に機能しません。

さらに、`ping` には raw ソケットを作成するための昇格された権限が必要です。プライベートロケーションが昇格された権限を制限するセキュリティコンテキストで構成されている場合、プライベートロケーションは ICMP テストを実行できません。

### `TIMEOUT`エラー (プライベートロケーションからの API テストにおけるもの){#timeout-errors-in-api-tests-from-private-locations}

`TIMEOUT` エラーは通常、プライベートロケーションがテストエンドポイントに到達できないことを示しています。プライベートロケーションがターゲットエンドポイントと同じネットワークにインストールされていることを確認してください。別のエンドポイントをテストして、問題が特定のエンドポイントに固有のものか、ネットワーク全体のものかを判断してください。

{{< img src="synthetics/timeout.png" alt="プライベートロケーションの API テストのタイムアウト" style="width:70%;" >}}

### プライベートロケーションにおける Chrome 149 の問題{#chrome-149-issue-on-private-locations}

Chrome バージョン 149 ではリクエストヘッダーの検証が厳格化されており、これによりサブリソースのリクエストが `net::ERR_INVALID_ARGUMENT` で失敗する可能性があります。以前の Chrome バージョンの検証はより緩やかでした。

**解決策**: この問題を解決するには、プライベートロケーションを[バージョン 1.70.0 以降][106]にアップグレードしてください。

[101]: /ja/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /ja/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /ja/help/
[105]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[106]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "Docker" %}}

### プライベートロケーションコンテナの IPv4 転送問題の解決{#resolving-ipv4-forwarding-issues-for-private-location-containers}

プライベートロケーションは、テスト構成を取得しテスト結果を送信するために、[Datadog の Synthetic Monitoring インテークエンドポイント][103] へのアクセスが必要です。Linux サーバーで IPv4 転送が無効になっている場合、プライベートロケーションはパブリックインターネットへのアクセスを失い、その結果インテークに接続できなくなる可能性があります。Docker は通常、コンテナの起動時に IP 転送を有効にしようとしますが、無効のままの場合、コンテナはインテークのような外部サービスに到達できません。

この場合、プライベートロケーションは次の内容を報告します。

```
WARNING: IPv4 forwarding is disabled. Networking will not work.
```
そして次の内容もです。

```
Queue error - onFetchMessagesLongPolling - getaddrinfo EAI_AGAIN intake.synthetics.datadoghq.com
```

**解決策**: ホストで `net.ipv4.ip_forward` が有効になっていることを確認してください。

### プライベートロケーションコンテナの読み取り専用ルートファイルシステムの要件{#read-only-root-file-system-requirements-for-private-location-containers}

プライベートロケーションコンテナが正常に動作するには、特定のフォルダーとファイルへの読み書きアクセス権が必要です。読み取り専用ルートファイルシステムでは、書き込みアクセスが必要な重要な操作のため、起動ができません。

起動中、コンテナはセキュリティ上の理由からビルドプロセス中にメタデータが削除されたバイナリに対して Linux ケーパビリティを設定します。これにより、デフォルトでは実行が `root` ユーザーに制限されます。プライベートロケーションは `dog` ユーザーとして実行されるため、コンテナは正常に実行するために権限を再適用する必要があります。読み取り専用ファイルシステムではこの権限更新ができず、起動エラーが発生します。

### プライベートロケーションコンテナが `OOM` エラーによって強制終了される{#private-location-containers-killed-by-oom-errors}

`Out Of Memory` エラーによってプライベートロケーションコンテナが強制終了される場合、ワーカーのリソースが枯渇していることを示しています。プライベートロケーションコンテナに[十分なメモリリソース][101]が割り当てられていることを確認してください。

### `Invalid mount config`エラー (プライベートロケーション実行時){#invalid-mount-config-error-when-running-private-locations}

このエラーは、Windows ベースのコンテナで単一ファイルのマウントを試みた場合に発生します。これはサポートされていません。**解決策**: バインドマウントのソースがローカルディレクトリであることを確認してください。詳細については、[Docker マウントボリューム][102]のドキュメントを参照してください。

[101]: /ja/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only
[103]: https://docs.datadoghq.com/ja/synthetics/platform/private_locations/?tab=docker#datadog-private-locations-endpoints

{{% /tab %}}
{{% tab "Windows" %}}

### Synthetics プライベートロケーションワーカーサービスの再起動{#restarting-synthetics-private-location-worker-service}

プライベートロケーションが、インストール時に指定された構成でインストールされていることを確認してください。GUI または PowerShell を使用してサービスを再起動してください。

#### GUI を使用する方法{#gui-method}

1. [{{< ui >}}Start{{< /ui >}}] メニューで {{< ui >}}Services{{< /ui >}} を検索します。
1. [{{< ui >}}Services{{< /ui >}}] を開きます (どのユーザーアカウントでも構いません)。
1. [{{< ui >}}Services (Local){{< /ui >}}] で `Datadog Synthetics Private Location` を探します。
1. このサービスを右クリックし、{{< ui >}}Restart{{< /ui >}} を選択します。

ワーカーは {{< ui >}}Local Service{{< /ui >}} アカウントで実行されます。タスクマネージャーの [{{< ui >}}Details{{< /ui >}}] タブで `synthetics-pl-worker` プロセスをチェックして、このことを確認してください。

#### PowerShell を使用する方法{#powershell-method}

1. スクリプトの実行権限付きで {{< ui >}}Windows PowerShell{{< /ui >}} を開きます。
1. `Restart-Service -Name "Datadog Synthetics Private Location"` を実行します。

### Synthetics プライベートロケーションワーカーの稼働時間の維持{#maintaining-synthetics-private-location-worker-uptime}

**前提条件**: スケジュールタスクを作成する権限を持つユーザーとしてマシンにログインしてください。

**クラッシュ後の復旧**: ワーカーが停止した場合に再起動する PowerShell スクリプトを実行する Windows のスケジュールタスクを作成してください。これにより、クラッシュ後の自動復旧が確実に行われます。

**自動起動**: インストール時に構成ファイルを指定した場合、`Datadog Synthetics Private Location` Windows サービスが自動的に起動します。{{< ui >}}Services{{< /ui >}} ツールでサービスが実行されていることを確認します。このサービスが自動再起動を処理します。

### 自己署名証明書エラー{#self-signed-certificate-errors}

Windows プライベートロケーションで起動直後にこのエラーが表示されることがあります。

```
Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain
    at Function.QueueError.fromHTTPError (dist/build/index.js:272629:12)
    at DatadogQueue.receiveMessages (dist/build/index.js:272186:48)
    at processTicksAndRejections (node:internal/process/task_queues:105:5)
    at Worker.fetchMessagesLongPolling (dist/build/index.js:26244:24)
    at Worker.doOneLoop (dist/build/index.js:25810:45)
```

**症状**：
- エラーメッセージがログに繰り返し出力されます。
- Windows ホストのブラウザでアクセスすると、証明書チェーンが変更されているように見えます (たとえば、Datadog のサイトで、信頼される CA ではなく、自己署名された中間証明書が表示されます)。

**原因**: このエラーは、ネットワークトラフィックに対して **Deep Packet Inspection (DPI)** または TLS インスペクションが実行されている場合に発生します。DPI は、SSL/TLS トラフィックを傍受、復号、再暗号化します。このプロセス中、プライベートロケーションは自己署名証明書を含む証明書チェーンを受信します。 

**対処方法**:

- カスタムの自己署名[ルート証明書][101]をプライベートロケーションにアップロードします。
- Windows プライベートロケーションのログにエラーが出力されなくなったことを確認します。

```
"Queue error - onFetchMessagesLongPolling - self-signed certificate in certificate chain
Error: self-signed certificate in certificate chain"
```

TLS インスペクションをバイパスしないと、Windows プライベートロケーションはテストメッセージを取得できず、エラー状態のままになります。

[101]: /ja/synthetics/platform/private_locations?tab=windowsservice#root-certificates

{{% /tab %}}
{{< /tabs >}}

### sudo または dog ユーザーのパスワードプロンプト{#password-prompts-for-sudo-or-dog-user}

プライベートロケーションユーザー (`dog`) が適切に動作するには、`sudo` アクセス権が必要です。このユーザーは通常、コンテナの起動時に権限を受け取ります。`dog`ユーザーの `sudo` アクセスを制限したり、コンテナが `dog` ユーザー (UID 501) として実行できなくしたりするポリシーがないことを確認してください。

さらに、プライベートロケーションのバージョン `>v1.27` は、`clone3` システムコールに依存しています。古いコンテナランタイム環境 (20.10.10 より前の Docker バージョン) では、デフォルトの `seccomp` ポリシーで `clone3` がサポートされていない場合があります。

**解決策**: ランタイムのバージョンを更新する、`clone3` をポリシーに手動で追加する、または `unconfined` seccomp ポリシーを使用することで、ランタイムの `seccomp` ポリシーに `clone3` が含まれるようにしてください。詳細については、[Docker の `seccomp` ドキュメント][13]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/help/
[2]: /ja/synthetics/metrics/#api-tests
[3]: /ja/synthetics/guide/api_test_timing_variations/
[4]: https://chrome.google.com/webstore/detail/datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa
[5]: chrome://extensions/?id=kkbncfpddhdmkfmalecgnphegacgejoa
[6]: https://chromeenterprise.google/policies/#ExtensionSettings
[7]: /ja/synthetics/api_tests/?tab=httptest#make-a-request
[8]: /ja/synthetics/browser_tests/#test-details
[9]: /ja/synthetics/settings/?tab=createfromhttptest#global-variables
[10]: /ja/synthetics/browser_tests/#use-global-variables
[11]: https://ip-ranges.datadoghq.com/synthetics.json
[12]: /ja/synthetics/api_tests/http_tests/?tab=requestoptions#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/
[14]: /ja/synthetics/guide/step-duration
[16]: /ja/synthetics/network_path_tests/#agent-configuration
[17]: /ja/network_monitoring/network_path/setup/?tab=linux#increase-the-number-of-workers
[18]: /ja/synthetics/guide/identify_synthetics_bots/