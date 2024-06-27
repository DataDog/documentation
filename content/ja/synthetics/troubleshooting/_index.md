---
description: Synthetic モニタリングでよくある問題のトラブルシューティング。
further_reading:
- link: /synthetics/
  tag: ドキュメント
  text: Synthetic テストの管理
- link: /synthetics/browser_tests/
  tag: ドキュメント
  text: ブラウザテストの構成
- link: /synthetics/api_tests/
  tag: ドキュメント
  text: API テストの構成
- link: /synthetics/private_locations/
  tag: ドキュメント
  text: プライベートロケーションの作成
kind: documentation
title: Synthetic モニタリングのトラブルシューティング
---

## 概要

Datadog Synthetic モニタリングのセットアップや構成で問題が発生した場合は、こちらのページを参考にしてトラブルシューティングをお試しください。問題が解決されない場合は、[Datadog サポートまでお問い合わせ][1]ください。

## API テスト

### ネットワークのタイミングが一様ではない

API テストの[時間メトリクス][2]に急激な上昇や全体的な増加がある場合、リクエストにボトルネックまたは遅延があることを示しています。詳しくは、[API テストの時間とバリエーション][3]のガイドを参照してください。

## ブラウザテスト

### 記録

#### ウェブサイトが iframe で読み込まれない

[Datadog 拡張機能][4]をダウンロードすると、ブラウザテストのレコーダーの右側にある iframe で Web サイトを確認できなくなり、`Your website does not support being loaded through an iframe.` (この Web サイトは iframe 経由の読み込みをサポートしていません) と表示されます。この場合、アプリケーションの設定で iframe での表示が抑制されている場合があります。

あるいは、iframe レコーダーで記録しているときに Web サイトにログインできない場合、アプリケーションのリクエストがブロックされている可能性があります。

**Open in Popup** をクリックして Web サイトをポップアップウィンドウで開き、ユーザージャーニーを記録してみてください。 

#### 一部のアプリケーションは iframe に読み込まれるが、読み込まれないものがある

これは、アプリケーションと環境によって制限が異なることを意味します。そのため、一部は iframe で視覚化されますが、表示されないものもあります。

#### iframe の上部に「We've detected HTTP requests that are not supported inside the iframe, you may need to record in a popup (iframe 内でサポートされていない HTTP リクエストを検知したため、ポップアップで記録を行う必要があります)」と表示される

これは `http` ページでステップを記録しようとしている場合に主に発生します。iframe レコーダーでは `https` のみサポートされています。ページをポップアップとして開くか、URL を `https` に変更してページの記録を開始してください。

{{< img src="synthetics/http_iframe.png" alt="HTTP を iframe で開いた場合" style="width:100%;" >}}

#### iframe で Web サイトが読み込まれず、Web サイトをポップアップで開いてもステップを記録できない

[Datadog 拡張機能][4]をダウンロードすると、ブラウザテストのレコーダーの右側にある iframe でウェブサイトを確認できなくなります。さらに、ウェブサイトを iframe とポップアップのどちらで開いても、ステップを記録できなくなります。

{{< img src="synthetics/recording_iframe.mp4" alt="ブラウザテストのステップの記録に関する問題" video="true" width="100%" >}}

このような場合は、`On specific sites` セクションでウェブサイトを指定するか、`On all sites` にトグルボタンを変更して、意図したウェブサイトのデータの読み取りおよび変更の許可を [Datadog 拡張機能][5]に付与してください。

{{< img src="synthetics/extension.mp4" alt="拡張機能にすべてのサイトのデータ読み取りを許可" video="true" width="100%" >}}

#### アプリケーションで手順を記録することができません

Chrome ブラウザに、拡張機能が正常に記録できないようにするポリシーがある可能性があります。

確認するには、`chrome://policy` へ移動して [`ExtensionSettings`][6] のような拡張機能に関する設定を探します。

#### レコーダーにログインページが表示されない

デフォルトでは、レコーダーの iframe/ポップアップは、ユーザーが使用しているブラウザを使用します。したがって、すでにアプリケーションにログインしている場合、iframe/ポップアップがログイン後のページを直接表示し、先にログアウトしないとログイン手順を記録できない可能性があります。

アプリケーションからログアウトせずに手順を記録できるようにするには、レコーダーの**シークレットモード**を利用します。

{{< img src="synthetics/incognito_mode.mp4" alt="シークレットモードのブラウザテストの使用" video="true" width="100%" >}}

**シークレットモードでポップアップウィンドウを開く**と、使用中のブラウザのメインセッションとユーザーデータから完全に分離されたセッションとして、テストコンフィギュレーションで設定した開始 URL からテストの記録を開始できます。

このシークレットポップアップウィンドウは、以前のブラウザ履歴 (Cookie やローカルデータなど) を無視します。アカウントから自動的にログアウトされ、初めて Web サイトにアクセスした場合と同じようにログイン手順の記録を開始できます。

### テスト結果

#### Mobile Small またはタブレットブラウザテストの結果が失敗し続けます

ウェブサイトに**レスポンシブ**技術を使用している場合、その DOM はテストを実行するデバイスにより大きく異なります。`Laptop Large` から実行するときは特定の DOM を使用し、`Tablet` または `Mobile Small` から実行する場合は別のアーキテクチャになります。

つまり、`Laptop Large` のビューポートから記録されたステップは `Mobile Small` からアクセスされた同じウェブサイトには適用されず、`Mobile Small` のテスト結果が失敗となることがあります。

{{< img src="synthetics/device_failures.png" alt="モバイルタブレットデバイスの失敗" style="width:100%;" >}}

このような場合のため、Datadog では、ランタイムでテストが設定されたビューポートと記録されたステップが一致する、**`Mobile Small` または `Tablet` に特定の別々のテスト**を作成することをおすすめしています。

`Mobile Small` または `Tablet` ビューポートでステップを記録するには、**Start Recording** ボタンを押す前にレコーダーのドロップダウンで `Mobile Small` または `Tablet` を選択します。

{{< img src="synthetics/record_device.png" alt="モバイルタブレットでの記録ステップ" style="width:100%;" >}}

さらに、Datadog のテストブラウザは**ヘッドレス**で実行されるため、ブラウザテストがサポートしない機能があります。たとえば、ブラウザテストは `touch` をサポートしないため、ウェブサイトがモバイルデザインで表示されるべきかを `touch` で検出することはできません。

#### ブラウザテストで `None or multiple elements detected` というステップの警告が表示される

ブラウザテストのステップに `None or multiple elements detected` のステップ警告が表示されています。

{{< img src="synthetics/step_warning.png" alt="ユーザーのロケーターのステップ警告" style="width:100%;" >}}

これは、このステップに定義されたユーザーロケーターが、複数の要素を対象としているか、いずれの要素も対象としていないため、ブラウザテストで対応する必要のある要素が不明であるという意味です。

この問題を修正するには、問題のあるステップの詳細オプションを開き、テストするステップのページで `Test` をクリックします。これにより、要素がハイライトされるかエラーメッセージが印刷されます。次に、ページの単一要素に一致するようユーザーロケーターを修正できます。

{{< img src="synthetics/fix_user_locator.mp4" alt="ユーザーロケーターのエラーを修正" video="true" width="100%" >}}

#### CSS のポインタープロパティで問題が発生している

自動化されたブラウザは、CSS の `pointer` メディア機能をエミュレートすることをサポートしていません。ブラウザテストでは、すべてのテストとデバイス (ラップトップ、タブレット、モバイル) で `pointer: none` が使用されます。

### リソースのロード時間

#### リソースのロード時間が実際のステップの実行時間よりも長い

ロード時間の長いリソースは、複数のステップにまたがる可能性があります。Datadog は、テスト結果の各ステップ内で、その特定のステップの実行中に開始されたすべてのリソースを返します。ただし、Datadog は、重要なネットワークの呼び出しが終了するまで、およそ 20 秒の猶予を与え
ます。この時間が経過すると、Synthetics ワーカーは次のステップに進みます。ワーカーが使用するタイムアウトは階層化されており、速度と信頼性のバランスが取られています。このため、Datadog では、ステップの実行時間を使って Web アプリケーションの速度や遅さを測定することを推奨していません。ステップの実行時間は、ワーカーが信頼できる結果を出すために必要なバランスが考慮された時間となっています。

## API およびブラウザのテスト

### 認証エラー

Synthetics テストの 1 つが 401 をスローしている場合は、エンドポイントで認証できないことを意味している可能性が高いです。そのエンドポイント (Datadog 外) での認証に使用するメソッドを使用し、Synthetic テストを構成するときにそれを複製する必要があります。

* エンドポイントは**ヘッダーベース認証**を使用していますか？
  * **基本の認証情報**: [HTTP][7] または[ブラウザテスト][8]の**高度なオプション**に、関連する認証情報を指定します。
  * **トークンベース認証**: 最初の [HTTP テスト][7]でトークンを抽出し、その最初のテストの応答をパースして[グローバル変数][9]を作成し、その変数を認証トークンを必要とする 2 回目の [HTTP][7] または[ブラウザテスト][10]に再挿入します。
  * **セッションベース認証**: [HTTP][7] または[ブラウザテスト][8]の**高度なオプション**に必要なヘッダーまたはクッキーを追加します。

* このエンドポイントは**認証用のクエリパラメーター**を使用していますか (たとえば、URL パラメーターに特定の API キーを追加する必要がありますか)？

* このエンドポイントは **IP ベース認証**を使用していますか？その場合は、[Synthetics テストの元となる IP][11] の一部またはすべてを許可する必要があります。

### アクセス拒否エラー

Synthetic テストによって返された `403 Forbidden` エラーが確認された場合は、`Sec-Datadog` ヘッダーを含むリクエストを Web サーバーがブロックまたはフィルタリングした結果である可能性があります。このヘッダーは、Datadog が開始する各 Synthetic リクエストに追加され、トラフィックのソースを識別し、Datadog サポートが特定のテスト実行を識別するのを支援します。

さらに、[Datadog Synthetics のモニタリング IP 範囲][11]がファイアウォールによってトラフィックソースとして許可されていることを確認する必要がある場合もあります。

### 通知の欠落

デフォルト設定では、Synthetic テストは [再通知][12]しません。これは、トランジション（たとえば、テストがアラート状態になる、または直近のアラートから回復するなど）が生成された後に通知ハンドル（メールアドレスや Slack ハンドルなど）を追加しても、そのトランジションの通知は送信されないことを意味します。次のトランジションから通知が送信されます。

## プライベートロケーション

{{< tabs >}}
{{% tab "共通" %}}

### ブラウザテストの結果で、`Page crashed` エラーが表示されることがある

これにより、プライベートロケーションワーカーのリソース消費の問題が明らかになることがあります。プライベートロケーションワーカーが、[十分なメモリリソース][101]でプロビジョニングされていることを確認してください。

### テストの実行が遅くなることがある

これにより、プライベートロケーションワーカーのリソース消費の問題が明らかになることがあります。プライベートロケーションワーカーが、[十分な CPU リソース][101]でプロビジョニングされていることを確認してください。

### ブラウザテストの実行に時間がかかりすぎる

プライベートロケーションのデプロイメントで、[メモリ不足の問題][102]が発生していないことを確認します。[ディメンショニングガイドライン][103]に従ってワーカーインスタンスのスケーリングを既に試した場合は、[Datadog サポート][104]に連絡してください。

### プライベートロケーションから実行される API テストに `TIMEOUT` エラーが表示される

API テストの実行が設定されているエンドポイントに、プライベートロケーションが到達できていない可能性があります。テストするエンドポイントと同じネットワークにプライベートロケーションがインストールされていることを確認してください。別のエンドポイントでテストを実行し、同じ `TIMEOUT` エラーが表示されるかどうか試してみることも可能です。

{{< img src="synthetics/timeout.png" alt="プライベートロケーションがタイムアウトした API テスト" style="width:70%;" >}}

[101]: /ja/synthetics/private_locations/dimensioning
[102]: https://docs.docker.com/config/containers/resource_constraints/
[103]: /ja/synthetics/private_locations/dimensioning#define-your-total-hardware-requirements
[104]: /ja/help/

{{% /tab %}}
{{% tab "Docker" %}}

### 時々、プライベートロケーションのコンテナが、強制終了された `OOM` を取得する

強制終了された `Out Of Memory` を取得するプライベートロケーションのコンテナは、通常、プライベートロケーションワーカーのリソース消費の問題を明らかにします。プライベートロケーションのコンテナが、[十分なメモリリソース][101]でプロビジョニングされていることを確認してください。

### プライベートロケーションのテストを実行しようとすると、`invalid mount config for type "bind": source path must be a directory` というエラーが表示される

これは、Windows ベースのコンテナで単一ファイルをマウントしようとした場合に発生し、これはサポートされていません。詳しくは、[Docker マウントボリュームのドキュメント][102]をご参照ください。バインドマウントのソースがローカルディレクトリであることをご確認ください。

[101]: /ja/synthetics/private_locations#private-location-total-hardware-requirements
[102]: https://docs.docker.com/engine/reference/commandline/run/#mount-volume--v---read-only

{{% /tab %}}
{{% tab "Windows" %}}

### 再起動せずに Synthetics Private Location Worker サービスを再起動する

まず、インストール時に指定した構成でプライベートロケーションをインストールしたことを確認します。サービスを再起動するには、GUI を使用するか、Windows PowerShell を使用します。

#### GUI

1. MSI インストーラーを開き、**Start** メニューで **Services** を検索します。
1. 任意のユーザーアカウントで **Services** を起動します。
1. **Services (Local)** をクリックし、`Datadog Synthetics Private Location` というサービスを探します。
1. ステップ 2 で見つかったサービスを右クリックし、**Restart** を選択します。

Synthetics Private Location Worker は **Local Service** アカウントで実行されるようになりました。これを確認するには、タスクマネージャーを起動し、**Details** タブで `synthetics-pl-worker` プロセスを探します。

#### PowerShell

1. PowerShell スクリプトの実行権限を持つ任意の Windows アカウントで **Windows PowerShell** を起動します。
1. コマンド `Restart-Service -Name “Datadog Synthetics Private Location”` を実行します。

### Synthetics Private Location Worker の実行を維持する

まず、Synthetics Private Location Windows Service がインストールされているマシンにログインし、そのマシンでスケジュールタスクを作成する権限を持っていることを確認してください。

Synthetics Private Location Worker がクラッシュした場合、Windows に PowerShell スクリプトを実行するスケジュールタスクを追加し、アプリケーションの実行が停止した場合に再起動するようにします。これにより、クラッシュ後にプライベートロケーションが確実に再起動されます。

アプリケーションのインストール時にコンフィギュレーションファイルを提供した場合、インストール後に `Datadog Synthetics Private Location` という名前の Windows サービスが自動的に開始されます。これを確認するには、**Services** ツールでサービスが実行されていることを確認します。この Windows サービスは、プライベートロケーションを自動的に再起動します。

{{% /tab %}}
{{< /tabs >}}

### sudo のパスワードを要求される/dog ユーザーのパスワードを要求される

Private Location ユーザー (`dog`) は、さまざまな理由で `sudo` を必要とします。通常、このユーザーには、コンテナ上で Private Location を起動する過程で `sudo` アクセスを許可する特定の権限が付与されます。ポリシーで `dog` ユーザーの `sudo` 権限を制限しているか、`dog` ユーザー (UID 501) としてコンテナを起動できないようにしているか確認してください。

さらに、Private Location のバージョン `>v1.27` では、Datadog は `clone3` システムコールの使用に依存しています。古いバージョンのコンテナランタイム環境 (Docker バージョン <20.10.10 など) では、`clone3` はデフォルトの `seccomp` ポリシーではサポートされていません。コンテナランタイム環境の `seccomp` ポリシーに `clone3` が含まれていることを確認してください。これは、使用中のランタイムのバージョンを更新したり、`seccomp` ポリシーに `clone3` を手動で追加したり、または `unconfined` seccomp ポリシーを使用することで実現できます。詳細については、[Docker の `seccomp` ドキュメント][13]を参照してください。

## 参考資料

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
[12]: /ja/synthetics/api_tests/?tab=httptest#configure-the-test-monitor
[13]: https://docs.docker.com/engine/security/seccomp/