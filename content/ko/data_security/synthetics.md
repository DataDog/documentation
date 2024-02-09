---
aliases:
- /ko/synthetics/security/
further_reading:
- link: /data_security/
  tag: 설명서
  text: Datadog에 제출된 주요 데이터 카테고리 검토
kind: 설명서
title: 신서틱(Synthetic) 모니터링 데이터 보안
---

<div class="alert alert-info">이 페이지는 Datadog으로 전송되는 데이터의 보안에 관한 것입니다. 클라우드 및 애플리케이션 보안 제품 및 기능을 찾으려면 <a href="/security/" target="_blank">보안</a> 섹션을 참조하세요.</div>

 [신서틱 모니터링 제품][2]은 사용자가 시뮬레이션된 요청과 비즈니스 트랜잭션을 사용해 선제적으로 시스템과 애플리케이션의 실행 방식을 모니터링할 수 있도록 해줍니다. 신서틱 테스트는 관리 위치 또는 비공개 위치 여부와 관계없이 전 세계 어디에서나 실행할 수 있습니다.

## 정보 보안

### 관리 위치의 암호화

#### 설정 및 변수 테스트

* **전송**: 비대칭 암호화 - RSA(4096비트 키). 모든 요청은 Datadog 서명 v1([AWS Signature v4][3]와 동일한 서명 프로세스 기준)을 사용해 서명되어 인증과 무결성을 보장합니다.
* **스토리지**: 대칭 암호화 - AES-GCM(256비트 키)

#### 테스트 결과

* **전송**: 비대칭 암호화 - RSA(4096비트 키). 모든 요청은 Datadog 서명 v1([AWS Signature v4][3]와 동일한 서명 프로세스 기준)을 사용해 서명되어 인증과 무결성을 보장합니다.
* **스토리지**: 테스트 결과의 민감한 부분(응답 머리글 및 본문)은 비대칭 암호화 - RSA(4096비트 키)를 통해 암호화되어 저장됩니다. 테스트 결과가 전달되면 바로 복호화됩니다.

#### 아티팩트

아티팩트는 브라우저 테스트 스크린샷, 스냅샷, 오류 및 리소스입니다.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **스토리지**: [Amazon S3 버킷][1]을 암호화합니다.
* **전송**: [S3용 AWS 서명 버전 4][2]를 사용해 암호화 전송 중입니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **스토리지**: ([AES256][2]를 사용해) [GCS 서비스 계정][1]을 통해 암호화합니다.
* **전송**: [GCS용 인증, 무결성 및 암호화][3]를 사용해 암호화 전송 중입니다.

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

### 비공개 위치 암호화

#### 비공개 위치 자격 증명

* **스토리지**: 테스트 설정, 변수 및 테스트 결과 요청을 서명하는 데 사용되는 비공개 위치 자격 증명은 암호화되어 감사 로그와 액세스 정책과 함께 저장됩니다(비대칭 암호화 - AES-GCM)

#### 설정 및 변수 테스트

* **전송**: 비대칭 암호화 - RSA(4096비트 키). 비공개 위치 및 Datadog 간 통신은 Datadog 서명 v1([AWS Signature v4][3]와 동일한 서명 프로세스 기준)을 사용해 서명되어 인증과 무결성을 보장합니다.
* **스토리지**: 대칭 암호화 - AES-GCM(256비트 키)

#### 테스트 결과

* **전송**: 비대칭 암호화 - RSA(4096비트 키). 비공개 위치 및 Datadog 간 통신은 Datadog 서명 v1([AWS Signature v4][3]와 동일한 서명 프로세스 기준)을 사용해 서명되어 인증과 무결성을 보장합니다.

* **스토리지**: 테스트 결과의 민감한 부분(기본적으로 응답 머리글 및 본문)은 비대칭 암호화 - RSA(4096비트 키)를 통해 암호화되어 저장됩니다. 테스트 결과가 전달되면 바로 복호화됩니다.

#### 아티팩트

아티팩트는 브라우저 테스트 스크린샷, 스냅샷, 오류 및 리소스입니다.

{{< site-region region="us,us3,us5,gov,ap1" >}}

* **스토리지**: [AWS][1]를 암호화합니다.
* **전송**: 비공개 위치 및 Datadog 간 HTTPS 전송(API 키) 간 HTTPS 전송, 그 이후 Datadog에서 스토리지로의 전송이 이뤄집니다. [S3용 AWS 서명 버전 4][2]를 사용해 암호화 전송 중입니다.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/network-isolation.html

{{< /site-region >}}

{{< site-region region="eu" >}}

* **스토리지**: ([AES256][2]를 사용해) [GCS 서비스 계정][1]을 통해 암호화합니다.
* **전송**: 비공개 위치 및 Datadog 간 HTTPS 전송(API 키) 간 HTTPS 전송, 그 이후 Datadog에서 스토리지로의 전송이 이뤄집니다. [GCS용 인증, 무결성 및 암호화][3]를 사용해 암호화 전송 중입니다.

[1]: https://cloud.google.com/storage/docs/encryption/customer-managed-keys
[2]: https://cloud.google.com/security/encryption-at-rest/default-encryption
[3]: https://cloud.google.com/security/encryption-in-transit/resources/encryption-in-transit-whitepaper.pdf

{{< /site-region >}}

## 테스팅 계정

신서틱 테스트를 위한 전용 계정을 활용할 것을 강력히 권장합니다.

## 기밀 보관

난독화 기능을 통해 [글로벌 변수][4]로 기밀을 저장하여 글로벌 변수 값이 테스트 설정과 결과에 유출되지 않도록 보장할 수 있습니다. 이후 전용 [글로벌 변수 RBAC 권한][5]을 사용한 글로벌 변수 액세스가 제한됩니다.

## 개인 정보 보호 옵션

[API][6], [Multistep API][7] 및 [브라우저 테스트의 개인정보보호 옵션][8]을 사용해 테스트 결과에 저장되는 데이터 양을 제한할 수 있습니다. 하지만 이러한 옵션을 사용하면(활성화하면) 실패 트러블슈팅이 더욱 어려워질 수 있음에 유의하세요.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/data_security/
[2]: /ko/synthetics/
[3]: https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html
[4]: /ko/synthetics/settings/?tab=specifyvalue#global-variables
[5]: /ko/account_management/rbac/permissions/#synthetic-monitoring
[6]: /ko/synthetics/api_tests/http_tests?tab=privacy#define-request
[7]: /ko/synthetics/multistep?tab=privacy#define-the-request
[8]: /ko/synthetics/browser_tests/?tab=privacy#test-configuration