---
title: New CSV headers for Individual Organizations Summary
kind: guide
---

CSV header changes take effect the week of September 18, 2023. Below is an example of the new CSV structure. Use this table to update CSV headers your automation depends on:

## All Tab Summary

| Organization Name | Public ID | Month | Product Name | Aggregation | Usage |
|----| ---| ---| ---| ---| ---|
|Org 1 | public_id_1 | 2023-02-01 | Infra Hosts	| Top 99p	| 500|
|Org 1 | public_id_1 | 2023-02-01 | Custom Metrics	| Average	| 1000|
|Org 2 | public_id_2 | 2023-02-01 | Infra Hosts	| Top 99p	| 600|
|Org 2 | public_id_2 | 2023-02-01 | Custom Metrics	| Average	| 1200|

## Billable Tab Summary

| Organization Name | Public ID | Start Date | End Date | Product Name | Aggregation | Usage |
|----| ---| ---| ---| ---| ---| ---|
|Org 1 | public_id_1 | 2023-02-01 | 2023-02-28 | Infra Hosts	| Top 99p	| 500|
|Org 1 | public_id_1 | 2023-02-01 | 2023-02-28 | Custom Metrics	| Average	| 1000|
|Org 2 | public_id_2 | 2023-02-01 | 2023-02-28 | Infra Hosts	| Top 99p	| 600|
|Org 2 | public_id_2 | 2023-02-01 | 2023-02-28 | Custom Metrics	| Average	| 1200|
