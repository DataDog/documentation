---
categories:
- mobile
dependencies: []
description: アプリのクラッシュの監視と詳細なランタイムパフォーマンスメトリクスの収集。
doc_link: https://docs.datadoghq.com/integrations/mparticle/
draft: false
git_integration_title: mparticle
has_logo: true
integration_id: mparticle
integration_title: mParticle
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: mparticle
public_title: Datadog-mParticle インテグレーション
short_description: アプリのクラッシュの監視と詳細なランタイムパフォーマンスメトリクスの収集。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

mParticle により、実行時のパフォーマンスデータの詳細をモバイルアプリで追跡できます。mParticle SDK は、CPU 負荷、メモリー使用量、電池残量など実行時のパフォーマンスデータを自動的に収集します。mParticle を Datadog につなげ、Datadog ダッシュボードで次の情報をリアルタイムに確認できます。

- クラッシュレポート
- サードパーティネットワークのパフォーマンスデータ
- アクティブなセッションの詳細
- デバイスの CPU、メモリ、バッテリー使用率

mParticle についての詳細は、[ブログ][1]や[ドキュメント][2]を参照してください。

## 計画と使用

### インフラストラクチャーリスト

1. [mParticle アカウント][3]にログインします。
2. 左側のナビゲーションバーにある紙飛行機アイコンをクリックして、Services Page に移動します。
3. Datadog タイルをクリックして、Datadog インテグレーションの設定パネルを表示します。
4. 設定パネルに [Datadog API キー][4]を入力し、Save をクリックします。
5. Status をオンに切り替えると、Datadog にデータが転送されます。

## リアルユーザーモニタリング

### データセキュリティ

このインテグレーションで利用できるメトリクスについては、[mParticle ドキュメント][2]を参照してください。

### ヘルプ

mParticle インテグレーションには、イベントは含まれません。

### ヘルプ

mParticle インテグレーションには、サービスのチェック機能は含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。

[1]: https://www.datadoghq.com/blog/track-detailed-run-time-performance-data-with-mparticle-and-datadog/
[2]: https://docs.mparticle.com/integrations/datadog/event/
[3]: https://app.mparticle.com/login?return=
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://docs.datadoghq.com/ja/help/