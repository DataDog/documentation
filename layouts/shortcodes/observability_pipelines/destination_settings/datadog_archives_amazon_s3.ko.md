1. S3 버킷 이름을 입력하세요. Log Archives를 구성한 경우 이전에 생성한 버킷 이름입니다.
1. S3 bucket이 위치한 AWS 리전을 입력하세요.
1. 키 접두어를 입력합니다.
    - 접두어는 객체를 파티셔닝하는 데 유용합니다. 예를 들어, 특정 디렉터리 아래에 객체를 저장하기 위해 접두어를 객체 키로 사용할 수 있습니다. 이 용도로 접두어를 사용하는 경우, 디렉터리 경로로 동작하도록 반드시 `/`로 끝나야 하며, 끝에 `/`는 자동으로 추가되지 않습니다.
    - 로그의 특정 필드를 기준으로 로그를 서로 다른 객체 키로 라우팅하려면 [템플릿 구문][10051]을 참조하세요.
     - **참고**: Datadog에서는 디렉터리 이름을 접두어로 시작하고 끝 슬래시(`/`)를 사용하지 않을 것을 권장합니다. 예: `app-logs/` 또는 `service-logs/`
1. **Storage Class** 드롭다운 메뉴에서 S3 버킷의 스토리지 클래스를 선택하세요. 로그를 아카이브하고 재수화하려면 다음을 참조하세요.
    - **참고**: 재수화는 다음 [스토리지 클래스][10052]만 지원합니다.
        - 표준
        - 옵션으로 제공되는 비동기 아카이브 액세스 티어가 모두 비활성화된 경우에만 Intelligent-Tiering을 사용합니다.
        - Standard-IA
        - One Zone-IA
    - 다른 스토리지 클래스의 아카이브에서 리하이드레이션하려면 먼저 해당 아카이브를 위의 지원되는 스토리지 클래스 중 하나로 이동해야 합니다.
    - Amazon S3 대상 설정을 기반으로 Log Archive를 구성하는 방법은 이 페이지의 [예시 목적지 및 로그 아카이브 설정](#example-destination-and-log-archive-setup) 섹션을 참조하세요.
1. AWS 인증 옵션을 선택하는 방법도 있습니다. 이전에 생성한 사용자 또는 역할만을 인증에 사용하는 경우, _역할 가정_을 선택하지 마세요. 역할 가정 옵션은 특정 AWS 리소스에 접근하기 위해 이전에 생성한 사용자 또는 역할이 다른 역할을 가정해야 하고, 해당 권한이 명시적으로 정의되어 있어야 하는 경우에만 사용해야 합니다. <br>_역할 가정_을 선택하는 경우는 다음과 같습니다.
    1. 가정하려는 IAM 역할의 ARN을 입력합니다.
    1. 선택적으로 Assume role 세션 이름과 외부 ID를 입력합니다.
    - **참고:** Worker가 AWS에 인증할 수 있도록, [이전에 생성한 사용자 또는 역할][10054]에는 해당 역할을 가정할 수 있는 권한이 있어야 합니다.
1. 선택적으로 스위치를 전환하여 **버퍼링 옵션**을 활성화합니다.<br>**참고:** 버퍼링 옵션은 현재 미리 보기 상태입니다. 액세스를 요청하려면 계정 담당자에게 문의하세요.
    - 비활성화된 채로 두면 버퍼링 최대 크기는 500개 이벤트입니다.
    - 활성화된 경우
        1. 설정하려는 버퍼 유형(**메모리** 또는 **디스크**)를 선택하세요.
        1. 버퍼 크기를 입력하고 단위를 선택합니다.

#### 예시 목적지 및 로그 아카이브 설정

Amazon S3 목적지에 대해 다음 값을 입력한 경우
- S3 버킷 이름: `test-op-bucket`
- 모든 객체 키에 적용되는 접두어: `op-logs`
- 생성된 객체에 대한 스토리지 클래스: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_destination.png" alt="The Amazon S3 destination setup with the example values" width="40%">
</figure>

이 값은 Log Archives에 대해 S3 bucket을 구성하기 위해 입력한 값입니다.

- S3 버킷: `test-op-bucket`
- 경로: `op-logs`
- 스토리지 클래스: `Standard`

<figure class="text-center">
<img src="{{ .Site.Params.img_url}}images/observability_pipelines/setup/amazon_s3_archive.png" alt="The log archive configuration with the example values" width="70%">
</figure>

[10051]: /ko/observability_pipelines/destinations/#template-syntax
[10052]: /ko/logs/log_configuration/archives/?tab=awss3#storage-class
[10053]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
[10054]: /ko/observability_pipelines/destinations/amazon_s3/?tab=docker#set-up-an-iam-policy-that-allows-workers-to-write-to-the-s3-bucket