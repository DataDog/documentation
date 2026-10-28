---
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: /security/application_security/waf-integration/
  tag: ドキュメント
  text: WAF Integrations について
- link: /security/application_security/troubleshooting
  tag: ドキュメント
  text: App and API Protection のトラブルシューティング
- link: /security/application_security/threats/
  tag: ドキュメント
  text: App and API Protection
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Datadog を使用した AWS WAF のアクティビティの監視
title: AWS WAF で App and API Protection を有効にする
---
App and API Protection は、以下の方法で AWS Web Application Firewall (WAF) と統合されます。

1. ログをトレースに変換して、監視およびブロックされたリクエストを可視化する
2. AWS WAF IP セットを使用して IP アドレスをブロックする

両方とも個別に設定できますが、AWS WAF のアクションを調査するために、まずはログからトレースへの変換を設定することをお勧めします。

## 前提条件{#prerequisites}

- [Amazon Web Services インテグレーション][1]が設定されていること。
- [AWS リソース収集][7]に対して以下の権限が有効になっていること。
  - `wafv2:GetWebACL`
  - `wafv2:ListResourcesForWebACL`
  - `wafv2:ListWebACLs`
  - `wafv2:GetIPSet`
  - `wafv2:ListIPSets`
 - [AWS WAF インテグレーション][2]でメトリクスとログの収集が有効になっていること。AWS WAF インテグレーションでは、S3 バケットに送信されたログのみが収集されることに注意してください。
 - ブロックに使用する AWS WAF をホストしている AWS アカウントとの[コネクション][3]が作成されていること。

## AWS WAF のログをトレースに変換する {#convert-aws-waf-logs-to-traces}

まず、[[Settings] (設定) ページ][4]でログからトレースへの変換を**有効**にします。

次に、Web ACL テーブルにリクエストメトリクス、ログ、トレースが含まれていることを確認します。

セキュリティトレースは、サービス名 `aws.waf` で [AAP トレースエクスプローラー][5]にレポートされます。

## AWS WAF IP セットを使用してブロックする {#block-with-aws-waf-ipsets}

攻撃者をブロックするには、Datadog で専用の IP セットを管理する必要があります。この IP セットを、ブロックモードのルールを使用して Web ACL から参照する必要があります。

複数の Web ACL を、同一または異なる AWS アカウントに設定できます。すべての AWS アカウントで[コネクション][3]を作成する必要があります。

[コネクション][3]にアタッチされた AWS ロールに、以下の権限があることを確認してください。

 - `wafv2:GetIPSet`
 - `wafv2:UpdateIPSet`

{{< tabs >}}
{{% tab "Terraform でセットアップする" %}}

1. Terraform 構成を以下の内容で編集します。
   ```tf
   resource "aws_wafv2_ip_set" "datadog_blocked_ipv4s" {
     name               = "Datadog-blocked-ipv4s"
     ip_address_version = "IPV4"
     scope              = "CLOUDFRONT"
     addresses          = []

     lifecycle {
       # The addresses are managed by the Datadog Application Security product.
       ignore_changes = [addresses]
     }
   }

   # Add a blocking rule to your existing web ACL resource
   resource "aws_wafv2_web_acl" "EdgeWAF" {
     name  = "EdgeWAF"
     description = "undefined"
     scope = "CLOUDFRONT"

     default_action {
       allow {}
     }

     rule {
       name     = "BlockedIPs"
       priority = 0

       action {
         block {}
       }

       statement {
         ip_set_reference_statement {
           arn = aws_wafv2_ip_set.datadog_blocked_ipv4s.arn
         }
       }

       visibility_config {
         cloudwatch_metrics_enabled = true
         metric_name                = "Datadog-blocked-ipv4s"
         sampled_requests_enabled   = true
       }
     }

     visibility_config {
       cloudwatch_metrics_enabled = true
       metric_name                = "EdgeWAF"
       sampled_requests_enabled   = true
     }
   }
   ```

2. `terraform apply` を実行して、WAF リソースを作成および更新します。

{{% /tab %}}
{{< /tabs >}}

セットアップが完了したら、[Denylist ページ][6]で [**Block New Attackers**] (新しい攻撃者をブロック) をクリックします。Web ACL と、関連付けられた AWS コネクションを選択して、IP アドレスをブロックします。

[1]: /ja/integrations/amazon-web-services/
[2]: /ja/integrations/amazon_waf/
[3]: /ja/actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist
[7]: /ja/integrations/amazon-web-services/#resource-collection