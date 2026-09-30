### S3 버킷을 Datadog Log Archives에 연결 {#connect-the-s3-bucket-to-datadog-log-archives}

1. Datadog [Log Forwarding][201]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 설명이 포함된 아카이브 이름을 입력합니다.
1. **Define Which Data To Forward** 섹션에서 Log Management 파이프라인을 통과하는 모든 로그를 필터링하는 쿼리를 추가하여 Log Archive가 이 버킷으로 로그를 보내지 않도록 합니다. 그렇지 않으면 Log Archive와 Worker가 모두 버킷으로 로그를 보내어 아카이브된 로그가 중복됩니다.
    - 예를 들어 `observability_pipelines_read_only_archive` 쿼리를 추가하고 Log Management 파이프라인을 통과하는 로그에 태그가 없는 경우, Worker는 버킷으로 로그를 보내고 Log Archive는 버킷에서 로그를 읽고 리하이드레이션하기만 합니다.
    - 쿼리를 입력한 후(예: `observability_pipelines_read_only_archive`) 페이지 상단의 로그 미리보기에 일치하는 결과가 표시되지 않아야 합니다.
1. **AWS S3**를 선택합니다.
1. 버킷이 있는 AWS 계정을 선택합니다.
1. S3 버킷 이름을 입력합니다.
1. 필요시 경로를 입력합니다.
1. 확인을 요구하는 문장에 체크 표시합니다.
1. 필요시 태그를 추가하고 리하이드레이션을 위한 최대 스캔 크기를 정의하세요. 자세한 내용은 [고급 설정][202]을 참조하세요.
1. **Save**를 클릭합니다.

추가 정보는 [로그 아카이브 설명서][203]를 참조하세요.

[201]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[202]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings
[203]: /ko/logs/log_configuration/archives
