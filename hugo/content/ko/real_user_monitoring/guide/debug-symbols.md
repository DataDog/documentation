---
description: 디버그 심볼을 사용하여 RUM 내 스택 트레이스를 디버깅하고 난독화를 해제하여 난독화된 모바일 및 웹 애플리케이션의 오류를
  조사하세요.
title: RUM 디버그 심볼로 난독화된 스택 트레이스 조사
---
[RUM 디버그 심볼 페이지][1]에는 특정 유형의 RUM 애플리케이션에 업로드된 모든 디버그 심볼이 명시되어 있습니다. 이 페이지를 사용하여 난독화된 스택 트레이스 조사를 수행할 수 있습니다.

<div class="alert alert-info">소스 코드 해석을 위해 스택 트레이스를 서비스 및 버전과 자동으로 연결하려면 <a href="/real_user_monitoring/application_monitoring/browser/build_plugins/source_code_context">소스 코드 컨텍스트 빌드 플러그인</a>을 사용하세요.</div>

RUM 또는 Error Tracking에서 스택 트레이스 난독화 해제가 제대로 실행되지 않으면 다음 오류 메시지가 나타납니다. _이 애플리케이션에 적합한 디버그 심볼을 찾을 수 없어 스택 트레이스 난독화를 해제할 수 없습니다. 애플리케이션이 난독화된 상태가 아니라면 이 메시지를 무시하세요. 그렇지 않은 경우, 디버그 심볼을 업로드하여 난독화가 해제된 스택 트레이스를 확인합니다. RUM 디버그 심볼 페이지에서 업로드된 모든 심볼을 조회할 수 있습니다._

{{< img src="real_user_monitoring/guide/debug-symbols/deobfuscation-failed-message.png" alt="난독화 해제 실패: 이 애플리케이션에 대한 매핑 파일을 찾을 수 없어 스택 트레이스 난독화를 해제할 수 없습니다. 애플리케이션이 난독화된 상태가 아니라면 이 메시지를 무시하세요. 그렇지 않은 경우, 매핑 파일을 업로드하여 난독화가 해제된 스택 트레이스를 확인합니다. RUM 디버그 심볼 페이지에서 업로드된 모든 파일을 조회할 수 있습니다." >}}

다음과 같은 여러 원인으로 인해 문제가 발생할 수 있습니다.

### 스택 트레이스가 난독화되지 않은 상태입니다. {#the-stack-trace-was-not-obfuscated}

Datadog은 난독화되지 않은 스택 트레이스(예: 로컬 테스트 실행 또는 비프로덕션 빌드 등)를 비롯한 모든 스택 트레이스의 난독화 해제를 시도합니다.

이 경고는 무시해도 됩니다. 스택 트레이스는 이미 읽을 수 있는 상태입니다.

### 이 버전에 업로드된 디버그 심볼이 없습니다. {#no-debug-symbols-uploaded-for-this-version}

[RUM 디버그 심볼 페이지][1]를 사용하여 애플리케이션에 적합한 디버그 심볼이 있는지 확인하세요. 이 페이지는 {{< ui >}}type{{< /ui >}}(JavaScript, WebAssembly, Android, iOS, React Native, Flutter) 기준으로 필터링됩니다. 필터를 사용하여 찾으려는 디버그 심볼을 검색합니다.

애플리케이션에 적합한 디버그 심볼이 없다면 [업로드][2]를 실행합니다.

<div class="alert alert-danger">
각 디버그 심볼의 크기가 **500 MB** 제한치를 초과하지 않도록 주의하세요. 이를 초과할 경우 업로드가 거부됩니다.
iOS dSYM의 경우, 최대 **2 GB**의 개별 파일이 지원됩니다. 
</div>

### 디버그 심볼 태그 불일치 {#debug-symbol-tags-do-not-match}

Datadog은 디버그 심볼을 스택 트레이스와 일치시키기 위해 다양한 태그를 사용합니다. 이러한 태그는 애플리케이션 유형마다 다릅니다.

| 애플리케이션 유형 | 일치 작업에 사용되는 태그 조합 |
| ---- | ---- |
| JavaScript | `service`, `version`, `path`|
| WebAssembly | `build_id` |
| Android | v1.13.0+: `build_id`<br/> 이전 버전: `service`, `version`, `variant`|
| iOS | `uuid` |
| React Native | `service`, `version`, `bundle_name`, `platform`: 이 필드에서 여러 소스 맵이 일치하는 경우, `build_number`이 가장 높은 소스 맵이 선택됩니다. |
| Flutter | `service`, `version`, `variant`, `architecture` |

[RUM 디버그 심볼 페이지][1]에서 해당 태그의 값을 확인할 수 있습니다. 불일치 항목이 발견되면, 수정된 태그 세트로 디버그 심볼을 다시 업로드하세요.



[1]: https://app.datadoghq.com/source-code/setup/rum
[2]: /ko/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file