---
further_reading:
- link: https://trust.datadoghq.com/
  tag: Datadog Trust Center
  text: Datadog のセキュリティ体制を確認し、セキュリティ ドキュメントを参照できます
title: PCI DSS 準拠
---

## 概要

Payment Card Industry (PCI) Data Security Standard (DSS) は、加盟店、サービス プロバイダ、金融機関のすべてに対して、厳格な監視とデータ セキュリティ要件を課しています。これらの要件を満たすため、多くの組織では、PCI の規制対象データ (例えばカード会員データ) と非規制データを、監視やコンプライアンスの目的に応じて別々のアプリケーションに分離します。

**Datadog のツールとポリシーは PCI v4.0 に準拠しています**。Datadog の環境の全体像と、関連する PCI-DSS コントロールにおける顧客責任との関係を把握するため、[Datadog Trust Center][1] から顧客責任マトリクス (Customer Responsibility Matrix) と準拠証明書 (AoC) をダウンロードしてください。

Datadog の準拠証明書 (AoC) は、サービス プロバイダとして Connected PCI 環境を維持するために整備しているツールとポリシーを示すものです。Datadog プラットフォームは、カード会員データ環境 (CDE) への接続を Connected PCI 環境としてサポートしますが、カード会員データ (CHD) を保存・処理・転送するための CDE そのものとしては機能しません。
CHD が Datadog プラットフォームに入り込まないようにする責任は、お客様にあります。

## PCI 準拠のための推奨ツール

PCI 準拠の維持を支援するため、**Datadog は次のツールとプロセスの利用を強く推奨します**。
- [**Sensitive Data Scanner**][2]: 機密性の高いカード会員データを検出・分類し、マスキングします 
- [**Audit Trail**][3]: 詳細な監査イベントを最大 90 日間検索・分析し、長期保管やアーカイブに活用します 
- [**File Integrity Monitoring**][4]: 重要なファイルやディレクトリの変更を監視します 
- [**Cloud Security Management**][5]: 業界ベンチマークやその他の統制の要件に対する適合状況を追跡します 

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://trust.datadoghq.com/?itemUid=53e1508c-665e-45a8-9ce0-03fdf9ae1efb&source=click
[2]: /ja/security/sensitive_data_scanner/
[3]: /ja/account_management/audit_trail/
[4]: /ja/security/workload_protection/
[5]: /ja/security/cloud_security_management/#track-your-organizations-health