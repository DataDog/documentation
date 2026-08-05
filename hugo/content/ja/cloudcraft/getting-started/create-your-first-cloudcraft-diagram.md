---
title: はじめてのライブ クラウド ダイアグラムを作成する
---

Cloudcraft を使用すると、AWS と Azure のクラウド環境を *ライブ ダイアグラム* として取り込むことができます。クラウド アカウント内のアーキテクチャをリバース エンジニアリングすることで、Cloudcraft は新しいダイアグラムの自動生成や既存ダイアグラムの拡張を行い、数時間から数日分の作業を削減できます。

<div class="alert alert-info">Cloudcraft の新しい Live エクスペリエンスを使用している場合は、<a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="Crafting Better Diagrams: Cloudcraft's Live Diagramming and Filtering">より良いダイアグラムの作成: Cloudcraft のライブ ダイアグラム作成とフィルタリング</a>を参照してください。</div>

## 前提条件

開始する前に、Cloudcraft にクラウド アカウントを接続します。

- AWS アカウントの場合は、[Cloudcraft で AWS アカウントを接続する][1]を参照してください。
- Azure アカウントの場合は、[Cloudcraft で Azure アカウントを接続する][2]を参照してください。

## はじめてのライブ ダイアグラム

クラウド アーキテクチャをスキャンして可視化するには、新しい **Blueprint** を作成します。Blueprint にはダイアグラム、バジェット、個々のコンポーネントに添付したすべてのドキュメントが含まれます。

1. Cloudcraft で **AWS** または **Azure** タブを選択し、次に **Live** タブを選択します。本ガイドでは主に AWS アカウントに焦点を当てます。Azure アカウントの場合も手順はほぼ同じです。

**Live** タブでは、アカウントの選択、リージョンのスキャン、レイアウトの生成、アカウント内のすべてのリソースの表示ができます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Cloudcraft で AWS と Live タブがハイライトされたライブ インフラストラクチャ ダイアグラム。" responsive="true" style="width:100%;">}}

Cloudcraft に AWS アカウントを 1 つだけ追加している場合は自動的に選択されます。複数追加している場合は、ドロップダウンからアカウントを選択します。

2. スキャンを実行するリージョンを選択します。複数のリージョンを 1 つのダイアグラムにまとめて取り込むことも可能ですが、まずは 1 つのリージョンから始めることを推奨します。

**Scan now** ボタンの下には **Live** と **Snapshot** のトグルがあり、作成するダイアグラムの種類を指定します。**Live** を選択すると、ダイアグラムはアカウントの情報で継続的に更新されます。**Snapshot** を選択すると、ある時点のイメージが作成され、ダイアグラムは自動更新されません。

本例では **Live** オプションを使用します。**Live** を有効にします。オプションの右側にある歯車アイコンでは、ダイアグラム更新の詳細設定を行えます。本ガイドでは既定のままにしておくことを推奨します。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="Cloudcraft のインタラクティブ インターフェイスで [Live] が有効になった状態を示すライブ リソース ダイアグラム。" responsive="true" style="width:100%;">}}

3. **Scan now** をクリックすると、アカウント内で[サポートされている AWS コンポーネント][3]のスキャンが始まります。スキャンが完了すると **Scan complete** メッセージが表示されます。

スキャン後は **Auto layout** ボタンと、AWS アカウントで検出されたすべての対応コンポーネントが表示されます。すぐに手動で追加することもできますが、アプリケーションに自動でレイアウトさせることを推奨します。

ダイアグラムを配置する方法は 2 つあります。

- **Auto layout** 機能を使用する
- **Filtered layout** 機能を使用する

**Auto layout** はもっともシンプルな方法で、すべてのコンポーネントをダイアグラムに追加し、相互の接続と関係を可視化します。たとえば **Auto layout** を設定して EC2 インスタンスのみを表示し、他のコンポーネントを除外することも可能です。

本ドキュメントのダイアグラム タイプは **Live** です。つまり、AWS アカウントから EC2 インスタンスを削除すると、その変更がダイアグラムにも反映されます。

**Filtered layout** は、クラウド アーキテクチャをダイアグラム化するための、パターンに一致するコンポーネントのみを追加できる、さらに高度で強力な方法です。たとえば `environment=production` と `environment=staging` のタグを持つリソースが多数ある場合でも、`environment=production` に完全一致するキーと値の組み合わせでタグ付けされたコンポーネントだけをダイアグラムに含めるようにフィルタリングできます。

クラウド プロバイダー側でタグ付けしていなくてもフィルタは有効です。たとえば、停止中の EC2 インスタンスのみでダイアグラムを作成したい場合は、`ec2 !running` とフィルタするだけです。

下記の動画は **Filtered layout** の強力さを紹介しています。AWS では営業チームが Cloudcraft のデモ用リソースに、キー `Environment`、値 `Demo` のタグを付けています。**Live** タブ直下の検索バーで `Environment=demo` と入力すると、表示したいコンポーネントとそれらの接続関係のみを確認できます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example-video.mp4" alt="Cloudcraft でフィルタリングされたダイアグラムを作成する様子を示す 11 秒の動画。" video="true">}}

`Environment=demo` が付いたコンポーネントは、対応する VPC、サブネット、セキュリティグループ内に表示されます (これらのリソース自体にはタグがない場合でも)。同じタグを持つ WAF は、AWS API から他のコンポーネントとのリンクが示されていないため、VPC の外側に配置されます。

コンポーネント間の接続方法はサービスによって異なります。Cloudcraft は利用可能なクラウド API を活用し、可能な限り関係性を自動的に検出します。

4. **Auto layout** の設定を続けるには、**Live/Snapshot** トグルの下にある **Auto layout** を選択します。

表示されるダイアログで、ダイアグラムに含める AWS コンポーネントを選択できます。さらに **Options** ドロップダウン メニューから、次の 3 つのいずれかを指定できます。

- 既存のコンポーネントを置き換える
- 既存のコンポーネントを含める
- 既存のコンポーネントをそのまま残す

これらのオプションは、すでにコンポーネントが配置されているダイアグラムで **Auto layout** を使用する場合に、アプリケーションがどのように動作するかを指定します。

- **Replace existing components** を選択すると、ダイアグラムにある既存コンポーネントはすべて置き換えられ、新しいコンポーネントに更新されます。
- **Include existing components** を選択すると、インベントリ内のすべてのコンポーネントとダイアグラム上の既存コンポーネントが対象になり、自動レイアウトが実行されます。
- **Leave existing components** を選択すると、ダイアグラム上の既存コンポーネントは変更されず、新しいコンポーネントだけが自動レイアウトされます。

新しいダイアグラムを作成しているので、メニューから **Replace existing components** を選択します。その後 **Layout** を選択すると、インベントリ内のすべてのコンポーネントとその接続がダイアグラムに自動で追加されます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="グリッド背景上に自動レイアウトされた AWS コンポーネントと接続を示す Cloudcraft のインタラクティブ ダイアグラム。" responsive="true" style="width:100%;">}}

このダイアグラムはカスタマイズ可能で、**Design** タブの要素を使用して外観を強化しながら、各コンポーネントに関するリアルタイム データを確認できます。

コンポーネントを選択すると、画面左下に **Live feed** ダイアログが表示され、選択したコンポーネントのライブ情報が確認できます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="EC2 インスタンスをハイライトし、インスタンスの詳細とステータスを表示する Live feed ダイアログが開いているクラウド インフラストラクチャ ダイアグラム。" responsive="true" style="width:100%;">}}

## 新しい Live エクスペリエンス

Cloudcraft は、クラウド インフラのダイアグラム作成プロセスをさらに効率化し、ユーザー エクスペリエンスを向上させるために、刷新された Live エクスペリエンスを導入しました。この新しいエクスペリエンスはすべてのユーザーが利用でき、新規ユーザーの標準エクスペリエンスとして設定されています。

詳細は[より良いダイアグラムの作成: Cloudcraft のライブ ダイアグラム作成とフィルタリング][4]を参照してください。

[1]: /ja/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /ja/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/
[3]: /ja/cloudcraft/faq/supported-aws-components/
[4]: /ja/cloudcraft/getting-started/crafting-better-diagrams/