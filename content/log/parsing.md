---
title: Parsing
kind: Documentation
autotocdepth: 2
hideguides: true
customnav: lognav
---

https://doc.logmatic.io/docs/parsing#section-grok-patterns-a-little-hands-on-exercise 


We decided to implement a well recognized standard to parse log entries named grok.
With grok, you can turn unstructured log and event data into structured data.
Grok comes with a lot of reusable patterns to parse integers, ip addresses, hostnames, etc...

Special rules can be written with the %{MATCHER:EXTRACT:FILTER} syntax:
Matcher: rule (possibly a reference to another token rule) that describes what to expect (number, word, notSpace,... https://doc.logmatic.io/docs/parsing#section-core-matchers )
Extract (optional): an identifier representing the capture destination for the piece of text matched by the MATCHER.
Filter (optional): a post-processor of the match to transform it (https://doc.logmatic.io/docs/parsing#section-core-filters)


Let’s see some examples to understand better how this works.

Example 1 - simple log:  user:john connected on 11/08/2017

MyParsingRule user:%{word:user} connected on %{date("MM/dd/yyyy"):connect_date}

Result:
{
 “user” : “john”,
 “connect_date”: 1510099200000
}

As you can see there are specific rules for timestamps. We will come back to this.

Example 2 - key value: user=john connect_date=11/08/2017 id=123 action=click

you can use filters such as `keyvalue()` to more-easily map strings to attribute: keyvalue(separatorStr,characterWhiteList , quotingStr))




So here we can see that we didn’t need to specify the name of our parameters as they were already contained in the log.
If we had added a extract parameter in the pattern it would have look as follows:




Example 3 - timestamp

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





Example 4 - conditional pattern

You might have logs with two possibles formats which differ for only one attribute. These cases can be handled with a single rule, using conditionals with “|”.

user:john name:snow connected on 11/08/2017 
user:john id:123 connected on 11/08/2017 

Rule user:%{word:user.firstname} (name:%{word:user.name}|id:%{integer:user.id}) connected on %{date("MM/dd/yyyy"):connect_date}

Results:

{
  "user": {
    "firstname": "john",
    "name": "snow"
  },
  "connect_date": 1510099200000
}

{
  "user": {
    "firstname": "john",
    "id": 123
  },
  "connect_date": 1510099200000
}

Note that “id” is an integer and not a string thanks to the “integer” matcher in the rule.





Example 5 - optional attribute user:john id:123 connected on 11/08/2017 
Let’s say that in your logs you sometimes have the user id but not all the time. You can make attributes optional with “()?” so as to extract the value only when it is present:

Rule user:%{word:user.firstname} (id:%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}

Hint: you will usually  need to include the space in the optional part otherwise you would end up with two spaces and the rule would not match anymore.

user:john connected on 11/08/2017 ==>
{
  "user": {
    "firstname": "john"
  },
  "connect_date": 1510099200000
}

user:john id:123 connected on 11/08/2017  ==>
{
  "user": {
    "firstname": "john",
    "id": 123
  },
  "connect_date": 1510099200000
}

Example 5 - regex 
In a PHP logs, we want to make sure we match “PHP” to store it as the application name.