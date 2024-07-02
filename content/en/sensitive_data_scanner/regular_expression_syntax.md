---
title: Regular Expression Syntax
disable_toc: false
further_reading:
    - link: "/sensitive_data_scanner/"
      tag: "Documentation"
      text: "Set up Sensitive Data Scanner"
---

## Overview

In [Sensitive Data Scanner][1], the scanning rule determines what sensitive information to match within the data. You can use rules from the [Scanning Rule Library][2] or you can create custom scanning rules using regular expression (regex) patterns to scan for sensitive information. The Sensitive Data Scanner regex syntax is a subset of [PCRE2][3].

{{< whatsnext desc="The available regex syntax for custom rules are broken down into the following categories:" >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#alternation" >}}Alternation{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#assertions" >}}Assertions{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#ascii-classes" >}}ASCII classes{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-classes" >}}Character classes{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-escapes" >}}Character escapes{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#custom-character-classes" >}}Custom character classes{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#groups" >}}Groups{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quantifiers" >}}Quantifiers{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quoting" >}}Quoting{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#setting-flags" >}}Setting flags{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#unicode-properties" >}}Unicode properties{{< /nextlink >}}
{{< /whatsnext >}}

## Alternation

Use alternation to choose the first expression that matches. An expression in an alteration can be left empty, which means it matches to anything and makes the entire alternation expression optional.

| Regex Syntax      | Description                              |
| ------------------| ---------------------------------------- |
| `...\|...\|...`   | An alternation.                          |
| `...\|...\|`      | An alternation with an empty expression. |

## Assertions

| Assertion | Description                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `\b `     | A word boundary.                                                               |
| `\B`      | Not a word boundary.                                                           |
| `^`       | Start of a line.                                                               |
| `$`       | End of a line.                                                                 |
| `/A`      | Start of text.                                                                 |
| `\z`      | End of text.                                                                   |
| `\Z`      | End of text (or before a `\n` that is immediately before the end of the text). |

## ASCII classes

Names classes that can be used in [custom character classes](#custom-character-classes), for example `[[:ascii:]]`. These only match ASCII characters.

| Names Class | Description                                       |
| ----------- | ------------------------------------------------- |
| `alnum`     | Alphanumeric.                                     |
| `alpha`     | Alphabetic.                                       |
| `ascii`     | Any ASCII character.                              |
| `blank`     | A space or tab.                                   |
| `cntrl`     | A control character.                              |
| `digit`     | Any digit.                                        |
| `graph`     | Any graphical or printing character (not a space).|
| `lower`     | Any lowercase letter.                             |
| `print`     | Any printable character (including spaces).       |
| `punct`     | Any punctuation character.                        |
| `space`     | A whitespace.                                     |
| `upper`     | Any uppercase letter.                             |
| `word`      | The same as `/w`.                                 |
| `xdigit`    | Any hexadecimal digit.                            |

## Character escapes

| Regex Syntax     | Description                                                         |
| --------------- | -------------------------------------------------------------------- |
| `\xhh`          | Escapes characters with hex code `hh` (up to 2 digits are allowed).  |
| `\x{hhhhhh}`    | Escapes characters with hex code `hhhhhh` (between 1 and 6 digits).  |
| `\a`            | Escapes a bell `(\x{7})`.                                            |
| `\b`            | Escapes a backspace `(\x{8})`. This only works in a custom character class (for example, `[\b]`), otherwise it is treated as a word boundary. |
| `\cx`           | Escapes a control sequence, where `x` is `A-Z` (upper or lowercase). For example: `\cA` = `\x{0}`, `\cB` = `\x{1}`,...`\cZ` = `\x{19}`. |
| `\e`            | Escapes the ASCII escape character (`\x{1B}`).                       |
| `\f`            | Escapes a form feed (`\x{C}`).                                       |
| `\n`            | Escapes a newline (`\x{A}`).                                         |
| `\r`            | Escapes a carriage return (`\x{D}`)                                  |
| `\t`            | Escapes a tab (`\x{9}`).                                             |
| `\v`            | Escapes a vertical tab (`\x{B}`).                                    |

## Character classes

| Regex Syntax    | Description                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| `.`             | Matches any character except `\n`. Enable the `s` flag to match any character, including `\n`.|
| `\d`            | Matches any ASCII digit (`[0-9]`).                                                            |
| `\D `           | Matches anything that does not match with `\d`.                                               |
| `\h`            | Matches a space or tab (`[\x{20}\t]`).                                                        |
| `\H`            | Matches anything that does not match with `\h`.                                               |
| `\s`            | Matches any ASCII whitespace (`[\r\n\t\x{C}\x{B}\x{20}]`).                                    |
| `\S`            | Matches anything that does not match with `\s`.                                               |
| `\v`            | Matches ASCII vertical space (`[\x{B}\x{A}\x{C}\x{D}]`).                                      |
| `\V`            | Matches anything that does not match with `\v`.                                               |
| `\w`            | Matches any ASCII word character (`[a-zA-Z0-9_]`).                                            |
| `\W`            | Matches anything that does not match with `\w`.                                               |
| `\p{x}`         | Matches anything that matches the unicode property `x`. See [Unicode Properties](#unicode-properties) for a full list.|

## Custom character classes

| Regex Syntax                    | Description                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
|`[...]`                          | Matches any character listed inside the brackets.                                   |
| `[^...]`                        | Matches anything that is not listed inside the brackets.                            |
| `[a-zA-Z]`                      | Matches anything in the range `A - Z` (upper or lowercase).                         |
| `[\s\w\d\S\W\D\v\V\h\H\p{x}...]`| Other classes defined above are allowed (except `.` which is treated as a literal). |
| `[[:ascii_class:]]`             | Matches special named [ASCII classes](#ascii-classes).                              |
| `[[:^ascii_class:]]`            | Matches inverted [ASCII classes](#ascii-classes).                                   |

## Groups

Use groups to change precedence or set flags. Since captures are not used in Sensitive data Scanner, capturing groups behave like non-capturing groups. Similarly, capture group names are ignored.

| Regex Syntax                                           | Description            |
| ------------------------------------------------------ | ---------------------- |
| `(...)`                                                | A capture group.       |
| `(?<name>...)`                                         | A named capture group. |
| `(?P<name>...)`                                        | A named capture group. |
| `(?'name'...)`                                         | A named capture group. |
| `(?:...)`                                              | A non-capturing group. |

## Setting flags

Use flags to modify the regex behavior. There are two ways to specify flags:
1. `(?imsx:...)`: Set flags that only apply to the expression inside of a non-capturing group.
2. `(?imsx)...`: Set flags that apply to the rest of the current group.

Flags listed after a `-` are removed if they were previously set.

Use `(?-imsx)` to unset the `imsx` flags.

### Available flags

| Flag | Name             | Description                                                                           |
| ---- | ---------------- | ------------------------------------------------------------------------------------- |
| `i`  | Case insensitive | Letters match both upper and lower case.                                              |
| `m`  | Multi-line mode  | `^` and `$` match the beginning and end of line.                                      |
| `s`  | Single line      | Allows `.` to match any character, when it usually matches anything except `\n`).     |
| `x`  | Extended         | Whitespace is ignored (except in a custom character class).                           |

## Quoting

Use the regex syntax `\Q...\E` to treat everything between `\Q` and `\E` as a literal.


## Quantifiers

Quantifiers repeat the previous expression. Greedy means that the most number of repetitions are taken, and are only given back as needed to find a match. Lazy takes the minimum number of repetitions and adds more as needed.

| Regex Syntax | Description                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `?`          | Repeat `0` or `1` time (greedy).                                              |
| `??`         | Repeat `0` or `1` time (lazy).                                                |
| `+`          | Repeat `1` or more times (greedy).                                            |
| `+?`         | Repeat `1` or more times (lazy).                                              |
| `*`          | Repeat `0` or more times (greedy).                                            |
| `*?`         | Repeat `0` or more times (lazy).                                              |
| `{n}`        | Repeat exactly `n` times (the lazy modifier is accepted here but is ignored). |
| `{n,m}`      | Repeat at least `n` times, but no more than `m` times (greedy).               |
| `{n,m}?`     | Repeat at least `n times`, but no more than `m` times (lazy).                 |
| `{n,}`       | Repeat at least `n` times (greedy).                                           |
| `{n,}?`      | Repeat at least `n` times (lazy).                                             |

**Note**: `{,m}`is not valid and is treated as a literal. Similarly, any syntax differences such as adding spaces inside the braces cause the quantifier to be treated as a literal instead.

## Unicode properties

Unicode properties for `x` in the character class `\p{x}`.

| Unicode Properties| Description           |
| ------------------| --------------------- |
| `C`               | Other                 |
| `Cc`              | Control               |
| `Cf`              | Format                |
| `Cn`              | Unassigned            |
| `Co`              | Private use           |
| `Cs`              | Surrogate             |
| `L`               | Letter                |
| `Ll`              | Lowercase letter      |
| `Lm`              | Modifier letter       |
| `Lo`              | Other letter          |
| `Lt`              | Title case letter     |
| `Lu`              | Uppercase letter      |
| `M`               | Mark                  |
| `Mc`              |Spacing mark           |
| `Me`              | Enclosing mark        |
| `Mn`              | Non-spacing mark      |
| `N`               | Number                |
| `Nd`              | Decimal number        |
| `Nl`              | Letter number         |
| `No`              | Other number          |
| `P`               | Punctuation           |
| `Pc`              | Connector punctuation |
| `Pd`              | Dash punctuation      |
| `Pe`              | Close punctuation     |
| `Pf`              | Final punctuation     |
| `Pi`              | Initial punctuation   |
| `Po`              | Other punctuation     |
| `Ps`              | Open punctuation      |
| `S`               | Symbol                |
| `Sc`              | Currency symbol       |
| `Sk`              | Modifier symbol       |
| `Sm`              | Mathematical symbol   |
| `So`              | Other symbol          |
| `Z`               | Separator             |
| `Zl`              | Line separator        |
| `Zp`              | Paragraph separator   |
| `Zs`              | Space separator       |

Script names can be used to match any character from the script. The following are allowed:

`Adlam`, `Ahom`, `Anatolian_Hieroglyphs`, `Arabic`, `Armenian`, `Avestan`, `Balinese`, `Bamum`, `Bassa_Vah`, `Batak`, `Bengali`, `Bhaiksuki`, `Bopomofo`, `Brahmi`, `Braille`, `Buginese`, `Buhid`, `Canadian_Aboriginal`, `Carian`, `Caucasian_Albanian`, `Chakma`, `Cham`, `Cherokee`, `Chorasmian`, `Common`, `Coptic`, `Cuneiform`, `Cypriot`, `Cypro_Minoan`, `Cyrillic`, `Deseret`, `Devanagari`, `Dives_Akuru`, `Dogra`, `Duployan`, `Egyptian_Hieroglyphs`, `Elbasan`, `Elymaic`, `Ethiopic`, `Georgian`, `Glagolitic`, `Gothic`, `Grantha`, `Greek`, `Gujarati`, `Gunjala_Gondi`, `Gurmukhi`, `Han`, `Hangul`, `Hanifi_Rohingya`, `Hanunoo`, `Hatran`, `Hebrew`, `Hiragana`, `Imperial_Aramaic`, `Inherited`, `Inscriptional_Pahlavi`, `Inscriptional_Parthian`, `Javanese`, `Kaithi`, `Kannada`, `Katakana`, `Kayah_Li`, `Kharoshthi`, `Khitan_Small_Script`, `Khmer`, `Khojki`, `Khudawadi`, `Lao`, `Latin`, `Lepcha`, `Limbu`, `Linear_A`, `Linear_B`, `Lisu`, `Lycian`, `Lydian`, `Mahajani`, `Makasar`, `Malayalam`, `Mandaic`, `Manichaean`, `Marchen`, `Masaram_Gondi`, `Medefaidrin`, `Meetei_Mayek`, `Mende_Kikakui`, `Meroitic_Cursive`, `Meroitic_Hieroglyphs`, `Miao`, `Modi`, `Mongolian`, `Mro`, `Multani`, `Myanmar`, `Nabataean`, `Nandinagari`, `New_Tai_Lue`, `Newa`, `Nko`, `Nushu`, `Ogham`, `Ol_Chiki`, `Old_Hungarian`, `Old_Italic`, `Old_North_Arabian`, `Old_Permic`, `Old_Persian`, `Old_Sogdian`, `Old_South_Arabian`, `Old_Turkic`, `Old_Uyghur`, `Oriya`, `Osage`, `Osmanya`, `Pahawh_Hmong`, `Palmyrene`, `Pau_Cin_Hau`, `Phags_Pa`, `Phoenician`, `Psalter_Pahlavi`, `Rejang`, `Runic`, `Samaritan`, `Saurashtra`, `Sharada`, `Shavian`, `Siddham`, `SignWriting`, `Sinhala`, `Sogdian`, `Sora_Sompeng`, `Soyombo`, `Sundanese`, `Syloti_Nagri`, `Syriac`, `Tagalog`, `Tagbanwa`, `Tai_Le`, `Tai_Tham`, `Tai_Viet`, `Takri`, `Tamil`, `Tangsa`, `Tangut`, `Telugu`, `Thaana`, `Thai`, `Tibetan`, `Tifinagh`, `Tirhuta`, `Toto`, `Ugaritic`, `Vai`, `Vithkuqi`, `Wancho`, `Warang_Citi`, `Yezidi`, `Yi`, `Zanabazar_Square`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /sensitive_data_scanner/
[2]: /sensitive_data_scanner/library_rules/
[3]: https://www.pcre.org/current/doc/html/pcre2syntax.html
