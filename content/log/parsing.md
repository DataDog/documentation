---
title: Parsing
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

## Overview 

The implemented standard to parse log entries is named grok.

With grok, you can turn unstructured log and event data into structured data.
Grok comes with a lot of reusable patterns to parse integers, ip addresses, hostnames, etc...

Parsing rules can be written with the `%{MATCHER:EXTRACT:FILTER}` syntax:

* **Matcher**: rule (possibly a reference to another token rule) that describes what to expect (number, word, notSpace,...)

* **Extract** (optional): an identifier representing the capture destination for the piece of text matched by the MATCHER.

* **Filter** (optional): a post-processor of the match to transform it

Example for this classic unstructured log:  
```
user:john connected on 11/08/2017
```

With the following parsing rule:
```
MyParsingRule user:%{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

You would have at the end this structued log:
```
{
 “user” : “john”,
 “connect_date”: 1510099200000
}
```

{{< img src="log/parsing/parsing_example_1.png" alt="Parsing example 1" >}}

As you can see there are specific rules for timestamps. We will come back to this.

## Matcher

This is the list of all the available matchers available for your parsers:

|||
|:---|:---|
|**Pattern**| **Usage**|
|`date("pattern"[, "timezoneId"[, "localeId"]])`| matches a date with the specified pattern and parses to produce a unix timestamp More info|
|`regex("pattern")` |matches a regex|
| `data` |matches a string until the next newline |
|`boolean("truePattern", "falsePattern")`|matches and parses a boolean optionally defining the true and false patterns (defaults to 'true' and 'false' ignoring case)|
| `numberStr` | matches a decimal floating point number|
|`number` |matches a decimal floating point number and parses it as a double precision number |
|`numberExtStr` |matches a floating point number (with scientific notation support)|
| `numberExt` | matches a floating point number (with scientific notation support) and parses it as a double precision number |
|`integerStr` | matches a decimal integer number |
|`integer` | matches a decimal integer number and parses it as an integer number |
| `integerExtStr` |matches an integer number (with scientific notation support)|
|`integerExt` | matches an integer number (with scientific notation support) and parses it as an integer number |
|`word` |matches alpha-numberic words |
|`doubleQuotedString`| matches a double-quoted string|
|`singleQuotedString` | matches a single-quoted string |
| `quotedString` | matches a double-quoted or single-quoted string|
|`uuid` | matches a uuid|
| `mac` | matches a mac address|
|`ipv4` | matches an ipv4|
|`ipv6` | matches an ipv6|
|`ip` | matches an ip (v4 or v6)|
|`hostname`|matches a hostname|
|`ipOrHost`|matches a hostname or ip|
|`port` |matches a port number |

## Filter
This is the list of all the available filters available for your parsers:

|||
|:---|:---|
|**Pattern**| **Usage**|
|`number`| parses a match as double precision number.|
|`integer`| parses a match as an integer number|
|`boolean`| parses 'true' and 'false' strings as booleans ignoring case.|
| `date("pattern"[, "timezoneId"[, "localeId"]])`| parses a date with the specified pattern to produce a unix timestamp. More info|
|`nullIf("value")`| returns null if the match is equal to the provided value.|
|`json`| parses properly formatted JSON format|
|`rubyhash`| parses properly formatted Ruby Hash (eg {name => "John" "job" => {"company" => "Big Company", "title" => "CTO"}})|
|`geoip` |parses an IP or a host and returns a JSON object that contains the continent, country, city and location of the IP address. More info |
|`useragent([decodeuricomponent:true/false])`| parses a user-agent and returns a JSON object that contains the device, os and the browser represented by the agent. More info|
|`querystring`| extracts all the key-value pairs in a matching URL query string (eg. "productId=superproduct&promotionCode=superpromo")|
|`decodeuricomponent`| this core filter decodes uri components.|
|`lowercase`| returns the lower cased string.|
|`uppercase` |returns the upper cased string.|
|`keyvalue([separatorStr[, characterWhiteList [, quotingStr]])` |extracts key value pattern and returns a JSON object. More info |
|`scale(factor)` | multiplies the expected numerical value by the provided factor.|
|`array([[openCloseStr, ] separator][, subRuleOrFilter)` | parses a string sequence of tokens and returns it as an array. More info|
|`url`|parses an url and returns all the tokenized members (domain, query params, port, etc) in a JSON object. More info|

## Examples
Let’s see some examples to understand better how this works.

### Key value

log: 
```
user=john connect_date=11/08/2017 id=123 action=click
```

you can use filters such as `keyvalue()` to more-easily map strings to attribute: 
```
keyvalue(separatorStr,characterWhiteList , quotingStr))
```

{{< img src="log/parsing/parsing_example_2.png" alt="Parsing example 2" >}}

So here we can see that we didn’t need to specify the name of our parameters as they were already contained in the log.
If we had added a extract parameter in the pattern it would have look as follows:


{{< img src="log/parsing/parsing_example_2_bis.png" alt="Parsing example 2 bis" >}}

### Timestamp

The date matcher will transform your timestamp in the EPOCH format.


||||
|:---|:----|:----|
|**Raw string** | **Parsing rule** | **Result** |
|14:20:15| `%{date("HH:mm:ss"):date}` |{"date": 51615000} |
|11/10/2014| `%{date("dd/mm/yyyy"):date}`| { "date": 1412978400000}|
|Thu Jun 16 08:29:03 2016 | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}` | {"date": 1466065743000}|
|06/Mar/2013:01:36:30 +0900| `%{date("dd/MMM/yyyy:hh:mm:ss Z"):date}` | {"date": 1362501390000}|
|2016-11-29T16:21:36.431+0000| `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}` | {"date": 1480436496431} |
|06/Feb/2009:12:14:14.655 | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}` | {“date”: 1233922454655}|



### Conditional pattern

You might have logs with two possibles formats which differ for only one attribute. These cases can be handled with a single rule, using conditionals with “|”.

user:john name:snow connected on 11/08/2017 
user:john id:123 connected on 11/08/2017 

Rule user:%{word:user.firstname} (name:%{word:user.name}|id:%{integer:user.id}) connected on %{date("MM/dd/yyyy"):connect_date}

Results:

{{< img src="log/parsing/parsing_example_4.png" alt="Parsing example 4" >}}

{{< img src="log/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis" >}}
Note that “id” is an integer and not a string thanks to the “integer” matcher in the rule.

### Optional attribute 
```
user:john id:123 connected on 11/08/2017 
```
Let’s say that in your logs you sometimes have the user id but not all the time. You can make attributes optional with “()?” so as to extract the value only when it is present:
```
Rule user:%{word:user.firstname} (id:%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**Hint**: you will usually  need to include the space in the optional part otherwise you would end up with two spaces and the rule would not match anymore.

{{< img src="log/parsing/parsing_example_5.png" alt="Parsing example 5" >}}

{{< img src="log/parsing/parsing_example_5_bis.png" alt="Parsing example 5 bis" >}}

### Regex 
In a PHP logs, we want to make sure we match “PHP” to store it as the application name.

{{< img src="log/parsing/parsing_example_6.png" alt="Parsing example 6" >}}