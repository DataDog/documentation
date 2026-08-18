| 이름                         | 감사 이벤트 설명                                                                  | 감사 탐색기에서 쿼리                                               |
|------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| [원클릭 활성화][1001]   | 사용자가 서비스에서 ASM을 활성화하거나 비활성화했습니다.                                          | `@evt.name:"Application Security" @asset.type:compatible_services`    |
| [보호][1002]             | 사용자가 ASM 보호를 활성화하거나 비활성화했습니다.                                              | `@evt.name:"Application Security" @asset.type:blocking_configuration` |
| [거부 목록][1003]               | 사용자가 IP 주소 또는 사용자 ID를 차단, 차단 해제 또는 차단 기간을 연장했습니다. | `@evt.name:"Application Security" @asset.type:ip_user_denylist`       |
| [통과 목록][1004]               | 사용자가 자동 승인 항목에 항목을 추가, 수정 또는 삭제했습니다.                                | `@evt.name:"Application Security" @asset.type:passlist_entry`         |
| [인앱 WAF 정책][1005]      | 사용자가 인앱 WAF 정책을 생성, 수정 또는 삭제했습니다.                                  | `@evt.name:"Application Security" @asset.type:policy_entry`           |
| [인앱 WAF 커스텀 규칙][1006] | 사용자가 인앱 WAF 커스텀 규칙을 검증, 생성, 수정 또는 삭제했습니다.                  | `@evt.name:"Application Security" @asset.type:waf_custom_rule`        |

[1001]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Aip_user_denylist
[1002]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Application%20Security%22%20%40asset.type%3Ablocking_configuration
[1003]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Acompatible_services
[1004]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apasslist_entry
[1005]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Apolicy_entry
[1006]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A"Application%20Security"%20%40asset.type%3Awaf_custom_rule