---
title: Pipelines and Processors
kind: Documentation

---

## Overview 

Event Management offers the ability to add additional processing to an event with Pipelines and Processors. 


### Common Uses Cases 
- Enrich your events with additonal information from your CMDB
- Standardize the tags on the events
- Create new tags from the content within the events 


### Getting Started

To get started you first need to create an Pipeline, which allows you to filter to the events that your interested in, for example a source or maybe a tag. Once you created a Pipeline you can then add Processors. The Processors available are: 

- [Arithmetic Processor][1]
- [Date Remapper][2]
- [Category Processor][3]
- [Grok Parser][4]
- [Lookup Processor][5]
- [Remapper][6]
- [Service Remapper][7]
- [Status Remapper][8]
- [String Builder Processor][9]




[1]: /service_management/events/pipelines_and_processors/arithmetic_processor
[2]: /service_management/events/pipelines_and_processors/date_remapper
[3]: /service_management/events/pipelines_and_processors/category_processor
[4]: /service_management/events/pipelines_and_processors/grok_parser
[5]: /service_management/events/pipelines_and_processors/lookup_processor
[6]: /service_management/events/pipelines_and_processors/remapper
[7]: /service_management/events/pipelines_and_processors/service_remapper
[8]: /service_management/events/pipelines_and_processors/status_remapper
[9]: /service_management/events/pipelines_and_processors/string_builder_processor