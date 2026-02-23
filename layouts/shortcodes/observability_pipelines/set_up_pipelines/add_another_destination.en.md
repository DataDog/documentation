If you want to add an additional destination to a processor group, click the plus sign (**+**) to the right of the processor group.

To delete a destination, click on the pencil icon to the top right of the destination, and select **Delete node**.
- If you delete a destination from a processor group that has multiple destinations, only the deleted destination is removed.
- If you delete a destination from a processor group that only has one destination, both the destination and the processor group are removed.

**Notes**:

- A pipeline must have at least one destination. If a processor group only has one destination, that destination cannot be deleted.
- You can add a total of three destinations for a pipeline.
- A specific destination can only be added once. For example, you cannot add multiple Splunk HEC destinations.