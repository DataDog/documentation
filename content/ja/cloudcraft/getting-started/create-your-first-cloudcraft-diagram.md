---
title: 最初のライブ AWS ダイアグラムを作成する
---

Cloudcraft では、AWS クラウド環境を*ライブダイアグラム*としてインポートすることができます。AWS アカウント内のアーキテクチャをリバースエンジニアリングすることで、Cloudcraft は新しいダイアグラムを自動生成したり、既存のものを強化したりすることができ、数時間から数日分の作業を節約できます。

<div class="alert alert-info">もし Cloudcraft の新しい Live Experience を使用している場合は、こちらのドキュメントをご覧ください: <a href="https://docs.datadoghq.com/cloudcraft/getting-started/crafting-better-diagrams/" title="より良いダイアグラムの作成: Cloudcraft のライブダイアグラム作成とフィルタリング">より良いダイアグラムの作成: Cloudcraft のライブダイアグラム作成とフィルタリング</a>。</div>

## 前提条件

始める前に、Cloudcraft に AWS アカウントを接続する必要があります。詳細については、[Cloudcraft と AWS アカウントを接続する][1]をご覧ください。

## 最初のライブダイアグラム

クラウドアーキテクチャをインポートするには、まず新しいブループリントを作成する必要があります。ブループリントには、ダイアグラム、予算、そして個々のコンポーネントやダイアグラム自体に添付するすべてのドキュメントが含まれます。

Cloudcraft で、**Live** タブに移動します。ここでは、AWS アカウントの選択、AWS リージョンのスキャン、自動レイアウトの生成、AWS アカウント内のすべてのリソースの表示を行います。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-tab.png" alt="Live タブがハイライトされた Cloudcraft のライブ AWS インフラストラクチャーダイアグラム。" responsive="true" style="width:100%;">}}

Cloudcraft に 1 つの AWS アカウントだけを追加した場合、それが自動的に選択されます。そうでない場合は、ドロップダウンから希望のアカウントを選択してください。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-account.png" alt="矢印がドロップダウンメニューを指している、Cloudcraft インターフェイスでの AWS アカウントの選択を示すスクリーンショット。" responsive="true" style="width:75%;">}}

次に、スキャンしたいリージョンを選択します。複数のリージョンをスキャンして 1 つのダイアグラムに追加することもできますが、今は 1 つだけ選びます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/select-aws-region.png" alt="「Scan now」ボタンと、us-east-1 に設定された AWS リージョン選択ドロップダウンメニューを指す矢印。" responsive="true" style="width:75%;">}}

**Scan Now** ボタンの下に、**Live** または **Snapshot** と書かれたトグルがあります。これは、作成したいダイアグラムの種類をアプリケーションに指示します。**Live** を選択すると、ダイアグラムは AWS アカウントからの情報で継続的に更新されます。**Snapshot** を選択すると、ある時点のイメージが作成され、ダイアグラムは自動的に更新されなくなります。

この例では、**Live** オプションを使用します。**Live** のトグルを有効にします。オプションの右側にある歯車アイコンで、ダイアグラムの更新方法をさらにカスタマイズできますが、今は無視して構いません。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-diagram-options.png" alt="ライブ AWS リソースのダイアグラム作成のためにトグルが Live に設定されたインタラクティブな Cloudcraft インターフェイス。" responsive="true" style="width:100%;">}}

**Scan Now** をクリックして、アカウント内の[サポートされている AWS コンポーネント][2]をスキャンします。スキャンが完了すると、**Scan complete** のメッセージが表示されます。

スキャンが完了すると、**Auto Layout** ボタンと AWS アカウントからのすべてのサポートされているコンポーネントが表示されます。すぐに手動で追加を開始することもできますが、アプリケーションに自動的にレイアウトさせる方が良いでしょう。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/component-inventory.png" alt="Auto Layout ボタンとすべてのコンポーネントをハイライトした Cloudcraft のコンポーネントインベントリ。" responsive="true" style="width:50%;">}}

これを行う方法は 2 つあります。

- **Auto Layout** 機能を使用する。
- **Filtered Layout** 機能を使用する。

**Auto Layout** 機能は最も簡単な方法です。必要な AWS コンポーネントをすべてダイアグラムに追加し、それらの接続と関係を表示します。**Auto Layout** を使用して、EC2 インスタンスのみを含め、他のすべてを除外することができます。

この例のダイアグラムタイプは **Live** です。AWS アカウントから EC2 インスタンスの 1 つを削除すると、その変更はダイアグラムに反映されます。

**Filtered Layout** 機能は、より高度で強力な AWS アーキテクチャのダイアグラム作成方法です。つまり、パターンに一致するダイアグラムを作成できます。例えば、_environment=production_ および _environment=staging_ でタグ付けされた多数のリソースがあり、ダイアグラムに production のコンポーネントのみを追加したい場合、_environment=production_ で検索すると、その正確なキーと値の組み合わせでタグ付けされたコンポーネントのみが含まれます。

コンポーネントにタグを付けていなくても、フィルターの力を利用できます。例えば、停止している EC2 インスタンスのみのダイアグラムを作成するには、_ec2 !running_ フィルターを使用できます。

**Filtered Layout** の強力さを理解するために、VPN サーバーを例にしましょう。AWS で、VPN に関連するものすべてに、キー _service_ と値 _wirecraft_ でタグ付けします。VPN に関連するすべてのものと、各コンポーネントがどのように接続されているかを見るには、**Live** タブのすぐ下にある検索バーで、フィルター _service=wirecraft_ を使用できます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/filtered-layout-example.mp4" alt="Cloudcraft でフィルタリングされたダイアグラムを作成するユーザーを示す 16 秒のビデオ。" video="true">}}

_service=wirecraft_ でタグ付けされた EC2 インスタンスは、接続されている VPC とセキュリティグループの中に表示されます。EBS ボリュームとインターネットゲートウェイも同様です。

同じタグが付いていても、S3 バケットは VPC の外にあります。これは、AWS API がバケットと他のコンポーネント間の接続を示さないためです。

コンポーネントが互いにどのように接続されるかは、サービスに大きく依存します。Cloudcraft は可能な限りすべての利用可能な AWS API を使用して関係を発見しようとします。

次に、**Live/Snapshot** トグルの下で、**Auto Layout** をクリックします。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-button.png" alt="Auto Layout ボタンをハイライトした Cloudcraft のコンポーネントインベントリ。" responsive="true" style="width:100%;">}}

新しいモーダルが表示され、ダイアグラムに含める AWS コンポーネントを決定できます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/place-live-components.png" alt="EC2、Lambda、自動スケーリングのオプションを持つ Cloudcraft での AWS コンポーネントの選択。" responsive="true" style="width:100%;">}}

このモーダルには、**Options** ドロップダウンメニューも含まれており、3 つのオプションから選択できます。

- Replace existing components (既存のコンポーネントを置き換える)
- Include existing components (既存のコンポーネントを含める)
- Leave existing components (既存のコンポーネントをそのままにする)

これらのオプションは、既にコンポーネントがあるダイアグラムで **Auto Layout** を使用する場合、アプリケーションが何をするかを指示します。

- **Replace existing components** を選択すると、ダイアグラム内の既存のすべてが新しいコンポーネントに置き換えられます。
- **Include existing components** を選択すると、アプリケーションはインベントリ内のすべてのコンポーネントとダイアグラム上のすべてのコンポーネントに自動レイアウトを実行します。
- **Leave existing components** を選択すると、ダイアグラム内のコンポーネントは変更されず、アプリケーションは新しいコンポーネントに対して自動レイアウトを実行します。

新しいダイアグラムを作成しているので、ドロップダウンメニューから **Replace existing components** を選択し、**Layout** をクリックして、インベントリ内のすべてのコンポーネントとその接続を自動的にダイアグラムに追加します。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/auto-layout-diagram.png" alt="グリッド背景上に接続が表示されたコンポーネントの自動レイアウトを特徴とする、Cloudcraft で作成されたインタラクティブな AWS インフラストラクチャーダイアグラム。" responsive="true" style="width:100%;">}}

ダイアグラムは完全に編集可能なので、**Design** タブのアイテムを使用してダイアグラムの外観を改善し、各コンポーネントのリアルタイム情報を表示できます。

例えば EC2 インスタンスなどのコンポーネントをクリックすると、画面の左下隅に **Live Feed** モーダルが表示され、そのインスタンスに関する情報が表示されます。

{{< img src="cloudcraft/getting-started/create-your-first-cloudcraft-diagram/live-feed.png" alt="ハイライトされた EC2 インスタンスと、インスタンスの詳細とステータスを表示するライブフィード情報モーダルを備えたインタラクティブなクラウドインフラストラクチャーダイアグラム。" responsive="true" style="width:100%;">}}

[1]: /ja/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[2]: /ja/cloudcraft/faq/supported-aws-components/
[3]: https://app.cloudcraft.co/support