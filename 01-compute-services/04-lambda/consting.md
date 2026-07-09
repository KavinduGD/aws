# Lambda Costing

- The free tier includes one million requests and 400,000 GB-seconds per month.
- Pay for two main things - Number of requests, Execution duration (GB-seconds)

## Execution duration

### ⁠Execution duration cost depend on

- How much memory you allocate (128 MB–10,240 MB)
- How long your function runs
- CPU architecture (x86 or ARM)

### If your application runs at massive scale, Lambda becomes cheaper.

Example (x86):

- First 6 billion GB-seconds
- Next 9 billion GB-seconds → lower price
- Above 15 billion GB-seconds → even lower price

These tiers are calculated per month, per region, and per architecture.

<image src="./images/price_table.png" width="1000">
