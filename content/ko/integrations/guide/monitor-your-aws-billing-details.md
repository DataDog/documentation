---
aliases:
- /ko/integrations/faq/how-do-i-monitor-my-aws-billing-details
kind: 가이드
title: AWS 빌링 상세 내용 모니터링하기
---

Datadog-AWS Billing 통합으로 AWS에서 빌링 메트릭을 수집할 수 있습니다. 자세한 정보는 Datadog의 [Amazon Billing][5] 통합을 참고하세요.

빌링 메트릭 수집을 시작하려면 다음을 따르세요.

1. [AWS 구성 페이지][1]의 `Metric Collection` 탭 아래 `Billing`이 활성화되어 있는지 확인하고, Datadog AWS 정책에 `budgets:ViewBudget` 권한을 포함하세요.

2. AWS 콘솔에서 [빌링 메트릭을 활성화][2]하세요.

Datadog-AWS Billing 통합을 사용해 이용할 수 있는 메트릭은 다음과 같습니다.

| 이름                            | 유닛   | 설명                                                                                                                                        |
| -----                           | ------  | ------                                                                                                                                             |
| `aws.billing.actual_spend`      | 달러 | 예산 기간 실제 사용 비용                                                                                                   |
| `aws.billing.budget_limit`      | 달러 | 예산 기간 사용비 제한                                                                                                          |
| `aws.billing.estimated_charges` | 달러 | AWS 사용 예상 비용. 한 개 서비스의 예상 비용이거나 서비스 전체 비용의 합계일 수 있음. |
| `aws.billing.forecasted_spend`  | 달러 | 예산 기간 예보된 사용 비용                                                                                               |

AWS에 더해 여러 클라우드 서비스에 강력한 비용 모니터링을 적용하고 싶을 경우, Datadog에서 [CloudHealth][3]를 이용한 제 3자 통합을 지원합니다. Datadog와 [CloudHealth][3]가 통합하여 호스팅 중인 인프라스트럭처 전체의 비용을 어떻게 가시화하는지 자세히 알아보려면 [이 블로그 게시물][4]을 참고하세요.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[3]: /ko/integrations/cloudhealth/
[4]: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog
[5]: https://app.datadoghq.com/integrations/amazon-billing