---
disable_toc: false
further_reading:
- link: logs/guide/manage-sensitive-logs-data-access/
  tag: 문서
  text: 민감한 로그 데이터 액세스 권한 관리
- link: /security/sensitive_data_scanner/
  tag: 문서
  text: Sensitive Data Scanner
- link: /account_management/delete_data/
  tag: 문서
  text: 데이터 삭제
title: 민감한 데이터가 포함된 로그 삭제
---
## 개요 {#overview}

민감한 데이터가 포함된 로그를 삭제하면 해당 데이터가 노출될 위험이 줄어듭니다. 이 가이드는 다음 작업을 수행하는 방법에 대한 정보를 제공합니다.

- 보존 기간 이내이기 때문에 민감한 데이터가 포함된 로그를 삭제해야 하는지 검사합니다.
- 민감한 데이터가 포함된 로그는 쿼리할 수 없도록 설정합니다.
- Sensitive Data Scanner로 민감한 데이터를 비식별화합니다.
- 로그 데이터 삭제 기능으로 로그를 삭제합니다.

## 로그 보존 기간 확인 {#check-your-log-retention-period}

Datadog은 조직의 가장 긴 보존 기간을 경과한 로그를 자동으로 삭제합니다.

로그 보존 기간을 확인하거나 변경하려면 다음 단계를 수행하세요.

1. [Log Indexes][1] 페이지로 이동합니다.
1. {{< ui >}}Retention{{< /ui >}} 열에서 각 인덱스의 로그 보존 기간을 확인합니다.
1. 로그가 더 빨리 만료되도록 하려면 인덱스 오른쪽에 있는 {{< ui >}}Edit{{< /ui >}} 아이콘을 클릭합니다.
1. **Set Index Retention** 드롭다운 메뉴를 새 보존 기간으로 업데이트합니다.

## 민감한 데이터가 포함된 로그는 쿼리할 수 없도록 설정 {#make-logs-with-sensitive-data-un-queryable}

보존 기간 내의 로그에 민감한 데이터가 포함된 경우 해당 로그가 만료될 때까지 쿼리할 수 없도록 설정할 수 있습니다. 쿼리할 수 없는 로그는 로그 탐색기, Dashboards 또는 Live Tail에 표시되지 않습니다. Datadog에서 민감한 데이터가 포함된 로그를 쿼리할 수 없도록 설정하려면 [지침][2]을 따르세요.

## 전체 인덱스 삭제 {#delete-an-entire-index}

전체 인덱스를 삭제하려면 다음 단계를 따르세요.

1. [Log Indexes][1] 페이지로 이동합니다.
1. 삭제하려는 인덱스 오른쪽에 있는 {{< ui >}}Delete{{< /ui >}} 아이콘을 클릭합니다.
1. {{< ui >}}Confirm{{< /ui >}}을 클릭하여 인덱스를 삭제합니다.

## Sensitive Data Scanner로 민감한 데이터 비식별화 {#redact-sensitive-data-with-sensitive-data-scanner}

[Sensitive Data Scanner][5]를 사용하여 Datadog에 민감한 데이터가 저장될 위험을 제한할 수 있습니다. Sensitive Data Scanner는 스트림 기반의 패턴 매칭 서비스로 민감한 데이터를 식별하고, 태그를 지정하고 필요시 해당 데이터를 비식별화 또는 해시 처리하는 데 사용됩니다. 보안 및 규정 준수 팀은 Sensitive Data Scanner를 구현하여 민감한 데이터 유출을 방지하고 규정 미준수 위험을 제한할 수 있습니다.

## 조직에서 로그 삭제 {#delete-logs-from-your-organization}

민감한 데이터를 포함하고 있는 인덱싱된 로그를 영구적으로 제거하려면 [로그 데이터 삭제][3]를 사용하세요. 로그 데이터 삭제를 사용하면 Datadog 지원 팀에 문의하지 않아도 특정 기간 내의 로그를 쿼리하여 조직에서 삭제할 수 있습니다.

로그를 삭제하기 전에 다음 사항을 확인하세요.

- 민감한 데이터가 포함된 로그를 Datadog으로 전송하는 작업을 중단했습니다.
- 로그 데이터 삭제가 [조직에 활성화][6]되어 있습니다. 이 기능은 조직 관리자만 활성화할 수 있습니다.
- {{< ui >}}Logs Delete Data{{< /ui >}} 권한이 있는 역할을 담당하고 있습니다.

<div class="alert alert-danger">삭제는 10일 후 영구적으로 적용됩니다. 삭제 요청을 확인하기 전에 각 요청을 검토합니다.</div>

**참고**: 로그 데이터 삭제 기능은 삭제된 로그에서 파생된 데이터(예: 생성된 메트릭)는 삭제하지 않습니다.

취소 및 삭제 감사 방법을 포함한 전체 절차는 [데이터 삭제][3]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ko/logs/guide/manage-sensitive-logs-data-access/#make-sensitive-logs-un-queryable-in-datadog-until-they-age-out
[3]: /ko/account_management/delete_data/
[5]: https://www.datadoghq.com/product/sensitive-data-scanner/
[6]: /ko/account_management/delete_data/#enable-deletion-feature