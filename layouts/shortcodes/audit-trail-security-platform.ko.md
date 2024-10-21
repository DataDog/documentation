| 이름                       | 감사 이벤트 설명                                                                                              | 감사 탐색기에서 쿼리                                                            |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| [CWS 에이전트 규칙][1001]       | 사용자가 Cloud Security Platform에서 CWS 에이전트 규칙에 액세스(가져오기)했습니다.                                              | `@evt.name:"Cloud Security Platform" @asset.type:cws_agent_rule @action:accessed`  |
| [알림 프로필][1002] | 사용자가 Cloud Security Platform에서 알림 프로필을 생성, 업데이트 또는 삭제했습니다.                              | `@evt.name:"Cloud Security Platform" @asset.type:notification_profile`             |
| [보안 규칙][1003]        | 사용자가 보안 규칙과 해당 규칙의 이전 값 및 새 값을 검증, 업데이트, 삭제 또는 생성했습니다.            | `@evt.name:"Cloud Security Platform" @asset.type:security_rule`                    |
| [보안 신호][1004]      | 사용자는 신호 상태를 수정하거나 신호를 사용자에게 할당하고, 신호의 이전 값과 새 값을 수정했습니다. | `@evt.name:"Cloud Security Platform" @asset.type:security_signal @action:modified` |
| [리포트 구독][1005]  | 사용자가 K9 이메일 리포트를 구독하거나 구독 취소했습니다. | `@evt.name:"Cloud Security Platform" @asset.type:report_subscription` |

[1001]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%E2%80%9CCloud%20Security%20Platform%E2%80%9D%20%40asset.type%3Acws_agent_rule%20%40action%3Aaccessed
[1002]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Anotification_profile
[1003]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_rule
[1004]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Asecurity_signal%20%40action%3Amodified
[1005]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Cloud%20Security%20Platform%22%20%40asset.type%3Areport_subscription%20