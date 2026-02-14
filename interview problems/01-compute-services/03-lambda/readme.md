# AWS Lambda Overview

AWS Lambda is a serverless compute service provided by Amazon Web Services.

### 1. What is Serverless?
Serverless means you don’t manage servers:
*   **No EC2 provisioning**
*   **No patching**
*   **No scaling setup**
*   **On-demand execution:** AWS scales automatically and charges only for execution time.

### 2. What problem does Lambda solve?
Traditional models require launching EC2 instances that run 24/7, leading to costs even when idle. Lambda solves:
*   **Paying for idle time**
*   **Infrastructure management**
*   **Scaling complexity**
*   *Ideal for:* Event-driven workloads, small microservices, and background processing.

### 3. What is an Event in AWS Lambda?
Lambda is event-driven; an event is a trigger for execution. Examples include:
*   **HTTP requests** (via API Gateway)
*   **File uploads** (S3)
*   **Database updates** (DynamoDB)
*   **Schedules** (CloudWatch Events)

### 4. What is the maximum execution time?
*   **Maximum timeout:** 15 minutes.
*   *Alternatives for long tasks:* Use EC2, ECS, or AWS Step Functions.

### 5. How does AWS Lambda scale?
Lambda scales automatically by creating multiple instances in parallel. If 1,000 requests arrive, AWS can spin up 1,000 concurrent executions without manual intervention.

### 6. What is a "Cold Start"?
*   **Cold Start:** Occurs when a Lambda hasn't been used recently and AWS must initialize a new environment, adding latency.
*   **Warm Start:** Reuses an existing environment for faster execution.
*   *Impact:* Noticeable with large packages or VPC-attached Lambdas.

### 7. What languages are supported?
Lambda supports Node.js, Python, Java, Go, .NET, and Ruby. It also supports custom runtimes and **Docker container images** (up to 10GB).

### 8. What is an IAM Role in Lambda?
Lambda uses IAM Roles to securely access other AWS services (like S3 or DynamoDB) without storing hardcoded credentials.

### 9. How does Lambda integrate with API Gateway?
Together they create Serverless REST APIs:
`Client → API Gateway (Auth/Throttling) → Lambda (Business Logic) → Response`

### 10. When should you NOT use Lambda?
*   **Long-running jobs** (>15 minutes)
*   **Large memory-intensive apps**
*   **Stateful applications**
*   **High-performance, ultra-low-latency requirements**
*   **Heavy Machine Learning training**

### 11. Ways to create a Lambda Function

- Docker image
- Zip file
- Inline code
