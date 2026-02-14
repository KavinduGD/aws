# AWS ECS Questions

## What is aws ECS?

- AWS ECS is a container orchestration service that helps run and manage Docker containers in AWS.
- Doesn't use kubernetes    

## Diffrence between EKS and ECS?

| ECS | EKS |
| --- | --- |
| AWS-native | Kubernetes-based |
| Simpler | More flexible |
| Less complex | Industry standard |
| Easier for beginners | More powerful |

## What is the ECS cluster?

- ECS Cluster is a logical group of servers where your containers run.
- Cluster can be 
    - EC2 instances
    - AWS Fargate

## What is Task Definition?

- blueprint of your container
-  It defines
    - Docker image
    - CPU and memory
    - Environment variables
    - port mapping

## What is Task?

- A task is a running instance of a task definition.
- can be one or more containers
- Run once (When task fails it will not restart)

## What is Service?

- keeps multiple tasks running
- created from task definition
- if task fails it will restart
- support auto scaling
- support load balancing

## What is ECS Fargate?

- serverless compute engine for containers
- no need to manage EC2 instances
- pay for what you use (cpu and memory)

## What is the difference between ECS EC2 mode and Fargate mode?

- EC2 Mode:
    - You manage EC2 instances
    - More control
    - Cheaper for large workloads
 
- Fargate Mode:
    - No server management
    - Easier
    - More expensive per unit

# When would you choose ECS over EKS? 

Choose ECS when:

- Small team
- Simple workloads
- No need for Kubernetes portability

Choose EKS when:
- Need Kubernetes features
- Complex orchestration
 
---

# AWS EKS Questions

## What is AWS EKS?

- EKS (Elastic Kubernetes Service) is a managed Kubernetes service in AWS.
- It allows you to run Kubernetes clusters without managing the control plane yourself.

AWS manages:
- Kubernetes control plane
- Updates
- High availability of control plane

You manage:
- Worker nodes
- Applications (pods, deployments, services, etc.)

## What is EKS Auto Mode?

EKS Auto Mode is a feature in EKS where AWS automatically manages the worker nodes for you.

You don’t need to:
- Create EC2 instances
- Manage node groups
- Handle scaling manually

AWS automatically provisions and scales compute based on your workloads.

## Why use EKS instead of self-managed Kubernetes?

- With EKS, AWS manages the Kubernetes control plane for you.
- You don't need to worry about:
    - Upgrades
    - Patching
    - High availability
    - Security
- AWS handles all the heavy lifting, so you can focus on running your applications.

## What are worker nodes in EKS?

- Worker node where actually applications are running
- worker nodes can be
  - self managed (you manage the worker nodes)
  - managed node groups (scale up and down automatically)
  - Fargate (serverless)

## How to expose a application running in EKS?

  - Load Balancer (Service Type Load Balancer)
  - Ingress (Ingress Controller - By aws there is Application Load Balancer controller)

## What is IRSA?

IRSA (IAM Roles for Service Accounts) is a feature in EKS that allows you to assign IAM roles to service accounts.

- It allows pods to access AWS services without using long-lived credentials.
- It uses short-lived credentials that are automatically rotated.
- It is more secure than using long-lived credentials.



