---
title: NDM プロファイルの構築
kind: ガイド
aliases:
  - /ja/network_performance_monitoring/devices/guide/build-ndm-profile
further_reading:
  - link: 'https://datadoghq.dev/integrations-core/tutorials/snmp/profile-format/'
    tag: Documentation
    text: プロファイル形式のリファレンス
  - link: 'https://datadoghq.dev/integrations-core/tutorials/snmp/sim-format/'
    tag: Documentation
    text: シミュレーションデータ形式のリファレンス
---
Datadog ネットワークデバイスモニタリングは、プロファイルを使用してネットワークデバイスからメトリクスを収集します。これらは MIB により狭義されており、特定のデバイスメーカーおよびモデルからメトリクスを収集します。このチュートリアルでは、HP iLO4 デバイスから OID メトリクスを収集する基本の NDM プロファイルを構築するためのステップをご説明します。

NDM プロファイルは SNMP コンセプトを使用します。SNMP の基本情報については、[用語][1]を参照してください。

<div class="alert alert-warning">
このガイドは上級ユーザー向けです。ほとんどのデバイスは <a href="/network_monitoring/devices/profiles#metric-definition-by-profile">Datadog プロファイル</a>を使用して構成することができます。
</div>

## 調査

NDM プロファイルを構築する最初のステップは、デバイスを調査して収集するメトリクスを決定することです。

### デバイス情報

メーカーのウェブサイトを確認するか、インターネットで以下の情報を検索します。

- デバイス名、メーカー、および[システムオブジェクト識別子][1]。

- デバイスとそのユースケースを把握します。ルーター、スイッチ、ブリッジなど、機器の種類によってメトリクスは異なります。たとえば、[HP iLO Wikipedia ページ][2]によると、iLO4 デバイスは組み込みサーバーのリモート管理を行う目的でシステム管理者により使用されます。

- デバイスの利用可能なバージョン、および対象のバージョン。たとえば、HP iLO デバイスは複数のバージョンで利用可能です。このチュートリアルでは HP iLO4 を取り上げてご説明しています。

- サポート対象の MIB (ASN1、テキスト形式)、OID、および関連する MIB ファイル。たとえば、HP は iLO デバイス向けのMIB パッケージを提供しています ([サイトはこちら][3])。**注**: メトリクスを収集するプロファイルでは MIB は不要です。

**注**: デバイスのユースケースに関する詳細は、[ネットワークハードウェア][4]を参照してください。

### メトリクスの選定

次に、収集するメトリクスを決定します。デバイスは通常数千のメトリクスと OID を公開しており、これは数十の MIB にまたがる場合もあります。

このプロセスで役立つガイドラインは次の通りです。

- メトリクスの数を 10 ～ 40 に維持する。
- 基本のプロファイルをチェックして、どれが対象のデバイスに適用可能かを確認する。
- メーカー固有の MIB ファイルを確認し、以下のようなメトリクスを検索する。
    - 一般的な健全性: ステータスゲージ
    - ネットワークトラフィック: バイト I/O、エラー I/O
    - CPU およびメモリ使用量
    - 温度: 温度センサー、熱的条件
    - 電源供給: オン/オフまたはブランチ合計

## 実装

### プロファイルの追加

まず、`sysobjectid` およびメトリクスで `.yaml` ファイルを作成してプロファイルを追加します。例:

```yaml
sysobjectid: 1.3.6.1.4.1.232.9.4.10

metrics:
  - MIB: CPQHLTH-MIB
    symbol:
      OID: 1.3.6.1.4.1.232.6.2.8.1.0
      name: cpqHeSysUtilLifeTime
```

**注**: `sysobjectid` を、デバイスのサブツリーに一致するワイルドカードパターンとすることもできます。例: `1.3.6.1.131.12.4.*`

## プロファイルのテスト

次に、対象のプロファイルを使用するデバイスのIP アドレスをターゲティングし、プロファイルをテストします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/network_monitoring/devices/troubleshooting#terminology
[2]: https://en.wikipedia.org/wiki/HP_Integrated_Lights-Out
[3]: https://support.hpe.com/hpsc/swd/public/detail?swItemId=MTX_53293d026fb147958b223069b6
[4]: https://en.wikipedia.org/wiki/Networking_hardware