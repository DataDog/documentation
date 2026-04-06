---
description: CloudPrem デプロイメントを、パフォーマンスとセキュリティの要件に合わせて設定 / カスタマイズする方法を説明します。
further_reading:
- link: /cloudprem/install/
  tag: ドキュメント
  text: CloudPrem をインストールする
- link: /cloudprem/operate/sizing/
  tag: ドキュメント
  text: クラスター サイズを見積もる
title: CloudPrem を設定する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

CloudPrem のインストール後は、環境、セキュリティ、パフォーマンスの要件に合わせてデプロイメントを調整できます。主な設定対象には、アカウント インテグレーション、クラウド リソースのセットアップ、クラスター サイジング、Ingress、処理オプションがあります。これらを調整することで、CloudPrem を自社環境に合った形で運用できます。

Logs メニューに CloudPrem の項目が表示されない場合は、お使いのアカウントで CloudPrem が有効になっていません。アカウントで CloudPrem を有効にするには、[CloudPrem Preview][1] に参加してください。

{{< whatsnext desc="CloudPrem デプロイメントをカスタマイズする:">}}
   {{< nextlink href="/cloudprem/configure/indexes/" >}}インデックスを設定する{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/pipelines/" >}}処理を設定する{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/ingress/" >}}Ingress を設定する{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/lambda/" >}}Lambda を使った検索オフロード{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/