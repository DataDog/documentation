---
description: Static Analysis에 대한 여러 언어의 규칙을 확인하세요.
further_reading:
- link: /continuous_integration/static_analysis/
  tag: 설명서
  text: Datadog Static Analysis에 대해 알아보기
is_beta: true
kind: 도움말
python_best_practices_data:
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-class-name
  tag: ambiguous-class-name
  text: 읽을 수 있는 클래스 이름 정하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-function-name
  tag: ambiguous-function-name
  text: 읽을 수 있는 함수 이름 정하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/ambiguous-variable-name
  tag: ambiguous-variable-name
  text: 읽을 수 있는 변수 이름 정하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/any-type-disallow
  tag: any-type-disallow
  text: Any 유형 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/argument-same-name
  tag: argument-same-name
  text: 같은 이름의 인수가 없도록 하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/assertraises-specific-exception
  tag: assertraises-specific-exception
  text: assertRaises는 특정 예외를 확인해야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/avoid-duplicate-keys
  tag: avoid-duplicate-keys
  text: 사전에서 중복 키 피하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/avoid-string-concat
  tag: avoid-string-concat
  text: 문자열 연결 피하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/class-methods-use-self
  tag: class-methods-use-self
  text: 클래스 메서드는 self를 사용할 수 없음
- link: /continuous_integration/static_analysis/rules/python-best-practices/collection-while-iterating
  tag: collection-while-iterating
  text: 반복하는 동안 사전 수정하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/comment-fixme-todo-ownership
  tag: comment-fixme-todo-ownership
  text: TODO 및 FIXME 코멘트는 소유권이 있어야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/comparison-constant-left
  tag: comparison-constant-left
  text: 비교에서 변수는 그대로 두어야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/condition-similar-block
  tag: condition-similar-block
  text: if 조건은 다른 코드 블록이어야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/ctx-manager-enter-exit-defined
  tag: ctx-manager-enter-exit-defined
  text: __exit__와 __enter__가 모두 정의되었는지 확인
- link: /continuous_integration/static_analysis/rules/python-best-practices/dataclass-special-methods
  tag: dataclass-special-methods
  text: 데이터 클래스에 특수 메서드 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/equal-basic-types
  tag: equal-basic-types
  text: check equal은 일관된 기본 유형에 사용됨
- link: /continuous_integration/static_analysis/rules/python-best-practices/exception-inherit
  tag: exception-inherit
  text: 예외가 기본 예외를 상속하는지 확인
- link: /continuous_integration/static_analysis/rules/python-best-practices/finally-no-break-continue-return
  tag: finally-no-break-continue-return
  text: finally 블록에서 break나 continue 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/function-already-exists
  tag: function-already-exists
  text: 함수는 한 번만 정의해야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/function-variable-argument-name
  tag: function-variable-argument-name
  text: 함수 인수에 할당하지 않아야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/generic-exception-last
  tag: generic-exception-last
  text: 제네릭 예외를 사용하는 경우 마지막에 두어야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/get-set-arguments
  tag: get-set-arguments
  text: getter/setter는 각각 한 개 또는 두 개의 인수를 가져야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/if-return-no-else
  tag: if-return-no-else
  text: if 조건이 값을 반환하는 경우 else는 필요하지 않음
- link: /continuous_integration/static_analysis/rules/python-best-practices/import-modules-twice
  tag: import-modules-twice
  text: 모듈을 두 번 가져옴
- link: /continuous_integration/static_analysis/rules/python-best-practices/import-single-module
  tag: import-single-module
  text: import statement 당 하나의 모듈만 가져옴
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-call-parent
  tag: init-call-parent
  text: super()를 사용하여 상위 생성자 호출하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-method-required
  tag: init-method-required
  text: 클래스에  __init__ 메서드가 있는지 확인하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/init-no-return-value
  tag: init-no-return-value
  text: __init__ 함수로 반환하지 않음
- link: /continuous_integration/static_analysis/rules/python-best-practices/invalid-strip-call
  tag: invalid-strip-call
  text: strip() 인수에 중복 문자가 없어야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/logging-no-format
  tag: logging-no-format
  text: 로깅 함수에 형식 문자열 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/method-hidden
  tag: method-hidden
  text: 메서드가 속성과 같은 이름을 가짐
- link: /continuous_integration/static_analysis/rules/python-best-practices/nested-blocks
  tag: nested-blocks
  text: 너무 많은 중첩된 블록을 갖지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-assert
  tag: no-assert
  text: 프로덕션 코드에 assert 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-assert-on-tuples
  tag: no-assert-on-tuples
  text: 튜플에 assert 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-bare-except
  tag: no-bare-except
  text: bare except 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-bare-raise
  tag: no-bare-raise
  text: 특별한 예외가 없는 한 raise 스테이트먼트는 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-base-exception
  tag: no-base-exception
  text: 기본 예외를 발생시키지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-datetime-today
  tag: no-datetime-today
  text: datetime.today() 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-double-not
  tag: no-double-not
  text: 이중 부정 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-double-unary-operator
  tag: no-double-unary-operator
  text: 연산자 --와 ++ 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-duplicate-base-class
  tag: no-duplicate-base-class
  text: 기본 클래스는 한 번만 사용하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-equal-unary
  tag: no-equal-unary
  text: 연산자 =+와 =- 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-exit
  tag: no-exit
  text: exit() 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-generic-exception
  tag: no-generic-exception
  text: 제네릭 예외 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-if-true
  tag: no-if-true
  text: 조건에서 True와 비교하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-range-loop-with-len
  tag: no-range-loop-with-len
  text: range(len(<array>))에서 for i 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/no-silent-exception
  tag: no-silent-exception
  text: 패스 스테이트먼트가 있는 예외 무시하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/open-add-flag
  tag: open-add-flag
  text: 읽기 전용에서는 오픈 플래그 정의하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/os-environ-no-assign
  tag: os-environ-no-assign
  text: os.environ에 할당해도 환경은 지워지지 않음
- link: /continuous_integration/static_analysis/rules/python-best-practices/raising-not-implemented
  tag: raising-not-implemented
  text: NotImplemented를 발생시키지 말 것 - 존재하지 않음
- link: /continuous_integration/static_analysis/rules/python-best-practices/return-bytes-not-string
  tag: return-bytes-not-string
  text: __bytes__ 메서드는 문자열이 아니라 바이트를 반환해야 함
- link: /continuous_integration/static_analysis/rules/python-best-practices/return-outside-function
  tag: return-outside-function
  text: 함수 외부로 반환하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/self-assignment
  tag: self-assignment
  text: 자신에게 할당하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/slots-no-single-string
  tag: slots-no-single-string
  text: __slots__가 단일 문자열이어서는 안 됨
- link: /continuous_integration/static_analysis/rules/python-best-practices/special-methods-arguments
  tag: special-methods-arguments
  text: 특수 메서드에 올바른 인수가 있는지 확인하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/static-method-no-self
  tag: static-method-no-self
  text: 정적 메서드에 파라미터로 self 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/too-many-nested-if
  tag: too-many-nested-if
  text: 중첩된 if 조건을 너무 많이 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/too-many-while
  tag: too-many-while
  text: 중첩된 루프 및 조건을 너무 많이 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-best-practices/type-check-isinstance
  tag: type-check-isinstance
  text: type 대신 isinstance 사용하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/unreachable-code
  tag: unreachable-code
  text: 도달할 수 없는 코드 피하기
- link: /continuous_integration/static_analysis/rules/python-best-practices/use-callable-not-hasattr
  tag: use-callable-not-hasattr
  text: 값이 호출 가능한지 알아보기 위해 hasattr 사용하지 않기
python_code_style_data:
- link: /continuous_integration/static_analysis/rules/python-code-style/assignment-names
  tag: assignment-names
  text: 변수 이름은 snake_case이어야 함
- link: /continuous_integration/static_analysis/rules/python-code-style/class-name
  tag: class-name
  text: 클래스 이름은 카멜 케이스여야함
- link: /continuous_integration/static_analysis/rules/python-code-style/function-naming
  tag: function-naming
  text: 함수 이름과 파라미터에 반드시 snake_case 사용하기
- link: /continuous_integration/static_analysis/rules/python-code-style/max-class-lines
  tag: max-class-lines
  text: 클래스는 100 줄 미만이어야 함
- link: /continuous_integration/static_analysis/rules/python-code-style/max-function-lines
  tag: max-function-lines
  text: 함수는 200줄 미만이어야 함
python_design_data:
- link: /continuous_integration/static_analysis/rules/python-design/function-too-long
  tag: function-too-long
  text: 함수는 100줄 미만이어야 함
python_django_data:
- link: /continuous_integration/static_analysis/rules/python-django/http-response-with-json-dumps
  tag: http-response-with-json-dumps
  text: JSON 데이터를 전송할 때 HttpResponse 대신 JsonResponse 사용하기
- link: /continuous_integration/static_analysis/rules/python-django/jsonresponse-no-content-type
  tag: jsonresponse-no-content-type
  text: JsonResponse에서 content-type 지정하지 않기
- link: /continuous_integration/static_analysis/rules/python-django/model-charfield-max-length
  tag: model-charfield-max-length
  text: Charfield에 대해 항상 max_length 지정하기
- link: /continuous_integration/static_analysis/rules/python-django/model-help-text
  tag: model-help-text
  text: 모델 열을 문서화할 때 help_text 사용하기
- link: /continuous_integration/static_analysis/rules/python-django/no-null-boolean
  tag: no-null-boolean
  text: NullBooleanField 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-django/no-unicode-on-models
  tag: no-unicode-on-models
  text: __unicode__ 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-django/use-convenience-imports
  tag: use-convenience-imports
  text: 가능한 한 convenience imports 사용하기
python_flask_data:
- link: /continuous_integration/static_analysis/rules/python-flask/use-jsonify
  tag: use-jsonify
  text: JSON 출력에 json.dumps 대신 jsonify 사용하기
python_inclusive_data:
- link: /continuous_integration/static_analysis/rules/python-inclusive/comments
  tag: comments
  text: 코멘트에 표현 문제가 있는지 확인하기
- link: /continuous_integration/static_analysis/rules/python-inclusive/function-definition
  tag: function-definition
  text: 함수 이름에 표현 문제가 있는지 확인하기
- link: /continuous_integration/static_analysis/rules/python-inclusive/variable-name
  tag: variable-name
  text: 변수 이름에 표현 문제가 있는지 확인하기
python_pandas_data:
- link: /continuous_integration/static_analysis/rules/python-pandas/arith-operator-not-functions
  tag: arith-operator-not-functions
  text: 함수 대신 산술 연산자 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/avoid-inplace
  tag: avoid-inplace
  text: inplace=True 사용하지 않기
- link: /continuous_integration/static_analysis/rules/python-pandas/comp-operator-not-function
  tag: comp-operator-not-function
  text: 값을 비교하기 위해 함수가 아닌 연산자 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/import-as-pd
  tag: import-as-pd
  text: 코딩 가이드라인에 따라 판다스 가져오기
- link: /continuous_integration/static_analysis/rules/python-pandas/isna-instead-of-isnull
  tag: isna-instead-of-isnull
  text: isnull 대신 isna 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/loc-not-ix
  tag: loc-not-ix
  text: ix 보다는 iloc 또는 loc 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/notna-instead-of-notnull
  tag: notna-instead-of-notnull
  text: notnull 보다는 notna 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/pivot-table
  tag: pivot-table
  text: pivot 또는 unstack 대신 pivot_table 사용하기
- link: /continuous_integration/static_analysis/rules/python-pandas/use-read-csv-not-read-table
  tag: use-read-csv-not-read-table
  text: read_table 보다는 read_csv 사용하기
title: Static Analysis 규칙
---

## 개요

{{% site-region region="us,us3,us5,eu,ap1" %}}
<div class="alert alert-warning">
   Static Analysis는 비공개 베타 버전이며 Python 언어만 지원합니다. 액세스를 요청하려면 <a href="/help">지원팀에 문의하세요</a>.
</div>
{{% /site-region %}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 Static Analysis를 사용할 수 없습니다.
</div>
{{% /site-region %}}

Datadog Static Analysis는 코드 리뷰에서 CI/CD 파이프라인의 위반 사항을 감지하고, 버그, 보안, 유지 관리 문제를 식별하는데 도움이 되는 즉시 사용 가능한 규칙을 제공합니다. 자세한 정보는 [Static Analysis 설명서][1]를 참조하세요.

## 규칙

### 모범 사례를 따라 Python 코드 작성하기

**규칙 세트 ID:** `python-best-practices`

효율적이고 버그 없는 코드를 작성하기 위한 Python 모범 사례.

{{< sa-rule-list "python_best_practices_data" >}}

<br>

### Python 코드 스타일 적용

**규칙 세트 ID:** `python-code-style`

Python 코드 스타일을 적용하는 규칙

{{< sa-rule-list "python_code_style_data" >}}

<br>

### Python 프로그램 구조 확인

**규칙 세트 ID:** `python-design`

중첩된 루프를 포함한 Python 프로그램의 구조 확인을 위한 규칙.

{{< sa-rule-list "python_design_data" >}}

<br>

### Django 모범 사례 및 보안 확인

**규칙 세트 ID:** `python-django`

Django 모범 사례와 보안을 위한 규칙.

{{< sa-rule-list "python_django_data" >}}

<br>

### Flask 모범 사례 및 보안 확인

**규칙 세트 ID:** `python-flask`

Flask 모범 사례와 보안을 위한 규칙.

{{< sa-rule-list "python_flask_data" >}}

<br>

### Python 코드에 표현 문제가 있는지 확인

**규칙 세트 ID:** `python-inclusive`

Python의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.

{{< sa-rule-list "python_inclusive_data" >}}

<br>

### pandas를 사용한 데이터 과학 모범 사례

**규칙 세트 ID:** `python-pandas`

pandas 코드가 적절하게 사용되었는지 확인하기 위한 일련의 규칙입니다.

 - `import` 선언이 다음 코딩 가이드라인을 따르도록 합니다.
 - 더 이상 사용되지 않는 코드와 메서드를 피하세요.
 - 가능한 한 비효율적인 코드를 피하세요.

{{< sa-rule-list "python_pandas_data" >}}

<br>

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/continuous_integration/static_analysis