---
aliases:
- /ko/security/cloud_siem/threat_intelligence
disable_toc: false
further_reading:
- link: security/cloud_siem/detection_rules
  tag: 문서
  text: 사용자 지정 탐지 규칙 생성
- link: /security/cloud_siem/triage_and_investigate/ioc_explorer/
  tag: 설명서
  text: IOC 탐색기
- link: /security/cloud_siem/guide/ingest-stix-threat-intelligence/
  tag: 문서
  text: STIX 위협 인텔리전스 수집
- link: https://www.datadoghq.com/blog/recorded-future-content-pack/
  tag: 블로그
  text: Recorded Future 위협 인텔리전스를 Datadog Cloud SIEM과 통합
site_support_id: byoti
title: 사용자 보유 위협 인텔리전스 활용
---
## 개요 {#overview}

Datadog은 Cloud SIEM 로그를 위한 기본 제공 [위협 인텔리전스][1]를 제공합니다. 이 문서에서는 자체 사용자 지정 위협 인텔리전스 피드로 로그를 보강해 해당 기능을 확장하는 방법을 설명합니다.

Cloud SIEM은 Datadog 참조 테이블에 저장된 위협 인텔리전스 침해 지표(IOC)를 사용하여 로그를 보강하고 검색하는 기능을 지원합니다. [참조 테이블][7]을 사용하면 메타데이터를 Datadog에 이미 저장된 정보와 결합할 수 있습니다.

<div class="alert alert-info">CSV 파일을 업로드하는 대신 지표를 STIX 2.1 번들 형식으로 프로그래밍 방식으로 전송할 수도 있습니다. <a href="/security/cloud_siem/guide/ingest-stix-threat-intelligence/">STIX 위협 인텔리전스 수집</a>을 참조하세요.</div>

### 사용자 보유 위협 인텔리전스 활용 방식 {#how-bring-your-own-threat-intelligence-works}

Cloud SIEM이 로그를 처리할 때 로그의 IP, 도메인, 해시, AWS 계정 ID, 컨테이너, SSH 및 사용자 에이전트 속성을 Cloud SIEM에서 활성화한 참조 테이블과 비교하여 평가합니다. 프로세스는 다음과 같습니다.

1. Datadog은 각 로그에서 다음과 같은 관련 속성을 추출합니다.
    - **IP**: 로그 내 모든 위치에서 발견되는 IPv4 및 IPv6 주소
    - **도메인 및 호스트 이름**: 다음 속성이 존재하는 경우 해당 속성의 값
      - `DNS_QUESTION_NAME`
      - `DNS_ANSWER_NAME`
      - `HTTP_URL`
      - `HTTP_URL_DETAILS_DOMAIN`
      - `HOSTNAME`
    - **파일 해시**: 파일 및 프로세스 관련 로그 속성에서 발견된 SHA1, SHA256 및 ssdeep 해시
    - **AWS 계정 ID**: AWS 관련 로그 속성의 값(예: `userIdentity.accountId`)
    - **컨테이너 이미지 이름**: 컨테이너 런타임 로그의 값
    - **컨테이너 레지스트리 계정 이름**: 컨테이너 레지스트리 로그의 값
    - **SSH 공개 키**: SSH 인증 로그의 값
    - **사용자 에이전트**: HTTP 요청 헤더 속성의 값
2. 추출된 값을 참조 테이블과 비교하여 평가합니다.
    - 추출된 값을 해당 참조 테이블의 기본 키와 비교합니다. 각 지표 유형에는 특정 기본 키가 지정된 별도의 참조 테이블이 있습니다(예: IP의 경우 `ip_address`, SHA256 해시의 경우 `sha256`).
3. 일치하는 경우 보강합니다.
    - 일치하는 항목이 있으면 Datadog은 참조 테이블의 위협 인텔리전스 메타데이터(예: `category`, `source`, `first_seen`, `last_seen`, `confidence`)를 사용하여 로그를 보강합니다. 이렇게 보강된 필드는 검색, 분석 및 탐지 규칙에 사용할 수 있습니다.

**참고**:
- Cloud SIEM은 실시간으로 로그를 평가하며 [Datadog이 큐레이팅한 위협 인텔리전스][10]와 사용자 자체 참조 테이블을 모두 사용합니다.
- 참조 테이블은 사용자 지정 IoC를 저장하고 이를 로그 및 탐지 결과와 결합하는 데 사용됩니다.

### 참조 테이블에 침해 지표 저장 {#store-indicators-of-compromise-in-reference-tables}

위협 인텔리전스는 CSV 형식으로 지원됩니다. 각 지표 유형(예: IP 주소, 도메인, SHA256 해시, AWS 계정 ID, 컨테이너 이미지 이름)마다 별도의 테이블이 필요하며, 테이블에는 다음 열이 있어야 합니다.

#### IP 주소의 CSV 구조 {#csv-structure-for-ip-addresses}

| 필드           | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| ip_address      | 텍스트 | IPv4 점 표기법 형식의 참조 테이블 기본 키                 | true     | 192.0.2.1                                                                 |
| additional_data | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | Malware                                                                   |
| intention       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | malicious                                                                 |
| source          | 텍스트 | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 CSV 예시입니다.

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### 도메인의 CSV 구조 {#csv-structure-for-domains}

| 필드           | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|-----------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| domain          | 텍스트 | 참조 테이블의 기본 키                                                 | true     | mal-domain.com                                                            |
| additional_data | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| category        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | Phishing                                                                  |
| intention       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | malicious                                                                 |
| source          | 텍스트 | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

#### 파일 해시의 CSV 구조 {#csv-structure-for-file-hashes}

파일 해시 지표는 SHA1, SHA256, ssdeep 등 각 해시 유형마다 별도의 참조 테이블이 필요합니다. 기본 키 열 이름은 해시 유형에 따라 다릅니다.

| 필드                    | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|--------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `sha1`/`sha256`/`ssdeep` | 텍스트 | 참조 테이블의 기본 키                                                 | true     | `5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8`        |
| `additional_data`        | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`               | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | `malware`                                                                 |
| `intention`              | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | `malicious`                                                               |
| `source`                 | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 각 해시 유형별 CSV 예시입니다.
{{< tabs >}}
{{% tab "SHA256" %}}

```
sha256,additional_data,category,intention,source
5f7afeeee13aaee6874a59a510b75767156f75d14db0cd4e1725ee619730ccc8,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "SHA1" %}}

```
sha1,additional_data,category,intention,source
a1b2c3d4e5f6789012345678901234567890abcd,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
5e884898da28047151d0e56f8dc6292773603d0d,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{% tab "ssdeep" %}}

```
ssdeep,additional_data,category,intention,source
3:AXGBicFlgVNhBGcL6wCrFQEv:AXGHsNhxLsr2C,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
96:C7Q4LPmPWJwF7qLQd6C8vjF8ULQd6vhLQd6C8vjF:C7Q4LSjKdD8eKdhD8e,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192:4gHHP2ZJwF0gHHrFqxXgHH8RZJwF:4gHtZy0gHMsxQH,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
{{% /tab %}}
{{< /tabs >}}
</div>

#### AWS 계정 ID의 CSV 구조 {#csv-structure-for-aws-account-ids}

AWS 계정 ID 피드는 침해되었거나 의심스러운 AWS 계정을 추적하는 데 유용합니다.

| 필드             | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `aws_account_id`  | 텍스트 | AWS 계정 ID 형식(12자리 숫자)의 참조 테이블 기본 키      | true     | `123456789012`                                                            |
| `additional_data` | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | `scanner`                                                                 |
| `intention`       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | `suspicious`                                                              |
| `source`          | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 CSV 예시입니다.

```
aws_account_id,additional_data,category,intention,source
123456789012,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
987654321098,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
555666777888,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### 컨테이너 이미지 이름의 CSV 구조 {#csv-structure-for-container-image-names}

컨테이너 이미지 피드는 알려진 악성 컨테이너 이미지를 추적하는 데 유용합니다.

| 필드                  | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|------------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_image_name` | 텍스트 | 참조 테이블의 기본 키 레지스트리, 리포지토리 및 태그를 포함할 수 있습니다.      | true     | `malicious-registry.com/suspicious/image:latest`                          |
| `additional_data`      | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`             | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | `malware`                                                                 |
| `intention`            | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | `malicious`                                                               |
| `source`               | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 CSV 예시입니다.

```
container_image_name,additional_data,category,intention,source
malicious-registry.com/suspicious/image:latest,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
bad-repo.io/malware/cryptominer:v2,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
suspicious-hub.com/backdoor/payload:1.0,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### 컨테이너 레지스트리 계정 이름의 CSV 구조 {#csv-structure-for-container-registry-account-names}

컨테이너 레지스트리 계정 이름 피드는 침해되었거나 악성인 컨테이너 레지스트리 계정을 식별하는 데 유용합니다.

| 필드                             | 데이터 | 설명                                                                                        | 필수 | 예시                                                                   |
|-----------------------------------|------|----------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `container_registry_account_name` | 텍스트 | 참조 테이블의 기본 키 컨테이너 레지스트리의 계정 또는 조직 이름입니다. | true     | `suspicious-publisher`                                                    |
| `additional_data`                 | json | 로그를 보강하기 위한 추가 데이터                                                                | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`                        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.               | true     | `malware`                                                                 |
| `intention`                       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.                 | true     | `malicious`                                                               |
| `source`                          | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크           | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 CSV 예시입니다.

```
container_registry_account_name,additional_data,category,intention,source
suspicious-publisher,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
compromised-org,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
malicious-vendor,"{""ref"":""hxxp://example.org""}",malware,malicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### SSH 공개 키의 CSV 구조 {#csv-structure-for-ssh-public-keys}

SSH 공개 키 피드는 승인되지 않았거나 침해된 SSH 키를 추적하는 데 유용합니다.

| 필드             | 데이터 | 설명                                                                                                        | 필수 | 예시                                                                   |
|-------------------|------|--------------------------------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `ssh_public_key`  | 텍스트 | 참조 테이블의 기본 키 표준 형식의 SSH 공개 키(일반적으로 ssh-rsa, ssh-ed25519 등) | true     | `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC...`                              |
| `additional_data` | json | 로그를 보강하기 위한 추가 데이터                                                                                | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.                               | true     | `scanner`                                                                 |
| `intention`       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.                                 | true     | `suspicious`                                                              |
| `source`          | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크                           | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 여러 줄로 된 키는 CSV에 추가하기 전에 줄 바꿈을 제거합니다. 다음은 CSV 예시입니다.

```
ssh_public_key,additional_data,category,intention,source
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3F6tyPEFEzV0LX3X8BsXdMsQ,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDGZfNyAXqPdvZ0qqIWFVxH5z2k,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

#### 사용자 에이전트의 CSV 구조 {#csv-structure-for-user-agents}

사용자 에이전트 피드는 악성 봇과 스캐너를 식별하는 데 유용합니다.

| 필드             | 데이터 | 설명                                                                              | 필수 | 예시                                                                   |
|-------------------|------|------------------------------------------------------------------------------------------|----------|---------------------------------------------------------------------------|
| `user_agent`      | 텍스트 | 참조 테이블의 기본 키 HTTP User-Agent 문자열                         | true     | `Mozilla/5.0 (compatible; MaliciousBot/1.0)`                              |
| `additional_data` | json | 로그를 보강하기 위한 추가 데이터                                                      | false    | `{"ref":"hxxp://example.org"}`                                            |
| `category`        | 텍스트 | 위협 인텔리전스 [카테고리][8] 일부 기본 제공 탐지 규칙에서 사용됩니다.     | true     | `scanner`                                                                 |
| `intention`       | 텍스트 | 위협 인텔리전스 [의도][9] 일부 기본 제공 탐지 규칙에서 사용됩니다.       | true     | `suspicious`                                                              |
| `source`          | json | 팀 이름과 팀 위키 링크 등 소스 이름 및 해당 사이트 링크 | true     | `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` |

<div class="alert alert-info">CSV에 JSON을 포함하려면 큰따옴표로 묶어야 합니다. 다음은 CSV 예시입니다.

```
user_agent,additional_data,category,intention,source
Mozilla/5.0 (compatible; MaliciousBot/1.0),"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
BadCrawler/2.0,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
SuspiciousScanner/3.5,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```
</div>

### 자체 위협 인텔리전스 업로드 및 활성화 {#upload-and-enable-your-own-threat-intelligence}

Datadog은 수동 업로드 또는 Amazon S3, Azure 스토리지, Google Cloud 스토리지에서 주기적으로 데이터를 검색하는 방식으로 참조 테이블을 생성할 수 있도록 지원합니다.

**참고**:
- 테이블을 만든 후 로그 보강을 시작하는 데 10~30분이 걸릴 수 있습니다.
- 기본 키가 중복된 경우 해당 키를 건너뛰고 관련 오류 메시지가 표시됩니다.

새 [참조 테이블][2] 페이지에서 다음 단계를 따르세요.

1. 테이블 이름을 지정합니다. Threat Intelligence 설정에서 테이블 이름을 참조합니다.
1. 로컬 CSV를 업로드하거나 클라우드 스토리지 버킷에서 CSV를 가져옵니다. 파일이 정규화되고 검증됩니다.
1. 테이블 스키마를 미리 보고 적절한 IOC 열을 기본 키로 선택합니다(예: IP 지표의 경우 `ip_address`, SHA256 해시 지표의 경우 `sha256`).
1. 테이블을 저장합니다.
1. [Threat Intel][3]에서 새 테이블을 찾아 토글을 활성화합니다.

#### 클라우드 스토리지 사용 {#using-cloud-storage}

클라우드 스토리지에서 생성된 참조 테이블은 주기적으로 새로 고쳐집니다. 테이블 전체가 교체됩니다. 데이터가 병합되지 않습니다.

관련 참조 테이블 설명서를 참조하세요.

- [Amazon S3][4]
- [Azure storage][5]
- [Google Cloud storage][6]

#### 클라우드 가져오기 문제 해결 {#troubleshooting-cloud-imports}

참조 테이블이 새로 고쳐지지 않으면 참조 테이블의 설정 메뉴를 열고 {{< ui >}}View Change Events{{< /ui >}}를 선택합니다.

{{< ui >}}View Change Events{{< /ui >}} {{< ui >}}Event Management{{< /ui >}}에서 수집 중 발생했을 가능성이 있는 오류 이벤트를 보여주는 페이지가 열립니다. 참조 테이블 이름을 사용하여 {{< ui >}}Event Management{{< /ui >}}에서 필터링할 수도 있습니다.

Datadog Event Management에서는 클라우드에서 데이터를 가져온 것으로 표시되더라도 해당 변경 사항이 위협 인텔리전스에 반영되기까지 몇 분이 더 걸릴 수 있습니다. 기타 유용한 클라우드 가져오기 세부 정보:

- 소스가 업로드되거나 업데이트될 때 업데이트된 보강 데이터를 사용할 수 있기까지 예상되는 지연 시간은 10~30분입니다.
- 업데이트 적용 여부 확인 방법: 참조 테이블 또는 로그에서 변경 사항을 확인할 수 있습니다. 참조 테이블 세부 정보 페이지의 설정에서 {{< ui >}}View Change Events{{< /ui >}} 링크를 선택하면 관련 이벤트를 확인할 수 있습니다.
- 업데이트 시 테이블 전체가 새 데이터로 교체됩니다.
기본 키가 중복된 경우 중복된 키가 있는 행은 기록되지 않으며 참조 테이블 상세 페이지에 오류가 표시됩니다.

## Datadog에서 위협 인텔리전스 데이터 보기 {#view-threat-intelligence-data-in-datadog}

참조 테이블에 Cloud SIEM 위협 인텔리전스 데이터를 활성화하려면 다음 단계를 따르세요.
1. [위협 인텔리전스][3]로 이동합니다.
1. Cloud SIEM 위협 인텔리전스 데이터를 확인하려는 테이블의 {{< ui >}}Enabled{{< /ui >}} 열에서 드롭다운 메뉴를 클릭하고 {{< ui >}}Cloud SIEM{{< /ui >}}을 선택합니다.

참조 테이블을 Cloud SIEM에 적용한 후 모든 수신 로그를 IP 주소나 도메인과 같은 특정 침해 지표(IoC) 키를 사용하여 참조 테이블과 비교하고 평가합니다. 일치하는 항목을 찾으면 표의 관련 위협 인텔리전스(TI) 특성으로 로그가 강화되고, 그러면 탐지, 조사 및 대응이 강화됩니다. 여러 보안 제품에서 위협 인텔리전스 참조 테이블을 공유할 수 있습니다.

[IOC 탐색기][11]에서 위협 인텔리전스 데이터를 확인할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/threat_intelligence/#threat-intelligence-sources
[2]: https://app.datadoghq.com/reference-tables/create
[3]: https://app.datadoghq.com/security/configuration/threat-intel
[4]: /ko/reference_tables/?tab=amazons3#create-a-reference-table
[5]: /ko/reference_tables/?tab=azurestorage#create-a-reference-table
[6]: /ko/reference_tables/?tab=googlecloudstorage#create-a-reference-table
[7]: /ko/reference_tables/
[8]: /ko/security/threat_intelligence/#threat-intelligence-categories
[9]: /ko/security/threat_intelligence/#threat-intelligence-intents
[10]: /ko/security/threat_intelligence#threat-intelligence-sources
[11]: /ko/security/cloud_siem/triage_and_investigate/ioc_explorer/