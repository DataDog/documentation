---
title: Parsing
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

https://doc.logmatic.io/docs/parsing#section-grok-patterns-a-little-hands-on-exercise 

## Overview 

We decided to implement a well recognized standard to parse log entries named grok.
With grok, you can turn unstructured log and event data into structured data.
Grok comes with a lot of reusable patterns to parse integers, ip addresses, hostnames, etc...

Special rules can be written with the %{MATCHER:EXTRACT:FILTER} syntax:
Matcher: rule (possibly a reference to another token rule) that describes what to expect (number, word, notSpace,... https://doc.logmatic.io/docs/parsing#section-core-matchers )
Extract (optional): an identifier representing the capture destination for the piece of text matched by the MATCHER.
Filter (optional): a post-processor of the match to transform it (https://doc.logmatic.io/docs/parsing#section-core-filters)


## Examples
Let’s see some examples to understand better how this works.

### 1 - Basic

Classic log:  
```
user:john connected on 11/08/2017
```

Parsing rule:
```
MyParsingRule user:%{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

Result:
```
{
 “user” : “john”,
 “connect_date”: 1510099200000
}
```

{{< img src="log/parsing/parsing_example_1.png" alt="Parsing example 1" >}}

As you can see there are specific rules for timestamps. We will come back to this.

### 2 - Key value

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

### 3 - Timestamp

The date matcher will transform your timestamp in the EPOCH format.



Raw string
Parsing rule
Result
14:20:15
%{date("HH:mm:ss"):date}
{"date": 51615000}
11/10/2014
%{date("dd/mm/yyyy"):date}
{ "date": 1412978400000}
Thu Jun 16 08:29:03 2016
%{date("EEE MMM dd HH:mm:ss yyyy"):date}
{"date": 1466065743000}
06/Mar/2013:01:36:30 +0900
%{date("dd/MMM/yyyy:hh:mm:ss Z"):date}
{"date": 1362501390000}
2016-11-29T16:21:36.431+0000
%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}
{"date": 1480436496431
}
06/Feb/2009:12:14:14.655
{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}
{“date”: 1233922454655
}



### 4 - Conditional pattern

You might have logs with two possibles formats which differ for only one attribute. These cases can be handled with a single rule, using conditionals with “|”.

user:john name:snow connected on 11/08/2017 
user:john id:123 connected on 11/08/2017 

Rule user:%{word:user.firstname} (name:%{word:user.name}|id:%{integer:user.id}) connected on %{date("MM/dd/yyyy"):connect_date}

Results:

{{< img src="log/parsing/parsing_example_4.png" alt="Parsing example 4" >}}

{{< img src="log/parsing/parsing_example_4_bis.png" alt="Parsing example 4 bis" >}}
Note that “id” is an integer and not a string thanks to the “integer” matcher in the rule.





### 5 - Optional attribute 
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

### 6 - Regex 
In a PHP logs, we want to make sure we match “PHP” to store it as the application name.

{{< img src="log/parsing/parsing_example_6.png" alt="Parsing example 6" >}}