---
title: My trace-agent.log renders "empty `Service`" error
kind: faq
---

If your Agent is not rendering your traces on the UI, the first place to look for errors is the `trace-agent.log. 

You may see the following errors : 

```
2017-03-31 08:36:44 ERROR (receiver_logger.go:21) - dropping trace reason: 
invalid span Span[t_id:631844*********,s_id:631844********,p_id:631844*****,ser:,name:<your.span.name>,
res:<your.request.name>]: span.normalize: empty `Service` (debug for more info)
```

### Check that the Service was properly defined

Note that this issue is more likely to happen when manual instrumentation is used, especially in languages such as Go. Refer to our documentations for further details: [this page](/tracing/languages) leads you to the specific languages libraries we use.

### My Service is defined properly 

The issue is probably linked to the actual location of your code instrumentation.

The goal here is to always have a Root Span define when a Child Span is called when an application is running. 

A wrong instrumentation can lead to a dissociation of that Child Span to its Rootspan, either at every Span call, or in some specific path calls in the application. 

Let's say we have a user hitting a web application >> calls a Database. 

We could expect the path of action to be this

User hit web application >> Handler function called >> lower level span created (child Span ) >> Calling back the Root Span. 

If the Child Span isn't associated directly to the Root Span, you could end up with the error described above, especially if the Child Service Span definition is based on the Parent Span definition. 

### Nope, my code is properly instrumented 

It's time to contact [us](/help)! 

Send us your flare, and details about the language / library you're using, and a snippet of your code instrumentation. 

