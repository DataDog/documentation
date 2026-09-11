#### S3 버킷을 Datadog 로그 아카이브에 연결하기

1. Datadog [Log Forwarding][201]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 구체적인 아카이브 이름을 입력합니다.
1. 로그 파이프라인을 거치는 모든 로그를 필터링하는 쿼리를 추가하여 해당 로그가 이 아카이브로 유입되지 않도록 합니다. 예를 들어 `observability_pipelines_read_only_archive` 쿼리를 추가하면 해당 태그가 추가된 파이프라인으로 로그가 유입되지 않습니다.
1. **AWS S3**을 선택합니다.
1. 버킷이 있는 AWS 계정을 선택합니다.
1. S3 버킷 이름을 입력합니다.
1. 선택적으로 경로를 입력합니다.
1. 확인을 요구하는 문장에 체크 표시합니다.
1. 옵션으로 태그를 추가하고 Rehydration을 위한 최대 스캔 크기를 정의합니다. 자세한 정보는 [고급 설정][202]을 참조하세요.
1. **Save**을 클릭합니다.

추가 정보는 [로그 아카이브 설명서][203]를 참조하세요.

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /ko/logs/log_configuration/archives