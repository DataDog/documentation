---
title: Lookup Processor
kind: Documentation

---

Use the lookup processor to define a mapping between an event attribute and a human readable value saved in a [Reference Table][1] or the processors mapping table.

For example, you can use the lookup processor to enrich your events with information from your CMDB. Alternatively, you can use it to check if the MAC address that just attempted to connect to the production environment belongs to your list of stolen machines.

The lookup processor performs the following actions:

* Looks if the current event contains the source attribute.
* Checks if the source attribute value exists in the mapping table.
* If it does, creates the target attribute with the corresponding value in the table.
* Optionally, if it does not find the value in the mapping table, it creates a target attribute with the default fallback value set in the `fallbackValue` field. You can manually enter a list of `source_key,target_value` pairs or upload a CSV file on the **Manual Mapping** tab. 


**Manual Mapping**
    {{< img src="logs/log_configuration/processor/lookup_processor_manual_mapping.png" alt="Lookup processor" style="width:80%;">}}


**Reference Table**
    {{< img src="logs/log_configuration/processor/lookup_processor_reference_table.png" alt="Lookup processor" 
    style="width:80%;">}}


 The size limit for the mapping table is 100Kb. This limit applies across all Lookup Processors on the platform. However, Reference Tables support larger file sizes.



[1]: /integrations/guide/reference-tables/