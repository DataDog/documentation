---
title: Grok 파서
---


원시 이벤트의 전체 메시지 또는 특정 속성을 파싱하는 커스텀 grok 규칙을 만듭니다. 모범 사례로, grok 프로세서 내에서 최대 10개의 파싱 규칙을 사용하는 것이 좋습니다.


{{< img src="service_management/events/grok-parser.png" alt="파싱 예제 1" style="width:80%;">}}


**내 이벤트 파싱**을 클릭하여 기본 파이프라인을 통해 흐르는 이벤트에 대한 세 가지 파싱 규칙 세트를 시작합니다. 속성 이름을 구체화하고, 필요한 경우 다른 유형의 이벤트에 대한 새 규칙을 추가합니다. 이 기능을 사용하려면 해당 이벤트가 인덱싱되어 실제로 수신되는 상태여야 합니다. 작동을 위해 임시로 예외 필터를 비활성화하거나 샘플링할 수 있습니다.

샘플을 클릭하여 선택한 다음, 파싱 규칙에 대한 평가를 트리거하고 화면 하단에 결과를 표시합니다.

프로세서에 최대 5개의 샘플을 저장할 수 있으며, 각 샘플의 길이는 최대 5000자까지 가능합니다. 모든 샘플에는 상태(일치 또는 일치하지 않음)가 표시됩니다. Grok Parser의 파싱 규칙 중 하나가 샘플과 매칭되는 경우 해당 상태가 강조 표시됩니다.


### Grok 구문

Grok Parser는 반구조화된 문자 메시지에서 속성을 추출합니다. Grok에는 정수, IP 주소, 호스트 이름 등을 파싱하기 위한 재사용 가능한 패턴이 포함되어 있습니다. 이러한 값은 문자열로 Grok Parser에 보내야 합니다.

`%{MATCHER:EXTRACT:FILTER}` 구문을 사용하여 파싱 규칙을 작성할 수 있습니다.

* **Matcher**: 예상되는 내용(숫자, 단어, notSpace 등)을 설명하는 규칙(다른 토큰 규칙에 대한 참조일 수 있음)입니다.

* **Extract** (옵션): *Matcher*와 일치하는 텍스트 조각의 캡처 대상을 나타내는 식별자입니다.

* **필터**(옵션): 매치를 변환하는 포스트-프로세서입니다.

전형적인 비정형 이벤트 예시:

```text
john connected on 11/08/2017
```

다음 파싱 규칙을 사용합니다.

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

프로세싱 후 다음 정형 이벤트가 생성됩니다.

{{< img src="logs/processing/processors/_parser.png" alt="파싱 예제 1" style="width:80%;">}}

**참고**:

* 단일 Grok Parser에 여러 개의 파싱 규칙이 있는 경우
  * 제공된 이벤트와 단 하나의 항목만 일치할 수 있습니다. 위에서부터 시작해 첫 번째 항목이 일치하면 해당 항목이 파싱됩니다.
  * 각 규칙은 목록에서 위에 정의된 파싱 규칙을 참조할 수 있습니다.
* 동일한 Grok Parser 내에 고유한 규칙 이름이 있어야 합니다.
* 규칙 이름은 영숫자, `_`, `.`만 포함해야 하며, 반드시 영숫자로 시작해야 합니다.
* 값이 0이거나 비어 있는 속성은 표시되지 않습니다.
* 정규식 일치기는 암묵적으로 `^`과 `$`를 적용하여 문자열의 시작과 끝이 매칭되도록 합니다.
* 특정 이벤트에는 공백이 다수 생성될 수 있습니다. `\n` 및 `\s+`을 사용하여 줄 바꿈과 공백을 고려하세요.

### 일치기 및 필터

다음은 Datadog에서 기본적으로 구현된 모든 일치기와 필터 목록을 보여줍니다.

{{< tabs >}}
{{% tab "Matchers" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])` 
: 날짜를 지정된 패턴과 매칭하고 파싱하여 Unix 타임스탬프를 생성합니다. [날짜 매칭기 예제](#parsing-dates)를 참조하세요.

`regex("pattern")`
: 정규식을 매칭합니다. [정규식 일치기 예시](#regex)를 확인하세요.

`notSpace`
: 다음 공백까지 모든 문자열을 매칭합니다.

`boolean("truePattern", "falsePattern")`
: 부울 연산자를 매칭하고 파싱합니다. 선택적으로 참/거짓 패턴을 정의합니다(기본값은 `true` 및 `false`로 대소문자 무시).

`numberStr`
: 십진수 부동 소수점 숫자를 매칭하고 문자열로 파싱합니다.

`number`
: 십진수 부동 소수점 숫자를 매칭하고 배정밀도 숫자로 파싱합니다.

`numberExtStr`
: 부동 소수점 숫자(과학 표기법 지원)를 매칭하고 문자열로 파싱합니다.

`numberExt`
: 부동 소수점 숫자(과학 표기법 지원)를 매칭하고 배정밀도 숫자로 파싱합니다.

`integerStr`
: 정수를 매칭하고 문자열로 파싱합니다.

`integer`
: 정수를 매칭하고 정수로 파싱합니다.

`integerExtStr`
: 정수(과학적 표기법 지원 포함)를 매칭하고 문자열로 파싱합니다.

`integerExt`
: 정수(과학적 표기법 지원 포함)를 매칭하고 정수로 파싱합니다.

`word`
: (밑줄) 문자를 포함하여 0-9, A-Z, _(밑줄) 문자를 매칭합니다.

`doubleQuotedString`
: 큰따옴표로 묶인 문자열을 매칭합니다.

`singleQuotedString`
: 작은따옴표로 묶인 문자열을 매칭합니다.

`quotedString`
: 큰따옴표 또는 작은따옴표로 묶인 문자열을 매칭합니다.

`uuid`
: UUID를 매칭합니다.

`mac`
: MAC 주소를 매칭합니다.

`ipv4`
: IPV4를 매칭합니다.

`ipv6`
: IPV6를 매칭합니다.

`ip`
: IP(v4 또는 v6)를 매칭합니다.

`hostname`
: 호스트 이름을 매칭합니다.

`ipOrHost`
: 호스트 이름 또는 IP를 매칭합니다.

`port`
: 포트 번호를 매칭합니다.

`data`
: 공백과 개행을 포함한 모든 문자열을 매칭합니다. 정규식의 `.*`에 해당합니다. 위의 패턴 중 어느 것도 적절하지 않을 때 사용합니다.

{{% /tab %}}
{{% tab "Filters" %}}

`number`
: 매칭 항목을 배정밀도 숫자로 파싱합니다.

`integer`
: 매칭 항목을 정수로 파싱합니다.

`boolean`
: 대소문자를 무시하고 'true' 및 'false' 문자열을 부울로 파싱합니다.

`nullIf("value")`
: 매칭 항목이 제공된 값과 같으면 null을 반환합니다.

`json`
: 올바른 형식의 JSON을 파싱합니다.

`rubyhash`
: 다음과 같은 올바른 형식의 루비(Ruby) 해시를 파싱합니다. `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`

`useragent([decodeuricomponent:true/false])`
: 사용자-에이전트를 파싱하고 에이전트 로 표시되는 장치, OS 및 브라우저를 포함하는 JSON 객체를 반환합니다. [사용자 에이전트 프로세서를 확인하세요][1].

`querystring`
: 매칭되는 URL 쿼리 문자열(예: `?productId=superproduct&promotionCode=superpromo`)에 있는 모든 키-값 쌍을 추출합니다.

`decodeuricomponent`
: URI 구성 요소를 디코딩합니다. 예를 들어 `%2Fservice%2Ftest`를 `/service/test`로 변환합니다.

`lowercase`
: 소문자 문자열을 반환합니다.

`uppercase`
: 대문자 문자열을 반환합니다.

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: 키 값 패턴을 추출하여 JSON 객체를 반환합니다. [키-값 필터 예제](#key-value-or-logfmt)를 참조하세요.

`xml`
: 올바른 형식의 XML을 파싱합니다. [XML 필터 예제](#parsing-xml)를 참조하세요.

`csv(headers[, separator[, quotingcharacter]])`
: 올바른 형식의 CSV 또는 TSV 줄을 파싱합니다. [CSV 필터 예제](#parsing-csv)를 참조하세요.

`scale(factor)`
: 예상 수치에 제공된 계수를 곱합니다.

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: 토큰의 문자열 시퀀스를 파싱하여 배열로 반환합니다. [배열할 목록](#list-to-array) 예제를 참조하세요.

`url`
: URL을 파싱하여 토큰화된 모든 구성원(도메인, 쿼리 매개변수, 포트 등)를 JSON 객체로 반환합니다. 
{{% /tab %}}
{{< /tabs >}}

## 고급 설정 

Grok 프로세서 타일의 하단에는 **고급 설정** 섹션이 있습니다.

{{< img src="logs/processing/parsing/advanced_settings.png" alt="고급 설정" style="width:80%;">}}

### 특정 텍스트 속성 파싱

다음에서 **추출 소스** 필드를 사용하여 기본 `message` 속성 대신 지정된 텍스트 속성에 Grok 프로세서를 적용합니다.

예를 들어 키 값으로 파싱해야 하는 `command.line` 속성이 포함된 이벤트를 생각해 보세요. 이 이벤트를 다음과 같이 파싱할 수 있습니다.

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="파싱 명령줄" style="width:80%;">}}

### 도우미 규칙을 사용하여 여러 파싱 규칙을 인수 분해하기

**지원 규칙** 필드를 사용하여 파싱 규칙에 대한 토큰을 정의하세요. 지원 규칙을 사용하면 파싱 규칙에서 Grok 패턴을 인수 분해할 수 있습니다. 이 기능은 동일한 Grok Parser에 동일한 토큰을 사용하는 여러 개의 규칙이 있을 때 유용합니다.

전형적 비정형 이벤트에 대한 예시:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

다음 파싱 규칙을 사용합니다.

```text
MyParsingRule %{user} %{connection} %{server}
```

다음과 같은 지원을 사용합니다.

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="지원 규칙" style="width:80%;">}}

## 예시

Parser 사용 방법을 보여주는 몇 가지 예시입니다.

* [키 값 또는 로그](#key-value-or-logfmt)
* [파싱 날짜](#parsing-dates)
* [대체 패턴](#alternating-pattern)
* [선택 속성](#optional-attribute)
* [중첩된 JSON](#nested-json)
* [정규식](#regex)
* [목록 및 배열](#list-to-array)
* [Glog 형식](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### 키 값 또는 로그

키-값 핵심 필터: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` 조건:

* `separatorStr`키와 값 사이의 구분 기호를 정의합니다. 기본값은 `=`입니다.
* `characterAllowList`는 기본값 `\\w.\\-_@` 외에 이스케이프 처리되지 않은 값 문자를 추가로 정의합니다. 따옴표로 묶지 않은 값(예: `key=@valueStr`)에만 사용됩니다.
* `quotingStr`는 따옴표를 정의하여 기본 따옴표 감지를 대체합니다: `<>`, `""`, `''`.
* `delimiter`는 서로 다른 키 값 쌍 사이의 구분 기호를 정의합니다(예: `|`는 `key1=value1|key2=value2`의 구분 기호입니다). 기본값은 ` ` (normal space), `,` and `;` 입니다.

**keyvalue** 등 필터를 사용하면 문자열을 keyvalue 또는 logfmt 형식의 속성에 더 쉽게 매핑할 수 있습니다:

**이벤트:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**규칙:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="파싱 예제 2" style="width:80%;">}}

파라미터의 이름은 이미 이벤트에 포함되어 있으므로 지정할 필요가 없습니다.
규칙 패턴에 **extract** 속성 `my_attribute` 을 추가하면 표시됩니다.

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="파싱 예시 2 bis" style="width:80%;">}}

키와 값 사이의 기본 구분 기호가 `=`가 아닌 경우 파싱 규칙에 파라미터를 구분 기호와 함께 추가하세요.

**이벤트:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**규칙:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="키 값 Parserr" style="width:80%;" >}}

예를 들어 이벤트에 `/`과 같은 속성 값에 특수 문자가 포함된 경우 파싱 규칙의 허용 목록에 추가합니다.

**이벤트:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**규칙:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="키 값 허용 목록" style="width:80%;" >}}

기타 예시:

| **원시 문자열**               | **파싱 규칙**                                      | **결과**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {"key": "valueStr"}                   |
| key:"/valueStr"              | `%{data::keyvalue(":", "/")}`                         | {"key": "/valueStr"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {"/key": "/valueStr"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"key": "valueStr"}                   |
| key1=value1\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |
| key1="value1"\|key2="value2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |

**다중 인용 문자열 예제**: 여러 인용 문자열이 정의된 경우 기본 동작은 정의된 인용 문자로 대체됩니다.
키-값은 `quotingStr` 에 지정된 내용에 관계없이 항상 따옴표 문자가 없는 입력과 매칭됩니다. 따옴표 문자를 사용하면 따옴표 문자 사이의 모든 내용이 추출되므로 `characterAllowList`는 무시됩니다.

**이벤트:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**규칙:**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**결과:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**참고**:

* 빈 값(`key=`) 또는 `null` 값(`key=null`)은 출력 JSON에 표시되지 않습니다.
* `data` 객체에 *keyvalue* 필터를 정의하고 이 필터가 매칭되지 않으면 빈 JSON `{}` 이 반환됩니다(예: 입력: `key:=valueStr`, 파싱 규칙: `rule_test %{data::keyvalue("=")}`, 출력: `{}`).
* `""`을 `quotingStr`으로 정의하면 인용 시 기본값 설정이 유지됩니다.

### 파싱 날짜

날짜 일치기는 타임스탬프를 EPOCH 형식(**밀리초** 측정 단위)으로 변환합니다.

| **원시 문자열**                       | **파싱 규칙**                                          | **결과**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 2014/10/11                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| 2016년 6월 16일 목요일 08:29:03             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Thu Jun 16 08:29:03 <sup>20161</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Thu Jun 16 08:29:03 <sup>20161</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Thu Jun 16 08:29:03 <sup>20161</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> 자체 현지화를 수행하고 타임스탬프가 UTC가 아닌 경우 `timezone` 파라미터를 사용하세요.
지원되는 시간대 형식은 다음과 같습니다.

* `GMT`, `UTC`, `UT` 또는 `Z`
* `+h`, `+hh`, `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`, `+hh:mm:ss`, `-hh:mm:ss`, `+hhmmss` 또는 `-hhmmss`. 지원되는 최대 범위는 +18:00부터 -18:00까지입니다.
* `UTC+`, `UTC-`, `GMT+`, `GMT-`, `UT+` 또는 `UT-` 로 시작하는 시간대 최대 지원 범위는 +18:00 ~ -18:00(포함)입니다.
* TZ 데이터베이스에서 가져온 표준 시간대 ID입니다. 자세한 내용은 [TZ 데이터베이스 이름][2]을 참조하세요.

**참고**: 파싱 날짜는 그 값을 이벤트 공식 날짜로 설정하지 않습니다. 이를 위해 후속 프로세서에서 [이벤트 날짜 재매핑기][3]를 사용하세요.

### 대체 패턴

속성이 하나만 다른 두 가지 가능한 형식의 이벤트가 있는 경우 `(<REGEX_1>|<REGEX_2>)` 을 번갈아 사용하여 단일 규칙을 설정합니다. 이 규칙은 부울 연산자인 OR과 동일합니다.

**이벤트**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**규칙**:
'id'는 문자열이 아닌 정수라는 점에 유의하세요.

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**결과**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="파싱 예시 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="파싱 예시 4 bis" style="width:80%;" >}}

### 선택 속성

몇몇 이벤트에는 일부만 표시되는 값이 포함되어 있습니다. 이 경우 `()?` 을 사용하여 선택 속성 추출을 수행합니다.

**이벤트**:

```text
john 1234 connected on 11/08/2017
```

**규칙**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**참고**: 선택 섹션의 첫 단어 뒤에 공백을 포함하면 규칙이 매칭되지 않습니다.

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="파싱 예제 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="파싱 예제 5 bis" style="width:80%;" >}}

### 중첩된 JSON

`json` 필터를 사용하여 원시 텍스트 접두사 뒤에 중첩된 JSON 객체를 파싱합니다.

**이벤트**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**규칙**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="중첩된 JSON 파싱 예제" style="width:80%;" >}}

### 정규식

**이벤트**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**규칙**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="파싱 예제 6" style="width:80%;" >}}

### 배열할 목록

`array([[openCloseStr, ] separator][, subRuleOrFilter)` 필터를 사용하여 목록을 단일 속성의 배열로 추출합니다. `subRuleOrFilter`는 선택 항목이며 이러한 [필터][4]를 허용합니다.

**이벤트**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**규칙**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="파싱 예시 6" style="width:80%;" >}}

**이벤트**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**규칙**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**규칙 사용 `subRuleOrFilter`**:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### 글로그 형식

쿠버네티스(Kubernetes) 구성 요소는 때때로 `glog` 형식으로 로그를 남깁니다. 이 예제는 파이프라인의 Kube 스케줄러 항목 라이브러리에서 가져온 것입니다.

이벤트 예시:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

파싱 규칙:

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

추출한 JSON:

```json
{
  "level": "W",
  "timestamp": 1587728861605,
  "logger": {
    "thread_id": 1,
    "name": "authorization.go"
  },
  "lineno": 47,
  "msg": "Authorization is disabled"
}
```

### 파싱 XML

XML 파싱기는 XML 형식의 메시지를 JSON으로 변환합니다.

**이벤트:**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**규칙:**

```text
rule %{data::xml}
```

**결과:**

  ```json
{
  "book": {
    "year": "2005",
    "author": "J K. Rowling",
    "category": "CHILDREN",
    "title": {
      "lang": "en",
      "value": "Harry Potter"
    }
  }
}
  ```

**참고**:

* XML에 태그 사이에 속성와 문자열 값이 모두 있는 태그가 포함된 경우 `value` 속성이 생성됩니다. 예: `<title lang="en">Harry Potter</title>`는 다음과 같이 변환됩니다. `{"title": {"lang": "en", "value": "Harry Potter" } }`
* 반복되는 태그는 자동으로 배열로 변환됩니다. 예: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>`은 다음과 같이 변환됩니다. `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`

### CSV 파싱

**CSV** 필터를 사용하면 문자열을 지정된 문자로 구분할 때 속성에 더 쉽게 매핑할 수 있습니다(기본값은 `,`).

CSV 필터는 `csv(headers[, separator[, quotingcharacter]])`로 정의됩니다.

* `headers`: `,`로 구분된 키 이름을 정의합니다. 키 이름은 알파벳 문자로 시작해야 하며 `_` 외에 영숫자 문자를 포함할 수 있습니다.
* `separator`: 서로 다른 값을 구분하는 데 사용되는 구분 기호를 정의합니다. 한 문자만 허용됩니다. 기본값: `,`. **참고**: `separator` 에 `tab` 를 사용하여 TSV의 표 문자를 나타냅니다.
* `quotingcharacter`: 인용 문자를 정의합니다. 하나의 문자만 허용됩니다. 기본값은 `"`입니다.

**참고**:

* 구분 문자가 포함된 값은 따옴표로 묶어야 합니다.
* 따옴표 문자가 포함된 값은 따옴표 문자를 사용하여 이스케이프 처리해야 합니다. 예를 들어 따옴표로 묶인 값 내의 `""`은 `"`을 나타냅니다.
* 이벤트에 헤더의 키 수와 동일한 수의 값이 포함되어 있지 않으면 CSV 파싱기는 첫 번째 값을 매칭합니다.
* 정수를 표현하는 Integar와 부동 소숫점을 표시하기 위한 Double은 가능하면 자동으로 캐스팅됩니다.

**이벤트**:

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**규칙**:

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**결과:**

{{< code-block lang="json" >}}
{
  "user": {
    "first_name": "John",
    "name": "Doe",
    "st_nb": 120,
    "st_name": "Jefferson St.",
    "city": "Riverside"
  }
}
{{< /code-block >}}

기타 예시:

| **원시 문자열**               | **파싱 규칙**                                                         | **결과**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"name": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John|Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"name": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### 데이터 일치기를 사용하여 불필요한 텍스트 삭제하기

필요한 내용을 파싱하고 그 이후의 텍스트는 삭제해도 안전하다는 것을 알고 있는 이벤트가 있는 경우 데이터 일치기를 사용하여 삭제할 수 있습니다. 다음 이벤트 예시의 경우 `data` 일치기를 사용하여 끝에 있는 `%`를 삭제했습니다.

**이벤트**:

```
Usage: 24.3%
```

**규칙**:

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**결과**:

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### ASCII 제어 문자

이벤트에 ASCII 제어 문자가 포함된 경우, 수집 시 직렬화됩니다. 이러한 문자는 Grok Parser 내에서 직렬화된 값을 명시적으로 이스케이프 처리할 수 있습니다.


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ko/service_management/events/pipelines_and_processors/date_remapper
[4]: /ko/service_management/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter