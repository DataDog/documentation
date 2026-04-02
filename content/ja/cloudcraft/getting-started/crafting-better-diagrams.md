---
title: 'ダイアグラムの改善: Cloudcraft のライブダイアグラム作成とフィルタリング'
---

## 概要

Cloudcraft は、クラウドインフラストラクチャーのダイアグラムを作成するための強力なツールです。 New Live Experience 機能を使用すると、クラウドインフラストラクチャーの正確で最新のダイアグラムを作成できます。

リソースをタイプやタグでフィルタリングし、関心のある特定のコンポーネントに焦点を当てたダイアグラムを作成できます。これにより、ダイアグラムのパフォーマンスと可読性が向上し、インフラストラクチャーをより意味のある形で視覚化できます。

このガイドでは、New Live Experience を有効化する方法と、ニーズに合わせた有益なダイアグラムを作成する方法を学びます。

## 前提条件

作業を開始する前に、AWS または Azure アカウントを Cloudcraft に接続する必要があります。詳細については、以下を参照してください。

- [AWS アカウントを Cloudcraft に接続する][1]
- [Azure アカウントを Cloudcraft に接続する][2]

## New Live Experience を有効にする

New Live Experience を有効にするには、Cloudcraft の **Live** タブの上部にある **New Live Experience** スイッチを切り替えます。

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/enable-new-experience.png" alt="Cloudcraft のインターフェイスで、New Live Experience のベータ機能を有効にするスイッチをハイライトしたスクリーンショット。赤い矢印がスイッチを指しています。" responsive="true" style="width:80%;">}}

新規ユーザーの場合、デフォルトで New Live Experience* が有効になっていることがあります。

## アカウントとリージョンを選択

**Account** セクションの下にあるドロップダウンをクリックして、スキャンするアカウントを選択します。Cloudcraft に AWS または Azure アカウントを 1 つだけ追加した場合、自動的に選択されます。

**Region** のセクションでスキャンするリージョンを選択します。デフォルトでは `Global` とデフォルトのリージョンが選択されていますが、**More** ボタンをクリックして追加のリージョンを選択または検索できます。

選択を行うと、リージョンが自動的にスキャンされ、検出されたリソースの数がリージョン名の横に表示されます。**Region** セクションの上にある **Sync** ボタンをクリックすると、選択したすべてのリージョンのマニュアルスキャンを実行できます。

<div class="alert alert-danger">多くのリージョンを選択すると、ライブスキャンのパフォーマンスに影響を与える可能性があります。</div>

## リソースのフィルタリング

リソースをタイプやタグでフィルタリングできます。

タグは AWS アカウントから自動的に検出され、**Custom tags**、**AWS tags**、**Terraform tags**、および **Kubernetes tags** セクションに表示されます。

- **Custom tags** は、AWS または Azure のリソースに追加したタグです。
- **AWS tags** は、AWS によってリソースに自動的に追加されるタグです。
- **Terraform tags** は、Terraform によってリソースに自動的に追加されるタグです。
- **Kubernetes tags** は、Kubernetes によってリソースに自動的に追加されるタグです。

リソースをタイプ別にフィルタリングするには、**Resource** セクションをクリックし、フィルタリングするリソースタイプを選択します。デフォルトではすべてのリソースタイプが選択され、検出されたリソースの数が多い順に表示されます。

タグでリソースをフィルタリングするには、**Custom tags**、**AWS tags**、**Terraform tags**、または **Kubernetes tags** セクションをクリックし、フィルタリングするタグを選択します。デフォルトではすべてのタグが選択され、検出されたリソースの数が多い順に並び、`Untagged` (タグなし) は常に一番下に表示されます。

<div class="alert alert-info">特定のユースケースに最も関連性の高いリソースタイプやタグに焦点を当てることで、ダイアグラムのパフォーマンスと可読性を最適化できます。</div>

## ユースケース

### EC2 インスタンスと RDS データベースのみを表示するダイアグラムを作成する

1. **Resource** セクションをクリックします。
2. すべてのリソースタイプを選択解除し、**EC2** と **RDS** を選択します。
3. **Apply layout** をクリックして、選択したリソースのみを表示するダイアグラムを作成します。

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources.mp4" alt="Cloudcraft ユーザーが Resource セクションから EC2 および RDS インスタンスを選択する様子を示した 9 秒間のビデオ。" video="true">}}

### `Environment` タグを除外して、EC* インスタンスと RDS データベースを表示するダイアグラムを作成する

1. **Resource** セクションをクリックします。
2. すべてのリソースタイプを選択解除し、**EC2** と **RDS** を選択します。
3. **Custom tags** セクションをクリックします。
4. **Environment** タグをクリックし、`Untagged` オプションのみを選択したままにします。
5. **Apply layout** をクリックして、選択したリソースのみを表示し、`Environment` タグを除外したダイアグラムを作成します。

{{< img src="cloudcraft/getting-started/crafting-better-diagrams/select-specific-resources-and-tags.mp4" alt="Cloudcraft ユーザーが、Resource セクションおよび Custom tags セクションから EC2、RDS インスタンス、およびタグのないリソースを選択する様子を示した 15 秒間のビデオ。" video="true">}}

## フィードバック

Cloudcraft の New Live Experience は、ユーザーエクスペリエンスの向上とクラウドインフラストラクチャーのダイアグラム作成をより効率的かつ効果的にするための継続的な取り組みの一環です。これらの新機能の利用方法についてお知らせください。また、[このフォームからフィードバックをお寄せください][3]。

[1]: https://docs.datadoghq.com/ja/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: https://docs.datadoghq.com/ja/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: https://docs.google.com/forms/d/e/1FAIpQLSemnd5CJgrS9o-5ZCoZSxi99ATqIg9jpgqtcUZpMBzPJO75Wg/viewform