The reduce processor groups multiple log events into a single log, based on the fields specified and the merge strategies selected. Logs are grouped at 10-second intervals. After the interval has elapsed for the group, the reduced log for that group is sent to the next step in the pipeline.

To set up the reduce processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. Reduced logs and logs that do not match the filter query are sent to the next step in the pipeline.
2. In the **Group By** section, enter the field you want to group the logs by.
3. Click **Add Group by Field** to add additional fields.
4. In the **Merge Strategy** section:
   - In **On Field**, enter the name of the field you want to merge the logs on.
   - Select the merge strategy in the **Apply** dropdown menu. This is the strategy used to combine events. See the following [Merge strategies](#merge-strategies) section for descriptions of the available strategies.
   - Click **Add Merge Strategy** to add additional strategies.

##### Merge strategies

These are the available merge strategies for combining log events.


| Name           | Description                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------ |
| Array          | Appends each value to an array.                                                                                    |
| Concat         | Concatenates each string value, delimited with a space.                                                            |
| Concat newline | Concatenates each string value, delimited with a newline.                                                          |
| Concat raw     | Concatenates each string value, without a delimiter.                                                               |
| Discard        | Discards all values except the first value that was received.                                                      |
| Flat unique    | Creates a flattened array of all unique values that were received.                                                 |
| Longest array  | Keeps the longest array that was received.                                                                         |
| Max            | Keeps the maximum numeric value that was received.                                                                 |
| Min            | Keeps the minimum numeric value that was received.                                                                 |
| Retain         | Discards all values except the last value that was received. Works as a way to coalesce by not retaining \`null\`. |
| Shortest array | Keeps the shortest array that was received.                                                                        |
| Sum            | Sums all numeric values that were received.                                                                        |