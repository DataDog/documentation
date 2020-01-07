---
integration_title: Jenkins
name: jenkins
kind: インテグレーション
git_integration_title: jenkins
newhlevel: true
description: 
is_public: true
public_title: Datadog-Jenkins インテグレーション
short_description: "ジョブステータスを追跡し、ビルドの開始と停止をイベントストリームから確認"
categories:
- configuration & deployment
---

{{< img src="integrations/jenkins/integration-jenkins-overview.png" alt="Jenkins Plugin"  >}}

## 概要

この Jenkins プラグインは、ビルドおよびデプロイイベントを Datadog に送信します。そこから、他のメトリクスのグラフにイベントを重ねて表示し、実際にどのデプロイがアプリケーションのパフォーマンスと信頼性によい影響または悪い影響を与えているかを特定できます。

このプラグインは、ビルド時間 (メトリクスとして) とステータス (サービスチェックとして) も追跡するため、ビルドに異常があるかどうかを把握できます。

<div class="alert alert-info">
Datadog Agent の Jenkins チェックは非推奨です。<a href="https://github.com/DataDog/jenkins-datadog-plugin">Jenkins プラグイン</a>を使用してください
</div>

## インストール

**このプラグインには [Jenkins 1.580.1][1] 以上が必要です。**

[このプラグイン][2]は、Jenkins インストールの [Update Center][3] (**Manage Jenkins** -> **Manage Plugins**) からインストールできます。

1. Jenkins インストールの Web インターフェイスに移動します。

2. [Update Center][4] (Manage Jenkins -> Manage Plugins) の Available タブで、**Datadog Plugin** を検索します。

3. プラグインの横にあるチェックボックスをオンにし、画面下にある 2 つのインストールボタンの一方を使用してインストールします。

4. プラグインを構成するには、**Manage Jenkins** -> **Configure System** ページに移動し、Datadog Plugin セクションを見つけます。

5. Datadog アカウントの [API Keys][5] ページから API キーをコピーし、構成画面の `API Key` テキストボックスに貼り付けます。

6. 構成を保存する前に、`API Key` テキストボックスのすぐ下にある Test Key ボタンを使用して API 接続をテストします。

7. Jenkins を再起動してプラグインを有効にします。

8. オプション: カスタムホスト名を設定します。
同じ構成画面の Hostname テキストボックスを使用して、Jenkins ホストにカスタムホスト名を設定できます。注: ホスト名は [RFC 1123][6] 形式に従う必要があります。

## コンフィグレーション

このインテグレーションに構成手順は必要ありません。

## 検証

プラグインが起動すると、イベントストリームに Jenkins イベントが表示されるようになります。

## メトリクス

次のメトリクスを Datadog で使用できます。

|メトリクス名| 説明|
|:----|:------|
|`jenkins.queue.size`| (ゲージ) Jenkins キューのサイズ|
|`jenkins.job.waiting`| (ゲージ) 待機中のジョブが費やした時間 (秒単位)|
|`jenkins.job.duration`| (ゲージ) ジョブの処理時間 (秒単位)|

## イベント

次のイベントがプラグインによって生成されます。

* ビルドの開始
* ビルドの終了

## サービスのチェック
* `jenkins.job.status`: ビルドのステータス

[1]: http://updates.jenkins-ci.org/download/war/1.580.1/jenkins.war
[2]: https://github.com/jenkinsci/datadog-plugin
[3]: https://wiki.jenkins-ci.org/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[4]: https://wiki.jenkins.io/display/JENKINS/Plugins#Plugins-Howtoinstallplugins
[5]: https://app.datadoghq.com/account/settings#api
[6]: https://tools.ietf.org/html/rfc1123#section-2
