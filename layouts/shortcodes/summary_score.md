The SLO Summary widget includes a "Score". It is designed as a summary metric for executive leadership to understand the performance of a group of SLOs. The Score is calculated based on the average remaining error budget of the underlying SLOs, which is then mapped to a score between 0 - 100:

- The Score is "passing" (green/yellow) when most SLOs are not breached and have remaining error budget
- The Score is "failing" (red) when many SLOs are out of error budget or a few SLOs are far out of error budget
- SLOs in the "No Data" state are not considered in the Score

#### Score calculation details

The Score is calculated as follows:

- Average the remaining error budget of the SLOs (the minimum error budget is set to -200%, so any SLO with a lower error budget will be counted as -200% in the average)
- The average error budget (between -200 and 100) is mapped to a Score between 0 and 100
- The color and status of the Score is set based on the thresholds below

Note that an average remaining error budget of 0% corresponds to a Score value of 66.667. The Score's status and color is based on the following thresholds:

- Red: 0 ≤ Score < 66.667
- Yellow: 66.667 ≤ Score < 80
- Green: 80 ≤ Score ≤ 100