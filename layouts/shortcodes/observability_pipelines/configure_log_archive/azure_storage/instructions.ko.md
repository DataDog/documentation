#### 스토리지 계정 만들기

아직 [Azure 스토리지 계정][9051]이 없는 경우 [Azure 스토리지 계정]을 만듭니다.

1. [Storage accounts][9052]으로 이동합니다.
1. **생성**을 클릭합니다.
1. 사용하려는 구독 이름과 리소스 이름을 선택합니다.
1. 스토리지 계정의 이름을 입력합니다.
1. 드롭다운 메뉴에서 리전을 선택합니다.
1. **Standard** 성능 또는 **Premium** 계정 유형을 선택합니다.
1. **Next**를 클릭합니다.
1. **Blob storage** 섹션에서  **Hot** 또는 **Cool** 스토리지를 선택합니다.
1. **검토 + 생성**을 클릭합니다.

#### 스토리지 버킷 생성하기 

1. 스토리지 계정의 왼쪽 탐색 메뉴의 **Data storage**에서 **Containers**를 클릭합니다.
1. 상단의 **+ Container**를 클릭하여 새 컨테이너를 생성합니다.
1. 새 컨테이너의 이름을 입력합니다. 해당 이름은 향후 Observability Pipelines Azure Storage 대상을 설정할 때 사용됩니다.

**참고:** 드물게 발생하지만 (일반적으로 시간 초과 시) 가장 최근 데이터를 다시 작성해야 할 수 있으므로 [불변성 정책][9053]을 설정하지 마세요.

#### Azure 컨테이너를 Datadog 로그 아카이브에 연결하기

1. Datadog [Log Forwarding][9054]으로 이동합니다.
1. **New archive**를 클릭합니다.
1. 구체적인 아카이브 이름을 입력합니다.
1. 로그 파이프라인을 거치는 모든 로그를 필터링하는 쿼리를 추가하여 해당 로그가 이 아카이브로 유입되지 않도록 합니다. 예를 들어 `observability_pipelines_read_only_archive` 쿼리를 추가하면 해당 태그가 추가된 파이프라인으로 로그가 유입되지 않습니다.
1. **Azure Storage**를 선택합니다.
1. 스토리지 계정이 속한 Azure 테넌트 및 클라이언트를 선택합니다.
1. 스토리지 계정의 이름을 입력합니다.
1. 이전에 만든 컨테이너의 이름을 입력합니다.
1. 선택적으로 경로를 입력합니다.
1. 옵션으로 권한을 설정하고 태그를 추가하고 Rehydration을 위한 최대 스캔 크기를 정의합니다. 자세한 정보는 [고급 설정][6]을 참조하세요.
1. **Save**을 클릭합니다.

추가 정보는 [로그 아카이브 설명서][9056]를 참조하세요.

[9051]: https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[9052]: https://portal.azure.com/#browse/Microsoft.Storage%2FStorageAccounts
[9053]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
[9054]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[9055]: /ko/logs/log_configuration/archives/?tab=awss3#advanced-settings
[9056]: /ko/logs/log_configuration/archives