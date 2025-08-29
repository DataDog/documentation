---
app_id: artie
categories:
- クラウド
- data stores
- モニター
custom_kind: インテグレーション
description: Artie はデータベースとデータウェアハウス間のリアルタイムレプリケーションを実現します。
integration_version: 1.0.0
media:
- caption: Artie 概要ダッシュボード
  image_url: images/artie-overview-dashboard.png
  media_type: image
supported_os:
- linux
- windows
- macos
title: Artie
---
## 概要

[Artie](https://www.artie.com/) は、データをソースデータベースからデータウェアハウスに同期するためのリアルタイムデータベースレプリケーション製品です。

このインテグレーションを使用することで、Artie デプロイメントに関するメトリクスを Datadog 内で直接確認し、データパイプラインの健全性を監視することができます。このインテグレーションで取得できるメトリクスには、処理された行数の経時的データ、取り込みの遅延、フラッシュ時間、レプリケーションスロットのサイズが含まれます。これにより、パイプラインの遅延を診断し、Artie デプロイメントの設定を調整してスループットを最適化し、レプリケーションスロットの増加によるソースデータベースへの悪影響を防ぐことができます。

## セットアップ

### インストール

このインテグレーションは、既存の Artie アカウントでのみ利用可能です。まだ Artie を使用しておらず、トライアルを開始したい場合は、[hi@artie.com](mailto:hi@artie.com) にメールをお送りください。

1. Datadog で Artie インテグレーションタイルの **Connect Accounts** をクリックし、Datadog と Artie を接続します。
1. まだログインしていない場合は、Artie にログインしてください。
1. Artie に付与される Datadog 権限を確認し、**Authorize** をクリックします。

### 検証

Artie デプロイメントにデータが流れている限り、インテグレーションを接続してから 5～10 分後に、付属のダッシュボードにデータが表示され始めます。

## トラブルシューティング

サポートが必要な場合は [Artie サポート](mailto:hi@artie.com)にお問い合わせください。