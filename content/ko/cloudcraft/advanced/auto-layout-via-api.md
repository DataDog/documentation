---
title: Cloudcraft API를 통해 클라우드 계정 스냅샷 자동화
---

## 개요

웹 애플리케이션으로 사용 가능한 Cloudcraft의 **Auto Layout** 기능은 AWS 환경의 다이어그램을 자동으로 생성하는 강력한 도구입니다. 이 기능을 통해 문서화 프로세스를 크게 간소화하고 새로운 팀원을 쉽게 온보딩할 수 있습니다.

이 가이드에서는 일반적인 명령줄 유틸리티와 Cloudcraft 개발자 API를 통해 이 기능을 활용하는 방법을 단계별로 알아보겠습니다.

<div class="alert alert-info">AWS 및 Azure 계정을 추가하고 스캔하는 기능과 Cloudcraft의 개발자 API를 사용하는 기능은 Pro 구독자에게만 제공됩니다. 자세한 내용은<a href="https://www.cloudcraft.co/pricing">Cloudcraft 가격 페이지</a>를 참고하세요.</div>

## 사전 필수 조건

- 유효한 [Cloudcraft Pro 구독][1]
- 읽기-쓰기 권한이 있는 API 키
- 스캔하려는 AWS 또는 Azure 계정의 계정 ID
- Unix와 유사한 환경(Linux, macOS 또는 Linux용 Windows 하위 시스템) 대한 액세스
- 명령줄 작업에 익숙함
- API 사용에 대한 기본 지식

## 계정 스냅샷 생성하기

[Snapshot AWS account][2] 또는 [Snapshot Azure account][3] 엔드포인트를 사용하여 AWS 또는 Azure 계정의 스냅샷을 생성하세요. 이 프로세스는 Cloudcraft UI의 **Scan Now** 버튼 기능을 그대로 반영하며, 스냅샷을 JSON 형식으로 출력합니다.

터미널에서 다음 명령을 실행하세요.

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY"
{{< /code-block >}}

`PROVIDER`를 `azure` 또는 `aws`와 같은 클라우드 공급자로 변경하고, `ACCOUNT_ID`를 Cloudcraft의 AWS 또는 Azure 계정 ID로 변경합니다. `REGION`은 원하는 스캔 지역으로, `API_KEY`는 Cloudcraft API키로 변경합니다.

명령을 실행하면 AWS 계정 스냅샷의 JSON 형식이 표시됩니다. 이 출력을 파일에 직접 저장하려면 다음 명령을 사용하세요.

{{< code-block lang="shell" >}}
curl \
  --url 'https://api.cloudcraft.co/PROVIDER/account/ACCOUNT_ID/REGION/json' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header "Authorization: Bearer API_KEY" > '/tmp/account-infra.json'
{{< /code-block >}}

스냅샷은 임시 디렉터리에 파일 이름 `account-infra.json`으로 저장됩니다.

## 새 블루프린트 생성

다음으로, [Create blueprint][4] API 엔드포인트를 사용하여 Cloudcraft 계정에 새 블루프린트를 생성하세요. 저장된 스냅샷 데이터는 이 요청의 페이로드 역할을 합니다.

터미널에서 다음 명령을 실행하세요.

{{< code-block lang="shell" >}}
curl \
  --request 'POST' \
  --url 'https://api.cloudcraft.co/blueprint' \
  --tlsv1.2 \
  --proto '=https' \
  --silent \
  --header 'Content-Type: application/json' \
  --header "Authorization: Bearer API_KEY" \
  --data '@/tmp/account-infra.json'
{{< /code-block >}}

`API_KEY`를 Cloudcraft API 키로 바꿉니다.

완료되면 클라우드 인프라스트럭처를 반영하는 새로운 블루프린트가 Cloudcraft 계정에 생성되어 **Scan Now** 및 **Auto Layout** 버튼을 사용한 것과 같은 효과가 재현됩니다.

프로세스와 관련해 문제가 발생하거나 질문이 있을 경우 [Cloudcraft 지원팀에 문의하세요][5].

[1]: https://www.cloudcraft.co/pricing
[2]: /ko/cloudcraft/api/aws-accounts/#snapshot-aws-account
[3]: /ko/cloudcraft/api/azure-accounts/#snapshot-an-azure-account
[4]: /ko/cloudcraft/api/blueprints/#create-a-blueprint
[5]: https://app.cloudcraft.co/app/support