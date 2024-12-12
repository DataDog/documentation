---
disable_toc: false
further_reading:
- link: /security/cloud_siem/log_detection_rules
  tag: ドキュメント
  text: ログ検出ルールを作成する
- link: security/cloud_siem/investigator
  tag: ドキュメント
  text: Investigator について
- link: /security/cloud_siem/investigate_security_signals
  tag: ドキュメント
  text: セキュリティシグナルを調査する
- link: https://www.datadoghq.com/blog/cloud-siem-content-packs-whats-new-2024-09/
  tag: ブログ
  text: 'Cloud SIEM コンテンツパックの新機能: 2024 年 9 月'
title: コンテンツパック
---

## 概要

[Cloud SIEM コンテンツパック][1]は、主要なセキュリティインテグレーションのためのすぐに使えるコンテンツを提供します。インテグレーションによっては、コンテンツパックには以下が含まれることがあります。

- [検出ルール][2]: 環境を包括的にカバーします
- コンテンツパックのログとセキュリティシグナルの状態に関する詳細な洞察を提供するインタラクティブなダッシュボード
- [Investigator][3]: ユーザーやリソースによる疑わしいアクティビティを調査するためのインタラクティブなグラフィカルインターフェイス
- [Workflow Automation][4]: アクションを自動化し、問題の調査と修正を加速します
- 構成ガイド

{{< whatsnext desc="コンテンツパックは以下のカテゴリーに分類されています。" >}} 
{{< nextlink href="/security/cloud_siem/content_packs#cloud-audit-content-packs" >}}<u>クラウド監査</u>: AWS CloudTrail、Azure Security、GCP Audit Logs、Kubernetes Audit Logs{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#authentication-content-packs" >}}<u>認証</u>: 1Password、Auth0、Cisco DUO、JumpCloud、Okta{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#collaboration-content-packs" >}}<u>コラボレーション</u>: Google Workspace、Microsoft 365、Slack Audit Logs{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#network-content-packs" >}}<u>ネットワーク</u>: Cloudflare、Cisco Meraki、Cisco Umbrella、Palo Alto Networks Firewall{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#web-security-content-packs" >}}<u>Web セキュリティ</u>: NGINX{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#cloud-developer-tools-content-packs" >}}<u>クラウド開発者ツール</u>: GitHub{{< /nextlink >}} 
{{< nextlink href="/security/cloud_siem/content_packs#endpoint-content-packs" >}}<u>エンドポイント</u>: CrowdStrike{{< /nextlink >}} 
{{< /whatsnext >}}

## クラウド監査コンテンツパック

### AWS CloudTrail

AWS オペレーションのセキュリティとコンプライアンスレベルを監視します。

[AWS CloudTrail コンテンツパック][5]には以下が含まれます。
- [検出ルール][6]
- インタラクティブなダッシュボード
- AWS Investigator
- Workflow Automation
- [構成ガイド][43]

### Azure Security

攻撃者のアクティビティを追跡して Azure 環境を保護します。

[Azure Security コンテンツパック][7]には以下が含まれます。
- [検出ルール][8]
- インタラクティブなダッシュボード
- Azure Investigator
- [構成ガイド][44]

### GCP 監査ログ

監査ログを監視して GCP 環境を保護します。

[GCP 監査ログ コンテンツパック][9]には以下が含まれます。
- [検出ルール][10]
- インタラクティブなダッシュボード
- GCP Investigator
- [構成ガイド][45]

### Kubernetes 監査ログ
Kubernetes コントロールプレーンの監査ログを監視してカバレッジを拡大します。

[Kubernetes 監査ログコンテンツパック][11]には以下が含まれます。
- [検出ルール][12]
- インタラクティブなダッシュボード

## 認証コンテンツパック

### 1Password

1Password イベントレポートでアカウントアクティビティを監視します。

[1Password コンテンツパック][13]には以下が含まれます。
- [検出ルール][14]
- インタラクティブなダッシュボード

### Auth0

Auth0 のユーザーアクティビティを監視し、シグナルを生成します。

[Auth0 コンテンツパック][15]には以下が含まれます。
- [検出ルール][16]
- インタラクティブなダッシュボード

### Cisco DUO

Cisco DUO からの MFA とセキュアアクセスログを監視・分析します。

[Cisco DUO コンテンツパック][31]には以下が含まれます。
- [検出ルール][32]
- インタラクティブなダッシュボード

### JumpCloud

JumpCloud の監査ログを監視してユーザーアクティビティを追跡します。

[JumpCloud コンテンツパック][17]には以下が含まれます。
- [検出ルール][18]

### Okta

Okta の監査ログを監視してユーザーアクティビティを追跡します。

[Okta コンテンツパック][19]には以下が含まれます。
- [検出ルール][20]
- インタラクティブなダッシュボード
- Workflow Automation

## コラボレーションコンテンツパック

### Google Workspace

Google Workspace 内のセキュリティ監視を最適化します。

[Google Workspace コンテンツパック][21]には以下が含まれます。
- [検出ルール][22]
- インタラクティブなダッシュボード

### Microsoft 365

Microsoft 365 のログから主要なセキュリティイベントを監視します。

[Microsoft 365 コンテンツパック][23]には以下が含まれます。
- [検出ルール][24]
- インタラクティブなダッシュボード

### Slack 監査ログ

Slack の監査ログを表示、分析、監視します。

[Slack コンテンツパック][33]には以下が含まれます。
- [検出ルール][34]
- インタラクティブなダッシュボード

## ネットワークコンテンツパック

### Cloudflare

Web アプリケーションのセキュリティを強化します。

[Cloudflare コンテンツパック][25]には以下が含まれます。
- [検出ルール][26]
- インタラクティブなダッシュボード
- Workflow Automation

### Cisco Meraki

Cisco Meraki のログを監視し、攻撃者のアクティビティを特定します。

[Cisco Meraki コンテンツパック][35]には以下が含まれます。
- [検出ルール][36]
- インタラクティブなダッシュボード

### Palo Alto Networks Firewall

Palo Alto Networks Firewall でトラフィックを分析し、脅威を検出します。

[Palo Alto Networks Firewall コンテンツパック][37]には以下が含まれます。
- [検出ルール][38]
- インタラクティブなダッシュボード

### Cisco Umbrella

Cisco Umbrella からログを収集・監視し、DNS およびプロキシログに関する洞察を得ます。

[Cisco Umbrella コンテンツパック][39]には以下が含まれます。
- [検出ルール][40]
- インタラクティブなダッシュボード

## Web セキュリティコンテンツパック

### NGINX

NGINX を使用して Web ベースのリスクを監視し、対応します。

[NGINX コンテンツパック][41]には以下が含まれます。
- [検出ルール][42]
- インタラクティブなダッシュボード

## クラウド開発者ツールコンテンツパック

### GitHub

GitHub の監査ログを監視して、ユーザーアクティビティとコード変更履歴を追跡します。

[GitHub コンテンツパック][27]には以下が含まれます。
- [検出ルール][28]
- インタラクティブなダッシュボード

## エンドポイントコンテンツパック

### CrowdStrike

CrowdStrike でエンドポイントのセキュリティポスチャを改善します。

[CrowdStrike コンテンツパック][29]には以下が含まれます。
- [検出ルール][30]
- インタラクティブなダッシュボード

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/content-packs
[2]: /ja/security/detection_rules/
[3]: /ja/security/cloud_siem/investigator
[4]: /ja/service_management/workflows/
[5]: https://app.datadoghq.com/security/content-packs/aws-cloudtrail
[6]: /ja/security/default_rules/#cloudtrail
[7]: https://app.datadoghq.com/security/content-packs/azure
[8]: /ja/security/default_rules/#azuresecurity
[9]: https://app.datadoghq.com/security/content-packs/gcp-audit-logs
[10]: /ja/security/default_rules/#gcp
[11]: https://app.datadoghq.com/security/content-packs/kubernetes-audit-logs
[12]: /ja/security/default_rules/#kubernetes
[13]: https://app.datadoghq.com/security/content-packs/1password
[14]: /ja/security/default_rules/#1password
[15]: https://app.datadoghq.com/security/content-packs/auth0
[16]: /ja/security/default_rules/#auth0
[17]: https://app.datadoghq.com/security/content-packs/jumpcloud
[18]: /ja/security/default_rules/#jumpcloud
[19]: https://app.datadoghq.com/security/content-packs/okta
[20]: /ja/security/default_rules/#okta
[21]: https://app.datadoghq.com/security/content-packs/google-workspace
[22]: /ja/security/default_rules/#gsuite
[23]: https://app.datadoghq.com/security/content-packs/microsoft-365
[24]: /ja/security/default_rules/#microsoft-365
[25]: https://app.datadoghq.com/security/content-packs/cloudflare
[26]: /ja/security/default_rules/#cloudflare
[27]: https://app.datadoghq.com/security/content-packs/github
[28]: /ja/security/default_rules/#github-telemetry
[29]: https://app.datadoghq.com/security/content-packs/crowdstrike
[30]: /ja/security/default_rules/#crowdstrike
[31]: https://app.datadoghq.com/security/content-packs/cisco-duo
[32]: /ja/security/default_rules/#cisco-duo
[33]: https://app.datadoghq.com/security/content-packs/slack
[34]: /ja/security/default_rules/#slack
[35]: https://app.datadoghq.com/security/content-packs/meraki
[36]: /ja/security/default_rules/#meraki
[37]: https://app.datadoghq.com/security/content-packs/pan-firewall
[38]: /ja/security/default_rules/#panfirewall
[39]: https://app.datadoghq.com/security/content-packs/cisco-umbrella-dns
[40]: /ja/security/default_rules/#cisco-umbrella-dns
[41]: https://app.datadoghq.com/security/content-packs/nginx
[42]: /ja/security/default_rules/#nginx
[43]: https://docs.datadoghq.com/ja/security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[44]: https://docs.datadoghq.com/ja/security/cloud_siem/guide/azure-config-guide-for-cloud-siem
[45]: https://docs.datadoghq.com/ja/security/cloud_siem/guide/google-cloud-config-guide-for-cloud-siem/