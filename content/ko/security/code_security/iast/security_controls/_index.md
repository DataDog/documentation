---
aliases:
- /ko/security/application_security/code_security/iast
disable_toc: false
title: 보안 컨트롤
---


Security Controls는 이스케이프 및 삭제를 사용하여 취약성 탐지에서 오탐 보고를 방지합니다. 보안 함수는 데이터 처리 방식을 세분화하여 적절한 변경 사항이 불필요한 보안 경고를 트리거하지 않도록 합니다.

## Input Validator 및 Sanitizer 비교

Security Controls는 보안 유효성 검사에서 함수를 사용하는 방식에 따라 **Input Validator** 및 "Sanitizer**를 구분합니다.

- **Input Validator**: 함수가 전달된 파라미터를 검증하는 경우 사용됩니다. Validator는 사용자 입력이 처리되기 전 해당 입력이 예상되는 형식을 준수하도록 합니다. 
- **Sanitizer**: 함수가 애플리케이션에서 반환 값이 사용되기 전 반환 값을 검증하거나 수정하는 경우 사용됩니다. Sanitizer는 데이터 삭제를 지원하여 잠재적으로 유해한 콘텐츠를 포함하지 않도록 보장합니다.

## 보안 제어 설정하기

Security Controls 정의는 설정 변수 `DD_IAST_SECURITY_CONTROLS_CONFIGURATION`에 배치해야 합니다.
보안 제어 목록을 설정하려면 아래의 형식과 필드 사양을 따르세요.
이 형식은 특정 구분 기호를 사용하여 각 보안 제어 항목을 구성합니다.

### 형식

`<TYPE>:<SECURE_MARKS>:<CLASS/FILE>:<METHOD>:<PARAMETERS (Optional)>:<PARAMETERS TO VALIDATE (Optional)>`

### 필드 사양
| **필드**                             | **설명**                                                                                                                                                                                         |
|---------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **유형**                              | 제어 유형을 정의합니다. **허용되는 값은 `INPUT_VALIDATOR` 또는 `SANITIZER`입니다.**                                                                                                                     |
| **보안 마크**                      | 적용할 취약성 유형 목록입니다. 사용 가능한 값은 [보안 마크](#secure-marks)에 정의되어 있습니다. 부수적으로 `*`을 사용하여 모든 유형에 대한 적용 가능성을 표시할 수 있습니다.                                         |
| **클래스/파일**                        | 보안 제어를 구현하는 정규화된 클래스 또는 파일입니다.                                                                                                                                        |
| **메서드**                            | 보안 제어를 구현하는 메서드의 이름입니다.                                                                                                                                                   |
| **파라미터(선택 사항)**             | 완전한 적격 클래스 파라미터입니다. 오버로드 메서드를 구분하는 데 사용됩니다. 생략 또는 오버로드가 존재하는 경우 보안 제어가 모든 오버로드 메서드에 적용됩니다.                 |
| **검증할 파라미터(선택 사항)** | 검증할 파라미터 포지션의 0 기반 목록입니다. 첫 번째 파라미터 는 **0** 위치입니다. 이 필드는 `INPUT_VALIDATOR` **유형에만** 적용됩니다. **일부 파라미터에 대해 유효성 검사가 필요하지 않은 경우** 사용됩니다. |


### 구분 기호
- `;` (세미콜론): 각 보안 제어를 구분합니다.
- `:` (콜론): 보안 제어 내의 각 필드를 구분합니다.
- `,` (쉼표): 목록을 허용하는 필드 내에서 항목을 구분합니다.

### 보안 마크

사용 가능한 보안 마크는 각 삽입 관련 취약성과 관련된 코드에 대응합니다. [지원되는 취약성][1]에서 해당 코드와 각 언어에 대해 사용 가능한지 여부를 확인할 수 있습니다.

삽입 관련 취약점은 다음과 같습니다.

* 코드 삽입
* 명령 삽입
* 이메일 HTML 삽입
* 헤더 삽입
* LDAP 삽입
* NoSQL 삽입
* 경로 탐색
* 반사 삽입
* 서버 측 요청 위조(SSRF)
* SQL 삽입
* 신뢰 경계 위반
* 신뢰할 수 없는 역직렬화
* 유효하지 않은 리디렉션
* XPath 삽입
* 사이트 간 스크립팅(XSS)

## 호환성 요구 사항

이 기능은 각 언어의 다음 추적 라이브러리 버전부터 사용할 수 있습니다.

* **자바(Java)**: 1.45.0 이상
* **.NET**: 지원되지 않음
* **Node.js**: 5.37.0 이상
* **파이썬(Python)**: 지원되지 않음


## 예시

{{% collapse-content title="Java" level="h4" %}}

### Input Validator

#### 모든 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
`bar.foo.CustomInputValidator#validate(String input1, String input2)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate`

#### 단일 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomInputValidator#validate(String input1, String inputToValidate)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1`

#### 2개의 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomInputValidator#validate(String input1, String firstInputToValidate, String secondInputToValidate, Object anotherInput)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:1,2
`
#### 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성과 코드 삽입 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomInputValidator#validate(String input)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomInputValidator:validate
`
#### 입력 파라미터를 검증하는 메서드로 모든 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomInputValidator#validate(String input)`

##### 설정
`INPUT_VALIDATOR:*:bar.foo.CustomInputValidator:validate
`
#### 입력 파라미터를 검증하는 오버로드 메서드로 명령 삽입 취약성을 방지합니다.

##### 메서드
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate:java.lang.String
`
##### 참고
첫 번째 메서드를 적용합니다.


#### 입력 파라미터를 검증하는 오버로드 메서드로 명령 삽입 취약성을 방지합니다.

##### 메서드
 `bar.foo.CustomInputValidator#validate(String input)`

 `bar.foo.CustomInputValidator#validate(String input, String input2)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar.foo.CustomInputValidator:validate
`
##### 참고
두 가지 메서드 모두에 적용됩니다.

### Sanitizer

#### Sanitizer로 명령 삽입 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 설정
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### Sanitizer로 명령 삽입 및 코드 삽입 취약성을 방지합니다.

##### 방법
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 설정
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar.foo.CustomSanitizer:sanitize
`
#### 모든 취약성을 방지하는 Sanitizer입니다.

##### 방법
 `bar.foo.CustomSanitizer#sanitize(String input)`

##### 설정
`SANITIZER:*:bar.foo.CustomSanitizer:sanitize
`
#### 오버로드 Sanitizer로 명령 삽입 취약성을 방지합니다.

##### 메서드
 `bar.foo.CustomSanitizer#sanitize(String input)`

 `bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### 설정
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize:자바(Java).lang.String
`
##### 참고
첫 번째 메서드를 적용합니다.

#### 오버로드 Sanitizer로 명령 삽입 취약성을 방지합니다.

##### 메서드
` bar.foo.CustomSanitizer#sanitize(String input)`

`bar.foo.CustomSanitizer#sanitize(String input, String input2)`

##### 설정
`SANITIZER:COMMAND_INJECTION:bar.foo.CustomSanitizer:sanitize
`
##### 참고
두 가지 메서드 모두에 적용됩니다.

{{% /collapse-content %}}


{{% collapse-content title="Node.js" level="h4" %}}

### Input Validator

#### 모든 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_validator.js#validate(input1, input2)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate`

#### 단일 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_validator.js#validate(input1, inputToValidate)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1`

#### 2개의 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_validator.js#validate(input1, firstInputToValidate, secondInputToValidate, anotherInput)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validate:1,2`

#### 입력 파라미터를 검증하는 메서드로 명령 삽입 취약성과 코드 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_validator.js#validate(input)`

##### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_validator.js:validate`

#### 입력 파라미터를 검증하는 메서드로 모든 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_validator.js#validate(input)`

##### 설정
`INPUT_VALIDATOR:*:bar/foo/custom_input_validator.js:validate`

### Sanitizer

#### Sanitizer로 명령 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 설정
`SANITIZER:COMMAND_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### Sanitizer로 명령 삽입 및 코드 삽입 취약성을 방지합니다.

##### 방법
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 설정
`SANITIZER:COMMAND_INJECTION,CODE_INJECTION:bar/foo/custom_input_sanitizer.js:sanitize`

#### 모든 취약성을 방지하는 Sanitizer입니다.

##### 방법
`bar/foo/custom_input_sanitizer.js#sanitize(input)`

##### 설정
`SANITIZER:*:bar/foo/custom_input_sanitizer.js:sanitize`

### 특수 사례

#### 내보내기한 개체 내의 보안 제어 메서드
`validate` 메서드는 명령 삽입 취약성을 방지하기 위해 입력 파라미터를 검증하는 `validators` 개체 내부로 내보내기됩니다.

```javascript
// bar/foo/custom_input_validator.js
module.exports = {
  validators: {
    validate: (input) => {
      /* validation process */
    }
  }
}
```

#### 설정
`INPUT_VALIDATOR:COMMAND_INJECTION:bar/foo/custom_input_validator.js:validators.validate`

#### 전이적 종속성을 통한 보안 제어 메서드
`npm` 플랫 종속성 구조로 인해 직접 종속성과 전이적 종속성을 구분할 수 없습니다. 즉, 종속성 내에 보안 제어가 정의되어 있으면 해당 종속성의 모든 인스턴스(직접 또는 전이)가 영향을 받습니다.

다음 보안 제어 정의는 종속성 트리에 있는 모든 `sql-sanitizer` 패키지에 영향을 줍니다.

#### 설정
`SANITIZER:SQL_INJECTION:node_modules/sql-sanitizer/index.js:sanitize`


{{% /collapse-content %}}

[1]: /ko/security/code_security/iast/#overview