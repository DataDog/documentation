---
aliases:
- /ko/sensitive_data_scanner/regular_expression_syntax/
- /ko/sensitive_data_scanner/scanning_rules/custom_rules
- /ko/security/sensitive_data_scanner/regular_expression_syntax
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: 설명서
  text: 민감 데이터 스캐너 설정
title: 커스텀 규칙
---

## 개요

[Sensitive Data Scanner][1]에서는 검색 규칙에 따라 데이터 내에서 어떤 민감한 정보를 일치시킬지 결정합니다. [Scanning Rule Library][2]의 규칙을 사용하거나 정규식(regex) 패턴을 사용하여 사용자 정의 검색 규칙을 만들어 민감한 정보를 검색할 수 있습니다. Sensitive Data Scanner 정규식 구문은 [PCRE2][3]의 하위 집합입니다.

{{< whatsnext desc="사용자 정의 규칙에 사용 가능한 정규식 구문은 다음 범주로 분류됩니다." >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#alternation" >}}교체{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#assertions" >}}어설션{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#ascii-classes" >}}ASCII 클래스{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-classes" >}}문자 클래스{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-escapes" >}}문자 이스케이프{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#custom-character-classes" >}}커스텀 문자 클래스{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#groups" >}}그룹{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quantifiers" >}}정량자{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quoting" >}}인용{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#setting-flags" >}}플래그 설정{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#unicode-properties" >}}Unicode 속성{{< /nextlink >}}
{{< /whatsnext >}}

## 교체

교체를 사용하면 먼저 일치하는 표현식을 선택할 수 있습니다. 교체의 표현식은 비워 둘 수 있으며, 이를 통해 무엇이든 일치하고 전체 교체 표현식이 선택 사항이 됩니다.

| 정규식 구문      | 설명                              |
| ------------------| ---------------------------------------- |
| `...\|...\|...`   | 교체                          |
| `...\|...\|`      | 빈 표현식과 교체 |

## 어설션

| 어서션 | 설명                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `\b `     | 단어 경계                                                               |
| `\B`      | 단어 경계가 아님                                                           |
| `^`       | 줄의 시작                                                               |
| `$`       | 줄의 끝                                                                 |
| `/A`      | 텍스트 시작                                                                 |
| `\z`      | 텍스트 끝                                                                   |
| `\Z`      | 텍스트 끝(또는 텍스트 끝 바로 앞의 `\n` 앞) |

## ASCII 클래스

[커스텀 문자 클래스](#custom-character-classes)에서 사용할 수 있는 이름 클래스(예: `[[:ascii:]]`). ASCII 문자에만 일치함.

| 이름 클래스 | 설명                                       |
| ----------- | ------------------------------------------------- |
| `alnum`     | 영숫자                                     |
| `alpha`     | 알파벳순                                       |
| `ascii`     | 임의의 ASCII 문자                              |
| `blank`     | 공백 또는 탭                                   |
| `cntrl`     | 제어 문자                              |
| `digit`     | 임의의 숫자                                        |
| `graph`     | 임의의 그래픽 또는 인쇄 문자(공백 아님)|
| `lower`     | 임의의 소문자                             |
| `print`     | 인쇄 가능한 임의의 문자(공백 포함)       |
| `punct`     | 임의의 문장 부호 문자                        |
| `space`     | 공백                                     |
| `upper`     | 임의의 대문자                             |
| `word`      | `/w`과 동일함                                 |
| `xdigit`    | 임의의 16진수                            |

## 문자 이스케이프

| 정규식 구문     | 설명                                                         |
| --------------- | -------------------------------------------------------------------- |
| `\xhh`          | 16진수 코드 `hh`(최대 2자리 허용)로 문자를 이스케이프합니다.  |
| `\x{hhhhhh}`    | 16진수 코드 `hhhhhh`(1~6자리)로 문자를 이스케프합니다.  |
| `\a`            | 벨 `(\x{7})`을 이스케이프합니다.                                            |
| `\b`            | 백스페이스 `(\x{8})`를 이스케이프합니다. 이는 커스텀 문자 클래스(예: `[\b]`)에서만 작동하며, 그렇지 않으면 단어 경계로 처리됩니다. |
| `\cx`           | 제어 시퀀스를 이스케이프합니다. `x`가 `A-Z`입니다 (대문자 또는 소문자). 예: `\cA` = `\x{0}`, `\cB` = `\x{1}`,...`\cZ` = `\x{19}`. |
| `\e`            | ASCII 이스케이프 문자(`\x{1B}`)를 이스케이프합니다.                       |
| `\f`            | 형식 피드(`\x{C}`)를 이스케이프합니다.                                       |
| `\n`            | 줄바꿈(`\x{A}`)을 이스케이프합니다.                                         |
| `\r`            | 캐리지 반환(`\x{D}`)을 이스케이프합니다.                                  |
| `\t`            | 탭(`\x{9}`)을 이스케이프합니다.                                             |
| `\v`            | 세로 탭(`\x{B}`)을 이스케이프합니다.                                    |

## 문자 클래스

| 정규식 구문    | 설명                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| `.`             | `\n`를 제외한 모든 문자와 일치합니다. `\n`를 포함한 모든 문자와 일치하도록 `s` 플래그를 활성화합니다.|
| `\d`            | 임의의 ASCII 숫자(`[0-9]`)와 일치합니다.                                                            |
| `\D `           | `\d`와 일치하지 않는 모든 항목과 일치합니다.                                               |
| `\h`            | 공백 또는 탭(`[\x{20}\t]`)과 일치합니다.                                                        |
| `\H`            | `\h`와 일치하지 않는 모든 항목과 일치합니다.                                               |
| `\s`            | ASCII 공백(`[\r\n\t\x{C}\x{B}\x{20}]`)과 일치합니다.                                    |
| `\S`            | `\s`와 일치하지 않는 모든 항목과 일치합니다.                                               |
| `\v`            | ASCII 세로 공간(`[\x{B}\x{A}\x{C}\x{D}]`)과 일치합니다.                                      |
| `\V`            | `\v`와 일치하지 않는 모든 항목과 일치합니다.                                               |
| `\w`            | ASCII 단어 문자(`[a-zA-Z0-9_]`)와 일치합니다.                                            |
| `\W`            | `\w`와 일치하지 않는 모든 항목과 일치합니다.                                               |
| `\p{x}`         | 유니코드 속성 `x`과 일치하는 모든 항목과 일치합니다. 전체 목록은 [유니코드 속성](#unicode-properties)을 참조하세요.|

## 커스텀 문자 클래스

| 정규식 구문                    | 설명                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
|`[...]`                          | 대괄호 안에 나열된 모든 문자와 일치합니다.                                   |
| `[^...]`                        | 대괄호 안에 나열되지 않은 모든 항목과 일치합니다.                            |
| `[a-zA-Z]`                      | 범위 `A - Z`(대문자 또는 소문자) 내의 모든 항목과 일치합니다.                         |
| `[\s\w\d\S\W\D\v\V\h\H\p{x}...]`| 위에 정의된 다른 클래스도 허용됩니다(리터럴로 처리되는 `.` 제외). |
| `[[:ascii_class:]]`             | 특수하게 명명된 [ASCII 클래스](#ascii-classes)와 일치합니다.                              |
| `[[:^ascii_class:]]`            | 반전된 [ASCII 클래스](#ascii-classes)와 일치합니다.                                   |

## Groups

그룹을 사용하여 우선순위를 변경하거나 플래그를 설정하세요. Sensitive data Scanner에서는 캡처가 사용되지 않으므로 캡처 그룹은 비캡처 그룹처럼 동작합니다. 마찬가지로 캡처 그룹 이름은 무시됩니다.

| 정규식 구문                                           | 설명            |
| ------------------------------------------------------ | ---------------------- |
| `(...)`                                                | 캡처 그룹       |
| `(?<name>...)`                                         | 명명된 캡처 그룹 |
| `(?P<name>...)`                                        | 명명된 캡처 그룹 |
| `(?'name'...)`                                         | 명명된 캡처 그룹 |
| `(?:...)`                                              | 비캡처 그룹 |

## 플래그 설정

정규식 동작을 수정하려면 플래그를 사용합니다. 플래그를 지정하는 방법에는 두 가지가 있습니다.
1. `(?imsx:...)`: 비캡처 그룹 내부의 표현식에만 적용되는 플래그를 설정합니다.
2. `(?imsx)...`: 현재 그룹의 나머지 부분에 적용되는 플래그를 설정합니다.

`-` 뒤에 나열된 플래그는 이전에 설정된 경우 제거됩니다.

`imsx` 플래그를 설정 해제하는데 `(?-imsx)`를 사용합니다.

### 사용 가능한 플래그

| 플래그 | 이름             | 설명                                                                           |
| ---- | ---------------- | ------------------------------------------------------------------------------------- |
| `i`  | 대소문자를 구분하지 않음 | 문자는 대문자와 소문자 모두 일치합니다.                                              |
| `m`  | 여러 줄 모드  | `^`와 `$`는 줄의 시작과 끝을 일치시킵니다.                                      |
| `s`  | 하나의 줄      | `\n`를 제외한 모든 항목과 일치할 때 `.`가 모든 문자와 일치하도록 허용합니다.     |
| `x`  | 확장         | 공백은 무시됩니다(커스텀 문자 클래스 제외).                           |

## 인용

`\Q`와 `\E`사이의 모든 것을 리터럴로 처리하려면 정규식 구문 `\Q...\E`을 사용합니다.


## 정량자

정량자는 이전 표현식을 반복합니다. Greedy는 가장 많은 반복 횟수를 취하고 일치하는 항목을 찾는 데 필요한 만큼만 되돌려준다는 의미입니다. Lazy는 최소한의 반복 횟수를 취하고 필요에 따라 더 추가합니다.

| 정규식 구문 | 설명                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `?`          | `0` 또는 `1`회 반복합니다 (greedy).                                              |
| `??`         | `0` 또는 `1`회 반복합니다 (lazy).                                                |
| `+`          | `1`회 이상 반복합니다 (greedy).                                             |
| `+?`         | `1`회 이상 반복합니다 (lazy).                                              |
| `*`          | `0`회 이상 반복합니다 (greedy).                                            |
| `*?`         | `0`회 이상 반복합니다 (lazy).                                              |
| `{n}`        | 정확히 `n`회 반복합니다(여기서는 lazy 수정자가 허용되지만 무시됩니다). |
| `{n,m}`      | 최소 `n`회 반복하되 `m`회 이상 반복하지 않습니다 (greedy).               |
| `{n,m}?`     | 최소 `n times` 반복하되 `m`회 이상 반복하지 않습니다 (lazy).                 |
| `{n,}`       | 최소 `n`회 반복합니다 (greedy).                                           |
| `{n,}?`      | 최소 `n`회 반복합니다 (lazy).                                             |

**참고**: `{,m}`는 유효하지 않으며 리터럴로 처리됩니다. 마찬가지로 중괄호 안에 공백을 추가하는 것과 같은 구문 차이로 인해 정량자는 대신 리터럴로 처리됩니다.

## Unicode 속성

문자 클래스 `\p{x}`의 Unicode 속성입니다.

| Unicode 속성| 설명           |
| ------------------| --------------------- |
| `C`               | 기타                 |
| `Cc`              | 제어               |
| `Cf`              | 형식                |
| `Cn`              | 할당되지 않음            |
| `Co`              | 개인 사용           |
| `Cs`              | 대리             |
| `L`               | 문자                |
| `Ll`              | 소문자      |
| `Lm`              | 수정자 문자       |
| `Lo`              | 기타 문자          |
| `Lt`              | 타이틀 케이스 문자     |
| `Lu`              | 대문자      |
| `M`               | 마크                  |
| `Mc`              |띄어쓰기 마크           |
| `Me`              | 둘러싸기 마크        |
| `Mn`              | 띄어쓰기가 아닌 마크      |
| `N`               | 숫자                |
| `Nd`              | 십진수        |
| `Nl`              | 문자 숫자         |
| `No`              | 기타 숫자          |
| `P`               | 구두점           |
| `Pc`              | 연결 구두점 |
| `Pd`              | 대시 구두점      |
| `Pe`              | 마침 구두점     |
| `Pf`              | 종료 구두점     |
| `Pi`              | 시작 구두점   |
| `Po`              | 기타 구두점     |
| `Ps`              | 여는 구두점      |
| `S`               | 기호                |
| `Sc`              | 통화 기호       |
| `Sk`              | 수정자 기호       |
| `Sm`              | 수학 기호   |
| `So`              | 기타 기호          |
| `Z`               | 구분 기호             |
| `Zl`              | 줄 구분 기호        |
| `Zp`              | 단락 구분 기호   |
| `Zs`              | 공백 구분 기호       |

스크립트 이름은 스크립트의 모든 문자와 일치시키는 데 사용될 수 있습니다. 다음이 허용됩니다:

`Adlam`, `Ahom`, `Anatolian_Hieroglyphs`, `Arabic`, `Armenian`, `Avestan`, `Balinese`, `Bamum`, `Bassa_Vah`, `Batak`, `Bengali`, `Bhaiksuki`, `Bopomofo`, `Brahmi`, `Braille`, `Buginese`, `Buhid`, `Canadian_Aboriginal`, `Carian`, `Caucasian_Albanian`, `Chakma`, `Cham`, `Cherokee`, `Chorasmian`, `Common`, `Coptic`, `Cuneiform`, `Cypriot`, `Cypro_Minoan`, `Cyrillic`, `Deseret`, `Devanagari`, `Dives_Akuru`, `Dogra`, `Duployan`, `Egyptian_Hieroglyphs`, `Elbasan`, `Elymaic`, `Ethiopic`, `Georgian`, `Glagolitic`, `Gothic`, `Grantha`, `Greek`, `Gujarati`, `Gunjala_Gondi`, `Gurmukhi`, `Han`, `Hangul`, `Hanifi_Rohingya`, `Hanunoo`, `Hatran`, `Hebrew`, `Hiragana`, `Imperial_Aramaic`, `Inherited`, `Inscriptional_Pahlavi`, `Inscriptional_Parthian`, `Javanese`, `Kaithi`, `Kannada`, `Katakana`, `Kayah_Li`, `Kharoshthi`, `Khitan_Small_Script`, `Khmer`, `Khojki`, `Khudawadi`, `Lao`, `Latin`, `Lepcha`, `Limbu`, `Linear_A`, `Linear_B`, `Lisu`, `Lycian`, `Lydian`, `Mahajani`, `Makasar`, `Malayalam`, `Mandaic`, `Manichaean`, `Marchen`, `Masaram_Gondi`, `Medefaidrin`, `Meetei_Mayek`, `Mende_Kikakui`, `Meroitic_Cursive`, `Meroitic_Hieroglyphs`, `Miao`, `Modi`, `Mongolian`, `Mro`, `Multani`, `Myanmar`, `Nabataean`, `Nandinagari`, `New_Tai_Lue`, `Newa`, `Nko`, `Nushu`, `Ogham`, `Ol_Chiki`, `Old_Hungarian`, `Old_Italic`, `Old_North_Arabian`, `Old_Permic`, `Old_Persian`, `Old_Sogdian`, `Old_South_Arabian`, `Old_Turkic`, `Old_Uyghur`, `Oriya`, `Osage`, `Osmanya`, `Pahawh_Hmong`, `Palmyrene`, `Pau_Cin_Hau`, `Phags_Pa`, `Phoenician`, `Psalter_Pahlavi`, `Rejang`, `Runic`, `Samaritan`, `Saurashtra`, `Sharada`, `Shavian`, `Siddham`, `SignWriting`, `Sinhala`, `Sogdian`, `Sora_Sompeng`, `Soyombo`, `Sundanese`, `Syloti_Nagri`, `Syriac`, `Tagalog`, `Tagbanwa`, `Tai_Le`, `Tai_Tham`, `Tai_Viet`, `Takri`, `Tamil`, `Tangsa`, `Tangut`, `Telugu`, `Thaana`, `Thai`, `Tibetan`, `Tifinagh`, `Tirhuta`, `Toto`, `Ugaritic`, `Vai`, `Vithkuqi`, `Wancho`, `Warang_Citi`, `Yezidi`, `Yi`, `Zanabazar_Square`.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/sensitive_data_scanner/
[2]: /ko/security/sensitive_data_scanner/scanning_rules/library_rules/
[3]: https://www.pcre.org/current/doc/html/pcre2syntax.html