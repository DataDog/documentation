---
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/application_security/waf-integration/
  tag: 설명서
  text: WAF Integrations에 대해 자세히 알아보세요.
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 트러블슈팅
- link: /security/application_security/threats/
  tag: 설명서
  text: App and API Protection
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: 블로그
  text: Datadog로 AWS WAF 활동 모니터링
title: AWS WAF용 App and API Protection 활성화
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

App and API Protection은 다음을 통해 AWS Web Application Firewall(WAF)과 통합됩니다.

1. 로그를 트레이스로 변환하여 모니터링 및 차단된 요청에 대한 가시성을 확보합니다.
2. AWS WAF IPset으로 IP 주소 차단

둘 다 독립적으로 설정할 수 있지만, AWS WAF 작업을 검사하기 위해 먼저 로그를 트레이스로 변환하는 설정을 수행하는 것이 좋습니다.

## 전제 조건 {#prerequisites}

- [Amazon Web Services integration][1]이 설정되었습니다.
- [AWS Resource Collection][7]에 대해 다음 권한이 활성화되었습니다.
  - `wafv2:GetWebACL`
  - `wafv2:ListResourcesForWebACL`
  - `wafv2:ListWebACLs`
  - `wafv2:GetIPSet`
  - `wafv2:ListIPSets`
 - [AWS WAF integration][2]에서 메트릭 및 로그 수집이 활성화되었습니다. AWS WAF integration은 S3 버킷으로 전송된 로그만 수집한다는 점에 유의하세요.
 - 차단에 사용되는 AWS WAF를 호스팅하는 AWS 계정으로 [연결][3]이 생성됩니다.

## AWS WAF 로그를 트레이스로 변환하세요. {#convert-aws-waf-logs-to-traces}

먼저 [설정 페이지][4]에서 로그를 트레이스로 변환하는 기능을 **활성화**하세요.

그런 다음 웹 ACL 표에 요청 메트릭과 로그 및 트레이스가 포함되어 있는지 확인하세요.

보안 트레이스는 서비스 이름 `aws.waf`와 함께 [AAP Traces 탐색기][5]에 보고됩니다.

## AWS WAF IPsets로 차단하세요. {#block-with-aws-waf-ipsets}

공격자를 차단하려면 Datadog이 전용 IPset을 관리해야 합니다. 이 IPset은 차단 모드의 규칙이 있는 웹 ACL에서 참조되어야 합니다.

동일하거나 서로 다른 AWS 계정에서 여러 웹 ACL을 설정할 수 있습니다. 모든 AWS 계정에 [연결][3]을 생성해야 합니다.

[연결][3]에 연결된 AWS 역할에 다음 권한이 있는지 확인하세요.

 - `wafv2:GetIPSet`
 - `wafv2:UpdateIPSet`

{{< tabs >}}
{{% tab "Terraform으로 설정" %}}

1. 다음 내용으로 Terraform 구성을 편집하세요.
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

2. Run `terraform apply`을 실행하여 WAF 리소스를 생성하고 업데이트하세요.

{{% /tab %}}
{{< /tabs >}}

설정이 완료되면 [denylist page][6]에서 **Block New Attackers**를 클릭하세요. 웹 ACL 및 연결된 AWS 연결을 선택하여 IP 주소를 차단하세요.

[1]: /ko/integrations/amazon-web-services/
[2]: /ko/integrations/amazon_waf/
[3]: /ko/actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist
[7]: /ko/integrations/amazon-web-services/#resource-collection