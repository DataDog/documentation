---
description: ソース別および宛先別に、Observability Pipelines パックを確認します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/rehydrate-archived-logs-with-observability-pipelines
  tag: ブログ
  text: Observability Pipelines を使用して、任意の SIEM またはログベンダーでアーカイブされたログをリハイドレートします。
multifiltersearch:
  data:
  - description: このパックは、報告されたメッセージ全体にわたって、悪意のある abuse-mailbox キャンペーンおよび失敗した修復試行にフラグを立てます。
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Campaigns](/observability_pipelines/packs/abnormal_ai_abuse_campaigns/)'
    source: Abnormal.ai
  - description: このパックは、ユーザーから報告された不正メールボックスメッセージのうち、Abnormal.ai が分析しなかったもののバックログを追跡します。
    destination: Any destination
    pack: '[Abnormal.ai - Abuse Mailbox Messages Not Analyzed](/observability_pipelines/packs/abnormal_ai_abuse_mailbox_messages/)'
    source: Abnormal.ai
  - description: このパックは、Abnormal.ai ポータルの監査証跡から、失敗した管理者アクションと大量修復イベントにフラグを立てます。
    destination: Any destination
    pack: '[Abnormal.ai - Audit Logs](/observability_pipelines/packs/abnormal_ai_audit_logs/)'
    source: Abnormal.ai
  - description: このパックは、VIP を標的としたビジネスメール詐欺 (BEC)、恐喝、認証情報フィッシングなど、未修復かつ高リスクのメール脅威にフラグを立てます。
    destination: Any destination
    pack: '[Abnormal.ai - Threats](/observability_pipelines/packs/abnormal_ai_threats/)'
    source: Abnormal.ai
  - description: このパックは、Kerberos 認証、ディレクトリサービスの変更、DCSync レプリケーションの悪用を含む、Active Directory
      Domain Services イベントを処理します。
    destination: Any destination
    pack: '[Active Directory](/observability_pipelines/packs/active_directory/)'
    source: Active Directory
  - description: Akamai ログに、エッジにおけるクライアントのリクエストと応答が示されます。
    destination: Any destination
    pack: '[Akamai CDN](/observability_pipelines/packs/akamai_cdn/)'
    source: Akamai
  - description: AlphaSOC の検出結果では、ネットワーク全体で検出された DNS および IP の脅威にフラグが立てられます。
    destination: Any destination
    pack: '[AlphaSOC Findings](/observability_pipelines/packs/alphasoc_findings/)'
    source: AlphaSOC
  - description: AWS CloudFront のログには、リクエスト、キャッシュの使用状況、およびエッジのアクティビティが示されます。
    destination: Any destination
    pack: '[Amazon CloudFront](/observability_pipelines/packs/amazon_cloudfront/)'
    source: AWS
  - description: このパックは、Amazon Connect のログから連絡先とエージェントシグナルを抽出し、放棄された通話や不正リスクにフラグを立てます。
    destination: Any destination
    pack: '[Amazon Connect](/observability_pipelines/packs/amazon_connect/)'
    source: AWS
  - description: Amazon VPC Flow のログは、VPC リソース相互間のネットワークトラフィックをキャプチャします。
    destination: Any destination
    pack: '[Amazon VPC Flow Logs](/observability_pipelines/packs/amazon_vpc_flow_logs/)'
    source: AWS
  - description: このパックは、アプリケーションコントローラーおよび API サーバーからの Argo CD 同期、ヘルス、RBAC のイベントを処理します。
    destination: Any destination
    pack: '[Argo CD](/observability_pipelines/packs/argo_cd/)'
    source: Argo CD
  - description: Auth0 ログは、ログイン、サインアップ、MFA、および API アクティビティをカバーします。
    destination: Any destination
    pack: '[Auth0](/observability_pipelines/packs/auth0/)'
    source: Auth0
  - description: Aviatrix Controller 監査ログは、API コマンド、ユーザー属性、および結果をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix Controller API Audit](/observability_pipelines/packs/aviatrix_controller_api_audit/)'
    source: Aviatrix
  - description: Aviatrix FQDN Firewall のログは、外向きドメインリクエストとポリシーの適用をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix FQDN Firewall](/observability_pipelines/packs/aviatrix_fqdn_firewall/)'
    source: Aviatrix
  - description: Aviatrix ゲートウェイのネット統計ログは、インターフェースごとの受信/送信バイト数、パケット数、およびネットワークドロップイベントを明らかにします。
    destination: Any destination
    pack: '[Aviatrix Gateway Network Stats](/observability_pipelines/packs/aviatrix_gateway_network_stats/)'
    source: Aviatrix
  - description: Aviatrix Gateway System Stats は、さまざまなクラウドゲートウェイを通じた各ゲートウェイの CPU、メモリ、およびディスクの利用率を算出します。
    destination: Any destination
    pack: '[Aviatrix Gateway System Stats](/observability_pipelines/packs/aviatrix_gateway_system_stats/)'
    source: Aviatrix
  - description: Aviatrix DCF マイクロセグメンテーションログは、クラウドゲートウェイ相互間の東西方向のポリシー適用をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix L4 Microsegmentation](/observability_pipelines/packs/aviatrix_l4_microsegmentation/)'
    source: Aviatrix
  - description: Aviatrix L7/TLS 検査ログは、TLS セッションコンテキストとポリシー適用をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix L7/TLS Inspection](/observability_pipelines/packs/aviatrix_l7_tls_inspection/)'
    source: Aviatrix
  - description: Aviatrix Suricata IDS/IPS アラートは、ゲートウェイネットワークトラフィックのシグネチャヒットをキャプチャします。
    destination: Any destination
    pack: '[Aviatrix Suricata IDS/IPS](/observability_pipelines/packs/aviatrix_suricata_ids_ips/)'
    source: Aviatrix
  - description: Aviatrix トンネルステータスログは、Site2Cloud およびトランジットリンクの状態変更、イベント、および障害原因をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix Tunnel Status](/observability_pipelines/packs/aviatrix_tunnel_status/)'
    source: Aviatrix
  - description: Aviatrix VPN ゲートウェイログは、ユーザーごとのセッションライフサイクル、認証イベント、およびゲートウェイのトラフィック量をキャプチャします。
    destination: Any destination
    pack: '[Aviatrix VPN Session](/observability_pipelines/packs/aviatrix_vpn_session/)'
    source: Aviatrix
  - description: AWS ALB は、それらを経由してルーティングされる HTTP リクエストアクティビティをキャプチャします。
    destination: Any destination
    pack: '[AWS Application Load Balancer Logs](/observability_pipelines/packs/aws_alb/)'
    source: AWS
  - description: AWS CloudTrail は、AWS サービス全体にわたる API 呼び出しとアカウントアクティビティを記録します。
    destination: Any destination
    pack: '[AWS CloudTrail](/observability_pipelines/packs/aws_cloudtrail/)'
    source: AWS
  - description: AWS CloudWatch のログは、Lambda、ECS などからのログストリームをキャプチャします。
    destination: Any destination
    pack: '[AWS CloudWatch Logs](/observability_pipelines/packs/aws_cloudwatch_logs/)'
    source: AWS
  - description: AWS Config は、リソース構成の変更をモニターおよび記録します。
    destination: Any destination
    pack: '[AWS Config](/observability_pipelines/packs/aws_config/)'
    source: AWS
  - description: AWS ELB は、Classic Load Balancer からの HTTP リクエストと HTTPS リクエストをキャプチャします。
    destination: Any destination
    pack: '[AWS Elastic Load Balancer Logs](/observability_pipelines/packs/aws_elb/)'
    source: AWS
  - description: AWS GuardDuty は、AWS アカウント内の脅威を検出します。
    destination: Any destination
    pack: '[AWS GuardDuty](/observability_pipelines/packs/aws_guardduty/)'
    source: AWS
  - description: AWS Lambda ログは、呼び出し、エラー、およびコールドスタートをキャプチャします。
    destination: Any destination
    pack: '[AWS Lambda](/observability_pipelines/packs/aws_lambda/)'
    source: AWS
  - description: AWS NLB は、接続アクティビティとパフォーマンスデータをキャプチャします。
    destination: Any destination
    pack: '[AWS Network Load Balancer Logs](/observability_pipelines/packs/aws_nlb/)'
    source: AWS
  - description: AWS Route 53 は、AWS インフラストラクチャー全体にわたって DNS クエリをキャプチャします。
    destination: Any destination
    pack: '[AWS Route 53](/observability_pipelines/packs/aws_route_53/)'
    source: AWS
  - description: AWS Security Hub は、AWS 全体にわたってセキュリティ検索結果を集約します。
    destination: Any destination
    pack: '[AWS Security Hub](/observability_pipelines/packs/aws_security_hub/)'
    source: AWS
  - description: AWS WAF は、CloudWatch、S3、または Firehose からの AWS WAF ログをキャプチャします。
    destination: Any destination
    pack: '[AWS WAF](/observability_pipelines/packs/aws_waf/)'
    source: AWS
  - description: Azure Network Security Group v2 フローログは、接続ごとの決定とバイト数を記録します。
    destination: Any destination
    pack: '[Azure NSG](/observability_pipelines/packs/azure_nsg/)'
    source: Azure
  - description: BlueCat BDDS syslog は、DNS クエリと DHCP リースをキャプチャします。
    destination: Any destination
    pack: '[BlueCat DNS](/observability_pipelines/packs/bluecat_dns/)'
    source: BlueCat
  - description: このパックは、syslog プレフィックスの有無にかかわらず、CEF 形式の Check Point ログを処理します。
    destination: Any destination
    pack: '[Check Point](/observability_pipelines/packs/checkpoint/)'
    source: Check Point
  - description: Cisco ACI syslog イベントは、ファブリックの健全性、エンドポイントの移動、および管理アクティビティをキャプチャします。
    destination: Any destination
    pack: '[Cisco ACI](/observability_pipelines/packs/cisco_aci/)'
    source: Cisco
  - description: Cisco ASA ファイアウォールログは、トラフィック、VPN、およびセキュリティアラートに関する syslog イベントをキャプチャします。
    destination: Any destination
    pack: '[Cisco ASA](/observability_pipelines/packs/cisco_asa/)'
    source: Cisco
  - description: このパックは、Cisco ASA syslog イベントを、Google Security Operations の UDM スキーマにマッピングします。
    destination: Google SecOps
    pack: '[Cisco ASA - Google SecOps](/observability_pipelines/packs/cisco_asa_google_secops/)'
    source: Cisco
  - description: このパックは、パース済み Cisco ASA syslog イベントを、Microsoft Sentinel の CommonSecurityLog
      スキーマにマッピングします。
    destination: Microsoft Sentinel
    pack: '[Cisco ASA - Microsoft Sentinel](/observability_pipelines/packs/cisco_asa_microsoft_sentinel/)'
    source: Cisco
  - description: Cisco FTD syslog イベントは、アクセス制御、侵入防止、ファイル検出、および VPN をカバーします。
    destination: Any destination
    pack: '[Cisco FTD](/observability_pipelines/packs/cisco_ftd/)'
    source: Cisco
  - description: Cisco IOS syslog は、セキュリティ、認証、およびルーティングのイベントをキャプチャします。
    destination: Any destination
    pack: '[Cisco IOS](/observability_pipelines/packs/cisco_ios/)'
    source: Cisco
  - description: Cisco IOS Traceback のイベントは、ソフトウェアの障害、メモリの障害、CPU の問題を示します。
    destination: Any destination
    pack: '[Cisco IOS Traceback](/observability_pipelines/packs/cisco_ios_traceback/)'
    source: Cisco
  - description: Cisco Meraki は、アプライアンスイベント、フロー、VPN ファイアウォール、NAT フロー、および URL アクティビティをキャプチャします。
    destination: Any destination
    pack: '[Cisco Meraki](/observability_pipelines/packs/cisco_meraki/)'
    source: Cisco
  - description: このパックは、パース済み Cisco Meraki syslog イベントを、Microsoft Sentinel の Syslog
      テーブルにマッピングします。
    destination: Microsoft Sentinel
    pack: '[Cisco Meraki - Microsoft Sentinel](/observability_pipelines/packs/cisco_meraki_microsoft_sentinel/)'
    source: Cisco
  - description: Cloudflare ログは、エッジのトラフィック、パフォーマンス、およびセキュリティを示します。
    destination: Any destination
    pack: '[Cloudflare](/observability_pipelines/packs/cloudflare/)'
    source: Cloudflare
  - description: Falcon Data Replicator (FDR) は、エンドポイントの検出と応答を提供します。
    destination: Any destination
    pack: '[CrowdStrike FDR](/observability_pipelines/packs/crowdstrike/)'
    source: CrowdStrike
  - description: ベンダーに依存しないこの DNS クエリ/応答ストリームには、トンネリングおよび DGA ビーコンのインジケーターが含まれています。
    destination: Any destination
    pack: '[DNS Stream](/observability_pipelines/packs/dns_stream/)'
    source: DNS Stream
  - description: このパックは、Exabeam に送信される Cisco ASA ファイアウォールログを処理し、ASA コードでフィルタリングして、アクション不要な
      syslog ノイズを除去します。
    destination: Exabeam
    pack: '[Exabeam - Cisco ASA](/observability_pipelines/packs/exabeam_cisco_asa/)'
    source: Cisco
  - description: このパックは、Exabeam に送信される CrowdStrike Falcon Data Replicator イベントを処理し、センサーとテレメトリのノイズを除去します。
    destination: Exabeam
    pack: '[Exabeam - CrowdStrike FDR](/observability_pipelines/packs/exabeam_crowdstrike_fdr/)'
    source: CrowdStrike
  - description: このパックは、Exabeam に送信される FortiGat eファイアウォールログを処理し、日常的なトラフィックとヘルスチェックのノイズをフィルタリングして除外します。
    destination: Exabeam
    pack: '[Exabeam - Fortinet FortiGate](/observability_pipelines/packs/exabeam_fortinet_fortigate/)'
    source: Fortinet
  - description: このパックは、Exabeam に送信される PAN-OS syslog を処理し、生の CSV に変更を加えることなく、空のトラフィックログや重複して開始されたトラフィックログをフィルタリングして除外します。
    destination: Exabeam
    pack: '[Exabeam - Palo Alto](/observability_pipelines/packs/exabeam_palo_alto/)'
    source: Palo Alto
  - description: このパックは、Exabeam に送信される SentinelOne EDR イベントを処理し、大量イベントタイプをサンプリングして、取り込みコストを削減します。
    destination: Exabeam
    pack: '[Exabeam - SentinelOne Cloud Funnel](/observability_pipelines/packs/exabeam_sentinelone_cloud_funnel/)'
    source: SentinelOne
  - description: このパックは、Exabeam に送信される Windows イベントログを処理し、フィルタリングして Exabeam パーサーが使用するコードにしつつ、生の
      XML はパースできるようにそのまま保持します。
    destination: Exabeam
    pack: '[Exabeam - Windows](/observability_pipelines/packs/exabeam_windows/)'
    source: Windows
  - description: このパックは、Exabeam に送信される Zscaler ZIA Web、ZIA DNS、および ZPA のログを処理し、日常的なトラフィックをフィルタリングおよびサンプリングします。
    destination: Exabeam
    pack: '[Exabeam - Zscaler](/observability_pipelines/packs/exabeam_zscaler/)'
    source: Zscaler
  - description: ExtraHop Reveal(x) の検出機能は、ネットワークの脅威と行動の異常を明らかにします。
    destination: Any destination
    pack: '[ExtraHop](/observability_pipelines/packs/extrahop/)'
    source: ExtraHop
  - description: このパックは、ExtraHop Reveal(x) のネットワーク検出に重大度と IP をタグ付けして、Microsoft Sentinel
      に取り込めるようにします。
    destination: Microsoft Sentinel
    pack: '[ExtraHop - Microsoft Sentinel](/observability_pipelines/packs/extrahop_microsoft_sentinel/)'
    source: ExtraHop
  - description: F5 ログは、トラフィック、セキュリティポリシー、および侵入イベントをキャプチャします。
    destination: Any destination
    pack: '[F5](/observability_pipelines/packs/f5/)'
    source: F5
  - description: Fastly CDN ログは、クライアントリクエスト、キャッシュ状態、および配信パフォーマンスを記録します。
    destination: Any destination
    pack: '[Fastly](/observability_pipelines/packs/fastly/)'
    source: Fastly
  - description: このパックは、FortiGate のログを、Microsoft Sentinel の CommonSecurityLog スキーマにマッピングします。
    destination: Microsoft Sentinel
    pack: '[Fortinet - Microsoft Sentinel](/observability_pipelines/packs/fortinet_microsoft_sentinel/)'
    source: Fortinet
  - description: Fortinet ファイアウォールログは、許可されたトラフィック、拒否されたトラフィック、およびその他のネットワークトラフィックを記録します。
    destination: Any destination
    pack: '[Fortinet Firewall](/observability_pipelines/packs/fortinet_firewall/)'
    source: Fortinet
  - description: GCP VPC ファイアウォールログは、許可されたトラフィックと拒否されたトラフィックを記録します。
    destination: Any destination
    pack: '[GCP Firewall](/observability_pipelines/packs/gcp_firewall/)'
    source: Google Cloud
  - description: Google Cloud 監査ログは、管理者のアクティビティとポリシー違反をキャプチャします。
    destination: Any destination
    pack: '[Google Cloud Audit](/observability_pipelines/packs/google_cloud_audit/)'
    source: Google Cloud
  - description: このパックは、AWS VPC フローのレコードを、Google Security Operations の UDM スキーマにマッピングします。
    destination: Google SecOps
    pack: '[Google SecOps - AWS VPC](/observability_pipelines/packs/google_secops_aws_vpc/)'
    source: AWS
  - description: このパックは、Fortinet ファイアウォールログを、Google Security Operations の UDM スキーマにマッピングします。
    destination: Google SecOps
    pack: '[Google SecOps - Fortinet Firewall](/observability_pipelines/packs/google_secops_fortinet_firewall/)'
    source: Fortinet
  - description: このパックは、PAN-OS のログを、Google Security Operations の UDM スキーマにマッピングしなおします。
    destination: Google SecOps
    pack: '[Google SecOps - Palo Alto Firewall](/observability_pipelines/packs/google_secops_palo_alto_firewall/)'
    source: Palo Alto
  - description: このパックは、Windows セキュリティイベントを、Google Security Operations の UDM スキーマにマッピングします。
    destination: Google SecOps
    pack: '[Google SecOps - Windows Event Log](/observability_pipelines/packs/google_secops_windows_event_log/)'
    source: Windows
  - description: HAProxy Ingress ログは、Kubernetes のイングレストラフィックのルーティングと処理について記録します。
    destination: Any destination
    pack: '[HAProxy Ingress](/observability_pipelines/packs/haproxy_ingress/)'
    source: HAProxy
  - description: Infoblox NIOS syslog は、アプライアンスからの DNS、DHCP、監査、および CEF アクティビティをキャプチャします。
    destination: Any destination
    pack: '[Infoblox](/observability_pipelines/packs/infoblox/)'
    source: Infoblox
  - description: Istio Proxy ログは、Envoy によって処理されるインバウンドトラフィックとアウトバウンドトラフィックをキャプチャします。
    destination: Any destination
    pack: '[Istio Proxy](/observability_pipelines/packs/istio_proxy/)'
    source: Istio
  - description: Juniper SRX ファイアウォールは、ネットワークセッションデータを記録します。
    destination: Any destination
    pack: '[Juniper SRX Firewall Traffic Logs](/observability_pipelines/packs/juniper_srx_traffic/)'
    source: Juniper
  - description: このパックには、kube-proxy のエラーと警告のみが保持され、各サイクルで発生する日常的な IP テーブル同期のノイズを除外します。
    destination: Any destination
    pack: '[Kube Proxy](/observability_pipelines/packs/kube_proxy/)'
    source: Kubernetes
  - description: このパックは、従来の Windows DNS サーバーデバッグテキストログ (dns.log) を解析し、クエリ名と応答コードをデコードします。
    destination: Any destination
    pack: '[Microsoft DNS](/observability_pipelines/packs/microsoft_dns/)'
    source: Microsoft
  - description: このパックは、AWS WAF ログに、MITRE ATT&CK の戦術と手法をタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK AWS WAF Enrichment](/observability_pipelines/packs/mitre_attack_aws_waf_enrichment/)'
    source: AWS
  - description: このパックは、CloudTrail ログに、MITRE ATT&CK の戦術と手法をタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK CloudTrail Enrichment](/observability_pipelines/packs/mitre_attack_cloudtrail_enrichment/)'
    source: AWS
  - description: このパックは、FortiGate ログに、MITRE ATT&CK の戦術と手法をタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK FortiGate Enrichment](/observability_pipelines/packs/mitre_attack_fortigate_enrichment/)'
    source: Fortinet
  - description: このパックは、Okta ログに、MITRE ATT&CK の戦術と手法をタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK Okta Enrichment](/observability_pipelines/packs/mitre_attack_okta_enrichment/)'
    source: Okta
  - description: このパックは、Palo Alto のログに MITRE ATT&CK の戦術とテクニックでタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK Palo Alto Enrichment](/observability_pipelines/packs/mitre_attack_palo_alto_enrichment/)'
    source: Palo Alto
  - description: このパックは、Windows イベントログに、MITRE ATT&CK の戦術と手法をタグ付けします。
    destination: Any destination
    pack: '[MITRE ATT&CK Windows Enrichment](/observability_pipelines/packs/mitre_attack_windows_enrichment/)'
    source: Windows
  - description: Netskope ログは、クラウドアプリの使用状況、ポリシー、およびセキュリティイベントをキャプチャします。
    destination: Any destination
    pack: '[Netskope](/observability_pipelines/packs/netskope/)'
    source: Netskope
  - description: NGINX ログは、Web サーバーからのクライアントリクエスト、応答、およびエラーを記録します。
    destination: Any destination
    pack: '[NGINX](/observability_pipelines/packs/nginx/)'
    source: NGINX
  - description: Okta ログは、認証、ユーザーアクティビティ、およびポリシーイベントを示します。
    destination: Any destination
    pack: '[Okta](/observability_pipelines/packs/okta/)'
    source: Okta
  - description: このパックは、OpenAI 組織の監査ログから、ログイン失敗、新しい API キー、権限の変更をフラグ付けします。
    destination: Any destination
    pack: '[OpenAI - Audit Logs](/observability_pipelines/packs/openai_audit_logs/)'
    source: OpenAI
  - description: OTLP/JSON ログは、イベントを resourceLogs、scopeLogs、logRecords の各配列の下に、ペイロードごとに
      3 階層の深さでネスト配置します。
    destination: Any destination
    pack: '[OpenTelemetry Logs](/observability_pipelines/packs/opentelemetry_logs/)'
    source: OpenTelemetry
  - description: このパックは、Orca Security クラウドの検出結果を、SIEM およびデータレイクルーティング用に正規化します。
    destination: Any destination
    pack: '[Orca Security](/observability_pipelines/packs/orca_security/)'
    source: Orca Security
  - description: Cortex XDR アラートには、重大度、MITRE ATT&CK マッピング、およびソース/宛先コンテキストが含まれます。
    destination: Any destination
    pack: '[Palo Alto Cortex](/observability_pipelines/packs/palo_alto_cortex/)'
    source: Palo Alto
  - description: Palo Alto ファイアウォールログは、トラフィック、脅威、およびシステムイベントをキャプチャします。
    destination: Any destination
    pack: '[Palo Alto Firewall](/observability_pipelines/packs/palo_alto_firewall/)'
    source: Palo Alto
  - description: このパックは、PAN-OS のログを、Microsoft Sentinel の CommonSecurityLog スキーマにマッピングします。
    destination: Microsoft Sentinel
    pack: '[Palo Alto Networks - Microsoft Sentinel](/observability_pipelines/packs/palo_alto_microsoft_sentinel/)'
    source: Palo Alto
  - description: このパックは、PAN-OS のログを、Cortex XSIAM フラット JSON スキーマにマッピングしなおします。
    destination: Cortex XSIAM
    pack: '[Palo Alto Networks - XSIAM](/observability_pipelines/packs/palo_alto_xsiam/)'
    source: Palo Alto
  - description: Proofpoint Email Security ログは、電子メールの脅威、フィッシング、およびマルウェアの検出をキャプチャします。
    destination: Any destination
    pack: '[Proofpoint Email Security](/observability_pipelines/packs/proofpoint_email_security/)'
    source: Proofpoint
  - description: このパックは、新規、確認済み、および再オープン済みの Qualys 脆弱性検出を表示し、重大度の低いノイズを除外します。
    destination: Any destination
    pack: '[Qualys Detections](/observability_pipelines/packs/qualys_detections/)'
    source: Qualys
  - description: SentinelOne Cloud Funnel は、EDR および Deep Visibility のイベントを、JSON としてクラウドストレージにストリーミングします。
    destination: Any destination
    pack: '[SentinelOne Cloud Funnel EDR](/observability_pipelines/packs/sentinel_one/)'
    source: SentinelOne
  - description: このパックは、汎用 RFC 3164/5424 syslog を、重大度マッピングおよびログボリュームメトリックにより解析します。
    destination: Any destination
    pack: '[Syslog](/observability_pipelines/packs/syslog/)'
    source: Syslog
  - description: Windows DNS サーバー分析ログは、クエリ、ゾーン転送、および動的な更新を対象としています。
    destination: Any destination
    pack: '[Windows DNS Log](/observability_pipelines/packs/windows_dns_log/)'
    source: Windows
  - description: このパックは、メール転送ルール、委任、ロールの変更など、高リスクの Microsoft 365 (M365) 統合監査ログイベントにフラグを立てます。
    destination: Any destination
    pack: '[Windows Office 365](/observability_pipelines/packs/windows_office_365/)'
    source: Microsoft
  - description: Windows イベントログは、Windows ホストからのシステムアクティビティ、アプリケーションアクティビティ、およびセキュリティアクティビティをキャプチャします。
    destination: Any destination
    pack: '[Windows XML](/observability_pipelines/packs/windows_xml/)'
    source: Windows
  - description: Windows イベントログは、認証、プロセス作成、およびアカウント管理のイベントをキャプチャします。
    destination: Any destination
    pack: '[WinEventLog](/observability_pipelines/packs/wineventlog/)'
    source: Windows
  - description: Zscaler Internet Access (ZIA) DNS ログは、組織全体の DNS アクティビティとポリシーアクションをキャプチャします。
    destination: Any destination
    pack: '[ZScaler ZIA DNS](/observability_pipelines/packs/zscaler_zia_dns/)'
    source: Zscaler
  - description: Zscaler Internet Access (ZIA) ファイアウォールログは、ネットワークトラフィックとセキュリティイベントを示します。
    destination: Any destination
    pack: '[Zscaler ZIA Firewall](/observability_pipelines/packs/zscaler_zia_firewall/)'
    source: Zscaler
  - description: Zscaler Internet Access (ZIA) トンネルログは、トンネルの健全性、トラフィック、および主要なイベントを表示します。
    destination: Any destination
    pack: '[Zscaler ZIA Tunnel](/observability_pipelines/packs/zscaler_zia_tunnel/)'
    source: Zscaler
  - description: Zscaler Internet Access (ZIA) Web ログは、ユーザーの Web アクティビティとセキュリティアクションをキャプチャします。
    destination: Any destination
    pack: '[Zscaler ZIA Web Logs](/observability_pipelines/packs/zscaler_zia_web_logs/)'
    source: Zscaler
  - description: Zscaler Private Access は、プライベートアプリのアクセス、セッション、および接続をキャプチャします。
    destination: Any destination
    pack: '[Zscaler ZPA](/observability_pipelines/packs/zscaler_zpa/)'
    source: Zscaler
  headers:
  - id: pack
    name: パック
  - filter_by: true
    id: source
    name: ソース
  - filter_by: true
    id: destination
    name: 宛先
  - id: description
    name: 説明
title: パック
---
## 概要{#overview}

{{< img src="observability_pipelines/packs/packs.png" alt="Observability Pipelines のパックセクション" style="width:100%;" >}}

特定のソースから Observability Pipelines にログを送信するパイプラインをセットアップする際には、それらのログをどのように処理および管理するかを決定する必要があります。

考慮する質問として、次のものが考えられます。

- このソースからのログのうちどれが重要か？
- 安全に削除できるのはどのログか？
- 反復ログをサンプリングすべきか？
- 宛先に合わせて解析またはフォーマット設定することが必要なフィールドはどれか？

これらの決定を下すには、通常、複数チーム間での調整や、各ログのソースに関する詳細な知識が必要です。

Observability Pipelines のパックは、これらの意思決定を迅速かつ一貫して実行するのに役立つ事前定義設定を提供します。パックは、Akamai、AWS CloudTrail、Cloudflare、Fastly、Palo Alto Firewall、Zscaler など、特定のログのソースに対して、Datadog が推奨するベストプラクティスを適用します。

### 各パックの内容{#what-packs-do}

各パックには、ソース固有の構成が含まれており、それにより次のことが定義されます。

- **ペイロードサイズを削減するために安全に削除できるフィールド**
- **重複イベントや健全性チェックなど、削除しても問題ないログ**
- **エラーやセキュリティ検出など、保持または解析が必要なログ**
- **異なる複数の宛先や環境の間でログを調整するためのフォーマットルールと正規化ルール**

パックを使用することにより、構成を手動で作成することなく、各ログのソースに対して一貫したパース処理、フィルタリング、ルーティングのロジックを適用できます。

### パックを使用する理由{#why-use-packs}

パックはチームの以下の活動を支援します。

- **価値の低い反復イベントをフィルタリングまたはサンプリングすることにより、取り込み量とコストを削減する**
- **さまざまな環境や宛先を通じてパースとフィールドマッピングの一貫性を維持する**
- **一般的なソースに対してすぐに使える構成を適用することにより、セットアップの時間を短縮する**

## セットアップ {#setup}

パックをセットアップするには、次のようにします。

1. [パイプライン][1] (Pipelines) ページに移動します。
1. {{< ui >}}Packs{{< /ui >}} をクリックします。
1. セットアップするパックをクリックします。
1. パックから新しいパイプラインを作成するか、または既存のパイプラインにパックを追加することができます。
    - {{< ui >}}Add to New Pipeline{{< /ui >}} をクリックした場合、作成される新しいパイプラインで、次のようにします。
        - 追加されたプロセッサーグループをクリックして、パックによって追加された個々のプロセッサーを確認し、必要に応じて編集します。詳しくは、[プロセッサー][2] を参照してください。
        - パイプラインの残りのセットアップについては、[Pipelines のセットアップ][3] を参照してください。
    - {{< ui >}}Add to Existing Pipeline{{< /ui >}} をクリックした場合:
        1. パックの追加先となるパイプラインを選択します。
        1. {{< ui >}}Add to Existing Pipeline{{< /ui >}} をクリックします。
            1. パイプラインの最後のプロセッサーグループにパックが追加されます。
            1. グループをクリックして個々のプロセッサーを確認し、必要に応じて編集します。詳しくは、[プロセッサー][2] を参照してください。

## 利用可能なパック {#available-packs}

テーブルに対して、ソースまたは宛先の検索やフィルタリングが可能です。パック名を選択すると、詳細を見ることができます。

{{< multifilter-search >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /ja/observability_pipelines/processors/
[3]: /ja/observability_pipelines/configuration/set_up_pipelines/