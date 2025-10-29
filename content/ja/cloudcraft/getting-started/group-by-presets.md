---
title: Group By と Presets
---

Cloudcraft の **Group By** と **Presets** 機能は、インフラストラクチャー、ネットワーク、セキュリティなどのユース ケースに合わせて、カスタムで洞察に富むダイアグラムを作成できるようにします。これらのツールはクラウド アーキテクチャの可視化を効率化し、リソースの分析と管理を容易にします。

トラブルシューティング、セキュリティ監査、ネットワーク パフォーマンスの評価など、さまざまな場面で、これらの機能は正確で焦点を絞ったダイアグラムを簡単に生成できるようにし、ワークフローの効率を高めます。

## Group By

**Group By** を使うと、Cloudcraft はダイアグラムをグループ タイプごとの明確なセクションに分割します。この機能により、リソースをわかりやすく整理されたビューで表示でき、複雑なクラウド環境の可視化に特に有用です。

### AWS のグルーピング オプション

AWS では、次の単位でリソースをグループ化できます:
- Region
- VPC
- Security Group
- Subnet
- Network ACL

### Azure のグルーピング オプション

Azure では、次の単位でリソースをグループ化できます:
- Resource Group
- Region
- VNet
- Subnet

## Presets

**Presets** は、事前定義された group-by とフィルターのセットを適用する便利な方法を提供し、さまざまな視点からリソースをすばやく確認できます。この機能により、ダイアグラムへのグルーピングやフィルターの適用作業が簡素化され、アーキテクチャの特定の側面に集中できます。

**Cloudcraft は 3 つの組み込み preset を提供しています:** Infrastructure、Network、Security。これらの preset は、異なる運用上のニーズに対応するよう設計されています。

{{< img src="cloudcraft/getting-started/group-by-presets/diagram-presets.png" alt="Infrastructure ダイアグラム プリセットが選択された状態の Cloudcraft インターフェイスで、プリセット オプションを示しています。" responsive="true" style="width:100%;">}}

preset をダイアグラムに適用するには:

1. Cloudcraft 内の **Live** タブに切り替えます。
2. ダイアグラム ビュー上部のメニューから目的の preset を選択します。
3. 選択した preset を反映してダイアグラムが自動で更新されます。

### Infrastructure ダイアグラム

{{< img src="cloudcraft/getting-started/group-by-presets/infrastructure-diagram.png" alt="サーバー、データベース、セキュリティ コンポーネントとそれらの関係を示す Infrastructure ダイアグラム。" responsive="true" style="width:100%;">}}

Infrastructure preset は概観を広く提供し、AWS では Region と VPC、Azure では Region と VNet でリソースをグループ化します。トラブルシューティングやハイレベルなレビュー向けに、アーキテクチャ ダイアグラムをすばやく生成するのに最適です。

- AWS では、EBS、NAT Gateway、Transit Gateway などのコンポーネントを除外して重要な部分だけを示し、ダイアグラムの煩雑さを抑えます。
- Azure では、Azure VNGW や Azure Disk などのコンポーネントは表示されません。

### Security ダイアグラム

{{< img src="cloudcraft/getting-started/group-by-presets/security-diagram.png" alt="サーバー、データベース、セキュリティ コンポーネントとそれらの関係を示す Security ダイアグラム。" responsive="true" style="width:100%;">}}

Security preset は潜在的なセキュリティ リスクに焦点を当て、AWS では Region、VPC、Security Group 単位でリソースをグループ化します。このビューは、受信および送信のサービス通信を制御するルールの把握や、ペネトレーション テストやセキュリティ監査時の攻撃面のマッピングに最適です。

- この preset は現在、Azure 構成をサポートしていません。
- AWS では Infrastructure と同様に、EBS、NAT Gateway など、セキュリティ ビューを煩雑にしかねないコンポーネントを除外します。さらに、複数の Subnet に属している場合、コンポーネントが複数回表示されることがあります。

### Network ダイアグラム

{{< img src="cloudcraft/getting-started/group-by-presets/network-diagram.png" alt="サーバー、データベース、セキュリティ コンポーネントとそれらの関係を示す Network ダイアグラム。" responsive="true" style="width:100%;">}}

Network preset は Subnet でのグループ化を導入して粒度を高め、レイテンシの原因やトラフィック パターンの特定を目指すネットワーク チームに特に有用です。

- AWS では、EBS、S3、SNS などのコンポーネントを除外します。
- Azure では、Azure Disk および Network Security Group コンポーネントを除外します。

## Custom Presets

特定のユース ケースに合わせたビューが必要な場合、Cloudcraft ではグループ化やフィルターをカスタマイズして、パーソナライズした preset を作成できます。

1. 要件に合わせてフィルターと group-by 設定を調整します。
2. **Save as preset** ボタンをクリックして、カスタム構成を新しい preset として保存します。

保存後は、blueprint にアクセスできるユーザーであれば誰でもこれらのカスタム preset を再利用できます。