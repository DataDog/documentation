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

- Arithmetic Processor
- Date Remapper
- Category Processor
- Grok Parser
- Lookup Processor
- Remapper
- Service Remapper
- Status Remapper
- String Builder Processor