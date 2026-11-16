---
aliases:
- /ko/dynamic_instrumentation/expression-language
- /ko/tracing/dynamic_instrumentation/expression-language
private: false
title: Live Debugger 및 Dynamic Instrumentation을 위한 표현식 언어
---
## 개요 {#overview}

[Live Debugger][1] 및 [Dynamic Instrumentation][2]은 이 표현식 언어를 사용하여 실행 중인 코드에서 값을 읽고 조건, 메트릭 및 스팬 태그를 정의합니다. 이 표현식 언어는 지역 변수, 메서드 파라미터, 중첩된 객체 필드에 대한 액세스와 비교 및 논리 연산자를 지원합니다. 일반적인 프로그래밍 언어의 구문을 차용하지만 고유한 규칙을 가지고 있습니다.

예:
- `someVar.someField`
- `request.headers["Host"]`
- `any(post.tags, {@it == "debugger"})`
- `@duration > 10 && len(p.data) < 100`

표현식 지원 여부는 런타임 버전 및 계측 위치에 따라 다릅니다. 일반적으로 표현식 언어는 다음을 지원합니다.
* 지역 변수, 메서드 파라미터, 객체 내의 깊게 중첩된 필드 및 속성에 액세스
* 비교 연산자(`<`, `>`, `>=`, `<=`, `==`, `!=`, `instanceof`)를 사용하여 조건 내에서 변수, 필드 및 상수를 비교(예: `localVar1.field1.field2 != 15`)
* 논리 연산자(`&&`, `||`, `!` 또는 `not(...)`)를 사용하여 복잡한 불리언 조건을 작성(예: `!isEmpty(user.email) && not(contains(user.name, "abc"))`)
* `null` 리터럴 사용(Python에서는 `None`, Ruby에서는 `nil`으로 자동 변환됨)

지원하지 **않는** 기능:
* 메서드 호출 Dynamic Instrumentation은 부작용을 일으킬 수 있는 코드 실행을 허용하지 않습니다. 하지만 `private` 필드에는 직접 액세스할 수 있습니다.
* `i + 1`과 같은 산술 연산
* 이 페이지에 설명된 것 이외의 다른 네이티브 프로그래밍 언어 구문

표현식 언어를 사용할 때 사용자 경험을 개선하려면 [자동 완성 및 검색(미리 보기 제공)](/dynamic_instrumentation/symdb/)을 사용해 보세요.

## 애플리케이션 {#applications}

표현식은 메트릭을 생성하거나 필터링된 데이터를 내보내기 위한 조건으로 사용할 수 있습니다.

예를 들어, `len(data)`을 메트릭 표현식으로 사용하여 문자열 길이로부터 히스토그램을 생성할 수 있습니다. 메트릭 표현식은 숫자로 평가되어야 합니다.

Live Debugger 로그 메시지 및 Dynamic Instrumentation 스팬 태그 값에서는 표현식을 중괄호로 묶으세요(예: `User name is {user.name}`). 이러한 표현식은 어떤 값으로든 평가될 수 있습니다.

계측 조건은 불리언 값으로 평가되어야 합니다. 예:
 - `startsWith(user.name, "abc")`
 - `len(str) > 20`
 - `a == b`
 - `user.isActive == true`

## 컨텍스트 변수 {#contextual-variables}

사용 가능한 컨텍스트 변수는 계측 위치에 따라 다릅니다. `@return` 및 `@duration`은 메서드 종료 시 사용할 수 있습니다. `@it`은 컬렉션 조건자 내부에서 사용됩니다.

| 키워드     | 설명                                                                |
|-------------|----------------------------------------------------------------------------|
| `@return`   | 메서드 반환 값에 대한 액세스를 제공합니다. |
| `@duration` | 밀리초 단위의 부동 소수점 값으로 메서드 호출 실행 시간에 대한 액세스를 제공합니다. |
| `@exception`| 메서드 내에서 발생한 예외에 대한 액세스를 제공합니다(처리되지 않은 예외가 존재하는 경우에만 사용 가능). |
| `@it`       | 컬렉션 반복 중에 현재 요소에 대한 액세스를 제공합니다. 목록 작업의 조건자에 사용됩니다. |

## 일반 작업 {#general-operations}

다음 예시는 값이 `Hello, world!`인 `myString`이라는 변수를 가정합니다.

| 작업 | 설명 | 예시 |
|-----------|-------------|---------|
| `isDefined(var)` | 변수가 정의되었는지 확인합니다. 변수가 현재 범위에 존재하면 `true`를 반환하고, 그렇지 않으면 `false`를 반환합니다. 변수가 존재하지 않을 수 있는 경우 조건부 논리에 유용합니다. | {{< expression-language-evaluator expression="isDefined(myString)" >}} |
| `len(value_src)` | 문자열 길이를 가져옵니다. | {{< expression-language-evaluator expression="len(myString)" >}} |
| `isEmpty(value_src)` | 문자열이 비어 있는지 확인합니다. `len(value_src) == 0`과 동일합니다. | {{< expression-language-evaluator expression="isEmpty(myString)" >}} |
| `substring(value_src, startIndex, endIndex)` | 부분 문자열을 가져옵니다. | {{< expression-language-evaluator expression="substring(myString, 0, 2)" >}} |
| `startsWith(value_src, string_literal)` | 문자열이 주어진 문자열 리터럴로 시작하는지 확인합니다. | {{< expression-language-evaluator expression="startsWith(myString, \"He\")" >}} |
| `endsWith(value_src, string_literal)` | 문자열이 주어진 문자열 리터럴로 끝나는지 확인합니다. | {{< expression-language-evaluator expression="endsWith(myString, \"rdl!\")" >}} |
| `contains(value_src, string_literal)` | 문자열에 문자열 리터럴이 포함되어 있는지 또는 컬렉션에 요소가 포함되어 있는지 확인합니다. | {{< expression-language-evaluator expression="contains(myString, \"ll\")" >}} |
| `matches(value_src, string_literal)` | 문자열이 문자열 리터럴로 제공된 정규식과 일치하는지 확인합니다. | {{< expression-language-evaluator expression="matches(myString, \"^H.*!$\")" >}} |

## 컬렉션 작업 {#collection-operations}

순차적 컬렉션에 대한 조건자에서 `@it`을 사용하세요. 자세한 내용은 [컨텍스트 변수](#contextual-variables) 섹션을 참조하세요.

다음 예시는 값이 `[1,2,3,4]`인 `mySequence` 변수와 값이 `{"a": 1, "b": 2, "c": 3}`인 `myMap` 변수를 가정합니다.

| 작업 | 설명 | 예시 |
|-----------|-------------|---------|
| `len(value_src)` | 컬렉션 크기를 가져옵니다. | {{< expression-language-evaluator expression="len(mySequence)" >}} {{< expression-language-evaluator expression="len(myMap)" >}}  |
| `isEmpty(value_src)` | 컬렉션이 비어 있는지 확인합니다. `len(value_src) == 0`과 동일합니다. | {{< expression-language-evaluator expression="isEmpty(mySequence)" >}} {{< expression-language-evaluator expression="isEmpty(myMap)" >}} |
| `[ i ]`, `[ key ]` | 순차적 컨테이너의 경우 컬렉션의 `i`번째 항목을 반환합니다(`i`는 정수여야 합니다). 사전의 경우 `key`에 해당하는 값을 반환합니다(`key`는 사전의 키 유형과 일치해야 합니다). 항목이 존재하지 않으면 언어에 따라 표현식이 오류를 발생시키거나 null을 반환합니다. | {{< expression-language-evaluator expression="mySequence[3]" >}} {{< expression-language-evaluator expression="myMap[\"b\"]" >}} |
| `any(value_src, {predicate})` | 주어진 조건자를 만족하는 요소가 컬렉션에 하나 이상 있는지 확인합니다. 현재 요소는 순차적 컨테이너에 대한 `@it` 참조로 액세스됩니다. | {{< expression-language-evaluator expression="any(mySequence, {@it > 2})" >}} |
| `all(value_src, {predicate})` | 컬렉션의 모든 요소가 지정된 조건자를 만족하는지 확인합니다. 현재 요소는 `@it` 참조를 사용하여 액세스됩니다. | {{< expression-language-evaluator expression="all(mySequence, {@it > 2})" >}} |
| `filter(value_src, {predicate})` | 조건자를 사용하여 컬렉션의 요소를 필터링합니다. 현재 요소는 `@it` 참조를 사용하여 액세스됩니다. | {{< expression-language-evaluator expression="filter(mySequence, {@it > 1})" >}} |

## 직접 조건을 테스트해 보세요 {#try-your-own-conditions}

이 대화형 시뮬레이터는 실제와 유사한 환경에서 표현식 언어 구문을 실험하는 데 도움을 줍니다. 메서드를 계측할 때 조건이 데이터 캡처 여부에 어떤 영향을 미치는지 보여줍니다.

표현식 지원 및 누락된 값 처리는 애플리케이션에 따라 다를 수 있습니다.

예시 중 하나를 선택하거나 'when' 필드에 표현식을 입력한 다음 'SIMULATE'를 클릭하여 조건에 따라 데이터가 캡처되는지 확인하세요.

이 예시에서 사용 가능한 변수:

- `loops`: `5`로 하드코딩된 경로 파라미터
- `myString`: 문자열 `"Hello, world!"`
- `mySequence`: 정수 배열 `[1, 2, 3, 4]`
- `myMap`: 사전 `{"a": 1, "b": 2, "c": 3}`
- `i`: 현재 루프 반복 인덱스

{{< expression-language-simulator >}}

[1]: /ko/tracing/live_debugger/
[2]: /ko/dynamic_instrumentation/