---
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: 블로그
  text: Datadog 신서틱(Synthetic) 모니터링 소개
- link: synthetics/
  tag: 설명서
  text: 신서틱(Synthetic) 모니터링에 대해 알아보기
- link: synthetics/browser_tests
  tag: 설명서
  text: 브라우저 테스트 설정
title: 테스트 파일 업로드 및 다운로드
---

## 개요

웹 애플리케이션에는 많은 로직이 포함될 수 있습니다. 엔드투엔드 테스트는 대부분 웹사이트 테스트용 기본 상호 작용(예: 클릭 및 입력 폼)으로 진행되지만, 애플리케이션에서 주요 비즈니스 트랜잭션이 실행되는지 확인하기 위해 한 단계 더 나아가 복잡한 상호작용을 검증해야 하는 경우도 있습니다.

## 파일 업로드 테스트

**파일을 업로드**하여 프로파일 생성 테스트를 위한 기능 워크플로의 최종 단계 유효성을 검사할 수 있습니다. 테스트 레코더 수준에서 파일을 업로드하면 Datadog Synthetic Monitoring 브라우저 테스트가 업로드된 파일을 자동 식별하고 [`Upload file`과 연관된 단계][1]를 생성합니다. 테스트 실행 시 해당 파일을 다시 업로드할 수 있습니다.

{{< img src="synthetics/guide/testing-a-downloaded-file/upload_file.mp4" alt="파일 업로드" video="true" width="100%">}}

## 파일 다운로드 테스트

**파일 다운로드**는 사용자가 웹 애플리케이션에서 흔히 하는 또 다른 작업입니다. 이커머스 웹사이트에서 주문 확인서를 다운로드하거나 은행 계좌 거래 내역을 PDF 또는 CSV로 내보내는 등의 작업이 이에 해당합니다.

Datadog 브라우저 테스트와 `Test a downloaded file` 어설션을 사용하면 웹 애플리케이션에서 다운로드 가능한 파일이 올바르게 제공되고 있는지(예: FTP 서버에서) 확인할 수 있습니다. 어설션을 사용하면 다운로드 가능한 파일의 파일 이름, 크기, 데이터가 올바른지 테스트할 수 있습니다.

다음에 따라 이 어설션으로 브라우저 테스트를 설정합니다.

1. **파일 다운로드를 생성하는 단계를 브라우저 테스트에 기록**합니다. 아래 예시는 `.docx` 파일 다운로드를 트리거하는 버튼 클릭을 기록하는 방법을 보여줍니다. 파일 크기는 250Mb 미만이어야 합니다.

    {{< img src="synthetics/guide/testing-a-downloaded-file/recording_step.mp4" alt="레코딩 단계" video="true">}}

2. **`Test a downloaded file` 어설션을 추가**하여 파일이 올바르게 다운로드되었는지 확인합니다.

    {{< img src="synthetics/guide/testing-a-downloaded-file/basic_assert.mp4" alt="어설션 추가" video="true">}}

     필요한 경우 파일 이름, 파일 크기, md5 문자열을 사용한 파일 무결성 등 몇 가지 고급 검증을 할 수도 있습니다.

    {{< img src="synthetics/guide/testing-a-downloaded-file/advanced_assert.mp4" alt="고급 인증" video="true">}}

     `Test a downloaded file` 어설션에 관해 자세히 알아보려면 [브라우저 테스트 어설션][2]의 전체 목록을 참조하세요.

3. 생성된 테스트 결과를 확인하여 **파일이 다운로드 되었고 어설션에서 설정한 요구 사항과 일치하는지 확인**합니다.

    {{< img src="synthetics/guide/testing-a-downloaded-file/test_results.png" alt="테스트 결과" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/browser_tests/actions/#upload-file
[2]: /ko/synthetics/browser_tests/actions/#assertion