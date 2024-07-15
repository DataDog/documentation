---
disable_toc: false
further_reading:
- link: /sensitive_data_scanner/
  tag: Documentación
  text: Configurar Sensitive Data Scanner
title: Sintaxis de expresiones regulares
---

## Información general

En el [Sensitive Data Scanner][1], la regla de escaneo determina qué información confidencial se debe buscar en los datos. Puedes utilizar reglas de la [Biblioteca de reglas de escaneo][2] o puedes crear reglas de escaneo personalizadas utilizando patrones de expresiones regulares (regex) para buscar información confidencial. La sintaxis regex del Sensitive Data Scanner es un subconjunto de [PCRE2][3].

{{< whatsnext desc="La sintaxis regex para reglas personalizadas se dividen en las siguientes categorías:" >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#alternation" >}}Alternancia{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#assertions" >}}Aserciones{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#ascii-classes" >}}Clases de ASCII{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-classes" >}}Clases de caracteres{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#character-escapes" >}}Caracteres de escape{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#custom-character-classes" >}}Clases de caracteres personalizados{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#groups" >}}Grupos{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quantifiers" >}}Cuantificadores{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#quoting" >}}Citado{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#setting-flags" >}}Establecer indicadores{{< /nextlink >}}
    {{< nextlink href="sensitive_data_scanner/regular_expression_syntax#unicode-properties" >}}Propiedades de Unicode{{< /nextlink >}}
{{< /whatsnext >}}

## Alternancia

Utiliza la alternancia para elegir la primera expresión que coincida. Una expresión en una alternancia puede dejarse vacía, lo que significa que coincide con cualquier cosa y hace que toda la expresión de la alternancia sea opcional.

| Sintaxis regex      | Descripción                              |
| ------------------| ---------------------------------------- |
| `...\|...\|...`   | Una alternancia.                          |
| `...\|...\|`      | Una alternancia con una expresión vacía. |

## Aserciones

| Aserción | Descripción                                                                    |
| --------- | ------------------------------------------------------------------------------ |
| `\b `     | Un límite de palabra.                                                               |
| `\B`      | No es un límite de palabra.                                                           |
| `^`       | Inicio de línea.                                                               |
| `$`       | Fin de una línea.                                                                 |
| `/A`      | Inicio del texto.                                                                 |
| `\z`      | Fin del texto.                                                                   |
| `\Z`      | Fin del texto (o antes de un `\n` que esté inmediatamente antes del final del texto). |

## Clases de ASCII

Nombra las clases que pueden utilizarse en [clases de caracteres personalizados](#custom-character-classes), por ejemplo `[[:ascii:]]`. Solo coinciden con caracteres ASCII.

| Clase de nombres | Descripción                                       |
| ----------- | ------------------------------------------------- |
| `alnum`     | Alfanumérico.                                     |
| `alpha`     | Alfabético.                                       |
| `ascii`     | Cualquier carácter ASCII.                              |
| `blank`     | Un espacio o pestaña.                                   |
| `cntrl`     | Un carácter de control.                              |
| `digit`     | Cualquier dígito.                                        |
| `graph`     | Cualquier carácter gráfico o de impresión (no un espacio).|
| `lower`     | Cualquier letra minúscula.                             |
| `print`     | Cualquier carácter imprimible (incluidos los espacios).       |
| `punct`     | Cualquier carácter de puntuación.                        |
| `space`     | Un espacio en blanco.                                     |
| `upper`     | Cualquier letra mayúscula.                             |
| `word`      | Lo mismo que `/w`.                                 |
| `xdigit`    | Cualquier dígito hexadecimal.                            |

## Caracteres de escape

| Sintaxis regex     | Descripción                                                         |
| --------------- | -------------------------------------------------------------------- |
| `\xhh`          | Escapa caracteres con código hexadecimal `hh` (se permiten hasta 2 dígitos).  |
| `\x{hhhhhh}`    | Escapa caracteres con código hexadecimal `hhhhhh` (entre 1 y 6 dígitos).  |
| `\a`            | Escapa de una campana `(\x{7})`.                                            |
| `\b`            | Escapa de un retroceso `(\x{8})`. Esto solo funciona en una clase de caracteres personalizados (por ejemplo, `[\b]`), de lo contrario se trata como un límite de palabra. |
| `\cx`           | Escapa a una secuencia de control, donde `x` es `A-Z` (en mayúsculas o minúsculas). Por ejemplo: `\cA` = `\x{0}`, `\cB` = `\x{1}`,...`\cZ` = `\x{19}`. |
| `\e`            | Escapa el carácter de escape de ASCII (`\x{1B}`).                       |
| `\f`            | Escapa de un avance de página (`\x{C}`).                                       |
| `\n`            | Escapa de una nueva línea (`\x{A}`).                                         |
| `\r`            | Escapa de un retorno de carro (`\x{D}`)                                  |
| `\t`            | Escapa de un tabulador (`\x{9}`).                                             |
| `\v`            | Escapa de un tabulador vertical (`\x{B}`).                                    |

## Clases de caracteres

| Sintaxis regex    | Descripción                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------- |
| `.`             | Coincide con cualquier carácter excepto `\n`. Activa el indicador `s` para que coincida con cualquier carácter, incluido `\n`.|
| `\d`            | Coincide con cualquier dígito ASCII (`[0-9]`).                                                            |
| `\D `           | Coincide con cualquier elemento que no coincida con `\d`.                                               |
| `\h`            | Coincide con un espacio o tabulador (`[\x{20}\t]`).                                                        |
| `\H`            | Coincide con cualquier elemento que no coincida con `\h`.                                               |
| `\s`            | Coincide con cualquier espacio en blanco ASCII (`[\r\n\t\x{C}\x{B}\x{20}]`).                                    |
| `\S`            | Coincide con cualquier elemento que no coincida con `\s`.                                               |
| `\v`            | Coincide con el espacio vertical ASCII (`[\x{B}\x{A}\x{C}\x{D}]`).                                      |
| `\V`            | Coincide con cualquier elemento que no coincida con `\v`.                                               |
| `\w`            | Coincide con cualquier carácter ASCII de palabra (`[a-zA-Z0-9_]`).                                            |
| `\W`            | Coincide con cualquier elemento que no coincida con `\w`.                                               |
| `\p{x}`         | Coincide con cualquier elemento que coincida con la propiedad unicode `x`. Consulta [Propiedades Unicode](#unicode-properties) para obtener una lista completa.|

## Clases de caracteres personalizados

| Sintaxis regex                    | Descripción                                                                         |
| ------------------------------- | ----------------------------------------------------------------------------------- |
|`[...]`                          | Coincide con cualquier carácter que aparezca dentro de los paréntesis.                                   |
| `[^...]`                        | Coincide con todo lo que no aparece entre paréntesis.                            |
| `[a-zA-Z]`                      | Coincide con cualquier elemento en el rango `A - Z` (mayúsculas o minúsculas).                         |
| `[\s\w\d\S\W\D\v\V\h\H\p{x}...]`| Se permiten otras clases definidas anteriormente (excepto `.` que se trata como un literal). |
| `[[:ascii_class:]]`             | Coincide con [clases de ASCII](#ascii-classes) con denominación especial.                              |
| `[[:^ascii_class:]]`            | Coincide con [clases de ASCII](#ascii-classes) invertidas.                                   |

## Groups (grupos)

Utiliza los grupos para cambiar la prioridad o establecer indicadores. Dado que las capturas no se utilizan en Sensitive Data Scanner, los grupos de captura se comportan como grupos de no captura. Del mismo modo, se ignoran los nombres de los grupos de captura.

| Sintaxis regex                                           | Descripción            |
| ------------------------------------------------------ | ---------------------- |
| `(...)`                                                | Un grupo de captura.       |
| `(?<name>...)`                                         | Un grupo de captura con nombre. |
| `(?P<name>...)`                                        | Un grupo de captura con nombre. |
| `(?'name'...)`                                         | Un grupo de captura con nombre. |
| `(?:...)`                                              | Un grupo de no captura. |

## Configuración de indicadores

Utiliza indicadores para modificar el comportamiento de regex. Hay dos formas de especificar indicadores:
1. `(?imsx:...)`: establece indicadores que solo se apliquen a la expresión dentro de un grupo de no captura.
2. `(?imsx)...`: establece indicadores que se apliquen al resto del grupo actual.

Los indicadores que aparecen después de `-` se eliminan si ya estaban activados.

Utiliza `(?-imsx)` para desactivar los indicadores de `imsx`.

### Indicadores disponibles

| Indicador | Nombre             | Descripción                                                                           |
| ---- | ---------------- | ------------------------------------------------------------------------------------- |
| `i`  | No distingue mayúsculas de minúsculas | Las letras coinciden tanto en mayúsculas como en minúsculas.                                              |
| `m`  | Modo multilínea  | `^` y `$` coinciden con el principio y el final de línea.                                      |
| `s`  | Línea única      | Permite que `.` coincida con cualquier carácter, cuando normalmente coincide con cualquier elemento excepto `\n`).     |
| `x`  | Ampliado         | Los espacios en blanco se ignoran (excepto en una clase de caracteres personalizados).                           |

## Citado

Utiliza la sintaxis regex `\Q...\E` para tratar todo lo comprendido entre `\Q` y `\E` como un literal.


## Cuantificadores

Los cuantificadores repiten la expresión anterior. Voraz (greedy) significa que se toma el mayor número de repeticiones y solo se devuelven cuando es necesario para encontrar una coincidencia. Diferido (Lazy) toma el mínimo número de repeticiones y añade más según sea necesario.

| Sintaxis regex | Descripción                                                                   |
| ------------ | ----------------------------------------------------------------------------- |
| `?`          | Repite `0` o `1` vez (voraz).                                              |
| `??`         | Repite `0` o `1` vez (diferido).                                                |
| `+`          | Repite `1` o más veces (voraz).                                            |
| `+?`         | Repite `1` o más veces (diferido).                                              |
| `*`          | Repite `0` o más veces (voraz).                                            |
| `*?`         | Repite `0` o más veces (diferido).                                              |
| `{n}`        | Repite exactamente `n` veces (el modificador diferido se acepta aquí, pero se ignora). |
| `{n,m}`      | Repite al menos `n` veces, pero no más de `m` veces (voraz).               |
| `{n,m}?`     | Repite al menos `n times`, pero no más de `m` veces (diferido).                 |
| `{n,}`       | Repite al menos `n` veces (voraz).                                           |
| `{n,}?`      | Repite al menos `n` veces (diferido).                                             |

**Nota**: `{,m}` no es válido y se trata como un literal. Del mismo modo, cualquier diferencia sintáctica, como añadir espacios dentro de las llaves, hace que el cuantificador se trate como un literal.

## Propiedades Unicode

Propiedades Unicode para `x` en la clase de caracteres `\p{x}`.

| Propiedades Unicode| Descripción           |
| ------------------| --------------------- |
| `C`               | Otro                 |
| `Cc`              | Control               |
| `Cf`              | Formato                |
| `Cn`              | Sin asignar            |
| `Co`              | Uso privado           |
| `Cs`              | Sustituto             |
| `L`               | Letra                |
| `Ll`              | Letra minúscula      |
| `Lm`              | Letra modificadora       |
| `Lo`              | Otra letra          |
| `Lt`              | Letra en mayúscula de título     |
| `Lu`              | Letra mayúscula      |
| `M`               | Marca                  |
| `Mc`              |Marca de separación           |
| `Me`              | Marca de delimitación        |
| `Mn`              | Marca de no espaciado      |
| `N`               | Número                |
| `Nd`              | Número decimal        |
| `Nl`              | Número de letra         |
| `No`              | Otro número          |
| `P`               | Puntuación           |
| `Pc`              | Puntuación de conector |
| `Pd`              | Puntuación de guion      |
| `Pe`              | Puntuación de cierre     |
| `Pf`              | Puntuación final     |
| `Pi`              | Puntuación inicial   |
| `Po`              | Otros signos de puntuación     |
| `Ps`              | Puntuación abierta      |
| `S`               | Símbolo                |
| `Sc`              | Símbolo de moneda       |
| `Sk`              | Símbolo modificador       |
| `Sm`              | Símbolo matemático   |
| `So`              | Otro símbolo          |
| `Z`               | Separador             |
| `Zl`              | Separador de líneas        |
| `Zp`              | Separador de párrafo   |
| `Zs`              | Separador de espacios       |

Los nombres de script pueden utilizarse para coincidir con cualquier carácter del script. Se permiten los siguientes:

`Adlam`, `Ahom`, `Anatolian_Hieroglyphs`, `Arabic`, `Armenian`, `Avestan`, `Balinese`, `Bamum`, `Bassa_Vah`, `Batak`, `Bengali`, `Bhaiksuki`, `Bopomofo`, `Brahmi`, `Braille`, `Buginese`, `Buhid`, `Canadian_Aboriginal`, `Carian`, `Caucasian_Albanian`, `Chakma`, `Cham`, `Cherokee`, `Chorasmian`, `Common`, `Coptic`, `Cuneiform`, `Cypriot`, `Cypro_Minoan`, `Cyrillic`, `Deseret`, `Devanagari`, `Dives_Akuru`, `Dogra`, `Duployan`, `Egyptian_Hieroglyphs`, `Elbasan`, `Elymaic`, `Ethiopic`, `Georgian`, `Glagolitic`, `Gothic`, `Grantha`, `Greek`, `Gujarati`, `Gunjala_Gondi`, `Gurmukhi`, `Han`, `Hangul`, `Hanifi_Rohingya`, `Hanunoo`, `Hatran`, `Hebrew`, `Hiragana`, `Imperial_Aramaic`, `Inherited`, `Inscriptional_Pahlavi`, `Inscriptional_Parthian`, `Javanese`, `Kaithi`, `Kannada`, `Katakana`, `Kayah_Li`, `Kharoshthi`, `Khitan_Small_Script`, `Khmer`, `Khojki`, `Khudawadi`, `Lao`, `Latin`, `Lepcha`, `Limbu`, `Linear_A`, `Linear_B`, `Lisu`, `Lycian`, `Lydian`, `Mahajani`, `Makasar`, `Malayalam`, `Mandaic`, `Manichaean`, `Marchen`, `Masaram_Gondi`, `Medefaidrin`, `Meetei_Mayek`, `Mende_Kikakui`, `Meroitic_Cursive`, `Meroitic_Hieroglyphs`, `Miao`, `Modi`, `Mongolian`, `Mro`, `Multani`, `Myanmar`, `Nabataean`, `Nandinagari`, `New_Tai_Lue`, `Newa`, `Nko`, `Nushu`, `Ogham`, `Ol_Chiki`, `Old_Hungarian`, `Old_Italic`, `Old_North_Arabian`, `Old_Permic`, `Old_Persian`, `Old_Sogdian`, `Old_South_Arabian`, `Old_Turkic`, `Old_Uyghur`, `Oriya`, `Osage`, `Osmanya`, `Pahawh_Hmong`, `Palmyrene`, `Pau_Cin_Hau`, `Phags_Pa`, `Phoenician`, `Psalter_Pahlavi`, `Rejang`, `Runic`, `Samaritan`, `Saurashtra`, `Sharada`, `Shavian`, `Siddham`, `SignWriting`, `Sinhala`, `Sogdian`, `Sora_Sompeng`, `Soyombo`, `Sundanese`, `Syloti_Nagri`, `Syriac`, `Tagalog`, `Tagbanwa`, `Tai_Le`, `Tai_Tham`, `Tai_Viet`, `Takri`, `Tamil`, `Tangsa`, `Tangut`, `Telugu`, `Thaana`, `Thai`, `Tibetan`, `Tifinagh`, `Tirhuta`, `Toto`, `Ugaritic`, `Vai`, `Vithkuqi`, `Wancho`, `Warang_Citi`, `Yezidi`, `Yi`, `Zanabazar_Square`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/sensitive_data_scanner/
[2]: /es/sensitive_data_scanner/library_rules/
[3]: https://www.pcre.org/current/doc/html/pcre2syntax.html