---
description: API 테스트 오류 상세 설명
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱 모니터링 소개
- link: /synthetics/
  tag: 설명서
  text: 점검 관리
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트 설정
kind: 설명서
title: API 테스트 오류
---

## SSL 오류

API 테스트 실행 중에 SSL 오류가 발생할 수 있습니다. 이와 같은 오류는 SSL 테스트에서 어설션에 실패하는 것과는 다르며 API 테스트라면 어떤 유형에서나 발생할 수 있는 오류입니다.

{{< img src="synthetics/api_tests/ssl-self-signed-error.png" alt="SSL 자체 서명된 오류" style="width:60%;" >}}

| 에러                                | 설명                                                                                                                                                              |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CERT_CHAIN_TOO_LONG`                | 인증서 체인 길이가 최대 길이를 초과합니다.                                                                                                 |
| `CERT_HAS_EXPIRED`                   | 인증서가 만료되었습니다.                                                                                                                                              |
| `CERT_NOT_YET_VALID`                 | 아직 인증서 유효 날짜 전입니다.                                                                                                                        |
| `CERT_REJECTED`                      | 지정된 목적을 거부하도록 루트 CA가 마킹되어 있습니다.                                                                                                                   |
| `CERT_REVOKED`                       | 발급자가 인증서를 취소했습니다.                                                                                                                               |
| `CERT_UNTRUSTED`                     | 지정된 목적을 신뢰하지 않도록 루트 CA가 마킹되어 있습니다.                                                                                                           |
| `CERT_SIGNATURE_FAILURE`             | 인증서 서명이 유효하지 않습니다.                                                                                                                           |
| `CRL_HAS_EXPIRED`                    | CRL(인증서 해지 목록)이 만료되었습니다.                                                                                                                       |
| `CRL_NOT_YET_VALID`                  | 아직 CRL(인증서 해지 목록) 유효 날짜 전입니다.                                                                                                  |
| `CRL_SIGNATURE_FAILURE`              | 인증서의 CRL 서명이 유효하지 않습니다.                                                                                                                       |
| `DEPTH_ZERO_SELF_SIGNED_CERT`        | 전송된 인증서가 자체 서명된 것이며 신뢰할 수 있는 인증서 목록에서 같은 인증서를 찾을 수 없습니다.                                                      |
| `ERROR_IN_CERT_NOT_AFTER_FIELD`      | 인증서의 notAfter 필드에 형식 오류가 있습니다.                                                                                                        |
| `ERROR_IN_CERT_NOT_BEFORE_FIELD`     | 인증서의 notBefore 필드에 형식 오류가 있습니다.                                                                                                       |
| `ERROR_IN_CRL_LAST_UPDATE_FIELD`     | CRL lastUpdate 필드에 유효하지 않은 시간이 포함되어 있습니다.                                                                                                                       |
| `ERROR_IN_CRL_NEXT_UPDATE_FIELD`     | CRL nextUpdate 필드에 유효하지 않은 시간이 포함되어 있습니다.                                                                                                                       |
| `INVALID_CA`                         | CA가 아니거나 확장 요소가 의도 목적과 일관하지 않는 등 CA 인증서가 유효하지 않습니다.                                                     |
| `INVALID_PURPOSE`                    | 제공된 인증서를 의도한 목적으로 사용할 수 없습니다.                                                                                               |
| `OUT_OF_MEM`                         | 메모리를 할당하는 중에 오류가 발생했습니다.                                                                                                                               |
| `PATH_LENGTH_EXCEEDED`               | basicConstraints 경로 길이 파라미터를 초과했습니다.                                                                                                                  |
| `SELF_SIGNED_CERT_IN_CHAIN`          | 인증서 체인에 자체 서명된 인증서가 있습니다. 신뢰할 수 없는 인증서를 사용해 인증서 체인을 빌드할 수 있으나 로컬 루트 CA를 찾을 수 없습니다. |
| `UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY` | 인증서 내 공용 키를 읽을 수 없습니다.                                                                                                                        |
| `UNABLE_TO_DECRYPT_CERT_SIGNATURE`   | 인증서 서명을 암호 해독할 수 없습니다.                                                                                                                      |
| `UNABLE_TO_DECRYPT_CRL_SIGNATURE`    | CRL 서명을 암호 해독할 수 없습니다(실제 서명 값을 결정할 수 없습니다).                                                                                |
| `UNABLE_TO_GET_CRL`                  | CRL(인증서 해지 목록)을 찾을 수 없습니다.                                                                                                                      |
| `UNABLE_TO_GET_ISSUER_CERT`          | 서명 계층에 CA(인증 기관)를 찾을 수 없는 인증서가 있고 해당 CA가 로컬 애플리케이션에서 신뢰할 수 없는 것입니다.               |
| `UNABLE_TO_GET_ISSUER_CERT_LOCALLY`  | 로컬 인증서의 발급자 인증서를 찾을 수 없습니다. 일반적으로 신뢰할 수 없는 인증서 목록에 누락이 있다는 뜻입니다.                            |
| `UNABLE_TO_VERIFY_LEAF_SIGNATURE`    | 인증서 체인에 인증서가 하나밖에 없으며, 해당 인증서가 자체 서명되었고 신뢰할 수 없는 발급자이기 때문에 서명이 인증되지 않았습니다.                         |